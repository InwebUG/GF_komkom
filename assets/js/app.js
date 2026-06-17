/* ============================================================
   GF-Dashboard – gemeinsame App-Logik (Shell, Login, Helfer)
   ============================================================ */

/* ---------- Login-Guard (Supabase-Session) ---------- */
(function () {
  const isLogin = /(^|\/)index\.html$/.test(location.pathname) || /\/$/.test(location.pathname);
  if (isLogin) return;
  if (typeof sb === 'undefined' || !sb) {
    // Offline-/Demo-Fallback ohne Supabase-Lib
    if (sessionStorage.getItem('kk_login') !== '1') location.replace('index.html');
    return;
  }
  sb.auth.getSession().then(({ data }) => {
    if (!data.session) location.replace('index.html');
  });
})();

async function kkLogin(ev) {
  ev.preventDefault();
  const email = (document.getElementById('login-user').value || '').trim();
  const pass = (document.getElementById('login-pass').value || '');
  const errBox = document.getElementById('login-error');
  if (errBox) errBox.textContent = '';

  // Nur zugelassene Domains werden überhaupt an Supabase übergeben
  if (!/@(inweb\.page|kompetenzkompanie\.de)$/i.test(email)) {
    if (errBox) errBox.textContent = 'Nur E-Mail-Adressen mit @inweb.page oder @kompetenzkompanie.de sind zugelassen.';
    return false;
  }

  if (typeof sb === 'undefined' || !sb) {
    // Fallback ohne Supabase: Demo-Login
    sessionStorage.setItem('kk_login', '1');
    sessionStorage.setItem('kk_user', email || 'Gast');
    location.href = 'dashboard.html';
    return false;
  }

  const btn = ev.target.querySelector('button[type="submit"]');
  if (btn) { btn.disabled = true; btn.dataset.label = btn.textContent; btn.textContent = 'Anmelden …'; }

  const { error } = await sb.auth.signInWithPassword({ email: email, password: pass });
  if (error) {
    if (errBox) errBox.textContent = 'Anmeldung fehlgeschlagen. Bitte E-Mail und Passwort prüfen.';
    if (btn) { btn.disabled = false; btn.textContent = btn.dataset.label || 'Anmelden'; }
    return false;
  }
  sessionStorage.setItem('kk_user', email);
  location.href = 'dashboard.html';
  return false;
}

async function kkLogout() {
  sessionStorage.removeItem('kk_login');
  sessionStorage.removeItem('kk_user');
  if (typeof sb !== 'undefined' && sb) { try { await sb.auth.signOut(); } catch (e) { /* ignore */ } }
  location.href = 'index.html';
}

/* Mobile-Navigation (Burger) auf-/zuklappen */
function kkToggleNav() {
  const bar = document.querySelector('.sidebar');
  if (!bar) return;
  const open = bar.classList.toggle('open');
  const burger = bar.querySelector('.kk-burger');
  if (burger) burger.setAttribute('aria-expanded', open ? 'true' : 'false');
}

/* Passwort beim Login ein-/ausblenden */
function kkTogglePassword(btn) {
  const inp = document.getElementById('login-pass');
  if (!inp) return;
  const show = inp.type === 'password';
  inp.type = show ? 'text' : 'password';
  btn.textContent = show ? 'Verbergen' : 'Anzeigen';
  btn.setAttribute('aria-label', show ? 'Passwort verbergen' : 'Passwort anzeigen');
}

/* ---------- Formatierung ---------- */
const fmtEUR = (n) => n.toLocaleString('de-DE', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 });
const fmtEUR2 = (n) => n.toLocaleString('de-DE', { style: 'currency', currency: 'EUR', minimumFractionDigits: 2 });
const fmtNum = (n) => n.toLocaleString('de-DE');
const fmtPct = (n) => n.toLocaleString('de-DE', { minimumFractionDigits: 1, maximumFractionDigits: 1 }) + ' %';

/* ---------- "Wird implementiert"-Hinweis ---------- */
function wirdImplementiert(feature) {
  let toast = document.getElementById('kk-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'kk-toast';
    document.body.appendChild(toast);
  }
  toast.innerHTML = '<span class="toast-dot"></span><span><strong>Wird implementiert:</strong> ' + feature + '</span>';
  toast.classList.add('show');
  clearTimeout(window.__kkToastTimer);
  window.__kkToastTimer = setTimeout(() => toast.classList.remove('show'), 3200);
}

/* ---------- Icons (inline SVG, stroke = currentColor) ---------- */
const KK_ICONS = {
  home: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>',
  euro: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 4.5A7.5 7.5 0 0 0 7.5 12 7.5 7.5 0 0 0 14 19.5"/><line x1="4" y1="10" x2="12" y2="10"/><line x1="4" y1="14" x2="12" y2="14"/></svg>',
  users: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>',
  target: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>',
  cal: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>',
  report: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="8" y1="13" x2="16" y2="13"/><line x1="8" y1="17" x2="13" y2="17"/></svg>',
  bell: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>',
  trend: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>',
  gear: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>',
  logout: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>'
};

/* ---------- Navigation ---------- */
const KK_NAV = [
  { sec: 'Übersicht' },
  { href: 'dashboard.html', icon: 'home', label: 'Dashboard' },
  { sec: 'Module' },
  { href: 'finanzen.html', icon: 'euro', label: 'Finanzen' },
  { href: 'teilnehmer.html', icon: 'users', label: 'Teilnehmer' },
  { href: 'akquise.html', icon: 'target', label: 'Akquise' },
  { href: 'trainings.html', icon: 'cal', label: 'Trainings' },
  // "Steuerung" vorerst ausgeblendet (nicht gelöscht). Zum Wieder-Einblenden
  // einfach hidden:false setzen bzw. die Eigenschaft entfernen.
  { sec: 'Steuerung', hidden: true },
  { href: 'forecast.html', icon: 'trend', label: 'Forecast & Ziele', hidden: true },
  { href: 'alerts.html', icon: 'bell', label: 'Alerts', hidden: true },
  { href: 'berichte.html', icon: 'report', label: 'Berichte & Export', hidden: true },
  { href: 'einstellungen.html', icon: 'gear', label: 'Einstellungen', hidden: true }
];

