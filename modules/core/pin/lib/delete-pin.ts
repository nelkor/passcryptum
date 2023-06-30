import { LS_KEY_PIN } from '../../constants'

export const deletePin = () => localStorage.removeItem(LS_KEY_PIN)
