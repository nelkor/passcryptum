<script setup lang="ts">
import { getDataAsString } from '#/core'

import AbstractCopyConfigButton from './AbstractCopyConfigButton.vue'
</script>

<template>
  <AbstractCopyConfigButton :get-data="getDataAsString">
    Copy config
  </AbstractCopyConfigButton>
</template>
