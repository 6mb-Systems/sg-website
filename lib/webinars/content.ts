import {
  UPCOMING_WEBINAR,
  UPCOMING_WEBINAR_OUTCOMES,
} from "@/lib/upcoming-webinar";
import { webinarVideos as fallbackPastWebinars } from "@/lib/webinar-videos";
import type { UpcomingWebinarData, WebinarVideo } from "@/lib/webinar-types";
import {
  getPastWebinarsFromSanity,
  getUpcomingWebinarFromSanity,
} from "@/lib/sanity/queries";

function fallbackUpcomingWebinar(): UpcomingWebinarData {
  return {
    title: UPCOMING_WEBINAR.title,
    blurb: UPCOMING_WEBINAR.blurb,
    date: UPCOMING_WEBINAR.date,
    time: UPCOMING_WEBINAR.time,
    registerHref: UPCOMING_WEBINAR.registerHref,
    presenter: UPCOMING_WEBINAR.presenter,
    presenterTitle: UPCOMING_WEBINAR.presenterTitle,
    presenterBio: UPCOMING_WEBINAR.presenterBio,
    presenterImageUrl: "/webinar_TimMiller.jpg",
    presenterImageAlt: `${UPCOMING_WEBINAR.presenter}, ${UPCOMING_WEBINAR.presenterTitle}`,
    experienceBadge: "25+",
    learningOutcomes: [...UPCOMING_WEBINAR_OUTCOMES],
    isActive: true,
  };
}

export async function resolveUpcomingWebinar(): Promise<UpcomingWebinarData | null> {
  const fromSanity = await getUpcomingWebinarFromSanity();
  if (fromSanity) {
    return fromSanity.isActive ? fromSanity : null;
  }
  return fallbackUpcomingWebinar();
}

export async function resolvePastWebinars(): Promise<WebinarVideo[]> {
  const fromSanity = await getPastWebinarsFromSanity();
  if (fromSanity.length > 0) return fromSanity;
  return fallbackPastWebinars;
}
