<script setup lang="ts">
import axios from 'axios'
import { NButton, useDialog, useMessage, useLoadingBar } from 'naive-ui'
import { Close } from '@vicons/ionicons5'
import {
  getSession,
  createSignature,
  getKeyPairFromSeed,
  uint8ArrayToBase64,
  generateTimestamp,
} from '#/core'

import { showStorageDrawer } from '../model'

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
        const { keyPairSeed } = getSession()
        const { secretKey, publicKey } = getKeyPairFromSeed(keyPairSeed)

        const timestamp = generateTimestamp()
        const signature = createSignature(timestamp, secretKey)

        const response = await axios.delete(
          'https://passcryptum.ddns.net/api/profiles/',
          // 'http://127.0.0.1:8000/api/profiles/',
          {
            headers: {
              'Content-Type': 'application/json',
              'Public-Key': uint8ArrayToBase64(publicKey),
              'Timestamp': uint8ArrayToBase64(timestamp),
              'Signature': uint8ArrayToBase64(signature),
            },
          },
        )

        if (response.status === 200) {
          message.success('All of your services have been deleted from server')
        } else if (response.status === 204) {
          message.success(
            'All of your services have already been deleted from server',
          )
        } else {
          throw new Error('Unexpected response status')
        }
      } catch (error) {
        if (
          error instanceof Error &&
          error.message === 'Request failed with status code 403'
        ) {
          message.error(
            'Public key not found. Please contact the administrator to register your public key',
          )
        } else {
          console.error('An unknown error occurred:', error)
        }
      } finally {
        loadingBar.finish()

        showStorageDrawer.value = false
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
