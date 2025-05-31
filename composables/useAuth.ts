import { useFirebaseAuth } from "vuefire"
import type { Auth, AuthError, User as AuthUser } from 'firebase/auth'
import { useRouter } from "vue-router"
import { storeToRefs } from "pinia"

import langId from "@i18n/id.json"
import { useUserStore } from "@stores/user"
import type { User } from "@interfaces/user"

export const useAuth = () => {
  const isTestEnv = process.env.NODE_ENV === 'test'
  const auth = !isTestEnv ? useFirebaseAuth() : null
  const router = useRouter()
  const toast = useToast()
  const userStore = useUserStore()

  function handleUserSetup(user: AuthUser) {
    // Set user to store
    const userStoreRef = storeToRefs(userStore)
    userStoreRef.user.value = {
      uid: user.uid,
      email: user.email ?? '',
      displayName: user.displayName ?? '',
      photoURL: user.photoURL ?? '',
      emailVerified: user.emailVerified ?? false,
    } as User
  }

  const signIn = async (email: string, password: string) => {
    if (isTestEnv) return
    const { signInWithEmailAndPassword } = await import('firebase/auth')
    await signInWithEmailAndPassword(auth as Auth, email, password).then(({ user }) => {
      const { email, displayName } = user
      const username = displayName ?? email

      handleUserSetup(user);

      // Show toast
      toast.add({
        title: 'Sign in successful',
        description: 'Hi ' + username + '!',
        color: 'success'
      })

      // Redirect to logged in page
      router.push('/auth/logged-in')
    }).catch((error: AuthError) => {
      toast.add({
        title: 'Sign in failed',
        description: langId.signInError[error?.code as keyof typeof langId.signInError],
        color: 'error'
      })
    })
  }

  const signUp = async (email: string, password: string, redirectTo: string = '/auth/logged-in') => {
    if (isTestEnv) return
    const { createUserWithEmailAndPassword } = await import('firebase/auth')
    await createUserWithEmailAndPassword(auth as Auth, email, password).then(({ user }) => {
      handleUserSetup(user);

      // Show toast
      toast.add({
        title: 'Sign up successful',
        description: 'Welcome ' + user.email + '!',
        color: 'success'
      })

      // Redirect to logged in page
      router.push(redirectTo)
    }).catch((error: AuthError) => {
      toast.add({
        title: 'Sign up failed',
        description: langId.signInError[error?.code as keyof typeof langId.signInError],
        color: 'error'
      })
    })
  }

  const signOut = async () => {
    if (isTestEnv) return
    const { signOut: signOutFirebase } = await import('firebase/auth')
    await signOutFirebase(auth as Auth).then(() => {
      userStore.$reset();
      router.push('/auth/sign-in')
      toast.add({
        title: 'Sign out successful',
        color: 'success'
      })
    }).catch((error: AuthError) => {
      toast.add({
        title: 'Sign out failed',
        description: error?.message,
        color: 'error'
      })
    })
  }
  
  return { signIn, signUp, signOut }
}