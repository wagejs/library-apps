<script setup lang="ts">
import { useFirebaseAuth } from 'vuefire'
import { signOut as signOutFirebase } from 'firebase/auth'
import type { Auth } from 'firebase/auth'
import { useRouter } from 'vue-router'

definePageMeta({
  middleware: [
    function (to, from) {
      if (!auth?.currentUser) {
        return navigateTo('/auth/sign-in')
      }
    }
  ]
})

const auth = useFirebaseAuth()
const router = useRouter()
async function signOut() {
  try {
    await signOutFirebase(auth as Auth)
    router.push('/auth/sign-in')
  } catch (error) {
    console.error(error)
  }
}
</script>

<template>
  <div class="flex flex-col justify-center items-center h-screen bg-gray-100">
    <h2 class="text-2xl font-bold mb-8">Logged in</h2>
    <div class="flex flex-col gap-4 max-w-md w-full overflow-hidden shadow-lg mb-4 rounded-lg bg-white p-8">
      <table>
        <tr>
          <td>UID</td>
          <td>{{ auth?.currentUser?.uid }}</td>
        </tr>
        <tr>
          <td>Email</td>
          <td>{{ auth?.currentUser?.email }}</td>
        </tr>
        <tr>
          <td>Email Verified</td>
          <td>{{ auth?.currentUser?.emailVerified }}</td>
        </tr>
        <tr>
          <td>Last Sign In Time</td>
          <td>{{ auth?.currentUser?.metadata?.lastSignInTime }}</td>
        </tr>
      </table>
      <button class="bg-blue-500 text-white p-2 rounded-lg mt-4 mb-6 font-bold cursor-pointer" @click="signOut">Sign out</button>
    </div>
  </div>
</template>
