import { protectedRoutes } from '@/constant/auth'

export default defineNuxtRouteMiddleware((to, from) => {
  const { user } = useAuth()
  if (!user && protectedRoutes.includes(to.path)) {
    return navigateTo('/auth/sign-in')
  }
})