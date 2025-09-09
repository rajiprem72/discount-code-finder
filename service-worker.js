const CACHE_NAME = 'discount-code-finder-v1';
const urlsToCache = [
  '/',
  '/discount-code-finder/',
  '/discount-code-finder/index.html',
  '/discount-code-finder/coupons.json',
  '/discount-code-finder/affiliates.json'
];

// Install service worker
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
});

// Fetch from cache first, then network
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
