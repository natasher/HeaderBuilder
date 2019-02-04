import { shallowMount } from '@vue/test-utils'
import WrapperClearfix from '../../../../src/components/BaseGeneric/WrapperClearfix.vue'

describe('WrapperClearfix.vue', () => {

  test('should match snapshot', () => {
    const wrapper = shallowMount(WrapperClearfix)

    expect( wrapper.element ).toMatchSnapshot()
  })

})