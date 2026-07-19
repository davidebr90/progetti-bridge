/* Progetti Bridge — pagina pubblica statica, senza framework.
 * 5 interfacce commutabili per gli STESSI dati; tema chiaro/scuro/auto e lingua
 * IT/EN dentro un menu hamburger flottante che elenca anche le sezioni; reveal
 * allo scroll; bio con social. Animazione = CSS + un filo di JS. */

const ICONS = {
  sun: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>',
  moon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg>',
  auto: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="12" rx="2"/><path d="M8 20h8M12 16v4"/></svg>',
  ext: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5"/></svg>',
  code: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 18l6-6-6-6M8 6l-6 6 6 6"/></svg>',
  github: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.53 2.36 1.09 2.94.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02a9.6 9.6 0 0 1 5 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10 10 0 0 0 12 2z"/></svg>',
  linkedin: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M6.94 5a2 2 0 1 1-4-.02 2 2 0 0 1 4 .02zM3.3 8.5h3.3V21H3.3V8.5zM9.5 8.5h3.16v1.7h.05c.44-.83 1.5-1.7 3.1-1.7 3.32 0 3.93 2.18 3.93 5.02V21h-3.3v-5.2c0-1.24-.02-2.84-1.73-2.84-1.73 0-2 1.35-2 2.75V21H9.5V8.5z"/></svg>',
  instagram: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="3.6"/><circle cx="17.4" cy="6.6" r="1.1" fill="currentColor" stroke="none"/></svg>',
  facebook: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.77-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.89h-2.34v6.99A10 10 0 0 0 22 12z"/></svg>',
  arrowR: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
  arrowL: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H5M11 18l-6-6 6-6"/></svg>',
  zoom: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/></svg>',
  close: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18M6 6l12 12"/></svg>',
  share: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4"/></svg>',
};

// Bandiere (SVG, niente emoji: su Windows le flag-emoji non si vedono).
const FLAGS = {
  it: '<svg viewBox="0 0 24 16" aria-hidden="true"><rect width="8" height="16" fill="#009246"/><rect x="8" width="8" height="16" fill="#fff"/><rect x="16" width="8" height="16" fill="#ce2b37"/></svg>',
  en: '<svg viewBox="0 0 24 16" aria-hidden="true"><rect width="24" height="16" fill="#012169"/><path d="M0 0l24 16M24 0L0 16" stroke="#fff" stroke-width="3.2"/><path d="M0 0l24 16M24 0L0 16" stroke="#c8102e" stroke-width="1.6"/><path d="M12 0v16M0 8h24" stroke="#fff" stroke-width="5.3"/><path d="M12 0v16M0 8h24" stroke="#c8102e" stroke-width="3.2"/></svg>',
};

const LANGS = [
  ["it", FLAGS.it, "Italiano"],
  ["en", FLAGS.en, "English"],
];

/* ---------- i18n stringhe UI ---------- */
const T = {
  it: {
    sections: "Sezioni", language: "Lingua", theme: "Tema",
    intro: "Intro", profile: "Profilo",
    demo: "Live demo", demoOff: "Demo offline", codeBtn: "Codice",
    "status.live": "Live", "status.beta": "Beta", "status.wip": "In sviluppo",
    menuOpen: "Apri il menu", menuClose: "Chiudi il menu",
    chooseStyle: "Scegli stile",
    blogNav: "Blog & Filosofia", minRead: "min di lettura", backBlog: "← Torna al blog",
    portfolio: "Progetti / Portfolio",
    openGallery: "Apri galleria", closeGallery: "Chiudi", prevImg: "Immagine precedente", nextImg: "Immagine successiva",
    share: "Condividi", shareArticle: "Condividi l'articolo", shareSection: "Condividi questa sezione",
    shareCopied: "Link copiato negli appunti",
    heroEyebrow: "Portfolio",
    seoTitle: "Davide Pica · Progetti, Blog & Filosofia",
    seoDesc: "Portfolio di Davide Pica: progetti software (self-hosted, WhatsApp, Rust, WordPress) con demo live e codice, e articoli su tecnologia, energia, demografia, AI e capitale umano.",
  },
  en: {
    sections: "Sections", language: "Language", theme: "Theme",
    intro: "Intro", profile: "Profile",
    demo: "Live demo", demoOff: "Demo offline", codeBtn: "Code",
    "status.live": "Live", "status.beta": "Beta", "status.wip": "In progress",
    menuOpen: "Open the menu", menuClose: "Close the menu",
    chooseStyle: "Choose style",
    blogNav: "Blog & Philosophy", minRead: "min read", backBlog: "← Back to the blog",
    portfolio: "Projects / Portfolio",
    openGallery: "Open gallery", closeGallery: "Close", prevImg: "Previous image", nextImg: "Next image",
    share: "Share", shareArticle: "Share the article", shareSection: "Share this section",
    shareCopied: "Link copied to clipboard",
    heroEyebrow: "Portfolio",
    seoTitle: "Davide Pica · Projects, Blog & Philosophy",
    seoDesc: "Davide Pica's portfolio: self-hosted, custom software (WhatsApp, Rust, WordPress) with live demos and code, plus a series of essays on technology, energy, demographics, AI and human capital.",
  },
};

const INTERFACES = [
  { key: "cinema", name: "Cinema", hint: "Sezioni a tutta pagina" },
  { key: "carosello", name: "Carosello", hint: "Deck orizzontale" },
  { key: "griglia", name: "Griglia", hint: "Schede con tilt 3D" },
  { key: "rivista", name: "Rivista", hint: "Indice editoriale" },
  { key: "cinetica", name: "Cinetica", hint: "Titoli in movimento" },
];

const THEME_KEY = "bridge-theme";
const UI_KEY = "bridge-ui";
const LANG_KEY = "bridge-lang";

/* ---------- Lingua ---------- */
function getLang() {
  try {
    const v = localStorage.getItem(LANG_KEY);
    if (v === "it" || v === "en") return v;
  } catch {}
  return (navigator.language || "it").toLowerCase().startsWith("en") ? "en" : "it";
}
let LANG = "it";
function t(key) {
  return (T[LANG] && T[LANG][key]) || (T.it[key] ?? key);
}
/** Campo localizzato: usa obj.en[field] se lingua EN e presente, altrimenti il default. */
function loc(obj, field) {
  if (LANG === "en" && obj && obj.en && obj.en[field] != null) return obj.en[field];
  return obj ? obj[field] : undefined;
}

/* ---------- Tema ---------- */
function getPref() {
  try {
    const v = localStorage.getItem(THEME_KEY);
    return v === "light" || v === "dark" ? v : "auto";
  } catch {
    return "auto";
  }
}
function applyPref(pref) {
  if (pref === "auto") document.documentElement.removeAttribute("data-theme");
  else document.documentElement.setAttribute("data-theme", pref);
}
function setPref(pref) {
  try {
    if (pref === "auto") localStorage.removeItem(THEME_KEY);
    else localStorage.setItem(THEME_KEY, pref);
  } catch {}
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (document.startViewTransition && !reduce) document.startViewTransition(() => applyPref(pref));
  else applyPref(pref);
  renderThemeSeg(pref);
}
function renderThemeSeg(pref) {
  const seg = document.getElementById("theme-seg");
  const opts = [
    ["light", ICONS.sun, "Chiaro"],
    ["dark", ICONS.moon, "Scuro"],
    ["auto", ICONS.auto, "Automatico"],
  ];
  seg.innerHTML = opts
    .map(([k, ic, lbl]) => `<button type="button" data-pref="${k}" title="${lbl}" aria-label="${lbl}" aria-pressed="${k === pref}" class="${k === pref ? "is-active" : ""}">${ic}</button>`)
    .join("");
  seg.querySelectorAll("button").forEach((b) => b.addEventListener("click", () => setPref(b.dataset.pref)));
}

/* ---------- Utility ---------- */
function esc(s) {
  return String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}
function monogram(t) {
  return esc((t || "?").trim().slice(0, 2).toUpperCase());
}
let LINKS = {};
function demoUrl(p) {
  return p.demoUrl || (p.demoKey ? LINKS[p.demoKey] || "" : "") || "";
}
function visualInner(p) {
  if (p.screenshots && p.screenshots[0]) return `<img class="p-shot" src="${esc(p.screenshots[0])}" alt="${esc(p.title)}" loading="lazy" decoding="async" />`;
  if (p.logo) return `<img class="p-logo-img" src="${esc(p.logo)}" alt="${esc(p.title)}" loading="lazy" decoding="async" />`;
  return `<span class="p-mono">${monogram(p.title)}</span>`;
}
// Elenco immagini apribili nel lightbox per un progetto (screenshots o logo).
function galleryOf(p) {
  const imgs = [];
  if (Array.isArray(p.screenshots)) imgs.push(...p.screenshots.filter(Boolean));
  else if (p.screenshots) imgs.push(p.screenshots);
  if (!imgs.length && p.logo) imgs.push(p.logo);
  return imgs;
}
function hasGallery(p) {
  return galleryOf(p).length > 0;
}
// Card visiva riusabile: box grafico + (se ci sono immagini) badge zoom e aggancio
// al lightbox via classe .js-zoom + data-proj. Con solo placeholder (monogramma)
// non e cliccabile finche non ci sono immagini reali.
function visualCard(p, i, extraCls) {
  const zoom = hasGallery(p);
  const cls = `mag-visual${extraCls ? " " + extraCls : ""}${zoom ? " js-zoom is-zoomable" : ""}`;
  const attrs = zoom
    ? ` data-proj="${i}" role="button" tabindex="0" aria-label="${esc(t("openGallery") || "Apri galleria")}: ${esc(p.title)}"`
    : "";
  const badge = zoom ? `<span class="mag-visual-zoom" aria-hidden="true">${ICONS.zoom}</span>` : "";
  return `<div class="${cls}" style="--accent:${esc(p.accent || "var(--brand)")}"${attrs}>${visualInner(p)}<span class="p-status-float">${pill(p)}</span>${badge}</div>`;
}
function actionsHTML(p) {
  const demo = demoUrl(p);
  const demoBtn = demo
    ? `<a class="btn btn-primary" href="${esc(demo)}" target="_blank" rel="noopener">${ICONS.ext} ${t("demo")}</a>`
    : p.demoKey || p.demoUrl
      ? `<span class="btn" aria-disabled="true">${ICONS.ext} ${t("demoOff")}</span>`
      : "";
  const repoBtn = p.repo ? `<a class="btn" href="${esc(p.repo)}" target="_blank" rel="noopener">${ICONS.code} ${t("codeBtn")}</a>` : "";
  const slug = FRIENDLY_SLUG[p.id] || p.id;
  const shareBtn = `<button type="button" class="btn js-share" data-share-slug="${esc(slug)}" data-share-title="${esc(p.title)}" title="${esc(t("share"))}" aria-label="${esc(t("share"))}: ${esc(p.title)}">${ICONS.share} ${t("share")}</button>`;
  return demoBtn + repoBtn + shareBtn;
}
function highlightsHTML(p) {
  return (loc(p, "highlights") || []).map((h) => `<li>${esc(h)}</li>`).join("");
}
function tagsHTML(p) {
  return (p.tags || []).map((x) => `<span class="tag">${esc(x)}</span>`).join("");
}
function pill(p) {
  const cls = { live: "status-live", beta: "status-beta", wip: "status-wip" }[p.status] || "status-wip";
  return `<span class="status ${cls}">${t(`status.${p.status}`)}</span>`;
}

