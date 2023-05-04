import { ref } from 'vue'

export const createElementRef = <T extends HTMLElement>() =>
  ref<T>(null as unknown as T)
