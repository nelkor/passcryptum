const { body } = document

export const setIsEntered = (isEntered: boolean) => {
  body.setAttribute('header', isEntered ? 'work' : 'login')
}
