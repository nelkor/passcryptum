<script setup lang="ts">
import { WorkScreen } from '@/pages/work-screen'
import { PasswordEntry } from '@/pages/password-entry'
import { isMasterEntered } from '@/entities/master-tool'
import { ModalWindow, showModal, open } from '@/entities/modal-window'
import { MasterForm } from '@/features/entry'

import '@/app/style/helpers.scss'
</script>

<template>
  <main :inert="open">
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
