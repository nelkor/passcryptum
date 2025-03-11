<script setup lang="ts">
import axios from 'axios'
import { NButton, useDialog, useMessage, useLoadingBar } from 'naive-ui'
import { CloudUploadOutline } from '@vicons/ionicons5'
import {
  getSession,
  encryptData,
  createSignature,
  getDataAsBuffer,
  concatUint8Arrays,
  getKeyPairFromSeed,
  uint8ArrayToBase64,
  generateTimestamp,
} from '#/core'

import { areServicesEmpty } from '@/entities/session'

import { showStorageDrawer } from '../model'

const dialog = useDialog()
const message = useMessage()
const loadingBar = useLoadingBar()

const onClick = () => {
  dialog.warning({
    title: 'Services will be uploaded to server',
    content: 'Are you sure you want to upload your services to server?',
    positiveText: 'Upload',
    negativeText: 'Cancel',
    async onPositiveClick() {
      loadingBar.start()

      try {
        const buffer = await getDataAsBuffer()

        if (!buffer) {
          throw new Error('Empty buffer when uploading services')
        }

        const services = new Uint8Array(buffer)

        const { keyPairSeed, secretBoxIv, secretBoxKey } = getSession()
        const { secretKey, publicKey } = getKeyPairFromSeed(keyPairSeed)

        const encryptedServices = encryptData(
          services,
          secretBoxIv,
          secretBoxKey,
        )

        const timestamp = generateTimestamp()
        const combinedData = concatUint8Arrays(timestamp, encryptedServices)
        const signature = createSignature(combinedData, secretKey)
        const requestData = concatUint8Arrays(signature, combinedData)

        const response = await axios.post(
          'https://passcryptum.ddns.net/api/profiles/',
          // 'http://127.0.0.1:8000/api/profiles/',
          uint8ArrayToBase64(requestData),
          {
            headers: {
              'Content-Type': 'application/json',
              'Public-Key': uint8ArrayToBase64(publicKey),
            },
          },
        )

        if (response.status === 200) {
          message.success('Services have been uploaded to server successfully')
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
  <NButton
    strong
    tertiary
    size="large"
    type="primary"
    :disabled="areServicesEmpty"
    @click="onClick"
  >
    <template #icon>
      <CloudUploadOutline />
    </template>

    Upload services to server
  </NButton>
</template>
