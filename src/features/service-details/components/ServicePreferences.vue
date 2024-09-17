<script setup lang="ts">
import { ref, watch } from 'vue'
import { passwordLengthVariants } from '#/services'
import { NH4, NText, NSpace, NRadio, NCheckbox, NRadioGroup } from 'naive-ui'

import { setServicePreferences } from '@/entities/session'

import { service } from '../model'

const innerUseSpecialCharacters = ref(service.useSpecialCharacters)
const innerLength = ref(passwordLengthVariants[service.passwordLengthIndex])

watch(
  [innerUseSpecialCharacters, innerLength],
  ([useSpecialCharacters, length]) => {
    const lengthIndex = passwordLengthVariants.indexOf(length)

    setServicePreferences(service.name, lengthIndex, useSpecialCharacters)
  },
)
</script>

<template>
  <NH4>Password settings</NH4>

  <NSpace vertical>
    <NCheckbox v-model:checked="innerUseSpecialCharacters">
      Use special characters
    </NCheckbox>

    <div class="preferences-length-label">
      <NText>Length</NText>
    </div>

    <NRadioGroup v-model:value="innerLength" name="password-length">
      <NSpace size="large">
        <NRadio
          v-for="variant in passwordLengthVariants"
          :key="variant"
          :value="variant"
          :label="variant.toString()"
        />
      </NSpace>
    </NRadioGroup>
  </NSpace>
</template>
