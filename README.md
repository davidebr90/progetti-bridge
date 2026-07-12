# Progetti Bridge

Pagina "bridge" dei progetti: panoramica statica, moderna e responsive, con tema
chiaro/scuro/automatico. Ogni progetto apre una modale con logo, descrizione,
screenshot, tag e i link a demo e codice. I link delle demo (URL dei tunnel, che
cambiano) vivono in un file JSON aggiornabile da remoto, così la pagina resta
sempre valida senza rebuild.

## Struttura

```
index.html          Pagina pubblica
styles.css          Tema + animazioni (CSS moderno, zero dipendenze)
app.js              Render card, modale, gestione tema
admin.html/.js      Console privata per modificare i progetti (commit su GitHub)
data/projects.json  Contenuti (progetti, testi, tag, screenshot)
data/links.json     URL delle demo, per chiave (aggiornati dal VPS)
scripts/update-link.mjs   Script Node per aggiornare links.json da remoto
```

Nessun framework, nessuna build: sono file statici serviti così come sono.

## Deploy su GitHub Pages

1. Crea il repository e pubblica i file su `main`.
2. Su GitHub → **Settings → Pages** → *Build and deployment* → **Deploy from a
   branch** → branch `main`, cartella `/ (root)`.
3. La pagina sarà su `https://<utente>.github.io/<repo>/`.

Per un anteprima locale: `python -m http.server 5173` nella cartella del repo,
poi apri `http://localhost:5173/`.

## Modificare i progetti (console admin)

La console `admin.html` legge e scrive `data/projects.json` direttamente sul
repo via GitHub Contents API. È statica: nessun server, nessun backend.

1. Crea un **Personal Access Token** fine-grained su GitHub con permesso
   *Contents: Read and write* **solo** su questo repository.
2. Apri `…/admin.html`, inserisci `utente/repo`, il branch e il token.
   Il token resta salvato solo nel `localStorage` del browser: non finisce mai
   nel repo.
3. Aggiungi/modifica/riordina i progetti e premi **Salva su GitHub**. Il commit
   parte in automatico; dopo il deploy di Pages (~1 min) la pagina è aggiornata.

> La pagina admin ha `noindex`. Per tenerla privata puoi anche non pubblicarla
> su Pages e aprirla solo in locale, oppure metterla in un repo separato.

## Aggiornare i link delle demo dal VPS

Quando l'URL del tunnel cambia (es. nuovo quick tunnel Cloudflare), aggiorna
`data/links.json` senza toccare il resto:

```sh
GITHUB_TOKEN=github_pat_xxx \
BRIDGE_REPO=davidebr90/progetti-bridge \
node scripts/update-link.mjs warmageddon https://nuovo-url.trycloudflare.com
```

Variabili: `GITHUB_TOKEN` (PAT con *Contents: write*), `BRIDGE_REPO`
(`utente/repo`), opzionali `BRIDGE_BRANCH` (default `main`) e `BRIDGE_FILE`
(default `data/links.json`). Lo script committa solo se il valore cambia, così
non genera commit inutili.

Le chiavi (`demoKey` nei progetti) collegano progetto → URL: nel JSON di un
progetto `"demoKey": "warmageddon"` prende il link da `links.json["warmageddon"]`.
Se il valore è vuoto, la modale mostra "Demo offline" invece del pulsante.

Esempio d'uso tipico: nello script che avvia il tunnel sul VPS, dopo aver letto
il nuovo URL, richiama `update-link.mjs` con la chiave giusta.

## Contenuti — schema di un progetto

```jsonc
{
  "id": "warmageddon",          // univoco
  "title": "wArmageddon",
  "tagline": "Demone WhatsApp self-hosted",
  "description": "…",
  "status": "beta",             // live | beta | wip
  "accent": "#0f8a5f",          // colore d'accento della card/modale
  "logo": "",                    // URL immagine (vuoto = monogramma)
  "tags": ["TypeScript", "React"],
  "demoKey": "warmageddon",     // chiave in links.json (vuoto = nessuna demo)
  "repo": "https://github.com/…", // vuoto = nessun pulsante codice
  "screenshots": ["url1", "url2"],
  "highlights": ["punto 1", "punto 2"]
}
```
