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
  value: {
    uid: '123',
    email: 'test@test.com',
    displayName: 'Test User',
    photoURL: 'https://example.com/photo.jpg',
    emailVerified: false
  }
}
const authAttemptMockRef = {
  value: {
    signIn: 0,
    signUp: 0
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
    authAttempt: {
      signIn: 0,
      signUp: 0
    },
    $reset: useUserStoreResetMock,
    setAuthAttempt: vi.fn(),
    resetAuthAttempt: vi.fn()
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
    storeToRefsMock.mockReturnValue({
      user: userMockRef,
      authAttempt: authAttemptMockRef
    })

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
    expect(storeToRefs(expect.anything() as any).user.value).toEqual(userMockRef.value)
  })

  test('signIn failed with invalid credential', async () => {
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

  test('signIn failed with max attempt', async () => {
    storeToRefsMock.mockReturnValue({
      user: userMockRef,
      authAttempt: {
        value: {
          ...authAttemptMockRef.value,
          signIn: 3
        }
      }
    })
    
    const { signIn } = useAuth()
    await signIn('test@test.com', 'password')
    
    // Firebase auth not called
    expect(signInWithEmailAndPasswordMock).not.toHaveBeenCalled()
    
    // Toast correctly called
    expect(toastAddMock).toHaveBeenCalledWith({
      id: 'toast-sign-in-failed-max-attempt',
      title: 'Too many attempts',
      description: 'You have reached the maximum number of sign in attempts. Please try again later.',
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
          user: userMockRef.value
        })
      })
      storeToRefsMock.mockReturnValue({
        user: userMockRef,
        authAttempt: authAttemptMockRef
      })

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
      expect(storeToRefs(expect.anything() as any).user.value).toEqual(userMockRef.value)
    })

    test('signUp failed with email already in use', async () => {
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

    test('signUp failed with max attempt', async () => {
      storeToRefsMock.mockReturnValue({
        user: userMockRef,
        authAttempt: {
          value: {
            ...authAttemptMockRef.value,
            signUp: 3
          }
        }
      })
      
      const { signUp } = useAuth()
      await signUp('test@test.com', 'password')
      
      // Firebase auth not called
      expect(createUserWithEmailAndPasswordMock).not.toHaveBeenCalled()
      
      // Toast correctly called
      expect(toastAddMock).toHaveBeenCalledWith({
        id: 'toast-sign-up-failed-max-attempt',
        title: 'Too many attempts',
        description: 'You have reached the maximum number of sign up attempts. Please try again later.',
        color: 'error'
      })
      
      // Redirect not called
      expect(routerPushMock).not.toHaveBeenCalled()
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
