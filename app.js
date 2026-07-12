/* Progetti Bridge — logica pagina pubblica (statica, nessun framework). */

const ICONS = {
  sun: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>',
  moon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg>',
  auto: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="12" rx="2"/><path d="M8 20h8M12 16v4"/></svg>',
  ext: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5"/></svg>',
  code: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 18l6-6-6-6M8 6l-6 6 6 6"/></svg>',
  close: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18M6 6l12 12"/></svg>',
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
function logoHTML(p) {
  return p.logo ? `<img src="${esc(p.logo)}" alt="" loading="lazy" />` : monogram(p.title);
}

/* ---------- Render ---------- */
let LINKS = {};

function cardHTML(p) {
  const st = STATUS[p.status] || STATUS.wip;
  const tags = (p.tags || []).slice(0, 3).map((t) => `<span class="tag">${esc(t)}</span>`).join("");
  return `<button class="card" data-id="${esc(p.id)}" style="--card-accent:${esc(p.accent || "var(--accent)")}">
    <div class="card-top">
      <div class="card-logo">${logoHTML(p)}</div>
      <div style="min-width:0">
        <p class="card-title">${esc(p.title)}</p>
        <p class="card-tagline">${esc(p.tagline || "")}</p>
      </div>
    </div>
    <p class="card-desc">${esc(p.description || "")}</p>
    <div class="card-foot">
      <span class="status ${st.cls}">${st.label}</span>
      ${tags}
    </div>
  </button>`;
}

function openModal(p) {
  const st = STATUS[p.status] || STATUS.wip;
  const demo = p.demoKey ? (LINKS[p.demoKey] || "") : "";
  const shots = (p.screenshots || []).map((s) => `<img src="${esc(s)}" alt="Screenshot ${esc(p.title)}" loading="lazy" />`).join("");
  const highlights = (p.highlights || []).map((h) => `<li>${esc(h)}</li>`).join("");
  const tags = (p.tags || []).map((t) => `<span class="tag">${esc(t)}</span>`).join("");

  const demoBtn = p.demoKey
    ? demo
      ? `<a class="btn btn-primary" href="${esc(demo)}" target="_blank" rel="noopener">${ICONS.ext} Apri la demo</a>`
      : `<span class="btn" aria-disabled="true" title="Demo non disponibile al momento">${ICONS.ext} Demo offline</span>`
    : "";
  const repoBtn = p.repo ? `<a class="btn" href="${esc(p.repo)}" target="_blank" rel="noopener">${ICONS.code} Codice</a>` : "";

  const card = document.getElementById("modal-card");
  card.style.setProperty("--card-accent", p.accent || "var(--accent)");
  card.innerHTML = `
    <div class="modal-hero">
      <button class="modal-close" id="modal-close" aria-label="Chiudi">${ICONS.close}</button>
      <div class="modal-hero-top">
        <div class="modal-logo">${logoHTML(p)}</div>
        <div style="min-width:0">
          <h2 class="modal-title">${esc(p.title)}</h2>
          <p class="modal-tagline">${esc(p.tagline || "")}</p>
        </div>
      </div>
      <div class="modal-tags" style="margin-top:1rem"><span class="status ${st.cls}">${st.label}</span></div>
    </div>
    <div class="modal-body">
      <p class="modal-desc">${esc(p.description || "")}</p>
      ${highlights ? `<p class="modal-section-label">In sintesi</p><ul class="highlights">${highlights}</ul>` : ""}
      ${shots ? `<p class="modal-section-label">Screenshot</p><div class="shots">${shots}</div>` : ""}
      ${tags ? `<p class="modal-section-label">Tecnologie</p><div class="modal-tags">${tags}</div>` : ""}
      <div class="modal-actions">${demoBtn}${repoBtn}</div>
    </div>`;

  const modal = document.getElementById("modal");
  card.querySelector("#modal-close").addEventListener("click", () => modal.close());
  modal.showModal();
}

async function main() {
  renderThemeSeg(getPref());
  matchMedia("(prefers-color-scheme: dark)").addEventListener("change", () => {
    if (getPref() === "auto") applyPref("auto");
  });

  // Header ombra quando si scrolla.
  const header = document.getElementById("header");
  const onScroll = () => header.classList.toggle("is-stuck", window.scrollY > 8);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  // Modale: click fuori (sul backdrop) chiude.
  const modal = document.getElementById("modal");
  modal.addEventListener("click", (e) => {
    if (e.target === modal) modal.close();
  });

  // Dati (cache-buster leggero per prendere sempre i link freschi).
  const bust = `?t=${Math.floor(Date.now() / 60000)}`;
  const [data, links] = await Promise.all([
    fetch(`./data/projects.json${bust}`).then((r) => r.json()),
    fetch(`./data/links.json${bust}`).then((r) => r.json()).catch(() => ({})),
  ]);
  LINKS = links || {};

  const site = data.site || {};
  if (site.title) document.title = site.title;
  document.getElementById("brand-name").textContent = "Progetti";
  document.getElementById("brand-mark").textContent = (site.author || "D").trim().charAt(0).toUpperCase();
  document.getElementById("hero-title").textContent = site.title || "I miei progetti";
  document.getElementById("hero-tagline").textContent = site.tagline || "";
  document.getElementById("footer-name").textContent = `© ${site.author || "Davide"}`;
  const gh = document.getElementById("footer-gh");
  if (site.githubUser) gh.href = `https://github.com/${site.githubUser}`;

  const grid = document.getElementById("grid");
  grid.innerHTML = (data.projects || []).map(cardHTML).join("");
  grid.querySelectorAll(".card").forEach((el) => {
    el.addEventListener("click", () => {
      const p = (data.projects || []).find((x) => x.id === el.dataset.id);
      if (p) openModal(p);
    });
  });
}

main();
