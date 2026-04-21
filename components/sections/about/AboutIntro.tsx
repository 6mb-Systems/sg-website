import { FadeIn } from "@/components/ui/fade-in";
import { CountUp } from "@/components/ui/count-up";
import Image from "next/image";

const stats: {
  end: number;
  suffix: string;
  label: string;
  decimals?: number;
  subLabel?: string;
}[] = [
  { end: 3500, suffix: "+", label: "SMSF Funds" },
  {
    end: 4.9,
    suffix: "★",
    decimals: 1,
    label: "Client Satisfaction",
    subLabel: "on ProductReview",
  },
  { end: 24, suffix: "+", label: "Years Industry Experience" },
];

export function AboutIntro() {
  return (
    <section className="section-padding bg-white pb-0" id="about">
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
                specialist SMSF administrator, with more than 24 years of
                experience and administering more than 3,500 SMSFs.
              </p>
            </FadeIn>
            <FadeIn direction="up" delay={0.2}>
              <p className="mt-4 text-gray-600">
                As a Chartered Accounting firm and registered tax agent, we have strict controls, policies, and procedures in place to ensure we provide a high-quality service to our clients. The only components of our service we outsource are audit, actuary, and specific documentation functions. We have always believed in audit independence and have appointed external auditors.
              </p>
            </FadeIn>
            <FadeIn direction="up" delay={0.3}>
              <p className="mt-4 text-gray-600">
                Leveraging industry-leading certifications (NIST, ISO 27001 and SOC 2)
                and our proprietary Hive platform, we provide real-time insights
                through daily data feeds and proactive monthly reconciliations.
                This empowers trustees and their advisers to make confident,
                informed decisions through timely SMSF reporting, proactive
                compliance, and secure, personalised service.
              </p>
            </FadeIn>
            <FadeIn direction="up" delay={0.4}>
              <p className="mt-4 text-gray-600">
                SuperGuardian&apos;s head office is in Adelaide, South Australia and a serviced office provide local capabilities in Melbourne. We have a team of dedicated and qualified Client Managers working out of both offices.
              </p>
            </FadeIn>

            {/* Stats */}
            <div className="mt-8 grid grid-cols-3 gap-8">
              {stats.map((stat, index) => {
                const content = (
                  <>
                    <div className="text-3xl font-bold text-brand-orange group-hover:text-brand-orange-600 transition-colors">
                      <CountUp
                        end={stat.end}
                        suffix={stat.suffix}
                        decimals={stat.decimals ?? 0}
                        duration={2000}
                        startOnView
                      />
                    </div>
                    <div className="mt-1 text-sm text-gray-600 group-hover:text-gray-900 transition-colors">
                      {stat.label}
                    </div>
                    {stat.subLabel ? (
                      <div className="mt-0.5 text-xs text-gray-500">{stat.subLabel}</div>
                    ) : null}
                  </>
                );

                return (
                  <FadeIn key={stat.label} direction="up" delay={0.5 + index * 0.1}>
                    <div className="group cursor-default">
                      {content}
                    </div>
                  </FadeIn>
                );
              })}
            </div>
          </div>

          {/* Image */}
          <FadeIn direction="left" delay={0.2}>
            <div className="relative aspect-[4/3] overflow-hidden rounded-xl shadow-lg">
              <Image 
                src="/About SuperGuardian.jpg" 
                alt="SuperGuardian team at reception" 
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
