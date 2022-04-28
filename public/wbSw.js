importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.1.5/workbox-sw.js');

// Cache page navigations (html) with a Network First strategy
workbox.routing.registerRoute(
    // Check to see if the request is a navigation to a new page
    ({ request }) => request.mode === 'navigate',
    // Use a Network First caching strategy
    new workbox.strategies.NetworkFirst({
        // Put all cached files in a cache named 'pages'
        cacheName: 'pages',
        plugins: [
            // Ensure that only requests that result in a 200 status are cached
            new workbox.cacheableResponse.CacheableResponsePlugin({
                statuses: [200],
            }),
        ],
    }),
);

// Cache CSS, JS, and Web Worker requests with a Stale While Revalidate strategy
workbox.routing.registerRoute(
    // Check to see if the request's destination is style for stylesheets, script for JavaScript, or worker for web worker
    ({ request }) =>
        request.destination === 'style' ||
        request.destination === 'script' ||
        request.destination === 'worker',
    // Use a Stale While Revalidate caching strategy
    new workbox.strategies.StaleWhileRevalidate({
        cacheName:'assets',
        plugins: [
            // Ensure that only requests that result in a 200 status are cached
            new workbox.cacheableResponse.CacheableResponsePlugin({
                statuses: [200],
            }),
        ],
    }),
);


workbox.routing.registerRoute(
    // Check to see if the request's destination is style for an image
    ({ request }) => request.destination === 'image',
    // Use a Cache First caching strategy
    new workbox.strategies.CacheFirst({
        // Put all cached files in a cache named 'images'
        cacheName: '/favicon.ico,/static/media/proimg.2ce33dbde4af0a1debda.webp,/static/media/welcome.6cc48a1ebd61a3b3200f.jpeg,/static/media/man.899e9ee1296dce043935.jpg/static/media/anna.5912ad180d0614413944.png,/static/media/bob.aaa05b11fe388ff91f69.png,/static/media/jack.fa50e113059f8c4c1ec1.jpg,/static/media/smith.9b8afb51635c635db7d2.png,//static/media/ankita.2dfedcfad48225a73908.png,/static/media/whatsBG.f4b196f1bce2137c76a3.png',
        // cacheName:'image',
        plugins: [
            // Ensure that only requests that result in a 200 status are cached
            new workbox.cacheableResponse.CacheableResponsePlugin({
                statuses: [200],
            }),
            // Don't cache more than 50 items, and expire them after 30 days
            new workbox.expiration.ExpirationPlugin({
                maxEntries: 50,
                maxAgeSeconds: 60 * 60 * 24 * 30, // 30 Days
            }),
        ],
    }),
);