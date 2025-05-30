<script setup lang="ts">
import { storeToRefs } from "pinia"

const { signOut } = useAuth()
const userStore = useUserStore()
const { user } = storeToRefs(userStore)
</script>

<template>
  <div class="flex flex-col justify-center items-center h-screen bg-gray-100">
    <h2 class="text-2xl font-bold mb-8">Logged in</h2>
    <div v-if="user" class="flex flex-col gap-4 max-w-md w-full overflow-hidden shadow-lg mb-4 rounded-lg bg-white p-8">
      <table>
        <tbody>
          <tr>
            <td>UID</td>
            <td>{{ user?.uid }}</td>
          </tr>
          <tr>
            <td>Email</td>
            <td>{{ user?.email }}</td>
          </tr>
          <tr>
            <td>Email Verified</td>
            <td>{{ user?.emailVerified }}</td>
          </tr>
        </tbody>
      </table>
      <UButton size="xl" block color="primary" label="Sign out" @click="signOut" class="font-bold"/>
    </div>
  </div>
</template>
