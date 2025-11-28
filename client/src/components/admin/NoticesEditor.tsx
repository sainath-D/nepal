import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
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
  insertNoticeSchema,
  type InsertNotice,
  type Notice,
} from "@shared/types";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { Save, Plus, Edit, Trash2, Pin, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";
import { format } from "date-fns";

export function NoticesEditor() {
  const { toast } = useToast();
  const [editingNotice, setEditingNotice] = useState<Notice | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const { data: notices = [], isLoading } = useQuery<Notice[]>({
    queryKey: ["/api/notices"],
  });

  const deleteNoticeMutation = useMutation({
    mutationFn: (id: string) => apiRequest("DELETE", `/api/notices/${id}`, {}),
    onSuccess: () => {
      toast({
        title: "Deleted!",
        description: "Notice has been removed.",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/notices"] });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to delete notice. Please try again.",
        variant: "destructive",
      });
    },
  });

  const togglePinMutation = useMutation({
    mutationFn: ({ id, isPinned }: { id: string; isPinned: boolean }) =>
      apiRequest("PATCH", `/api/notices/${id}`, { isPinned }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/notices"] });
    },
  });

  const handleEdit = (notice: Notice) => {
    setEditingNotice(notice);
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this notice?")) {
      deleteNoticeMutation.mutate(id);
    }
  };

  const handleTogglePin = (notice: Notice) => {
    togglePinMutation.mutate({ id: notice.id, isPinned: !notice.isPinned });
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-32 w-full" />
      </div>
    );
  }

  const sortedNotices = [...notices].sort((a, b) => {
    if (a.isPinned && !b.isPinned) return -1;
    if (!a.isPinned && b.isPinned) return 1;
    return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
  });

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-heading font-bold mb-2">Notices</h1>
          <p className="text-muted-foreground">Manage announcements and important updates</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button
              onClick={() => setEditingNotice(null)}
              className="bg-aurora hover:bg-aurora/90"
              data-testid="button-add-notice"
            >
              <Plus className="mr-2 h-4 w-4" />
              New Notice
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingNotice ? "Edit Notice" : "Create Notice"}
              </DialogTitle>
            </DialogHeader>
            <NoticeForm
              notice={editingNotice}
              onClose={() => {
                setIsDialogOpen(false);
                setEditingNotice(null);
              }}
            />
          </DialogContent>
        </Dialog>
      </div>

      <div className="space-y-4">
        {sortedNotices.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            <p>No notices yet. Click "New Notice" to get started.</p>
          </div>
        ) : (
          sortedNotices.map((notice, index) => (
            <motion.div
              key={notice.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card
                className={`p-6 hover-elevate ${
                  notice.isUrgent ? "border-2 border-solar/50 bg-solar/5" : ""
                } ${notice.isPinned ? "border-aurora/50" : ""}`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-start gap-2 mb-3">
                      {notice.isPinned && (
                        <Pin className="h-5 w-5 text-aurora flex-shrink-0 mt-1" />
                      )}
                      {notice.isUrgent && (
                        <AlertCircle className="h-5 w-5 text-solar flex-shrink-0 mt-1" />
                      )}
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-heading font-bold text-lg">{notice.title}</h3>
                          {notice.isPinned && (
                            <Badge className="bg-aurora">Pinned</Badge>
                          )}
                          {notice.isUrgent && (
                            <Badge className="bg-solar">Urgent</Badge>
                          )}
                        </div>
                        <p className="text-muted-foreground whitespace-pre-wrap">{notice.content}</p>
                        <p className="text-xs text-muted-foreground mt-2">
                          Published {format(new Date(notice.publishedAt), "MMM d, yyyy 'at' h:mm a")}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2 ml-4">
                    <Button
                      size="sm"
                      variant={notice.isPinned ? "default" : "outline"}
                      onClick={() => handleTogglePin(notice)}
                      title={notice.isPinned ? "Unpin" : "Pin"}
                    >
                      <Pin className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleEdit(notice)}
                      data-testid={`button-edit-notice-${index}`}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleDelete(notice.id)}
                      className="text-destructive hover:text-destructive"
                      data-testid={`button-delete-notice-${index}`}
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

function NoticeForm({
  notice,
  onClose,
}: {
  notice: Notice | null;
  onClose: () => void;
}) {
  const { toast } = useToast();

  const form = useForm<InsertNotice>({
    resolver: zodResolver(insertNoticeSchema),
    defaultValues: {
      title: notice?.title || "",
      content: notice?.content || "",
      isPinned: notice?.isPinned || false,
      isUrgent: notice?.isUrgent || false,
    },
  });

  const saveMutation = useMutation({
    mutationFn: (data: InsertNotice) => {
      if (notice) {
        return apiRequest("PATCH", `/api/notices/${notice.id}`, data);
      }
      return apiRequest("POST", "/api/notices", data);
    },
    onSuccess: () => {
      toast({
        title: "Saved!",
        description: "Notice has been saved successfully.",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/notices"] });
      onClose();
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to save notice. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: InsertNotice) => {
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
                <Input placeholder="Enter notice title..." {...field} />
              </FormControl>
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
                  placeholder="Write the notice content..."
                  rows={6}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="isPinned"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <FormLabel className="text-base">Pin Notice</FormLabel>
                  <FormDescription>
                    Show at the top of the list
                  </FormDescription>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="isUrgent"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <FormLabel className="text-base">Mark Urgent</FormLabel>
                  <FormDescription>
                    Highlight with special styling
                  </FormDescription>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>

        <div className="flex gap-3 pt-4">
          <Button
            type="submit"
            className="bg-aurora hover:bg-aurora/90 flex-1"
            disabled={saveMutation.isPending}
          >
            <Save className="mr-2 h-4 w-4" />
            {saveMutation.isPending ? "Saving..." : "Save Notice"}
          </Button>
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
        </div>
      </form>
    </Form>
  );
}
