<script setup lang="ts">
import { ref } from 'vue'
import { generatePassword } from '#/core'
import { getPasswordLengthByIndex, ServiceData, LoginData } from '#/services'

import { CopyButton } from '@/shared'
import { rmLogin, setVersionOfLogin } from '@/entities/session'

const props = defineProps<{
  service: ServiceData
  login: LoginData
}>()

const innerVersion = ref(props.login.version)

const onVersionBlur = () => {
  if (!Number.isFinite(innerVersion.value) || innerVersion.value < 0) {
    innerVersion.value = 1
  }

  setVersionOfLogin(props.service.name, props.login.name, innerVersion.value)
}

const onDeleteClick = () => {
  const loginName = props.login.name
  const serviceName = props.service.name

  const confirmationText = [
    'Are you sure you want to delete the login',
    `"${loginName}" in the "${serviceName}" service?`,
  ].join(' ')

  if (confirm(confirmationText)) {
    rmLogin(serviceName, loginName)
  }
}

const getPassword = () =>
  generatePassword(
    props.service.name,
    props.login.name,
    props.login.version,
    props.service.useSpecialCharacters,
    getPasswordLengthByIndex(props.service.passwordLengthIndex)
  )
</script>

<template>
  <li class="proto-login-item">
    <div class="proto-name-version">
      <div class="proto-login-name">{{ login.name }}</div>

      <div>
        <span class="proto-v">v</span>

        <input
          v-model="innerVersion"
          class="proto-version-input"
          type="number"
          min="1"
          step="1"
          @blur="onVersionBlur"
        />
      </div>
    </div>

    <CopyButton :get-content="() => login.name">Copy login</CopyButton>
    <CopyButton :get-content="getPassword">Copy password</CopyButton>
    <button @click="onDeleteClick">Delete this login</button>
  </li>
</template>
