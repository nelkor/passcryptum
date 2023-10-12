import { capitals, formatPassword, stringifyBuffer } from '../../shared'

const parseIdBuffer = (buffer: ArrayBuffer) => ({
  id: formatPassword(buffer, 4, [capitals]),
  lsKey: stringifyBuffer(buffer),
})

export const parseOriginBuffer = (buffer: ArrayBuffer) => ({
  ...parseIdBuffer(buffer.slice(0, 8)),
  entropy: buffer.slice(8, 80),
  iv: buffer.slice(80, 96),
  cryptoKeyBuffer: buffer.slice(96),
})
