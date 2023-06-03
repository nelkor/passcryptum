<script setup lang="ts">
import GitHubLink from './GitHubLink.vue'
import AppInfoLink from './AppInfoLink.vue'
</script>

<template>
  <div class="app-info">
    <p class="app-info__text">
      Working with the Passcryptum application takes&nbsp;place&nbsp;offline.
      Any&nbsp;data&nbsp;processing is&nbsp;performed by&nbsp;your&nbsp;device.
    </p>

    <p class="app-info__text">
      You can <GitHubLink text="download the application" path="/releases" />
      to&nbsp;your&nbsp;computer to&nbsp;run&nbsp;it&nbsp;locally.
    </p>

    <p class="app-info__text">
      Read <GitHubLink text="the instructions" path="#passcryptum" /> in
      <GitHubLink text="our repository" path="" />.
    </p>

    <p class="app-info__text">
      You can also join
      <AppInfoLink text="our Telegram channel" url="t.me/passcryptum" />.
    </p>
  </div>
</template>
