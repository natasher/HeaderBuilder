<template>
<section id = "mfn-hb-inactive-items">

  <div class = "header">
    <span class = "title">
      Inactive items
    </span>
  </div>

  <div class = "hb-items">
    <draggable
      class    = "hb-col"
      v-model  = "inactiveItems"
      key      = "inactiveItems"
      @change  = "onChange"
      :options = "{
        group: {
          name: 'items',
        },
        scroll: true,
        disabled: ( getGridStatus === 'off' || getGridStatus === 'auto')
                  ? true
                  : false,
      }" >

      <base-item
        v-for   = "( item, index ) in inactiveItems"
        row     = "inactiveItems"
        :item   = "item"
        :cellId = "index"
        :key    = "item.uuid" />

    </draggable>
  </div>

</section>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import FontIcon  from '../BaseGeneric/FontIcon.vue'
import BaseItem  from '../BaseItem.vue'
import draggable from 'vuedraggable'

export default {

  name: 'InactiveItems',

  components: {
    FontIcon,
    BaseItem,
    draggable,
  },

  computed: {
    ...mapGetters( 'ui', [
      'getGridStatus',
    ]),

    ...mapGetters( 'inactiveItems', [
      'getInactiveItems',
    ]),

    inactiveItems: {
      get() {
        return this.getInactiveItems;
      },
      set() {}
    }
  },

  methods: {
    ...mapActions( 'inactiveItems', [
      'removeItem',
    ]),

    onChange( event ) {

      if ( event.removed ) {
        const cellId = event.removed.oldIndex

        this.removeItem({
          cellId : cellId,
        })
      }

    },
  },

}
</script>
