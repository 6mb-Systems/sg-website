"use client";

import { CheckCircle, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { FadeIn } from "@/components/ui/fade-in";
import { HivePattern } from "@/components/sections/shared/PageHero";

interface PriceLine {
  amount: string;
  label: string;
}

interface Service {
  id: string;
  name: string;
  description: string;
  prices: PriceLine[];
  priceSubtitle?: string;
  timeline: string;
  badge: string;
  features: string[];
  hasFeesDownload: boolean;
  feesDownloadHref?: string;
}

const services: Service[] = [
  {
    id: "establishment",
    name: "Self Managed Super Fund Setup",
    description: "for new SMSF establishments",
    prices: [
      { amount: "$690", label: "individual trustees" },
      { amount: "$1,580", label: "corporate trustees" },
    ],
    timeline: "1 to 3 Business days",
    badge: "New SMSFs",
    hasFeesDownload: false,
    features: [
      "Welcome call",
      "Rollover support - $210 per member",
      "Trust deed preparation",
      "Fund establishment minutes and declaration",
      "TFN & ABN applications (ATO timeframes vary from 1 to 28 days)",
      "Bank account establishment assistance",
      "Limited investment strategy forms and guide",
      "Death Benefit Nomination form and guide",
      "Corporate trustee establishment (includes ASIC incorporation fee)",
    ],
  },
  {
    id: "administration",
    name: "Standard Administration",
    description: "for SMSFs on an eligible platform",
    prices: [{ amount: "from $215", label: "per month" }],
    priceSubtitle: "including independent audit",
    timeline: "Ongoing service",
    badge: "Most Popular",
    hasFeesDownload: true,
    feesDownloadHref: "/PDF/Standard-Fee-Schedule-2025-26-SuperGuardian.pdf",
    features: [
      "Monthly reconciliations",
      "Transaction processing",
      "Member benefit tracking",
      "Compliance monitoring",
      "24/7 online reporting",
      "Dedicated specialist Client Manager",
      "Fund Mailhouse",
      "Australian listed investments including shares, units and managed funds via BT Panorama, Commsec, Desktop Broker, Equity&Super, Finclear, Hub24, Macquarie, Selfwealth, Shaw and Partners",
      "Term deposits via Australian Money Market",
    ],
  },
  {
    id: "flexible",
    name: "Flexible Administration",
    description: "full-service for complex SMSFs",
    prices: [{ amount: "from $240", label: "per month" }],
    priceSubtitle: "including independent audit",
    timeline: "Ongoing service",
    badge: "Complex SMSFs",
    hasFeesDownload: true,
    feesDownloadHref: "/PDF/Flexible-Fee-Schedule-2025-26-SuperGuardian.pdf",
    features: [
      "Monthly reconciliations",
      "Transaction processing",
      "Member benefit tracking",
      "Compliance monitoring",
      "24/7 online reporting",
      "Dedicated specialist Client Manager",
      "Fund Mailhouse",
      "Foreign listed investments",
      "Unlisted managed funds",
      "Private company, derivatives, options, warrants, artwork, crypto currency and other similar assets",
    ],
  },
];

function ServiceCard({
  service,
  featuresMinHeight,
}: {
  service: Service;
  featuresMinHeight?: string;
}) {
  const isSetup = service.id === "establishment";
  return (
    <div
      id={service.id}
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm"
    >
      {/* Header band */}
      <div
        className={cn(
          "group/header relative min-h-[7rem] overflow-hidden px-6 pb-5 pt-6",
          isSetup ? "bg-brand-yellow" : "bg-brand-blue"
        )}
      >
        <div
          className={cn(
            "absolute inset-0 opacity-95",
            isSetup
              ? "bg-gradient-to-br from-brand-yellow-300 to-brand-yellow-500"
              : "bg-gradient-to-br from-brand-blue-700 to-brand-blue-950"
          )}
        />
        <HivePattern
          {...(isSetup
            ? {
                stroke: "rgba(30,58,95,0.35)",
                strokeBright: "rgba(255,255,255,0.9)",
              }
            : {})}
        />

        <div className="relative">
          <div className="flex items-start justify-between gap-3">
            <h3
              className={cn(
                "text-xl font-bold",
                isSetup ? "text-brand-blue-950" : "text-white"
              )}
            >
              {service.name}
            </h3>
            <span
              className={cn(
                "ml-auto shrink-0 rounded-full px-2.5 py-0.5 text-xs font-medium",
                isSetup
                  ? "bg-brand-blue text-white"
                  : "bg-brand-orange-50 text-brand-orange"
              )}
            >
              {service.badge}
            </span>
          </div>
          <p
            className={cn(
              "mt-1.5 text-sm",
              isSetup ? "text-brand-blue-900/80" : "text-white/70"
            )}
          >
            {service.description}
          </p>
        </div>
      </div>

      {/* Pricing block */}
      <div className="border-b border-gray-100 px-6 py-5 min-h-[9rem]">
        {service.prices.map((price) => {
          const isFromPrice = price.amount.startsWith("from ");
          const displayAmount = isFromPrice
            ? price.amount.replace("from ", "")
            : price.amount;

          return (
            <div key={price.label} className="flex items-baseline gap-2">
              {isFromPrice && (
                <span className="text-sm text-gray-500">from</span>
              )}
              <span className="text-3xl font-extrabold tracking-tight text-gray-900">
                {displayAmount}
              </span>
              <span className="text-sm text-gray-500">{price.label}</span>
            </div>
          );
        })}
        {service.priceSubtitle && (
          <p className="mt-1 text-sm text-gray-500">{service.priceSubtitle}</p>
        )}
        <div className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600">
          <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
          {service.timeline}
        </div>
      </div>

      {/* Features */}
      <div
        className={cn(
          "flex flex-1 flex-col px-6 pb-6 pt-5",
          featuresMinHeight
        )}
      >
        <ul className="flex-1 space-y-3">
          {service.features.map((feature) => (
            <li
              key={feature}
              className="flex items-start gap-2.5 text-sm leading-snug text-gray-600"
            >
              <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-green-500" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>

        {service.hasFeesDownload && (
          <a
            href={service.feesDownloadHref ?? "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex items-center justify-center gap-1.5 self-center text-sm font-medium text-brand-blue transition-colors hover:text-brand-blue-700"
          >
            <Download className="h-4 w-4" />
            Download full schedule of fees &amp; charges
          </a>
        )}

        <Button
          className="mt-5 w-full gap-2 bg-brand-orange text-white hover:bg-brand-orange/90"
          variant="default"
          asChild
        >
          <a
            href="https://applications.superguardian.com.au/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Get Started
          </a>
        </Button>
      </div>
    </div>
  );
}

export function ServiceCards() {
  return (
    <section className="section-padding bg-gray-50">
      <div className="container-width">
        <FadeIn direction="up">
          <p className="mx-auto max-w-2xl text-center text-xs text-gray-500">
            All fees quoted are inclusive of GST. We are independently owned
            and do not accept trails or commissions.
          </p>
        </FadeIn>
        <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <FadeIn key={service.id} direction="up" delay={index * 0.1}>
              <ServiceCard service={service} featuresMinHeight="min-h-[35rem]" />
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
