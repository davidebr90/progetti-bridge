/* Progetti Bridge — pagina pubblica statica, senza framework.
 * Cinque interfacce completamente diverse per gli STESSI dati, commutabili dal
 * dock in basso; tema chiaro/scuro/auto; reveal allo scroll; sezione bio con
 * social. Tutta l'animazione è CSS + un filo di JS per tilt/accordion/cinetica. */

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

const STATUS = {
  live: { cls: "status-live", label: "Live" },
  beta: { cls: "status-beta", label: "Beta" },
  wip: { cls: "status-wip", label: "In sviluppo" },
};

const INTERFACES = [
  { key: "cinema", name: "Cinema", hint: "Sezioni a tutta pagina" },
  { key: "carosello", name: "Carosello", hint: "Deck orizzontale" },
  { key: "griglia", name: "Griglia", hint: "Schede con tilt 3D" },
  { key: "rivista", name: "Rivista", hint: "Indice editoriale" },
  { key: "cinetica", name: "Cinetica", hint: "Titoli in movimento" },
];

/* ---------- Tema ---------- */
const THEME_KEY = "bridge-theme";
const UI_KEY = "bridge-ui";
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
  if (p.screenshots && p.screenshots[0]) return `<img class="p-shot" src="${esc(p.screenshots[0])}" alt="Anteprima ${esc(p.title)}" loading="lazy" decoding="async" />`;
  if (p.logo) return `<img class="p-logo-img" src="${esc(p.logo)}" alt="${esc(p.title)}" loading="lazy" decoding="async" />`;
  return `<span class="p-mono">${monogram(p.title)}</span>`;
}
function actionsHTML(p) {
  const demo = demoUrl(p);
  const demoBtn = demo
    ? `<a class="btn btn-primary" href="${esc(demo)}" target="_blank" rel="noopener">${ICONS.ext} Live demo</a>`
    : p.demoKey || p.demoUrl
      ? `<span class="btn" aria-disabled="true" title="Demo non disponibile al momento">${ICONS.ext} Demo offline</span>`
      : "";
  const repoBtn = p.repo ? `<a class="btn" href="${esc(p.repo)}" target="_blank" rel="noopener">${ICONS.code} Codice</a>` : "";
  return demoBtn + repoBtn;
}
function highlightsHTML(p) {
  return (p.highlights || []).map((h) => `<li>${esc(h)}</li>`).join("");
}
function tagsHTML(p) {
  return (p.tags || []).map((t) => `<span class="tag">${esc(t)}</span>`).join("");
}
function pill(p) {
  const st = STATUS[p.status] || STATUS.wip;
  return `<span class="status ${st.cls}">${st.label}</span>`;
}

/* ============================================================
   INTERFACCE — ognuna riceve (stage, projects) e disegna il DOM
   ============================================================ */

function bodyHTML(p) {
  return `
    <p class="p-eyebrow">${esc(p.tagline || "")}</p>
    <h2 class="p-title">${esc(p.title)}</h2>
    <p class="p-desc">${esc(p.description || "")}</p>
    ${highlightsHTML(p) ? `<ul class="p-highlights">${highlightsHTML(p)}</ul>` : ""}
    ${tagsHTML(p) ? `<div class="p-tags">${tagsHTML(p)}</div>` : ""}
    <div class="p-actions">${actionsHTML(p)}</div>`;
}

