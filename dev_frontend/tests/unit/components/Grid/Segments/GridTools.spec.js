import { shallowMount, createLocalVue } from '@vue/test-utils'
import merge         from 'lodash.merge'
import flushPromises from 'flush-promises'
import Vuex          from 'vuex'
import GridTools     from '../../../../../src/components/Grid/Segments/GridTools.vue'

const localVue = createLocalVue()
localVue.use( Vuex )

const $modal = jest.fn()

function createStore(overrides) {
  const defaultStoreConfig = {
    modules: {
      ui: {
        namespaced: true,
        getters: {
          getGridStatus: jest.fn(() => { return 'custom' }),
        }
      },
      modals: {
        namespaced: true,
        actions: {
          showGridOptionsModal: jest.fn(),
        }
      },
    }
  }

  return new Vuex.Store( merge( defaultStoreConfig, overrides ))
}

function createWrapper(overrides) {
  const defaultMountingOptions = {
    localVue,
    store: createStore(),
    mocks: {
      $modal,
    }
  }

  return shallowMount( GridTools, merge( defaultMountingOptions, overrides ))
}

describe('GridTools.vue', () => {

  test('should match snapshot if grid status is `custom`', () => {
    const wrapper = createWrapper()

    expect( wrapper.element ).toMatchSnapshot()
  })

  test('should match snapshot if grid status is NOT `custom`', () => {
    const store = createStore({
      modules: {
        ui: {
          getters: {
            getGridStatus: jest.fn(() => { return 'test' })
          }
        }
      }
    })
    const wrapper = createWrapper({ store, })

    expect( wrapper.element ).toMatchSnapshot()
  })

  test('should open grid options modal if edit icon is clicked', async () => {
    const showGridOptionsModal = jest.fn()
    const store = createStore({
      modules: {
        modals: {
          actions: {
            showGridOptionsModal,
          }
        }
      }
    })
    const wrapper = createWrapper({ store, })
    const btn = wrapper.find('a')

    btn.trigger( 'click' )
    await flushPromises()

    expect(showGridOptionsModal).toBeCalledWith(
      expect.anything(),
      { $modal, },
      void 0
    )
  })

})