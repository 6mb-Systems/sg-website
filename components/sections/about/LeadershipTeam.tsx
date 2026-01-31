const team = [
  {
    name: "Joshua Williams",
    role: "Chief Operating Officer",
    image: null,
  },
  {
    name: "Emma Magee",
    role: "Associate Director – Operations and Compliance",
    image: null,
  },
  {
    name: "Eugene Gapac",
    role: "Associate Director – Business Process and Systems",
    image: null,
  },
  {
    name: "Rachel Button",
    role: "Accounting Manager",
    image: null,
  },
];

export function LeadershipTeam() {
  return (
    <section className="section-padding bg-gray-50">
      <div className="container-width">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-brand-blue md:text-4xl">
            Leadership Team
          </h2>
          <p className="mt-4 text-gray-600">
            Meet the experts leading SuperGuardian
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {team.map((member) => (
            <div key={member.name} className="text-center">
              {/* Avatar placeholder */}
              <div className="mx-auto h-32 w-32 overflow-hidden rounded-full bg-gradient-to-br from-brand-orange-200 to-brand-orange-400">
                <div className="flex h-full items-center justify-center text-white text-4xl font-bold">
                  {member.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
              </div>
              <h3 className="mt-4 text-lg font-semibold text-gray-900">
                {member.name}
              </h3>
              <p className="mt-1 text-sm text-brand-orange">{member.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