/* ---------- Shell (Sidebar + Topbar) rendern ---------- */
function kkShell(opts) {
  const { title, subtitle } = opts;
  const here = location.pathname.split('/').pop() || 'index.html';

  const navHtml = KK_NAV.filter((item) => !item.hidden).map((item) => {
    if (item.sec) return '<div class="sidebar-section">' + item.sec + '</div>';
    const active = item.href === here ? ' class="active"' : '';
    return '<a href="' + item.href + '"' + active + ' title="' + item.label + '">' +
      KK_ICONS[item.icon] + '<span class="nav-label">' + item.label + '</span></a>';
  }).join('');

  const sidebar = document.createElement('aside');
  sidebar.className = 'sidebar';
  sidebar.innerHTML =
    '<div class="sidebar-top">' +
      '<button class="kk-burger" type="button" aria-label="Menü öffnen/schließen" aria-expanded="false" onclick="kkToggleNav()">' +
        '<span></span><span></span><span></span>' +
      '</button>' +
      '<a class="sidebar-logo" href="dashboard.html" title="Zum Dashboard">' +
        '<img class="logo-mark" src="Logo.png" alt="KompetenzKompanie">' +
        '<img class="logo-wordmark" src="Logo_lang.png" alt="KompetenzKompanie">' +
      '</a>' +
    '</div>' +
    '<nav>' + navHtml + '</nav>' +
    '<div class="sidebar-footer">' +
      '<button class="btn-logout" onclick="kkLogout()" title="Abmelden">' +
        KK_ICONS.logout + '<span class="logout-label">Abmelden</span></button>' +
    '</div>';

  const user = sessionStorage.getItem('kk_user') || KK.meta.nutzer.name;
  const initials = user.split(/\s+/).map((w) => w[0]).join('').toUpperCase().slice(0, 2);

  const editMod = KK_PAGE_MODULE[here];
  const editBtn = editMod
    ? '<button class="btn btn-sm btn-edit" onclick="kkOpenEditor(\'' + editMod + '\')">✎ Alle Daten bearbeiten</button>'
    : '';
  const showData = !!editMod || here === 'dashboard.html';
  const demoSwitch = showData
    ? '<label class="demo-switch" title="Demo-Daten anzeigen (wird bei Seiten-Refresh zurückgesetzt)">' +
        '<span class="demo-switch-label">Demo-Daten</span>' +
        '<span class="toggle"><input type="checkbox" id="kk-demo-toggle"' + (KK_DEMO_MODE ? ' checked' : '') + ' onchange="kkSetDemoMode(this.checked)"><span class="slider"></span></span>' +
      '</label>'
    : '';

  const topbar = document.createElement('div');
  topbar.className = 'topbar';
  topbar.innerHTML =
    '<div class="page-title"><h1>' + title + '</h1>' +
    (subtitle ? '<div class="subtitle">' + subtitle + '</div>' : '') + '</div>' +
    '<div class="topbar-right">' +
      demoSwitch +
      editBtn +
      '<div class="user-chip"><div class="avatar">' + initials + '</div>' + user + '</div>' +
    '</div>';

  // Breadcrumb: aktuellen Pfad (Bereich + Seite) aus der Navigation ableiten
  let sec = '';
  let pageLabel = title;
  for (const item of KK_NAV) {
    if (item.sec) { sec = item.sec; }
    else if (item.href === here) { pageLabel = item.label; break; }
  }
  const breadcrumb = document.createElement('nav');
  breadcrumb.className = 'breadcrumb';
  breadcrumb.setAttribute('aria-label', 'Pfad');
  breadcrumb.innerHTML =
    '<a href="dashboard.html" title="Startseite">' + KK_ICONS.home + '</a>' +
    (sec ? '<span class="sep">/</span><span>' + sec + '</span>' : '') +
    '<span class="sep">/</span><span class="crumb-current">' + pageLabel + '</span>';

  const main = document.querySelector('.main');
  document.body.insertBefore(sidebar, document.body.firstChild);
  main.insertBefore(topbar, main.firstChild);
  main.insertBefore(breadcrumb, main.firstChild);
  document.title = title + ' · GF-Dashboard · Kompetenz Kompanie';
}

/* ---------- Chart.js Defaults im KomKom-Branding ---------- */
function kkChartDefaults() {
  if (typeof Chart === 'undefined') return;
  Chart.defaults.font.family = "'Roboto Condensed', Arial, sans-serif";
  Chart.defaults.font.size = 13;
  Chart.defaults.color = '#70706F';
  Chart.defaults.borderColor = '#DDDEDF';
  Chart.defaults.plugins.legend.labels.usePointStyle = true;
  Chart.defaults.plugins.legend.labels.boxWidth = 8;
}
const KK_COLORS = {
  orange: '#E47A3D', orangeLight: '#F3C09D', peach: '#FFEDE2',
  dark: '#363636', gray: '#B2B2B2', border: '#DDDEDF',
  green: '#5C9E6B', yellow: '#E4B43D', red: '#CC4B3B'
};

/* ---------- Ampel-Logik ---------- */
function ampel(istAnteil) {
  // istAnteil = Ist/Soll relativ zum Jahresfortschritt
  if (istAnteil >= 0.95) return 'green';
  if (istAnteil >= 0.8) return 'yellow';
  return 'red';
}
function ampelDot(stufe) {
  return '<span class="ampel ampel-' + stufe + '"></span>';
}

/* ---------- Quellen-Tag ---------- */
function srcTag(text) {
  return '<span class="source-tag">⛁ ' + text + '</span>';
}

/* ============================================================
   Daten-Eingabe (Prototyp): manuelle Werte überlagern die
   Demo-Daten aus data.js. Persistenz vorerst per localStorage –
   im nächsten Schritt ersetzt durch Supabase (customer_content.komkom_*).
   ============================================================ */

const KK_STORE_KEY = 'kk_data_v1';

/* Welche Seite bearbeitet welches Modul */
const KK_PAGE_MODULE = {
  'finanzen.html': 'finanzen',
  'teilnehmer.html': 'teilnehmer',
  'akquise.html': 'akquise',
  'trainings.html': 'trainings'
};

