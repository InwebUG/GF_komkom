# GF-Dashboard – Kontext für das Modul „Vertragsgenerator"

Dies ist das Geschäftsführungs-Dashboard der **Kompetenz Kompanie** (statischer
Klick-Prototyp, live unter https://gf-komkom.inweb.page). Du baust **ein neues
Untermodul: den Vertragsgenerator**. Halte dich an die bestehenden Muster.

## ⚠️ Wichtigste Regeln (bitte strikt befolgen)
- **Arbeite NUR im Branch `vertragsgenerator`.** Niemals auf `main` pushen – `main`
  ist geschützt (Merge nur per Pull Request mit Freigabe). Direkte Pushes auf `main`
  werden von GitHub abgelehnt.
- **Bleib in deinem Modul.** Bestehende Seiten/Logik (Finanzen, Akquise, …) nur
  anfassen, wenn es für die Einbindung des Vertragsgenerators nötig ist.
- **Kein Build-Tooling, keine Frameworks.** Reines HTML/CSS/JS (Vanilla, ES5-Stil
  wie im Bestand). Charts via Chart.js per CDN. Keine npm-Abhängigkeiten einführen.
- **Demo-Modus darf NIE ins Backend schreiben** – dieser Schutz existiert bereits
  (`KK_DEMO_MODE`-Guards in `kkPersistModule`/`kkSaveModule`/`saveAndReload`). Nicht
  umgehen.
- **Keine Secrets committen.** Der Supabase-anon-Key in `assets/js/supabase.js` ist
  bewusst öffentlich (per RLS abgesichert). Keine weiteren Keys hinzufügen.

## Projektstruktur
- `*.html` – je eine Seite pro Modul (`dashboard.html`, `finanzen.html`,
  `akquise.html`, `teilnehmer.html`, `trainings.html`, `index.html` = Login …).
- `assets/js/app.js` – gemeinsame Shell & Logik: `kkShell()` (Sidebar/Topbar/Breadcrumb),
  `kkBoot()` (lädt Moduldaten, ruft Render-Funktion), Login-Guard, Formatierer
  (`fmtEUR`, `fmtNum`, `fmtPct` – null-sicher), der generische **Daten-Editor**
  (`kkOpenEditor`) inkl. Schemas `KK_EDIT_SCHEMA` / `KK_SECTIONS` / `KK_DB_MAP`,
  Navigation `KK_NAV`, `KK_PAGE_MODULE`.
- `assets/js/data.js` – Demo-Daten (Objekt `KK`).
- `assets/js/supabase.js` – Supabase-Client (`sb`), `KK_CUSTOMER_ID`.
- `assets/css/style.css` – komplettes Styling (CSS-Variablen, Branding).

## Branding & Konventionen
- Schrift **Roboto Condensed**; Akzent-Orange `#E47A3D`, Creme `#FFF6F0` (siehe
  `:root` in `style.css`). Wiederverwendbare Klassen: `.card`, `.kpi`, `.kk-table`,
  `.badge`, `.btn`, `.grid grid-2/3/4`, `.section-head` …
- **UI-Texte auf Deutsch.** Code-Stil & Kommentare wie im Bestand.
- Neue Seite = HTML-Datei nach Vorbild von `akquise.html`/`finanzen.html` aufbauen
  (gleiche `<head>`-Includes, `kkShell({...})`, `kkChartDefaults()`, `kkBoot(...)`).
- Navigation: neuen Eintrag in `KK_NAV` (in `app.js`) ergänzen; ein Icon in
  `KK_ICONS` hinzufügen.
- **Cloudflare Pages liefert URLs ohne `.html`** (`/finanzen` statt `/finanzen.html`).
  `kkShell` normalisiert den Seitennamen bereits – bei seiten-/pfadabhängiger Logik
  immer an die `.html`-lose URL denken.

## Daten / Backend (Supabase)
- Demo-Daten in `data.js` (`KK.<modul>`). Im Normalbetrieb werden sie aus Supabase
  überlagert; offline via `localStorage`.
- Pro Modul: typisierte Spalten + JSONB-Listen, gemappt über `KK_DB_MAP`. Editier-Felder
  über `KK_EDIT_SCHEMA` (unterstützt `text`/`num`/`select`), Sektionen über `KK_SECTIONS`.
- Für ein **neues** Modul mit Persistenz: neue Tabelle `customer_content.komkom_*`
  nötig – das richtet **InwebUG** ein, nicht selbst migrieren. Andere Kunden-Daten im
  Schema `customer_content` NICHT anfassen. customer_id dieses Mandanten:
  `adfe5b1a-742c-4120-9e74-6b97e94f8a5d`.
- Für einen ersten Wurf reicht ein **rein clientseitiges** Modul (Demo-Daten in
  `data.js`), ohne Backend – das ist der empfohlene Start.

## Lokal testen
`index.html` im Browser öffnen (kein Server nötig). Login akzeptiert im
Offline-/Demo-Fallback jede zugelassene E-Mail. Für die echte Vorschau baut
Cloudflare Pages pro Branch automatisch eine Preview-URL.

## Workflow
1. Commits in den Branch `vertragsgenerator`.
2. Pull Request → `main` öffnen.
3. InwebUG previewt (Cloudflare-Preview), gibt frei (Approval) und merged.
