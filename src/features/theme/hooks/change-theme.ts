import { computed, watch } from 'vue'
import { useLoadingBar } from 'naive-ui'

import { setTheme } from '@/dom'
import { DROPDOWN_TIMEOUT } from '@/shared'

import { isDarkTheme } from '../model'
import { lsKey, themeVariants } from '../constants'

export const useChangeTheme = () => {
  const loadingBar = useLoadingBar()

  const themeName = computed(() =>
    isDarkTheme.value ? themeVariants.light : themeVariants.dark,
  )

  const changeTheme = () => {
    loadingBar.start()
    localStorage.setItem(lsKey, themeName.value)

    setTimeout(() => {
      isDarkTheme.value = !isDarkTheme.value

      loadingBar.finish()
    }, DROPDOWN_TIMEOUT)
  }

  watch(isDarkTheme, setTheme, { immediate: true })

  return { themeName, changeTheme }
}
