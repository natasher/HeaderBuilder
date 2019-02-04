import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex          from 'vuex'
import flushPromises from 'flush-promises'
import merge         from 'lodash.merge'
import TextField     from '../../../../../src/components/Forms/Fields/TextField.vue'

const localVue = createLocalVue()
localVue.use( Vuex )

const itemVal = 'item form'
const rowVal  = 'row value'

function createStore(overrides) {
  const defaultStoreConfig = {
    modules: {
      fields: {
        namespaced: true,
        actions: {
          setModalFieldValue: jest.fn()
        },
        getters: {
          getCurrentFieldValue: jest.fn().mockReturnValue(
            jest.fn().mockReturnValue( itemVal )
          ),
          getRowOptionValue: jest.fn().mockReturnValue(
            jest.fn().mockReturnValue( rowVal )
          ),
        }
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

  return shallowMount( TextField, merge( defaultMountingOptions, overrides ))
}

describe('TextField.vue', () => {

  describe('snapshots:', () => {

    test('should match snapshot when field is wide', () => {
      const wrapper = createWrapper({
        propsData: {
          desc: 'Lorem ipsum dolor sit amet consectetur.'
        }
      })

      expect( wrapper.element ).toMatchSnapshot()
    })

    test('should match snapshot when field is narrow', () => {
      const wrapper = createWrapper({
        propsData: {
          desc  : 'Lorem ipsum dolor sit amet consectetur.',
          spread: 'narrow',
        }
      })

      expect( wrapper.element ).toMatchSnapshot()
    })

    test('should match snapshot when placeholder is provided', () => {
      const wrapper = createWrapper({
        propsData: {
          pholder: 'Lorem, ipsum dolor.'
        }
      })

      expect( wrapper.element ).toMatchSnapshot()
    })

  })

  test('should get value from item form state if `as` prop is empty', async () => {
    const innerGetter = jest.fn().mockReturnValue('item form')
    const getCurrentFieldValue = jest.fn().mockReturnValue( innerGetter )
    const getRowOptionValue = jest.fn().mockReturnValue(
      jest.fn().mockReturnValue('row value')
    )
    const store = createStore({
      modules: {
        fields: {
          getters: {
            getCurrentFieldValue,
            getRowOptionValue,
          }
        }
      }
    })
    const wrapper = createWrapper({ store, })
    await flushPromises()

    expect(innerGetter).toBeCalledWith( wrapper.vm.wpId )
    expect(getRowOptionValue).not.toBeCalled()
  })

  test.only('should get value from row state if `as` props is `row`', async () => {
    const innerGetter          = jest.fn().mockReturnValue('row form')
    const getCurrentFieldValue = jest.fn().mockReturnValue( jest.fn() )
    const getRowOptionValue    = jest.fn().mockReturnValue( innerGetter )
    const store = createStore({
      modules: {
        fields: {
          getters: {
            getCurrentFieldValue,
            getRowOptionValue,
          }
        }
      }
    })
    const wrapper = createWrapper({
      store,
      propsData: {
        as: 'row'
      }
    })
    await flushPromises()

    expect(innerGetter).toBeCalledWith( wrapper.vm.wpId, '' )
    expect(getCurrentFieldValue).not.toBeCalled()
  })

  test('should set value if filled (item form ver.)', async () => {
    const setModalFieldValue = jest.fn()
    const store = createStore({
      modules: {
        fields: {
          actions: {
            setModalFieldValue,
          }
        }
      }
    })
    const wrapper = createWrapper({ store, })

    const input = wrapper.find( `input[name = "${ wrapper.vm.wpId}"]` )
    input.trigger( 'input' )
    await flushPromises()

    expect(setModalFieldValue).toBeCalledWith(
      expect.anything(),
      expect.objectContaining({
        name : wrapper.vm.wpId,
        value: itemVal,
      }),
      void 0
    )
  })

  test('should set value if filled (row ver.)', async () => {
    const setModalFieldValue = jest.fn()
    const store = createStore({
      modules: {
        fields: {
          actions: {
            setModalFieldValue,
          }
        }
      }
    })
    const wrapper = createWrapper({
      store,
      propsData: {
        as : 'row',
        row: 'testRow'
      }
    })

    const input = wrapper.find( `input[name = "${ wrapper.vm.wpId}"]` )
    input.trigger( 'input' )
    await flushPromises()

    expect(setModalFieldValue).toBeCalledWith(
      expect.anything(),
      expect.objectContaining({
        name : wrapper.vm.wpId,
        value: rowVal,
        as   : 'row',
        row  : 'testRow'
      }),
      void 0
    )
  })

})