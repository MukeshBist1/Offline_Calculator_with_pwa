const cacheName = "calculator-cache-v1"; // Version of your cache
const filesToCache = [
    "/",
    "/index.html",
    "/styles.css",
    "/script.js",
    "/service-worker.js"
];

// Install event - cache all files
self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(cacheName).then((cache) => {
            return cache.addAll(filesToCache);
        })
    );
});

// Activate event - clean up old caches
self.addEventListener("activate", (event) => {
    const cacheWhitelist = [cacheName];
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (!cacheWhitelist.includes(cacheName)) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

// Fetch event - serve from cache if offline
self.addEventListener("fetch", (event) => {
    event.respondWith(
        caches.match(event.request).then((cachedResponse) => {
            if (cachedResponse) {
                return cachedResponse; // Return cached file if available
            }
            return fetch(event.request); // Fetch from network if not cached
        })
    );
});
