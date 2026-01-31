import { Target, RefreshCw, Clock, FileSearch } from "lucide-react";

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
];

export function SpecialistServices() {
  return (
    <section className="section-padding bg-gray-50">
      <div className="container-width">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-brand-blue md:text-4xl">
            Specialist Services
          </h2>
          <p className="mt-4 text-gray-600">
            Additional expertise when you need it most
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => (
            <div
              key={service.title}
              className="rounded-xl bg-white p-6 text-center border border-gray-200"
            >
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-lg bg-brand-blue-50 text-brand-blue">
                <service.icon className="h-6 w-6" />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-gray-900">
                {service.title}
              </h3>
              <p className="mt-2 text-sm text-gray-600">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
