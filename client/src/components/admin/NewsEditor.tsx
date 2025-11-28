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
  insertNewsSchema,
  type InsertNews,
  type News,
} from "@shared/types";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { Save, Plus, Edit, Trash2, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import { format } from "date-fns";

export function NewsEditor() {
  const { toast } = useToast();
  const [editingNews, setEditingNews] = useState<News | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const { data: news = [], isLoading } = useQuery<News[]>({
    queryKey: ["/api/news"],
  });

  const deleteNewsMutation = useMutation({
    mutationFn: (id: string) => apiRequest("DELETE", `/api/news/${id}`, {}),
    onSuccess: () => {
      toast({
        title: "Deleted!",
        description: "News article has been removed.",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/news"] });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to delete news article. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleEdit = (newsItem: News) => {
    setEditingNews(newsItem);
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this news article?")) {
      deleteNewsMutation.mutate(id);
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
          <h1 className="text-3xl font-heading font-bold mb-2">News & Press</h1>
          <p className="text-muted-foreground">Manage news articles and media coverage</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button
              onClick={() => setEditingNews(null)}
              className="bg-aurora hover:bg-aurora/90"
              data-testid="button-add-news"
            >
              <Plus className="mr-2 h-4 w-4" />
              Add News
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingNews ? "Edit News Article" : "Add News Article"}
              </DialogTitle>
            </DialogHeader>
            <NewsForm
              newsItem={editingNews}
              onClose={() => {
                setIsDialogOpen(false);
                setEditingNews(null);
              }}
            />
          </DialogContent>
        </Dialog>
      </div>

      <div className="space-y-4">
        {news.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            <p>No news articles yet. Click "Add News" to get started.</p>
          </div>
        ) : (
          news.map((newsItem, index) => (
            <motion.div
              key={newsItem.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card className="p-6 hover-elevate">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-heading font-bold text-lg">{newsItem.title}</h3>
                      {newsItem.externalLink && (
                        <a
                          href={newsItem.externalLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-aurora hover:text-aurora/80"
                        >
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">{newsItem.excerpt}</p>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span>{format(new Date(newsItem.publishedAt), "MMM dd, yyyy")}</span>
                      {newsItem.source && <span>Source: {newsItem.source}</span>}
                    </div>
                  </div>
                  <div className="flex gap-2 ml-4">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleEdit(newsItem)}
                      data-testid={`button-edit-news-${index}`}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleDelete(newsItem.id)}
                      className="text-destructive hover:text-destructive"
                      data-testid={`button-delete-news-${index}`}
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

function NewsForm({
  newsItem,
  onClose,
}: {
  newsItem: News | null;
  onClose: () => void;
}) {
  const { toast } = useToast();

  const form = useForm<InsertNews>({
    resolver: zodResolver(insertNewsSchema),
    defaultValues: {
      title: newsItem?.title || "",
      excerpt: newsItem?.excerpt || "",
      content: newsItem?.content || "",
      externalLink: newsItem?.externalLink || "",
      source: newsItem?.source || "",
    },
  });

  const saveNewsMutation = useMutation({
    mutationFn: (data: InsertNews & { id?: string }) => {
      if (newsItem?.id) {
        return apiRequest("PATCH", `/api/news/${newsItem.id}`, data);
      }
      return apiRequest("POST", "/api/news", data);
    },
    onSuccess: () => {
      toast({
        title: "Saved!",
        description: `News article has been ${newsItem ? "updated" : "added"} successfully.`,
      });
      queryClient.invalidateQueries({ queryKey: ["/api/news"] });
      onClose();
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to save news article. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: InsertNews) => {
    saveNewsMutation.mutate(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Article Title</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="NSN Wins National Innovation Award"
                  data-testid="input-news-title"
                />
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
              <FormLabel>Excerpt/Summary</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  placeholder="A brief summary of the news article..."
                  rows={2}
                  data-testid="textarea-news-excerpt"
                />
              </FormControl>
              <FormDescription>Short preview shown in listings</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Content</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  placeholder="Full article content..."
                  rows={8}
                  data-testid="textarea-news-content"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid gap-4 md:grid-cols-2">
          <FormField
            control={form.control}
            name="externalLink"
            render={({ field }) => (
              <FormItem>
                <FormLabel>External Link (optional)</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    value={field.value || ""}
                    placeholder="https://example.com/article"
                    data-testid="input-news-external-link"
                  />
                </FormControl>
                <FormDescription>Link to original article</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="source"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Source (optional)</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    value={field.value || ""}
                    placeholder="The Kathmandu Post"
                    data-testid="input-news-source"
                  />
                </FormControl>
                <FormDescription>Publication or source name</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex gap-4 pt-4">
          <Button
            type="submit"
            disabled={saveNewsMutation.isPending}
            className="bg-aurora hover:bg-aurora/90 flex-1"
            data-testid="button-save-news"
          >
            <Save className="mr-2 h-4 w-4" />
            {saveNewsMutation.isPending ? "Saving..." : newsItem ? "Update" : "Publish"} Article
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            data-testid="button-cancel-news"
          >
            Cancel
          </Button>
        </div>
      </form>
    </Form>
  );
}
