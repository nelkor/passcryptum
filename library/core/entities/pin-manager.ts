import { encryptBufferWithPin } from '../actions/encrypt-buffer-with-pin'
import { LS_KEY_PIN } from '../tools'

const defaultSetPin = () => {
  throw new Error('Trying to set a PIN outside the active session')
}

export let setPin: (pin: string) => Promise<void> = defaultSetPin

export const removePin = () => localStorage.removeItem(LS_KEY_PIN)

export const activatePinInstaller = (masterHash: ArrayBuffer) => {
  setPin = async pin => {
    localStorage.setItem(
      LS_KEY_PIN,
      await encryptBufferWithPin(masterHash, pin)
    )
  }
}

export const deactivatePinInstaller = () => {
  setPin = defaultSetPin
}
