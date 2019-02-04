import { shallowMount } from '@vue/test-utils'
import CellFooter from '../../../../../src/components/Grid/Segments/CellFooter.vue'

describe('CellFooter.vue', () => {

  describe('snapshots:', () => {

    test('should match if position is `test` and slot is empty', () => {
      const wrapper = shallowMount(
        CellFooter,
        {
          propsData: {
            pos: 'test'
          }
        }
      )

      expect( wrapper.element ).toMatchSnapshot()
    })

    test('should match if position is `test` and slot contain some content', () => {
      const wrapper = shallowMount(
        CellFooter,
        {
          propsData: {
            pos: 'test'
          },
          slots: {
            default: '<div>DEFAULT SLOT</div>'
          }
        },
      )

      expect( wrapper.element ).toMatchSnapshot()
    })

  })

  test('should create class for footer from `pos` prop and given string', () => {
    const wrapper = shallowMount(
      CellFooter,
      {
        propsData: {
          pos: 'test',
        }
      }
    )
    const el = wrapper.find('span')

    expect(el.classes()).toEqual([ 'hbr-title-test' ])
  })

  test('should accept default slot content', () => {
    const wrapper = shallowMount(
      CellFooter,
      {
        propsData: {
          pos: 'test'
        },
        slots: {
          default: '<div>DEFAULT SLOT</div>'
        }
      }
    )

    expect(wrapper.find('div').text()).toBe('DEFAULT SLOT')
  })

})