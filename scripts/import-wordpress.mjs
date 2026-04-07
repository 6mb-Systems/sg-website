/**
 * WordPress XML → Sanity import script
 *
 * Usage:
 *   node scripts/import-wordpress.mjs
 *
 * Reads credentials from .env.local (SANITY_STUDIO_IMPORT token).
 * Parses superguardian.WordPress.2026-04-07 (1).xml in the project root.
 * Creates category documents first, then post documents.
 */

import { createClient } from "@sanity/client";
import { readFileSync } from "fs";
import { JSDOM } from "jsdom";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");

// ── Load .env.local ────────────────────────────────────────────────────────
function loadEnv() {
  const env = {};
  try {
    const raw = readFileSync(resolve(ROOT, ".env.local"), "utf-8");
    for (const line of raw.split("\n")) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) continue;
      const idx = trimmed.indexOf("=");
      if (idx === -1) continue;
      const key = trimmed.slice(0, idx).trim();
      const val = trimmed.slice(idx + 1).trim();
      env[key] = val;
    }
  } catch {
    console.error("Could not read .env.local");
    process.exit(1);
  }
  return env;
}

const env = loadEnv();
const PROJECT_ID = env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const DATASET = env.NEXT_PUBLIC_SANITY_DATASET || "production";
const TOKEN = env.SANITY_STUDIO_IMPORT;

if (!PROJECT_ID || !TOKEN) {
  console.error(
    "Missing NEXT_PUBLIC_SANITY_PROJECT_ID or SANITY_STUDIO_IMPORT in .env.local"
  );
  process.exit(1);
}

const client = createClient({
  projectId: PROJECT_ID,
  dataset: DATASET,
  token: TOKEN,
  apiVersion: "2024-01-01",
  useCdn: false,
});

// ── XML helpers ────────────────────────────────────────────────────────────
function getText(el, tag) {
  const found = el.getElementsByTagName(tag);
  return found.length ? found[0].textContent?.trim() ?? "" : "";
}

/** Get all <category> elements that represent actual WP categories (not tags) */
function getCategories(item) {
  const cats = [];
  const catEls = item.getElementsByTagName("category");
  for (const el of catEls) {
    const domain = el.getAttribute("domain");
    if (domain === "category") {
      const nicename = el.getAttribute("nicename");
      const label = el.textContent?.trim();
      if (nicename && label) cats.push({ nicename, label });
    }
  }
  return cats;
}

function getYoastMeta(item, key) {
  const metas = item.getElementsByTagName("wp:postmeta");
  for (const meta of metas) {
    const mk = getText(meta, "wp:meta_key");
    if (mk === key) return getText(meta, "wp:meta_value");
  }
  return "";
}

// ── HTML → Portable Text ──────────────────────────────────────────────────
/**
 * Very lightweight HTML → Portable Text converter.
 * Handles: p, h1-h6, ul/ol, li, strong, em, a, br, img (skipped).
 * Complex structures (tables, nested divs) collapse to plain text.
 */
function htmlToBlocks(html) {
  if (!html) return [];
  const { window } = new JSDOM(`<body>${html}</body>`);
  const body = window.document.body;
  const blocks = [];

  function markupForNode(node) {
    if (node.nodeType === 3 /* TEXT_NODE */) {
      return node.textContent || "";
    }
    if (node.nodeType !== 1 /* ELEMENT_NODE */) return "";

    const tag = node.tagName.toLowerCase();
    if (tag === "br") return "\n";
    if (tag === "img") return ""; // skip inline images in body

    const children = Array.from(node.childNodes).map(markupForNode).join("");
    return children;
  }

  function spanChildren(node, extraMarks = []) {
    const spans = [];

    function walk(n, marks) {
      if (n.nodeType === 3) {
        const text = n.textContent || "";
        if (text) spans.push({ _type: "span", _key: uid(), text, marks });
        return;
      }
      if (n.nodeType !== 1) return;

      const tag = n.tagName.toLowerCase();
      let newMarks = [...marks];

      if (tag === "strong" || tag === "b") newMarks.push("strong");
      else if (tag === "em" || tag === "i") newMarks.push("em");
      else if (tag === "br") {
        spans.push({ _type: "span", _key: uid(), text: "\n", marks });
        return;
      } else if (tag === "a") {
        const href = n.getAttribute("href") || "";
        const markKey = uid();
        // We'll add the link mark definition later; for now just use the key
        newMarks.push(markKey);
        for (const child of n.childNodes) walk(child, newMarks);
        return;
      } else if (tag === "img") {
        return; // skip
      }

      for (const child of n.childNodes) walk(child, newMarks);
    }

    walk(node, extraMarks);
    return spans;
  }

  function uid() {
    return Math.random().toString(36).slice(2, 10);
  }

  function blockFromEl(el) {
    const tag = el.tagName?.toLowerCase();
    if (!tag) return null;

    // Headings
    if (/^h[1-6]$/.test(tag)) {
      const level = parseInt(tag[1]);
      const spans = spanChildren(el);
      if (!spans.length) return null;
      return {
        _type: "block",
        _key: uid(),
        style: `h${level}`,
        children: spans,
        markDefs: [],
      };
    }

    // Paragraph / div / blockquote / figure
    if (["p", "div", "blockquote", "figure", "section", "article"].includes(tag)) {
      // If the element only contains images, skip
      const imgs = el.querySelectorAll("img");
      const text = el.textContent?.trim();
      if (!text && imgs.length) return null;

      const spans = spanChildren(el);
      if (!spans.length) return null;
      return {
        _type: "block",
        _key: uid(),
        style: "normal",
        children: spans,
        markDefs: [],
      };
    }

    // Lists
    if (tag === "ul" || tag === "ol") {
      const listType = tag === "ul" ? "bullet" : "number";
      const items = [];
      for (const li of el.querySelectorAll("li")) {
        const spans = spanChildren(li);
        if (spans.length) {
          items.push({
            _type: "block",
            _key: uid(),
            style: "normal",
            listItem: listType,
            level: 1,
            children: spans,
            markDefs: [],
          });
        }
      }
      return items;
    }

    // Fallback: render text content as normal paragraph
    const text = el.textContent?.trim();
    if (!text) return null;
    return {
      _type: "block",
      _key: uid(),
      style: "normal",
      children: [{ _type: "span", _key: uid(), text, marks: [] }],
      markDefs: [],
    };
  }

  for (const child of body.children) {
    const result = blockFromEl(child);
    if (!result) continue;
    if (Array.isArray(result)) blocks.push(...result);
    else blocks.push(result);
  }

  return blocks.filter(Boolean);
}