/* ============================================================
   INTERFACCE
   ============================================================ */
function bodyHTML(p) {
  return `
    <p class="p-eyebrow">${esc(loc(p, "tagline") || "")}</p>
    <h2 class="p-title">${esc(p.title)}</h2>
    <p class="p-desc">${esc(loc(p, "description") || "")}</p>
    ${highlightsHTML(p) ? `<ul class="p-highlights">${highlightsHTML(p)}</ul>` : ""}
    ${tagsHTML(p) ? `<div class="p-tags">${tagsHTML(p)}</div>` : ""}
    <div class="p-actions">${actionsHTML(p)}</div>`;
}

const RENDER = {
  cinema(stage, projects) {
    stage.innerHTML = projects
      .map(
        (p, i) => `<section class="snap project reveal" id="${esc(p.id)}" data-proj="${i}" style="--accent:${esc(p.accent || "var(--brand)")}">
          <div class="project-inner">
            <div class="project-visual reveal"><span class="p-status-float">${pill(p)}</span>${visualInner(p)}</div>
            <div class="project-body">${bodyHTML(p)}</div>
          </div>
        </section>`,
      )
      .join("");
    observeReveal();
  },
  carosello(stage, projects) {
    stage.innerHTML = `<div class="deck" id="deck">${projects
      .map(
        (p, i) => `<article class="deck-card reveal" id="${esc(p.id)}" data-proj="${i}" style="--accent:${esc(p.accent || "var(--brand)")}">
          <div class="deck-visual">${visualInner(p)}<span class="p-status-float">${pill(p)}</span></div>
          <div class="deck-body">
            <p class="p-eyebrow">${esc(loc(p, "tagline") || "")}</p>
            <h2 class="p-title">${esc(p.title)}</h2>
            <p class="p-desc">${esc(loc(p, "description") || "")}</p>
            <div class="p-tags">${tagsHTML(p)}</div>
            <div class="p-actions">${actionsHTML(p)}</div>
          </div>
        </article>`,
      )
      .join("")}</div>`;
    observeReveal();
    setupDeckDrag(stage.querySelector("#deck"));
  },
  griglia(stage, projects) {
    stage.innerHTML = `<div class="grid">${projects
      .map(
        (p, i) => `<article class="tilt reveal" data-proj="${i}" style="--accent:${esc(p.accent || "var(--brand)")}">
          <div class="tilt-inner">
            <span class="tilt-glare"></span>
            <div class="tilt-top"><span class="tilt-logo">${visualInner(p)}</span>${pill(p)}</div>
            <h3 class="tilt-title">${esc(p.title)}</h3>
            <p class="tilt-tagline">${esc(loc(p, "tagline") || "")}</p>
            <p class="tilt-desc">${esc(loc(p, "description") || "")}</p>
            <div class="p-tags">${tagsHTML(p)}</div>
            <div class="p-actions">${actionsHTML(p)}</div>
          </div>
        </article>`,
      )
      .join("")}</div>`;
    setupTilt(stage);
    observeReveal();
  },
  rivista(stage, projects) {
    stage.innerHTML = `<div class="mag">${projects
      .map(
        (p, i) => `<article class="mag-row" data-proj="${i}" style="--accent:${esc(p.accent || "var(--brand)")}">
          <button class="mag-head" type="button" aria-expanded="false">
            <span class="mag-num">${String(i + 1).padStart(2, "0")}</span>
            <span class="mag-titles"><span class="mag-title">${esc(p.title)}</span><span class="mag-tagline">${esc(loc(p, "tagline") || "")}</span></span>
            <span class="mag-meta">${pill(p)}<span class="mag-chevron">${ICONS.arrowR}</span></span>
          </button>
          <div class="mag-panel"><div class="mag-panel-in">
            ${visualCard(p, i)}
            <div class="mag-text">
              <p class="p-desc">${esc(loc(p, "description") || "")}</p>
              ${highlightsHTML(p) ? `<ul class="p-highlights">${highlightsHTML(p)}</ul>` : ""}
              <div class="p-tags">${tagsHTML(p)}</div>
              <div class="p-actions">${actionsHTML(p)}</div>
            </div>
          </div></div>
        </article>`,
      )
      .join("")}</div>`;
    setupAccordion(stage);
    observeReveal();
  },
  cinetica(stage, projects) {
    stage.innerHTML =
      `<div class="kin">` +
      projects
        .map(
          (p, i) => `<button class="kin-item reveal" type="button" data-i="${i}" data-proj="${i}" style="--accent:${esc(p.accent || "var(--brand)")}">
            <span class="kin-index">0${i + 1}</span>
            <span class="kin-line" data-text="${esc(p.title)}">${esc(p.title)}</span>
            <span class="kin-tag">${esc(loc(p, "tagline") || "")}</span>
          </button>`,
        )
        .join("") +
      `</div><div class="kin-panel" id="kin-panel" hidden><div class="kin-panel-card" id="kin-panel-card"></div></div>`;
    setupKinetic(stage, projects);
    observeReveal();
  },
};

/* ---------- Interazioni ---------- */
let cleanup = [];
function runCleanup() {
  cleanup.forEach((fn) => {
    try {
      fn();
    } catch {}
  });
  cleanup = [];
}
let revealObserver = null;
function observeReveal() {
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const targets = document.querySelectorAll(".reveal");
  if (reduce || !("IntersectionObserver" in window)) {
    targets.forEach((el) => el.classList.add("in-view"));
    return;
  }
  if (revealObserver) revealObserver.disconnect();
  revealObserver = new IntersectionObserver(
    (entries) => {
      for (const e of entries) e.target.classList.toggle("in-view", e.isIntersecting && e.intersectionRatio > 0.1);
    },
    { threshold: [0, 0.1, 0.35], rootMargin: "-4% 0px -4% 0px" },
  );
  targets.forEach((el) => revealObserver.observe(el));
}
function setupTilt(stage) {
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  stage.querySelectorAll(".tilt").forEach((card) => {
    const inner = card.querySelector(".tilt-inner");
    const onMove = (e) => {
      const r = card.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width;
      const py = (e.clientY - r.top) / r.height;
      inner.style.transform = `perspective(900px) rotateX(${(0.5 - py) * 12}deg) rotateY(${(px - 0.5) * 14}deg)`;
      card.style.setProperty("--gx", `${px * 100}%`);
      card.style.setProperty("--gy", `${py * 100}%`);
    };
    const onLeave = () => (inner.style.transform = "");
    card.addEventListener("pointermove", onMove);
    card.addEventListener("pointerleave", onLeave);
    cleanup.push(() => {
      card.removeEventListener("pointermove", onMove);
      card.removeEventListener("pointerleave", onLeave);
    });
  });
}
function setupAccordion(stage) {
  stage.querySelectorAll(".mag-head").forEach((h) => {
    const onClick = () => {
      const row = h.closest(".mag-row");
      const open = row.classList.toggle("open");
      h.setAttribute("aria-expanded", open ? "true" : "false");
    };
    h.addEventListener("click", onClick);
    cleanup.push(() => h.removeEventListener("click", onClick));
  });
}
function setupKinetic(stage, projects) {
  const panel = stage.querySelector("#kin-panel");
  const card = stage.querySelector("#kin-panel-card");
  const open = (i) => {
    const p = projects[i];
    if (!p) return;
    card.style.setProperty("--accent", p.accent || "var(--brand)");
    card.innerHTML = `
      <button class="kin-close" type="button" aria-label="${esc(t("menuClose"))}">${ICONS.close}</button>
      <div class="kin-panel-visual">${visualInner(p)}</div>
      <div class="kin-panel-body">
        <p class="p-eyebrow">${esc(loc(p, "tagline") || "")}</p>
        <h2 class="p-title">${esc(p.title)}</h2>
        <div style="margin:.2rem 0 1rem">${pill(p)}</div>
        <p class="p-desc">${esc(loc(p, "description") || "")}</p>
        ${highlightsHTML(p) ? `<ul class="p-highlights">${highlightsHTML(p)}</ul>` : ""}
        <div class="p-tags">${tagsHTML(p)}</div>
        <div class="p-actions">${actionsHTML(p)}</div>
      </div>`;
    panel.hidden = false;
    requestAnimationFrame(() => panel.classList.add("show"));
    card.querySelector(".kin-close").addEventListener("click", close);
  };
  const close = () => {
    panel.classList.remove("show");
    setTimeout(() => (panel.hidden = true), 320);
  };
  const onItem = (e) => {
    const btn = e.target.closest(".kin-item");
    if (btn) open(Number(btn.dataset.i));
  };
  const onBg = (e) => {
    if (e.target === panel) close();
  };
  const onEsc = (e) => {
    if (e.key === "Escape") close();
  };
  stage.addEventListener("click", onItem);
  panel.addEventListener("click", onBg);
  window.addEventListener("keydown", onEsc);
  cleanup.push(() => {
    stage.removeEventListener("click", onItem);
    panel.removeEventListener("click", onBg);
    window.removeEventListener("keydown", onEsc);
  });
}

