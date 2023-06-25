<script setup lang="ts">
import type { Component } from 'vue'

import { IconCross } from '@/shared'

import { windowState, isWindowOpen, closeWindow } from '../model/app-window'
import { useAppWindow } from '../hooks/app-window'

const { buttonClose, focusButtonClose, focusLastInput } = useAppWindow()
</script>

<!-- @mousedown.prevent blocks focus loss when closing with the mouse -->
<!-- @keydown.stop blocks hotkeys under the window -->

<template>
  <div
    class="window"
    :class="{ 'window-closed': !isWindowOpen }"
    @mousedown.prevent="closeWindow"
    @keydown.stop
    @keydown.esc="closeWindow"
  >
    <div class="window__wrapper" @mousedown.stop>
      <input
        aria-hidden="true"
        :hidden="!isWindowOpen"
        class="invisible"
        @focus="focusLastInput"
      />

      <div class="window__header">
        <h2 class="window__title">{{ windowState.title }}</h2>

        <button
          ref="buttonClose"
          class="icon-button"
          :disabled="!isWindowOpen"
          title="Close side window"
          @click="closeWindow"
        >
          <IconCross />
        </button>
      </div>

      <div class="window__body">
        <component
          :is="windowState.component as Component"
          v-bind="windowState.attrs"
        />
      </div>

      <input
        :hidden="!isWindowOpen"
        aria-hidden="true"
        class="invisible"
        @focus="focusButtonClose"
      />
    </div>
  </div>
</template>
