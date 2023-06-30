<script setup lang="ts">
import { DeletePinButton } from '@/features/pin'
import { PinLoginForm, PasswordLoginForm } from '@/entities/session'
</script>

<template>
  <fieldset>
    <legend>PIN</legend>

    <p class="proto-description">
      Login by PIN is available after setting it up. PIN login information is
      stored on your device. You can delete this data at any time. To set up a
      PIN, first log in with your password.
    </p>

    <DeletePinButton />
    <PinLoginForm />
  </fieldset>

  <fieldset>
    <legend>Password</legend>

    <p class="proto-description">
      Come up with, remember and enter a strong password.
    </p>

    <PasswordLoginForm />
  </fieldset>
</template>
