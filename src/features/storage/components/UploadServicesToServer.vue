<script setup lang="ts">
import axios from 'axios'
import { NButton, useDialog, useMessage, useLoadingBar } from 'naive-ui'
import { CloudUploadOutline } from '@vicons/ionicons5'
import {
  getSession,
  encryptData,
  createSignature,
  getDataAsBuffer,
  getKeyPairFromSeed,
  uint8ArrayToBase64,
  generateTimestampBytes,
} from '#/core'

import { areServicesEmpty } from '@/entities/session'

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
        // Получаем данные для шифрования
        const buffer = await getDataAsBuffer()

        if (!buffer) {
          throw new Error('Empty buffer when uploading services')
        }

        const services = new Uint8Array(buffer)

        // Получаем данные сессии
        const { keyPairSeed, secretBoxIv, secretBoxKey } = getSession()
        const { secretKey, publicKey } = getKeyPairFromSeed(keyPairSeed)

        // Шифруем данные
        const encryptedServices = encryptData(
          services,
          secretBoxIv,
          secretBoxKey,
        )

        // Генерируем метку времени
        const timestampBytes = generateTimestampBytes()

        // Объединяем timestamp и зашифрованные данные
        const combinedData = new Uint8Array(
          timestampBytes.length + encryptedServices.length,
        )

        combinedData.set(timestampBytes)
        combinedData.set(encryptedServices, timestampBytes.length)

        // Создаем подпись
        const signature = createSignature(combinedData, secretKey)

        // Формируем окончательный массив
        const finalPayload = new Uint8Array(
          signature.length + combinedData.length,
        )

        finalPayload.set(signature)
        finalPayload.set(combinedData, signature.length)

        // Делаем POST-запрос
        const response = await axios.post(
          'https://passcryptum.ddns.net/api/profiles/',
          uint8ArrayToBase64(finalPayload),
          {
            headers: {
              'Content-Type': 'application/json',
              'Public-Key': uint8ArrayToBase64(publicKey),
            },
          },
        )

        // Проверяем успешность ответа
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
