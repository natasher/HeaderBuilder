import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex          from 'vuex'
import flushPromises from 'flush-promises'
import merge         from 'lodash.merge'

import ItemsTray     from '../../../src/components/ItemsTray'

const localVue = createLocalVue()
localVue.use( Vuex )

function createStore(overrides) {
  const defaultStoreConfig = {
    modules: {
      items: {
        namespaced: true,
        actions: {
          setTemporaryItem: jest.fn()
        },
        state: {
          baseItemsList: [
            {
              name: 'logo',
              icon: 'heart-line',
            },
            {
              name: 'menu',
              icon: 'list',
            },
            {
              name: 'menuIcon',
              icon: 'menu',
            },
            {
              name: 'extras',
              icon: 'plus-squared',
            },
            {
              name: 'social',
              icon: 'share',
            },
            {
              name: 'text',
              icon: 'doc-text',
            },
            {
              name: 'image',
              icon: 'picture',
            },
            {
              name: 'icon',
              icon: 'feather',
            },
            {
              name: 'button',
              icon: 'db-shape',
            },
          ],
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
    stubs: [
      'FontIcon',
      'BaseItem',
      'draggable',
    ],
  }

  return shallowMount( ItemsTray, merge( defaultMountingOptions, overrides ) )
}

describe('ItemsTray:', () => {

  describe('snapshots:', () => {

    test('should match when no item is dragged', async () => {
      const wrapper = createWrapper()
      await flushPromises()

      expect( wrapper.element ).toMatchSnapshot()
    })

    test('should match if item is dragged', async () => {
      const wrapper = createWrapper()
      wrapper.setData({ draggedItem: 'extras' })
      await flushPromises()

      expect( wrapper.element ).toMatchSnapshot()
    })

  })

  describe('methods and computed:', () => {

    test('`atStart` should set `data.draggedItem` to given item name if draggable start event is trigger', async () => {
      const event = {
        item: {
          attributes: [{ nodeValue: 'logo' }],
        },
        oldIndex: 0
      }
      const setTemporaryItem = jest.fn()
      const store = createStore({
        modules: {
          items: {
            actions: {
              setTemporaryItem
            }
          }
        }
      })
      const wrapper = createWrapper({ store, })
      await flushPromises()

      wrapper.vm.atStart( event )

      expect( wrapper.vm.draggedItem ).toBe( event.item.attributes[0].nodeValue )
    })

    test('`atStart` should invoke `setTemporaryItem` with cloned item if draggable start event is triggered', async () => {
      const event = {
        item: {
          attributes: [{ nodeValue: 'logo' }],
        },
        oldIndex: 0
      }
      const setTemporaryItem = jest.fn()
      const store = createStore({
        modules: {
          items: {
            actions: {
              setTemporaryItem
            }
          }
        }
      })
      const wrapper = createWrapper({ store, })
      await flushPromises()

      wrapper.vm.atStart( event )

      expect( setTemporaryItem ).toBeCalled()
      expect( setTemporaryItem ).toBeCalledWith(
        expect.anything(),
        { tmpItem: store.state.items.baseItemsList[ event.oldIndex ] },
        void 0
      )
    })

    test('`atEnd` should set `data.draggedItem` to empty string', async () => {
      const event = {
        item: {
          attributes: [{ nodeValue: 'logo' }],
        },
        oldIndex: 0
      }
      const setTemporaryItem = jest.fn()
      const store = createStore({
        modules: {
          items: {
            actions: {
              setTemporaryItem
            }
          }
        }
      })
      const wrapper = createWrapper({ store, })
      await flushPromises()

      wrapper.vm.atStart( event )

      expect( wrapper.vm.draggedItem.length ).not.toBe( 0 )

      wrapper.vm.atEnd()

      expect( wrapper.vm.draggedItem ).toBe( '' )
    })

    test('`baseItemsList` should return items from store.state.items', async () => {
      const store   = createStore()
      const wrapper = createWrapper({ store, })
      await flushPromises()

      expect( wrapper.vm.baseItemsList ).toEqual( store.state.items.baseItemsList )
    })

    test('`baseItemsList` should accept a value and do nothing with the payload', async () => {
      const store   = createStore()
      const wrapper = createWrapper({ store, })
      await flushPromises()
      wrapper.vm.baseItemsList = [ 'some', 'thing' ]

      expect( wrapper.vm.baseItemsList ).toEqual( store.state.items.baseItemsList )
    })

  })

  test('`draggable` should render as much BaseItems as exists in baseItemsList', async () => {
    const store   = createStore()
    const wrapper = createWrapper({ store, })

    expect( wrapper.findAll('baseitem-stub').length ).toBe( store.state.items.baseItemsList.length )
  })

})