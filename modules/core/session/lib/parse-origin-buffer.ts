import { capitals, formatPassword, stringifyBuffer } from '../../shared'

const parseIdBuffer = (buffer: ArrayBuffer) => ({
  id: formatPassword(buffer, 4, [capitals]),
  lsKey: stringifyBuffer(buffer),
})

export const parseOriginBuffer = (buffer: ArrayBuffer) => ({
  ...parseIdBuffer(buffer.slice(0, 8)),
  entropy: buffer.slice(8, 120),
  iv: buffer.slice(120, 136),
  keyPairSeedBuffer: buffer.slice(136, 168),
  secretBoxIvBuffer: buffer.slice(168, 192),
  secretBoxKeyBuffer: buffer.slice(192, 224),
  cryptoKeyBuffer: buffer.slice(224),
})
