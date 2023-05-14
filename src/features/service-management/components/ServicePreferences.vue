<script setup lang="ts">
import { passwordLengthVariants } from '../lib/password-length'
import { useServicePreferences } from '../hooks/service-preferences'
import { injectService } from '../providers/service'

const { innerService, checkIsInputActive } = useServicePreferences(
  injectService()
)
</script>

<template>
  <div class="service-preferences">
    <h4 class="service-preferences__title">Password preferences</h4>

    <label class="service-preferences__special">
      <input v-model="innerService.useSpecialCharacters" type="checkbox" />
      <span>Use special characters</span>
    </label>

    <div class="password-length">
      <h5 class="password-length__title">length</h5>

      <form @submit.prevent>
        <label
          v-for="(variant, index) in passwordLengthVariants"
          :key="variant"
          class="password-length__checkbox"
        >
          <input
            v-model="innerService.passwordLengthIndex"
            class="password-length__input"
            :class="{ aside__input: checkIsInputActive(index) }"
            name="password-length"
            type="radio"
            :value="index"
          />

          <span class="password-length__variant">{{ variant }}</span>
        </label>
      </form>
    </div>
  </div>
</template>
