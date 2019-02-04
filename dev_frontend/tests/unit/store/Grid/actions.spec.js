import { createLocalVue } from '@vue/test-utils'
import { storeConfig    } from '../../../../src/store/config'
import Vuex          from 'vuex'
import cloneDeep     from 'lodash.clonedeep'
import _             from 'underscore'
import flushPromises from 'flush-promises'

const localVue = createLocalVue()
localVue.prototype.$genid = jest.fn().mockImplementation(() => {return 'addedUUID'})
localVue.use( Vuex )
window._ = _

describe('ACTIONS Grid:', () => {

  let store

  beforeEach(() => {
    const clonedStoreConfig = cloneDeep( storeConfig )
    store = new Vuex.Store( clonedStoreConfig )

    store.dispatch('general/setCurrentStoreModule', { storeModule: 'MobileModule' }, { root: true })
    store.dispatch('general/setCurrentView', { view: 'mobile' }, { root: true })
  })

  describe('clone', () => {

    test('should clear all cells in given module', async () => {
      expect.assertions( 10 )
      const spy = jest.spyOn( store._actions[ 'cell/clear' ], [0] )
      const payload = {
        from: 'DesktopModule'
      }

      store.dispatch( 'grid/clone', payload, { root: true })
      await flushPromises()

      expect( spy ).toBeCalledTimes( 9 )
      expect( spy.mock.calls[0][0] ).toEqual({ row: 'actionBar', cellPos: 'left' })
      expect( spy.mock.calls[1][0] ).toEqual({ row: 'actionBar', cellPos: 'center' })
      expect( spy.mock.calls[2][0] ).toEqual({ row: 'actionBar', cellPos: 'right' })
      expect( spy.mock.calls[3][0] ).toEqual({ row: 'firstRow', cellPos: 'left' })
      expect( spy.mock.calls[4][0] ).toEqual({ row: 'firstRow', cellPos: 'center' })
      expect( spy.mock.calls[5][0] ).toEqual({ row: 'firstRow', cellPos: 'right' })
      expect( spy.mock.calls[6][0] ).toEqual({ row: 'secondRow', cellPos: 'left' })
      expect( spy.mock.calls[7][0] ).toEqual({ row: 'secondRow', cellPos: 'center' })
      expect( spy.mock.calls[8][0] ).toEqual({ row: 'secondRow', cellPos: 'right' })
    })

    test('should clone only `Logo` and `Menu` if current view is `mobile` and grid status `auto`', async () => {
      expect.assertions( 5 )

      const items       = [{"name": "logo","icon": "heart-line","uuid": "OsxehBM4D","form": {"logo": "","height": "","retinaLogo": "","options": {"overflowLogo": false}},"originalCoords": {"row": "actionBar","cellPos": "left","cellId": 0}},{"name": "menu","icon": "list","uuid": "5IGRc9msc","form": {"options": {"activeForSubmenuItems": false,"bordersBetweenItems": false,"arrowsForItemsWithSubmenu": false,"foldSubmenusForLast2ItemsToRight": false},"replaceWithMenuIcon": {"label": "Tablet & Mobile","value": "tabletMobile"},"menu": {"label": "-- Default --","value": "0"}},"style": {"linkColor": "#333333","hoverLinkColor": "#0095eb","activeLinkColor": "#0095eb","subBackgroundColor": "#F2F2F2","subLinkColor": "#333333","subHoverLinkColor": "#0095eb","subActiveLinkColor": "#0095eb"},"originalCoords": {"row": "actionBar","cellPos": "left","cellId": 1}},{"name": "menuIcon","icon": "menu","uuid": "ahhvQ8VLi","form": {"icon": [],"menu": "","style": {"label": "Side Slide","value": "sideSlide"}},"style": {"iconColor": "#333333","hoverIconColor": "#0095eb","backgroundColor": "rgba(255,255,255,0)"},"originalCoords": {"row": "actionBar","cellPos": "left","cellId": 2}},{"name": "extras","icon": "plus-squared","uuid": "vZYEcm-6g","form": {"shopIcon": [],"searchStyle": {"label": "Icon","value": "icon"},"searchType": {"label": "Default","value": ""},"wpmlStyle": {"label": "Flags","value": "flags"},"wpmlArrangement": {"label": "List","value": "list"}},"style": {"iconColor": "#333333","hoverColor": "#0095eb"},"originalCoords": {"row": "actionBar","cellPos": "left","cellId": 3}},{"name": "social","icon": "share","uuid": "lC5uvN-IW","form": {"iconsList": [],"openLinksInNewWindow": false},"style": {"iconColor": "#333333","hoverColor": "#0095eb"},"originalCoords": {"row": "actionBar","cellPos": "left","cellId": 4}},{"name": "text","icon": "doc-text","uuid": "8Rg0IA_SE","form": {"text": ""},"style": {"textColor": "#333333","linkColor": "#0095eb","hoverLinkColor": "#007cc3"},"originalCoords": {"row": "actionBar","cellPos": "left","cellId": 5}},{"name": "image","icon": "picture","uuid": "TG-Xf0eih","form": {"link": "","linkClass": "","linkTarget": {"label": "Default | _self","value": ""}},"originalCoords": {"row": "actionBar","cellPos": "left","cellId": 6}},{"name": "icon","icon": "feather","uuid": "lSBlmZMjd","form": {"icon": [],"linkClass": "","linkTarget": {"label": "Default | _self","value": ""}},"style": {"iconColor": "#333333","hoverIconColor": "#0095eb"},"originalCoords": {"row": "actionBar","cellPos": "left","cellId": 7}},{"name": "button","icon": "db-shape","uuid": "kYFw4LR8V","form": {"title": "","link": "","linkClass": "","linkTarget": {"label": "Default | _self","value": ""}},"style": {"textColor": "#333333","buttonColor": "#f7f7f7","hoverTextColor": "#ffffff","hoverButtonColor": "#0095eb"},"originalCoords": {"row": "actionBar","cellPos": "left","cellId": 8}}]
      const spyInactive = jest.spyOn( store._actions[ 'inactiveItems/putItem' ], [0] )
      const spyPush     = jest.spyOn( store._actions[ 'cell/pushItem' ], [0] )
      const payload = {
        from: 'DesktopModule'
      }
      store.commit('DesktopModule/UPDATE_BUILDER_CELL', {
        row    : 'actionBar',
        cellPos: 'left',
        item   : items
      }, { root: true })

      store.dispatch( 'grid/clone', payload, { root: true })
      await flushPromises()

      expect( spyInactive ).toBeCalledTimes( 7 )
      expect( spyPush ).toBeCalledTimes( 2 )
      expect( store.state.MobileModule.actionBar.items.left.length ).toBe( 2 )
      expect( store.state.MobileModule.actionBar.items.left[0].name ).toBe( 'logo' )
      expect( store.state.MobileModule.actionBar.items.left[1].name ).toBe( 'menu' )
    })

    test('should attach new uuid to cloned item', async () => {
      expect.assertions( 2 )

      const items       = [{"name": "logo","icon": "heart-line","uuid": "OsxehBM4D","form": {"logo": "","height": "","retinaLogo": "","options": {"overflowLogo": false}},"originalCoords": {"row": "actionBar","cellPos": "left","cellId": 0}},{"name": "menu","icon": "list","uuid": "5IGRc9msc","form": {"options": {"activeForSubmenuItems": false,"bordersBetweenItems": false,"arrowsForItemsWithSubmenu": false,"foldSubmenusForLast2ItemsToRight": false},"replaceWithMenuIcon": {"label": "Tablet & Mobile","value": "tabletMobile"},"menu": {"label": "-- Default --","value": "0"}},"style": {"linkColor": "#333333","hoverLinkColor": "#0095eb","activeLinkColor": "#0095eb","subBackgroundColor": "#F2F2F2","subLinkColor": "#333333","subHoverLinkColor": "#0095eb","subActiveLinkColor": "#0095eb"},"originalCoords": {"row": "actionBar","cellPos": "left","cellId": 1}},{"name": "menuIcon","icon": "menu","uuid": "ahhvQ8VLi","form": {"icon": [],"menu": "","style": {"label": "Side Slide","value": "sideSlide"}},"style": {"iconColor": "#333333","hoverIconColor": "#0095eb","backgroundColor": "rgba(255,255,255,0)"},"originalCoords": {"row": "actionBar","cellPos": "left","cellId": 2}},{"name": "extras","icon": "plus-squared","uuid": "vZYEcm-6g","form": {"shopIcon": [],"searchStyle": {"label": "Icon","value": "icon"},"searchType": {"label": "Default","value": ""},"wpmlStyle": {"label": "Flags","value": "flags"},"wpmlArrangement": {"label": "List","value": "list"}},"style": {"iconColor": "#333333","hoverColor": "#0095eb"},"originalCoords": {"row": "actionBar","cellPos": "left","cellId": 3}},{"name": "social","icon": "share","uuid": "lC5uvN-IW","form": {"iconsList": [],"openLinksInNewWindow": false},"style": {"iconColor": "#333333","hoverColor": "#0095eb"},"originalCoords": {"row": "actionBar","cellPos": "left","cellId": 4}},{"name": "text","icon": "doc-text","uuid": "8Rg0IA_SE","form": {"text": ""},"style": {"textColor": "#333333","linkColor": "#0095eb","hoverLinkColor": "#007cc3"},"originalCoords": {"row": "actionBar","cellPos": "left","cellId": 5}},{"name": "image","icon": "picture","uuid": "TG-Xf0eih","form": {"link": "","linkClass": "","linkTarget": {"label": "Default | _self","value": ""}},"originalCoords": {"row": "actionBar","cellPos": "left","cellId": 6}},{"name": "icon","icon": "feather","uuid": "lSBlmZMjd","form": {"icon": [],"linkClass": "","linkTarget": {"label": "Default | _self","value": ""}},"style": {"iconColor": "#333333","hoverIconColor": "#0095eb"},"originalCoords": {"row": "actionBar","cellPos": "left","cellId": 7}},{"name": "button","icon": "db-shape","uuid": "kYFw4LR8V","form": {"title": "","link": "","linkClass": "","linkTarget": {"label": "Default | _self","value": ""}},"style": {"textColor": "#333333","buttonColor": "#f7f7f7","hoverTextColor": "#ffffff","hoverButtonColor": "#0095eb"},"originalCoords": {"row": "actionBar","cellPos": "left","cellId": 8}}]
      const payload = {
        from: 'DesktopModule'
      }
      store.commit('DesktopModule/UPDATE_BUILDER_CELL', {
        row    : 'actionBar',
        cellPos: 'left',
        item   : items
      }, { root: true })

      store.dispatch( 'grid/clone', payload, { root: true })
      await flushPromises()

      expect( store.state.MobileModule.actionBar.items.left[0].uuid ).not.toBe( items[0].uuid )
      expect( store.state.MobileModule.actionBar.items.left[1].uuid ).not.toBe( items[1].uuid )
    })

    test('should clone all items from cell to current state', async () => {
      expect.assertions( 3 )

      const items       = [{"name": "logo","icon": "heart-line","uuid": "OsxehBM4D","form": {"logo": "","height": "","retinaLogo": "","options": {"overflowLogo": false}},"originalCoords": {"row": "actionBar","cellPos": "left","cellId": 0}},{"name": "menu","icon": "list","uuid": "5IGRc9msc","form": {"options": {"activeForSubmenuItems": false,"bordersBetweenItems": false,"arrowsForItemsWithSubmenu": false,"foldSubmenusForLast2ItemsToRight": false},"replaceWithMenuIcon": {"label": "Tablet & Mobile","value": "tabletMobile"},"menu": {"label": "-- Default --","value": "0"}},"style": {"linkColor": "#333333","hoverLinkColor": "#0095eb","activeLinkColor": "#0095eb","subBackgroundColor": "#F2F2F2","subLinkColor": "#333333","subHoverLinkColor": "#0095eb","subActiveLinkColor": "#0095eb"},"originalCoords": {"row": "actionBar","cellPos": "left","cellId": 1}},{"name": "menuIcon","icon": "menu","uuid": "ahhvQ8VLi","form": {"icon": [],"menu": "","style": {"label": "Side Slide","value": "sideSlide"}},"style": {"iconColor": "#333333","hoverIconColor": "#0095eb","backgroundColor": "rgba(255,255,255,0)"},"originalCoords": {"row": "actionBar","cellPos": "left","cellId": 2}},{"name": "extras","icon": "plus-squared","uuid": "vZYEcm-6g","form": {"shopIcon": [],"searchStyle": {"label": "Icon","value": "icon"},"searchType": {"label": "Default","value": ""},"wpmlStyle": {"label": "Flags","value": "flags"},"wpmlArrangement": {"label": "List","value": "list"}},"style": {"iconColor": "#333333","hoverColor": "#0095eb"},"originalCoords": {"row": "actionBar","cellPos": "left","cellId": 3}},{"name": "social","icon": "share","uuid": "lC5uvN-IW","form": {"iconsList": [],"openLinksInNewWindow": false},"style": {"iconColor": "#333333","hoverColor": "#0095eb"},"originalCoords": {"row": "actionBar","cellPos": "left","cellId": 4}},{"name": "text","icon": "doc-text","uuid": "8Rg0IA_SE","form": {"text": ""},"style": {"textColor": "#333333","linkColor": "#0095eb","hoverLinkColor": "#007cc3"},"originalCoords": {"row": "actionBar","cellPos": "left","cellId": 5}},{"name": "image","icon": "picture","uuid": "TG-Xf0eih","form": {"link": "","linkClass": "","linkTarget": {"label": "Default | _self","value": ""}},"originalCoords": {"row": "actionBar","cellPos": "left","cellId": 6}},{"name": "icon","icon": "feather","uuid": "lSBlmZMjd","form": {"icon": [],"linkClass": "","linkTarget": {"label": "Default | _self","value": ""}},"style": {"iconColor": "#333333","hoverIconColor": "#0095eb"},"originalCoords": {"row": "actionBar","cellPos": "left","cellId": 7}},{"name": "button","icon": "db-shape","uuid": "kYFw4LR8V","form": {"title": "","link": "","linkClass": "","linkTarget": {"label": "Default | _self","value": ""}},"style": {"textColor": "#333333","buttonColor": "#f7f7f7","hoverTextColor": "#ffffff","hoverButtonColor": "#0095eb"},"originalCoords": {"row": "actionBar","cellPos": "left","cellId": 8}}]
      const spyInactive = jest.spyOn( store._actions[ 'inactiveItems/putItem' ], [0] )
      const spyPush     = jest.spyOn( store._actions[ 'cell/pushItem' ], [0] )
      const payload = {
        from: 'DesktopModule'
      }

      store.dispatch('general/setCurrentStoreModule', { storeModule: 'TabletModule' }, { root: true })
      store.dispatch('general/setCurrentView', { view: 'tablet' }, { root: true })

      store.commit('DesktopModule/UPDATE_BUILDER_CELL', {
        row    : 'actionBar',
        cellPos: 'left',
        item   : items
      }, { root: true })

      store.dispatch( 'grid/clone', payload, { root: true })
      await flushPromises()

      expect( spyInactive ).not.toBeCalled()
      expect( spyPush ).toBeCalledTimes( 9 )
      expect( store.state.TabletModule.actionBar.items.left.length ).toBe( 9 )
    })

    test('should clone row options to current state', async () => {
      expect.assertions( 1 )

      const spy = jest.spyOn( store._actions[ 'grid/copyRowOptions' ], [0] )
      const payload = {
        from: 'DesktopModule'
      }

      store.dispatch( 'grid/clone', payload, { root: true })
      await flushPromises()

      expect( spy ).toBeCalledTimes( 3 )
    })

    test('should set row active if it is on cloned state', async () => {
      expect.assertions( 1 )

      const spy = jest.spyOn( store._actions[ 'ui/setRowActive' ], [0] )
      const payload = {
        from: 'DesktopModule'
      }

      store.dispatch( 'grid/clone', payload, { root: true })
      await flushPromises()

      expect( spy ).toBeCalledTimes( 3 )
    })

    test('should copy grid options', async () => {
      expect.assertions( 1 )

      const spy = jest.spyOn( store._actions[ 'grid/copyOptions' ], [0] )
      const payload = {
        from: 'DesktopModule'
      }

      store.dispatch( 'grid/clone', payload, { root: true })
      await flushPromises()

      expect( spy ).toBeCalledTimes( 1 )
    })

  })

  test('`grid/copyOptions` should copy grid options', async () => {
    expect.assertions( 2 )

    const spy         = jest.spyOn( store._actions[   'grid/copyOptions'                 ], [0] )
    const spyMutation = jest.spyOn( store._mutations[ 'MobileModule/COPY_GRID_OPTIONS' ], [0] )

    const opts = {"gridOptions":{"backgroundColor":"","layout":"full_width","backgroundImage":{"bgImg":"","positionVertical":"center","positionHorizontal":"left","repeat":"repeat","size":"auto"}}}
    const payload = {
      gridOptions: opts
    }

    store.dispatch( 'grid/copyOptions', payload, { root: true })
    await flushPromises()

    expect( spy         ).toBeCalledWith( payload )
    expect( spyMutation ).toBeCalledWith( payload )
  })

  test('`grid/copyRowOptions` should copy row options', async () => {
    expect.assertions( 2 )

    const spy         = jest.spyOn( store._actions[   'grid/copyRowOptions'           ], [0] )
    const spyMutation = jest.spyOn( store._mutations[ 'MobileModule/COPY_ROW_OPTIONS' ], [0] )

    const payload = {
      row: 'actionBar',
      rowOptions: {"backgroundColor":"#8224e3","height":"100"},
    }

    store.dispatch( 'grid/copyRowOptions', payload, { rooot: true })
    await flushPromises()

    expect( spy         ).toBeCalledWith( payload )
    expect( spyMutation ).toBeCalledWith( payload )
  })

})