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
  build: {
    target: 'esnext',
    minify: 'terser',
    rollupOptions: {
      output: {
        manualChunks: undefined as any,
      },
    },
  },
  optimizeDeps: {
    include: ['vue', 'naive-ui'],
  },
  server: {
    port: 3000,
    open: true,
  },
})
