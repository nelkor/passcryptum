import { resolve } from 'path'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { viteSingleFile } from 'vite-plugin-singlefile'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '#': resolve('modules'),
      '@': resolve('src'),
    },
  },
  plugins: [vue(), viteSingleFile()],
})
