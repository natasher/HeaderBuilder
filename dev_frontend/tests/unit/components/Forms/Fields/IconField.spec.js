import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex          from 'vuex'
import flushPromises from 'flush-promises'
import merge         from 'lodash.merge'
import IconsList     from '../../../../../src/components/Forms/Fields/IconsList.js'
import IconField     from '../../../../../src/components/Forms/Fields/IconField.vue'

const localVue = createLocalVue()
localVue.use( Vuex )

function createStore(overrides) {
  const defaultStoreConfig = {
    modules: {
      items: {
        namespaced: true,
        actions: {
          setCurrentFieldValue: jest.fn()
        }
      },
      fields: {
        namespaced:true,
        getters: {
          getCurrentFieldValue: jest.fn().mockReturnValue(() => { return 'some value' })
        },
      },
    },
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

  return shallowMount( IconField, merge( defaultMountingOptions, overrides ))
}

describe('snapshots:', () => {

  test('should match if no icon is selected', () => {
    const wrapper = createWrapper()

    expect( wrapper.element ).toMatchSnapshot()
  })

  test('should match if icon is selected', async () => {
    const getCurrentFieldValue = jest.fn().mockReturnValue(() => { return 'icon-lego' })
    const store = createStore({
      modules: {
        fields: {
          getters: {
            getCurrentFieldValue,
          }
        }
      }
    })
    const wrapper = createWrapper({ store, })
    await flushPromises()

    expect( wrapper.element ).toMatchSnapshot()
  })

})

test('should allow the user to type icon name into field', async () => {
  const setCurrentFieldValue = jest.fn()
  const store = createStore({
    modules: {
      items: {
        actions: {
          setCurrentFieldValue
        }
      }
    }
  })
  const wrapper = createWrapper({ store, })
  wrapper.find('input[type="text"]').trigger('input')
  await flushPromises()

  expect(setCurrentFieldValue).toBeCalledWith(
    expect.anything(),
    { name: 'testField', value: expect.anything() },
    void 0
  )
})

test('should remove icon name if `Remove` button is clicked', async () => {
  const setCurrentFieldValue = jest.fn()
  const store = createStore({
    modules: {
      items: {
        actions: {
          setCurrentFieldValue
        }
      }
    }
  })
  const wrapper = createWrapper({ store, })
  wrapper.find('button.remove').trigger('click')
  await flushPromises()

  expect(setCurrentFieldValue).toBeCalledWith(
    expect.anything(),
    { name: 'testField', value: '' },
    void 0
  )
})

test('should display exact count of icons as provided', async () => {
  const wrapper = createWrapper()
  const icons   = wrapper.findAll('.mfn-icon')

  expect( icons.length ).toBe( IconsList.length )
})

test('should set selected icon when the desired one is clicked', async () => {
  const setIcon = jest.fn()
  const wrapper = createWrapper({
    methods: {
      setIcon
    }
  })
  const iconName = 'icon-lego'
  const icon      = wrapper.find(`.${ iconName }`)

  icon.trigger('click')
  await flushPromises()

  expect(setIcon).toBeCalled()
})

test('should set `.active` class on selected icon', async () => {
  const iconName = 'icon-lego'
  const getCurrentFieldValue = jest.fn().mockReturnValue(() => { return iconName })
  const store = createStore({
    modules: {
      fields: {
        getters: {
          getCurrentFieldValue,
        }
      }
    }
  })
  const wrapper = createWrapper({ store, })
  await flushPromises()

  const icon = wrapper.find('.active')

  expect( icon.attributes()[ 'data-rel' ] ).toBe( iconName )
})