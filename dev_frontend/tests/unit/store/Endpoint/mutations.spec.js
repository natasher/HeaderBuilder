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

  test('SET_FONTS_LIST sets state.mfnFonts', () => {
    const fonts_list = {
      all: [ 'All1', 'All2', 'All3', 'All4', 'All5', 'All6', 'All7' ],
      system: [ 'System1', 'System2', 'System3', 'System4', 'System5' ]
    }
    const state = {
      mfnFonts: {},
    }

    mutations.SET_FONTS_LIST( state, { fonts: fonts_list } )
    expect( state.mfnFonts ).toMatchObject( fonts_list )
  })

})