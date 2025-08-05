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
  SettingsOutline,
  DownloadOutline,
  InformationCircleOutline,
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

const options = computed(() => {
  const mainOptions = []
  
  // Основные действия для авторизованных пользователей
  if (props.isEntered) {
    mainOptions.push(
      {
        key: 'addService',
        label: 'Add Service',
        icon: renderIcon(AddCircleOutline),
      },
      {
        key: 'storage',
        label: 'Storage',
        icon: renderIcon(ServerOutline),
      },
      {
        type: 'divider',
        key: 'divider-1',
      }
    )
  }
  
  // Настройки безопасности
  mainOptions.push(
    {
      key: 'setPin',
      label: 'Set PIN',
      icon: renderIcon(LockClosedOutline),
    },
    {
      key: 'deletePin',
      label: 'Delete PIN',
      disabled: isDeletePinDisabled.value,
      icon: renderIcon(LockOpenOutline),
    },
    {
      type: 'divider',
      key: 'divider-2',
    }
  )
  
  // Настройки приложения
  mainOptions.push(
    {
      key: 'changeTheme',
      label: renderThemeLabel,
      icon: renderIcon(ColorFillOutline),
    },
    {
      key: 'settings',
      label: 'Settings',
      icon: renderIcon(SettingsOutline),
    },
    {
      type: 'divider',
      key: 'divider-3',
    }
  )
  
  // Информация и ссылки
  mainOptions.push(
    {
      key: 'download',
      label: 'Download App',
      icon: renderIcon(DownloadOutline),
    },
    {
      key: 'about',
      label: 'About',
      icon: renderIcon(InformationCircleOutline),
    },
    {
      key: 'github',
      label: renderGitHubLabel,
      icon: renderIcon(LogoGithub),
    }
  )
  
  // Выход для авторизованных пользователей
  if (props.isEntered) {
    mainOptions.push(
      {
        type: 'divider',
        key: 'divider-4',
      },
      {
        key: 'signOut',
        label: 'Sign Out',
        icon: renderIcon(LogOutOutline),
      }
    )
  }
  
  // Временная кнопка для тестирования
  mainOptions.push(
    {
      type: 'divider',
      key: 'divider-test',
    },
    {
      key: 'clearSession',
      label: 'Clear Session (Test)',
      icon: renderIcon(LogOutOutline),
    }
  )
  
  return mainOptions
})

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
    case 'settings':
      // TODO: Добавить настройки
      console.log('Settings clicked')
      break
    case 'download':
      // TODO: Добавить ссылку на скачивание
      console.log('Download clicked')
      break
    case 'about':
      // TODO: Добавить информацию о приложении
      console.log('About clicked')
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
