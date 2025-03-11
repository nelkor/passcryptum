<script setup lang="ts">
import { getSession, getKeyPairFromSeed, uint8ArrayToBase64 } from '#/core'

import { CopyButton } from '@/shared'
import { isCalculationInProgress } from '@/entities/session'

const getPublicKey = () => {
  const { keyPairSeed } = getSession()
  const { publicKey } = getKeyPairFromSeed(keyPairSeed)

  return uint8ArrayToBase64(publicKey)
}
</script>

<template>
  <CopyButton
    strong
    tertiary
    size="large"
    type="primary"
    :get-content="getPublicKey"
    :disabled="isCalculationInProgress"
  >
    Copy public key
  </CopyButton>
</template>
