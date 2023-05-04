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
import { SaveCancelConfig } from '@/features/save-configuration'
import { isConfigEmpty } from '@/entities/services-config'
import { CopyButton } from '@/shared'

const getWithoutEncryption = getConfigText.bind(null, true)
</script>

<template>
  <div class="configuration-panel">
    <h3>Configuration panel</h3>
    <hr />
    <SaveCancelConfig />
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
      <CopyButton :disabled="isConfigEmpty" :get-content="getConfigText">
        Copy config
      </CopyButton>
      |
      <CopyButton :disabled="isConfigEmpty" :get-content="getWithoutEncryption">
        Copy without encryption
      </CopyButton>
    </div>
  </div>
</template>
