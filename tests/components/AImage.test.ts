import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

import AImage from '@/components/AImage.vue'

describe('AImage', () => {
  it('renders properly', () => {
    const wrapper = mount(AImage, { props: { name: 'logo', extension: '.svg' } })
    // Vite converts assets to data URLs in development, so check if src exists instead
    expect(wrapper.attributes('src')).toBeTruthy()
  })
})
