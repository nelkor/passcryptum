<script setup lang="ts">
import { exit } from '@/features/entry'

import { useAppHeader } from '../hooks/app-header'

const { shortHash, buttonExit, openConfigurationAside } = useAppHeader()
</script>

<template>
  <header>
    <mark>{{ shortHash.slice(0, 6) }}</mark>
    <button ref="buttonExit" @click="exit">Exit</button>
    <button @click="openConfigurationAside">☰</button>
  </header>
</template>
