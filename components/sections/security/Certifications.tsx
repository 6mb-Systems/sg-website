import { Shield, FileCheck, Lock, CheckCircle } from "lucide-react";

const certifications = [
  {
    icon: Shield,
    name: "ISO 27001",
    status: "Certified",
    description:
      "International standard for information security management systems",
    features: [
      "Comprehensive risk assessment and management",
      "Continuous monitoring and improvement",
      "Regular third-party audits and verification",
      "Global recognition and compliance",
    ],
  },
  {
    icon: FileCheck,
    name: "SOC 2 Type II",
    status: "Certified",
    description:
      "Rigorous audit of security, availability, and confidentiality controls",
    features: [
      "Trust Service Criteria compliance",
      "Independent auditor verification",
      "Operational effectiveness over time",
      "Customer data protection assurance",
    ],
  },
  {
    icon: Lock,
    name: "NIST Cybersecurity Framework",
    status: "Certified",
    description:
      "Comprehensive framework for managing cybersecurity risks",
    features: [
      "Risk-based approach to cybersecurity",
      "Industry-recognized best practices",
      "Continuous improvement methodology",
      "Enhanced threat detection and response",
    ],
  },
];

export function Certifications() {
  return (
    <section className="section-padding bg-gray-50">
      <div className="container-width">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-brand-blue md:text-4xl">
            Our Certifications
          </h2>
          <p className="mt-4 text-gray-600">
            SuperGuardian holds industry-leading security certifications that
            demonstrate our commitment to protecting your data
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-3">
          {certifications.map((cert) => (
            <div
              key={cert.name}
              className="rounded-xl border border-gray-200 bg-white p-8"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-brand-blue-50 text-brand-blue">
                  <cert.icon className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">
                    {cert.name}
                  </h3>
                  <span className="inline-block rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
                    {cert.status}
                  </span>
                </div>
              </div>
              <p className="mt-4 text-sm text-gray-600">{cert.description}</p>
              <ul className="mt-6 space-y-3">
                {cert.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-2 text-sm text-gray-600"
                  >
                    <CheckCircle className="h-5 w-5 shrink-0 text-green-500" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
