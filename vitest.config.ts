import { defineVitestConfig } from '@nuxt/test-utils/config'
import path from 'path'

export default defineVitestConfig({
  test: {
    include: ['tests/**/*.test.ts'],
    globals: true,
    environment: 'happy-dom',
    coverage: {
      reporter: ['text', 'html'],
    }
  },
  resolve: {
    alias: {
      '@pages': path.resolve(__dirname, './pages'),
      '@contants': path.resolve(__dirname, './constants'),
      '@components': path.resolve(__dirname, './components'),
      '@utils': path.resolve(__dirname, './utils'),
      '@middleware': path.resolve(__dirname, './middleware'),
      '@interfaces': path.resolve(__dirname, './interfaces'),
      '@types': path.resolve(__dirname, './types'),
      '@i18n': path.resolve(__dirname, './i18n'),
      '@stores': path.resolve(__dirname, './stores')
    },
  },
})
