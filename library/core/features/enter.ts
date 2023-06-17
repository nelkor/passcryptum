import { activatePinInstaller } from '../entities/pin-manager'
import { activateGenerator } from '../entities/password-generator'
import { activateConfigSaver } from '../entities/config-manager'
import { createPinKeyBuffer } from '../actions/encrypt-buffer-with-pin'
import { decryptConfig } from '../actions/decrypt-config'
import { createId } from '../actions/create-id'
import {
  MASTER_HASH_BYTES_LENGTH,
  MASTER_HASH_ITERATIONS,
  LS_KEY_PIN,
  parseHexToBuffer,
  getBufferOfText,
  stringifyBuffer,
  slowHash,
  decrypt,
} from '../tools'

const enterWithMasterHash = async (masterHash: ArrayBuffer) => {
  const idBuffer = masterHash.slice(0, 8)
  const passwordsBuffer = masterHash.slice(8, 80)
  const configBuffer = masterHash.slice(80)
  const lsKey = stringifyBuffer(idBuffer)

  await activateConfigSaver(lsKey, configBuffer)

  activatePinInstaller(masterHash)
  activateGenerator(passwordsBuffer)

  return {
    id: createId(idBuffer),
    config: await decryptConfig(configBuffer, localStorage.getItem(lsKey)),
  }
}

export const enterWithMasterPassword = async (masterPassword: string) =>
  enterWithMasterHash(
    await slowHash(
      getBufferOfText(masterPassword),
      MASTER_HASH_BYTES_LENGTH,
      MASTER_HASH_ITERATIONS
    )
  )

export const enterWithPin = async (pin: string) => {
  const encryptedHash = localStorage.getItem(LS_KEY_PIN)

  if (!encryptedHash) {
    throw new Error('No encrypted hash in localStorage')
  }

  return enterWithMasterHash(
    await decrypt(
      parseHexToBuffer(encryptedHash),
      await createPinKeyBuffer(pin)
    )
  )
}
