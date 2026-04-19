"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronDown } from "lucide-react";
import { FadeIn } from "@/components/ui/fade-in";
import { cn } from "@/lib/utils";

const team = [
  {
    name: "Phil Jaquillard",
    role: "Executive Chairman",
    image: "/profile_phil.jpg",
    shortIntro:
      "Phil is a founding partner in Jaquillard Minns and Executive Chairman of SuperGuardian. A Fellow of the Institute of Chartered Accountants.",
    fullBio: [
      "He is a Fellow of the Institute of Chartered Accountants in Australia and holds a Bachelor of Economics degree and a Post Graduate Diploma in Accounting. In 1983, he won the Institute of Chartered Accountants Professional Year prize for South Australia. His initial training was at KPMG Chartered Accountants, Adelaide.",
      "Phil has extensive commercial experience having held the positions of Financial Accountant for Motorola Communications Australasia Pty Ltd, and General Manager of film production company Film & Television Associates Limited. In 1990 Phil commenced public practice, and since then has been providing advice to clients in relation to taxation, business structures, IT systems and superannuation.",
      "As a Director of SuperGuardian, Phil provides leadership in the areas of policy, quality control and compliance as well as technical advice in relation to IT systems and the integration of SuperGuardian systems to other platforms. He is a member of the Self-Managed Super Fund Association.",
    ],
  },
  {
    name: "David Minns",
    role: "Director",
    image: "/profile_david.jpg",
    shortIntro:
      "David is a founding partner in Jaquillard Minns and Director of SuperGuardian. A Fellow of the Institute of Chartered Accountants and FINSIA.",
    fullBio: [
      "As a Fellow of The Institute of Chartered Accountants, the Financial Services Institute of Australia (FINSIA) and the Taxation Institute of Australia, David is eminently qualified to provide high level strategic advice in areas such as superannuation, tax, finance and investment.",
      "David has a particular interest in superannuation and investment management, having successfully implemented numerous wealth accumulation strategies for high net worth clients. Advice often extends to supporting families with their financial longevity and financial management, including strategies for estate planning, succession planning, asset protection and mentoring successive generations on managing their financial affairs.",
      "David's experience also includes advice on the establishment of Private and Public Ancillary. Such structures enable wealthy families to meet their philanthropic objectives in a manner which provides for longevity with significant tax advantages.",
    ],
  },
  {
    name: "Joshua Williams",
    role: "Chief Executive Officer",
    image: "/profile_josh.jpg",
    shortIntro:
      "Josh has been with SuperGuardian since 2011 and is Chief Executive Officer. A respected leader within the SMSF community.",
    fullBio: [
      "He is highly regarded throughout the SMSF community, contributing to many industry events.",
      "Josh is passionate about providing a high level of service and advice to trustees of SMSFs, as well as providing a supportive role for brokers, financial advisers and accounting practices.",
      "Josh brings a mature perspective to the SuperGuardian team, having been responsible for governance, compliance and leadership in many organisational contexts in both past and current committee and board roles.",
    ],
  },
  {
    name: "Mark Ma",
    role: "Chief Financial Officer",
    image: "/profile_mark.jpg",
    shortIntro:
      "Mark is Chief Financial Officer of SuperGuardian and Managing Director of Jaquillard Minns. A Chartered Accountant with extensive commercial experience.",
    fullBio: [
      "Mark combines strong technical accounting expertise with commercial insight, overseeing financial reporting, cash flow forecasting, performance analysis, and risk management. He partners with the leadership team to translate financial data into actionable strategy, supporting expansion, operational efficiency, and shareholder value creation.",
      "He has particular strengths in financial modelling, dashboard reporting, and system optimisation, with a passion for using technology to enhance visibility and decision-making across the business.",
    ],
  },
  {
    name: "Emma Magee",
    role: "Associate Director - Risk and Compliance",
    image: "/profile_emma.jpg",
    shortIntro:
      "Emma has been with SuperGuardian since 2007 and is Associate Director - Operations and Compliance. A specialist in governance, risk and team leadership.",
    fullBio: [
      "In her current leadership position, she oversees compliance and risk, while also driving service efficiency and continuous improvement. With a strong focus on business improvement, Emma works closely with our team to enhance the client experience and deliver high-quality outcomes.",
      "Her extensive experience across the business gives her a unique perspective on client needs, and she remains dedicated to upholding the highest standards of support and service.",
      "Emma has completed the ICFS Specialist SMSF course and also leads the company's HR initiatives, supporting the growth and development of the team.",
    ],
  },
  {
    name: "Eugene Gapac",
    role: "Associate Director - Business Process and Systems",
    image: "/profile_eugene.jpg",
    shortIntro:
      "Eugene has been with SuperGuardian since 2008 and is Associate Director - Business Process and Systems. A leader in process improvement and operational efficiency.",
    fullBio: [
      "As a passionate innovator, Eugene's focus remains firmly focused on developing solutions to improve operational efficiency.",
      "He is also passionate about implementing process improvements through data analysis where he focuses on providing solutions to improve the customer experience.",
    ],
  },
];

export function LeadershipTeam() {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  return (
    <section className="section-padding bg-gray-50">
      <div className="container-width">
        <FadeIn direction="up">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-brand-blue md:text-4xl">
              Leadership Team
            </h2>
            <p className="mt-4 text-gray-600">
              Meet the experts leading SuperGuardian
            </p>
          </div>
        </FadeIn>

        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {team.map((member, index) => {
            const isExpanded = expandedId === member.name;
            return (
              <FadeIn key={member.name} direction="up" delay={index * 0.05}>
                <div className="flex flex-col">
                  <div className="relative mx-auto h-56 w-56 shrink-0 overflow-hidden rounded-full bg-gray-100 md:h-64 md:w-64">
                    <Image
                      src={member.image}
                      alt={member.name}
                      width={512}
                      height={512}
                      quality={90}
                      className="h-full w-full object-cover"
                      sizes="(max-width: 768px) 448px, 512px"
                    />
                  </div>
                  <h3 className="mt-4 text-center text-lg font-semibold text-gray-900">
                    {member.name}
                  </h3>
                  <p className="mt-1 text-center text-sm text-brand-orange">
                    {member.role}
                  </p>
                  <p className="mt-3 text-center text-sm text-gray-600 leading-relaxed line-clamp-3">
                    {member.shortIntro}
                  </p>
                  <button
                    type="button"
                    onClick={() =>
                      setExpandedId(isExpanded ? null : member.name)
                    }
                    className="mt-3 flex w-full items-center justify-center gap-1 text-sm font-medium text-brand-blue hover:text-brand-blue-700 transition-colors"
                    aria-expanded={isExpanded}
                    aria-controls={`bio-${member.name.replace(/\s/g, "-")}`}
                    id={`toggle-${member.name.replace(/\s/g, "-")}`}
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
                    id={`bio-${member.name.replace(/\s/g, "-")}`}
                    role="region"
                    aria-labelledby={`toggle-${member.name.replace(/\s/g, "-")}`}
                    className={cn(
                      "overflow-hidden transition-all duration-200 ease-in-out",
                      isExpanded ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0"
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
