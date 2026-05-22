import type { Metadata } from "next";
import { PageHero } from "@/components/sections/shared/PageHero";
import { YouTubePlaylist } from "@/components/sections/webinars/YouTubePlaylist";
import { resolvePastWebinars } from "@/lib/webinars/content";

export const metadata: Metadata = {
  title: "Webinars",
  description:
    "Watch SuperGuardian's SMSF webinars and events. Stay up to date with the latest SMSF regulatory changes, compliance updates, and professional development content.",
};

interface WebinarsPageProps {
  searchParams: Promise<{ v?: string }>;
}

export default async function WebinarsPage({ searchParams }: WebinarsPageProps) {
  const { v } = await searchParams;
  const pastWebinars = await resolvePastWebinars();
  return (
    <>
      <PageHero
        title="Webinars"
        description="Stay current with SMSF compliance, regulation and strategy"
        subtitle="Access our library of CPD-accredited webinars and replays, delivered by leading SMSF professionals."
      />
      <section className="section-padding bg-gray-50">
        <div className="container-width">
          <YouTubePlaylist videos={pastWebinars} initialVideoId={v} />
        </div>
      </section>
    </>
  );
}
