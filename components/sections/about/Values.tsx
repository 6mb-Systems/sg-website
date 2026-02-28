"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { FadeIn } from "@/components/ui/fade-in";

const values = [
  {
    icon: "/our_value_Client-Centric.png",
    title: "Client-Centric",
    description: "Developing, growing and maintaining client relationships",
  },
  {
    icon: "/our_value_Trusted.png",
    title: "Trusted",
    description: "Integrity and Independence",
  },
  {
    icon: "/our_value_Progressive.png",
    title: "Progressive",
    description: "Continuous improvement and open-loop learning",
  },
  {
    icon: "/our_value_Empowered.png",
    title: "Empowered",
    description:
      "Team orientated, inclusive, and viewing people as our most important asset",
  },
  {
    icon: "/our_value_Innovative.png",
    title: "Innovative",
    description: "Technology leadership",
  },
];

/** Honeycomb pattern with localized hover effect - matches TechnologyPartners style */
function ValuesHoneycombBg() {
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
        <pattern
          id="values-hive"
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
            stroke="rgba(0,0,0,0.08)"
            strokeWidth="1"
          />
        </pattern>

        <pattern
          id="values-hive-bright"
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
            strokeWidth="1"
          />
        </pattern>

        <radialGradient
          id="values-mouse-glow"
          cx={mousePos.x}
          cy={mousePos.y}
          r="250"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="white" stopOpacity="0.85" />
          <stop offset="40%" stopColor="white" stopOpacity="0.4" />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
        </radialGradient>

        <radialGradient id="values-fade-mask" cx="50%" cy="50%" r="70%" fx="50%" fy="50%">
          <stop offset="0%" stopColor="white" stopOpacity="1" />
          <stop offset="50%" stopColor="white" stopOpacity="0.8" />
          <stop offset="80%" stopColor="white" stopOpacity="0.2" />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
        </radialGradient>

        <linearGradient id="values-edge-h" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="black" stopOpacity="1" />
          <stop offset="12%" stopColor="white" stopOpacity="1" />
          <stop offset="88%" stopColor="white" stopOpacity="1" />
          <stop offset="100%" stopColor="black" stopOpacity="1" />
        </linearGradient>

        <linearGradient id="values-edge-v" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="black" stopOpacity="1" />
          <stop offset="12%" stopColor="white" stopOpacity="1" />
          <stop offset="88%" stopColor="white" stopOpacity="1" />
          <stop offset="100%" stopColor="black" stopOpacity="1" />
        </linearGradient>

        <mask id="values-edge-mask">
          <rect width="100%" height="100%" fill="url(#values-fade-mask)" />
          <rect width="100%" height="100%" fill="url(#values-edge-h)" style={{ mixBlendMode: 'multiply' }} />
          <rect width="100%" height="100%" fill="url(#values-edge-v)" style={{ mixBlendMode: 'multiply' }} />
        </mask>

        <mask id="values-glow-mask">
          <rect width="100%" height="100%" fill="url(#values-mouse-glow)" />
        </mask>
      </defs>

      <rect width="100%" height="100%" fill="url(#values-hive)" mask="url(#values-edge-mask)" />
      <rect
        width="100%"
        height="100%"
        fill="url(#values-hive-bright)"
        mask="url(#values-glow-mask)"
        className="transition-opacity duration-300"
      />
    </svg>
  );
}

export function Values() {
  return (
    <section className="relative overflow-hidden section-padding bg-[#FFE4B3] py-16 md:py-24">
      <ValuesHoneycombBg />
      <div className="container-width relative z-20">
        {/* Title outside FadeIn so it stays solid (no opacity from animation) */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-brand-blue md:text-4xl">
            Our Values
          </h2>
          <p className="mt-4 text-lg text-gray-700 leading-7 font-medium">
            The principles that guide everything we do
          </p>
        </div>

        <FadeIn>
          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3 lg:grid-cols-5">
            {values.map((value, index) => (
              <FadeIn key={value.title} direction="up" delay={index * 0.1}>
                <div className="flex h-full flex-col rounded-xl bg-white p-6 text-center">
                  <div className="relative flex flex-col items-center">
                    <div className="flex h-16 w-16 items-center justify-center">
                      <Image
                        src={value.icon}
                        alt=""
                        width={56}
                        height={56}
                        className="h-14 w-14 object-contain md:h-16 md:w-16"
                      />
                    </div>
                    <h3 className="mt-4 text-lg font-semibold text-brand-blue">
                      {value.title}
                    </h3>
                    <p className="mt-2 text-sm text-gray-600">{value.description}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </FadeIn>
      </div>
      {/* Top fade gradient - smooth blend to white (after content) */}
      <div className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-white to-transparent pointer-events-none z-10" />
      {/* Bottom fade gradient - smooth blend to white (after content) */}
      <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-white to-transparent pointer-events-none z-10" />
    </section>
  );
}
