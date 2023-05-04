<script setup lang="ts">
import { getMasterTool } from '@/entities/master-tool'

const { shortHash } = getMasterTool()
</script>

<template>
  <div class="short-hash">
    <p>{{ shortHash.slice(0, 6) }}</p>
  </div>
</template>
