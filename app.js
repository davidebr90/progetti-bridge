/* Progetti Bridge — pagina pubblica (statica, nessun framework).
   Card a tutta pagina impilate verticalmente, reveal fade-in/out allo scroll,
   sezione bio, tema chiaro/scuro/auto. */

const ICONS = {
  sun: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>',
  moon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg>',
  auto: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="12" rx="2"/><path d="M8 20h8M12 16v4"/></svg>',
  ext: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5"/></svg>',
  code: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 18l6-6-6-6M8 6l-6 6 6 6"/></svg>',
};

const STATUS = {
  live: { cls: "status-live", label: "Live" },
  beta: { cls: "status-beta", label: "Beta" },
  wip: { cls: "status-wip", label: "In sviluppo" },
};

/* ---------- Tema (auto / light / dark) ---------- */
const THEME_KEY = "bridge-theme";
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
    .map(
      ([k, ic, lbl]) =>
        `<button type="button" data-pref="${k}" title="${lbl}" aria-label="${lbl}" aria-pressed="${k === pref}" class="${k === pref ? "is-active" : ""}">${ic}</button>`,
    )
    .join("");
  seg.querySelectorAll("button").forEach((b) => b.addEventListener("click", () => setPref(b.dataset.pref)));
}

/* ---------- Utility ---------- */
function esc(s) {
  return String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}
function monogram(title) {
  return esc((title || "?").trim().slice(0, 2).toUpperCase());
}

/* ---------- Render progetti ---------- */
let LINKS = {};

function demoUrl(p) {
  // URL statico esplicito (es. dominio stabile) ha precedenza sul link
  // aggiornabile via links.json (tunnel che cambiano).
  return p.demoUrl || (p.demoKey ? LINKS[p.demoKey] || "" : "") || "";
}

function visualInner(p) {
  if (p.screenshots && p.screenshots[0]) {
    return `<img class="project-shot" src="${esc(p.screenshots[0])}" alt="Anteprima ${esc(p.title)}" loading="lazy" decoding="async" />`;
  }
  if (p.logo) {
    return `<img class="project-logo-img" src="${esc(p.logo)}" alt="${esc(p.title)}" loading="lazy" decoding="async" />`;
  }
  return `<span class="project-mono">${monogram(p.title)}</span>`;
}

function projectHTML(p) {
  const st = STATUS[p.status] || STATUS.wip;
  const demo = demoUrl(p);
  const highlights = (p.highlights || []).map((h) => `<li>${esc(h)}</li>`).join("");
  const tags = (p.tags || []).map((t) => `<span class="tag">${esc(t)}</span>`).join("");

  const demoBtn = demo
    ? `<a class="btn btn-primary" href="${esc(demo)}" target="_blank" rel="noopener">${ICONS.ext} Apri la demo</a>`
    : p.demoKey || p.demoUrl
      ? `<span class="btn" aria-disabled="true" title="Demo non disponibile al momento">${ICONS.ext} Demo offline</span>`
      : "";
  const repoBtn = p.repo ? `<a class="btn" href="${esc(p.repo)}" target="_blank" rel="noopener">${ICONS.code} Codice</a>` : "";

  return `<section class="project" style="--card-accent:${esc(p.accent || "var(--accent)")}">
    <div class="project-inner">
      <div class="project-visual reveal">
        <span class="project-status-float"><span class="status ${st.cls}">${st.label}</span></span>
        ${visualInner(p)}
      </div>
      <div class="project-body">
        <p class="project-eyebrow">${esc(p.tagline || "")}</p>
        <h2 class="project-title">${esc(p.title)}</h2>
        <p class="project-desc">${esc(p.description || "")}</p>
        ${highlights ? `<ul class="project-highlights">${highlights}</ul>` : ""}
        ${tags ? `<div class="project-tags">${tags}</div>` : ""}
        <div class="project-actions">${demoBtn}${repoBtn}</div>
      </div>
    </div>
  </section>`;
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
  if (bio.photo) {
    photo.innerHTML = `<img src="${esc(bio.photo)}" alt="${esc(bio.name || "Foto")}" loading="lazy" decoding="async" />`;
  } else {
    photo.innerHTML = `<span class="bio-photo-mono">${monogram(bio.name || "D")}</span>`;
  }
  const quotes = document.getElementById("bio-quotes");
  quotes.innerHTML = (bio.quotes || []).map((q) => `<li>“${esc(q)}”</li>`).join("");
}

/* ---------- Reveal allo scroll (fade in/out) ---------- */
function setupReveal() {
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const targets = document.querySelectorAll(".project, .reveal, .bio-inner");
  if (reduce || !("IntersectionObserver" in window)) {
    targets.forEach((el) => el.classList.add("in-view"));
    return;
  }
  const io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        // Fade IN quando entra, fade OUT quando esce (esperienza premium).
        e.target.classList.toggle("in-view", e.isIntersecting && e.intersectionRatio > 0.12);
      }
    },
    { threshold: [0, 0.12, 0.4], rootMargin: "-6% 0px -6% 0px" },
  );
  targets.forEach((el) => io.observe(el));
}

async function main() {
  renderThemeSeg(getPref());
  matchMedia("(prefers-color-scheme: dark)").addEventListener("change", () => {
    if (getPref() === "auto") applyPref("auto");
  });

  const bust = `?t=${Math.floor(Date.now() / 60000)}`;
  const [data, links] = await Promise.all([
    fetch(`./data/projects.json${bust}`).then((r) => r.json()),
    fetch(`./data/links.json${bust}`).then((r) => r.json()).catch(() => ({})),
  ]);
  LINKS = links || {};

  const site = data.site || {};
  if (site.title) document.title = site.title;
  document.getElementById("hero-title").textContent = site.title || "I miei progetti";
  document.getElementById("hero-tagline").textContent = site.tagline || "";
  document.getElementById("footer-name").textContent = `© ${site.author || "Davide"}`;
  const gh = document.getElementById("footer-gh");
  if (site.githubUser) gh.href = `https://github.com/${site.githubUser}`;

  document.getElementById("projects").innerHTML = (data.projects || []).map(projectHTML).join("");
  renderBio(site.bio);
  // Aggancia la sezione bio al sistema di reveal.
  const bioInner = document.querySelector(".bio-inner");
  if (bioInner) bioInner.classList.add("reveal");

  setupReveal();
}

main();
