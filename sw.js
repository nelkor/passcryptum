const CACHE_VERSION_STATIC = 'cache-version-s-1'
const CACHE_VERSION_DYNAMIC = 'cache-version-d-1'

const assetsURL = ['/index.html', '/favicon.svg']

const networkFirst = async request => {
  // создаем кэш для
  const cache = await caches.open(CACHE_VERSION_DYNAMIC)

  try {
    // получаем файлы с сервера
    const response = await fetch(request)

    // сохраняем в кеш
    await cache.put(request, response.clone())

    return response
  } catch (err) {
    // достаем из кэша сохраненные данные, если они не подгрузились с сервера
    return cache.match(request)
  }
}

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_VERSION_STATIC).then(cache => cache.addAll(assetsURL))
  )
})

self.addEventListener('activate', async () => {
  const cacheNames = await caches.keys()

  await Promise.all(
    cacheNames
      .filter(name => name !== CACHE_VERSION_STATIC)
      .filter(name => name !== CACHE_VERSION_DYNAMIC)
      .map(name => caches.delete(name))
  )
})

self.addEventListener('fetch', event => {
  const { request } = event
  const url = new URL(request.url)

  if (url.origin === location.origin) {
    event.respondWith(networkFirst(event.request))
  } else {
    console.log(`Not allowed request ${url}`)
  }
})
