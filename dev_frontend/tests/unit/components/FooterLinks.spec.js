import { shallowMount } from '@vue/test-utils'
import FooterLinks from '../../../src/components/FooterLinks'

describe('FooterLinks.vue', () => {

  test('should match snapshot', () => {
    const wrapper = shallowMount(FooterLinks)

    expect( wrapper.element ).toMatchSnapshot()
  })

})