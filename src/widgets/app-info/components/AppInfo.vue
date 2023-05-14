<script setup lang="ts">
import AppInfoLink from './AppInfoLink.vue'
</script>

<template>
  <div class="app-info">
    <p class="app-info__text">
      Working with the Passcryptum application takes&nbsp;place&nbsp;offline.
      Any&nbsp;data&nbsp;processing is&nbsp;performed by&nbsp;your&nbsp;device.
    </p>

    <p class="app-info__text">
      You can <AppInfoLink text="download the application" path="/releases" />
      to&nbsp;your&nbsp;computer to&nbsp;run&nbsp;it&nbsp;locally.
    </p>

    <p class="app-info__text">
      Read <AppInfoLink text="the instructions" path="#passcryptum" /> in
      <AppInfoLink text="our repository" path="" />.
    </p>
  </div>
</template>
