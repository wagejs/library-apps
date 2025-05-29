import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut as signOutFirebase
} from "firebase/auth"
import { useFirebaseAuth } from "vuefire"
import type { Auth, AuthError } from 'firebase/auth'
import { useRouter } from "vue-router"
import langId from '~/i18n/id.json'

export const useAuth = () => {
  const auth = useFirebaseAuth()
  const router = useRouter()
  const toast = useToast()

  const signIn = async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth as Auth, email, password).then(() => {
      router.push('/auth/logged-in')
    }).catch((error: AuthError) => {
      console.log(error.code)
      toast.add({
        title: 'Sign in failed',
        description: langId.signInError[error?.code as keyof typeof langId.signInError],
        color: 'error'
      })
    })
  }

  const signUp = async (email: string, password: string, redirectTo: string = '/auth/logged-in') => {
    await createUserWithEmailAndPassword(auth as Auth, email, password).then(() => {
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
    await signOutFirebase(auth as Auth).then(() => {
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
  
  return { user: auth?.currentUser, signIn, signUp, signOut }
}