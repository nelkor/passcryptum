<script setup lang="ts">
import { readData, saveData } from '#/core'
import { DocumentOutline } from '@vicons/ionicons5'
import { parse, stringify, checkForEmptiness } from '#/services'
import { NH4, NButton, useMessage, useLoadingBar } from 'naive-ui'

import { importServices } from '@/entities/session'

const message = useMessage()
const loadingBar = useLoadingBar()
const element = document.createElement('input')

element.setAttribute('type', 'file')

element.addEventListener('input', async () => {
  const [file] = Array.from(element.files as FileList)

  element.value = ''

  if (!file) {
    return
  }

  loadingBar.start()

  const dataFromDecryption = await readData(await file.arrayBuffer())

  const config = parse(dataFromDecryption)

  if (checkForEmptiness(config)) {
    loadingBar.error()
    message.error('An error occurred while importing')
  } else {
    importServices(config)

    await saveData(stringify(config))

    loadingBar.finish()
    message.success('Services have been imported')
  }
})

const onClick = () => element.click()
</script>

<template>
  <NH4>Import services from file</NH4>

  <NButton strong secondary size="large" type="primary" @click="onClick">
    <template #icon>
      <DocumentOutline />
    </template>

    Select file
  </NButton>
</template>
