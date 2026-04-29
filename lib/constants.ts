import { educationHubHref } from "@/lib/education-hub-tab";

export const siteConfig = {
  name: "SuperGuardian",
  description:
    "SuperGuardian is an independently owned Chartered Accounting firm and specialist self-managed super fund (SMSF) Administrator, established in 2002",
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
      hours: "Monday - Friday: 8:30 AM - 5:00 PM (ACST)",
    },
    melbourne: {
      name: "Melbourne",
      address: "Level 30, 35 Collins Street",
      city: "Melbourne VIC 3000",
      hours: "Monday - Friday: 8:30 AM - 5:00 PM (AEST)",
    },
  },
  social: {
    linkedin: "https://www.linkedin.com/company/superguardian-pty-ltd/",
    facebook: "https://www.facebook.com/SuperGuardianPtyLtd",
    youtube: "https://www.youtube.com/@SuperGuardianPtyLtd",
  },
  externalLinks: {
    /** Landing page for Log In button in header */
    login: "/login",
    getStarted: "https://applications.superguardian.com.au/",
    /** Direct links to Class portals (used on /login page) */
    clientLogin: "https://client.class.com.au/my/login?whitelabel=superguardian-superguardian",
    adviserLogin: "https://client.class.com.au/my/login?whitelabel=superguardian-superguardian",
    keyDocumentsLogin: "https://shareddocuments.sharepoint.com/sites/SGClientShare/Shared%20Documents/Forms/AllItems.aspx",
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
    {
      name: "Education",
      href: "/education",
      children: [
        { name: "Insights", href: educationHubHref("articles") },
        { name: "Webinars", href: educationHubHref("webinars") },
        { name: "Calculators", href: educationHubHref("calculators") },
      ],
    },
    {
      name: "Contact",
      href: "/contact",
      children: [
        { name: "Contact Us", href: "/contact" },
        { name: "Careers", href: "/careers" },
        { name: "Forms", href: "/sg-forms" },
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
    { name: "Hive", href: "/hive" },
    { name: "Pricing", href: "/pricing" },
    { name: "Security", href: "/security" },
    { name: "Education", href: "/education" },
    { name: "Contact", href: "/contact" },

  ],
};
