import { useEffect, useRef, useState } from "react";

interface AnimatedCounterProps {
  value: number;
  duration?: number;
  className?: string;
}

export function AnimatedCounter({ value, duration = 2000, className }: AnimatedCounterProps) {
  const [count, setCount] = useState(0);
  const [shouldAnimate, setShouldAnimate] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);
  const hasAnimatedRef = useRef(false);

  // Set up intersection observer
  useEffect(() => {
    if (!ref.current || value === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimatedRef.current) {
          setShouldAnimate(true);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(ref.current);

    return () => {
      observer.disconnect();
    };
  }, [value]);

  // Animate when triggered
  useEffect(() => {
    if (!shouldAnimate || value === 0 || hasAnimatedRef.current) return;

    hasAnimatedRef.current = true;
    let startTime: number | null = null;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);

      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const current = Math.floor(value * easeOutQuart);

      setCount(current);

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [shouldAnimate, value, duration]);

  // Show value immediately if animation hasn't started but value loaded
  const displayValue = hasAnimatedRef.current ? count : (shouldAnimate ? count : value);

  return <span ref={ref} className={className}>{displayValue}</span>;
}
