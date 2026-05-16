import type { Metadata } from "next";
import { PageHero } from "@/components/sections/shared/PageHero";
import { YouTubePlaylist } from "@/components/sections/webinars/YouTubePlaylist";
import { webinarVideos } from "@/lib/webinar-videos";

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
  return (
    <>
      <PageHero
        title="Webinars"
        description="Stay current with SMSF compliance, regulation and strategy"
        subtitle="Access our library of CPD-accredited webinars and replays, delivered by leading SMSF professionals."
      />
      <section className="section-padding bg-gray-50">
        <div className="container-width">
          <YouTubePlaylist videos={webinarVideos} initialVideoId={v} />
        </div>
      </section>
    </>
  );
}
