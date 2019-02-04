<template>
  <section id = "mfn-hb-items">

    <div class = "header">

      <span class = "title">
        Drag item and drop into workspace
      </span>

    </div>

    <draggable
      class    = "hb-items clearfix"
      :options = "{
        group: {
          name: 'items',
          sort: false,
          pull: 'clone',
          put : false,
        },
        scroll: true,
      }"
      @start  = "atStart"
      @end    = "atEnd"
      v-model = "baseItemsList">

      <BaseItem
        v-for = "( item, index ) in baseItemsList"
        :key  = "index"
        :item = "item"
        :placeholder = "item.name === draggedItem ? true : false">
      </BaseItem>

    </draggable>

  </section>
</template>

<script>
import { mapActions } from 'vuex'
import FontIcon  from './BaseGeneric/FontIcon.vue'
import BaseItem  from './BaseItem.vue'
import draggable from 'vuedraggable'

export default {

  name: 'ItemsTray',

  data() {
    return {
      draggedItem: '',
    }
  },

  components: {
    FontIcon,
    BaseItem,
    draggable,
  },

  computed: {
    /**
     * Getter method, retrive items boilerplates from store
     *
     * @returns {Object} Items data
     */
    baseItemsList: {
      get() {
        return this.$store.state.items.baseItemsList
      },
      set() {},
    },
  },

  methods: {
    ...mapActions( 'items', [ 'setTemporaryItem' ]),
    /**
     * Set value of private variable `draggedItem` to item name.
     *
     * @param {event} SortableJS
     * @returns {sideEffect} dragged item name
     * @public
     */
    atStart( event ) {
      this.draggedItem = event.item.attributes[ 0 ].nodeValue
      const clonedItem = JSON.parse(JSON.stringify( this.baseItemsList[ event.oldIndex ] ))

      this.setTemporaryItem({ tmpItem: clonedItem })
    },

    /**
     * Clears `draggedItem` variable.
     *
     * @param {event} unused
     * @returns {sideEffect} empty string
     * @public
     */
    atEnd() {
      this.draggedItem = ''
    },
  },
}
</script>
