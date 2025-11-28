import { motion } from "framer-motion";
import { useMemo } from "react";

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
}

interface FloatingShape {
  id: number;
  x: number;
  y: number;
  size: number;
  rotation: number;
  duration: number;
}

export function ParticleField({ count = 30, className = "" }: { count?: number; className?: string }) {
  const particles = useMemo<Particle[]>(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 2,
      duration: Math.random() * 3 + 3,
      delay: Math.random() * 2,
    }));
  }, [count]);

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-navy/10"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size,
          }}
          animate={{
            opacity: [0, 0.6, 0],
            scale: [0, 1, 0],
            y: [0, -50, -100],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

export function FloatingShapes({ className = "" }: { className?: string }) {
  const shapes = useMemo<FloatingShape[]>(() => {
    return Array.from({ length: 6 }, (_, i) => ({
      id: i,
      x: Math.random() * 80 + 10,
      y: Math.random() * 80 + 10,
      size: Math.random() * 100 + 50,
      rotation: Math.random() * 360,
      duration: Math.random() * 10 + 15,
    }));
  }, []);

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {shapes.map((shape) => (
        <motion.div
          key={shape.id}
          className="absolute rounded-full bg-gradient-to-br from-navy/5 to-solar/5 blur-3xl"
          style={{
            left: `${shape.x}%`,
            top: `${shape.y}%`,
            width: shape.size,
            height: shape.size,
          }}
          animate={{
            x: [0, 30, -30, 0],
            y: [0, -30, 30, 0],
            rotate: [0, shape.rotation],
            scale: [1, 1.2, 0.8, 1],
          }}
          transition={{
            duration: shape.duration,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

export function GradientOrb({ className = "", color = "navy" }: { className?: string; color?: "navy" | "solar" | "mixed" }) {
  const gradients = {
    navy: "from-navy/20 to-navy/5",
    solar: "from-solar/20 to-solar/5",
    mixed: "from-navy/15 via-solar/10 to-navy/5",
  };

  return (
    <motion.div
      className={`absolute rounded-full bg-gradient-radial ${gradients[color]} blur-3xl ${className}`}
      animate={{
        scale: [1, 1.2, 1],
        opacity: [0.3, 0.5, 0.3],
      }}
      transition={{
        duration: 8,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
}

export function GridPattern({ className = "" }: { className?: string }) {
  return (
    <div className={`absolute inset-0 ${className}`}>
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3Cpattern id='grid' width='60' height='60' patternUnits='userSpaceOnUse'%3E%3Cpath d='M 10 0 L 0 0 0 10' fill='none' stroke='%231B2B4B' stroke-opacity='0.08' stroke-width='1'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width='100%25' height='100%25' fill='url(%23grid)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
}

export function AnimatedGradientBorder({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`relative p-[2px] rounded-xl overflow-hidden ${className}`}>
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-navy via-solar to-navy"
        animate={{
          backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "linear",
        }}
        style={{
          backgroundSize: "200% 200%",
        }}
      />
      <div className="relative bg-background rounded-xl">
        {children}
      </div>
    </div>
  );
}

export function HeroBackground() {
  return (
    <>
      <GridPattern />
      <FloatingShapes />
      <GradientOrb className="w-[600px] h-[600px] -top-48 -right-48" color="navy" />
      <GradientOrb className="w-[400px] h-[400px] bottom-0 -left-32" color="solar" />
      <ParticleField count={25} />
    </>
  );
}
