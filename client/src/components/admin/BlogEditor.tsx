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
  insertBlogPostSchema,
  type InsertBlogPost,
  type BlogPost,
} from "@shared/types";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { Save, Plus, Edit, Trash2, Calendar, User } from "lucide-react";
import { motion } from "framer-motion";
import { format } from "date-fns";

export function BlogEditor() {
  const { toast } = useToast();
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const { data: blogPosts = [], isLoading } = useQuery<BlogPost[]>({
    queryKey: ["/api/blog"],
  });

  const deletePostMutation = useMutation({
    mutationFn: (id: string) => apiRequest("DELETE", `/api/blog/${id}`, {}),
    onSuccess: () => {
      toast({
        title: "Deleted!",
        description: "Blog post has been removed.",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/blog"] });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to delete blog post. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleEdit = (post: BlogPost) => {
    setEditingPost(post);
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this blog post?")) {
      deletePostMutation.mutate(id);
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

  const sortedPosts = [...blogPosts].sort((a, b) => 
    new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-heading font-bold mb-2">Blog Posts</h1>
          <p className="text-muted-foreground">Create and manage blog articles</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button
              onClick={() => setEditingPost(null)}
              className="bg-aurora hover:bg-aurora/90"
              data-testid="button-add-blog-post"
            >
              <Plus className="mr-2 h-4 w-4" />
              New Blog Post
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingPost ? "Edit Blog Post" : "Create Blog Post"}
              </DialogTitle>
            </DialogHeader>
            <BlogForm
              blogPost={editingPost}
              onClose={() => {
                setIsDialogOpen(false);
                setEditingPost(null);
              }}
            />
          </DialogContent>
        </Dialog>
      </div>

      <div className="space-y-4">
        {sortedPosts.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            <p>No blog posts yet. Click "New Blog Post" to get started.</p>
          </div>
        ) : (
          sortedPosts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card className="p-6 hover-elevate">
                <div className="flex gap-4">
                  {post.featuredImage && (
                    <div className="w-48 h-32 rounded-lg overflow-hidden flex-shrink-0">
                      <img
                        src={post.featuredImage}
                        alt={post.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <h3 className="font-heading font-bold text-lg mb-2">{post.title}</h3>
                        <p className="text-muted-foreground text-sm mb-3 line-clamp-2">{post.excerpt}</p>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <User className="h-3 w-3" />
                            {post.author}
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {format(new Date(post.publishedAt), "MMM d, yyyy")}
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2 ml-4">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleEdit(post)}
                          data-testid={`button-edit-blog-${index}`}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleDelete(post.id)}
                          className="text-destructive hover:text-destructive"
                          data-testid={`button-delete-blog-${index}`}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
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

function BlogForm({
  blogPost,
  onClose,
}: {
  blogPost: BlogPost | null;
  onClose: () => void;
}) {
  const { toast } = useToast();

  const form = useForm<InsertBlogPost>({
    resolver: zodResolver(insertBlogPostSchema),
    defaultValues: {
      title: blogPost?.title || "",
      excerpt: blogPost?.excerpt || "",
      content: blogPost?.content || "",
      featuredImage: blogPost?.featuredImage || "",
      author: blogPost?.author || "",
    },
  });

  const saveMutation = useMutation({
    mutationFn: (data: InsertBlogPost) => {
      if (blogPost) {
        return apiRequest("PATCH", `/api/blog/${blogPost.id}`, data);
      }
      return apiRequest("POST", "/api/blog", data);
    },
    onSuccess: () => {
      toast({
        title: "Saved!",
        description: "Blog post has been saved successfully.",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/blog"] });
      onClose();
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to save blog post. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: InsertBlogPost) => {
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
                <Input placeholder="Enter blog post title..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="excerpt"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Excerpt</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Brief summary of the blog post..."
                  rows={2}
                  {...field}
                />
              </FormControl>
              <FormDescription>
                A short preview of the post (1-2 sentences)
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Content</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Write your blog post content here..."
                  rows={10}
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Full blog post content (supports markdown)
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="featuredImage"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Featured Image URL</FormLabel>
              <FormControl>
                <Input
                  placeholder="https://example.com/image.jpg"
                  {...field}
                  value={field.value || ""}
                />
              </FormControl>
              <FormDescription>
                URL of the featured image for this post
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="author"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Author</FormLabel>
              <FormControl>
                <Input placeholder="Author name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex gap-3 pt-4">
          <Button
            type="submit"
            className="bg-aurora hover:bg-aurora/90 flex-1"
            disabled={saveMutation.isPending}
          >
            <Save className="mr-2 h-4 w-4" />
            {saveMutation.isPending ? "Saving..." : "Save Post"}
          </Button>
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
        </div>
      </form>
    </Form>
  );
}
