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
  close: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18M6 6l12 12"/></svg>',
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
    heroEyebrow: "Portfolio",
    seoTitle: "Davide Pica — Progetti, Blog & Filosofia",
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
    heroEyebrow: "Portfolio",
    seoTitle: "Davide Pica — Projects, Blog & Philosophy",
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
function actionsHTML(p) {
  const demo = demoUrl(p);
  const demoBtn = demo
    ? `<a class="btn btn-primary" href="${esc(demo)}" target="_blank" rel="noopener">${ICONS.ext} ${t("demo")}</a>`
    : p.demoKey || p.demoUrl
      ? `<span class="btn" aria-disabled="true">${ICONS.ext} ${t("demoOff")}</span>`
      : "";
  const repoBtn = p.repo ? `<a class="btn" href="${esc(p.repo)}" target="_blank" rel="noopener">${ICONS.code} ${t("codeBtn")}</a>` : "";
  return demoBtn + repoBtn;
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
        (p, i) => `<section class="snap project" data-proj="${i}" style="--accent:${esc(p.accent || "var(--brand)")}">
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
        (p, i) => `<article class="deck-card reveal" data-proj="${i}" style="--accent:${esc(p.accent || "var(--brand)")}">
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
            <p class="p-desc">${esc(loc(p, "description") || "")}</p>
            ${highlightsHTML(p) ? `<ul class="p-highlights">${highlightsHTML(p)}</ul>` : ""}
            <div class="p-tags">${tagsHTML(p)}</div>
            <div class="p-actions">${actionsHTML(p)}</div>
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
let fpLock = false;
let fpWatchdog = 0;
let fpRAF = 0;
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

// Sblocca SEMPRE lo stato full-page (watchdog): se per qualunque motivo
// l'animazione non completa (tab in background, eccezione…), il sito non deve
// mai restare "congelato"/non scrollabile.
function fpUnlock() {
  fpLock = false;
  document.documentElement.classList.remove("fp-animating");
  clearTimeout(fpWatchdog);
}
// Scroll VERTICALE morbido alla sezione (transizione animata, magnetica).
function fpAnimateTo(targetY, dur = 820) {
  const target = Math.round(targetY);
  if (Math.abs(target - window.scrollY) < 2) return;
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduce) { window.scrollTo(0, target); return; }
  fpLock = true;
  document.documentElement.classList.add("fp-animating"); // niente snap-fight durante l'animazione
  clearTimeout(fpWatchdog);
  fpWatchdog = setTimeout(fpUnlock, dur + 900);
  if (fpRAF) fpRAF();
  fpRAF = animateScroll({
    get: () => window.scrollY,
    set: (v) => window.scrollTo(0, v),
    target,
    dur,
    ease: easeInOutCubic,
    onEnd: () => {
      document.documentElement.classList.remove("fp-animating");
      clearTimeout(fpWatchdog);
      setTimeout(() => { fpLock = false; }, 130);
    },
  });
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
  const step = card ? card.getBoundingClientRect().width + 28 : deck.clientWidth * 0.85;
  const max = deck.scrollWidth - deck.clientWidth;
  const target = Math.max(0, Math.min(max, deck.scrollLeft + dir * step));
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduce) { deck.scrollLeft = target; return true; }
  fpLock = true;
  clearTimeout(fpWatchdog);
  fpWatchdog = setTimeout(() => { deck.style.scrollSnapType = ""; fpUnlock(); }, 1600);
  const prevSnap = deck.style.scrollSnapType;
  deck.style.scrollSnapType = "none";
  if (fpRAF) fpRAF();
  fpRAF = animateScroll({
    get: () => deck.scrollLeft,
    set: (v) => { deck.scrollLeft = v; },
    target,
    dur: 780,
    ease: easeOutQuint, // arrivo particolarmente morbido sulla card
    onEnd: () => {
      deck.style.scrollSnapType = prevSnap || "x mandatory";
      clearTimeout(fpWatchdog);
      setTimeout(() => { fpLock = false; }, 110);
    },
  });
  return true;
}
// Rotella: nel carosello, quando la sezione corrente è il deck → avanza le card
// in ORIZZONTALE (una per gesto); al bordo prosegue in verticale. Altrove (e in
// cinema) → avanzamento full-page di UNA sezione con transizione animata.
function onWheelFp(e) {
  if (!fpActive()) return;
  e.preventDefault(); // controllo totale: niente scroll libero della rotella
  if (fpLock) return;
  if (Math.abs(e.deltaY) < 4) return;
  const dir = e.deltaY > 0 ? 1 : -1;
  const ui = document.documentElement.getAttribute("data-ui");
  if (ui === "carosello") {
    const secs = fpSections();
    const onDeck = secs[currentSectionIndex(secs)]?.id === "stage";
    const deck = document.getElementById("deck");
    if (onDeck && deck && deckGo(deck, dir)) return; // scorrimento orizzontale card
  }
  fpGo(dir);
}
function onKeyFp(e) {
  if (!fpActive()) return;
  if (e.target && /^(INPUT|TEXTAREA|SELECT)$/.test(e.target.tagName || "")) return;
  if (e.key === "ArrowDown" || e.key === "PageDown" || e.key === " ") { e.preventDefault(); fpGo(1); }
  else if (e.key === "ArrowUp" || e.key === "PageUp") { e.preventDefault(); fpGo(-1); }
  else if (e.key === "Home") { e.preventDefault(); fpAnimateTo(0); }
  else if (e.key === "End") {
    const s = fpSections();
    if (s.length) fpAnimateTo(sectionTargetY(s[s.length - 1]));
  }
}
// Frecce laterali: nel carosello, se siamo sul deck scorrono le card (fino al
// bordo) poi la sezione; altrove avanzano di una sezione full-page.
function navigate(dir) {
  if (fpLock) return;
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
  if (fpActive()) {
    // Con il controller full-page: transizione animata e magnetica alla sezione,
    // centrando il contenuto (anche quando la sezione è più alta del viewport).
    fpAnimateTo(sectionTargetY(el));
  } else {
    el.scrollIntoView({ behavior: "smooth", block: sel === "#hero" ? "start" : "center", inline: "center" });
  }
}
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
    children: PROJECTS.map((p, i) => ({ label: p.title, sel: `[data-proj="${i}"]` })),
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
      .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
      .replace(/\*(.+?)\*/g, "<em>$1</em>");
  return (md || "")
    .split(/\n{2,}/)
    .map((block) => {
      const b = block.trim();
      if (!b) return "";
      if (b === "---" || b === "***") return "<hr />";
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
  const back = document.getElementById("ra-back");
  if (back) back.addEventListener("click", closeReader);
}
function closeReader() {
  const reader = document.getElementById("reader");
  reader.classList.remove("show");
  document.body.classList.remove("reader-open");
  setTimeout(() => { reader.hidden = true; }, 320);
}
function updateReaderProgress() {
  const art = document.getElementById("reader-article");
  const bar = document.getElementById("reader-progress");
  if (!art || !bar) return;
  const max = art.scrollHeight - art.clientHeight;
  const p = max > 0 ? Math.min(100, Math.max(0, (art.scrollTop / max) * 100)) : 0;
  bar.style.setProperty("--p", `${p}%`);
}

/* ---------- Stringhe statiche (hero, etichetta dock) ---------- */
function applyLangToStatic() {
  document.getElementById("hero-tagline").textContent = loc(SITE, "tagline") || "";
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

/* ---------- Avvio ---------- */
async function main() {
  LANG = getLang();
  document.documentElement.setAttribute("lang", LANG);
  renderThemeSeg(getPref());
  matchMedia("(prefers-color-scheme: dark)").addEventListener("change", () => {
    if (getPref() === "auto") applyPref("auto");
  });
  renderDock();

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

  // Full-page scroll (desktop): rotella + tastiera → una sezione per gesto,
  // transizione animata e magnetica. Attivo solo in cinema/carosello.
  window.addEventListener("wheel", onWheelFp, { passive: false });
  window.addEventListener("keydown", onKeyFp);

  // Lettore articolo: chiusura (Esc / click sul bordo) + barra di progresso.
  const reader = document.getElementById("reader");
  const readerArt = document.getElementById("reader-article");
  document.getElementById("reader-close").addEventListener("click", closeReader);
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !reader.hidden) closeReader();
  });
  reader.addEventListener("click", (e) => { if (e.target === reader) closeReader(); });
  readerArt.addEventListener("scroll", updateReaderProgress, { passive: true });

  // Dock a comparsa: hover su desktop (CSS); tap sul trigger su mobile (JS).
  const dockWrap = document.getElementById("dock-wrap");
  const dockTrigger = document.getElementById("dock-trigger");
  if (dockWrap && dockTrigger) {
    dockTrigger.addEventListener("click", (e) => {
      e.stopPropagation();
      const open = dockWrap.classList.toggle("open");
      dockTrigger.setAttribute("aria-expanded", open ? "true" : "false");
    });
    document.addEventListener("click", (e) => {
      if (dockWrap.classList.contains("open") && !dockWrap.contains(e.target)) {
        dockWrap.classList.remove("open");
        dockTrigger.setAttribute("aria-expanded", "false");
      }
    });
    // Selezionata un'interfaccia dal dock → richiudi (utile su mobile).
    document.getElementById("dock-switch").addEventListener("click", (e) => {
      if (e.target.closest(".dock-tab")) {
        dockWrap.classList.remove("open");
        dockTrigger.setAttribute("aria-expanded", "false");
      }
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
}

main();
