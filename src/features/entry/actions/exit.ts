import { clearMasterPassword } from '@/entities/master-tool'
import { clearServicesConfig } from '@/entities/services-config'

export const exit = () => {
  clearMasterPassword()
  clearServicesConfig()
}
