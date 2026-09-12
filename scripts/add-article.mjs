/**
 * Merge a blog article entry into data/articles.json.
 *
 * The JSON file is the single source of truth for the blog: the SPA reads it at
 * runtime and scripts/build-blog-pages.mjs generates the static SEO pages from
 * it. Editing it by hand is how duplicate ids, reused accent colours and broken
 * markdown get in, so every new article goes through this script.
 *
 * Usage:
 *   node scripts/add-article.mjs <path-to-entry.json> [--dry-run]
 *
 * The entry is inserted at the head of the articles array (newest first). If an
 * article with the same id already exists it is replaced in place.
 * Exit code 1 on any failed validation, naming the check and the offending value.
 */
import { readFileSync, writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const TARGET = join(ROOT, "data", "articles.json");

const ENTRY_KEYS = ["id", "title", "category", "date", "minutes", "accent", "excerpt", "body", "en"];
const EN_KEYS = ["title", "category", "excerpt", "body"];
/* L'immagine di apertura è facoltativa e viene attaccata a parte da
   scripts/add-article-images.mjs: qui basta non trattarla come chiave estranea. */
const OPTIONAL_KEYS = ["image"];
const EXCERPT_MIN = 120;
const EXCERPT_MAX = 260;

const args = process.argv.slice(2);
const dryRun = args.includes("--dry-run");
const entryPath = args.find((a) => !a.startsWith("--"));
if (!entryPath) {
  console.error("Usage: node scripts/add-article.mjs <entry.json> [--dry-run]");
  process.exit(1);
}

const results = [];
const check = (name, ok, detail) => {
  results.push({ name, ok, detail });
};

let entry;
try {
  entry = JSON.parse(readFileSync(entryPath, "utf8"));
} catch (err) {
  console.error(`FAIL  entry file is not valid JSON: ${err.message}`);
  process.exit(1);
}

const data = JSON.parse(readFileSync(TARGET, "utf8"));
if (!Array.isArray(data.articles)) {
  console.error("FAIL  data/articles.json has no articles array");
  process.exit(1);
}
const others = data.articles.filter((a) => a.id !== entry.id);
const replacing = data.articles.length !== others.length;

/* --- schema ------------------------------------------------------------- */
{
  const got = Object.keys(entry).sort();
  const want = [...ENTRY_KEYS].sort();
  const missing = want.filter((k) => !got.includes(k));
  const extra = got.filter((k) => !want.includes(k) && !OPTIONAL_KEYS.includes(k));
  const enGot = entry.en && typeof entry.en === "object" ? Object.keys(entry.en).sort() : [];
  const enWant = [...EN_KEYS].sort();
  const enMissing = enWant.filter((k) => !enGot.includes(k));
  const enExtra = enGot.filter((k) => !enWant.includes(k) && !OPTIONAL_KEYS.includes(k));
  const problems = [
    missing.length ? `missing: ${missing.join(", ")}` : "",
    extra.length ? `unexpected: ${extra.join(", ")}` : "",
    enMissing.length ? `en missing: ${enMissing.join(", ")}` : "",
    enExtra.length ? `en unexpected: ${enExtra.join(", ")}` : "",
  ].filter(Boolean);
  check("schema", problems.length === 0, problems.join(" | ") || "exact keys, en subkeys ok");
}

/* --- id ----------------------------------------------------------------- */
{
  const shape = /^[a-z0-9]+(-[a-z0-9]+)*$/.test(String(entry.id ?? ""));
  const dup = others.some((a) => a.id === entry.id);
  check(
    "id",
    shape && !dup,
    !shape ? `bad slug: ${JSON.stringify(entry.id)}` : dup ? `duplicate id: ${entry.id}` : `${entry.id}${replacing ? " (replacing existing)" : ""}`,
  );
}

/* --- date --------------------------------------------------------------- */
{
  const s = String(entry.date ?? "");
  const shape = /^\d{4}-\d{2}-\d{2}$/.test(s);
  const d = new Date(`${s}T00:00:00Z`);
  const real = shape && !Number.isNaN(d.getTime()) && d.toISOString().slice(0, 10) === s;
  check("date", real, real ? s : `not a valid YYYY-MM-DD date: ${JSON.stringify(entry.date)}`);
}

/* --- minutes ------------------------------------------------------------ */
{
  const m = entry.minutes;
  const ok = Number.isInteger(m) && m >= 1 && m <= 60;
  check("minutes", ok, ok ? String(m) : `expected integer 1-60, got ${JSON.stringify(m)}`);
}

/* --- accent ------------------------------------------------------------- */
{
  const s = String(entry.accent ?? "");
  const shape = /^#[0-9a-f]{6}$/.test(s);
  const clash = others.find((a) => String(a.accent).toLowerCase() === s.toLowerCase());
  check(
    "accent",
    shape && !clash,
    !shape ? `expected #rrggbb lowercase, got ${JSON.stringify(entry.accent)}` : clash ? `already used by "${clash.id}"` : s,
  );
}

/* --- excerpt ------------------------------------------------------------ */
{
  const it = String(entry.excerpt ?? "").length;
  const en = String(entry.en?.excerpt ?? "").length;
  const okIt = it >= EXCERPT_MIN && it <= EXCERPT_MAX;
  const okEn = en >= EXCERPT_MIN && en <= EXCERPT_MAX;
  check(
    "excerpt",
    okIt && okEn,
    okIt && okEn ? `IT ${it}, EN ${en} chars` : `out of ${EXCERPT_MIN}-${EXCERPT_MAX}: IT ${it}, EN ${en}`,
  );
}

/* --- dashes: em dash and en dash are banned in editorial text ----------- */
{
  const fields = [
    ["body", entry.body],
    ["excerpt", entry.excerpt],
    ["en.body", entry.en?.body],
    ["en.excerpt", entry.en?.excerpt],
  ];
  const bad = [];
  for (const [name, text] of fields) {
    const hits = String(text ?? "").match(/[–—]/g);
    if (hits) bad.push(`${name} (${hits.length})`);
  }
  check("dashes", bad.length === 0, bad.length ? `long dashes found in ${bad.join(", ")}` : "no em dash or en dash");
}

/* --- links -------------------------------------------------------------- */
{
  const problems = [];
  let total = 0;
  for (const [name, text] of [["IT", entry.body], ["EN", entry.en?.body]]) {
    const s = String(text ?? "");
    const open = (s.match(/\[/g) || []).length;
    const close = (s.match(/\]/g) || []).length;
    const parenOpen = (s.match(/\(/g) || []).length;
    const parenClose = (s.match(/\)/g) || []).length;
    if (open !== close) problems.push(`${name}: unbalanced brackets ${open}/${close}`);
    if (parenOpen !== parenClose) problems.push(`${name}: unbalanced parentheses ${parenOpen}/${parenClose}`);
    const links = s.match(/\[[^\]]*\]\([^)]*\)/g) || [];
    total += links.length;
    for (const link of links) {
      const url = link.slice(link.lastIndexOf("](") + 2, -1);
      if (!/^https?:\/\/\S+$/.test(url)) problems.push(`${name}: bad url ${JSON.stringify(url)}`);
    }
    /* a "](" that did not produce a well-formed link means a malformed one */
    const marks = (s.match(/\]\(/g) || []).length;
    if (marks !== links.length) problems.push(`${name}: ${marks - links.length} malformed link(s)`);
  }
  check("links", problems.length === 0, problems.join(" | ") || `${total} links, all http(s), balanced`);
}

