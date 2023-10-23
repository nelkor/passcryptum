import { ServiceData } from '#/services'
import { ref, watch, computed } from 'vue'

import { privateServices } from '../model/private'

export const servicesCount = computed(() => privateServices.value.length)

export const selectedServiceName = ref<string | null>(null)

export const isServiceSelected = computed(() =>
  Boolean(selectedServiceName.value)
)

export const selectedService = computed(
  () =>
    privateServices.value.find(
      ({ name }) => name === selectedServiceName.value
    ) as ServiceData
)

export const clearSelectedService = () => (selectedServiceName.value = null)

export const servicesOptions = computed(() =>
  privateServices.value
    .map(({ name }) => name)
    .sort()
    .map(name => ({
      label: name,
      value: name,
    }))
)

watch(
  servicesCount,
  value => {
    if (!value) {
      selectedServiceName.value = null
    } else if (value === 1) {
      selectedServiceName.value = privateServices.value[0].name
    }
  },
  { immediate: true }
)
