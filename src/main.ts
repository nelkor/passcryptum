import { createApp } from 'vue'

import { App } from './app'

createApp(App).mount('#app')

if (location.host && 'serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js')
}
