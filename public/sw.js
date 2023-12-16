const CACHE_VERSION = 'v2.1.3'
const ROOT_PATH = 'https://passcryptum.com/'

const files = [
  'manifest.json',
  'icons/favicon.svg',
  'icons/i192x192.png',
  'icons/i512x512.png',
  'screenshots/login.png',
  'screenshots/service.png',
]

/** @type {string[]} */
const urls = [ROOT_PATH, ...files.map(file => ROOT_PATH + file)]

addEventListener('install', () => {
  void skipWaiting()
})

addEventListener('activate', event => {
  void clients.claim()

  event.waitUntil(
    caches
      .keys()
      .then(keys => Promise.all(keys.map(key => caches.delete(key))))
      .then(() => caches.open(CACHE_VERSION))
      .then(cache => cache.addAll(urls))
  )
})

addEventListener('fetch', event => {
  const { request } = event

  event.respondWith(
    caches.match(request).then(fromCache => {
      if (fromCache) {
        return fromCache
      }

      if (!urls.includes(request.url)) {
        return new Response(null, { status: 403, statusText: 'Forbidden' })
      }

      return Promise.all([caches.open(CACHE_VERSION), fetch(request)])
        .then(([cache, response]) => {
          cache.put(request, response.clone())

          return response
        })
        .catch(
          () =>
            new Response(null, {
              status: 503,
              statusText: 'Service Unavailable',
            })
        )
    })
  )
})
