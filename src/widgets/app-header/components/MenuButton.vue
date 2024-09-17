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
    label: () => themeName.value,
    icon: renderIcon(ColorFillOutline),
  },
  {
    key: 'github',
    label: () =>
      h(
        'a',
        {
          href: 'https://github.com/nelkor/passcryptum',
          target: '_blank',
          rel: 'noopener noreferrer',
        },
        'GitHub',
      ),
    icon: renderIcon(LogoGithub),
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
