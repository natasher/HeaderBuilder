<template>
  <div
    class        = "hb-item"
    :class       = "{'hb-item-placeholder': placeholder}"
    :data-type   = "item.name"
    :data-cellId = "cellId">

    <span class = "icons">

      <a class = "icon-edit">
        <i
          class          = "icon-pencil"
          @click.passive = "showForm">
        </i>
      </a>

      <a class = "icon-delete">
        <i
          class          = "icon-cancel"
          @click.passive = "destroyItem">
        </i>
      </a>

    </span>

    <div
      class  = "image"
      v-show = "!placeholder">
        <font-icon :icon="itemIcon" />
    </div>

    <span
      class  = "title"
      v-show = "!placeholder">
        {{ item.name | unCamelCase }}
    </span>

  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { unCamelCase } from '../filters/index'
import FontIcon from './BaseGeneric/FontIcon.vue'

export default {

  name: 'BaseItem',

  components: {
    FontIcon
  },

  filters: {
    unCamelCase
  },

  props: {
    /**
     * Pass `Item` object which instance will represent.
     * The `Item` must have at least two properties: name & icon.
     * The `item.form` is taken from store editor grid,
     * based on other passed props: `row`, `cellPos`, `cellId`.
     */
    item: {
      type    : Object,
      required: true,
    },
    /**
     * cellId - item `id` in grid-cell array (from left, starts at 0)
     * If non is given, the item is in the `ItemsTray`.
     */
    cellId: {
      type    : Number,
      required: false,
      default : void 0,
    },
    /**
     * In which row the `Item` lays.
     * If non is given, the item is in the `ItemsTray`.
     *    [ 'actionBar', 'fristRow', 'secondRow' ]
     */
    row: {
      type    : String,
      required: false,
      default : void 0,
    },
    /**
     * In which cell in row, the `Item` lays.
     * If non is given, the item is in the `ItemsTray`.
     *    [ 'all', 'left', 'center', 'right' ]
     */
    cellPos: {
      type    : String,
      required: false,
      default : void 0,
    },
    /**
     * Used during item dragging.
     * Show only grayed rounded square.
     */
    placeholder: {
      type   : Boolean,
      require: false,
      default: false,
    },
  },

  methods: {
    ...mapActions( 'modals', [
      'showModalItemForm',
    ]),

    ...mapActions( 'cell', [
      'removeItem',
    ]),

    ...mapActions( 'uuid', [
      'removeFromBlacklist',
    ]),

    showForm () {
      if ( this.getGridStatus === 'custom' ) {
        this.showModalItemForm({
          originalCoords: this.item.originalCoords,
          $modal        : this.$modal
        })
      }
    },

    destroyItem () {
      if ( this.getGridStatus === 'custom' ) {

        this.removeItem({
          cellId        : this.cellId,
          row           : this.row,
          cellPos       : this.cellPos,
          originalCoords: this.item.originalCoords,
          confirm       : true,
        })

        // dispatch( 'uuid/removeFromBlacklist', , { root: true })
        this.removeFromBlacklist({ itemUuid: this.item.uuid })
      }
    },
  },

  computed: {
    ...mapGetters( 'ui', [ 'getGridStatus' ]),

    itemIcon: function () {
      const iconsList = {
        logo    : 'wordpress',
        menu    : 'menu',
        menuIcon: 'menu',
        extras  : 'flickr',
        social  : 'share',
        text    : 'instapaper',
        image   : 'picture',
        icon    : 'feather',
        button  : 'progress-0',
      }

      return iconsList[ this.item.name ]
    },

  }

}
</script>