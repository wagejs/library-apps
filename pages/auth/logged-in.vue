<script setup lang="ts">
const { signOut, user } = useAuth()
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
          <tr>
            <td>Last Sign In Time</td>
            <td>{{ user?.metadata?.lastSignInTime }}</td>
          </tr>

        </tbody>
      </table>
      <button class="bg-blue-500 text-white p-2 rounded-lg mt-4 mb-6 font-bold cursor-pointer" @click="signOut">Sign out</button>
    </div>
  </div>
</template>
