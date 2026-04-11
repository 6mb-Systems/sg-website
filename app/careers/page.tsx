import Image from "next/image";
import { PageHero } from "@/components/sections/shared/PageHero";
import { CTASection } from "@/components/sections/shared/CTASection";
import { FadeIn } from "@/components/ui/fade-in";

export default function CareersPage() {
  return (
    <>
      <PageHero
        title="Careers at SuperGuardian"
        description={
          <>
            Join our team of specialists and help shape
            <br />
            the future of SMSF administration in Australia
          </>
        }
      />

      {/* ── Photo Mosaic ─────────────────────────────────────────── */}
      <section className="bg-brand-blue-950 py-14 md:py-20">
        <div className="container-width">
          <FadeIn>
            <p className="text-brand-orange text-sm font-semibold uppercase tracking-widest mb-6">
              Life at SuperGuardian
            </p>
          </FadeIn>

          {/* Desktop mosaic: 3-col × 2-row + bottom strip */}
          <FadeIn delay={0.1}>
            <div
              className="hidden md:grid grid-cols-3 gap-3"
              style={{ gridTemplateRows: "260px 260px 280px" }}
            >
              {/* career_04 — large left, spans 2 rows */}
              <div className="col-span-2 row-span-2 relative overflow-hidden rounded-xl">
                <Image
                  src="/career_04.jpg"
                  alt="SuperGuardian workspace"
                  fill
                  className="object-cover object-right"
                  style={{ filter: "brightness(1.06) contrast(1.12) saturate(1.2)" }}
                  sizes="66vw"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-blue-950/50 to-transparent pointer-events-none" />
                <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.14) 0%, transparent 50%)" }} />
              </div>

              {/* career_02 — top right */}
              <div className="relative overflow-hidden rounded-xl">
                <Image
                  src="/career_02.jpg"
                  alt="SuperGuardian office"
                  fill
                  className="object-cover"
                  style={{ filter: "brightness(1.06) contrast(1.12) saturate(1.2)" }}
                  sizes="33vw"
                />
                <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.14) 0%, transparent 50%)" }} />
              </div>

              {/* career_03 — bottom right */}
              <div className="relative overflow-hidden rounded-xl">
                <Image
                  src="/career_03.jpg"
                  alt="SuperGuardian team collaboration"
                  fill
                  className="object-cover"
                  style={{ filter: "brightness(1.06) contrast(1.12) saturate(1.2)" }}
                  sizes="33vw"
                />
                <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.14) 0%, transparent 50%)" }} />
              </div>

              {/* career_01 — bottom left */}
              <div className="relative overflow-hidden rounded-xl">
                <Image
                  src="/career_01.jpg"
                  alt="SuperGuardian team"
                  fill
                  className="object-cover object-[center_30%]"
                  style={{ filter: "brightness(1.06) contrast(1.12) saturate(1.2)" }}
                  sizes="33vw"
                />
                <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.14) 0%, transparent 50%)" }} />
              </div>

              {/* career_05 — bottom right wide */}
              <div className="col-span-2 relative overflow-hidden rounded-xl">
                <Image
                  src="/career_05.jpg"
                  alt="SuperGuardian culture"
                  fill
                  className="object-cover object-[center_30%]"
                  style={{ filter: "brightness(1.06) contrast(1.12) saturate(1.2)" }}
                  sizes="66vw"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-brand-blue-950/40 to-transparent pointer-events-none" />
                <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.14) 0%, transparent 50%)" }} />
              </div>
            </div>
          </FadeIn>

          {/* Mobile layout: stacked grid */}
          <FadeIn delay={0.1}>
            <div className="md:hidden grid grid-cols-2 gap-2">
              <div className="col-span-2 relative overflow-hidden rounded-xl" style={{ height: "240px" }}>
                <Image src="/career_04.jpg" alt="SuperGuardian workspace" fill className="object-cover" style={{ filter: "brightness(1.06) contrast(1.12) saturate(1.2)" }} sizes="100vw" priority />
                <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.14) 0%, transparent 50%)" }} />
              </div>
              {[
                { src: "/career_02.jpg", alt: "SuperGuardian office" },
                { src: "/career_03.jpg", alt: "SuperGuardian collaboration" },
                { src: "/career_01.jpg", alt: "SuperGuardian team" },
                { src: "/career_05.jpg", alt: "SuperGuardian culture" },
              ].map(({ src, alt }) => (
                <div key={src} className="relative overflow-hidden rounded-xl" style={{ height: "150px" }}>
                  <Image src={src} alt={alt} fill className="object-cover" style={{ filter: "brightness(1.06) contrast(1.12) saturate(1.2)" }} sizes="50vw" />
                  <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.14) 0%, transparent 50%)" }} />
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── Why Work With Us ─────────────────────────────────────── */}
      <section className="section-padding bg-white">
        <div className="container-width">

          {/* Intro: oversized stat + text */}
          <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center mb-10 md:mb-6">
            <FadeIn direction="right">
              <div className="relative">
                <span
                  className="block font-bold leading-none text-brand-blue select-none"
                  style={{ fontSize: "clamp(5rem, 14vw, 9rem)", opacity: 0.08 }}
                >
                  24
                </span>
                <div className="-mt-10 md:-mt-14">
                  <span className="text-4xl md:text-5xl font-bold text-brand-blue leading-tight">
                    years of<br />expertise
                  </span>
                  <div className="mt-5 h-1 w-14 bg-brand-orange rounded-full" />
                </div>
              </div>
            </FadeIn>

            <FadeIn direction="left" delay={0.15}>
              <div>
                <h2 className="text-2xl font-bold text-brand-blue mb-4">
                  Why work with us?
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  SuperGuardian is an independently owned Chartered Accounting firm and specialist
                  self-managed super fund (SMSF) Administrator. With more than 24 years of experience,
                  we provide a premium service to Accountants, Financial Advisers, and Trustees.
                </p>
                <p className="mt-4 text-gray-600 leading-relaxed">
                  We are always on the lookout for talented, motivated individuals to join our team in
                  Adelaide and Melbourne. We offer a supportive, flexible and rewarding environment
                  where your professional development is a priority.
                </p>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      <CTASection
        title="Ready to join the team?"
        description={
          <>
            Check out our SEEK profile for all the latest
            <br />
            career opportunities at SuperGuardian
          </>
        }
        primaryButtonText="View on SEEK"
        primaryButtonHref="https://www.seek.com.au/SuperGuardian-jobs"
        isExternal={true}
      />
    </>
  );
}
