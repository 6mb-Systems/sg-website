export const siteConfig = {
  name: "SuperGuardian",
  description:
    "SuperGuardian is an independently owned Chartered Accounting firm and specialist self-managed super fund (SMSF) Administrator with more than 20 years experience.",
  url: "https://www.superguardian.com.au",
  phone: "1300 787 576",
  email: "info@superguardian.com.au",
  abn: "57 113 986 968",
  afsl: "485643",
  locations: {
    adelaide: {
      name: "Adelaide",
      address: "65 Gilbert Street",
      city: "Adelaide SA 5000",
      phone: "1300 787 576",
      hours: "Monday – Friday: 8:30 AM – 5:00 PM (ACST)",
    },
    melbourne: {
      name: "Melbourne",
      address: "Collins Place, Level 30, 35 Collins Street",
      city: "Melbourne VIC 3000",
      phone: "1300 787 576",
      hours: "Monday – Friday: 8:30 AM – 5:00 PM (ACST)",
    },
  },
  social: {
    linkedin: "https://www.linkedin.com/company/superguardian-pty-ltd/",
    facebook: "https://www.facebook.com/SuperGuardianPtyLtd",
  },
  externalLinks: {
    login: "https://app.class.com.au/my/login",
    getStarted: "https://applications.superguardian.com.au/",
  },
};

export const navigation = {
  main: [
    { name: "Home", href: "/" },
    {
      name: "Who We Are",
      href: "#",
      children: [
        { name: "What We Do", href: "/what-we-do" },
        { name: "Who We Are", href: "/who-we-are" },
        { name: "Who We Help", href: "/who-we-help" },
      ],
    },
    { name: "Partnerships", href: "/partnerships" },
    { name: "Pricing & Process", href: "/pricing" },
    { name: "Security at SG", href: "/security" },
    { name: "Education", href: "/education" },
    { name: "Contact", href: "/contact" },
  ],
  services: [
    { name: "SMSF Establishment", href: "/what-we-do#establishment" },
    { name: "SMSF Administration", href: "/what-we-do#administration" },
    { name: "Accounting & Tax", href: "/what-we-do#accounting" },
    { name: "Compliance & Reporting", href: "/what-we-do#compliance" },
  ],
};
