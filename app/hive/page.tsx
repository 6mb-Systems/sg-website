import type { Metadata } from "next";
import Image from "next/image";
import { HivePattern } from "@/components/sections/shared/PageHero";
import { CTASection } from "@/components/sections/shared/CTASection";
import { FadeIn } from "@/components/ui/fade-in";
import { CheckCircle } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { HiveDemoSection } from "@/components/sections/hive/HiveDemoSection";
import { YouTubePlaylist } from "@/components/sections/webinars/YouTubePlaylist";
import type { WebinarVideo } from "@/lib/webinar-videos";

export const metadata: Metadata = {
  title: "Hive by SuperGuardian",
  description:
    "SuperGuardian's proprietary digital collaboration platform connecting advisers, accountants and clients in a single, secure workspace for SMSF administration.",
  robots: "noindex, nofollow",
};

const TAGLINE =
  "Streamlined SMSF collaboration for advisers, accountants and clients";

const KEY_FEATURES = [
  "Consolidated, up-to-date fund information and identification of strategic opportunities (1-click to high value datasets)",
  "Simple and secure document sharing for trust deeds, financial reports, meeting minutes and other confidential, fund-critical records",
  "Task tracking and workflow transparency with notifications, action requests directly from email or within Hive",
  "Real-time visibility over outstanding items and document status",
  "Integration with Class and Microsoft SharePoint for up-to-date SMSF reporting, including where data feeds are unavailable or supplementary information is required for audit",
  "Multi-factor authentication (MFA) and OTP-based access for secure document viewing",
];

const STRATEGIC_ADVANTAGES = [
  "Improved efficiency and turnaround times on information collection and fund reconciliation, through reduced email handling and clearer task ownership",
  "Enhanced adviser and client experience, with a single source of truth for fund information and requests",
  "Better collaboration between advisers, clients and SuperGuardian team, supporting higher service quality and encouraging advisers to move all their SMSFs on Hive",
  "Scalable growth, enabling SuperGuardian to service larger adviser groups without proportional increases in administrative overhead",
  "Stronger data governance, with documents and interactions managed within a controlled environment rather than dispersed across inboxes",
];

const CYBERSECURITY_ITEMS = [
  "Alignment with ISO 27001, SOC 2 Type II and NIST controls at the SuperGuardian group level, supporting enterprise-grade assurance for data security and operational resilience",
  "AWS-hosted production environment with VPC isolation, web application firewall (WAF), load balancers and CloudFront",
  "Encryption and access controls, including IAM policy enforcement, MFA, secure secrets management and blocked public access to storage",
  "Regular vulnerability management, including weekly scans and defined remediation processes",
  "Independent penetration testing, the Hive cloud application successfully passed testing with only minor fixes required",
  "Backup and resilience controls, including daily database backups and tested restore procedures",
];

const HIVE_VIDEOS: WebinarVideo[] = [
  {
    id: "k7Hj0uadtVU",
    title: "How to Activate your Hive Account",
  },
  {
    id: "SlGFWwM4lQs",
    title: "General Hive Navigation and Dashboard Overview",
  },
];