// ── Slugify ────────────────────────────────────────────────────────────────
function slugify(str) {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

// ── Main ───────────────────────────────────────────────────────────────────
async function main() {
  console.log(`Connecting to Sanity project ${PROJECT_ID} (${DATASET})...`);

  // Parse XML
  const xmlPath = resolve(ROOT, "superguardian.WordPress.2026-04-07 (1).xml");
  const xmlContent = readFileSync(xmlPath, "utf-8");
  const { window } = new JSDOM(xmlContent, { contentType: "text/xml" });
  const doc = window.document;

  // ── Step 1: Collect all categories across all posts ──────────────────────
  const categoryMap = new Map(); // nicename → { nicename, label, sanityId }
  const items = doc.getElementsByTagName("item");

  for (const item of items) {
    const postType = getText(item, "wp:post_type");
    const status = getText(item, "wp:status");
    if (postType !== "post" || status !== "publish") continue;

    for (const cat of getCategories(item)) {
      if (!categoryMap.has(cat.nicename)) {
        categoryMap.set(cat.nicename, { ...cat, sanityId: null });
      }
    }
  }

  console.log(`\nFound ${categoryMap.size} unique categories. Upserting...`);

  for (const [nicename, cat] of categoryMap) {
    const docId = `category-${nicename}`;
    const sanityDoc = {
      _id: docId,
      _type: "category",
      title: cat.label,
      slug: { _type: "slug", current: nicename },
    };
    await client.createOrReplace(sanityDoc);
    cat.sanityId = docId;
    console.log(`  ✓ Category: ${cat.label}`);
  }

  // ── Step 2: Upsert author ─────────────────────────────────────────────────
  const authorDocId = "author-superguardian";
  await client.createOrReplace({
    _id: authorDocId,
    _type: "author",
    name: "SuperGuardian",
    slug: { _type: "slug", current: "superguardian" },
  });
  console.log("\n✓ Author: SuperGuardian");

  // ── Step 3: Import posts ───────────────────────────────────────────────────
  let postCount = 0;
  let skipped = 0;

  console.log("\nImporting posts...");

  for (const item of items) {
    const postType = getText(item, "wp:post_type");
    const status = getText(item, "wp:status");
    if (postType !== "post" || status !== "publish") {
      skipped++;
      continue;
    }

    const title = getText(item, "title");
    const postName = getText(item, "wp:post_name") || slugify(title);
    const pubDateRaw = getText(item, "wp:post_date_gmt");
    const htmlContent = getText(item, "content:encoded");
    const excerpt = getText(item, "excerpt:encoded");

    const postCategories = getCategories(item);
    const primaryCategory = postCategories[0];

    // Yoast SEO
    const metaTitle = getYoastMeta(item, "_yoast_wpseo_title");
    const metaDesc = getYoastMeta(item, "_yoast_wpseo_metadesc");

    // Build Portable Text body
    const body = htmlToBlocks(htmlContent);

    // Estimate read time (avg 200 words/min)
    const wordCount = htmlContent.replace(/<[^>]+>/g, " ").split(/\s+/).filter(Boolean).length;
    const readTime = Math.max(1, Math.round(wordCount / 200));

    const docId = `post-${postName}`.slice(0, 200);

    const sanityDoc = {
      _id: docId,
      _type: "post",
      title,
      slug: { _type: "slug", current: postName },
      publishedAt: pubDateRaw ? new Date(pubDateRaw).toISOString() : new Date().toISOString(),
      excerpt: excerpt || undefined,
      body,
      readTime,
      author: { _type: "reference", _ref: authorDocId },
      ...(primaryCategory && categoryMap.has(primaryCategory.nicename)
        ? {
            category: {
              _type: "reference",
              _ref: categoryMap.get(primaryCategory.nicename).sanityId,
            },
          }
        : {}),
      seo: {
        metaTitle: metaTitle || undefined,
        metaDescription: metaDesc || undefined,
      },
    };

    try {
      await client.createOrReplace(sanityDoc);
      postCount++;
      console.log(`  ✓ [${postCount}] ${title}`);
    } catch (err) {
      console.error(`  ✗ Failed: ${title}\n    ${err.message}`);
    }
  }

  console.log(`\n✅ Import complete!`);
  console.log(`   Posts imported : ${postCount}`);
  console.log(`   Items skipped  : ${skipped} (pages, attachments, drafts)`);
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
