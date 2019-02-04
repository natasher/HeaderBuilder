import { shallowMount, createLocalVue } from '@vue/test-utils'
import { infoMobileInactiveItems } from '../../../../src/store/dialogs'
import Vuex            from 'vuex'
import flushPromises   from 'flush-promises'
import merge           from 'lodash.merge'
import NavSelectDevice from '../../../../src/components/BaseHeader/NavSelectDevice.vue'

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
      ui: {
        namespaced: true,
        getters: {
          getGridStatus: jest.fn().mockReturnValue('custom')
        },
        actions: {
          changeDevice: jest.fn()
        }
      },
      grid: {
        namespaced: true,
        actions: {
          clone: jest.fn()
        }
      },
      inactiveItems: {
        namespaced: true,
        actions: {
          clear: jest.fn()
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
    mocks: {
      $modal: {
        show: jest.fn()
      }
    }
  }

  return shallowMount( NavSelectDevice, merge( defaultMountingOptions, overrides ))
}

describe('NavSelectDevice.vue', () => {

  describe('snapshots:', () => {

    test('should match if `desktop` device is selected', () => {
      const wrapper = createWrapper()

      expect( wrapper.element ).toMatchSnapshot()
    })

    test('should match if `tablet` device is selected', () => {
      const store = createStore({
        modules: {
          general: {
            state: {
              currentView: 'tablet'
            }
          },
        }
      })
      const wrapper = createWrapper({ store, })

      expect( wrapper.element ).toMatchSnapshot()
    })

    test('should match if `mobile` device is selected', () => {
      const store = createStore({
        modules: {
          general: {
            state: {
              currentView: 'mobile'
            }
          },
        }
      })
      const wrapper = createWrapper({ store, })

      expect( wrapper.element ).toMatchSnapshot()
    })

  })

  test('should change device to `desktop` if desktop icon is clicked', async () => {
    const changeDevice = jest.fn()
    const store = createStore({
      modules: {
        ui: {
          actions: {
            changeDevice,
          }
        },
      }
    })
    const wrapper = createWrapper({ store, })

    const device  = 'desktop'
    wrapper.find(`a[data-type="${ device }"`).trigger('click')
    await flushPromises()

    expect( changeDevice ).toBeCalledWith( expect.anything(), { device }, void 0 )
  })

  test('should change device to `tablet` if tablet icon is clicked', async () => {
    const changeDevice = jest.fn()
    const store = createStore({
      modules: {
        ui: {
          actions: {
            changeDevice,
          }
        },
      }
    })
    const wrapper = createWrapper({ store, })

    const device  = 'tablet'
    wrapper.find(`a[data-type="${ device }"`).trigger('click')
    await flushPromises()

    expect( changeDevice ).toBeCalledWith( expect.anything(), { device }, void 0 )
  })

  test('should NOT clone desktop grid if tablet grid is NOT set to `auto`', async () => {
    const clone = jest.fn()
    const store = createStore({
      modules: {
        ui: {
          getters: {
            getGridStatus: jest.fn().mockReturnValue('custom')
          },
        },
        grid: {
          actions: {
            clone
          }
        },
      }
    })
    const wrapper = createWrapper({ store, })

    const device  = 'tablet'
    wrapper.find(`a[data-type="${ device }"`).trigger('click')
    await flushPromises()

    expect( clone ).not.toBeCalled()
  })

  test('should clone desktop grid if tablet grid is set to `auto`', async () => {
    const clone = jest.fn()
    const store = createStore({
      modules: {
        ui: {
          getters: {
            getGridStatus: jest.fn().mockReturnValue('auto')
          },
        },
        grid: {
          actions: {
            clone
          }
        },
      }
    })
    const wrapper = createWrapper({ store, })

    const device  = 'tablet'
    wrapper.find(`a[data-type="${ device }"`).trigger('click')
    await flushPromises()

    expect(clone).toBeCalledWith(expect.anything(), { from: 'DesktopModule' }, void 0)
  })

  test('should change device to `mobile` if mobile icon is clicked', async () => {
    const changeDevice = jest.fn()
    const store = createStore({
      modules: {
        ui: {
          actions: {
            changeDevice,
          }
        },
      }
    })
    const wrapper = createWrapper({ store, })

    const device  = 'mobile'
    wrapper.find(`a[data-type="${ device }"`).trigger('click')
    await flushPromises()

    expect( changeDevice ).toBeCalledWith( expect.anything(), { device }, void 0 )
  })

  test('should NOT clone desktop grid if mobile grid is NOT set to `auto`', async () => {
    const clone = jest.fn()
    const store = createStore({
      modules: {
        ui: {
          getters: {
            getGridStatus: jest.fn().mockReturnValue('custom')
          },
        },
        grid: {
          actions: {
            clone
          }
        },
      }
    })
    const wrapper = createWrapper({ store, })

    const device  = 'mobile'
    wrapper.find(`a[data-type="${ device }"`).trigger('click')
    await flushPromises()

    expect( clone ).not.toBeCalled()
  })

  test('should clear inactive items then clone desktop grid if mobile grid is set to `auto`', async () => {
    const clone = jest.fn()
    const clear = jest.fn()
    const store = createStore({
      modules: {
        ui: {
          getters: {
            getGridStatus: jest.fn().mockReturnValue('auto')
          },
        },
        grid: {
          actions: {
            clone,
          }
        },
        inactiveItems: {
          actions: {
            clear,
          }
        }
      }
    })
    const wrapper = createWrapper({ store, })

    const device  = 'mobile'
    wrapper.find(`a[data-type="${ device }"`).trigger('click')
    await flushPromises()

    expect(clear).toBeCalled()
    expect(clone).toBeCalledWith(expect.anything(), { from: 'DesktopModule' }, void 0)
  })

  test('should open modal with info about inactive items when on `mobile`', async () => {
    const store = createStore({
      modules: {
        ui: {
          getters: {
            getGridStatus: jest.fn().mockReturnValue('auto')
          },
        },
      }
    })
    const wrapper = createWrapper({ store, })

    const device  = 'mobile'
    wrapper.find(`a[data-type="${ device }"`).trigger('click')
    await flushPromises()

    expect(wrapper.vm.$modal.show).toBeCalledWith(expect.anything(), {
      title       : 'Info',
      text        : infoMobileInactiveItems,
      closeOnClick: true
    })
  })

})