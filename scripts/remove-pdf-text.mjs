/**
 * Remove "To read this fact sheet / download the PDF version here" paragraphs
 * from the body Portable Text of all posts in Sanity.
 *
 * Usage: node scripts/remove-pdf-text.mjs
 */

import { createClient } from "@sanity/client";
import { readFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");

function loadEnv() {
  const raw = readFileSync(resolve(ROOT, ".env.local"), "utf-8");
  const env = {};
  for (const line of raw.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const idx = trimmed.indexOf("=");
    if (idx === -1) continue;
    env[trimmed.slice(0, idx).trim()] = trimmed.slice(idx + 1).trim();
  }
  return env;
}

const env = loadEnv();
const client = createClient({
  projectId: env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: env.NEXT_PUBLIC_SANITY_DATASET || "production",
  token: env.SANITY_STUDIO_IMPORT,
  apiVersion: "2024-01-01",
  useCdn: false,
});

// Patterns that indicate a "download PDF" sentence to remove
const PDF_PATTERNS = [
  /to read this (fact sheet|bulletin|article)/i,
  /download the pdf version/i,
  /pdf version here/i,
  /download.*pdf.*here/i,
  /read.*entirety/i,
];

function blockTextContent(block) {
  if (!block?.children) return "";
  return block.children.map((c) => c.text ?? "").join("");
}

function shouldRemoveBlock(block) {
  if (block._type !== "block") return false;
  const text = blockTextContent(block);
  return PDF_PATTERNS.some((re) => re.test(text));
}

async function main() {
  // Fetch all posts with body
  const posts = await client.fetch(
    `*[_type == "post" && !(_id in path("drafts.**")) && defined(body)] {
      _id,
      "slug": slug.current,
      body
    }`
  );

  console.log(`Checking ${posts.length} posts...\n`);

  let patched = 0;
  let unchanged = 0;

  for (const post of posts) {
    const originalBody = post.body ?? [];
    const cleanedBody = originalBody.filter((block) => !shouldRemoveBlock(block));

    if (cleanedBody.length === originalBody.length) {
      unchanged++;
      continue;
    }

    const removed = originalBody.length - cleanedBody.length;
    await client.patch(post._id).set({ body: cleanedBody }).commit();
    patched++;
    console.log(`✓ ${post.slug} — removed ${removed} block(s)`);
  }

  console.log(`\n✅  Done!`);
  console.log(`   Posts updated   : ${patched}`);
  console.log(`   Already clean   : ${unchanged}`);
}

main().catch((err) => {
  console.error("Fatal:", err.message);
  process.exit(1);
});
