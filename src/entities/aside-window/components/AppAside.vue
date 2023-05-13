<script setup lang="ts">
import type { Component } from 'vue'

import { IconCross } from '@/shared'

import { asideState, isAsideOpen, closeAside } from '../model/aside-window'
import { useAppAside } from '../hooks/app-aside'

const { buttonClose, focusButtonClose, focusLastInput } = useAppAside()
</script>

<!-- @mousedown.prevent blocks focus loss when closing with the mouse -->
<!-- @keydown.stop blocks hotkeys under the window -->

<template>
  <div
    class="aside"
    :class="{ 'aside-closed': !isAsideOpen }"
    @mousedown.prevent="closeAside"
    @keydown.stop
    @keydown.esc="closeAside"
  >
    <aside class="aside__wrapper" @mousedown.stop>
      <input
        aria-hidden="true"
        :hidden="!isAsideOpen"
        class="invisible"
        @focus="focusLastInput"
      />

      <div class="aside__header">
        <h2 class="aside__title">{{ asideState.title }}</h2>

        <button
          ref="buttonClose"
          class="icon-button"
          :disabled="!isAsideOpen"
          title="Close aside"
          @click="closeAside"
        >
          <IconCross />
        </button>
      </div>

      <div class="aside__body">
        <component
          :is="asideState.component as Component"
          v-bind="asideState.attrs"
        />
      </div>

      <input
        :hidden="!isAsideOpen"
        aria-hidden="true"
        class="invisible"
        @focus="focusButtonClose"
      />
    </aside>
  </div>
</template>
