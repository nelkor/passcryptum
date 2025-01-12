<script setup lang="ts">
import axios from 'axios'
import { NButton, useDialog, useMessage, useLoadingBar } from 'naive-ui'
import { Close } from '@vicons/ionicons5'
import {
  API_URL,
  getSession,
  createSignature,
  getKeyPairFromSeed,
  uint8ArrayToBase64,
  generateTimestampBytes,
} from '#/core'

const dialog = useDialog()
const message = useMessage()
const loadingBar = useLoadingBar()

const onClick = () => {
  dialog.warning({
    title: 'Services will be deleted from server',
    content: 'Are you sure you want to delete your services from server?',
    positiveText: 'Delete',
    negativeText: 'Cancel',
    async onPositiveClick() {
      loadingBar.start()

      try {
        // Получаем данные сессии
        const { keyPairSeed } = getSession()
        const { secretKey, publicKey } = getKeyPairFromSeed(keyPairSeed)
        const userId = uint8ArrayToBase64(publicKey)

        // Генерируем timestamp и подпись
        const timestampBytes = generateTimestampBytes()
        const signature = createSignature(timestampBytes, secretKey)

        // Делаем DELETE-запрос
        const response = await axios.delete(API_URL, {
          headers: {
            'Content-Type': 'application/json',
            'User-Id': userId,
            'Timestamp': uint8ArrayToBase64(timestampBytes),
            'Signature': uint8ArrayToBase64(signature),
          },
        })

        // Проверяем успешность ответа
        if (response.status === 200) {
          message.success('Services have been deleted from server successfully')
        } else if (response.status === 204) {
          message.success('Services had already been deleted from server')
        } else {
          throw new Error('Unexpected response status')
        }
      } catch (error) {
        console.error(error)
        message.error('Failed to delete services')
      } finally {
        loadingBar.finish()
      }
    },
  })
}
</script>

<template>
  <NButton strong secondary type="error" size="large" @click="onClick">
    <template #icon>
      <Close />
    </template>

    Delete all services from server
  </NButton>
</template>
