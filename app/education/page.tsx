import type { Metadata } from "next";
import { EducationHub } from "@/components/sections/education/EducationHub";

export const metadata: Metadata = {
  title: "Education",
  description:
    "Comprehensive resources to help you navigate the SMSF landscape with confidence. Access fact sheets, webinars, and expert insights.",
};

export default function EducationPage() {
  return (
    <>
      {/* Hero */}
      <section className="section-padding bg-white">
        <div className="container-width">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold text-brand-blue md:text-5xl">
              SMSF Education Hub
            </h1>
            <p className="mt-6 text-lg text-gray-600">
              Comprehensive resources to help you navigate the SMSF landscape
              with confidence
            </p>
          </div>
        </div>
      </section>

      <EducationHub />
    </>
  );
}
