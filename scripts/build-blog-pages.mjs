/**
 * Genera le pagine statiche SEO degli articoli del blog:
 *   blog/<slug>/index.html      (italiano, canonico)
 *   blog/<slug>/en/index.html   (inglese, hreflang alternate)
 *
 * Perché: il sito è una SPA su GitHub Pages e i motori di ricerca premiano URL
 * "a percorso" (/blog/slug) con contenuto GIÀ nell'HTML, non dipendente da JS.
 * Queste pagine sono articoli completi e leggibili (stesso styles.css del sito,
 * tema chiaro/scuro incluso), con title/description/canonical/JSON-LD propri.
 * Il lettore della SPA resta l'esperienza in-site; share, sitemap e JSON-LD
 * puntano qui.
 *
 * Uso: `node scripts/build-blog-pages.mjs` dalla radice del repo, da rilanciare
 * ogni volta che data/articles.json cambia (aggiunta/modifica articoli).
 */
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const SITE = "https://davidebr90.github.io/progetti-bridge/";

const esc = (s) =>
  String(s ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

/* Blocco codice "CodeCanvas" (speculare ad app.js): righe numerate + Copia. */
function codeCanvasHTML(lang, code) {
  const lines = code
    .replace(/\n$/, "")
    .split("\n")
    .map((l) => `<span class="cc-line">${esc(l) || " "}</span>`)
    .join("\n");
  return `<figure class="code-canvas"><figcaption class="cc-bar"><span class="cc-lang">${esc(lang || "codice")}</span><button type="button" class="cc-copy" aria-label="Copia codice">Copia</button></figcaption><pre class="cc-pre"><code class="cc-code">${lines}</code></pre></figure>`;
}

/* Estrae codice ``` e formule LaTeX ($$/\[..\] display, \(..\) inline) in
   placeholder, speculare a extractRawSegments di app.js. */
function extractRawSegments(md) {
  const store = [];
  const put = (html) => {
    store.push(html);
    return `@@RAW${store.length - 1}@@`;
  };
  let text = String(md || "");
  text = text.replace(/```([a-zA-Z0-9#+-]*)\n([\s\S]*?)```/g, (_, lang, code) => put(codeCanvasHTML(lang, code)));
  const display = (_, tex) => {
    const t = tex.trim();
    return put(`<div class="math-display math-tex" data-tex="${esc(t)}">${esc(t)}</div>`);
  };
  text = text.replace(/\$\$([\s\S]+?)\$\$/g, display);
  text = text.replace(/\\\[([\s\S]+?)\\\]/g, display);
  text = text.replace(/\\\((.+?)\\\)/g, (_, tex) => {
    const t = tex.trim();
    return put(`<span class="math-inline math-tex" data-tex="${esc(t)}">${esc(t)}</span>`);
  });
  return { text, restore: (html) => html.replace(/@@RAW(\d+)@@/g, (_, i) => store[Number(i)] ?? "") };
}

/* Mini-renderer markdown, SPECULARE a mdToHtmlWithCitations di app.js:
   paragrafi, **grassetto**, *corsivo*, ## titoli, --- separatore, tabelle,
   codice ```, formule LaTeX, e i link [Etichetta](url) come citazioni numerate
   [n] con sezione Fonti in coda. */
function mdToHtml(md, sourcesLabel) {
  const seg = extractRawSegments(md);
  const cites = [];
  const byUrl = new Map();
  const pre = seg.text.replace(/\[([^\]]+)\]\((https?:\/\/[^)\s]+)\)/g, (_, label, url) => {
    let n = byUrl.get(url);
    if (!n) {
      n = cites.length + 1;
      byUrl.set(url, n);
      cites.push({ url, label });
    }
    return `@@CITE${n}@@`;
  });
  const inline = (s) =>
    esc(s)
      .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
      .replace(/\*(.+?)\*/g, "<em>$1</em>");
  const cells = (row) => row.replace(/^\s*\|/, "").replace(/\|\s*$/, "").split("|").map((c) => c.trim());
  let html = pre
    .split(/\n{2,}/)
    .map((block) => {
      const b = block.trim();
      if (!b) return "";
      if (b === "---" || b === "***") return "<hr />";
      if (/^@@RAW\d+@@$/.test(b)) return b;
      const lines = b.split("\n");
      if (lines.length >= 2 && /^\s*\|.+\|\s*$/.test(lines[0]) && /^\s*\|[\s:|-]+\|\s*$/.test(lines[1])) {
        const th = cells(lines[0]).map((c) => `<th>${inline(c)}</th>`).join("");
        const trs = lines.slice(2).map((r) => `<tr>${cells(r).map((c) => `<td>${inline(c)}</td>`).join("")}</tr>`).join("");
        return `<div class="md-table"><table><thead><tr>${th}</tr></thead><tbody>${trs}</tbody></table></div>`;
      }
      const h = b.match(/^(#{1,3})\s+([\s\S]+)$/);
      if (h) {
        const tag = h[1].length >= 3 ? "h3" : "h2";
        return `<${tag} class="ra-${tag}">${inline(h[2].trim())}</${tag}>`;
      }
      return `<p>${inline(b).replace(/\n/g, "<br />")}</p>`;
    })
    .join("\n")
    .replace(
      /\s*@@CITE(\d+)@@/g,
      (_, n) => `<sup class="cite-ref"><a href="#fonte-${n}" aria-label="fonte ${n}">[${n}]</a></sup>`,
    );
  if (cites.length) {
    const items = cites
      .map((c, i) => {
        let host = "";
        try {
          host = new URL(c.url).hostname.replace(/^www\./, "");
        } catch {}
        return `<li id="fonte-${i + 1}"><a href="${esc(c.url)}" target="_blank" rel="noopener">${esc(c.label)}</a>${host ? ` <span class="cite-host">(${esc(host)})</span>` : ""}</li>`;
      })
      .join("");
    html += `\n<hr />\n<section class="cite-list"><h3 class="ra-h3">${esc(sourcesLabel)}</h3><ol>${items}</ol></section>`;
  }
  return seg.restore(html);
}

function fmtDate(iso, lang) {
  const d = new Date(iso + "T00:00:00");
  return d.toLocaleDateString(lang === "en" ? "en-GB" : "it-IT", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function pageHTML(a, lang, depth) {
  const en = a.en || {};
  const L = (field) => (lang === "en" && en[field] != null ? en[field] : a[field]);
  const bodyHtml = mdToHtml(L("body"), lang === "en" ? "Sources & references" : "Fonti e riferimenti");
  // Asset extra SOLO se servono: KaTeX (CDN jsDelivr, MIT) per le formule e lo
  // script Copia per i CodeCanvas. Le pagine senza math/codice restano leggere.
  const hasMath = bodyHtml.includes("math-tex");
  const hasCode = bodyHtml.includes("code-canvas");
  const extraHead = hasMath
    ? `\n    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/katex.min.css" />\n    <script defer src="https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/katex.min.js"></script>`
    : "";
  const extraScript = hasMath || hasCode
    ? `\n    <script>
      window.addEventListener("DOMContentLoaded", function () {
        if (window.katex) {
          document.querySelectorAll(".math-tex").forEach(function (el) {
            try { window.katex.render(el.dataset.tex || el.textContent, el, { displayMode: el.classList.contains("math-display"), throwOnError: false }); } catch (e) {}
          });
        }
        document.addEventListener("click", async function (e) {
          var btn = e.target.closest(".cc-copy");
          if (!btn) return;
          var code = btn.closest(".code-canvas");
          code = code && code.querySelector(".cc-code");
          if (!code) return;
          try { await navigator.clipboard.writeText(code.textContent || ""); btn.textContent = "Copiato"; }
          catch (err) { btn.textContent = "Errore"; }
          setTimeout(function () { btn.textContent = "Copia"; }, 2000);
        });
      });
    </script>`
    : "";
  const rel = "../".repeat(depth); // asset relativi dalla profondità della pagina
  const urlIt = `${SITE}blog/${a.id}/`;
  const urlEn = `${SITE}blog/${a.id}/en/`;
  const self = lang === "en" ? urlEn : urlIt;
  const other = lang === "en" ? urlIt : urlEn;
  const title = `${L("title")} · Davide Pica`;
  const desc = L("excerpt") || "";
  const minutes = a.minutes ? `${a.minutes} ${lang === "en" ? "min read" : "min di lettura"}` : "";
  const back = lang === "en" ? "← All articles" : "← Tutti gli articoli";
  const openInSite = lang === "en" ? "Read in the full site" : "Apri nel sito completo";
  const jsonld = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: L("title"),
    datePublished: a.date,
    inLanguage: lang === "en" ? "en" : "it",
    articleSection: L("category") || undefined,
    description: desc || undefined,
    author: { "@type": "Person", name: "Davide Pica", url: SITE },
    mainEntityOfPage: self,
    url: self,
  };
  return `<!doctype html>
<html lang="${lang === "en" ? "en" : "it"}" data-theme="">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${esc(title)}</title>
    <meta name="description" content="${esc(desc)}" />
    <meta name="author" content="Davide Pica" />
    <meta name="robots" content="index, follow" />
    <link rel="canonical" href="${self}" />
    <link rel="alternate" hreflang="it" href="${urlIt}" />
    ${a.en ? `<link rel="alternate" hreflang="en" href="${urlEn}" />` : ""}
    <link rel="alternate" hreflang="x-default" href="${urlIt}" />
    <meta property="og:type" content="article" />
    <meta property="og:site_name" content="Davide Pica" />
    <meta property="og:title" content="${esc(title)}" />
    <meta property="og:description" content="${esc(desc)}" />
    <meta property="og:url" content="${self}" />
    <meta property="og:locale" content="${lang === "en" ? "en_US" : "it_IT"}" />
    <meta property="article:published_time" content="${a.date}" />
    <meta name="twitter:card" content="summary" />
    <meta name="twitter:title" content="${esc(title)}" />
    <meta name="twitter:description" content="${esc(desc)}" />
    <meta name="color-scheme" content="light dark" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,ital,wght@9..144,0,400;9..144,0,500;9..144,0,600;9..144,1,500&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
    <link rel="stylesheet" href="${rel}styles.css" />
    <script>
      // Stesso bootstrap tema del sito: preferenza condivisa, niente flash.
      (function () {
        try {
          var p = localStorage.getItem("bridge-theme");
          if (p === "light" || p === "dark") document.documentElement.setAttribute("data-theme", p);
        } catch (e) {}
      })();
    </script>
    <style>
      /* Layout minimo della pagina statica: riusa i token e le classi .ra-* del sito. */
      .static-article { max-width: 72ch; margin: 0 auto; padding: clamp(2rem,6vw,4rem) clamp(1.1rem,5vw,2rem) 5rem; }
      .static-topbar { display: flex; justify-content: space-between; align-items: center; gap: 1rem; margin-bottom: clamp(1.6rem,4vw,2.6rem); font-size: .9rem; }
      .static-topbar a { color: var(--ink-soft); text-decoration: none; }
      .static-topbar a:hover { color: var(--ink); text-decoration: underline; }
      .static-article .ra-title { margin-left: 0; max-width: none; }
      .static-article .ra-meta, .static-article .ra-body { margin-left: 0; }
      .static-langswitch { color: var(--ink-faint); }
    </style>
    <script type="application/ld+json">${JSON.stringify(jsonld)}</script>${extraHead}
  </head>
  <body>
    <main class="static-article">
      <nav class="static-topbar">
        <a href="${rel}">${esc(back)}</a>
        ${a.en ? `<span class="static-langswitch"><a href="${other}" hreflang="${lang === "en" ? "it" : "en"}">${lang === "en" ? "Italiano" : "English"}</a></span>` : ""}
      </nav>
      <p class="ra-meta" style="--accent:${esc(a.accent || "var(--brand)")}"><span class="ra-cat">${esc(L("category") || "")}</span> · <span>${esc(fmtDate(a.date, lang))}</span>${minutes ? ` · <span>${esc(minutes)}</span>` : ""}</p>
      <h1 class="ra-title">${esc(L("title"))}</h1>
      <div class="ra-body" style="--accent:${esc(a.accent || "var(--brand)")}">
${bodyHtml}
      </div>
      <p><a href="${rel}?art=${encodeURIComponent(a.id)}${lang === "en" ? "&lang=en" : ""}">${esc(openInSite)}</a></p>
    </main>
${extraScript}
  </body>
</html>
`;
}

const data = JSON.parse(readFileSync(join(ROOT, "data", "articles.json"), "utf8"));
const articles = Array.isArray(data) ? data : data.articles;
let count = 0;
for (const a of articles) {
  const dirIt = join(ROOT, "blog", a.id);
  const dirEn = join(dirIt, "en");
  mkdirSync(dirIt, { recursive: true });
  writeFileSync(join(dirIt, "index.html"), pageHTML(a, "it", 2), "utf8");
  // Pagina EN solo se la traduzione esiste: niente doppioni IT spacciati per EN.
  if (a.en) {
    mkdirSync(dirEn, { recursive: true });
    writeFileSync(join(dirEn, "index.html"), pageHTML(a, "en", 3), "utf8");
  }
  count += 2;
}
console.log(`Generate ${count} pagine per ${articles.length} articoli in blog/`);