/* ========================================================================
   FULL-PAGE SCROLL CONTROLLER (cinema/carosello): magnetico, UNA sezione per
   gesto, con transizione animata (JS + easing) e blocco durante lo scorrimento.
   Su DESKTOP (rotella/tastiera) hijackiamo lo scroll; su TOUCH resta lo
   scroll-snap nativo (momentum dell'OS).
   ======================================================================== */
// Sezioni verticali "a pagina piena": hero + (progetti in cinema | stage-deck in
// carosello) + bio. Include SEMPRE hero e bio (così la freccia "su" dalla prima
// voce torna all'hero).
function fpSections() {
  const ui = document.documentElement.getAttribute("data-ui");
  const list = [document.getElementById("hero")];
  if (ui === "cinema") list.push(...document.querySelectorAll("#stage .snap"));
  else list.push(document.getElementById("stage"));
  const blog = document.getElementById("blog");
  if (blog && !blog.hidden) list.push(blog);
  const bio = document.getElementById("bio");
  if (bio && !bio.hidden) list.push(bio);
  return list.filter(Boolean);
}
function fpActive() {
  const ui = document.documentElement.getAttribute("data-ui");
  // Con il lettore articolo aperto lo scroll full-page è sospeso.
  if (document.getElementById("reader") && !document.getElementById("reader").hidden) return false;
  return (ui === "cinema" || ui === "carosello") && !document.body.classList.contains("menu-open");
}
function currentSectionIndex(secs) {
  let best = 0, bestD = Infinity;
  secs.forEach((s, i) => {
    const d = Math.abs(s.getBoundingClientRect().top);
    if (d < bestD) { bestD = d; best = i; }
  });
  return best;
}
// Easing morbide (le stesse "curve" degli esempi di scroll-animation vanilla):
// easeInOutCubic = partenza/arrivo dolci; easeOutQuint = arrivo super morbido.
const easeInOutCubic = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const easeOutQuint = (t) => 1 - Math.pow(1 - t, 5);

// Animatore di scroll generico via requestAnimationFrame: interpola con easing
// tra la posizione corrente e `target`. Funziona sia per la finestra (verticale)
// sia per il deck (orizzontale). Ritorna una funzione per annullarlo.
function animateScroll({ get, set, target, dur = 800, ease = easeInOutCubic, onEnd }) {
  const start = get();
  const dist = target - start;
  if (Math.abs(dist) < 1) { set(target); onEnd && onEnd(); return () => {}; }
  const t0 = performance.now();
  let raf = 0;
  function frame(now) {
    const t = Math.min(1, (now - t0) / dur);
    set(start + dist * ease(t));
    if (t < 1) raf = requestAnimationFrame(frame);
    else { onEnd && onEnd(); }
  }
  raf = requestAnimationFrame(frame);
  return () => cancelAnimationFrame(raf);
}

// Scroll VERTICALE alla sezione: scroll NATIVO `smooth`. Nessun lock, nessuna
// animazione JS che possa "piantarsi"; lo snap CSS aggancia la sezione a fine
// gesto. Il parametro dur è ignorato (compatibilità con i chiamanti esistenti).
function fpAnimateTo(targetY) {
  const target = Math.max(0, Math.round(targetY));
  if (Math.abs(target - window.scrollY) < 2) return;
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  window.scrollTo({ top: target, behavior: reduce ? "auto" : "smooth" });
}
// Posizione Y a cui portare una sezione perché il suo CONTENUTO risulti centrato
// nel viewport. Se la sezione sta in una pagina (altezza ≤ viewport) allineiamo il
// bordo superiore — il contenuto è già centrato nel box. Se la sezione è più alta
// del viewport (es. il blog con molte schede) la centriamo, così il taglio è
// simmetrico sopra/sotto anziché tutto in basso.
function sectionTargetY(sec) {
  const rect = sec.getBoundingClientRect();
  const absTop = window.scrollY + rect.top;
  const extra = rect.height - window.innerHeight;
  const target = absTop + (extra > 0 ? extra / 2 : 0);
  const maxY = document.documentElement.scrollHeight - window.innerHeight;
  return Math.max(0, Math.min(maxY, target));
}
function fpGo(dir) {
  const secs = fpSections();
  if (!secs.length) return;
  const cur = currentSectionIndex(secs);
  const next = Math.min(secs.length - 1, Math.max(0, cur + dir));
  if (next === cur) return;
  fpAnimateTo(sectionTargetY(secs[next]));
}
// Scroll ORIZZONTALE morbido di UNA card: interpola scrollLeft con easing (niente
// più `scrollBy` nativo brusco) e disattiva lo scroll-snap x DURANTE l'animazione
// (che altrimenti la interromperebbe). Al termine ripristina lo snap.
function deckGo(deck, dir) {
  const atEnd = deck.scrollLeft + deck.clientWidth >= deck.scrollWidth - 4;
  const atStart = deck.scrollLeft <= 4;
  if ((dir > 0 && atEnd) || (dir < 0 && atStart)) return false;
  const card = deck.querySelector(".deck-card");
  const step = card ? card.getBoundingClientRect().width + 40 : deck.clientWidth * 0.85;
  const max = deck.scrollWidth - deck.clientWidth;
  const target = Math.max(0, Math.min(max, deck.scrollLeft + dir * step));
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  // Scroll NATIVO: lo snap-x del deck aggancia la card a fine gesto.
  deck.scrollTo({ left: target, behavior: reduce ? "auto" : "smooth" });
  return true;
}
// Drag-to-scroll del deck (clicca e trascina, come su touch): il desktop non
// trascina nativamente un overflow-x, quindi lo gestiamo coi pointer events. Al
// rilascio agganciamo dolcemente la card più vicina. Un vero click (senza
// trascinamento) resta valido; dopo un drag blocchiamo il click accidentale.
function setupDeckDrag(deck) {
  if (!deck) return;
  let down = false, moved = false, startX = 0, startLeft = 0, pid = null, prevSnap = "";
  const DRAG_THRESHOLD = 5;

  const onDown = (e) => {
    if (e.button != null && e.button !== 0) return; // solo tasto sinistro
    down = true; moved = false; startX = e.clientX; startLeft = deck.scrollLeft; pid = e.pointerId;
    prevSnap = deck.style.scrollSnapType;
  };
  const onMove = (e) => {
    if (!down) return;
    const dx = e.clientX - startX;
    if (!moved && Math.abs(dx) > DRAG_THRESHOLD) {
      moved = true;
      deck.classList.add("dragging");        // cursore grabbing + niente snap/selezione
      deck.style.scrollSnapType = "none";
      try { deck.setPointerCapture(pid); } catch {}
    }
    if (moved) { deck.scrollLeft = startLeft - dx; e.preventDefault(); }
  };
  const end = () => {
    if (!down) return;
    down = false;
    deck.classList.remove("dragging");
    try { if (pid != null) deck.releasePointerCapture(pid); } catch {}
    if (moved) {
      snapDeckToNearest(deck, prevSnap);
      // Neutralizza il click che segue immediatamente il trascinamento.
      const block = (ev) => { ev.stopPropagation(); ev.preventDefault(); };
      deck.addEventListener("click", block, { capture: true, once: true });
      setTimeout(() => deck.removeEventListener("click", block, { capture: true }), 60);
    }
  };
  deck.addEventListener("pointerdown", onDown);
  deck.addEventListener("pointermove", onMove);
  deck.addEventListener("pointerup", end);
  deck.addEventListener("pointercancel", end);
}
// Aggancia dolcemente il deck alla card il cui centro è più vicino al centro viewport.
let deckSnapCancel = null;
function snapDeckToNearest(deck, prevSnap) {
  if (deckSnapCancel) { deckSnapCancel(); deckSnapCancel = null; }
  const cards = [...deck.querySelectorAll(".deck-card")];
  if (!cards.length) { deck.style.scrollSnapType = prevSnap || "x mandatory"; return; }
  const deckLeft = deck.getBoundingClientRect().left;
  const viewCenterAbs = deck.scrollLeft + deck.clientWidth / 2;
  let best = cards[0], bd = Infinity;
  cards.forEach((c) => {
    const r = c.getBoundingClientRect();
    const centerAbs = r.left - deckLeft + deck.scrollLeft + r.width / 2;
    const d = Math.abs(centerAbs - viewCenterAbs);
    if (d < bd) { bd = d; best = c; }
  });
  const r = best.getBoundingClientRect();
  const centerAbs = r.left - deckLeft + deck.scrollLeft + r.width / 2;
  const max = deck.scrollWidth - deck.clientWidth;
  const target = Math.max(0, Math.min(max, centerAbs - deck.clientWidth / 2));
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduce) { deck.scrollLeft = target; deck.style.scrollSnapType = prevSnap || "x mandatory"; return; }
  deckSnapCancel = animateScroll({
    get: () => deck.scrollLeft,
    set: (v) => { deck.scrollLeft = v; },
    target,
    dur: 520,
    ease: easeOutQuint,
    onEnd: () => { deck.style.scrollSnapType = prevSnap || "x mandatory"; deckSnapCancel = null; },
  });
}
/* Rotella nel CAROSELLO: la pilotiamo NOI (deterministico, come le frecce), così
   non dipende da soglie di posizione fragili. Ogni "scatto" di rotella = UN passo:
   sul deck avanza di una card (deckGo), e SOLO quando è al bordo (prima card
   scrollando su / ultima card scrollando giù) passa alla sezione adiacente
   (header sopra, bio sotto) via fpGo. Speculare in entrambi i versi. Un lock breve
   evita che il momentum del trackpad salti più passi in un colpo. */
