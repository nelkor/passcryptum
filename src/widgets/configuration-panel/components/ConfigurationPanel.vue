<script setup lang="ts">
import {
  ConfigTextImport,
  ConfigFileImport,
  DeleteConfig,
} from '@/features/configuration-import'
import {
  ConfigFileExport,
  ConfigEncryptedCopy,
  ConfigRawJsonCopy,
} from '@/features/configuration-export'
</script>

<template>
  <div class="configuration-panel">
    <h3>Configuration panel</h3>
    <hr />
    <DeleteConfig />
    <hr />
    <ConfigFileImport />
    <hr />
    <ConfigTextImport />
    <hr />
    <ConfigFileExport />
    <hr />

    <div>
      <ConfigEncryptedCopy />
      |
      <ConfigRawJsonCopy />
    </div>
  </div>
</template>
