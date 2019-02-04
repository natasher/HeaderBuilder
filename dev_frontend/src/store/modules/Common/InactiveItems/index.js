export default {

  namespaced: true,

  getters: {

    getInactiveItems( state, getters, rootState ) {
      const currentModule = rootState.general.currentStoreModule

      if ( currentModule !== '' ) {
        return rootState[ currentModule ].inactiveItems
      }
    },

  },

  actions: {

    /**
     * Insert the `item` at the end of `MobileModule/inactiveItems` Array
     * ( same at MobileStickyModule ).
     * Authors recommendation for Mobile devices is leave only 'logo' and 'menu' item for the header.
     * The User has possiblity to drag cloned items from `inactiveItems` to header grid back.
     *
     * @param {function} commit Synchronous invoke mutation.
     * @param {Object} rootState Access to global state.
     * @param {Object} payload Object that represents data sends to store
     *    - item {object}
     * @returns {Promise} Action resolves after mutation is commited.
     */
    putItem({ commit, rootState }, payload ) {
      return new Promise(( resolve ) => {
        commit( `${ rootState.general.currentStoreModule }/PUT_TO_INACTIVE`, payload, { root: true } )
        resolve()
      })
    },

    /**
     * Remove item object from inactiveItems array.
     *
     * @param {function} commit Synchronous invoke mutation.
     * @param {Object} rootState Access to global state.
     * @param {Object} payload Object that represents data sends to store
     *    - cellId {number} position where removed item lays.
     * @returns {Promise} Action resolves after mutation is commited.
     */
    removeItem({ commit, rootState }, payload ) {
      return new Promise(( resolve ) => {
        const currentStoreModule = rootState.general.currentStoreModule

        commit( `${ currentStoreModule }/REMOVE_ITEM_FROM_INACTIVE`, payload, { root: true })

        resolve()
      })
    },

    /**
     * Clear the `MobileModule{Sticky}/inactiveItems` cell by replacing its content with empty array.
     * Purpose: avoid duplicating items in the cells.
     * No payload is needed.
     *
     * @param {function} commit Synchronous invoke mutation.
     * @param {Object} rootState Access to global state.
     * @returns {Promise} Action resolves after mutation is commited.
     */
    clear({ commit, rootState }) {
      return new Promise(( resolve ) => {
        commit( `${ rootState.general.currentStoreModule }/CLEAR_INACTIVE_ITEMS`, void 0, { root: true } )
        resolve()
      })
    },

    /**
     * Copy inactive items from MobileModule to MobileStickyModule
     *
     * @param {function} dispatch Asynchronous invoke action.
     * @param {Object} rootState Access to global state.
     * @returns {Promise} Action resolves after mutation is commited.
     */
    copy({ dispatch, rootState }) {
      return new Promise(( resolve ) => {
        const inactiveItems = rootState.MobileModule.inactiveItems

        _.each( inactiveItems, function ( item ) {
          dispatch( 'putItem', { item: item })
        })

        resolve()
      })
    },

  },

}