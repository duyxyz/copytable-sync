const CACHE_NAME = "copytool-cache-v1";
const urlsToCache = [
  "./",
  "./index.html",
  "./manifest.json"
];

// Cài đặt service worker
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

// Kích hoạt
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.map((key) => {
        if (key !== CACHE_NAME) {
          return caches.delete(key);
        }
      }))
    )
  );
});

// Bắt request
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
