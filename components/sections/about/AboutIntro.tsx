import { FadeIn, StaggerContainer } from "@/components/ui/fade-in";

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
            <FadeIn direction="up">
              <h1 className="text-4xl font-bold text-brand-blue md:text-5xl">
                About SuperGuardian
              </h1>
            </FadeIn>
            <FadeIn direction="up" delay={0.1}>
              <p className="mt-6 text-lg font-medium text-gray-900">
                SuperGuardian is a privately owned Chartered Accounting firm and
                specialist SMSF administrator, with more than 20 years of
                experience and administering more than 3,000 SMSFs.
              </p>
            </FadeIn>
            <FadeIn direction="up" delay={0.2}>
              <p className="mt-4 text-gray-600">
                We are well recognised for delivering a highly personalised,
                secure, and efficient service to trustees, accountants, financial
                advisers, brokers and wealth management firms across Australia.
              </p>
            </FadeIn>
            <FadeIn direction="up" delay={0.3}>
              <p className="mt-4 text-gray-600">
                Leveraging industry-leading certifications (ISO 27001 and SOC 2)
                and our proprietary Hive platform, we provide real-time insights
                through daily data feeds and proactive monthly reconciliations.
                This empowers trustees and their advisers to make confident,
                informed decisions through timely SMSF reporting, proactive
                compliance, and secure, personalised service.
              </p>
            </FadeIn>

            {/* Stats */}
            <StaggerContainer className="mt-8 grid grid-cols-3 gap-8" delay={0.4}>
              {stats.map((stat) => (
                <FadeIn key={stat.label} direction="up">
                  <div className="text-3xl font-bold text-brand-orange">
                    {stat.value}
                  </div>
                  <div className="mt-1 text-sm text-gray-600">{stat.label}</div>
                </FadeIn>
              ))}
            </StaggerContainer>
          </div>

          {/* Image placeholder */}
          <FadeIn direction="left" delay={0.2}>
            <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-gray-100 shadow-lg">
              <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                <span className="text-sm">Team photo</span>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
