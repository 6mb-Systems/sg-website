import { Calendar, Check, Clock, User } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { UPCOMING_WEBINAR as SEMINAR, UPCOMING_WEBINAR_OUTCOMES as LEARNING_OUTCOMES } from "@/lib/upcoming-webinar";

export function UpcomingSeminarPromo() {
  return (
    <section className="relative overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
      <div className="absolute inset-0 bg-white" aria-hidden />
      <svg className="absolute inset-0 h-full w-full opacity-30" aria-hidden>
        <defs>
          <pattern
            id="upcoming-seminar-hex"
            x="0"
            y="0"
            width="60"
            height="34.64"
            patternUnits="userSpaceOnUse"
            patternTransform="scale(2)"
          >
            <path
              d="M0 17.32L10 0H30L40 17.32L30 34.64H10L0 17.32Z M40 17.32H60"
              fill="none"
              stroke="#d1d5db"
              strokeWidth="0.55"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#upcoming-seminar-hex)" />
      </svg>

      <div className="relative z-10 grid grid-cols-1 gap-6 p-6 md:grid-cols-12 md:gap-8 md:p-8">
        <div className="md:col-span-7 lg:col-span-7">
          <div className="inline-flex items-center rounded-full border border-brand-blue/20 bg-brand-blue/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-brand-blue">
            Upcoming webinar
          </div>
          <h3 className="mt-2 text-3xl font-bold text-brand-blue md:text-4xl">
            {SEMINAR.title}
          </h3>
          <p className="mt-4 text-sm leading-relaxed text-gray-700 md:text-base">
            {SEMINAR.blurb}
          </p>

          <div className="mt-5 flex flex-col gap-3 text-sm text-gray-600 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-6 sm:gap-y-2">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-brand-blue" aria-hidden />
              <span>{SEMINAR.date}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-brand-blue" aria-hidden />
              <span>{SEMINAR.time}</span>
            </div>
            <div className="flex items-center gap-2">
              <User className="h-4 w-4 text-brand-blue" aria-hidden />
              <span>{SEMINAR.presenter}</span>
            </div>
          </div>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Button
              asChild
              size="lg"
              className="bg-brand-orange text-white hover:bg-brand-orange/90 px-8"
            >
              <a
                href={SEMINAR.registerHref}
                target="_blank"
                rel="noopener noreferrer"
              >
                Register for Free
              </a>
            </Button>
          </div>

          <div className="mt-7 flex flex-col">
            <p className="text-lg font-semibold text-brand-blue">
              Learning outcomes
            </p>
            <p className="mt-2 text-sm text-gray-600">
              At the end of this webinar, participants will have an appreciation for:
            </p>
            <ul className="m-0 mt-4 list-none space-y-3 p-0 text-left text-sm text-gray-700">
              {LEARNING_OUTCOMES.map((line) => (
                <li key={line} className="flex items-start gap-3 pl-0">
                  <Check
                    className="mt-0.5 h-4 w-4 shrink-0 text-brand-blue"
                    aria-hidden
                  />
                  <span className="min-w-0 flex-1">{line}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="md:col-span-5 lg:col-span-5">
          <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
            <div className="relative h-[320px] md:h-[360px] bg-gray-100 border-b border-gray-200">
              <Image
                src="/webinar_TimMiller.jpg"
                alt="Tim Miller, SMSF Technical and Education Manager at Smarter SMSF"
                fill
                className="object-cover [object-position:50%_15%]"
                sizes="(max-width: 768px) 100vw, 40vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-black/0 to-transparent" aria-hidden />
            </div>

            <div className="p-5 md:p-6">
              <p className="text-xl font-bold text-brand-blue">{SEMINAR.presenter}</p>
              <p className="mt-1 text-sm font-medium text-gray-600">
                {SEMINAR.presenterTitle}
              </p>
              <p className="mt-4 text-sm leading-relaxed text-gray-700">
                {SEMINAR.presenterBio}
              </p>

              <div className="mt-5 inline-flex items-center rounded-full border border-brand-blue/15 bg-brand-blue/5 px-3 py-1.5 text-xs font-semibold text-brand-blue">
                <span
                  className="mr-2 inline-flex items-center justify-center rounded-full bg-brand-blue px-2 py-0.5 text-[11px] font-bold leading-none text-white"
                  aria-hidden
                >
                  25+
                </span>
                Years experience
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

