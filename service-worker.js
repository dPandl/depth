// service-worker.js

// Der Name des Caches. Ändere die Version, wenn du neue Assets hast oder alte löschen willst.
const CACHE_NAME = 'diary-pwa-cache-v1';

// Liste der Assets, die sofort beim Installieren des Service Workers gecacht werden sollen (App Shell).
const ASSETS_TO_CACHE = [
  '/', // Die Wurzel-URL (oft die index.html)
  '/index.html',
  // Hier könntest du weitere statische Assets auflisten, z.B.:
  // '/static/js/bundle.js',
  // '/static/css/main.css',
  // '/icons/icon-192x192.png',
  // '/icons/icon-512x512.png',
  // Für diese Demo cachen wir nur die Haupteinstiegspunkte.
];

// Event-Listener für die Installation des Service Workers
self.addEventListener('install', (event) => {
  // Warte, bis alle Assets in den Cache geladen wurden
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        // Füge alle vordefinierten Assets zum Cache hinzu
        return cache.addAll(ASSETS_TO_CACHE);
      })
      .catch(error => {
        // Bei einem Fehler (z.B. wenn eine Ressource nicht gefunden wurde)
        // wird die Installation des Service Workers fehlschlagen.
        // Das ist gut, um sicherzustellen, dass nur vollständige Caches installiert werden.
      })
  );
});

// Event-Listener für Fetch-Anfragen (jede HTTP-Anfrage, die von der App ausgeht)
self.addEventListener('fetch', (event) => {
  // Wir beantworten nur GET-Anfragen
  if (event.request.method !== 'GET') {
    return;
  }

  // Fange die Anfrage ab und antworte mit einer gecachten oder Netzwerk-Antwort
  event.respondWith(
    caches.match(event.request)
      .then((cachedResponse) => {
        // Wenn eine gecachte Antwort gefunden wird, gib sie zurück
        if (cachedResponse) {
          return cachedResponse;
        }

        // Andernfalls, versuche die Anfrage vom Netzwerk zu holen
        return fetch(event.request).then(response => {
          // Überprüfe, ob wir eine gültige Antwort erhalten haben
          // (z.B. Status 200, nicht Opaque für Cross-Origin-Anfragen, die nicht gecacht werden können)
          if (!response || response.status !== 200 || response.type !== 'basic') {
            return response;
          }

          // Klone die Antwort, da sie ein Stream ist und nur einmal konsumiert werden kann
          const responseToCache = response.clone();

          // Füge die Netzwerk-Antwort zum Cache hinzu, damit sie für zukünftige Anfragen verfügbar ist
          caches.open(CACHE_NAME)
            .then(cache => {
              cache.put(event.request, responseToCache);
            });

          return response;
        });
      })
      .catch(error => {
        // Bei einem Fehler (z.B. keine Netzwerkverbindung und nicht im Cache)
        // Hier könntest du eine Offline-Seite zurückgeben, falls vorhanden.
        // return caches.match('/offline.html');
      })
  );
});

// Event-Listener für die Aktivierung des Service Workers
self.addEventListener('activate', (event) => {
  // Lösche alte Caches, die nicht mehr benötigt werden
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          // Lösche nur Caches, die zu unserer PWA gehören, aber nicht die aktuelle Version sind
          if (cacheName.startsWith('diary-pwa-cache-') && cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
