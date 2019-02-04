export default {

  // TODO: payload.item jest chyba zbędne
  /**
   * Pointer to item currently in use, with its location on the grid (row, cellPos, cellId).
   * Used inside item's modals.
   * TODO: bullshit!
   * When no item is given, set empty object.
   *
   * @param {function} commit Synchronous invoke mutation.
   * @param {Object} rootState Access to global state.
   * @param {Object} payload Object that represents data sends to store
   *    - item     {object} represents item should contain prop **name** and **form**.
   *    - row      {string} name of the row.
   *    - cellId   {number} placement ( LTR ) inside given cell.
   *    - cellPos  {string : 'all'|'left'|'center'|'right'} Position of the cell.
   * @returns {Promise} Action resolves after mutation is commited.
   */
  setCurrentItem({ commit, rootState }, payload ) {
    const {
      item,
      row,
      cellId,
      cellPos,
    } = payload

    if ( typeof item !== 'undefined' ) {
      const currentStoreModule = rootState.general.currentStoreModule
      const item               = rootState[ currentStoreModule ][ row ][ 'items' ][ cellPos ][ cellId ] || {}

      return new Promise(( resolve ) => {
        commit( 'SET_CURRENT_ITEM', item )
        resolve()
      })

    } else {

      return new Promise(( resolve ) => {
        commit( 'SET_CURRENT_ITEM', {} )
        resolve()
      })

    }
  },

  /**
   * Put item or items to rootState[ 'items/tmpItem' ].
   * Used inside action `cell/CopyRowCellsToAll` to change location of the item,
   * due to joining rows.
   *
   * @param {function} commit Synchronous invoke mutation.
   * @param {Object} payload Object that represents data sends to store
   *    - item {object} item or items to be moved as temporary.
   * @returns {Promise} Action resolves after mutation is commited.
   */
  setTemporaryItem({ commit }, payload ) {
    return new Promise(( resolve ) => {
      commit( 'SET_TEMP_ITEM', payload )
      resolve()
    })
  },

  /**
   * Save item form in grid.
   *
   * @param {function} commit Synchronous invoke mutation.
   * @param {Object} rootState Access to global state.
   * @param {Object} payload Object that represents data sends to store
   *    - new_item {object} represents item should contain prop **name** and **form**.
   *    - priv.row      {string}:[ 'actionBar', 'firstRow', 'secondRow' ]
   *    - priv.cellId   {number} >= 0
   *    - priv.cellPos  {string : 'all'|'left'|'center'|'right'} Position of the cell.
   * @returns {Promise} Action resolves after mutation is commited.
   */
  saveForm({ commit, rootState }, payload ) {
    return new Promise(( resolve ) => {
      commit( `${ rootState.general.currentStoreModule }/SAVE_ITEM_FORM`,
        {
          new_item: payload.new_item,
          row     : payload.priv.row,
          cellId  : payload.priv.cellId,
          cellPos : payload.priv.cellPos,
        },
        { root: true })
      resolve()
    })
  },

  /**
   * Set or change value of the field that user edit.
   * Used inside field components.
   *
   * @param {function} commit Synchronous invoke mutation.
   * @param {function} dispatch Asynchronous invoke action.
   * @param {Object} payload Object that represents data sends to store
   *    - name  {string} wpId of the field
   *    - value {string|number|object} value of the field
   * @returns {Promise} Action resolves after mutation is commited.
   */
  setCurrentFieldValue({ commit, dispatch }, payload ) {

    dispatch( 'general/setEditorChanged', { hasChanged: true }, { root: true })

    return new Promise(( resolve ) => {
      commit( 'SET_CURRENT_FIELD_VALUE', payload )
      resolve()
    })
  },

  /**
   * Set or change value of the item style field.
   *
   * @param {function} commit Synchronous invoke mutation.
   * @param {function} dispatch Asynchronous invoke actin.
   * @param {Object} payload Object that replresents data sends to store
   *    - name  {string} wpId of the field
   *    - value {string|number|object} value of the field
   * @returns {Promise} Action resolves after mutation is commited.
   */
  setStyleFormValue({ commit, dispatch }, payload) {

    dispatch( 'general/setEditorChanged', { hasChanged: true }, { root: true })

    return new Promise((resolve) => {
      commit( 'SET_STYLE_FORM_VALUE', payload )
      resolve()
    })
  },

  /**
   * Add new entry to given field value (which is an array).
   * Used inside `IconsFields`.
   *
   * @param {function} dispatch Asynchronous invoke action.
   * @param {function} commit Synchronous invoke mutation.
   * @param {Object} payload Object that represents data sends to store
   *    - name  {string} wpId of the field.
   *    - entry {object} Object contains pair record:
   *      * icon {string} icon name.
   *      * url  {string} when icon is clicked redirect to this url.
   * @returns {Promise} Action resolves after mutation is commited.
   */
  pushCurrentFieldEntry({ dispatch, commit }, payload ) {

    dispatch( 'general/setEditorChanged', { hasChanged: true }, { root: true })

    return new Promise(( resolve ) => {
      commit( 'PUSH_CURRENT_FIELD_ENTRY', payload )
      resolve()
    })
  },

  /**
   * Delete entry from given field value array.
   * Used inside `IconsField`
   *
   * @param {function} dispatch Asynchronous invoke action.
   * @param {function} commit Synchronous invoke mutation.
   * @param {Object} payload Object that represents data sends to store
   *    - name  {string} wpId of the field.
   *    - index {number} index of the item to remove.
   * @returns {Promise} Action resolves after mutation is commited.
   */
  removeCurrentFieldEntry({ dispatch, commit }, payload ) {

    dispatch( 'general/setEditorChanged', { hasChanged: true }, { root: true })

    return new Promise(( resolve ) => {
      commit( 'REMOVE_CURRENT_FIELD_ENTRY', payload )
      resolve()
    })
  },

}