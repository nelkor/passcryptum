export {
  add,
  parse,
  stringify,
  deleteLogin,
  deleteService,
  checkForEmptiness,
  createEmptyServices,
  mergeConfigurations,
  updateVersionOfLogin,
  passwordLengthVariants,
  updateServicePreferences,
  getPasswordLengthByIndex,
} from './features'

export type { ServicesConfig, ServiceData, LoginData } from './types'
