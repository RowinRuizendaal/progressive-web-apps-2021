const CORE_CACHE_VERSION = 'v3';
const urlsToCache = [
  '/offline',
  '/css/style.css',
];


self.addEventListener('install', (event) => {
  event.waitUntil(
      caches.open(CORE_CACHE_VERSION).then(function(cache) {
        return cache.addAll(urlsToCache).then(() => self.skipWaiting());
      }),
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(clients.claim());
});


// when worker fetches
self.addEventListener('fetch', (event) => {
  if (event.request.method === 'GET' && event.request.headers.get('accept').indexOf('text/html') !== -1) {
    event.respondWith(
        fetch(event.request)
            .catch(() => {
              return caches.open(CORE_CACHE_VERSION)
                  .then((cache) => cache.match('/offline'));
            }),
    );
  } else if (event.request.method === 'GET' &&
  event.request.headers.get('accept').indexOf('text/css') !== -1) {
    event.respondWith(
        fetch(event.request)
            .catch(() => {
              return caches.open(CORE_CACHE_VERSION)
                  .then((cache) => cache.match('/css/style.css'));
            }),
    );
  }
});

