<template>
 <wrapper-clearfix class="general">

      <default-sticky-tabs class="tabs" />

      <wrapper-section title="Show rows"
        class="rows">
          <base-switch
            label         = "Action bar"
            :isActive     = "getActionBarActive"
            @click.native = "toggleActionBar" />

          <base-switch
            label         = "Second row"
            :isActive     = "getSecondRowActive"
            @click.native = "toggleSecondRow" />
      </wrapper-section>

      <wrapper-section title = "Layouts"
        class = "layouts"
        v-if = "getCurrentStoreModule === 'DesktopModule'">
        <layout-tabs class = "select-position" />
      </wrapper-section>

  </wrapper-clearfix>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'

import WrapperClearfix   from '../BaseGeneric/WrapperClearfix.vue'
import WrapperSection    from '../BaseGeneric/WrapperSection.vue'
import BaseSwitch        from '../BaseGeneric/BaseSwitch.vue'
import DefaultStickyTabs from './DefaultStickyTabs.vue'
import LayoutTabs        from './LayoutTabs.vue'

export default {

  name: 'GridToolbar',

  components: {
    WrapperClearfix,
    WrapperSection,
    BaseSwitch,
    DefaultStickyTabs,
    LayoutTabs,
  },

  computed: {
    ...mapState( 'general', {
      getCurrentStoreModule: state => state.currentStoreModule,
    }),
    ...mapGetters( 'ui', [
      'getActionBarActive',
      'getSecondRowActive'
    ]),
  },

  methods: {
    ...mapActions( 'ui', [
      'toggleActionBar',
      'toggleSecondRow'
    ]),

  },
}
</script>
