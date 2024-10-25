// const CACHE_NAME = "static-v1";
// const URLS_TO_CACHE = ["/", "/index.html", "/manifest.json"];
// // Install event: Cache important files
// self.addEventListener("install", (e) => {
//     e.waitUntil(caches.open(CACHE_NAME).then((cache) => {
//         return cache.addAll(URLS_TO_CACHE);
//     }));
// });
// // Activate event: Clean up old caches
// self.addEventListener("activate", (e) => {
//     e.waitUntil(caches.keys().then((cacheNames) => {
//         return Promise.all(cacheNames.map((cacheName) => {
//             if (cacheName !== CACHE_NAME) {
//                 return caches.delete(cacheName);
//             }
//         }));
//     }));
// });
// // Fetch event: Serve cached content or fetch from network
// self.addEventListener("fetch", (e) => {
//     e.respondWith(caches.match(e.request).then((response) => {
//         return response || fetch(e.request);
//     }));
// });

// ---------- Latest version of SW code from here ----------

// // Name of the cache storage
// const CACHE_NAME = "static-v1";

// // Files to cache
// const URLS_TO_CACHE = [
//   "/",
//   "/index.html",
//   "/manifest.json",
//   "/pwa-192x192.png",
//   "/pwa-512x512.png",
// ];

// // Install event: cache important files
// self.addEventListener("install", (event) => {
//   console.log("[Service Worker] Install event");
//   event.waitUntil(
//     caches.open(CACHE_NAME).then((cache) => {
//       console.log("[Service Worker] Caching all: app shell and content");
//       return cache.addAll(URLS_TO_CACHE).catch((error) => {
//         console.error("[Service Worker] Failed to cache:", error);
//         // Log failed URLs individually
//         URLS_TO_CACHE.forEach((url) => {
//           fetch(url).catch((fetchError) => {
//             console.error(
//               `[Service Worker] Failed to fetch ${url}:`,
//               fetchError
//             );
//           });
//         });
//       });
//     })
//   );
// });

// // Activate event: clean up old caches
// self.addEventListener("activate", (event) => {
//   console.log("[Service Worker] Activate event");
//   event.waitUntil(
//     caches.keys().then((cacheNames) => {
//       return Promise.all(
//         cacheNames.map((cacheName) => {
//           if (cacheName !== CACHE_NAME) {
//             console.log("[Service Worker] Deleting old cache:", cacheName);
//             return caches.delete(cacheName);
//           }
//         })
//       );
//     })
//   );
// });

// // Fetch event: serve cached content or fetch from network
// self.addEventListener("fetch", (event) => {
//   console.log("[Service Worker] Fetch event for ", event.request.url);
//   event.respondWith(
//     caches
//       .match(event.request)
//       .then((response) => {
//         if (response) {
//           console.log("[Service Worker] Found in cache", event.request.url);
//           return response;
//         }
//         console.log("[Service Worker] Network request for ", event.request.url);
//         return fetch(event.request).then((response) => {
//           return caches.open(CACHE_NAME).then((cache) => {
//             if (event.request.url.indexOf("http") === 0) {
//               console.log(
//                 "[Service Worker] Caching new resource",
//                 event.request.url
//               );
//               cache.put(event.request.url, response.clone());
//             }
//             return response;
//           });
//         });
//       })
//       .catch((error) => {
//         console.error(
//           "[Service Worker] Error fetching and caching new data",
//           error
//         );
//       })
//   );
// });
