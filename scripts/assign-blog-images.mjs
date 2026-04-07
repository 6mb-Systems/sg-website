/**
 * Match, upload, and assign blog post images to Sanity posts.
 *
 * Images live in public/blog/ with their original display names.
 * This script maps each image to one or more post slugs, uploads
 * each image ONCE, then patches all matched posts in a transaction.
 *
 * Usage: node scripts/assign-blog-images.mjs
 */

import { createClient } from "@sanity/client";
import { readFileSync, createReadStream, existsSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");
const IMAGE_DIR = resolve(ROOT, "public", "blog");

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

// ── Image → Slug mapping ───────────────────────────────────────────────────
// Each key is the exact filename in public/blog/.
// Each value is the list of post slugs that should use that image.
const IMAGE_MAP = {
  "2021-22 Federal Budget Update.jpg": [
    "2021-22-federal-budget-update",
  ],
  "2023-2024 Federal Budget Update.jpg": [
    "2023-federal-budget-update",
    "smsfs-post-the-federal-budget",
  ],
  "3 Ways to get into Property with a SMSF.jpg": [
    "3-ways-to-get-into-property-with-a-smsf",
    "holding-property-in-an-smsf-workshop",
    "property-investments-in-an-smsf",
    "the-many-faces-of-smsf-property-development",
    "rent-and-loan-relief-guidelines-for-commercial-properties",
    "webinar-holding-business-real-property-in-an-smsf",
    "trust-investments-in-an-smsf",
  ],
  "5 Potential Errors When Running An SMSF.jpg": [
    "5-potential-errors-when-running-an-smsf",
  ],
  "Accessing Superannuation Benefits.jpg": [
    "accessing-superannuation-benefits",
    "everything-you-need-to-know-about-paying-benefits-from-an-smsf",
    "early-access-to-superannuation",
    "accessing-benefits-process-and-smsf-investment-relief",
    "webinar-smsf-benefit-payments-tips-and-traps",
    "looking-under-the-hood-of-smsf-benefit-payments",
  ],
  "Alternate Trustees for SMSFs.jpg": [
    "alternate-trustees-for-smsfs",
  ],
  "Annual Trustee Plan.jpg": [
    "2021-annual-trustee-plan",
    "webinar-smsf-year-in-review",
    "faqs-for-lab-group",
    "cube",
    "smsf-day-2024",
    "smsf-day-2023",
    "smsfs-in-2022-a-year-in-review",
    "upcoming-events",
    "are-your-smsfs-audit-and-future-proof",
    "covid-19-6-months-on-reflect-and-reset-2",
  ],
  "Appointing SuperGuardian as your Tax Agent.jpg": [
    "appointing-superguardian-as-your-tax-agent",
    "videos-agent-linking-instructions-mp4",
    "superguardian-webinar-a-walk-though-for-advisers-2",
    "superguardian-webinar-a-walk-though-for-advisers",
    "fixed-service-fees",
    "one-stop-shop",
    "dedicated-client-managers",
  ],
  "Apportioning SMSF Expenses.jpg": [
    "unsegregated-smsfs-and-actuarial-requirements-2",
  ],
  "Borrowing in your SMSF.jpg": [
    "borrowing-in-your-smsf",
    "borrowing-in-an-smsf-lrbas-and-other-rules",
    "webinar-the-latest-intel-on-lrbas",
  ],
  "Bring Forward Contributions.jpg": [
    "https-www-superguardian-com-au-pdfs-bring-forward-contributions-pdf",
  ],
  "Contribution and Total Superannuation Balance.jpg": [
    "contribution-and-total-superannuation-balance",
    "reviewing-your-smsf-contribution-strategies",
    "interactive-contribution-strategies-in-an-smsf",
    "personal-contributions-seem-so-easy-until-theyre-not",
    "creating-a-contribution-strategy-playbook-workshop-2",
    "creating-a-contribution-strategy-playbook-workshop",
    "traversing-the-contribution-landscape-2",
    "webinar-the-latest-intel-on-lrbas-2",
  ],
  "Cryptocurrency Investments for SMSFs.jpg": [
    "cryptocurrency-investments-for-smsfs",
    "smsfs-and-crypto-assets",
    "cash-coins-crypto-and-collectables-not-all-money-is-created-equal",
  ],
  "Death and Incapacity – Who is in control of your SMSF.jpg": [
    "death-and-incapacity-who-is-in-control-of-your-smsf",
    "death-of-an-smsf-member",
    "death-benefits-smsfs-planning-for-the-inevitable",
  ],
  "Deciding on your SMSF Trustee.jpg": [
    "deciding-on-your-smsf-trustee",
    "the-literal-ins-and-outs-of-smsf-trusteeship",
    "smsf-trustee-presentation",
    "smsfs-and-separating-members-how-relationship-breakdowns-impact-smsfs",
  ],
  "Deferred Contribution Allocation.jpg": [
    "deferred-contribution-allocation",
  ],
  "Division 296 Tax Discussion Paper.jpg": [
    "division-296-tax-discussion-paper",
    "division-296-and-smsfs-the-good-the-bad-and-the-ugly",
    "update-regarding-proposed-tax-for-superannuation-members-over-usd3-million",
    "update-regarding-proposed-tax-for-superannuation-members-over-3-million",
    "webinar-how-the-3m-division-296-tax-will-impact-smsfs",
  ],
  "Downsizer contributions and SMSFs.jpg": [
    "downsizer-contributions-and-smsfs",
  ],
  "Electronic Signing.jpg": [
    "electronic-signing",
    "webinar-dont-neglect-your-smsf-documentation-needs",
    "demystifying-smsf-documentation",
    "premium-online-dashboard",
  ],
  "End of Financial Year Checklist.jpg": [
    "end-of-financial-year-checklist",
    "end-of-year-checklist-are-your-smsfs-30-june-ready",
    "30-june-checklist-for-smsfs-planning-around-the-unknown",
    "smsf-end-of-year-checklist",
  ],
  "Enduring Power of Attorney – Death Benefit Nomination.jpg": [
    "enduring-power-of-attorney-death-benefit-nomination",
  ],
  "Excess Concessional Contributions.jpg": [
    "excess-concessional-contributions",
  ],
  "Excess Non-Concessional Contributions.jpg": [
    "excess-non-concessional-contributions",
  ],
  "Explanatory Document – Death Benefit Nomination.jpg": [
    "explanatory-document-death-benefit-nomination",
  ],
  "First Home Super Saver Scheme.jpg": [
    "first_home_super_saver_scheme",
  ],
  "GST and SMSFs.jpg": [
    "gst-and-smsfs",
  ],
  "Guide to Pensions in SMSFs.jpg": [
    "guide-to-pensions-in-smsfs",
    "exiting-legacy-pensions-and-reserves-in-an-smsf",
    "webinar-commencing-and-ceasing-a-pension-in-an-smsf",
    "smsf-pension-planning-toolkit",
    "creating-a-pension-strategy-playbook-workshop",
  ],
  "Guide to Transition to Retirement Pensions in SMSFs.jpg": [
    "guide-to-transition-to-retirement-pensions-in-smsfs",
  ],
  "How to view your Transfer Balance Cap.jpg": [
    "how-to-view-your-transfer-balance-cap",
  ],
  "Implications of Late Lodgement of your SMSF Annual Return.jpg": [
    "implications-of-late-lodgement-of-your-smsf-annual-return",
  ],
  "Indexing the Personal Transfer Balance Cap.jpg": [
    "indexing-the-personal-transfer-balance-cap-2",
    "the-impact-of-indexation-on-your-smsf-clients",
    "how-indexation-impacts-strategic-considerations",
    "webinar-does-indexation-impact-your-smsf-clients",
  ],
  "Insurance based deductions.jpg": [
    "insurance-based-deductions-2",
    "insurance-premiums-to-claim-or-not-to-claim-a-tax-deduction",
    "holding-insurance-in-an-smsf",
    "webinar-insuranctransfer-balance-caps-div-296",
  ],
  "Investment Restrictions.jpg": [
    "investment_restrictions",
    "webinar-a-guide-to-smsf-investment-strategies",
    "investment-strategies-destroy-the-red-tape-reduction-strategy",
    "unit-trust-investments-in-an-smsf",
    "important-considerations-in-a-market-downturn",
    "smsfs-and-in-house-asset-inclusions-exceptions-and-restrictions",
  ],
  "Keeping up with an ever changing contribution environment.jpg": [
    "keeping-up-with-an-ever-changing-contribution-environment",
    "the-contribution-conundrum-navigating-potential-future-indexation-traps-2",
  ],
  "Non-Arm's Length Expenditure.jpg": [
    "non-arms-length-expenditure",
    "smsf-expenses-just-an-arms-length-away-2",
    "smsfs-acquiring-assets-from-related-parties",
    "smsfs-acquiring-assets-from-a-related-party",
    "webinar-the-problem-dealing-with-related-parties",
    "hardline-non-arms-length-expenses-approach-for-smsfs",
  ],
  "Non-arm's length expenses – changing old habits.jpg": [
    "non-arms-lenth-expenses-in-an-smsf",
    "non-arms-length-expenditure-nale",
  ],
  "Paying pensions – the importance of planning ahead.jpg": [
    "paying-pensions-the-importance-of-planning-ahead",
    "prospective-pension-payment-planning-2",
    "webinar-impact-of-failing-the-pension-standards",
  ],
  "Precious Metals – How to hold Gold and Silver in an SMSF.jpg": [
    "precious-metals-how-to-hold-gold-and-silver-in-an-smsf",
  ],
  "Retirement Phase Lump Sum Withdrawals.jpg": [
    "retirement-phase-lump-sum-withdrawals",
  ],
  "Reversionary Pensions.jpg": [
    "reversionary-pensions",
  ],
  "SMSF Residency.jpg": [
    "smsf-residency-2",
  ],
  "SMSF Trustee Structure – What is the process to change it.jpg": [
    "smsf-trustee-structure-what-is-the-process-to-change-it",
  ],
  "SMSF Windups.jpg": [
    "smsf-windups",
    "smsf-end-game-winding-up-is-the-final-strategy",
    "the-smsf-winding-up-window-is-always-open",
  ],
  "SMSF and Estate Planning Considerations.jpg": [
    "smsf-and-estate-planning-considerations",
    "webinar-smsf-estate-planning-considerations",
  ],
  "SMSFs and the Age Pension.jpg": [
    "smsfs-and-the-age-pension",
    "smsfs-and-social-security",
  ],
  "Segregating Assets in SMSF.jpg": [
    "technical-bulletin-segregation-assets-in-smsf",
    "what-asset-segregation-means-to-an-smsf",
    "webinar-asset-segregation-and-ecpi-in-an-smsf",
  ],
  "Six Member SMSFs.jpg": [
    "six-member-smsfs",
    "six-member-smsfs-the-good-the-bad-and-the-indifferent",
  ],
  "The benefits of a special purpose corporate trustee.jpg": [
    "the-benefits-of-a-special-purpose-corporate-trustee",
  ],
  "The winners and losers of an indexed transfer balance cap.jpg": [
    "the-winners-and-losers-of-an-indexed-transfer-balance-cap",
  ],
  "Timeline Changes in Super 2007-2021.jpg": [
    "super-changes-timeline",
  ],
  "Top 10 Trustee Tips to Running a Successful SMSF.jpg": [
    "top-10-trustee-tips-to-running-a-successful-smsf",
  ],
  "Total Superannuation Balance – A contribution game changer.jpg": [
    "total-superannuation-balance-a-contribution-game-changer",
  ],
  "Transfer Balance Account Reporting.jpg": [
    "smsf-expense-apportionment-and-insurances-are-you-claiming-the-right-expenses-2",
  ],
  "UK Pension Schemes.jpg": [
    "uk-pension-schemes",
  ],
  "Understanding SMSF Expenses.jpg": [
    "understanding-smsf-expenses",
    "webinar-smsf-expenses-under-the-microscope",
  ],
  "Understanding super terminology.jpg": [
    "understanding-super-terminology",
  ],
  "Unsegregated SMSFs and Actuarial Requirements.jpg": [
    "unsegregated-smsfs-and-actuarial-requirements",
  ],
  "Unused Concessional Contributions Cap Carry Forward.jpg": [
    "unused-concessional-contributions-cap-carry-forward",
  ],
  "Valuations for Year End Reporting (Trustees).jpg": [
    "valuations-for-year-end-reporting-trustees",
  ],
  "Valuations for Year End Reporting.jpg": [
    "valuations-for-yearend-reporting",
    "valuations-and-smsf-checklist-for-year-end-reporting-advisers",
  ],
  "Why is an Enduring Power of Attorney essential.jpg": [
    "why-is-an-enduring-power-of-attorney-essential",
  ],
  "Work Test Exemption.jpg": [
    "work-test-exemption",
    "smsf-contributions-and-the-work-test-changes",
  ],
};

// ── Main ───────────────────────────────────────────────────────────────────
async function main() {
  // Fetch all posts → build slug → _id map
  const posts = await client.fetch(
    `*[_type == "post" && !(_id in path("drafts.**"))] { _id, "slug": slug.current }`
  );
  const postBySlug = new Map(posts.map((p) => [p.slug, p._id]));
  console.log(`Fetched ${posts.length} posts from Sanity.\n`);

  let totalUploaded = 0;
  let totalPatched = 0;
  let missingFiles = 0;
  let unmatchedSlugs = 0;

  for (const [filename, slugs] of Object.entries(IMAGE_MAP)) {
    const filePath = resolve(IMAGE_DIR, filename);

    if (!existsSync(filePath)) {
      console.warn(`⚠  File not found, skipping: ${filename}`);
      missingFiles++;
      continue;
    }

    // Resolve which post IDs actually exist in Sanity
    const postIds = [];
    for (const slug of slugs) {
      const id = postBySlug.get(slug);
      if (id) {
        postIds.push({ id, slug });
      } else {
        console.warn(`   ⚠ No post for slug: ${slug}`);
        unmatchedSlugs++;
      }
    }

    if (postIds.length === 0) continue;

    // Upload the image asset ONCE
    process.stdout.write(`↑  Uploading: ${filename} … `);
    let asset;
    try {
      asset = await client.assets.upload("image", createReadStream(filePath), {
        filename,
        contentType: "image/jpeg",
      });
      totalUploaded++;
      console.log(`done (${asset._id})`);
    } catch (err) {
      console.error(`FAILED — ${err.message}`);
      continue;
    }

    // Patch all matching posts in a single transaction
    const tx = client.transaction();
    for (const { id, slug } of postIds) {
      tx.patch(id, (p) =>
        p.set({
          mainImage: {
            _type: "image",
            asset: { _type: "reference", _ref: asset._id },
            alt: slug.replace(/-|_/g, " "),
          },
        })
      );
    }
    await tx.commit();
    totalPatched += postIds.length;
    console.log(`   ✓ Assigned to ${postIds.length} post(s): ${postIds.map((p) => p.slug).join(", ")}`);
  }

  console.log(`\n✅  Done!`);
  console.log(`   Images uploaded : ${totalUploaded}`);
  console.log(`   Posts patched   : ${totalPatched}`);
  if (missingFiles) console.log(`   Missing files  : ${missingFiles}`);
  if (unmatchedSlugs) console.log(`   Unknown slugs  : ${unmatchedSlugs}`);
}

main().catch((err) => {
  console.error("Fatal:", err.message);
  process.exit(1);
});
