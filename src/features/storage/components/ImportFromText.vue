<script setup lang="ts">
import { ref } from 'vue'
import { readData } from '#/core'
import { BookOutline, ClipboardOutline } from '@vicons/ionicons5'
import { parse, checkForEmptiness, ServicesConfig } from '#/services'
import { NH4, NIcon, NInput, NSpace, useMessage, useLoadingBar } from 'naive-ui'

import { FormSubmit } from '@/shared'
import { importServices, isCalculationInProgress } from '@/entities/session'

const message = useMessage()
const servicesString = ref('')
const loadingBar = useLoadingBar()

const setServices = (config: ServicesConfig) =>
  importServices(config).then(() => {
    requestAnimationFrame(() => loadingBar.finish())
    message.success('Services have been imported')
  })

const onSubmit = async () => {
  const { value } = servicesString
  const configAsIs = parse(value)

  servicesString.value = ''
  isCalculationInProgress.value = true

  loadingBar.start()

  if (checkForEmptiness(configAsIs)) {
    const dataFromDecryption = await readData(value)

    isCalculationInProgress.value = false

    const decryptedConfig = parse(dataFromDecryption)

    if (checkForEmptiness(decryptedConfig)) {
      loadingBar.error()
      message.error('An error occurred while importing')

      return
    }

    await setServices(decryptedConfig)
  } else {
    await setServices(configAsIs)

    isCalculationInProgress.value = false
  }
}
</script>

<template>
  <NH4>Import services from text</NH4>

  <form @submit.prevent="onSubmit">
    <NSpace vertical size="large">
      <NInput
        v-model:value="servicesString"
        size="large"
        placeholder="Paste the text"
        :disabled="isCalculationInProgress"
        :input-props="{ name: 'Paste services text' }"
      >
        <template #prefix>
          <NIcon :component="ClipboardOutline" />
        </template>
      </NInput>

      <FormSubmit :disabled="!servicesString">
        <template #icon>
          <BookOutline />
        </template>

        <template #text>Import</template>
      </FormSubmit>
    </NSpace>
  </form>
</template>
