import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { Play } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import type { Video } from "@shared/types";

function extractYouTubeId(url: string): string | null {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11 ? match[2] : null;
}

export default function Videos() {
  const { data: videos, isLoading } = useQuery<Video[]>({
    queryKey: ["/api/videos"],
  });

  return (
    <div className="min-h-screen pt-20">
      <section className="relative py-20 bg-cream overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iYmxhY2siIHN0cm9rZS1vcGFjaXR5PSIwLjAzIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-40" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <Play className="h-16 w-16 text-charcoal mx-auto mb-6" />
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-charcoal mb-6">
              Video Gallery
            </h1>
            <p className="text-xl text-charcoal/80 max-w-3xl mx-auto">
              Watch highlights and moments from our science fair events
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {isLoading
              ? [...Array(6)].map((_, i) => (
                  <Card key={i} className="overflow-hidden">
                    <Skeleton className="w-full aspect-video" />
                    <div className="p-6 space-y-3">
                      <Skeleton className="h-6 w-3/4" />
                      <Skeleton className="h-16 w-full" />
                    </div>
                  </Card>
                ))
              : videos?.map((video, index) => {
                  const videoId = extractYouTubeId(video.youtubeUrl);
                  return (
                    <motion.div
                      key={video.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      whileHover={{ y: -8 }}
                    >
                      <Card className="overflow-hidden hover-elevate active-elevate-2 h-full flex flex-col" data-testid={`card-video-${video.id}`}>
                        <div className="relative aspect-video bg-cream group cursor-pointer">
                          {videoId ? (
                            <iframe
                              src={`https://www.youtube.com/embed/${videoId}`}
                              title={video.title}
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              allowFullScreen
                              className="w-full h-full"
                            />
                          ) : video.thumbnail ? (
                            <img
                              src={video.thumbnail}
                              alt={video.title}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <Play className="h-16 w-16 text-charcoal/50" />
                            </div>
                          )}
                        </div>
                        <div className="p-6 flex-1">
                          <h3 className="text-xl font-heading font-bold mb-2" data-testid={`text-video-title-${video.id}`}>
                            {video.title}
                          </h3>
                          {video.description && (
                            <p className="text-muted-foreground">{video.description}</p>
                          )}
                        </div>
                      </Card>
                    </motion.div>
                  );
                })}
          </div>
        </div>
      </section>
    </div>
  );
}
