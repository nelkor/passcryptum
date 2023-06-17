import { capitals, createPassword } from '../tools'

export const createId = (buffer: ArrayBuffer) =>
  createPassword(buffer, 4, [capitals])
