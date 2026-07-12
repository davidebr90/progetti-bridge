#!/usr/bin/env node
/*
 * update-link.mjs — aggiorna data/links.json sul repo GitHub Pages.
 * Pensato per girare sul VPS quando cambia l'URL del tunnel Cloudflare.
 *
 * Uso:
 *   GITHUB_TOKEN=github_pat_xxx \
 *   BRIDGE_REPO=davidebr90/progetti-bridge \
 *   node update-link.mjs <chiave> <url>
 *
 *   node update-link.mjs warmageddon https://foo-bar-baz.trycloudflare.com
 *
 * Variabili d'ambiente:
 *   GITHUB_TOKEN   (obbligatoria)  PAT fine-grained, Contents: Read and write sul repo.
 *   BRIDGE_REPO    (obbligatoria)  "utente/repo".
 *   BRIDGE_BRANCH  (opzionale)     default "main".
 *   BRIDGE_FILE    (opzionale)     default "data/links.json".
 *
 * Nessuna dipendenza esterna: usa solo fetch nativo (Node >= 18).
 */

const [, , key, url] = process.argv;
const token = process.env.GITHUB_TOKEN;
const repo = process.env.BRIDGE_REPO;
const branch = process.env.BRIDGE_BRANCH || "main";
const file = process.env.BRIDGE_FILE || "data/links.json";

function die(msg) {
  console.error(`update-link: ${msg}`);
  process.exit(1);
}

if (!key || url === undefined) die("uso: node update-link.mjs <chiave> <url>");
if (!token) die("manca GITHUB_TOKEN");
if (!repo) die("manca BRIDGE_REPO (es. davidebr90/progetti-bridge)");
if (url && !/^https?:\/\//.test(url)) die(`url non valido: ${url}`);

const api = `https://api.github.com/repos/${repo}/contents/${file}`;
const headers = {
  Authorization: `Bearer ${token}`,
  Accept: "application/vnd.github+json",
  "User-Agent": "bridge-update-link",
};

async function main() {
  // 1) leggi il file attuale (per sha + contenuto).
  const getRes = await fetch(`${api}?ref=${encodeURIComponent(branch)}`, { headers });
  let sha = null;
  let data = { updatedAt: null };
  if (getRes.ok) {
    const j = await getRes.json();
    sha = j.sha;
    try {
      data = JSON.parse(Buffer.from(j.content, "base64").toString("utf8"));
    } catch {
      data = {};
    }
  } else if (getRes.status !== 404) {
    die(`GET ${getRes.status}: ${(await getRes.text()).slice(0, 200)}`);
  }

  // 2) applica la modifica solo se cambia qualcosa (evita commit inutili).
  if (data[key] === url) {
    console.log(`nessun cambiamento: ${key} è già ${url || "(vuoto)"}`);
    return;
  }
  data[key] = url;
  data.updatedAt = new Date().toISOString();

  // 3) scrivi (commit).
  const body = {
    message: `chore: aggiorna link ${key}`,
    content: Buffer.from(JSON.stringify(data, null, 2) + "\n", "utf8").toString("base64"),
    branch,
    ...(sha ? { sha } : {}),
  };
  const putRes = await fetch(api, { method: "PUT", headers, body: JSON.stringify(body) });
  if (!putRes.ok) die(`PUT ${putRes.status}: ${(await putRes.text()).slice(0, 200)}`);
  console.log(`ok: ${key} = ${url || "(vuoto)"}`);
}

main().catch((e) => die(String(e?.message || e)));
