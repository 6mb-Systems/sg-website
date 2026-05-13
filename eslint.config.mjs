import { createRequire } from "module";

const require = createRequire(import.meta.url);

/** @type {typeof import("typescript-eslint")} */
const tseslint = require("typescript-eslint");

/** @type {import("eslint").Linter.Config[]} */
const eslintConfigNext = require("eslint-config-next/core-web-vitals");

/** @type {import("eslint").Linter.Config[]} */
const eslintConfig = [
  ...eslintConfigNext,
  {
    files: ["**/*.ts", "**/*.tsx"],
    plugins: {
      "@typescript-eslint": tseslint.plugin,
    },
    rules: {
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_" },
      ],
    },
  },
  {
    ignores: ["**/*.bak", "**/*.bak.*"],
  },
];

export default eslintConfig;
