import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { Atom, FlaskConical, Leaf, Code, Bot, Recycle, ArrowRight, Lightbulb } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import type { Category } from "@shared/types";
import PageHeader from "@/components/PageHeader";

const iconMap: Record<string, any> = {
  atom: Atom,
  flask: FlaskConical,
  leaf: Leaf,
  code: Code,
  bot: Bot,
  recycle: Recycle,
};

const colorMap: Record<string, { bg: string; text: string; gradient: string }> = {
  atom: { bg: "bg-blue-500/10", text: "text-blue-600", gradient: "from-blue-500/10 to-blue-600/5" },
  flask: { bg: "bg-purple-500/10", text: "text-purple-600", gradient: "from-purple-500/10 to-purple-600/5" },
  leaf: { bg: "bg-green-500/10", text: "text-green-600", gradient: "from-green-500/10 to-green-600/5" },
  code: { bg: "bg-orange-500/10", text: "text-orange-600", gradient: "from-orange-500/10 to-orange-600/5" },
  bot: { bg: "bg-cyan-500/10", text: "text-cyan-600", gradient: "from-cyan-500/10 to-cyan-600/5" },
  recycle: { bg: "bg-emerald-500/10", text: "text-emerald-600", gradient: "from-emerald-500/10 to-emerald-600/5" },
};

export default function Categories() {
  const { data: categories, isLoading } = useQuery<Category[]>({
    queryKey: ["/api/categories"],
  });

  return (
    <div className="min-h-screen bg-background">
      <PageHeader
        badge="Explore Fields"
        title="Science Categories"
        subtitle="Explore diverse fields of scientific innovation and discovery"
        icon={<Lightbulb className="h-4 w-4" />}
      />

      <section className="section-padding bg-background relative overflow-hidden">
        <div className="absolute inset-0 gradient-mesh" />
        <div className="absolute top-0 left-0 w-80 h-80 bg-primary/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-[100px]" />
        
        <div className="max-w-7xl mx-auto container-padding relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {isLoading
              ? [...Array(6)].map((_, i) => (
                  <Card key={i} className="p-10 rounded-2xl">
                    <Skeleton className="h-20 w-20 mx-auto mb-8 rounded-2xl" />
                    <Skeleton className="h-8 w-3/4 mx-auto mb-4" />
                    <Skeleton className="h-24 w-full" />
                  </Card>
                ))
              : categories?.map((category, index) => {
                  const IconComponent = iconMap[category.icon] || Atom;
                  const colors = colorMap[category.icon] || colorMap.atom;
                  return (
                    <motion.div
                      key={category.id}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      whileHover={{ y: -10, scale: 1.02 }}
                    >
                      <Card
                        className={`p-8 text-center cursor-pointer bg-gradient-to-br ${colors.gradient} border-0 shadow-lg hover:shadow-xl group relative overflow-hidden h-full transition-all duration-500 rounded-2xl`}
                        data-testid={`card-category-${category.id}`}
                      >
                        <motion.div
                          className={`inline-flex p-5 ${colors.bg} rounded-2xl mb-6`}
                          whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
                          transition={{ duration: 0.5 }}
                        >
                          <IconComponent className={`h-12 w-12 ${colors.text}`} />
                        </motion.div>
                        
                        <h3 className="text-xl font-heading font-bold mb-3" data-testid={`text-category-name-${category.id}`}>
                          {category.name}
                        </h3>
                        <p className="text-muted-foreground leading-relaxed mb-6">
                          {category.description}
                        </p>
                        
                        <Link href="/contact" data-testid={`link-learn-more-${category.id}`}>
                          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <Button
                              variant="ghost"
                              className={`${colors.text} hover:bg-white/50 gap-2 font-semibold`}
                            >
                              Learn More
                              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                            </Button>
                          </motion.div>
                        </Link>
                      </Card>
                    </motion.div>
                  );
                })}
          </div>

          {categories?.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-20"
            >
              <div className="inline-flex p-6 bg-primary/10 rounded-full mb-6">
                <Lightbulb className="h-12 w-12 text-primary" />
              </div>
              <h3 className="text-2xl font-heading font-bold mb-4">Categories Coming Soon</h3>
              <p className="text-muted-foreground max-w-md mx-auto">
                We're preparing exciting science categories. Check back soon!
              </p>
            </motion.div>
          )}
        </div>
      </section>

      <section className="section-padding bg-secondary relative overflow-hidden">
        <div className="absolute inset-0 stars opacity-20" />
        
        <div className="max-w-4xl mx-auto container-padding relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-6">
              Ready to Start Your <span className="text-gradient-cosmic">Project?</span>
            </h2>
            <p className="text-white/70 max-w-2xl mx-auto mb-10 text-lg">
              Choose your category and begin your journey into the exciting world of science and innovation.
            </p>
            
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
              <Link href="/contact">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-primary to-teal-500 hover:from-teal-500 hover:to-primary text-white shadow-2xl shadow-primary/40 px-10 py-6 text-lg font-semibold gap-2"
                >
                  Get Started
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
