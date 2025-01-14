<script setup lang="ts">
import { getSession, getKeyPairFromSeed, uint8ArrayToBase64 } from '#/core'

import AbstractCopyServices from './AbstractCopyServices.vue'

const getPublicKey = async (): Promise<string | null> => {
  const { keyPairSeed } = await getSession()
  const { publicKey } = await getKeyPairFromSeed(keyPairSeed)

  return uint8ArrayToBase64(publicKey)
}
</script>

<template>
  <AbstractCopyServices type="primary" :get-data="getPublicKey">
    Copy public key
  </AbstractCopyServices>
</template>
