import { createApp } from 'vue'

import { App } from './app'

createApp(App).mount('#app')

if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('./sw.js')
    .then(reg => {
      // регистрация сработала
      console.log(`Registration succeeded. Scope is ${reg.scope}`)
    })
    .catch(error => {
      // регистрация прошла неудачно
      console.log(`Registration failed with ${error}`)
    })
}
