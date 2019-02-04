import mutations from '../../../../src/store/modules/Tablet/TabletMutations'

describe('TabletMUTATIONS module:', () => {

  test('SET_STATE copies new state to desktop state', () => {
    const state = {
      test1: 'value1',
      test2: {
        nested: 'nested value'
      }
    }
    const newState = {
      test1: 'TEST',
      test2: [ 'test', 'test1' ]
    }

    mutations.SET_STATE( state, { new_state: newState })
    expect( state ).toEqual( newState )
  })

  describe('SET_GRID_OPTIONS_VALUE', () => {

    test('sets state.grid.options[ name ][ position ] if name, position payload exists', () => {
      const state = {
        grid: {
          options: {
            testfield: {
              testposition: 0
            }
          }
        }
      }
      const newValue = 666

      mutations.SET_GRID_OPTIONS_VALUE(state, { name: 'testfield', position: 'testposition', value: newValue })
      expect(state.grid.options.testfield.testposition).toBe(newValue)
    })

    test('sets state.grid.options[ name ] if position is not provided', () => {
      const state = {
        grid: {
          options: {
            testfield: 0
          }
        }
      }
      const newValue = 666

      mutations.SET_GRID_OPTIONS_VALUE(state, { name: 'testfield', value: newValue })
      expect(state.grid.options.testfield).toBe(newValue)
    })

  })

  test('SET_ROW_OPTIONS_VALUE sets state[ row ]options[ name ]', () => {
    const state = {
      testRow: {
        options: {
          testfield: ''
        }
      }
    }
    const newValue = 'TEST'

    mutations.SET_ROW_OPTIONS_VALUE(state, { name: 'testfield', row: 'testRow', value: newValue })
    expect( state.testRow.options.testfield ).toBe( newValue )
  })

  test('SET_LAYOUT_POSITION sets state.layoutPosition', () => {
    const state = {
      layoutPosition: 'top'
    }
    const newValue = 'behind'

    mutations.SET_LAYOUT_POSITION(state, { position: newValue })
    expect( state.layoutPosition ).toBe( newValue )
  })

  test('SET_ROW_ACTIVE sets state[ row ]active', () => {
    const state = {
      imaginaryRow: {
        active: false
      }
    }
    const newValue = 'schrodinger cat'

    mutations.SET_ROW_ACTIVE( state, { row: 'imaginaryRow', active: newValue })
    expect( state.imaginaryRow.active ).toBe( newValue )
  })

  test('TOGGLE_ACTION_BAR_FLAG changes state.actionBar.active from false to true and otherwise', () => {
    expect.assertions( 2 )

    const state = {
      actionBar: {
        active: false
      }
    }

    mutations.TOGGLE_ACTION_BAR_FLAG( state )
    expect( state.actionBar.active ).toBeTruthy()

    mutations.TOGGLE_ACTION_BAR_FLAG( state )
    expect( state.actionBar.active ).toBeFalsy()
  })

  test('TOGGLE_SECOND_ROW_FLAG changes state.secondRow.active from false to true and otherwise', () => {
    expect.assertions( 2 )

    const state = {
      secondRow: {
        active: false
      }
    }

    mutations.TOGGLE_SECOND_ROW_FLAG( state )
    expect( state.secondRow.active ).toBeTruthy()

    mutations.TOGGLE_SECOND_ROW_FLAG( state )
    expect( state.secondRow.active ).toBeFalsy()
  })

  test('SET_GRID_STATUS sets state.grid.status', () => {
    const state = {
      grid: {
        status: 'custom',
      }
    }
    const newValue = 'off'

    mutations.SET_GRID_STATUS( state, { status: newValue })
    expect( state.grid.status ).toBe( newValue )
  })

  test('UPDATE_BUILDER_CELL sets array of items as cell (from draggable)', () => {
    const state = {
      imaginaryRow: {
        items: {
          testPosition: []
        }
      }
    }
    const sortableItems = [{ item1: 'test1' }, { item2: 'test2' }]

    mutations.UPDATE_BUILDER_CELL( state, { row: 'imaginaryRow', cellPos: 'testPosition', item: sortableItems })
    expect( state.imaginaryRow.items.testPosition ).toEqual( sortableItems )
  })

  test('PUSH_TO_BUILDER_CELL pushes new item to provided cell', () => {
    const newItems = [{ item1: 'test1' }, { item2: 'test2' }, { item3: 'test3' }]
    const state = {
      imaginaryRow: {
        items: {
          imaginaryPosition: []
        }
      }
    }

    mutations.PUSH_TO_BUILDER_CELL( state, { row: 'imaginaryRow', cellPos: 'imaginaryPosition', item: newItems[ 0 ] })
    expect( state.imaginaryRow.items.imaginaryPosition.length ).toBe( 1 )

    mutations.PUSH_TO_BUILDER_CELL( state, { row: 'imaginaryRow', cellPos: 'imaginaryPosition', item: newItems[ 1 ] })
    mutations.PUSH_TO_BUILDER_CELL( state, { row: 'imaginaryRow', cellPos: 'imaginaryPosition', item: newItems[ 2 ] })
    expect( state.imaginaryRow.items.imaginaryPosition ).toEqual( newItems )
  })

  test('CLEAR_CELL sets state[ row ][ items ][ cellPos ] to empty array', () => {
    const state = {
      imaginaryRow: {
        items: {
          imaginaryPosition: [ 'some shit', 'other shit', 'joker' ]
        }
      }
    }

    mutations.CLEAR_CELL( state, { row: 'imaginaryRow', cellPos: 'imaginaryPosition' })
    expect( state.imaginaryRow.items.imaginaryPosition ).toEqual( [] )
  })

  describe('REMOVE_ITEM_FROM_CELL', () => {

    test('remove object at given index from state[ row ][ items ][ cellPos ]', () => {
      expect.assertions(2)

      const state = {
        row: {
          items: {
            cell: [
              { "name": "logo", "icon": "heart-line", "form": { "logo": "http://muffingroup.com/dev8624/artur/wp-content/uploads/2017/06/photography5.jpeg", "height": "30", "retinaLogo": "http://muffingroup.com/dev8624/artur/wp-content/uploads/2017/06/photography4.jpeg", "options": { "overflowLogo": true } }, "originalCoords": { "row": "firstRow", "cellPos": "left", "cellId": 0 } },
              { "name": "extras", "icon": "plus-squared", "form": { "shopIcon": "icon-up-dir", "searchStyle": "field", "searchType": "products", "wpmlStyle": "langName", "wpmlArrangement": "list" }, "originalCoords": { "row": "firstRow", "cellPos": "left", "cellId": 1 } },
              { "name": "menuTEST", "icon": "list", "form": { "options": { "activeForSubmenuItems": false, "bordersBetweenItems": false, "arrowsForItemsWithSubmenu": false, "foldSubmenusForLast2ItemsToRight": false }, "replaceWithMenuIcon": "tabletMobile", "menu": "2" }, "originalCoords": { "row": "firstRow", "cellPos": "left", "cellId": 2 } },
              { "name": "extras", "icon": "plus-squared", "form": { "shopIcon": [], "searchStyle": "icon", "wpmlStyle": "flags", "wpmlArrangement": "list", "searchType": { "label": "Default", "value": "" } }, "style": { "iconColor": "#333333", "hoverColor": "#0095eb" }, "originalCoords": { "row": "firstRow", "cellPos": "left", "cellId": 3 } },
              { "name": "menu", "icon": "list", "form": { "options": { "activeForSubmenuItems": false, "bordersBetweenItems": false, "arrowsForItemsWithSubmenu": false, "foldSubmenusForLast2ItemsToRight": false }, "replaceWithMenuIcon": "tabletMobile", "menu": "0" }, "style": { "linkColor": "#333333", "hoverLinkColor": "#0095eb", "activeLinkColor": "#0095eb", "subBackgroundColor": "#e15f5f", "subLinkColor": "#333333", "subHoverLinkColor": "#0095eb", "subActiveLinkColor": "#0095eb" }, "originalCoords": { "row": "firstRow", "cellPos": "left", "cellId": 4 } }
            ]
          }
        }
      }
      const itemOriginalCoords = {
        row: 'row',
        cellPos: 'cell',
        cellId: 2
      }

      mutations.REMOVE_ITEM_FROM_CELL(state, { row: 'row', cellPos: 'cell', cellId: 2, originalCoords: itemOriginalCoords })
      expect(state.row.items.cell.length).toBe(4)
      expect(state.row.items.cell).not.toContainEqual({ "name": "menuTEST", "icon": "list", "form": { "options": { "activeForSubmenuItems": false, "bordersBetweenItems": false, "arrowsForItemsWithSubmenu": false, "foldSubmenusForLast2ItemsToRight": false }, "replaceWithMenuIcon": "tabletMobile", "menu": "2" }, "originalCoords": { "row": "firstRow", "cellPos": "left", "cellId": 2 } })
    })

    test('should renumber originanCoords.cellId to match order in cell', () => {
      expect.assertions(4)
      const state = {
        row: {
          items: {
            cell: [
              { "name": "logo", "icon": "heart-line", "form": { "logo": "http://muffingroup.com/dev8624/artur/wp-content/uploads/2017/06/photography5.jpeg", "height": "30", "retinaLogo": "http://muffingroup.com/dev8624/artur/wp-content/uploads/2017/06/photography4.jpeg", "options": { "overflowLogo": true } }, "originalCoords": { "row": "firstRow", "cellPos": "left", "cellId": 0 } },
              { "name": "extras", "icon": "plus-squared", "form": { "shopIcon": "icon-up-dir", "searchStyle": "field", "searchType": "products", "wpmlStyle": "langName", "wpmlArrangement": "list" }, "originalCoords": { "row": "firstRow", "cellPos": "left", "cellId": 1 } },
              { "name": "menuTEST", "icon": "list", "form": { "options": { "activeForSubmenuItems": false, "bordersBetweenItems": false, "arrowsForItemsWithSubmenu": false, "foldSubmenusForLast2ItemsToRight": false }, "replaceWithMenuIcon": "tabletMobile", "menu": "2" }, "originalCoords": { "row": "firstRow", "cellPos": "left", "cellId": 2 } },
              { "name": "extras", "icon": "plus-squared", "form": { "shopIcon": [], "searchStyle": "icon", "wpmlStyle": "flags", "wpmlArrangement": "list", "searchType": { "label": "Default", "value": "" } }, "style": { "iconColor": "#333333", "hoverColor": "#0095eb" }, "originalCoords": { "row": "firstRow", "cellPos": "left", "cellId": 3 } },
              { "name": "menu", "icon": "list", "form": { "options": { "activeForSubmenuItems": false, "bordersBetweenItems": false, "arrowsForItemsWithSubmenu": false, "foldSubmenusForLast2ItemsToRight": false }, "replaceWithMenuIcon": "tabletMobile", "menu": "0" }, "style": { "linkColor": "#333333", "hoverLinkColor": "#0095eb", "activeLinkColor": "#0095eb", "subBackgroundColor": "#e15f5f", "subLinkColor": "#333333", "subHoverLinkColor": "#0095eb", "subActiveLinkColor": "#0095eb" }, "originalCoords": { "row": "firstRow", "cellPos": "left", "cellId": 4 } }
            ]
          }
        }
      }
      const itemOriginalCoords = {
        row: 'row',
        cellPos: 'cell',
        cellId: 2
      }

      mutations.REMOVE_ITEM_FROM_CELL(state, { row: 'row', cellPos: 'cell', cellId: 2, originalCoords: itemOriginalCoords })
      state.row.items.cell.forEach((item, number) => {
        expect(item.originalCoords.cellId).toBe(number)
      })
    })

    test('remove object from `all` cell', () => {
      expect.assertions(2)

      const state = {
        row: {
          items: {
            cell: [
              { "name": "logo", "icon": "heart-line", "form": { "logo": "http://muffingroup.com/dev8624/artur/wp-content/uploads/2017/06/photography5.jpeg", "height": "30", "retinaLogo": "http://muffingroup.com/dev8624/artur/wp-content/uploads/2017/06/photography4.jpeg", "options": { "overflowLogo": true } }, "originalCoords": { "row": "firstRow", "cellPos": "left", "cellId": 0 } },
              { "name": "extras", "icon": "plus-squared", "form": { "shopIcon": "icon-up-dir", "searchStyle": "field", "searchType": "products", "wpmlStyle": "langName", "wpmlArrangement": "list" }, "originalCoords": { "row": "firstRow", "cellPos": "left", "cellId": 1 } },
              { "name": "menuTEST", "icon": "list", "form": { "options": { "activeForSubmenuItems": false, "bordersBetweenItems": false, "arrowsForItemsWithSubmenu": false, "foldSubmenusForLast2ItemsToRight": false }, "replaceWithMenuIcon": "tabletMobile", "menu": "2" }, "originalCoords": { "row": "firstRow", "cellPos": "left", "cellId": 2 } },
              { "name": "extras", "icon": "plus-squared", "form": { "shopIcon": [], "searchStyle": "icon", "wpmlStyle": "flags", "wpmlArrangement": "list", "searchType": { "label": "Default", "value": "" } }, "style": { "iconColor": "#333333", "hoverColor": "#0095eb" }, "originalCoords": { "row": "firstRow", "cellPos": "left", "cellId": 3 } },
              { "name": "menu", "icon": "list", "form": { "options": { "activeForSubmenuItems": false, "bordersBetweenItems": false, "arrowsForItemsWithSubmenu": false, "foldSubmenusForLast2ItemsToRight": false }, "replaceWithMenuIcon": "tabletMobile", "menu": "0" }, "style": { "linkColor": "#333333", "hoverLinkColor": "#0095eb", "activeLinkColor": "#0095eb", "subBackgroundColor": "#e15f5f", "subLinkColor": "#333333", "subHoverLinkColor": "#0095eb", "subActiveLinkColor": "#0095eb" }, "originalCoords": { "row": "firstRow", "cellPos": "left", "cellId": 4 } }
            ]
          }
        }
      }
      const itemOriginalCoords = {
        row: 'row',
        cellPos: 'cell',
        cellId: 2
      }

      mutations.REMOVE_ITEM_FROM_CELL(state, { row: 'row', cellPos: 'cell', cellId: 3, originalCoords: itemOriginalCoords })

      expect(state.row.items.cell.length).toBe(4)
      expect(state.row.items.cell).not.toContainEqual({ "name": "extras", "icon": "plus-squared", "form": { "shopIcon": [], "searchStyle": "icon", "wpmlStyle": "flags", "wpmlArrangement": "list", "searchType": { "label": "Default", "value": "" } }, "style": { "iconColor": "#333333", "hoverColor": "#0095eb" }, "originalCoords": { "row": "firstRow", "cellPos": "left", "cellId": 3 } })
    })

    // FIXME: is it redundant??
    test('should renumber cellId`s to match order in cell', () => {
      const state = {
        row: {
          items: {
            cell: [
              { "name": "logo", "icon": "heart-line", "form": { "logo": "http://muffingroup.com/dev8624/artur/wp-content/uploads/2017/06/photography5.jpeg", "height": "30", "retinaLogo": "http://muffingroup.com/dev8624/artur/wp-content/uploads/2017/06/photography4.jpeg", "options": { "overflowLogo": true } }, "originalCoords": { "row": "firstRow", "cellPos": "left", "cellId": 0 } },
              { "name": "extras", "icon": "plus-squared", "form": { "shopIcon": "icon-up-dir", "searchStyle": "field", "searchType": "products", "wpmlStyle": "langName", "wpmlArrangement": "list" }, "originalCoords": { "row": "firstRow", "cellPos": "left", "cellId": 1 } },
              { "name": "menuTEST", "icon": "list", "form": { "options": { "activeForSubmenuItems": false, "bordersBetweenItems": false, "arrowsForItemsWithSubmenu": false, "foldSubmenusForLast2ItemsToRight": false }, "replaceWithMenuIcon": "tabletMobile", "menu": "2" }, "originalCoords": { "row": "firstRow", "cellPos": "left", "cellId": 2 } },
              { "name": "extras", "icon": "plus-squared", "form": { "shopIcon": [], "searchStyle": "icon", "wpmlStyle": "flags", "wpmlArrangement": "list", "searchType": { "label": "Default", "value": "" } }, "style": { "iconColor": "#333333", "hoverColor": "#0095eb" }, "originalCoords": { "row": "firstRow", "cellPos": "left", "cellId": 3 } },
              { "name": "menu", "icon": "list", "form": { "options": { "activeForSubmenuItems": false, "bordersBetweenItems": false, "arrowsForItemsWithSubmenu": false, "foldSubmenusForLast2ItemsToRight": false }, "replaceWithMenuIcon": "tabletMobile", "menu": "0" }, "style": { "linkColor": "#333333", "hoverLinkColor": "#0095eb", "activeLinkColor": "#0095eb", "subBackgroundColor": "#e15f5f", "subLinkColor": "#333333", "subHoverLinkColor": "#0095eb", "subActiveLinkColor": "#0095eb" }, "originalCoords": { "row": "firstRow", "cellPos": "left", "cellId": 4 } }
            ]
          }
        }
      }
      const itemOriginalCoords = {
        row    : 'row',
        cellPos: 'cell',
        cellId : 2
      }

      mutations.REMOVE_ITEM_FROM_CELL( state, { row: 'row', cellPos: 'cell', cellId: 2, originalCoords: itemOriginalCoords})
      state.row.items.cell.forEach((item, number) => {
        expect( item.originalCoords.cellId ).toBe( number )
      })
    })

  })

  test('SAVE_ITEM_FORM merge cloned item object with the old one', () => {
    expect.assertions( 2 )

    const state = {
      row: {
        items: {
          cell: [{ test_item1: { prop1: 'test' }}, { test_item2: { prop1: 'test' }}, { test_item3: { prop1: 'test' }}]
        }
      }
    }
    const new_item = { test_item2: { prop1: 'NEW VALUE' } }

    mutations.SAVE_ITEM_FORM( state, { row: 'row', cellPos: 'cell', cellId: 1, new_item: new_item })
    expect( state.row.items.cell ).toContainEqual( new_item )
    expect( state.row.items.cell[ 1 ] ).not.toBe( new_item )
  })

  describe('INSERT_INTO_CELL', () => {

    test('inserts item into state[ row ][ items ][ cellPos ] at provided index', () => {
      expect.assertions(2)

      const state = {
        row: {
          items: {
            cell: [
              { test1: 'test', originalCoords: { cellId: 5 } },
              { test2: 'test', originalCoords: { cellId: 4 } },
              { test3: 'test', originalCoords: { cellId: 3 } }
            ]
          }
        }
      }
      const new_item = { new_item: 'NEW VALUE', originalCoords: { cellId: 99 } }

      mutations.INSERT_INTO_CELL(state, { row: 'row', cellPos: 'cell', newIndex: 1, item: new_item })

      expect(state.row.items.cell.length).toBe(4)
      expect(state.row.items.cell[1]).toEqual(new_item)
    })

    test('inserts item into cell and renumber items if cell is other then `all`', () => {
      expect.assertions(4)

      const state = {
        row: {
          items: {
            cell: [
              { test1: 'test', originalCoords: { cellId: 5 } },
              { test2: 'test', originalCoords: { cellId: 4 } },
              { test3: 'test', originalCoords: { cellId: 3 } }
            ]
          }
        }
      }
      const new_item = { new_item: 'NEW VALUE', originalCoords: { cellId: 99 } }

      mutations.INSERT_INTO_CELL(state, { row: 'row', cellPos: 'cell', newIndex: 1, item: new_item })

      state.row.items.cell.forEach((item, number) => {
        expect(item.originalCoords.cellId).toBe(number)
      })
    })

    test('inserts item into cell and don NOT renumber items if cell is `all`', () => {
      expect.assertions(4)

      const state = {
        row: {
          items: {
            cell: [
              { test1: 'test', originalCoords: { cellId: 10 } },
              { test2: 'test', originalCoords: { cellId: 11 } },
              { test3: 'test', originalCoords: { cellId: 12 } }
            ]
          }
        }
      }
      const new_item = { new_item: 'NEW VALUE', originalCoords: { cellId: 99 } }

      mutations.INSERT_INTO_CELL(state, { row: 'row', cellPos: 'cell', newIndex: 1, item: new_item })

      state.row.items.cell.forEach((item, number) => {
        expect(item.originalCoords.cellId).toBe(number)
      })
    })

  })

  describe('COPY_GRID_OPTIONS', () => {

    test('merge provided Grid Options with stored one, new object is created', () => {
      const state = {
        grid: {
          options: {
            storedOption: 'test1',
            anotherOptions: 'test2'
          }
        }
      }
      const new_grid_options = {
        storedOption: 'new test1',
        anotherOptions: 'new test2'
      }

      mutations.COPY_GRID_OPTIONS(state, { gridOptions: new_grid_options })
      expect(state.grid.options).toEqual(new_grid_options)
    })

    test('merge provided Row Options with stored one, new object is created', () => {
      const state = {
        row: {
          options: {
            storedOption: 'test1',
            anotherOptions: 'test2'
          }
        }
      }
      const new_row_options = {
        storedOption: 'new test1',
        anotherOptions: 'new test2'
      }

      mutations.COPY_ROW_OPTIONS(state, { row: 'row', rowOptions: new_row_options })
      expect(state.row.options).toEqual(new_row_options)
    })

  })

})