<script setup lang="ts">
definePageMeta({
  middleware: [
    function (to, from) {
      const route = useRoute()
      const { user } = useAuth()
      const { uid } = route.params

      console.log(uid, user)
    }
  ]
})

const { user } = useAuth()

console.log(user)

</script>
<template>
  <pre v-if="user">
    {{ user }}
  </pre>
</template>