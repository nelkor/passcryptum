import { createApp } from 'vue'

import { App } from './app'

createApp(App).mount('#app')

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('./sw.js')
}