/* Pfad-Helfer für verschachtelte Objekte ("liquiditaet.kontostand") */
function kkGetPath(obj, path) {
  return path.split('.').reduce((o, k) => (o == null ? undefined : o[k]), obj);
}
function kkSetPath(obj, path, val) {
  const keys = path.split('.');
  let o = obj;
  for (let i = 0; i < keys.length - 1; i++) {
    if (o[keys[i]] == null || typeof o[keys[i]] !== 'object') o[keys[i]] = {};
    o = o[keys[i]];
  }
  o[keys[keys.length - 1]] = val;
}

function kkLoadStore() {
  try { return JSON.parse(localStorage.getItem(KK_STORE_KEY)) || {}; }
  catch (e) { return {}; }
}
function kkSaveModule(modKey, data) {
  const store = kkLoadStore();
  store[modKey] = data;
  localStorage.setItem(KK_STORE_KEY, JSON.stringify(store));
}
function kkResetModule(modKey) {
  const store = kkLoadStore();
  delete store[modKey];
  localStorage.setItem(KK_STORE_KEY, JSON.stringify(store));
}
/* Demo-Daten mit gespeicherten Eingaben überschreiben (vor dem Rendern) */
function kkApplyOverrides() {
  if (typeof KK === 'undefined') return;
  const store = kkLoadStore();
  Object.keys(store).forEach((mod) => { if (KK[mod] && store[mod]) KK[mod] = store[mod]; });
}

/* ============================================================
   Supabase: Lesen/Schreiben der Modul-Daten (customer_content.komkom_*)
   ============================================================ */

/* Pristine Demo-Daten (Snapshot vor jeglicher Überlagerung) – für „Zurücksetzen" */
const KK_DEMO = (typeof KK !== 'undefined') ? JSON.parse(JSON.stringify(KK)) : {};

/* Demo-Modus-Schalter.
   - Umschalten lädt die Seite neu (zuverlässig, auch beim Zurückschalten).
   - Ein manueller Refresh setzt Demo wieder auf "aus" (ohne Logout).
   Unterscheidung über ein einmaliges Reload-Flag in sessionStorage. */
let KK_DEMO_MODE = false;
let KK_BOOT_KEYS = [];
let KK_RENDER_FN = null;
(function kkInitDemoMode() {
  try {
    if (sessionStorage.getItem('kk_demo_reload') === '1') {
      sessionStorage.removeItem('kk_demo_reload');           // vom Umschalten -> Zustand behalten
      KK_DEMO_MODE = sessionStorage.getItem('kk_demo_on') === '1';
    } else {
      sessionStorage.removeItem('kk_demo_on');               // manueller Refresh/Erstaufruf -> aus
      KK_DEMO_MODE = false;
    }
  } catch (e) { KK_DEMO_MODE = false; }
})();

/* Untermodule (Sektionen) je Modul – für sektionsweises Bearbeiten/Speichern.
   Referenzieren scalars (per Pfad), lists (per key) und series (per Pfad). */
const KK_SECTIONS = {
  finanzen: {
    jahresvergleich: { label: 'Jahresvergleich', lists: ['jahresvergleich'], series: ['monatsumsatz2026'] },
    rechnungen:      { label: 'Ausstehende Rechnungen', lists: ['offeneRechnungen', 'geplanteRechnungen'] },
    kosten:          { label: 'Anstehende Kosten & Liquidität', scalars: ['liquiditaet.kontostand', 'liquiditaet.kontostandDatum', 'liquiditaet.forecast.minimum'], lists: ['fixkosten'], series: ['liquiditaet.forecast'] }
  },
  teilnehmer: {
    kennzahlen:  { label: 'Kennzahlen', scalars: ['aktuellInAusbildung', 'baldFertig', 'gesamtAktiv', 'gesamtAbsolventen', 'anzahlModuleLaufend', 'tnTageYtd', 'jahresdurchschnittTn'] },
    entwicklung: { label: 'Entwicklung Teilnehmerzahlen', series: ['entwicklungTn'] },
    produkte:    { label: 'TN nach Produkt', lists: ['tnProProdukt'] }
  },
  akquise: {
    funnel:    { label: 'Akquise-Funnel', scalars: ['funnel.anfragen', 'funnel.angebote', 'funnel.auftraege', 'funnel.zeitraum'] },
    anfragen:  { label: 'Neue Anfragen', lists: ['anfragen'] },
    angebote:  { label: 'Angebote', lists: ['angebote'] },
    auftraege: { label: 'Auftragsbestätigungen', lists: ['auftragsbestaetigungen'] }
  },
  trainings: {
    tage:      { label: 'Trainingstage & No-Show', scalars: ['tageAbsolviert', 'tageGeplant', 'tageGesamtJahr', 'noShow.monat', 'noShow.jahr', 'noShow.noShows30Tage', 'noShow.tn30Tage'], series: ['monatsTage', 'noShowVerlauf'] },
    kosten:    { label: 'Kosten & Auslastung', scalars: ['auslastung.min', 'auslastung.max', 'auslastung.durchschnitt', 'auslastung.zielMin', 'kosten.trainerProTag', 'kosten.raumProTag', 'kosten.gesamtProTagOe'] },
    produkte:  { label: 'TN & Tage pro Produkt', lists: ['tnProProdukt'] },
    anstehend: { label: 'Anstehende Trainings', lists: ['anstehend'] }
  }
};

