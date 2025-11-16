import { describe, it, expect } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import AppButton from '../../app/components/shared/atoms/AppButton.vue'

describe('AppButton', () => {
  it('renders slot content correctly', async () => {
    const wrapper = await mountSuspended(AppButton, {
      slots: {
        default: 'Click me',
      },
    })

    expect(wrapper.text()).toContain('Click me')
  })

  it('emits click event when clicked', async () => {
    const wrapper = await mountSuspended(AppButton, {
      slots: {
        default: 'Click me',
      },
    })

    await wrapper.trigger('click')
    expect(wrapper.emitted('click')).toBeTruthy()
    expect(wrapper.emitted('click')).toHaveLength(1)
  })

  it('applies props correctly', async () => {
    const wrapper = await mountSuspended(AppButton, {
      props: {
        color: 'primary',
        variant: 'elevated',
        disabled: true,
      },
      slots: {
        default: 'Button',
      },
    })

    const vBtn = wrapper.findComponent({ name: 'VBtn' })
    expect(vBtn.exists()).toBe(true)
    expect(vBtn.props('color')).toBe('primary')
    expect(vBtn.props('variant')).toBe('elevated')
    expect(vBtn.props('disabled')).toBe(true)
  })

  it('passes loading state to VBtn', async () => {
    const wrapper = await mountSuspended(AppButton, {
      props: {
        loading: true,
      },
      slots: {
        default: 'Loading',
      },
    })

    const vBtn = wrapper.findComponent({ name: 'VBtn' })
    expect(vBtn.props('loading')).toBe(true)
  })
})
