import { shallowMount, createLocalVue } from '@vue/test-utils'
import flushPromises from 'flush-promises'
import merge from 'lodash.merge'
import BaseSwitch from '../../../../src/components/BaseGeneric/BaseSwitch.vue'

const localVue = createLocalVue()

function createWrapper(overrides) {
  const defaultMountingOptions = {
    localVue,
    propsData: {
      label: 'test switch'
    }
  }

  return shallowMount( BaseSwitch, merge( defaultMountingOptions, overrides ))
}

describe('BaseSwitch.vue', () => {

  describe('snapshots:', () => {

    test('should match snapshot if active', async () => {
      const wrapper = createWrapper({
        propsData: {
          isActive: true,
          fieldName: 'testField'
        }
      })
      await flushPromises()

      expect( wrapper.element ).toMatchSnapshot()
    })

    test('should match snapshot if inactive', async () => {
      const wrapper = createWrapper({
        propsData: {
          fieldName: 'testField'
        }
      })
      await flushPromises()

      expect( wrapper.element ).toMatchSnapshot()
    })

  })

  test('should render label from props', async () => {
    const label = 'my awesome label'
    const wrapper = createWrapper({
      propsData: {
        label,
      }
    })
    await flushPromises()

    expect( wrapper.find( 'label' ).text() ).toBe( label )
  })

  test('should contain field and field checkbox classes if inactive', async () => {
    const wrapper = createWrapper()
    await flushPromises()

    expect( wrapper.classes().length ).toBe( 2 )
  })

  test('should contain field and field checkbox classes and .active if active', async () => {
    const wrapper = createWrapper({
      propsData: {
        isActive: true
      }
    })
    await flushPromises()

    expect( wrapper.classes().length ).toBe( 3 )
    expect( wrapper.classes() ).toContain( 'active' )
  })

  test('should pass data-name attribute to switch elements', async () => {
    const fieldName = 'awesomeSwitch'
    const wrapper = createWrapper({
      propsData: {
        fieldName,
      }
    })
    await flushPromises()

    expect( wrapper.find('.switch').attributes()[ 'data-name' ]).toBe( fieldName )
    expect( wrapper.find('.path').attributes()[ 'data-name' ]).toBe( fieldName )
    expect( wrapper.find('.handle').attributes()[ 'data-name' ]).toBe( fieldName )
  })

})