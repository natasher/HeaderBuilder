import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex          from 'vuex'
import flushPromises from 'flush-promises'
import merge         from 'lodash.merge'
import TextAreaField from '../../../../../src/components/Forms/Fields/TextAreaField.vue'

const localVue = createLocalVue()
localVue.use( Vuex )

const itemVal = 'item form'

function createStore(overrides) {
  const defaultStoreConfig = {
    modules: {
      fields: {
        namespaced: true,
        getters: {
          getCurrentFieldValue: jest.fn().mockReturnValue(
            jest.fn().mockReturnValue( itemVal )
          ),
        },
      },
      items: {
        namespaced: true,
        actions: {
          setCurrentFieldValue: jest.fn()
        },
      }
    }
  }

  return new Vuex.Store(
    merge( defaultStoreConfig, overrides )
  )
}

function createWrapper(overrides) {
  const defaultMountingOptions = {
    localVue,
    store: createStore(),
    propsData: {
      fieldName: 'Test Field',
      wpId     : 'testField',
    }
  }

  return shallowMount( TextAreaField, merge( defaultMountingOptions, overrides ))
}

describe('TextAreaField.vue', () => {

  test('should match snapshot', () => {
    const wrapper = createWrapper()

    expect( wrapper.element ).toMatchSnapshot()
  })

  test('should get value from item form state', async () => {
    const innerGetter = jest.fn().mockReturnValue( itemVal )
    const getCurrentFieldValue = jest.fn().mockReturnValue( innerGetter )
    const store = createStore({
      modules: {
        fields: {
          getters: {
            getCurrentFieldValue,
          }
        }
      }
    })
    const wrapper = createWrapper({ store, })
    await flushPromises()

    expect(innerGetter).toBeCalledWith( wrapper.vm.wpId )
  })

  test('should set value if filled', async () => {
    const setCurrentFieldValue = jest.fn()
    const store = createStore({
      modules: {
        items: {
          actions: {
            setCurrentFieldValue,
          }
        }
      }
    })
    const wrapper = createWrapper({ store, })

    const textarea = wrapper.find( `textarea#${ wrapper.vm.wpId }` )
    textarea.trigger( 'input' )
    await flushPromises()

    expect(setCurrentFieldValue).toBeCalledWith(
      expect.anything(),
      {
        name : wrapper.vm.wpId,
        value: itemVal,
      },
      void 0,
    )
  })

})