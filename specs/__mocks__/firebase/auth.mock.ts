import { vi } from "vitest"

export const signInWithEmailAndPasswordMock = vi.fn((auth, email, password) => {})
export const createUserWithEmailAndPasswordMock = vi.fn((auth, email, password) => {})
export const signOutMock = vi.fn((auth) => {})

vi.mock('firebase/auth', async () => {
  return {
    signInWithEmailAndPassword: signInWithEmailAndPasswordMock,
    createUserWithEmailAndPassword: createUserWithEmailAndPasswordMock,
    signOut: signOutMock
  }
})