export default function HivePage() {
  return (
    <>
      {/* Hero with Hive logo and tagline */}
      <section className="relative bg-brand-blue overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-blue-700 to-brand-blue-950 opacity-95" />
        <HivePattern />
        <div className="container-width relative py-12 md:py-16">
          <div className="mx-auto max-w-3xl text-center">
            <FadeIn direction="up">
              <h1 className="text-4xl font-bold text-white md:text-5xl">
                Introducing Hive
              </h1>
            </FadeIn>
            <FadeIn direction="up" delay={0.1}>
              <p className="mt-4 text-xl text-brand-orange font-medium">
                {TAGLINE}
              </p>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Banner images */}
      <section className="section-padding bg-white">
        <div className="container-width">
          <FadeIn direction="up">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
                <Image
                  src="/hive_Banner%20for%20Webpage%20left.png"
                  alt="Hive platform - login and dashboard"
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
                <Image
                  src="/hive_Banner%20for%20Webpage%20right.png"
                  alt="Hive platform - dashboard and insights"
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Overview and Core Features */}
      <section className="section-padding bg-gray-50">
        <div className="container-width">
          <FadeIn direction="up">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="text-3xl font-bold text-brand-blue md:text-4xl">
                Overview and Core Features
              </h2>
              <p className="mt-6 text-gray-600 leading-relaxed">
                Hive is SuperGuardian&apos;s proprietary digital collaboration platform, designed to connect advisers, accountants and clients in a single, secure workspace to streamline SMSF administration and decision making. It centralises fund information, task management and secure document exchange, reducing reliance on email and improving timeliness and transparency across workflows.
              </p>
            </div>
          </FadeIn>

          <div className="mt-12 max-w-4xl mx-auto">
            <Accordion type="single" collapsible className="w-full space-y-4">
              {KEY_FEATURES.map((feature, index) => (
                <FadeIn key={index} direction="up" delay={index * 0.05}>
                  <AccordionItem
                    value={`feature-${index}`}
                    className="rounded-xl border border-gray-200 bg-white px-6 data-[state=open]:bg-brand-blue-50/30 transition-colors"
                  >
                    <AccordionTrigger className="hover:no-underline py-6 text-left font-semibold text-gray-900 group">
                      <div className="flex items-start gap-3">
                        <CheckCircle className="h-6 w-6 shrink-0 text-green-500 mt-0.5" />
                        <span>{feature.split(" (")[0].split(", ")[0]}</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="pb-6 pt-0 pl-9 text-gray-700 leading-relaxed">
                      {feature}
                    </AccordionContent>
                  </AccordionItem>
                </FadeIn>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      <HiveDemoSection />

      {/* Strategic Value and Expected Advantages */}
      <section className="section-padding bg-white">
        <div className="container-width">
          <FadeIn direction="up">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-brand-blue md:text-4xl">
                Strategic Value and Expected Advantages
              </h2>
              <p className="mt-4 text-gray-600 max-w-3xl mx-auto">
                SuperGuardian&apos;s investment in Hive reflects a strategic focus on operational efficiency, adviser experience, security and scalability.
              </p>
            </div>
          </FadeIn>

          <div className="mt-12 max-w-4xl mx-auto space-y-4">
            {STRATEGIC_ADVANTAGES.map((item, index) => (
              <FadeIn key={index} direction="up" delay={index * 0.08}>
                <div className="flex items-start gap-3 rounded-xl border border-gray-200 bg-white p-6">
                  <CheckCircle className="h-6 w-6 shrink-0 text-green-500 mt-0.5" aria-hidden />
                  <p className="text-gray-700 leading-relaxed">{item}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Cybersecurity and Data Protection */}
      <section className="section-padding bg-gray-50">
        <div className="container-width">
          <FadeIn direction="up">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-brand-blue md:text-4xl">
                Cybersecurity and Data Protection
              </h2>
              <p className="mt-4 text-gray-600 max-w-3xl mx-auto">
                Hive has been developed with a security-by-design approach, aligned with SuperGuardian&apos;s broader information security framework.
              </p>
            </div>
          </FadeIn>

          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
            {CYBERSECURITY_ITEMS.map((item, index) => (
              <FadeIn key={index} direction="up" delay={index * 0.06}>
                <div className="relative h-full overflow-hidden rounded-xl border border-gray-200">
                  <div className="absolute inset-0 bg-gradient-to-br from-white to-gray-100/80" aria-hidden />
                  <svg className="absolute inset-0 h-full w-full opacity-30" aria-hidden>
                    <defs>
                      <pattern id={`hive-security-hex-${index}`} x="0" y="0" width="60" height="34.64" patternUnits="userSpaceOnUse" patternTransform="scale(2)">
                        <path d="M0 17.32L10 0H30L40 17.32L30 34.64H10L0 17.32Z M40 17.32H60" fill="none" stroke="#d1d5db" strokeWidth="0.55" />
                      </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill={`url(#hive-security-hex-${index})`} />
                  </svg>
                  <div className="relative z-10 flex h-full items-start gap-3 p-6">
                    <CheckCircle className="h-6 w-6 shrink-0 text-green-500 mt-0.5" />
                    <span className="text-gray-700 leading-relaxed">{item}</span>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Video section */}
      <section className="section-padding bg-white">
        <div className="container-width">
          <FadeIn direction="up">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-brand-blue md:text-4xl">
                Learn More About Hive
              </h2>
              <p className="mt-4 text-gray-600">
                Watch our short guides to get started with the Hive platform.
              </p>
            </div>
          </FadeIn>

          <div className="mt-12">
            <YouTubePlaylist videos={HIVE_VIDEOS} />
          </div>
        </div>
      </section>

      <CTASection
        title="Ready to use Hive?"
        description="Get in touch to learn how Hive can connect your team and streamline your workflows"
        primaryButtonText="Contact Us"
        primaryButtonHref="/contact"
        isExternal={false}
      />
    </>
  );
}
