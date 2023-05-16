// service worker for serving network first, cache second
const CACHE_VERSION = 'cache-6'

self.addEventListener('install', event => {
  event.waitUntil(
    caches
      .open(CACHE_VERSION)
      .then(cache => cache.addAll(['./index.html', './public/favicon.svg']))
  )
})
self.addEventListener('fetch', event => {
  event.respondWith(caches.match(event.request).then(response => response))
})
