<template>
  <div class = "row">

    <div class = "col col-left">
      <span class = "title">{{ fieldName }}</span>
      <span class = "desc" v-if="spread === '' || typeof spread === 'undefined'">{{ desc }}</span>
    </div>

    <div class = "col col-right">
      <div :class = "[fieldDivClass, spread]">

        <input type        = "text"
              :name        = "wpId"
              :placeholder = "pholder"
              v-model      = "textFieldValue">

      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {

  name: 'TextField',

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
    /**
     * Description of the field.
     * Displayed under `fieldName`
     * if `spread` does *not* equal narrow.
     */
    desc: {
      type    : String,
      required: false,
      default : '',
    },
    /**
     * Determinates type of text field.
     * Default value is **empty**.
     * Possible value **narrow**.
     * If `spread=narrow` **desc** is shown.
     */
    spread: {
      type    : String,
      required: false,
      default : '',
    },
    /**
     * Placeholder value
     */
    pholder: {
      type    : String,
      required: false,
      default : '',
    },
    /**
     * Prop determinates type of Margin field,
     * possible values: **""**, **row**, **grid**.
     */
    as: {
      type    : String,
      required: false,
      default : '',
    },
    /**
     * When `as` prop is set to row, `row` indicates which one.
     * Then margin values will be set to given row.
     */
    row: {
      type    : String,
      required: false,
      default : '',
    },
  },

  data: function() {
    return {
      /**
       * Class added if prop `spread='narrow'`
       */
      fieldDivClass: 'mfn-field mfnf-text',
    }
  },

  methods: {
    ...mapActions( 'fields', [ 'setModalFieldValue' ]),
  },

  computed: {
    ...mapGetters( 'fields', [ 'getCurrentFieldValue', 'getRowOptionValue' ]),

    textFieldValue: {
      get() {
        if ( this.as === '' || typeof this.as == 'undefined' ) {

          return this.getCurrentFieldValue( this.wpId )

        } else if ( this.as === 'row' ) {

          return this.getRowOptionValue( this.wpId, this.row )

        }
      },
      set(value) {
        this.setModalFieldValue({
          name : this.wpId,
          value: value,
          as   : this.as,
          row  : this.row,
        })
      },
    },
  },
}
</script>
