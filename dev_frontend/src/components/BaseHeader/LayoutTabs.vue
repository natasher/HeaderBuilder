<template>
  <div>

    <ul class = "small">

      <li v-for        = "( position, index ) in layoutPositions"
        :key           = "index"
        :data-position = "position"
        @click         = "handleLayoutPositionClick({ position: position })"
        :class         = "{
                            'active': ( getLayoutPosition === position ) ? true : false,
                          }"
        >
          <span class = "icon"></span>
      </li>

    </ul>

  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {

  name: 'LayoutTabs',

  data() {
    return {
      layoutPositions: [ 'top', 'bottom', 'left', 'right' ],
    }
  },

  computed: {
    ...mapGetters( 'ui', [
      'getLayoutPosition',
    ]),
  },

  methods: {
    ...mapActions( 'ui', [
      'handleLayoutPositionClick',
    ]),

  },

}
</script>
