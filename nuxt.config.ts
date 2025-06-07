// https://nuxt.com/docs/api/configuration/nuxt-config
import { visualizer } from 'rollup-plugin-visualizer'
import { resolve } from 'path'

export default defineNuxtConfig({
  runtimeConfig: {
    GOOGLE_APPLICATION_CREDENTIALS: process.env.GOOGLE_APPLICATION_CREDENTIALS,
  },
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  modules: [
    'nuxt-vuefire',
    '@nuxt/ui',
    '@pinia/nuxt',
    'pinia-plugin-persistedstate/nuxt',
    '@nuxt/test-utils/module'
  ],
  ui: {
    colorMode: false,
  },
  vuefire: {
    auth: {
      enabled: process.env.NODE_ENV !== 'test',
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
  alias: {
    '@': resolve(__dirname, '.'),
    '@pages': resolve(__dirname, 'pages'),
    '@components': resolve(__dirname, 'components'),
    '@composables': resolve(__dirname, 'composables'),
    '@utils': resolve(__dirname, 'utils'),
    '@middleware': resolve(__dirname, 'middleware'),
    '@constants': resolve(__dirname, 'constants'),
    '@interfaces': resolve(__dirname, 'interfaces'),
    '@i18n': resolve(__dirname, 'i18n'),
    '@stores': resolve(__dirname, 'stores'),
    '@mocks': resolve(__dirname, 'specs/__mocks__')
  }
})