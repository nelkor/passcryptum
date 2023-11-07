<script setup lang="ts">
import { NP, NH1, NText, NButton } from 'naive-ui'
import { AddOutline } from '@vicons/ionicons5'

import { servicesCount } from '@/entities/session'
import { addService } from '@/features/add-service'
</script>

<template>
  <div class="service-stub-head">
    <NH1>
      <NText type="primary">{{ servicesCount }}</NText> services in&nbsp;total
    </NH1>

    <NButton
      strong
      circle
      secondary
      size="large"
      type="primary"
      class="service-stub-add-button"
      @click="addService"
    >
      <template #icon>
        <AddOutline />
      </template>
    </NButton>
  </div>

  <NP>Select one to copy credentials or create a new one.</NP>
</template>
