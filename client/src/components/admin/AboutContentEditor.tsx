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
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import {
  insertAboutContentSchema,
  insertBoardMemberSchema,
  type InsertAboutContent,
  type InsertBoardMember,
  type AboutContent,
  type BoardMember,
} from "@shared/types";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { Save, Plus, Edit, Trash2, GripVertical } from "lucide-react";
import { motion } from "framer-motion";

export function AboutContentEditor() {
  const { toast } = useToast();
  const [editingMember, setEditingMember] = useState<BoardMember | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const { data: aboutContent, isLoading: isLoadingAbout } = useQuery<AboutContent>({
    queryKey: ["/api/about"],
  });

  const { data: boardMembers = [], isLoading: isLoadingMembers } = useQuery<BoardMember[]>({
    queryKey: ["/api/board-members"],
  });

  const aboutForm = useForm<InsertAboutContent>({
    resolver: zodResolver(insertAboutContentSchema),
    values: aboutContent
      ? {
          mission: aboutContent.mission,
          vision: aboutContent.vision,
          founderName: aboutContent.founderName,
          founderBio: aboutContent.founderBio,
          founderImage: aboutContent.founderImage || "",
          historyContent: aboutContent.historyContent,
        }
      : undefined,
  });

  const saveAboutMutation = useMutation({
    mutationFn: (data: InsertAboutContent) => apiRequest("POST", "/api/about", data),
    onSuccess: () => {
      toast({
        title: "Saved!",
        description: "About page content has been updated successfully.",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/about"] });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to save changes. Please try again.",
        variant: "destructive",
      });
    },
  });

  const deleteMemberMutation = useMutation({
    mutationFn: (id: string) => apiRequest("DELETE", `/api/board-members/${id}`, {}),
    onSuccess: () => {
      toast({
        title: "Deleted!",
        description: "Board member has been removed.",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/board-members"] });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to delete board member. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onSubmitAbout = (data: InsertAboutContent) => {
    saveAboutMutation.mutate(data);
  };

  const handleEdit = (member: BoardMember) => {
    setEditingMember(member);
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this board member?")) {
      deleteMemberMutation.mutate(id);
    }
  };

  if (isLoadingAbout || isLoadingMembers) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-32 w-full" />
        <Skeleton className="h-32 w-full" />
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-heading font-bold mb-2">About Page Content</h1>
        <p className="text-muted-foreground">Manage your organization's mission, vision, and leadership team</p>
      </div>

      <div className="space-y-8">
        <Form {...aboutForm}>
          <form onSubmit={aboutForm.handleSubmit(onSubmitAbout)} className="space-y-6">
            <Card className="p-6">
              <h2 className="text-xl font-heading font-bold mb-4">Mission & Vision</h2>
              <div className="grid gap-4 md:grid-cols-2">
                <FormField
                  control={aboutForm.control}
                  name="mission"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Mission Statement</FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          placeholder="Our mission is to..."
                          rows={6}
                          data-testid="textarea-mission"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={aboutForm.control}
                  name="vision"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Vision Statement</FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          placeholder="We envision a future where..."
                          rows={6}
                          data-testid="textarea-vision"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </Card>

            <Card className="p-6">
              <h2 className="text-xl font-heading font-bold mb-4">Founder Information</h2>
              <div className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <FormField
                    control={aboutForm.control}
                    name="founderName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Founder Name</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="Dr. John Doe"
                            data-testid="input-founder-name"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={aboutForm.control}
                    name="founderImage"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Founder Image URL (optional)</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            value={field.value || ""}
                            placeholder="https://example.com/image.jpg"
                            data-testid="input-founder-image"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={aboutForm.control}
                  name="founderBio"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Founder Biography</FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          placeholder="Dr. John Doe is a renowned scientist..."
                          rows={4}
                          data-testid="textarea-founder-bio"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </Card>

            <Card className="p-6">
              <h2 className="text-xl font-heading font-bold mb-4">History & Background</h2>
              <FormField
                control={aboutForm.control}
                name="historyContent"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Organization History</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        placeholder="Founded in 2015, Nepal Science Navigators..."
                        rows={8}
                        data-testid="textarea-history"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </Card>

            <Button
              type="submit"
              disabled={saveAboutMutation.isPending}
              className="bg-aurora hover:bg-aurora/90"
              data-testid="button-save-about-content"
            >
              <Save className="mr-2 h-4 w-4" />
              {saveAboutMutation.isPending ? "Saving..." : "Save About Content"}
            </Button>
          </form>
        </Form>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-heading font-bold">Board of Directors</h2>
              <p className="text-sm text-muted-foreground">Manage your leadership team</p>
            </div>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button
                  onClick={() => setEditingMember(null)}
                  className="bg-aurora hover:bg-aurora/90"
                  data-testid="button-add-board-member"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Add Member
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>
                    {editingMember ? "Edit Board Member" : "Add Board Member"}
                  </DialogTitle>
                </DialogHeader>
                <BoardMemberForm
                  member={editingMember}
                  onClose={() => {
                    setIsDialogOpen(false);
                    setEditingMember(null);
                  }}
                />
              </DialogContent>
            </Dialog>
          </div>

          <div className="space-y-4">
            {boardMembers.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                <p>No board members yet. Click "Add Member" to get started.</p>
              </div>
            ) : (
              boardMembers.map((member, index) => (
                <motion.div
                  key={member.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Card className="p-4 hover-elevate">
                    <div className="flex items-center gap-4">
                      <div className="cursor-move text-muted-foreground">
                        <GripVertical className="h-5 w-5" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-heading font-bold">{member.name}</h3>
                        <p className="text-sm text-muted-foreground">{member.position}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleEdit(member)}
                          data-testid={`button-edit-board-member-${index}`}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleDelete(member.id)}
                          className="text-destructive hover:text-destructive"
                          data-testid={`button-delete-board-member-${index}`}
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
        </Card>
      </div>
    </div>
  );
}

function BoardMemberForm({
  member,
  onClose,
}: {
  member: BoardMember | null;
  onClose: () => void;
}) {
  const { toast } = useToast();

  const form = useForm<InsertBoardMember>({
    resolver: zodResolver(insertBoardMemberSchema),
    defaultValues: {
      name: member?.name || "",
      position: member?.position || "",
      bio: member?.bio || "",
      image: member?.image || "",
      order: member?.order || 0,
    },
  });

  const saveMemberMutation = useMutation({
    mutationFn: (data: InsertBoardMember & { id?: string }) => {
      if (member?.id) {
        return apiRequest("PATCH", `/api/board-members/${member.id}`, data);
      }
      return apiRequest("POST", "/api/board-members", data);
    },
    onSuccess: () => {
      toast({
        title: "Saved!",
        description: `Board member has been ${member ? "updated" : "added"} successfully.`,
      });
      queryClient.invalidateQueries({ queryKey: ["/api/board-members"] });
      onClose();
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to save board member. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: InsertBoardMember) => {
    saveMemberMutation.mutate(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Jane Smith"
                  data-testid="input-member-name"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="position"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Position/Title</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Director of Programs"
                  data-testid="input-member-position"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Biography</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  placeholder="Jane has extensive experience in..."
                  rows={4}
                  data-testid="textarea-member-bio"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Image URL (optional)</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  value={field.value || ""}
                  placeholder="https://example.com/profile.jpg"
                  data-testid="input-member-image"
                />
              </FormControl>
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
                  data-testid="input-member-order"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex gap-4 pt-4">
          <Button
            type="submit"
            disabled={saveMemberMutation.isPending}
            className="bg-aurora hover:bg-aurora/90 flex-1"
            data-testid="button-save-board-member"
          >
            <Save className="mr-2 h-4 w-4" />
            {saveMemberMutation.isPending ? "Saving..." : member ? "Update" : "Add"} Member
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            data-testid="button-cancel-board-member"
          >
            Cancel
          </Button>
        </div>
      </form>
    </Form>
  );
}
