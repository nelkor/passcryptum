<script setup lang="ts">
import { computed } from 'vue'

import type { LoginData } from '@/entities/services-config'

import { injectService } from '../providers/service'
import { useLoginItem } from '../hooks/login-item'

const props = defineProps<{ login: LoginData }>()
const service = injectService()

const { innerVersion, deleteLogin } = useLoginItem(
  service,
  computed(() => props.login)
)
</script>

<template>
  <li>
    <h4>{{ login.name }}</h4>

    <label>
      <span>version</span>
      <input v-model="innerVersion" type="number" min="1" step="1" />
    </label>

    <button class="aside__input" @click="deleteLogin">Delete</button>
  </li>
</template>
