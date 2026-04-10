/**
 * Migrate post tags (primary + secondary) in Sanity.
 *
 * Reads an inline list of posts with their intended Primary Tag and
 * (optional) Secondary Tag, then:
 *   1. Fetches all existing categories.
 *   2. Creates any missing categories referenced by the list.
 *   3. Fetches all published posts.
 *   4. Matches each list row to a Sanity post by normalised title.
 *   5. Reports the plan: matched / unmatched / posts-not-in-list.
 *   6. With --apply, patches each matched post to set `category` and
 *      `secondaryCategory` references (unsetting secondary if blank).
 *
 * Usage:
 *   node scripts/migrate-post-tags.mjs            # dry run (no writes)
 *   node scripts/migrate-post-tags.mjs --apply    # commit changes
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
  console.error(
    "No Sanity write token found. Set SANITY_STUDIO_TOKEN in .env.local."
  );
  process.exit(1);
}

const client = createClient({
  projectId: env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: env.NEXT_PUBLIC_SANITY_DATASET || "production",
  token,
  apiVersion: "2024-01-01",
  useCdn: false,
});

// ── Data ───────────────────────────────────────────────────────────────────
// title | primary | secondary (null if none)
const TAG_DATA = [
  ["Implications of Late Lodgement of your SMSF Annual Return", "Tax", "Administration"],
  ["Downsizer contributions and SMSFs", "Contributions", "Tax"],
  ["Update Regarding Proposed Tax for Superannuation Members over $3 million", "News & Views", "Tax"],
  // Skipped: "Contribution Confirmation Explanatory Document" — no matching post in Sanity.
  ["Retirement Phase Lump Sum Withdrawals", "Pensions & Payments", "Administration"],
  ["GST and SMSFs", "Tax", "Administration"],
  ["Bring Forward Contributions", "Contributions", "Tax"],
  ["How to view your Transfer Balance Cap", "Tax", "Pensions & Payments"],
  ["Indexing the Personal Transfer Balance Cap", "Tax", "Pensions & Payments"],
  ["Insurance Premiums – To claim or not to claim a tax deduction", "Tax", "Insurance"],
  ["Understanding super terminology", "Administration", "Trusteeship"],
  ["Electronic Signing", "Administration", "Trusteeship"],
  ["Valuations for Year End Reporting", "Administration", "Investments"],
  ["End of Financial Year Checklist", "Administration", "Trusteeship"],
  ["Explanatory Document – Death Benefit Nomination", "Administration", "Estate Planning"],
  ["Enduring Power of Attorney – Death Benefit Nomination", "Administration", "Estate Planning"],
  ["Appointing SuperGuardian as your Tax Agent", "Administration", "Tax"],
  ["Deferred Contribution Allocation", "Contributions", "Tax"],
  ["Excess Concessional Contributions", "Contributions", "Tax"],
  ["Excess Non-Concessional Contributions", "Contributions", "Tax"],
  ["Unused Concessional Contributions Cap Carry Forward", "Contributions", "Tax"],
  ["Borrowing in your SMSF", "Investments", "Administration"],
  ["3 Ways to get into Property with a SMSF", "Investments", "Administration"],
  ["Annual Trustee Plan", "Administration", "Trusteeship"],
  ["2023 – 2024 Federal Budget Update", "News & Views", null],
  ["Step by Step Instructions to Appointing SuperGuardian as your Tax Agent Video", "Administration", "Tax"],
  ["Guide to Pensions in SMSFs", "Pensions & Payments", "Tax"],
  ["Guide to Transition to Retirement Pensions in SMSFs", "Pensions & Payments", "Tax"],
  ["Transfer Balance Account Reporting", "Tax", "Pensions & Payments"],
  ["SMSFs and the Age Pension", "Pensions & Payments", "Tax"],
  ["Non-arm’s length expenses – changing old habits", "Tax", "Administration"],
  ["Deciding on your SMSF Trustee", "Administration", "Trusteeship"],
  ["The benefits of a special purpose corporate trustee", "Administration", "Trusteeship"],
  ["SMSF Trustee Structure – What is the process to change it?", "Administration", "Trusteeship"],
  ["Six Member SMSFs", "Administration", "Trusteeship"],
  ["SMSF Residency", "Administration", "Trusteeship"],
  ["First Home Super Saver Scheme", "Contributions", "Tax"],
  ["Valuations for Year End Reporting (Trustees)", "Administration", "Investments"],
  ["Valuations and SMSF Checklist for Year End Reporting (Advisers)", "Administration", "Investments"],
  ["2021-22 Federal Budget Update", "News & Views", null],
  ["Death and Incapacity – Who is in control of your SMSF?", "Estate Planning", null],
  ["Why is an Enduring Power of Attorney Essential?", "Estate Planning", null],
  ["Cryptocurrency Investments for SMSFs", "Investments", "Administration"],
  ["5 Potential Errors When Running An SMSF", "Administration", "Trusteeship"],
  ["Top 10 Trustee Tips to Running a Successful SMSF", "Administration", "Trusteeship"],
  ["Precious Metals – How to hold Gold and Silver in an SMSF", "Investments", "Administration"],
  ["Understanding SMSF Expenses", "Administration", "Tax"],
  ["Apportioning SMSF Expenses", "Administration", "Tax"],
  ["Unsegregated SMSFs and Actuarial Requirements", "Investments", "Tax"],
  ["Segregating Assets in SMSF", "Investments", "Tax"],
  ["The Winners and Losers of an Indexed Transfer Balance Cap", "Tax", "Pensions & Payments"],
  ["Alternate Trustees for SMSFs", "Administration", "Trusteeship"],
  ["Work Test Exemption", "Contributions", "Tax"],
  ["Reversionary Pensions", "Pensions & Payments", "Estate Planning"],
  ["Keeping up with an ever-changing contribution environment", "Contributions", "Tax"],
  ["Paying pensions – the importance of planning ahead", "Pensions & Payments", "Administration"],
  ["SMSF and Estate Planning Considerations", "Estate Planning", null],
  ["SMSF Windups", "Administration", "Tax"],
  ["Insurance based deductions", "Pensions & Payments", "Insurance"],
  ["UK Pension Schemes", "Pensions & Payments", "Tax"],
  ["Accessing Superannuation Benefits", "Pensions & Payments", "Administration"],
  ["Investment Restrictions", "Investments", "Administration"],
  ["Total Superannuation Balance – A contribution game changer?", "Contributions", "Tax"],
].map(([title, primary, secondary]) => ({ title, primary, secondary }));

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

/**
 * Normalise for matching: lowercase, strip punctuation, collapse spaces,
 * convert `&` to `and`, normalise dashes + smart quotes.
 */
