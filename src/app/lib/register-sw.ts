export const registerServiceWorker = () => {
  if (
    location.host &&
    !location.host.startsWith('localhost') &&
    'serviceWorker' in navigator
  ) {
    navigator.serviceWorker.register('/sw.js')
  }
}
