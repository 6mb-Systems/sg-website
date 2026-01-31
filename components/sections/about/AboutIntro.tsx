const stats = [
  { value: "3000+", label: "Funds" },
  { value: "4.8★", label: "Client Satisfaction" },
  { value: "20+", label: "Years Industry Experience" },
];

export function AboutIntro() {
  return (
    <section className="section-padding bg-white">
      <div className="container-width">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <h1 className="text-4xl font-bold text-brand-blue md:text-5xl">
              About SuperGuardian
            </h1>
            <p className="mt-6 text-lg font-medium text-gray-900">
              SuperGuardian is a privately owned Chartered Accounting firm and
              specialist SMSF administrator, with more than 20 years of
              experience and administering more than 3,000 SMSFs.
            </p>
            <p className="mt-4 text-gray-600">
              We are well recognised for delivering a highly personalised,
              secure, and efficient service to trustees, accountants, financial
              advisers, brokers and wealth management firms across Australia.
            </p>
            <p className="mt-4 text-gray-600">
              Leveraging industry-leading certifications (ISO 27001 and SOC 2)
              and our proprietary Hive platform, we provide real-time insights
              through daily data feeds and proactive monthly reconciliations.
              This empowers trustees and their advisers to make confident,
              informed decisions through timely SMSF reporting, proactive
              compliance, and secure, personalised service.
            </p>

            {/* Stats */}
            <div className="mt-8 grid grid-cols-3 gap-8">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <div className="text-3xl font-bold text-brand-orange">
                    {stat.value}
                  </div>
                  <div className="mt-1 text-sm text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Image placeholder */}
          <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-gray-100">
            <div className="absolute inset-0 flex items-center justify-center text-gray-400">
              <span className="text-sm">Team photo</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
