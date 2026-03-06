import Image from "next/image";
import { FadeIn } from "@/components/ui/fade-in";

const measures = [
  {
    title: "Access Controls",
    description:
      "Multi-factor authentication and role-based access to ensure only authorized personnel can access sensitive data",
    image: "/security_framework_Access_Controls.png",
  },
  {
    title: "Compliance Monitoring",
    description:
      "Continuous compliance monitoring and regular security audits to maintain certification standards",
    image: "/security_framework_Compliance_Monitoring.png",
  },
  {
    title: "Data Encryption",
    description:
      "Encryption for all data in transit (TLS) and at rest, using industry-standard protocols.",
    image: "/security_framework_Data_Encryption.png",
  },
  {
    title: "Incident Response",
    description:
      "Comprehensive incident response plan with 24/7 monitoring and immediate escalation procedures",
    image: "/security_framework_Incident_Response.png",
  },
  {
    title: "Secure Infrastructure",
    description:
      "Australian-based data centres with 24/7 monitoring and redundant backup systems",
    image: "/security_framework_Secure_Infrastructure.png",
  },
  {
    title: "Staff Training",
    description:
      "Regular security awareness training for all team members on data protection and privacy",
    image: "/security_framework_Staff_Training.png",
  },
];

export function SecurityFramework() {
  return (
    <section className="section-padding bg-white">
      <div className="container-width">
        <FadeIn direction="up">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-brand-blue md:text-4xl">
              Our Security Framework
            </h2>
            <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
              Beyond certifications, we implement comprehensive security measures
              across all aspects of our operations
            </p>
          </div>
        </FadeIn>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {measures.map((measure, index) => (
            <FadeIn key={measure.title} direction="up" delay={index * 0.1}>
              <div className="relative h-full overflow-hidden rounded-xl">
                <Image
                  src={measure.image}
                  alt=""
                  width={400}
                  height={280}
                  className="h-56 w-full object-cover object-center"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-brand-blue/95 via-brand-blue/80 to-transparent p-5 pt-12">
                  <h3 className="text-lg font-semibold text-white">
                    {measure.title}
                  </h3>
                  <p className="mt-2 text-sm text-white/95 leading-relaxed">
                    {measure.description}
                  </p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
