<script setup lang="ts">
import {
  Menu,
  LogoGithub,
  ServerOutline,
  LogOutOutline,
  LockOpenOutline,
  ColorFillOutline,
  AddCircleOutline,
  LockClosedOutline,
} from '@vicons/ionicons5'
import { computed, h, Component } from 'vue'
import { NDropdown, NButton, NIcon } from 'naive-ui'

import { useChangeTheme } from '@/features/theme'
import { StorageDrawer, openStorage } from '@/features/storage'
import { setPin, useDeletePin, SetPinModal } from '@/features/pin'
import { addService, AddServiceModal } from '@/features/add-service'
import { useExit, isCalculationInProgress } from '@/entities/session'

const { exit } = useExit()
const props = defineProps<{ isEntered: boolean }>()
const { themeName, changeTheme } = useChangeTheme()
const { deletePin, isDeletePinDisabled } = useDeletePin()

const renderIcon = (icon: Component) => () =>
  h(NIcon, null, { default: () => h(icon) })

const renderThemeLabel = () => themeName.value

const renderGitHubLabel = () =>
  h(
    'a',
    {
      href: 'https://github.com/nelkor/passcryptum',
      target: '_blank',
      rel: 'noopener noreferrer',
    },
    'GitHub',
  )

const options = computed(() => [
  ...(props.isEntered
    ? [
        {
          key: 'storage',
          label: 'Storage',
          icon: renderIcon(ServerOutline),
        },
        {
          key: 'addService',
          label: 'Add a service',
          icon: renderIcon(AddCircleOutline),
        },
        {
          key: 'setPin',
          label: 'Set PIN',
          icon: renderIcon(LockClosedOutline),
        },
      ]
    : []),
  {
    key: 'deletePin',
    label: 'Delete PIN',
    disabled: isDeletePinDisabled.value,
    icon: renderIcon(LockOpenOutline),
  },
  {
    key: 'changeTheme',
    label: renderThemeLabel,
    icon: renderIcon(ColorFillOutline),
  },
  {
    key: 'github',
    label: renderGitHubLabel,
    icon: renderIcon(LogoGithub),
  },
  // Временная кнопка для тестирования
  {
    key: 'clearSession',
    label: 'Clear Session (Test)',
    icon: renderIcon(LogOutOutline),
  },
  ...(props.isEntered
    ? [
        {
          key: 'signOut',
          label: 'Sign out',
          icon: renderIcon(LogOutOutline),
        },
      ]
    : []),
])

const handleSelect = (key: string) => {
  switch (key) {
    case 'changeTheme':
      changeTheme()

      break
    case 'deletePin':
      deletePin()

      break
    case 'signOut':
      exit()

      break
    case 'clearSession':
      // Очищаем сессию для тестирования
      localStorage.clear()
      window.location.reload()
      break
    case 'setPin':
      setPin()

      break
    case 'addService':
      addService()

      break
    case 'storage':
      openStorage()

      break
  }
}
</script>

<template>
  <NDropdown
    size="huge"
    trigger="click"
    :options="options"
    @select="handleSelect"
  >
    <NButton quaternary class="header-menu" :disabled="isCalculationInProgress">
      <template #icon>
        <Menu />
      </template>
    </NButton>
  </NDropdown>

  <SetPinModal />
  <StorageDrawer />
  <AddServiceModal />
</template>
