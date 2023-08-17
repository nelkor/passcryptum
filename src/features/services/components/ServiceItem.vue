<script setup lang="ts">
import { ServiceData } from '#/services'

import { rmService, addServiceAndLogin } from '@/entities/session'

import LoginItem from './LoginItem.vue'
import ServicePreferences from './ServicePreferences.vue'

const props = defineProps<{ service: ServiceData }>()

const deleteService = () => {
  const { name } = props.service

  if (confirm(`Are you sure you want to delete the "${name}" service?`)) {
    rmService(name)
  }
}

const addLogin = () => {
  const { name } = props.service
  const loginName = prompt(`Enter a login for the "${name}" service.`)

  if (loginName) {
    addServiceAndLogin(name, loginName)
  }
}
</script>

<template>
  <li>
    <fieldset>
      <legend>{{ service.name }}</legend>
      <ServicePreferences :service="service" />

      <ul>
        <LoginItem
          v-for="login in service.logins"
          :key="login.name"
          :service="service"
          :login="login"
        />
      </ul>

      <button @click="addLogin">Add a login</button>
      <button @click="deleteService">Delete this service</button>
    </fieldset>
  </li>
</template>
