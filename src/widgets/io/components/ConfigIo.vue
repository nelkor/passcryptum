<script setup lang="ts">
import {
  InputConfigForm,
  CopyConfigButton,
  ImportFileButton,
  DownloadConfigButton,
  CopyWithoutEncryption,
} from '@/features/io'
</script>

<template>
  <div>
    <div>
      <InputConfigForm />
      <ImportFileButton />
    </div>

    <div>
      <CopyConfigButton />
      <CopyWithoutEncryption />
      <DownloadConfigButton />
    </div>
  </div>
</template>
