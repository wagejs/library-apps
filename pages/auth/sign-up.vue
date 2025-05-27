<script setup lang="ts">
import { createUserWithEmailAndPassword  } from 'firebase/auth'
import { useFirebaseAuth } from 'vuefire'
import type { Auth } from 'firebase/auth'
import { useRouter } from 'vue-router'

const auth = useFirebaseAuth()
const router = useRouter()

const email = ref('')
const password = ref('')
const signUpError = ref('')

async function signUp() {
  try {
    await createUserWithEmailAndPassword(auth as Auth, email.value, password.value)
    router.push('/auth/logged-in')
  } catch (error) {
    console.error(error)
    if (error instanceof Error) {
      signUpError.value = error.message
    } else {
      signUpError.value = 'An unknown error occurred'
    }
  }
}
</script>

<template>
  <div class="flex flex-col justify-center items-center h-screen bg-gray-100">
    <h2 class="text-2xl font-bold mb-8">Sign in to your account</h2>
    <div class="flex flex-col gap-4 max-w-md w-full overflow-hidden shadow-lg mb-4 rounded-lg bg-white p-8">
      <div v-if="signUpError" class="text-red-500 mb-4">{{ signUpError }}</div>
      <div class="flex flex-col gap-2">
        <label for="email">Email address</label>
        <input type="text" v-model="email" class="w-full p-2 rounded-lg border border-gray-300" placeholder="Email">
      </div>
      <div class="flex flex-col gap-2">
        <label for="password">Password</label>
        <input type="password" v-model="password" class="w-full p-2 rounded-lg border border-gray-300" placeholder="Password">
      </div>
      <button class="bg-blue-500 text-white p-2 rounded-lg mt-4 mb-6 font-bold cursor-pointer" @click="signUp">Sign up</button>
      <div class="flex gap-2 justify-center">
        <span>Already have an account?</span>
        <router-link to="/auth/sign-in" class="text-blue-500">Sign in</router-link>
      </div>
    </div>
  </div>
</template>
