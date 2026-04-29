import type { Metadata } from "next";
import { PageHero } from "@/components/sections/shared/PageHero";
import { SGFormsDocuments } from "@/components/sections/sg-forms/SGFormsDocuments";

export const metadata: Metadata = {
  title: "Forms",
  description:
    "SuperGuardian's many important services may be accessed via the documents and forms below.",
};

export default function SGFormsPage() {
  return (
    <>
      <PageHero
        title="Forms"
        description={
          <>
            {/* Narrow screens: avoid “may be” / “accessed” orphan; md+ keeps break after “accessed”. */}
            <span className="block md:hidden">
              SuperGuardian&apos;s many important services
              <br />
              may be accessed
              <br />
              via the documents and forms below
            </span>
            <span className="hidden md:block">
              SuperGuardian&apos;s many important services may be accessed
              <br />
              via the documents and forms below
            </span>
          </>
        }
      />

      <SGFormsDocuments />
    </>
  );
}
