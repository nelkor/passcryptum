const CACHE_VERSION = 'v2.1.4'
const BASE_URL = 'https://passcryptum.ddns.net/'
const PROFILES_URL = `${BASE_URL}api/profiles/`
const CREDENTIALS_URL = `${BASE_URL}api/credentials/`

const FILES_TO_CACHE = [
  'manifest.json',
  'icons/favicon.svg',
  'icons/i192x192.png',
  'icons/i512x512.png',
  'screenshots/login.png',
  'screenshots/service.png',
]

const URLS_TO_CACHE = [
  BASE_URL,
  ...FILES_TO_CACHE.map(file => `${BASE_URL}${file}`),
]

const STATUS_OK = 200
const STATUS_FORBIDDEN = 403
const STATUS_SERVICE_UNAVAILABLE = 503

function createErrorResponse(status, statusText) {
  return new Response(null, { status, statusText })
}

self.addEventListener('install', event => {
  event.waitUntil(self.skipWaiting())
})

self.addEventListener('activate', event => {
  event.waitUntil(activateServiceWorker())
})

self.addEventListener('fetch', event => {
  event.respondWith(handleFetch(event.request))
})

async function activateServiceWorker() {
  try {
    const cacheKeys = await caches.keys()

    await Promise.all(cacheKeys.map(key => caches.delete(key)))

    const cache = await caches.open(CACHE_VERSION)

    console.log('Caching URLs:', URLS_TO_CACHE)

    const cachePromises = URLS_TO_CACHE.map(async url => {
      try {
        const response = await fetch(url)

        if (response.ok) {
          await cache.put(url, response.clone())
          console.log(`Cached: ${url}`)
        } else {
          console.warn(`Failed to cache ${url}: Status ${response.status}`)
        }
      } catch (error) {
        console.warn(`Failed to fetch ${url}:`, error)
      }
    })

    await Promise.all(cachePromises)
    await self.clients.claim()
  } catch (error) {
    console.error('Activation failed:', error)
    throw error
  }
}

async function handleFetch(request) {
  const { url } = request

  if (url.startsWith(PROFILES_URL) || url.startsWith(CREDENTIALS_URL)) {
    try {
      return await fetch(request)
    } catch (error) {
      console.warn(`API fetch failed for ${url}:`, error)

      return createErrorResponse(
        STATUS_SERVICE_UNAVAILABLE,
        'Service Unavailable',
      )
    }
  }

  try {
    const cachedResponse = await caches.match(request)

    if (cachedResponse) {
      return cachedResponse
    }

    if (!URLS_TO_CACHE.includes(url)) {
      return createErrorResponse(STATUS_FORBIDDEN, 'Forbidden')
    }

    const cache = await caches.open(CACHE_VERSION)
    const response = await fetch(request)

    if (response.status === STATUS_OK) {
      await cache.put(request, response.clone())
    }

    return response
  } catch (error) {
    console.warn(`Fetch failed for ${url}:`, error)

    return createErrorResponse(
      STATUS_SERVICE_UNAVAILABLE,
      'Service Unavailable',
    )
  }
}
