import { vi } from "vitest"

export const routerPushMock = vi.fn()
vi.mock('vue-router', () => ({
  useRouter: () => ({ 
    push: routerPushMock 
  })
}))
