export const watchHeight = () => {
  const setHeight = () => {
    const vh = window.innerHeight / 100

    document.documentElement.style.setProperty('--vh', `${vh}px`)
  }

  setHeight()
  window.addEventListener('resize', setHeight)
}
