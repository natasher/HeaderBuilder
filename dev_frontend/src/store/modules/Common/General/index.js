export default {

  namespaced: true,

  state: {
    currentView       : '',
    currentStoreModule: '',
    editorHasChanged  : false,
  },

  mutations: {

    SET_CURRENT_VIEW( state, payload ) {
      state.currentView = payload.view
    },

    SET_CURRENT_STORE_MODULE( state, payload ) {
      state.currentStoreModule = payload.storeModule
    },

    EDITOR_HAS_CHANGED( state, payload ) {
      state.editorHasChanged = payload.hasChanged
    },

  },

  actions: {

    /**
     * If state `general/editorHasChanged` is set to true and user click other header grid,
     * `Auto Mode Modal` will be shown.
     *
     * @param {function} commit Synchronous invoke mutation.
     * @param {Object} payload Object that represents data sends to store
     *    - hasChanged {boolean} If editor changed?
     * @returns {Promise} Action resolves after mutation is commited.
     */
    setEditorChanged({ commit }, payload ) {
      return new Promise(( resolve ) => {
        commit( 'EDITOR_HAS_CHANGED', payload )
        resolve()
      })
    },

    /**
     * Determinates currently used viewport then appropriate breakpoint is set.
     * Action used inside route view components ( #beforeMount lifecycle hook ).
     *
     * @param {function} commit Synchronous invoke mutation.
     * @param {function} dispatch Asynchronous invoke action.
     * @param {Object} payload Object that represents data sends to store
     *    - payload.view : [
     *        'desktop',
     *        'tablet',
     *        'mobile'
     *      ]
     * @returns {Promise} Action resolves after mutation is commited and appropriate breakpoint is set.
     */
    setCurrentView({ commit, dispatch }, payload ) {
      return new Promise(( resolve ) => {
        const view = payload.view

        commit( 'SET_CURRENT_VIEW', payload )

        if ( view === 'desktop' ) {
          dispatch( 'ui/setBreakpoint', { breakpoint: '>= 960' }, { root: true }).then( resolve() )
        } else if (view === 'tablet') {
          dispatch( 'ui/setBreakpoint', { breakpoint: '< 960'  }, { root: true }).then( resolve() )
        } else {
          dispatch( 'ui/setBreakpoint', { breakpoint: '< 768'  }, { root: true }).then( resolve() )
        }

      })
    },

    /**
     * Determinates currently used store module.
     * Action used inside route view components ( #beforeMount lifecycle hook ) and action `ui/setStickyFlag`.
     *
     * @param {function} commit Synchronous invoke mutation.
     * @param {Object} payload Object that represents data sends to store
     *    - storeModule : [
     *        'desktopModule',
     *        'desktopStickyModule',
     *        'tabletModule',
     *        'tabletStickyModule',
     *        'mobileModule',
     *        'mobileStickyModule',
     *      ]
     * @returns {Promise} Action resolves after mutation is commited.
     */
    setCurrentStoreModule({ commit }, payload ) {
      return new Promise(( resolve ) => {
        commit( 'SET_CURRENT_STORE_MODULE', payload )
        resolve()
      })
    },

  }

}