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
        description="Whether it's catching up on the latest changes to the SMSF environment, or refreshing your memory on those issues that only arise every so often we've got your SMSF professional development needs covered"
      />

      <EducationHub />
    </>
  );
}
