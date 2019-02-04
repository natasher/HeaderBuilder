<template>
  <div class = "row">

    <div class = "col col-left">
      <span class = "title">{{ ( as === 'grid' ) ? "gridMargin" : fieldName }}</span>
    </div>

    <div class = "col col-right">
      <div class = "mfn-field mfnf-margin">

        <div class = "container" >
          <input
            v-model     = "valueTop"
            class       = "top"
            :name       = "wpId+'Top'"
            placeholder = "px"
            type        = "text" />

          <input
            v-model     = "valueRight"
            class       = "right"
            :name       = "wpId+'Right'"
            placeholder = "px"
            type        = "text" />

          <input
            v-model     = "valueBottom"
            class       = "bottom"
            :name       = "wpId+'Bottom'"
            placeholder = "px"
            type        = "text" />

          <input
            v-model     = "valueLeft"
            class       = "left"
            :name       = "wpId+'Left'"
            placeholder = "px"
            type        = "text" />
        </div>

      </div>
    </div>

  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {

  name: 'MarginField',

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

  methods: {
    ...mapActions( 'fields', [ 'setModalFieldValue' ]),
  },

  computed: {
    ...mapGetters( 'fields', [ 'getMarginFieldValue' ]),

    valueTop: {
      get() {
        return this.getMarginFieldValue(
          this.wpId,
          this.as,
          this.row,
          'top'
        )
      },
      set( value ) {
        const val = {
          name    : this.wpId,
          position: 'top',
          value   : value,
          as      : this.as  || '',
          row     : this.row || '',
        }

        this.setModalFieldValue( val )
      },
    },

    valueRight: {
      get() {
        return this.getMarginFieldValue(
          this.wpId,
          this.as,
          this.row,
          'right'
        )
      },
      set(value) {
        const val = {
          name    : this.wpId,
          position: 'right',
          value   : value,
          as      : this.as  || '',
          row     : this.row || '',
        }

        this.setModalFieldValue( val )
      },
    },

    valueBottom: {
      get() {
        return this.getMarginFieldValue(
          this.wpId,
          this.as,
          this.row,
          'bottom'
        )
      },
      set( value ) {
        const val = {
          name    : this.wpId,
          position: 'bottom',
          value   : value,
          as      : this.as  || '',
          row     : this.row || '',
        }

        this.setModalFieldValue( val )
      },
    },

    valueLeft: {
      get() {
        return this.getMarginFieldValue(
          this.wpId,
          this.as,
          this.row,
          'left'
        )
      },
      set(value) {
        const val = {
          name    : this.wpId,
          position: 'left',
          value   : value,
          as      : this.as  || '',
          row     : this.row || '',
        }

        this.setModalFieldValue( val )
      },
    },

  },
}
</script>
