import mutations from '../../../../src/store/modules/Common/Endpoint/mutations'

describe('MUTATIONS Endpoint module:', () => {

  test('PUSH_WP_MENUES sets state.wpMenusList', () => {
    const state = {
      wpMenusList: []
    }
    const newMenu = [{ "label": "-- Default --", "value": "0" }, { "label": "Main menu", "value": "2" }]

    mutations.PUSH_WP_MENUES(state, newMenu[ 0 ] )
    mutations.PUSH_WP_MENUES(state, newMenu[ 1 ] )
    expect( state.wpMenusList ).toEqual( newMenu )
  })

})