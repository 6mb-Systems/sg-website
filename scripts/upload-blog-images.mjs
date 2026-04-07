/**
 * Upload blog post images to Sanity and assign them to posts
 *
 * Usage:
 *   node scripts/upload-blog-images.mjs
 *
 * Place images in public/blog/ named after the post slug:
 *   public/blog/my-post-slug.jpg   (jpg, jpeg, png, webp, gif supported)
 *
 * The script:
 *   1. Reads all image files from public/blog/
 *   2. Matches each file to a Sanity post by slug
 *   3. Uploads the image to Sanity's asset CDN
 *   4. Sets it as the post's mainImage (skips posts that already have one)
 */

import { createClient } from "@sanity/client";
import { readFileSync, readdirSync, createReadStream, statSync } from "fs";
import { resolve, dirname, extname, basename } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");
const IMAGE_DIR = resolve(ROOT, "public", "blog");

const SUPPORTED_EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".webp", ".gif", ".avif"]);

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

const MIME_TYPES = {
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
  ".gif": "image/gif",
  ".avif": "image/avif",
};

async function main() {
  // 1. Read image files from public/blog/
  let files;
  try {
    files = readdirSync(IMAGE_DIR).filter((f) => {
      const ext = extname(f).toLowerCase();
      return SUPPORTED_EXTENSIONS.has(ext) && statSync(resolve(IMAGE_DIR, f)).isFile();
    });
  } catch {
    console.error(`❌  Folder not found: ${IMAGE_DIR}`);
    console.error("    Create it and add images named after post slugs.");
    process.exit(1);
  }

  if (files.length === 0) {
    console.log(`No images found in public/blog/`);
    console.log("Add images named after post slugs, e.g. my-post-slug.jpg");
    return;
  }

  console.log(`Found ${files.length} image(s) in public/blog/\n`);

  // 2. Fetch all posts from Sanity (slug + whether mainImage already set)
  const posts = await client.fetch(
    `*[_type == "post" && !(_id in path("drafts.**"))] {
      _id,
      "slug": slug.current,
      "hasImage": defined(mainImage)
    }`
  );

  const postBySlug = new Map(posts.map((p) => [p.slug, p]));

  let uploaded = 0;
  let skipped = 0;
  let unmatched = 0;

  // 3. Process each image file
  for (const file of files) {
    const ext = extname(file).toLowerCase();
    const slug = basename(file, ext);
    const post = postBySlug.get(slug);

    if (!post) {
      console.warn(`⚠  No post found for slug: "${slug}" (file: ${file})`);
      unmatched++;
      continue;
    }

    if (post.hasImage) {
      console.log(`↩  Skipped (already has image): ${slug}`);
      skipped++;
      continue;
    }

    // 4. Upload the image asset to Sanity
    const filePath = resolve(IMAGE_DIR, file);
    const mimeType = MIME_TYPES[ext] || "image/jpeg";

    try {
      const asset = await client.assets.upload("image", createReadStream(filePath), {
        filename: file,
        contentType: mimeType,
      });

      // 5. Patch the post's mainImage field
      await client
        .patch(post._id)
        .set({
          mainImage: {
            _type: "image",
            asset: { _type: "reference", _ref: asset._id },
            alt: slug.replace(/-/g, " "),
          },
        })
        .commit();

      uploaded++;
      console.log(`✓  [${uploaded}] ${slug}`);
    } catch (err) {
      console.error(`✗  Failed: ${slug} — ${err.message}`);
    }
  }

  console.log(`\n✅  Done!`);
  console.log(`   Uploaded : ${uploaded}`);
  console.log(`   Skipped  : ${skipped} (already had image)`);
  console.log(`   Unmatched: ${unmatched} (no post with that slug)`);
}

main().catch((err) => {
  console.error("Fatal:", err.message);
  process.exit(1);
});
