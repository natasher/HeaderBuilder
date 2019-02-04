import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex          from 'vuex'
import flushPromises from 'flush-promises'
import merge         from 'lodash.merge'
import BaseHeader    from '../../../../src/components/BaseHeader/BaseHeader.vue'

const localVue = createLocalVue()
localVue.use( Vuex )

function createStore(overrides) {
  const defaultStoreConfig = {
    modules: {
      endpoint: {
        namespaced: true,
        actions: {
          postDataToWordpress: jest.fn(() => Promise.resolve()),
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
      $modal: jest.fn()
    },
  }

  return shallowMount( BaseHeader, merge( defaultMountingOptions, overrides ) )
}

describe('BaseHeader.vue', () => {

  test('should match snapshot', () => {
    const wrapper = createWrapper()

    expect( wrapper.element ).toMatchSnapshot()
  })

  test('should dispatch `postDataToWordpress` action when `Save` button is clicked', async () => {
    const store   = createStore()
    const wrapper = createWrapper({ store, })

    const action = jest.spyOn( store._actions[ 'endpoint/postDataToWordpress' ], [0])
    wrapper.find('#header-builder-submit').trigger('click')
    await flushPromises()

    expect( action ).toBeCalledWith({ $modal: wrapper.vm.$modal })
  })

})