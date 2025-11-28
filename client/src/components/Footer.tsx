import { motion } from "framer-motion";
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin, ArrowRight, Heart, Send } from "lucide-react";
import { Link } from "wouter";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const quickLinks = [
  { path: "/", label: "Home" },
  { path: "/about", label: "About" },
  { path: "/categories", label: "Categories" },
  { path: "/schedule", label: "Schedule" },
  { path: "/blog", label: "Blog" },
  { path: "/contact", label: "Contact" },
];

const resources = [
  { path: "/gallery", label: "Gallery" },
  { path: "/news", label: "News" },
  { path: "/notices", label: "Notices" },
];

export default function Footer() {
  return (
    <footer className="relative bg-secondary text-white overflow-hidden">
      <div className="absolute inset-0 stars opacity-20" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-accent/10 rounded-full blur-[100px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-20 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <div>
              <h3 className="text-xl font-heading font-bold mb-2">Nepal Science Navigators</h3>
              <p className="text-primary text-sm font-medium">Igniting Innovation</p>
            </div>
            <p className="text-white/60 text-sm leading-relaxed">
              Empowering young minds through scientific exploration and innovation. Building the future, one discovery at a time.
            </p>
            <div className="flex space-x-3">
              {[
                { icon: Facebook, label: "Facebook", href: "#" },
                { icon: Twitter, label: "Twitter", href: "#" },
                { icon: Instagram, label: "Instagram", href: "#" },
                { icon: Linkedin, label: "LinkedIn", href: "#" },
              ].map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-3 bg-white/5 hover:bg-primary/20 rounded-xl transition-all duration-300 group border border-white/10 hover:border-primary/30"
                  data-testid={`link-social-${social.label.toLowerCase()}`}
                >
                  <social.icon className="h-5 w-5 text-white/60 group-hover:text-primary transition-colors" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h3 className="text-lg font-heading font-semibold mb-6 flex items-center gap-2">
              Quick Links
              <ArrowRight className="h-4 w-4 text-primary" />
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link href={link.path} data-testid={`footer-link-${link.label.toLowerCase()}`}>
                    <motion.span
                      whileHover={{ x: 6, color: "#1AA6A0" }}
                      className="text-white/60 hover:text-primary transition-all text-sm cursor-pointer inline-flex items-center gap-2 group"
                    >
                      <span className="h-1 w-1 rounded-full bg-primary/50 group-hover:bg-primary transition-colors" />
                      {link.label}
                    </motion.span>
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="text-lg font-heading font-semibold mb-6">Contact Info</h3>
            <ul className="space-y-4">
              {[
                { icon: Mail, value: "info@nsnsciencefair.org", href: "mailto:info@nsnsciencefair.org" },
                { icon: Phone, value: "+977 1-234-5678", href: "tel:+97712345678" },
                { icon: MapPin, value: "Kathmandu, Nepal", href: "#" },
              ].map((item, index) => (
                <motion.li
                  key={index}
                  whileHover={{ x: 4 }}
                  className="group"
                >
                  <a href={item.href} className="flex items-start space-x-3 text-white/60 hover:text-white text-sm transition-colors">
                    <div className="p-2 bg-white/5 rounded-lg group-hover:bg-primary/20 transition-colors border border-white/10 group-hover:border-primary/30">
                      <item.icon className="h-4 w-4 text-white/80 group-hover:text-primary" />
                    </div>
                    <span className="mt-2">{item.value}</span>
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h3 className="text-lg font-heading font-semibold mb-6">Newsletter</h3>
            <p className="text-white/60 text-sm mb-6">
              Stay updated with our latest news and events. Join our community!
            </p>
            <div className="space-y-3">
              <Input
                type="email"
                placeholder="Your email address"
                className="bg-white/5 border-white/10 text-white placeholder:text-white/40 focus:border-primary focus:ring-primary/20 transition-all rounded-xl py-6"
                data-testid="input-newsletter-email"
              />
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button
                  className="bg-gradient-to-r from-primary to-teal-600 hover:from-teal-600 hover:to-primary text-white w-full font-semibold py-6 rounded-xl shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all gap-2"
                  data-testid="button-subscribe"
                >
                  <Send className="h-4 w-4" />
                  Subscribe
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </div>

        <motion.div
          className="border-t border-white/10 pt-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-white/50 text-sm text-center md:text-left flex items-center gap-2">
              © {new Date().getFullYear()} Nepal Science Navigators. Made with
              <motion.span
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                <Heart className="h-4 w-4 text-red-400 fill-red-400" />
              </motion.span>
              for science.
            </p>
            <div className="flex space-x-8 text-sm">
              {["Privacy Policy", "Terms of Service"].map((item) => (
                <motion.a
                  key={item}
                  href="#"
                  className="text-white/50 hover:text-primary transition-colors"
                  whileHover={{ y: -2 }}
                >
                  {item}
                </motion.a>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
