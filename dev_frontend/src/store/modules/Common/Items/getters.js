export default {

  getOriginalItem: ( state, getters, rootState ) => ( row, cellPos, cellId ) => {
    const currentModule = rootState.general.currentStoreModule

    if ( typeof currentModule !== 'undefined' ) {
      return rootState[ currentModule ][ row ][ 'items' ][ cellPos ][ cellId ]
    }
  },

  getActionBarItemsAll( state, getters, rootState ) {
    const currentModule = rootState.general.currentStoreModule

    if ( currentModule !== '' ) {
      return rootState[ currentModule ].actionBar.items.all
    }
  },

  getActionBarItemsLeft( state, getters, rootState ) {
    const currentModule = rootState.general.currentStoreModule

    if ( currentModule !== '' ) {
      return rootState[ currentModule ].actionBar.items.left
    }
  },

  getActionBarItemsCenter( state, getters, rootState ) {
    const currentModule = rootState.general.currentStoreModule

    if ( currentModule !== '' ) {
      return rootState[ currentModule ].actionBar.items.center
    }
  },

  getActionBarItemsRight( state, getters, rootState ) {
    const currentModule = rootState.general.currentStoreModule

    if ( currentModule !== '' ) {
      return rootState[ currentModule ].actionBar.items.right
    }
  },

  getFirstRowItemsLeft( state, getters, rootState ) {
    const currentModule = rootState.general.currentStoreModule

    if ( currentModule !== '' ) {
      return rootState[ currentModule ].firstRow.items.left
    }
  },

  getFirstRowItemsCenter( state, getters, rootState ) {
    const currentModule = rootState.general.currentStoreModule

    if ( currentModule !== '' ) {
      return rootState[ currentModule ].firstRow.items.center
    }
  },

  getFirstRowItemsRight( state, getters, rootState ) {
    const currentModule = rootState.general.currentStoreModule

    if ( currentModule !== '' ) {
      return rootState[ currentModule ].firstRow.items.right
    }
  },

  getSecondRowItemsAll( state, getters, rootState ) {
    const currentModule = rootState.general.currentStoreModule

    if ( currentModule !== '' ) {
      return rootState[ currentModule ].secondRow.items.all
    }
  },

  getSecondRowItemsLeft( state, getters, rootState ) {
    const currentModule = rootState.general.currentStoreModule

    if ( currentModule !== '' ) {
      return rootState[ currentModule ].secondRow.items.left
    }
  },

  getSecondRowItemsCenter( state, getters, rootState ) {
    const currentModule = rootState.general.currentStoreModule

    if ( currentModule !== '' ) {
      return rootState[ currentModule ].secondRow.items.center
    }
  },

  getSecondRowItemsRight( state, getters, rootState ) {
    const currentModule = rootState.general.currentStoreModule

    if ( currentModule !== '' ) {
      return rootState[ currentModule ].secondRow.items.right
    }
  },

}