import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex          from 'vuex'
import flushPromises from 'flush-promises'
import merge         from 'lodash.merge'
import MarginField   from '../../../../../src/components/Forms/Fields/MarginField.vue'

const localVue = createLocalVue()
localVue.use(Vuex)

const val = 'test value'

function createStore(overrides) {
  const defaultStoreConfig = {
    modules: {
      fields: {
        namespaced: true,
        actions: {
          setModalFieldValue: jest.fn()
        },
        getters: {
          getMarginFieldValue: jest.fn().mockReturnValue(
            jest.fn().mockReturnValue( val )
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

  return shallowMount( MarginField, merge( defaultMountingOptions, overrides ))
}

describe('TextField.vue', () => {

  describe('snapshots:', () => {

    test('should match snapshot if located in item form', () => {
      const wrapper = createWrapper()

      expect( wrapper.element ).toMatchSnapshot()
    })

    test('should match snapshot if located in row form', () => {
      const wrapper = createWrapper({
        propsData: {
          as : 'row',
          row: 'testRow',
        }
      })

      expect( wrapper.element ).toMatchSnapshot()
    })

    test('should match snapshot if located in grid form', () => {
      const wrapper = createWrapper({
        propsData: {
          as: 'grid',
        }
      })

      expect( wrapper.element ).toMatchSnapshot()
    })

  })

  describe('top value:', () => {

    test('should get value from item form state if `as` prop is empty', async () => {
      const innerGetter         = jest.fn().mockReturnValue()
      const getMarginFieldValue = jest.fn().mockReturnValue( innerGetter )
      const store = createStore({
        modules: {
          fields: {
            getters: {
              getMarginFieldValue,
            }
          }
        }
      })
      const wrapper = createWrapper({ store, })
      await flushPromises()

      expect(innerGetter).toBeCalledWith(
        wrapper.vm.wpId,
        '',
        '',
        'top'
      )
    })

    test('should get value from row state if `as` props is `row`', async () => {
      const innerGetter         = jest.fn().mockReturnValue()
      const getMarginFieldValue = jest.fn().mockReturnValue( innerGetter )
      const store = createStore({
        modules: {
          fields: {
            getters: {
              getMarginFieldValue,
            }
          }
        }
      })
      const propsData = {
          as : 'row',
          row: 'testRow',
        }
      const wrapper = createWrapper({
        store,
        propsData,
      })
      await flushPromises()

      expect(innerGetter).toBeCalledWith(
        wrapper.vm.wpId,
        propsData.as,
        propsData.row,
        'top'
      )
    })

    test('should get value from row state if `as` props is `grid`', async () => {
      const innerGetter         = jest.fn().mockReturnValue()
      const getMarginFieldValue = jest.fn().mockReturnValue( innerGetter )
      const store = createStore({
        modules: {
          fields: {
            getters: {
              getMarginFieldValue,
            }
          }
        }
      })
      const propsData = {
          as : 'grid',
        }
      const wrapper = createWrapper({
        store,
        propsData,
      })
      await flushPromises()

      expect(innerGetter).toBeCalledWith(
        wrapper.vm.wpId,
        propsData.as,
        '',
        'top'
      )
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

      const input = wrapper.find( `input[name = "${ wrapper.vm.wpId }Top"]` )
      input.trigger( 'input' )
      await flushPromises()

      expect(setModalFieldValue).toBeCalledWith(
        expect.anything(),
        expect.objectContaining({
          name    : wrapper.vm.wpId,
          position: 'top',
          value   : val,
          as      : '',
          row     : '',
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
      const propsData = {
        as : 'row',
        row: 'testRow',
      }
      const wrapper = createWrapper({
        store,
        propsData,
      })

      const input = wrapper.find( `input[name = "${ wrapper.vm.wpId }Top"]` )
      input.trigger( 'input' )
      await flushPromises()

      expect(setModalFieldValue).toBeCalledWith(
        expect.anything(),
        expect.objectContaining({
          name    : wrapper.vm.wpId,
          position: 'top',
          value   : val,
          as      : propsData.as,
          row     : propsData.row,
        }),
        void 0
      )
    })

    test('should set value if filled (grid ver.)', async () => {
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
      const propsData = {
        as : 'grid',
      }
      const wrapper = createWrapper({
        store,
        propsData,
      })

      const input = wrapper.find( `input[name = "${ wrapper.vm.wpId }Top"]` )
      input.trigger( 'input' )
      await flushPromises()

      expect(setModalFieldValue).toBeCalledWith(
        expect.anything(),
        expect.objectContaining({
          name    : wrapper.vm.wpId,
          position: 'top',
          value   : val,
          as      : propsData.as,
          row     : '',
        }),
        void 0
      )
    })

  })

  describe('right value:', () => {

    test('should get value from item form state if `as` prop is empty', async () => {
      const innerGetter         = jest.fn().mockReturnValue()
      const getMarginFieldValue = jest.fn().mockReturnValue( innerGetter )
      const store = createStore({
        modules: {
          fields: {
            getters: {
              getMarginFieldValue,
            }
          }
        }
      })
      const wrapper = createWrapper({ store, })
      await flushPromises()

      expect(innerGetter).toBeCalledWith(
        wrapper.vm.wpId,
        '',
        '',
        'right'
      )
    })

    test('should get value from row state if `as` props is `row`', async () => {
      const innerGetter         = jest.fn().mockReturnValue()
      const getMarginFieldValue = jest.fn().mockReturnValue( innerGetter )
      const store = createStore({
        modules: {
          fields: {
            getters: {
              getMarginFieldValue,
            }
          }
        }
      })
      const propsData = {
          as : 'row',
          row: 'testRow',
        }
      const wrapper = createWrapper({
        store,
        propsData,
      })
      await flushPromises()

      expect(innerGetter).toBeCalledWith(
        wrapper.vm.wpId,
        propsData.as,
        propsData.row,
        'right'
      )
    })

    test('should get value from row state if `as` props is `grid`', async () => {
      const innerGetter         = jest.fn().mockReturnValue()
      const getMarginFieldValue = jest.fn().mockReturnValue( innerGetter )
      const store = createStore({
        modules: {
          fields: {
            getters: {
              getMarginFieldValue,
            }
          }
        }
      })
      const propsData = {
          as : 'grid',
        }
      const wrapper = createWrapper({
        store,
        propsData,
      })
      await flushPromises()

      expect(innerGetter).toBeCalledWith(
        wrapper.vm.wpId,
        propsData.as,
        '',
        'right'
      )
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

      const input = wrapper.find( `input[name = "${ wrapper.vm.wpId }Right"]` )
      input.trigger( 'input' )
      await flushPromises()

      expect(setModalFieldValue).toBeCalledWith(
        expect.anything(),
        expect.objectContaining({
          name    : wrapper.vm.wpId,
          position: 'right',
          value   : val,
          as      : '',
          row     : '',
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
      const propsData = {
        as : 'row',
        row: 'testRow',
      }
      const wrapper = createWrapper({
        store,
        propsData,
      })

      const input = wrapper.find( `input[name = "${ wrapper.vm.wpId }Right"]` )
      input.trigger( 'input' )
      await flushPromises()

      expect(setModalFieldValue).toBeCalledWith(
        expect.anything(),
        expect.objectContaining({
          name    : wrapper.vm.wpId,
          position: 'right',
          value   : val,
          as      : propsData.as,
          row     : propsData.row,
        }),
        void 0
      )
    })

    test('should set value if filled (grid ver.)', async () => {
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
      const propsData = {
        as : 'grid',
      }
      const wrapper = createWrapper({
        store,
        propsData,
      })

      const input = wrapper.find( `input[name = "${ wrapper.vm.wpId }Right"]` )
      input.trigger( 'input' )
      await flushPromises()

      expect(setModalFieldValue).toBeCalledWith(
        expect.anything(),
        expect.objectContaining({
          name    : wrapper.vm.wpId,
          position: 'right',
          value   : val,
          as      : propsData.as,
          row     : '',
        }),
        void 0
      )
    })

  })

  describe('bottom value:', () => {

    test('should get value from item form state if `as` prop is empty', async () => {
      const innerGetter         = jest.fn().mockReturnValue()
      const getMarginFieldValue = jest.fn().mockReturnValue( innerGetter )
      const store = createStore({
        modules: {
          fields: {
            getters: {
              getMarginFieldValue,
            }
          }
        }
      })
      const wrapper = createWrapper({ store, })
      await flushPromises()

      expect(innerGetter).toBeCalledWith(
        wrapper.vm.wpId,
        '',
        '',
        'bottom'
      )
    })

    test('should get value from row state if `as` props is `row`', async () => {
      const innerGetter         = jest.fn().mockReturnValue()
      const getMarginFieldValue = jest.fn().mockReturnValue( innerGetter )
      const store = createStore({
        modules: {
          fields: {
            getters: {
              getMarginFieldValue,
            }
          }
        }
      })
      const propsData = {
          as : 'row',
          row: 'testRow',
        }
      const wrapper = createWrapper({
        store,
        propsData,
      })
      await flushPromises()

      expect(innerGetter).toBeCalledWith(
        wrapper.vm.wpId,
        propsData.as,
        propsData.row,
        'bottom'
      )
    })

    test('should get value from row state if `as` props is `grid`', async () => {
      const innerGetter         = jest.fn().mockReturnValue()
      const getMarginFieldValue = jest.fn().mockReturnValue( innerGetter )
      const store = createStore({
        modules: {
          fields: {
            getters: {
              getMarginFieldValue,
            }
          }
        }
      })
      const propsData = {
          as : 'grid',
        }
      const wrapper = createWrapper({
        store,
        propsData,
      })
      await flushPromises()

      expect(innerGetter).toBeCalledWith(
        wrapper.vm.wpId,
        propsData.as,
        '',
        'bottom'
      )
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

      const input = wrapper.find( `input[name = "${ wrapper.vm.wpId }Bottom"]` )
      input.trigger( 'input' )
      await flushPromises()

      expect(setModalFieldValue).toBeCalledWith(
        expect.anything(),
        expect.objectContaining({
          name    : wrapper.vm.wpId,
          position: 'bottom',
          value   : val,
          as      : '',
          row     : '',
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
      const propsData = {
        as : 'row',
        row: 'testRow',
      }
      const wrapper = createWrapper({
        store,
        propsData,
      })

      const input = wrapper.find( `input[name = "${ wrapper.vm.wpId }Bottom"]` )
      input.trigger( 'input' )
      await flushPromises()

      expect(setModalFieldValue).toBeCalledWith(
        expect.anything(),
        expect.objectContaining({
          name    : wrapper.vm.wpId,
          position: 'bottom',
          value   : val,
          as      : propsData.as,
          row     : propsData.row,
        }),
        void 0
      )
    })

    test('should set value if filled (grid ver.)', async () => {
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
      const propsData = {
        as : 'grid',
      }
      const wrapper = createWrapper({
        store,
        propsData,
      })

      const input = wrapper.find( `input[name = "${ wrapper.vm.wpId }Bottom"]` )
      input.trigger( 'input' )
      await flushPromises()

      expect(setModalFieldValue).toBeCalledWith(
        expect.anything(),
        expect.objectContaining({
          name    : wrapper.vm.wpId,
          position: 'bottom',
          value   : val,
          as      : propsData.as,
          row     : '',
        }),
        void 0
      )
    })

  })

  describe('left value:', () => {

    test('should get value from item form state if `as` prop is empty', async () => {
      const innerGetter         = jest.fn().mockReturnValue()
      const getMarginFieldValue = jest.fn().mockReturnValue( innerGetter )
      const store = createStore({
        modules: {
          fields: {
            getters: {
              getMarginFieldValue,
            }
          }
        }
      })
      const wrapper = createWrapper({ store, })
      await flushPromises()

      expect(innerGetter).toBeCalledWith(
        wrapper.vm.wpId,
        '',
        '',
        'left'
      )
    })

    test('should get value from row state if `as` props is `row`', async () => {
      const innerGetter         = jest.fn().mockReturnValue()
      const getMarginFieldValue = jest.fn().mockReturnValue( innerGetter )
      const store = createStore({
        modules: {
          fields: {
            getters: {
              getMarginFieldValue,
            }
          }
        }
      })
      const propsData = {
          as : 'row',
          row: 'testRow',
        }
      const wrapper = createWrapper({
        store,
        propsData,
      })
      await flushPromises()

      expect(innerGetter).toBeCalledWith(
        wrapper.vm.wpId,
        propsData.as,
        propsData.row,
        'left'
      )
    })

    test('should get value from row state if `as` props is `grid`', async () => {
      const innerGetter         = jest.fn().mockReturnValue()
      const getMarginFieldValue = jest.fn().mockReturnValue( innerGetter )
      const store = createStore({
        modules: {
          fields: {
            getters: {
              getMarginFieldValue,
            }
          }
        }
      })
      const propsData = {
          as : 'grid',
        }
      const wrapper = createWrapper({
        store,
        propsData,
      })
      await flushPromises()

      expect(innerGetter).toBeCalledWith(
        wrapper.vm.wpId,
        propsData.as,
        '',
        'left'
      )
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

      const input = wrapper.find( `input[name = "${ wrapper.vm.wpId }Left"]` )
      input.trigger( 'input' )
      await flushPromises()

      expect(setModalFieldValue).toBeCalledWith(
        expect.anything(),
        expect.objectContaining({
          name    : wrapper.vm.wpId,
          position: 'left',
          value   : val,
          as      : '',
          row     : '',
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
      const propsData = {
        as : 'row',
        row: 'testRow',
      }
      const wrapper = createWrapper({
        store,
        propsData,
      })

      const input = wrapper.find( `input[name = "${ wrapper.vm.wpId }Left"]` )
      input.trigger( 'input' )
      await flushPromises()

      expect(setModalFieldValue).toBeCalledWith(
        expect.anything(),
        expect.objectContaining({
          name    : wrapper.vm.wpId,
          position: 'left',
          value   : val,
          as      : propsData.as,
          row     : propsData.row,
        }),
        void 0
      )
    })

    test('should set value if filled (grid ver.)', async () => {
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
      const propsData = {
        as : 'grid',
      }
      const wrapper = createWrapper({
        store,
        propsData,
      })

      const input = wrapper.find( `input[name = "${ wrapper.vm.wpId }Left"]` )
      input.trigger( 'input' )
      await flushPromises()

      expect(setModalFieldValue).toBeCalledWith(
        expect.anything(),
        expect.objectContaining({
          name    : wrapper.vm.wpId,
          position: 'left',
          value   : val,
          as      : propsData.as,
          row     : '',
        }),
        void 0
      )
    })

  })

})