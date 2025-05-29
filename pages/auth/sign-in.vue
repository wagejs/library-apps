<script setup lang="ts">
const { signIn } = useAuth();

const signInForm = ref({
  email: '',
  password: ''
})

async function userSignIn() {
  const { email, password } = signInForm.value
  await signIn(email, password)
}
</script>

<template>
  <div class="flex flex-col justify-center items-center h-screen bg-gray-100">
    <h2 class="text-2xl font-bold mb-8">Sign in to your account</h2>
    <div class="flex flex-col gap-4 max-w-md w-full overflow-hidden shadow-lg mb-4 rounded-lg bg-white p-8">
      <UForm :state="signInForm" class="space-y-4 w-full" @submit="userSignIn">
        <UFormField label="Email" name="email" size="xl" required class="w-full" :ui="{
          label: 'text-md font-medium text-gray-700 mb-1',
        }">
          <UInput v-model="signInForm.email" class="w-full" />
        </UFormField>

        <UFormField label="Password" name="password" size="xl" required :ui="{
          label: 'text-md font-medium text-gray-700 mb-1'
        }">
          <UInput v-model="signInForm.password" type="password" class="w-full"  />
        </UFormField>

        <UButton type="submit" color="primary" size="xl" block label="Sign in" class="flex font-bold justify-center items-center mt-8 py-3">
          <template #trailing>
            <UIcon name="i-heroicons-arrow-right-circle" size="20"/>
          </template>
        </UButton>
      </UForm>
      <div class="flex gap-2 mt-2 justify-center">
        <span>Don't have an account?</span>
        <ULink to="/auth/sign-up" class="text-green-700">Sign up</ULink>
      </div>
    </div>
  </div>
</template>
