import { CheckCircle } from "lucide-react";
import { FadeIn } from "@/components/ui/fade-in";

const associations = [
  {
    name: "SMSF Association",
    type: "Professional Body",
    membershipType: "Corporate Member",
    description: "Peak professional body for the SMSF sector",
    benefits: ["Industry advocacy", "Professional development", "Technical updates"],
  },
  {
    name: "Financial Planning Association",
    type: "Professional Body",
    membershipType: "Associate Member",
    description: "Australia's largest professional body for financial planners",
    benefits: ["Professional standards", "Networking", "Continuing education"],
  },
  {
    name: "CPA Australia",
    type: "Accounting Body",
    membershipType: "Corporate Partner",
    description: "One of the world's largest accounting bodies",
    benefits: ["Technical resources", "Professional development", "Industry updates"],
  },
  {
    name: "Chartered Accountants ANZ",
    type: "Accounting Body",
    membershipType: "Practice Member",
    description: "Professional accounting body serving Australia and New Zealand",
    benefits: ["Technical support", "Professional standards", "Knowledge sharing"],
  },
];

export function IndustryAssociations() {
  return (
    <section className="section-padding bg-gray-50">
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
              <div className="h-full flex flex-col rounded-xl border border-gray-200 p-6 hover:border-brand-blue hover:shadow-md transition-all hover:-translate-y-1">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {assoc.name}
                  </h3>
                  <p className="text-sm text-brand-orange">{assoc.type}</p>
                </div>
                <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600">
                  {assoc.membershipType}
                </span>
              </div>
              <p className="mt-4 text-sm text-gray-600">{assoc.description}</p>
              <ul className="mt-4 space-y-2">
                {assoc.benefits.map((benefit) => (
                  <li
                    key={benefit}
                    className="flex items-center gap-2 text-sm text-gray-600"
                  >
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    {benefit}
                  </li>
                ))}
              </ul>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
