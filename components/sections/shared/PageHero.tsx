"use client";

import { useRef, useEffect, useState, useId } from "react";
import type { ReactNode } from "react";

interface PageHeroProps {
  title: string;
  description: ReactNode;
  subtitle?: string;
}

/* Honeycomb: Mathematically correct flat-top hexagonal tiling. Uses unique ids per instance so multiple sections (e.g. Who We Are page) each have their own working hover effect. */
export const HivePattern = ({
  stroke = "rgba(255,255,255,0.1)",
  strokeBright = "rgba(255,255,255,0.7)",
}: {
  stroke?: string;
  strokeBright?: string;
} = {}) => {
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });
  const containerRef = useRef<SVGSVGElement>(null);
  const id = useId().replace(/:/g, "");

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      setMousePos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <svg
      ref={containerRef}
      className="absolute inset-0 h-full w-full opacity-50"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <defs>
        <pattern
          id={`${id}-hive-grid`}
          x="0"
          y="0"
          width="60"
          height="34.64"
          patternUnits="userSpaceOnUse"
          patternTransform="scale(1.5)"
        >
          <path
            d="M0 17.32L10 0H30L40 17.32L30 34.64H10L0 17.32Z M40 17.32H60"
            fill="none"
            stroke={stroke}
            strokeWidth="1"
          />
        </pattern>

        <radialGradient id={`${id}-fade-mask-gradient`} cx="50%" cy="50%" r="70%" fx="50%" fy="50%">
          <stop offset="0%" stopColor="white" stopOpacity="1" />
          <stop offset="40%" stopColor="white" stopOpacity="0.8" />
          <stop offset="80%" stopColor="white" stopOpacity="0.1" />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
        </radialGradient>

        <linearGradient id={`${id}-edge-fade-horizontal`} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="black" stopOpacity="1" />
          <stop offset="15%" stopColor="white" stopOpacity="1" />
          <stop offset="85%" stopColor="white" stopOpacity="1" />
          <stop offset="100%" stopColor="black" stopOpacity="1" />
        </linearGradient>

        <linearGradient id={`${id}-edge-fade-vertical`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="black" stopOpacity="1" />
          <stop offset="15%" stopColor="white" stopOpacity="1" />
          <stop offset="85%" stopColor="white" stopOpacity="1" />
          <stop offset="100%" stopColor="black" stopOpacity="1" />
        </linearGradient>

        <pattern
          id={`${id}-hive-grid-bright`}
          x="0"
          y="0"
          width="60"
          height="34.64"
          patternUnits="userSpaceOnUse"
          patternTransform="scale(1.5)"
        >
          <path
            d="M0 17.32L10 0H30L40 17.32L30 34.64H10L0 17.32Z M40 17.32H60"
            fill="none"
            stroke={strokeBright}
            strokeWidth="1.2"
          />
        </pattern>

        <radialGradient
          id={`${id}-mouse-gradient`}
          cx={mousePos.x}
          cy={mousePos.y}
          r="150"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="white" stopOpacity="1" />
          <stop offset="60%" stopColor="white" stopOpacity="0.6" />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
        </radialGradient>

        <mask id={`${id}-hive-mask`}>
          <rect width="100%" height="100%" fill={`url(#${id}-fade-mask-gradient)`} />
          <rect width="100%" height="100%" fill={`url(#${id}-edge-fade-horizontal)`} style={{ mixBlendMode: 'multiply' }} />
          <rect width="100%" height="100%" fill={`url(#${id}-edge-fade-vertical)`} style={{ mixBlendMode: 'multiply' }} />
        </mask>

        <mask id={`${id}-mouse-mask`}>
          <rect width="100%" height="100%" fill={`url(#${id}-mouse-gradient)`} />
        </mask>
      </defs>

      <rect width="100%" height="100%" fill={`url(#${id}-hive-grid)`} mask={`url(#${id}-hive-mask)`} />

      <rect
        width="100%"
        height="100%"
        fill={`url(#${id}-hive-grid-bright)`}
        mask={`url(#${id}-mouse-mask)`}
        className="opacity-100"
      />
    </svg>
  );
};

export function PageHero({ title, description, subtitle }: PageHeroProps) {
  return (
    <section className="relative bg-brand-blue overflow-hidden">
      {/* Base gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-blue-700 to-brand-blue-950 opacity-95" />
      
      {/* Hive / honeycomb pattern */}
      <HivePattern />

      <div className="container-width relative py-12 md:py-16">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="animate-fade-in-up text-4xl font-bold text-white md:text-5xl">
            {title}
          </h1>
          <p className="animate-fade-in-up mt-4 text-xl text-brand-orange font-medium" style={{ animationDelay: '0.1s' }}>
            {description}
          </p>
          {subtitle && (
            <p className="animate-fade-in-up mt-3 text-base text-blue-100/90" style={{ animationDelay: '0.2s' }}>
              {subtitle}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
