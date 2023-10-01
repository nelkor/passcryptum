<script setup lang="ts">
import { Close } from '@vicons/ionicons5'
import { NButton, useDialog, useMessage, useLoadingBar } from 'naive-ui'

import { clearServices, areServicesEmpty } from '@/entities/session'

import { showStorageDrawer } from '../model'

const dialog = useDialog()
const message = useMessage()
const loadingBar = useLoadingBar()

const onClick = () => {
  dialog.warning({
    title: 'Services will be deleted',
    content: 'Are you sure you want to delete your services?',
    positiveText: 'Delete',
    negativeText: 'Cancel',
    onPositiveClick() {
      clearServices()
      loadingBar.start()
      message.info('All of your services have been deleted')
      requestAnimationFrame(() => loadingBar.finish())

      showStorageDrawer.value = false
    },
  })
}
</script>

<template>
  <NButton
    strong
    secondary
    type="error"
    size="large"
    :disabled="areServicesEmpty"
    @click="onClick"
  >
    <template #icon>
      <Close />
    </template>

    Delete all services
  </NButton>
</template>
