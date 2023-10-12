<script setup lang="ts">
import { ref, watch } from 'vue'
import { NH1, NText, NCollapse } from 'naive-ui'

import { filteredServices } from '@/features/services-filter'
import { AddLoginModal, ServiceDetails } from '@/features/service-details'
import { CredentialsModal, clearLastCopiedLogin } from '@/features/credentials'

import ServiceItem from './ServiceItem.vue'

const expandedNames = ref<null | string | undefined>(undefined)

watch(
  filteredServices,
  services => {
    if (services.length === 1) {
      expandedNames.value = services[0].name
    } else {
      expandedNames.value = null

      requestAnimationFrame(() => {
        expandedNames.value = undefined
      })
    }
  },
  { immediate: true }
)
</script>

<template>
  <NH1>
    My services <NText type="primary">({{ filteredServices.length }})</NText>
  </NH1>

  <NCollapse
    v-if="filteredServices.length"
    accordion
    :expanded-names="expandedNames"
    @item-header-click="clearLastCopiedLogin"
  >
    <ServiceItem
      v-for="service in filteredServices"
      :key="service.name"
      :service="service"
    />
  </NCollapse>

  <NText v-else>
    None of the existing services matches the&nbsp;specified&nbsp;filter.
  </NText>

  <CredentialsModal />
  <ServiceDetails />
  <AddLoginModal />
</template>
