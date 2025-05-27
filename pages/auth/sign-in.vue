<script setup lang="ts">
import { signInWithEmailAndPassword } from 'firebase/auth'
import { useFirebaseAuth } from 'vuefire'
import { useRouter } from 'vue-router'
import type { Auth, AuthError } from 'firebase/auth'
import id from '@/I18n/id.json'

const auth = useFirebaseAuth()
const router = useRouter()

const email = ref('')
const password = ref('')
const signInErrorMessage = ref('')

async function signIn() {
  await signInWithEmailAndPassword(auth as Auth, email.value, password.value).then((user) => {
    router.push('/auth/logged-in')
  }).catch((error: AuthError) => {
    signInErrorMessage.value = id.signInError[error.code as keyof typeof id.signInError]
  })
}
</script>

<template>
  <div class="flex flex-col justify-center items-center h-screen bg-gray-100">
    <h2 class="text-2xl font-bold mb-8">Sign in to your account</h2>
    <div class="flex flex-col gap-4 max-w-md w-full overflow-hidden shadow-lg mb-4 rounded-lg bg-white p-8">
      <div v-if="signInErrorMessage" class="text-red-500">{{ signInErrorMessage }}</div>
      <div class="flex flex-col gap-2">
        <label for="email">Email address</label>
        <input type="text" v-model="email" class="w-full p-2 rounded-lg border border-gray-300" placeholder="Email">
      </div>
      <div class="flex flex-col gap-2">
        <label for="password">Password</label>
        <input type="password" v-model="password" class="w-full p-2 rounded-lg border border-gray-300" placeholder="Password">
      </div>
      <button class="bg-blue-500 text-white p-2 rounded-lg mt-4 mb-6 font-bold cursor-pointer" @click="signIn">Sign in</button>
      <div class="flex gap-2 justify-center">
        <span>Don't have an account?</span>
        <router-link to="/auth/sign-up" class="text-blue-500">Sign up</router-link>
      </div>
    </div>
  </div>
</template>
