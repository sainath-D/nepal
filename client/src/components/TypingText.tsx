import { useState, useEffect } from "react";

interface TypingTextProps {
  text: string;
  speed?: number;
  className?: string;
  delay?: number;
}

export function TypingText({ text, speed = 50, className, delay = 0 }: TypingTextProps) {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);

  // Reset when text prop changes
  useEffect(() => {
    setDisplayText("");
    setCurrentIndex(0);
    setHasStarted(false);
  }, [text]);

  useEffect(() => {
    const startTimer = setTimeout(() => {
      setHasStarted(true);
    }, delay);

    return () => clearTimeout(startTimer);
  }, [delay, text]);

  useEffect(() => {
    if (!hasStarted || currentIndex >= text.length) return;

    const timer = setTimeout(() => {
      setDisplayText(text.substring(0, currentIndex + 1));
      setCurrentIndex(currentIndex + 1);
    }, speed);

    return () => clearTimeout(timer);
  }, [currentIndex, text, speed, hasStarted]);

  return (
    <span className={className}>
      {displayText}
      {currentIndex < text.length && <span className="animate-pulse">|</span>}
    </span>
  );
}
