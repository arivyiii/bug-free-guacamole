import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig(({ mode, command }) => {
  const isLocalAgent = mode === 'local-agent'
  const isDev = command === 'serve'
  
  return {
    plugins: [
      vue(),
      vueDevTools(),
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      },
    },
    base: isDev ? '/' : '/bug-free-guacamole/',
    define: {
      'import.meta.env.VITE_USE_LOCAL_AGENT': JSON.stringify(isLocalAgent)
    }
  }
})
