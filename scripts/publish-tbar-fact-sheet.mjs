/**
 * Publish / refresh the Transfer Balance Account Reporting (TBAR) fact sheet in Sanity.
 *
 * Usage:
 *   node scripts/publish-tbar-fact-sheet.mjs [path-to-pdf]
 *
 * PDF defaults to public/blog-pdfs/Transfer-Balance-Account-Reporting.pdf
 */

import { createClient } from "@sanity/client";
import { createReadStream, copyFileSync, existsSync, readFileSync } from "fs";
import { resolve, dirname, basename } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");

const POST_ID =
  "post-smsf-expense-apportionment-and-insurances-are-you-claiming-the-right-expenses-2";
const SLUG = "transfer-balance-account-reporting";
const TITLE = "Transfer Balance Account Reporting (TBAR)";
const PUBLISHED_AT = "2026-10-03T01:30:00.000Z";

const THUMBNAIL_FILENAME =
  "c__Users_mayin_AppData_Roaming_Cursor_User_workspaceStorage_afc835a006299d09834daaa4d069836e_images_SG_-_Thumbnail_for_What_is_Transfer_Balance_Account_Reporting_-_2026-8db0cb6e-9eb3-4767-bdce-cc1fcf214421.jpg";

function resolveThumbnailSrc() {
  const candidates = [
    resolve(ROOT, "scripts", ".assets", THUMBNAIL_FILENAME),
    resolve(
      process.env.USERPROFILE || "",
      ".cursor",
      "projects",
      "c-Users-mayin-Desktop-sg-website",
      "assets",
      THUMBNAIL_FILENAME
    ),
  ];
  return candidates.find((p) => p && existsSync(p));
}
const THUMBNAIL_REPO = resolve(
  ROOT,
  "public",
  "blog",
  "Transfer Balance Account Reporting.jpg"
);

const EXCERPT =
  "A practical guide to Transfer Balance Account Reporting (TBAR) for SMSFs — who must report, what events to include, and how to meet your ATO obligations.";

const BODY = [
  {
    _type: "block",
    _key: "intro",
    style: "normal",
    markDefs: [],
    children: [
      {
        _type: "span",
        _key: "intro-span",
        text:
          "Transfer Balance Account Reporting (TBAR) is how SMSFs notify the Australian Taxation Office of events that affect members’ transfer balance accounts. This fact sheet explains the key reporting obligations, common reportable events, and practical steps trustees and advisers should take to stay compliant.",
        marks: [],
      },
    ],
  },
];

function loadEnv() {
  const env = {};
  for (const line of readFileSync(resolve(ROOT, ".env.local"), "utf-8").split("\n")) {
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
  env.SANITY_STUDIO_IMPORT || env.SANITY_STUDIO_TOKEN || env.SANITY_API_TOKEN;

if (!token) {
  console.error("Missing Sanity write token in .env.local");
  process.exit(1);
}

const client = createClient({
  projectId: env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: env.NEXT_PUBLIC_SANITY_DATASET || "production",
  token,
  apiVersion: "2024-01-01",
  useCdn: false,
});

const pdfArg = process.argv[2];
const pdfPath = pdfArg
  ? resolve(process.cwd(), pdfArg)
  : resolve(ROOT, "public", "blog-pdfs", "Transfer-Balance-Account-Reporting.pdf");

async function main() {
  const thumbnailSrc = resolveThumbnailSrc();
  if (!thumbnailSrc) {
    console.error(
      "Thumbnail not found. Place the JPG in scripts/.assets/ or attach it in Cursor chat."
    );
    process.exit(1);
  }
  if (!existsSync(pdfPath)) {
    console.error(`PDF not found:\n  ${pdfPath}`);
    process.exit(1);
  }

  copyFileSync(thumbnailSrc, THUMBNAIL_REPO);
  console.log(`Copied thumbnail → ${THUMBNAIL_REPO}`);

  const slugTaken = await client.fetch(
    `*[_type == "post" && slug.current == $slug && _id != $id][0]._id`,
    { slug: SLUG, id: POST_ID }
  );
  if (slugTaken) {
    console.error(`Slug "${SLUG}" is already used by ${slugTaken}`);
    process.exit(1);
  }

  console.log("Uploading thumbnail…");
  const imageAsset = await client.assets.upload(
    "image",
    createReadStream(thumbnailSrc),
    {
      filename: "Transfer Balance Account Reporting.jpg",
      contentType: "image/jpeg",
    }
  );

  console.log(`Uploading PDF (${basename(pdfPath)})…`);
  const pdfAsset = await client.assets.upload("file", createReadStream(pdfPath), {
    filename: basename(pdfPath),
    contentType: "application/pdf",
  });

  await client
    .patch(POST_ID)
    .set({
      title: TITLE,
      slug: { _type: "slug", current: SLUG },
      excerpt: EXCERPT,
      publishedAt: PUBLISHED_AT,
      body: BODY,
      category: { _type: "reference", _ref: "category-tax" },
      secondaryCategory: {
        _type: "reference",
        _ref: "pY1dOG1akrzsE6bJ50wj0W",
      },
      mainImage: {
        _type: "image",
        asset: { _type: "reference", _ref: imageAsset._id },
        alt: "Transfer Balance Account Reporting (TBAR) fact sheet",
      },
      pdfFile: {
        _type: "file",
        asset: { _type: "reference", _ref: pdfAsset._id },
      },
      isWebinarPost: false,
    })
    .commit();

  console.log("\n✅ TBAR fact sheet updated in Sanity.");
  console.log(`   Post ID   : ${POST_ID}`);
  console.log(`   Slug      : ${SLUG}`);
  console.log(`   Published : ${PUBLISHED_AT}`);
  console.log(`   Live URL  : /education/${SLUG}`);
}

main().catch((err) => {
  console.error("Fatal:", err.message);
  process.exit(1);
});
