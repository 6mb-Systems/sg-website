import { MapPin } from "lucide-react";
import { siteConfig } from "@/lib/constants";
import { FadeIn } from "@/components/ui/fade-in";

const locations = [
  siteConfig.locations.adelaide,
  siteConfig.locations.melbourne,
];

// Embed URLs: replace with your own from Google Maps (Share → Embed a map) for exact placement
const ADELAIDE_MAPS_EMBED =
  "https://maps.google.com/maps?q=65+Gilbert+Street+Adelaide+SA+5000&t=&z=15&ie=UTF8&iwloc=&output=embed";
const MELBOURNE_MAPS_EMBED =
  "https://maps.google.com/maps?q=35+Collins+Street+Melbourne+VIC+3000&t=&z=15&ie=UTF8&iwloc=&output=embed";

export function OfficeLocations() {
  return (
    <section className="section-padding bg-white">
      <div className="container-width">
        <FadeIn direction="up">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-brand-blue md:text-4xl">
              Our Locations
            </h2>
            <p className="mt-4 text-gray-600">
              We&apos;re easy to find in our city locations and if you&apos;re not nearby, we provide the same seamless service virtually nationwide
            </p>
          </div>
        </FadeIn>

        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2">
          {locations.map((location, index) => (
            <FadeIn key={location.name} direction="up" delay={index * 0.1}>
              <div className="overflow-hidden rounded-xl border border-gray-200">
                {/* Address card - no gap below */}
                <div className="relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-white to-brand-blue-50/60" aria-hidden />
                  <svg className="absolute inset-0 h-full w-full opacity-30" aria-hidden>
                    <defs>
                      <pattern
                        id={`location-hex-${index}`}
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
                    <rect width="100%" height="100%" fill={`url(#location-hex-${index})`} />
                  </svg>
                  <div className="relative z-10 flex flex-col p-6">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-5 w-5 text-brand-blue" />
                      <h3 className="text-xl font-semibold text-gray-900">
                        {location.name}
                      </h3>
                    </div>
                    <div className="mt-4 space-y-3">
                      <div>
                        <p className="text-sm font-medium text-gray-900">Address</p>
                        <p className="text-sm text-gray-600">
                          {location.address}
                          <br />
                          {location.city}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="aspect-[4/3] min-h-[240px]">
                  <iframe
                    title={index === 0 ? "SuperGuardian Adelaide office - 65 Gilbert Street" : "SuperGuardian Melbourne office - 35 Collins Street"}
                    src={index === 0 ? ADELAIDE_MAPS_EMBED : MELBOURNE_MAPS_EMBED}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="w-full h-full min-h-[240px]"
                  />
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
