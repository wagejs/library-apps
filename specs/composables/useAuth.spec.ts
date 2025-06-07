import { describe, test, expect, vi, beforeEach } from 'vitest'
import { toastAddMock } from '@mocks/nuxt-ui/useToast.mock'
import { routerPushMock } from '@mocks/vue-router.mock'
import { storeToRefs } from 'pinia'
import { 
  signInWithEmailAndPasswordMock, 
  createUserWithEmailAndPasswordMock, 
  signOutMock 
} from '@mocks/firebase/auth.mock'

const userMockRef = {
  user: {
    value: {
      uid: '123',
      email: 'test@test.com',
      displayName: 'Test User',
      photoURL: 'https://example.com/photo.jpg',
      emailVerified: false
    }
  }
}

vi.mock('vuefire', () => ({
  useFirebaseAuth: vi.fn()
}))

const { storeToRefsMock } = vi.hoisted(() => ({
  storeToRefsMock: vi.fn()
}))

vi.mock('pinia', () => ({
  storeToRefs: storeToRefsMock
}))

const useUserStoreResetMock = vi.fn()
vi.mock('@stores/user', () => ({
  useUserStore: () => ({
    user: {},
    $reset: useUserStoreResetMock
  })
}))

import { useAuth } from '@composables/useAuth'
import { useFirebaseAuth } from "vuefire"
const auth = useFirebaseAuth()

describe('useAuth', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

 describe('signIn', () => {
  test('signIn success', async () => {
    signInWithEmailAndPasswordMock.mockImplementationOnce(() => {
      return Promise.resolve({
        user: {
          uid: '123',
          email: 'test@test.com',
          displayName: 'Test User',
          photoURL: 'https://example.com/photo.jpg',
          emailVerified: false
        }
      })
    })
    storeToRefsMock.mockReturnValue(userMockRef)

    const { signIn } = useAuth()
    await signIn('test@test.com', 'password')
    
    // Firebase auth correctly called
    expect(signInWithEmailAndPasswordMock).toHaveBeenCalledWith(auth, 'test@test.com', 'password')

    // Toast correctly called
    expect(toastAddMock).toHaveBeenCalledWith({
      id: 'toast-sign-in-success',
      title: 'Sign in successful',
      description: 'Hi Test User!',
      color: 'success'
    })

    // Redirect correctly called
    expect(routerPushMock).toHaveBeenCalledWith('/auth/logged-in')

    // User setup correctly called
    expect(storeToRefs).toHaveBeenCalledWith(expect.anything())
    expect(storeToRefs(expect.anything() as any)).toEqual(userMockRef)
  })

  test('signIn failed', async () => {
    signInWithEmailAndPasswordMock.mockImplementationOnce(() => {
      return Promise.reject({
        code: 'auth/invalid-credential'
      })
    })

    const { signIn } = useAuth()
    await signIn('test@test.com', 'password')
    
    // Firebase auth correctly called
    expect(signInWithEmailAndPasswordMock).toHaveBeenCalledWith(auth, 'test@test.com', 'password')

    // Toast correctly called
    expect(toastAddMock).toHaveBeenCalledWith({
      id: 'toast-sign-in-failed',
      title: 'Sign in failed',
      description: 'Email atau password tidak valid',
      color: 'error'
    })

    // Redirect not called
    expect(routerPushMock).not.toHaveBeenCalled()
  })
 })

  describe('signUp', () => {
    test('signUp success', async () => {
      createUserWithEmailAndPasswordMock.mockImplementationOnce(() => {
        return Promise.resolve({
          user: userMockRef.user.value
        })
      })
      storeToRefsMock.mockReturnValue(userMockRef)

      const { signUp } = useAuth()
      await signUp('test@test.com', 'password')

      // Firebase auth correctly called
      expect(createUserWithEmailAndPasswordMock).toHaveBeenCalledWith(auth, 'test@test.com', 'password')

      // Toast correctly called
      expect(toastAddMock).toHaveBeenCalledWith({
        id: 'toast-sign-up-success',
        title: 'Sign up successful',
        description: 'Welcome test@test.com!',
        color: 'success'
      })

      // Redirect correctly called
      expect(routerPushMock).toHaveBeenCalledWith('/auth/logged-in')

      // User setup correctly called
      expect(storeToRefs).toHaveBeenCalledWith(expect.anything())
      expect(storeToRefs(expect.anything() as any)).toEqual(userMockRef)
    })

    test('signUp failed', async () => {
      createUserWithEmailAndPasswordMock.mockImplementationOnce(() => {
        return Promise.reject({
          code: 'auth/email-already-in-use'
        })
      })

      const { signUp } = useAuth()
      await signUp('test@test.com', 'password')

      // Firebase auth correctly called
      expect(createUserWithEmailAndPasswordMock).toHaveBeenCalledWith(auth, 'test@test.com', 'password')

      // Toast correctly called
      expect(toastAddMock).toHaveBeenCalledWith({
        id: 'toast-sign-up-failed',
        title: 'Sign up failed',
        description: 'Email sudah terdaftar',
        color: 'error'
      })
    })
  })

  describe('signOut', () => {
    test('signOut success', async () => {
      signOutMock.mockImplementationOnce(() => {
        return Promise.resolve()
      })

      const { signOut } = useAuth()
      await signOut()

      // Firebase auth correctly called
      expect(signOutMock).toHaveBeenCalledWith(auth)

      // User store reset correctly called
      expect(useUserStoreResetMock).toHaveBeenCalled()

      // Redirect correctly called
      expect(routerPushMock).toHaveBeenCalledWith('/auth/sign-in')

      // Toast correctly called
      expect(toastAddMock).toHaveBeenCalledWith({
        id: 'toast-sign-out-success',
        title: 'Sign out successful',
        color: 'success'
      })
      
    })
  })
})
