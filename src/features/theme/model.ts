import { ref, computed } from 'vue'
import { useOsTheme, darkTheme } from 'naive-ui'

import { lsKey, themeVariants } from './constants'

const lsTheme = localStorage.getItem(lsKey)
const isLsDarkTheme = lsTheme === themeVariants.dark

export const isDarkTheme = ref(
  lsTheme ? isLsDarkTheme : useOsTheme().value === 'dark',
)

export const theme = computed(() => (isDarkTheme.value ? darkTheme : null))
