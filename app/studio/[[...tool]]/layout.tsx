import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SuperGuardian Studio",
  description: "Content management for SuperGuardian Education Hub",
  // Keep the embedded Sanity Studio out of search indexes. Sanity handles auth,
  // but there is no reason for the login surface to be crawlable.
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: { index: false, follow: false },
  },
};

export default function StudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="fixed inset-0 z-50 bg-white">
      {children}
    </div>
  );
}
