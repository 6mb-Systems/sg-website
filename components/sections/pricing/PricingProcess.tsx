"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { FadeIn } from "@/components/ui/fade-in";

interface Step {
  number: number;
  title: string;
}

const newSMSFSteps: Step[] = [
  { number: 1, title: "Apply online" },
  { number: 2, title: "SuperGuardian welcomes you" },
  {
    number: 3,
    title:
      "SuperGuardian assists with registrations, account establishment, rollovers and contributions",
  },
  { number: 4, title: "Invest" },
];

const existingSMSFSteps: Step[] = [
  { number: 1, title: "Apply online" },
  { number: 2, title: "SuperGuardian welcomes you" },
  {
    number: 3,
    title:
      "SuperGuardian collects information from previous accountant and reconciles to date",
  },
  { number: 4, title: "Online access" },
];

type SMSFType = "new" | "existing";

interface PricingProcessProps {
  className?: string;
}

export function PricingProcess({ className }: PricingProcessProps) {
  const [activeType, setActiveType] = useState<SMSFType>("new");
  const steps = activeType === "new" ? newSMSFSteps : existingSMSFSteps;

  return (
    <section className={cn("section-padding", className ?? "bg-white")}>
      <div className="container-width">
        <FadeIn direction="up">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-brand-blue md:text-4xl">
              Our Process
            </h2>
            <p className="mt-4 text-gray-600">
              Simple, transparent and efficient
            </p>
          </div>
        </FadeIn>

        <FadeIn direction="up" delay={0.1}>
          <div className="mt-8 flex justify-center">
            <div className="inline-flex items-center rounded-full border border-gray-200 bg-gray-100 p-1">
              <button
                type="button"
                onClick={() => setActiveType("new")}
                className={cn(
                  "rounded-full px-5 py-2 text-sm font-medium transition-all",
                  activeType === "new"
                    ? "bg-brand-blue text-white shadow-sm"
                    : "text-gray-600 hover:text-gray-900"
                )}
              >
                New SMSF
              </button>
              <button
                type="button"
                onClick={() => setActiveType("existing")}
                className={cn(
                  "rounded-full px-5 py-2 text-sm font-medium transition-all",
                  activeType === "existing"
                    ? "bg-brand-blue text-white shadow-sm"
                    : "text-gray-600 hover:text-gray-900"
                )}
              >
                Existing SMSF
              </button>
            </div>
          </div>
        </FadeIn>

        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <FadeIn key={`${activeType}-${step.number}`} direction="up" delay={index * 0.1}>
              <div className="relative text-center">
                {index < steps.length - 1 && (
                  <div
                    className="absolute left-[calc(50%+28px)] top-7 hidden h-0.5 w-[calc(100%+2rem-56px)] bg-gray-200 lg:block"
                    aria-hidden
                  />
                )}
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-brand-blue text-xl font-bold text-white">
                  {step.number}
                </div>
                <p className="mt-4 text-sm text-gray-700 leading-relaxed">
                  {step.title}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
