import { ref, computed } from 'vue'

const masterPassword = ref('')

export const isMasterEntered = computed(() => Boolean(masterPassword.value))

export const setMasterPassword = (password: string) => {
  masterPassword.value = password
}

export const clearMasterPassword = () => {
  masterPassword.value = ''
}
