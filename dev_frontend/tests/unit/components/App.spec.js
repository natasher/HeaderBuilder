import { mount, createLocalVue } from '@vue/test-utils'
import Vuex          from 'vuex'
import flushPromises from 'flush-promises'
import merge         from 'lodash.merge'
import App           from '../../../src/components/App.vue'
import AppScaffold   from '../../../src/components/AppScaffold'

const localVue = createLocalVue()
localVue.use( Vuex )

function createStore(overrides) {
  const defaultStoreConfig = {
    modules: {
      general: {
        namespaced: true,
        state: {
          currentView: 'desktop'
        }
      },
      endpoint: {
        namespaced: true,
        actions: {
          pushWPMenusList: jest.fn(() => Promise.resolve()),
          getStateFromWP : jest.fn(() => Promise.resolve()),
        }
      },
      ui: {
        namespaced: true,
        state: {
          stickyFlag: 'default'
        },
        actions: {
          changeDevice: jest.fn(() => Promise.resolve()),
        },
        getters: {
          getLayoutPosition: jest.fn(() => { return 'top' })
        }
      },
      modals: {
        namespaced: true,
        actions: {
          showLaunchModal: jest.fn(),
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
    stubs: [
      'Grid',
      'BaseHeader',
      'GridToolbar',
      'InactiveItems',
      'ItemsTray',
      'FooterLinks',
      'ModalsList',
      'ResetBuilder',
    ],
    mocks: {
      $modal: jest.fn()
    },
    store: createStore()
  }

  return mount( App, merge( defaultMountingOptions, overrides ))
}

describe('App.vue', () => {

  describe('snapshots', () => {
    test('should dispay `inactive items` if current device is `mobile`', async () => {
      const currentView = 'mobile'
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

      expect( wrapper.findAll( AppScaffold ).length ).toBe( 1 )
      expect( wrapper.element ).toMatchSnapshot()
    })

    test('should match snapshot if current device is NOT `mobile`', async () => {
      const wrapper = createWrapper()
      await flushPromises()

      expect( wrapper.findAll( AppScaffold ).length ).toBe( 1 )
      expect( wrapper.element ).toMatchSnapshot()
    })
  })

  test('should push fetched Wordpress menus to the state', async () => {
    const pushWPMenusList = jest.fn(() => Promise.resolve())
    const store = createStore({
      modules: {
        endpoint: {
          namespaced: true,
          actions: {
            pushWPMenusList
          }
        }
      }
    })
    createWrapper({ store, })
    await flushPromises()

    expect( pushWPMenusList ).toBeCalled()
  })

  test('should set fetched Be & WP fonts list to the state', async () => {
    const setFontsList = jest.fn(() => Promise.resolve())
    const store = createStore({
      modules: {
        endpoint: {
          namespaced: true,
          actions: {
            setFontsList
          }
        }
      }
    })
    createWrapper({ store, })
    await flushPromises()

    expect( setFontsList ).toBeCalled()
  })

  test('should settle fetched Header Builder state by ajax', async () => {
    const getStateFromWP = jest.fn(() => Promise.resolve())
    const store = createStore({
      modules: {
        endpoint: {
          namespaced: true,
          actions: {
            getStateFromWP
          }
        }
      }
    })
    createWrapper({ store, })
    await flushPromises()

    expect( getStateFromWP ).toBeCalled()
  })

  test('should set `desktop` device on load', async () => {
    const changeDevice = jest.fn(() => Promise.resolve())
    const store = createStore({
      modules: {
        ui: {
          actions: {
            changeDevice,
          }
        }
      }
    })
    createWrapper({ store, })
    await flushPromises()

    expect( changeDevice ).toBeCalledWith( expect.anything(), { device: 'desktop' }, void 0 )
  })

  test('should open beta info modal when App.vue has mounted', async () => {
    const showLaunchModal = jest.fn()
    const store = createStore({
      modules: {
        modals: {
          actions: {
            showLaunchModal,
          }
        }
      }
    })
    const mocks = {
      $modal: jest.fn()
    }

    createWrapper({ store, mocks, })
    await flushPromises()

    expect(showLaunchModal).toBeCalledWith(
      expect.anything(),
      { $modal: mocks.$modal },
      void 0
    )
  })

})