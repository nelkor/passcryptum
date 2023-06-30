<script setup lang="ts">
import { ref } from 'vue'
import { readData, saveData } from '#/core'
import { parse, stringify, checkForEmptiness } from '#/services'

import { importServices } from '@/entities/session'

const importInProgress = ref(false)
const element = document.createElement('input')

element.setAttribute('type', 'file')

element.addEventListener('input', async () => {
  const [file] = Array.from(element.files as FileList)

  element.value = ''

  if (!file) {
    return
  }

  importInProgress.value = true

  const dataFromDecryption = await readData(await file.arrayBuffer())

  const config = parse(dataFromDecryption)

  if (checkForEmptiness(config)) {
    alert('Error during file import!')
  } else {
    importServices(config)

    await saveData(stringify(config))

    alert('File import was successful!')
  }

  importInProgress.value = false
})

const onClick = () => element.click()
</script>

<template>
  <button :disabled="importInProgress" @click="onClick">
    Import from file
  </button>
</template>
