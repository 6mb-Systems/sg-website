import { Lock, Server, Eye, AlertTriangle, Users, CheckSquare } from "lucide-react";
import { FadeIn } from "@/components/ui/fade-in";

const measures = [
  {
    icon: Lock,
    title: "Data Encryption",
    description:
      "End-to-end encryption for all data in transit and at rest using industry-standard protocols",
  },
  {
    icon: Server,
    title: "Secure Infrastructure",
    description:
      "Australian-based data centers with 24/7 monitoring and redundant backup systems",
  },
  {
    icon: Eye,
    title: "Access Controls",
    description:
      "Multi-factor authentication and role-based access to ensure only authorized personnel can access sensitive data",
  },
  {
    icon: AlertTriangle,
    title: "Incident Response",
    description:
      "Comprehensive incident response plan with 24/7 monitoring and immediate escalation procedures",
  },
  {
    icon: Users,
    title: "Staff Training",
    description:
      "Regular security awareness training for all team members on data protection and privacy",
  },
  {
    icon: CheckSquare,
    title: "Compliance Monitoring",
    description:
      "Continuous compliance monitoring and regular security audits to maintain certification standards",
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
              <div className="rounded-xl bg-brand-orange-50 p-6 h-full">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-white text-brand-blue shadow-sm">
                  <measure.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-brand-blue">
                  {measure.title}
                </h3>
                <p className="mt-2 text-sm text-gray-700">{measure.description}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
