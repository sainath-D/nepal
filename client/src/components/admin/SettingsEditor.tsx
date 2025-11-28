import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Save, ExternalLink, Link } from "lucide-react";
import type { SiteSettings } from "@shared/types";

export function SettingsEditor() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  const { data: settings, isLoading, isSuccess } = useQuery<SiteSettings>({
    queryKey: ["/api/site-settings"],
  });

  const updateMutation = useMutation({
    mutationFn: async (data: { registrationLink: string | null }) => {
      const res = await fetch("/api/site-settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed to update settings");
      return res.json() as Promise<SiteSettings>;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/site-settings"] });
      toast({
        title: "Settings saved",
        description: "Your site settings have been updated successfully.",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to save settings. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isSuccess) return;
    
    const formData = new FormData(e.currentTarget);
    const link = (formData.get("registrationLink") as string)?.trim() || null;
    updateMutation.mutate({ registrationLink: link });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-charcoal"></div>
      </div>
    );
  }

  const currentLink = settings?.registrationLink || "";

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-heading font-bold mb-2">Site Settings</h1>
        <p className="text-muted-foreground">Manage navigation buttons, registration links, and global settings</p>
      </div>

      <Card className="p-6 border-2 border-aurora/20 shadow-lg">
        <form onSubmit={handleSubmit}>
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-6 p-4 bg-gradient-to-r from-aurora/10 to-solar/10 rounded-lg border border-aurora/20">
              <div className="p-3 bg-gradient-to-br from-aurora to-solar rounded-lg shadow-md">
                <Link className="h-6 w-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-heading font-bold">Join Us Button Settings</h2>
                <p className="text-sm text-muted-foreground">
                  Control the "Join Us" button in the navigation bar - this is your main registration/signup link
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="registrationLink" className="text-base font-semibold">
                  "Join Us" Button URL
                </Label>
                <Input
                  id="registrationLink"
                  name="registrationLink"
                  type="url"
                  placeholder="https://docs.google.com/forms/d/e/... or any registration link"
                  defaultValue={currentLink}
                  key={currentLink}
                  className="font-mono text-sm h-12"
                />
                <div className="flex items-start gap-2 p-3 bg-blue-50 border border-blue-200 rounded-md">
                  <div className="text-blue-600 mt-0.5">ℹ️</div>
                  <p className="text-xs text-blue-900">
                    <strong>How it works:</strong> When you add a link here, the beautiful gradient "Join Us" button will appear in your website's navigation bar. Users clicking it will be taken to your registration form or signup page.
                  </p>
                </div>
              </div>

              {currentLink && (
                <div className="space-y-2">
                  <div className="flex items-center gap-2 p-4 bg-green-50 rounded-lg border-2 border-green-200">
                    <div className="text-2xl">✅</div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-green-900 mb-1">
                        "Join Us" button is active on your website!
                      </p>
                      <div className="flex items-center gap-2">
                        <ExternalLink className="h-4 w-4 text-green-700" />
                        <a 
                          href={currentLink} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-sm text-green-700 hover:underline truncate"
                        >
                          {currentLink}
                        </a>
                      </div>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground pl-4">
                    Click the link above to test where users will be directed when they click "Join Us"
                  </p>
                </div>
              )}
              {!currentLink && (
                <div className="flex items-center gap-2 p-4 bg-yellow-50 rounded-lg border-2 border-yellow-200">
                  <div className="text-2xl">⚠️</div>
                  <p className="text-sm text-yellow-900">
                    <strong>No link set:</strong> The "Join Us" button is currently hidden from your navigation. Add a registration link above to make it visible to visitors.
                  </p>
                </div>
              )}
            </div>

            <div className="flex justify-end pt-4 border-t">
              <Button 
                type="submit"
                disabled={updateMutation.isPending || !isSuccess}
                className="bg-gradient-to-r from-aurora to-solar hover:from-aurora/90 hover:to-solar/90 text-white font-semibold px-6"
              >
                <Save className="mr-2 h-4 w-4" />
                {updateMutation.isPending ? "Saving..." : "Save & Update Join Us Button"}
              </Button>
            </div>
          </div>
        </form>
      </Card>
    </div>
  );
}
