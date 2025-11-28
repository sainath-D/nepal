import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { Target, Eye, History, Users, Info } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import type { AboutContent, BoardMember } from "@shared/types";
import PageHeader from "@/components/PageHeader";

export default function About() {
  const { data: aboutData, isLoading: aboutLoading } = useQuery<AboutContent>({
    queryKey: ["/api/about"],
  });

  const { data: boardMembers, isLoading: boardLoading } = useQuery<BoardMember[]>({
    queryKey: ["/api/board-members"],
  });

  return (
    <div className="min-h-screen bg-background">
      <PageHeader
        badge="About Us"
        title="About NSN"
        subtitle="Building the next generation of scientific leaders in Nepal"
        icon={<Info className="h-4 w-4" />}
      />

      <section className="section-padding bg-background relative overflow-hidden">
        <div className="absolute inset-0 gradient-mesh" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-[100px]" />
        
        <div className="max-w-7xl mx-auto container-padding relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { icon: Target, title: "Mission", key: "mission", gradient: "from-primary/10 to-primary/5", iconBg: "bg-primary/10", iconColor: "text-primary" },
              { icon: Eye, title: "Vision", key: "vision", gradient: "from-accent/10 to-accent/5", iconBg: "bg-accent/20", iconColor: "text-amber-600" },
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -8 }}
              >
                <Card className={`p-8 md:p-10 h-full bg-gradient-to-br ${item.gradient} border-0 shadow-lg hover:shadow-xl transition-all duration-500 rounded-2xl`}>
                  <motion.div
                    className={`inline-flex p-4 ${item.iconBg} rounded-2xl mb-6`}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                  >
                    <item.icon className={`h-8 w-8 ${item.iconColor}`} />
                  </motion.div>
                  <h2 className="text-2xl font-heading font-bold mb-4">{item.title}</h2>
                  {aboutLoading ? (
                    <Skeleton className="h-24 w-full" />
                  ) : (
                    <p className="text-muted-foreground leading-relaxed text-lg" data-testid={`text-${item.key}`}>
                      {aboutData?.[item.key as keyof AboutContent] as string ||
                        `Our ${item.title.toLowerCase()} is to empower students through science education.`}
                    </p>
                  )}
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {aboutData && (
        <section className="section-padding bg-muted/30 relative overflow-hidden">
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-accent/5 rounded-full blur-[80px]" />
          
          <div className="max-w-7xl mx-auto container-padding relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <span className="inline-block px-4 py-2 bg-primary/10 rounded-full text-primary text-sm font-semibold mb-4 uppercase tracking-wider">
                Leadership
              </span>
              <h2 className="text-3xl md:text-4xl font-heading font-bold">Our Founder</h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              <Card className="p-8 md:p-12 max-w-4xl mx-auto card-premium rounded-2xl">
                <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
                  <motion.div
                    className="relative"
                    whileHover={{ scale: 1.05 }}
                  >
                    <div className="absolute -inset-2 bg-gradient-to-r from-primary/30 to-accent/30 rounded-full blur-xl opacity-50" />
                    <Avatar className="h-32 w-32 border-4 border-primary/20 relative shadow-xl">
                      <AvatarImage src={aboutData.founderImage || undefined} alt={aboutData.founderName} />
                      <AvatarFallback className="text-3xl font-heading bg-gradient-to-br from-primary/10 to-accent/10">
                        {aboutData.founderName.split(" ").map((n) => n[0]).join("")}
                      </AvatarFallback>
                    </Avatar>
                  </motion.div>
                  <div className="flex-1 text-center md:text-left">
                    <h3 className="text-2xl font-heading font-bold mb-2" data-testid="text-founder-name">
                      {aboutData.founderName}
                    </h3>
                    <p className="text-primary font-medium mb-4">Founder & Director</p>
                    <p className="text-muted-foreground leading-relaxed text-lg" data-testid="text-founder-bio">
                      {aboutData.founderBio}
                    </p>
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>
        </section>
      )}

      <section className="section-padding bg-background relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[150px]" />
        
        <div className="max-w-7xl mx-auto container-padding relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <motion.div
              className="inline-flex p-4 bg-secondary/10 rounded-2xl mb-6"
              whileHover={{ scale: 1.1, rotate: 5 }}
            >
              <History className="h-10 w-10 text-secondary" />
            </motion.div>
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6">Our History</h2>
            {aboutLoading ? (
              <Skeleton className="h-20 w-3/4 mx-auto" />
            ) : (
              <p className="text-muted-foreground max-w-3xl mx-auto leading-relaxed text-lg" data-testid="text-history">
                {aboutData?.historyContent ||
                  "Nepal Science Navigators was founded to provide a platform for young scientists to showcase their innovations and discoveries."}
              </p>
            )}
          </motion.div>
        </div>
      </section>

      <section className="section-padding bg-gradient-to-b from-background to-muted/30 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-[100px]" />
        
        <div className="max-w-7xl mx-auto container-padding relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <motion.div
              className="inline-flex p-4 bg-primary/10 rounded-2xl mb-6"
              whileHover={{ scale: 1.1, rotate: 5 }}
            >
              <Users className="h-10 w-10 text-primary" />
            </motion.div>
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">Board of Directors</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Meet the dedicated leaders guiding our mission
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {boardLoading
              ? [...Array(6)].map((_, i) => (
                  <Card key={i} className="p-8 rounded-2xl">
                    <Skeleton className="h-24 w-24 rounded-full mx-auto mb-6" />
                    <Skeleton className="h-6 w-3/4 mx-auto mb-2" />
                    <Skeleton className="h-4 w-1/2 mx-auto mb-4" />
                    <Skeleton className="h-20 w-full" />
                  </Card>
                ))
              : boardMembers?.map((member, index) => (
                  <motion.div
                    key={member.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ y: -8 }}
                  >
                    <Card className="p-8 text-center h-full card-premium rounded-2xl" data-testid={`card-board-member-${member.id}`}>
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        className="relative inline-block mb-6"
                      >
                        <div className="absolute -inset-2 bg-gradient-to-r from-primary/20 to-accent/20 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity" />
                        <Avatar className="h-24 w-24 border-4 border-primary/20 relative shadow-lg">
                          <AvatarImage src={member.image || undefined} alt={member.name} />
                          <AvatarFallback className="text-xl font-heading bg-gradient-to-br from-primary/10 to-accent/10">
                            {member.name.split(" ").map((n) => n[0]).join("")}
                          </AvatarFallback>
                        </Avatar>
                      </motion.div>
                      
                      <h3 className="text-xl font-heading font-bold mb-2" data-testid={`text-member-name-${member.id}`}>
                        {member.name}
                      </h3>
                      <p className="text-primary text-sm font-medium mb-4" data-testid={`text-member-position-${member.id}`}>
                        {member.position}
                      </p>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {member.bio}
                      </p>
                    </Card>
                  </motion.div>
                ))}
          </div>
        </div>
      </section>
    </div>
  );
}