/* --- headings ----------------------------------------------------------- */
{
  const count = (s) => (String(s ?? "").match(/^## /gm) || []).length;
  const it = count(entry.body);
  const en = count(entry.en?.body);
  check("headings", it === en, it === en ? `${it} in IT and EN` : `IT ${it} vs EN ${en}`);
}

/* --- lists: the renderer has no list support, bullets would leak through - */
{
  const bad = [];
  for (const [name, text] of [["IT", entry.body], ["EN", entry.en?.body]]) {
    const n = String(text ?? "").split("\n").filter((l) => /^[-*] /.test(l)).length;
    if (n) bad.push(`${name} (${n} lines)`);
  }
  check("lists", bad.length === 0, bad.length ? `bullet lines found in ${bad.join(", ")}` : "no bullet lines");
}

/* --- serialize and re-parse -------------------------------------------- */
const merged = { ...data, articles: replacing ? data.articles.map((a) => (a.id === entry.id ? entry : a)) : [entry, ...data.articles] };
const serialized = `${JSON.stringify(merged, null, 2)}\n`;
{
  let ok = false;
  let detail = "";
  try {
    const back = JSON.parse(serialized);
    const ids = back.articles.map((a) => a.id);
    const unique = new Set(ids).size === ids.length;
    ok = unique && back.articles.some((a) => a.id === entry.id);
    detail = ok ? `${back.articles.length} articles, ids unique` : "duplicate ids after merge";
  } catch (err) {
    detail = `re-parse failed: ${err.message}`;
  }
  check("json", ok, detail);
}

/* --- report ------------------------------------------------------------- */
const pad = Math.max(...results.map((r) => r.name.length));
for (const r of results) console.log(`${r.ok ? "PASS" : "FAIL"}  ${r.name.padEnd(pad)}  ${r.detail}`);
console.log("");

const failed = results.filter((r) => !r.ok);
if (failed.length) {
  console.error(`${failed.length} validation(s) failed: ${failed.map((r) => r.name).join(", ")}. Nothing written.`);
  process.exit(1);
}

if (dryRun) {
  console.log(`Dry run: "${entry.id}" would be ${replacing ? "replaced in" : "added at the head of"} data/articles.json (${merged.articles.length} articles).`);
  process.exit(0);
}

writeFileSync(TARGET, serialized, "utf8");
console.log(`Written: "${entry.id}" ${replacing ? "replaced in" : "added at the head of"} data/articles.json (${merged.articles.length} articles).`);
