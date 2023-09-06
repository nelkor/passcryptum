<script setup lang="ts">
import { NEmpty, NButton } from 'naive-ui'
import { AddCircleOutline } from '@vicons/ionicons5'

import { addService } from '@/features/add-service'
import { areServicesEmpty } from '@/entities/session'
import { ServicesList } from '@/widgets/services-list'
</script>

<template>
  <NEmpty
    v-if="areServicesEmpty"
    size="huge"
    description="There are no services here yet"
  >
    <template #extra>
      <NButton size="large" type="primary" @click="addService">
        <template #icon>
          <AddCircleOutline />
        </template>

        Create the first one
      </NButton>
    </template>
  </NEmpty>

  <ServicesList v-else />
</template>
