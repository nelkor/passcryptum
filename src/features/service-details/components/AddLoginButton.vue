<script setup lang="ts">
import { NButton } from 'naive-ui'
import { AddCircleOutline } from '@vicons/ionicons5'

import { showAddLoginModal } from '../model'

const onClick = () => {
  showAddLoginModal.value = true
}
</script>

<template>
  <NButton type="primary" size="large" @click="onClick">
    <template #icon>
      <AddCircleOutline />
    </template>

    Add a login
  </NButton>
</template>
