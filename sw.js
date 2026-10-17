// Service worker: guarda la app y el banco de preguntas para usarla sin conexión.
const CACHE = 'licencia-b-v5';
const ARCHIVOS = [
  './',
  'index.html',
  'styles.css',
  'ruta.js',
  'ilustraciones.js',
  'app.js',
  'manifest.webmanifest',
  'banco_preguntas_licencia_clase_b.json',
  'img/logo.webp',
  'img/huemul-feliz.webp',
  'img/huemul-pensando.webp',
  'img/huemul-ups.webp',
  'img/huemul-celebra.webp',
  'img/huemul-licencia.webp',
  'img/huemul-cara.webp',
  'img/huemul-auto.webp',
  'img/huemul-hola.webp',
  'img/huemul-lee.webp',
  'img/huemul-pare.webp',
  'img/huemul-sinbencina.webp',
  'img/huemul-apurado.webp',
  'img/huemul-duerme.webp',
  'img/huemul-trofeo.webp',
  'img/huemul-maneja.webp',
  'icons/favicon-64.png',
  'icons/apple-touch-icon.png',
  'icons/icono-192.png',
  'icons/icono-512.png',
  'icons/icono-maskable-512.png',
];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(ARCHIVOS)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys()
      .then((claves) => Promise.all(claves.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

// Red primero, revalidando con el servidor (para recibir cambios del banco o de la app), y caché si no hay conexión.
self.addEventListener('fetch', (e) => {
  if (e.request.method !== 'GET' || new URL(e.request.url).origin !== location.origin) return;
  e.respondWith(
    fetch(e.request, { cache: 'no-cache' })
      .then((r) => {
        if (r.ok) {
          const copia = r.clone();
          caches.open(CACHE).then((c) => c.put(e.request, copia));
        }
        return r;
      })
      .catch(() => caches.match(e.request, { ignoreSearch: true }).then((r) => r || caches.match('index.html')))
  );
});
