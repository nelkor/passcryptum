export const formatPassword = (
  buffer: ArrayBuffer,
  length: number,
  charset: string[],
) => {
  if (length < charset.length) {
    throw new Error('Password length is less than charset length')
  }

  if (length > buffer.byteLength / 2) {
    throw new Error('Password length is more than half the buffer size')
  }

  const charUnion = charset.join('')
  const seeds = new Uint16Array(buffer)

  return Array.from({ length }, (_, index) => {
    const letters = charset[index] || charUnion
    const seed = seeds[index]
    const char = letters.charAt(seed % letters.length)

    return { char, seed }
  })
    .sort((a, b) => a.seed - b.seed)
    .map(({ char }) => char)
    .join('')
}
