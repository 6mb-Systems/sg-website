/**
 * Two-phase Sanity cleanup:
 *
 *   Phase A — Webinar posts
 *     Delete every post with `isWebinarPost == true`. All non-webinar posts
 *     are left alone regardless of whether they appear on the canonical
 *     fact-sheet list.
 *
 *   Phase B — Orphaned categories
 *     Find category documents that, once webinar posts are removed, would
 *     have zero references, and delete them. This uses a GROQ predicate
 *     that excludes webinar posts from the reference count so categories
 *     only referenced by webinars are caught in the same run.
 *
 * Usage:
 *   node scripts/cleanup-sanity.mjs           # dry run (default)
 *   node scripts/cleanup-sanity.mjs --apply   # commit deletions
 */

import { createClient } from "@sanity/client";
import { readFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");
const DRY_RUN = !process.argv.includes("--apply");

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
const token =
  env.SANITY_STUDIO_TOKEN ||
  env.SANITY_API_TOKEN ||
  env.SANITY_STUDIO_IMPORT;

if (!token) {
  console.error("No write token found in .env.local");
  process.exit(1);
}

const client = createClient({
  projectId: env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: env.NEXT_PUBLIC_SANITY_DATASET || "production",
  token,
  apiVersion: "2024-01-01",
  useCdn: false,
});

// ── Helpers ────────────────────────────────────────────────────────────────
function decodeEntities(s) {
  return s
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&#39;/g, "'")
    .replace(/&#8217;/g, "’")
    .replace(/&#8216;/g, "‘")
    .replace(/&#8211;/g, "–")
    .replace(/&#8212;/g, "—")
    .replace(/&nbsp;/g, " ");
}

// ── Phase A: webinar posts to delete ───────────────────────────────────────
async function findWebinarPosts() {
  const posts = await client.fetch(`
    *[_type == "post"
      && !(_id in path("drafts.**"))
      && isWebinarPost == true
    ] {
      _id,
      title,
      "slug": slug.current,
      publishedAt
    } | order(publishedAt desc)
  `);
  return posts;
}

// ── Phase B: orphaned categories (after webinar removal) ───────────────────
async function findOrphanCategories() {
  // A category is considered orphaned if, once every webinar post is
  // removed, no document still references it via any field. We use a GROQ
  // predicate that excludes webinar posts from the reference count so that
  // categories only referenced by webinars are caught in the same run.
  const rows = await client.fetch(`
    *[_type == "category"] {
      _id,
      title,
      "slug": slug.current,
      "refCount": count(
        *[references(^._id) && !(_type == "post" && isWebinarPost == true)]
      )
    }
  `);
  const orphans = rows.filter((r) => r.refCount === 0);
  return { all: rows, orphans };
}

// ── Main ───────────────────────────────────────────────────────────────────
async function main() {
  console.log(
    `\n${DRY_RUN ? "🔎 DRY RUN" : "✍️  APPLY MODE"} — cleanup-sanity\n`
  );

  // Phase A — webinar posts
  const webinars = await findWebinarPosts();
  console.log(
    `📝 Webinar posts: ${webinars.length} found (all will be DELETED).\n`
  );
  if (webinars.length > 0) {
    for (const p of webinars) {
      const date = p.publishedAt
        ? new Date(p.publishedAt).toISOString().slice(0, 10)
        : "no-date";
      console.log(`  🗑  [${date}] ${decodeEntities(p.title)}`);
      console.log(`         _id=${p._id}  slug=${p.slug ?? "(none)"}`);
    }
  } else {
    console.log(`(no webinar posts)`);
  }

  // Phase B — orphaned categories (post-webinar-removal)
  console.log();
  const { all: allCats, orphans } = await findOrphanCategories();
  console.log(
    `📂 Categories: ${allCats.length} total, ${orphans.length} would be orphaned after webinar removal.\n`
  );
  if (orphans.length > 0) {
    console.log(`Orphaned category documents that would be DELETED:`);
    for (const o of orphans) {
      console.log(`  🗑  ${decodeEntities(o.title).padEnd(30)} (${o._id}, slug: ${o.slug})`);
    }
  } else {
    console.log(`(no orphaned categories)`);
  }

  if (DRY_RUN) {
    console.log(
      `\n[dry-run] No deletions. Re-run with --apply to commit.\n`
    );
    return;
  }

  // ── Apply ────────────────────────────────────────────────────────────────
  if (webinars.length === 0 && orphans.length === 0) {
    console.log(`\nNothing to delete.\n`);
    return;
  }

  // Delete webinar posts first so category reference counts are accurate
  // by the time we delete categories.
  if (webinars.length > 0) {
    console.log(`\n🗑  Deleting ${webinars.length} webinar posts...`);
    const tx = client.transaction();
    for (const p of webinars) tx.delete(p._id);
    await tx.commit();
    console.log(`✅ Deleted ${webinars.length} webinar posts.`);
  }

  if (orphans.length > 0) {
    console.log(`\n🗑  Deleting ${orphans.length} orphaned categories...`);
    const tx = client.transaction();
    for (const c of orphans) tx.delete(c._id);
    await tx.commit();
    console.log(`✅ Deleted ${orphans.length} categories.`);
  }

  console.log(`\nDone.\n`);
}

main().catch((err) => {
  console.error("\nFatal:", err.message);
  if (err.response?.body) {
    console.error("Response body:", JSON.stringify(err.response.body, null, 2));
  }
  process.exit(1);
});
