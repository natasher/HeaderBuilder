import {
  capitalize,
} from '../../../../filters'

export default {

  /**
   * Sets breakpoint for viewport. Used inside `general/setCurrentView`.
   *
   * @param {function} commit Synchronous invoke mutation.
   * @param {Object} payload Object that represents data sends to store
   *    - breakpoint : [
   *        '>= 960',
   *        '< 960',
   *        '< 768',
   *      ]
   * @returns {Promise} Action resolves after mutation is commited.
   */
  setBreakpoint({ commit }, payload ) {
    return new Promise(( resolve ) => {
      commit( 'SET_CURRENT_BREAKPOINT', payload )
      resolve()
    })
  },

  /**
   * Sets type of header. Each viewport can have `Sticky` and `Default` header.
   * If sticky is set then `ViewportModuleSticky` is used and `auto` mode will be set
   * and default module state is copied if grid has `auto` mode set,
   * otherwise regular `ViewportModule` is used.
   *
   * @param {Object} rootState Access to global state.
   * @param {function} commit Synchronous invoke mutation.
   * @param {Object} getters Access getters inside this module.
   * @param {function} dispatch Asynchronous invoke action.
   * @param {Object} payload Object that represents data sends to store
   *    - type {string}:[ 'default', 'sticky' ] type of viewport
   */
  setStickyFlag({ rootState, commit, getters, dispatch }, payload ) {
    const currView = rootState.general.currentView

    if ( payload.type === 'default' ) {
      dispatch( 'general/setCurrentStoreModule', {
        storeModule: `${ capitalize( currView ) }Module`,
      }, { root: true })
      .then(() => {
        return new Promise(( resolve ) => {
          commit( 'SET_STICKY_FLAG', payload )
          resolve()
        })
      })

    } else {

      dispatch( 'general/setCurrentStoreModule', {
        storeModule: `${ capitalize( currView ) }StickyModule`,
      }, { root: true })
      .then(() => {
        return new Promise(( resolve ) => {
          commit( 'SET_STICKY_FLAG', payload )
          resolve()
        })
      })
      .then(() => {

        if ( getters.getGridStatus === 'auto' ) {
          if ( currView === 'mobile' ) {
            dispatch( 'inactiveItems/clear', void 0, { root: true })
              .then( dispatch( 'inactiveItems/copy', void 0, { root: true }) )
              .then( dispatch( 'grid/clone', { from: 'MobileModule' }, { root: true }) )
          }

          if ( currView === 'tablet' ) {
            dispatch( 'grid/clone', { from: 'TabletModule' }, { root: true })
          }

          if (currView === 'desktop') {
            dispatch( 'grid/clone', { from: 'DesktopModule' }, { root: true })
          }
        }

      })
      .then(() => {

        if ( currView === 'desktop' ) {
          dispatch( 'setLayoutPosition', { position: rootState.DesktopModule.layoutPosition })
            .then(() => {

              if ( getters.getLayoutPosition === 'left' || getters.getLayoutPosition === 'right' ) {
                dispatch( 'cell/clear', { row: 'actionBar', cellPos: 'all' }, { root: true })
                  .then(
                    dispatch( 'cell/copyRowCellsToAll', { row: 'actionBar' }, { root: true })
                  )

                dispatch( 'cell/clear', { row: 'secondRow', cellPos: 'all' }, { root: true })
                  .then(
                    dispatch( 'cell/copyRowCellsToAll', { row: 'secondRow' }, { root: true })
                  )
              }

            })
        }

      })
    }
  },

  /**
   * Bulk action to change devices grid, emulate routing.
   *
   * @param {function} dispatch Asynchronous invoke action.
   * @param {Object} payload Object that represents data sends to store
   *    - device {string}:[ 'desktop', 'tablet', 'mobile' ] type of device
   * @returns {Promise} Action resolves after mutation is commited.
   */
  changeDevice({ dispatch }, payload ) {
    return new Promise(( resolve ) => {
      const device = payload.device

      switch ( device ) {
        case 'desktop':
          dispatch( 'general/setCurrentStoreModule', { storeModule: 'DesktopModule' }, { root: true })
          dispatch( 'general/setCurrentView',        { view:        'desktop'       }, { root: true })
          dispatch( 'setStickyFlag',                 { type:        'default'       })
          break;

        case 'tablet':
          dispatch( 'general/setCurrentStoreModule', { storeModule: 'TabletModule' }, { root: true })
          dispatch( 'general/setCurrentView',        { view:        'tablet'       }, { root: true })
          dispatch( 'setStickyFlag',                 { type:        'default'      })
          break;

        case 'mobile':
          dispatch( 'general/setCurrentStoreModule', { storeModule: 'MobileModule' }, { root: true })
          dispatch( 'general/setCurrentView',        { view:        'mobile'       }, { root: true })
          dispatch( 'setStickyFlag',                 { type:        'default'      })
          break;

        default:
          break;
      }

      resolve()
    })
  },

  /**
   * Sets current header grid status. Except of `Desktop`, that is 'custom' only,
   * three possibilities are possible:
   * => 'off'    - viewport header is inactive
   * => 'custom' - viewport header can be modify independently from other viewport grids.
   * => 'auto'   - viewport header grid is cloned from `DesktopModule` along with item forms.
   *
   * @param {function} dispatch Asynchronous invoke action.
   * @param {function} commit Synchronous invoke mutation.
   * @param {Object} rootState Access to global state.
   * @param {Object} payload Object that represents data sends to store
   *    - status {string}:[ 'off', 'custom', 'auto' ]
   * @returns {Promise} Action resolves after mutation is commited.
   */
  setGridStatus({ dispatch, commit, rootState }, payload ) {

    dispatch( 'general/setEditorChanged', { hasChanged: true }, { root: true })

    return new Promise(( resolve ) => {
      const currentStoreModule = rootState.general.currentStoreModule

      commit( `${ currentStoreModule }/SET_GRID_STATUS`, payload, { root: true } )
      resolve()
    })
  },

  /**
   * Sets position of grid, only `Desktop` header could have all possibilities.
   * `DesktopSticky` inherits after `Desktop`. Other viewports must be in 'top' position.
   *
   * @param {function} dispatch Asynchronous invoke action.
   * @param {function} commit Synchronous invoke mutation.
   * @param {Object} rootState Access to global state.
   * @param {Object} payload Object that represents data sends to store
   *    - position {string}:[ 'top', 'right', 'bottom', 'left' ] position of layout
   * @returns {Promise} Action resolves after mutation is commited.
   */
  setLayoutPosition({ dispatch, commit, rootState }, payload ) {

    dispatch( 'general/setEditorChanged', { hasChanged: true }, { root: true })

    return new Promise(( resolve ) => {
      const currentStoreModule = rootState.general.currentStoreModule

      commit( `${ currentStoreModule }/SET_LAYOUT_POSITION`, payload, { root: true } )
      resolve()
    })
  },

  /**
   * Handler for `layout position` buttons @click event.
   *
   * @param {function} dispatch Asynchronous invoke action.
   * @param {Object} getters Access getters inside this module.
   * @param {Object} payload Object that represents data sends to store
   *    - status {string}:[ 'off', 'custom', 'auto' ]
   *    - position {string}:[ 'top', 'right', 'bottom', 'left' ] position of layout
   */
  handleLayoutPositionClick({ dispatch, getters }, payload ) {

    dispatch( 'general/setEditorChanged', { hasChanged: true }, { root: true })
    dispatch( 'setLayoutPosition', { position: payload.position })

    if ( getters.getLayoutPosition === 'left' || getters.getLayoutPosition === 'right' ) {

      // TODO: powtarza się ten kod, zrób z tego jedną akcję, może Promise.all
      dispatch( 'cell/clear', { row: 'actionBar', cellPos: 'all' }, { root: true })
        .then(
          dispatch( 'cell/copyRowCellsToAll', { row: 'actionBar' }, { root: true })
        )

      dispatch( 'cell/clear', { row: 'secondRow', cellPos: 'all' }, { root: true })
        .then(
          dispatch( 'cell/copyRowCellsToAll', { row: 'secondRow' }, { root: true })
        )

    }

  },

  /**
   * Handler for `auto` grid status button.
   *
   * @param {function} dispatch Asynchronous invoke action.
   * @param {Object} rootState Access to global state.
   * @param {Object} payload Object that represents data sends to store
   *    - $modal : $modal - vue-js-modal instance
   */
  handleAutoClick({ dispatch, rootState }, payload ) {

    dispatch('modals/showAutoModeModal', { $modal: payload.$modal }, { root: true })
    .then(() => {

      dispatch( 'general/setEditorChanged', { hasChanged: true }, { root: true })

      dispatch( 'setGridStatus', { status: 'auto' })
        .then(() => {
          if ( rootState.general.currentStoreModule === 'MobileModule' ) {
            // TODO: czy to już nie jest w AutoModeModal?
            dispatch( 'inactiveItems/clear', void 0, { root: true })
              .then( dispatch( 'grid/clone', { from: 'DesktopModule' }, { root: true }) )
          }

          if ( rootState.general.currentStoreModule === 'MobileStickyModule' ) {
            // TODO: czy to już nie jest w AutoModeModal?
            dispatch( 'inactiveItems/clear', void 0, { root: true })
              .then( dispatch( 'inactiveItems/copy', void 0, { root: true }) )
              .then( dispatch( 'grid/clone', { from: 'MobileModule' }, { root: true }) )
          }

          if ( rootState.general.currentStoreModule === 'TabletModule' ) {
            dispatch( 'grid/clone', { from: 'DesktopModule' }, { root: true })
          }

          if ( rootState.general.currentStoreModule === 'TabletStickyModule' ) {
            dispatch( 'grid/clone', { from: 'TabletModule' }, { root: true })
          }

          if ( rootState.general.currentStoreModule === 'DesktopStickyModule' ) {
            dispatch( 'grid/clone', { from: 'DesktopModule' }, { root: true })
          }
        })

    })

  },

  /**
   * Set given row visibility.
   * Used due to grid clone.
   *
   * @param {function} dispatch Asynchronous invoke action.
   * @param {function} commit Synchronous invoke mutation.
   * @param {Object} rootState Access to global state.
   * @param {Object} payload Object that represents data sends to store
   *    - row {string} row which visibility should be set.
   *    - active {boolean} visible or not.
   * @returns {Promise} Action resolves after mutation is commited.
   */
  setRowActive({ dispatch, commit, rootState }, payload ) {

    dispatch( 'general/setEditorChanged', { hasChanged: true }, { root: true })

    return new Promise((resolve) => {
      commit( `${ rootState.general.currentStoreModule }/SET_ROW_ACTIVE`, payload, { root: true } )
      resolve()
    })
  },

  /**
   * Toggle visuality of `Action Bar` row. No Payload required.
   *
   * @param {function} dispatch Asynchronous invoke action.
   * @param {function} commit Synchronous invoke mutation.
   * @param {Object} rootState Access to global state.
   *
   * @returns {Promise} Action resolves after mutation is commited.
   */
  toggleActionBar({ dispatch, commit, rootState }) {

    dispatch( 'general/setEditorChanged', { hasChanged: true }, { root: true })

    return new Promise(( resolve ) => {
      commit( `${ rootState.general.currentStoreModule }/TOGGLE_ACTION_BAR_FLAG`, void 0, { root: true } )
      resolve()
    })
  },

  /**
   * Toggle visuality of `Second Row` row. No Payload required.
   *
   * @param {function} dispatch Asynchronous invoke action.
   * @param {function} commit Synchronous invoke mutation.
   * @param {Object} rootState Access to global state.
   * @returns {Promise} Action resolves after mutation is commited.
   */
  toggleSecondRow({ dispatch, commit, rootState }) {

    dispatch( 'general/setEditorChanged', { hasChanged: true }, { root: true })

    return new Promise(( resolve ) => {
      commit( `${ rootState.general.currentStoreModule }/TOGGLE_SECOND_ROW_FLAG`, void 0, { root: true } )
      resolve()
    })
  },

}