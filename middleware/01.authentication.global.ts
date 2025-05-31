import { protectedRoutes, publicRoutes } from '@constants/auth'

export default defineNuxtRouteMiddleware((to, from) => {
  const userStore = useUserStore()
  const { user } = userStore
  
  // If user is not logged in and the route is protected, redirect to sign in
  if (!user && protectedRoutes.includes(to.path)) {
    return navigateTo('/auth/sign-in')
  }

  // // If user is logged in and the route is public, redirect to logged in
  if (user && publicRoutes.includes(to.path)) {
    return navigateTo('/auth/logged-in')
  }
})