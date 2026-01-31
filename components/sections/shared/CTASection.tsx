import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";
import { FadeIn } from "@/components/ui/fade-in";

interface CTASectionProps {
  title: string;
  description: string;
  primaryButtonText: string;
  primaryButtonHref: string;
  secondaryButtonText?: string;
  secondaryButtonHref?: string;
  isExternal?: boolean;
}

export function CTASection({
  title,
  description,
  primaryButtonText,
  primaryButtonHref,
  secondaryButtonText,
  secondaryButtonHref,
  isExternal = true,
}: CTASectionProps) {
  return (
    <section className="relative bg-brand-blue py-16 md:py-20 overflow-hidden">
      {/* Lighter blue gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-blue-600 to-brand-blue-800" />
      
      <div className="container-width text-center relative">

        <FadeIn direction="up">
          <h2 className="text-3xl font-bold text-white md:text-4xl">{title}</h2>
        </FadeIn>
        <FadeIn direction="up" delay={0.1}>
          <p className="mt-4 text-lg text-gray-300">{description}</p>
        </FadeIn>
        <FadeIn direction="up" delay={0.2}>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            {isExternal ? (
              <Button size="lg" variant="secondary" asChild>
                <a
                  href={primaryButtonHref}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Sparkles className="mr-2 h-4 w-4" />
                  {primaryButtonText}
                </a>
              </Button>
            ) : (
              <Button size="lg" variant="secondary" asChild>
                <Link href={primaryButtonHref}>
                  <Sparkles className="mr-2 h-4 w-4" />
                  {primaryButtonText}
                </Link>
              </Button>
            )}
            {secondaryButtonText && secondaryButtonHref && (
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-brand-blue"
                asChild
              >
                <Link href={secondaryButtonHref}>{secondaryButtonText}</Link>
              </Button>
            )}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
