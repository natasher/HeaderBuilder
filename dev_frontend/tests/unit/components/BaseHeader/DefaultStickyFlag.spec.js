import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex              from 'vuex'
import flushPromises     from 'flush-promises'
import merge             from 'lodash.merge'
import DefaultStickyFlag from '../../../../src/components/BaseHeader/DefaultStickyTabs.vue'

const localVue = createLocalVue()
localVue.use( Vuex )

function createStore(overrides) {
  const defaultStoreConfig = {
    modules: {
      general: {
        namespaced: true,
        state: {
          currentStoreModule: 'DesktopModule'
        },
      },
      ui: {
        namespaced: true,
        state: {
          stickyFlag: 'default',
        },
        getters: {
          getLayoutPosition: jest.fn().mockReturnValue('top'),
        },
        actions: {
          setStickyFlag: jest.fn(),
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
  }

  return shallowMount( DefaultStickyFlag, merge( defaultMountingOptions, overrides ) )
}

describe('DefaultStickyFlag.vue', () => {

  describe('snapshots:', () => {

    test('should match if both button are visible', async () => {
      const store = createStore({
        modules: {
          ui: {
            namespaced: true,
            state: {
              stickyFlag: 'sticky'
            }
          },
        }
      })
      const wrapper = createWrapper({ store, })
      await flushPromises()

      expect( wrapper.element ).toMatchSnapshot()
    })

    test('should match if only default button is visible', async () => {
      const store = createStore({
        modules: {
          ui: {
            namespaced: true,
            getters: {
              getLayoutPosition: jest.fn().mockReturnValue('left'),
            },
          },
        }
      })
      const wrapper = createWrapper({ store, })
      await flushPromises()

      expect( wrapper.element ).toMatchSnapshot()
    })

  })

  describe('`default` and `sticky` button visibility:', () => {

    test('should display both buttons when grid for `desktop` is on and when layout is `top`', async () => {
      const store = createStore({
        modules: {
          general: {
            state: {
              currentStoreModule: 'DesktopModule'
            },
          },
          ui: {
            getters: {
              getLayoutPosition: jest.fn().mockReturnValue('top'),
            },
          },
        }
      })
      const wrapper = createWrapper({ store, })
      await flushPromises()

      expect( wrapper.find('a[data-type="default"]').isVisible() ).toBe( true )
      expect( wrapper.find('a[data-type="sticky"]').isVisible() ).toBe( true )
      expect( wrapper.findAll('li').length ).toBe( 2 )
    })

    test('should display both buttons when grid for `desktop` is on and when layout is `bottom`', async () => {
      const store = createStore({
        modules: {
          general: {
            state: {
              currentStoreModule: 'DesktopModule'
            },
          },
          ui: {
            getters: {
              getLayoutPosition: jest.fn().mockReturnValue('bottom'),
            },
          },
        }
      })
      const wrapper = createWrapper({ store, })
      await flushPromises()

      expect( wrapper.find('a[data-type="default"]').isVisible() ).toBe( true )
      expect( wrapper.find('a[data-type="sticky"]').isVisible() ).toBe( true )
    })

    test('should display only `default` button when grid for `desktop` is on and when layout is `left`', async () => {
      const store = createStore({
        modules: {
          general: {
            state: {
              currentStoreModule: 'DesktopModule'
            },
          },
          ui: {
            getters: {
              getLayoutPosition: jest.fn().mockReturnValue('left'),
            },
          },
        }
      })
      const wrapper = createWrapper({ store, })
      await flushPromises()

      expect( wrapper.find('a[data-type="default"]').isVisible() ).toBe( true )
      expect( wrapper.findAll('li').length ).toBe( 1 )
    })

    test('should display only `default` button when grid for `desktop` is on and when layout is `right`', async () => {
      const store = createStore({
        modules: {
          general: {
            state: {
              currentStoreModule: 'DesktopModule'
            },
          },
          ui: {
            getters: {
              getLayoutPosition: jest.fn().mockReturnValue('right'),
            },
          },
        }
      })
      const wrapper = createWrapper({ store, })
      await flushPromises()

      expect( wrapper.find('a[data-type="default"]').isVisible() ).toBe( true )
      expect( wrapper.findAll('li').length ).toBe( 1 )
    })

    test('should display both buttons when grid for `desktopSticky` is on', async () => {
      const store = createStore({
        modules: {
          general: {
            state: {
              currentStoreModule: 'DesktopStickyModule'
            },
          },
        }
      })
      const wrapper = createWrapper({ store, })
      await flushPromises()

      expect( wrapper.find('a[data-type="default"]').isVisible() ).toBe( true )
      expect( wrapper.find('a[data-type="sticky"]').isVisible() ).toBe( true )
      expect( wrapper.findAll('li').length ).toBe( 2 )
    })

    test('should display both buttons when grid for `tablet` is on', async () => {
      const store = createStore({
        modules: {
          general: {
            state: {
              currentStoreModule: 'TabletModule'
            },
          },
        }
      })
      const wrapper = createWrapper({ store, })
      await flushPromises()

      expect( wrapper.find('a[data-type="default"]').isVisible() ).toBe( true )
      expect( wrapper.find('a[data-type="sticky"]').isVisible() ).toBe( true )
      expect( wrapper.findAll('li').length ).toBe( 2 )
    })

    test('should display both buttons when grid for `tabletSticky` is on', async () => {
      const store = createStore({
        modules: {
          general: {
            state: {
              currentStoreModule: 'TabletStickyModule'
            },
          },
        }
      })
      const wrapper = createWrapper({ store, })
      await flushPromises()

      expect( wrapper.find('a[data-type="default"]').isVisible() ).toBe( true )
      expect( wrapper.find('a[data-type="sticky"]').isVisible() ).toBe( true )
      expect( wrapper.findAll('li').length ).toBe( 2 )
    })

    test('should display both buttons when grid for `mobile` is on', async () => {
      const store = createStore({
        modules: {
          general: {
            state: {
              currentStoreModule: 'MobileModule'
            },
          },
        }
      })
      const wrapper = createWrapper({ store, })
      await flushPromises()

      expect( wrapper.find('a[data-type="default"]').isVisible() ).toBe( true )
      expect( wrapper.find('a[data-type="sticky"]').isVisible() ).toBe( true )
      expect( wrapper.findAll('li').length ).toBe( 2 )
    })

    test('should display both buttons when grid for `desktopSticky` is on', async () => {
      const store = createStore({
        modules: {
          general: {
            state: {
              currentStoreModule: 'MobileStickyModule'
            },
          },
        }
      })
      const wrapper = createWrapper({ store, })
      await flushPromises()

      expect( wrapper.find('a[data-type="default"]').isVisible() ).toBe( true )
      expect( wrapper.find('a[data-type="sticky"]').isVisible() ).toBe( true )
      expect( wrapper.findAll('li').length ).toBe( 2 )
    })

  })

  describe('dynamic behaviour:', () => {

    test('should add `.active` class to `default` button when when flag is set to default', async () => {
      const store = createStore({
        modules: {
          ui: {
            state: {
              stickyFlag: 'default',
            },
          },
        }
      })
      const wrapper = createWrapper({ store, })
      await flushPromises()

      expect( wrapper.findAll('li').at(0).classes() ).toContain( 'active' )
    })

    test('should add `.active` class to `sticky` button when when flag is set to sticky', async () => {
      const store = createStore({
        modules: {
          ui: {
            state: {
              stickyFlag: 'sticky',
            },
          },
        }
      })
      const wrapper = createWrapper({ store, })
      await flushPromises()

      expect( wrapper.findAll('li').at(1).classes() ).toContain( 'active' )
    })

    test('should set flag to default if the `default` button is clicked', async () => {
      const setStickyFlag = jest.fn()
      const store = createStore({
        modules: {
          ui: {
            state: {
              stickyFlag: 'sticky',
            },
            actions: {
              setStickyFlag,
            },
          },
        }
      })
      const wrapper = createWrapper({ store, })
      const defaultBtn = wrapper.findAll('li').at(0)

      defaultBtn.trigger('click')
      await flushPromises()

      expect( setStickyFlag ).toBeCalledWith( expect.anything(), { type: 'default' }, void 0 )
    })

  })

})
