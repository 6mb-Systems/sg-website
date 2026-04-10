"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronDown } from "lucide-react";
import { FadeIn } from "@/components/ui/fade-in";
import { cn } from "@/lib/utils";

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  const first = parts[0][0] ?? "";
  const last = parts[parts.length - 1][0] ?? "";
  return (first + last).toUpperCase();
}

const team = [
  {
    name: "Jenna-lee Thiele",
    role: "Client Service Partner",
    image: "/profile_jenna.jpg",
    fullBio: [
      "Jenna has completed a Bachelor of Commerce (Accounting and Finance) at Flinders University. She is a Chartered Accountant (CA), completed her Professional Certificate in Self-Managed Super Funds, is RG146 qualified and is an SMSF Specialist Advisor (SSA).",
      "As a strategic problem solver, Jenna prides herself on understanding the specific needs of her clients and developing tailored solutions to suit their requirements.",
      "Jenna has been working in accounting and taxation since 2005 and has been specialising in SMSF since 2009.",
    ],
  },
  {
    name: "Victoria Kogan",
    role: "Client Service Partner",
    image: "/profile_victoria.jpg",
    fullBio: [
      "Victoria is an experienced CA SMSF specialist who has a deep passion for the Superannuation Industry and providing her clients with expert SMSF guidance.",
      "Prior to joining SuperGuardian, Victoria spent 6 years auditing both SMSF and Large APRA Funds and an additional 10 years heading up the Superannuation area of a medium sized chartered accounting firm. With Victoria's strong background in superannuation, compliance and client relationship management, her aim is to provide her clients with technical guidance and hands on support in an ever-evolving industry.",
      "Victoria holds a Bachelor of Business (Accountancy) degree from RMIT University and is a member of the ICAANZ where she has obtained her CA SMSF Specialist designation. Victoria is committed to ongoing professional development to stay ahead of the regulatory changes in the SMSF landscape.",
      "Outside of work, Victoria enjoys travel and spending time with her young family.",
    ],
  },
  {
    name: "Ben Plail",
    role: "Senior Client Manager",
    image: "/profile_ben.jpg",
    fullBio: [
      "Ben has been in the accounting industry since 2008, working in business services prior to joining SuperGuardian in 2016. He has specialised in superannuation accounting since 2015.",
      "He completed a Bachelor of Business at University of Tasmania, majoring in Accounting and Business Management. He is RG146 qualified and is an SMSF Specialist Advisor (SSA).",
      "As a Senior Client Manager his role involves managing all aspects of accounting, tax and compliance for his clients and advisers.",
    ],
  },
  {
    name: "Nicholas Anglim",
    role: "Senior Client Manager",
    image: "/profile_nicholas.jpg",
    fullBio: [
      "Nicholas has been in the accounting industry since 2010 and worked for nearly six years in a Big Four accounting practice before joining SuperGuardian. As a senior client manager Nicholas' skill set and knowledge is diverse and covers all aspects of accounting, tax and compliance.",
      "Nicholas focuses on delivering exceptional support and service to his clients. He has completed a Bachelor of Commerce and Bachelor of Arts at Deakin University. He is a Chartered Accountant (CA) and a SMSF Specialist Advisor (SSA).",
    ],
  },
  {
    name: "Cissy Liu",
    role: "Senior Client Manager",
    image: "/profile_cissy.jpg",
    fullBio: [
      "Cissy is an experienced SMSF specialist who has been dedicated to exceptional client support since she commenced in the industry in 2013.",
      "Prior to joining SuperGuardian, Cissy spent a considerable amount of time working at a large Australian SMSF administration firm. Her strong focus is accounting and tax.",
      "Cissy works hard to ensure her clients receive the highest level of service and support and feels personally rewarded when this is achieved. She has completed a Master of Business (Professional Accounting and Finance) from UniSA and a Bachelor of Law in China and she is a CPA.",
    ],
  },
  {
    name: "Jennifer Lin",
    role: "Senior Client Manager",
    image: "/profile_jennifer.jpg",
    fullBio: [
      "Jennifer is a CPA, Specialist SMSF adviser and holds a Bachelor of Commerce (Accounting & Finance). Having worked with SMSF since 2016, Jennifer has built extensive knowledge and experience in the field.",
      "She has built her career in small to medium accounting and advisory firms where she can focus on developing and maintaining solid relationships with her clients to deliver a tailored service.",
      "Jennifer takes pride in offering the highest level of ongoing quality service in a timely manner. She is an excellent communicator and is committed to helping clients achieve their financial goals.",
    ],
  },
  {
    name: "Dharshi Fernando",
    role: "Client Manager",
    image: "/profile_dharshi.jpg",
    fullBio: [
      "Dharshi has two decades of experience in superannuation accounting and joined SuperGuardian in 2022. Over her career she has worked hard to build a reputation for consistently delivering outstanding client support.",
      "Dharshi has completed a Bachelor of Business Administration majoring in Accounting and Business Management. She is a member of the Institute of Public Accountants Australia (MIPA AFA). She has also undertaken specialised studies in financial planning and SMSF.",
    ],
  },
  {
    name: "Alyssa Gueta",
    role: "Client Manager",
    image: "/profile_Alyssa.jpg",
    fullBio: [
      "Alyssa has been specialising in SMSF since 2013. Prior to joining SuperGuardian, she gained valuable experience as an external auditor across diverse industries and as an accountant in the insurance sector. These experiences shaped her ability to navigate complex challenges.",
      "At SuperGuardian, Alyssa has held a variety of roles and developed extensive experience in leading teams, technical and training matters, operations management, and client service. She holds a Bachelor of Science in Accountancy, is an Associate Member of CPA Australia, and is an SMSF Specialist Advisor (SSA).",
      "Alyssa is committed to delivering high quality level of service by providing exceptional support to the business and clients.",
    ],
  },
  {
    name: "Guillermo Federico",
    role: "Client Manager",
    image: "/profile_guillermo.jpg",
    fullBio: [
      "Guillermo has been in the industry since 2014. He is an experienced accountant (CPA) who has worked in various sectors, including government and private.",
      "He is RG146 qualified and is an SMSF Specialist Advisor (SSA). His day-to-day work consists of supporting, answering queries, and providing peace of mind to our clients.",
      "He believes that providing a timely response and assistance will achieve our client's financial goals.",
    ],
  },
  {
    name: "Cherie Zhang",
    role: "Client Manager",
    image: "/profile_cherie.jpg",
    fullBio: [
      "With over 12 years of experience in the SMSF sector, Cherie has developed deep expertise in SMSF compliance and client advisory. She has worked with a diverse range of clients, guiding them through regulatory changes and compliance challenges while providing tailored solutions to meet their unique needs. Highly client-focused, Cherie is skilled at resolving complex compliance issues efficiently and effectively.",
      "Cherie is a Chartered Accountant, a CAANZ SMSF Specialist, and an accredited SMSF Specialist Auditor (SSaud).",
      "Outside of work, Cherie enjoys spending time with family, traveling, and exploring new destinations.",
    ],
  },
  {
    name: "Trinny Nguyen",
    role: "Client Manager",
    image: "/profile_trinny.jpg",
    fullBio: [
      "Trinny is an SMSF specialist with over 13 years of experience in the industry, having worked in both auditing and accounting roles since 2013.",
      "Prior to joining SuperGuardian, she progressed from an SMSF auditor to a Client Manager, building extensive technical knowledge across all aspects of SMSF compliance and administration. She holds a Bachelor of Business with a major in Banking and Finance and is a member of the Institute of Public Accountants Australia.",
      "Trinny takes pride in delivering a high level of service while supporting the needs of both the business and clients.",
    ],
  },
  {
    name: "Keiko Bowie",
    role: "Assistant Client Manager",
    image: "/profile_keiko.jpg",
    fullBio: [
      "Keiko specialises in SMSFs and had been working in this field since 2019, following the completion of her Master of Professional Accounting at UniSA.",
      "She is a Chartered Accountant (CA) and completed the CA SMSF Specialist Course.",
      "Keiko is driven, proactive, and committed to achieving high-quality outcomes by applying professional expertise. She is passionate about empowering clients and continuously developing her skills.",
      "As a mother of twins, balancing a busy home life has sharpened Keiko's organisation and time management skills, qualities that support her professional approach.",
    ],
  },
  {
    name: "Marilyn Go",
    role: "Team Leader",
    image: "/profile_marilyn.jpg",
    fullBio: [
      "Marilyn has been with SuperGuardian since 2010. During this time, she has found a passion for client service and have been lucky enough to enjoy various roles within the business. Having this level of understanding of different roles allows Marilyn to help the entire team achieve company goals and surpass our yearly performance.",
      "Being a working mum and wife, Marilyn finds it both an honour and great responsibility to balance both. Marilyn feels thankful to be part of a squad that promotes work life balance and supports her in achieving her aspirations.",
    ],
  },
  {
    name: "Kathlyn Sace",
    role: "Manager - Client Service Administration",
    image: "/profile_kath.png",
    fullBio: [
      "Kathlyn joined SuperGuardian in 2020 after relocating from Manila to Adelaide, bringing with her a background in communications and client coordination. This role marked her first professional position in Australia, and she continues to be a valued member of the team.",
      "She holds a degree in Broadcast Communication and brings strong organisational and communication skills to her work.",
      "At SuperGuardian, Kathlyn plays a key role in supporting the administrative operations of the business. She oversees and mentors members of the administration team, helping to ensure processes run smoothly while maintaining a high standard of client service. Known for her leadership skills, ability to multitask, and collaborative approach, Kathlyn is committed to fostering a positive team environment and contributing to continuous improvement across the business.",
    ],
  },
  {
    name: "Joanne Burrows",
    role: "Client Services Assistant",
    image: "/profile_jo.png",
    fullBio: [
      "Jo Burrows brings a Diploma in Business Administration and a strong background in administration, operations, and client service. Before relocating to Australia, Jo built a diverse career in the UK across healthcare, education, and professional office environments.",
      "Through these roles, she developed extensive experience in client service, administration, and operational support, working closely with individuals, families and professionals to provide practical assistance and resolve queries effectively. In the education sector, she received a government award for significantly improving student attendance through effective collaboration with families and support services.",
      "In her role at SuperGuardian, Jo supports the team with strong organisational skills, attention to detail and a client-focused approach. Known for her approachable and empathetic nature, she excels at listening, communicating clearly and finding practical solutions, helping deliver a positive and efficient experience for clients of SuperGuardian.",
    ],
  },
];

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
