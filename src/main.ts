import { createApp } from 'vue'

import { App, watchHeight } from './app'

watchHeight()

createApp(App).mount('#app')

Object.defineProperty(window, 'WebSocket', { value: null })