let caroWheelLock = false;
function onWheelCarosello(e) {
  if (document.documentElement.getAttribute("data-ui") !== "carosello") return;
  if (!fpActive()) return;          // reader/menu aperti o UI non full-page
  if (e.ctrlKey) return;            // pinch-zoom del trackpad: lascia stare
  e.preventDefault();               // in carosello lo scroll lo gestiamo interamente noi
  if (caroWheelLock) return;
  const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
  if (Math.abs(delta) < 4) return;
  caroWheelLock = true;
  setTimeout(() => { caroWheelLock = false; }, 560);
  navigate(delta > 0 ? 1 : -1);     // deckGo (card) → poi fpGo (sezione) al bordo
}
// La rotella/trackpad NON viene più intercettata: lo scroll verticale è nativo e
// lo snap CSS (mandatory) aggancia la sezione a fine gesto, come nel riferimento
// Webflow. Restano attivi solo tastiera (onKeyFp) e frecce a schermo (navigate).
function onKeyFp(e) {
  if (isFullpageOn()) return; // in cinema con fullPage: la tastiera la gestisce fullPage
  if (!fpActive()) return;
  if (e.target && /^(INPUT|TEXTAREA|SELECT)$/.test(e.target.tagName || "")) return;
  // Usa navigate(): stessa logica di rotella e frecce a schermo, così nel
  // carosello i tasti freccia scorrono prima le card, poi cambiano sezione.
  if (e.key === "ArrowDown" || e.key === "PageDown" || e.key === " ") { e.preventDefault(); navigate(1); }
  else if (e.key === "ArrowUp" || e.key === "PageUp") { e.preventDefault(); navigate(-1); }
  else if (e.key === "Home") { e.preventDefault(); fpAnimateTo(0); }
  else if (e.key === "End") {
    const s = fpSections();
    if (s.length) fpAnimateTo(sectionTargetY(s[s.length - 1]));
  }
}
// Frecce laterali: nel carosello, se siamo sul deck scorrono le card (fino al
// bordo) poi la sezione; altrove avanzano di una sezione full-page.
function navigate(dir) {
  if (isFullpageOn()) {
    if (dir > 0) window.jQuery.fn.fullpage.moveSectionDown();
    else window.jQuery.fn.fullpage.moveSectionUp();
    return;
  }
  const ui = document.documentElement.getAttribute("data-ui");
  if (ui === "carosello") {
    const secs = fpSections();
    const onDeck = secs[currentSectionIndex(secs)]?.id === "stage";
    const deck = document.getElementById("deck");
    if (onDeck && deck && deckGo(deck, dir)) return;
  }
  fpGo(dir);
}

/* ---------- Interfaccia ---------- */
let PROJECTS = [];
function getUI() {
  try {
    const v = localStorage.getItem(UI_KEY);
    return INTERFACES.some((i) => i.key === v) ? v : "cinema";
  } catch {
    return "cinema";
  }
}
/* ---------- fullPage.js (SOLO interfaccia "cinema") ----------
   fullPage 2.9.7 governa una struttura #fullpage > .section. Qui la costruiamo
   SPOSTANDO le sezioni reali (hero, progetti, blog, bio) in #fullpage all'ingresso
   in cinema e le ripristiniamo uscendo, così le altre 4 interfacce restano intatte.
   Se jQuery/fullPage non ci sono, si degrada allo scroll nativo (nessun crash). */
function isFullpageOn() {
  return !!(window.jQuery && document.documentElement.classList.contains("fp-active"));
}
function isMobileViewport() {
  return !!(window.matchMedia && window.matchMedia("(max-width: 768px)").matches);
}
function mountFullpage() {
  const jq = window.jQuery;
  if (!jq || !jq.fn || typeof jq.fn.fullpage !== "function") {
    console.error("[fullPage] jQuery/fullpage non disponibili: resto sullo scroll nativo.");
    return; // degrada: la cinema nativa (scroll-snap) resta attiva
  }
  // Mobile (<=768px): niente fullPage. L'autoScrolling e scomodo al touch e il
  // controllo responsive nativo di fullPage (basato su outerWidth) e inaffidabile;
  // la cinema nativa con scroll-snap e gia perfettamente responsive.
  if (isMobileViewport()) {
    return; // hero/stage restano in #main, fp-active non viene aggiunto → scroll nativo
  }
  const main = document.getElementById("main");
  const hero = document.getElementById("hero");
  const stage = document.getElementById("stage");
  const blog = document.getElementById("blog");
  const bio = document.getElementById("bio");
  let fp = document.getElementById("fullpage");
  if (!fp) {
    fp = document.createElement("div");
    fp.id = "fullpage";
  }
  fp.innerHTML = "";
  main.appendChild(fp);
  // Sezioni verticali, in ordine: hero → progetti → blog(se visibile) → bio(se visibile).
  hero.classList.add("section");
  fp.appendChild(hero);
  stage.querySelectorAll(".project").forEach((pr) => {
    pr.classList.add("section");
    fp.appendChild(pr);
  });
  if (blog && !blog.hidden) {
    blog.classList.add("section");
    fp.appendChild(blog);
  }
  if (bio && !bio.hidden) {
    bio.classList.add("section");
    fp.appendChild(bio);
  }
  stage.style.display = "none";
  document.documentElement.classList.add("fp-active");
  const revealOf = (sec) => sec && sec.querySelectorAll(".reveal").forEach((el) => el.classList.add("in-view"));
  jq("#fullpage").fullpage({
    autoScrolling: true,
    scrollingSpeed: 700,
    navigation: true,
    navigationPosition: "right",
    fitToSection: true,
    verticalCentered: false, // NIENTE .fp-tableCell: le sezioni mantengono il layout flex nativo (no shift)
    responsiveWidth: 768, // sotto 768px: autoScrolling OFF → scroll normale (mobile)
    afterLoad: function (anchorLink, index) {
      revealOf(document.querySelectorAll("#fullpage .section")[index - 1]);
    },
  });
  revealOf(fp.querySelector(".section")); // prima sezione: reveal immediato
}
function unmountFullpage() {
  const jq = window.jQuery;
  const fp = document.getElementById("fullpage");
  document.documentElement.classList.remove("fp-active");
  try {
    if (jq && jq.fn && typeof jq.fn.fullpage === "object" && jq.fn.fullpage.destroy) jq.fn.fullpage.destroy("all");
    else if (jq && jq.fn && jq.fn.fullpage) jq.fn.fullpage.destroy("all");
  } catch {}
  if (!fp) return;
  const main = document.getElementById("main");
  const hero = document.getElementById("hero");
  const stage = document.getElementById("stage");
  const blog = document.getElementById("blog");
  const bio = document.getElementById("bio");
  // Ripristina in #main l'ordine originale: hero, stage, blog, bio.
  if (hero) {
    hero.classList.remove("section");
    main.insertBefore(hero, stage);
  }
  if (blog) {
    blog.classList.remove("section");
    main.insertBefore(blog, fp);
  }
  if (bio) {
    bio.classList.remove("section");
    main.insertBefore(bio, fp);
  }
  if (stage) stage.style.display = "";
  main.removeChild(fp); // i progetti spostati vengono scartati (rirenderizzati dopo)
}

/* ---------- Lightbox / galleria immagini ----------
   Immagine singola o galleria con frecce ai margini, contatore, tastiera (←/→/Esc)
   e click sullo sfondo per chiudere. Alimentato da galleryOf(progetto). */
const LB = { imgs: [], idx: 0, title: "", lastFocus: null };
function lbEl(id) {
  return document.getElementById(id);
}
function lbShow(i) {
  const box = lbEl("lightbox");
  const img = lbEl("lb-img");
  const n = LB.imgs.length;
  LB.idx = (i + n) % n;
  const src = LB.imgs[LB.idx];
  img.src = src;
  img.alt = n > 1 ? `${LB.title} — ${LB.idx + 1}/${n}` : LB.title;
  const multi = n > 1;
  lbEl("lb-prev").hidden = !multi;
  lbEl("lb-next").hidden = !multi;
  const counter = lbEl("lb-counter");
  counter.hidden = !multi;
  counter.textContent = multi ? `${LB.idx + 1} / ${n}` : "";
  lbEl("lb-cap").textContent = LB.title || "";
  box.classList.toggle("is-gallery", multi);
}
function openLightbox(images, startIdx, title) {
  if (!images || !images.length) return;
  LB.imgs = images;
  LB.title = title || "";
  LB.lastFocus = document.activeElement;
  const box = lbEl("lightbox");
  box.hidden = false;
  document.body.classList.add("lb-open");
  lbShow(startIdx || 0);
  lbEl("lb-close").focus();
}
function closeLightbox() {
  const box = lbEl("lightbox");
  if (box.hidden) return;
  box.hidden = true;
  document.body.classList.remove("lb-open");
  lbEl("lb-img").src = "";
  if (LB.lastFocus && LB.lastFocus.focus) LB.lastFocus.focus();
}
function lbNext(dir) {
  if (LB.imgs.length > 1) lbShow(LB.idx + dir);
}
// Apre il lightbox per l'elemento .js-zoom cliccato (usa data-proj → PROJECTS).
function openZoomFrom(el) {
  const i = Number(el.getAttribute("data-proj"));
  const p = PROJECTS[i];
  if (!p) return;
  const imgs = galleryOf(p);
  if (imgs.length) openLightbox(imgs, 0, p.title);
}
function setupLightbox() {
  const box = lbEl("lightbox");
  if (!box) return;
  lbEl("lb-close").innerHTML = ICONS.close;
  lbEl("lb-prev").innerHTML = ICONS.arrowL;
  lbEl("lb-next").innerHTML = ICONS.arrowR;
  lbEl("lb-close").addEventListener("click", closeLightbox);
  lbEl("lb-prev").addEventListener("click", () => lbNext(-1));
  lbEl("lb-next").addEventListener("click", () => lbNext(1));
  // Click sullo sfondo (non sull'immagine o sui controlli) → chiudi.
  box.addEventListener("click", (e) => {
    if (e.target === box || e.target.classList.contains("lb-figure")) closeLightbox();
  });
  // Delega globale: qualsiasi .js-zoom apre il lightbox (rivista e future interfacce).
  document.addEventListener("click", (e) => {
    const z = e.target.closest(".js-zoom");
    if (z) {
      e.preventDefault();
      e.stopPropagation();
      openZoomFrom(z);
    }
  });
  document.addEventListener("keydown", (e) => {
    // Attivazione da tastiera sulla card (Invio/Spazio).
    if ((e.key === "Enter" || e.key === " ") && document.activeElement?.classList.contains("js-zoom")) {
      e.preventDefault();
      openZoomFrom(document.activeElement);
      return;
    }
    if (box.hidden) return;
    // Con il lightbox aperto, i tasti pilotano la galleria (non lo scroll/fullPage).
    if (e.key === "Escape") { e.preventDefault(); closeLightbox(); }
    else if (e.key === "ArrowRight") { e.preventDefault(); e.stopPropagation(); lbNext(1); }
    else if (e.key === "ArrowLeft") { e.preventDefault(); e.stopPropagation(); lbNext(-1); }
  }, true); // capture: intercetta prima dei gestori di navigazione (fullPage/native)
}

