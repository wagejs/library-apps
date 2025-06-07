import { defineStore } from "pinia"
import type { User, UserAuthAttemptCounter } from "@interfaces/user"

export const useUserStore = defineStore('user', () => {
  const defaultAuthAttempt: UserAuthAttemptCounter = {
    signIn: 0,
    signUp: 0
  }

  const user = ref<User | null>(null)
  const authAttempt = ref<UserAuthAttemptCounter>(defaultAuthAttempt)

  function setAuthAttempt(action: keyof UserAuthAttemptCounter) {
    authAttempt.value[action] = authAttempt.value[action] + 1
  }

  function resetAuthAttempt() {
    authAttempt.value = defaultAuthAttempt
  }

  function $reset() {
    user.value = null
    authAttempt.value = defaultAuthAttempt
  }

  return { 
    user,
    authAttempt,
    setAuthAttempt,
    resetAuthAttempt,
    $reset
  }
}, {
  persist: {
    storage: piniaPluginPersistedstate.localStorage(),
    key: 'user',
    pick: ['user', 'authAttempt']
  }
})