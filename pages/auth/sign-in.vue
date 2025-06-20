<script setup lang="ts">
import { object, string, nonempty, refine, type Infer } from 'superstruct';
import type { FormSubmitEvent } from '@nuxt/ui'
import { emailRegex } from '@constants/field'

const { t } = useI18n()
const { signIn } = useAuth();

const signInSchema = object({
  email: refine(string(), 'email', (value) => {
    if (!emailRegex.test(value)) return t('auth.errors.auth/invalid-email')
    return true;
  }),
  password: nonempty(string()),
})

type SignInSchema = Infer<typeof signInSchema>

const signInForm = reactive<SignInSchema>({
  email: '',
  password: ''
})

// NOTE: current version of @nuxt/ui doesn't support type inference for FormSubmitEvent
// so it need to use unknown as the type for the event
async function userSignIn(event: FormSubmitEvent<unknown>): Promise<void> {
  const { email, password } = event.data as SignInSchema
  await signIn(email, password)
}
</script>

<template>
  <div class="flex flex-col justify-center items-center h-screen bg-gray-100">
    <h2 class="text-2xl font-bold mb-8">{{ $t('auth.signInTitle') }}</h2>
    <div class="flex flex-col gap-4 max-w-md w-full overflow-hidden shadow-lg mb-4 rounded-lg bg-white p-8">
      <UForm :state="signInForm" :schema="signInSchema" id="sign-in-form" class="space-y-4 w-full" @submit="userSignIn">
        <UFormField name="email" id="email-wrapper" class="w-full" size="xl" required>
          <template #label>
            <label for="email" class="text-md font-medium text-gray-700 mb-1">{{ $t('auth.email') }}</label>
          </template>
          <UInput v-model="signInForm.email" class="w-full" id="email" />
        </UFormField>

        <UFormField name="password" id="password-wrapper" class="w-full" size="xl" required>
          <template #label>
            <label for="password" class="text-md font-medium text-gray-700 mb-1">{{ $t('auth.password') }}</label>
          </template>
          <UInput v-model="signInForm.password" type="password" class="w-full" id="password" />
        </UFormField>

        <UButton type="submit" color="primary" size="xl" block :label="$t('auth.signIn')" class="flex font-bold justify-center items-center mt-8">
          <template #trailing>
            <UIcon name="i-heroicons-arrow-right-circle" size="20"/>
          </template>
        </UButton>
      </UForm>
      <div class="flex gap-2 mt-2 justify-center">
        <span>{{ $t('auth.dontHaveAccount') }}</span>
        <ULink to="/auth/sign-up" class="text-green-700">{{ $t('auth.signUpLink') }}</ULink>
      </div>
    </div>
  </div>
</template>
