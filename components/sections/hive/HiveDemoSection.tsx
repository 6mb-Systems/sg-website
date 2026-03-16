"use client";

import Link from "next/link";
import { FadeIn } from "@/components/ui/fade-in";
import { Button } from "@/components/ui/button";
import { HivePattern } from "@/components/sections/shared/PageHero";

export function HiveDemoSection() {
  return (
    <section className="relative bg-brand-blue overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-brand-blue-700 to-brand-blue-950 opacity-95" />
      <HivePattern />
      <div className="container-width relative py-12 md:py-16 z-10">
        <div className="mx-auto max-w-3xl text-center">
          <FadeIn direction="up">
            <h2 className="text-4xl font-bold text-white md:text-5xl">
              Book a demo today
            </h2>
          </FadeIn>
          <FadeIn direction="up" delay={0.1}>
            <p className="mt-4 text-xl text-brand-orange font-medium">
              If you would like to see Hive in action, please book a demo today
            </p>
          </FadeIn>
          <FadeIn direction="up" delay={0.2}>
            <div className="mt-8 flex justify-center">
              <Button
                size="lg"
                variant="secondary"
                className="w-full max-w-[280px] sm:w-auto sm:max-w-none"
                asChild
              >
                <Link href="/contact">Book a Hive Demo</Link>
              </Button>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
