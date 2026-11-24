// Service worker: permite instalar la app y abrirla sin conexión.
// Sube el número de versión cada vez que cambies archivos de la app.
const CACHE = 'probador-v1';
const SHELL = ['./', './index.html', './config.js', './manifest.json',
  './icons/icon-192.png', './icons/icon-512.png', './icons/icon-maskable-512.png'];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (e) => {
  e.waitUntil(caches.keys()
    .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
    .then(() => self.clients.claim()));
});

self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  // Firebase (base de datos y sesión) va siempre directo a la red
  if (/googleapis\.com$/.test(url.hostname) && !url.hostname.startsWith('fonts.')) return;

  if (url.origin === location.origin) {
    // Archivos propios: primero la red (para recibir cambios), si no hay conexión, la caché
    e.respondWith(fetch(req).then((res) => {
      const copy = res.clone(); caches.open(CACHE).then((c) => c.put(req, copy)); return res;
    }).catch(() => caches.match(req).then((r) => r || caches.match('./index.html'))));
    return;
  }
  if (url.hostname === 'www.gstatic.com' || url.hostname.startsWith('fonts.')) {
    // Librerías y fuentes: la caché primero
    e.respondWith(caches.match(req).then((hit) => hit || fetch(req).then((res) => {
      const copy = res.clone(); caches.open(CACHE).then((c) => c.put(req, copy)); return res;
    })));
  }
});
