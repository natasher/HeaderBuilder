import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex               from       'vuex'
import merge              from       'lodash.merge'
import ViewWithResolution from       '../../../../../src/components/Grid/Segments/ViewWithResolution.vue'

const localVue = createLocalVue()
localVue.use( Vuex )

const brk  = '= 666'
const view = 'testView'

function createStore(overrides) {
  const defaultStoreOptions = {
    modules: {
      general: {
        namespaced: true,
        state: {
          currentView: view
        }
      },
      ui: {
        namespaced: true,
        state: {
          currentBreakpoint: brk
        },
      },
    },
  }

  return new Vuex.Store( merge(defaultStoreOptions, overrides))
}

function createWrapper(overrides) {
  const defaultMountingOptions = {
    localVue,
    store: createStore(),
  }

  return shallowMount( ViewWithResolution, merge(defaultMountingOptions, overrides))
}

describe('ViewWithResolution.vue', () => {

  test('should match snapshot', () => {
    const wrapper = createWrapper()

    expect( wrapper.element ).toMatchSnapshot()
  })

  test('should render capitalized view name', () => {
    const wrapper = createWrapper()

    expect( wrapper.text() ).toContain('TestView')
  })

  test('should render breakpoint', () => {
    const wrapper = createWrapper()

    expect( wrapper.text() ).toContain( brk )
  })

})