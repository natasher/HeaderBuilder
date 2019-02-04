import { createLocalVue } from '@vue/test-utils'
import { storeConfig    } from '../../../../src/store/config'
import Vuex          from 'vuex'
import flushPromises from 'flush-promises'
import cloneDeep     from 'lodash.clonedeep'
import _             from 'underscore'

const localVue = createLocalVue()
localVue.prototype.$genid = jest.fn().mockReturnValue( 'addedUUID' )
localVue.use( Vuex )
window._ = _

describe('ACTIONS Cell:', () => {

  let store

  beforeEach(() => {
    const clonedStoreConfig = cloneDeep( storeConfig )
    store = new Vuex.Store( clonedStoreConfig )

    store.dispatch( 'general/setCurrentStoreModule', { storeModule: 'DesktopModule' }, { root: true })
  })

  describe('cell/update', () => {

    test('sets `rootState.general.editorHasChanged` to true', async () => {
      expect.assertions( 1 )
      const payload = {
        row: 'actionBar',
        item: [{ name: 'testItem' }, { name: 'anotherTestItem'}],
        cellPos: 'left',
      }

      store.dispatch( 'cell/update', payload, { root: true })
      await flushPromises()

      expect( store.state.general.editorHasChanged ).toBe( true )
    })

    test('sets provided items to cell given in payload', async () => {
      expect.assertions( 2 )
      const payload = {
        row: 'actionBar',
        item: [{ name: 'testItem' }, { name: 'anotherTestItem'}],
        cellPos: 'left',
      }
      expect( store.state.DesktopModule.actionBar.items.left ).toEqual( [] )

      store.dispatch( 'cell/update', payload, { root: true })
      await flushPromises()

      expect( store.state.DesktopModule.actionBar.items.left ).toBe( payload.item )
    })

  })

  describe('cell/insertItem', () => {

    test('sets `rootState.general.editorHasChanged` to true', async () => {
      expect.assertions( 1 )
      const payload = {
        row: 'actionBar',
        item: {"originalCoords":{"row":"actionBar","cellPos":"left","cellId":0}},
        cellPos: 'left',
        newIndex: 1,
      }

      store.dispatch( 'cell/insertItem', payload, { root: true })
      await flushPromises()

      expect( store.state.general.editorHasChanged ).toBe( true )
    })

    test('sets payload item to given gird cell', async () => {
      expect.assertions( 1 )
      const payload = {
        row: 'actionBar',
        cellPos: 'left',
        item: {
          name: 'testItem',
          originalCoords: { row: 'actionBar', cellPost: 'right', 'cellId': void 0},
          newIndex: 0
        }
      }

      store.dispatch( 'cell/insertItem', payload, { root: true })
      await flushPromises()

      expect( store.state.DesktopModule.actionBar.items.left[0] ).toBe( payload.item )
    })

  })

  describe('cell/removeItem', () => {

    beforeEach(() => {
      const cellContent = [
        {
          "name": "menu",
          "originalCoords": { "row": "actionBar", "cellPos": "left", "cellId": 0 }
        },
        {
          "name": "logo",
          "originalCoords": { "row": "actionBar", "cellPos": "left", "cellId": 1 }
        },
        {
          "name": "extras",
          "originalCoords": { "row": "actionBar", "cellPos": "left", "cellId": 2 }
        }
      ]
      store.commit('DesktopModule/UPDATE_BUILDER_CELL', {
        row     : 'actionBar',
        cellPos : 'left',
        item    : cellContent
      }, { root: true } )
    })

    describe('payload.confirm: true', () => {

      test('invoke window.confirm', async () => {
        expect.assertions( 1 )
        const payload = {
          originalCoords: { "row": "actionBar", "cellPos": "left", "cellId": 1 },

          row     : "actionBar",
          cellId  : 1,
          cellPos : "left",

          confirm : true,
        }
        window.confirm = jest.fn()

        store.dispatch( 'cell/removeItem', payload, { root: true })
        await flushPromises()

        expect( window.confirm ).toBeCalled()
      })

      test('if user refuses to remove item, nothing happens', async () => {
        expect.assertions( 1 )
        const payload = {
          originalCoords: { "row": "actionBar", "cellPos": "left", "cellId": 1 },

          row     : "actionBar",
          cellId  : 1,
          cellPos : "left",

          confirm : true,
        }
        let cell = store.state.DesktopModule.actionBar.items.left
        let itemsCountBefore = cell.length
        window.confirm = jest.fn().mockImplementation(() => { return false })

        store.dispatch( 'cell/removeItem', payload, { root: true })
        await flushPromises()

        expect( cell.length ).toBe( itemsCountBefore )
      })

      test('if user confirm that he want to delete the item, it should be removed', async () => {
        expect.assertions( 2 )
        const payload = {
          originalCoords: { "row": "actionBar", "cellPos": "left", "cellId": 1 },

          row     : "actionBar",
          cellId  : 1,
          cellPos : "left",

          confirm : true,
        }
        let cell             = store.state.DesktopModule.actionBar.items.left
        let itemsCountBefore = cell.length
        let itemToBeRemoved  = cell[ payload.cellId ]

        window.confirm = jest.fn().mockImplementation(() => { return true })

        store.dispatch( 'cell/removeItem', payload, { root: true })
        await flushPromises()

        expect( cell.length ).toBe( itemsCountBefore - 1 )
        expect( cell[ payload.cellId ].name ).not.toBe( itemToBeRemoved.name )
      })

      test('during item removal, call `general/setEditorChanged` and set it to true', async () => {
        expect.assertions( 2 )
        const payload = {
          originalCoords: { "row": "actionBar", "cellPos": "left", "cellId": 1 },

          row     : "actionBar",
          cellId  : 1,
          cellPos : "left",

          confirm : true,
        }
        const spy = jest.spyOn( store._actions[ 'general/setEditorChanged' ], [0] )

        window.confirm = jest.fn().mockImplementation(() => { return true })

        store.dispatch( 'cell/removeItem', payload, { root: true })
        await flushPromises()

        expect( spy ).toBeCalled()
        expect( store.state.general.editorHasChanged ).toBe( true )
      })

    })

    describe('payload.confirm: false', () => {

      test('don`t run window.confirm', async () => {
        expect.assertions( 1 )
        const payload = {
          originalCoords: { "row": "actionBar", "cellPos": "left", "cellId": 1 },

          row     : "actionBar",
          cellId  : 1,
          cellPos : "left",

          confirm : false,
        }
        window.confirm = jest.fn()

        store.dispatch( 'cell/removeItem', payload, { root: true })
        await flushPromises()

        expect( window.confirm ).not.toBeCalled()
      })

      test('this item should be removed', async () => {
        expect.assertions( 2 )
        const payload = {
          originalCoords: { "row": "actionBar", "cellPos": "left", "cellId": 1 },

          row     : "actionBar",
          cellId  : 1,
          cellPos : "left",

          confirm : false,
        }
        let cell             = store.state.DesktopModule.actionBar.items.left
        let itemsCountBefore = cell.length
        let itemToBeRemoved  = cell[ payload.cellId ]

        window.confirm = jest.fn().mockImplementation(() => { return true })

        store.dispatch( 'cell/removeItem', payload, { root: true })
        await flushPromises()

        expect( cell.length ).toBe( itemsCountBefore - 1 )
        expect( cell[ payload.cellId ].name ).not.toBe( itemToBeRemoved.name )
      })

      test('during item removal, call `general/setEditorChanged` to true', async () => {
        expect.assertions( 2 )
        const payload = {
          originalCoords: { "row": "actionBar", "cellPos": "left", "cellId": 1 },

          row     : "actionBar",
          cellId  : 1,
          cellPos : "left",

          confirm : true,
        }
        const spy = jest.spyOn( store._actions[ 'general/setEditorChanged' ], [0] )

        window.confirm = jest.fn().mockImplementation(() => { return true })

        store.dispatch( 'cell/removeItem', payload, { root: true })
        await flushPromises()

        expect( spy ).toBeCalled()
        expect( store.state.general.editorHasChanged ).toBe( true )
      })

    })

  })

  describe('cell/pushItem', () => {

    test('sets `rootState.general.editorHasChanged` to true', async () => {
      expect.assertions( 1 )
      const payload = {
        row    : 'actionBar',
        cellPos: 'left',
        item   : { name: 'testItem' }
      }

      store.dispatch( 'cell/pushItem', payload, { root: true })
      await flushPromises()

      expect( store.state.general.editorHasChanged ).toBe( true )
    })

    test('should adds the item in the end of the cell', async () => {
      expect.assertions( 2 )
      const rowContent = [
        { name: "menu", },
        { name: "logo", },
        { name: "extras", }
      ]
      const initialRowLength = rowContent.length
      store.commit('DesktopModule/UPDATE_BUILDER_CELL', { row: 'actionBar', cellPos: 'left', item: rowContent }, { root: true } )

      const payload = {
        row    : 'actionBar',
        cellPos: 'left',
        item   : { name: 'testItem' }
      }

      store.dispatch( 'cell/pushItem', payload, { root: true })
      await flushPromises()

      expect( store.state.DesktopModule.actionBar.items.left.length ).not.toBe( initialRowLength )
      expect( store.state.DesktopModule.actionBar.items.left[ initialRowLength ] ).toEqual({ name: 'testItem' })
    })

  })

  describe('cell/clear', () => {

    test('should empty cell given in payload', async () => {
      expect.assertions( 2 )
      const rowContent = [
        { name: "menu", },
        { name: "logo", },
        { name: "extras", }
      ]
      const coords = { row: 'actionBar', cellPos: 'left', }
      store.commit('DesktopModule/UPDATE_BUILDER_CELL', { ...coords,  item: rowContent }, { root: true } )

      expect( store.state.DesktopModule.actionBar.items.left.length ).toBe( 3 )

      store.dispatch( 'cell/clear', coords, { root: true })
      await flushPromises()

      expect( store.state.DesktopModule.actionBar.items.left ).toEqual( [] )
    })

  })

  describe('copyRowCellsToAll', () => {

    beforeEach(() => {
      const leftCellItems = [{
        name: "menu",
        icon: "list",
        uuid: "UDiUiusEq",
        form: { "options": { "activeForSubmenuItems": false, "bordersBetweenItems": false, "arrowsForItemsWithSubmenu": false, "foldSubmenusForLast2ItemsToRight": false }, "replaceWithMenuIcon": { "label": "Tablet & Mobile", "value": "tabletMobile" }, "menu": "" },
        style: { "linkColor": "#333333", "hoverLinkColor": "#0095eb", "activeLinkColor": "#0095eb", "subBackgroundColor": "#F2F2F2", "subLinkColor": "#333333", "subHoverLinkColor": "#0095eb", "subActiveLinkColor": "#0095eb" },
        originalCoords: {
          row    : "actionBar",
          cellPos: "left",
          cellId : 0
        }
      }, {
            name: "extras",
            icon: "plus-squared",
            uuid: "kcGwfssNy",
            form: { "shopIcon": [], "searchStyle": { "label": "Icon", "value": "icon" }, "searchType": { "label": "Default", "value": "" }, "wpmlStyle": { "label": "Flags", "value": "flags" }, "wpmlArrangement": { "label": "List", "value": "list" } },
            style: { "iconColor": "#333333", "hoverColor": "#0095eb" },
            originalCoords: {
              row    : "actionBar",
              cellPos: "left",
              cellId : 1
            }
      }]

      const centerCellItems = [{
        name: "image",
        icon: "picture",
        uuid: "eUBejObKP",
        form: { "link": "", "linkClass": "", "linkTarget": { "label": "Default | _self", "value": "" } },
        originalCoords: {
          row    : "actionBar",
          cellPos: "center",
          cellId : 0
        }
      }]

      const rightCellItems = [{
        name: "social",
        icon: "share",
        uuid: "oHadLIZrW",
        form: { "iconsList": [], "openLinksInNewWindow": false },
        style: { "iconColor": "#333333", "hoverColor": "#0095eb" },
        originalCoords: {
          row: "actionBar",
          cellPos: "right",
          cellId: 0
        }
      }, {
          name: "button",
          icon: "db-shape",
          uuid: "wFAueQrZM",
          form: { "title": "", "link": "", "linkClass": "", "linkTarget": { "label": "Default | _self", "value": "" } },
          style: { "textColor": "#333333", "buttonColor": "#f7f7f7", "hoverTextColor": "#ffffff", "hoverButtonColor": "#0095eb" },
          originalCoords: {
            row    : "actionBar",
            cellPos: "right",
            cellId : 1
          }
        }, {
          name: "menu",
          icon: "list",
          uuid: "YmJ5-l_WF",
          form: { "options": { "activeForSubmenuItems": false, "bordersBetweenItems": false, "arrowsForItemsWithSubmenu": false, "foldSubmenusForLast2ItemsToRight": false }, "replaceWithMenuIcon": "tabletMobile", "menu": "" },
          style: { "linkColor": "#333333", "hoverLinkColor": "#0095eb", "activeLinkColor": "#0095eb", "subBackgroundColor": "#F2F2F2", "subLinkColor": "#333333", "subHoverLinkColor": "#0095eb", "subActiveLinkColor": "#0095eb" },
          originalCoords: {
            row    : "actionBar",
            cellPos: "right",
            cellId : 2
          }
        }]

      store.commit('DesktopModule/UPDATE_BUILDER_CELL', {
        row     : 'actionBar',
        cellPos : 'left',
        item    : leftCellItems
      }, { root: true } )
      store.commit('DesktopModule/UPDATE_BUILDER_CELL', {
        row     : 'actionBar',
        cellPos : 'center',
        item    : centerCellItems
      }, { root: true } )
      store.commit('DesktopModule/UPDATE_BUILDER_CELL', {
        row     : 'actionBar',
        cellPos : 'right',
        item    : rightCellItems
      }, { root: true } )
    })

    test('should copy items from `left`, `center`, `right` cell to `all` cell in the same row', async () => {
      const leftCellLength   = store.state.DesktopModule.actionBar.items.left.length
      const centerCellLength = store.state.DesktopModule.actionBar.items.center.length
      const rightCellLength  = store.state.DesktopModule.actionBar.items.right.length
      const joinedLength = leftCellLength + centerCellLength + rightCellLength

      store.dispatch( 'cell/copyRowCellsToAll', { row: 'actionBar' }, { root: true })
      await flushPromises()

      expect( store.state.DesktopModule.actionBar.items.all.length ).toBe( joinedLength )
    })

    test('copied item should has same `name` that origin item', async () => {
      expect.assertions( 6 )

      store.dispatch( 'cell/copyRowCellsToAll', { row: 'actionBar' }, { root: true })
      await flushPromises()

      var allIndex = 0
      store.state.DesktopModule.actionBar.items.left.forEach(( item ) => {
        expect(store.state.DesktopModule.actionBar.items.all[ allIndex ].name).toBe( item.name )
        allIndex++
      })
      store.state.DesktopModule.actionBar.items.center.forEach(( item ) => {
        expect(store.state.DesktopModule.actionBar.items.all[ allIndex ].name).toBe( item.name )
        allIndex++
      })
      store.state.DesktopModule.actionBar.items.right.forEach(( item ) => {
        expect(store.state.DesktopModule.actionBar.items.all[ allIndex ].name).toBe( item.name )
        allIndex++
      })
    })

    test('copied item should has same `icon` that origin item', async () => {
      expect.assertions( 6 )

      store.dispatch( 'cell/copyRowCellsToAll', { row: 'actionBar' }, { root: true })
      await flushPromises()

      var allIndex = 0
      store.state.DesktopModule.actionBar.items.left.forEach(( item ) => {
        expect(store.state.DesktopModule.actionBar.items.all[ allIndex ].icon).toBe( item.icon )
        allIndex++
      })
      store.state.DesktopModule.actionBar.items.center.forEach(( item ) => {
        expect(store.state.DesktopModule.actionBar.items.all[ allIndex ].icon).toBe( item.icon )
        allIndex++
      })
      store.state.DesktopModule.actionBar.items.right.forEach(( item ) => {
        expect(store.state.DesktopModule.actionBar.items.all[ allIndex ].icon).toBe( item.icon )
        allIndex++
      })
    })

    test('copied item should has same `uuid` that origin item', async () => {
      expect.assertions( 6 )

      store.dispatch( 'cell/copyRowCellsToAll', { row: 'actionBar' }, { root: true })
      await flushPromises()

      var allIndex = 0
      store.state.DesktopModule.actionBar.items.left.forEach(( item ) => {
        expect(store.state.DesktopModule.actionBar.items.all[ allIndex ].uuid).toBe( item.uuid )
        allIndex++
      })
      store.state.DesktopModule.actionBar.items.center.forEach(( item ) => {
        expect(store.state.DesktopModule.actionBar.items.all[ allIndex ].uuid).toBe( item.uuid )
        allIndex++
      })
      store.state.DesktopModule.actionBar.items.right.forEach(( item ) => {
        expect(store.state.DesktopModule.actionBar.items.all[ allIndex ].uuid).toBe( item.uuid )
        allIndex++
      })
    })

    test('copied item should persist its original `row`', async () => {
      expect.assertions( 6 )

      store.dispatch( 'cell/copyRowCellsToAll', { row: 'actionBar' }, { root: true })
      await flushPromises()

      var allIndex = 0
      store.state.DesktopModule.actionBar.items.left.forEach(( item ) => {
        expect(store.state.DesktopModule.actionBar.items.all[allIndex].originalCoords.row)
          .toBe(item.originalCoords.row)
        allIndex++
      })
      store.state.DesktopModule.actionBar.items.center.forEach(( item ) => {
        expect(store.state.DesktopModule.actionBar.items.all[allIndex].originalCoords.row)
          .toBe(item.originalCoords.row)
        allIndex++
      })
      store.state.DesktopModule.actionBar.items.right.forEach(( item ) => {
        expect(store.state.DesktopModule.actionBar.items.all[allIndex].originalCoords.row)
          .toBe(item.originalCoords.row)
        allIndex++
      })
    })

    test('copied item should persist its original `cell position`', async () => {
      expect.assertions( 6 )

      store.dispatch( 'cell/copyRowCellsToAll', { row: 'actionBar' }, { root: true })
      await flushPromises()

      var allIndex = 0
      store.state.DesktopModule.actionBar.items.left.forEach(( item ) => {
        expect(store.state.DesktopModule.actionBar.items.all[allIndex].originalCoords.cellPos)
          .toBe(item.originalCoords.cellPos)
        allIndex++
      })
      store.state.DesktopModule.actionBar.items.center.forEach(( item ) => {
        expect(store.state.DesktopModule.actionBar.items.all[allIndex].originalCoords.cellPos)
          .toBe(item.originalCoords.cellPos)
        allIndex++
      })
      store.state.DesktopModule.actionBar.items.right.forEach(( item ) => {
        expect(store.state.DesktopModule.actionBar.items.all[allIndex].originalCoords.cellPos)
          .toBe(item.originalCoords.cellPos)
        allIndex++
      })
    })

    test('copied item should persist its original `cell index`', async () => {
      expect.assertions( 6 )

      store.dispatch( 'cell/copyRowCellsToAll', { row: 'actionBar' }, { root: true })
      await flushPromises()

      var allIndex = 0
      store.state.DesktopModule.actionBar.items.left.forEach(( item ) => {
        expect(store.state.DesktopModule.actionBar.items.all[allIndex].originalCoords.cellId)
          .toBe(item.originalCoords.cellId)
        allIndex++
      })
      store.state.DesktopModule.actionBar.items.center.forEach(( item ) => {
        expect(store.state.DesktopModule.actionBar.items.all[allIndex].originalCoords.cellId)
          .toBe(item.originalCoords.cellId)
        allIndex++
      })
      store.state.DesktopModule.actionBar.items.right.forEach(( item ) => {
        expect(store.state.DesktopModule.actionBar.items.all[allIndex].originalCoords.cellId)
          .toBe(item.originalCoords.cellId)
        allIndex++
      })
    })

  })

  describe('cell/onChange', () => {

    describe('`all` cell has changed', () => {
      let joinedItems
      let leftCellItems
      let centerCellItems
      let rightCellItems

      beforeEach(() => {
        leftCellItems = [{
          name: "menu",
          icon: "list",
          uuid: "UDiUiusEq",
          form: { "options": { "activeForSubmenuItems": false, "bordersBetweenItems": false, "arrowsForItemsWithSubmenu": false, "foldSubmenusForLast2ItemsToRight": false }, "replaceWithMenuIcon": { "label": "Tablet & Mobile", "value": "tabletMobile" }, "menu": "" },
          style: { "linkColor": "#333333", "hoverLinkColor": "#0095eb", "activeLinkColor": "#0095eb", "subBackgroundColor": "#F2F2F2", "subLinkColor": "#333333", "subHoverLinkColor": "#0095eb", "subActiveLinkColor": "#0095eb" },
          originalCoords: {
            row    : "actionBar",
            cellPos: "left",
            cellId : 0
          }
        }, {
              name: "extras",
              icon: "plus-squared",
              uuid: "kcGwfssNy",
              form: { "shopIcon": [], "searchStyle": { "label": "Icon", "value": "icon" }, "searchType": { "label": "Default", "value": "" }, "wpmlStyle": { "label": "Flags", "value": "flags" }, "wpmlArrangement": { "label": "List", "value": "list" } },
              style: { "iconColor": "#333333", "hoverColor": "#0095eb" },
              originalCoords: {
                row    : "actionBar",
                cellPos: "left",
                cellId : 1
              }
        }]

        centerCellItems = [{
          name: "image",
          icon: "picture",
          uuid: "eUBejObKP",
          form: { "link": "", "linkClass": "", "linkTarget": { "label": "Default | _self", "value": "" } },
          originalCoords: {
            row    : "actionBar",
            cellPos: "center",
            cellId : 0
          }
        }]

        rightCellItems = [{
          name: "social",
          icon: "share",
          uuid: "oHadLIZrW",
          form: { "iconsList": [], "openLinksInNewWindow": false },
          style: { "iconColor": "#333333", "hoverColor": "#0095eb" },
          originalCoords: {
            row: "actionBar",
            cellPos: "right",
            cellId: 0
          }
        }, {
            name: "button",
            icon: "db-shape",
            uuid: "wFAueQrZM",
            form: { "title": "", "link": "", "linkClass": "", "linkTarget": { "label": "Default | _self", "value": "" } },
            style: { "textColor": "#333333", "buttonColor": "#f7f7f7", "hoverTextColor": "#ffffff", "hoverButtonColor": "#0095eb" },
            originalCoords: {
              row    : "actionBar",
              cellPos: "right",
              cellId : 1
            }
          }, {
            name: "menu",
            icon: "list",
            uuid: "YmJ5-l_WF",
            form: { "options": { "activeForSubmenuItems": false, "bordersBetweenItems": false, "arrowsForItemsWithSubmenu": false, "foldSubmenusForLast2ItemsToRight": false }, "replaceWithMenuIcon": "tabletMobile", "menu": "" },
            style: { "linkColor": "#333333", "hoverLinkColor": "#0095eb", "activeLinkColor": "#0095eb", "subBackgroundColor": "#F2F2F2", "subLinkColor": "#333333", "subHoverLinkColor": "#0095eb", "subActiveLinkColor": "#0095eb" },
            originalCoords: {
              row    : "actionBar",
              cellPos: "right",
              cellId : 2
            }
          }]

        store.commit('DesktopModule/UPDATE_BUILDER_CELL', {
          row     : 'actionBar',
          cellPos : 'left',
          item    : leftCellItems
        }, { root: true } )
        store.commit('DesktopModule/UPDATE_BUILDER_CELL', {
          row     : 'actionBar',
          cellPos : 'center',
          item    : centerCellItems
        }, { root: true } )
        store.commit('DesktopModule/UPDATE_BUILDER_CELL', {
          row     : 'actionBar',
          cellPos : 'right',
          item    : rightCellItems
        }, { root: true } )

        joinedItems = [ ...leftCellItems, ...centerCellItems, ...rightCellItems ]

        store.commit('DesktopModule/UPDATE_BUILDER_CELL', {
          row    : 'actionBar',
          cellPos: 'all',
          item   : joinedItems,
        })
      })

      describe('user adds item', () => {

        test('call `uuid/assign`', async () => {
          const payload = {
            event: {
              added: {
                element: {
                  name: "menuIcon",
                  icon: "menu",
                  uuid: "addeduuid",
                },
                newIndex: 4
              }
            },
            row     : 'actionBar',
            cellPos : 'all',
            tmpItems: joinedItems,
          }
          const spy = jest.spyOn( store._actions[ 'uuid/assign' ], [0] )

          store.dispatch( 'cell/onChange', payload, { root: true })
          await flushPromises()

          expect(spy).toBeCalledWith(
            {
              itemUuid: 'addeduuid'
            })
        })

        test('if added Item has empty uuid, attach new one', async () => {
          const payload = {
            event: {
              added: {
                element: {
                  name: "menuIcon",
                  icon: "menu",
                  uuid: "",
                },
                newIndex: 4
              }
            },
            row     : 'actionBar',
            cellPos : 'all',
            tmpItems: joinedItems,
          }

          const spy = jest.spyOn( store._actions[ 'cell/pushItem' ], [0] )

          store.dispatch( 'cell/onChange', payload, { root: true })
          await flushPromises()

          expect(spy).toBeCalledWith(
            {
              cellPos: 'left',
              row    : 'actionBar',
              item: {
                name: "menuIcon",
                icon: "menu",
                uuid: "addedUUID",
                originalCoords: {
                  cellId : 2,
                  cellPos: 'left',
                  row    : 'actionBar'
                }
              }
            })
        })

        test('should push the item to the end of `left` cell in joined row', async () => {
          const payload = {
            event: {
              added: {
                element: {
                  name: "menuIcon",
                  icon: "menu",
                  uuid: "addedUUID",
                },
                newIndex: 4
              }
            },
            row     : 'actionBar',
            cellPos : 'all',
            tmpItems: joinedItems,
          }
          const spy = jest.spyOn( store._actions[ 'cell/pushItem' ], [0] )

          store.dispatch( 'cell/onChange', payload, { root: true })
          await flushPromises()

          expect(spy).toBeCalledWith(
            {
              item: {
                ...payload.event.added.element,
                originalCoords: {
                  cellId : 2,
                  cellPos: 'left',
                  row    : payload.row
                }
              },
              cellPos: 'left',
              row: payload.row
            })

          const lastInLeftCell = [ ...leftCellItems ].pop()

          expect( lastInLeftCell.uuid ).toBe( 'addedUUID' )
        })

        test('should insert the item to the `all` cell at given index', async () => {
          const payload = {
            event: {
              added: {
                element: {
                  name: "menuIcon",
                  icon: "menu",
                  uuid: "addedUUID",
                },
                newIndex: 4
              }
            },
            row     : 'actionBar',
            cellPos : 'all',
            tmpItems: joinedItems,
          }
          const spy = jest.spyOn( store._actions[ 'cell/insertItem' ], [0] )

          store.dispatch( 'cell/onChange', payload, { root: true })
          await flushPromises()

          expect(spy).toBeCalledWith(
            {
              item: {
                ...payload.event.added.element,
                originalCoords: {
                  cellId : leftCellItems.length -1,
                  cellPos: 'left',
                  row    : 'actionBar'
                }
              },
              cellPos : payload.cellPos,
              row     : payload.row,
              newIndex: payload.event.added.newIndex
            })

          expect( store.state.DesktopModule.actionBar.items.all[ payload.event.added.newIndex ].uuid )
            .toBe( 'addedUUID' )
        })

        test('`all` row item should not contain form and style', async () => {
          const payload = {
            event: {
              added: {
                element: {
                  name: "menuIcon",
                  icon: "menu",
                  uuid: "addedUUID",
                  form: {
                    testField: 'testForm'
                  },
                  style: {
                    testField: 'testStyle'
                  }
                },
                newIndex: 4
              }
            },
            row     : 'actionBar',
            cellPos : 'all',
            tmpItems: joinedItems,
          }
          const spy = jest.spyOn( store._actions[ 'cell/insertItem' ], [0] )

          store.dispatch( 'cell/onChange', payload, { root: true })
          await flushPromises()

          delete payload.event.added.element.form
          delete payload.event.added.element.style

          expect(spy).toBeCalledWith(
            {
              item: {
                ...payload.event.added.element,
                originalCoords: {
                  cellId : leftCellItems.length -1,
                  cellPos: 'left',
                  row    : 'actionBar'
                }
              },
              cellPos : payload.cellPos,
              row     : payload.row,
              newIndex: payload.event.added.newIndex
            })
        })

      })

      describe('user moves item inside the cell', async () => {

        test('call `cell/update` actions', async () => {
          const payload = {
            event: {
              moved: {
                element: {
                  name: "button",
                  uuid: "wFAueQrZM",
                },
                oldIndex: 1,
                newIndex: 5
              }
            },
            row     : 'actionBar',
            cellPos : 'all',
            tmpItems: joinedItems,
          }
          const spy = jest.spyOn( store._actions[ 'cell/update' ], [0] )

          store.dispatch( 'cell/onChange', payload, { root: true })
          await flushPromises()

          expect(spy).toBeCalled()
        })

      })

      describe('user removes item from the cell', () => {

        test('call `cell/removeItem`', async () => {
          const payload = {
            event: {
              removed: {
                element: {
                  originalCoords: {
                    row    : 'actionBar',
                    cellPos: 'right',
                    cellId : 2
                  }
                },
                oldIndex: 6
              }
            },
            row     : 'actionBar',
            cellPos : 'all',
            tmpItems: joinedItems,
          }
          const spy = jest.spyOn( store._actions[ 'cell/removeItem' ], [0] )

          store.dispatch( 'cell/onChange', payload, { root: true })
          await flushPromises()

          expect(spy).toBeCalled()
        })

      })

    })

    describe('cell other then `all` has changed', () => {
      let joinedItems
      let testCellItems
      let rightCellItems

      beforeEach(() => {
        testCellItems = [{
          name: "menu",
          icon: "list",
          uuid: "UDiUiusEq",
          form: { "options": { "activeForSubmenuItems": false, "bordersBetweenItems": false, "arrowsForItemsWithSubmenu": false, "foldSubmenusForLast2ItemsToRight": false }, "replaceWithMenuIcon": { "label": "Tablet & Mobile", "value": "tabletMobile" }, "menu": "" },
          style: { "linkColor": "#333333", "hoverLinkColor": "#0095eb", "activeLinkColor": "#0095eb", "subBackgroundColor": "#F2F2F2", "subLinkColor": "#333333", "subHoverLinkColor": "#0095eb", "subActiveLinkColor": "#0095eb" },
          originalCoords: {
            row    : "actionBar",
            cellPos: "left",
            cellId : 5
          }
        }, {
              name: "extras",
              icon: "plus-squared",
              uuid: "kcGwfssNy",
              form: { "shopIcon": [], "searchStyle": { "label": "Icon", "value": "icon" }, "searchType": { "label": "Default", "value": "" }, "wpmlStyle": { "label": "Flags", "value": "flags" }, "wpmlArrangement": { "label": "List", "value": "list" } },
              style: { "iconColor": "#333333", "hoverColor": "#0095eb" },
              originalCoords: {
                row    : "actionBar",
                cellPos: "left",
                cellId : 2
              }
        }]

        rightCellItems = [{
          name: "social",
          icon: "share",
          uuid: "oHadLIZrW",
          form: { "iconsList": [], "openLinksInNewWindow": false },
          style: { "iconColor": "#333333", "hoverColor": "#0095eb" },
          originalCoords: {
            row: "actionBar",
            cellPos: "right",
            cellId: 0
          }
        }, {
            name: "button",
            icon: "db-shape",
            uuid: "wFAueQrZM",
            form: { "title": "", "link": "", "linkClass": "", "linkTarget": { "label": "Default | _self", "value": "" } },
            style: { "textColor": "#333333", "buttonColor": "#f7f7f7", "hoverTextColor": "#ffffff", "hoverButtonColor": "#0095eb" },
            originalCoords: {
              row    : "actionBar",
              cellPos: "right",
              cellId : 1
            }
          }, {
            name: "menu",
            icon: "list",
            uuid: "YmJ5-l_WF",
            form: { "options": { "activeForSubmenuItems": false, "bordersBetweenItems": false, "arrowsForItemsWithSubmenu": false, "foldSubmenusForLast2ItemsToRight": false }, "replaceWithMenuIcon": "tabletMobile", "menu": "" },
            style: { "linkColor": "#333333", "hoverLinkColor": "#0095eb", "activeLinkColor": "#0095eb", "subBackgroundColor": "#F2F2F2", "subLinkColor": "#333333", "subHoverLinkColor": "#0095eb", "subActiveLinkColor": "#0095eb" },
            originalCoords: {
              row    : "actionBar",
              cellPos: "right",
              cellId : 2
            }
          }]

        store.commit('DesktopModule/UPDATE_BUILDER_CELL', {
          row     : 'actionBar',
          cellPos : 'right',
          item    : rightCellItems
        }, { root: true } )

      })

      describe('user adds item', () => {

        test('call `uuid/assign`', async () => {
          const payload = {
            event: {
              added: {
                element: {
                  name: "menuIcon",
                  icon: "menu",
                  uuid: "addeduuid",
                },
                newIndex: 2
              }
            },
            row     : 'actionBar',
            cellPos : 'right',
            tmpItems: rightCellItems,
          }
          const spy = jest.spyOn( store._actions[ 'uuid/assign' ], [0] )

          store.dispatch( 'cell/onChange', payload, { root: true })
          await flushPromises()

          expect(spy).toBeCalledWith(
            {
              itemUuid: 'addeduuid'
            })
        })

        test('if added Item has empty uuid, attach new one', async () => {
          const payload = {
            event: {
              added: {
                element: {
                  name: "menuIcon",
                  icon: "menu",
                  uuid: "",
                },
                newIndex: 2
              }
            },
            row     : 'actionBar',
            cellPos : 'right',
            tmpItems: rightCellItems,
          }

          const spy = jest.spyOn( store._actions[ 'cell/insertItem' ], [0] )

          store.dispatch( 'cell/onChange', payload, { root: true })
          await flushPromises()

          expect(spy).toBeCalledWith(
            {
              cellPos: payload.cellPos,
              row    : payload.row,
              newIndex: 2,
              item: {
                name: 'menuIcon',
                icon: 'menu',
                uuid: 'addedUUID',
                originalCoords: {
                  cellId : 2,
                  cellPos: payload.cellPos,
                  row    : payload.row
                }
              }
            })
        })

        test('should insert the item to the cell at given index', async () => {
          const payload = {
            event: {
              added: {
                element: {
                  name: "menuIcon",
                  icon: "menu",
                  uuid: "addedUUID",
                },
                newIndex: 1
              }
            },
            row     : 'actionBar',
            cellPos : 'right',
            tmpItems: rightCellItems,
          }
          const spy = jest.spyOn( store._actions[ 'cell/insertItem' ], [0] )

          store.dispatch( 'cell/onChange', payload, { root: true })
          await flushPromises()

          expect(spy).toBeCalledWith(
            {
              item: {
                ...payload.event.added.element,
                originalCoords: {
                  cellId : payload.event.added.newIndex,
                  cellPos: payload.cellPos,
                  row    : payload.row
                }
              },
              cellPos : payload.cellPos,
              row     : payload.row,
              newIndex: payload.event.added.newIndex
            })

          expect( store.state.DesktopModule.actionBar.items.right[ payload.event.added.newIndex ].uuid )
            .toBe( 'addedUUID' )
        })

      })

      describe('user moves item inside the cell', async () => {

        test('call `cell/update` actions', async () => {
          const payload = {
            event: {
              moved: {
                element: {
                  name: "button",
                  uuid: "wFAueQrZM",
                },
                oldIndex: 1,
                newIndex: 5
              }
            },
            row     : 'actionBar',
            cellPos : 'right',
            tmpItems: rightCellItems,
          }
          const spy = jest.spyOn( store._actions[ 'cell/update' ], [0] )

          store.dispatch( 'cell/onChange', payload, { root: true })
          await flushPromises()

          expect(spy).toBeCalled()
        })

        test('should renumber `item.originalCoords.cellId`', async () => {
          expect.assertions( 2 )
          const payload = {
            event: {
              moved: {}
            },
            row     : 'actionBar',
            cellPos : 'right',
            tmpItems: testCellItems,
          }

          store.dispatch( 'cell/onChange', payload, { root: true })
          await flushPromises()

          store.state.DesktopModule.actionBar.items.right.forEach((item, index) => {
            expect( item.originalCoords.cellId ).toBe( index )
          })
        })

      })

      describe('user removes item from the cell', () => {

        test('call `cell/removeItem`', async () => {
          const payload = {
            event: {
              removed: {
                element: {
                  originalCoords: {
                    row    : 'actionBar',
                    cellPos: 'right',
                    cellId : 1
                  }
                },
                oldIndex: 1
              }
            },
            row     : 'actionBar',
            cellPos : 'right',
            tmpItems: joinedItems,
          }
          const spy = jest.spyOn( store._actions[ 'cell/removeItem' ], [0] )
          store.dispatch( 'cell/onChange', payload, { root: true })
          await flushPromises()

          expect(spy).toBeCalled()
        })

      })

    })

  })

})