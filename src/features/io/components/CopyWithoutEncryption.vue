<script setup lang="ts">
import { getDataDecrypted } from '#/core'

import AbstractCopyConfigButton from './AbstractCopyConfigButton.vue'
</script>

<template>
  <AbstractCopyConfigButton :get-data="getDataDecrypted">
    Copy without encryption
  </AbstractCopyConfigButton>
</template>
