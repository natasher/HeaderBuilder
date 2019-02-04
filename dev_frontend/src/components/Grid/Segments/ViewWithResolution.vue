<template>
  <span class = "title">
    {{ getCurrentView | capitalize }}<span class="res">{{ getCurrentBreakpoint }}</span>
  </span>
</template>

<script>
import { mapState   } from 'vuex'
import { capitalize } from '../../../filters/index'

export default {

  name: 'ViewWithResolution',

  computed: {
    ...mapState( 'general', {
      getCurrentView      : state => state.currentView,
    }),

    ...mapState( 'ui', {
      getCurrentBreakpoint: state => state.currentBreakpoint,
    }),
  },

  filters: {
    capitalize,
  },

}
</script>
