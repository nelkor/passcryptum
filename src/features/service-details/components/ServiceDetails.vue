<script setup lang="ts">
import { NEmpty, NSpace, NDrawer, NDivider, NDrawerContent } from 'naive-ui'

import LoginItem from './LoginItem.vue'
import DeleteService from './DeleteService.vue'
import AddLoginButton from './AddLoginButton.vue'
import ServicePreferences from './ServicePreferences.vue'
import { isServiceDetailsShown, service } from '../model'
</script>

<template>
  <NDrawer v-model:show="isServiceDetailsShown" class="app-drawer">
    <NDrawerContent closable :native-scrollbar="false" :title="service.name">
      <DeleteService />
      <NDivider />
      <ServicePreferences />
      <NDivider />

      <NSpace vertical>
        <AddLoginButton />

        <template v-if="service.logins.length">
          <LoginItem
            v-for="login in service.logins"
            :key="login.name"
            :login="login"
          />
        </template>

        <NEmpty v-else size="huge" description="There are no logins here yet" />
      </NSpace>
    </NDrawerContent>
  </NDrawer>
</template>
