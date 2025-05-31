import { describe, test, expect } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import SignInPage from '@pages/auth/sign-in.vue'

describe('SignInPage', () => {
  test('should render the sign in page correctly', async () => {
    const wrapper = await mountSuspended(SignInPage)
    // Match the snapshot
    expect(wrapper.html()).toMatchSnapshot()

    // Check if the form is rendered correctly
    const itemSelectorToCheck = [
      '#sign-in-form',
      '#email',
      '#email-label',
      '#password',
      '#password-label',
      '#sign-in-button',
    ]
    for (const item of itemSelectorToCheck) {
      expect(wrapper.find(item).exists()).toBe(true)
    }
  })
})
