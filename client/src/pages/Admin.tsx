import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  Home,
  Info,
  Grid3x3,
  CalendarDays,
  FileText,
  Image,
  Newspaper,
  Bell,
  Video,
  Mail,
  Users,
  LogOut,
  SquareStack,
  Settings,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import type { ContactMessage } from "@shared/types";
import { useAuth } from "@/hooks/use-auth";
import { HomeContentEditor } from "@/components/admin/HomeContentEditor";
import { AboutContentEditor } from "@/components/admin/AboutContentEditor";
import { CategoriesEditor } from "@/components/admin/CategoriesEditor";
import { ScheduleEditor } from "@/components/admin/ScheduleEditor";
import { BlogEditor } from "@/components/admin/BlogEditor";
import { GalleryEditor } from "@/components/admin/GalleryEditor";
import { NewsEditor } from "@/components/admin/NewsEditor";
import { NoticesEditor } from "@/components/admin/NoticesEditor";
import { FooterEditor } from "@/components/admin/FooterEditor";
import { UsersEditor } from "@/components/admin/UsersEditor";
import { SettingsEditor } from "@/components/admin/SettingsEditor";
import { VideosEditor } from "@/components/admin/VideosEditor";
import { MessagesEditor } from "@/components/admin/MessagesEditor";

const menuItems = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "settings", label: "Settings", icon: Settings },
  { id: "home", label: "Home Content", icon: Home },
  { id: "about", label: "About Page", icon: Info },
  { id: "categories", label: "Categories", icon: Grid3x3 },
  { id: "schedule", label: "Schedule", icon: CalendarDays },
  { id: "blog", label: "Blog Posts", icon: FileText },
  { id: "gallery", label: "Media Gallery", icon: Image },
  { id: "news", label: "News", icon: Newspaper },
  { id: "notices", label: "Notices", icon: Bell },
  { id: "footer", label: "Footer", icon: SquareStack },
  { id: "messages", label: "Messages", icon: Mail },
  { id: "users", label: "Users", icon: Users },
];

