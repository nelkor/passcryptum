<script setup lang="ts">
import { deletePin } from '#/core'

import { isPinSet, setPinState } from '@/entities/session'

const onClick = () => {
  deletePin()
  setPinState(false)
}
</script>

<template>
  <button :disabled="!isPinSet" @click="onClick">Delete PIN</button>
</template>
