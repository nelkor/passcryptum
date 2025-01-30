<script setup lang="ts">
import axios from 'axios'
import { NButton, useMessage, useLoadingBar } from 'naive-ui'
import { CloudDownloadOutline } from '@vicons/ionicons5'
import {
  readData,
  getSession,
  decryptData,
  createSignature,
  getKeyPairFromSeed,
  base64ToUint8Array,
  uint8ArrayToBase64,
  generateTimestampBytes,
} from '#/core'
import { parse, checkForEmptiness } from '#/services'

import { importServices, isCalculationInProgress } from '@/entities/session'

const message = useMessage()
const loadingBar = useLoadingBar()

const onClick = async () => {
  loadingBar.start()

  try {
    // Получаем данные сессии
    const { keyPairSeed, secretBoxIv, secretBoxKey } = getSession()
    const { secretKey, publicKey } = getKeyPairFromSeed(keyPairSeed)

    // Генерируем timestamp и подпись
    const timestampBytes = generateTimestampBytes()
    const signature = createSignature(timestampBytes, secretKey)

    // Делаем GET-запрос
    const response = await axios.get(
      'https://passcryptum.ddns.net/api/profiles/',
      {
        headers: {
          'Content-Type': 'application/json',
          'Public-Key': uint8ArrayToBase64(publicKey),
          'Timestamp': uint8ArrayToBase64(timestampBytes),
          'Signature': uint8ArrayToBase64(signature),
        },
      },
    )

    // Проверяем успешность ответа
    if (response.status === 200) {
      // Расшифровка ответа
      const encryptedData = base64ToUint8Array(response.data)

      const decryptedData = decryptData(
        encryptedData,
        secretBoxIv,
        secretBoxKey,
      )

      if (!decryptedData) {
        throw new Error('Failed to decrypt data')
      }

      const decryptedServices = new Uint8Array(decryptedData)

      // Парсинг сервисов
      const parsedServices = parse(await readData(decryptedServices.buffer))

      if (checkForEmptiness(parsedServices)) {
        throw new Error('Parsed services is empty')
      }

      // Импортируем сервисы
      await importServices(parsedServices)

      message.success('Services have been downloaded from server successfully')
    } else if (response.status === 204) {
      message.error('Services not found on server')
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
}
</script>

<template>
  <NButton
    strong
    tertiary
    size="large"
    type="primary"
    :disabled="isCalculationInProgress"
    @click="onClick"
  >
    <template #icon>
      <CloudDownloadOutline />
    </template>

    Download services from server
  </NButton>
</template>
