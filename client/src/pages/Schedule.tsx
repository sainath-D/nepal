import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { Clock, MapPin, Calendar as CalendarIcon, Users, ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import type { ScheduleItem, Judge } from "@shared/types";
import PageHeader from "@/components/PageHeader";

export default function Schedule() {
  const { data: scheduleItems, isLoading: scheduleLoading } = useQuery<ScheduleItem[]>({
    queryKey: ["/api/schedule"],
  });

  const { data: judges, isLoading: judgesLoading } = useQuery<Judge[]>({
    queryKey: ["/api/judges"],
  });

  const groupedSchedule = scheduleItems?.reduce((acc, item) => {
    if (!acc[item.date]) {
      acc[item.date] = [];
    }
    acc[item.date].push(item);
    return acc;
  }, {} as Record<string, ScheduleItem[]>);

  return (
    <div className="min-h-screen bg-background">
      <PageHeader
        badge="Event Timeline"
        title="Event Schedule"
        subtitle="Plan your science fair journey with our detailed timeline"
        icon={<CalendarIcon className="h-4 w-4" />}
      />

      <section className="section-padding bg-background relative overflow-hidden">
        <div className="absolute inset-0 gradient-mesh" />
        <div className="absolute top-0 left-0 w-80 h-80 bg-primary/5 rounded-full blur-[100px]" />
        
        <div className="max-w-4xl mx-auto container-padding relative z-10">
          {scheduleLoading ? (
            <div className="space-y-8">
              {[...Array(3)].map((_, i) => (
                <Card key={i} className="p-8 rounded-2xl">
                  <Skeleton className="h-8 w-48 mb-6" />
                  <Skeleton className="h-32 w-full" />
                </Card>
              ))}
            </div>
          ) : groupedSchedule && Object.keys(groupedSchedule).length > 0 ? (
            <div className="space-y-12">
              {Object.entries(groupedSchedule).map(([date, items], dateIndex) => (
                <motion.div
                  key={date}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: dateIndex * 0.1 }}
                >
                  <div className="flex items-center gap-4 mb-6">
                    <motion.div
                      className="p-3 bg-primary/10 rounded-xl"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                    >
                      <CalendarIcon className="h-6 w-6 text-primary" />
                    </motion.div>
                    <h2 className="text-2xl font-heading font-bold">
                      {new Date(date).toLocaleDateString("en-US", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </h2>
                  </div>
                  
                  <div className="space-y-4 pl-4 border-l-2 border-primary/20">
                    {items.map((item, itemIndex) => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: itemIndex * 0.1 }}
                        whileHover={{ x: 5 }}
                      >
                        <Card className="p-6 card-premium rounded-2xl ml-4 group" data-testid={`card-schedule-${item.id}`}>
                          <div className="absolute left-[-25px] top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-primary border-2 border-white" />
                          
                          <div className="flex flex-col md:flex-row md:items-center gap-4">
                            <div className="flex-1">
                              <h3 className="text-xl font-heading font-bold mb-2 group-hover:text-primary transition-colors" data-testid={`text-schedule-title-${item.id}`}>
                                {item.title}
                              </h3>
                              <p className="text-muted-foreground mb-3">{item.description}</p>
                              <div className="flex flex-wrap items-center gap-4 text-sm">
                                <span className="flex items-center gap-1 text-muted-foreground">
                                  <Clock className="h-4 w-4 text-primary" />
                                  {item.startTime} - {item.endTime}
                                </span>
                                <span className="flex items-center gap-1 text-muted-foreground">
                                  <MapPin className="h-4 w-4 text-primary" />
                                  {item.location}
                                </span>
                              </div>
                            </div>
                            <Badge className="bg-primary/10 text-primary border-primary/20 self-start">
                              {item.type}
                            </Badge>
                          </div>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-20"
            >
              <div className="inline-flex p-6 bg-primary/10 rounded-full mb-6">
                <CalendarIcon className="h-12 w-12 text-primary" />
              </div>
              <h3 className="text-2xl font-heading font-bold mb-4">Schedule Coming Soon</h3>
              <p className="text-muted-foreground max-w-md mx-auto">
                The event schedule will be announced soon. Stay tuned!
              </p>
            </motion.div>
          )}
        </div>
      </section>

      <section className="section-padding bg-gradient-to-b from-background to-muted/30 relative overflow-hidden">
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-[100px]" />
        
        <div className="max-w-7xl mx-auto container-padding relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <motion.div
              className="inline-flex p-4 bg-accent/20 rounded-2xl mb-6"
              whileHover={{ scale: 1.1, rotate: 5 }}
            >
              <Users className="h-10 w-10 text-amber-600" />
            </motion.div>
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
              Meet Our <span className="text-gradient-gold">Judges</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Expert scientists and educators evaluating your projects
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {judgesLoading
              ? [...Array(4)].map((_, i) => (
                  <Card key={i} className="p-6 rounded-2xl">
                    <Skeleton className="h-20 w-20 rounded-full mx-auto mb-4" />
                    <Skeleton className="h-5 w-3/4 mx-auto mb-2" />
                    <Skeleton className="h-4 w-1/2 mx-auto" />
                  </Card>
                ))
              : judges?.map((judge, index) => (
                  <motion.div
                    key={judge.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    whileHover={{ y: -5 }}
                  >
                    <Card className="p-6 text-center card-premium rounded-2xl" data-testid={`card-judge-${judge.id}`}>
                      <motion.div whileHover={{ scale: 1.1 }} className="mb-4">
                        <Avatar className="h-20 w-20 mx-auto border-4 border-primary/20 shadow-lg">
                          <AvatarImage src={judge.image || undefined} alt={judge.name} />
                          <AvatarFallback className="text-lg font-heading bg-gradient-to-br from-primary/10 to-accent/10">
                            {judge.name.split(" ").map((n) => n[0]).join("")}
                          </AvatarFallback>
                        </Avatar>
                      </motion.div>
                      <h3 className="font-heading font-bold mb-1" data-testid={`text-judge-name-${judge.id}`}>
                        {judge.name}
                      </h3>
                      <p className="text-primary text-sm">{judge.expertise}</p>
                    </Card>
                  </motion.div>
                ))}
          </div>
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
              Ready to <span className="text-gradient-cosmic">Participate?</span>
            </h2>
            <p className="text-white/70 max-w-2xl mx-auto mb-10 text-lg">
              Don't miss out on this opportunity to showcase your scientific talent.
            </p>
            
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
              <Link href="/contact">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-primary to-teal-500 hover:from-teal-500 hover:to-primary text-white shadow-2xl shadow-primary/40 px-10 py-6 text-lg font-semibold gap-2"
                >
                  Register Now
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
