<template>
  <section class = "icons-field">
    <div class = "row">

      <div class = "col col-left">
        <span class = "title">{{ fieldName }}</span>
      </div>

      <div class = "col col-right">
        <div class = "mfn-field mfnf-icon">

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
import FontIcon  from '../../BaseGeneric/FontIcon.vue'
import draggable from 'vuedraggable'

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
     * Grab list of icons names, stored in (external file)[./DefaultIconsList.js].
     *
     * @getter
     * @returns {array.string} ["icon-demo",]
     * @public
     */
    icons () {
      return DefaultIconsList
    },

  },

}
</script>