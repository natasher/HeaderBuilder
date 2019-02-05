import actions from './actions'

export default {

  namespaced: true,

  getters: {

    getCurrentFieldValue: ( state, getters, rootState ) => ( wpId, position = void 0 ) => {
      if ( typeof position === 'undefined' ) {

        return rootState.items.current.form.hasOwnProperty( wpId )
          ? rootState.items.current.form[ wpId ]
          : void 0

      } else {

        return rootState.items.current.form.hasOwnProperty( wpId )
          ? rootState.items.current.form[ wpId ][ position ]
          : void 0

      }
    },

    getStyleFieldValue: ( state, getters, rootState ) => ( wpId ) => {
      return rootState.items.current.style.hasOwnProperty( wpId )
        ? rootState.items.current.style[ wpId ]
        : void 0
    },

    getGridOptionValue: ( state, getters, rootState ) =>
      ( fieldName, position = void 0 ) => {
        const currentModule = rootState.general.currentStoreModule
        const gridOptions   = rootState[ currentModule ][ 'grid' ][ 'options' ]

        if ( currentModule !== '' && position !== '' && typeof position !== 'undefined' ) {

          return gridOptions[ fieldName ][ position ]

        } else if ( currentModule !== '' ) {

          return gridOptions[ fieldName ]

        }
      },

    getRowOptionValue: ( state, getters, rootState ) =>
      ( fieldName, row, position = void 0 ) => {
        const currentModule = rootState.general.currentStoreModule
        const rowOptions    = rootState[ currentModule ][ row ][ 'options' ]
        const name          = fieldName

        if ( currentModule !== '' && typeof rowOptions[name] !== 'undefined' && typeof position !== 'undefined' ) {

          return rowOptions[ name ][ position ]

        } else {

          return rowOptions[ name ]

        }
      },

    getMarginFieldValue: ( state, getters ) =>
      ( fieldName, as = '', row = '', position ) => {
        if ( as === '' ) {

          return getters.getCurrentFieldValue( fieldName, position )

        } else if ( as === 'row' && row !== '' ) {

          return getters.getRowOptionValue( fieldName, row, position )

        } else if ( as === 'grid' ) {

          return getters.getGridOptionValue( fieldName, position )

        }
      },

    getSelectFieldValue: ( state, getters ) =>
      ( fieldName, as = '', row = '', position = void 0 ) => {
        if ( as === '' ) {

          return getters.getCurrentFieldValue( fieldName )

        } else if ( as === 'row' && row !== '' ) {

          return getters.getRowOptionValue( fieldName, row, position )

        } else if ( as === 'grid' ) {

          return getters.getGridOptionValue( fieldName, position )

        }
      },

    getUploadFieldValue: ( state, getters ) =>
      ( fieldName, as = '', row = '', position = void 0 ) => {
        if ( as === '' ) {

          return getters.getCurrentFieldValue( fieldName, position )

        } else if ( as === 'row' && row !== '' ) {

          return getters.getRowOptionValue( fieldName, row, position )

        } else if ( as === 'grid' ) {

          return getters.getGridOptionValue( fieldName, position )

        }
      },

    getColorFieldValue: ( state, getters ) =>
      ( fieldName, as = '', row = '', position = void 0 ) => {
        if (as === '') {

          return getters.getCurrentFieldValue( fieldName )

        } else if ( as === 'styleForm' ) {

          return getters.getStyleFieldValue( fieldName )

        } else if ( as === 'row' && row !== '' ) {

          return getters.getRowOptionValue( fieldName, row, position )

        } else if ( as === 'grid' ) {

          return getters.getGridOptionValue( fieldName, position )

        }
      },

      getSwitchFieldValue: ( state, getters ) =>
        ( fieldName, as = '' ) => {
          if ( as === '' ) {

            return getters.getCurrentFieldValue( fieldName )

          } else if ( as === 'grid' ) {

            return getters.getGridOptionValue( fieldName )

          }
        }

  },

  actions,

}