import { ref, ComponentPublicInstance } from 'vue'

export const createElementRef = <T>() =>
  ref(null as unknown as ComponentPublicInstance<T>)
