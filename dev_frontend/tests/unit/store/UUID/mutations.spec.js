import module from '../../../../src/store/modules/Common/UUID/index'

describe('MUTATIONS UUID module:', () => {

  test('ADD_UUID_TO_BLACKLIST pushes new uuid to state.blacklist array', () => {
    expect.assertions( 2 )

    const values = [ 'test1', 'test2', 'test3' ]
    const state = {
      blacklist: []
    }

    module.mutations.ADD_UUID_TO_BLACKLIST( state, { uuid: values[ 0 ] })
    expect( state.blacklist.length ).toBe( 1 )

    module.mutations.ADD_UUID_TO_BLACKLIST( state, { uuid: values[ 1 ] })
    module.mutations.ADD_UUID_TO_BLACKLIST( state, { uuid: values[ 2 ] })
    expect( state.blacklist ).toEqual( values )
  })

})