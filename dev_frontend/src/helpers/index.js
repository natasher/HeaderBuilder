/**
 * Function takes JSON object with device state, then seek for fields.
 * If field has an object as value, flatten it to primitive value (String, Boolean, etc.)
 * This action makes strong use of underscore.js libraray to make code cleaner.
 * e.g.
 *
 * ```js
 * {
 *  replaceWithMenuIcon: {
 *    lable: 'Tablet & Mobile',
 *    value: 'tabletMobile'
 *  }
 * }
 *
 * // will be transformed to:
 *
 * {
 *  replaceWithMenuIcon: 'tabletMobile'
 * }
 * ```
 *
 * @param {Object} state Object that represents data sends to store
 * @returns {Object} muttated state object
 */
export const prepareStateToPost = ( state ) => {
  const rows           = [ 'actionBar', 'firstRow', 'secondRow' ]
  const cellsToPrepare = [ 'left',      'center',   'right'     ]

  _.map( rows, ( row ) => {
    _.map( cellsToPrepare, ( cell ) => {

      if ( state[ row ][ 'items' ][ cell ].length !== 0 ) {
        let cellItems = state[ row ][ 'items' ][ cell ]

        _.map( cellItems, ( item ) => {
          _.map( item.form, ( val, key, iform ) => {

            // Check if is a v-select model
            if ( _.isObject( val ) && _.has( val, 'label' ) && _.has( val, 'value' ) ) {
              iform[ key ] = val.value || val.index
            }

          })

          if ( item.name == 'menu' || item.name == 'button') {
            _.map( item.style, ( val, key ) => {

              // only `font` field has nested v-select fields
              if ( key === 'font' ) {
                // arguments as in parent map invokation: val, key, list
                _.map(val, (v, k, l) => {
                  // Check if is a v-select model
                  if (_.isObject(v) && _.has( v, 'label' ) && _.has( v, 'value' ) ) {
                    l[ k ] = v.value || v.index
                  }

                })
              }

            })
          }

          delete item.originalCoords
        })

      }

    })
  })

  _.map( state.grid.options, ( val, key, list ) => {
      // Check if is a v-select model
      if ( _.isObject( val ) && _.has( val, 'label' ) && _.has( val, 'value' ) ) {
        list[ key ] = val.value || val.index
      }

      // only `backgroundImage` field has nested v-select fields
      if (key === 'backgroundImage') {
        // arguments as in parent map invokation: val, key, list
        _.map(val, (v, k, l) => {

          // Check if is a v-select model
          if (_.isObject(v) && _.has( v, 'label' ) && _.has( v, 'value' ) ) {
            l[ k ] = v.value || v.index
          }

        })
      }

  })

  return state
}

/**
 * Function adds originalCoords to fetched items objects in row cells.
 *
 * @param {Object} state Object that represents data sends to store
 * @returns {Object} muttated state object
 */
export const addCoordsToFetchedItems = ( state ) => {
  const rows = [ 'actionBar', 'firstRow', 'secondRow' ]
  const cellsToPrepare = [ 'left', 'center', 'right' ]

  _.map( rows, ( row ) => {
    _.map( cellsToPrepare, ( cell ) => {

      if ( state[ row ][ 'items' ][ cell ].length !== 0 ) {
        let cellItems = state[ row ][ 'items' ][ cell ]

        _.map( cellItems, ( item, index ) => {

          item.originalCoords = {
            row    : row,
            cellPos: cell,
            cellId : index
          }

        })

      }

    })
  })

  return state
}

/**
 * Find branch specified in `path` argument in nested object.
 *
 * @param {Object} device Object for given device state
 * @param {String} path Keys of device object joined with `.`, e.g. "grid.options"
 * @returns {Object} Branch of device object with root in path arg
 */
export const findLevel = ( device, path ) => {
  var path_segment = path.split('.')
  var new_path     = device

  _.each(path_segment, function ( segment ) {
    new_path = new_path[ segment ]
  })

  return new_path
}

/**
 * Function compare state options (grid options, row options, etc.) objects,
 * then adds/remove unnecessary keys.
 * Backend keys are processed in favor of frontend keys.
 *
 * @param {Object} vueState State object stored on frontend side
 * @param {Object} fetchedState State object stored on backend side
 * @returns {Object} muttated state object
 */
export const unifyLevel = ( vueState, fetchedState ) => {
  const vue_state_keys     = _.keys( vueState )
  const fetched_state_keys = _.keys( fetchedState )

  const keys_to_be_added_to_backend_object     = _.difference( vue_state_keys, fetched_state_keys )
  const keys_to_be_removed_from_backend_object = _.difference( fetched_state_keys, vue_state_keys )

  _.each(keys_to_be_removed_from_backend_object, function (key) {
    if ( _.isArray( fetchedState ) || key === 'icon' || key === 'link' ) return

    delete fetchedState[ key ]
  })

  _.each(keys_to_be_added_to_backend_object, function (key) {
    fetchedState[ key ] = vueState[ key ]
  })

  _.each(fetchedState, function(fetchedStateValue, fetchedStateKey) {
    if (! _.isObject( fetchedStateValue ) ) return

    fetchedState[ fetchedStateKey ] = unifyLevel( vueState[ fetchedStateKey ], fetchedState[ fetchedStateKey ])
  })

  return fetchedState
}
