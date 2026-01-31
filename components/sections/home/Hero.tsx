"use client";

import { useRef, useEffect, useState, ReactNode } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/constants";

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
          id="hive-grid"
          x="0"
          y="0"
          width="60"
          height="34.64"
          patternUnits="userSpaceOnUse"
          patternTransform="scale(1.5)"
        >
          {/* Single path designed to tile perfectly without overlapping strokes */}
          <path
            d="M0 17.32L10 0H30L40 17.32L30 34.64H10L0 17.32Z M40 17.32H60"
            fill="none"
            stroke="rgba(255,255,255,0.1)"
            strokeWidth="1"
          />
        </pattern>

        <radialGradient id="fade-mask-gradient" cx="50%" cy="50%" r="70%" fx="50%" fy="50%">
          <stop offset="0%" stopColor="white" stopOpacity="1" />
          <stop offset="40%" stopColor="white" stopOpacity="0.8" />
          <stop offset="80%" stopColor="white" stopOpacity="0.1" />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
        </radialGradient>

        <linearGradient id="edge-fade-horizontal" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="black" stopOpacity="1" />
          <stop offset="15%" stopColor="white" stopOpacity="1" />
          <stop offset="85%" stopColor="white" stopOpacity="1" />
          <stop offset="100%" stopColor="black" stopOpacity="1" />
        </linearGradient>

        <linearGradient id="edge-fade-vertical" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="black" stopOpacity="1" />
          <stop offset="15%" stopColor="white" stopOpacity="1" />
          <stop offset="85%" stopColor="white" stopOpacity="1" />
          <stop offset="100%" stopColor="black" stopOpacity="1" />
        </linearGradient>

        {/* Brighter pattern for hover state */}
        <pattern
          id="hive-grid-bright"
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
          id="mouse-gradient"
          cx={mousePos.x}
          cy={mousePos.y}
          r="150"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="white" stopOpacity="1" />
          <stop offset="60%" stopColor="white" stopOpacity="0.6" />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
        </radialGradient>

        <mask id="hive-mask">
          <rect width="100%" height="100%" fill="url(#fade-mask-gradient)" />
          {/* Combined linear gradients for edge fading on all sides */}
          <rect width="100%" height="100%" fill="url(#edge-fade-horizontal)" style={{ mixBlendMode: 'multiply' }} />
          <rect width="100%" height="100%" fill="url(#edge-fade-vertical)" style={{ mixBlendMode: 'multiply' }} />
        </mask>

        <mask id="mouse-mask">
          <rect width="100%" height="100%" fill="url(#mouse-gradient)" />
        </mask>
      </defs>

      {/* Background Grid (Static) */}
      <rect width="100%" height="100%" fill="url(#hive-grid)" mask="url(#hive-mask)" />

      {/* Glowing Grid (Follows Mouse) - Uses brighter pattern, no background change */}
      <rect
        width="100%"
        height="100%"
        fill="url(#hive-grid-bright)"
        mask="url(#mouse-mask)"
        className="opacity-100"
      />

      {/* Strategic Brand Accents - Clean and Modern */}
      <g className="opacity-40" mask="url(#hive-mask)">
        {/* Top Right - Professional Blue Cluster */}
        <path
          d="M85% 20% l15 8.6 v17.3 l-15 8.6 l-15 -8.6 v-17.3 z"
          fill="rgba(30, 58, 95, 0.4)"
          stroke="rgba(255, 255, 255, 0.2)"
          strokeWidth="1"
        />
        <path
          d="M88% 28% l12 6.9 v13.8 l-12 6.9 l-12 -6.9 v-13.8 z"
          fill="rgba(245, 158, 11, 0.3)"
          stroke="rgba(255, 255, 255, 0.3)"
          strokeWidth="1.5"
        />
      </g>
    </svg>
  );
};

export function Hero() {
  return (
    <section className="relative bg-brand-blue overflow-hidden">
      {/* Base gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-blue-700 to-brand-blue-950 opacity-95" />
      
      {/* Hive / honeycomb pattern */}
      <HivePattern />
      
      {/* Decorative elements - Clean background with redesigned hive pattern */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Pattern is now the primary decorative element */}
      </div>

      <div className="container-width relative py-20 md:py-28 lg:py-32">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="animate-fade-in-up text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
            SMSF Admin Made Simple
          </h1>
          <p className="animate-fade-in-up animate-delay-100 mt-4 text-xl text-brand-orange font-medium">
            Expert Compliance & Reporting
          </p>
          <p className="animate-fade-in-up animate-delay-200 mt-6 text-lg text-gray-200 max-w-2xl mx-auto">
            We ensure Accountants, Trustees and Financial Advisers have ready
            access to the facts, tools and support they need to make informed
            decisions and to maximise wealth creation
          </p>
          <div className="animate-fade-in-up animate-delay-300 mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" variant="secondary" asChild>
              <a
                href={siteConfig.externalLinks.getStarted}
                target="_blank"
                rel="noopener noreferrer"
              >
                Get Started Today
              </a>
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-brand-blue" asChild>
              <Link href="/what-we-do">Learn More</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
