import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { join, dirname } from "node:path";
import { runInNewContext } from "node:vm";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const source = readFileSync(join(root, "app.js"), "utf8");
const getLangSource = source.slice(source.indexOf("function getLang()"), source.indexOf('let LANG = "it"'));
let failures = 0;
function check(name, fn) {
  try { fn(); console.log(`PASS ${name}`); }
  catch (error) { failures++; console.error(`FAIL ${name}: ${error.message}`); }
}
function language(search, saved, browser = "en-US", blocked = false) {
  return runInNewContext(`${getLangSource}\ngetLang()`, {
    URLSearchParams, location: { search }, LANG_KEY: "bridge-lang",
    localStorage: { getItem() { if (blocked) throw new Error("storage blocked"); return saved; } },
    navigator: { language: browser },
  });
}
check("Italian URL overrides saved English", () => assert.equal(language("?art=chi-e-sulla-scialuppa&lang=it", "en"), "it"));
check("English URL overrides saved Italian", () => assert.equal(language("?art=chi-e-sulla-scialuppa&lang=en", "it"), "en"));
check("Explicit language works with blocked storage", () => assert.equal(language("?lang=it", null, "en-US", true), "it"));
check("Ordinary visits retain saved preference", () => assert.equal(language("", "en", "it-IT"), "en"));
check("Unknown language falls back to preference", () => assert.equal(language("?lang=de", "it"), "it"));
check("Browser language remains the final fallback", () => assert.equal(language("", null, "en-GB"), "en"));

const data = JSON.parse(readFileSync(join(root, "data/articles.json"), "utf8"));
for (const article of data.articles) {
  for (const lang of article.en ? ["it", "en"] : ["it"]) {
    check(`${article.id}: ${lang} link retains article and language`, () => {
      const relative = `blog/${article.id}/${lang === "en" ? "en/" : ""}`;
      const html = readFileSync(join(root, relative, "index.html"), "utf8");
      const href = html.match(/<a href="([^"]+)">(?:Apri nel sito completo|Read in the full site)<\/a>/)?.[1];
      const url = new URL(href.replace(/&amp;/g, "&"), `https://davidebr90.github.io/progetti-bridge/${relative}`);
      assert.equal(url.pathname, "/progetti-bridge/");
      assert.equal(url.searchParams.get("art"), article.id);
      assert.equal(url.searchParams.get("lang"), lang);
    });
  }
}
process.exitCode = failures ? 1 : 0;