/* Mapping DB-Spalte <-> KK-Pfad. json = JSONB-Spalten (Listen/Reihen). */
const KK_DB_MAP = {
  finanzen: {
    table: 'komkom_finanzen',
    scalars: [['kontostand', 'liquiditaet.kontostand'], ['kontostand_datum', 'liquiditaet.kontostandDatum'], ['liquiditaet_minimum', 'liquiditaet.forecast.minimum']],
    json: [['jahresvergleich', 'jahresvergleich'], ['monatsumsatz', 'monatsumsatz2026'], ['offene_rechnungen', 'offeneRechnungen'], ['geplante_rechnungen', 'geplanteRechnungen'], ['fixkosten', 'fixkosten'], ['liquiditaet_forecast', 'liquiditaet.forecast']]
  },
  teilnehmer: {
    table: 'komkom_teilnehmer',
    scalars: [['aktuell_in_ausbildung', 'aktuellInAusbildung'], ['bald_fertig', 'baldFertig'], ['gesamt_aktiv', 'gesamtAktiv'], ['gesamt_absolventen', 'gesamtAbsolventen'], ['anzahl_module_laufend', 'anzahlModuleLaufend'], ['tn_tage_ytd', 'tnTageYtd'], ['jahresdurchschnitt_tn', 'jahresdurchschnittTn']],
    json: [['beginn_anstehend', 'beginnAnstehend'], ['bald_fertig_liste', 'baldFertigListe'], ['entwicklung_tn', 'entwicklungTn'], ['tn_pro_produkt', 'tnProProdukt']]
  },
  akquise: {
    table: 'komkom_akquise',
    scalars: [['funnel_anfragen', 'funnel.anfragen'], ['funnel_angebote', 'funnel.angebote'], ['funnel_auftraege', 'funnel.auftraege'], ['funnel_zeitraum', 'funnel.zeitraum']],
    json: [['angebote', 'angebote'], ['auftragsbestaetigungen', 'auftragsbestaetigungen'], ['anfragen', 'anfragen']]
  },
  trainings: {
    table: 'komkom_trainings',
    scalars: [['tage_absolviert', 'tageAbsolviert'], ['tage_geplant', 'tageGeplant'], ['tage_gesamt_jahr', 'tageGesamtJahr'], ['no_show_monat', 'noShow.monat'], ['no_show_jahr', 'noShow.jahr'], ['no_shows_30_tage', 'noShow.noShows30Tage'], ['tn_30_tage', 'noShow.tn30Tage'], ['auslastung_min', 'auslastung.min'], ['auslastung_max', 'auslastung.max'], ['auslastung_durchschnitt', 'auslastung.durchschnitt'], ['auslastung_ziel_min', 'auslastung.zielMin'], ['kosten_trainer_pro_tag', 'kosten.trainerProTag'], ['kosten_raum_pro_tag', 'kosten.raumProTag'], ['kosten_gesamt_pro_tag_oe', 'kosten.gesamtProTagOe']],
    json: [['monats_tage', 'monatsTage'], ['no_show_verlauf', 'noShowVerlauf'], ['tn_pro_produkt', 'tnProProdukt'], ['anstehend', 'anstehend']]
  }
};

function kkSupabaseReady() { return (typeof sb !== 'undefined' && sb); }
function kkTable(modKey) { return sb.schema('customer_content').from(KK_DB_MAP[modKey].table); }

/* DB-Zeile -> KK[modKey] (mutiert das vorhandene Objekt, Defaults bleiben für Unbekanntes) */
function kkRowToModule(modKey, row) {
  const map = KK_DB_MAP[modKey];
  const target = KK[modKey];
  map.json.forEach(([col, path]) => { if (row[col] != null) kkSetPath(target, path, row[col]); });
  map.scalars.forEach(([col, path]) => { if (row[col] != null) kkSetPath(target, path, row[col]); });
}

/* KK-Quelle -> DB-Zeile (für Upsert). allowedPaths (optional) = nur diese
   KK-Pfade aufnehmen (für sektionsweises Teil-Speichern). */
function kkModuleToRow(modKey, src, allowedPaths) {
  const map = KK_DB_MAP[modKey];
  const row = { customer_id: KK_CUSTOMER_ID };
  const ok = (path) => !allowedPaths || allowedPaths.indexOf(path) !== -1;
  map.scalars.forEach(([col, path]) => { if (!ok(path)) return; const v = kkGetPath(src, path); row[col] = (v === undefined ? null : v); });
  map.json.forEach(([col, path]) => { if (!ok(path)) return; const v = kkGetPath(src, path); row[col] = (v === undefined || v === null ? {} : v); });
  return row;
}

/* KK-Pfade einer Sektion (scalars+lists+series entsprechen den DB-Map-Pfaden) */
function kkSectionPaths(sectionSpec) {
  return [].concat(sectionSpec.scalars || [], sectionSpec.lists || [], sectionSpec.series || []);
}

/* Modul live aus Supabase laden (falls Zeile existiert) */
async function kkFetchModule(modKey) {
  if (!kkSupabaseReady() || !KK_DB_MAP[modKey]) return false;
  try {
    const { data, error } = await kkTable(modKey)
      .select('*').eq('customer_id', KK_CUSTOMER_ID).maybeSingle();
    if (error) { console.warn('Supabase-Lesefehler (' + modKey + '):', error.message); return false; }
    if (data) { kkRowToModule(modKey, data); return true; }
  } catch (e) { console.warn('Supabase-Lesefehler (' + modKey + '):', e); }
  return false;
}

/* Module in KK laden: Basis = Demo-Daten; im Normalbetrieb mit Supabase
   überlagert (offline: localStorage). Im Demo-Modus bleibt es bei den Demo-Daten. */
async function kkLoadModules(keys) {
  await Promise.all(keys.map(async (k) => {
    if (KK_DEMO[k]) KK[k] = JSON.parse(JSON.stringify(KK_DEMO[k]));   // immer Demo-Basis
    if (KK_DEMO_MODE) return;                                          // Demo-Modus: nicht überlagern
    if (kkSupabaseReady()) { await kkFetchModule(k); }
    else { const store = kkLoadStore(); if (store[k]) KK[k] = store[k]; }
  }));
}

/* Vor dem Rendern: Module laden, dann renderFn() ausführen. renderFn wird für
   das spätere Umschalten des Demo-Modus gemerkt. modKeys: String oder Array. */
async function kkBoot(modKeys, renderFn) {
  KK_BOOT_KEYS = Array.isArray(modKeys) ? modKeys : [modKeys];
  KK_RENDER_FN = renderFn;
  try { await kkLoadModules(KK_BOOT_KEYS); }
  catch (e) { console.warn('kkBoot:', e); }
  renderFn();
}

/* Demo-Modus umschalten: Zustand merken und Seite neu laden (zuverlässig). */
function kkSetDemoMode(on) {
  try {
    if (on) sessionStorage.setItem('kk_demo_on', '1');
    else sessionStorage.removeItem('kk_demo_on');
    sessionStorage.setItem('kk_demo_reload', '1');           // Reload ist gewollt -> Zustand behalten
  } catch (e) { /* ignore */ }
  location.reload();
}

