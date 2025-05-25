<script setup>
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { useFirebaseAuth } from 'vuefire'

const auth = useFirebaseAuth()

const email = ref('')
const password = ref('')

async function signUp() {
  const user = await createUserWithEmailAndPassword(auth, email.value, password.value)
  console.log(user)
}
</script>

<template>
  <div class="flex flex-col justify-center items-center h-screen bg-gray-100">
    <h2 class="text-2xl font-bold mb-8">Sign in to your account</h2>
    <div class="flex flex-col gap-4 max-w-md w-full rounded overflow-hidden shadow-lg mb-4 rounded-lg bg-white p-8">
      <div class="flex flex-col gap-2">
        <label for="email">Email address</label>
        <input type="text" v-model="email" class="w-full p-2 rounded-lg border border-gray-300" placeholder="Email">
      </div>
      <div class="flex flex-col gap-2">
        <label for="password">Password</label>
        <input type="password" v-model="password" class="w-full p-2 rounded-lg border border-gray-300" placeholder="Password">
      </div>
      <button class="bg-blue-500 text-white p-2 rounded-lg mt-4 font-bold cursor-pointer" @click="signUp">Sign in</button>
    </div>
  </div>
</template>
