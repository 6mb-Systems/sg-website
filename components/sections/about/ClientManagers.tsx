"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronDown } from "lucide-react";
import { FadeIn } from "@/components/ui/fade-in";
import { cn } from "@/lib/utils";
import { clientServiceTeam as team } from "@/lib/staff";

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  const first = parts[0][0] ?? "";
  const last = parts[parts.length - 1][0] ?? "";
  return (first + last).toUpperCase();
}

export function ClientManagers() {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  return (
    <section className="section-padding bg-white">
      <div className="container-width">
        <FadeIn direction="up">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-brand-blue md:text-4xl">
              Client Service Team
            </h2>
            <p className="mt-4 text-gray-600">
              Meet the experts supporting you
            </p>
          </div>
        </FadeIn>

        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {team.map((member, index) => {
            const isExpanded = expandedId === member.name;
            const idSlug = member.name.replace(/\s+/g, "-").replace(/[^a-zA-Z0-9-]/g, "");
            return (
              <FadeIn key={member.name} direction="up" delay={index * 0.03}>
                <div className="flex flex-col">
                  <div className="relative mx-auto h-56 w-56 shrink-0 overflow-hidden rounded-full bg-gray-100 md:h-64 md:w-64">
                    {"image" in member && member.image ? (
                      <Image
                        src={member.image}
                        alt={member.name}
                        width={512}
                        height={512}
                        quality={90}
                        className="h-full w-full object-cover"
                        style={"imagePosition" in member && member.imagePosition ? { objectPosition: member.imagePosition as string } : undefined}
                        sizes="(max-width: 768px) 448px, 512px"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-brand-orange-200 to-brand-orange-400 text-2xl font-bold text-white">
                        {getInitials(member.name)}
                      </div>
                    )}
                  </div>
                  <h3 className="mt-4 text-center text-lg font-semibold text-gray-900">
                    {member.name}
                  </h3>
                  <p className="mt-1 text-center text-sm text-brand-orange">
                    {member.role}
                  </p>
                  <button
                    type="button"
                    onClick={() =>
                      setExpandedId(isExpanded ? null : member.name)
                    }
                    className="mt-3 flex w-full items-center justify-center gap-1 text-sm font-medium text-brand-blue hover:text-brand-blue-700 transition-colors"
                    aria-expanded={isExpanded}
                    aria-controls={`client-bio-${idSlug}`}
                    id={`client-toggle-${idSlug}`}
                  >
                    <span className="sr-only">
                      {isExpanded ? "Collapse" : "Expand"} biography
                    </span>
                    <ChevronDown
                      className={cn(
                        "h-5 w-5 transition-transform duration-200",
                        isExpanded && "rotate-180"
                      )}
                      aria-hidden
                    />
                  </button>
                  <div
                    id={`client-bio-${idSlug}`}
                    role="region"
                    aria-labelledby={`client-toggle-${idSlug}`}
                    className={cn(
                      "overflow-hidden transition-all duration-200 ease-in-out",
                      isExpanded ? "max-h-[3000px] opacity-100" : "max-h-0 opacity-0"
                    )}
                  >
                    <div className="mt-4 space-y-3 border-t border-gray-200 pt-4 text-left text-sm text-gray-600 leading-relaxed">
                      {member.fullBio.map((paragraph, i) => (
                        <p key={i}>{paragraph}</p>
                      ))}
                    </div>
                  </div>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}
