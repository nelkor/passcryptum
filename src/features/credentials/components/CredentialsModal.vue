<script setup lang="ts">
import { LoginData } from '#/services'
import { NModal, NSpace, NButton, useMessage } from 'naive-ui'

import { COPY_DELAY_TIME, writeToClipboard } from '@/shared'

import {
  serviceToCopy,
  isCopyPassword,
  setLastCopiedLogin,
  isCredentialsModalShown,
} from '../model'
import { writePasswordToClipboard } from '../lib/copy-password'

const message = useMessage()

const handleClick = (login: LoginData) => {
  isCredentialsModalShown.value = false

  if (isCopyPassword) {
    writePasswordToClipboard(serviceToCopy, login)
  } else {
    writeToClipboard(login.name)
    setLastCopiedLogin(login.name)
  }

  setTimeout(() => {
    message.info('In your clipboard')
  }, COPY_DELAY_TIME)
}
</script>

<template>
  <NModal
    v-model:show="isCredentialsModalShown"
    preset="card"
    class="app-modal"
    title="Which one?"
  >
    <NSpace vertical size="large">
      <NButton
        v-for="login in serviceToCopy.logins"
        :key="login.name"
        strong
        secondary
        size="large"
        type="primary"
        class="full-width"
        @click="() => handleClick(login)"
      >
        {{ login.name }}
      </NButton>
    </NSpace>
  </NModal>
</template>
