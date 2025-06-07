import { defineVitestConfig } from '@nuxt/test-utils/config'
import path from 'path'

export default defineVitestConfig({
  test: {
    include: ['specs/**/*.spec.ts'],
    globals: true,
    environment: 'happy-dom',
    coverage: {
      reporter: ['text', 'html'],
    },
    setupFiles: ['./specs/vitest.setup.ts'],
  },
  resolve: {
    alias: {
      '@pages': path.resolve(__dirname, './pages'),
      '@contants': path.resolve(__dirname, './constants'),
      '@composables': path.resolve(__dirname, './composables'),
      '@components': path.resolve(__dirname, './components'),
      '@utils': path.resolve(__dirname, './utils'),
      '@middleware': path.resolve(__dirname, './middleware'),
      '@interfaces': path.resolve(__dirname, './interfaces'),
      '@types': path.resolve(__dirname, './types'),
      '@i18n': path.resolve(__dirname, './i18n'),
      '@stores': path.resolve(__dirname, './stores'),
      '@mocks': path.resolve(__dirname, './specs/__mocks__'),
    },
  },
})
