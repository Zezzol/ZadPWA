const CACHE_NAME = "Pogodynka_cache";
const urlsToCache = [
  "index.html",
  "offline.html",
  "form.html",
  "style.css",
  "js/form.js",
  "js/indexdb.js",
  "manifest.json",
  "icons/icon-192.png",
  "icons/icon-512.png"
];

self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(urlsToCache))
  );
});

self.addEventListener("fetch", (event) => {
  if (event.request.mode === "navigate") {
    event.respondWith(
      fetch(event.request).catch(() => caches.match("offline.html"))
    );
  } else {
    event.respondWith(
      caches.match(event.request).then((res) => res || fetch(event.request))
    );
  }
});