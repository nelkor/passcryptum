const encoder = new TextEncoder()
const decoder = new TextDecoder()

export const getBufferOfText = (text: string) =>
  encoder.encode(text).buffer as ArrayBuffer

export const getTextFromBuffer = (buffer: ArrayBuffer) => decoder.decode(buffer)

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
    },
  )

  return new Uint8Array(numbers).buffer
}
