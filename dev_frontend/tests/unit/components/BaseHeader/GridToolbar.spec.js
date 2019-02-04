import { shallowMount, createLocalVue } from '@vue/test-utils'
import { capitalize } from '../../../../src/filters/index'
import Vuex          from 'vuex'
import flushPromises from 'flush-promises'
import merge         from 'lodash.merge'
import GridToolbar   from '../../../../src/components/BaseHeader/GridToolbar.vue'
import BaseSwitch    from '../../../../src/components/BaseGeneric/BaseSwitch.vue'

const localVue = createLocalVue()
localVue.use( Vuex )

function createStore(overrides) {
  const defaultStoreConfig = {
    modules: {
      general: {
        namespaced: true,
        state: {
          currentStoreModule: 'DesktopModule',
        }
      },
      ui: {
        namespaced: true,
        getters: {
          getActionBarActive: () => { return false },
          getSecondRowActive: () => { return false },
        },
        actions: {
          toggleActionBar: jest.fn(),
          toggleSecondRow: jest.fn(),
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
    filters: { capitalize, },
    stubs: {
      BaseSwitch,
    }
  }

  return shallowMount( GridToolbar, merge( defaultMountingOptions, overrides ) )
}

describe('GridToolbar.vue', () => {

  describe('snapshots:', () => {

    test('should match if device is `desktop`', () => {
      const wrapper = createWrapper()

      expect( wrapper.element ).toMatchSnapshot()
    })

    test('should match if device is NOT `desktop`', () => {
      const store = createStore({
        modules: {
          general: {
            state: {
              currentStoreModule: 'testModule'
            }
          }
        }
      })
      const wrapper = createWrapper({ store, })

      expect( wrapper.element ).toMatchSnapshot()
    })

  })

  test('should invoke `toggleActionBar` when action bar switch is clicked', async () => {
    const toggleActionBar = jest.fn()
    const store = createStore({
      modules: {
        ui: {
          actions: {
            toggleActionBar
          },
        }
      }
    })
    const wrapper = createWrapper({ store, })
    const actionbar_switch = wrapper.findAll(BaseSwitch).at(0)
    actionbar_switch.trigger('click')
    await flushPromises()

    expect( toggleActionBar ).toBeCalled()
  })

  test('should invoke `toggleSecondRow` when second row switch is clicked', async () => {
    const toggleSecondRow = jest.fn()
    const store = createStore({
      modules: {
        ui: {
          actions: {
            toggleSecondRow
          },
        }
      }
    })
    const wrapper = createWrapper({ store, })
    const actionbar_switch = wrapper.findAll(BaseSwitch).at(1)
    actionbar_switch.trigger('click')
    await flushPromises()

    expect( toggleSecondRow ).toBeCalled()
  })

})