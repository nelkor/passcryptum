<script setup lang="ts">
import { ref } from 'vue'
import { enterWithOriginPassword } from '#/core'

import { initSession } from '../model/private'

const password = ref('')
const isEnterInProgress = ref(false)

const onSubmit = async () => {
  const { value } = password

  password.value = ''
  isEnterInProgress.value = true

  const { id, data } = await enterWithOriginPassword(value)

  initSession(id, data)

  isEnterInProgress.value = false
}
</script>

<template>
  <form @submit.prevent="onSubmit">
    <input
      v-model="password"
      :disabled="isEnterInProgress"
      type="password"
      placeholder="Enter password"
    />

    <button :disabled="!password">Enter</button>
  </form>
</template>
