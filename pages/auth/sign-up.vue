<script setup lang="ts">
import { object, string, refine, type Infer } from 'superstruct';
import type { FormSubmitEvent } from '@nuxt/ui'
import { emailRegex, passwordRegex } from '@constants/field'

const { signUp } = useAuth()
const { t } = useI18n()

const signUpSchema = object({
  email: refine(string(), 'email', (value) => {
    if (!emailRegex.test(value)) return t('auth.errors.auth/invalid-email')
    return true;
  }),
  password: refine(string(), 'password', (value) => {
    if (!passwordRegex.test(value)) return t('auth.errors.passwordRegex')
    if (value.length < 8) return t('auth.errors.passwordLength')
    return true;
  }),
})

type SignUpSchema = Infer<typeof signUpSchema>

const signUpForm = reactive<SignUpSchema>({
  email: '',
  password: ''
})

// NOTE: current version of @nuxt/ui doesn't support type inference for FormSubmitEvent
// so it need to use unknown as the type for the event
async function signUpUser(event: FormSubmitEvent<unknown>): Promise<void> {
  const { email, password } = event.data as SignUpSchema
  await signUp(email, password)
}
</script>

<template>
  <div class="flex flex-col justify-center items-center h-screen bg-gray-100">
    <h2 class="text-2xl font-bold mb-8">{{ $t('auth.signUpTitle') }}</h2>
    <div class="flex flex-col gap-4 max-w-md w-full overflow-hidden shadow-lg mb-4 rounded-lg bg-white p-8">
      <UForm :state="signUpForm" :schema="signUpSchema" class="space-y-4 w-full" @submit="signUpUser">
        <UFormField :label="$t('auth.email')" name="email" size="xl" required class="w-full" :ui="{
          label: 'text-md font-medium text-gray-700 mb-1',
        }">
          <UInput v-model="signUpForm.email" class="w-full" @keyup.enter="signUpUser" />
        </UFormField>

        <UFormField :label="$t('auth.password')" name="password" size="xl" required :ui="{
          label: 'text-md font-medium text-gray-700 mb-1'
        }">
          <UInput v-model="signUpForm.password" type="password" class="w-full" @keyup.enter="signUpUser" />
        </UFormField>

        <UButton type="submit" color="primary" size="xl" block :label="$t('auth.signUp')" class="flex font-bold justify-center items-center mt-8 py-3">
          <template #trailing>
            <UIcon name="i-heroicons-user-plus-16-solid" size="18"/>
          </template>
        </UButton>
      </UForm>
      <div class="flex gap-2  mt-2 justify-center">
        <span>{{ $t('auth.haveAccount') }}</span>
        <ULink to="/auth/sign-in" class="text-green-700">{{ $t('auth.signInLink') }}</ULink>
      </div>
    </div>
  </div>
</template>
