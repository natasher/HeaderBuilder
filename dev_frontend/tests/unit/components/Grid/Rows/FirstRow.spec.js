import { shallowMount, createLocalVue } from '@vue/test-utils'
import flushPromises from 'flush-promises'
import Vuex          from 'vuex'
import merge         from 'lodash.merge'
import FirstRow      from '../../../../../src/components/Grid/Rows/FirstRow.vue'
import GridRow       from '../../../../../src/components/Grid/Segments/GridRow.vue'

const localVue = createLocalVue()
localVue.use( Vuex )

function createStore(overrides) {
  const defaultStoreConfig = {
    modules: {
      ui: {
        namespaced: true,
        getters: {
          getLayoutPosition: jest.fn().mockReturnValue( 'top' ),
          getGridStatus    : jest.fn(() => { return 'custom' })
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
    stubs: {
      GridRow,
    }
  }

  return shallowMount( FirstRow, merge( defaultMountingOptions, overrides ))
}

describe('FirstRow.vue', () => {

  describe('snapshots:', () => {

    test('should match if the layout position is top', () => {
      const wrapper = createWrapper()

      expect( wrapper.element ).toMatchSnapshot()
    })

    test('should match if the layout position is bottom', () => {
      const store = createStore({
        modules: {
          ui: {
            getters: {
              getLayoutPosition: jest.fn(() => { return 'bottom' })
            }
          }
        }
      })
      const wrapper = createWrapper({ store, })

      expect( wrapper.element ).toMatchSnapshot()
    })

    test('should match if the layout position is right', () => {
      const store = createStore({
        modules: {
          ui: {
            getters: {
              getLayoutPosition: jest.fn(() => { return 'right' })
            }
          }
        }
      })
      const wrapper = createWrapper({ store, })

      expect( wrapper.element ).toMatchSnapshot()
    })

    test('should match if the layout position is left', () => {
      const store = createStore({
        modules: {
          ui: {
            getters: {
              getLayoutPosition: jest.fn(() => { return 'left' })
            }
          }
        }
      })
      const wrapper = createWrapper({ store, })

      expect( wrapper.element ).toMatchSnapshot()
    })

    test('should match if grid status is not custom', () => {
      const store = createStore({
        modules: {
          ui: {
            getters: {
              getGridStatus: jest.fn(() => { return 'auto' })
            }
          }
        }
      })
      const wrapper = createWrapper({ store, })

      expect( wrapper.element ).toMatchSnapshot()
    })

  })

  test('should open actions bar options modal if edit icon is clicked', async () => {
    const $modal = jest.fn()
    const showFirstRowOptionsModal = jest.fn()
    const store = createStore({
      modules: {
        modals: {
          namespaced: true,
          actions: {
            showFirstRowOptionsModal,
          }
        }
      }
    })
    const wrapper = createWrapper({
      store,
      mocks: {
        $modal
      }
    })
    const editBtn = wrapper.find('.icon-edit')

    editBtn.trigger('click')
    await flushPromises()

    expect(showFirstRowOptionsModal).toBeCalledWith(
      expect.anything(),
      { $modal, },
      void 0
    )
  })

})