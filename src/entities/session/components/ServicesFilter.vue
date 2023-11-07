<script setup lang="ts">
import { NSelect } from 'naive-ui'
import { Filter } from '@vicons/ionicons5'

import { useHotkeyFocus } from '../hooks/hotkey-focus'
import { servicesOptions } from '../lib/services-options'
import { useServiceFilter } from '../hooks/service-filter'

const { inputElement } = useHotkeyFocus()
const { filterString } = useServiceFilter()
</script>

<template>
  <NSelect
    ref="inputElement"
    v-model:value="filterString"
    filterable
    size="large"
    class="services-filter"
    :options="servicesOptions"
    placeholder="Select service"
    :disabled="servicesOptions.length < 2"
    :input-props="{ name: 'Select service' }"
  >
    <template #arrow>
      <Filter />
    </template>
  </NSelect>
</template>
