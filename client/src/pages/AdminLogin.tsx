import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Lock, User, Shield, Compass } from "lucide-react";

export default function AdminLogin() {
  const [, setLocation] = useLocation();
  const { user, loginMutation, registerMutation, isLoading } = useAuth();
  
  const [loginData, setLoginData] = useState({ username: "", password: "" });
  const [registerData, setRegisterData] = useState({ username: "", password: "", confirmPassword: "" });
  const [registerError, setRegisterError] = useState("");

  const { data: hasAdmins } = useQuery<boolean>({
    queryKey: ["/api/has-admins"],
    queryFn: async () => {
      try {
        const res = await fetch("/api/has-admins");
        if (!res.ok) return true;
        const data = await res.json();
        return data.hasAdmins;
      } catch {
        return true;
      }
    },
  });

  const showRegister = hasAdmins === false;

  useEffect(() => {
    if (user) {
      setLocation("/admin");
    }
  }, [user, setLocation]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    loginMutation.mutate(loginData);
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setRegisterError("");
    
    if (registerData.password !== registerData.confirmPassword) {
      setRegisterError("Passwords do not match");
      return;
    }
    
    if (registerData.password.length < 6) {
      setRegisterError("Password must be at least 6 characters");
      return;
    }
    
    registerMutation.mutate({
      username: registerData.username,
      password: registerData.password,
    });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-cream-100 to-cream-200">
        <Loader2 className="h-8 w-8 animate-spin text-navy" />
      </div>
    );
  }

  if (user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream-100 via-cream-200 to-cream-100 flex">
      <div className="flex-1 flex items-center justify-center p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <Card className="border-navy/10 shadow-xl">
            <CardHeader className="text-center pb-2">
              <div className="flex justify-center mb-4">
                <div className="p-3 bg-gradient-to-br from-navy to-navy-600 rounded-xl shadow-lg">
                  <Shield className="h-8 w-8 text-cream" />
                </div>
              </div>
              <CardTitle className="text-2xl font-heading text-navy">Admin Portal</CardTitle>
              <CardDescription className="text-navy/60">
                Sign in to manage Nepal Science Navigators
              </CardDescription>
            </CardHeader>
            <CardContent>
              {showRegister ? (
                <div className="space-y-4">
                  <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <p className="text-sm text-blue-800">
                      <strong>First-time setup:</strong> Create your administrator account to get started.
                    </p>
                  </div>
                  <form onSubmit={handleRegister} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="register-username" className="text-navy">Username</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-navy/40" />
                        <Input
                          id="register-username"
                          type="text"
                          placeholder="Choose a username"
                          className="pl-10 border-navy/20 focus:border-navy"
                          value={registerData.username}
                          onChange={(e) => setRegisterData({ ...registerData, username: e.target.value })}
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="register-password" className="text-navy">Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-navy/40" />
                        <Input
                          id="register-password"
                          type="password"
                          placeholder="Create a password"
                          className="pl-10 border-navy/20 focus:border-navy"
                          value={registerData.password}
                          onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="register-confirm" className="text-navy">Confirm Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-navy/40" />
                        <Input
                          id="register-confirm"
                          type="password"
                          placeholder="Confirm your password"
                          className="pl-10 border-navy/20 focus:border-navy"
                          value={registerData.confirmPassword}
                          onChange={(e) => setRegisterData({ ...registerData, confirmPassword: e.target.value })}
                          required
                        />
                      </div>
                    </div>
                    {registerError && (
                      <p className="text-sm text-red-600">{registerError}</p>
                    )}
                    <Button 
                      type="submit" 
                      className="w-full bg-gradient-to-r from-navy to-navy-600 hover:from-navy-600 hover:to-navy-700 text-cream"
                      disabled={registerMutation.isPending}
                    >
                      {registerMutation.isPending ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Creating account...
                        </>
                      ) : (
                        "Create Admin Account"
                      )}
                    </Button>
                  </form>
                </div>
              ) : (
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="login-username" className="text-navy">Username</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-navy/40" />
                      <Input
                        id="login-username"
                        type="text"
                        placeholder="Enter your username"
                        className="pl-10 border-navy/20 focus:border-navy"
                        value={loginData.username}
                        onChange={(e) => setLoginData({ ...loginData, username: e.target.value })}
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="login-password" className="text-navy">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-navy/40" />
                      <Input
                        id="login-password"
                        type="password"
                        placeholder="Enter your password"
                        className="pl-10 border-navy/20 focus:border-navy"
                        value={loginData.password}
                        onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                        required
                      />
                    </div>
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-navy to-navy-600 hover:from-navy-600 hover:to-navy-700 text-cream"
                    disabled={loginMutation.isPending}
                  >
                    {loginMutation.isPending ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Signing in...
                      </>
                    ) : (
                      "Sign In"
                    )}
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-6 text-center"
          >
            <a 
              href="/" 
              className="text-sm text-navy/60 hover:text-navy transition-colors inline-flex items-center gap-1"
            >
              <Compass className="h-4 w-4" />
              Back to website
            </a>
          </motion.div>
        </motion.div>
      </div>
      
      <div className="hidden lg:flex flex-1 bg-gradient-to-br from-navy to-navy-700 items-center justify-center p-12">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center max-w-lg"
        >
          <h2 className="text-3xl font-heading font-bold text-cream mb-4">
            Nepal Science Navigators
          </h2>
          <p className="text-cream/80 text-lg mb-8">
            Empowering young minds through science exploration and discovery.
          </p>
          <div className="grid grid-cols-2 gap-4 text-cream/70 text-sm">
            <div className="p-4 bg-white/10 rounded-lg backdrop-blur-sm">
              <div className="font-bold text-2xl text-cream mb-1">500+</div>
              <div>Participants</div>
            </div>
            <div className="p-4 bg-white/10 rounded-lg backdrop-blur-sm">
              <div className="font-bold text-2xl text-cream mb-1">100+</div>
              <div>Projects</div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
