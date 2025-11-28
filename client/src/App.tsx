import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/hooks/use-auth";
import { ProtectedRoute } from "@/lib/protected-route";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Home from "@/pages/Home";
import About from "@/pages/About";
import Categories from "@/pages/Categories";
import Schedule from "@/pages/Schedule";
import Blog from "@/pages/Blog";
import Gallery from "@/pages/Gallery";
import News from "@/pages/News";
import Notices from "@/pages/Notices";
import Videos from "@/pages/Videos";
import Contact from "@/pages/Contact";
import Admin from "@/pages/Admin";
import AdminLogin from "@/pages/AdminLogin";
import NotFound from "@/pages/not-found";

function AppContent() {
  const [location] = useLocation();
  const isAdminRoute = location.startsWith("/admin");

  return (
    <>
      {!isAdminRoute && <Navigation />}
      <Toaster />
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/about" component={About} />
        <Route path="/categories" component={Categories} />
        <Route path="/schedule" component={Schedule} />
        <Route path="/blog" component={Blog} />
        <Route path="/gallery" component={Gallery} />
        <Route path="/news" component={News} />
        <Route path="/notices" component={Notices} />
        <Route path="/videos" component={Videos} />
        <Route path="/contact" component={Contact} />
        <Route path="/admin/login" component={AdminLogin} />
        <ProtectedRoute path="/admin" component={Admin} />
        <Route component={NotFound} />
      </Switch>
      {!isAdminRoute && <Footer />}
    </>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <AppContent />
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
