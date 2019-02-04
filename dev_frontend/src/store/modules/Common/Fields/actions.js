export default {

  /**
   * Set value for grid (containing rows and cells), adapted for sake of action `fields/setModalFieldValue`.
   *
   * @param {function} dispatch Asynchronous invoke action.
   * @param {function} commit Synchronous invoke mutation.
   * @param {Object} rootState Access to global state.
   * @param {Object} payload Object that represents data sends to store
   *    - name  {string} wpId of the field.
   *    - value {string|number} value of the field
   * @returns {Promise} Action resolves after mutation is commited.
   */
  setGridOptionValue({ dispatch, commit, rootState }, payload ) {

    dispatch( 'general/setEditorChanged', { hasChanged: true }, { root: true })

    return new Promise(( resolve ) => {
      const currentStoreModule = rootState.general.currentStoreModule

      commit( `${ currentStoreModule }/SET_GRID_OPTIONS_VALUE`, payload, { root: true } )
      resolve()
    })
  },

  /**
   * Set value for row (containing cells), adapted for sake of action `fields/setModalFieldValue`.
   *
   * @param {function} dispatch Asynchronous invoke action.
   * @param {function} commit Synchronous invoke mutation.
   * @param {Object} rootState Access to global state.
   * @param {Object} payload Object that represents data sends to store
   *    - name  {string} wpId of the field.
   *    - value {string|number} value of the field
   * @returns {Promise} Action resolves after mutation is commited.
   */
  setRowOptionValue({ dispatch, commit, rootState }, payload ) {

    dispatch( 'general/setEditorChanged', { hasChanged: true }, { root: true })

    return new Promise(( resolve ) => {
      const currentStoreModule = rootState.general.currentStoreModule

      commit( `${ currentStoreModule }/SET_ROW_OPTIONS_VALUE`, payload, { root: true } )
      resolve()
    })
  },

  /**
   * Insert value for Modal Field. This field is used in different places in store
   * so strategy is needed to choose desired method.
   *
   * @param {function} dispatch Asynchronous invoke action.
   * @param {Object} payload Object that represents data sends to store
   *    - as {string:optional}:[ ''(default), 'row', 'grid' ]
   *          determinate method to insert margin field values.
   */
  setModalFieldValue({ dispatch }, payload ) {
    if (payload.as === '') {

      dispatch( 'items/setCurrentFieldValue', payload, { root: true })

    } else if (payload.as === 'styleForm' ) {

      dispatch( 'items/setStyleFormValue', payload, { root: true })

    } else if ( payload.as === 'row' ) {

      dispatch( 'setRowOptionValue', payload )

    } else if ( payload.as === 'grid' ) {

      dispatch( 'setGridOptionValue', payload )

    }
  },

  /**
   * Toggle state of the switch (boolean), based of field wpId.
   * Used inside `SwitchField`
   *
   * @param {function} dispatch Asynchronous invoke action.
   * @param {function} commit Synchronous invoke mutation.
   * @param {Object} getters Access getters inside this module.
   * @param {Object} payload Object that represents data sends to store
   *    - name  {string} wpId of the field.
   * @returns {Promise} Action resolves after mutation is commited.
   */
  toggleSwitchState({ dispatch, commit, getters, rootState }, payload ) {

    dispatch( 'general/setEditorChanged', { hasChanged: true }, { root: true })

    if ( payload.as === '' || payload.as === void 0 ) {

      return new Promise(( resolve ) => {
        const beforeValue = getters.getCurrentFieldValue( payload.name )

        commit( 'items/SET_CURRENT_FIELD_VALUE', {
          name : payload.name,
          value: !beforeValue
        }, { root: true })

        resolve()
      })

    } else if ( payload.as === 'grid' ) {

      return new Promise(( resolve ) => {
        const currentStoreModule = rootState.general.currentStoreModule
        const beforeValue        = getters.getGridOptionValue( payload.name )

        commit( `${ currentStoreModule }/SET_GRID_OPTIONS_VALUE`, {
          name : payload.name,
          value: !beforeValue
        }, { root: true })

        resolve()
      })

    }
  },

  /**
   * Toggle state of the switch (boolean), based of field wpId and given option value.
   * Used inside `OptionsGroup`.
   *
   * @param {function} dispatch Asynchronous invoke action.
   * @param {function} commit Synchronous invoke mutation.
   * @param {Object} getters Access getters inside this module.
   * @param {Object} payload Object that represents data sends to store
   *    - wpId  {string} wpId of the field.
   *    - opt   {string} value of the field.
   * @returns {Promise} Action resolves after mutation is commited.
   */
  toggleOptionSwitch({ dispatch, commit, getters }, payload ) {

    dispatch( 'general/setEditorChanged', { hasChanged: true }, { root: true })

    return new Promise(( resolve ) => {
      const beforeValue = getters.getCurrentFieldValue( payload.wpId, payload.opt )

      commit( 'items/SET_CURRENT_FIELD_VALUE', {
        name    : payload.wpId,
        position: payload.opt,
        value   : !beforeValue,
      }, { root: true })

      resolve()
    })
  },

}