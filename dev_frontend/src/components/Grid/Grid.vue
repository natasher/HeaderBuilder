<template>
  <div
    class        = "grid"
    :data-status = "getGridStatus">

    <wrapper-clearfix class = "window primary">

      <grid-header />

      <wrapper-clearfix class = "main">

        <action-bar />
        <first-row  />
        <second-row />

      </wrapper-clearfix>

      <div class = "grid-auto" v-if = "getGridStatus === 'auto'">
        You're in Auto Mode
      </div>

    </wrapper-clearfix>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import WrapperClearfix from '../BaseGeneric/WrapperClearfix.vue'
import GridHeader      from './Segments/GridHeader.vue'
import ActionBar       from './Rows/ActionBar.vue'
import FirstRow        from './Rows/FirstRow.vue'
import SecondRow       from './Rows/SecondRow.vue'

export default {

  name: 'Grid',

  components: {
    WrapperClearfix,
    GridHeader,
    ActionBar,
    FirstRow,
    SecondRow,
  },

  computed: {
    ...mapGetters( 'ui', [ 'getGridStatus' ]),
  },

}
</script>
