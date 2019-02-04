import { shallowMount } from '@vue/test-utils'
import WrapperSection from '../../../../src/components/BaseGeneric/WrapperSection'

describe('WrapperSection.vue', () => {

  test('should match snapshot', () => {
    const wrapper = shallowMount(WrapperSection, {
      propsData: {
        title: 'Section title'
      }
    })

    expect( wrapper.element ).toMatchSnapshot()
  })

  test('should render title passed in the props', () => {
    const title   = 'Section title'
    const wrapper = shallowMount(WrapperSection, {
      propsData: {
        title,
      }
    })

    expect( wrapper.find('.title').text() ).toBe( title )
  })

  test('should accept content for default slot', () => {
    const slotContent = '<div id="slot-content">My Awesome Content</div>'
    const wrapper = shallowMount(WrapperSection, {
      propsData: {
        title: 'Section title'
      },
      slots: {
        default: slotContent
      }
    })

    expect( wrapper.contains( '#slot-content' )).toBe( true )
  })

})