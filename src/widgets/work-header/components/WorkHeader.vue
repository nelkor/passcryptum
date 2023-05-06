<script setup lang="ts">
import { exit } from '@/features/entry'
import { IconExit, IconBurger } from '@/shared'

import { useAppHeader } from '../hooks/app-header'

const { hash, buttonExit, openConfigurationAside } = useAppHeader()
</script>

<template>
  <header class="work-header">
    <div class="work-header__identification">
      <span class="work-header__hash">{{ hash }}</span>

      <button
        ref="buttonExit"
        title="Exit"
        class="work-header__button"
        @click="exit"
      >
        <IconExit />
      </button>
    </div>

    <button
      title="Open configuration console"
      class="work-header__button"
      @click="openConfigurationAside"
    >
      <IconBurger />
    </button>
  </header>
</template>
