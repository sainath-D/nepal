import { useQuery, useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "@/components/ui/form";
import { insertHomeContentSchema, type InsertHomeContent, type HomeContent } from "@shared/types";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { Save, Eye } from "lucide-react";
import { motion } from "framer-motion";

export function HomeContentEditor() {
  const { toast } = useToast();
  const { data: homeContent, isLoading } = useQuery<HomeContent>({
    queryKey: ["/api/home"],
  });

  const form = useForm<InsertHomeContent>({
    resolver: zodResolver(insertHomeContentSchema.omit({ updatedAt: true })),
    defaultValues: {
      heroTitle: homeContent?.heroTitle || "",
      heroSubtitle: homeContent?.heroSubtitle || "",
      heroDescription: homeContent?.heroDescription || "",
      participantsCount: homeContent?.participantsCount || 0,
      projectsCount: homeContent?.projectsCount || 0,
      yearsCount: homeContent?.yearsCount || 0,
      judgesCount: homeContent?.judgesCount || 0,
    },
    values: homeContent ? {
      heroTitle: homeContent.heroTitle,
      heroSubtitle: homeContent.heroSubtitle,
      heroDescription: homeContent.heroDescription,
      participantsCount: homeContent.participantsCount,
      projectsCount: homeContent.projectsCount,
      yearsCount: homeContent.yearsCount,
      judgesCount: homeContent.judgesCount,
    } : undefined,
  });

  const mutation = useMutation({
    mutationFn: (data: InsertHomeContent) => apiRequest("POST", "/api/home", data),
    onSuccess: () => {
      toast({
        title: "Saved!",
        description: "Home page content has been updated successfully.",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/home"] });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to save changes. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: InsertHomeContent) => {
    mutation.mutate(data);
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-32 w-full" />
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-heading font-bold mb-2">Home Page Content</h1>
        <p className="text-muted-foreground">Manage your homepage hero section and statistics</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <Card className="p-6">
                <h2 className="text-xl font-heading font-bold mb-4">Hero Section</h2>

                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="heroTitle"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Hero Title</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="Igniting Innovation Through Science"
                            data-testid="input-hero-title"
                          />
                        </FormControl>
                        <FormDescription>Main headline on the homepage</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="heroSubtitle"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Hero Subtitle</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="Empowering Young Minds to Explore, Discover & Transform"
                            data-testid="input-hero-subtitle"
                          />
                        </FormControl>
                        <FormDescription>Supporting headline below the title</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="heroDescription"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Hero Description</FormLabel>
                        <FormControl>
                          <Textarea
                            {...field}
                            placeholder="Join Nepal's premier science fair competition..."
                            rows={4}
                            data-testid="textarea-hero-description"
                          />
                        </FormControl>
                        <FormDescription>Detailed description of the event</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </Card>

              <Card className="p-6">
                <h2 className="text-xl font-heading font-bold mb-4">Impact Statistics</h2>

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="participantsCount"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Participants</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="number"
                            onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                            data-testid="input-participants-count"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="projectsCount"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Projects</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="number"
                            onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                            data-testid="input-projects-count"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="yearsCount"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Years Running</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="number"
                            onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                            data-testid="input-years-count"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="judgesCount"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Expert Judges</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="number"
                            onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                            data-testid="input-judges-count"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </Card>

              <div className="flex gap-4">
                <Button
                  type="submit"
                  disabled={mutation.isPending}
                  className="bg-aurora hover:bg-aurora/90"
                  data-testid="button-save-home-content"
                >
                  <Save className="mr-2 h-4 w-4" />
                  {mutation.isPending ? "Saving..." : "Save Changes"}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => window.open("/", "_blank")}
                  data-testid="button-preview-home"
                >
                  <Eye className="mr-2 h-4 w-4" />
                  Preview
                </Button>
              </div>
            </form>
          </Form>
        </div>

        <div className="lg:col-span-1">
          <Card className="p-6 sticky top-8">
            <h2 className="text-xl font-heading font-bold mb-4">Live Preview</h2>
            <div className="space-y-4 text-sm">
              <motion.div
                key={form.watch("heroTitle")}
                initial={{ opacity: 0.5 }}
                animate={{ opacity: 1 }}
                className="p-4 bg-gradient-to-br from-aurora/10 to-solar/10 rounded-lg"
              >
                <p className="text-xs text-muted-foreground mb-2">Hero Title</p>
                <p className="font-heading font-bold text-lg">{form.watch("heroTitle") || "Title preview"}</p>
              </motion.div>

              <motion.div
                key={form.watch("heroSubtitle")}
                initial={{ opacity: 0.5 }}
                animate={{ opacity: 1 }}
                className="p-4 bg-muted rounded-lg"
              >
                <p className="text-xs text-muted-foreground mb-2">Hero Subtitle</p>
                <p className="font-medium">{form.watch("heroSubtitle") || "Subtitle preview"}</p>
              </motion.div>

              <motion.div
                key={form.watch("heroDescription")}
                initial={{ opacity: 0.5 }}
                animate={{ opacity: 1 }}
                className="p-4 bg-muted rounded-lg"
              >
                <p className="text-xs text-muted-foreground mb-2">Description</p>
                <p className="text-muted-foreground">{form.watch("heroDescription") || "Description preview"}</p>
              </motion.div>

              <div className="grid grid-cols-2 gap-2">
                {[
                  { label: "Participants", value: form.watch("participantsCount") },
                  { label: "Projects", value: form.watch("projectsCount") },
                  { label: "Years", value: form.watch("yearsCount") },
                  { label: "Judges", value: form.watch("judgesCount") },
                ].map((stat) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0.5 }}
                    animate={{ opacity: 1 }}
                    className="p-3 bg-muted rounded-lg text-center"
                  >
                    <p className="text-2xl font-heading font-bold text-aurora">{stat.value}+</p>
                    <p className="text-xs text-muted-foreground">{stat.label}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
