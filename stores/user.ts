import { defineStore } from "pinia"
import type { User } from "~/interfaces/user"

export const useUserStore = defineStore('user', () => {
  const user = ref<User | null>(null)

  function $reset() {
    user.value = null
  }

  return { user, $reset }
}, {
  persist: {
    storage: piniaPluginPersistedstate.localStorage(),
    key: 'user',
    pick: ['user']
  }
})