import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { Bell, Pin, AlertCircle, Clock, Megaphone } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import type { Notice } from "@shared/types";
import PageHeader from "@/components/PageHeader";

export default function Notices() {
  const { data: notices, isLoading } = useQuery<Notice[]>({
    queryKey: ["/api/notices"],
  });

  const pinnedNotices = notices?.filter((n) => n.isPinned);
  const regularNotices = notices?.filter((n) => !n.isPinned);

  return (
    <div className="min-h-screen bg-background">
      <PageHeader
        badge="Stay Updated"
        title="Announcements"
        subtitle="Important updates and notices for participants"
        icon={<Megaphone className="h-4 w-4" />}
      />

      {pinnedNotices && pinnedNotices.length > 0 && (
        <section className="py-12 bg-gradient-to-b from-accent/10 to-background relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-accent/10 rounded-full blur-[100px]" />
          
          <div className="max-w-4xl mx-auto container-padding relative z-10">
            <div className="flex items-center gap-3 mb-6">
              <motion.div
                className="p-2 bg-accent/20 rounded-lg"
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Pin className="h-5 w-5 text-amber-600" />
              </motion.div>
              <h2 className="text-xl font-heading font-bold">Pinned Notices</h2>
            </div>
            
            <div className="space-y-4">
              {pinnedNotices.map((notice, index) => (
                <motion.div
                  key={notice.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  whileHover={{ y: -3 }}
                >
                  <Card
                    className={`p-6 rounded-2xl transition-all duration-300 ${
                      notice.isUrgent
                        ? "border-2 border-red-400 bg-red-50"
                        : "bg-gradient-to-r from-accent/10 to-accent/5 border border-accent/20"
                    }`}
                    data-testid={`card-notice-pinned-${notice.id}`}
                  >
                    <div className="flex items-start gap-4">
                      <div className={`p-2 rounded-lg ${notice.isUrgent ? 'bg-red-100' : 'bg-accent/20'}`}>
                        {notice.isUrgent ? (
                          <AlertCircle className="h-5 w-5 text-red-600" />
                        ) : (
                          <Bell className="h-5 w-5 text-amber-600" />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-heading font-bold text-lg" data-testid={`text-notice-title-${notice.id}`}>
                            {notice.title}
                          </h3>
                          {notice.isUrgent && (
                            <Badge className="bg-red-500 text-white">Urgent</Badge>
                          )}
                        </div>
                        <p className="text-muted-foreground mb-3">{notice.content}</p>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Clock className="h-4 w-4" />
                          {new Date(notice.publishedAt).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="section-padding bg-background relative overflow-hidden">
        <div className="absolute inset-0 gradient-mesh" />
        
        <div className="max-w-4xl mx-auto container-padding relative z-10">
          {regularNotices && regularNotices.length > 0 && (
            <div className="flex items-center gap-3 mb-8">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Bell className="h-5 w-5 text-primary" />
              </div>
              <h2 className="text-xl font-heading font-bold">Recent Notices</h2>
            </div>
          )}
          
          <div className="space-y-4">
            {isLoading
              ? [...Array(5)].map((_, i) => (
                  <Card key={i} className="p-6 rounded-2xl">
                    <Skeleton className="h-6 w-3/4 mb-3" />
                    <Skeleton className="h-16 w-full mb-3" />
                    <Skeleton className="h-4 w-32" />
                  </Card>
                ))
              : regularNotices?.map((notice, index) => (
                  <motion.div
                    key={notice.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    whileHover={{ y: -3 }}
                  >
                    <Card className="p-6 card-premium rounded-2xl group" data-testid={`card-notice-${notice.id}`}>
                      <div className="flex items-start gap-4">
                        <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                          <Bell className="h-5 w-5 text-primary" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-heading font-bold text-lg mb-2 group-hover:text-primary transition-colors" data-testid={`text-notice-title-${notice.id}`}>
                            {notice.title}
                          </h3>
                          <p className="text-muted-foreground mb-3">{notice.content}</p>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Clock className="h-4 w-4" />
                            {new Date(notice.publishedAt).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))}
          </div>

          {notices?.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-20"
            >
              <div className="inline-flex p-6 bg-primary/10 rounded-full mb-6">
                <Bell className="h-12 w-12 text-primary" />
              </div>
              <h3 className="text-2xl font-heading font-bold mb-4">No Notices Yet</h3>
              <p className="text-muted-foreground max-w-md mx-auto">
                Check back soon for important announcements and updates.
              </p>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
}
