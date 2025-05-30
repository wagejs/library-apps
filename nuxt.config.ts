// https://nuxt.com/docs/api/configuration/nuxt-config
import { visualizer } from 'rollup-plugin-visualizer'

export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  modules: [
    'nuxt-vuefire',
    '@nuxt/ui',
    '@pinia/nuxt',
    'pinia-plugin-persistedstate/nuxt',
  ],
  ui: {
    colorMode: false,
  },
  vuefire: {
    auth: {
      enabled: true,
    },
    config: {
      apiKey: "AIzaSyCBjJLjNPW3aB_LqiQbv9wnMxcXrNsaKvI",
      authDomain: "libray-apps.firebaseapp.com",
      projectId: "libray-apps",
      storageBucket: "libray-apps.firebasestorage.app",
      messagingSenderId: "900708321604",
      appId: "1:900708321604:web:14c602c659cc3deda86f11"
    },
  },
  vite: {
    build: {
      sourcemap: false,
      rollupOptions: {
        output: {
          manualChunks: {
            'vuefire': ['vuefire'],
            'vue-router': ['vue-router'],
            'vue': ['vue'],
            'pinia': ['pinia'],
            'superstruct': ['superstruct'],
            'firebase': ['firebase/auth'],
          }
        }
      }
    },
    plugins: [visualizer({ open: true })],
  },
})