import { generatePasswordFromBuffer } from '../actions/generate-password-from-buffer'

const defaultGenerate = () => {
  throw new Error('Trying to generate a password outside the active session')
}

export let generatePassword: (
  serviceName: string,
  login: string,
  version: number,
  useSymbols: boolean,
  length: number
) => Promise<string> = defaultGenerate

export const activateGenerator = (passwordsBuffer: ArrayBuffer) => {
  generatePassword = (...args) =>
    generatePasswordFromBuffer(passwordsBuffer, ...args)
}

export const deactivateGenerator = () => {
  generatePassword = defaultGenerate
}
