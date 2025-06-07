import { vi } from "vitest"

export const toastAddMock = vi.fn()
vi.mock('@nuxt/ui/runtime/composables/useToast', () => ({
  useToast: () => ({
    add: toastAddMock
  })
}))
