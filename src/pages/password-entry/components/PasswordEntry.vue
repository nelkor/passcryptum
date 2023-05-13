<script setup lang="ts">
import { AppInfo } from '@/widgets/app-info'
import { MasterForm } from '@/features/entry'
</script>

<template>
  <div class="password-entry">
    <div class="password-entry__wrapper">
      <h1 class="password-entry__header">Enter your master&nbsp;password</h1>
      <MasterForm />
    </div>

    <footer class="password-entry__bottom">
      <AppInfo class="password-entry__wrapper" />
    </footer>
  </div>
</template>
