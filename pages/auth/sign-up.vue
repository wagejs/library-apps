<script setup lang="ts">
const { signUp } = useAuth()

const signUpForm = ref({
  email: '',
  password: ''
})

async function signUpUser() {
  const { email, password } = signUpForm.value
  await signUp(email, password)
}
</script>

<template>
  <div class="flex flex-col justify-center items-center h-screen bg-gray-100">
    <h2 class="text-2xl font-bold mb-8">Register your account</h2>
    <div class="flex flex-col gap-4 max-w-md w-full overflow-hidden shadow-lg mb-4 rounded-lg bg-white p-8">
      <UForm :state="signUpForm" class="space-y-4 w-full" @submit="signUpUser">
        <UFormField label="Email" name="email" size="xl" required class="w-full" :ui="{
          label: 'text-md font-medium text-gray-700 mb-1',
        }">
          <UInput v-model="signUpForm.email" class="w-full" />
        </UFormField>

        <UFormField label="Password" name="password" size="xl" required :ui="{
          label: 'text-md font-medium text-gray-700 mb-1'
        }">
          <UInput v-model="signUpForm.password" type="password" class="w-full"  />
        </UFormField>

        <UButton type="submit" color="primary" size="xl" block label="Sign up" class="flex font-bold justify-center items-center mt-8 py-3">
          <template #trailing>
            <UIcon name="i-heroicons-user-plus-16-solid" size="18"/>
          </template>
        </UButton>
      </UForm>
      <div class="flex gap-2  mt-2 justify-center">
        <span>Already have an account?</span>
        <ULink to="/auth/sign-in" class="text-green-700">Sign in</ULink>
      </div>
    </div>
  </div>
</template>
