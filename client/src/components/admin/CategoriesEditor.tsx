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
  insertCategorySchema,
  type InsertCategory,
  type Category,
} from "@shared/types";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { Save, Plus, Edit, Trash2, GripVertical } from "lucide-react";
import { motion } from "framer-motion";

export function CategoriesEditor() {
  const { toast } = useToast();
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const { data: categories = [], isLoading } = useQuery<Category[]>({
    queryKey: ["/api/categories"],
  });

  const deleteCategoryMutation = useMutation({
    mutationFn: (id: string) => apiRequest("DELETE", `/api/categories/${id}`, {}),
    onSuccess: () => {
      toast({
        title: "Deleted!",
        description: "Category has been removed.",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/categories"] });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to delete category. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleEdit = (category: Category) => {
    setEditingCategory(category);
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this category?")) {
      deleteCategoryMutation.mutate(id);
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-32 w-full" />
        <Skeleton className="h-32 w-full" />
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-heading font-bold mb-2">Science Categories</h1>
          <p className="text-muted-foreground">Manage the competition categories and their details</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button
              onClick={() => setEditingCategory(null)}
              className="bg-aurora hover:bg-aurora/90"
              data-testid="button-add-category"
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Category
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingCategory ? "Edit Category" : "Add Category"}
              </DialogTitle>
            </DialogHeader>
            <CategoryForm
              category={editingCategory}
              onClose={() => {
                setIsDialogOpen(false);
                setEditingCategory(null);
              }}
            />
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {categories.length === 0 ? (
          <div className="col-span-full text-center py-12 text-muted-foreground">
            <p>No categories yet. Click "Add Category" to get started.</p>
          </div>
        ) : (
          categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card className="p-6 hover-elevate h-full">
                <div className="flex items-start justify-between mb-4">
                  <div className="cursor-move text-muted-foreground">
                    <GripVertical className="h-5 w-5" />
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleEdit(category)}
                      data-testid={`button-edit-category-${index}`}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleDelete(category.id)}
                      className="text-destructive hover:text-destructive"
                      data-testid={`button-delete-category-${index}`}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="text-center mb-4">
                  <div
                    className="inline-flex p-4 rounded-lg mb-3"
                    style={{ backgroundColor: `${category.color}20` }}
                  >
                    <span className="text-4xl">{category.icon}</span>
                  </div>
                  <h3 className="font-heading font-bold text-lg mb-2">{category.name}</h3>
                  <p className="text-sm text-muted-foreground">{category.description}</p>
                </div>

                <div className="pt-4 border-t border-border text-xs text-muted-foreground text-center">
                  Order: {category.order}
                </div>
              </Card>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}

function CategoryForm({
  category,
  onClose,
}: {
  category: Category | null;
  onClose: () => void;
}) {
  const { toast } = useToast();

  const form = useForm<InsertCategory>({
    resolver: zodResolver(insertCategorySchema),
    defaultValues: {
      name: category?.name || "",
      description: category?.description || "",
      icon: category?.icon || "",
      color: category?.color || "#3b82f6",
      order: category?.order || 0,
    },
  });

  const saveCategoryMutation = useMutation({
    mutationFn: (data: InsertCategory & { id?: string }) => {
      if (category?.id) {
        return apiRequest("PATCH", `/api/categories/${category.id}`, data);
      }
      return apiRequest("POST", "/api/categories", data);
    },
    onSuccess: () => {
      toast({
        title: "Saved!",
        description: `Category has been ${category ? "updated" : "added"} successfully.`,
      });
      queryClient.invalidateQueries({ queryKey: ["/api/categories"] });
      onClose();
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to save category. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: InsertCategory) => {
    saveCategoryMutation.mutate(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category Name</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Physics & Engineering"
                  data-testid="input-category-name"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  placeholder="Study of matter, energy, forces..."
                  rows={3}
                  data-testid="textarea-category-description"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid gap-4 md:grid-cols-2">
          <FormField
            control={form.control}
            name="icon"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Icon Emoji</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="⚗️"
                    data-testid="input-category-icon"
                  />
                </FormControl>
                <FormDescription>Single emoji character</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="color"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Color</FormLabel>
                <FormControl>
                  <div className="flex gap-2">
                    <Input
                      {...field}
                      type="color"
                      className="w-16 h-10 p-1 cursor-pointer"
                      data-testid="input-category-color"
                    />
                    <Input
                      value={field.value}
                      onChange={(e) => field.onChange(e.target.value)}
                      placeholder="#3b82f6"
                      className="flex-1"
                      data-testid="input-category-color-hex"
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

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
                  data-testid="input-category-order"
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
            disabled={saveCategoryMutation.isPending}
            className="bg-aurora hover:bg-aurora/90 flex-1"
            data-testid="button-save-category"
          >
            <Save className="mr-2 h-4 w-4" />
            {saveCategoryMutation.isPending ? "Saving..." : category ? "Update" : "Add"} Category
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            data-testid="button-cancel-category"
          >
            Cancel
          </Button>
        </div>
      </form>
    </Form>
  );
}
