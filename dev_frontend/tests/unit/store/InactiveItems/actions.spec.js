import { createLocalVue } from '@vue/test-utils'
import { storeConfig    } from '../../../../src/store/config'
import Vuex          from 'vuex'
import cloneDeep     from 'lodash.clonedeep'
import _             from 'underscore'
import flushPromises from 'flush-promises'

const localVue = createLocalVue()
localVue.prototype.$genid = jest.fn().mockImplementation(() => { return 'addedUUID' })
localVue.use( Vuex )
window._ = _

describe('ACTIONS InactiveItems:', () => {

  let store

  beforeEach(() => {
    const clonedStoreConfig = cloneDeep( storeConfig )
    store = new Vuex.Store( clonedStoreConfig )

    store.dispatch('general/setCurrentStoreModule', { storeModule: 'MobileModule' }, { root: true })
    store.dispatch('general/setCurrentView', { view: 'mobile' }, { root: true })
  })

  test('`putItem` should put item to inactive', async () => {
    expect.assertions( 2 )

    const spy = jest.spyOn( store._mutations[ 'MobileModule/PUT_TO_INACTIVE' ], [0] )

    const payload = {
      item: { "name": "button", "icon": "db-shape", "form": { "title": "", "link": "", "linkClass": "", "linkTarget": { "label": "Default | _self", "value": "" } }, "style": { "textColor": "#333333", "buttonColor": "#f7f7f7", "hoverTextColor": "#ffffff", "hoverButtonColor": "#0095eb" }, "uuid": "0Oaju4Kzn4" }
    }

    store.dispatch( 'inactiveItems/putItem', payload, { root: true })
    await flushPromises()

    expect( spy         ).toBeCalledWith( payload )
    expect( store.state.MobileModule.inactiveItems ).toEqual([ payload.item ])
  })

  test('`removeItem` should remove item from inactive', async () => {
    expect.assertions( 2 )

    store.dispatch('inactiveItems/putItem', {
      item: { "name": "button", "icon": "db-shape", "form": { "title": "", "link": "", "linkClass": "", "linkTarget": { "label": "Default | _self", "value": "" } }, "style": { "textColor": "#333333", "buttonColor": "#f7f7f7", "hoverTextColor": "#ffffff", "hoverButtonColor": "#0095eb" }, "uuid": "0Oaju4Kzn4" }
    }, { root: true })

    const payload = {
      cellId: 0
    }
    expect( store.state.MobileModule.inactiveItems.length ).toBe( 1 )

    store.dispatch( 'inactiveItems/removeItem', payload, { root: true })
    await flushPromises()

    expect( store.state.MobileModule.inactiveItems.length ).toBe( 0 )
  })

  test('`clear` should make inactiveItems an empty array', async () => {
    expect.assertions( 2 )

    store.dispatch('inactiveItems/putItem', {
      item: { "name": "button", "icon": "db-shape", "form": { "title": "", "link": "", "linkClass": "", "linkTarget": { "label": "Default | _self", "value": "" } }, "style": { "textColor": "#333333", "buttonColor": "#f7f7f7", "hoverTextColor": "#ffffff", "hoverButtonColor": "#0095eb" }, "uuid": "0Oaju4Kzn4" }
    }, { root: true })

    expect( store.state.MobileModule.inactiveItems.length ).toBe( 1 )

    store.dispatch( 'inactiveItems/clear', void 0, { root: true })
    await flushPromises()

    expect( store.state.MobileModule.inactiveItems ).toEqual( [] )
  })

  test('`copy` should copy inactiveItems from Mobile to MobileSticky', async () => {
    store.state.items.baseItemsList.forEach(( item ) => {
      store.dispatch('inactiveItems/putItem', {
        item,
      }, { root: true })
    })

    store.dispatch('general/setCurrentStoreModule', { storeModule: 'MobileStickyModule' }, { root: true })

    expect( store.state.MobileModule.inactiveItems.length ).toBe( 9 )
    expect( store.state.MobileStickyModule.inactiveItems.length ).toBe( 0 )

    store.dispatch('inactiveItems/copy', void 0, { root: true })

    expect( store.state.MobileStickyModule.inactiveItems.length ).toBe( store.state.MobileModule.inactiveItems.length )
  })

})