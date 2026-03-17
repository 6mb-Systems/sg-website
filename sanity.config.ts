import { buildLegacyTheme, defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "./sanity/schemaTypes";
import { richTablePlugin } from "sanity-plugin-rich-table";

const studioTheme = buildLegacyTheme({
  // Keep Studio surfaces pure white (matches preview tweak)
  "--component-bg": "#fff",
});

const projectId =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ||
  process.env.SANITY_STUDIO_PROJECT_ID!;
const dataset =
  process.env.NEXT_PUBLIC_SANITY_DATASET ||
  process.env.SANITY_STUDIO_DATASET ||
  "production";

export default defineConfig({
  name: "superguardian-studio",
  title: "SuperGuardian Education",
  projectId,
  dataset,
  theme: studioTheme,
  plugins: [
    structureTool(),
    richTablePlugin({}),
  ],
  schema: {
    types: schemaTypes,
  },
});
