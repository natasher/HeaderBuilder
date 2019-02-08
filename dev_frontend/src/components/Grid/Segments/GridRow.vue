<template>
  <section :class="classObject">

    <header class="hbr-header" >
      <span class="hbr-title">{{ name }}</span>

      <a href = "#"
        class = "icon-edit"
        @click.passive = "$store.dispatch( 'modals/' + editRowHandler, { $modal: $modal })"
        v-if = "getGridStatus === 'custom'">
          <font-icon icon = "pencil" />
      </a>
    </header>

    <div class = "hbr-container">

      <!-- @slot Insert left cell, (also used for `all` cell) -->
      <slot name = "left" />
      <!-- @slot Insert left cell footer -->
      <slot name = "footer-left" />

      <!-- @slot Insert center cell -->
      <slot name = "center" />
      <!-- @slot Insert center footer -->
      <slot name = "footer-center"/>

      <!-- @slot Insert right cell -->
      <slot name = "right" />
      <!-- @slot Insert right footer -->
      <slot name = "footer-right"/>

    </div>

  </section>
</template>

<script>
import { mapGetters } from 'vuex'
import FontIcon from '../../BaseGeneric/FontIcon.vue'

export default {

  name: 'GridRow',

  components: {
    FontIcon,
  },

  props: {
    /**
     * Name of the row. Displayed as label on row hover.
     */
    name: {
      type    : String,
      required: true,
    },
    /**
     * Function handler determinates behaviour after
     * edit ( pencil ) icon was clicked
     */
    editRowHandler: {
      type    : String,
      required: true,
    },
  },

  computed: {
    ...mapGetters( 'ui', [ 'getGridStatus' ]),

    classObject: function () {
      return {
        'hb-row'    : true,
        'hbr-action': this.name === 'Action Bar',
        'hbr-first' : this.name === 'First Row',
        'hbr-second': this.name === 'Second Row',
      }
    },
  },

}
</script>