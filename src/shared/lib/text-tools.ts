const encoder = new TextEncoder()
const decoder = new TextDecoder()

export const getBufferOfText = (text: string) => encoder.encode(text).buffer

export const getTextFromBuffer = (buffer: ArrayBuffer) => decoder.decode(buffer)

export const reverseText = (text: string) => text.split('').reverse().join('')

export const stringifyBuffer = (buffer: ArrayBufferLike) =>
  Array.from(new Uint8Array(buffer))
    .map(n => n.toString(16).padStart(2, '0'))
    .join('')

export const parseHexToBuffer = (hex: string) => {
  const numbers = Array.from(
    { length: Math.ceil(hex.length / 2) },
    (_, index) => {
      const charIndex = index * 2
      const number = parseInt(hex.slice(charIndex, charIndex + 2), 16)

      if (Number.isNaN(number)) {
        throw new Error('Error while parsing hex')
      }

      return number
    }
  )

  return new Uint8Array(numbers).buffer
}
