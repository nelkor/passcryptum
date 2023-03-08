/**
 * @description Creates a 64-byte buffer
 */
export const sha512 = (data: ArrayBufferLike) =>
  crypto.subtle.digest('SHA-512', data)
