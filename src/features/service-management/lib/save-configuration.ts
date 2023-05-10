import { getMasterTool } from '@/entities/master-tool'
import { compressedConfigText } from '@/entities/services-config'
import { encrypt, getBufferOfText, stringifyBuffer } from '@/shared'

const THROTTLING_TIME = 600

let timerId = null as unknown as ReturnType<typeof setTimeout>

const deferredSaveConfiguration = () => {
  const { shortHash, key, iv } = getMasterTool()
  const compressedConfigBuffer = getBufferOfText(compressedConfigText.value)

  encrypt(compressedConfigBuffer, key, iv).then(encryptedConfigBuffer => {
    localStorage.setItem(shortHash, stringifyBuffer(encryptedConfigBuffer))
  })
}

export const saveConfiguration = () => {
  clearTimeout(timerId)

  timerId = setTimeout(deferredSaveConfiguration, THROTTLING_TIME)
}
