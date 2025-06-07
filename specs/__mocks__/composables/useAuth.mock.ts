import { vi } from 'vitest'

// Export the spy so your test can assert it
const signInMock = vi.fn((email, password) => {
  return Promise.resolve({ uid: '123', email: 'test@test.com' })
})
// Register the mock for the composable
vi.mock('@composables/useAuth', () => {
  return {
    useAuth: () => ({
      signIn: signInMock
    })
  }
})

export { signInMock }
