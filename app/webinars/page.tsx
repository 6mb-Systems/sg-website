import type { Metadata } from "next";
import { PageHero } from "@/components/sections/shared/PageHero";
import { YouTubePlaylist } from "@/components/sections/webinars/YouTubePlaylist";
import { webinarVideos } from "@/lib/webinar-videos";

export const metadata: Metadata = {
  title: "Webinars & Events",
  description:
    "Watch SuperGuardian's SMSF webinars and events. Stay up to date with the latest SMSF regulatory changes, compliance updates, and professional development content.",
};

export default function WebinarsPage() {
  return (
    <>
      <PageHero
        title="Webinars & Events"
        description="Stay current with SMSF compliance, regulation and strategy"
        subtitle="Access our library of CPD-accredited webinars and replays, delivered by leading SMSF professionals."
      />
      <YouTubePlaylist videos={webinarVideos} />
    </>
  );
}
