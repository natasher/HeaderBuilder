export default {

  /**
   * Add item UUID to reserved UUID`s array.
   *
   * @param {function} commit Synchronous invoke mutation.
   * @returns {Promise}
   */
  addToBlacklist({ commit }, payload) {
    return new Promise(( resolve ) => {
      commit( 'ADD_UUID_TO_BLACKLIST', payload )
      resolve()
    })
  },

  /**
   * Remove item UUID from blacklist
   *
   * @param {function} commit Synchronous invoke mutation.
   * @param {Object} payload Object that represents data sends to store
   *    - itemUuid {object} currently processed item.
   * @returns {Promise} {string} unique uid for the item
   */
  removeFromBlacklist({ commit }, payload) {
    return new Promise((resolve) => {
      commit( 'REMOVE_UUID_FROM_BLACKLIST', payload )
      resolve()
    })
  },

  /**
   * Check if UUID passed in payload exists in the system.
   * If array contains the same uuid, generate next id until
   * it doesn`t exist in the blacklist array.
   *
   * @param {Object} rootState Access to global state.
   * @param {function} dispatch invoke action from store.
   * @returns {Promise} {boolean}
   */
  genUniqueID({ state, dispatch }) {
    return new Promise(( resolve ) => {

      do {

        var newUuid = this._vm.$genid()

      } while( _.contains( state.blacklist, newUuid ) )

      dispatch( 'addToBlacklist', { uuid: newUuid })

      resolve( newUuid )
    })
  },

  /**
   * Assign UUID for the item.
   * If the item has UUID reattach it.
   * Else generate new UUID and check if such ID
   * doesn't exists in the system.
   * If generated UUID is blacklisted, invoke function
   * one more time to generate new one.
   *
   * @param {function} dispatch Asynchronous invoke action.
   * @param {Object} payload Object that represents data sends to store
   *    - itemUuid {object} currently processed item.
   * @returns {Promise} {string} unique uid for the item
   */
  assign({ dispatch }, payload) {
    return new Promise(( resolve ) => {
      const { itemUuid } = payload

      if ( itemUuid !== '' ) {

        resolve( itemUuid )

      } else {

        dispatch( 'genUniqueID' )
          .then((uuid) => {
            resolve( uuid )
          })

      }
    })
  },

}