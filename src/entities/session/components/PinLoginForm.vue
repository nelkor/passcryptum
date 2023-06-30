<script setup lang="ts">
import { ref } from 'vue'
import { enterWithPin } from '#/core'

import { isPinSet } from '../model/public'
import { initSession } from '../model/private'

const pin = ref('')
const isEnterInProgress = ref(false)

const onSubmit = async () => {
  const { value } = pin

  pin.value = ''
  isEnterInProgress.value = true

  try {
    const { id, data } = await enterWithPin(value)

    initSession(id, data)
  } catch (e) {
    alert('Wrong PIN')
  }

  isEnterInProgress.value = false
}
</script>

<template>
  <form @submit.prevent="onSubmit">
    <input
      v-model="pin"
      :disabled="isEnterInProgress || !isPinSet"
      type="password"
      placeholder="Enter PIN"
    />

    <button :disabled="!pin">Enter</button>
  </form>
</template>
