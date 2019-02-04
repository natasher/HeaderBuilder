<template>
  <grid-row
    name           = "Action Bar"
    editRowHandler = "showActionBarOptionsModal"
    v-if           = "getActionBarActive">

    <grid-row-cell
      slot      = "left"
      key       = "actionBarAll"
      ref       = "actionBarAll"
      row       = "actionBar"
      cellPos   = "all"
      v-if      = "leftOrRight" />

        <cell-footer
          slot = "footer-left"
          pos  = "left"
          v-if = "leftOrRight">
            align: top
        </cell-footer>

    <grid-row-cell
      slot      = "left"
      key       = "actionBarLeft"
      ref       = "actionBarLeft"
      row       = "actionBar"
      cellPos   = "left"
      v-if      = "topOrBottom" />

        <cell-footer
          slot = "footer-left"
          pos  = "left"
          v-if = "topOrBottom">
            align: left
        </cell-footer>

    <grid-row-cell
      slot    = "center"
      key     = "actionBarCenter"
      ref     = "actionBarCenter"
      row     = "actionBar"
      cellPos = "center"
      v-if    = "topOrBottom" />

        <cell-footer
          slot = "footer-center"
          pos  = "center"
          v-if = "topOrBottom" >
            align: center
        </cell-footer>

    <grid-row-cell
      slot    = "right"
      key     = "actionBarRight"
      ref     = "actionBarRight"
      row     = "actionBar"
      cellPos = "right"
      v-if    = "topOrBottom" />

        <cell-footer
          slot = "footer-right"
          pos  = "right"
          v-if = "topOrBottom" >
            align: right
        </cell-footer>

  </grid-row>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import GridRow     from '../Segments/GridRow.vue'
import GridRowCell from '../Segments/GridRowCell.vue'
import CellFooter  from '../Segments/CellFooter.vue'

export default {

  name: 'ActionBar',

  components: {
    GridRow,
    GridRowCell,
    CellFooter,
  },

  computed: {
    ...mapGetters( 'ui', [
      'getActionBarActive',
      'getLayoutPosition'
    ]),

    leftOrRight: function() {
      return (
        this.getLayoutPosition === 'left' || this.getLayoutPosition === 'right'
      )
    },

    topOrBottom: function() {
      return !this.leftOrRight
    },
  },

  methods: {
    ...mapActions( 'modals', [ 'showActionBarOptionsModal' ]),
  },
}
</script>
