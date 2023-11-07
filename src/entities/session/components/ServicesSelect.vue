<script setup lang="ts">
import { NInput, NIcon } from 'naive-ui'
import { Search } from '@vicons/ionicons5'

import { servicesOptions, selectedServiceName } from '../lib/services-options'
</script>

<template>
  <div class="services-select">
    <select
      v-model="selectedServiceName"
      name="Select service"
      :disabled="servicesOptions.length < 2"
    >
      <option
        v-for="option in servicesOptions"
        :key="option.value"
        :value="option.value"
      >
        {{ option.label }}
      </option>
    </select>

    <NInput
      readonly
      size="large"
      placeholder="Select service"
      :value="selectedServiceName"
      :input-props="{ name: 'Show selected service' }"
    >
      <template #prefix>
        <NIcon :component="Search" />
      </template>
    </NInput>
  </div>
</template>
