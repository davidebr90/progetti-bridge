/**
 * Content integrity check for a blog article.
 *
 * Why: the article text is editorial content. It must travel from the source
 * entry file into data/articles.json and into the generated static pages
 * without a single character being rewritten, reformatted or "fixed". This
 * script hashes the parsed strings (not the raw file), so indentation and key
 * order in the JSON are irrelevant: only the text itself is checked.
 *
 * Usage:
 *   node scripts/check-article.mjs <path-to-entry.json>
 *   node scripts/check-article.mjs data/articles.json --id <article-id>
 *
 * Exit code 1 on any FAIL.
 */
import { readFileSync } from "node:fs";
import { createHash } from "node:crypto";

/* Expected fingerprints, keyed by article id. Add an entry here when a new
   article is published; an unknown id only gets the structural checks. */
const EXPECTED = {
  "chi-e-sulla-scialuppa": {
    bodyLength: 13355,
    bodySha256: "b16781e44579c321dddb1086fdda286b29d18462bea80f3741bb7f2e5516fce1",
    enBodyLength: 12887,
    enBodySha256: "e660a37b6054e7636fbe0b26e7c1fa490167cb1fd054efe0a0669d058dcc90a5",
    headingsIt: 10,
    headingsEn: 10,
    linksIt: 4,
    linksEn: 4,
    excerptLength: 188,
    enExcerptLength: 184,
  },
};

const sha256 = (s) => createHash("sha256").update(s, "utf8").digest("hex");
const countHeadings = (s) => (s.match(/^## /gm) || []).length;
const countLinks = (s) => (s.match(/\[[^\]]+\]\(https?:\/\/[^)\s]+\)/g) || []).length;

const args = process.argv.slice(2);
const file = args[0];
if (!file) {
  console.error("Usage: node scripts/check-article.mjs <entry.json> [--id <article-id>]");
  process.exit(1);
}
const idFlag = args.indexOf("--id");
const wantedId = idFlag !== -1 ? args[idFlag + 1] : null;

let parsed;
try {
  parsed = JSON.parse(readFileSync(file, "utf8"));
} catch (err) {
  console.error(`FAIL  file is not valid JSON: ${err.message}`);
  process.exit(1);
}

/* Accept either a bare entry object or the full articles.json shape. */
let article;
if (Array.isArray(parsed) || Array.isArray(parsed.articles)) {
  const list = Array.isArray(parsed) ? parsed : parsed.articles;
  const id = wantedId || Object.keys(EXPECTED)[0];
  article = list.find((a) => a.id === id);
  if (!article) {
    console.error(`FAIL  article "${id}" not found in ${file}`);
    process.exit(1);
  }
} else {
  article = parsed;
}

const expected = EXPECTED[article.id];
if (!expected) {
  console.error(`FAIL  no expected fingerprint registered for id "${article.id}"`);
  process.exit(1);
}

const body = article.body ?? "";
const enBody = article.en?.body ?? "";
const excerpt = article.excerpt ?? "";
const enExcerpt = article.en?.excerpt ?? "";

const checks = [
  ["id", article.id, "chi-e-sulla-scialuppa"],
  ["body (IT) length", body.length, expected.bodyLength],
  ["body (IT) sha256", sha256(body), expected.bodySha256],
  ["en.body length", enBody.length, expected.enBodyLength],
  ["en.body sha256", sha256(enBody), expected.enBodySha256],
  ['heading "## " IT', countHeadings(body), expected.headingsIt],
  ['heading "## " EN', countHeadings(enBody), expected.headingsEn],
  ["markdown links IT", countLinks(body), expected.linksIt],
  ["markdown links EN", countLinks(enBody), expected.linksEn],
  ["excerpt IT length", excerpt.length, expected.excerptLength],
  ["excerpt EN length", enExcerpt.length, expected.enExcerptLength],
];

let failed = 0;
const pad = Math.max(...checks.map((c) => c[0].length));
for (const [label, actual, want] of checks) {
  const ok = String(actual) === String(want);
  if (!ok) failed++;
  const detail = ok ? String(actual) : `got ${actual} / expected ${want}`;
  console.log(`${ok ? "PASS" : "FAIL"}  ${label.padEnd(pad)}  ${detail}`);
}

console.log("");
if (failed) {
  console.error(`${failed} check(s) FAILED on "${file}" - the text has been altered, do not publish.`);
  process.exit(1);
}
console.log(`All ${checks.length} checks passed on "${file}".`);
