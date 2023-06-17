import {
  createEncryptionData,
  encryptWithAesData,
  getBufferOfText,
  stringifyBuffer,
} from '../tools'

const defaultSaveConfiguration = () => {
  throw new Error('Trying to save configuration outside the active session')
}

export let saveConfiguration: (jsonData: string) => Promise<void> =
  defaultSaveConfiguration

export const activateConfigSaver = async (
  lsKey: string,
  configBuffer: ArrayBuffer
) => {
  const { iv, key } = await createEncryptionData(configBuffer)

  saveConfiguration = async jsonData => {
    localStorage.setItem(
      lsKey,
      stringifyBuffer(
        await encryptWithAesData(getBufferOfText(jsonData), iv, key)
      )
    )
  }
}

export const deactivateConfigSaver = () => {
  saveConfiguration = defaultSaveConfiguration
}
