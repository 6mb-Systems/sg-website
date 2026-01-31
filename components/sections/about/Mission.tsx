import { Users, MessageSquare, FileCheck } from "lucide-react";

export function Mission() {
  return (
    <section className="section-padding bg-gray-50">
      <div className="container-width">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <h2 className="text-3xl font-bold text-brand-blue md:text-4xl">
              Our Mission
            </h2>
            <p className="mt-6 text-lg text-gray-600">
              SuperGuardian ensures Trustees and Financial Advisers have ready
              access to the facts, tools and support they need to make informed
              decisions and to maximise wealth creation.
            </p>
          </div>

          {/* Icons illustration */}
          <div className="flex justify-center">
            <div className="relative">
              <div className="flex items-center justify-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-blue text-white">
                  <Users className="h-8 w-8" />
                </div>
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-orange text-white">
                  <MessageSquare className="h-8 w-8" />
                </div>
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-blue text-white">
                  <FileCheck className="h-8 w-8" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
