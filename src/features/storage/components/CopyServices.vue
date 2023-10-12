<script setup lang="ts">
import { getDataAsString } from '#/core'

import AbstractCopyServices from './AbstractCopyServices.vue'
</script>

<template>
  <AbstractCopyServices type="primary" :get-data="getDataAsString">
    Copy storage text
  </AbstractCopyServices>
</template>
