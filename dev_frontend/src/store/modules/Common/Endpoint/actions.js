import {
  addCoordsToFetchedItems,
  findLevel,
  unifyLevel,
} from '../../../../helpers/index'

import {
  capitalize,
} from '../../../../filters/index'

export default {

    /**
     * Push joined devices states to WordPress by AJAX _POST request.
     *
     * @param {function} dispatch Asynchronous invoke action.
     * @param {Object} payload Object that represents data sends to store
     *    - $modal : $modal - vue-js-modal instance
     * @returns {Promise}
     */
    postDataToWordpress({ dispatch }, payload ) {
      return new Promise(( resolve ) => {

        dispatch( 'general/setEditorChanged', { hasChanged: false }, { root: true })

        dispatch( 'devices/joinDevicesState', void 0, { root: true })
          .then(( headerData ) => {

            var data = {
              action : 'mfn_save_header',
              nonce  : mfn_ajax.nonce,
              builder: JSON.stringify( headerData )
            }

            jQuery.post( ajaxurl, data, function ( response ) {

              /* eslint-disable */
              if ( response.success ) {
                // console.info( 'Response: ' + response.data )
              } else {
                console.error( 'Ajax failed' )
              }
              /* eslint-enable */

            }, 'json' )
          })

        payload.$modal.show('ModalSaveHeader')

        resolve()
      })

    },

    /**
     * Function compare fetched items placed in the row cell to raw `base items`,
     * then adds/remove unnecesssary keys.
     *
     * Function gets each item uuid and adds it to the state
     *
     * @param {Object} payload.fetchedState State object stored on backend side
     * @param {Object} payload.itemPatternList `BaseItemsList` stored in the `items` module as refernce to compare keys
     * @param {String} payload.pathToRow Keys of device object joined with `.`, e.g. "grid.options"
     * @returns {Object} muttated state object
     */
    iterateOverItemsHook({ dispatch }, payload ) {
      return new Promise((resolve) => {
        const {
          fetchedState,
          itemPatternList,
          pathToRow,
        } = payload

        var row = findLevel( fetchedState, pathToRow )

        if (_.isEmpty(row)) {
          return

        } else {

          _.each(row, function (item, index) {
            /**
            * unifyFetchedItems
            */
            var item_pattern = _.filter(itemPatternList, function (baseItem) {
              return baseItem.name === item.name
            })[ 0 ]

            row[ index ][ 'form' ]  = unifyLevel( item_pattern.form, item.form )
            row[ index ][ 'style' ] = unifyLevel( item_pattern.style, item.style )

            /**
            * get uuid`s from Backend
            */
            dispatch( 'uuid/addToBlacklist', {
              uuid: item.uuid
            }, { root: true })
          })

          resolve( fetchedState )
        }
      })
    },

    // TODO payload could be redundand
    /**
     * Loop over provided paths in state object, to unify backend state.
     *
     * @param {Object} payload.vueState State object stored on frontend side
     * @param {Object} payload.fetchedState State object stored on backend side
     * @param {Object} payload.itemPattersList `BaseItemsList` stored in the `items` module as refernce to compare keys
     * @returns {Object} muttated state object
     */
    unifyFetchedState({ dispatch }, payload ) {
      return new Promise((resolve) => {
        const {
          vueState,
          fetchedState,
          itemPatternList,
        } = payload

        const general_option_paths = [
          'grid.options',
          'actionBar.options',
          'firstRow.options',
          'secondRow.options',
        ]

        const row_paths = [
          'actionBar.items.all',
          'actionBar.items.left',
          'actionBar.items.center',
          'actionBar.items.right',

          'firstRow.items.all',
          'firstRow.items.left',
          'firstRow.items.center',
          'firstRow.items.right',

          'secondRow.items.all',
          'secondRow.items.left',
          'secondRow.items.center',
          'secondRow.items.right',
        ]

        _.each(general_option_paths, function (path) {
          var vue_level     = findLevel( vueState, path )
          var fetched_level = findLevel( fetchedState, path )

          unifyLevel( vue_level, fetched_level )
        })

        _.each(row_paths, function (path) {
          // iterateOverItemsHook( fetchedState, itemPatternList, path )
          dispatch('iterateOverItemsHook', {
            fetchedState,
            itemPatternList,
            pathToRow: path,
          })
        })

        resolve( fetchedState )
      })
    },

    /**
     * Retrive JSON object from AJAX object `mfn_ajax.builder`,
     * then set this data as current devices state.
     *
     * @param {function} commit Synchronous invoke mutation.
     * @param {Object} rootState Access to global state.
     * @returns {Promise}
     */
    getStateFromWP({ dispatch, commit, rootState }) {
      return new Promise(( resolve ) => {

        if ( mfn_ajax.builder === '{}' || mfn_ajax.builder === '' ) {

          resolve()

        } else {

          const all_states   = JSON.parse( mfn_ajax.builder )
          const states_names = Object.keys( all_states )

          states_names.map(( name ) => {
            const module_name = `${ capitalize( name ) }Module`

            // FIXME: tu może być bug! unifyFetched state jest async
            // a addCoordsToFetchedItems jest sync
            all_states[ name ] = addCoordsToFetchedItems( all_states[ name ] )

            dispatch('unifyFetchedState', {
              vueState: rootState[ module_name ],
              fetchedState: all_states[ name ],
              itemPatternList: rootState.items.baseItemsList,
            })
              .then((state) => {
                all_states[ name ] = state
              })

            commit( `${ module_name }/SET_STATE`,
              { new_state: all_states[ name ] },
              { root     : true })

          })

          resolve()
        }

      })
    },

    /**
     * Grab data send from AJAX as `mfn_ajax.menu_list` object,
     * then translate to `vue-select` data schema.
     *
     * e.g.
     * {
     *  label: "menu name (value) from WP",
     *  value: "menu id from WP"
     * }
     *
     * @param {function} commit Synchronous invoke mutation.
     * @param {Object} rootState Access to global state.
     * @returns {Promise} Action resolves after mutation is commited.
     */
    pushWPMenusList({ commit, rootState }) {
      return new Promise(( resolve ) => {
        const getWPMenusList = rootState.endpoint.wpMenusList

        if ( getWPMenusList.length === 0 ) {
          _.each( Object.entries( mfn_ajax.menu_list ), function ( menu ) {

            commit( 'PUSH_WP_MENUES', {
              label: menu[ 1 ],
              value: menu[ 0 ]
            })

          })
        }

        resolve()
      })
    },

    /**
     * Grab data send from AJAX as `mfn_ajax.fonts_list` object,
     * then translate to `vue-select` data schema.
     *
     * e.g.
     * {
     *   label: 'Font 1',
     *   value: 'font1'
     * }
     *
     * @param {function} commit Synchronous invoke mutation.
     * @param {Object} rootState Access to global state.
     * @returns {Promise} Action resolves after mutation is commited.
     */
    setFontsList({ commit, rootState }) {
      return new Promise(( resolve ) => {
        const hbFonts  = rootState.endpoint.mfnFonts
        const wpFonts = mfn_ajax.fonts_list
        let tmpFonts   = []

        if ( _.isEmpty( hbFonts )) {

          tmpFonts.push({
            label: 'system',
            value: 'optgroup-label'
          })
          _.each( wpFonts.system, function ( font ) {
            tmpFonts.push({
              label: font,
              value: font
            })
          })

          tmpFonts.push({
            label: 'all',
            value: 'optgroup-label'
          })
          _.each( wpFonts.all, function ( font ) {
            tmpFonts.push({
              label: font,
              value: font
            })
          })

          commit( 'SET_FONTS_LIST', {
            fonts: tmpFonts
          })

        }
        resolve()
      })
    }

}