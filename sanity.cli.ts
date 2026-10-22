import { defineCliConfig } from "sanity/cli";

export default defineCliConfig({
  api: {
    projectId:
      process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ||
      process.env.SANITY_STUDIO_PROJECT_ID!,
    dataset:
      process.env.NEXT_PUBLIC_SANITY_DATASET ||
      process.env.SANITY_STUDIO_DATASET ||
      "production",
  },
  // sanity-plugin-rich-table 2.x compiles with the React Compiler. Alias the
  // standalone shim to React 19's runtime so nested table cells render in `sanity dev`.
  vite: {
    resolve: {
      alias: [
        {
          find: /^react-compiler-runtime$/,
          replacement: "react/compiler-runtime",
        },
      ],
    },
    optimizeDeps: { exclude: ["react-compiler-runtime"] },
  },
});
