const CACHE_NAME = "Pogodynka_cache_v2";
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

// Instalacja - cache plików
self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(urlsToCache))
  );
  self.skipWaiting(); // aktywuj natychmiast
});

// Aktywacja - usuwanie starych cache
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME)
          .map((name) => caches.delete(name))
      )
    )
  );
  self.clients.claim();
});

// Fetch - obsługa żądań
self.addEventListener("fetch", (event) => {
  if (event.request.mode === "navigate") {
    // Dla nawigacji: spróbuj sieci, potem cache, na końcu offline.html
    event.respondWith(
      fetch(event.request)
        .then((response) => response)
        .catch(() =>
          caches.match(event.request).then((cached) => {
            return cached || caches.match("offline.html");
          })
        )
    );
  } else {
    // Inne zasoby: najpierw z cache, potem z sieci
    event.respondWith(
      caches.match(event.request).then((cached) => {
        return cached || fetch(event.request);
      })
    );
  }
});
