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

export const metadata: Metadata = {
  metadataBase: new URL("https://www.superguardian.com.au"),
  title: {
    default: "SuperGuardian | SMSF Admin Made Simple",
    template: "%s | SuperGuardian",
  },
  description:
    "SuperGuardian is an independently owned Chartered Accounting firm and specialist self-managed super fund (SMSF) Administrator with more than 20 years experience.",
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
    url: "https://www.superguardian.com.au",
    siteName: "SuperGuardian",
    title: "SuperGuardian | SMSF Admin Made Simple",
    description:
      "Expert SMSF administration, accounting, and compliance services for advisers, accountants, and trustees across Australia.",
  },
  twitter: {
    card: "summary_large_image",
    title: "SuperGuardian | SMSF Admin Made Simple",
    description:
      "Expert SMSF administration, accounting, and compliance services for advisers, accountants, and trustees across Australia.",
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
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
