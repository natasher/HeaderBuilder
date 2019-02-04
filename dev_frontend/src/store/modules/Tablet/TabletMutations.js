export default {

  SET_STATE( state, payload ) {
    Object.assign( state, payload.new_state )
  },

  SET_GRID_OPTIONS_VALUE( state, payload ) {
    const {
      name,
      value,
      position,
    } = payload
    var grid = state.grid.options

    if (grid[ name ] && typeof grid[ name ][ position ] != 'undefined') {

      grid[ name ][ position ] = value

    } else {

      grid[ name ] = value

    }
  },

  SET_ROW_OPTIONS_VALUE( state, payload ) {
    const {
      name,
      row,
      value,
    } = payload

    state[ row ][ 'options' ][ name ] = value
  },

  SET_LAYOUT_POSITION( state, payload ) {
    state.layoutPosition = payload.position
  },

  SET_ROW_ACTIVE( state, payload ) {
    const { row, active } = payload

    state[ row ][ 'active' ] = active
  },

  TOGGLE_ACTION_BAR_FLAG( state ) {
    state.actionBar.active = !state.actionBar.active
  },

  TOGGLE_SECOND_ROW_FLAG( state ) {
    state.secondRow.active = !state.secondRow.active
  },

  SET_GRID_STATUS( state, payload ) {
    state.grid.status = payload.status
  },

  UPDATE_BUILDER_CELL( state, payload ) {
    state[ payload.row ][ 'items' ][ payload.cellPos ] = payload.item
  },

  PUSH_TO_BUILDER_CELL( state, payload ) {
    state[ payload.row ][ 'items' ][ payload.cellPos ].push( payload.item )
  },

  CLEAR_CELL( state, payload ) {
    state[ payload.row ][ 'items' ][ payload.cellPos ] = []
  },

  REMOVE_ITEM_FROM_CELL( state, payload ) {
    const {
      originalCoords,
      row,
      cellPos,
      cellId,
    } = payload

    const originCoordsExists = (
      typeof originalCoords.row     !== 'undefined' &&
      typeof originalCoords.cellPos !== 'undefined' &&
      typeof originalCoords.cellId  !== 'undefined'
    )
    const coordsExists = (
      typeof row     !== 'undefined' &&
      typeof cellId  !== 'undefined' &&
      typeof cellPos !== 'undefined'
    )

    if ( originCoordsExists && originalCoords.cellPos !== cellPos ) {
      const modCell = state[ originalCoords.row ][ 'items' ][ originalCoords.cellPos ]

      modCell.splice( originalCoords.cellId, 1 )
      modCell.map(( item, index ) => {
        item.originalCoords.cellId = index
      })
    }

    if ( coordsExists ) {
      const modCell = state[ row ][ 'items' ][ cellPos ]

      modCell.splice( cellId, 1 )
      modCell.map((item, index) => {
        item.originalCoords.cellId = index
      })
    }
  },

  SAVE_ITEM_FORM( state, payload ) {
    const {
      row,
      cellId,
      cellPos,
      new_item,
    } = payload

    state[ row ][ 'items' ][ cellPos ][ cellId ] = Object.assign(
      {},
      state[ row ][ 'items' ][ cellPos ][ cellId ],
      new_item,
    )
  },

  INSERT_INTO_CELL( state, payload ) {
    let copiedCell = JSON.parse(JSON.stringify( state[ payload.row ][ 'items' ][ payload.cellPos ] ))
    copiedCell.splice( payload.newIndex, 0, payload.item )

    if (payload.cellPos != 'all') {
      copiedCell.map((item, index) => {
        item.originalCoords.cellId = index
      })
    }

    state[ payload.row ][ 'items' ][ payload.cellPos ] = copiedCell
  },

  COPY_GRID_OPTIONS(state, payload) {
    const { gridOptions } = payload

    state.grid.options = Object.assign(
      {},
      gridOptions,
    )
  },

  COPY_ROW_OPTIONS(state, payload) {
    const {
      row,
      rowOptions,
    } = payload

    state[ row ][ 'options' ] = Object.assign(
      {},
      rowOptions,
    )
  },

}