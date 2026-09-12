/**
 * Attach the hero image metadata to the articles in data/articles.json.
 *
 * The image files themselves are produced by scripts/build-article-images.py;
 * this script only writes the descriptive part (reference artist, movement, alt
 * text and caption) that the renderer needs. As with add-article.mjs, nothing is
 * edited in data/articles.json by hand.
 *
 * Usage:
 *   node scripts/add-article-images.mjs <path-to-images.json> [--dry-run]
 *
 * The input maps an article id to { artist, movement, alt, caption, en{...} }.
 * Exit code 1 on any failed validation, naming the check and the article.
 */
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const TARGET = join(ROOT, "data", "articles.json");
const IMG_DIR = join(ROOT, "assets", "blog");

const KEYS = ["artist", "movement", "alt", "caption"];
const EN_KEYS = ["movement", "alt", "caption"];
const ALT_MAX = 260;
const CAPTION_MIN = 120;
const CAPTION_MAX = 600;
/* Derivatives written by build-article-images.py, suffix -> expected size. */
const FILES = {
  "1200.webp": [1200, 800],
  "800.webp": [800, 533],
  "og.jpg": [1200, 630],
};

const args = process.argv.slice(2);
const dryRun = args.includes("--dry-run");
const inputPath = args.find((a) => !a.startsWith("--"));
if (!inputPath) {
  console.error("Usage: node scripts/add-article-images.mjs <images.json> [--dry-run]");
  process.exit(1);
}

const input = JSON.parse(readFileSync(inputPath, "utf8"));
const data = JSON.parse(readFileSync(TARGET, "utf8"));
const byId = new Map(data.articles.map((a) => [a.id, a]));

const problems = [];
const fail = (id, check, detail) => problems.push({ id, check, detail });

const seenArtists = new Map();
for (const [id, img] of Object.entries(input)) {
  if (!byId.has(id)) {
    fail(id, "id", "no article with this id in data/articles.json");
    continue;
  }

  const got = Object.keys(img).filter((k) => k !== "en").sort();
  if (got.join() !== [...KEYS].sort().join()) fail(id, "schema", `keys: ${got.join(", ")}`);
  const enGot = img.en ? Object.keys(img.en).sort() : [];
  if (enGot.join() !== [...EN_KEYS].sort().join()) fail(id, "schema en", `keys: ${enGot.join(", ")}`);

  /* One reference artist per article: the visual series must not repeat itself. */
  if (seenArtists.has(img.artist)) fail(id, "artist", `"${img.artist}" already used by "${seenArtists.get(img.artist)}"`);
  else seenArtists.set(img.artist, id);

  for (const [lang, o] of [["it", img], ["en", img.en || {}]]) {
    const alt = String(o.alt ?? "");
    const caption = String(o.caption ?? "");
    if (!alt || alt.length > ALT_MAX) fail(id, `alt ${lang}`, `${alt.length} chars, expected 1-${ALT_MAX}`);
    if (caption.length < CAPTION_MIN || caption.length > CAPTION_MAX)
      fail(id, `caption ${lang}`, `${caption.length} chars, expected ${CAPTION_MIN}-${CAPTION_MAX}`);
    if (/[–—]/.test(alt + caption)) fail(id, `dashes ${lang}`, "em dash or en dash found");
  }

  for (const suffix of Object.keys(FILES)) {
    if (!existsSync(join(IMG_DIR, `${id}-${suffix}`)))
      fail(id, "files", `assets/blog/${id}-${suffix} missing, run build-article-images.py first`);
  }
}

const missing = data.articles.filter((a) => !input[a.id]).map((a) => a.id);

if (problems.length) {
  for (const p of problems) console.error(`FAIL  ${p.id.padEnd(26)} ${p.check.padEnd(12)} ${p.detail}`);
  console.error(`\n${problems.length} problem(s). Nothing written.`);
  process.exit(1);
}

for (const [id, img] of Object.entries(input)) {
  const a = byId.get(id);
  const { en, ...it } = img;
  a.image = { src: `assets/blog/${id}`, width: 1200, height: 800, ...it };
  if (a.en) a.en.image = en;
}

const serialized = `${JSON.stringify(data, null, 2)}\n`;
JSON.parse(serialized);

for (const id of Object.keys(input)) console.log(`PASS  ${id.padEnd(26)} ${input[id].artist}`);
if (missing.length) console.log(`\nSenza immagine: ${missing.join(", ")}`);

if (dryRun) {
  console.log(`\nDry run: ${Object.keys(input).length} articoli riceverebbero l'immagine.`);
  process.exit(0);
}
writeFileSync(TARGET, serialized, "utf8");
console.log(`\nScritto: ${Object.keys(input).length} articoli su ${data.articles.length} hanno l'immagine.`);
