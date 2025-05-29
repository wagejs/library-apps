<script setup lang="ts">
definePageMeta({
  middleware: [
    function (to, from) {
      if (to.path === '/') {
        return navigateTo('/auth/sign-in')
      }
    }
  ]
})

</script>

<template>
  <div>
    <h1>Home</h1>
    <NuxtLink to="/auth/sign-in">Sign in</NuxtLink>
  </div>
</template>