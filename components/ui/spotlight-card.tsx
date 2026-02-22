"use client";

import { useRef, useState, useId, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SpotlightCardProps {
  children: ReactNode;
  className?: string;
  /** Spotlight glow colour; use a light value (e.g. white) for dark card backgrounds */
  spotlightColor?: string;
  /** When true, uses dark card styles (blue bg, light spotlight, orange border on hover) */
  variant?: "default" | "dark";
}

const defaultSpotlight = "rgba(30, 58, 95, 0.15)";
const darkSpotlight = "rgba(255, 255, 255, 0.12)"; // soft white glow on blue

/** Flat-top hexagonal honeycomb pattern for dark cards */
function HoneycombBg({ patternId }: { patternId: string }) {
  return (
    <svg
      className="absolute inset-0 h-full w-full opacity-100"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <defs>
        <pattern
          id={patternId}
          x="0"
          y="0"
          width="60"
          height="34.64"
          patternUnits="userSpaceOnUse"
          patternTransform="scale(1.2)"
        >
          <path
            d="M0 17.32L10 0H30L40 17.32L30 34.64H10L0 17.32Z M40 17.32H60"
            fill="none"
            stroke="rgba(255,255,255,0.08)"
            strokeWidth="1"
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${patternId})`} />
    </svg>
  );
}

export function SpotlightCard({
  children,
  className,
  spotlightColor,
  variant = "default",
}: SpotlightCardProps) {
  const divRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);
  const patternId = useId().replace(/:/g, "");

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current) return;
    const rect = divRef.current.getBoundingClientRect();
    setPosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleMouseEnter = () => setOpacity(1);
  const handleMouseLeave = () => setOpacity(0);

  const isDark = variant === "dark";
  const color = spotlightColor ?? (isDark ? darkSpotlight : defaultSpotlight);

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={cn(
        "relative overflow-hidden rounded-xl transition-all duration-300 h-full flex flex-col",
        isDark
          ? "border border-white/20 bg-brand-blue hover:shadow-lg hover:shadow-brand-orange/10"
          : "border border-gray-200 bg-white hover:border-brand-blue/50 hover:shadow-lg",
        className
      )}
    >
      {/* Honeycomb background (dark variant only) */}
      {isDark && <HoneycombBg patternId={patternId} />}
      {/* Spotlight gradient overlay */}
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-300 z-20"
        style={{
          opacity,
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, ${color}, transparent 40%)`,
        }}
      />
      {/* Content */}
      <div className="relative z-10 flex flex-col flex-grow">{children}</div>
    </div>
  );
}
