"use client";

const partners = [
  { name: "ASF Audits", color: "bg-brand-orange" },
  { name: "SmarterSMSF", color: "bg-brand-orange" },
  { name: "Accurium", color: "bg-brand-orange" },
  { name: "Class", color: "bg-brand-orange" },
  { name: "LAB", color: "bg-brand-orange" },
];

export function TechnologyPartners() {
  return (
    <section className="section-padding bg-gray-50">
      <div className="container-width">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-brand-blue md:text-4xl">
            Technology Partners
          </h2>
          <p className="mt-4 text-gray-600">
            Seamlessly integrated with leading SMSF platforms
          </p>
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
          {partners.map((partner) => (
            <div
              key={partner.name}
              className={`${partner.color} rounded-lg px-8 py-3 text-white font-medium`}
            >
              {partner.name}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
