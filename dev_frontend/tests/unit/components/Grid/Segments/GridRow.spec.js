import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex          from 'vuex'
import flushPromises from 'flush-promises'
import merge         from 'lodash.merge'
import GridRow       from '../../../../../src/components/Grid/Segments/GridRow.vue'

const localVue = createLocalVue()
localVue.use( Vuex )

function createStore(overrides) {
  const defaultStoreConfig = {
    modules: {
      ui: {
        namespaced: true,
        getters: {
          getGridStatus: jest.fn(() => { return 'custom' })
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
      name          : 'Test Name',
      editRowHandler: 'testHandler'
    }
  }

  return shallowMount( GridRow, merge( defaultMountingOptions, overrides ))
}

describe('GridRow.vue', () => {

  describe('snapshots:', () => {

    test('should match snapshot with slots and when grid status is custom', () => {
      const wrapper = createWrapper({
        slots: {
          'left'         : '<div class="left">LEFT</div>',
          'footer-left'  : '<div class="footer-left">FOOTER LEFT</div>',
          'center'       : '<div class="center">CENTER</div>',
          'footer-center': '<div class="footer-center">FOOTER CENTER</div>',
          'right'        : '<div class="right">RIGHT</div>',
          'footer-right' : '<div class="footer-right">FOOTER RIGHT</div>',
        }
      })

      expect( wrapper.element ).toMatchSnapshot()
    })

    test('should match snapshot with slots and when grid status is NOT custom', () => {
      const store = createStore({
        modules: {
          ui: {
            getters: {
              getGridStatus: jest.fn(() => { return 'auto' })
            }
          }
        }
      })
      const wrapper = createWrapper({
        store,
        slots: {
          'left'         : '<div class="left">LEFT</div>',
          'footer-left'  : '<div class="footer-left">FOOTER LEFT</div>',
          'center'       : '<div class="center">CENTER</div>',
          'footer-center': '<div class="footer-center">FOOTER CENTER</div>',
          'right'        : '<div class="right">RIGHT</div>',
          'footer-right' : '<div class="footer-right">FOOTER RIGHT</div>',
        }
      })

      expect( wrapper.element ).toMatchSnapshot()
    })
  })

  test('should render slot name in title', () => {
    const wrapper = createWrapper()
    const titleEl = wrapper.find('.hbr-title')

    expect( titleEl.text() ).toBe( 'Test Name' )
  })

  test('should open proper modal for given row when edit icon was clicked (handler taken from outside)', async () => {
    const testHandler = jest.fn()
    const $modal      = jest.fn()
    const store = createStore({
      modules: {
        modals: {
          namespaced: true,
          actions: {
            testHandler,
          }
        }
      }
    })
    const wrapper = createWrapper({
      store,
      mocks: {
        $modal
      }
    })
    const editBtn = wrapper.find('.icon-edit')

    editBtn.trigger('click')
    await flushPromises()

    expect(testHandler).toBeCalledWith(
      expect.anything(),
      { $modal },
      void 0
    )
  })

  describe('dynamic classes:', () => {

    test('should always attach `hb-row` class', () => {
      const wrapper = createWrapper()

      expect( wrapper.classes() ).toContain( 'hb-row' )
    })

    test('should attach `hbr-action` for row name `Action Bar`', () => {
      const wrapper = createWrapper({
        propsData: {
          name: 'Action Bar'
        }
      })

      expect( wrapper.classes() ).toContain( 'hbr-action' )
    })

    test('should attach `hbr-first` for row name `First Row`', () => {
      const wrapper = createWrapper({
        propsData: {
          name: 'First Row'
        }
      })

      expect( wrapper.classes() ).toContain( 'hbr-first' )
    })

    test('should attach `hbr-second` for row name `Second Row`', () => {
      const wrapper = createWrapper({
        propsData: {
          name: 'Second Row'
        }
      })

      expect( wrapper.classes() ).toContain( 'hbr-second' )
    })

  })

  describe('slots:', () => {

    test('should accept content for left cell', () => {
      const wrapper = createWrapper({
        slots: {
          'left': '<div class="left">LEFT</div>',
        }
      })
      const slot = wrapper.find('.left')

      expect( slot.exists() ).toBe( true )
      expect( slot.isVueInstance ).toBeTruthy()
      expect( slot.text() ).toBe('LEFT')
    })

    test('should accept content for left footer', () => {
      const wrapper = createWrapper({
        slots: {
          'footer-left': '<div class="footer-left">FOOTER LEFT</div>',
        }
      })
      const slot = wrapper.find('.footer-left')

      expect( slot.exists() ).toBe( true )
      expect( slot.isVueInstance ).toBeTruthy()
      expect( slot.text() ).toBe('FOOTER LEFT')
    })

    test('should accept content for center cell', () => {
      const wrapper = createWrapper({
        slots: {
          'center': '<div class="center">CENTER</div>',
        }
      })
      const slot = wrapper.find('.center')

      expect( slot.exists() ).toBe( true )
      expect( slot.isVueInstance ).toBeTruthy()
      expect( slot.text() ).toBe('CENTER')
    })

    test('should accept content for center footer', () => {
      const wrapper = createWrapper({
        slots: {
          'footer-center': '<div class="footer-center">FOOTER CENTER</div>',
        }
      })
      const slot = wrapper.find('.footer-center')

      expect( slot.exists() ).toBe( true )
      expect( slot.isVueInstance ).toBeTruthy()
      expect( slot.text() ).toBe('FOOTER CENTER')
    })

    test('should accept content for right cell', () => {
      const wrapper = createWrapper({
        slots: {
          'right': '<div class="right">RIGHT</div>',
        }
      })
      const slot = wrapper.find('.right')

      expect( slot.exists() ).toBe( true )
      expect( slot.isVueInstance ).toBeTruthy()
      expect( slot.text() ).toBe('RIGHT')
    })

    test('should accept content for right footer', () => {
      const wrapper = createWrapper({
        slots: {
          'footer-right': '<div class="footer-right">FOOTER RIGHT</div>',
        }
      })
      const slot = wrapper.find('.footer-right')

      expect( slot.exists() ).toBe( true )
      expect( slot.isVueInstance ).toBeTruthy()
      expect( slot.text() ).toBe('FOOTER RIGHT')
    })

  })

})