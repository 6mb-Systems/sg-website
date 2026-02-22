import { FadeIn } from "@/components/ui/fade-in";

export function ValueProposition() {
  return (
    <section className="section-padding bg-white">
      <div className="container-width">
        <div className="mx-auto max-w-5xl text-center">
          <FadeIn direction="up">
            <p className="text-lg text-gray-700 leading-7 font-medium">
              SuperGuardian is an independently owned Chartered Accounting firm
              and specialist self-managed super fund (SMSF) Administrator with
              more than 24 years experience. We ensure Accountants, Trustees and Financial Advisers have ready access to the facts, tools and support they need to make informed decisions and to maximise wealth creation.
            </p>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
