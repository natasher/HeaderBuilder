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

describe('ACTIONS Items:', () => {

  let store
  let items

  beforeEach(() => {
    items = [
      { "name": "logo",     "icon": "heart-line",   "uuid": "OsxehBM4D", "form": { "logo":      "", "height":                "",      "retinaLogo":          "",          "options":                   {            "overflowLogo":                     false             }           },                     "originalCoords": {        "row":            "actionBar", "cellPos":   "left",           "cellId":         0                  }                     },
      { "name": "menu",     "icon": "list",         "uuid": "5IGRc9msc", "form": { "options":   {   "activeForSubmenuItems": false,   "bordersBetweenItems": false,       "arrowsForItemsWithSubmenu": false,       "foldSubmenusForLast2ItemsToRight": false             },          "replaceWithMenuIcon": {                 "label": "Tablet           &            Mobile",     "value":          "tabletMobile"    },                 "menu":               {                 "label":          "--                Default      --",         "value":   "0"       }         }, "style": {        "linkColor": "#333333",   "hoverLinkColor": "#0095eb",    "activeLinkColor": "#0095eb", "subBackgroundColor": "#F2F2F2", "subLinkColor": "#333333",   "subHoverLinkColor": "#0095eb", "subActiveLinkColor": "#0095eb" }, "originalCoords": { "row": "actionBar", "cellPos": "left", "cellId": 1 } },
      { "name": "menuIcon", "icon": "menu",         "uuid": "ahhvQ8VLi", "form": { "icon":      [], "menu":                  "",      "style":               {            "label":                     "Side        Slide",                             "value":          "sideSlide" }                      },                "style": {                 "iconColor": "#333333",   "hoverIconColor": "#0095eb",        "backgroundColor": "rgba(255,255,255,0)" },                "originalCoords": {                  "row":       "actionBar", "cellPos": "left",   "cellId": 2  }        },
      { "name": "extras",   "icon": "plus-squared", "uuid": "vZYEcm-6g", "form": { "shopIcon":  [], "searchStyle":           {        "label":               "Icon",      "value":                     "icon"       },                                  "searchType":     {           "label":               "Default",        "value": ""                },           "wpmlStyle": {                 "label":          "Flags",           "value":              "flags"           },                "wpmlArrangement": {            "label":     "List",    "value":  "list"    }  },       "style": {            "iconColor": "#333333",        "hoverColor": "#0095eb"          },         "originalCoords":     {          "row":          "actionBar", "cellPos":           "left",    "cellId":             3         }  },
      { "name": "social",   "icon": "share",        "uuid": "lC5uvN-IW", "form": { "iconsList": [], "openLinksInNewWindow":  false    },                     "style":     {                            "iconColor": "#333333",                          "hoverColor":     "#0095eb"   },                     "originalCoords": {        "row":            "actionBar", "cellPos":   "left",           "cellId":         4                  }                     },
      { "name": "text",     "icon": "doc-text",     "uuid": "8Rg0IA_SE", "form": { "text":      ""  },                       "style": {                      "textColor": "#333333",                   "linkColor": "#0095eb",                          "hoverLinkColor": "#007cc3"   },                     "originalCoords": {        "row":            "actionBar", "cellPos":   "left",           "cellId":         5                  }                     },
      { "name": "image",    "icon": "picture",      "uuid": "TG-Xf0eih", "form": { "link":      "", "linkClass":             "",      "linkTarget":          {            "label":                     "Default     |                                   _self",           "value":    ""                     }                 },       "originalCoords": {            "row":       "actionBar",      "cellPos":        "left",            "cellId":             6                 }                 },
      { "name": "icon",     "icon": "feather",      "uuid": "lSBlmZMjd", "form": { "icon":      [], "linkClass":             "",      "linkTarget":          {            "label":                     "Default     |                                   _self",           "value":    ""                     }                 },       "style":          {            "iconColor": "#333333",        "hoverIconColor": "#0095eb"          },                    "originalCoords": {                 "row":             "actionBar", "cellPos":   "left",    "cellId": 7         }  },
      { "name": "button",   "icon": "db-shape",     "uuid": "kYFw4LR8V", "form": { "title":     "", "link":                  "",      "linkClass":           "",          "linkTarget":                {            "label":                            "Default          |           _self",                "value":          ""       }                 },           "style":     {                 "textColor":      "#333333",         "buttonColor":        "#f7f7f7", "hoverTextColor": "#ffffff", "hoverButtonColor": "#0095eb" }, "originalCoords": { "row": "actionBar", "cellPos": "left", "cellId": 8 } }
    ]
    const clonedStoreConfig = cloneDeep( storeConfig )
    store = new Vuex.Store( clonedStoreConfig )

    store.dispatch('general/setCurrentStoreModule', { storeModule: 'DesktopModule' }, { root: true })
    store.dispatch('general/setCurrentView', { view: 'desktop' }, { root: true })

    store.commit('DesktopModule/UPDATE_BUILDER_CELL', {
      row    : 'actionBar',
      cellPos: 'left',
      item   : items
    }, { root: true })
  })

  test('`setCurrentItem` should item from grid and sets state.items.current to this item', async () => {
    const payload = {
      row    : 'actionBar',
      cellPos: 'left',
      cellId : 4,
      item   : items[ 4 ]
    }

    store.dispatch('items/setCurrentItem', payload, { root: true })
    await flushPromises()

    expect( store.state.items.current.uuid ).toBe( "lC5uvN-IW" )
  })

  test('`setTemporaryItem` should set state.items.tmpItem', async () => {
    const payload = {
      item: items[ 0 ]
    }

    store.dispatch('items/setTemporaryItem', payload, { root: true })
    await flushPromises()

    expect( store.state.items.tmpItem ).toEqual( items[ 0 ] )
  })

  test('`saveForm` should write item to given position in grid', async () => {
    const spy = jest.spyOn(store._mutations['DesktopModule/SAVE_ITEM_FORM'], [0])

    store.dispatch('items/saveForm', {
      new_item: items[ 8 ],
      priv    : {
        row     : 'actionBar',
        cellId  : 0,
        cellPos : 'left'
      }
    }, { root: true })
    await flushPromises()

    expect( spy ).toBeCalled()
    expect( store.state.DesktopModule.actionBar.items.left[ 0 ].name ).toBe( 'button' )
  })

  describe('setCurrentFieldValue', () => {

    test('should call `setEditorChanged` with true payload', async () => {
      const spy = jest.spyOn( store._actions[ 'general/setEditorChanged' ], [0])

      store.dispatch('items/setCurrentItem', {
        row    : 'actionBar',
        cellPos: 'left',
        cellId : 0,
        item   : items[ 0 ]
      }, { root: true })

      store.dispatch('items/setCurrentFieldValue', {
        name : 'logo',
        value: 'testValue',
      }, { root: true })
      await flushPromises()

      expect( spy ).toBeCalledWith({ hasChanged: true })
    })

    test('should change value for given field in state.items.current', async () => {
      store.dispatch('items/setCurrentItem', {
        row    : 'actionBar',
        cellPos: 'left',
        cellId : 0,
        item   : items[ 0 ]
      }, { root: true })
      const payload = { name: 'logo', value: 'testValue', }

      store.dispatch('items/setCurrentFieldValue', payload, { root: true })
      await flushPromises()

      expect( store.state.items.current.form[ payload.name ] ).toBe( payload.value )
    })

  })

  describe('setStyleFormValue', () => {

    test('should call `setEditorChanged` with true payload', async () => {
      const spy = jest.spyOn( store._actions[ 'general/setEditorChanged' ], [0])

      store.dispatch('items/setCurrentItem', {
        row    : 'actionBar',
        cellPos: 'left',
        cellId : 1,
        item   : items[ 1 ]
      }, { root: true })

      store.dispatch('items/setStyleFormValue', {
        name : 'linkColor',
        value: '#666',
      }, { root: true })
      await flushPromises()

      expect( spy ).toBeCalledWith({ hasChanged: true })
    })

    test('should change value for given field in state.items.current', async () => {
      store.dispatch('items/setCurrentItem', {
        row    : 'actionBar',
        cellPos: 'left',
        cellId : 1,
        item   : items[ 1 ]
      }, { root: true })
      const payload = { name: 'linkColor', value: '#666', }

      store.dispatch('items/setCurrentFieldValue', payload, { root: true })
      await flushPromises()

      expect( store.state.items.current.form[ payload.name ] ).toBe( payload.value )
    })

  })

  describe('pushCurrentFieldEntry', () => {

    test('should call `setEditorChanged` with true payload', async () => {
      const spy = jest.spyOn( store._actions[ 'general/setEditorChanged' ], [0])

      store.dispatch('items/setCurrentItem', {
        row    : 'actionBar',
        cellPos: 'left',
        cellId : 4,
        item   : items[ 4 ]
      }, { root: true })

      const payload = {
        name: "iconsList",
        entry: { "icon": "icon-arrow-combo", "link": "updown.org" }
      }

      store.dispatch('items/pushCurrentFieldEntry', payload, { root: true })
      await flushPromises()

      expect( spy ).toBeCalledWith({ hasChanged: true })
    })

    test('should push value to an array for given field in state.items.current', async () => {
      store.dispatch('items/setCurrentItem', {
        row    : 'actionBar',
        cellPos: 'left',
        cellId : 4,
        item   : items[ 4 ]
      }, { root: true })

      const payload = {
        name: "iconsList",
        entry: { "icon": "icon-arrow-combo", "link": "updown.org" }
      }

      store.dispatch('items/pushCurrentFieldEntry', payload, { root: true })
      await flushPromises()

      expect( store.state.items.current.form[ payload.name ][ 0 ] ).toBe( payload.entry )
    })

  })

  describe('removeCurrentFieldEntry', () => {

    test('should call `setEditorChanged` with true payload', async () => {
      const spy = jest.spyOn( store._actions[ 'general/setEditorChanged' ], [0])

      store.dispatch('items/setCurrentItem', {
        row    : 'actionBar',
        cellPos: 'left',
        cellId : 4,
        item   : items[ 4 ]
      }, { root: true })
      store.dispatch('items/pushCurrentFieldEntry', {
        name : "iconsList",
        entry: { "icon": "icon-arrow-combo", "link": "updown.org" }
      }, { root: true })
      await flushPromises()

      expect( store.state.items.current.form.iconsList.length ).toBe( 1 )

      const payload = {
        name : "iconsList",
        index: 0
      }

      store.dispatch('items/removeCurrentFieldEntry', payload, { root: true })
      await flushPromises()

      expect( spy ).toBeCalledWith({ hasChanged: true })
    })

    test('should push value to an array for given field in state.items.current', async () => {
      store.dispatch('items/setCurrentItem', {
        row    : 'actionBar',
        cellPos: 'left',
        cellId : 4,
        item   : items[ 4 ]
      }, { root: true })

      const payload = {
        name : "iconsList",
        entry: { "icon": "icon-arrow-combo", "link": "updown.org" }
      }

      store.dispatch('items/pushCurrentFieldEntry', payload, { root: true })
      await flushPromises()

      expect( store.state.items.current.form.iconsList.length ).toBe( 1 )

      store.dispatch('items/removeCurrentFieldEntry', {
        name : 'iconsList',
        index: 0
      }, { root: true })
      await flushPromises()

      expect( store.state.items.current.form[ payload.name ].length ).toBe( 0 )
    })

  })

})