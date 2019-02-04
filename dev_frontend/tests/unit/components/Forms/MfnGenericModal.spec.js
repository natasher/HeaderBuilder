import { shallowMount, createLocalVue } from '@vue/test-utils'
import flushPromises   from 'flush-promises'
import merge           from 'lodash.merge'
import VModal          from 'vue-js-modal'
import MfnGenericModal from '../../../../src/components/Forms/MfnGenericModal'

const localVue = createLocalVue()
localVue.use( VModal )

function createWrapper(overrides) {
  const defaultMountingOptions = {
    localVue,
    setData: {
      title  : 'Test Title',
      text   : 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit debitis eveniet eligendi pariatur?',
      buttons: [
        {
          text: 'hide modal',
          handler: jest.fn()
        },
        {
          text: 'some action',
          handler: jest.fn()
        },
      ]
    }
  }

  return shallowMount( MfnGenericModal, merge( defaultMountingOptions, overrides ))
}

describe('MfnGenericModal.vue', () => {

  // INFO: do NOT test external lib ;)
  test('should match snapshot', async () => {
    const wrapper = createWrapper()
    await flushPromises()

    expect( wrapper.element ).toMatchSnapshot()
  })

})