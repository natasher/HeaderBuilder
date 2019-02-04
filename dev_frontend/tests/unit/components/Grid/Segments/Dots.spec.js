import { shallowMount } from '@vue/test-utils'
import Dots from '../../../../../src/components/Grid/Segments/Dots.vue'

describe('Dots.vue', () => {

  test('should match snapshot', () => {
    const wrapper = shallowMount( Dots )

    expect( wrapper.element ).toMatchSnapshot()
  })

})