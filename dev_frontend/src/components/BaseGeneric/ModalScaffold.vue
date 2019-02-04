<template>
  <modal :name    = "name"
    height        = "90%"
    :adaptive     = "true"
    :resizeable   = "true"
    @before-open  = "beforeOpen"
    @before-close = "beforeClose" >

    <div class="overflow-wrapper">
      <div class="header">

          <div class="left">
            <base-title :title="title" />
          </div>

          <div class="center">

            <ul class="tabs"
              v-if="showTabs">

              <li :class="formClasses"
                @click="formTabClick">
                <a data-type="general" href="#">General</a>
              </li>

              <li :class="styleClasses"
                @click="styleTabClick"
                v-if="showStyleTab">
                <a data-type="general" href="#">Style</a>
              </li>

            </ul>

          </div>

          <div class="right">
            <button id="hb-popup-close"
              class="mfn-button-close"
              @click="$modal.hide( name )">
              <font-icon icon="cancel" />
            </button>
          </div>

      </div>

      <div class="content">

        <!-- @slot Use for item main form content. -->
        <slot name="form" v-if="tab === 'form'"></slot>

        <!-- @slot Use for item style form content. -->
        <slot name="style" v-if="tab === 'style'"></slot>

      </div>
    </div>

  </modal>
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex'
import BaseTitle from '../BaseGeneric/BaseTitle.vue'
import FontIcon  from '../BaseGeneric/FontIcon.vue'

export default {

  name: 'ModalScaffold',

  data() {
    let priv = {
      item   : void 0,
      row    : void 0,
      cellId : void 0,
      cellPos: void 0,
      tab    : 'form',
    }

    return priv
  },

  components: {
    BaseTitle,
    FontIcon,
  },

  props: {
    /**
     * Unique name of the modal used to invoke it.
     */
    name: {
      type    : String,
      required: true,
    },
    /**
     * Title displayed on the modal.
     */
    title: {
      type    : String,
      required: true,
    },
    /**
     * Determinate if apply `before-open` modal hook,
     * suited for item form.
     */
    openHook: {
      type    : Boolean,
      required: false,
      default : false,
    },
    /**
     * Determinate if apply `before-close` modal hook.
     * suited for item form.
     */
    closeHook: {
      type    : Boolean,
      required: false,
      default : false,
    },
  },

  computed: {
    ...mapState( 'items', {
      currentItem: state => state.current,
    }),

    ...mapGetters( 'items', [
      'getOriginalItem',
    ]),

    /**
     * If blacklist array contains modal name
     * return `false`.
     *
     * @returns {boolean}
     */
    showStyleTab() {
      const blacklist = [
        'ModalLogo',
        'ModalImage',
      ]

      return !_.contains( blacklist, this.name )
    },

    /**
     * If blacklist array contains modal name
     * return `false`.
     *
     * @returns {boolean}
     */
    showTabs() {
      const blacklist = [
        'ModalGrid',
        'ModalActionBar',
        'ModalFirstRow',
        'ModalSecondRow',
      ]

      return !_.contains( blacklist, this.name )
    },

    /**
     * Determinate is form tab is active.
     *
     * @returns {string}
     */
    formClasses() {
      return this.tab === 'form' ? 'active' : ''
    },

    /**
     * Determinate is style tab is active.
     *
     * @returns {string}
     */
    styleClasses() {
      return this.tab === 'style' ? 'active' : ''
    },
  },

  methods: {
    ...mapActions( 'items', [
      'setCurrentItem',
      'saveForm',
    ]),

    /**
     * Before open modal hook. If openHook is provided, then set item
     * as currenlty used.
     *
     * @event beforeOpen
     * @type {vue-js-modal}
     * @param {event} passes grid item related data
     */
    beforeOpen(event) {
      this.tab = 'form'

      if (this.openHook) {
        const origin     = event.params.originalCoords
        const originItem = this.getOriginalItem(
          origin.row,
          origin.cellPos,
          origin.cellId
        )

        this.priv = {
          item   : originItem,
          row    : origin.row,
          cellId : origin.cellId,
          cellPos: origin.cellPos,
        }

        this.setCurrentItem( this.priv )
      } else {
        return true
      }
    },

    /**
     * Before close modal hook.
     * Save modified item form, clear current item to empty object
     */
    beforeClose() {
      if (this.closeHook) {
        const new_item = JSON.parse(JSON.stringify( this.currentItem ))

        this.saveForm({ new_item, priv: this.priv })
        // TODO: czy pusty payload ma sens? chyba to trzeba naprawić
        this.setCurrentItem({})
      } else {
        return true
      }
    },

    formTabClick() {
      this.tab = 'form'
    },

    styleTabClick() {
      this.tab = 'style'
    },

  },
}
</script>
