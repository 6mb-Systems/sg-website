"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { FadeIn } from "@/components/ui/fade-in";

const partners = [
  { name: "ASF Audits", logo: "/partner_logo_asf.svg", url: "https://asfaudits.com.au/" },
  { name: "Class", logo: "/partner_logo_class.png", url: "https://www.class.com.au/" },
  { name: "SmarterSMSF", logo: "/partner_logo_smart_smsf.png", url: "https://smartersmsf.com/" },
  { name: "SMSF Association", logo: "/partner_logo_smsf_association.png", url: "https://www.smsfassociation.com/" },
];

/** Honeycomb pattern with localized hover effect - white stroke follows cursor */
function HoneycombBg() {
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
      className="absolute inset-0 h-full w-full"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <defs>
        {/* Base pattern - grey stroke */}
        <pattern
          id="partners-hive"
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
            stroke="rgba(0,0,0,0.12)"
            strokeWidth="1"
          />
        </pattern>

        {/* Bright pattern - white stroke for hover area */}
        <pattern
          id="partners-hive-bright"
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
            stroke="rgba(255,255,255,0.9)"
            strokeWidth="1"
          />
        </pattern>

        {/* Radial gradient for mouse glow */}
        <radialGradient
          id="mouse-glow"
          cx={mousePos.x}
          cy={mousePos.y}
          r="300"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="white" stopOpacity="0.9" />
          <stop offset="40%" stopColor="white" stopOpacity="0.5" />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
        </radialGradient>

        {/* Edge fade masks */}
        <radialGradient id="fade-mask-gradient" cx="50%" cy="50%" r="70%" fx="50%" fy="50%">
          <stop offset="0%" stopColor="white" stopOpacity="1" />
          <stop offset="50%" stopColor="white" stopOpacity="0.8" />
          <stop offset="80%" stopColor="white" stopOpacity="0.2" />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
        </radialGradient>

        <linearGradient id="edge-fade-horizontal" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="black" stopOpacity="1" />
          <stop offset="12%" stopColor="white" stopOpacity="1" />
          <stop offset="88%" stopColor="white" stopOpacity="1" />
          <stop offset="100%" stopColor="black" stopOpacity="1" />
        </linearGradient>

        <linearGradient id="edge-fade-vertical" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="black" stopOpacity="1" />
          <stop offset="12%" stopColor="white" stopOpacity="1" />
          <stop offset="88%" stopColor="white" stopOpacity="1" />
          <stop offset="100%" stopColor="black" stopOpacity="1" />
        </linearGradient>

        <mask id="edge-mask">
          <rect width="100%" height="100%" fill="url(#fade-mask-gradient)" />
          <rect width="100%" height="100%" fill="url(#edge-fade-horizontal)" style={{ mixBlendMode: 'multiply' }} />
          <rect width="100%" height="100%" fill="url(#edge-fade-vertical)" style={{ mixBlendMode: 'multiply' }} />
        </mask>

        <mask id="glow-mask">
          <rect width="100%" height="100%" fill="url(#mouse-glow)" />
        </mask>
      </defs>

      {/* Base Pattern - Always visible with edge fade */}
      <rect width="100%" height="100%" fill="url(#partners-hive)" mask="url(#edge-mask)" />

      {/* Bright Pattern - Shows white stroke around cursor */}
      <rect
        width="100%"
        height="100%"
        fill="url(#partners-hive-bright)"
        mask="url(#glow-mask)"
        className="transition-opacity duration-300"
      />
    </svg>
  );
}

export function TechnologyPartners() {
  return (
    <section className="relative overflow-hidden section-padding bg-[#FFE4B3] py-16 md:py-24">
      <HoneycombBg />
      <div className="container-width relative z-20">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-brand-blue md:text-4xl">
            Our Partners
          </h2>
          <p className="mt-4 text-lg text-gray-700 leading-7 font-medium">
            Trusted partners in delivering quality SMSF services
          </p>
        </div>

        <FadeIn>
          <div className="mt-12 flex flex-wrap items-center justify-center gap-6 md:gap-10">
            {partners.map((partner) => (
              <a
                key={partner.name}
                href={partner.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-20 w-40 items-center justify-center rounded-lg bg-white px-4 py-3 shadow-sm md:h-24 md:w-48"
              >
                <Image
                  src={partner.logo}
                  alt={partner.name}
                  width={180}
                  height={80}
                  className="h-auto w-full object-contain"
                  sizes="(max-width: 768px) 25vw, 180px"
                />
              </a>
            ))}
          </div>
        </FadeIn>
      </div>
      {/* Edge fade out - same as Our Values section */}
      <div className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-white to-transparent pointer-events-none z-10" />
      <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-white to-transparent pointer-events-none z-10" />
    </section>
  );
}
