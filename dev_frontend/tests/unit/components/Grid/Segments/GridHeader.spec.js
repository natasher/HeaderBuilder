import { shallowMount } from '@vue/test-utils'
import GridHeader from '../../../../../src/components/Grid/Segments/GridHeader.vue'

describe('GridHeader.vue', () => {

  test('should match snapshot', () => {
    const wrapper = shallowMount( GridHeader )

    expect( wrapper.element ).toMatchSnapshot()
  })

})