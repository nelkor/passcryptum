import { setMasterPassword } from '@/entities/master-tool'
import { setEmptyServicesConfig } from '@/entities/services-config'

export const enter = async (masterPassword: string) => {
  await setMasterPassword(masterPassword)

  setEmptyServicesConfig()
}
