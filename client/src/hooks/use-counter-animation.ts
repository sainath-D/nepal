import { useEffect, useState, useRef } from "react";

export function useCounterAnimation(
  end: number,
  duration: number = 2000,
  start: number = 0
) {
  const [count, setCount] = useState(start);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (hasAnimated) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasAnimated(true);
          let startTime: number | null = null;
          let animationFrame: number;

          const animate = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);

            // Easing function for smooth animation
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            const current = Math.floor(start + (end - start) * easeOutQuart);

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
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [hasAnimated, end, duration, start]);

  return { count, ref };
}