/* Modul (oder nur eine Sektion) in Supabase speichern (Upsert). */
async function kkPersistModule(modKey, src, allowedPaths) {
  if (!kkSupabaseReady()) return false;
  const row = kkModuleToRow(modKey, src, allowedPaths);
  const { error } = await kkTable(modKey).upsert(row, { onConflict: 'customer_id' });
  if (error) { console.warn('Supabase-Schreibfehler (' + modKey + '):', error.message); alert('Speichern in Supabase fehlgeschlagen:\n' + error.message); return false; }
  return true;
}

/* Modul-Daten in Supabase löschen (für „Zurücksetzen") */
async function kkDeleteModule(modKey) {
  if (!kkSupabaseReady()) return false;
  const { error } = await kkTable(modKey).delete().eq('customer_id', KK_CUSTOMER_ID);
  if (error) { console.warn('Supabase-Löschfehler (' + modKey + '):', error.message); return false; }
  return true;
}

/* ---------- Editor-Schema (spiegelt die Supabase-Spalten) ---------- */
const KK_EDIT_SCHEMA = {
  finanzen: {
    label: 'Finanzen',
    scalars: [
      { path: 'liquiditaet.kontostand', label: 'Kontostand (€)', kind: 'num' },
      { path: 'liquiditaet.kontostandDatum', label: 'Kontostand-Datum', kind: 'text' },
      { path: 'liquiditaet.forecast.minimum', label: 'Liquiditäts-Minimum (€)', kind: 'num' }
    ],
    lists: [
      { key: 'jahresvergleich', label: 'Jahresvergleich', cols: [
        { k: 'jahr', label: 'Jahr', kind: 'text' }, { k: 'umsatz', label: 'Umsatz', kind: 'num' },
        { k: 'kosten', label: 'Kosten', kind: 'num' }, { k: 'gewinn', label: 'EÜ/Gewinn', kind: 'num' } ] },
      { key: 'offeneRechnungen', label: 'Offene Rechnungen', cols: [
        { k: 'nr', label: 'Nr.', kind: 'text' }, { k: 'kunde', label: 'Kunde', kind: 'text' },
        { k: 'betrag', label: 'Betrag', kind: 'num' }, { k: 'datum', label: 'Datum', kind: 'text' },
        { k: 'faellig', label: 'Fällig', kind: 'text' }, { k: 'tageUeberfaellig', label: 'Tage überf.', kind: 'num' } ] },
      { key: 'geplanteRechnungen', label: 'Geplante Rechnungen', cols: [
        { k: 'kunde', label: 'Kunde', kind: 'text' }, { k: 'leistung', label: 'Leistung', kind: 'text' },
        { k: 'betrag', label: 'Betrag', kind: 'num' }, { k: 'geplant', label: 'Geplant zum', kind: 'text' } ] },
      { key: 'fixkosten', label: 'Fixkosten & variable Kosten', cols: [
        { k: 'posten', label: 'Posten', kind: 'text' }, { k: 'betrag', label: 'Betrag/Monat', kind: 'num' },
        { k: 'faellig', label: 'Fälligkeit', kind: 'text' }, { k: 'art', label: 'Art (fix/variabel)', kind: 'text' } ] }
    ],
    series: [
      { path: 'monatsumsatz2026', label: 'Monatsumsatz 2026', valueKeys: [
        { k: 'umsatz', label: 'Umsatz' }, { k: 'kosten', label: 'Kosten' } ] },
      { path: 'liquiditaet.forecast', label: 'Liquiditäts-Forecast', valueKeys: [
        { k: 'werte', label: 'Wert' } ] }
    ]
  },
  teilnehmer: {
    label: 'Teilnehmer',
    scalars: [
      { path: 'aktuellInAusbildung', label: 'In Ausbildung', kind: 'num' },
      { path: 'baldFertig', label: 'Bald fertig (1 Modul)', kind: 'num' },
      { path: 'gesamtAktiv', label: 'Gesamt aktiv', kind: 'num' },
      { path: 'gesamtAbsolventen', label: 'Absolventen gesamt', kind: 'num' },
      { path: 'anzahlModuleLaufend', label: 'Module laufend', kind: 'num' },
      { path: 'tnTageYtd', label: 'TN-Tage (YTD)', kind: 'num' },
      { path: 'jahresdurchschnittTn', label: 'Ø TN / Jahr', kind: 'num' }
    ],
    lists: [
      { key: 'beginnAnstehend', label: 'Anstehende Starts', cols: [
        { k: 'name', label: 'Gruppe', kind: 'text' }, { k: 'tn', label: 'TN', kind: 'num' },
        { k: 'start', label: 'Start', kind: 'text' } ] },
      { key: 'baldFertigListe', label: 'Bald fertig', cols: [
        { k: 'gruppe', label: 'Gruppe', kind: 'text' }, { k: 'tn', label: 'TN', kind: 'num' },
        { k: 'letztesModul', label: 'Letztes Modul', kind: 'text' }, { k: 'termin', label: 'Termin', kind: 'text' } ] },
      { key: 'tnProProdukt', label: 'TN pro Produkt', cols: [
        { k: 'produkt', label: 'Produkt', kind: 'text' }, { k: 'tn', label: 'TN', kind: 'num' } ] }
    ],
    series: [
      { path: 'entwicklungTn', label: 'TN-Entwicklung', valueKeys: [
        { k: 'aktiv', label: 'Aktiv' }, { k: 'absolventen', label: 'Absolventen' } ] }
    ]
  },
  akquise: {
    label: 'Akquise',
    scalars: [
      { path: 'funnel.anfragen', label: 'Funnel: Anfragen', kind: 'num' },
      { path: 'funnel.angebote', label: 'Funnel: Angebote', kind: 'num' },
      { path: 'funnel.auftraege', label: 'Funnel: Aufträge', kind: 'num' },
      { path: 'funnel.zeitraum', label: 'Funnel: Zeitraum', kind: 'text' }
    ],
    lists: [
      { key: 'angebote', label: 'Angebote', cols: [
        { k: 'kunde', label: 'Kunde', kind: 'text' }, { k: 'produkt', label: 'Produkt', kind: 'text' },
        { k: 'tn', label: 'TN', kind: 'num' }, { k: 'module', label: 'Module', kind: 'num' },
        { k: 'summe', label: 'Summe', kind: 'num' }, { k: 'datum', label: 'Datum', kind: 'text' },
        { k: 'status', label: 'Status', kind: 'text' } ] },
      { key: 'auftragsbestaetigungen', label: 'Auftragsbestätigungen', cols: [
        { k: 'kunde', label: 'Kunde', kind: 'text' }, { k: 'produkt', label: 'Produkt', kind: 'text' },
        { k: 'tn', label: 'TN', kind: 'num' }, { k: 'summe', label: 'Summe', kind: 'num' },
        { k: 'datum', label: 'Datum', kind: 'text' }, { k: 'start', label: 'Start', kind: 'text' } ] },
      { key: 'anfragen', label: 'Anfragen', cols: [
        { k: 'kunde', label: 'Kunde', kind: 'text' }, { k: 'thema', label: 'Thema', kind: 'text' },
        { k: 'eingang', label: 'Eingang', kind: 'text' }, { k: 'kanal', label: 'Kanal', kind: 'text' } ] }
    ],
    series: []
  },
  trainings: {
    label: 'Trainings',
    scalars: [
      { path: 'tageAbsolviert', label: 'Tage absolviert', kind: 'num' },
      { path: 'tageGeplant', label: 'Tage geplant', kind: 'num' },
      { path: 'tageGesamtJahr', label: 'Tage gesamt/Jahr', kind: 'num' },
      { path: 'noShow.monat', label: 'No-Show Monat (%)', kind: 'num' },
      { path: 'noShow.jahr', label: 'No-Show Jahr (%)', kind: 'num' },
      { path: 'noShow.noShows30Tage', label: 'No-Shows (30 T.)', kind: 'num' },
      { path: 'noShow.tn30Tage', label: 'TN (30 T.)', kind: 'num' },
      { path: 'auslastung.min', label: 'Auslastung min', kind: 'num' },
      { path: 'auslastung.max', label: 'Auslastung max', kind: 'num' },
      { path: 'auslastung.durchschnitt', label: 'Auslastung Ø', kind: 'num' },
      { path: 'auslastung.zielMin', label: 'Auslastung Ziel-min', kind: 'num' },
      { path: 'kosten.trainerProTag', label: 'Trainer/Tag (€)', kind: 'num' },
      { path: 'kosten.raumProTag', label: 'Raum/Tag (€)', kind: 'num' },
      { path: 'kosten.gesamtProTagOe', label: 'Gesamt/Tag o.E. (€)', kind: 'num' }
    ],
    lists: [
      { key: 'tnProProdukt', label: 'TN pro Produkt', cols: [
        { k: 'produkt', label: 'Produkt', kind: 'text' }, { k: 'tn', label: 'TN', kind: 'num' },
        { k: 'tage', label: 'Tage', kind: 'num' }, { k: 'auslastung', label: 'Auslastung', kind: 'num' } ] },
      { key: 'anstehend', label: 'Anstehende Trainings', cols: [
        { k: 'datum', label: 'Datum', kind: 'text' }, { k: 'training', label: 'Training', kind: 'text' },
        { k: 'trainer', label: 'Trainer', kind: 'text' }, { k: 'tn', label: 'TN', kind: 'num' },
        { k: 'raum', label: 'Raum', kind: 'text' } ] }
    ],
    series: [
      { path: 'monatsTage', label: 'Trainingstage / Monat', valueKeys: [
        { k: 'absolviert', label: 'Absolviert' }, { k: 'geplant', label: 'Geplant' } ] },
      { path: 'noShowVerlauf', label: 'No-Show-Verlauf (%)', valueKeys: [
        { k: 'werte', label: 'Wert' } ] }
    ]
  }
};

