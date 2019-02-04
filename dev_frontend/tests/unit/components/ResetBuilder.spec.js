import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex          from 'vuex'
import flushPromises from 'flush-promises'
import merge         from 'lodash.merge'
import ResetBuilder  from '../../../src/components/ResetBuilder.vue'

const localVue = createLocalVue()
localVue.use( Vuex )

function createStore(overrides) {
  const defaultStoreConfig = {
    modules: {
      devices: {
        namespaced: true,
        actions: {
          resetBuilder: jest.fn(),
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
    mocks: {
      $modal: jest.fn()
    },
    store: createStore()
  }

  return shallowMount( ResetBuilder, merge( defaultMountingOptions, overrides ))
}

describe('ResetBuilder.vue', () => {

  test('should match snapshot', () => {
    const wrapper = createWrapper()

    expect( wrapper.element ).toMatchSnapshot()
  })

  test('should invoke `resetBuilder` action when clicked', async () => {
    const resetBuilder = jest.fn(() => Promise.resolve())
    const store = createStore({
      modules: {
        devices: {
          actions: {
            resetBuilder,
          }
        }
      }
    })
    const wrapper = createWrapper({ store, })

    wrapper.trigger('click')
    await flushPromises()

    expect( resetBuilder ).toBeCalled()
  })

})