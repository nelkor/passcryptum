<script setup lang="ts">
import { ref, watch } from 'vue'
import { passwordLengthVariants, ServiceData } from '#/services'

import { setServicePreferences } from '@/entities/session'

const props = defineProps<{ service: ServiceData }>()

const innerLengthIndex = ref(props.service.passwordLengthIndex)
const innerUseSpecialCharacters = ref(props.service.useSpecialCharacters)

watch(
  [innerLengthIndex, innerUseSpecialCharacters],
  ([passwordLengthIndex, useSpecialCharacters]) => {
    setServicePreferences(
      props.service.name,
      passwordLengthIndex,
      useSpecialCharacters
    )
  }
)
</script>

<template>
  <div class="proto-service-preferences">
    <label>
      <input v-model="innerUseSpecialCharacters" type="checkbox" />
      <span>Use special characters</span>
    </label>

    <form class="proto-length-form" @submit.prevent>
      <label v-for="(variant, index) in passwordLengthVariants" :key="variant">
        <input
          v-model="innerLengthIndex"
          type="radio"
          :value="index"
          name="password-length"
        />

        <span>{{ variant }}</span>
      </label>
    </form>
  </div>
</template>
