import { shallowMount, createLocalVue } from '@vue/test-utils'
import merge from 'lodash.merge'
import Vuex  from 'vuex'
import Grid  from '../../../../src/components/Grid/Grid.vue'

const localVue = createLocalVue()
localVue.use( Vuex )

function createStore(overrides) {
  const defaultStoreConfig = {
    modules: {
      ui: {
        namespaced: true,
        getters: {
          getGridStatus: jest.fn().mockReturnValue( 'custom' )
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
  }

  return shallowMount( Grid, merge( defaultMountingOptions, overrides ))
}

describe('Grid.vue', () => {

  describe('snapshots:', () => {

    test('should match snapshot if grid status is other then `auto`', () => {
      const wrapper = createWrapper()

      expect( wrapper.element ).toMatchSnapshot()
    })

    test('should match snapshot if grid status is `auto`', () => {
      const store = createStore({
        modules: {
          ui: {
            getters: {
              getGridStatus: jest.fn().mockReturnValue( 'auto' )
            }
          }
        }
      })
      const wrapper = createWrapper({ store, })

      expect( wrapper.element ).toMatchSnapshot()
    })
  })

})