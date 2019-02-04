import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex          from 'vuex'
import merge         from 'lodash.merge'
import draggable     from 'vuedraggable'
import GridRowCell   from '../../../../../src/components/Grid/Segments/GridRowCell.vue'

const localVue = createLocalVue()
localVue.use( Vuex )

const testItems = [
                {
                  "name": "social",
                  "uuid": "toWXiE1dIS",
                },
                {
                  "name": "menuIcon",
                  "uuid": "alBWLJBYfR"
                },
                {
                  "name": "button",
                  "uuid": "AJDV7xJMAN"
                }
              ]

function createStore(overrides) {
  const defaultStoreConfig = {
    modules: {
      ui: {
        namespaced: true,
        getters: {
          getGridStatus: jest.fn(() => { return 'custom' }),
          getLayoutPosition: jest.fn(() => { return 'top' }),
        }
      },
      cell: {
        namespaced: true,
        actions: {
          onChange: jest.fn()
        }
      },
      items: {
        namespaced: true,
        getters: {
          getActionBarItemsCenter: jest.fn(() => { return [] })
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
    propsData: {
      row    : 'actionBar',
      cellPos: 'center'
    },
    stubs: {
      draggable,
    }
  }

  return shallowMount( GridRowCell, merge( defaultMountingOptions, overrides ))
}

describe('GridRowCell.vue', () => {

  describe('snapshots:', () => {

    test('should match without items', () => {
      const wrapper = createWrapper()

      expect( wrapper.element ).toMatchSnapshot()
    })

    test('should match with three items', () => {
      const getActionBarItemsCenter = jest.fn(() => { return testItems })
      const store = createStore({
        modules: {
          items: {
            getters: {
              getActionBarItemsCenter,
            }
          }
        }
      })
      const wrapper = createWrapper({ store, })

      expect( wrapper.element ).toMatchSnapshot()
    })

    test('should match with three items and grid status is `off`', () => {
      const getActionBarItemsCenter = jest.fn(() => { return testItems })
      const store = createStore({
        modules: {
          ui: {
            getters: {
              getGridStatus: jest.fn(() => { return 'off' }),
            },
          },
          items: {
            getters: {
              getActionBarItemsCenter,
            }
          }
        }
      })
      const wrapper = createWrapper({ store, })

      expect( wrapper.element ).toMatchSnapshot()
    })

  })

  describe('Dynamically created attributes (testable)', () => {

    test('should properly render draggable classes', () => {
      const cellPos = 'all'
      const wrapper = createWrapper({
        propsData: {
          cellPos,
        }
      })

      expect( wrapper.classes() ).toContain(`hbc-${ cellPos }`)
    })

    test('should properly set data-title on component', () => {
      const cellPos = 'all'
      const wrapper = createWrapper({
        propsData: {
          cellPos,
        }
      })

      expect( wrapper.attributes()[ 'data-title' ] ).toBe( `align ${ cellPos }` )
    })

  })

  describe('Rendered items', () => {

    test('should render proper count of items', () => {
      const getActionBarItemsCenter = jest.fn(() => { return testItems })
      const store = createStore({
        modules: {
          items: {
            getters: {
              getActionBarItemsCenter,
            }
          }
        }
      })
      const wrapper = createWrapper({ store, })
      const items = wrapper.findAll('baseitem-stub')

      expect( items.length ).toBe( testItems.length )
    })

    test('should pass row attribute to base items', () => {
      expect.assertions( 3 )

      const row = 'actionBar'
      const getActionBarItemsCenter = jest.fn(() => { return testItems })
      const store = createStore({
        modules: {
          items: {
            getters: {
              getActionBarItemsCenter,
            }
          }
        }
      })
      const wrapper = createWrapper({
        store,
        propsData: {
          row,
        }
      })
      const items = wrapper.findAll('baseitem-stub')

      for (let i = 0; i < testItems.length; i++) {
        expect( items.at( i ).attributes().row ).toBe( row )
      }
    })

    test('should pass cell position attribute to base items', () => {
      expect.assertions( 3 )

      const cellPos = 'center'
      const getActionBarItemsCenter = jest.fn(() => { return testItems })
      const store = createStore({
        modules: {
          items: {
            getters: {
              getActionBarItemsCenter,
            }
          }
        }
      })
      const wrapper = createWrapper({
        store,
        propsData: {
          cellPos,
        }
      })
      const items = wrapper.findAll('baseitem-stub')

      for (let i = 0; i < testItems.length; i++) {
        expect( items.at( i ).attributes().cellpos ).toBe( cellPos )
      }
    })

    test('should pass item object to base items', () => {
      expect.assertions( 3 )

      const getActionBarItemsCenter = jest.fn(() => { return testItems })
      const store = createStore({
        modules: {
          items: {
            getters: {
              getActionBarItemsCenter,
            }
          }
        }
      })
      const wrapper = createWrapper({ store, })
      const items = wrapper.findAll('baseitem-stub')

      for (let i = 0; i < testItems.length; i++) {
        expect( items.at( i ).attributes().item ).toBe( "[object Object]" )
      }
    })

    test('should pass item index in cell', () => {
      expect.assertions( 3 )

      const getActionBarItemsCenter = jest.fn(() => { return testItems })
      const store = createStore({
        modules: {
          items: {
            getters: {
              getActionBarItemsCenter,
            }
          }
        }
      })
      const wrapper = createWrapper({ store, })
      const items = wrapper.findAll('baseitem-stub')

      for (let i = 0; i < testItems.length; i++) {
        expect( items.at( i ).attributes().cellid ).toBe( `${ i }` )
      }
    })

    test('should put `disabled` class when grid status is `off`', () => {
      const getActionBarItemsCenter = jest.fn(() => { return testItems })

      const store = createStore({
        modules: {
          ui: {
            getters: {
              getGridStatus: jest.fn(() => { return 'off' }),
            },
          },
          items: {
            getters: {
              getActionBarItemsCenter,
            }
          }
        }
      })
      const wrapper = createWrapper({ store, })
      const items = wrapper.findAll('baseitem-stub')

      for (let i = 0; i < testItems.length; i++) {
        expect( items.at( i ).classes() ).toContain( 'disabled' )
      }
    })

  })

})