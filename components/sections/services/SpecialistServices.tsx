import { Target, RefreshCw, Clock, FileSearch, Landmark } from "lucide-react";
import { FadeIn } from "@/components/ui/fade-in";

const services = [
  {
    icon: Target,
    title: "Limited Recourse Borrowing",
    description: "Expert guidance on SMSF property and asset financing",
  },
  {
    icon: RefreshCw,
    title: "Pension Conversions",
    description: "Seamless transition from accumulation to pension phase",
  },
  {
    icon: Clock,
    title: "Wind-up Services",
    description: "Complete SMSF closure and member rollout support",
  },
  {
    icon: FileSearch,
    title: "Audit Services",
    description: "Independent SMSF audits by qualified SMSF auditors",
  },
  {
    icon: Landmark,
    title: "UK Pension Funds",
    description:
      "Establishment, administration and ongoing HMRC reporting for ROPS funds",
  },
];

export function SpecialistServices() {
  return (
    <section className="section-padding bg-white">
      <div className="container-width">
        <FadeIn direction="up">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-brand-blue md:text-4xl">
              Specialist Services
            </h2>
            <p className="mt-4 text-gray-600">
              Additional expertise when you need it most
            </p>
          </div>
        </FadeIn>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {services.map((service, index) => (
            <FadeIn key={service.title} direction="up" delay={index * 0.1}>
              <div className="relative h-full overflow-hidden rounded-xl border border-gray-200">
                <div className="absolute inset-0 bg-gradient-to-br from-white to-gray-100/80" aria-hidden />
                <svg className="absolute inset-0 h-full w-full opacity-30" aria-hidden>
                  <defs>
                    <pattern id={`specialist-hex-${index}`} x="0" y="0" width="60" height="34.64" patternUnits="userSpaceOnUse" patternTransform="scale(2)">
                      <path d="M0 17.32L10 0H30L40 17.32L30 34.64H10L0 17.32Z M40 17.32H60" fill="none" stroke="#d1d5db" strokeWidth="0.55" />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill={`url(#specialist-hex-${index})`} />
                </svg>
                <div className="relative z-10 flex flex-col p-6 text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-lg bg-brand-blue-50 text-brand-blue">
                  <service.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-gray-900">
                  {service.title}
                </h3>
                <p className="mt-2 text-sm text-gray-600">{service.description}</p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
