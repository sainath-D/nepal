import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { Calendar, ExternalLink, Newspaper, TrendingUp } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import type { News } from "@shared/types";
import PageHeader from "@/components/PageHeader";

export default function NewsPage() {
  const { data: newsList, isLoading } = useQuery<News[]>({
    queryKey: ["/api/news"],
  });

  return (
    <div className="min-h-screen bg-background">
      <PageHeader
        badge="Latest Updates"
        title="Science News"
        subtitle="Latest developments and breakthroughs in science and technology"
        icon={<Newspaper className="h-4 w-4" />}
      />

      <section className="section-padding bg-background relative overflow-hidden">
        <div className="absolute inset-0 gradient-mesh" />
        <div className="absolute top-0 left-0 w-80 h-80 bg-primary/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-[100px]" />
        
        <div className="max-w-4xl mx-auto container-padding relative z-10">
          <div className="space-y-6">
            {isLoading
              ? [...Array(5)].map((_, i) => (
                  <Card key={i} className="p-8 rounded-2xl">
                    <Skeleton className="h-6 w-32 mb-4" />
                    <Skeleton className="h-10 w-3/4 mb-4" />
                    <Skeleton className="h-24 w-full mb-4" />
                    <Skeleton className="h-12 w-40" />
                  </Card>
                ))
              : newsList?.map((news, index) => (
                  <motion.div
                    key={news.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ y: -5, x: 5 }}
                  >
                    <Card className="p-8 card-premium rounded-2xl group" data-testid={`card-news-${news.id}`}>
                      <div className="flex flex-col gap-4">
                        <div className="flex flex-wrap items-center gap-3 text-sm">
                          <motion.div whileHover={{ scale: 1.05 }}>
                            <Badge className="bg-accent/20 text-amber-700 border-accent/30 px-3 py-1">
                              <TrendingUp className="h-3 w-3 mr-1.5" />
                              {news.source}
                            </Badge>
                          </motion.div>
                          <span className="flex items-center gap-2 text-muted-foreground">
                            <Calendar className="h-4 w-4" />
                            {new Date(news.publishedAt).toLocaleDateString()}
                          </span>
                        </div>
                        
                        <h3 className="text-xl font-heading font-bold group-hover:text-primary transition-colors" data-testid={`text-news-title-${news.id}`}>
                          {news.title}
                        </h3>
                        
                        <p className="text-muted-foreground leading-relaxed">
                          {news.content}
                        </p>
                        
                        {news.externalLink && (
                          <motion.a
                            href={news.externalLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            data-testid={`link-read-more-${news.id}`}
                          >
                            <Button className="bg-gradient-to-r from-primary to-teal-600 hover:from-teal-600 hover:to-primary text-white rounded-xl gap-2">
                              Read Full Article
                              <ExternalLink className="h-4 w-4" />
                            </Button>
                          </motion.a>
                        )}
                      </div>
                    </Card>
                  </motion.div>
                ))}
          </div>

          {newsList?.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-20"
            >
              <div className="inline-flex p-6 bg-primary/10 rounded-full mb-6">
                <Newspaper className="h-12 w-12 text-primary" />
              </div>
              <h3 className="text-2xl font-heading font-bold mb-4">No News Yet</h3>
              <p className="text-muted-foreground max-w-md mx-auto">
                Stay tuned for the latest science news and updates.
              </p>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
}
