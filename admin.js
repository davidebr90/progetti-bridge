/* Admin in-browser: legge/scrive data/projects.json via GitHub Contents API.
   Il token resta solo in localStorage di questo browser, mai committato. */

const LS = {
  token: "bridge-admin-token",
  repo: "bridge-admin-repo",
  branch: "bridge-admin-branch",
  theme: "bridge-theme",
};
const FILE = "data/projects.json";

/* ---------- Tema (condiviso con la pagina pubblica) ---------- */
const ICONS = {
  sun: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>',
  moon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg>',
  auto: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="12" rx="2"/><path d="M8 20h8M12 16v4"/></svg>',
};
function getPref() {
  try {
    const v = localStorage.getItem(LS.theme);
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
    if (pref === "auto") localStorage.removeItem(LS.theme);
    else localStorage.setItem(LS.theme, pref);
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

/* ---------- GitHub API ---------- */
function ghState() {
  return {
    token: (localStorage.getItem(LS.token) || "").trim(),
    repo: (localStorage.getItem(LS.repo) || "").trim(),
    branch: (localStorage.getItem(LS.branch) || "main").trim() || "main",
  };
}
async function ghGet() {
  const { token, repo, branch } = ghState();
  const url = `https://api.github.com/repos/${repo}/contents/${FILE}?ref=${encodeURIComponent(branch)}`;
  const r = await fetch(url, {
    headers: { Authorization: `Bearer ${token}`, Accept: "application/vnd.github+json" },
  });
  if (!r.ok) throw new Error(`GitHub ${r.status}: ${(await r.text()).slice(0, 200)}`);
  const j = await r.json();
  const text = decodeURIComponent(escape(atob(j.content.replace(/\n/g, ""))));
  return { data: JSON.parse(text), sha: j.sha };
}
async function ghPut(dataObj, sha) {
  const { token, repo, branch } = ghState();
  const url = `https://api.github.com/repos/${repo}/contents/${FILE}`;
  const pretty = JSON.stringify(dataObj, null, 2) + "\n";
  const content = btoa(unescape(encodeURIComponent(pretty)));
  const r = await fetch(url, {
    method: "PUT",
    headers: { Authorization: `Bearer ${token}`, Accept: "application/vnd.github+json" },
    body: JSON.stringify({ message: "chore: aggiorna progetti dalla console admin", content, sha, branch }),
  });
  if (!r.ok) throw new Error(`GitHub ${r.status}: ${(await r.text()).slice(0, 200)}`);
  const j = await r.json();
  return j.content.sha;
}

/* ---------- Stato editor ---------- */
let MODEL = null; // { site, projects }
let SHA = null;

function status(id, msg, kind) {
  const el = document.getElementById(id);
  el.textContent = msg || "";
  el.className = "status-line" + (kind ? ` is-${kind}` : "");
}

const STATUS_DOT = { live: "var(--good)", beta: "var(--accent)", wip: "var(--muted)" };

function renderList() {
  const host = document.getElementById("proj-list");
  const tpl = document.getElementById("proj-tpl");
  host.innerHTML = "";
  document.getElementById("site-line").textContent = `${MODEL.site?.title || ""} — ${MODEL.projects.length} progetti`;

  MODEL.projects.forEach((p, idx) => {
    const node = tpl.content.firstElementChild.cloneNode(true);
    node.querySelector(".proj-name").textContent = p.title || p.id || "(senza nome)";
    node.querySelector(".proj-status").textContent = p.status || "";
    node.querySelector(".proj-dot").style.background = STATUS_DOT[p.status] || "var(--muted)";

    node.querySelectorAll("[data-k]").forEach((inp) => {
      const k = inp.dataset.k;
      let v = p[k];
      if (k === "tags") v = (p.tags || []).join(", ");
      else if (k === "highlights") v = (p.highlights || []).join("\n");
      else if (k === "screenshots") v = (p.screenshots || []).join("\n");
      inp.value = v ?? "";
      inp.addEventListener("input", () => {
        if (k === "tags") p.tags = inp.value.split(",").map((s) => s.trim()).filter(Boolean);
        else if (k === "highlights") p.highlights = inp.value.split("\n").map((s) => s.trim()).filter(Boolean);
        else if (k === "screenshots") p.screenshots = inp.value.split("\n").map((s) => s.trim()).filter(Boolean);
        else p[k] = inp.value;
        if (k === "title" || k === "id") node.querySelector(".proj-name").textContent = p.title || p.id || "(senza nome)";
        if (k === "status") {
          node.querySelector(".proj-status").textContent = p.status;
          node.querySelector(".proj-dot").style.background = STATUS_DOT[p.status] || "var(--muted)";
        }
      });
    });

    node.querySelector('[data-act="del"]').addEventListener("click", () => {
      if (confirm(`Eliminare "${p.title || p.id}"?`)) {
        MODEL.projects.splice(idx, 1);
        renderList();
      }
    });
    node.querySelector('[data-act="up"]').addEventListener("click", () => {
      if (idx > 0) {
        [MODEL.projects[idx - 1], MODEL.projects[idx]] = [MODEL.projects[idx], MODEL.projects[idx - 1]];
        renderList();
      }
    });
    node.querySelector('[data-act="down"]').addEventListener("click", () => {
      if (idx < MODEL.projects.length - 1) {
        [MODEL.projects[idx + 1], MODEL.projects[idx]] = [MODEL.projects[idx], MODEL.projects[idx + 1]];
        renderList();
      }
    });

    host.appendChild(node);
  });
}

function newProject() {
  return {
    id: "nuovo-" + MODEL.projects.length,
    title: "Nuovo progetto",
    tagline: "",
    description: "",
    status: "wip",
    accent: "#0f8a5f",
    logo: "",
    tags: [],
    demoKey: "",
    repo: "",
    screenshots: [],
    highlights: [],
  };
}

/* ---------- Eventi ---------- */
async function load() {
  localStorage.setItem(LS.repo, document.getElementById("repo").value.trim());
  localStorage.setItem(LS.branch, document.getElementById("branch").value.trim() || "main");
  localStorage.setItem(LS.token, document.getElementById("token").value.trim());
  status("auth-status", "Carico da GitHub…");
  try {
    const { data, sha } = await ghGet();
    MODEL = { site: data.site || {}, projects: Array.isArray(data.projects) ? data.projects : [] };
    SHA = sha;
    document.getElementById("auth-panel").classList.add("hidden");
    document.getElementById("edit-panel").classList.remove("hidden");
    renderList();
    status("auth-status", "");
  } catch (e) {
    status("auth-status", String(e.message || e), "err");
  }
}

async function save() {
  status("save-status", "Salvo su GitHub…");
  try {
    SHA = await ghPut(MODEL, SHA);
    status("save-status", "Salvato ✓ — la pagina pubblica si aggiorna dopo il deploy Pages (~1 min).", "ok");
  } catch (e) {
    // 409 = sha stale: ricarico e chiedo di riprovare.
    status("save-status", String(e.message || e), "err");
  }
}

function main() {
  renderThemeSeg(getPref());
  const g = ghState();
  document.getElementById("repo").value = g.repo;
  document.getElementById("branch").value = g.branch;
  document.getElementById("token").value = g.token;

  document.getElementById("btn-load").addEventListener("click", load);
  document.getElementById("btn-save").addEventListener("click", save);
  document.getElementById("btn-add").addEventListener("click", () => {
    MODEL.projects.push(newProject());
    renderList();
  });
  document.getElementById("btn-forget").addEventListener("click", () => {
    localStorage.removeItem(LS.token);
    document.getElementById("token").value = "";
    status("auth-status", "Token dimenticato.", "ok");
  });
}

main();
