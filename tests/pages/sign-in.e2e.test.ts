import { describe, test, expect, vi } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import SignInPage from '@pages/auth/sign-in.vue'
import { flushPromises } from '@vue/test-utils'

describe('SignInPage E2E', () => {
  describe('Form Validation', () => {
    test('should validate email format', async () => {
      const wrapper = await mountSuspended(SignInPage)
      
      // Get form elements
      const emailInput = wrapper.find('#email-wrapper input')
      
      // Test invalid email
      await emailInput.setValue('invalid-email')
      await flushPromises()
      
      const emailError = wrapper.find('#email-wrapper .text-error')
      expect(emailError.exists()).toBe(true)
      expect(emailError.text()).toBe('Invalid email address')
      
      // Test valid email
      await emailInput.setValue('test@example.com')
      await flushPromises()
      
      expect(wrapper.find('#email-wrapper .text-error').exists()).toBe(false)
    })

    test('should validate required password', async () => {
      const wrapper = await mountSuspended(SignInPage)
      
      // Get form elements
      const emailInput = wrapper.find('#email-wrapper input')
      const passwordInput = wrapper.find('#password-wrapper input')
      const signInForm = wrapper.find('#sign-in-form')
      
      // Fill in valid email but leave password empty
      await emailInput.setValue('test@example.com')
      await passwordInput.setValue('')
      await signInForm.trigger('submit')
      await flushPromises()
      
      const passwordError = wrapper.find('#password-wrapper .text-error')
      expect(passwordError.exists()).toBe(true)
      
      // Test with valid password
      await passwordInput.setValue('password123')
      await signInForm.trigger('submit')
      await flushPromises()
      
      expect(wrapper.find('#password-wrapper .text-error').exists()).toBe(false)
    })

    test('should validate complete form submission', async () => {
      const mockSignIn = vi.fn()
      const wrapper = await mountSuspended(SignInPage)
      
      // Get form elements
      const emailInput = wrapper.find('#email-wrapper input')
      const passwordInput = wrapper.find('#password-wrapper input')
      const signInForm = wrapper.find('#sign-in-form')
      
      // Fill in valid credentials
      await emailInput.setValue('test@example.com')
      await passwordInput.setValue('password123')
      await signInForm.trigger('submit')
      await flushPromises()
      
      // Verify no error messages are shown
      expect(wrapper.find('#email-wrapper .text-error').exists()).toBe(false)
      expect(wrapper.find('#password-wrapper .text-error').exists()).toBe(false)

      // Verify sign in was called with correct credentials
      // expect(mockSignIn).toHaveBeenCalledWith('test@example.com', 'password123')
    })
  })
}) 