/* ---------- Editor: Eingabe-Helfer ---------- */
function kkParseVal(raw, kind) {
  if (kind === 'num') {
    // Deutsches Format: Punkt = Tausender (entfernen), Komma = Dezimal (-> Punkt)
    const t = String(raw).trim().replace(/\./g, '').replace(',', '.');
    if (t === '' || t === '-') return null;
    const n = parseFloat(t);
    return isNaN(n) ? null : n;
  }
  return raw;
}

/* Zahl -> deutsches Anzeigeformat mit Tausenderpunkten (z. B. 318650 -> "318.650") */
function kkFmtNum(value) {
  if (value === null || value === undefined || value === '') return '';
  const n = Number(value);
  if (isNaN(n)) return '';
  return n.toLocaleString('de-DE', { maximumFractionDigits: 20 });
}

/* Live-Formatierung der Eingabe: gruppiert die Ganzzahl-Stellen mit "." und
   behält ein in Eingabe befindliches Dezimalkomma bei. */
function kkGroupInput(raw) {
  let s = String(raw).replace(/[^\d,-]/g, '');
  const neg = s.startsWith('-');
  s = s.replace(/-/g, '');
  const hasComma = s.indexOf(',') !== -1;
  const parts = s.split(',');
  let intPart = parts[0].replace(/^0+(?=\d)/, '');
  const decPart = parts.slice(1).join('');
  intPart = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  let out = (neg ? '-' : '') + intPart;
  if (hasComma) out += ',' + decPart;
  return out;
}

function kkInput(kind, value, onChange) {
  const inp = document.createElement('input');
  if (kind === 'num') {
    inp.type = 'text';
    inp.inputMode = 'decimal';
    inp.className = 'kk-num';
    inp.value = kkFmtNum(value);
    inp.addEventListener('input', () => {
      const fromEnd = inp.value.length - inp.selectionStart;
      const formatted = kkGroupInput(inp.value);
      inp.value = formatted;
      const pos = Math.max(0, formatted.length - fromEnd);
      try { inp.setSelectionRange(pos, pos); } catch (e) { /* ignore */ }
      onChange(kkParseVal(formatted, 'num'));
    });
  } else {
    inp.type = 'text';
    inp.value = (value === null || value === undefined) ? '' : value;
    inp.addEventListener('input', () => onChange(kkParseVal(inp.value, kind)));
  }
  return inp;
}

