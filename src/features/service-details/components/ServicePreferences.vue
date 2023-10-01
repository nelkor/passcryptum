<script setup lang="ts">
import { ref, watch } from 'vue'
import { passwordLengthVariants } from '#/services'
import { NH4, NText, NCheckbox, NSlider, NSpace } from 'naive-ui'

import { setServicePreferences } from '@/entities/session'

import { service } from '../model'

const innerUseSpecialCharacters = ref(service.useSpecialCharacters)
const innerLength = ref(passwordLengthVariants[service.passwordLengthIndex])

const lengthMarks = passwordLengthVariants.reduce<Record<string, string>>(
  (acc, cur) => {
    acc[cur] = cur.toString()

    return acc
  },
  {}
)

watch(
  [innerUseSpecialCharacters, innerLength],
  ([useSpecialCharacters, length]) => {
    const lengthIndex = passwordLengthVariants.indexOf(length)

    setServicePreferences(service.name, lengthIndex, useSpecialCharacters)
  }
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

    <NSlider
      v-model:value="innerLength"
      step="mark"
      :marks="lengthMarks"
      :min="passwordLengthVariants.at(0)"
      :max="passwordLengthVariants.at(-1)"
    />
  </NSpace>
</template>
