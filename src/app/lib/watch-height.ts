export const watchHeight = () => {
  const setHeight = () => {
    const vh = window.innerHeight * 0.01

    document.documentElement.style.setProperty('--vh', `${vh.toFixed(2)}px`)
  }

  setHeight()
  window.addEventListener('resize', setHeight)
}
