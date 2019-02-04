import {
  prepareStateToPost,
} from '../../../../helpers/index'

export default {

  namespaced: true,

  state: {
    referenceState: {

      layoutPosition: 'top',
      grid: {
        status : 'custom',
        options: {
          backgroundColor: '#ffffff',
          layout: {
            label: 'Wrap into grid',
            value: 'wrap_into_grid',
          },
          backgroundImage: {
            bgImg: '',
            positionVertical: {
              label: 'top',
              value: 'top',
            },
            positionHorizontal: {
              label: 'left',
              value: 'left',
            },
            repeat: {
              label: 'repeat',
              value: 'repeat',
            },
            size: {
              label: 'auto',
              value: 'auto',
            },
          }
        }
      },
      actionBar: {
        active : false,
        options: {
          backgroundColor: 'rgba(255,255,255,0)',
          height: '40',
        },
        items: {
          all   : [],
          left  : [],
          center: [],
          right : [],
        }
      },
      firstRow: {
        options: {
          backgroundColor: 'rgba(255,255,255,0)',
          height: '80',
        },
        items: {
          left  : [],
          center: [],
          right : [],
        },
      },
      secondRow: {
        active : false,
        options: {
          backgroundColor: 'rgba(255,255,255,0)',
          height: '80',
        },
        items: {
          all   : [],
          left  : [],
          center: [],
          right : [],
        }
      },

    }
  },

  actions: {

    /**
     * Clone Desktop Module state.
     *
     * @param {Object} rootState Access to global state.
     * @returns {Promise} desktopState clone
     */
    desktopState({ rootState }) {
      return new Promise(( resolve ) => {
        let desktopState = JSON.parse(JSON.stringify( rootState.DesktopModule ))

        resolve( desktopState )
      })
    },

    /**
     * Clone DesktopSticky Module state.
     *
     * @param {Object} rootState Access to global state.
     * @returns {Promise} desktopStickyState clone
     */
    desktopStickyState({ rootState }) {
      return new Promise(( resolve ) => {
        const desktopStickyState = JSON.parse(JSON.stringify( rootState.DesktopStickyModule ))

        resolve( desktopStickyState )
      })
    },

    /**
     * Clone Tablet Module state.
     *
     * @param {Object} rootState Access to global state.
     * @returns {Promise} tabletState clone
     */
    tabletState({ rootState }) {
      return new Promise(( resolve ) => {
        const tabletState = JSON.parse(JSON.stringify( rootState.TabletModule ))

        resolve( tabletState )
      })
    },

    /**
     * Clone TabletSticky Module state.
     *
     * @param {Object} rootState Access to global state.
     * @returns {Promise} tabletStickyState clone
     */
    tabletStickyState({ rootState }) {
      return new Promise(( resolve ) => {
        const tabletStickyState = JSON.parse(JSON.stringify( rootState.TabletStickyModule ))

        resolve( tabletStickyState )
      })
    },

    /**
     * Clone Mobile Module state.
     *
     * @param {Object} rootState Access to global state.
     * @returns {Promise} mobileState clone
     */
    mobileState({ rootState }) {
      return new Promise(( resolve ) => {
        const mobileState = JSON.parse(JSON.stringify( rootState.MobileModule ))

        resolve( mobileState )
      })
    },

    /**
     * Clone MobileSticky Module state.
     *
     * @param {Object} rootState Access to global state.
     * @returns {Promise} mobileStickyState clone
     */
    mobileStickyState({ rootState }) {
      return new Promise(( resolve ) => {
        const mobileStickyState = JSON.parse(JSON.stringify( rootState.MobileStickyModule ))

        resolve( mobileStickyState )
      })
    },

    /**
     * Join Devices states into one object `headerData`.
     * Data schema:
     * { device: deviceModule, }
     *
     * @param {function} dispatch Asynchronous invoke action.
     * @returns {Promise} headerData
     */
    joinDevicesState({ dispatch }) {
      return new Promise(( resolve ) => {
        let headerData = {}

        dispatch( 'desktopState' )
          .then(( data ) => { Object.assign( headerData, { desktop:       prepareStateToPost( data ) }) })

        dispatch( 'desktopStickyState' )
          .then(( data ) => { Object.assign( headerData, { desktopSticky: prepareStateToPost( data ) }) })

        dispatch( 'tabletState' )
          .then(( data ) => { Object.assign( headerData, { tablet:        prepareStateToPost( data ) }) })

        dispatch( 'tabletStickyState' )
          .then(( data ) => { Object.assign( headerData, { tabletSticky:  prepareStateToPost( data ) }) })

        dispatch( 'mobileState' )
          .then(( data ) => { Object.assign( headerData, { mobile:        prepareStateToPost( data ) }) })

        dispatch( 'mobileStickyState' )
          .then(( data ) => { Object.assign( headerData, { mobileSticky:  prepareStateToPost( data ) }) })

        resolve( headerData )
      })
    },

    /**
     * Restore each module state to initial state.
     * Ask the user to confirm the action first,
     * if rejected hide modal and do nothing.
     *
     * @param {Object} state Access to module state.
     * @param {function} commit Synchronous invoke mutation.
     * @param {function} dispatch Asynchronous invoke action.
     * @param {Object} payload Object that represents data sends to store
     *    - $modal : $modal - vue-js-modal instance
     */
    resetBuilder({ dispatch, state, commit }, payload ) {

      return new Promise(( resolve ) => {
        dispatch('modals/showResetBuilderModal', { $modal: payload.$modal }, { root: true })
          .then(() => {
            dispatch('general/setEditorChanged', { hasChanged: true }, { root: true })

            const modules = [
              'DesktopModule',
              'DesktopStickyModule',
              'TabletModule',
              'TabletStickyModule',
              'MobileModule',
              'MobileStickyModule',
            ]

            modules.map(( module ) => {

              const newRefState = JSON.parse(JSON.stringify(state.referenceState))

              if ( module !== 'DesktopModule' ) {
                newRefState.grid.status = 'auto'
              }

              commit( `${ module }/SET_STATE`,
                { new_state: newRefState },
                { root     : true })

              if (module === 'MobileModule' || module === 'MobileStickyModule') {
                commit( `${ module }/CLEAR_INACTIVE_ITEMS`, void 0, { root: true })
              }

            })

            dispatch('modals/showAfterBuilderResetModal', { $modal: payload.$modal }, { root: true })

            resolve('done')
          })
          .catch(() => {

            resolve('do nothing')
          })
      })

    },

  },

}