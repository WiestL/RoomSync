const CACHE_NAME = 'v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/static/js/bundle.js',  // Adjust this path according to your output JS
  '/css/style.css',        // Adjust paths based on what assets you need to cache
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        if (response) {
          return response;
        }
        return fetch(event.request);
      }
    )
  );
});