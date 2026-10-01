const CACHE_NAME = 'myflashcards-v4';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './css/style.css',
  './images/icon.png',
  './images/icon.ico',
  './images/badge.png',
  './images/badge2.png',
  './js/storage.js',
  './js/game.js',
  './js/manage.js',
  './js/profile.js',
  './js/export.js',
  './js/plugins.js',
  './js/app.js',
  './js/plugins/english-advanced.js',
  './js/plugins/japanese.js',
  './js/plugins/calculus.js',
  './js/plugins/pwa-notifications.js'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE).catch(() => {});
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      return cachedResponse || fetch(event.request).catch(() => cachedResponse);
    })
  );
});

// Handle Push Notifications click
self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  const cardId = event.notification.data ? event.notification.data.cardId : null;
  const category = event.notification.data ? event.notification.data.category : null;

  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
      for (const client of clientList) {
        if ('focus' in client) {
          client.focus();
          client.postMessage({
            type: 'NAVIGATE_TO_CARD',
            cardId: cardId,
            category: category
          });
          return;
        }
      }
      if (clients.openWindow) {
        const targetUrl = `./index.html?cardId=${encodeURIComponent(cardId || '')}&category=${encodeURIComponent(category || '')}`;
        return clients.openWindow(targetUrl);
      }
    })
  );
});
