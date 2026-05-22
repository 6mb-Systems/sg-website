/**
 * One-time import of hardcoded webinar content into Sanity.
 *
 * Creates:
 *   - upcomingWebinar (singleton)
 *   - pastWebinar documents for each YouTube replay
 *
 * Usage:
 *   npm run import-webinars
 *   npm run import-webinars -- --dry-run
 *   npm run import-webinars -- --force
 *   node --use-system-ca scripts/import-webinars.mjs --past-only
 *
 * Requires SANITY_STUDIO_IMPORT in .env.local (write token).
 */

import { createClient } from "@sanity/client";
import { readFileSync, existsSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");

const UPCOMING_WEBINAR = {
  title: "Division 296 Strategic Considerations for Your SMSF Clients",
  blurb:
    "Division 296 is now in force. Assessments may still be some time away, but funds should start planning for added administration and decisions at the member, fund and beneficiary levels. Tim Miller from Smarter SMSF outlines the 30 June 2026 CGT cost base reset, how the rules affect reversionary and non reversionary pensions including death benefit outcomes, and why advice needs to be tailored to each client rather than a simple decision to withdraw or retain funds.",
  presenter: "Tim Miller",
  presenterTitle: "SMSF Technical & Education Manager at Smarter SMSF",
  presenterBio:
    "Leading SMSF educator with 25+ years of experience. Since 1999, he's supported trustees, accountants and advisers with practical legislative and compliance guidance.",
  date: "Tuesday 19th May 2026",
  time: "12:30pm - 1:30pm AEST",
  registerHref:
    "https://us02web.zoom.us/webinar/register/WN_qfFR7dIKS2KYHjilDvQKtg",
};

const UPCOMING_WEBINAR_OUTCOMES = [
  "The advantages and drawbacks of CGT cost base adjustments.",
  "How pension terms can influence who pays Division 296 and when.",
  "The importance of early and proactive estate planning discussions.",
  "The broader impact of Division 296 beyond members with balances over $3 million.",
  "Why advice needs to be tailored to each client's specific circumstances.",
];

/** Source: lib/webinar-videos.ts (newest first) */
const PAST_WEBINARS = [
  { id: "vY6WciZMt_I", title: "Reviewing your SMSF contribution strategies", date: "April 2026" },
  { id: "Siz96Ohin48", title: "The impact of indexation on your SMSF clients", date: "March 2026" },
  { id: "GAJAfptkA8Y", title: "Division 296 and SMSFs – the good, the bad and the ugly", date: "February 2026" },
  { id: "xEW7Qhi4fEM", title: "SMSFs acquiring assets from a related party", date: "November 2025" },
  { id: "GsjUvWFGUG0", title: "SMSFs and in house assets – inclusions, exceptions and restrictions", date: "October 2025" },
  { id: "mlOiu4S3rEc", title: "Non arm's length expenses in an SMSF", date: "September 2025" },
  { id: "SbO8OtflAms", title: "Everything you need to know about paying benefits from an SMSF", date: "August 2025" },
  { id: "1d9tjhCxc4s", title: "The literal ins and outs of SMSF trusteeship", date: "July 2025" },
  { id: "495P_67WciU", title: "Exiting legacy pensions and reserves in an SMSF", date: "June 2025" },
  { id: "HjagTntpx9w", title: "End of year checklist – are your SMSFs 30 June ready?", date: "May 2025" },
  { id: "NHBAg8TAGPM", title: "Interactive contribution strategies in an SMSF", date: "April 2025" },
  { id: "xZKMCka9Bl0", title: "How indexation impacts strategic considerations", date: "March 2025" },
  { id: "-DB3CN6MZPY", title: "Market Valuations", date: "February 2025" },
  { id: "rLXxfj8D-g4", title: "SMSF in a Year", date: "December 2024" },
  { id: "mUEivgOcAWc", title: "Commencing and ceasing a pension in an SMSF", date: "November 2024" },
  { id: "SuJHw8O2zbU", title: "Asset segregation and ECPI in an SMSF", date: "October 2024" },
  { id: "Zm-dZm2eV00", title: "The problem dealing with related parties", date: "August 2024" },
  { id: "Key79xen2EE", title: "A guide to SMSF investment strategies", date: "September 2024" },
  { id: "7fXRBFGOZ4k", title: "SMSF estate planning considerations", date: "July 2024" },
  { id: "ya9Ld1Q5p4s", title: "Insurance, Transfer Balance Cap & Division 296", date: "June 2024" },
  { id: "KrxzTq6_GE4", title: "The SMSF winding up window is always open", date: "April 2024" },
  { id: "REcdD1f4mhM", title: "Don't neglect your SMSF documentation needs", date: "May 2024" },
  { id: "U6kyqRBxrjs", title: "Does indexation impact your SMSF clients", date: "March 2024" },
  { id: "wR7ly6eMbzw", title: "How the $3M Division 296 tax will impact SMSFs", date: "February 2024" },
  { id: "BdxE0qVHDiw", title: "Holding Business Real Property in an SMSF", date: "December 2023" },
  { id: "IOsZ0bNqreU", title: "SMSF Benefit Payments – Tips and Traps", date: "November 2023" },
  { id: "15nYzzdaJKA", title: "SMSF Expenses under the Microscope", date: "October 2023" },
  { id: "KwiOy4qhtM0", title: "SMSF Contribution Strategies", date: "September 2023" },
  { id: "JBvbBS9AuDE", title: "Latest intel on LRBAs", date: "August 2023" },
  { id: "jx34iF46lN0", title: "Holding insurance in an SMSF", date: "February 2023" },
];

const MONTHS = {
  january: 0,
  february: 1,
  march: 2,
  april: 3,
  may: 4,
  june: 5,
  july: 6,
  august: 7,
  september: 8,
  october: 9,
  november: 10,
  december: 11,
};

function loadEnv() {
  const envPath = resolve(ROOT, ".env.local");
  if (!existsSync(envPath)) {
    throw new Error("Missing .env.local in project root.");
  }
  const raw = readFileSync(envPath, "utf-8");
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

function parseDisplayDate(label) {
  if (!label) return new Date().toISOString();
  const match = label.trim().match(/^([A-Za-z]+)\s+(\d{4})$/);
  if (!match) return new Date().toISOString();
  const month = MONTHS[match[1].toLowerCase()];
  const year = Number(match[2]);
  if (month == null || !Number.isFinite(year)) return new Date().toISOString();
  return new Date(Date.UTC(year, month, 15)).toISOString();
}

function pastWebinarDocumentId(youtubeVideoId) {
  const safe = youtubeVideoId.replace(/[^a-zA-Z0-9_-]/g, "_");
  return `pastWebinar-${safe}`;
}

async function uploadPresenterImage(client) {
  const imagePath = resolve(ROOT, "public", "webinar_TimMiller.jpg");
  if (!existsSync(imagePath)) {
    console.warn("  Presenter image not found at public/webinar_TimMiller.jpg — skipping image upload.");
    return undefined;
  }

  const buffer = readFileSync(imagePath);
  const asset = await client.assets.upload("image", buffer, {
    filename: "webinar_TimMiller.jpg",
    contentType: "image/jpeg",
  });

  return {
    _type: "image",
    alt: `${UPCOMING_WEBINAR.presenter}, ${UPCOMING_WEBINAR.presenterTitle}`,
    asset: {
      _type: "reference",
      _ref: asset._id,
    },
  };
}

async function importUpcomingWebinar(client, { dryRun, force }) {
  const existing = await client.fetch(
    `*[_type == "upcomingWebinar" && _id == "upcomingWebinar"][0]{ _id, title }`
  );

  if (existing?.title && !force) {
    console.log(`Upcoming webinar already exists ("${existing.title}") — skipping. Use --force to overwrite.`);
    return { skipped: 1, created: 0, updated: 0 };
  }

  const presenterImage = dryRun ? undefined : await uploadPresenterImage(client);
  const doc = {
    _id: "upcomingWebinar",
    _type: "upcomingWebinar",
    isActive: true,
    title: UPCOMING_WEBINAR.title,
    blurb: UPCOMING_WEBINAR.blurb,
    dateLabel: UPCOMING_WEBINAR.date,
    timeLabel: UPCOMING_WEBINAR.time,
    registerUrl: UPCOMING_WEBINAR.registerHref,
    learningOutcomes: [...UPCOMING_WEBINAR_OUTCOMES],
    presenterName: UPCOMING_WEBINAR.presenter,
    presenterTitle: UPCOMING_WEBINAR.presenterTitle,
    presenterBio: UPCOMING_WEBINAR.presenterBio,
    experienceBadge: "25+",
    ...(presenterImage ? { presenterImage } : {}),
  };

  if (dryRun) {
    console.log("[dry-run] Would upsert upcomingWebinar:", doc.title);
    return { skipped: 0, created: existing ? 0 : 1, updated: existing ? 1 : 0 };
  }

  await client.createOrReplace(doc);
  console.log(`${existing ? "Updated" : "Created"} upcoming webinar: ${doc.title}`);
  return { skipped: 0, created: existing ? 0 : 1, updated: existing ? 1 : 0 };
}

async function importPastWebinars(client, { dryRun, force }) {
  const existingRows = await client.fetch(
    `*[_type == "pastWebinar"]{ _id, youtubeVideoId, title }`
  );
  const byVideoId = new Map(
    existingRows
      .filter((row) => row.youtubeVideoId)
      .map((row) => [row.youtubeVideoId, row])
  );

  let created = 0;
  let updated = 0;
  let skipped = 0;

  for (const video of PAST_WEBINARS) {
    const docId = pastWebinarDocumentId(video.id);
    const existing = byVideoId.get(video.id);

    if (existing && !force) {
      console.log(`  skip  ${video.title}`);
      skipped += 1;
      continue;
    }

    const doc = {
      _id: docId,
      _type: "pastWebinar",
      title: video.title,
      youtubeVideoId: video.id,
      displayDate: video.date,
      publishedAt: parseDisplayDate(video.date),
    };

    if (dryRun) {
      console.log(`  [dry-run] would ${existing ? "update" : "create"}  ${video.title}`);
      if (existing) updated += 1;
      else created += 1;
      continue;
    }

    await client.createOrReplace(doc);
    console.log(`  ${existing ? "updated" : "created"}  ${video.title}`);
    if (existing) updated += 1;
    else created += 1;
  }

  return { skipped, created, updated };
}

async function main() {
  const args = new Set(process.argv.slice(2));
  const dryRun = args.has("--dry-run");
  const force = args.has("--force");
  const pastOnly = args.has("--past-only");
  const upcomingOnly = args.has("--upcoming-only");
  const importPast = !upcomingOnly;
  const importUpcoming = !pastOnly;

  const env = loadEnv();
  if (!env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
    throw new Error("NEXT_PUBLIC_SANITY_PROJECT_ID is missing from .env.local");
  }
  if (!env.SANITY_STUDIO_IMPORT) {
    throw new Error("SANITY_STUDIO_IMPORT is missing from .env.local (Sanity write token required).");
  }

  const client = createClient({
    projectId: env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: env.NEXT_PUBLIC_SANITY_DATASET || "production",
    token: env.SANITY_STUDIO_IMPORT,
    apiVersion: "2024-01-01",
    useCdn: false,
  });

  console.log(
    `Importing webinars to ${env.NEXT_PUBLIC_SANITY_PROJECT_ID}/${env.NEXT_PUBLIC_SANITY_DATASET || "production"}${dryRun ? " (dry run)" : ""}...`
  );

  const totals = { skipped: 0, created: 0, updated: 0 };

  if (importUpcoming) {
    console.log("\nUpcoming webinar");
    const result = await importUpcomingWebinar(client, { dryRun, force });
    totals.skipped += result.skipped;
    totals.created += result.created;
    totals.updated += result.updated;
  }

  if (importPast) {
    console.log(`\nPast webinars (${PAST_WEBINARS.length} in source list)`);
    const result = await importPastWebinars(client, { dryRun, force });
    totals.skipped += result.skipped;
    totals.created += result.created;
    totals.updated += result.updated;
  }

  console.log(
    `\nDone. created=${totals.created}, updated=${totals.updated}, skipped=${totals.skipped}`
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
