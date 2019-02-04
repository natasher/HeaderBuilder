import { mount, createLocalVue } from '@vue/test-utils'
import Vuex          from 'vuex'
import flushPromises from 'flush-promises'
import merge         from 'lodash.merge'
import AppScaffold   from '../../../src/components/AppScaffold'

const localVue = createLocalVue()
localVue.use( Vuex )

function createStore(overrides) {
  const defaultStoreConfig = {
    modules: {
      general: {
        namespaced: true,
        state: {
          currentView: 'test-view'
        }
      },
      ui: {
        namespaced: true,
        state: {
          stickyFlag: 'test-flag'
        },
        getters: {
          getLayoutPosition: jest.fn(() => { return 'test-position' })
        }
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
    stubs: [
      'ModalsList',
    ],
    slots: {
      header: '<div class="test-header">HEADER SLOT</div>',
      main  : '<div class="test-main">MAIN SLOT</div>'
    }
  }

  return mount( AppScaffold, merge( defaultMountingOptions, overrides ))
}

describe('AppScaffold.vue', () => {

  test('should match snapshot', async () => {
    const wrapper = createWrapper()
    await flushPromises()

    expect( wrapper.element ).toMatchSnapshot()
  })

  test('should insert currently used `device` to data attribute', async () => {
    const currentView = 'test-view'
    const store = createStore({
      modules: {
        general: {
          state: {
            currentView
          }
        },
      }
    })
    const wrapper = createWrapper({ store, })
    await flushPromises()

    expect( wrapper.attributes()[ 'data-device' ] ).toBe( currentView )
  })

  test('should insert current grid position to data attribute', async () => {
    const currentPosition = 'test-position'
    const store = createStore({
      modules: {
        ui: {
          getters: {
            getLayoutPosition: jest.fn(() => { return currentPosition })
          }
        }
      }
    })
    const wrapper = createWrapper({ store, })
    await flushPromises()

    expect( wrapper.attributes()[ 'data-position' ] ).toBe( currentPosition )
  })

  test('should insert type of device grid to data attribute', async () => {
    const type = 'test-type'
    const store = createStore({
      modules: {
        ui: {
          state: {
            stickyFlag: type
          },
        }
      }
    })
    const wrapper = createWrapper({ store, })
    await flushPromises()

    expect( wrapper.attributes()[ 'data-type' ] ).toBe( type )
  })

  test('should takes components to header slot', async () => {
    const wrapper = createWrapper()
    await flushPromises()

    expect( wrapper.find('#mfn-hb-header').contains('div.test-header') ).toBeTruthy()
  })

  test('should takes components to main slot', async () => {
    const wrapper = createWrapper()
    await flushPromises()

    expect( wrapper.find('.test-main').text() ).toBe('MAIN SLOT')
  })

})