const CACHE_NAME = "weathernote-cache-v1";
const urlsToCache = [
  "index.html",
  "form.html",
  "weather.html",
  "style.css",
  "js/form.js",
  "js/weather.js",
  "js/indexdb.js",
  "manifest.json",
  "icons/icon-192.png",
  "icons/icon-512.png"
];

self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("fetch", (e) => {
  e.respondWith(
    caches.match(e.request)
      .then((res) => res || fetch(e.request).catch(() => {
        if (e.request.destination === "document") {
          return caches.match("index.html");
        }
      }))
  );
});
