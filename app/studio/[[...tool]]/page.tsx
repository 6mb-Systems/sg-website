"use client";

import dynamic from "next/dynamic";

const NextStudio = dynamic(
  () => import("next-sanity/studio").then((mod) => mod.NextStudio),
  { ssr: false, loading: () => <div style={{ height: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>Loading Studio...</div> }
);

import baseConfig from "@/sanity.config";

// The embedded Studio lives at /studio, but the same sanity.config.ts is also
// used for the standalone Studio dev server at http://localhost:3333 (basePath "/").
// Overriding basePath here prevents the initial "Tool not found: studio" toast.
const config = { ...baseConfig, basePath: "/studio" };

export default function StudioPage() {
  return <NextStudio config={config} />;
}
