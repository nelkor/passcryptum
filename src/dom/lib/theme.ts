const { body } = document

export const setTheme = (isDark: boolean) => {
  body.setAttribute('theme', isDark ? 'dark' : 'light')
}
