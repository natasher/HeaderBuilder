import actions from './actions'

export default {

  namespaced: true,

  state: {

    blacklist: [],

  },

  mutations: {

    ADD_UUID_TO_BLACKLIST( state, payload ) {
      state.blacklist.push( payload.uuid )
    },

    REMOVE_UUID_FROM_BLACKLIST( state, payload ) {
      const searchedUuidIndex = _.indexOf( state.blacklist, payload.itemUuid )

      state.blacklist.splice( searchedUuidIndex, 1 )
    },

  },

  actions,

}