const CORE_CACHE_VERSION = 'v3';
const urlsToCache = [
  '/offline',
];


self.addEventListener('install', (event) => {
  console.log('installing service worker');

  event.waitUntil(
      caches.open(CORE_CACHE_VERSION).then(function(cache) {
        return cache.addAll(urlsToCache).then(() => self.skipWaiting());
      }),
  );
});

self.addEventListener('activate', (event) => {
  console.log('active');
  event.waitUntil(clients.claim());
});


self.addEventListener('fetch', (event) => {
  console.log('Fetch event: ', event.request.url);
  console.log('test');
});
