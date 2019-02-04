import module from '../../../../src/store/modules/Common/UI/index'

describe('UI GETTERS:', () => {

  test('getLayoutPosition gets layoutPosition from given grid module', () => {
    const rootState = {
      general: {
        currentStoreModule: 'testModule',
      },
      testModule: {
        layoutPosition: 'behind'
      }
    }
    const result = module.getters.getLayoutPosition( void 0, void 0, rootState )

    expect( result ).toBe( rootState.testModule.layoutPosition )
  })

  test('getActionBarActive gets actionBar row status for given grid module', () => {
    const rootState = {
      general: {
        currentStoreModule: 'testModule',
      },
      testModule: {
        actionBar: {
          active: 'dead'
        }
      }
    }
    const result = module.getters.getActionBarActive( void 0, void 0, rootState )

    expect( result ).toBe( rootState.testModule.actionBar.active )
  })

  test('getSecondRowActive gets secondRow row status for given grid module', () => {
    const rootState = {
      general: {
        currentStoreModule: 'testModule',
      },
      testModule: {
        secondRow: {
          active: 'dead'
        }
      }
    }
    const result = module.getters.getSecondRowActive( void 0, void 0, rootState )

    expect( result ).toBe( rootState.testModule.secondRow.active )
  })

  test('getGridStatus gets grid status for given module', () => {
    const rootState = {
      general: {
        currentStoreModule: 'testModule',
      },
      testModule: {
        grid: {
          status: 'awesome'
        }
      }
    }
    const result = module.getters.getGridStatus( void 0, void 0, rootState )

    expect( result ).toBe( rootState.testModule.grid.status )
  })

})