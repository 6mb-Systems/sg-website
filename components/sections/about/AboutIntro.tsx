import { FadeIn } from "@/components/ui/fade-in";
import { CountUp } from "@/components/ui/count-up";

const stats: { end: number; suffix: string; label: string; decimals?: number }[] = [
  { end: 3000, suffix: "+", label: "Funds" },
  { end: 4.8, suffix: "★", decimals: 1, label: "Client Satisfaction" },
  { end: 20, suffix: "+", label: "Years Industry Experience" },
];

export function AboutIntro() {
  return (
    <section className="section-padding bg-white">
      <div className="container-width">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <FadeIn direction="up">
              <h2 className="text-3xl font-bold text-brand-blue md:text-4xl">
                About SuperGuardian
              </h2>
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
            <div className="mt-8 grid grid-cols-3 gap-8">
              {stats.map((stat, index) => (
                <FadeIn key={stat.label} direction="up" delay={0.4 + index * 0.1}>
                  <div className="text-3xl font-bold text-brand-orange">
                    <CountUp
                      end={stat.end}
                      suffix={stat.suffix}
                      decimals={stat.decimals ?? 0}
                      duration={2000}
                      startOnView
                    />
                  </div>
                  <div className="mt-1 text-sm text-gray-600">{stat.label}</div>
                </FadeIn>
              ))}
            </div>
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
