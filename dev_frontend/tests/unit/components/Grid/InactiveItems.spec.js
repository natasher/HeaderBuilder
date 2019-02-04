import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex          from 'vuex'
import merge         from 'lodash.merge'
import draggable     from 'vuedraggable'
import InactiveItems from '../../../../src/components/Grid/InactiveItems.vue'

const localVue = createLocalVue()
localVue.use( Vuex )

const testData = [
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
          getGridStatus: jest.fn().mockReturnValue( 'custom' ),
        },
      },
      inactiveItems: {
        namespaced: true,
        getters: {
          getInactiveItems: jest.fn().mockReturnValue( [] )
        },
        actions: {
          removeItem: jest.fn(),
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
      draggable,
    }
  }

  return shallowMount( InactiveItems, merge( defaultMountingOptions, overrides ) )
}

describe('InactiveItems.vue', () => {

  describe('snapshots:', () => {

    test('should match if no item is inactive', () => {
      const wrapper = createWrapper()

      expect( wrapper.element ).toMatchSnapshot()
    })

    test('should match if 3 items is inactive', () => {
      const store = createStore({
        modules: {
          inactiveItems: {
            getters: {
              getInactiveItems: jest.fn().mockReturnValue( testData )
            }
          }
        }
      })
      const wrapper = createWrapper({ store, })

      expect( wrapper.element ).toMatchSnapshot()
    })

  })

})
// the remove item test cant be done in unit test due to draggable library