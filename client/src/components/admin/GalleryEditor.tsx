import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  insertGalleryImageSchema,
  insertVideoSchema,
  type InsertGalleryImage,
  type InsertVideo,
  type GalleryImage,
  type Video,
} from "@shared/types";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { Save, Plus, Edit, Trash2, Image as ImageIcon, Play } from "lucide-react";
import { motion } from "framer-motion";

function extractYouTubeId(url: string): string | null {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11 ? match[2] : null;
}

export function GalleryEditor() {
  const { toast } = useToast();
  const [editingImage, setEditingImage] = useState<GalleryImage | null>(null);
  const [editingVideo, setEditingVideo] = useState<Video | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("photos");

  const { data: images = [], isLoading: imagesLoading } = useQuery<GalleryImage[]>({
    queryKey: ["/api/gallery"],
  });

  const { data: videos = [], isLoading: videosLoading } = useQuery<Video[]>({
    queryKey: ["/api/videos"],
  });

  const deleteImageMutation = useMutation({
    mutationFn: (id: string) => apiRequest("DELETE", `/api/gallery/${id}`, {}),
    onSuccess: () => {
      toast({
        title: "Deleted!",
        description: "Image has been removed from gallery.",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/gallery"] });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to delete image. Please try again.",
        variant: "destructive",
      });
    },
  });

  const deleteVideoMutation = useMutation({
    mutationFn: (id: string) => apiRequest("DELETE", `/api/videos/${id}`, {}),
    onSuccess: () => {
      toast({
        title: "Deleted!",
        description: "Video has been removed.",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/videos"] });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to delete video. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleEditImage = (image: GalleryImage) => {
    setEditingImage(image);
    setEditingVideo(null);
    setActiveTab("photos");
    setIsDialogOpen(true);
  };

  const handleEditVideo = (video: Video) => {
    setEditingVideo(video);
    setEditingImage(null);
    setActiveTab("videos");
    setIsDialogOpen(true);
  };

  const handleDeleteImage = (id: string) => {
    if (confirm("Are you sure you want to delete this image?")) {
      deleteImageMutation.mutate(id);
    }
  };

  const handleDeleteVideo = (id: string) => {
    if (confirm("Are you sure you want to delete this video?")) {
      deleteVideoMutation.mutate(id);
    }
  };

  if (imagesLoading || videosLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-12 w-full" />
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {[...Array(8)].map((_, i) => (
            <Skeleton key={i} className="aspect-square" />
          ))}
        </div>
      </div>
    );
  }

  const sortedImages = [...images].sort((a, b) => a.order - b.order);
  const sortedVideos = [...videos].sort((a, b) => a.order - b.order);

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-heading font-bold mb-2">Media Gallery</h1>
          <p className="text-muted-foreground">Manage photos and videos</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button
              onClick={() => {
                setEditingImage(null);
                setEditingVideo(null);
              }}
              className="bg-aurora hover:bg-aurora/90"
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Media
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingImage ? "Edit Photo" : editingVideo ? "Edit Video" : "Add Media"}
              </DialogTitle>
            </DialogHeader>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="photos">Photo</TabsTrigger>
                <TabsTrigger value="videos">Video</TabsTrigger>
              </TabsList>
              <TabsContent value="photos">
                <GalleryForm
                  galleryImage={editingImage}
                  onClose={() => {
                    setIsDialogOpen(false);
                    setEditingImage(null);
                  }}
                />
              </TabsContent>
              <TabsContent value="videos">
                <VideoForm
                  video={editingVideo}
                  onClose={() => {
                    setIsDialogOpen(false);
                    setEditingVideo(null);
                  }}
                />
              </TabsContent>
            </Tabs>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue="photos" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="photos">Photos ({images.length})</TabsTrigger>
          <TabsTrigger value="videos">Videos ({videos.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="photos" className="mt-6">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {sortedImages.length === 0 ? (
              <div className="col-span-full text-center py-12 text-muted-foreground">
                No photos yet. Add one to get started.
              </div>
            ) : (
              sortedImages.map((image) => (
                <motion.div key={image.id} whileHover={{ scale: 1.02 }}>
                  <Card className="overflow-hidden relative group">
                    <img
                      src={image.imageUrl}
                      alt={image.title}
                      className="w-full aspect-square object-cover"
                    />
                    <div className="absolute inset-0 bg-charcoal/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                      <Button
                        size="sm"
                        variant="secondary"
                        onClick={() => handleEditImage(image)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleDeleteImage(image.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </Card>
                </motion.div>
              ))
            )}
          </div>
        </TabsContent>

        <TabsContent value="videos" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedVideos.length === 0 ? (
              <div className="col-span-full text-center py-12 text-muted-foreground">
                No videos yet. Add one to get started.
              </div>
            ) : (
              sortedVideos.map((video) => {
                const videoId = extractYouTubeId(video.youtubeUrl);
                return (
                  <motion.div key={video.id} whileHover={{ scale: 1.02 }}>
                    <Card className="overflow-hidden">
                      <div className="relative aspect-video bg-cream flex items-center justify-center">
                        {videoId ? (
                          <iframe
                            src={`https://www.youtube.com/embed/${videoId}`}
                            title={video.title}
                            className="w-full h-full"
                          />
                        ) : video.thumbnail ? (
                          <img
                            src={video.thumbnail}
                            alt={video.title}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <Play className="h-8 w-8 text-charcoal/50" />
                        )}
                      </div>
                      <div className="p-4">
                        <h4 className="font-bold text-sm mb-2 line-clamp-2">{video.title}</h4>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="secondary"
                            onClick={() => handleEditVideo(video)}
                            className="flex-1"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => handleDeleteVideo(video.id)}
                            className="flex-1"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                );
              })
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function GalleryForm({
  galleryImage,
  onClose,
}: {
  galleryImage: GalleryImage | null;
  onClose: () => void;
}) {
  const { toast } = useToast();

  const form = useForm<InsertGalleryImage>({
    resolver: zodResolver(insertGalleryImageSchema),
    defaultValues: {
      title: galleryImage?.title || "",
      description: galleryImage?.description || "",
      imageUrl: galleryImage?.imageUrl || "",
      category: galleryImage?.category || "",
      order: galleryImage?.order || 0,
    },
  });

  const saveMutation = useMutation({
    mutationFn: (data: InsertGalleryImage) => {
      if (galleryImage) {
        return apiRequest("PATCH", `/api/gallery/${galleryImage.id}`, data);
      }
      return apiRequest("POST", "/api/gallery", data);
    },
    onSuccess: () => {
      toast({
        title: "Saved!",
        description: "Photo has been saved successfully.",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/gallery"] });
      onClose();
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to save photo. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: InsertGalleryImage) => {
    saveMutation.mutate(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Enter photo title..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="imageUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Image URL</FormLabel>
              <FormControl>
                <Input placeholder="https://example.com/image.jpg" {...field} />
              </FormControl>
              <FormDescription>Enter the URL of the image</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description (Optional)</FormLabel>
              <FormControl>
                <Textarea placeholder="Describe the photo..." rows={2} {...field} value={field.value || ""} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category (Optional)</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value || ""}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Event">Event</SelectItem>
                    <SelectItem value="Projects">Projects</SelectItem>
                    <SelectItem value="Workshops">Workshops</SelectItem>
                    <SelectItem value="Ceremonies">Ceremonies</SelectItem>
                    <SelectItem value="Team">Team</SelectItem>
                    <SelectItem value="Venue">Venue</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="order"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Display Order</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    min="0"
                    {...field}
                    onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                  />
                </FormControl>
                <FormDescription>Lower numbers appear first</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex gap-3 pt-4">
          <Button type="submit" className="bg-aurora hover:bg-aurora/90 flex-1" disabled={saveMutation.isPending}>
            <Save className="mr-2 h-4 w-4" />
            {saveMutation.isPending ? "Saving..." : "Save Photo"}
          </Button>
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
        </div>
      </form>
    </Form>
  );
}

function VideoForm({
  video,
  onClose,
}: {
  video: Video | null;
  onClose: () => void;
}) {
  const { toast } = useToast();

  const form = useForm<InsertVideo>({
    resolver: zodResolver(insertVideoSchema),
    defaultValues: {
      title: video?.title || "",
      description: video?.description || "",
      youtubeUrl: video?.youtubeUrl || "",
      thumbnail: video?.thumbnail || "",
      order: video?.order || 0,
    },
  });

  const saveMutation = useMutation({
    mutationFn: (data: InsertVideo) => {
      if (video) {
        return apiRequest("PATCH", `/api/videos/${video.id}`, data);
      }
      return apiRequest("POST", "/api/videos", data);
    },
    onSuccess: () => {
      toast({
        title: "Saved!",
        description: "Video has been saved successfully.",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/videos"] });
      onClose();
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to save video. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: InsertVideo) => {
    saveMutation.mutate(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Enter video title..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="youtubeUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>YouTube URL</FormLabel>
              <FormControl>
                <Input placeholder="https://www.youtube.com/watch?v=..." {...field} />
              </FormControl>
              <FormDescription>Paste the YouTube video link</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description (Optional)</FormLabel>
              <FormControl>
                <Textarea placeholder="Describe the video..." rows={2} {...field} value={field.value || ""} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="thumbnail"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Thumbnail URL (Optional)</FormLabel>
              <FormControl>
                <Input placeholder="https://example.com/thumbnail.jpg" {...field} value={field.value || ""} />
              </FormControl>
              <FormDescription>Custom thumbnail image URL</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="order"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Display Order</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  min="0"
                  {...field}
                  onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                />
              </FormControl>
              <FormDescription>Lower numbers appear first</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex gap-3 pt-4">
          <Button type="submit" className="bg-aurora hover:bg-aurora/90 flex-1" disabled={saveMutation.isPending}>
            <Save className="mr-2 h-4 w-4" />
            {saveMutation.isPending ? "Saving..." : "Save Video"}
          </Button>
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
        </div>
      </form>
    </Form>
  );
}
