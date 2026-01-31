import { MapPin } from "lucide-react";
import { siteConfig } from "@/lib/constants";
import { FadeIn } from "@/components/ui/fade-in";

const locations = [
  siteConfig.locations.adelaide,
  siteConfig.locations.melbourne,
];

export function OfficeLocations() {
  return (
    <section className="section-padding bg-white">
      <div className="container-width">
        <FadeIn direction="up">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-brand-blue md:text-4xl">
              Our Locations
            </h2>
            <p className="mt-4 text-gray-600">
              Visit us at one of our convenient locations
            </p>
          </div>
        </FadeIn>

        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2">
          {locations.map((location, index) => (
            <FadeIn key={location.name} direction="up" delay={index * 0.1}>
              <div className="rounded-xl border border-gray-200 bg-white p-6 h-full">
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-brand-blue" />
                <h3 className="text-xl font-semibold text-gray-900">
                  {location.name}
                </h3>
              </div>
              
              <div className="mt-4 space-y-3">
                <div>
                  <p className="text-sm font-medium text-gray-900">Address</p>
                  <p className="text-sm text-gray-600">
                    {location.address}
                    <br />
                    {location.city}
                  </p>
                </div>
                
                <div>
                  <p className="text-sm font-medium text-gray-900">Contact</p>
                  <a
                    href={`tel:${location.phone.replace(/\s/g, "")}`}
                    className="text-sm text-brand-orange hover:text-brand-orange-600"
                  >
                    {location.phone}
                  </a>
                </div>
                
                <div>
                  <p className="text-sm font-medium text-gray-900">Hours</p>
                  <p className="text-sm text-gray-600">{location.hours}</p>
                </div>
              </div>
              </div>
            </FadeIn>
          ))}
        </div>

        {/* Map placeholder */}
        <FadeIn direction="up" delay={0.3}>
          <div className="mt-12">
          <div className="rounded-xl border border-gray-200 bg-gray-100 p-8">
            <div className="text-center">
              <h3 className="font-semibold text-gray-900">Find Us</h3>
              <p className="mt-2 text-sm text-gray-600">
                Interactive map showing all our office locations
              </p>
              <div className="mt-8 flex h-64 items-center justify-center rounded-lg bg-gray-200">
                <div className="text-center">
                  <MapPin className="mx-auto h-12 w-12 text-gray-400" />
                  <p className="mt-2 text-sm text-gray-500">
                    Interactive Google Map
                    <br />
                    Showing Melbourne & Adelaide offices
                  </p>
                </div>
              </div>
            </div>
          </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
