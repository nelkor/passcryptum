<script setup lang="ts">
import { getDataDecrypted } from '#/core'

import AbstractCopyServices from './AbstractCopyServices.vue'
</script>

<template>
  <AbstractCopyServices type="warning" :get-data="getDataDecrypted">
    Copy without encryption
  </AbstractCopyServices>
</template>
