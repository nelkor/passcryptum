const CACHE_VERSION = 'v1'
const ROOT_PATH = 'https://passcryptum.com/'

addEventListener('install', () => {
  skipWaiting()
})

addEventListener('activate', event => {
  clients.claim()

  event.waitUntil(
    caches.keys().then(keys =>
      keys.forEach(key => {
        caches.delete(key)
      })
    )
  )
})

addEventListener('fetch', event => {
  const { request } = event

  event.respondWith(
    caches.match(request).then(fromCache => {
      if (fromCache) {
        return fromCache
      }

      if (request.url !== ROOT_PATH) {
        return new Response(null, {
          status: 403,
          statusText: 'Forbidden',
        })
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
