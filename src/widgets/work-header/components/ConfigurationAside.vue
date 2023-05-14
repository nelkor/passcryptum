<script setup lang="ts">
import {
  ConfigTextImport,
  ConfigFileImport,
  DeleteConfig,
} from '@/features/configuration-import'
import {
  ConfigFileExport,
  getConfigText,
} from '@/features/configuration-export'
import { isConfigEmpty } from '@/entities/services-config'
import { CopyButton } from '@/shared'

const getWithoutEncryption = getConfigText.bind(null, true)
</script>

<template>
  <DeleteConfig />
  <h4 class="configuration-label">Configuration import</h4>
  <ConfigFileImport />
  <ConfigTextImport />
  <h4 class="configuration-label">Configuration export</h4>
  <ConfigFileExport class="in-block-element" />

  <CopyButton
    class="app-button app-button__common in-block-element"
    :disabled="isConfigEmpty"
    :get-content="getConfigText"
  >
    Copy config
  </CopyButton>

  <CopyButton
    class="app-button app-button__common in-block-element aside__input"
    :disabled="isConfigEmpty"
    :get-content="getWithoutEncryption"
  >
    Copy without encryption
  </CopyButton>
</template>
