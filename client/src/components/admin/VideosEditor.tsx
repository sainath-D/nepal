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
  insertVideoSchema,
  type InsertVideo,
  type Video,
} from "@shared/types";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { Save, Plus, Edit, Trash2, Play, GripVertical } from "lucide-react";
import { motion } from "framer-motion";

export function VideosEditor() {
  const { toast } = useToast();
  const [editingVideo, setEditingVideo] = useState<Video | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const { data: videos = [], isLoading } = useQuery<Video[]>({
    queryKey: ["/api/videos"],
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

  const handleEdit = (video: Video) => {
    setEditingVideo(video);
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this video?")) {
      deleteVideoMutation.mutate(id);
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-32 w-full" />
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-heading font-bold mb-2">Video Gallery</h1>
          <p className="text-muted-foreground">Manage YouTube videos showcasing your events</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button
              onClick={() => setEditingVideo(null)}
              className="bg-aurora hover:bg-aurora/90"
              data-testid="button-add-video"
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Video
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingVideo ? "Edit Video" : "Add Video"}
              </DialogTitle>
            </DialogHeader>
            <VideoForm
              video={editingVideo}
              onClose={() => {
                setIsDialogOpen(false);
                setEditingVideo(null);
              }}
            />
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {videos.length === 0 ? (
          <div className="col-span-full text-center py-12 text-muted-foreground">
            <p>No videos yet. Click "Add Video" to get started.</p>
          </div>
        ) : (
          videos.map((video, index) => (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card className="overflow-hidden hover-elevate">
                <div className="aspect-video bg-muted relative group">
                  {video.thumbnail ? (
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full">
                      <Play className="h-16 w-16 text-muted-foreground" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button
                      variant="outline"
                      size="sm"
                      asChild
                      className="mr-2"
                    >
                      <a href={video.youtubeUrl} target="_blank" rel="noopener noreferrer">
                        <Play className="h-4 w-4 mr-2" />
                        Watch
                      </a>
                    </Button>
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <h3 className="font-heading font-bold mb-1">{video.title}</h3>
                      {video.description && (
                        <p className="text-sm text-muted-foreground line-clamp-2">{video.description}</p>
                      )}
                    </div>
                    <GripVertical className="h-5 w-5 text-muted-foreground flex-shrink-0 cursor-move ml-2" />
                  </div>
                  <div className="flex gap-2 pt-3 border-t">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleEdit(video)}
                      className="flex-1"
                      data-testid={`button-edit-video-${index}`}
                    >
                      <Edit className="h-4 w-4 mr-2" />
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleDelete(video.id)}
                      className="text-destructive hover:text-destructive"
                      data-testid={`button-delete-video-${index}`}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))
        )}
      </div>
    </div>
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

  const saveVideoMutation = useMutation({
    mutationFn: (data: InsertVideo & { id?: string }) => {
      if (video?.id) {
        return apiRequest("PATCH", `/api/videos/${video.id}`, data);
      }
      return apiRequest("POST", "/api/videos", data);
    },
    onSuccess: () => {
      toast({
        title: "Saved!",
        description: `Video has been ${video ? "updated" : "added"} successfully.`,
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
    saveVideoMutation.mutate(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Video Title</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="NSN 2024 Highlights"
                  data-testid="input-video-title"
                />
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
                <Input
                  {...field}
                  placeholder="https://www.youtube.com/watch?v=..."
                  data-testid="input-video-youtube-url"
                />
              </FormControl>
              <FormDescription>Full YouTube video URL or embed link</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description (optional)</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  value={field.value || ""}
                  placeholder="A brief description of the video..."
                  rows={3}
                  data-testid="textarea-video-description"
                />
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
              <FormLabel>Thumbnail URL (optional)</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  value={field.value || ""}
                  placeholder="https://example.com/thumbnail.jpg"
                  data-testid="input-video-thumbnail"
                />
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
                  {...field}
                  type="number"
                  onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                  data-testid="input-video-order"
                />
              </FormControl>
              <FormDescription>Lower numbers appear first</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex gap-4 pt-4">
          <Button
            type="submit"
            disabled={saveVideoMutation.isPending}
            className="bg-aurora hover:bg-aurora/90 flex-1"
            data-testid="button-save-video"
          >
            <Save className="mr-2 h-4 w-4" />
            {saveVideoMutation.isPending ? "Saving..." : video ? "Update" : "Add"} Video
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            data-testid="button-cancel-video"
          >
            Cancel
          </Button>
        </div>
      </form>
    </Form>
  );
}