const RENDER = {
  // 1) CINEMA — sezioni a tutta pagina, alternate, scroll-snap + frecce
  cinema(stage, projects) {
    stage.innerHTML = projects
      .map(
        (p) => `<section class="snap project" style="--accent:${esc(p.accent || "var(--brand)")}">
          <div class="project-inner">
            <div class="project-visual reveal">
              <span class="p-status-float">${pill(p)}</span>
              ${visualInner(p)}
            </div>
            <div class="project-body">${bodyHTML(p)}</div>
          </div>
        </section>`,
      )
      .join("");
    observeReveal();
  },

  // 2) CAROSELLO — deck orizzontale con scroll-snap
  carosello(stage, projects) {
    stage.innerHTML = `<div class="deck" id="deck">${projects
      .map(
        (p) => `<article class="deck-card reveal" style="--accent:${esc(p.accent || "var(--brand)")}">
          <div class="deck-visual">${visualInner(p)}<span class="p-status-float">${pill(p)}</span></div>
          <div class="deck-body">
            <p class="p-eyebrow">${esc(p.tagline || "")}</p>
            <h2 class="p-title">${esc(p.title)}</h2>
            <p class="p-desc">${esc(p.description || "")}</p>
            <div class="p-tags">${tagsHTML(p)}</div>
            <div class="p-actions">${actionsHTML(p)}</div>
          </div>
        </article>`,
      )
      .join("")}</div>`;
    observeReveal();
  },

  // 3) GRIGLIA — schede con tilt 3D + glare al puntatore
  griglia(stage, projects) {
    stage.innerHTML = `<div class="grid">${projects
      .map(
        (p) => `<article class="tilt reveal" style="--accent:${esc(p.accent || "var(--brand)")}">
          <div class="tilt-inner">
            <span class="tilt-glare"></span>
            <div class="tilt-top">
              <span class="tilt-logo">${visualInner(p)}</span>
              ${pill(p)}
            </div>
            <h3 class="tilt-title">${esc(p.title)}</h3>
            <p class="tilt-tagline">${esc(p.tagline || "")}</p>
            <p class="tilt-desc">${esc(p.description || "")}</p>
            <div class="p-tags">${tagsHTML(p)}</div>
            <div class="p-actions">${actionsHTML(p)}</div>
          </div>
        </article>`,
      )
      .join("")}</div>`;
    setupTilt(stage);
    observeReveal();
  },

  // 4) RIVISTA — indice editoriale ad accordion
  rivista(stage, projects) {
    stage.innerHTML = `<div class="mag">${projects
      .map(
        (p, i) => `<article class="mag-row" style="--accent:${esc(p.accent || "var(--brand)")}">
          <button class="mag-head" type="button" aria-expanded="false">
            <span class="mag-num">${String(i + 1).padStart(2, "0")}</span>
            <span class="mag-titles">
              <span class="mag-title">${esc(p.title)}</span>
              <span class="mag-tagline">${esc(p.tagline || "")}</span>
            </span>
            <span class="mag-meta">${pill(p)}<span class="mag-chevron">${ICONS.arrowR}</span></span>
          </button>
          <div class="mag-panel"><div class="mag-panel-in">
            <p class="p-desc">${esc(p.description || "")}</p>
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

  // 5) CINETICA — titoli enormi in movimento, click → pannello dettaglio
  cinetica(stage, projects) {
    stage.innerHTML =
      `<div class="kin">` +
      projects
        .map(
          (p, i) => `<button class="kin-item" type="button" data-i="${i}" style="--accent:${esc(p.accent || "var(--brand)")}">
            <span class="kin-index">0${i + 1}</span>
            <span class="kin-line" data-text="${esc(p.title)}">${esc(p.title)}</span>
            <span class="kin-tag">${esc(p.tagline || "")}</span>
          </button>`,
        )
        .join("") +
      `</div>
      <div class="kin-panel" id="kin-panel" hidden><div class="kin-panel-card" id="kin-panel-card"></div></div>`;
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
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduce) return;
  stage.querySelectorAll(".tilt").forEach((card) => {
    const inner = card.querySelector(".tilt-inner");
    const onMove = (e) => {
      const r = card.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width;
      const py = (e.clientY - r.top) / r.height;
      const rx = (0.5 - py) * 12;
      const ry = (px - 0.5) * 14;
      inner.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) translateZ(0)`;
      card.style.setProperty("--gx", `${px * 100}%`);
      card.style.setProperty("--gy", `${py * 100}%`);
    };
    const onLeave = () => {
      inner.style.transform = "";
    };
    card.addEventListener("pointermove", onMove);
    card.addEventListener("pointerleave", onLeave);
    cleanup.push(() => {
      card.removeEventListener("pointermove", onMove);
      card.removeEventListener("pointerleave", onLeave);
    });
  });
}

function setupAccordion(stage) {
  const heads = stage.querySelectorAll(".mag-head");
  heads.forEach((h) => {
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
      <button class="kin-close" type="button" aria-label="Chiudi">${ICONS.close}</button>
      <div class="kin-panel-visual">${visualInner(p)}</div>
      <div class="kin-panel-body">
        <p class="p-eyebrow">${esc(p.tagline || "")}</p>
        <h2 class="p-title">${esc(p.title)}</h2>
        <div style="margin:.2rem 0 1rem">${pill(p)}</div>
        <p class="p-desc">${esc(p.description || "")}</p>
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

/* ---------- Navigazione a frecce (cinema: verticale · carosello: orizzontale) ---------- */
function snapSections() {
  return [...document.querySelectorAll(".snap")];
}
function navigate(dir) {
  const ui = document.documentElement.getAttribute("data-ui");
  if (ui === "carosello") {
    const deck = document.getElementById("deck");
    if (deck) {
      const card = deck.querySelector(".deck-card");
      const step = card ? card.getBoundingClientRect().width + 28 : deck.clientWidth * 0.8;
      deck.scrollBy({ left: dir * step, behavior: "smooth" });
    }
    return;
  }
  // cinema: scorri di sezione
  const secs = snapSections();
  if (!secs.length) return;
  const mid = window.innerHeight / 2;
  let idx = 0;
  secs.forEach((s, i) => {
    const r = s.getBoundingClientRect();
    if (r.top <= mid) idx = i;
  });
  const next = Math.min(secs.length - 1, Math.max(0, idx + dir));
  secs[next].scrollIntoView({ behavior: "smooth", block: "start" });
}

/* ---------- Dock / interfaccia ---------- */
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
  const stage = document.getElementById("stage");
  (RENDER[key] || RENDER.cinema)(stage, PROJECTS);
  // aggiorna stato attivo nel dock
  document.querySelectorAll(".dock-tab").forEach((b) => {
    const on = b.dataset.ui === key;
    b.classList.toggle("is-active", on);
    b.setAttribute("aria-selected", on ? "true" : "false");
  });
  // frecce solo dove hanno senso
  const arrows = document.getElementById("nav-arrows");
  arrows.dataset.show = key === "cinema" || key === "carosello" ? "1" : "0";
  arrows.setAttribute("aria-hidden", arrows.dataset.show === "1" ? "false" : "true");
}
function renderDock() {
  const sw = document.getElementById("dock-switch");
  sw.innerHTML = INTERFACES.map(
    (it, i) =>
      `<button type="button" role="tab" class="dock-tab" data-ui="${it.key}" title="${esc(it.hint)}" aria-selected="false"><span class="dock-tab-n">${i + 1}</span><span class="dock-tab-name">${esc(it.name)}</span></button>`,
  ).join("");
  sw.querySelectorAll(".dock-tab").forEach((b) => b.addEventListener("click", () => setUI(b.dataset.ui)));
}

/* ---------- Social ---------- */
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
        : `<span class="soc is-off" aria-label="${lbl} (da impostare)" title="${lbl} — link da impostare">${ic}</span>`;
    })
    .join("");
}

/* ---------- Bio ---------- */
function renderBio(bio) {
  if (!bio) return;
  const section = document.getElementById("bio");
  section.hidden = false;
  document.getElementById("bio-eyebrow").textContent = bio.eyebrow || "La persona";
  document.getElementById("bio-name").textContent = bio.name || "";
  document.getElementById("bio-role").textContent = bio.role || "";
  document.getElementById("bio-desc").textContent = bio.description || "";
  const photo = document.getElementById("bio-photo");
  photo.innerHTML = bio.photo
    ? `<img src="${esc(bio.photo)}" alt="${esc(bio.name || "Foto")}" loading="lazy" decoding="async" />`
    : `<span class="bio-photo-mono">${monogram(bio.name || "D")}</span>`;
  document.getElementById("bio-quotes").innerHTML = (bio.quotes || []).map((q) => `<li>“${esc(q)}”</li>`).join("");
  document.getElementById("bio-social").innerHTML = socialHTML(bio.social);
  document.getElementById("dock-social").innerHTML = socialHTML(bio.social);
}

/* ---------- Avvio ---------- */
async function main() {
  renderThemeSeg(getPref());
  matchMedia("(prefers-color-scheme: dark)").addEventListener("change", () => {
    if (getPref() === "auto") applyPref("auto");
  });
  renderDock();

  // frecce
  document.querySelectorAll(".nav-arrow").forEach((b) =>
    b.addEventListener("click", () => navigate(Number(b.dataset.dir))),
  );
  const heroScroll = document.getElementById("hero-scroll");
  if (heroScroll)
    heroScroll.addEventListener("click", () => {
      const first = document.querySelector("#stage .snap, #stage .deck-card, #stage .tilt, #stage .mag-row, #stage .kin-item, #stage > *");
      (first || document.getElementById("stage")).scrollIntoView({ behavior: "smooth", block: "start" });
    });

  const bust = `?t=${Math.floor(Date.now() / 60000)}`;
  const [data, links] = await Promise.all([
    fetch(`./data/projects.json${bust}`).then((r) => r.json()),
    fetch(`./data/links.json${bust}`).then((r) => r.json()).catch(() => ({})),
  ]);
  LINKS = links || {};
  PROJECTS = data.projects || [];

  const site = data.site || {};
  if (site.title) document.title = site.title;
  document.getElementById("hero-title").textContent = site.title || "I miei progetti";
  document.getElementById("hero-tagline").textContent = site.tagline || "";
  document.getElementById("dock-brand").textContent = site.author || "Portfolio";
  renderBio(site.bio);

  applyUI(getUI());
}

main();
