import type { ReactNode } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/ui/fade-in";
import { HivePattern } from "@/components/sections/shared/PageHero";

interface CTASectionProps {
  title: string;
  subtitle?: string;
  description?: ReactNode;
  primaryButtonText: string;
  primaryButtonHref: string;
  secondaryButtonText?: string;
  secondaryButtonHref?: string;
  isExternal?: boolean;
}

export function CTASection({
  title,
  subtitle,
  description,
  primaryButtonText,
  primaryButtonHref,
  secondaryButtonText,
  secondaryButtonHref,
  isExternal = true,
}: CTASectionProps) {
  return (
    <section className="relative bg-brand-blue overflow-hidden">
      {/* Base gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-blue-700 to-brand-blue-950 opacity-95" />
      
      {/* Hive / honeycomb pattern */}
      <HivePattern />
      
      <div className="container-width relative py-12 md:py-16">
        <div className="mx-auto max-w-3xl text-center relative z-10">
          <FadeIn direction="up">
            <h2 className="text-4xl font-bold text-white md:text-5xl">{title}</h2>
          </FadeIn>
          {subtitle && (
            <FadeIn direction="up" delay={0.1}>
              <p className="mt-4 text-xl text-brand-orange font-medium">{subtitle}</p>
            </FadeIn>
          )}
          {description && (
            <FadeIn direction="up" delay={subtitle ? 0.2 : 0.1}>
              <p className="mt-4 text-xl text-brand-orange font-medium max-w-2xl mx-auto">
                {description}
              </p>
            </FadeIn>
          )}
          <FadeIn direction="up" delay={0.3}>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              {isExternal ? (
                <Button size="lg" variant="secondary" className="w-full max-w-[280px] sm:w-auto sm:max-w-none" asChild>
                  <a
                    href={primaryButtonHref}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {primaryButtonText}
                  </a>
                </Button>
              ) : (
                <Button size="lg" variant="secondary" className="w-full max-w-[280px] sm:w-auto sm:max-w-none" asChild>
                  <Link href={primaryButtonHref}>
                    {primaryButtonText}
                  </Link>
                </Button>
              )}
              {secondaryButtonText && secondaryButtonHref && (
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full max-w-[280px] sm:w-auto sm:max-w-none border-white bg-white text-brand-blue hover:bg-gray-200"
                  asChild
                >
                  <Link href={secondaryButtonHref}>{secondaryButtonText}</Link>
                </Button>
              )}
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
