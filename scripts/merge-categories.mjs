/**
 * Merge duplicate Sanity categories
 *
 * For each set of categories with the same normalised title:
 *  1. Pick one canonical document (shortest slug = most likely the "real" one)
 *  2. Patch every post that references a duplicate to point to the canonical doc
 *  3. Delete the duplicate category documents
 *
 * Usage: node scripts/merge-categories.mjs
 */

import { createClient } from "@sanity/client";
import { readFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");

// ── Load .env.local ────────────────────────────────────────────────────────
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

function normalise(title) {
  return title
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .toLowerCase()
    .trim();
}

async function main() {
  // 1. Fetch every category
  const allCats = await client.fetch(
    `*[_type == "category"] { _id, title, "slug": slug.current }`
  );
  console.log(`Found ${allCats.length} category documents total.\n`);

  // 2. Group by normalised title
  const groups = new Map(); // normalisedTitle → [{_id, title, slug}]
  for (const cat of allCats) {
    const key = normalise(cat.title);
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(cat);
  }

  // 3. Identify groups with duplicates
  const duplicateGroups = [...groups.values()].filter((g) => g.length > 1);
  console.log(`${duplicateGroups.length} titles have duplicates:\n`);

  if (duplicateGroups.length === 0) {
    console.log("Nothing to merge.");
    return;
  }

  for (const group of duplicateGroups) {
    // Pick the canonical doc: prefer the shortest slug (original WP nicename)
    group.sort((a, b) => a.slug.length - b.slug.length);
    const canonical = group[0];
    const duplicates = group.slice(1);

    const decodedTitle = canonical.title
      .replace(/&amp;/g, "&")
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'");

    console.log(`"${decodedTitle}"`);
    console.log(`  ✓ Keep   : ${canonical._id} (slug: ${canonical.slug})`);
    for (const dup of duplicates) {
      console.log(`  ✗ Remove : ${dup._id} (slug: ${dup.slug})`);
    }

    // Also fix the title on the canonical doc if it has HTML entities
    if (canonical.title !== decodedTitle) {
      await client.patch(canonical._id).set({ title: decodedTitle }).commit();
      console.log(`  ✎ Fixed title HTML entities on canonical doc`);
    }

    // 4. For each duplicate, find all posts referencing it and re-point them
    for (const dup of duplicates) {
      const posts = await client.fetch(
        `*[_type == "post" && references($id)] { _id, title }`,
        { id: dup._id }
      );

      if (posts.length > 0) {
        console.log(
          `  → Re-pointing ${posts.length} post(s) from ${dup._id} → ${canonical._id}`
        );
        const tx = client.transaction();
        for (const post of posts) {
          tx.patch(post._id, (p) =>
            p.set({ category: { _type: "reference", _ref: canonical._id } })
          );
        }
        await tx.commit();
      }

      // 5. Delete the duplicate category document
      await client.delete(dup._id);
      console.log(`  🗑  Deleted ${dup._id}`);
    }

    console.log();
  }

  console.log("✅ Category merge complete!");
}

main().catch((err) => {
  console.error("Fatal:", err.message);
  process.exit(1);
});
