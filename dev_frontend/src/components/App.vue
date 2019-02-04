<template>
  <app-scaffold>

    <base-header slot = "header" />

    <section slot = "main" id = "mfn-hb-main">

      <grid-toolbar />

      <grid />

      <inactive-items v-if = "getCurrentView === 'mobile'" />
      <items-tray    v-once />
      <footer-links  v-once />

    </section>

  </app-scaffold>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import AppScaffold   from './AppScaffold.vue'
import Grid          from './Grid/Grid.vue'
import BaseHeader    from './BaseHeader/BaseHeader.vue'
import GridToolbar   from './BaseHeader/GridToolbar.vue'
import InactiveItems from './Grid/InactiveItems.vue'
import ItemsTray     from './ItemsTray.vue'
import FooterLinks   from './FooterLinks.vue'

export default {

  name: 'App',

  components: {
    AppScaffold,
    Grid,
    BaseHeader,
    GridToolbar,
    InactiveItems,
    ItemsTray,
    FooterLinks,
  },

  computed: mapState( 'general', {
    getCurrentView: state => state.currentView,
  }),

  methods: {
    ...mapActions( 'endpoint', [
      'pushWPMenusList',
      'getStateFromWP',
    ]),

    ...mapActions( 'ui', [
      'changeDevice',
    ]),

    ...mapActions( 'modals', [ 'showLaunchModal' ])
  },

  /** Lifecycle methods: */
  beforeMount() {
    /**
     * AJAX load data to state
     */
    this.pushWPMenusList()
    this.getStateFromWP()
    this.changeDevice({ device: 'desktop' })
  },

  mounted() {
    this.showLaunchModal({ $modal: this.$modal })
  },

}
</script>