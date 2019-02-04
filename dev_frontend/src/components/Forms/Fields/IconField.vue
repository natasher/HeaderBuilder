<template>
  <section class = "icons-field">
    <div class = "row">

      <div class = "col col-left">
        <span class = "title">{{ fieldName }}</span>
      </div>

      <div class = "col col-right">
        <div class = "mfn-field mfnf-icon">

          <input type   = "text"
                v-model = "selectedIcon" />

          <button
            class = "mfn-button-generic remove"
            @click.prevent = "removeIcon">
              Remove
          </button>

          <div class = "icon-select clearfix">

            <template v-for = "( icon, index ) in icons">
              <div class    = "mfn-icon"
                  :class    = "{ active: selectedIcon === icon }"
                  :key      = "index"
                  :data-rel = "icon">

                  <i :class    = "icon"
                    :data-rel  = "icon"
                    @click.passive = "setIcon">
                  </i>

              </div>
            </template>

            <span v-if = "typeof icons === 'undefined' && icons.length === 0">No icon to render.</span>

          </div>

        </div>
      </div>

    </div>
  </section>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import IconsList from './IconsList.js'
import TextField from './TextField.vue'
import FontIcon  from '../../BaseGeneric/FontIcon.vue'

export default {

  name: 'IconField',

  components: {
    TextField,
    FontIcon,
  },

  props: {
    /**
     * The name of the field.
     * Displayed on the left column.
     */
    fieldName: {
      type    : String,
      required: true,
    },
    /**
     * Name of the field used by WordPress internals.
     */
    wpId: {
      type   : String,
      require: true,
    },
  },

  methods: {
    ...mapActions( 'items', [ 'setCurrentFieldValue' ]),

    /**
     * Invoke when icon is clicked.
     * Icon name assigned to local state `data.tempIcon`.
     *
     * @event click
     * @type {NativeBrowser}
     * @param {event} event
     * @public
     */
    setIcon ( event ) {
      this.selectedIcon = event.target.dataset.rel
    },

    removeIcon: function() {
      this.setCurrentFieldValue({
        name : this.wpId,
        value: '',
      })
    },

  },

  computed: {
    ...mapGetters( 'fields', [ 'getCurrentFieldValue' ]),

    /**
     * Returns all icons with urls from `items.current[ wpId]`.
     *
     * @getter
     * @returns {array.objects} [{ icon: "" }]
     * @public
     */
    selectedIcon: {
      get () {
        return this.getCurrentFieldValue( this.wpId )
      },
      set ( value ) {
        this.setCurrentFieldValue({
          name : this.wpId,
          value: value,
        })
      }
    },

    /**
     * Grab list of icons names, stored in (external file)[./IconsList.js].
     *
     * @getter
     * @returns {array.string} ["icon-demo",]
     * @public
     */
    icons () {
      return IconsList
    },

  },

}
</script>
