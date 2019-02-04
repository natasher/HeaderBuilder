export default {

  namespaced: true,

  actions: {

    /**
     * Clone `grid` from given in payload module to currently rendered Module.
     * Begin with clearing all cells to avoid item duplicates.
     * If current view is 'mobile', grid should contain only 'logo' and 'menu',
     * rest of the items should be placed in `inactiveItems`.
     * 'desktop' and 'tablet' should be mapped 1-by-1 as { from } module.
     *
     * @param {function} dispatch Asynchronous invoke action.
     * @param {Object} rootGetters Access getters from global namespace.
     * @param {Object} rootState Access to global state.
     * @param {Object} payload Object that represents data sends to store
     *    - from  {string}:[ 'DesktopModule', 'TabletModule', 'MobileModule' ]
     */
    clone({ dispatch, rootGetters, rootState }, payload ) {
      return new Promise(( resolve ) => {

        [ 'actionBar', 'firstRow', 'secondRow' ].map(( curr_row ) => {
          [ 'left', 'center', 'right' ].map(( curr_cell ) => {

            dispatch( 'cell/clear', {
              row    : curr_row,
              cellPos: curr_cell,
            }, { root: true })
            .then(() => {
              const currView = rootState.general.currentView

              if ( rootGetters[ 'ui/getGridStatus' ] === 'auto' && currView === 'mobile' ) {

                rootState[ payload.from ][ curr_row ][ 'items' ][ curr_cell ]
                  .filter(( item ) => {
                    if ( item.name === 'logo' || item.name === 'menu' ) {

                      return item

                    } else {

                      dispatch( 'inactiveItems/putItem', {
                        item: {
                          name : item.name,
                          icon : item.icon,
                          form : item.form,
                          style: item.style || {},
                          uuid : this._vm.$genid(),
                          // originalCoords: item.originalCoords,
                        }
                      }, { root: true })

                    }
                  })
                  .map(( item ) => {

                    dispatch( 'cell/pushItem', {
                      row    : curr_row,
                      cellPos: curr_cell,
                      item: {
                        name          : item.name,
                        icon          : item.icon,
                        form          : item.form,
                        style         : item.style || {},
                        uuid          : this._vm.$genid(),
                        originalCoords: item.originalCoords,
                      }
                    }, { root: true })

                  })

              } else {

                rootState[ payload.from ][ curr_row ][ 'items' ][ curr_cell ]
                  .map(( item ) => {

                    dispatch( 'cell/pushItem', {
                      row    : curr_row,
                      cellPos: curr_cell,
                      item   : {
                        name          : item.name,
                        icon          : item.icon,
                        form          : item.form,
                        style         : item.style || {},
                        uuid          : this._vm.$genid(),
                        originalCoords: item.originalCoords,
                      }
                    }, { root: true })

                  })
              }

            })

          })

          const rowOptions = JSON.parse(JSON.stringify( rootState[ payload.from ][ curr_row ][ 'options' ] ))
          dispatch( 'copyRowOptions', { row: curr_row, rowOptions: rowOptions } )

          const rowVisibility = rootState[ payload.from ][ curr_row ][ 'active' ] ? true : false
          dispatch( 'ui/setRowActive', { row: curr_row, active: rowVisibility }, { root: true })
        })

        const gridOptions = JSON.parse(JSON.stringify( rootState[ payload.from ][ 'grid' ][ 'options' ] ))
        dispatch( 'copyOptions', { gridOptions: gridOptions })

        resolve()
      })
    },

    /**
     * Copy grid options from one module to another.
     *
     * @param {Object} rootState Access to global state.
     * @param {function} commit Synchronous invoke mutation.
     * @param {Object} payload Object that represents data sends to store
     *    - gridOptions {object} Options object to be assign.
     */
    copyOptions({ rootState, commit }, payload ) {
      return new Promise (( resolve )  => {
        const currentStoreModule = rootState.general.currentStoreModule

        commit( `${ currentStoreModule }/COPY_GRID_OPTIONS`, payload, { root: true })

        resolve()
      })
    },

    /**
     * Copy row options for given row from one module to another.
     *
     * @param {Object} rootState Access to global state.
     * @param {function} commit Synchronous invoke mutation.
     * @param {Object} payload Object that represents data sends to store
     *    - row {string} name of the row.
     *    - rowOptions {object} Options object to be assign.
     */
    copyRowOptions({ rootState, commit }, payload ) {
      return new Promise(( resolve ) => {
        const currentStoreModule = rootState.general.currentStoreModule

        commit( `${ currentStoreModule }/COPY_ROW_OPTIONS`, payload, { root: true })

        resolve()
      })
    },

  }

}