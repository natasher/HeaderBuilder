import { shallowMount, createLocalVue } from '@vue/test-utils'
import { unCamelCase } from '../../../src/filters/index'
import Vuex          from 'vuex'
import flushPromises from 'flush-promises'
import merge         from 'lodash.merge'
import BaseItem      from '../../../src/components/BaseItem'
import FontIcon      from '../../../src/components/BaseGeneric/FontIcon.vue'

const localVue = createLocalVue()
localVue.use( Vuex )

function createStore(overrides) {
  const defaultStoreConfig = {
    modules: {
      modals: {
        namespaced: true,
        actions: {
          showModalItemForm: jest.fn(() => Promise.resolve())
        }
      },
      cell: {
        namespaced: true,
        actions: {
          removeItem: jest.fn(() => Promise.resolve())
        }
      },
      ui: {
        namespaced: true,
        getters: {
          getGridStatus: jest.fn(() => { return 'custom' })
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
    filters: { unCamelCase },
    store: createStore(),
    stubs: [
      'FontIcon',
    ],
    propsData: {
      item: {
        name: 'testName',
        icon: 'testIcon',
      },
    }
  }

  return shallowMount( BaseItem, merge( defaultMountingOptions, overrides ))
}

describe('BaseItem.vue', () => {

  describe('snapshots:', () => {

    test('with only required props', async () => {
      const wrapper = createWrapper()
      await flushPromises()

      expect( wrapper.element ).toMatchSnapshot()
    })

    test('when item is dragged', async () => {
      const wrapper = createWrapper({
        propsData: {
          placeholder: true
        }
      })
      await flushPromises()

      expect( wrapper.element ).toMatchSnapshot()
    })

  })

  describe('props:', () => {

    test('`item` should be an object with name and icon', async () => {
      const item = {
        name: 'someName',
        icon: 'crazyIcon'
      }
      const wrapper = createWrapper({
        propsData: {
          item
        }
      })
      await flushPromises()

      expect( wrapper.props().item ).toEqual( item )
    })

    test('`cellId` should exist and be empty by default', async () => {
      const wrapper = createWrapper()
      await flushPromises()

      expect( wrapper.props().cellId ).toBe( void 0 )
    })

    test('`row` should exist and be empty by default', async () => {
      const wrapper = createWrapper()
      await flushPromises()

      expect( wrapper.props().row ).toBe( void 0 )
    })

    test('`cellPos` should exist and be empty by default', async () => {
      const wrapper = createWrapper()
      await flushPromises()

      expect( wrapper.props().cellPos ).toBe( void 0 )
    })

    test('`placeholder` should exist and be false by default', async () => {
      const wrapper = createWrapper()
      await flushPromises()

      expect( wrapper.props().placeholder ).toBe( false )
    })

  })

  describe('methods:', () => {

    test('`showModalItemForm` should be called if grid status is `custom`', async () => {
      const showModalItemForm = jest.fn()
      const store = createStore({
        modules: {
          modals: {
            actions: {
              showModalItemForm,
            }
          },
          ui: {
            getters: {
              getGridStatus: () => { return 'custom' }
            }
          }
        }
      })
      const wrapper = createWrapper({ store, })

      wrapper.find('a.icon-edit>i').trigger('click')
      await flushPromises()

      expect( showModalItemForm ).toBeCalled()
    })

    test('`showModalItemForm` should NOT be called if grid status is NOT `custom`', async () => {
      const showModalItemForm = jest.fn()
      const store = createStore({
        modules: {
          modals: {
            actions: {
              showModalItemForm,
            }
          },
          ui: {
            getters: {
              getGridStatus: () => { return 'other' }
            }
          }
        }
      })
      const wrapper = createWrapper({ store, })

      wrapper.find('a.icon-edit>i').trigger('click')
      await flushPromises()

      expect( showModalItemForm ).not.toBeCalled()
    })

    test('`removeItem` should be called if grid status is `custom`', async () => {
      const removeItem = jest.fn()
      const store = createStore({
        modules: {
          cell: {
            actions: {
              removeItem,
            }
          },
          ui: {
            getters: {
              getGridStatus: () => { return 'custom' }
            }
          }
        }
      })
      const wrapper = createWrapper({ store, })

      wrapper.find('a.icon-delete>i').trigger('click')
      await flushPromises()

      expect( removeItem ).toBeCalled()
    })

    test('`removeItem` should NOT be called if grid status is NOT `custom`', async () => {
      const removeItem = jest.fn()
      const store = createStore({
        modules: {
          cell: {
            actions: {
              removeItem,
            }
          },
          ui: {
            getters: {
              getGridStatus: () => { return 'other' }
            }
          }
        }
      })
      const wrapper = createWrapper({ store, })

      wrapper.find('a.icon-delete>i').trigger('click')
      await flushPromises()

      expect( removeItem ).not.toBeCalled()
    })

  })

  describe('dynamic behaviour:', () => {

    test('should has class `hb-item-placeholder` if placeholder prop is true', async () => {
      const wrapper = createWrapper({
        propsData: {
          placeholder: true
        }
      })
      await flushPromises()

      expect( wrapper.classes() ).toContain( 'hb-item-placeholder' )
    })

    test('should NOT has class `hb-item-placeholder` if placeholder prop is true', async () => {
      const wrapper = createWrapper({
        propsData: {
          placeholder: false
        }
      })
      await flushPromises()

      expect( wrapper.classes() ).not.toContain( 'hb-item-placeholder' )
    })

    test('should has `data-type` attribute with the item name', async () => {
      const item = {
        name: 'someName',
        icon: 'crazyIcon'
      }
      const wrapper = createWrapper({
        propsData: {
          item
        }
      })
      await flushPromises()

      expect( wrapper.attributes()[ 'data-type' ] ).toBe( item.name )
    })

    test('should has `data-cellId` attribute with cellId', async () => {
      const cellId = 666
      const wrapper = createWrapper({
        propsData: {
          cellId,
        }
      })
      await flushPromises()

      expect( wrapper.attributes()[ 'data-cellid' ] ).toBe( `${ cellId }` )
    })

    test('should show item icon if `placeholder` is false', async () => {
      const wrapper = createWrapper({
        propsData: {
          placeholder: false
        }
      })
      await flushPromises()

      expect( wrapper.find('.image' ).isVisible() ).toBe( true )
    })

    test('should hide item icon if `placeholder` is true', async () => {
      const wrapper = createWrapper({
        propsData: {
          placeholder: true
        }
      })
      await flushPromises()

      expect( wrapper.find('.image' ).isVisible() ).toBe( false )
    })

    test('should show item title if `placeholder` is false', async () => {
      const wrapper = createWrapper({
        propsData: {
          placeholder: false
        }
      })
      await flushPromises()

      expect( wrapper.find('.title' ).isVisible() ).toBe( true )
    })

    test('should show item title if `placeholder` is false', async () => {
      const wrapper = createWrapper({
        propsData: {
          placeholder: true
        }
      })
      await flushPromises()

      expect( wrapper.find('.title' ).isVisible() ).toBe( false )
    })

    test('should render item name in readable format (unCamelCased)', async () => {
      const item = {
        name: 'someName',
        icon: 'crazyIcon'
      }
      const wrapper = createWrapper({
        propsData: {
          item
        }
      })
      await flushPromises()

      expect( wrapper.find('.title').text() ).toBe( 'Some Name' )
    })

    test('should pass `icon` as a prop to <font-icon />', async () => {
      const item = {
        name: 'someName',
        icon: 'crazyIcon'
      }
      const wrapper = createWrapper({
        propsData: {
          item
        }
      })
      await flushPromises()

      expect( wrapper.find( FontIcon ).props( 'icon' ) ).toEqual({ icon: item.icon })
    })

  })

})