// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  css: ['~/assets/scss/main.scss'],
  modules: [
    '@nuxtjs/tailwindcss',
    'nuxt-vuefire',
  ],
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
})