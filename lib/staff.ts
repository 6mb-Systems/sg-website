export interface StaffMember {
  name: string;
  role: string;
  image: string;
  shortIntro?: string;
  fullBio: string[];
}

export const leadershipTeam: StaffMember[] = [
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

export const clientServiceTeam: StaffMember[] = [
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
