import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex          from 'vuex'
// import flushPromises from 'flush-promises'
import merge         from 'lodash.merge'
import SwitchField   from '../../../../../src/components/Forms/Fields/SwitchField.vue'

const localVue = createLocalVue()
localVue.use( Vuex )

function createStore(overrides) {
  const defaultStoreConfig = {
    modules: {
      fields: {
        namespaced: true,
        actions: {
          toggleSwitchState: jest.fn()
        },
        getters: {
          getSwitchFieldValue: jest.fn().mockReturnValue(
            jest.fn().mockReturnValue( true )
          )
        }
      }
    }
  }

  return new Vuex.Store(
    merge( defaultStoreConfig, overrides )
  )
}

const propsData = {
  fieldName: 'Test Field',
  wpId     : 'testField',
  label    : 'test label',
}

function createWrapper(overrides) {
  const defaultMountingOptions = {
    localVue,
    store: createStore(),
    propsData,
  }

  return shallowMount( SwitchField, merge( defaultMountingOptions, overrides ))
}

describe('SwitchField.vue', () => {

  test('should match snapshot', () => {
    const wrapper = createWrapper()

    expect( wrapper.element ).toMatchSnapshot()
  })

  test('should toggle switch if user click switch', async () => {
    const toggleSwitchState = jest.fn()
    const store = createStore({
      modules: {
        fields: {
          actions: {
            toggleSwitchState,
          }
        }
      }
    })
    const wrapper = createWrapper({ store, })
    const sw      = wrapper.find('baseswitch-stub')
    sw.trigger( 'click' )

    expect(toggleSwitchState).toBeCalledWith(
      expect.anything(),
      {
        name: wrapper.vm.wpId,
        as  : wrapper.vm.as
      },
      void 0
    )
  })

})