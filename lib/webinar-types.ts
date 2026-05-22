export interface WebinarVideo {
  id: string;
  title: string;
  date?: string;
  duration?: string;
  description?: string;
}

export interface UpcomingWebinarData {
  title: string;
  blurb: string;
  date: string;
  time: string;
  registerHref: string;
  presenter: string;
  presenterTitle: string;
  presenterBio: string;
  presenterImageUrl?: string | null;
  presenterImageAlt?: string | null;
  experienceBadge?: string | null;
  learningOutcomes: string[];
  isActive: boolean;
}
