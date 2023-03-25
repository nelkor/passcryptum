import { decompressConfig, setServicesConfig } from '@/entities/services-config'
import {
  setMasterPassword,
  getMasterTool,
  decryptHex,
} from '@/entities/master-tool'

export const enter = async (masterPassword: string) => {
  await setMasterPassword(masterPassword)

  const { shortHash } = getMasterTool()
  const savedConfig = localStorage.getItem(shortHash)

  if (!savedConfig) {
    return
  }

  const decryptedText = await decryptHex(savedConfig)

  try {
    setServicesConfig(decompressConfig(JSON.parse(decryptedText)))
  } catch (e) {
    localStorage.removeItem(shortHash)

    alert('Invalid saved configuration detected and deleted')

    return
  }
}
