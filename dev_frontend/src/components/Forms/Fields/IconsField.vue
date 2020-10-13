<template>
  <section class = "icons-field">
    <div class = "row">

      <div class = "col col-left">
        <span class = "title">{{ fieldName }}</span>
      </div>

      <div class = "col col-right">
        <div class = "mfn-field mfnf-icon">

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
                class       = "search-icon"
                name        = "searchIcon"
                placeholder = "Search..."
                v-model     = "searchIcon" />

          <div class = "icon-select clearfix">

            <template v-for = "( icon, index ) in icons">
              <div class    = "mfn-icon"
                  :class    = "{ active: tempIcon === icon }"
                  :key      = "index"
                  :data-rel = "icon">

                  <i :class    = "icon"
                    :data-rel  = "icon"
                    @click.passive = "getIcon">
                  </i>

              </div>

              <div
                class  = "mfn-field popup"
                :key   = "`${ icon }-popup`"
                :style = "{ top: popupOffset }"
                v-if   = "showPopup( icon )">

                <label for = "Link">URL: </label>
                <input
                  type    = "text"
                  name    = "Link"
                  v-focus
                  v-model = "tempLink"
                  @keyup.enter = "addIconAndLink" />

                <button
                  class = "mfn-button-generic"
                  @click.passive = "addIconAndLink">
                    Add
                </button>

                <button
                  class = "mfn-button-close"
                  @click.passive = "clearIconData">
                    <font-icon icon = "cancel"/>
                </button>

              </div>
            </template>

            <span v-if = "typeof icons === 'undefined' && icons.length === 0">No icon to render.</span>

          </div>

          <div class="selected-icons">
            <ul>
            <draggable
              v-model  = "selectedIcons"
              :options = "{
                group: {
                  name: 'iconsField',
                }
              }"
            >

              <li
                v-for="( entry, index) in selectedIcons"
                :key  = "index">
                <span
                  class     = "mfn-icon"
                  :data-rel = "entry.icon">
                  <i
                    :class    = "entry.icon"
                    :data-rel = "entry.icon"></i>
                </span>

                <span
                  data-index = "data-index"
                  v-if       = "liveEditIndex !== index"
                  @click     = "liveEditUrl( index )"
                >
                  {{ entry.link }}
                </span>
                <input type    = "text"
                  v-else
                  v-focus
                  v-model      = "entry.link"
                  @keyup.enter = "liveEditIndex = void 0"
                  @blur        = "liveEditIndex = void 0" >

                <span class="icon-sortable-handler">
                  <i data-rel="icon-arrow-combo" class="icon-arrow-combo"></i>
                </span>

                <button
                  class = "mfn-button-close"
                  @click.passive = "removeCurrentFieldEntry({ name: wpId, index: index })">
                    <font-icon icon = "cancel"/>
                </button>
              </li>

            </draggable>
            </ul>
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
import FontIcon  from '../../BaseGeneric/FontIcon.vue'
import draggable from 'vuedraggable'
import vSelect from "vue-select";

const focus = {
  inserted( el ) {
    el.focus()
  }
}

export default {

  name: 'IconsField',

  components: {
    FontIcon,
    draggable,
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

  data () {
    /**
     * Local store object with temporary data.
     */
    return {
      searchIcon   : '',
      iconSet      : { label: 'Default', value: 'default' },
      tempIcon     : '',
      tempLink     : '',
      popupOffset  : void 0,
      liveEditIndex: void 0,
    }
  },

  methods: {
    ...mapActions( 'items', [
      'setCurrentFieldValue',
      'pushCurrentFieldEntry',
      'removeCurrentFieldEntry',
    ]),

    /**
     * Icon set setter.
     *
     * @event click
     * @type {NativeBrowser}
     * @param {event} event
     * @public
     */
    setIconSet: function ( event ) {
      if ( event !== undefined ) {
        this.iconSet = event;
      }
    },

    /**
     * Invoke when icon is clicked.
     * Icon name assigned to local state `data.tempIcon`.
     *
     * @event click
     * @type {NativeBrowser}
     * @param {event} event
     * @public
     */
    getIcon ( event ) {
      this.tempIcon    = event.target.dataset.rel
      this.popupOffset = `${ event.target.offsetParent.offsetTop + 40 }px`
    },

    /**
     * Binded to `Add` button.
     * Method insert `icon name` along with `url`
     * into `items.current.form[ wpId]`.
     *
     * @setter
     * @public
     */
    addIconAndLink () {
      this.pushCurrentFieldEntry({
        name : this.wpId,
        entry: {
          icon: this.tempIcon,
          link: this.tempLink,
        }
      }).then(() => {
        this.clearIconData()
      })
    },

    showPopup ( icon ) {
      return this.tempIcon === icon
    },

    clearIconData () {
      this.tempIcon = ''
      this.tempLink = ''
    },

    liveEditUrl ( index ) {
      this.liveEditIndex = index
    },

  },

  directives: { focus },

  computed: {
    ...mapGetters( 'fields', [ 'getCurrentFieldValue' ]),

    /**
     * Returns all icons with urls from `items.current[ wpId ]`.
     *
     * @getter
     * @returns {array.objects} [{ icon: "", link: "" },]
     * @public
     */
    selectedIcons: {
      get() {
        return this.getCurrentFieldValue( this.wpId )
      },
      set( icons ) {
        this.setCurrentFieldValue({
          name : this.wpId,
          value: icons,
        })
      },
    },

    /**
     * Returns icon set to be displayed`items.current[ wpId ][ set ]`.
     * Possible icon sets: Default WP & Font Awesome Free.
     *
     * @getter
     * @returns object
     */
    getIconSet: function () {
      return this.iconSet
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