/**
 * Mark webinar/event posts in Sanity and assign Zoom video links.
 * Usage: node scripts/mark-webinar-posts.mjs
 */

import { createClient } from "@sanity/client";
import { readFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");

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

// ── Webinar slugs with Zoom / video links ─────────────────────────────────
const WEBINAR_VIDEO_MAP = {
  "the-impact-of-indexation-on-your-smsf-clients":
    "https://us02web.zoom.us/webinar/register/WN_XzUbrKlfRhCgBnHaF50TQA",
  "trust-investments-in-an-smsf":
    "https://us02web.zoom.us/webinar/register/WN_dj7OE-5LTdatA6diZS4Ahg",
  "smsfs-and-in-house-asset-inclusions-exceptions-and-restrictions":
    "https://us02web.zoom.us/webinar/register/WN_tceo75rRSwWgbr2zigypVg",
  "everything-you-need-to-know-about-paying-benefits-from-an-smsf":
    "https://us02web.zoom.us/webinar/register/WN_TXYq7SV2RaG0S96jIGCazA",
  "the-literal-ins-and-outs-of-smsf-trusteeship":
    "https://us02web.zoom.us/webinar/register/WN_qnoSQQTUSWah2Bv4uEpFAA",
  "exiting-legacy-pensions-and-reserves-in-an-smsf":
    "https://us02web.zoom.us/webinar/register/WN_n_Lh-sDgSHCOcFlb5U1_QQ",
  "interactive-contribution-strategies-in-an-smsf":
    "https://us02web.zoom.us/webinar/register/WN_IoiHnIFNRfqKNzDAIwzOpA",
  "how-indexation-impacts-strategic-considerations":
    "https://us02web.zoom.us/webinar/register/WN_hAKoKqjdQL-snZ5oQ7WFXw",
  "smsf-end-of-year-checklist":
    "https://us02web.zoom.us/webinar/register/WN_Hw0VpENrTsazrHWCwgChrw",
  "demystifying-smsf-documentation":
    "https://us02web.zoom.us/webinar/register/WN_wTVPwZfnTvaUzPkCdOXwEw",
  "death-of-an-smsf-member":
    "https://us02web.zoom.us/webinar/register/WN_04O8KtbiRnSbPIT_Aber7w",
  "holding-insurance-in-an-smsf":
    "https://us02web.zoom.us/webinar/register/WN_w-tkllNFS-OR2TjU6COagw",
  "unit-trust-investments-in-an-smsf":
    "https://us02web.zoom.us/webinar/register/WN_cB9IVMkpR1WhY3PeDxWuBQ",
  "property-investments-in-an-smsf":
    "https://us02web.zoom.us/webinar/register/WN_rHIv_Co5QkSpyiwIcClTCg",
  "smsf-pension-planning-toolkit":
    "https://us02web.zoom.us/webinar/register/WN_jByX9g6RTFuMj2aN6TAokg",
  "smsf-contributions-and-the-work-test-changes":
    "https://us02web.zoom.us/webinar/register/WN_BPTp3hMzR9yBP34MZ69N2w",
  "borrowing-in-an-smsf-lrbas-and-other-rules":
    "https://us02web.zoom.us/webinar/register/WN_dx3EQdcWTJGYPw_g9L53OA",
  "smsf-end-game-winding-up-is-the-final-strategy":
    "https://us02web.zoom.us/webinar/register/WN_COzmN7L1TSSRLPLb1f2Jrg",
  "personal-contributions-seem-so-easy-until-theyre-not":
    "https://us02web.zoom.us/webinar/register/WN_9PiteA7wRrGpgyyJgxWn0A",
  "looking-under-the-hood-of-smsf-benefit-payments":
    "https://us02web.zoom.us/webinar/register/WN_3XI4HxL_ReuuyhThPuXylQ",
  "the-many-faces-of-smsf-property-development":
    "https://us02web.zoom.us/webinar/register/WN_DTBC4QEZTuSynC6IoVVWRQ",
  "cash-coins-crypto-and-collectables-not-all-money-is-created-equal":
    "https://us02web.zoom.us/webinar/register/WN_lBeVAR1LSXSkW9RZ9KiPVA",
  "what-asset-segregation-means-to-an-smsf":
    "https://us02web.zoom.us/webinar/register/WN_aAz8IhgpQRebLKstHM_wpg",
  "investment-strategies-destroy-the-red-tape-reduction-strategy":
    "https://us02web.zoom.us/webinar/register/WN_nTMw0PNnS6qADy5XeEV0eA",
};

// ── Webinar slugs with no video link yet ─────────────────────────────────
const WEBINAR_SLUGS_NO_VIDEO = [
  // Title starts with "Webinar -"
  "webinar-smsf-year-in-review",
  "webinar-a-guide-to-smsf-investment-strategies",
  "webinar-asset-segregation-and-ecpi-in-an-smsf",
  "webinar-commencing-and-ceasing-a-pension-in-an-smsf",
  "webinar-does-indexation-impact-your-smsf-clients",
  "webinar-dont-neglect-your-smsf-documentation-needs",
  "webinar-holding-business-real-property-in-an-smsf",
  "webinar-how-the-3m-division-296-tax-will-impact-smsfs",
  "webinar-insuranctransfer-balance-caps-div-296",
  "webinar-impact-of-failing-the-pension-standards",
  "webinar-smsf-benefit-payments-tips-and-traps",
  "webinar-the-latest-intel-on-lrbas-2",
  "webinar-smsf-expenses-under-the-microscope",
  "webinar-smsf-estate-planning-considerations",
  "smsfs-post-the-federal-budget",
  "the-smsf-winding-up-window-is-always-open",
  "webinar-the-problem-dealing-with-related-parties",
  "webinar-the-latest-intel-on-lrbas",
  // SuperGuardian Webinar
  "superguardian-webinar-a-walk-though-for-advisers",
  "superguardian-webinar-a-walk-though-for-advisers-2",
  // SMSF Day events
  "smsf-day-2023",
  "smsf-day-2024",
  // Workshops
  "holding-property-in-an-smsf-workshop",
  "creating-a-contribution-strategy-playbook-workshop",
  "creating-a-contribution-strategy-playbook-workshop-2",
  "creating-a-pension-strategy-playbook-workshop",
  // Other confirmed webinars
  "are-your-smsfs-audit-and-future-proof",
  "smsfs-in-2022-a-year-in-review",
  "smsfs-and-crypto-assets",
  "smsfs-and-social-security",
  "smsfs-acquiring-assets-from-related-parties",
  "death-benefits-smsfs-planning-for-the-inevitable",
  "smsfs-and-separating-members-how-relationship-breakdowns-impact-smsfs",
  "six-member-smsfs-the-good-the-bad-and-the-indifferent",
  "smsf-trustee-presentation",
];

async function main() {
  const posts = await client.fetch(
    `*[_type == "post" && !(_id in path("drafts.**"))] { _id, "slug": slug.current }`
  );
  const postBySlug = new Map(posts.map((p) => [p.slug, p._id]));

  const allWebinarSlugs = [
    ...Object.keys(WEBINAR_VIDEO_MAP),
    ...WEBINAR_SLUGS_NO_VIDEO,
  ];

  let marked = 0;
  let withVideo = 0;
  let notFound = 0;

  const tx = client.transaction();

  for (const slug of allWebinarSlugs) {
    const id = postBySlug.get(slug);
    if (!id) {
      console.warn(`⚠  Not found: ${slug}`);
      notFound++;
      continue;
    }
    const videoUrl = WEBINAR_VIDEO_MAP[slug];
    tx.patch(id, (p) => {
      const patch = p.set({ isWebinarPost: true });
      return videoUrl ? patch.set({ videoUrl }) : patch;
    });
    marked++;
    if (videoUrl) withVideo++;
    console.log(`${videoUrl ? "🎥" : "📅"} ${slug}`);
  }

  await tx.commit();

  console.log(`\n✅  Done!`);
  console.log(`   Posts marked as webinar : ${marked}`);
  console.log(`   With Zoom video link     : ${withVideo}`);
  console.log(`   Slugs not found          : ${notFound}`);
}

main().catch((err) => {
  console.error("Fatal:", err.message);
  process.exit(1);
});