function setUI(key) {
  try {
    localStorage.setItem(UI_KEY, key);
  } catch {}
  applyUI(key);
}
function applyUI(key) {
  runCleanup();
  document.documentElement.setAttribute("data-ui", key);
  (RENDER[key] || RENDER.cinema)(document.getElementById("stage"), PROJECTS);
  // SOLO cinema: monta fullPage.js sui contenuti appena renderizzati; l'unmount è
  // registrato in cleanup → runCleanup() lo esegue al prossimo cambio interfaccia.
  if (key === "cinema") {
    mountFullpage();
    cleanup.push(unmountFullpage);
  }
  document.querySelectorAll(".dock-tab").forEach((b) => {
    const on = b.dataset.ui === key;
    b.classList.toggle("is-active", on);
    b.setAttribute("aria-selected", on ? "true" : "false");
  });
  const arrows = document.getElementById("nav-arrows");
  const show = key === "cinema" || key === "carosello";
  arrows.dataset.show = show ? "1" : "0";
  arrows.setAttribute("aria-hidden", show ? "false" : "true");
  // Numero dell'interfaccia attiva sul trigger del dock.
  const idx = INTERFACES.findIndex((i) => i.key === key);
  const tn = document.getElementById("dock-trigger-n");
  if (tn) tn.textContent = idx >= 0 ? String(idx + 1) : "";
}
function renderDock() {
  const sw = document.getElementById("dock-switch");
  sw.innerHTML = INTERFACES.map(
    (it, i) =>
      `<button type="button" role="tab" class="dock-tab" data-ui="${it.key}" title="${esc(it.hint)}" aria-selected="false"><span class="dock-tab-n">${i + 1}</span><span class="dock-tab-name">${esc(it.name)}</span></button>`,
  ).join("");
  sw.querySelectorAll(".dock-tab").forEach((b) => b.addEventListener("click", () => setUI(b.dataset.ui)));
}

