import { createApp } from 'vue'

import { App } from './app'

Object.defineProperty(window, 'WebSocket', { value: null })

createApp(App).mount('#app')

if (location.host && 'serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js')
}
