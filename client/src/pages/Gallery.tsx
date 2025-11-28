import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { X, ZoomIn, Play, Image, Camera } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { GalleryImage, Video as VideoType } from "@shared/types";
import PageHeader from "@/components/PageHeader";

function extractYouTubeId(url: string | null | undefined): string | null {
  if (!url) return null;
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11 ? match[2] : null;
}

export default function Gallery() {
  const { data: images, isLoading: imagesLoading } = useQuery<GalleryImage[]>({
    queryKey: ["/api/gallery"],
  });

  const { data: videos, isLoading: videosLoading } = useQuery<VideoType[]>({
    queryKey: ["/api/videos"],
  });

  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [filter, setFilter] = useState<string>("all");
  const [activeTab, setActiveTab] = useState<string>("photos");

  const categories = ["all", ...(images?.map(img => img.category).filter((v, i, a) => v && a.indexOf(v) === i) || [])];
  const filteredImages = filter === "all" ? images : images?.filter(img => img.category === filter);

  return (
    <div className="min-h-screen bg-background">
      <PageHeader
        badge="Media Collection"
        title="Media Gallery"
        subtitle="Photos and videos from our science fair events"
        icon={<Camera className="h-4 w-4" />}
      />

      <section className="py-8 bg-background relative">
        <div className="max-w-7xl mx-auto container-padding">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <TabsList className="grid w-full max-w-md grid-cols-2 mx-auto p-1 bg-primary/5 rounded-xl">
                <TabsTrigger 
                  value="photos" 
                  className="data-[state=active]:bg-primary data-[state=active]:text-white rounded-lg transition-all flex items-center gap-2"
                >
                  <Image className="h-4 w-4" />
                  Photos
                </TabsTrigger>
                <TabsTrigger 
                  value="videos"
                  className="data-[state=active]:bg-primary data-[state=active]:text-white rounded-lg transition-all flex items-center gap-2"
                >
                  <Play className="h-4 w-4" />
                  Videos
                </TabsTrigger>
              </TabsList>
            </motion.div>

            <TabsContent value="photos" className="mt-8">
              {categories.length > 1 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-wrap gap-2 justify-center mb-8"
                >
                  {categories.map((category) => (
                    <motion.div key={category} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button
                        variant={filter === category ? "default" : "outline"}
                        size="sm"
                        onClick={() => setFilter(category)}
                        className={`capitalize rounded-full ${
                          filter === category 
                            ? "bg-primary text-white" 
                            : "border-primary/20 hover:bg-primary/10"
                        }`}
                        data-testid={`button-filter-${category}`}
                      >
                        {category === "all" ? "All Photos" : category}
                      </Button>
                    </motion.div>
                  ))}
                </motion.div>
              )}

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {imagesLoading
                  ? [...Array(8)].map((_, i) => (
                      <Skeleton key={i} className="aspect-square rounded-2xl" />
                    ))
                  : filteredImages?.map((image, index) => (
                      <motion.div
                        key={image.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: index * 0.05 }}
                        whileHover={{ scale: 1.03 }}
                        className="group cursor-pointer"
                        onClick={() => setSelectedImage(image)}
                        data-testid={`image-gallery-${image.id}`}
                      >
                        <div className="relative aspect-square rounded-2xl overflow-hidden shadow-lg">
                          <img
                            src={image.imageUrl}
                            alt={image.title}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-secondary/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                          <motion.div
                            className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100"
                            initial={false}
                          >
                            <div className="p-3 bg-white/20 backdrop-blur-sm rounded-full">
                              <ZoomIn className="h-6 w-6 text-white" />
                            </div>
                          </motion.div>
                          <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                            <p className="text-white text-sm font-medium truncate">{image.title}</p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
              </div>

              {filteredImages?.length === 0 && (
                <div className="text-center py-20">
                  <div className="inline-flex p-6 bg-primary/10 rounded-full mb-6">
                    <Image className="h-12 w-12 text-primary" />
                  </div>
                  <h3 className="text-2xl font-heading font-bold mb-4">No Photos Yet</h3>
                  <p className="text-muted-foreground">Photos will be added soon.</p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="videos" className="mt-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {videosLoading
                  ? [...Array(6)].map((_, i) => (
                      <Card key={i} className="overflow-hidden rounded-2xl">
                        <Skeleton className="aspect-video" />
                        <div className="p-4">
                          <Skeleton className="h-6 w-3/4" />
                        </div>
                      </Card>
                    ))
                  : videos?.map((video, index) => {
                      const youtubeId = extractYouTubeId(video.videoUrl);
                      return (
                        <motion.div
                          key={video.id}
                          initial={{ opacity: 0, y: 30 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                          whileHover={{ y: -5 }}
                        >
                          <Card className="overflow-hidden card-premium rounded-2xl" data-testid={`card-video-${video.id}`}>
                            <div className="aspect-video bg-secondary/10">
                              {youtubeId ? (
                                <iframe
                                  src={`https://www.youtube.com/embed/${youtubeId}`}
                                  title={video.title}
                                  className="w-full h-full"
                                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                  allowFullScreen
                                />
                              ) : video.videoUrl ? (
                                <video
                                  src={video.videoUrl}
                                  className="w-full h-full object-cover"
                                  controls
                                />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center bg-secondary/20">
                                  <Play className="h-12 w-12 text-muted-foreground" />
                                </div>
                              )}
                            </div>
                            <div className="p-4">
                              <h3 className="font-heading font-bold" data-testid={`text-video-title-${video.id}`}>
                                {video.title}
                              </h3>
                              {video.description && (
                                <p className="text-muted-foreground text-sm mt-1 line-clamp-2">
                                  {video.description}
                                </p>
                              )}
                            </div>
                          </Card>
                        </motion.div>
                      );
                    })}
              </div>

              {videos?.length === 0 && (
                <div className="text-center py-20">
                  <div className="inline-flex p-6 bg-primary/10 rounded-full mb-6">
                    <Play className="h-12 w-12 text-primary" />
                  </div>
                  <h3 className="text-2xl font-heading font-bold mb-4">No Videos Yet</h3>
                  <p className="text-muted-foreground">Videos will be added soon.</p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </section>

      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-5xl max-h-[90vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <motion.button
                onClick={() => setSelectedImage(null)}
                className="absolute -top-12 right-0 p-2 text-white/70 hover:text-white transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <X className="h-8 w-8" />
              </motion.button>
              <img
                src={selectedImage.imageUrl}
                alt={selectedImage.title}
                className="max-w-full max-h-[85vh] object-contain rounded-2xl shadow-2xl"
              />
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent rounded-b-2xl">
                <h3 className="text-white font-heading font-bold text-xl">{selectedImage.title}</h3>
                {selectedImage.description && (
                  <p className="text-white/70 mt-1">{selectedImage.description}</p>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
