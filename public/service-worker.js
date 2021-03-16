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


self.addEventListener('fetch', (event) => {
  if (isHtmlGetRequest(event.request)) {
    event.respondWith(
        caches.open(CORE_CACHE_VERSION)
            .then((cache) => cache.match(event.request))
            .then((response) => response ? response : FetchAndCache(event.request, CORE_CACHE_VERSION))
            .catch(() => {
              return caches.open(CORE_CACHE_VERSION)
                  .then((cache) => cache.match('/offline'));
            }));
  } 
  
  if (isCssGetRequest(event.request)) {
    event.respondWith(
        fetch(event.request)
            .catch(() => {
              return caches.open(CORE_CACHE_VERSION)
                  .then((cache) => cache.match('/css/style.css'));
            }),
    );
  }
});


const FetchAndCache = (request, cacheName) => {
  return fetch(request)
      .then((response) => {
        const clone = response.clone();
        caches.open(cacheName)
            .then((cache) => {
              cache.put(request, clone);
            });
        return response;
      });
};

const isHtmlGetRequest = (request) => {
  return request.method === 'GET' && request.headers.get('accept').indexOf('text/html') !== -1;
};


const isCssGetRequest = (request) => {
  return request.method === 'GET' && request.headers.get('accept').indexOf('text/css') !== -1;
};
