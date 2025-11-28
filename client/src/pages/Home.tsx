import { motion, useScroll, useTransform } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { Sparkles, Users, Award, Calendar, ArrowRight, ChevronDown, Rocket, Lightbulb, Trophy, Atom, Zap, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "wouter";
import type { HomeContent } from "@shared/types";
import { AnimatedCounter } from "@/components/AnimatedCounter";
import { useRef } from "react";

export default function Home() {
  const { data: homeData, isLoading } = useQuery<HomeContent>({
    queryKey: ["/api/home"],
  });

  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const heroY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const stats = [
    { label: "Participants", value: homeData?.participantsCount || 0, icon: Users, gradient: "from-primary to-teal-600" },
    { label: "Projects", value: homeData?.projectsCount || 0, icon: Lightbulb, gradient: "from-accent to-yellow-500" },
    { label: "Years Running", value: homeData?.yearsCount || 0, icon: Calendar, gradient: "from-secondary to-slate-600" },
    { label: "Expert Judges", value: homeData?.judgesCount || 0, icon: Award, gradient: "from-primary to-teal-600" },
  ];

  const features = [
    { 
      icon: Rocket, 
      title: "Launch Your Ideas", 
      description: "Transform your innovative concepts into award-winning science projects",
      gradient: "from-primary/10 to-primary/5",
      iconBg: "bg-primary/10",
      iconColor: "text-primary"
    },
    { 
      icon: Trophy, 
      title: "Compete & Win", 
      description: "Showcase your talent and win prestigious awards and recognition",
      gradient: "from-accent/10 to-accent/5",
      iconBg: "bg-accent/20",
      iconColor: "text-amber-600"
    },
    { 
      icon: Target, 
      title: "Shape The Future", 
      description: "Join a community of young innovators changing the world through science",
      gradient: "from-secondary/10 to-secondary/5",
      iconBg: "bg-secondary/10",
      iconColor: "text-secondary"
    },
  ];

  return (
    <div className="min-h-screen overflow-hidden bg-background">
      <section ref={heroRef} className="relative min-h-screen flex items-center overflow-hidden gradient-hero">
        <div className="absolute inset-0 stars opacity-40" />
        
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-[100px] animate-pulse-slow" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/15 rounded-full blur-[120px] animate-pulse-slow" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[150px]" />
        
        <motion.div 
          style={{ y: heroY, opacity: heroOpacity }}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-32 pb-20"
        >
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="text-left">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="mb-6"
              >
                <motion.div 
                  className="inline-flex items-center gap-2 px-4 py-2 glass rounded-full text-white/90 text-sm font-medium backdrop-blur-xl border border-white/20"
                  whileHover={{ scale: 1.05 }}
                >
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                  >
                    <Sparkles className="h-4 w-4 text-accent" />
                  </motion.div>
                  Nepal's Premier Science Competition
                </motion.div>
              </motion.div>

              {isLoading ? (
                <div className="space-y-4">
                  <Skeleton className="h-16 w-full bg-white/10" />
                  <Skeleton className="h-12 w-3/4 bg-white/10" />
                  <Skeleton className="h-6 w-1/2 bg-white/10" />
                </div>
              ) : (
                <>
                  <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white mb-6 leading-[1.1]"
                  >
                    {homeData?.heroTitle || "Where Young Scientists"}
                    <span className="block text-gradient-cosmic mt-2">Shape Tomorrow</span>
                  </motion.h1>

                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="text-lg md:text-xl text-white/70 mb-8 max-w-xl leading-relaxed"
                  >
                    {homeData?.heroDescription || "Join Nepal's most inspiring science fair where students explore, innovate, and showcase groundbreaking projects across physics, chemistry, biology, robotics, and beyond."}
                  </motion.p>
                </>
              )}

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <Link href="/categories" data-testid="link-explore-categories">
                  <motion.div whileHover={{ scale: 1.03, y: -2 }} whileTap={{ scale: 0.98 }}>
                    <Button
                      size="lg"
                      className="bg-gradient-to-r from-primary to-teal-500 hover:from-teal-500 hover:to-primary text-white shadow-xl shadow-primary/30 hover:shadow-primary/50 transition-all group px-8 py-6 text-base font-semibold w-full sm:w-auto"
                      data-testid="button-explore-categories"
                    >
                      Explore Categories
                      <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </motion.div>
                </Link>
                <Link href="/schedule" data-testid="link-view-schedule">
                  <motion.div whileHover={{ scale: 1.03, y: -2 }} whileTap={{ scale: 0.98 }}>
                    <Button
                      size="lg"
                      variant="outline"
                      className="border-2 border-white/30 text-white hover:bg-white/10 hover:border-white/50 px-8 py-6 text-base backdrop-blur-sm w-full sm:w-auto"
                      data-testid="button-view-schedule"
                    >
                      View Schedule
                    </Button>
                  </motion.div>
                </Link>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="mt-12 flex items-center gap-8"
              >
                {stats.slice(0, 3).map((stat, index) => (
                  <motion.div 
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
                    className="text-center"
                  >
                    <div className="text-3xl md:text-4xl font-heading font-bold text-white">
                      <AnimatedCounter value={stat.value} className="text-white" />+
                    </div>
                    <div className="text-white/60 text-sm font-medium">{stat.label}</div>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9, x: 50 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative hidden lg:block"
            >
              <div className="relative">
                <motion.div 
                  className="absolute -inset-4 bg-gradient-to-r from-primary/30 to-accent/30 rounded-3xl blur-2xl"
                  animate={{ scale: [1, 1.05, 1], opacity: [0.5, 0.7, 0.5] }}
                  transition={{ duration: 4, repeat: Infinity }}
                />
                
                <div className="relative glass rounded-3xl p-8 border border-white/20">
                  <div className="grid grid-cols-2 gap-6">
                    {[
                      { icon: Atom, label: "Physics", color: "text-blue-400" },
                      { icon: Zap, label: "Chemistry", color: "text-green-400" },
                      { icon: Lightbulb, label: "Innovation", color: "text-yellow-400" },
                      { icon: Rocket, label: "Robotics", color: "text-purple-400" },
                    ].map((item, index) => (
                      <motion.div
                        key={item.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                        whileHover={{ scale: 1.05, y: -5 }}
                        className="glass rounded-2xl p-6 text-center border border-white/10 hover:border-white/30 transition-all cursor-pointer"
                      >
                        <motion.div
                          whileHover={{ rotate: [0, -10, 10, 0] }}
                          transition={{ duration: 0.5 }}
                        >
                          <item.icon className={`h-10 w-10 ${item.color} mx-auto mb-3`} />
                        </motion.div>
                        <span className="text-white/80 font-medium text-sm">{item.label}</span>
                      </motion.div>
                    ))}
                  </div>
                  
                  <motion.div 
                    className="mt-6 glass-teal rounded-2xl p-4 border border-primary/30"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.9 }}
                  >
                    <div className="flex items-center gap-4">
                      <div className="bg-primary/20 rounded-full p-3">
                        <Trophy className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <div className="text-white font-semibold">Annual Science Fair</div>
                        <div className="text-white/60 text-sm">Register now for 2025</div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="cursor-pointer"
            onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
          >
            <ChevronDown className="h-8 w-8 text-white/40 hover:text-white/60 transition-colors" />
          </motion.div>
        </motion.div>
      </section>

      <section className="section-padding bg-background relative overflow-hidden">
        <div className="absolute inset-0 gradient-mesh" />
        
        <div className="max-w-7xl mx-auto container-padding relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <motion.span 
              className="inline-block px-4 py-2 bg-primary/10 rounded-full text-primary text-sm font-semibold mb-4 uppercase tracking-wider"
              whileHover={{ scale: 1.05 }}
            >
              Our Impact
            </motion.span>
            <h2 className="text-3xl md:text-5xl font-heading font-bold mb-4">
              Shaping Future <span className="text-gradient-teal">Scientists</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Building a vibrant community of young innovators across Nepal
            </p>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
              >
                <Card className="p-6 md:p-8 text-center card-premium hover:shadow-xl transition-all duration-500 rounded-2xl group">
                  <motion.div
                    className={`inline-flex p-4 bg-gradient-to-br ${stat.gradient} rounded-2xl mb-5 text-white`}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <stat.icon className="h-7 w-7" />
                  </motion.div>
                  
                  <h3 
                    className="text-4xl md:text-5xl font-heading font-bold mb-2 text-foreground" 
                    data-testid={`stat-${stat.label.toLowerCase().replace(/\s+/g, '-')}`}
                  >
                    <AnimatedCounter value={stat.value} />
                    <span className="text-primary">+</span>
                  </h3>
                  <p className="text-muted-foreground font-medium">{stat.label}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-gradient-to-b from-background to-muted/30 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-accent/5 rounded-full blur-[80px]" />
        
        <div className="max-w-7xl mx-auto container-padding relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <motion.span 
              className="inline-block px-4 py-2 bg-accent/20 rounded-full text-amber-700 text-sm font-semibold mb-4 uppercase tracking-wider"
              whileHover={{ scale: 1.05 }}
            >
              Why Join Us
            </motion.span>
            <h2 className="text-3xl md:text-5xl font-heading font-bold mb-4">
              The <span className="text-gradient-gold">NSN</span> Experience
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Empowering the next generation of scientific leaders
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                whileHover={{ y: -10 }}
              >
                <Card className={`p-8 h-full bg-gradient-to-br ${feature.gradient} border-0 shadow-lg hover:shadow-xl transition-all duration-500 rounded-2xl group`}>
                  <motion.div
                    className={`inline-flex p-4 ${feature.iconBg} rounded-2xl mb-6`}
                    whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <feature.icon className={`h-8 w-8 ${feature.iconColor}`} />
                  </motion.div>
                  
                  <h3 className="text-xl font-heading font-bold mb-3 text-foreground">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-secondary relative overflow-hidden">
        <div className="absolute inset-0 stars opacity-20" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[150px]" />
        
        <div className="max-w-4xl mx-auto container-padding relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              className="inline-flex p-4 bg-white/10 rounded-full mb-8"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Rocket className="h-10 w-10 text-accent" />
            </motion.div>
            
            <h2 className="text-3xl md:text-5xl font-heading font-bold mb-6 text-white">
              Ready to Begin Your <span className="text-gradient-cosmic">Journey?</span>
            </h2>
            <p className="text-white/70 max-w-2xl mx-auto mb-10 text-lg">
              Join hundreds of students in showcasing your scientific innovations and help shape the future of Nepal
            </p>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <Link href="/contact" data-testid="link-get-started">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-primary to-teal-500 hover:from-teal-500 hover:to-primary text-white shadow-2xl shadow-primary/40 px-10 py-7 text-lg font-semibold group"
                  data-testid="button-get-started"
                >
                  Get Started Today
                  <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
