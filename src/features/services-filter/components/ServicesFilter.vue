<script setup lang="ts">
import { NInput, NIcon } from 'naive-ui'
import { Filter } from '@vicons/ionicons5'

import { areServicesEmpty } from '@/entities/session'

import { filterSubstring, clearFilterSubstring } from '../model'
</script>

<template>
  <NInput
    v-model:value="filterSubstring"
    size="large"
    class="services-filter"
    placeholder="Filter by name"
    :disabled="areServicesEmpty"
    :input-props="{ name: 'Filter by name' }"
    @keydown.esc="clearFilterSubstring"
  >
    <template #prefix>
      <NIcon :component="Filter" />
    </template>
  </NInput>
</template>
