<script setup lang="ts">
import { ref } from 'vue'
import { saveData, readData } from '#/core'
import { parse, stringify, checkForEmptiness, ServicesConfig } from '#/services'

import { importServices } from '@/entities/session'

const config = ref('')

const setServices = (config: ServicesConfig) => {
  importServices(config)

  saveData(stringify(config)).then(() => {
    alert('Text import was successful!')
  })
}

const onSubmit = async () => {
  const { value } = config
  const configAsIs = parse(value)

  config.value = ''

  if (checkForEmptiness(configAsIs)) {
    const dataFromDecryption = await readData(value)

    const decryptedConfig = parse(dataFromDecryption)

    if (checkForEmptiness(decryptedConfig)) {
      alert('Error during text import!')

      return
    }

    setServices(decryptedConfig)

    return
  }

  setServices(configAsIs)
}
</script>

<template>
  <form @submit.prevent="onSubmit">
    <input v-model="config" type="text" placeholder="Import from text" />
    <button :disabled="!config">Import</button>
  </form>
</template>
