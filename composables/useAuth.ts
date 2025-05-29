import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut as signOutFirebase } from "firebase/auth"
import { useFirebaseAuth } from "vuefire"
import type { Auth, AuthError } from 'firebase/auth'
import { useRouter } from "vue-router"

export const useAuth = () => {
  const auth = useFirebaseAuth()
  const router = useRouter()

  const signIn = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth as Auth, email, password)
      router.push('/auth/logged-in')
    } catch (error: AuthError | unknown) {
      return error
    }
  }

  const signUp = async (email: string, password: string, redirectTo: string = '/auth/logged-in') => {
    try {
      await createUserWithEmailAndPassword(auth as Auth, email, password)
      router.push(redirectTo)
    } catch (error) {
      console.error(error)
    }
  }

  const signOut = async () => {
    await signOutFirebase(auth as Auth)
    router.push('/auth/sign-in')
  }
  
  return { user: auth?.currentUser, signIn, signUp, signOut }
}