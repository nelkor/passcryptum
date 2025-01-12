<script setup lang="ts">
import { NH4, NSpace, NDrawer, NDivider, NDrawerContent } from 'naive-ui'

import { showStorageDrawer } from '../model'
import FileImport from './FileImport.vue'
import CopyServices from './CopyServices.vue'
import DownloadFile from './DownloadFile.vue'
import CopyPublicKey from './CopyPublicKey.vue'
import DeleteServices from './DeleteServices.vue'
import ImportFromText from './ImportFromText.vue'
import CopyWithoutEncryption from './CopyWithoutEncryption.vue'
import UploadServicesToServer from './UploadServicesToServer.vue'
import DeleteServicesFromServer from './DeleteServicesFromServer.vue'
import DownloadServicesFromServer from './DownloadServicesFromServer.vue'
</script>

<template>
  <NDrawer v-model:show="showStorageDrawer" class="app-drawer">
    <NDrawerContent closable title="Storage" :native-scrollbar="false">
      <DeleteServices />
      <NDivider />
      <FileImport />
      <NDivider />
      <ImportFromText />
      <NDivider />
      <NH4>API actions</NH4>

      <NSpace vertical size="large">
        <DeleteServicesFromServer />
        <DownloadServicesFromServer />
        <UploadServicesToServer />
        <CopyPublicKey />
      </NSpace>
      <NDivider />
      <NH4>Export services</NH4>

      <NSpace vertical size="large">
        <DownloadFile />
        <CopyServices />
        <CopyWithoutEncryption />
      </NSpace>
    </NDrawerContent>
  </NDrawer>
</template>
