import { createApp } from 'vue'

import { App } from './app'

Object.defineProperty(window, 'WebSocket', { value: null })

createApp(App).mount('#app')
