import { onMounted } from 'vue'

import { getMasterTool } from '@/entities/master-tool'
import { openAside } from '@/entities/aside-window'
import { createElementRef } from '@/shared'

import ConfigurationAside from '../components/ConfigurationAside.vue'

export const useAppHeader = () => {
  const { shortHash } = getMasterTool()
  const buttonExit = createElementRef<HTMLButtonElement>()

  const openConfigurationAside = () => {
    openAside('Configuration console', ConfigurationAside)
  }

  onMounted(() => {
    buttonExit.value.focus()
  })

  return {
    hash: shortHash.slice(0, 6),
    buttonExit,
    openConfigurationAside,
  }
}
