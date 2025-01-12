<script setup lang="ts">
import axios from 'axios'
import { NButton, useMessage, useLoadingBar } from 'naive-ui'
import { CloudDownloadOutline } from '@vicons/ionicons5'
import {
  API_URL,
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

const loadingBar = useLoadingBar()
const message = useMessage()

const onClick = async () => {
  loadingBar.start()

  try {
    // Получаем данные сессии
    const { keyPairSeed, secretBoxIv, secretBoxKey } = getSession()
    const { secretKey, publicKey } = getKeyPairFromSeed(keyPairSeed)
    const userId = uint8ArrayToBase64(publicKey)

    // Генерируем timestamp и подпись
    const timestampBytes = generateTimestampBytes()
    const signature = createSignature(timestampBytes, secretKey)

    // Делаем GET-запрос
    const response = await axios.get(API_URL, {
      headers: {
        'Content-Type': 'application/json',
        'User-Id': userId,
        'Timestamp': uint8ArrayToBase64(timestampBytes),
        'Signature': uint8ArrayToBase64(signature),
      },
    })

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

      const decryptedUint8Array = new Uint8Array(decryptedData)

      // Парсинг конфигурации
      const parsedConfig = parse(await readData(decryptedUint8Array.buffer))

      if (checkForEmptiness(parsedConfig)) {
        throw new Error('Configuration is empty')
      }

      // Импортируем сервисы
      await importServices(parsedConfig)

      message.success('Services have been downloaded from server successfully')
    } else if (response.status === 204) {
      message.success('Services not found on server')
    } else {
      throw new Error('Unexpected response status')
    }
  } catch (error) {
    console.error(error)
    message.error('Failed to download services')
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
