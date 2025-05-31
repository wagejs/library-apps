import { describe, test, expect, vi } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import SignInPage from '@pages/auth/sign-in.vue'

vi.mock('useAuth', () => ({
  signIn: vi.fn(),
}))

describe('SignInPage', () => {
  test('should render the sign in page', async () => {
    const wrapper = await mountSuspended(SignInPage)
    expect(wrapper.html()).toMatchSnapshot()
  })
})