/* ---------- Menu hamburger (sezioni + lingua + tema) ---------- */
function closeMenu() {
  const menu = document.getElementById("menu");
  const burger = document.getElementById("burger");
  menu.classList.remove("open");
  menu.setAttribute("aria-hidden", "true");
  burger.classList.remove("open");
  burger.setAttribute("aria-expanded", "false");
  burger.setAttribute("aria-label", t("menuOpen"));
  document.body.classList.remove("menu-open");
}
function openMenu() {
  const menu = document.getElementById("menu");
  const burger = document.getElementById("burger");
  menu.classList.add("open");
  menu.setAttribute("aria-hidden", "false");
  burger.classList.add("open");
  burger.setAttribute("aria-expanded", "true");
  burger.setAttribute("aria-label", t("menuClose"));
  document.body.classList.add("menu-open");
}
function scrollToTarget(sel) {
  const el = document.querySelector(sel);
  if (!el) return;
  // Rifletti la posizione nell'URL come ancora #slug (condivisibile / deep-link /
  // "jump to" nei risultati di ricerca), senza aggiungere voci alla history né
  // innescare un altro scroll (replaceState non emette 'hashchange').
  if (el.id) {
    try {
      history.replaceState(null, "", "#" + (FRIENDLY_SLUG[el.id] || el.id));
    } catch (_e) {
      /* file:// o contesti senza history: ignora */
    }
  }
  if (isFullpageOn()) {
    // fullPage attivo (cinema): vai alla sezione con la sua API moveTo(index).
    const secs = Array.from(document.querySelectorAll("#fullpage .section"));
    const sec = secs.includes(el) ? el : el.closest(".section");
    const idx = sec ? secs.indexOf(sec) : -1;
    if (idx >= 0) {
      window.jQuery.fn.fullpage.moveTo(idx + 1);
      return;
    }
  }
  if (fpActive()) {
    // Controller full-page NATIVO (carosello): transizione animata alla sezione.
    fpAnimateTo(sectionTargetY(el));
  } else {
    el.scrollIntoView({ behavior: "smooth", block: sel === "#hero" ? "start" : "center", inline: "center" });
  }
}
// Deep-link SEO: aprire l'URL con #warmageddon / #profilo / #blog ecc. porta
// direttamente al blocco corrispondente (i card progetto hanno un id-slug stabile).
// Seguiamo anche i cambi di hash successivi. Alias per le sezioni "storiche".
// Ancora "amichevole" -> id dell'ELEMENTO reale (i card usano già l'id = slug).
const HASH_ALIASES = { home: "hero", intro: "hero", profilo: "bio", progetti: "stage", portfolio: "stage" };
// id dell'elemento -> ancora "amichevole" da mostrare nell'URL (es. #profilo).
const FRIENDLY_SLUG = { bio: "profilo" };
function navigateFromHash() {
  const raw = decodeURIComponent((location.hash || "").replace(/^#/, "")).trim();
  if (!raw) return;
  const slug = HASH_ALIASES[raw] || raw;
  if (document.getElementById(slug)) {
    const sel = "#" + (window.CSS && CSS.escape ? CSS.escape(slug) : slug);
    scrollToTarget(sel);
    return;
  }
  // Non è una sezione: se l'ancora è l'id di un articolo, apri il lettore.
  if (Array.isArray(ARTICLES) && ARTICLES.some((a) => a.id === raw)) openArticle(raw);
}
window.addEventListener("hashchange", navigateFromHash);
// All'avvio: se l'URL porta un'ancora, vai lì una volta che i blocchi sono resi.
window.addEventListener("load", () => setTimeout(navigateFromHash, 500));
function renderMenu() {
  // Etichette
  document.getElementById("menu-sections-label").textContent = t("sections");
  document.getElementById("menu-lang-label").textContent = t("language");
  document.getElementById("menu-theme-label").textContent = t("theme");

  // Struttura ad ALBERO: Intro · Progetti (sub) · Profilo · Blog (sub).
  const nodes = [];
  nodes.push({ label: t("intro"), sel: "#hero" });
  nodes.push({
    label: t("portfolio"),
    // Ancore SEO/deeplink: ogni progetto ha un id-slug stabile (#warmageddon…).
    children: PROJECTS.map((p) => ({ label: p.title, sel: `#${p.id}` })),
  });
  nodes.push({ label: t("profile"), sel: "#bio" });
  if (ARTICLES.length) {
    nodes.push({
      label: t("blogNav"),
      children: ARTICLES.map((a) => ({ label: loc(a, "title"), meta: fmtArticleDate(a.date), article: a.id })),
    });
  }
  const list = document.getElementById("menu-list");
  list.innerHTML = nodes
    .map((n, i) => {
      const delay = `style="--d:${i * 55}ms"`;
      if (!n.children) {
        return `<li ${delay}><button type="button" class="m-item" data-sel="${esc(n.sel)}">${esc(n.label)}</button></li>`;
      }
      const subs = n.children
        .map((c) => {
          const attr = c.article ? `data-article="${esc(c.article)}"` : `data-sel="${esc(c.sel)}"`;
          const meta = c.meta ? `<span class="m-sub-date">${esc(c.meta)}</span>` : "";
          return `<li><button type="button" class="m-sub-item" ${attr}><span class="m-sub-label">${esc(c.label)}</span>${meta}</button></li>`;
        })
        .join("");
      return `<li class="m-group" ${delay}>
        <button type="button" class="m-item m-parent" aria-expanded="false">${esc(n.label)}</button>
        <div class="m-sub"><ul class="m-sub-list">${subs}</ul></div>
      </li>`;
    })
    .join("");
  // Foglie: chiudi il menu e scrolla alla sezione.
  list.querySelectorAll(".m-item[data-sel], .m-sub-item[data-sel]").forEach((b) =>
    b.addEventListener("click", () => {
      closeMenu();
      setTimeout(() => scrollToTarget(b.dataset.sel), 260);
    }),
  );
  // Articoli: chiudi il menu e apri il lettore.
  list.querySelectorAll(".m-sub-item[data-article]").forEach((b) =>
    b.addEventListener("click", () => {
      closeMenu();
      setTimeout(() => openArticle(b.dataset.article), 300);
    }),
  );
  // Genitori: apri/chiudi il sottomenu (il genitore resta, con trattino).
  list.querySelectorAll(".m-parent").forEach((b) =>
    b.addEventListener("click", () => {
      const group = b.closest(".m-group");
      const open = group.classList.toggle("is-open");
      b.setAttribute("aria-expanded", open ? "true" : "false");
    }),
  );

  // Bandiere lingua
  const seg = document.getElementById("lang-seg");
  seg.innerHTML = LANGS.map(
    ([k, fl, lbl]) => `<button type="button" data-lang="${k}" title="${lbl}" aria-label="${lbl}" aria-pressed="${k === LANG}" class="${k === LANG ? "is-active" : ""}"><span class="flag">${fl}</span><span class="lang-code">${k.toUpperCase()}</span></button>`,
  ).join("");
  seg.querySelectorAll("button").forEach((b) => b.addEventListener("click", () => setLang(b.dataset.lang)));
}
function setLang(lang) {
  if (lang !== "it" && lang !== "en") return;
  LANG = lang;
  try {
    localStorage.setItem(LANG_KEY, lang);
  } catch {}
  document.documentElement.setAttribute("lang", lang);
  applyLangToStatic();
  renderMenu();
  applyUI(getUI()); // ridisegna i progetti nella lingua nuova
}

/* ---------- Social / Bio ---------- */
function socialHTML(social) {
  if (!social) return "";
  const order = [
    ["github", ICONS.github, "GitHub"],
    ["linkedin", ICONS.linkedin, "LinkedIn"],
    ["instagram", ICONS.instagram, "Instagram"],
    ["facebook", ICONS.facebook, "Facebook"],
  ];
  return order
    .map(([k, ic, lbl]) => {
      const url = social[k];
      return url
        ? `<a class="soc" href="${esc(url)}" target="_blank" rel="noopener" aria-label="${lbl}" title="${lbl}">${ic}</a>`
        : `<span class="soc is-off" aria-label="${lbl}" title="${lbl}">${ic}</span>`;
    })
    .join("");
}
let SITE = {};
function renderBio() {
  const bio = SITE.bio;
  if (!bio) return;
  document.getElementById("bio").hidden = false;
  document.getElementById("bio-eyebrow").textContent = loc(bio, "eyebrow") || "";
  document.getElementById("bio-name").textContent = bio.name || "";
  document.getElementById("bio-role").textContent = loc(bio, "role") || "";
  document.getElementById("bio-desc").textContent = loc(bio, "description") || "";
  const photo = document.getElementById("bio-photo");
  photo.innerHTML = bio.photo
    ? `<img src="${esc(bio.photo)}" alt="${esc(bio.name || "")}" loading="lazy" decoding="async" />`
    : `<span class="bio-photo-mono">${monogram(bio.name || "D")}</span>`;
  document.getElementById("bio-quotes").innerHTML = (loc(bio, "quotes") || []).map((q) => `<li>“${esc(q)}”</li>`).join("");
  document.getElementById("bio-social").innerHTML = socialHTML(bio.social);
  document.getElementById("dock-social").innerHTML = socialHTML(bio.social);
}

/* ---------- Blog & Filosofia ---------- */
let ARTICLES = [];
let BLOGMETA = {};
// Data localizzata e compatta (es. "15 gen 2026").
function fmtArticleDate(iso) {
  const d = new Date(iso + "T00:00:00");
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString(LANG === "en" ? "en-GB" : "it-IT", { day: "numeric", month: "short", year: "numeric" });
}
// Mini-renderer Markdown (paragrafi, **grassetto**, *corsivo*, --- separatore).
function mdToHtml(md) {
  const inline = (s) =>
    esc(s)
      .replace(
        /\[([^\]]+)\]\(([^)\s]+)\)/g,
        '<a href="$2" target="_blank" rel="noopener">$1</a>',
      )
      .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
      .replace(/\*(.+?)\*/g, "<em>$1</em>");
  return (md || "")
    .split(/\n{2,}/)
    .map((block) => {
      const b = block.trim();
      if (!b) return "";
      if (b === "---" || b === "***") return "<hr />";
      const h = b.match(/^(#{1,3})\s+([\s\S]+)$/);
      if (h) {
        const tag = h[1].length >= 3 ? "h3" : "h2";
        return `<${tag} class="ra-${tag}">${inline(h[2].trim())}</${tag}>`;
      }
      return `<p>${inline(b).replace(/\n/g, "<br />")}</p>`;
    })
    .join("");
}
function articleCardHTML(a) {
  return `<button class="art-card reveal" type="button" data-id="${esc(a.id)}" style="--accent:${esc(a.accent || "var(--brand)")}">
    <span class="art-meta"><span class="art-cat">${esc(loc(a, "category") || "")}</span><span class="art-date">${esc(fmtArticleDate(a.date))}</span></span>
    <span class="art-title">${esc(loc(a, "title"))}</span>
    <span class="art-excerpt">${esc(loc(a, "excerpt") || "")}</span>
    <span class="art-read">${a.minutes ? `${a.minutes} ${t("minRead")}` : ""} <span class="art-arrow">→</span></span>
  </button>`;
}
function renderBlog() {
  if (!ARTICLES.length) return;
  const section = document.getElementById("blog");
  section.hidden = false;
  document.getElementById("blog-eyebrow").textContent = loc(BLOGMETA, "eyebrow") || "Blog & Filosofia";
  document.getElementById("blog-title").textContent = loc(BLOGMETA, "title") || "";
  document.getElementById("blog-lead").textContent = loc(BLOGMETA, "lead") || "";
  const listEl = document.getElementById("blog-list");
  listEl.innerHTML = ARTICLES.map(articleCardHTML).join("");
  listEl.querySelectorAll(".art-card").forEach((c) =>
    c.addEventListener("click", () => openArticle(c.dataset.id)),
  );
  observeReveal();
}
function openArticle(id) {
  const a = ARTICLES.find((x) => x.id === id);
  if (!a) return;
  const reader = document.getElementById("reader");
  const art = document.getElementById("reader-article");
  art.style.setProperty("--accent", a.accent || "var(--brand)");
  art.innerHTML = `
    <p class="ra-meta"><span class="ra-cat">${esc(loc(a, "category") || "")}</span> · <span>${esc(fmtArticleDate(a.date))}</span>${a.minutes ? ` · <span>${a.minutes} ${esc(t("minRead"))}</span>` : ""}</p>
    <h1 class="ra-title">${esc(loc(a, "title"))}</h1>
    <div class="ra-body">${mdToHtml(loc(a, "body"))}</div>
    <div class="ra-foot"><button type="button" class="ra-back" id="ra-back">${esc(t("backBlog"))}</button></div>`;
  reader.hidden = false;
  document.body.classList.add("reader-open");
  requestAnimationFrame(() => reader.classList.add("show"));
  art.scrollTop = 0;
  updateReaderProgress();
  // Deep-link condivisibile dell'articolo: aggiorna l'URL senza navigare
  // (replaceState non emette hashchange) e prepara il bottone Condividi.
  try { history.replaceState(null, "", "#" + a.id); } catch (_e) { /* file:// */ }
  const rs = document.getElementById("reader-share");
  if (rs) { rs.dataset.shareSlug = a.id; rs.dataset.shareTitle = loc(a, "title") || ""; }
  const back = document.getElementById("ra-back");
  if (back) back.addEventListener("click", closeReader);
}
function closeReader() {
  const reader = document.getElementById("reader");
  reader.classList.remove("show");
  document.body.classList.remove("reader-open");
  setTimeout(() => { reader.hidden = true; }, 320);
  // Ripulisce l'ancora dell'articolo dall'URL (senza scatenare navigazione).
  try {
    if ((location.hash || "").length > 1) history.replaceState(null, "", location.pathname + location.search);
  } catch (_e) { /* file:// */ }
}
function updateReaderProgress() {
  const art = document.getElementById("reader-article");
  const bar = document.getElementById("reader-progress");
  if (!art || !bar) return;
  const max = art.scrollHeight - art.clientHeight;
  const p = max > 0 ? Math.min(100, Math.max(0, (art.scrollTop / max) * 100)) : 0;
  bar.style.setProperty("--p", `${p}%`);
}

/* ---------- Condividi (Web Share API + fallback copia link) ----------
 * Ogni blocco condivisibile ha un'ancora stabile (#slug). Il bottone usa la
 * Web Share API nativa dove c'è (foglio di condivisione del sistema, ideale su
 * mobile); altrimenti copia il link negli appunti e mostra un toast. */
function shareUrlFor(slug) {
  const base = location.origin + location.pathname + location.search;
  return slug ? base + "#" + slug : base;
}
async function copyText(text) {
  try {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch (_e) { /* passa al fallback */ }
  try {
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.setAttribute("readonly", "");
    ta.style.position = "fixed";
    ta.style.opacity = "0";
    document.body.appendChild(ta);
    ta.select();
    const ok = document.execCommand("copy");
    ta.remove();
    return ok;
  } catch (_e) {
    return false;
  }
}
async function shareEntity(url, title) {
  if (navigator.share) {
    try {
      await navigator.share({ title: title || document.title, url });
      return;
    } catch (e) {
      if (e && e.name === "AbortError") return; // l'utente ha annullato
      /* condivisione non riuscita: ripiega sulla copia */
    }
  }
  const ok = await copyText(url);
  toast(ok ? t("shareCopied") : url);
}
let toastTimer = null;
function toast(msg) {
  let el = document.getElementById("toast");
  if (!el) {
    el = document.createElement("div");
    el.id = "toast";
    el.className = "toast";
    el.setAttribute("role", "status");
    el.setAttribute("aria-live", "polite");
    document.body.appendChild(el);
  }
  el.textContent = msg;
  el.classList.add("show");
  if (toastTimer) clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove("show"), 2400);
}
// Etichette localizzate dei bottoni condividi statici (reader + sezioni).
function applyShareI18n() {
  const ra = document.getElementById("reader-share");
  if (ra) ra.setAttribute("aria-label", t("shareArticle"));
  document.querySelectorAll(".section-share").forEach((b) => {
    b.setAttribute("aria-label", t("shareSection"));
    b.setAttribute("title", t("share"));
    const lab = b.querySelector(".ss-label");
    if (lab) lab.textContent = t("share");
  });
}
// Un solo listener delegato: vale per i bottoni dei progetti (ricreati a ogni
// cambio interfaccia), del reader e delle sezioni.
document.addEventListener("click", (e) => {
  const btn = e.target.closest(".js-share");
  if (!btn) return;
  e.preventDefault();
  const slug = btn.getAttribute("data-share-slug") || "";
  const title = btn.getAttribute("data-share-title") || document.title;
  shareEntity(shareUrlFor(slug), title);
});

/* ---------- Stringhe statiche (hero, etichetta dock) ---------- */
function applyLangToStatic() {
  document.getElementById("hero-tagline").textContent = loc(SITE, "tagline") || "";
  const note = document.getElementById("hero-note");
  if (note) note.textContent = loc(SITE, "taglineSmall") || "";
  const eyebrow = document.getElementById("hero-eyebrow");
  if (eyebrow) eyebrow.textContent = t("heroEyebrow");
  const heroTitle = document.getElementById("hero-title");
  if (heroTitle) heroTitle.textContent = loc(SITE, "title") || "";
  const brand = document.getElementById("dock-brand");
  if (brand) brand.textContent = t("chooseStyle"); // etichetta: è un selettore di stile
  const trig = document.getElementById("dock-trigger");
  if (trig) trig.title = t("chooseStyle");
  applySeoMeta();
  renderBio();
  renderBlog();
  applyShareI18n();
}

/* ---------- SEO: <title>, meta e dati strutturati per lingua ---------- */
function setMeta(attr, key, content) {
  let el = document.head.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}
function applySeoMeta() {
  const title = t("seoTitle");
  const desc = t("seoDesc");
  document.title = title;
  setMeta("name", "description", desc);
  setMeta("property", "og:title", title);
  setMeta("property", "og:description", desc);
  setMeta("property", "og:locale", LANG === "en" ? "en_US" : "it_IT");
  setMeta("name", "twitter:title", title);
  setMeta("name", "twitter:description", desc);
  injectJsonLd();
}
// Dati strutturati (schema.org) — Person + WebSite + Blog(BlogPosting) + progetti.
function injectJsonLd() {
  const base = "https://davidebr90.github.io/progetti-bridge/";
  const author = (SITE.author || (SITE.bio && SITE.bio.name) || "Davide Pica");
  const social = (SITE.bio && SITE.bio.social) || {};
  const sameAs = ["github", "linkedin", "instagram", "facebook"].map((k) => social[k]).filter(Boolean);
  const person = {
    "@type": "Person",
    "@id": base + "#person",
    name: author,
    url: base,
    jobTitle: (SITE.bio && loc(SITE.bio, "role")) || undefined,
    description: (SITE.bio && loc(SITE.bio, "description")) || undefined,
    sameAs: sameAs.length ? sameAs : undefined,
  };
  const website = {
    "@type": "WebSite",
    "@id": base + "#website",
    url: base,
    name: t("seoTitle"),
    description: t("seoDesc"),
    inLanguage: LANG === "en" ? "en" : "it",
    author: { "@id": base + "#person" },
  };
  const blog = {
    "@type": "Blog",
    "@id": base + "#blog",
    name: loc(BLOGMETA, "title") || "Blog & Filosofia",
    inLanguage: LANG === "en" ? "en" : "it",
    author: { "@id": base + "#person" },
    blogPost: ARTICLES.map((a) => ({
      "@type": "BlogPosting",
      headline: loc(a, "title"),
      datePublished: a.date,
      articleSection: loc(a, "category") || undefined,
      description: loc(a, "excerpt") || undefined,
      inLanguage: LANG === "en" ? "en" : "it",
      author: { "@id": base + "#person" },
      mainEntityOfPage: base,
    })),
  };
  const projectList = {
    "@type": "ItemList",
    "@id": base + "#projects",
    name: t("heroEyebrow"),
    itemListElement: PROJECTS.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "SoftwareApplication",
        name: p.title,
        applicationCategory: "DeveloperApplication",
        description: loc(p, "description") || loc(p, "tagline") || undefined,
        url: demoUrl(p) || p.repo || undefined,
        author: { "@id": base + "#person" },
      },
    })),
  };
  const graph = { "@context": "https://schema.org", "@graph": [person, website, blog, projectList] };
  const json = JSON.stringify(graph, (k, v) => (v === undefined ? undefined : v));
  let el = document.getElementById("ld-json");
  if (!el) {
    el = document.createElement("script");
    el.type = "application/ld+json";
    el.id = "ld-json";
    document.head.appendChild(el);
  }
  el.textContent = json;
}

