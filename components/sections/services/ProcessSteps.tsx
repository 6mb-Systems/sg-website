import { FadeIn } from "@/components/ui/fade-in";

const steps = [
  {
    number: 1,
    title: "Initial Consultation",
    description:
      "We understand your needs and recommend the right services",
  },
  {
    number: 2,
    title: "Service Agreement",
    description:
      "Clear pricing and service levels with no hidden fees",
  },
  {
    number: 3,
    title: "Implementation",
    description:
      "Our experts handle all the setup and integration work",
  },
  {
    number: 4,
    title: "Ongoing Support",
    description:
      "Regular communication and proactive service delivery",
  },
];

export function ProcessSteps() {
  return (
    <section className="section-padding bg-white">
      <div className="container-width">
        <FadeIn direction="up">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-brand-blue md:text-4xl">
              Our Process
            </h2>
            <p className="mt-4 text-gray-600">
              Simple, transparent and efficient
            </p>
          </div>
        </FadeIn>

        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <FadeIn key={step.number} direction="up" delay={index * 0.1}>
              <div className="text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-brand-blue text-xl font-bold text-white">
                  {step.number}
                </div>
                <h3 className="mt-4 text-lg font-semibold text-gray-900">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm text-gray-600">{step.description}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
