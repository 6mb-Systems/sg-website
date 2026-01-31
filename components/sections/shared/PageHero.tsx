"use client";

import { useRef, useEffect, useState } from "react";

interface PageHeroProps {
  title: string;
  description: string;
}

/* Honeycomb: Mathematically correct flat-top hexagonal tiling to prevent overlap */
const HivePattern = () => {
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });
  const containerRef = useRef<SVGSVGElement>(null);

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
          id="page-hero-hive-grid"
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
            stroke="rgba(255,255,255,0.1)"
            strokeWidth="1"
          />
        </pattern>

        <radialGradient id="page-hero-fade-mask-gradient" cx="50%" cy="50%" r="70%" fx="50%" fy="50%">
          <stop offset="0%" stopColor="white" stopOpacity="1" />
          <stop offset="40%" stopColor="white" stopOpacity="0.8" />
          <stop offset="80%" stopColor="white" stopOpacity="0.1" />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
        </radialGradient>

        <linearGradient id="page-hero-edge-fade-horizontal" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="black" stopOpacity="1" />
          <stop offset="15%" stopColor="white" stopOpacity="1" />
          <stop offset="85%" stopColor="white" stopOpacity="1" />
          <stop offset="100%" stopColor="black" stopOpacity="1" />
        </linearGradient>

        <linearGradient id="page-hero-edge-fade-vertical" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="black" stopOpacity="1" />
          <stop offset="15%" stopColor="white" stopOpacity="1" />
          <stop offset="85%" stopColor="white" stopOpacity="1" />
          <stop offset="100%" stopColor="black" stopOpacity="1" />
        </linearGradient>

        {/* Brighter pattern for hover state */}
        <pattern
          id="page-hero-hive-grid-bright"
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
            stroke="rgba(255,255,255,0.7)"
            strokeWidth="1.2"
          />
        </pattern>

        <radialGradient
          id="page-hero-mouse-gradient"
          cx={mousePos.x}
          cy={mousePos.y}
          r="150"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="white" stopOpacity="1" />
          <stop offset="60%" stopColor="white" stopOpacity="0.6" />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
        </radialGradient>

        <mask id="page-hero-hive-mask">
          <rect width="100%" height="100%" fill="url(#page-hero-fade-mask-gradient)" />
          <rect width="100%" height="100%" fill="url(#page-hero-edge-fade-horizontal)" style={{ mixBlendMode: 'multiply' }} />
          <rect width="100%" height="100%" fill="url(#page-hero-edge-fade-vertical)" style={{ mixBlendMode: 'multiply' }} />
        </mask>

        <mask id="page-hero-mouse-mask">
          <rect width="100%" height="100%" fill="url(#page-hero-mouse-gradient)" />
        </mask>
      </defs>

      {/* Background Grid (Static) */}
      <rect width="100%" height="100%" fill="url(#page-hero-hive-grid)" mask="url(#page-hero-hive-mask)" />

      {/* Glowing Grid (Follows Mouse) */}
      <rect
        width="100%"
        height="100%"
        fill="url(#page-hero-hive-grid-bright)"
        mask="url(#page-hero-mouse-mask)"
        className="opacity-100"
      />
    </svg>
  );
};

export function PageHero({ title, description }: PageHeroProps) {
  return (
    <section className="relative bg-brand-blue overflow-hidden">
      {/* Base gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-blue-700 to-brand-blue-950 opacity-95" />
      
      {/* Hive / honeycomb pattern */}
      <HivePattern />

      <div className="container-width relative py-16 md:py-20">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="animate-fade-in-up text-4xl font-bold text-white md:text-5xl">
            {title}
          </h1>
          <p className="animate-fade-in-up mt-4 text-xl text-brand-orange font-medium" style={{ animationDelay: '0.1s' }}>
            {description}
          </p>
        </div>
      </div>
    </section>
  );
}
