/**
 * Функция normalize100vh устанавливает 100vh для доступного к просмотру вюпорта
 * тем самым приводя для всех браузеров высоту к одному виду и адапптирует так
 * что в браузерах с полосами которые сверху и снизу сайт не заходит под них
 */
export function normalize100vh() {
  const setHeight = () => {
    const vh = window.innerHeight * 0.01 // наxодим  1vh

    document.documentElement.style.setProperty('--vh', `${vh}px`)
    // --vh использовать в css -> height: calc(var(--vh) * 100);
  }

  setHeight()
  window.addEventListener('resize', setHeight)
}
