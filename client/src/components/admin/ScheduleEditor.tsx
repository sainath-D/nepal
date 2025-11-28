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
import {
  insertScheduleItemSchema,
  type InsertScheduleItem,
  type ScheduleItem,
} from "@shared/types";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { Save, Plus, Edit, Trash2, Clock, MapPin, Calendar } from "lucide-react";
import { motion } from "framer-motion";
import { format } from "date-fns";

export function ScheduleEditor() {
  const { toast } = useToast();
  const [editingItem, setEditingItem] = useState<ScheduleItem | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const { data: scheduleItems = [], isLoading } = useQuery<ScheduleItem[]>({
    queryKey: ["/api/schedule"],
  });

  const deleteItemMutation = useMutation({
    mutationFn: (id: string) => apiRequest("DELETE", `/api/schedule/${id}`, {}),
    onSuccess: () => {
      toast({
        title: "Deleted!",
        description: "Schedule item has been removed.",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/schedule"] });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to delete schedule item. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleEdit = (item: ScheduleItem) => {
    setEditingItem(item);
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this schedule item?")) {
      deleteItemMutation.mutate(id);
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

  const sortedItems = [...scheduleItems].sort((a, b) => {
    const dateCompare = a.date.localeCompare(b.date);
    if (dateCompare !== 0) return dateCompare;
    return a.startTime.localeCompare(b.startTime);
  });

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-heading font-bold mb-2">Event Schedule</h1>
          <p className="text-muted-foreground">Manage the event timeline and sessions</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button
              onClick={() => setEditingItem(null)}
              className="bg-aurora hover:bg-aurora/90"
              data-testid="button-add-schedule-item"
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Session
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingItem ? "Edit Session" : "Add Session"}
              </DialogTitle>
            </DialogHeader>
            <ScheduleForm
              scheduleItem={editingItem}
              onClose={() => {
                setIsDialogOpen(false);
                setEditingItem(null);
              }}
            />
          </DialogContent>
        </Dialog>
      </div>

      <div className="space-y-4">
        {sortedItems.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            <p>No schedule items yet. Click "Add Session" to get started.</p>
          </div>
        ) : (
          sortedItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card className="p-6 hover-elevate">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-start gap-4">
                      <div className="min-w-[120px]">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                          <Calendar className="h-4 w-4" />
                          {item.date}
                        </div>
                        <div className="flex items-center gap-2 text-sm font-medium">
                          <Clock className="h-4 w-4" />
                          {item.startTime} - {item.endTime}
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="font-heading font-bold text-lg mb-1">{item.title}</h3>
                            <span className="inline-block px-2 py-1 bg-aurora/10 text-aurora text-xs rounded-full mb-2">
                              {item.type}
                            </span>
                          </div>
                        </div>
                        <p className="text-muted-foreground mb-2">{item.description}</p>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <MapPin className="h-4 w-4" />
                          {item.location}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2 ml-4">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleEdit(item)}
                      data-testid={`button-edit-schedule-${index}`}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleDelete(item.id)}
                      className="text-destructive hover:text-destructive"
                      data-testid={`button-delete-schedule-${index}`}
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

function ScheduleForm({
  scheduleItem,
  onClose,
}: {
  scheduleItem: ScheduleItem | null;
  onClose: () => void;
}) {
  const { toast } = useToast();

  const form = useForm<InsertScheduleItem>({
    resolver: zodResolver(insertScheduleItemSchema),
    defaultValues: {
      title: scheduleItem?.title || "",
      description: scheduleItem?.description || "",
      startTime: scheduleItem?.startTime || "",
      endTime: scheduleItem?.endTime || "",
      date: scheduleItem?.date || "",
      location: scheduleItem?.location || "",
      type: scheduleItem?.type || "Session",
    },
  });

  const saveMutation = useMutation({
    mutationFn: (data: InsertScheduleItem) => {
      if (scheduleItem) {
        return apiRequest("PATCH", `/api/schedule/${scheduleItem.id}`, data);
      }
      return apiRequest("POST", "/api/schedule", data);
    },
    onSuccess: () => {
      toast({
        title: "Saved!",
        description: "Schedule item has been saved successfully.",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/schedule"] });
      onClose();
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to save schedule item. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: InsertScheduleItem) => {
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
              <FormLabel>Session Title</FormLabel>
              <FormControl>
                <Input placeholder="Opening Ceremony" {...field} />
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
                  placeholder="Describe what happens during this session..."
                  rows={3}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Date</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Type</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Session">Session</SelectItem>
                    <SelectItem value="Workshop">Workshop</SelectItem>
                    <SelectItem value="Competition">Competition</SelectItem>
                    <SelectItem value="Ceremony">Ceremony</SelectItem>
                    <SelectItem value="Break">Break</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="startTime"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Start Time</FormLabel>
                <FormControl>
                  <Input type="time" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="endTime"
            render={({ field }) => (
              <FormItem>
                <FormLabel>End Time</FormLabel>
                <FormControl>
                  <Input type="time" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Location</FormLabel>
              <FormControl>
                <Input placeholder="Main Auditorium" {...field} />
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
            {saveMutation.isPending ? "Saving..." : "Save Session"}
          </Button>
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
        </div>
      </form>
    </Form>
  );
}
