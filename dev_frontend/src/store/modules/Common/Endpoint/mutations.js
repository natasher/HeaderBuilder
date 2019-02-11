export default {

  PUSH_WP_MENUES( state, payload ) {
    state.wpMenusList.push( payload )
  },

  SET_FONTS_LIST( state, payload ) {
    state.mfnFonts = payload.fonts
  }

}