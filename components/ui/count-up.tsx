"use client";

import { useRef, useEffect, useState } from "react";

interface CountUpProps {
  /** Target value to count up to */
  end: number;
  /** Text to show after the number (e.g. "+", "★") */
  suffix?: string;
  /** Number of decimal places (default 0) */
  decimals?: number;
  /** Animation duration in ms (default 2000) */
  duration?: number;
  /** Start animation only when in view (default true) */
  startOnView?: boolean;
  className?: string;
}

export function CountUp({
  end,
  suffix = "",
  decimals = 0,
  duration = 2000,
  startOnView = true,
  className = "",
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [displayValue, setDisplayValue] = useState(0);
  const [hasStarted, setHasStarted] = useState(!startOnView);

  useEffect(() => {
    if (!startOnView) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: "0px" }
    );

    const el = ref.current;
    if (el) observer.observe(el);
    return () => observer.disconnect();
  }, [startOnView]);

  useEffect(() => {
    if (!hasStarted) return;

    const startTime = performance.now();

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease-out cubic for a smooth finish
      const eased = 1 - (1 - progress) ** 3;
      const current = end * eased;
      setDisplayValue(current);

      if (progress < 1) {
        requestAnimationFrame(tick);
      } else {
        setDisplayValue(end);
      }
    };

    requestAnimationFrame(tick);
  }, [hasStarted, end, duration]);

  const formatted =
    decimals > 0 ? displayValue.toFixed(decimals) : Math.floor(displayValue).toLocaleString();

  return (
    <span ref={ref} className={className}>
      {formatted}
      {suffix}
    </span>
  );
}
