export const getFingerprint = () =>
  [
    Math.max(screen.width, screen.height),
    screen.colorDepth,
    new Date().getTimezoneOffset(),
    navigator.language,
    navigator.userAgent,
  ].join()
