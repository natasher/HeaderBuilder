import { shallowMount, createLocalVue } from '@vue/test-utils'
import { capitalize } from '../../../../src/filters/index'
import Vuex          from 'vuex'
import flushPromises from 'flush-promises'
import merge         from 'lodash.merge'
import LayoutTabs    from '../../../../src/components/BaseHeader/LayoutTabs.vue'

const localVue = createLocalVue()
localVue.use( Vuex )

function createStore(overrides) {
  const defaultStoreConfig = {
    modules: {
      ui: {
        namespaced: true,
        getters: {
          getLayoutPosition: jest.fn().mockReturnValue('top'),
        },
        actions: {
          handleLayoutPositionClick: jest.fn()
        },
      },
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
    filters: { capitalize },
  }

  return shallowMount( LayoutTabs, merge( defaultMountingOptions, overrides ) )
}

describe('LayoutTabs.vue', () => {

  describe('snapshots:', () => {

    test('should match if layout position is `top`', () => {
      const wrapper = createWrapper()

      expect( wrapper.element ).toMatchSnapshot()
    })

    test('should match if layout position is `bottom`', async () => {
      const store = createStore({
        modules: {
          ui: {
            getters: {
              getLayoutPosition: jest.fn().mockReturnValue('bottom'),
            },
          },
        }
      })
      const wrapper = createWrapper({ store, })

      expect( wrapper.element ).toMatchSnapshot()
    })

    test('should match if layout position is `left`', async () => {
      const store = createStore({
        modules: {
          ui: {
            getters: {
              getLayoutPosition: jest.fn().mockReturnValue('left'),
            },
          },
        }
      })
      const wrapper = createWrapper({ store, })

      expect( wrapper.element ).toMatchSnapshot()
    })

    test('should match if layout position is `right`', async () => {
      const store = createStore({
        modules: {
          ui: {
            getters: {
              getLayoutPosition: jest.fn().mockReturnValue('right'),
            },
          },
        }
      })
      const wrapper = createWrapper({ store, })

      expect( wrapper.element ).toMatchSnapshot()
    })


  })

  test('should add `.active` class to currently displayed layout', async () => {
    const pos = 'left'
    const store = createStore({
      modules: {
        ui: {
          getters: {
            getLayoutPosition: jest.fn().mockReturnValue( pos ),
          },
        },
      }
    })
    const wrapper = createWrapper({ store, })

    await flushPromises()

    expect( wrapper.find(`li[data-position="${ pos }"]`).classes() ).toContain( 'active' )
  })

  test('should invoke layout position when desired position is clicked', async () => {
    const handleLayoutPositionClick = jest.fn()
    const store = createStore({
      modules: {
        ui: {
          actions: {
            handleLayoutPositionClick,
          }
        }
      }
    })
    const wrapper = createWrapper({ store, })

    const pos     = wrapper.findAll('li').at( 3 )
    const posName = pos.attributes()[ 'data-position' ]

    pos.trigger('click')
    await flushPromises()

    expect( handleLayoutPositionClick ).toBeCalledWith( expect.anything(), { position: posName }, void 0)
  })

})