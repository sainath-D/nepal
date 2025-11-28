import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sparkles, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import type { SiteSettings } from "@shared/types";

const navItems = [
  { path: "/", label: "Home" },
  { path: "/about", label: "About" },
  { path: "/categories", label: "Categories" },
  { path: "/schedule", label: "Schedule" },
  { path: "/blog", label: "Blog" },
  { path: "/gallery", label: "Gallery" },
  { path: "/news", label: "News" },
  { path: "/notices", label: "Notices" },
  { path: "/contact", label: "Contact" },
];

export default function Navigation() {
  const [location] = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const { data: siteSettings } = useQuery<SiteSettings>({
    queryKey: ["/api/site-settings"],
  });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleJoinClick = () => {
    if (siteSettings?.registrationLink) {
      window.open(siteSettings.registrationLink, "_blank");
    }
  };

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? "bg-white/70 backdrop-blur-2xl shadow-2xl shadow-primary/10 border-b border-primary/15" 
          : "bg-transparent"
      }`}
    >
      {/* Animated gradient border */}
      {isScrolled && (
        <motion.div 
          className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 3, repeat: Infinity }}
        />
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo Section */}
          <Link href="/" data-testid="link-home">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-3 cursor-pointer group"
            >
              <motion.div 
                className="relative"
                whileHover={{ rotate: [0, -8, 8, 0] }}
                transition={{ duration: 0.5 }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-primary/40 to-accent/30 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{ duration: 2.5, repeat: Infinity }}
                />
                <div className="relative z-10 p-2.5 bg-gradient-to-br from-primary/10 to-accent/5 rounded-xl border border-primary/20 group-hover:border-primary/40 transition-all">
                  <img 
                    src="/assets/logo.png" 
                    alt="Nepal Science Navigators" 
                    className="h-10 w-10 object-contain drop-shadow-lg"
                    data-testid="logo-icon"
                  />
                </div>
              </motion.div>
              <div className="hidden sm:flex flex-col gap-0.5">
                <motion.span 
                  className="text-gradient-teal font-heading font-bold text-base leading-tight"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  NSN
                </motion.span>
                <motion.span 
                  className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent text-xs font-semibold tracking-widest"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  SCIENCE FAIR
                </motion.span>
              </div>
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item, index) => (
              <Link key={item.path} href={item.path} data-testid={`link-${item.label.toLowerCase()}`}>
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 * index, duration: 0.4 }}
                  whileHover={{ y: -2 }}
                  className="relative"
                >
                  <Button
                    variant="ghost"
                    className={`text-sm font-medium px-4 py-2 rounded-lg transition-all duration-300 ${
                      location === item.path 
                        ? "bg-gradient-to-r from-primary/20 to-accent/10 font-semibold" 
                        : "text-foreground/50 hover:text-primary hover:bg-primary/5"
                    }`}
                    data-testid={`button-nav-${item.label.toLowerCase()}`}
                  >
                    <span className={location === item.path ? "text-gradient-teal" : ""}>
                      {item.label}
                    </span>
                  </Button>
                  {location === item.path && (
                    <motion.div
                      layoutId="activeNav"
                      className="absolute bottom-1.5 left-4 right-4 h-1 bg-gradient-to-r from-primary via-teal-500 to-primary rounded-full blur-sm"
                      initial={false}
                      transition={{ type: "spring", stiffness: 400, damping: 35 }}
                    />
                  )}
                </motion.div>
              </Link>
            ))}
          </div>

          {/* Right Section - CTA & Admin */}
          <div className="hidden lg:flex items-center gap-3">
            {siteSettings?.registrationLink && (
              <motion.div 
                whileHover={{ scale: 1.08, y: -2 }} 
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6, duration: 0.4 }}
              >
                <Button
                  onClick={handleJoinClick}
                  className="bg-gradient-to-r from-primary via-teal-500 to-primary hover:shadow-2xl hover:shadow-primary/30 text-white font-semibold px-6 py-2.5 rounded-xl transition-all duration-300 gap-2 group relative overflow-hidden"
                  data-testid="button-join"
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-teal-500 via-primary to-teal-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  />
                  <div className="relative flex items-center gap-2">
                    <Sparkles className="h-4 w-4" />
                    Join Now
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Button>
              </motion.div>
            )}
            <Link href="/admin" data-testid="link-admin">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
              >
                <Button
                  variant="outline"
                  className="border-2 border-secondary/40 text-secondary font-semibold hover:bg-secondary/10 hover:border-secondary/60 transition-all rounded-xl px-5"
                  data-testid="button-admin"
                >
                  Admin
                </Button>
              </motion.div>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden text-secondary p-2.5 rounded-xl hover:bg-primary/10 transition-all border border-primary/10 hover:border-primary/30"
            data-testid="button-mobile-menu"
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
          >
            <AnimatePresence mode="wait">
              {isOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X className="h-6 w-6" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu className="h-6 w-6" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0, y: -20 }}
            animate={{ opacity: 1, height: "auto", y: 0 }}
            exit={{ opacity: 0, height: 0, y: -20 }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            className="lg:hidden absolute top-full left-0 right-0 bg-gradient-to-b from-white/95 to-white/90 backdrop-blur-2xl border-t border-primary/15 overflow-hidden shadow-2xl shadow-primary/10"
          >
            <div className="px-4 py-6 space-y-2 max-w-7xl mx-auto w-full">
              {navItems.map((item, index) => (
                <Link key={item.path} href={item.path} data-testid={`mobile-link-${item.label.toLowerCase()}`}>
                  <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.06, duration: 0.3 }}
                    whileTap={{ scale: 0.96 }}
                    onClick={() => setIsOpen(false)}
                  >
                    <Button
                      variant="ghost"
                      data-testid={`button-mobile-nav-${item.label.toLowerCase()}`}
                      className={`w-full justify-start text-base font-medium rounded-xl py-3 px-4 transition-all duration-200 ${
                        location === item.path 
                          ? "bg-gradient-to-r from-primary/20 to-accent/10 font-semibold" 
                          : "text-foreground/60 hover:text-primary hover:bg-primary/5"
                      }`}
                    >
                      <span className={location === item.path ? "text-gradient-teal" : ""}>
                        {item.label}
                      </span>
                      <motion.span
                        initial={{ x: 0 }}
                        whileHover={{ x: 6 }}
                        transition={{ type: "spring", stiffness: 400 }}
                      >
                        {item.label}
                      </motion.span>
                    </Button>
                  </motion.div>
                </Link>
              ))}
              
              {/* Mobile CTA Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.3 }}
                className="pt-4 mt-4 space-y-3 border-t border-primary/15"
              >
                {siteSettings?.registrationLink && (
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      className="w-full bg-gradient-to-r from-primary to-teal-500 hover:shadow-xl hover:shadow-primary/25 text-white font-semibold py-3 rounded-xl shadow-lg gap-2 transition-all"
                      onClick={() => {
                        handleJoinClick();
                        setIsOpen(false);
                      }}
                      data-testid="mobile-button-join"
                    >
                      <Sparkles className="h-4 w-4" />
                      Join Now
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </motion.div>
                )}
                <Link href="/admin" data-testid="mobile-link-admin">
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setIsOpen(false)}
                  >
                    <Button
                      variant="outline"
                      className="w-full border-2 border-secondary/40 text-secondary font-semibold hover:bg-secondary/10 hover:border-secondary/60 rounded-xl py-3 transition-all"
                      data-testid="mobile-button-admin"
                    >
                      Admin Dashboard
                    </Button>
                  </motion.div>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
