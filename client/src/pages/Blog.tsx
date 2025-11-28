import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { Calendar, User, ArrowRight, BookOpen } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "wouter";
import type { BlogPost } from "@shared/types";
import PageHeader from "@/components/PageHeader";

export default function Blog() {
  const { data: blogPosts, isLoading } = useQuery<BlogPost[]>({
    queryKey: ["/api/blog"],
  });

  return (
    <div className="min-h-screen bg-background">
      <PageHeader
        badge="Our Stories"
        title="Blog & Articles"
        subtitle="Stories, insights, and updates from the NSN community"
        icon={<BookOpen className="h-4 w-4" />}
      />

      <section className="section-padding bg-background relative overflow-hidden">
        <div className="absolute inset-0 gradient-mesh" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-[100px]" />
        
        <div className="max-w-7xl mx-auto container-padding relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {isLoading
              ? [...Array(6)].map((_, i) => (
                  <Card key={i} className="overflow-hidden rounded-2xl">
                    <Skeleton className="h-56 w-full" />
                    <div className="p-6 space-y-4">
                      <Skeleton className="h-6 w-3/4" />
                      <Skeleton className="h-20 w-full" />
                      <Skeleton className="h-10 w-full" />
                    </div>
                  </Card>
                ))
              : blogPosts?.map((post, index) => (
                  <motion.div
                    key={post.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ y: -8 }}
                  >
                    <Card className="overflow-hidden h-full flex flex-col card-premium rounded-2xl group" data-testid={`card-blog-${post.id}`}>
                      {post.featuredImage && (
                        <div className="relative h-52 bg-gradient-to-br from-primary/10 to-accent/10 overflow-hidden">
                          <motion.img
                            src={post.featuredImage}
                            alt={post.title}
                            className="w-full h-full object-cover"
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 0.4 }}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-secondary/80 via-secondary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                          <motion.div
                            className="absolute bottom-4 left-4 right-4"
                            initial={{ opacity: 0, y: 10 }}
                            whileHover={{ opacity: 1, y: 0 }}
                          >
                            <div className="flex items-center gap-2 text-sm text-white/90">
                              <span className="flex items-center gap-1 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                                <User className="h-3 w-3" />
                                {post.author}
                              </span>
                              <span className="flex items-center gap-1 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                                <Calendar className="h-3 w-3" />
                                {new Date(post.publishedAt).toLocaleDateString()}
                              </span>
                            </div>
                          </motion.div>
                        </div>
                      )}
                      <div className="p-6 flex-1 flex flex-col">
                        <h3 className="text-xl font-heading font-bold mb-3 line-clamp-2 group-hover:text-primary transition-colors" data-testid={`text-blog-title-${post.id}`}>
                          {post.title}
                        </h3>
                        <p className="text-muted-foreground line-clamp-3 mb-6 flex-1">
                          {post.excerpt}
                        </p>
                        <Link href={`/blog/${post.id}`} data-testid={`link-read-blog-${post.id}`}>
                          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                            <Button className="w-full bg-gradient-to-r from-primary to-teal-600 hover:from-teal-600 hover:to-primary text-white rounded-xl gap-2">
                              Read More
                              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                            </Button>
                          </motion.div>
                        </Link>
                      </div>
                    </Card>
                  </motion.div>
                ))}
          </div>

          {blogPosts?.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-20"
            >
              <div className="inline-flex p-6 bg-primary/10 rounded-full mb-6">
                <BookOpen className="h-12 w-12 text-primary" />
              </div>
              <h3 className="text-2xl font-heading font-bold mb-4">No Posts Yet</h3>
              <p className="text-muted-foreground max-w-md mx-auto">
                Stay tuned! We're working on bringing you amazing content about science and innovation.
              </p>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
}
