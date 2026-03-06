"use client";

import { useRef, useEffect, useState, ReactNode, Key } from "react";
import { cn } from "@/lib/utils";

interface FadeInProps {
  children: ReactNode;
  direction?: "up" | "down" | "left" | "right";
  delay?: number;
  className?: string;
  key?: Key;
}

export function FadeIn({
  children,
  direction = "up",
  delay = 0,
  className = "",
}: FadeInProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: "-20px" }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  const directionClasses = {
    up: "animate-fade-in-up",
    down: "animate-fade-in-down",
    left: "animate-fade-in-left",
    right: "animate-fade-in-right",
  };

  return (
    <div
      ref={ref}
      className={cn(
        "opacity-0",
        isVisible && directionClasses[direction],
        className
      )}
      style={isVisible && delay > 0 ? { animationDelay: `${delay}s` } : undefined}
    >
      {children}
    </div>
  );
}
