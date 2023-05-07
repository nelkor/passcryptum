<script setup lang="ts">
import { WorkScreen } from '@/pages/work-screen'
import { PasswordEntry } from '@/pages/password-entry'
import { isMasterEntered } from '@/entities/master-tool'
import { ModalWindow } from '@/entities/modal-window'
import { MasterForm } from '@/features/entry'
import { appModal, useAppModal } from '@/entities/modal-window/'

const { showModal } = useAppModal()
</script>

<template>
  <main :inert="appModal.isOpen">
    <button
      aria-label="открыть модальное окно для ввода мастерпароля"
      @click="e => showModal(MasterForm, 'Register', e)"
    >
      открыть
    </button>
    <WorkScreen v-if="isMasterEntered" />
    <PasswordEntry v-else />
  </main>
  <ModalWindow />
</template>
