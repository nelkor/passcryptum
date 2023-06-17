import { deactivateConfigSaver } from '../entities/config-manager'
import { deactivateGenerator } from '../entities/password-generator'
import { deactivatePinInstaller } from '../entities/pin-manager'

export const exit = () => {
  deactivateConfigSaver()
  deactivateGenerator()
  deactivatePinInstaller()
}