function normalise(str) {
  return decodeEntities(str)
    .normalize("NFKD")
    .replace(/[\u2013\u2014\u2212]/g, "-") // en/em/minus dashes → hyphen
    .replace(/[\u2018\u2019]/g, "'")       // smart single quotes
    .replace(/[\u201C\u201D]/g, '"')       // smart double quotes
    .replace(/&/g, " and ")
    .toLowerCase()
    .replace(/[^\w\s]/g, " ")              // strip punctuation
    .replace(/\s+/g, " ")
    .trim();
}

function slugify(str) {
  return decodeEntities(str)
    .normalize("NFKD")
    .replace(/[\u2013\u2014\u2212]/g, "-")
    .replace(/&/g, "and")
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

// ── Main ───────────────────────────────────────────────────────────────────
async function main() {
  console.log(
    `\n${DRY_RUN ? "🔎 DRY RUN" : "✍️  APPLY MODE"} — migrate-post-tags\n`
  );

  // 1. Fetch every category
  const allCats = await client.fetch(
    `*[_type == "category"] { _id, title, "slug": slug.current }`
  );
  const catByKey = new Map();
  const idToTitle = new Map();
  for (const c of allCats) {
    catByKey.set(normalise(c.title), c);
    idToTitle.set(c._id, decodeEntities(c.title));
  }
  console.log(`📂 Found ${allCats.length} existing category documents.`);

  // 2. Determine which tags from TAG_DATA exist / need creating
  const neededTags = new Set();
  for (const row of TAG_DATA) {
    neededTags.add(row.primary);
    if (row.secondary) neededTags.add(row.secondary);
  }
  const tagRefs = new Map(); // original tag name → _id
  const toCreate = [];
  for (const tag of neededTags) {
    const existing = catByKey.get(normalise(tag));
    if (existing) {
      tagRefs.set(tag, existing._id);
    } else {
      toCreate.push(tag);
    }
  }

  console.log(
    `\n📂 Tag resolution (${neededTags.size} unique tags in your list):`
  );
  for (const tag of neededTags) {
    if (tagRefs.has(tag)) {
      console.log(`  ✓ ${tag.padEnd(22)} → ${tagRefs.get(tag)}`);
    } else {
      console.log(`  + ${tag.padEnd(22)} → (would create)`);
    }
  }

  // 3. Create missing categories (unless dry run)
  if (toCreate.length > 0) {
    if (DRY_RUN) {
      for (const tag of toCreate) {
        tagRefs.set(tag, `<WOULD_CREATE:${slugify(tag)}>`);
      }
      console.log(
        `\n[dry-run] Would create ${toCreate.length} category document(s).`
      );
    } else {
      console.log(`\nCreating ${toCreate.length} missing categories...`);
      for (const tag of toCreate) {
        const doc = {
          _type: "category",
          title: tag,
          slug: { _type: "slug", current: slugify(tag) },
        };
        const created = await client.create(doc);
        tagRefs.set(tag, created._id);
        idToTitle.set(created._id, tag);
        console.log(`  ✓ Created "${tag}" → ${created._id}`);
      }
    }
  }

  // 4. Fetch all published posts
  const posts = await client.fetch(
    `*[_type == "post" && !(_id in path("drafts.**"))] {
      _id,
      title,
      "categoryRef": category._ref,
      "secondaryCategoryRef": secondaryCategory._ref
    }`
  );
  console.log(`\n📝 Found ${posts.length} published posts in Sanity.`);

  // Index by normalised title
  const postByKey = new Map();
  for (const p of posts) {
    postByKey.set(normalise(p.title), p);
  }

  // 5. Match each row in TAG_DATA to a Sanity post
  const matched = [];
  const unmatched = [];
  for (const row of TAG_DATA) {
    const post = postByKey.get(normalise(row.title));
    if (post) matched.push({ row, post });
    else unmatched.push(row);
  }

  const listKeys = new Set(TAG_DATA.map((r) => normalise(r.title)));
  const untouched = posts.filter((p) => !listKeys.has(normalise(p.title)));

  console.log(
    `\n🔗 Matched: ${matched.length}/${TAG_DATA.length} list rows → Sanity posts`
  );

  if (unmatched.length > 0) {
    console.log(
      `\n❗ ${unmatched.length} rows in your list have no matching Sanity post:`
    );
    for (const r of unmatched) console.log(`   - ${r.title}`);
  }

  if (untouched.length > 0) {
    console.log(
      `\nℹ️  ${untouched.length} Sanity posts not in your list (will be left alone):`
    );
    for (const p of untouched) console.log(`   - ${decodeEntities(p.title)}`);
  }

  // 6. Show the plan per matched post
  console.log(`\n📋 Planned updates:`);
  let changed = 0;
  for (const { row, post } of matched) {
    const curPrimary = post.categoryRef
      ? idToTitle.get(post.categoryRef) || post.categoryRef
      : "(none)";
    const curSecondary = post.secondaryCategoryRef
      ? idToTitle.get(post.secondaryCategoryRef) || post.secondaryCategoryRef
      : "(none)";
    const newPrimary = row.primary;
    const newSecondary = row.secondary || "(none)";

    const samePrimary =
      normalise(curPrimary) === normalise(newPrimary);
    const sameSecondary =
      normalise(curSecondary) === normalise(newSecondary);

    if (samePrimary && sameSecondary) {
      // Already correct — skip reporting line to reduce noise
      continue;
    }
    changed++;
    console.log(`\n  • ${decodeEntities(post.title)}`);
    console.log(
      `      primary:   ${curPrimary}${samePrimary ? " (unchanged)" : `  →  ${newPrimary}`}`
    );
    console.log(
      `      secondary: ${curSecondary}${sameSecondary ? " (unchanged)" : `  →  ${newSecondary}`}`
    );
  }
  console.log(
    `\n📊 ${changed} post(s) would change; ${matched.length - changed} already correct.`
  );

  if (DRY_RUN) {
    console.log(`\n[dry-run] No writes made. Re-run with --apply to commit.\n`);
    return;
  }

  if (matched.length === 0) {
    console.log(`\nNothing to patch. Exiting.\n`);
    return;
  }

  // 7. Apply patches
  console.log(`\n✍️  Applying patches in a single transaction...`);
  const tx = client.transaction();
  for (const { row, post } of matched) {
    const primaryRef = tagRefs.get(row.primary);
    const secondaryRef = row.secondary ? tagRefs.get(row.secondary) : null;
    tx.patch(post._id, (p) => {
      let patched = p.set({
        category: { _type: "reference", _ref: primaryRef },
      });
      if (secondaryRef) {
        patched = patched.set({
          secondaryCategory: { _type: "reference", _ref: secondaryRef },
        });
      } else {
        patched = patched.unset(["secondaryCategory"]);
      }
      return patched;
    });
  }
  await tx.commit();
  console.log(`✅ Patched ${matched.length} posts.\n`);
}

main().catch((err) => {
  console.error("\nFatal:", err.message);
  if (err.response?.body) {
    console.error("Response body:", JSON.stringify(err.response.body, null, 2));
  }
  process.exit(1);
});
