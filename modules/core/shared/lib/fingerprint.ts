export const getFingerprint = (): string => {
  const fingerprint: (string | number)[] = [
    navigator.userAgent,
    navigator.language,
    navigator.hardwareConcurrency ?? 'unknown',
    new Date().getTimezoneOffset(),
  ]

  const canvas: HTMLCanvasElement = document.createElement('canvas')
  const ctx: CanvasRenderingContext2D | null = canvas.getContext('2d')

  if (ctx) {
    ctx.font = '14px Arial'
    ctx.fillText('fingerprint', 10, 20)
    fingerprint.push(canvas.toDataURL())
  } else {
    fingerprint.push('canvas-not-supported')
  }

  return fingerprint.join()
}
