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
  FingerPrintOutline,
} from '@vicons/ionicons5';
import { computed, h, Component } from 'vue';
import { NDropdown, NButton, NIcon } from 'naive-ui';

import { useChangeTheme } from '@/features/theme';
import { StorageDrawer, openStorage } from '@/features/storage';
import { setPin, useDeletePin, SetPinModal } from '@/features/pin';
import { addService, AddServiceModal } from '@/features/add-service';
import { useExit, isCalculationInProgress } from '@/entities/session';
import {
  canUseBiometric,
  canSetupBiometric,
  showSetupBiometricModal,
  removeBiometricAuth,
  SetupBiometricModal,
} from '@/features/biometric';

const { exit } = useExit();
const props = defineProps<{ isEntered: boolean }>();
const { themeName, changeTheme } = useChangeTheme();
const { deletePin, isDeletePinDisabled } = useDeletePin();

const renderIcon = (icon: Component) => () =>
  h(NIcon, null, { default: () => h(icon) });

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
        // Биометрические опции
        ...(canSetupBiometric.value
          ? [
              {
                key: 'setupBiometric',
                label: 'Setup Touch ID / Face ID',
                icon: renderIcon(FingerPrintOutline),
              },
            ]
          : []),
        ...(canUseBiometric.value
          ? [
              {
                key: 'removeBiometric',
                label: 'Remove Touch ID / Face ID',
                icon: renderIcon(FingerPrintOutline),
              },
            ]
          : []),
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
]);

const handleSelect = (key: string) => {
  switch (key) {
    case 'changeTheme':
      changeTheme();
      break;
    case 'deletePin':
      deletePin();
      break;
    case 'signOut':
      exit();
      break;
    case 'setPin':
      setPin();
      break;
    case 'addService':
      addService();
      break;
    case 'storage':
      openStorage();
      break;
    case 'setupBiometric':
      showSetupBiometricModal.value = true;
      break;
    case 'removeBiometric':
      removeBiometricAuth();
      break;
  }
};
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
  <SetupBiometricModal />
</template>
