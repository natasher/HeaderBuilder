import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex          from 'vuex'
import flushPromises from 'flush-promises'
import merge         from 'lodash.merge'
import GridStatus    from '../../../../../src/components/Grid/Segments/GridStatus.vue'

const localVue = createLocalVue()
localVue.use( Vuex )

function createStore(overrides) {
  const defaultStoreConfig = {
    modules: {
      general: {
        namespaced: true,
        state: {
          currentView: 'desktop',
        }
      },
      ui: {
        namespaced: true,
        state: {
          stickyFlag: 'sticky',
        },
        actions: {
          setGridStatus: jest.fn(),
          handleAutoClick: jest.fn(),
        },
        getters: {
          getGridStatus: jest.fn(() => { return 'custom' })
        },
      }
    }
  }

  return new Vuex.Store( merge( defaultStoreConfig, overrides ))
}

function createWrapper(overrides) {
  const defaultMountingOptions = {
    localVue,
    store: createStore(),
  }

  return shallowMount( GridStatus, merge( defaultMountingOptions, overrides ))
}

describe('GridStatus.vue', () => {

  test('should match snapshot if grid status is `custom` and header is `sticky`, device `mobile`', () => {
    const store = createStore({
      modules: {
        general: {
          state: {
            currentView: 'mobile',
          }
        },
        ui: {
          state: {
            stickyFlag: 'sticky',
          },
          getters: {
            getGridStatus: jest.fn(() => { return 'custom' })
          },
        }
      }
    })
    const wrapper = createWrapper({ store, })

    expect( wrapper.element ).toMatchSnapshot()
  })

  test('should show `Off` and `Custom` tab if header is `sticky`', () => {
    const store = createStore({
      modules: {
        general: {
          state: {
            currentView: 'tablet',
          }
        },
        ui: {
          state: {
            stickyFlag: 'sticky',
          },
          getters: {
            getGridStatus: jest.fn(() => { return 'off' })
          },
        }
      }
    })
    const wrapper = createWrapper({ store, })
    const tabs = wrapper.findAll('li')

    expect( tabs.at(0).isVisible() ).toBe( true )
    expect( tabs.at(0).classes() ).toContain( 'active' )

    expect( tabs.at(1).isVisible() ).toBe( true )
    expect( tabs.at(1).classes() ).not.toContain( 'active' )

    expect( tabs.at(2).isVisible() ).toBe( true )
    expect( tabs.at(2).classes() ).not.toContain( 'active' )
  })

  test('should NOT show `Off` and show `Custom` tab if header is different then `sticky`', () => {
    const store = createStore({
      modules: {
        general: {
          state: {
            currentView: 'tablet',
          }
        },
        ui: {
          state: {
            stickyFlag: 'default',
          },
          getters: {
            getGridStatus: jest.fn(() => { return 'custom' })
          },
        }
      }
    })
    const wrapper = createWrapper({ store, })
    const tabs = wrapper.findAll('li')

    expect( tabs.at(0).isVisible() ).toBe( false )
    expect( tabs.at(0).classes() ).not.toContain( 'active' )

    expect( tabs.at(1).isVisible() ).toBe( true )
    expect( tabs.at(1).classes() ).toContain( 'active' )

    expect( tabs.at(2).isVisible() ).toBe( true )
    expect( tabs.at(2).classes() ).not.toContain( 'active' )
  })

  test('should NOT show `Auto` tab if header is `desktop` and `default`', () => {
    const store = createStore({
      modules: {
        general: {
          state: {
            currentView: 'desktop',
          }
        },
        ui: {
          state: {
            stickyFlag: 'default',
          },
          getters: {
            getGridStatus: jest.fn(() => { return 'custom' })
          },
        }
      }
    })
    const wrapper = createWrapper({ store, })
    const tabs = wrapper.findAll('li')

    expect( tabs.at(0).isVisible() ).toBe( false )
    expect( tabs.at(0).classes() ).not.toContain( 'active' )

    expect( tabs.at(1).isVisible() ).toBe( true )
    expect( tabs.at(1).classes() ).toContain( 'active' )

    expect( tabs.at(2).isVisible() ).toBe( false )
    expect( tabs.at(2).classes() ).not.toContain( 'active' )
  })

  test('should show `Auto` if header is different then `desktop` and `default`', () => {
    const store = createStore({
      modules: {
        general: {
          state: {
            currentView: 'tablet',
          }
        },
        ui: {
          state: {
            stickyFlag: 'default',
          },
          getters: {
            getGridStatus: jest.fn(() => { return 'custom' })
          },
        }
      }
    })
    const wrapper = createWrapper({ store, })
    const tabs = wrapper.findAll('li')

    expect( tabs.at(0).isVisible() ).toBe( false )
    expect( tabs.at(0).classes() ).not.toContain( 'active' )

    expect( tabs.at(1).isVisible() ).toBe( true )
    expect( tabs.at(1).classes() ).toContain( 'active' )

    expect( tabs.at(2).isVisible() ).toBe( true )
    expect( tabs.at(2).classes() ).not.toContain( 'active' )
  })

  test('should change grid status to `off` if `Off` tab is clicked', async () => {
    const setGridStatus = jest.fn()
    const store = createStore({
      modules: {
        ui: {
          actions: {
            setGridStatus,
          },
        }
      }
    })
    const wrapper = createWrapper({ store, })
    const offTab  = wrapper.findAll('li').at( 0 )

    offTab.trigger( 'click' )
    await flushPromises()

    expect(setGridStatus).toBeCalledWith(
      expect.anything(),
      { status: 'off' },
      void 0
    )
  })

  test('should change grid status to `off` if `Off` tab is clicked', async () => {
    const handleAutoClick = jest.fn()
    const $modal = jest.fn()
    const store = createStore({
      modules: {
        ui: {
          actions: {
            handleAutoClick,
          },
        }
      }
    })
    const wrapper = createWrapper({
      store,
      mocks: {
        $modal,
      }
    })
    const autoTab = wrapper.findAll('li').at( 2 )

    autoTab.trigger( 'click' )
    await flushPromises()

    expect(handleAutoClick).toBeCalledWith(
      expect.anything(),
      { $modal: $modal, },
      void 0
    )
  })
})