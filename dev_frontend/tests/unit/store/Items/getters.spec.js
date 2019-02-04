import getters from '../../../../src/store/modules/Common/Items/getters'

describe('Items GETTERS', () => {

  test('getOriginalItem gets item placed on given coordinates from currently used module', () => {
    const rootState = {
      general: {
        currentStoreModule: 'testModule'
      },
      testModule: {
        testRow: {
          items: {
            testCell: [ 'item1', 'item2', 'item3', 'item4', 'item5' ]
          }
        }
      }
    }
    const getter = getters.getOriginalItem( void 0, void 0, rootState )

    const result = getter( 'testRow', 'testCell', 2 )

    expect( result ).toBe( 'item3' )
  })

  test('getActionBarItemsAll gets items for `all` cell in `actionBar` in currently used module', () => {
    const rootState = {
      general: {
        currentStoreModule: 'testModule'
      },
      testModule: {
        actionBar: {
          items: {
            all: [ 'item1', 'item2', 'item3', 'item4', 'item5' ]
          }
        }
      }
    }
    const result = getters.getActionBarItemsAll( void 0, void 0, rootState )

    expect( result ).toBe( rootState.testModule.actionBar.items.all )
  })

  test('getActionBarItemsLeft gets items for `left` cell in `actionBar` in currently used module', () => {
    const rootState = {
      general: {
        currentStoreModule: 'testModule'
      },
      testModule: {
        actionBar: {
          items: {
            left: [ 'item1', 'item2', 'item3', 'item4', 'item5' ]
          }
        }
      }
    }
    const result = getters.getActionBarItemsLeft( void 0, void 0, rootState )

    expect( result ).toBe( rootState.testModule.actionBar.items.left )
  })

  test('getActionBarItemsCenter gets items for `center` cell in `actionBar` in currently used module', () => {
    const rootState = {
      general: {
        currentStoreModule: 'testModule'
      },
      testModule: {
        actionBar: {
          items: {
            center: [ 'item1', 'item2', 'item3', 'item4', 'item5' ]
          }
        }
      }
    }
    const result = getters.getActionBarItemsCenter( void 0, void 0, rootState )

    expect( result ).toBe( rootState.testModule.actionBar.items.center )
  })

  test('getActionBarItemsRight gets items for `right` cell in `actionBar` in currently used module', () => {
    const rootState = {
      general: {
        currentStoreModule: 'testModule'
      },
      testModule: {
        actionBar: {
          items: {
            right: [ 'item1', 'item2', 'item3', 'item4', 'item5' ]
          }
        }
      }
    }
    const result = getters.getActionBarItemsRight( void 0, void 0, rootState )

    expect( result ).toBe( rootState.testModule.actionBar.items.right )
  })

  test('getFirstRowItemsLeft gets items for `left` cell in `firstRow` in currently used module', () => {
    const rootState = {
      general: {
        currentStoreModule: 'testModule'
      },
      testModule: {
        firstRow: {
          items: {
            left: [ 'item1', 'item2', 'item3', 'item4', 'item5' ]
          }
        }
      }
    }
    const result = getters.getFirstRowItemsLeft( void 0, void 0, rootState )

    expect( result ).toBe( rootState.testModule.firstRow.items.left )
  })

  test('getFirstRowItemsCenter gets items for `center` cell in `firstRow` in currently used module', () => {
    const rootState = {
      general: {
        currentStoreModule: 'testModule'
      },
      testModule: {
        firstRow: {
          items: {
            center: [ 'item1', 'item2', 'item3', 'item4', 'item5' ]
          }
        }
      }
    }
    const result = getters.getFirstRowItemsCenter( void 0, void 0, rootState )

    expect( result ).toBe( rootState.testModule.firstRow.items.center )
  })

  test('getFirstRowItemsRight gets items for `right` cell in `firstRow` in currently used module', () => {
    const rootState = {
      general: {
        currentStoreModule: 'testModule'
      },
      testModule: {
        firstRow: {
          items: {
            right: [ 'item1', 'item2', 'item3', 'item4', 'item5' ]
          }
        }
      }
    }
    const result = getters.getFirstRowItemsRight( void 0, void 0, rootState )

    expect( result ).toBe( rootState.testModule.firstRow.items.right )
  })

  test('getSecondRowItemsAll gets items for `all` cell in `secondRow` in currently used module', () => {
    const rootState = {
      general: {
        currentStoreModule: 'testModule'
      },
      testModule: {
        secondRow: {
          items: {
            all: [ 'item1', 'item2', 'item3', 'item4', 'item5' ]
          }
        }
      }
    }
    const result = getters.getSecondRowItemsAll( void 0, void 0, rootState )

    expect( result ).toBe( rootState.testModule.secondRow.items.all )
  })

  test('getSecondRowItemsLeft gets items for `left` cell in `secondRow` in currently used module', () => {
    const rootState = {
      general: {
        currentStoreModule: 'testModule'
      },
      testModule: {
        secondRow: {
          items: {
            left: [ 'item1', 'item2', 'item3', 'item4', 'item5' ]
          }
        }
      }
    }
    const result = getters.getSecondRowItemsLeft( void 0, void 0, rootState )

    expect( result ).toBe( rootState.testModule.secondRow.items.left )
  })

  test('getSecondRowItemsCenter gets items for `center` cell in `secondRow` in currently used module', () => {
    const rootState = {
      general: {
        currentStoreModule: 'testModule'
      },
      testModule: {
        secondRow: {
          items: {
            center: [ 'item1', 'item2', 'item3', 'item4', 'item5' ]
          }
        }
      }
    }
    const result = getters.getSecondRowItemsCenter( void 0, void 0, rootState )

    expect( result ).toBe( rootState.testModule.secondRow.items.center )
  })

  test('getSecondRowItemsRight gets items for `right` cell in `secondRow` in currently used module', () => {
    const rootState = {
      general: {
        currentStoreModule: 'testModule'
      },
      testModule: {
        secondRow: {
          items: {
            right: [ 'item1', 'item2', 'item3', 'item4', 'item5' ]
          }
        }
      }
    }
    const result = getters.getSecondRowItemsRight( void 0, void 0, rootState )

    expect( result ).toBe( rootState.testModule.secondRow.items.right )
  })
})