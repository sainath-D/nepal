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
import {
  insertFooterContentSchema,
  type InsertFooterContent,
  type FooterContent,
} from "@shared/types";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { Save, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Youtube } from "lucide-react";
import { motion } from "framer-motion";

export function FooterEditor() {
  const { toast } = useToast();

  const { data: footerContent, isLoading } = useQuery<FooterContent>({
    queryKey: ["/api/footer"],
  });

  const form = useForm<InsertFooterContent>({
    resolver: zodResolver(insertFooterContentSchema),
    values: footerContent
      ? {
          email: footerContent.email,
          phone: footerContent.phone,
          address: footerContent.address,
          aboutText: footerContent.aboutText,
          facebookUrl: footerContent.facebookUrl || "",
          twitterUrl: footerContent.twitterUrl || "",
          instagramUrl: footerContent.instagramUrl || "",
          linkedinUrl: footerContent.linkedinUrl || "",
        }
      : undefined,
  });

  const saveMutation = useMutation({
    mutationFn: (data: InsertFooterContent) => apiRequest("POST", "/api/footer", data),
    onSuccess: () => {
      toast({
        title: "Saved!",
        description: "Footer content has been updated successfully.",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/footer"] });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to save changes. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: InsertFooterContent) => {
    saveMutation.mutate(data);
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-32 w-full" />
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-heading font-bold mb-2">Footer Content</h1>
        <p className="text-muted-foreground">Manage footer contact information and social links</p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Card className="p-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <h2 className="text-xl font-heading font-bold mb-4">Contact Information</h2>
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="aboutText"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>About Text</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Brief description about the organization..."
                            rows={3}
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          A short description displayed in the footer
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email Address</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                              type="email"
                              placeholder="contact@example.com"
                              className="pl-10"
                              {...field}
                              value={field.value || ""}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                              placeholder="+977-1-4123456"
                              className="pl-10"
                              {...field}
                              value={field.value || ""}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Address</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            <Textarea
                              placeholder="Physical address of the organization"
                              rows={2}
                              className="pl-10"
                              {...field}
                              value={field.value || ""}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <div className="pt-6 border-t">
                <h2 className="text-xl font-heading font-bold mb-4">Social Media Links</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="facebookUrl"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Facebook URL</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Facebook className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                              placeholder="https://facebook.com/yourpage"
                              className="pl-10"
                              {...field}
                              value={field.value || ""}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="twitterUrl"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Twitter/X URL</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Twitter className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                              placeholder="https://twitter.com/yourhandle"
                              className="pl-10"
                              {...field}
                              value={field.value || ""}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="instagramUrl"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Instagram URL</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Instagram className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                              placeholder="https://instagram.com/yourhandle"
                              className="pl-10"
                              {...field}
                              value={field.value || ""}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="linkedinUrl"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>LinkedIn URL</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Youtube className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                              placeholder="https://linkedin.com/company/yourcompany"
                              className="pl-10"
                              {...field}
                              value={field.value || ""}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-6">
                <Button
                  type="submit"
                  className="bg-aurora hover:bg-aurora/90"
                  disabled={saveMutation.isPending}
                >
                  <Save className="mr-2 h-4 w-4" />
                  {saveMutation.isPending ? "Saving..." : "Save Changes"}
                </Button>
              </div>
            </form>
          </Form>
        </Card>
      </motion.div>
    </div>
  );
}
