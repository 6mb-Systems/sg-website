/**
 * Fix upload for the two Non-Arm's Length files whose names use
 * smart apostrophe (U+2019) and en-dash (U+2013).
 */

import { createClient } from "@sanity/client";
import { readFileSync, createReadStream, readdirSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");
const IMAGE_DIR = resolve(ROOT, "public", "blog");

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

// Resolve exact filenames from disk (avoids encoding issues)
const allFiles = readdirSync(IMAGE_DIR);
const find = (partial) => allFiles.find((f) => f.toLowerCase().includes(partial.toLowerCase()));

const IMAGE_MAP = {
  [find("non-arm\u2019s length expenditure")]: [
    "non-arms-length-expenditure",
    "smsf-expenses-just-an-arms-length-away-2",
    "smsfs-acquiring-assets-from-related-parties",
    "smsfs-acquiring-assets-from-a-related-party",
    "webinar-the-problem-dealing-with-related-parties",
    "hardline-non-arms-length-expenses-approach-for-smsfs",
  ],
  [find("non-arm\u2019s length expenses")]: [
    "non-arms-lenth-expenses-in-an-smsf",
    "non-arms-length-expenditure-nale",
  ],
};

async function main() {
  const posts = await client.fetch(
    `*[_type == "post" && !(_id in path("drafts.**"))] { _id, "slug": slug.current }`
  );
  const postBySlug = new Map(posts.map((p) => [p.slug, p._id]));

  for (const [filename, slugs] of Object.entries(IMAGE_MAP)) {
    if (!filename) { console.warn("Could not find file on disk"); continue; }

    const filePath = resolve(IMAGE_DIR, filename);
    const postIds = slugs.map((s) => ({ slug: s, id: postBySlug.get(s) })).filter((p) => p.id);

    process.stdout.write(`↑  Uploading: ${filename} … `);
    const asset = await client.assets.upload("image", createReadStream(filePath), {
      filename,
      contentType: "image/jpeg",
    });
    console.log("done");

    const tx = client.transaction();
    for (const { id, slug } of postIds) {
      tx.patch(id, (p) =>
        p.set({ mainImage: { _type: "image", asset: { _type: "reference", _ref: asset._id }, alt: slug.replace(/-|_/g, " ") } })
      );
    }
    await tx.commit();
    console.log(`   ✓ Assigned to ${postIds.length} post(s): ${postIds.map((p) => p.slug).join(", ")}`);
  }

  console.log("\n✅ Fix complete!");
}

main().catch((err) => { console.error("Fatal:", err.message); process.exit(1); });
