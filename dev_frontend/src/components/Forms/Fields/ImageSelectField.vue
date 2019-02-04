<template>
  <div class = 'row'>

    <div class = 'col col-left'>

      <span class = 'title'>{{ fieldName }}</span>
      <span class = 'desc'>{{ desc }}</span>

    </div>

    <div class = 'col col-right'>
      <div class = 'mfn-field mfnf-select-image'>
        <ul class = 'small'>

          <li v-for  = "( opt, index ) in opts"
              :key   = "`${ opt.text }${ index }`"
              :class = "{active: getActiveIndex === index }"
              @click.passive = "clickHandler( index )">
            <img :src = "opt.src"
                 :alt = "opt.text" />
          </li>

        </ul>
      </div>
    </div>

  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {

  name: 'ImageSelectField',

  props: {
    /**
     * The name of the field.
     * Displayed on the left column.
     */
    fieldName: {
      type: String,
      required: true,
    },
    /**
     * Name of the field used by WordPress internals.
     */
    wpId: {
      type: String,
      require: true,
    },
    /**
     * Description of the field.
     * Displayed on the left column, under the fieldName.
     */
    desc: {
      type: String,
      required: false,
    },
    /**
     * Array of Objects representing available options,
     * Object must contain props `text` and `src`.
     * e.g. \[{ text: 'demo text', src: 'https://demo-page.org' }, \]
     */
    opts: {
      type: Array,
      required: true,
    },
  },

  computed: {
    ...mapGetters( 'fields', [ 'getCurrentFieldValue' ]),

    getActiveIndex: {
      /**
       * Retrive currently selected image.
       *
       * @getter
       * @returns {number}
       * @private
       */
      get () {
        return this.getCurrentFieldValue( this.wpId )
      },
    }

  },

  methods: {
    ...mapActions( 'items', [ 'setCurrentFieldValue', ]),

    /**
     * Method binded to each image in <li /> after click
     * it sets index of selected image along with representing
     * text into `items.current.form[ wpId]`.
     *
     * @setter
     * @private
     */
    clickHandler ( newIndex ) {
      this.setCurrentFieldValue({
        name : this.wpId,
        value: newIndex,
      })
    },
  },

}
</script>
