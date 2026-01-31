import { Heart, Shield, TrendingUp, Users, Lightbulb } from "lucide-react";

const values = [
  {
    icon: Heart,
    title: "Client-Centric",
    description: "Developing, growing and maintaining client relationships",
  },
  {
    icon: Shield,
    title: "Trusted",
    description: "Integrity and Independence",
  },
  {
    icon: TrendingUp,
    title: "Progressive",
    description: "Continuous improvement and open-loop learning",
  },
  {
    icon: Users,
    title: "Empowered",
    description:
      "Team orientated, inclusive, and viewing people as our most important asset",
  },
  {
    icon: Lightbulb,
    title: "Innovative",
    description: "Technology leadership",
  },
];

export function Values() {
  return (
    <section className="section-padding bg-white">
      <div className="container-width">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-brand-blue md:text-4xl">
            Our Values
          </h2>
          <p className="mt-4 text-gray-600">
            The principles that guide everything we do
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3 lg:grid-cols-5">
          {values.map((value) => (
            <div
              key={value.title}
              className="rounded-xl border border-gray-200 bg-white p-6 text-center hover:border-brand-blue transition-colors"
            >
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-lg bg-brand-blue-50 text-brand-blue">
                <value.icon className="h-6 w-6" />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-brand-blue">
                {value.title}
              </h3>
              <p className="mt-2 text-sm text-gray-600">{value.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
