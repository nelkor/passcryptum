<script setup lang="ts">
import { NP, NCard } from 'naive-ui'

import GitHubLink from './GitHubLink.vue'
import ExternalLink from './ExternalLink.vue'
</script>

<template>
  <NCard title="For your information">
    <NP>
      Working with the Passcryptum application takes&nbsp;place&nbsp;offline.
      Any&nbsp;data&nbsp;processing is&nbsp;performed by&nbsp;your&nbsp;device.
    </NP>

    <NP>
      You can
      <GitHubLink path="/releases">download the application</GitHubLink>
      to&nbsp;your&nbsp;computer to&nbsp;run&nbsp;it&nbsp;locally.
    </NP>

    <NP>
      Read
      <GitHubLink path="#passcryptum">the instructions</GitHubLink>
      in our repository.
    </NP>

    <NP>
      You can also join
      <ExternalLink url="t.me/passcryptum">our Telegram channel</ExternalLink>.
    </NP>
  </NCard>
</template>
