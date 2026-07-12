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
  },
  en: {
    sections: "Sections", language: "Language", theme: "Theme",
    intro: "Intro", profile: "Profile",
    demo: "Live demo", demoOff: "Demo offline", codeBtn: "Code",
    "status.live": "Live", "status.beta": "Beta", "status.wip": "In progress",
    menuOpen: "Open the menu", menuClose: "Close the menu",
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
          (p, i) => `<button class="kin-item" type="button" data-i="${i}" data-proj="${i}" style="--accent:${esc(p.accent || "var(--brand)")}">
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
  const bio = document.getElementById("bio");
  if (bio && !bio.hidden) list.push(bio);
  return list.filter(Boolean);
}
function fpActive() {
  const ui = document.documentElement.getAttribute("data-ui");
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
// Anima lo scroll della finestra fino a targetY con easing (transizione visibile),
// bloccando l'input finché non completa (+ cooldown anti-momentum del trackpad).
function fpAnimateTo(targetY, dur = 760) {
  const startY = window.scrollY;
  const dist = Math.round(targetY) - startY;
  if (Math.abs(dist) < 2) return;
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduce) { window.scrollTo(0, startY + dist); return; }
  fpLock = true;
  document.documentElement.classList.add("fp-animating"); // disattiva lo snap CSS durante l'animazione
  const t0 = performance.now();
  const ease = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2); // easeInOutCubic
  function frame(now) {
    const t = Math.min(1, (now - t0) / dur);
    window.scrollTo(0, startY + dist * ease(t));
    if (t < 1) requestAnimationFrame(frame);
    else {
      document.documentElement.classList.remove("fp-animating");
      setTimeout(() => { fpLock = false; }, 160);
    }
  }
  requestAnimationFrame(frame);
}
function fpGo(dir) {
  const secs = fpSections();
  if (!secs.length) return;
  const cur = currentSectionIndex(secs);
  const next = Math.min(secs.length - 1, Math.max(0, cur + dir));
  if (next === cur) return;
  fpAnimateTo(window.scrollY + secs[next].getBoundingClientRect().top);
}
function normDelta(e) {
  return e.deltaMode === 1 ? e.deltaY * 40 : e.deltaY; // "righe" → px
}
// Rotella: nel carosello sul deck → scroll ORIZZONTALE fino al bordo; poi (e in
// cinema sempre) → avanzamento full-page di UNA sezione con transizione animata.
function onWheelFp(e) {
  if (!fpActive()) return;
  const ui = document.documentElement.getAttribute("data-ui");
  if (ui === "carosello") {
    const deck = document.getElementById("deck");
    if (deck && e.target.closest && e.target.closest("#deck")) {
      const dy = normDelta(e);
      if (Math.abs(e.deltaX) <= Math.abs(dy)) {
        const atStart = deck.scrollLeft <= 0;
        const atEnd = deck.scrollLeft + deck.clientWidth >= deck.scrollWidth - 1;
        if ((dy > 0 && !atEnd) || (dy < 0 && !atStart)) {
          e.preventDefault();
          deck.scrollLeft += dy;
          return; // resta orizzontale finché non è al bordo
        }
      }
    }
  }
  e.preventDefault(); // controllo totale: niente scroll libero della rotella
  if (fpLock) return;
  if (Math.abs(e.deltaY) < 4) return;
  fpGo(e.deltaY > 0 ? 1 : -1);
}
function onKeyFp(e) {
  if (!fpActive()) return;
  if (e.target && /^(INPUT|TEXTAREA|SELECT)$/.test(e.target.tagName || "")) return;
  if (e.key === "ArrowDown" || e.key === "PageDown" || e.key === " ") { e.preventDefault(); fpGo(1); }
  else if (e.key === "ArrowUp" || e.key === "PageUp") { e.preventDefault(); fpGo(-1); }
  else if (e.key === "Home") { e.preventDefault(); fpAnimateTo(0); }
  else if (e.key === "End") {
    const s = fpSections();
    if (s.length) fpAnimateTo(window.scrollY + s[s.length - 1].getBoundingClientRect().top);
  }
}
// Frecce laterali: nel carosello scorrono il deck (fino al bordo) poi la sezione;
// altrove avanzano di una sezione full-page.
function navigate(dir) {
  const ui = document.documentElement.getAttribute("data-ui");
  if (ui === "carosello") {
    const deck = document.getElementById("deck");
    if (deck) {
      const atEnd = deck.scrollLeft + deck.clientWidth >= deck.scrollWidth - 4;
      const atStart = deck.scrollLeft <= 4;
      if ((dir > 0 && !atEnd) || (dir < 0 && !atStart)) {
        const card = deck.querySelector(".deck-card");
        const step = card ? card.getBoundingClientRect().width + 28 : deck.clientWidth * 0.8;
        deck.scrollBy({ left: dir * step, behavior: "smooth" });
        return;
      }
    }
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
    // Con il controller full-page: transizione animata e magnetica alla sezione.
    fpAnimateTo(window.scrollY + el.getBoundingClientRect().top);
  } else {
    el.scrollIntoView({ behavior: "smooth", block: sel === "#hero" ? "start" : "center", inline: "center" });
  }
}
function renderMenu() {
  // Etichette
  document.getElementById("menu-sections-label").textContent = t("sections");
  document.getElementById("menu-lang-label").textContent = t("language");
  document.getElementById("menu-theme-label").textContent = t("theme");

  // Elenco sezioni: Intro + progetti + Profilo
  const list = document.getElementById("menu-list");
  const items = [["#hero", t("intro")]];
  PROJECTS.forEach((p, i) => items.push([`[data-proj="${i}"]`, p.title]));
  items.push(["#bio", t("profile")]);
  list.innerHTML = items
    .map(([sel, label], i) => `<li style="--d:${i * 45}ms"><button type="button" data-sel="${esc(sel)}">${esc(label)}</button></li>`)
    .join("");
  list.querySelectorAll("button").forEach((b) =>
    b.addEventListener("click", () => {
      closeMenu();
      setTimeout(() => scrollToTarget(b.dataset.sel), 260);
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

/* ---------- Stringhe statiche (hero, dock brand) ---------- */
function applyLangToStatic() {
  document.getElementById("hero-tagline").textContent = loc(SITE, "tagline") || "";
  renderBio();
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

  const bust = `?t=${Math.floor(Date.now() / 60000)}`;
  const [data, links] = await Promise.all([
    fetch(`./data/projects.json${bust}`).then((r) => r.json()),
    fetch(`./data/links.json${bust}`).then((r) => r.json()).catch(() => ({})),
  ]);
  LINKS = links || {};
  PROJECTS = data.projects || [];
  SITE = data.site || {};

  if (SITE.title) document.title = SITE.title;
  document.getElementById("hero-title").textContent = SITE.title || "";
  document.getElementById("dock-brand").textContent = SITE.author || "Portfolio";

  applyLangToStatic();
  renderMenu();
  applyUI(getUI());
}

main();
