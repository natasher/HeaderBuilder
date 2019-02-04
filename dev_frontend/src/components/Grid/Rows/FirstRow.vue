<template>
  <grid-row
    name           = "First Row"
    editRowHandler = "showFirstRowOptionsModal">

    <grid-row-cell
      slot    = "left"
      cellPos = "left"
      key     = "firstRowLeft"
      ref     = "firstRowLeft"
      row     = "firstRow" />

      <cell-footer
        slot = "footer-left"
        pos  = "left"
        key  = "left-middle-pos" >
          {{ leftOrRight ? 'align: middle' : 'align: left' }}
      </cell-footer>

    <grid-row-cell
      slot    = "center"
      cellPos = "center"
      key     = "firstRowCenter"
      ref     = "firstRowCenter"
      row     = "firstRow" />

      <cell-footer
        slot = "footer-center"
        pos  = "center"
        v-if = "topOrBottom" >
          align: center
      </cell-footer>

    <grid-row-cell
      slot    = "right"
      cellPos = "right"
      key     = "firstRowRight"
      ref     = "firstRowright"
      row     = "firstRow" />

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

  name: 'FirstRow',

  components: {
    GridRow,
    GridRowCell,
    CellFooter,
  },

  computed: {
    ...mapGetters( 'ui', [ 'getLayoutPosition' ]),

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
    ...mapActions( 'modals', [ 'showFirstRowOptionsModal' ]),
  },

}
</script>
