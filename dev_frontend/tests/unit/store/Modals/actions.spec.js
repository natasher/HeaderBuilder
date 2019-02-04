import { createLocalVue } from '@vue/test-utils'
import { storeConfig    } from '../../../../src/store/config'
import Vuex          from 'vuex'
import cloneDeep     from 'lodash.clonedeep'
import _             from 'underscore'
import flushPromises from 'flush-promises'
import {
  infoAutoMode,
  onLaunch,
  afterBuilderReset,
  onBuilderReset,
} from '../../../../src/store/dialogs'

const localVue = createLocalVue()
localVue.use( Vuex )
window._ = _

describe('ACTIONS Modals:', () => {

  let store
  let $modal = {
    show: jest.fn(),
    hide: jest.fn(),
  }

  beforeEach(() => {
    $modal.show.mockRestore()
    $modal.hide.mockRestore()

    const clonedStoreConfig = cloneDeep( storeConfig )
    store = new Vuex.Store( clonedStoreConfig )

    store.dispatch('general/setCurrentStoreModule', { storeModule: 'DesktopModule' }, { root: true })
    store.dispatch('general/setCurrentView', { view: 'desktop' }, { root: true })
  })

  test('`showGridOptionsModal` should invoke vue-js-modal with ModalGrid', async () => {
    const spy = jest.spyOn(store._actions[ 'modals/showGridOptionsModal' ], [0])

    store.dispatch('modals/showGridOptionsModal', { $modal: $modal }, { root: true })
    await flushPromises()

    expect( spy ).toBeCalled()
    expect( $modal.show.mock.calls[0][0] ).toBe('ModalGrid')
  })

  test('`showActionBarOptionsModal` should invoke vue-js-modal with ModalActionBar', async () => {
    const spy = jest.spyOn(store._actions[ 'modals/showActionBarOptionsModal' ], [0])

    store.dispatch('modals/showActionBarOptionsModal', { $modal: $modal }, { root: true })
    await flushPromises()

    expect( spy ).toBeCalled()
    expect( $modal.show.mock.calls[0][0] ).toBe('ModalActionBar')
  })

  test('`showFirstRowOptionsModal` should invoke vue-js-modal with ModalFirstRow', async () => {
    const spy = jest.spyOn(store._actions[ 'modals/showFirstRowOptionsModal' ], [0])

    store.dispatch('modals/showFirstRowOptionsModal', { $modal: $modal }, { root: true })
    await flushPromises()

    expect( spy ).toBeCalled()
    expect( $modal.show.mock.calls[0][0] ).toBe('ModalFirstRow')
  })

  test('`showSecondRowOptionsModal` should invoke vue-js-modal with ModalSecondRow', async () => {
    const spy = jest.spyOn(store._actions[ 'modals/showSecondRowOptionsModal' ], [0])

    store.dispatch('modals/showSecondRowOptionsModal', { $modal: $modal }, { root: true })
    await flushPromises()

    expect( spy ).toBeCalled()
    expect( $modal.show.mock.calls[0][0] ).toBe('ModalSecondRow')
  })

  test('`showModalItemForm` should compute modal name and invoke vue-js-modal with this modal', async () => {
    const items = [
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
    store.commit('DesktopModule/UPDATE_BUILDER_CELL', {
      row    : 'actionBar',
      cellPos: 'center',
      item   : items
    }, { root:true })

    const spy = jest.spyOn( store._actions[ 'modals/showModalItemForm'], [0] )
    const originalCoords = {
        row    : 'actionBar',
        cellPos: 'center',
        cellId : 3,
      }

    store.dispatch('modals/showModalItemForm', { $modal, originalCoords }, { root: true })
    await flushPromises()

    expect( spy ).toBeCalled()
    expect( $modal.show.mock.calls[0][0] ).toBe('ModalExtras')
  })

  test('`showAutoModeModal` should invoke vue-js-modal with MfnGenericModal with infoAutoMode text', async () => {
    const spy = jest.spyOn( store._actions[ 'modals/showAutoModeModal' ], [0])

    store.dispatch('modals/showAutoModeModal', { $modal: $modal }, { root: true })
    await flushPromises()

    expect( spy ).toBeCalled()
    expect( $modal.show.mock.calls[0][0] ).toBe('MfnGenericModal')
    expect( $modal.show.mock.calls[0][1].title ).toBe('Info')
    expect( $modal.show.mock.calls[0][1].text ).toBe( infoAutoMode )
  })

  test('`showLaunchModal` should open modal with info text', async () => {
    const spy = jest.spyOn( store._actions[ 'modals/showLaunchModal' ], [0])

    store.dispatch('modals/showLaunchModal', { $modal: $modal }, { root: true })
    await flushPromises()

    expect( spy ).toBeCalled()
    expect( $modal.show.mock.calls[0][0] ).toBe('MfnGenericModal')
    expect( $modal.show.mock.calls[0][1].text ).toBe( onLaunch )
  })

  test('`showResetBuilderModal` should open modal with info text and two buttons', async () => {
    const spy = jest.spyOn( store._actions[ 'modals/showResetBuilderModal' ], [0])

    store.dispatch('modals/showResetBuilderModal', { $modal: $modal }, { root: true })
    await flushPromises()

    expect( spy ).toBeCalled()
    expect( $modal.show.mock.calls[0][0] ).toBe('MfnGenericModal')
    expect( $modal.show.mock.calls[0][1].text ).toBe( onBuilderReset )
    expect( $modal.show.mock.calls[0][1].buttons.length ).toBe( 2 )
  })

  test('`showAfterBuilderResetModal` should open modal with info text', async () => {
    const spy = jest.spyOn( store._actions[ 'modals/showAfterBuilderResetModal' ], [0])

    store.dispatch('modals/showAfterBuilderResetModal', { $modal: $modal }, { root: true })
    await flushPromises()

    expect( spy ).toBeCalled()
    expect( $modal.show.mock.calls[0][0] ).toBe('MfnGenericModal')
    expect( $modal.show.mock.calls[0][1].text ).toBe( afterBuilderReset )
  })

})