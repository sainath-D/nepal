import { motion } from "framer-motion";
import { useMutation } from "@tanstack/react-query";
import { Mail, Phone, MapPin, Send, MessageCircle, Clock, CheckCircle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { insertContactMessageSchema, type InsertContactMessage } from "@shared/types";
import { apiRequest, queryClient } from "@/lib/queryClient";
import PageHeader from "@/components/PageHeader";

export default function Contact() {
  const { toast } = useToast();

  const form = useForm<InsertContactMessage>({
    resolver: zodResolver(insertContactMessageSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const mutation = useMutation({
    mutationFn: (data: InsertContactMessage) => apiRequest("POST", "/api/contact", data),
    onSuccess: () => {
      toast({
        title: "Message Sent!",
        description: "We'll get back to you as soon as possible.",
      });
      form.reset();
      queryClient.invalidateQueries({ queryKey: ["/api/contact-messages"] });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: InsertContactMessage) => {
    mutation.mutate(data);
  };

  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: "info@nsnsciencefair.org",
      href: "mailto:info@nsnsciencefair.org",
      gradient: "from-primary/10 to-primary/5",
      iconBg: "bg-primary/10",
      iconColor: "text-primary",
    },
    {
      icon: Phone,
      label: "Phone",
      value: "+977 1-234-5678",
      href: "tel:+97712345678",
      gradient: "from-accent/10 to-accent/5",
      iconBg: "bg-accent/20",
      iconColor: "text-amber-600",
    },
    {
      icon: MapPin,
      label: "Location",
      value: "Kathmandu, Nepal",
      href: "#",
      gradient: "from-secondary/10 to-secondary/5",
      iconBg: "bg-secondary/10",
      iconColor: "text-secondary",
    },
  ];

  const features = [
    { icon: MessageCircle, text: "Quick Response Time" },
    { icon: Clock, text: "24/7 Support" },
    { icon: CheckCircle, text: "Expert Guidance" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <PageHeader
        badge="Contact Us"
        title="Get in Touch"
        subtitle="Have questions? We'd love to hear from you"
        icon={<Mail className="h-4 w-4" />}
      />

      <section className="section-padding bg-background relative overflow-hidden">
        <div className="absolute inset-0 gradient-mesh" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-[100px]" />
        
        <div className="max-w-7xl mx-auto container-padding relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {contactInfo.map((info, index) => (
              <motion.div
                key={info.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
              >
                <Card className={`p-8 text-center h-full bg-gradient-to-br ${info.gradient} border-0 shadow-lg hover:shadow-xl transition-all duration-500 rounded-2xl`}>
                  <motion.div
                    className={`inline-flex p-4 ${info.iconBg} rounded-2xl mb-5`}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                  >
                    <info.icon className={`h-8 w-8 ${info.iconColor}`} />
                  </motion.div>
                  <h3 className="text-xl font-heading font-bold mb-3">{info.label}</h3>
                  <a
                    href={info.href}
                    className="text-muted-foreground hover:text-foreground transition-colors text-lg"
                  >
                    {info.value}
                  </a>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Card className="p-8 md:p-10 card-premium rounded-2xl">
                <h2 className="text-2xl font-heading font-bold mb-8">Send us a Message</h2>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-base font-medium">Name</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="Your name"
                              className="focus:border-primary focus:ring-primary/20 transition-all py-6 text-base rounded-xl"
                              data-testid="input-contact-name"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-base font-medium">Email</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              type="email"
                              placeholder="your@email.com"
                              className="focus:border-primary focus:ring-primary/20 transition-all py-6 text-base rounded-xl"
                              data-testid="input-contact-email"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="subject"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-base font-medium">Subject</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="What is this about?"
                              className="focus:border-primary focus:ring-primary/20 transition-all py-6 text-base rounded-xl"
                              data-testid="input-contact-subject"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-base font-medium">Message</FormLabel>
                          <FormControl>
                            <Textarea
                              {...field}
                              placeholder="Your message..."
                              rows={5}
                              className="focus:border-primary focus:ring-primary/20 transition-all resize-none text-base rounded-xl"
                              data-testid="input-contact-message"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <Button
                        type="submit"
                        className="w-full bg-gradient-to-r from-primary to-teal-600 hover:from-teal-600 hover:to-primary text-white shadow-lg shadow-primary/25 py-6 text-base font-semibold rounded-xl gap-2"
                        disabled={mutation.isPending}
                        data-testid="button-submit-contact"
                      >
                        {mutation.isPending ? (
                          "Sending..."
                        ) : (
                          <>
                            <Send className="h-5 w-5" />
                            Send Message
                          </>
                        )}
                      </Button>
                    </motion.div>
                  </form>
                </Form>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-col justify-center"
            >
              <div className="mb-8">
                <h2 className="text-3xl font-heading font-bold mb-4">
                  Why Contact <span className="text-gradient-teal">Us?</span>
                </h2>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  Whether you have questions about the science fair, need guidance on your project, or want to learn about sponsorship opportunities, we're here to help.
                </p>
              </div>

              <div className="space-y-4">
                {features.map((feature, index) => (
                  <motion.div
                    key={feature.text}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                    whileHover={{ x: 8 }}
                    className="flex items-center gap-4 p-4 bg-primary/5 rounded-xl border border-primary/10"
                  >
                    <div className="p-3 bg-primary/10 rounded-xl">
                      <feature.icon className="h-6 w-6 text-primary" />
                    </div>
                    <span className="font-medium text-lg">{feature.text}</span>
                  </motion.div>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="mt-10 p-6 glass-teal rounded-2xl border border-primary/20"
              >
                <h3 className="font-heading font-bold text-lg mb-2">Office Hours</h3>
                <p className="text-muted-foreground">
                  Sunday - Friday: 9:00 AM - 5:00 PM (NPT)<br />
                  Saturday: Closed
                </p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
