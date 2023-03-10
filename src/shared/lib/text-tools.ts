const encoder = new TextEncoder()

export const getBufferOfText = (text: string) => encoder.encode(text).buffer

export const reverseText = (text: string) => text.split('').reverse().join('')

export const bufferToHexString = (buffer: ArrayBufferLike) =>
  Array.from(new Uint8Array(buffer))
    .map(n => n.toString(16).padStart(2, '0'))
    .join('')
