<template>
  <grid-row
    name           = "Second Row"
    editRowHandler = "showSecondRowOptionsModal"
    v-if           = "getSecondRowActive" >

    <grid-row-cell
      slot    = "left"
      cellPos = "all"
      key     = "secondRowAll"
      ref     = "secondRowAll"
      row     = "secondRow"
      v-if    = "leftOrRight" />

      <cell-footer
        slot = "footer-left"
        pos  = "left"
        v-if = "leftOrRight" >
          align: bottom
      </cell-footer>

    <grid-row-cell
      slot    = "left"
      cellPos = "left"
      key     = "secondRowLeft"
      ref     = "secondRowLeft"
      row     = "secondRow"
      v-if    = "topOrBottom" />

      <cell-footer
        slot = "footer-left"
        pos  = "left"
        v-if = "topOrBottom" >
          align: left
      </cell-footer>

    <grid-row-cell
      slot    = "center"
      cellPos = "center"
      key     = "secondRowCenter"
      ref     = "secondRowCenter"
      row     = "secondRow"
      v-if    = "topOrBottom" />

      <cell-footer
        slot = "footer-center"
        pos  = "center"
        v-if = "topOrBottom" >
          align: center
      </cell-footer>

    <grid-row-cell
      slot    = "right"
      cellPos = "right"
      key     = "secondRowRight"
      ref     = "secondRowRight"
      row     = "secondRow"
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

  name: 'SecondRow',

  components: {
    GridRow,
    GridRowCell,
    CellFooter,
  },

  computed: {
    ...mapGetters( 'ui', [
      'getSecondRowActive',
      'getLayoutPosition',
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

  methods: mapActions( 'modals', [ 'showSecondRowOptionsModal', ]),

}
</script>
