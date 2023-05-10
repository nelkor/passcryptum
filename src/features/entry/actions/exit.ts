import { clearMasterPassword } from '@/entities/master-tool'
import { clearServicesConfig } from '@/entities/services-config'
import { clearPasswordGenerator } from '@/entities/password-generator'

export const exit = () => {
  clearMasterPassword()
  clearServicesConfig()
  clearPasswordGenerator()
}
