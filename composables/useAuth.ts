import { useFirebaseAuth } from "vuefire"
import type { Auth, AuthError, User as AuthUser } from 'firebase/auth'
import { useRouter } from "vue-router"
import { storeToRefs } from "pinia"

import langId from "@i18n/id.json"
import { useUserStore } from "@stores/user"
import type { User } from "@interfaces/user"

export const useAuth = () => {
  const auth = useFirebaseAuth()
  const router = useRouter()
  const toast = useToast()
  const userStore = useUserStore()
  const { user: userStoreUser, authAttempt: userStoreAuthAttempt } = storeToRefs(userStore)
  const { setAuthAttempt: setAuthAttemptStore, resetAuthAttempt: resetAuthAttemptStore } = userStore
  const maxAuthAttempt = Number(process.env.MAX_AUTH_ATTEMPT) || 3
  type authErrorKey = keyof typeof langId.authError

  function handleUserSetup(user: AuthUser) {
    // Set user to store
    userStoreUser.value = {
      uid: user.uid ?? 'invalid-uid',
      email: user.email ?? '',
      displayName: user.displayName ?? '',
      photoURL: user.photoURL ?? '',
      emailVerified: user.emailVerified ?? false,
    } as User
  }

  const signIn = async (email: string, password: string) => {

    // Validate auth attempt
    if (userStoreAuthAttempt.value.signIn >= maxAuthAttempt) {
      toast.add({
        id: 'toast-sign-in-failed-max-attempt',
        title: 'Too many attempts',
        description: 'You have reached the maximum number of sign in attempts. Please try again later.',
        color: 'error'
      })
      return
    }

    const { signInWithEmailAndPassword } = await import('firebase/auth')

    // Set auth attempt to store
    setAuthAttemptStore('signIn')

    await signInWithEmailAndPassword(auth as Auth, email, password).then(({ user }) => {
      const { email, displayName } = user
      const username = displayName ?? email

      // Set user to store
      handleUserSetup(user);

      // Reset auth attempt to store
      resetAuthAttemptStore()

      // Show toast
      toast.add({
        id: 'toast-sign-in-success',
        title: 'Sign in successful',
        description: 'Hi ' + username + '!',
        color: 'success'
      })

      // Redirect to logged in page
      router.push('/auth/logged-in')
    }).catch((error: AuthError) => {
      toast.add({
        id: 'toast-sign-in-failed',
        title: 'Sign in failed',
        description: langId.authError[error?.code as authErrorKey] ?? error?.message,
        color: 'error'
      })
    })
  }

  const signUp = async (email: string, password: string, redirectTo: string = '/auth/logged-in') => {

    // Validate auth attempt
    if (userStoreAuthAttempt.value.signUp >= maxAuthAttempt) {
      toast.add({
        id: 'toast-sign-up-failed-max-attempt',
        title: 'Too many attempts',
        description: 'You have reached the maximum number of sign up attempts. Please try again later.',
        color: 'error'
      })
      return
    }

    const { createUserWithEmailAndPassword } = await import('firebase/auth')

    // Set auth attempt to store  
    setAuthAttemptStore('signUp')

    await createUserWithEmailAndPassword(auth as Auth, email, password).then(({ user }) => {
      // Set user to store
      handleUserSetup(user);

      // Reset auth attempt to store
      resetAuthAttemptStore()

      // Show toast
      toast.add({
        id: 'toast-sign-up-success',
        title: 'Sign up successful',
        description: 'Welcome ' + user.email + '!',
        color: 'success'
      })

      // Redirect to logged in page
      router.push(redirectTo)
    }).catch((error: AuthError) => {
      toast.add({
        id: 'toast-sign-up-failed',
        title: 'Sign up failed',
        description: langId.authError[error?.code as authErrorKey],
        color: 'error'
      })
    })
  }

  const signOut = async () => {
    const { signOut: signOutFirebase } = await import('firebase/auth')
    await signOutFirebase(auth as Auth).then(() => {
      userStore.$reset();
      router.push('/auth/sign-in')
      toast.add({
        id: 'toast-sign-out-success',
        title: 'Sign out successful',
        color: 'success'
      })
    }).catch((error: AuthError) => {
      toast.add({
        id: 'toast-sign-out-failed',
        title: 'Sign out failed',
        description: error?.message,
        color: 'error'
      })
    })
  }
  
  return { signIn, signUp, signOut }
}