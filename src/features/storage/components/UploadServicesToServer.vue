<script setup lang="ts">
import axios from 'axios'
import { NButton, useMessage, useLoadingBar } from 'naive-ui'
import { CloudUploadOutline } from '@vicons/ionicons5'
import {
  API_URL,
  getSession,
  encryptData,
  createSignature,
  getDataAsBuffer,
  getKeyPairFromSeed,
  uint8ArrayToBase64,
  generateTimestampBytes,
} from '#/core'

import { areServicesEmpty } from '@/entities/session'

const loadingBar = useLoadingBar()
const message = useMessage()

const onClick = async () => {
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
    const userId = uint8ArrayToBase64(publicKey)

    // Шифруем данные
    const encryptedServices = encryptData(services, secretBoxIv, secretBoxKey)

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
    const finalPayload = new Uint8Array(signature.length + combinedData.length)

    finalPayload.set(signature)
    finalPayload.set(combinedData, signature.length)

    // Преобразуем в Base64 для отправки
    const base64Payload = uint8ArrayToBase64(finalPayload)

    // Делаем POST-запрос
    const response = await axios.post(API_URL, base64Payload, {
      headers: {
        'Content-Type': 'application/json',
        'User-Id': userId,
      },
    })

    // Проверяем успешность ответа
    if (response.status === 201) {
      message.success('Services have been uploaded on server successfully')
    } else if (response.status === 200) {
      message.success('Services have been updated to server successfully')
    } else {
      throw new Error('Unexpected response status')
    }
  } catch (error) {
    console.error(error)
    message.error('Failed to upload services')
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
    :disabled="areServicesEmpty"
    @click="onClick"
  >
    <template #icon>
      <CloudUploadOutline />
    </template>

    Upload services to server
  </NButton>
</template>
