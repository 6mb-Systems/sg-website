/**
 * Download PDFs from the old WordPress site and upload them to Sanity,
 * then set the pdfFile field on each matched post.
 *
 * Usage: node scripts/upload-pdfs.mjs
 *
 * Parses the WordPress XML export to extract each post's PDF URL,
 * downloads it, uploads to Sanity assets, and patches the post.
 */

import { createClient } from "@sanity/client";
import { readFileSync, writeFileSync, existsSync, mkdirSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";
import https from "https";
import http from "http";
import { JSDOM } from "jsdom";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");
const PDF_CACHE = resolve(ROOT, "public", "blog-pdfs");

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

// ── Helpers ────────────────────────────────────────────────────────────────
function getText(el, tag) {
  const found = el.getElementsByTagName(tag);
  return found.length ? found[0].textContent?.trim() ?? "" : "";
}

/** Download a URL to a Buffer, following up to 3 redirects */
function download(url, redirectsLeft = 3) {
  return new Promise((resolve, reject) => {
    const lib = url.startsWith("https") ? https : http;
    lib
      .get(url, { timeout: 30000 }, (res) => {
        if (
          res.statusCode >= 300 &&
          res.statusCode < 400 &&
          res.headers.location &&
          redirectsLeft > 0
        ) {
          return download(res.headers.location, redirectsLeft - 1)
            .then(resolve)
            .catch(reject);
        }
        if (res.statusCode !== 200) {
          res.resume();
          return reject(new Error(`HTTP ${res.statusCode}`));
        }
        const chunks = [];
        res.on("data", (c) => chunks.push(c));
        res.on("end", () => resolve(Buffer.concat(chunks)));
        res.on("error", reject);
      })
      .on("error", reject)
      .on("timeout", () => reject(new Error("Timeout")));
  });
}

// ── Parse WordPress XML → slug : pdfUrl map ────────────────────────────────
function extractPdfMap() {
  const xmlPath = resolve(ROOT, "superguardian.WordPress.2026-04-07 (1).xml");
  const { window } = new JSDOM(readFileSync(xmlPath, "utf-8"), {
    contentType: "text/xml",
  });
  const doc = window.document;
  const items = doc.getElementsByTagName("item");

  const map = new Map(); // slug → pdfUrl

  for (const item of items) {
    const postType = getText(item, "wp:post_type");
    const status = getText(item, "wp:status");
    if (postType !== "post" || status !== "publish") continue;

    const slug = getText(item, "wp:post_name");
    const html = getText(item, "content:encoded");

    // Find href pointing to superguardian.com.au/pdfs/
    const match = html.match(/href="(https?:\/\/(?:www\.)?superguardian\.com\.au\/pdfs\/[^"]+\.pdf[^"]*)"/i);
    if (match) {
      map.set(slug, match[1]);
    }
  }

  return map;
}

// ── Main ───────────────────────────────────────────────────────────────────
async function main() {
  // Ensure local cache directory exists
  if (!existsSync(PDF_CACHE)) mkdirSync(PDF_CACHE, { recursive: true });

  const pdfMap = extractPdfMap();
  console.log(`Found ${pdfMap.size} posts with PDF links in WordPress XML.\n`);

  // Fetch Sanity posts
  const posts = await client.fetch(
    `*[_type == "post" && !(_id in path("drafts.**"))] { _id, "slug": slug.current }`
  );
  const postBySlug = new Map(posts.map((p) => [p.slug, p._id]));

  let uploaded = 0;
  let skipped = 0;
  let failed = 0;

  for (const [slug, pdfUrl] of pdfMap) {
    const postId = postBySlug.get(slug);
    if (!postId) {
      console.warn(`⚠  No Sanity post for slug: ${slug}`);
      skipped++;
      continue;
    }

    // Derive a clean filename from the URL
    const rawFilename = decodeURIComponent(pdfUrl.split("/").pop().split("?")[0]);
    const localPath = resolve(PDF_CACHE, rawFilename);

    let pdfBuffer;

    // Use cached download if available
    if (existsSync(localPath)) {
      pdfBuffer = readFileSync(localPath);
      process.stdout.write(`📎 (cached) ${rawFilename} → `);
    } else {
      process.stdout.write(`⬇  Downloading: ${rawFilename} … `);
      try {
        pdfBuffer = await download(pdfUrl);
        writeFileSync(localPath, pdfBuffer);
        process.stdout.write(`done (${Math.round(pdfBuffer.length / 1024)} KB) → `);
      } catch (err) {
        console.error(`FAILED: ${err.message}`);
        failed++;
        continue;
      }
    }

    // Upload to Sanity
    try {
      const asset = await client.assets.upload("file", pdfBuffer, {
        filename: rawFilename,
        contentType: "application/pdf",
      });

      // Patch post pdfFile field
      await client
        .patch(postId)
        .set({
          pdfFile: {
            _type: "file",
            asset: { _type: "reference", _ref: asset._id },
          },
        })
        .commit();

      uploaded++;
      console.log(`✓ patched ${slug}`);
    } catch (err) {
      console.error(`upload/patch failed: ${err.message}`);
      failed++;
    }
  }

  console.log(`\n✅  Done!`);
  console.log(`   PDFs uploaded & linked : ${uploaded}`);
  console.log(`   Skipped (no post)      : ${skipped}`);
  console.log(`   Failed                 : ${failed}`);
}

main().catch((err) => {
  console.error("Fatal:", err.message);
  process.exit(1);
});
