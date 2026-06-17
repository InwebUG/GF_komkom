/* ============================================================
   GF-Dashboard – gemeinsame App-Logik (Shell, Login, Helfer)
   ============================================================ */

/* ---------- Login-Guard (Prototyp: lässt immer rein, verlangt aber Login-Seite) ---------- */
(function () {
  const isLogin = /(^|\/)index\.html$/.test(location.pathname) || /\/$/.test(location.pathname);
  const loggedIn = sessionStorage.getItem('kk_login') === '1';
  if (!isLogin && !loggedIn) location.replace('index.html');
})();

function kkLogin(ev) {
  ev.preventDefault();
  // Prototyp: jede Eingabe wird akzeptiert
  const user = document.getElementById('login-user').value.trim() || 'Gast';
  sessionStorage.setItem('kk_login', '1');
  sessionStorage.setItem('kk_user', user);
  location.href = 'dashboard.html';
  return false;
}

function kkLogout() {
  sessionStorage.removeItem('kk_login');
  location.href = 'index.html';
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
  { sec: 'Steuerung' },
  { href: 'forecast.html', icon: 'trend', label: 'Forecast & Ziele' },
  { href: 'alerts.html', icon: 'bell', label: 'Alerts' },
  { href: 'berichte.html', icon: 'report', label: 'Berichte & Export' },
  { href: 'einstellungen.html', icon: 'gear', label: 'Einstellungen' }
];

/* ---------- Shell (Sidebar + Topbar) rendern ---------- */
function kkShell(opts) {
  const { title, subtitle } = opts;
  const here = location.pathname.split('/').pop() || 'index.html';

  const navHtml = KK_NAV.map((item) => {
    if (item.sec) return '<div class="sidebar-section">' + item.sec + '</div>';
    const active = item.href === here ? ' class="active"' : '';
    return '<a href="' + item.href + '"' + active + ' title="' + item.label + '">' +
      KK_ICONS[item.icon] + '<span class="nav-label">' + item.label + '</span></a>';
  }).join('');

  const sidebar = document.createElement('aside');
  sidebar.className = 'sidebar';
  sidebar.innerHTML =
    '<div class="sidebar-logo">' +
      '<div class="logo-mark">KK</div>' +
      '<div class="logo-full">' +
        '<div class="logo-name">Kompetenz<span>Kompanie</span></div>' +
        '<div class="logo-claim">Echt. Persönlich. Wirksam.</div>' +
      '</div>' +
    '</div>' +
    '<nav>' + navHtml + '</nav>' +
    '<div class="sidebar-footer">' +
      '<button class="btn-logout" onclick="kkLogout()" title="Abmelden">' +
        KK_ICONS.logout + '<span class="logout-label">Abmelden</span></button>' +
      '<div class="sf-text">GF-Dashboard · Prototyp v0.1<br>Demo-Daten, Stand ' + KK.meta.stand + '</div>' +
    '</div>';

  const user = sessionStorage.getItem('kk_user') || KK.meta.nutzer.name;
  const initials = user.split(/\s+/).map((w) => w[0]).join('').toUpperCase().slice(0, 2);

  const topbar = document.createElement('div');
  topbar.className = 'topbar';
  topbar.innerHTML =
    '<div class="page-title"><h1>' + title + '</h1>' +
    (subtitle ? '<div class="subtitle">' + subtitle + '</div>' : '') + '</div>' +
    '<div class="topbar-right">' +
      '<span class="demo-badge">Prototyp · Demo-Daten</span>' +
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
