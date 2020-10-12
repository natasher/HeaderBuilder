<template>
  <section class = "icons-field">
    <div class = "row">

      <div class = "col col-left">
        <span class = "title">{{ fieldName }}</span>
      </div>

      <div class = "col col-right">
        <div class = "mfn-field mfnf-icon">

          <input type   = "text"
                v-model = "selectedIconName" />

          <button
            class = "mfn-button-generic remove"
            @click.prevent = "removeIcon">
              Remove
          </button>

          <v-select
            name     = "iconSet"
            :options = "[
              { label: 'Default', value: 'default' },
              { label: 'Font Awesome', value: 'fa' },
            ]"
            @input   = "setIconSet"
            :value   = "getIconSet"
          />

          <input type       = "text"
                name        = "search"
                placeholder = "Search..."
                v-model     = "searchIcon" />

          <div class = "icon-select clearfix">

            <template v-for = "( icon, index ) in icons">
              <div class    = "mfn-icon"
                  :class    = "{ active: selectedIconName === icon }"
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
import DefaultIconsList from './DefaultIconsList.js'
import FontAwesomeIconsList from "./FontAwesomeIconsList.js"
import TextField from './TextField.vue'
import FontIcon  from '../../BaseGeneric/FontIcon.vue'
import vSelect from "vue-select";

export default {

  name: 'IconField',

  components: {
    TextField,
    FontIcon,
    vSelect,
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

  data: function () {
    return {
      searchIcon: '',
    }
  },

  methods: {
    ...mapActions( 'fields', [ 'setModalFieldValue' ]),

    /**
     * Invoke when icon is clicked.
     * Icon name assigned to local state `data.tempIcon`.
     *
     * @event click
     * @type {NativeBrowser}
     * @param {event} event
     * @public
     */
    setIcon: function ( event ) {
      this.selectedIconName = event.target.dataset.rel
    },

    setIconSet: function ( event ) {
      if ( event !== undefined ) {
        this.setModalFieldValue({
          name    : this.wpId,
          value   : event,
          position: 'set',
          as      : this.as || '',
        })
      }
    },

    removeIcon: function() {
      this.setModalFieldValue({
        name    : this.wpId,
        value   : '',
        position: 'name',
        as      : this.as || '',
      })
    },

  },

  computed: {
    ...mapGetters( 'fields', [ 'getCurrentFieldValue' ]),

    /**
     * Returns selected icon name for given icon set `items.current[ wpId ][ name ]`.
     *
     * @getter
     * @setter
     * @returns string Name of the icon from selected icon set
     * @public
     */
    selectedIconName: {
      get () {
        return this.getCurrentFieldValue( this.wpId, 'name' )
      },
      set ( value ) {
        this.setModalFieldValue({
          name    : this.wpId,
          value   : value,
          position: 'name',
          as      : this.as || '',
        })
      }
    },

    /**
     * Returns icon set to be displayed`items.current[ wpId ][ set ]`.
     * Possible icon sets: Default WP & Font Awesome Free.
     *
     * @getter
     * @returns object
     */
    getIconSet: function () {
      return this.getCurrentFieldValue( this.wpId, 'set' )
    },

    /**
     * Grab list of icons names, stored in (external file)[./DefaultIconsList.js]
     * or (external file)[./FontAwesomeIconsList.js]
     *
     * @getter
     * @returns {array.string} ["icon-demo",]
     * @public
     */
    icons: function () {
      if ( this.getIconSet.value === 'default' ) {

        const constructorString = '^icon-' + this.searchIcon + '(\\S+)*'
        const defaultRegExp = new RegExp( constructorString )

        return this.searchIcon
          ? DefaultIconsList.filter( icon => icon.match( defaultRegExp ))
          : DefaultIconsList

      } else {

        const constructorString = '^\\w{3} fa-' + this.searchIcon + '(\\S+)*'
        const fontAwesomeRegExp = new RegExp( constructorString )

        return this.searchIcon
          ? FontAwesomeIconsList.filter( icon => icon.match( fontAwesomeRegExp ))
          : FontAwesomeIconsList

      }
    },

  },

}
</script>
