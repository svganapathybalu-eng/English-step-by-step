/* Lets the course open offline after the first visit. Change VERSION when you update files. */
var VERSION = 'ess-v2-1';
self.addEventListener('install', function (e) { self.skipWaiting(); });
self.addEventListener('activate', function (e) {
  e.waitUntil(caches.keys().then(function (ks) { return Promise.all(ks.filter(function (k) { return k !== VERSION; }).map(function (k) { return caches.delete(k); })); }).then(function () { return self.clients.claim(); }));
});
self.addEventListener('fetch', function (e) {
  var r = e.request, u = new URL(r.url);
  if (r.method !== 'GET' || u.origin !== location.origin || u.pathname.indexOf('/dashboard') > -1) return;
  e.respondWith(fetch(r).then(function (res) {
    var c = res.clone(); caches.open(VERSION).then(function (ca) { ca.put(r, c); }); return res;
  }).catch(function () { return caches.match(r).then(function (m) { return m || caches.match('index.html'); }); }));
});
