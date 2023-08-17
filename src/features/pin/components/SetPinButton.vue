<script setup lang="ts">
import { ref } from 'vue'
import { setPin } from '#/core'

import { setPinState } from '@/entities/session'

const areCalculationsInProgress = ref(false)

const onClick = () => {
  const pin = prompt('Enter your desired PIN')

  if (!pin) {
    return
  }

  areCalculationsInProgress.value = true

  setPin(pin).then(() => {
    setPinState(true)

    areCalculationsInProgress.value = false
  })
}
</script>

<template>
  <button :disabled="areCalculationsInProgress" @click="onClick">
    Set a PIN
  </button>
</template>
