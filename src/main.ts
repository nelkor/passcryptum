import { createApp } from 'vue'

import { App, normalize100vh } from './app'

Object.defineProperty(window, 'WebSocket', { value: null })

createApp(App).mount('#app')

if (
  location.host &&
  !location.host.startsWith('localhost') &&
  'serviceWorker' in navigator
) {
  navigator.serviceWorker.register('/sw.js')
}

normalize100vh()