/* ---------- Editor öffnen ---------- */
function kkOpenEditor(modKey, sectionKey) {
  const schema = KK_EDIT_SCHEMA[modKey];
  if (!schema) return;
  const section = (sectionKey && KK_SECTIONS[modKey]) ? KK_SECTIONS[modKey][sectionKey] : null;
  const allowedPaths = section ? kkSectionPaths(section) : null;
  const inSec = (id) => !allowedPaths || allowedPaths.indexOf(id) !== -1;

  const scalars = (schema.scalars || []).filter((f) => inSec(f.path));
  const lists = (schema.lists || []).filter((l) => inSec(l.key));
  const series = (schema.series || []).filter((s) => inSec(s.path));

  // Entwurf (Sitzung): noch nicht gespeicherte Eingaben überleben Schließen/Refresh
  const draftKey = 'kk_draft:' + modKey + ':' + (sectionKey || 'all');
  const baseline = JSON.stringify(KK[modKey] || {});
  let work, draftRestored = false;
  const draftRaw = sessionStorage.getItem(draftKey);
  if (draftRaw) { try { work = JSON.parse(draftRaw); draftRestored = true; } catch (e) { work = JSON.parse(baseline); } }
  else { work = JSON.parse(baseline); }

  const isDirty = () => JSON.stringify(work) !== baseline;
  const clearDraft = () => sessionStorage.removeItem(draftKey);
  const persistDraft = () => { if (isDirty()) sessionStorage.setItem(draftKey, JSON.stringify(work)); else clearDraft(); };

  const titleLabel = section ? (schema.label + ' · ' + section.label) : ('Alle Daten · ' + schema.label);
  const subText = (section
    ? 'Nur dieses Untermodul wird gespeichert.'
    : 'Alle Kennzahlen und Listen dieses Moduls.')
    + (draftRestored ? ' · <strong style="color:var(--kk-orange)">Entwurf wiederhergestellt</strong>' : '');

  const overlay = document.createElement('div');
  overlay.className = 'kk-modal-overlay';
  const modal = document.createElement('div');
  modal.className = 'kk-modal';
  overlay.appendChild(modal);

  /* Kopf */
  const head = document.createElement('div');
  head.className = 'kk-modal-head';
  head.innerHTML =
    '<div><h2>' + titleLabel + '</h2>' +
    '<div class="modal-sub">' + subText + '</div></div>' +
    '<button class="kk-modal-close" title="Schließen">&times;</button>';
  modal.appendChild(head);

  /* Körper */
  const body = document.createElement('div');
  body.className = 'kk-modal-body';
  modal.appendChild(body);

  /* Jede Eingabe/Änderung als Entwurf in der Sitzung sichern */
  body.addEventListener('input', persistDraft);
  body.addEventListener('click', persistDraft);

  /* Kennzahlen */
  if (scalars.length) {
    const grp = document.createElement('div');
    grp.className = 'edit-group';
    grp.innerHTML = '<h3>Kennzahlen</h3>';
    const grid = document.createElement('div');
    grid.className = 'edit-scalars';
    scalars.forEach((f) => {
      const field = document.createElement('div');
      field.className = 'edit-field';
      const lbl = document.createElement('label');
      lbl.textContent = f.label;
      field.appendChild(lbl);
      field.appendChild(kkInput(f.kind, kkGetPath(work, f.path), (v) => kkSetPath(work, f.path, v)));
      grid.appendChild(field);
    });
    grp.appendChild(grid);
    body.appendChild(grp);
  }

  /* Listen (Tabellen) */
  lists.forEach((listDef) => {
    if (!Array.isArray(work[listDef.key])) work[listDef.key] = [];
    const grp = document.createElement('div');
    grp.className = 'edit-group';
    const h = document.createElement('h3');
    h.textContent = listDef.label;
    grp.appendChild(h);
    const wrap = document.createElement('div');
    wrap.className = 'edit-table-wrap';
    grp.appendChild(wrap);

    function renderTable() {
      const rows = work[listDef.key];
      const head = '<tr>' + listDef.cols.map((c) => '<th>' + c.label + '</th>').join('') + '<th></th></tr>';
      const tbl = document.createElement('table');
      tbl.className = 'edit-table';
      tbl.innerHTML = '<thead>' + head + '</thead>';
      const tbody = document.createElement('tbody');
      rows.forEach((row, i) => {
        const tr = document.createElement('tr');
        listDef.cols.forEach((c) => {
          const td = document.createElement('td');
          td.appendChild(kkInput(c.kind, row[c.k], (v) => { row[c.k] = v; }));
          tr.appendChild(td);
        });
        const tdDel = document.createElement('td');
        const del = document.createElement('button');
        del.className = 'row-del';
        del.title = 'Zeile löschen';
        del.innerHTML = '&times;';
        del.addEventListener('click', () => { rows.splice(i, 1); renderTable(); });
        tdDel.appendChild(del);
        tr.appendChild(tdDel);
        tbody.appendChild(tr);
      });
      tbl.appendChild(tbody);
      wrap.innerHTML = '';
      wrap.appendChild(tbl);
    }
    renderTable();

    const add = document.createElement('button');
    add.className = 'edit-add';
    add.textContent = '+ Zeile hinzufügen';
    add.addEventListener('click', () => {
      const blank = {};
      listDef.cols.forEach((c) => { blank[c.k] = c.kind === 'num' ? null : ''; });
      work[listDef.key].push(blank);
      renderTable();
    });
    grp.appendChild(add);
    body.appendChild(grp);
  });

  /* Diagramm-Reihen (Label + parallele Wertereihen) */
  series.forEach((sDef) => {
    let obj = kkGetPath(work, sDef.path);
    if (!obj || typeof obj !== 'object') { obj = {}; kkSetPath(work, sDef.path, obj); }
    if (!Array.isArray(obj.labels)) obj.labels = [];
    sDef.valueKeys.forEach((vk) => { if (!Array.isArray(obj[vk.k])) obj[vk.k] = []; });

    const grp = document.createElement('div');
    grp.className = 'edit-group';
    const h = document.createElement('h3');
    h.textContent = sDef.label;
    grp.appendChild(h);
    const wrap = document.createElement('div');
    wrap.className = 'edit-table-wrap';
    grp.appendChild(wrap);

    function renderSeries() {
      const n = obj.labels.length;
      const headCells = '<th>Periode</th>' + sDef.valueKeys.map((vk) => '<th>' + vk.label + '</th>').join('') + '<th></th>';
      const tbl = document.createElement('table');
      tbl.className = 'edit-table';
      tbl.innerHTML = '<thead><tr>' + headCells + '</tr></thead>';
      const tbody = document.createElement('tbody');
      for (let i = 0; i < n; i++) {
        const tr = document.createElement('tr');
        const tdL = document.createElement('td');
        tdL.appendChild(kkInput('text', obj.labels[i], (v) => { obj.labels[i] = v; }));
        tr.appendChild(tdL);
        sDef.valueKeys.forEach((vk) => {
          const td = document.createElement('td');
          td.appendChild(kkInput('num', obj[vk.k][i], (v) => { obj[vk.k][i] = v; }));
          tr.appendChild(td);
        });
        const tdDel = document.createElement('td');
        const del = document.createElement('button');
        del.className = 'row-del';
        del.title = 'Periode löschen';
        del.innerHTML = '&times;';
        del.addEventListener('click', () => {
          obj.labels.splice(i, 1);
          sDef.valueKeys.forEach((vk) => obj[vk.k].splice(i, 1));
          renderSeries();
        });
        tdDel.appendChild(del);
        tr.appendChild(tdDel);
        tbody.appendChild(tr);
      }
      tbl.appendChild(tbody);
      wrap.innerHTML = '';
      wrap.appendChild(tbl);
    }
    renderSeries();

    const add = document.createElement('button');
    add.className = 'edit-add';
    add.textContent = '+ Periode hinzufügen';
    add.addEventListener('click', () => {
      obj.labels.push('');
      sDef.valueKeys.forEach((vk) => obj[vk.k].push(null));
      renderSeries();
    });
    grp.appendChild(add);
    body.appendChild(grp);
  });

  /* Fuß */
  const foot = document.createElement('div');
  foot.className = 'kk-modal-foot';
  const left = document.createElement('div');
  left.className = 'edit-data-actions';
  left.innerHTML = '<span class="muted">Demo-Daten an/aus über den Schalter oben rechts.</span>';
  const right = document.createElement('div');
  right.style.display = 'flex';
  right.style.gap = '10px';
  const cancel = document.createElement('button');
  cancel.className = 'btn btn-sm btn-outline';
  cancel.textContent = 'Schließen';
  cancel.addEventListener('click', () => attemptClose());
  const save = document.createElement('button');
  save.className = 'btn btn-sm';
  save.textContent = section ? 'Übernehmen' : 'Speichern';
  save.addEventListener('click', () => saveAndReload(save));
  right.appendChild(cancel);
  right.appendChild(save);
  foot.appendChild(left);
  foot.appendChild(right);
  modal.appendChild(foot);

  /* Speichern -> Supabase (bzw. localStorage offline), Entwurf löschen, neu laden */
  async function saveAndReload(btn) {
    if (btn) { btn.disabled = true; btn.textContent = 'Speichern …'; }
    if (kkSupabaseReady()) {
      const ok = await kkPersistModule(modKey, work, allowedPaths);
      if (!ok) { if (btn) { btn.disabled = false; btn.textContent = section ? 'Übernehmen' : 'Speichern'; } return false; }
      kkResetModule(modKey);       // lokale Überlagerung entfernen
    } else {
      kkSaveModule(modKey, work);
    }
    clearDraft();
    location.reload();
    return true;
  }

  function destroy() { clearEsc(); overlay.remove(); }
  function clearEsc() { document.removeEventListener('keydown', escHandler); }
  function escHandler(e) { if (e.key === 'Escape') attemptClose(); }

  /* Beim Schließen mit ungespeicherten Änderungen nachfragen */
  function attemptClose() {
    if (!isDirty()) { clearDraft(); destroy(); return; }
    showUnsavedDialog();
  }

  function showUnsavedDialog() {
    const dlg = document.createElement('div');
    dlg.className = 'kk-modal-overlay';
    dlg.style.zIndex = '900';
    dlg.innerHTML =
      '<div class="kk-modal" style="max-width:460px">' +
        '<div class="kk-modal-head"><div>' +
          '<h2>Ungespeicherte Änderungen</h2>' +
          '<div class="modal-sub">Du hast Änderungen in „' + titleLabel + '". Was möchtest du tun?</div>' +
        '</div></div>' +
        '<div class="kk-modal-foot" style="flex-direction:column;align-items:stretch;gap:10px">' +
          '<button class="btn btn-sm" data-act="save">Verlassen und speichern</button>' +
          '<button class="btn btn-sm btn-outline" data-act="later">Später weiterbearbeiten</button>' +
          '<button class="btn-link" data-act="discard">Verlassen ohne speichern</button>' +
        '</div>' +
      '</div>';
    dlg.addEventListener('click', (e) => { if (e.target === dlg) dlg.remove(); });
    const saveBtn = dlg.querySelector('[data-act="save"]');
    saveBtn.addEventListener('click', async () => {
      const ok = await saveAndReload(saveBtn);
      if (ok) dlg.remove(); // bei Fehler offen lassen
    });
    dlg.querySelector('[data-act="later"]').addEventListener('click', () => {
      persistDraft();        // Entwurf in der Sitzung behalten
      dlg.remove();
      destroy();
    });
    dlg.querySelector('[data-act="discard"]').addEventListener('click', () => {
      clearDraft();
      dlg.remove();
      destroy();
    });
    document.body.appendChild(dlg);
  }

  /* Schließen-Verhalten */
  head.querySelector('.kk-modal-close').addEventListener('click', () => attemptClose());
  overlay.addEventListener('click', (e) => { if (e.target === overlay) attemptClose(); });
  document.addEventListener('keydown', escHandler);

  document.body.appendChild(overlay);
}

/* Gespeicherte Eingaben sofort beim Laden anwenden (vor dem Seiten-Rendern) */
kkApplyOverrides();
