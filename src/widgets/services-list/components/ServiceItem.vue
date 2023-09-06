<script setup lang="ts">
import { ref, Ref } from 'vue'
import { ServiceData } from '#/services'
import { CopyOutline, SettingsOutline } from '@vicons/ionicons5'
import { NSpace, NButton, NCollapseItem, useMessage } from 'naive-ui'

import { COPY_DELAY_TIME } from '@/shared'
import { showServiceDetails } from '@/features/service-details'
import { copyLogin, copyPassword } from '@/features/credentials'

defineProps<{ service: ServiceData }>()

const message = useMessage()
const loginJustCopied = ref(false)
const passwordJustCopied = ref(false)

const createCopyHandler =
  (justCopied: Ref<boolean>, copy: (service: ServiceData) => boolean) =>
  (service: ServiceData) => {
    if (justCopied.value) {
      return
    }

    const inClipboard = copy(service)

    justCopied.value = true

    setTimeout(() => {
      justCopied.value = false

      if (inClipboard) {
        message.info('In your clipboard')
      }
    }, COPY_DELAY_TIME)
  }

const onCopyLogin = createCopyHandler(loginJustCopied, copyLogin)
const onCopyPassword = createCopyHandler(passwordJustCopied, copyPassword)
</script>

<template>
  <NCollapseItem :title="service.name">
    <NSpace :vertical="false" size="large" justify="end">
      <NButton
        :loading="loginJustCopied"
        class="service-list-button"
        :disabled="!service.logins.length"
        @click="() => onCopyLogin(service)"
      >
        <template #icon>
          <CopyOutline />
        </template>

        Copy login
      </NButton>

      <NButton
        class="service-list-button"
        :loading="passwordJustCopied"
        :disabled="!service.logins.length"
        @click="() => onCopyPassword(service)"
      >
        <template #icon>
          <CopyOutline />
        </template>

        Copy password
      </NButton>

      <NButton
        strong
        secondary
        class="service-list-button"
        @click="() => showServiceDetails(service)"
      >
        <template #icon>
          <SettingsOutline />
        </template>

        Settings
      </NButton>
    </NSpace>
  </NCollapseItem>
</template>
