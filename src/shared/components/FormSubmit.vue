<script setup lang="ts">
import { NButton } from 'naive-ui'
</script>

<template>
  <NButton
    strong
    secondary
    size="large"
    type="primary"
    v-bind="$attrs"
    attr-type="submit"
    class="full-width"
  >
    <template #icon>
      <slot name="icon" />
    </template>

    <slot name="text">Continue</slot>
  </NButton>
</template>
