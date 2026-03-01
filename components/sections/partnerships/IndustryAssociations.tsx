import Image from "next/image";
import { CheckCircle } from "lucide-react";
import { FadeIn } from "@/components/ui/fade-in";

const associations = [
  {
    name: "SMSF Association",
    logo: "/partner_logo_smsf_association.png",
    url: "https://www.smsfassociation.com/",
    type: "Professional Body | Corporate Sponsor",
    description: [
      "The peak professional body representing Australia's self managed super fund sector. SuperGuardian proudly supports the SMSF Association as a corporate sponsor, with our SMSF experts accredited as SMSF Specialist Advisors (SSA®).",
    ],
    benefitsLabel: "Key benefits of the SMSF Association:",
    benefits: [
      "Industry advocacy for the SMSF sector",
      "Professional development and CPD opportunities",
      "Technical updates and resources to stay at the forefront of SMSF compliance",
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
    benefitsLabel: "Key benefits of CA ANZ:",
    benefits: [
      "Leading professional development, CPD, and specialist programs in accounting and SMSF practice",
      "Advocacy and thought leadership shaping industry and regulatory developments",
      "Access to a broad global network of Chartered Accounting professionals and resources",
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
            <FadeIn key={assoc.name} direction="up" delay={index * 0.1}>
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
                <div className="relative z-10 flex flex-col p-6">
                <div className={`flex items-center justify-center ${assoc.name === "SMSF Association" ? "min-h-[140px]" : "min-h-[120px]"}`}>
                  <Image
                    src={assoc.logo}
                    alt=""
                    width={assoc.name === "SMSF Association" ? 380 : 330}
                    height={assoc.name === "SMSF Association" ? 140 : 120}
                    className={`h-auto w-full object-contain object-center ${assoc.name === "SMSF Association" ? "max-h-28 max-w-[340px]" : "max-h-24 max-w-[300px]"}`}
                    sizes={assoc.name === "SMSF Association" ? "(max-width: 768px) 100vw, 380px" : "(max-width: 768px) 100vw, 330px"}
                  />
                </div>
                <div className="mt-4">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {assoc.name}
                  </h3>
                  <p className="mt-1 text-sm text-brand-orange">{assoc.type}</p>
                </div>
                <div className="mt-4 space-y-3">
                  {assoc.description.map((para, i) => (
                    <p key={i} className="text-sm text-gray-600 leading-relaxed">
                      {para}
                    </p>
                  ))}
                </div>
                <p className="mt-4 text-sm font-medium text-gray-800">
                  {assoc.benefitsLabel}
                </p>
                <ul className="mt-2 space-y-2">
                  {assoc.benefits.map((benefit) => (
                    <li
                      key={benefit}
                      className="flex items-start gap-2 text-sm text-gray-600"
                    >
                      <CheckCircle className="h-4 w-4 shrink-0 text-green-500 mt-0.5" />
                      {benefit}
                    </li>
                  ))}
                </ul>
                </div>
              </a>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
