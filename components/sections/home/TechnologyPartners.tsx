"use client";

const partners = [
  { name: "ASF Audits" },
  { name: "SmarterSMSF" },
  { name: "Accurium" },
  { name: "Class" },
  { name: "LAB" },
];

function LogoPlaceholder({ name }: { name: string }) {
  return (
    <div
      className="flex shrink-0 items-center justify-center rounded-xl border border-gray-200 bg-white px-8 py-5 shadow-sm"
      style={{ minWidth: "140px" }}
    >
      <span className="text-sm font-semibold text-gray-500">{name}</span>
    </div>
  );
}

/** Honeycomb pattern for Our Partners section (light orange background) */
function HoneycombBg() {
  return (
    <svg
      className="absolute inset-0 h-full w-full opacity-100"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <defs>
        <pattern
          id="our-partners-hive"
          x="0"
          y="0"
          width="60"
          height="34.64"
          patternUnits="userSpaceOnUse"
          patternTransform="scale(1.2)"
        >
          <path
            d="M0 17.32L10 0H30L40 17.32L30 34.64H10L0 17.32Z M40 17.32H60"
            fill="none"
            stroke="rgba(0,0,0,0.06)"
            strokeWidth="1"
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#our-partners-hive)" />
    </svg>
  );
}

export function TechnologyPartners() {
  return (
    <section className="relative overflow-hidden section-padding bg-brand-orange-100">
      <HoneycombBg />
      <div className="container-width relative z-10">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-brand-blue md:text-4xl">
            Our Partners
          </h2>
          <p className="mt-4 text-gray-600">
            Seamlessly integrated with leading SMSF platforms
          </p>
        </div>

        <div className="mt-12 overflow-hidden">
          <div className="flex w-max items-center gap-8 animate-marquee-right">
            {/* Duplicated row for seamless loop */}
            {[...partners, ...partners].map((partner, index) => (
              <LogoPlaceholder
                key={`${partner.name}-${index}`}
                name={partner.name}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
