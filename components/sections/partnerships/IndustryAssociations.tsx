import Image from "next/image";
import { FadeIn } from "@/components/ui/fade-in";

const associations = [
  {
    name: "SMSF Association",
    logo: "/partner_logo_smsf_association.png",
    url: "https://www.smsfassociation.com/",
    type: "Professional Body | Corporate Sponsor",
    description: [
      "The peak professional body representing Australia's self managed super fund sector. SuperGuardian proudly supports the SMSF Association as a corporate sponsor, with our SMSF experts accredited as SMSF Specialist Advisors (SSA®).",
      "Through this partnership we stay connected to the latest regulatory and technical developments, helping us deliver advice and administration that meets the highest industry standards for trustees, advisers and accountants.",
    ],
  },
  {
    name: "Chartered Accountants Australia & New Zealand (CA ANZ)",
    logo: "/partner_logo_CA.png",
    url: "https://www.charteredaccountantsanz.com/",
    type: "Professional Body | Corporate Sponsor",
    description: [
      "Chartered Accountants Australia and New Zealand are the peak professional accounting body, representing over 140,000 Chartered Accountants across Australia, New Zealand, and internationally. CA ANZ focuses on professional education, advocacy, and leadership in the finance profession.",
      "Our SMSF experts hold advanced SMSF specialist recognition and, where applicable, CA ANZ specialist pathways, reflecting our commitment to the highest standards of technical excellence.",
    ],
  },
];

export function IndustryAssociations() {
  return (
    <section className="section-padding bg-white">
      <div className="container-width">
        <FadeIn direction="up">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-brand-blue md:text-4xl">
              Industry Associations
            </h2>
            <p className="mt-4 text-gray-600">
              Active membership in leading professional bodies
            </p>
          </div>
        </FadeIn>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
          {associations.map((assoc, index) => (
            <FadeIn key={assoc.name} direction="up" delay={index * 0.1} className="h-full">
              <a
                href={assoc.url}
                target="_blank"
                rel="noopener noreferrer"
                className="relative block h-full overflow-hidden rounded-xl border border-gray-200 cursor-pointer transition-shadow hover:shadow-md"
                aria-label={`${assoc.name} – visit website`}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white to-brand-blue-50/60" aria-hidden />
                <svg className="absolute inset-0 h-full w-full opacity-30" aria-hidden>
                  <defs>
                    <pattern
                      id={`assoc-hex-${index}`}
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
                  <rect width="100%" height="100%" fill={`url(#assoc-hex-${index})`} />
                </svg>
                <div className="relative z-10 flex h-full min-h-0 flex-col p-6">
                {/* Fixed height so text below aligns across both cards */}
                <div className="flex h-[140px] shrink-0 items-center justify-center">
                  <Image
                    src={assoc.logo}
                    alt=""
                    width={assoc.name === "SMSF Association" ? 380 : 220}
                    height={assoc.name === "SMSF Association" ? 140 : 75}
                    className={`h-auto w-full object-contain object-center ${assoc.name === "SMSF Association" ? "max-h-28 max-w-[340px]" : "max-h-[75px] max-w-[200px]"}`}
                    sizes={assoc.name === "SMSF Association" ? "(max-width: 768px) 100vw, 380px" : "(max-width: 768px) 100vw, 220px"}
                  />
                </div>
                {/* Flex-1 so both cards stay same height in grid */}
                <div className="mt-4 min-h-0 flex-1 space-y-3">
                  {assoc.description.map((para, i) => (
                    <p key={i} className="text-sm text-gray-600 leading-relaxed">
                      {para}
                    </p>
                  ))}
                </div>
                </div>
              </a>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
