import { shallowMount } from '@vue/test-utils'
import FontIcon from '../../../../src/components/BaseGeneric/FontIcon.vue'

describe('FontIcon.vue', () => {

  test('should match snapshot', () => {
    const wrapper = shallowMount(FontIcon, {
      propsData: {
        icon: 'poop'
      }
    })

    expect( wrapper.element ).toMatchSnapshot()
  })

  test('should generate class by joining `icon-` with prop with name', () => {
    const icon = 'poop'
    const wrapper = shallowMount(FontIcon, {
      propsData: {
        icon,
      }
    })

    expect( wrapper.classes() ).toContain( `icon-${ icon }` )
  })
})