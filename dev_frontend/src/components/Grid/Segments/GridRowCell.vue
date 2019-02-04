<template>
  <draggable
    :class      = "classObject"
    :style      = "`width: calc( ${ cellWidth }% - 4px )`"
    :data-title = "dataTitle"
    :key        = "rowKey"
    v-model     = "itemsModel"
    @change     = "onCellChange"
    :options    = "{
      group: {
        name: 'items',
      },
      disabled: ( getGridStatus === 'off' || getGridStatus === 'auto' )
                  ? true
                  : false,
      scroll: true,
      scrollSensitivity: 70,
      scrollSpeed: 10,
      animation: 150,
    }"
    data-placeholder = "Drop item here" >

    <base-item
      v-for   = "( item, index ) in itemsModel"
      :row    = "row"
      :cellPos= "cellPos"
      :class  = "{ 'disabled': ( getGridStatus === 'off' ) }"
      :item   = "item"
      :key    = "item.uuid"
      :cellId = "index" />

  </draggable>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { capitalize } from '../../../filters/index'
import BaseItem  from '../../BaseItem.vue'
import draggable from 'vuedraggable'

export default {

  name: 'GridRowCell',

  props: {
    /**
     * Which row current component instance represents:
     *    [ 'actionBar', 'firstRow', 'secondRow' ]
     */
    row: {
      type    : String,
      required: true,
    },
    /**
     * Which current celll instance represents:
     *    [ 'all', 'left', 'center', 'right' ]
     */
    cellPos: {
      type    : String,
      required: true,
    },
  },

  components: {
    BaseItem,
    draggable,
  },

  data() {
    return {
      /**
       * @model
       */
      itemsModelName: '',
      rowKey        : '',
      dataTitle     : '',
      tmpItems      : void 0,
    }
  },

  computed: {
    ...mapGetters( 'ui', [
      'getGridStatus',
      'getLayoutPosition',
    ]),

    classObject: function() {
      return `hb-col hbc-${ this.cellPos }`
    },

    itemsModel: {
      get() {
        return this.$store.getters[ `items/get${ this.itemsModelName }` ]
      },
      set(items) {
        this.tmpItems = items
      },
    },

    cellWidth: function() {
      if (
        this.getLayoutPosition === 'left' || this.getLayoutPosition === 'right'
      ) {
        return '100'
      } else {
        return '33.3'
      }
    },
  },

  methods: {
    ...mapActions( 'cell', [ 'onChange' ]),

    onCellChange(event) {
      this.onChange({
        event    : event,
        row      : this.row,
        cellPos  : this.cellPos,
        tmpItems : this.tmpItems,
      })
    },
  },

  /** Lifecycle methods: */
  created() {
    const row  = this.row
    const cell = this.cellPos

    /**
     * @model
     */
    this.itemsModelName = `${ capitalize( row ) }Items${ capitalize( cell ) }`
    this.rowKey         = `${ row }${ capitalize( cell ) }`
    this.dataTitle      = `align ${ cell }`
  },
}
</script>
