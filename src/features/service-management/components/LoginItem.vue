<script setup lang="ts">
import { computed } from 'vue'

import type { LoginData } from '@/entities/services-config'
import { IconCross } from '@/shared'

import { injectService } from '../providers/service'
import { useLoginItem } from '../hooks/login-item'

const props = defineProps<{ login: LoginData }>()
const service = injectService()

const { innerVersion, deleteLogin, onVersionBlur } = useLoginItem(
  service,
  computed(() => props.login)
)
</script>

<template>
  <li class="login-item">
    <button
      title="Delete login"
      class="aside__input login-item__delete"
      @click="deleteLogin"
    >
      <IconCross />
    </button>

    <span class="login-item__name">{{ login.name }}</span>

    <label class="login-item__version">
      <span class="login-item__version-title">version</span>

      <input
        v-model="innerVersion"
        class="login-item__input"
        type="number"
        min="1"
        step="1"
        @blur="onVersionBlur"
      />
    </label>
  </li>
</template>
