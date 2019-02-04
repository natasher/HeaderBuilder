import actions from './actions'

export default {

  namespaced: true,

  state: {
    currentBreakpoint : '',
    stickyFlag        : 'default',
  },

  mutations: {

    SET_CURRENT_BREAKPOINT( state, payload ) {
      state.currentBreakpoint = payload.breakpoint
    },

    SET_STICKY_FLAG( state, payload ) {
      state.stickyFlag = payload.type
    },

  },

  getters: {

    getLayoutPosition( state, getters, rootState ) {
      const currentModule = rootState.general.currentStoreModule

      if ( currentModule !== '' ) {
        return rootState[ currentModule ].layoutPosition
      }
    },

    getActionBarActive( state, getters, rootState ) {
      const currentModule = rootState.general.currentStoreModule

      if ( currentModule !== '' ) {
        return rootState[ currentModule ].actionBar.active
      }
    },

    getSecondRowActive( state, getters, rootState ) {
      const currentModule = rootState.general.currentStoreModule

      if ( currentModule !== '' ) {
        return rootState[ currentModule ].secondRow.active
      }
    },

    getGridStatus( state, getters, rootState ) {
      const currentModule = rootState.general.currentStoreModule

      if ( currentModule !== '' ) {
        return rootState[ currentModule ].grid.status
      }
    },

  },

  actions,

}