const BLOCK_CLASS_NAME = 'overflow-hidden'
const html = document.querySelector<HTMLHtmlElement>('.page')

if (!html) {
  throw new Error('HTML element is undefined')
}

export const disableScroll = () => {
  html.classList.add(BLOCK_CLASS_NAME)
}

export const enableScroll = () => {
  html.classList.remove(BLOCK_CLASS_NAME)
}
