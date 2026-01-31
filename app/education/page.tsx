import type { Metadata } from "next";
import { EducationHub } from "@/components/sections/education/EducationHub";
import { PageHero } from "@/components/sections/shared/PageHero";

export const metadata: Metadata = {
  title: "Education",
  description:
    "Comprehensive resources to help you navigate the SMSF landscape with confidence. Access fact sheets, webinars, and expert insights.",
};

export default function EducationPage() {
  return (
    <>
      <PageHero
        title="SMSF Education Hub"
        description="Comprehensive resources to help you navigate the SMSF landscape with confidence"
      />

      <EducationHub />
    </>
  );
}
