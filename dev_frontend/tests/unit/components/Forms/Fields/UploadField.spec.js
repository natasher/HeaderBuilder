import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex          from 'vuex'
import flushPromises from 'flush-promises'
import merge         from 'lodash.merge'
import UploadField   from '../../../../../src/components/Forms/Fields/UploadField.vue'

const localVue = createLocalVue()
localVue.use( Vuex )

const imgUrl = 'https://lorem.test/shitty.png'

function createStore(overrides) {
  const defaultStoreConfig = {
    modules: {
      fields: {
        namespaced: true,
        actions: {
          setModalFieldValue: jest.fn()
        },
        getters: {
          getUploadFieldValue: jest.fn().mockReturnValue(
            jest.fn().mockReturnValue( '' )
          ),
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
      fieldName: 'Test Field',
      wpId     : 'testField',
    },
  }

  return shallowMount( UploadField, merge( defaultMountingOptions, overrides ))
}

describe('TextField.vue', () => {

  describe('snapshots:', () => {

    test('should match snapshot if field does NOT contain image url', async () => {
      const wrapper = createWrapper()
      await flushPromises()

      expect( wrapper.element ).toMatchSnapshot()
    })

    test('should match snapshot if field contain image url', () => {
      const innerGetter         = jest.fn().mockReturnValue( imgUrl )
      const getUploadFieldValue = jest.fn().mockReturnValue( innerGetter )
      const store = createStore({
        modules: {
          fields: {
            getters: {
              getUploadFieldValue,
            }
          }
        }
      })
      const wrapper = createWrapper({ store, })

      expect( wrapper.element ).toMatchSnapshot()
    })

  })

  // test('should display `Add Image` button and hide `Remove` button if no image URL provided')
  // test('should display `Remove` button and hide `Add Image` button if image URL is provided')
  // test('should allow user to type image URL - external image scenario')
  // test('should open Wordpress media when the User click `Add Image`')
  // test('should remove image URL if the User clicks `Remove` button')
  // test('should display <img /> if image URL end with gif, jpg, jpeg, tiff, png')

})