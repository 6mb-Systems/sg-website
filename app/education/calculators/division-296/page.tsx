import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { PageHero } from "@/components/sections/shared/PageHero";
import { Division296Calculator } from "@/components/sections/education/Division296Calculator";
import { Division296HowItWorks } from "@/components/sections/education/Division296HowItWorks";
import { Button } from "@/components/ui/button";
import { educationHubHref } from "@/lib/education-hub-tab";

export const metadata: Metadata = {
  title: "Division 296 Tax Calculator",
  description:
    "Estimate Division 296 (Better Targeted Superannuation Concessions) tax from your total super balance and realised earnings.",
};

export default function Division296CalculatorPage() {
  return (
    <>
      <PageHero
        title="Division 296 Tax Calculator"
        description="Estimate how Division 296 may affect you based on your total super balance and realised earnings"
      />

      <section className="section-padding bg-white font-sans">
        <div className="container-width">
          <Button variant="secondary" asChild>
            <Link href={educationHubHref("calculators")}>
              <ArrowLeft className="h-4 w-4" aria-hidden />
              Back to Education Hub
            </Link>
          </Button>

          <div className="mt-10">
            <h2 className="text-2xl font-bold text-brand-blue md:text-3xl">
              Calculate how Division 296 will affect you
            </h2>
            <p className="mt-4 text-gray-600 leading-relaxed">
              Want to see how much you might pay under Division 296? Enter your details in the
              calculator and review the illustrative results.
            </p>
          </div>

          <div className="mt-10">
            <Division296Calculator />
          </div>
        </div>
      </section>

      <Division296HowItWorks />
    </>
  );
}
