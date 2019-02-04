import { shallowMount } from '@vue/test-utils'
import MfnLogo from '../../../../src/components/BaseGeneric/MfnLogo'

describe('MfnLogo.vue', () => {

  test('should match snapshot', () => {
    const wrapper = shallowMount(MfnLogo)

    expect( wrapper.element ).toMatchSnapshot()
  })

})