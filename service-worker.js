const CACHE_NAME = "weathernote-cache-v1";
const urlsToCache = [
  "index.html",
  "form.html",
  "offline.html",
  "style.css",
  "js/form.js",
  "js/indexdb.js",
  "manifest.json",
  "icons/icon-192.png",
  "icons/icon-512.png"
];

// Instalacja: cache’ujemy wszystkie potrzebne pliki
self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(urlsToCache))
  );
});

// Fetch: jedna obsługa wszystkich żądań
self.addEventListener("fetch", (event) => {
  if (event.request.mode === "navigate") {
    // Przechwytywanie żądań stron (HTML)
    event.respondWith(
      fetch(event.request)
        .catch(() => caches.match("offline.html"))
    );
  } else {
    // Inne zasoby: cache-first
    event.respondWith(
      caches.match(event.request).then((res) => {
        return res || fetch(event.request);
      })
    );
  }
});