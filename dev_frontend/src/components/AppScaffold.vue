<template>
  <wrapper-clearfix
    id             = "mfn-wrapper"
    class          = "mfn-hb"
    :data-device   = "getCurrentView"
    :data-position = "getLayoutPosition || 'top'"
    :data-type     = "getStickyFlag"
    v-cloak >

    <wrapper-clearfix id = "mfn-hb-header">

      <!-- @slot Place App header in here -->
      <slot name = "header" />

    </wrapper-clearfix>

    <!-- @slot App main part, grid etc. -->
    <slot name = "main" />

    <modals-list />
  </wrapper-clearfix>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import ModalsList      from './ModalsList.vue'
import WrapperClearfix from './BaseGeneric/WrapperClearfix.vue'

export default {

  name: 'AppScaffold',

  components: {
    ModalsList,
    WrapperClearfix,
  },

  computed: {
    ...mapState( 'general', {
      getCurrentView: state => state.currentView,
    }),
    ...mapState( 'ui', {
      getStickyFlag: state => state.stickyFlag,
    }),
    ...mapGetters( 'ui', [ 'getLayoutPosition' ]),
  },
}
</script>
