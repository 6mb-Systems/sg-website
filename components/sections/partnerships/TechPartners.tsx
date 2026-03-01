"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { FadeIn } from "@/components/ui/fade-in";

/** Honeycomb pattern with localized hover effect - matches Our Partners on home */
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
        <pattern
          id="tech-hive"
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
        <pattern
          id="tech-hive-bright"
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
        <radialGradient
          id="tech-mouse-glow"
          cx={mousePos.x}
          cy={mousePos.y}
          r="300"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="white" stopOpacity="0.9" />
          <stop offset="40%" stopColor="white" stopOpacity="0.5" />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="tech-fade-mask-gradient" cx="50%" cy="50%" r="70%" fx="50%" fy="50%">
          <stop offset="0%" stopColor="white" stopOpacity="1" />
          <stop offset="50%" stopColor="white" stopOpacity="0.8" />
          <stop offset="80%" stopColor="white" stopOpacity="0.2" />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="tech-edge-fade-horizontal" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="black" stopOpacity="1" />
          <stop offset="12%" stopColor="white" stopOpacity="1" />
          <stop offset="88%" stopColor="white" stopOpacity="1" />
          <stop offset="100%" stopColor="black" stopOpacity="1" />
        </linearGradient>
        <linearGradient id="tech-edge-fade-vertical" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="black" stopOpacity="1" />
          <stop offset="12%" stopColor="white" stopOpacity="1" />
          <stop offset="88%" stopColor="white" stopOpacity="1" />
          <stop offset="100%" stopColor="black" stopOpacity="1" />
        </linearGradient>
        <mask id="tech-edge-mask">
          <rect width="100%" height="100%" fill="url(#tech-fade-mask-gradient)" />
          <rect width="100%" height="100%" fill="url(#tech-edge-fade-horizontal)" style={{ mixBlendMode: "multiply" }} />
          <rect width="100%" height="100%" fill="url(#tech-edge-fade-vertical)" style={{ mixBlendMode: "multiply" }} />
        </mask>
        <mask id="tech-glow-mask">
          <rect width="100%" height="100%" fill="url(#tech-mouse-glow)" />
        </mask>
      </defs>
      <rect width="100%" height="100%" fill="url(#tech-hive)" mask="url(#tech-edge-mask)" />
      <rect
        width="100%"
        height="100%"
        fill="url(#tech-hive-bright)"
        mask="url(#tech-glow-mask)"
        className="transition-opacity duration-300"
      />
    </svg>
  );
}

const partners = [
  {
    name: "Class",
    logo: "/partner_logo_class.png",
    description:
      "Class is a leading Australian provider of cloud based SMSF administration and reporting software, trusted by accountants and advisers to streamline compliance, reporting and data management.",
    relationship:
      "SuperGuardian is an SMSF service provider that leverages Class's technology, via Class Super, to deliver efficient, accurate administration and reporting services for its clients.",
  },
  {
    name: "ASF Audits",
    logo: "/partner_logo_asf.png",
    description:
      "ASF Audits is an independent Australian firm that specialises in ASIC-registered self-managed super fund (SMSF) audit services, providing professional audit reports, management letters, and real-time workflow tools to accountants, administrators, and other industry professionals.",
    relationship:
      "SuperGuardian liaises with independent auditor, ASF Audits, to supply necessary documentation and support the SMSF audit process on behalf of its clients, ensuring regulatory requirements are met and audit workflows are efficient.",
  },
  {
    name: "Accurium",
    logo: "/partner_logo_accurium_webp.webp",
    description:
      "Accurium is a specialist SMSF actuarial and education provider in Australia who supplies actuarial certificates, SMSF focused compliance consulting, and professional education and training for accountants and advisers.",
    relationship:
      "SuperGuardian engages external specialist providers like Accurium to obtain actuarial certificates, technical support, and SMSF related expertise as part of delivering compliant, high quality SMSF services for its clients.",
  },
  {
    name: "Smarter SMSF",
    logo: "/partner_logo_smart_smsf.png",
    description:
      "Smarter SMSF is an Australian SMSF specialist education and document solutions provider that offers accredited CPD training, regular webinars, courses, and resources to help accountants, financial advisers and other professionals stay up to date with SMSF compliance, technical issues, and strategies.",
    relationship:
      "SuperGuardian offers monthly free webinars to SMSF professionals with Smarter SMSF experts, plus utilise these experts with in house training to upskill our Client Managers. These CPD accredited sessions cover compliance, pensions, and investments, helping professionals stay informed, strengthen their SMSF knowledge, and gain practical insights they can apply immediately.",
  },
];

export function TechPartners() {
  return (
    <section className="relative overflow-hidden section-padding bg-[#FFE4B3] py-16 md:py-24">
      <HoneycombBg />
      <div className="container-width relative z-20">
        <FadeIn direction="up">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-brand-blue md:text-4xl">
              Technology Partners
            </h2>
            <p className="mt-4 text-gray-600">
              Integrated with Australia&apos;s leading SMSF platforms
            </p>
          </div>
        </FadeIn>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {partners.map((partner, index) => (
            <FadeIn key={partner.name} direction="up" delay={index * 0.08}>
              <div
                className="flex h-full cursor-default flex-col rounded-xl border border-gray-200 bg-white/80 p-6 shadow-sm backdrop-blur-sm"
                role="article"
                aria-label={partner.name}
              >
                <div className="flex min-h-[115px] items-center justify-center">
                  {partner.logo ? (
                    <Image
                      src={partner.logo}
                      alt=""
                      width={256}
                      height={115}
                      className="h-auto max-h-[90px] w-full max-w-[224px] object-contain object-center"
                      sizes="(max-width: 640px) 50vw, 256px"
                    />
                  ) : (
                    <span className="text-xl font-semibold text-gray-700">
                      {partner.name}
                    </span>
                  )}
                </div>
                <p className="mt-4 text-sm leading-relaxed text-gray-800">
                  {partner.description}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-gray-700">
                  {partner.relationship}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
      <div className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-white to-transparent pointer-events-none z-10" />
      <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-white to-transparent pointer-events-none z-10" />
    </section>
  );
}
