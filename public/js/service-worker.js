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
  // Getting URL
  const url = new URL(event.request.url);

  // Responding from cache if possible. If not, respond with the network or other cached content
  if (url.origin === location.origin && url.pathname === '/') {
    event.respondWith(caches.match('/index.html'));
    return;
  } else if (url.pathname === '/tracker/') {
    event.respondWith(caches.match('/tracker/index.html'));
    return;
  } else {
    event.respondWith(caches.match('/error/404.html'));
  }

  event.respondWith(
      caches.match(event.request)
          .then((response) => response || fetch(event.request)),
  );
});
