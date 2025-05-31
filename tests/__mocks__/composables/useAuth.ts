import { vi } from "vitest";

const useAuth = () => {
  return {
    signIn: vi.fn(() => Promise.resolve({ uid: '123', email: 'test@test.com' })),
    signUp: vi.fn(() => Promise.resolve({})),
    signOut: vi.fn(() => Promise.resolve({})),
  }
}

export default useAuth