/* ---------- Hero: cassettiera 3D con terzine casuali ---------- */
// Frasi su 3 righe (una per cassetto). Ne viene scelta una a caso ad ogni caricamento.
const HERO_DRAWERS = [
  ["apri", "i cassetti", "della mente"],
  ["scemo", "chi", "legge"],
  ["sei un", "vero", "curiosone"],
  ["niente", "di", "segreto"],
  ["tira", "il", "cassetto"],
  ["occhio", "che", "mordono"],
  ["dentro", "solo", "polvere"],
  ["ficcanaso", "eh?", "lo sapevo"],
  ["giù", "le", "mani"],
  ["che", "curiosità", "eh?"],
  ["top", "secret", "quasi"],
  ["prima", "bussa", "cafone"],
  ["hai", "trovato", "il vuoto"],
  ["complimenti", "hai perso", "10 secondi"],
  ["frughi", "sempre", "così?"],
  ["shh", "non", "dirlo in giro"],
  ["c'era", "un tesoro", "l'ho speso"],
  ["cassetto", "vuoto", "come me"],
];
// Easter-egg: ogni tanto (~45% dei caricamenti) un cassetto nasconde un piccolo
// oggetto isometrico (nello stesso stile della cassettiera) che "salta fuori"
// quando lo apri. Tipo di oggetto e cassetto scelti a caso.
const CHEST_OBJECTS = ["die", "gift", "crate", "book", "mug", "key", "plant", "bulb"];
const BOX_OBJECTS = new Set(["die", "gift", "crate"]); // veri cubi 3D (6 facce)
const CUBE_FACES = `<span class="cf cf-front"></span><span class="cf cf-back"></span><span class="cf cf-right"></span><span class="cf cf-left"></span><span class="cf cf-top"></span><span class="cf cf-bottom"></span>`;
function objectMarkup(type) {
  switch (type) {
    case "die":
    case "gift":
    case "crate":
      return CUBE_FACES;
    case "book":
      return `<svg class="obj-svg" viewBox="0 0 100 100" aria-hidden="true">
        <rect x="24" y="28" width="50" height="64" rx="3" fill="#3f78c9"/>
        <rect x="24" y="28" width="10" height="64" rx="2" fill="#2c5aa0"/>
        <rect x="60" y="33" width="12" height="54" fill="#f4f1e8"/>
        <rect x="41" y="45" width="24" height="4" rx="2" fill="#cfe0f7"/>
        <rect x="41" y="55" width="17" height="3" rx="1.5" fill="#cfe0f7"/></svg>`;
    case "mug":
      return `<svg class="obj-svg" viewBox="0 0 100 100" aria-hidden="true">
        <path d="M30 40 h34 v34 a9 9 0 0 1 -9 9 h-16 a9 9 0 0 1 -9 -9 z" fill="#e0863c"/>
        <rect x="30" y="40" width="34" height="9" fill="#c26f2c"/>
        <path d="M64 48 h8 a11 11 0 0 1 0 22 h-8" fill="none" stroke="#e0863c" stroke-width="7"/>
        <path d="M40 22 q5 6 0 12" stroke="#c9b7a8" stroke-width="3" fill="none" stroke-linecap="round"/>
        <path d="M52 20 q5 6 0 12" stroke="#c9b7a8" stroke-width="3" fill="none" stroke-linecap="round"/></svg>`;
    case "key":
      return `<svg class="obj-svg" viewBox="0 0 100 100" aria-hidden="true">
        <circle cx="32" cy="50" r="16" fill="none" stroke="#d8a838" stroke-width="8"/>
        <circle cx="32" cy="50" r="5" fill="#b5892a"/>
        <rect x="46" y="46" width="40" height="8" rx="2" fill="#d8a838"/>
        <rect x="72" y="54" width="6" height="11" rx="1" fill="#d8a838"/>
        <rect x="81" y="54" width="5" height="8" rx="1" fill="#d8a838"/></svg>`;
    case "plant":
      return `<svg class="obj-svg" viewBox="0 0 100 100" aria-hidden="true">
        <path d="M50 60 C40 42 30 42 34 27 C47 31 50 44 50 60" fill="#3f9d5a"/>
        <path d="M50 60 C60 40 72 42 68 25 C54 31 50 44 50 60" fill="#54b56a"/>
        <path d="M50 60 v-30" stroke="#2f7d45" stroke-width="2.5" fill="none"/>
        <path d="M37 63 h26 l-4 25 h-18 z" fill="#c4663a"/>
        <rect x="34" y="58" width="32" height="8" rx="2" fill="#d67a4d"/></svg>`;
    case "bulb":
      return `<svg class="obj-svg" viewBox="0 0 100 100" aria-hidden="true">
        <path d="M50 14 v-8 M28 24 l-5 -5 M72 24 l5 -5" stroke="#f2c14e" stroke-width="3" stroke-linecap="round"/>
        <circle cx="50" cy="42" r="22" fill="#ffd45e"/>
        <path d="M42 40 l8 8 8 -8" stroke="#e0a020" stroke-width="3" fill="none"/>
        <rect x="40" y="62" width="20" height="10" fill="#9aa0a6"/>
        <rect x="40" y="66" width="20" height="2" fill="#7d838a"/>
        <rect x="40" y="70" width="20" height="2" fill="#7d838a"/>
        <rect x="44" y="74" width="12" height="7" rx="2" fill="#6b7075"/></svg>`;
    default:
      return "";
  }
}
function buildHeroChest() {
  const host = document.getElementById("hero-chest");
  if (!host) return;
  const words = HERO_DRAWERS[Math.floor(Math.random() * HERO_DRAWERS.length)];
  // Ogni cassetto ha ~50% di contenere un oggetto; garantiamo almeno un oggetto.
  const withObj = [0, 1, 2].map(() => Math.random() < 0.5);
  if (!withObj.some(Boolean)) withObj[Math.floor(Math.random() * 3)] = true;
  const drawers = words
    .map((w, i) => {
      const type = CHEST_OBJECTS[Math.floor(Math.random() * CHEST_OBJECTS.length)];
      const box = BOX_OBJECTS.has(type) ? " obj-box" : "";
      const obj = withObj[i] ? `<div class="chest-obj obj-${type}${box}">${objectMarkup(type)}</div>` : "";
      return `
      <div class="chest__drawer drawer" data-position="${i + 1}">
        <details><summary aria-label="Apri il cassetto"></summary></details>
        <div class="drawer__structure">
          <div class="drawer__panel drawer__panel--back"><span>${esc(w)}</span></div>
          <div class="drawer__panel drawer__panel--bottom"></div>
          <div class="drawer__panel drawer__panel--right"></div>
          <div class="drawer__panel drawer__panel--left"></div>
          <div class="drawer__panel drawer__panel--front"></div>
          ${obj}
        </div>
      </div>`;
    })
    .join("");
  host.innerHTML = `
    <div class="chest">
      <div class="chest__panel chest__panel--back"></div>
      <div class="chest__panel chest__panel--top"></div>
      <div class="chest__panel chest__panel--bottom"></div>
      <div class="chest__panel chest__panel--right"></div>
      <div class="chest__panel chest__panel--front"><div class="chest__panel chest__panel--front-frame"></div></div>
      <div class="chest__panel chest__panel--left"></div>
      ${drawers}
    </div>`;
  setupChestRotation(host);
}

