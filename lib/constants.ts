export const siteConfig = {
  name: "SuperGuardian",
  description:
    "SuperGuardian is an independently owned Chartered Accounting firm and specialist self-managed super fund (SMSF) Administrator with more than 24 years experience",
  url: "https://www.superguardian.com.au",
  phone: "1300 787 576",
  email: "info@superguardian.com.au",
  abn: "57 113 986 968",
  afsl: "485643",
  tan: "71800015",
  locations: {
    adelaide: {
      name: "Adelaide",
      address: "65 Gilbert Street",
      city: "Adelaide SA 5000",
      hours: "Monday – Friday: 8:30 AM – 5:00 PM (ACDT)",
    },
    melbourne: {
      name: "Melbourne",
      address: "Collins Place, Level 30, 35 Collins Street",
      city: "Melbourne VIC 3000",
      hours: "Monday – Friday: 8:30 AM – 5:00 PM (AEST)",
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
      href: "/who-we-are",
      children: [
        { name: "Who We Are", href: "/who-we-are" },
        { name: "What We Do", href: "/who-we-are#what-we-do" },
        { name: "Who We Help", href: "/who-we-are#who-we-help" },
      ],
    },
    { name: "Partnerships", href: "/partnerships" },
    { name: "Pricing", href: "/pricing" },
    { name: "Security", href: "/security" },
    { name: "Education", href: "/education" },
    {
      name: "Contact",
      href: "/contact",
      children: [
        { name: "Contact Us", href: "/contact" },
        { name: "Careers", href: "/careers" },
      ],
    },
  ],
  services: [
    { name: "SMSF Establishment", href: "/who-we-are#what-we-do" },
    { name: "SMSF Administration", href: "/who-we-are#what-we-do" },
    { name: "Accounting & Tax", href: "/who-we-are#what-we-do" },
    { name: "Compliance & Reporting", href: "/who-we-are#what-we-do" },
  ],
  navigate: [
    { name: "Home", href: "/" },
    { name: "What We Do", href: "/who-we-are#what-we-do" },
    { name: "Who We Are", href: "/who-we-are" },
    { name: "Who We Help", href: "/who-we-are#who-we-help" },
    { name: "Partnerships", href: "/partnerships" },
    { name: "Pricing", href: "/pricing" },
    { name: "Security", href: "/security" },
    { name: "Education", href: "/education" },
    { name: "Contact", href: "/contact" },
  ],
};
