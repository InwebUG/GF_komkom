/* Service Worker des KomKom-Dashboards.
   Einziger Zweck: Fertigmeldungen des PPTX-Generators anzeigen, auch wenn
   der Tab geschlossen ist. Kein Caching — die Seite soll immer frisch sein. */

self.addEventListener('install', function () { self.skipWaiting(); });
self.addEventListener('activate', function (e) { e.waitUntil(self.clients.claim()); });

self.addEventListener('push', function (event) {
  var d = {};
  try { d = event.data ? event.data.json() : {}; } catch (e) { d = {}; }
  var titel = d.titel || 'PPTX-Generator';
  event.waitUntil(self.registration.showNotification(titel, {
    body: d.text || '',
    icon: '/apple-touch-icon.png',
    badge: '/favicon.png',
    tag: d.job_id || 'komkom-pptx',   // ersetzt statt stapelt
    renotify: true,
    data: { url: d.url || '/generator.html' }
  }));
});

self.addEventListener('notificationclick', function (event) {
  event.notification.close();
  var ziel = (event.notification.data && event.notification.data.url) || '/generator.html';
  event.waitUntil(clients.matchAll({ type: 'window', includeUncontrolled: true }).then(function (liste) {
    // Ist der Generator schon offen, dorthin springen statt neu zu öffnen
    for (var i = 0; i < liste.length; i++) {
      if (liste[i].url.indexOf('generator') !== -1 && 'focus' in liste[i]) {
        liste[i].navigate(ziel);
        return liste[i].focus();
      }
    }
    return clients.openWindow(ziel);
  }));
});
