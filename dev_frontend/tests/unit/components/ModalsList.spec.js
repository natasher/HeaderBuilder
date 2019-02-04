import { shallowMount } from '@vue/test-utils'
import ModalsList from '../../../src/components/ModalsList'

describe('ModalList.vue', () => {

  test('should match snapshot', () => {
    const wrapper = shallowMount(ModalsList)

    expect( wrapper.element ).toMatchSnapshot()
  })

})