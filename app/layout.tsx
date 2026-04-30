import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { GoogleAnalytics } from "@/components/analytics/GoogleAnalytics";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

/** Canonical origin for metadata (og:image etc.). Preview deployments use VERCEL_URL when unset. */
function metadataOrigin(): URL {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
  if (fromEnv) return new URL(fromEnv);
  if (process.env.VERCEL_URL) return new URL(`https://${process.env.VERCEL_URL}`);
  return new URL("https://www.superguardian.com.au");
}

const defaultOgImage = {
  url: "/sg_logo_favicon.png",
  width: 451,
  height: 438,
  alt: "SuperGuardian — SMSF administration",
};

export const metadata: Metadata = {
  metadataBase: metadataOrigin(),
  icons: {
    icon: "/sg_logo_favicon.png",
  },
  title: {
    default: "SuperGuardian | SMSF Admin Made Simple",
    template: "%s | SuperGuardian",
  },
  description:
    "SuperGuardian is an independently owned Chartered Accounting firm and specialist self-managed super fund (SMSF) Administrator, established in 2002",
  keywords: [
    "SMSF",
    "self-managed super fund",
    "SMSF administration",
    "SMSF accounting",
    "superannuation",
    "Australia",
    "SMSF compliance",
  ],
  authors: [{ name: "SuperGuardian" }],
  openGraph: {
    type: "website",
    locale: "en_AU",
    url: metadataOrigin().href.replace(/\/$/, ""),
    siteName: "SuperGuardian",
    title: "SuperGuardian | SMSF Admin Made Simple",
    description:
      "Expert SMSF administration, accounting and compliance services for advisers, accountants and trustees across Australia.",
    images: [defaultOgImage],
  },
  twitter: {
    card: "summary_large_image",
    title: "SuperGuardian | SMSF Admin Made Simple",
    description:
      "Expert SMSF administration, accounting and compliance services for advisers, accountants and trustees across Australia.",
    images: [defaultOgImage.url],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-AU">
      <body className={`${inter.variable} font-sans`}>
        <GoogleAnalytics />
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
