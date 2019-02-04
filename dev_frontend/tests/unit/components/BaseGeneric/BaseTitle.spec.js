import { shallowMount } from '@vue/test-utils'
import BaseTitle from '../../../../src/components/BaseGeneric/BaseTitle.vue'

describe('BaseTitle.vue', () => {

  test('should render text passes in props', () => {
    const title   = 'My Awesome Title'
    const wrapper = shallowMount(BaseTitle, {
      propsData: {
        title,
      }
    })

    expect( wrapper.text() ).toBe( title )
  })

  test('should match snapshot', () => {
    const wrapper = shallowMount(BaseTitle, {
      propsData: {
        title: 'My Awesome Title'
      }
    })

    expect( wrapper.element ).toMatchSnapshot()
  })
})