export default function Admin() {
  const [activeSection, setActiveSection] = useState("dashboard");
  const [, setLocation] = useLocation();
  const { user, logoutMutation } = useAuth();

  const { data: messages } = useQuery<ContactMessage[]>({
    queryKey: ["/api/contact-messages"],
  });

  const unreadCount = messages?.filter((m) => !m.isRead).length || 0;

  const handleLogout = () => {
    logoutMutation.mutate(undefined, {
      onSuccess: () => {
        setLocation("/admin/login");
      },
    });
  };

  return (
    <div className="min-h-screen bg-background pt-16">
      <div className="flex h-[calc(100vh-4rem)]">
        <aside className="w-64 bg-card border-r border-border flex flex-col">
          <div className="p-6">
            <h2 className="text-xl font-heading font-bold">Admin Panel</h2>
            <p className="text-sm text-muted-foreground">NSN Science Fair</p>
          </div>

          <Separator />

          <nav className="flex-1 overflow-y-auto p-4">
            <div className="space-y-1">
              {menuItems.map((item) => (
                <motion.div key={item.id} whileHover={{ x: 4 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    variant={activeSection === item.id ? "secondary" : "ghost"}
                    className={`w-full justify-start ${
                      activeSection === item.id ? "bg-aurora/10 text-aurora" : ""
                    }`}
                    onClick={() => setActiveSection(item.id)}
                    data-testid={`button-admin-nav-${item.id}`}
                  >
                    <item.icon className="mr-3 h-4 w-4" />
                    {item.label}
                    {item.id === "messages" && unreadCount > 0 && (
                      <Badge className="ml-auto bg-aurora text-white">{unreadCount}</Badge>
                    )}
                  </Button>
                </motion.div>
              ))}
            </div>
          </nav>

          <Separator />

          <div className="p-4">
            <div className="mb-3 px-2">
              <p className="text-xs text-muted-foreground">Logged in as</p>
              <p className="text-sm font-semibold truncate">{user?.username}</p>
            </div>
            <Button 
              variant="ghost" 
              className="w-full justify-start text-destructive hover:text-destructive hover:bg-destructive/10"
              onClick={handleLogout}
              disabled={logoutMutation.isPending}
              data-testid="button-logout"
            >
              <LogOut className="mr-3 h-4 w-4" />
              {logoutMutation.isPending ? "Logging out..." : "Logout"}
            </Button>
          </div>
        </aside>

        <main className="flex-1 overflow-y-auto">
          <div className="p-8">
            <motion.div
              key={activeSection}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {activeSection === "dashboard" && <DashboardOverview />}
              {activeSection === "settings" && <SettingsEditor />}
              {activeSection === "home" && <HomeContentEditor />}
              {activeSection === "about" && <AboutContentEditor />}
              {activeSection === "categories" && <CategoriesEditor />}
              {activeSection === "schedule" && <ScheduleEditor />}
              {activeSection === "blog" && <BlogEditor />}
              {activeSection === "gallery" && <GalleryEditor />}
              {activeSection === "news" && <NewsEditor />}
              {activeSection === "notices" && <NoticesEditor />}
              {activeSection === "videos" && <VideosEditor />}
              {activeSection === "messages" && <MessagesEditor />}
              {activeSection === "users" && <UsersEditor />}
              {activeSection === "footer" && <FooterEditor />}
            </motion.div>
          </div>
        </main>
      </div>
    </div>
  );
}

function DashboardOverview() {
  const stats = [
    { label: "Total Blog Posts", value: "12", icon: FileText, color: "text-aurora" },
    { label: "Gallery Images", value: "48", icon: Image, color: "text-solar" },
    { label: "Pending Messages", value: "5", icon: Mail, color: "text-aurora" },
    { label: "Active Categories", value: "6", icon: Grid3x3, color: "text-solar" },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-heading font-bold mb-2">Dashboard Overview</h1>
        <p className="text-muted-foreground">Welcome back! Here's what's happening</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className="p-6 hover-elevate active-elevate-2">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
                  <h3 className={`text-3xl font-heading font-bold ${stat.color}`}>{stat.value}</h3>
                </div>
                <div className={`p-3 bg-gradient-to-br from-aurora/10 to-solar/10 rounded-lg`}>
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      <Card className="p-6">
        <h2 className="text-xl font-heading font-bold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Button 
            className="bg-aurora hover:bg-aurora/90"
            data-testid="button-new-blog-post"
          >
            <FileText className="mr-2 h-4 w-4" />
            New Blog Post
          </Button>
          <Button 
            variant="outline"
            data-testid="button-create-notice"
          >
            <Bell className="mr-2 h-4 w-4" />
            Create Notice
          </Button>
          <Button 
            variant="outline"
            data-testid="button-upload-images"
          >
            <Image className="mr-2 h-4 w-4" />
            Upload Images
          </Button>
        </div>
      </Card>
    </div>
  );
}

function MessagesPanel({ messages }: { messages?: ContactMessage[] }) {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-heading font-bold mb-2">Contact Messages</h1>
        <p className="text-muted-foreground">Manage inquiries and communications</p>
      </div>

      <div className="space-y-4">
        {messages?.map((message) => (
          <Card
            key={message.id}
            className={`p-6 ${!message.isRead ? "border-2 border-aurora/30" : ""}`}
            data-testid={`card-message-${message.id}`}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="font-heading font-bold text-lg">{message.name}</h3>
                  {!message.isRead && <Badge className="bg-aurora text-white">New</Badge>}
                </div>
                <p className="text-sm text-muted-foreground mb-1">{message.email}</p>
                <p className="text-sm text-muted-foreground">
                  {new Date(message.createdAt).toLocaleString()}
                </p>
              </div>
            </div>
            <h4 className="font-semibold mb-2">{message.subject}</h4>
            <p className="text-foreground leading-relaxed whitespace-pre-wrap">{message.message}</p>
          </Card>
        ))}
        {(!messages || messages.length === 0) && (
          <Card className="p-12 text-center">
            <Mail className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No messages yet</p>
          </Card>
        )}
      </div>
    </div>
  );
}
