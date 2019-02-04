export default {

  namespaced: true,

  actions: {

    /**
     * Replace `cell` in the `row` content with `item`. The mutation does that by equal `=` sign,
     * because Vue.Draggable returns full array of container/cell.
     * Payload property name for items is used in singular form, due to simplicity.
     * The grid will updates ( change ), let the system know by trigger `setEditorChange`.
     *
     * @param {function} commit Synchronous invoke mutation.
     * @param {function} dispatch Asynchronous invoke action.
     * @param {Object} rootState Access to global state.
     * @param {Object} payload Object that represents data sends to store
     *    - row {string}:[ 'actionBar', 'firstRow', 'secondRow' ]
     *    - cellPos {string}:[ 'left', 'center', 'right' ]
     *    - item {object}
     * @returns {Promise} Action resolves after mutation is commited.
     */
    update({ commit, dispatch, rootState }, payload ) {

      dispatch( 'general/setEditorChanged', { hasChanged: true }, { root: true })

      return new Promise(( resolve ) => {
        commit( `${ rootState.general.currentStoreModule }/UPDATE_BUILDER_CELL`, payload, { root: true })

        resolve()
      })
    },

    /**
     * Insert item into cell in order provided by payload object
     *
     * @param {function} commit Synchronous invoke mutation.
     * @param {Object} rootState Access to global state.
     * @param {function} dispatch Asynchronous invoke action.
     * @param {Object} payload Object that represents data sends to store
     *    - row {string}:[ 'actionBar', 'firstRow', 'secondRow' ]
     *    - cellPos {string}:[ 'left', 'center', 'right' ]
     *    - newIndex {number} Index in which item should inserted
     *    - item
     * @returns {Promise} Actionresolves after mutation is commited.
     */
    insertItem({ commit, rootState, dispatch }, payload ) {

      dispatch( 'general/setEditorChanged', { hasChanged: true }, { root: true })

      return new Promise(( resolve ) => {
        commit( `${ rootState.general.currentStoreModule }/INSERT_INTO_CELL`, payload, { root: true })
        resolve()
      })
    },

    /**
     * Remove given `item` from `cell` at `row`.
     * Usage `BaseItem` component @click remove button.
     * If the `item` is located add `all` cell position ( for actionBar or secondRow ),
     * is required to grab origin item at orign cellId in origin row, then remove the item also from origin position.
     * Before commit mutation, ask User to confirm this decision.
     *
     * **Legacy**:
     * For inner naming consistency **position** is used in term of **cell**.
     *
     * e.g.
     * ActionBar, layout top
     * +---------+ +---------+ +---------+
     * |[L] [M]  | |         | |     [S] |
     * +---------+ +---------+ +---------+
     *
     * ActionBar, layout left
     * +------------------+
     * |   [M] [S] [L]    |
     * +------------------+
     *
     * [L]ogo item on layout left has cellId = 2 at cellPos = 'all',
     * but at top position originCellId = 1 at originCellPosition = 'left'.
     *
     * @param {function} dispatch Asynchronous invoke action.
     * @param {function} commit Synchronous invoke mutation.
     * @param {Object} rootState Access to global state.
     * @param {Object} payload Object that represents data sends to store
     *    - originalCoords.row      {string}:[ 'actionBar', 'firstRow', 'secondRow' ]
     *    - originalCoords.cellId   {number} >= 0
     *    - originalCoords.cellPos  {string: 'all'|'left'|'center'|'right'}
     *
     *    - row     {string}:[ 'actionBar', 'firstRow', 'secondRow' ]
     *    - cellId  {number} >= 0
     *    - cellPos {string : 'all'|'left'|'center'|'right'} Position of the cell.
     *
     *    - confirm {boolean} Do show confirmation alert? (remove at BaseItem)
     * @returns {Promise} Action resolves after mutation is commited.
     */
    removeItem({ dispatch, commit, rootState }, payload ) {
      return new Promise(( resolve ) => {
        const currentStoreModule = rootState.general.currentStoreModule

        if ( payload.confirm ) {
          if ( confirm( 'You are about to delete this element.\nIt can not be restored at a later time! Continue?' ) ) {

            commit( `${ currentStoreModule }/REMOVE_ITEM_FROM_CELL`, payload, { root: true })

            dispatch( 'general/setEditorChanged', { hasChanged: true }, { root: true })

            resolve()
          } else {

            resolve()

          }
        } else {
          commit( `${ currentStoreModule }/REMOVE_ITEM_FROM_CELL`, payload, { root: true })

          resolve()
        }
      })
    },

    /**
     * Insert the `item` into end of given `cell` at `row`.
     * Used at `grid/clone` and `cell/copyRowCellsToAll`.
     * Main purpose of this action is to gain more precise controll of item placement.
     * The grid will updates ( change ), let the system know by trigger `setEditorChange`.
     *
     * @param {function} commit Synchronous invoke mutation.
     * @param {Object} rootState Access to global state.
     * @param {function} dispatch Asynchronous invoke action.
     * @param {Object} payload Object that represents data sends to store
     *    - row     {string}:[ 'actionBar', 'firstRow', 'secondRow' ]
     *    - cellPos {string}:[ 'left', 'center', 'right' ]
     *    - item    {object}
     * @returns {Promise} Action resolves after mutation is commited.
     */
    pushItem({ commit, rootState, dispatch }, payload ) {

      dispatch( 'general/setEditorChanged', { hasChanged: true }, { root: true })

      return new Promise(( resolve ) => {
        commit( `${ rootState.general.currentStoreModule }/PUSH_TO_BUILDER_CELL`, payload, { root: true } )
        resolve()
      })
    },

    /**
     * Clear the `cell` by replacing its content with empty array.
     * Purpose: avoid duplicating items in the cells.
     *
     * @param {function} commit Synchronous invoke mutation.
     * @param {Object} payload Object that represents data sends to store
     *    - row {string}:[ 'actionBar', 'firstRow', 'secondRow' ]
     *    - cell {string}:[ 'left', 'center', 'right' ]
     * @returns {Promise} Action resolves after mutation is commited.
     */
    clear({ commit, rootState }, payload ) {
      return new Promise(( resolve ) => {
        commit( `${ rootState.general.currentStoreModule }/CLEAR_CELL`, payload, { root: true } )
        resolve()
      })
    },

    /**
     * Copy items from `left`, `center` and `right` cells in the row,
     * to the `all` cell (the merged one).
     * Operation is done linearly (from left to right).
     *
     * @param {Object} rootState Access to global state.
     * @param {function} commit Synchronous invoke mutation.
     * @param {Object} payload Object that represents data sends to store
     *    - row {string} name of the row.
     */
    copyRowCellsToAll({ rootState, commit }, payload ) {
      let row_arr              = []
      const currentStoreModule = rootState.general.currentStoreModule

      row_arr.push( payload.row )

      row_arr.map(( curr_row ) => {
        [ 'left', 'center', 'right' ].map(( curr_position ) => {
          const getRowItems = rootState[ currentStoreModule ][ curr_row ][ 'items' ][ curr_position ]

          getRowItems.map(( item, originalIndex ) => {

              commit( `${ currentStoreModule }/PUSH_TO_BUILDER_CELL`, {
                row    : curr_row,
                cellPos: 'all',
                item: {
                  name: item.name,
                  icon: item.icon,
                  uuid: item.uuid,
                  originalCoords: {
                    row    : curr_row,
                    cellPos: curr_position,
                    cellId : originalIndex,
                  },
                },
              },
              { root: true })

            })

        })
      })

    },

    /**
     * The Cell handler. Position is determinated by row and cellPos.
     * The `all` cell must be handled separatly.
     * If `all` accepts brand new item in desired place,
     * the item has new UUID assigned and is also pushed to left cell in the row.
     * Item in the `all` cell must contain pointer to original item (originalCoords),
     * holding form in `all` cell is redundant.
     * It is neccessary to parallel item`s form editing.
     *
     * This action handle `move` and `remove` events, it`s self-explaining.
     *
     * @param {Object} rootState Access to global state.
     * @param {function} dispatch Asynchronous invoke action.
     * @param {Object} payload Object that represents data sends to store
     *    - event {object} Event object send from vue.draggable.
     *    - row {string} from which row the cell should be handled.
     *    - cellPos {string} position of the cell (e.g. 'left').
     *    - tmpItems {array} array of the temporary item from the cell.
     */
    onChange({ rootState, dispatch }, payload ) {
      return new Promise(( resolve ) => {
        const {
          event,
          row,
          cellPos,
          tmpItems,
        } = payload

        // common const`s
        const currModule         = rootState.general.currentStoreModule
        const leftCellItemsCount = rootState[ currModule ][ row ][ 'items' ][ 'left' ].length

        /**
         * `ALL` cell position
         */
        if ( cellPos === 'all' ) {
          if ( event.added ) {
            let newItem    = JSON.parse(JSON.stringify( event.added.element ))
            let newItemAll = JSON.parse(JSON.stringify( newItem ))
            delete newItemAll.form
            delete newItemAll.style

            dispatch( 'uuid/assign', { itemUuid: newItem.uuid }, { root: true })
              .then(( newUuid ) => {
                newItem.uuid    = newUuid
                newItemAll.uuid = newUuid
                newItem.originalCoords = newItemAll.originalCoords = {
                  row    : row,
                  cellPos: 'left',
                  cellId : leftCellItemsCount,
                }

                dispatch( 'pushItem', {
                  item   : newItem,
                  row    : row,
                  cellPos: 'left',
                })

                dispatch( 'insertItem', {
                  item    : newItemAll,
                  row     : row,
                  cellPos : 'all',
                  newIndex: event.added.newIndex,
                })
              })
          }

          if ( event.moved ) {
            dispatch( 'update', {
              item   : tmpItems,
              row    : row,
              cellPos: cellPos,
            })
          }

          if ( event.removed ) {
            const cellId = event.removed.oldIndex

            dispatch( 'removeItem', {
              originalCoords: event.removed.element.originalCoords,
              cellId        : cellId,
              row           : row,
              cellPos       : cellPos,
            })
          }
        } else {
          /**
           * other cells
           */
          if ( event.added ) {

            let newItem = JSON.parse(JSON.stringify( event.added.element ))

            dispatch( 'uuid/assign', { itemUuid: newItem.uuid }, { root: true })
              .then(( newUuid ) => {
                newItem.uuid           = newUuid
                newItem.originalCoords = {
                  row    : row,
                  cellPos: cellPos,
                  cellId : event.added.newIndex,
                }

                dispatch( 'insertItem', {
                  item    : newItem,
                  row     : row,
                  cellPos : cellPos,
                  newIndex: event.added.newIndex,
                })
              })
          }

          if ( event.moved ) {

            let newtmpItems = JSON.parse(JSON.stringify( tmpItems ))
            newtmpItems.map(( item, index ) => {
              item.originalCoords.cellId = index
            })

            dispatch( 'update', {
              item   : newtmpItems,
              row    : row,
              cellPos: cellPos,
            })
          }

          if ( event.removed ) {
            const cellId = event.removed.oldIndex

            dispatch( 'removeItem', {
              originalCoords: event.removed.element.originalCoords,
              cellId        : cellId,
              row           : row,
              cellPos       : cellPos,
            })
          }
        }

        resolve()
      })
    },

  },

}