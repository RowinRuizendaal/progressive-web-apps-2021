const CORE_CACHE_VERSION = 'v3';
const urlsToCache = [
  '/offline',
  '/css/style.css',
  '/css/swiper-bundle.css',
  '/swiper.js',
  '/swiper-interaction.js',
];


self.addEventListener('install', (event) => {
  event.waitUntil(
      caches.open(CORE_CACHE_VERSION).then(async (cache) => {
        await cache.addAll(urlsToCache);
        return self.skipWaiting();
      }),
  );
});

self.addEventListener('activate', (event) => {
  console.log('Active');
  event.waitUntil(clients.claim());
});


self.addEventListener('fetch', (event) => {
  if (isHtmlGetRequest(event.request)) {
    event.respondWith(
        caches.open(CORE_CACHE_VERSION)
            .then((cache) => cache.match(event.request))
            .then((response) => response ? response : FetchAndCache(event.request, CORE_CACHE_VERSION))
            .catch(async () => {
              const cache = await caches.open(CORE_CACHE_VERSION);
              return await cache.match('/offline');
            }));
  }


  if (isCssGetRequest(event.request)) {
    event.respondWith(
        fetch(event.request)
            .catch(async () => {
              const cache = await caches.open(CORE_CACHE_VERSION);
              return await cache.match(event.request);
            }),
    );
  }

  if (isScriptGetRequest(event.request)) {
    event.respondWith(
        fetch(event.request)
            .catch(async () => {
              const cache = await caches.open(CORE_CACHE_VERSION);
              return await cache.match(event.request);
            }),
    );
  }
});


const FetchAndCache = async (request, cacheName) => {
  const response = await fetch(request);
  const clone = response.clone();
  caches.open(cacheName)
      .then((cache) => {
        cache.put(request, clone);
      });
  return response;
};

const isHtmlGetRequest = (request) => {
  return request.method === 'GET' && request.destination === 'document';
};


const isCssGetRequest = (request) => {
  return request.method === 'GET' && request.destination === 'style';
};

const isScriptGetRequest = (request) => {
  return request.method === 'GET' && request.destination === 'script';
};
