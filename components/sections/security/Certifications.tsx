import Image from "next/image";
import { CheckCircle } from "lucide-react";
import { FadeIn } from "@/components/ui/fade-in";

const certifications = [
  {
    name: "ISO 27001",
    status: "Certified",
    logo: "/security_ISO_27001.png",
    description:
      "Globally recognised standard for managing information security and protecting customer data.",
    features: [
      "Security embedded in Governance and Leadership, with accountability",
      "Comprehensive risk assessment and management",
      "Tight access controls, with sensitive data protected from collection to deletion",
      "Security culture embedded in people and trusted partners, with regular third-party audits",
    ],
  },
  {
    name: "SOC 2 Type II",
    status: "Attested",
    logo: "/security_SOC2.png",
    description:
      "Independent verification that our security controls are effective and operating reliably over time.",
    features: [
      "Controlled access to systems and data, with biometric authentication",
      "Continuous system monitoring, testing, and backups to ensure availability and resilience",
      "Robust safeguards to protect client data and maintain confidentiality",
      "Controls monitored and tested for operational effectiveness over time",
    ],
  },
  {
    name: "NIST Cybersecurity Framework",
    status: "Aligned",
    logo: "/security_NIST.png",
    description:
      "Industry-leading framework guiding our approach to cybersecurity and risk management",
    features: [
      "Risk-based cybersecurity programme aligned with global best practices",
      "Continuous improvement to stay ahead of evolving threats",
      "Strong detection, response, and recovery capabilities",
      "Structured approach to managing cyber risk across people, processes, and technology",
    ],
  },
];

export function Certifications() {
  return (
    <section className="section-padding bg-gray-50">
      <div className="container-width">
        <FadeIn direction="up">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-brand-blue md:text-4xl">
              Our Compliance
            </h2>
            <p className="mt-4 text-gray-600">
              SuperGuardian recognises that the confidentiality, integrity and availability of the information and data we create, maintain and host are vital to the success of our business and the privacy of our clients and partners. As a service provider, we are committed to providing clear, transparent information about our security practices so our clients can feel confident in choosing us as a trusted provider, supported by our proactive approach to identifying and mitigating risks, implementing best practices, and continuously improving.
            </p>
          </div>
        </FadeIn>

        <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-3">
          {certifications.map((cert, index) => (
            <FadeIn key={cert.name} direction="up" delay={index * 0.1}>
              <div className="relative h-full overflow-hidden rounded-xl border border-gray-200">
                <div className="absolute inset-0 bg-gradient-to-br from-white to-brand-blue-50/60" aria-hidden />
                <svg className="absolute inset-0 h-full w-full opacity-30" aria-hidden>
                  <defs>
                    <pattern
                      id={`cert-hex-${index}`}
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
                  <rect width="100%" height="100%" fill={`url(#cert-hex-${index})`} />
                </svg>
                <div className="relative z-10 flex flex-col p-6">
                  <div className="flex justify-center">
                    <Image
                      src={cert.logo}
                      alt=""
                      width={180}
                      height={120}
                      className="h-auto w-full max-w-[180px] object-contain"
                      sizes="(max-width: 1024px) 100vw, 180px"
                    />
                  </div>
                  <div className="mt-4 flex items-center gap-3">
                    <h3 className="text-xl font-semibold text-gray-900">
                      {cert.name}
                    </h3>
                    <span className="inline-block rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
                      {cert.status}
                    </span>
                  </div>
                  <p className="mt-3 text-sm text-gray-600">{cert.description}</p>
                  <ul className="mt-4 space-y-2">
                    {cert.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-start gap-2 text-sm text-gray-600"
                      >
                        <CheckCircle className="h-4 w-4 shrink-0 text-green-500 mt-0.5" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
