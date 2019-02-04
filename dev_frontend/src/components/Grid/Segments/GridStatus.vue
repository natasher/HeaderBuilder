<template>
  <div class = "status">
    <span class = "label">Status</span>

    <ul>

      <li
        v-show = "getStickyFlag === 'sticky'"
        :class = "{ 'active': getGridStatus === 'off' }"
        @click.passive = "setGridStatus({ status: 'off' })" >
          Off
      </li>

      <li
        :class = "{ 'active': getGridStatus === 'custom' }"
        @click.passive = "setGridStatus({ status: 'custom' })" >
          Custom
      </li>

      <li
        v-show = "getCurrentView !== 'desktop' || getStickyFlag !== 'default'"
        :class = "{ 'active': getGridStatus === 'auto' }"
        @click.passive = "handleAutoClick({ $modal: $modal })" >
          Auto
      </li>

    </ul>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex'

export default {

  name: 'GridStatus',

  methods: mapActions( 'ui', [
            'setGridStatus',
            'handleAutoClick'
          ]),

  computed: {
    ...mapState( 'general', {
      getCurrentView: state => state.currentView,
    }),

    ...mapState( 'ui', {
      getStickyFlag : state => state.stickyFlag,
    }),

    ...mapGetters( 'ui', [ 'getGridStatus' ]),
  },

}
</script>
