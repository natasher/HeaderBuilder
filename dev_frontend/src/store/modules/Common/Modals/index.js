import { toCamelCase, capitalize } from '../../../../filters/index'
import { infoAutoMode, onBuilderReset, afterBuilderReset, onLaunch } from '../../../dialogs'

export default {

  namespaced: true,

  actions: {

    /**
     * Opens Grid options modal (grid contains all rows and cells).
     * vue-js-modal instance is passed by payload object.
     *
     * @param {Object} payload Object that represents data sends to store.
     *    - $modal : $modal.
     */
    showGridOptionsModal( {}, payload ) {
      payload.$modal.show( 'ModalGrid', payload )
    },

    /**
     * Opens ActionBar options modal.
     * vue-js-modal instance is passed by payload object.
     *
     * @param {Object} payload Object that represents data sends to store.
     *    - $modal : $modal
     */
    showActionBarOptionsModal( {}, payload ) {
      payload.$modal.show( 'ModalActionBar', payload )
    },

    /**
     * Opens FirstRow options modal.
     * vue-js-modal instance is passed by payload object.
     *
     * @param {Object} payload Object that represents data sends to store.
     *    - $modal : $modal
     */
    showFirstRowOptionsModal( {}, payload ) {
      payload.$modal.show( 'ModalFirstRow', payload )
    },

    /**
     * Opens SecondRow options modal.
     * vue-js-modal instance is passed by payload object.
     *
     * @param {Object} payload Object that represents data sends to store.
     *    - $modal : $modal.
     */
    showSecondRowOptionsModal( {}, payload ) {
      payload.$modal.show( 'ModalSecondRow', payload )
    },

    /**
     * Opens modal with item properties form.
     * vue-js-modal instance is passed by payload object.
     *
     * @param {Object} rootGetters Access to all modules getters.
     * @param {Object} payload Object that represents data sends to store
     *    - $modal : $modal.
     *    - originalCoords : item`s originalCoords
     */
    showModalItemForm({ rootGetters }, payload ) {
      /**
       * Compute Modal name based on **item.name**.
       *
       * @const
       * @type {string}
       */
      const origin     = payload.originalCoords
      const originItem = rootGetters[ 'items/getOriginalItem' ](
        origin.row,
        origin.cellPos,
        origin.cellId
      );
      const name      = originItem.name
      const nameCCC   = capitalize(toCamelCase( name ))
      const modalName = `Modal${nameCCC}`

      payload.$modal.show( modalName, payload )
    },

    /**
     * Action handle `Auto Mode Modal` logic.
     * If user confirm `Auto` mode, items from `DesktopModule` grid will be copied,
     * otherwise given grid will be set to `Custom` status.
     *
     * @param {function} dispatch Asynchronous invoke action.
     * @param {Object} payload Object that represents data sends to store
     *    - $modal : $modal - vue-js-modal instance
     */
    showAutoModeModal ({ dispatch }, payload ) {

      return new Promise((resolve, reject) => {
        payload.$modal.show( 'MfnGenericModal', {
          title: 'Info',
          text : infoAutoMode,
          buttons: [
            {
              text: 'Cancel',
              handler: () => {

                payload.$modal.hide( 'MfnGenericModal' )

                reject()

              }
            },
            {
              text: 'Ok',
              handler: () => {

                dispatch( 'general/setEditorChanged', { hasChanged: true   }, { root: true })
                dispatch( 'ui/setGridStatus',         { status:     'auto' }, { root: true })

                payload.$modal.hide( 'MfnGenericModal' )

                resolve()

              }
            },
          ]
        })
      })

    },

    /**
     * Open modal with warning that this is a beta version.
     *
     * @param {Object} payload Object that represents data sends to store
     *    - $modal : $modal - vue-js-modal instance
     */
    showLaunchModal ({ }, payload ) {

      payload.$modal.show( 'MfnGenericModal', {
        title       : 'Welcome to the BeTheme Header Builder',
        text        : onLaunch,
        closeOnClick: true,
      })

    },

    /**
     * Open modal with warning save header warning.
     *
     * @param {Object} payload Object that represents data sends to store
     *  - $modal : $modal - vue-js-modal instance
     */
    // showSaveModal({ }, payload) {
    //   return new Promise((resolve, reject) => {
    //     payload.$modal.show('MfnGenericModal', {
    //       title: 'Warning',
    //       text: onSaveWarning,
    //       buttons: [
    //         {
    //           text: 'Cancel',
    //           handler: () => {

    //             payload.$modal.hide( 'MfnGenericModal' )

    //             reject()

    //           }
    //         },
    //         {
    //           text: 'Ok',
    //           handler: () => {

    //             payload.$modal.hide( 'MfnGenericModal' )

    //             resolve()

    //           }
    //         },
    //       ]
    //     })
    //   })
    // },

    /**
     * Open confirmation modal if the user is sure
     * to reset the builder.
     * When OK is clicked then resolve and clear the states
     * When Cancel is clicked then action is rejected
     *
     * @param {function} dispatch Asynchronous invoke action.
     * @param {Object} payload Object that represents data sends to store
     *    - $modal : $modal - vue-js-modal instance
     */
    showResetBuilderModal ({ }, payload ) {

      return new Promise((resolve, reject) => {
        payload.$modal.show( 'MfnGenericModal', {
          title: 'Warning',
          text : onBuilderReset,
          buttons: [
            {
              text: 'Cancel',
              handler: () => {

                payload.$modal.hide( 'MfnGenericModal' )

                reject()

              }
            },
            {
              text: 'Ok',
              handler: () => {

                payload.$modal.hide( 'MfnGenericModal' )

                resolve()

              }
            },
          ]
        })
      })

    },

    /**
     * Open modal confirming that Header Builder is now restored
     * to initial state.
     *
     * @param {Object} payload Object that represents data sends to store
     *    - $modal : $modal - vue-js-modal instance
     */
    showAfterBuilderResetModal({ }, payload ) {

      payload.$modal.show( 'MfnGenericModal', {
        title       : 'Info',
        text        : afterBuilderReset,
        closeOnClick: true,
      })

    },

  }
}