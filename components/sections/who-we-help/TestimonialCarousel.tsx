"use client";

import * as React from "react";
import { Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface Testimonial {
  quote: string;
  name: string;
  title: string;
}

const testimonials: Testimonial[] = [
  {
    quote:
      "I have experienced a long engagement with SuperGuardian and over the years, they have gained my trust through their consistent and reliable services. My dedicated Client Manager offers clear and effective communication and a technical support I can depend on.",
    name: "Chris Cuffe",
    title: "Company Director & Chairman | Investment Professional",
  },
  {
    quote:
      "Happy to say that all my dealings with SuperGuardian are always dealt with efficiently and in a very timely manner \u2013 would be more than happy to recommend SuperGuardian to any new client. My point of contact has been Jennifer Lin and cannot speak more highly of her.",
    name: "Julia",
    title: "Bell Potter, NSW",
  },
  {
    quote:
      "Working with SuperGuardian has been an exceptional experience. Their team consistently delivers efficient and accurate support across all aspects of the SMSF function, including fund establishment, preparation of financial statements and tax returns, audit coordination, and the provision of clear and timely technical advice. Their depth of knowledge and proactive approach have made them a valuable extension of our own team.\n\nPartnering with SuperGuardian has also freed up significant time and capacity within our office, allowing us to focus more closely on other important aspects of our clients\u2019 needs. We rely on SuperGuardian with confidence and highly value the expertise and service they provide.",
    name: "Darren",
    title: "HJC, VIC",
  },
  {
    quote:
      "Jennifer Lin has been outstanding during the past fifteen months as Nicholson Wealth Management established itself and navigated the enormous impacts and sudden regulatory changes brought on by Covid19. Jen is always on call and ready to answer any questions, I also have great confidence that Jen\u2019s advice will be correct and up to date which is very important to me. Jen is particularly attentive when the opportunity arrives to work with a new client, she works very hard to understand their situation and provide a solution helping us to win the new business.",
    name: "Anthony",
    title: "Nicholson Wealth, VIC",
  },
  {
    quote:
      "Victoria has been a tremendous asset to Bell Potter\u2019s business. I have worked closely with SuperGuardian for several years, and Victoria consistently delivers a friendly and professional service that exceeds expectations. She goes above and beyond to complete tasks and resolve queries promptly and efficiently. When advising clients, I am always grateful for Victoria\u2019s technical support and for knowing she has our back.\n\nVictoria is a valuable member of SuperGuardian, and I look forward to a long and successful working relationship.",
    name: "Jeremy",
    title: "Bell Potter, VIC",
  },
  {
    quote:
      "Thanks to the SuperGuardian team for always responding so promptly to all of my queries. It is nice knowing I can come to you very easily for all of my clients SMSF needs and I am more than happy with your service. I continue to recommend SuperGuardian.",
    name: "Alyson",
    title: "NSW",
  },
  {
    quote:
      "I have been a client of SuperGuardian now for over 10 years. Over that time, I have received consistent and reliable service from all my account managers. Your systems and procedures are well established to make the managing of a SMSF effortless. I would recommend you to anyone who is considering the establishment of an SMSF or switching service providers.",
    name: "Anna",
    title: "VIC",
  },
  {
    quote:
      "I would like to thank you for your highly efficient handling of our account and attention to detail as we transitioned our superannuation into pension mode. You explained things clearly and we could not be happier. SuperGuardian has been great for us since we first established our SMSF, providing a highly efficient service at a reasonable annual cost.",
    name: "Colin",
    title: "VIC",
  },
  {
    quote:
      "I have found SuperGuardian to be an effective, professional means to an end when monitoring the boundaries and regulations of my SMSF. I particularly appreciate the occasional face to face meeting when required, or preferred, with my SMSF expert Senior Client Manager, Ben Plail. I am enjoying the association with SuperGuardian with its consistently, concise and accurate meetings of Government requirements in an ever-changing SMSF world.",
    name: "George",
    title: "SA",
  },
];

const AUTO_PLAY_MS = 7000;

export function TestimonialCarousel() {
  const [current, setCurrent] = React.useState(0);
  const [isPaused, setIsPaused] = React.useState(false);
  const timerRef = React.useRef<ReturnType<typeof setInterval> | null>(null);
  const fadeTimeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(
    null,
  );
  const [isFading, setIsFading] = React.useState(false);

  const total = testimonials.length;

  const goTo = React.useCallback(
    (index: number) => {
      const safeIndex = ((index % total) + total) % total;
      if (fadeTimeoutRef.current) {
        clearTimeout(fadeTimeoutRef.current);
      }
      setIsFading(true);
      fadeTimeoutRef.current = setTimeout(() => {
        setCurrent(safeIndex);
        setIsFading(false);
      }, 250);
    },
    [total],
  );

  React.useEffect(() => {
    if (isPaused) return;
    timerRef.current = setInterval(() => goTo(current + 1), AUTO_PLAY_MS);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (fadeTimeoutRef.current) clearTimeout(fadeTimeoutRef.current);
    };
  }, [current, isPaused, goTo]);

  const t = testimonials[current];

  return (
    <div
      className="mt-6"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="relative">
        <div
          className={cn(
            "bg-white px-0 py-6 sm:px-0 sm:py-8 text-center min-h-[220px] flex flex-col justify-center transition-opacity duration-300 ease-in-out",
            isFading ? "opacity-0" : "opacity-100",
          )}
        >
          <Quote
            className="mb-4 h-8 w-8 mx-auto text-brand-orange opacity-60"
            aria-hidden
          />
          <blockquote className="text-xs md:text-sm text-gray-700 leading-relaxed whitespace-pre-line max-w-3xl mx-auto">
            {t.quote}
          </blockquote>
          <div className="mt-6">
            <p className="font-semibold text-gray-900">{t.name}</p>
            <p className="text-sm text-gray-500">{t.title}</p>
          </div>
        </div>

        {/* Navigation arrows */}
        <button
          type="button"
          onClick={() => goTo(current - 1)}
          className="absolute left-0 top-1/2 -translate-x-4 -translate-y-1/2 hidden md:flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-600 shadow-sm transition-colors hover:bg-gray-50 hover:text-brand-blue"
          aria-label="Previous testimonial"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          type="button"
          onClick={() => goTo(current + 1)}
          className="absolute right-0 top-1/2 translate-x-4 -translate-y-1/2 hidden md:flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-600 shadow-sm transition-colors hover:bg-gray-50 hover:text-brand-blue"
          aria-label="Next testimonial"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      {/* Dot indicators */}
      <div className="mt-6 flex justify-center gap-2">
        {testimonials.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => goTo(i)}
            className={cn(
              "h-2 rounded-full transition-all duration-300",
              i === current
                ? "w-6 bg-brand-orange"
                : "w-2 bg-gray-300 hover:bg-gray-400",
            )}
            aria-label={`Go to testimonial ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
