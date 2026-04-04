import type { Metadata } from "next";
import { PageHero } from "@/components/sections/shared/PageHero";
import { SGFormsDocuments } from "@/components/sections/sg-forms/SGFormsDocuments";

export const metadata: Metadata = {
  title: "SG Forms",
  description:
    "Access important documents and forms for the SuperGuardian service.",
};

export default function SGFormsPage() {
  return (
    <>
      <PageHero
        title="SG Forms"
        description="Access important documents and forms below for the SuperGuardian service"
      />

      <SGFormsDocuments />
    </>
  );
}
