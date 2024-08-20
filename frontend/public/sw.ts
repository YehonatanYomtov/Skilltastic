const CACHE_NAME = "static-v1";
const URLS_TO_CACHE = ["/", "/index.html", "/manifest.json"];

// Install event: Cache important files
self.addEventListener("install", (e: ExtendableEvent) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(URLS_TO_CACHE);
    })
  );
});

// Activate event: Clean up old caches
self.addEventListener("activate", (e: ExtendableEvent) => {
  e.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Fetch event: Serve cached content or fetch from network
self.addEventListener("fetch", (e: FetchEvent) => {
  e.respondWith(
    caches.match(e.request).then((response) => {
      return response || fetch(e.request);
    })
  );
});