// Rotazione 3D orbit della cassettiera (motore leggero, ibrido CSS+JS). Trascina
// per ruotare rx/ry; al rilascio prosegue con inerzia. Un trascinamento non apre i
// cassetti (il click viene annullato); doppio-click nel vuoto riporta all'angolo base.
function setupChestRotation(stage) {
  const chest = stage.querySelector(".chest");
  if (!chest) return;
  const DEF_RX = -30, DEF_RY = 38;
  let rx = DEF_RX, ry = DEF_RY, vrx = 0, vry = 0;
  let dragging = false, moved = false, lastX = 0, lastY = 0, pid = null, raf = 0;
  const clampRx = (v) => Math.max(-72, Math.min(6, v));
  const apply = () => {
    chest.style.setProperty("--rx", rx.toFixed(2) + "deg");
    chest.style.setProperty("--ry", ry.toFixed(2) + "deg");
  };
  apply();
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;

  const onDown = (e) => {
    // Non catturiamo subito il pointer: un semplice tap deve restare un tap (così
    // il click raggiunge il <summary> e apre il cassetto). Cattura solo al drag.
    dragging = true; moved = false; lastX = e.clientX; lastY = e.clientY; pid = e.pointerId;
    vrx = vry = 0; cancelAnimationFrame(raf);
  };
  const onMove = (e) => {
    if (!dragging) return;
    const dx = e.clientX - lastX, dy = e.clientY - lastY;
    if (!moved) {
      if (Math.abs(dx) + Math.abs(dy) <= 4) return; // sotto soglia: ancora un tap
      moved = true;                                  // da qui è un trascinamento
      stage.classList.add("grabbing");
      try { stage.setPointerCapture(pid); } catch {}
    }
    lastX = e.clientX; lastY = e.clientY;
    ry += dx * 0.55; rx = clampRx(rx - dy * 0.55);
    vry = dx * 0.55; vrx = -dy * 0.55;
    apply();
  };
  const end = () => {
    if (!dragging) return;
    dragging = false;
    stage.classList.remove("grabbing");
    try { if (pid != null) stage.releasePointerCapture(pid); } catch {}
    if (!moved || reduce) return;
    const decay = () => {
      vrx *= 0.93; vry *= 0.93;
      if (Math.abs(vrx) < 0.03 && Math.abs(vry) < 0.03) return;
      ry += vry; rx = clampRx(rx + vrx); apply();
      raf = requestAnimationFrame(decay);
    };
    raf = requestAnimationFrame(decay);
  };
  stage.addEventListener("pointerdown", onDown);
  stage.addEventListener("pointermove", onMove);
  stage.addEventListener("pointerup", end);
  stage.addEventListener("pointercancel", end);
  // Un DRAG non deve aprire/chiudere un cassetto: annulla il click successivo.
  stage.addEventListener("click", (e) => {
    if (moved) { e.preventDefault(); e.stopPropagation(); moved = false; }
  }, true);
  // Doppio click nel vuoto (non su un cassetto) → torna all'angolo di default.
  stage.addEventListener("dblclick", (e) => {
    if (e.target.closest("summary")) return;
    cancelAnimationFrame(raf);
    if (reduce) { rx = DEF_RX; ry = DEF_RY; apply(); return; }
    const srx = rx, sry = ry; let t0 = null;
    const tween = (ts) => {
      if (t0 == null) t0 = ts;
      const k = Math.min(1, (ts - t0) / 480), e2 = 1 - Math.pow(1 - k, 3);
      rx = srx + (DEF_RX - srx) * e2; ry = sry + (DEF_RY - sry) * e2; apply();
      if (k < 1) raf = requestAnimationFrame(tween);
    };
    raf = requestAnimationFrame(tween);
  });
}

/* ---------- Avvio ---------- */
async function main() {
  LANG = getLang();
  document.documentElement.setAttribute("lang", LANG);
  renderThemeSeg(getPref());
  matchMedia("(prefers-color-scheme: dark)").addEventListener("change", () => {
    if (getPref() === "auto") applyPref("auto");
  });
  renderDock();
  buildHeroChest();

  // Hamburger
  const burger = document.getElementById("burger");
  burger.addEventListener("click", () => (burger.classList.contains("open") ? closeMenu() : openMenu()));
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && burger.classList.contains("open")) closeMenu();
  });

  // Frecce
  document.querySelectorAll(".nav-arrow").forEach((b) => b.addEventListener("click", () => navigate(Number(b.dataset.dir))));
  const heroScroll = document.getElementById("hero-scroll");
  if (heroScroll) heroScroll.addEventListener("click", () => scrollToTarget('[data-proj="0"]'));

  // Scroll a sezioni in stile Webflow: lo snap è 100% NATIVO (CSS scroll-snap),
  // così mouse/trackpad/touch scorrono fluidi senza hijack della rotella (che
  // causava gli inceppamenti). La tastiera e le frecce a schermo usano lo scroll
  // nativo `smooth` verso la sezione adiacente.
  window.addEventListener("keydown", onKeyFp);
  // Rotella: hijack verticale→orizzontale sul deck del carosello (passive:false
  // per poter fare preventDefault mentre scorriamo le card).
  window.addEventListener("wheel", onWheelCarosello, { passive: false });

  // Lettore articolo: chiusura (Esc / click sul bordo) + barra di progresso.
  const reader = document.getElementById("reader");
  const readerArt = document.getElementById("reader-article");
  document.getElementById("reader-close").addEventListener("click", closeReader);
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !reader.hidden) closeReader();
  });
  reader.addEventListener("click", (e) => { if (e.target === reader) closeReader(); });
  readerArt.addEventListener("scroll", updateReaderProgress, { passive: true });

  // Lightbox galleria (rivista e future interfacce con immagini reali).
  setupLightbox();

  // Dock a comparsa: hover su desktop (CSS); tap sul trigger su mobile (JS).
  const dockWrap = document.getElementById("dock-wrap");
  const dockTrigger = document.getElementById("dock-trigger");
  if (dockWrap && dockTrigger) {
    // Chiude la dock in modo "esplicito": .closing batte hover/focus-within (CSS)
    // finché il mouse non lascia la dock. blur() rilascia il focus-within.
    const closeDock = () => {
      dockWrap.classList.remove("open");
      dockWrap.classList.add("closing");
      dockTrigger.setAttribute("aria-expanded", "false");
      const focused = dockWrap.querySelector(":focus");
      if (focused) focused.blur();
    };
    const openDock = () => {
      dockWrap.classList.remove("closing");
      dockWrap.classList.add("open");
      dockTrigger.setAttribute("aria-expanded", "true");
    };
    dockTrigger.addEventListener("click", (e) => {
      e.stopPropagation();
      // Se è già visibile (per .open o per hover su desktop), il click la chiude.
      const visible = dockWrap.classList.contains("open") ||
        (!dockWrap.classList.contains("closing") && dockWrap.matches(":hover"));
      if (visible) closeDock();
      else openDock();
    });
    // Uscito dalla dock col mouse: azzera lo stato di chiusura, così l'hover
    // torna a poter riaprire la dock su desktop.
    dockWrap.addEventListener("mouseleave", () => dockWrap.classList.remove("closing"));
    document.addEventListener("click", (e) => {
      if (dockWrap.contains(e.target)) return;
      if (dockWrap.classList.contains("open")) closeDock();
    });
    // Selezionata un'interfaccia dal dock → chiudi (anche se il mouse resta sopra).
    document.getElementById("dock-switch").addEventListener("click", (e) => {
      if (e.target.closest(".dock-tab")) closeDock();
    });
  }

  const bust = `?t=${Math.floor(Date.now() / 60000)}`;
  const [data, links, blog] = await Promise.all([
    fetch(`./data/projects.json${bust}`).then((r) => r.json()),
    fetch(`./data/links.json${bust}`).then((r) => r.json()).catch(() => ({})),
    fetch(`./data/articles.json${bust}`).then((r) => r.json()).catch(() => ({ articles: [] })),
  ]);
  LINKS = links || {};
  PROJECTS = data.projects || [];
  SITE = data.site || {};
  ARTICLES = (blog && blog.articles) || [];
  BLOGMETA = (blog && blog.meta) || {};

  document.getElementById("hero-title").textContent = SITE.title || "";

  applyLangToStatic();
  renderMenu();
  applyUI(getUI());
  // Al superamento del breakpoint 768px (rotazione/resize) in cinema, ri-applica
  // l'interfaccia: monta fullPage su desktop, torna allo scroll nativo su mobile.
  if (window.matchMedia) {
    const mq = window.matchMedia("(max-width: 768px)");
    const onBpChange = () => { if (getUI() === "cinema") applyUI("cinema"); };
    if (mq.addEventListener) mq.addEventListener("change", onBpChange);
    else if (mq.addListener) mq.addListener(onBpChange); // Safari legacy
  }
  // Dati reali applicati: mostra il contenuto (evita il FOUC dei placeholder statici).
  document.documentElement.classList.add("app-ready");

  // Deep-link all'avvio: ora che progetti e articoli sono resi, risolvi l'ancora
  // (sezione, card progetto o articolo) se l'URL ne porta una.
  navigateFromHash();
}

main();
