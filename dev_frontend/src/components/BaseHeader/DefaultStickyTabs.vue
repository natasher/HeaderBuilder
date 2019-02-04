<template>
  <ul>

    <li :class = "{ 'active': getStickyFlag === 'default' }"
        @click = "setStickyFlag({ type: 'default' })">
      <a data-type = "default">
        Default
      </a>
    </li>

    <li :class = "{ 'active': getStickyFlag === 'sticky' }"
        @click = "setStickyFlag({ type: 'sticky' })"
        v-if   = "showSticky" >
      <a data-type = "sticky">
        Sticky
      </a>
    </li>

  </ul>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex';

export default {

  name: 'DefaultStickyTabs',

  computed: {
    ...mapState( 'general', {
      getCurrentStoreModule: state => state.currentStoreModule,
    }),
    ...mapState( 'ui', {
      getStickyFlag: state => state.stickyFlag,
    }),
    ...mapGetters( 'ui', [ 'getLayoutPosition' ]),

    showSticky() {
      return this.getCurrentStoreModule === 'DesktopModule'
                && ( this.getLayoutPosition === 'top' || this.getLayoutPosition === 'bottom' )
                || this.getCurrentStoreModule !== 'DesktopModule'
    },
  },

  methods: {
    ...mapActions( 'ui', [ 'setStickyFlag' ]),
  },
};
</script>
