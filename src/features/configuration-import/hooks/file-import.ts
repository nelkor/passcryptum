import { ref, computed } from 'vue'

import { getMasterTool } from '@/entities/master-tool'
import { decrypt, getTextFromBuffer } from '@/shared'

import { importAsIs } from '../lib/import-text'

export const useFileImport = () => {
  const element = document.createElement('input')
  const importInProgress = ref(false)
  const isButtonDisabled = computed(() => importInProgress.value)

  element.setAttribute('type', 'file')

  element.addEventListener('input', async () => {
    const [file] = Array.from(element.files as FileList)

    element.value = ''

    if (!file) {
      return
    }

    const fileBuffer = await file.arrayBuffer()

    const { key, iv } = getMasterTool()

    try {
      const decryptedBuffer = await decrypt(fileBuffer, key, iv)

      const decryptedText = getTextFromBuffer(decryptedBuffer)

      if (await importAsIs(decryptedText)) {
        alert('File import was successful!')
      } else {
        alert('Error during parsing file data!')
      }
    } catch (e) {
      alert('This file can not be decrypted!')
    }
  })

  const onClick = () => element.click()

  return {
    isButtonDisabled,
    onClick,
  }
}
