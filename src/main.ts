import { createApp } from 'vue'

import { App, watchHeight, registerServiceWorker } from './app'

watchHeight()
registerServiceWorker()
createApp(App).mount('#app')
Object.defineProperty(window, 'WebSocket', { value: null })
