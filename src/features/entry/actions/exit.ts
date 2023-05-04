import { clearMasterPassword } from '@/entities/master-tool'
import { clearServicesConfig, isConfigSaved } from '@/entities/services-config'
import { clearPasswordGenerator } from '@/entities/password-generator'

const confirmationText =
  'The current configuration has not been saved. Are you sure you want to exit?'

export const exit = () => {
  if (!isConfigSaved.value && !confirm(confirmationText)) {
    return
  }

  clearMasterPassword()
  clearServicesConfig()
  clearPasswordGenerator()
}
