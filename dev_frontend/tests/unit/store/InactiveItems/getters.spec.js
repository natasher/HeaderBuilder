import module from '../../../../src/store/modules/Common/InactiveItems/index'

describe('InactiveItems GETTERS', () => {

  test('getInactiveItems returns state.inactiveItems array', () => {
    const rootState = {
      general: {
        currentStoreModule: 'testModule'
      },
      testModule: {
        inactiveItems: [ 'first item', 'second item' ]
      }
    }

    const result = module.getters.getInactiveItems( void 0, void 0, rootState )

    expect( result ).toBe( rootState.testModule.inactiveItems )
  })

})