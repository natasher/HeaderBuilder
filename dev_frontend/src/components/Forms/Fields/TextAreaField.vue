<template>
  <div class = "row">

    <div class = "col col-left">
      <div class = "title">{{ fieldName }}</div>
    </div>

    <div class = "col col-right">
      <div class = "mfn-field">

        <textarea
          :name   = "fieldName"
          :id     = "wpId"
          v-model = "textAreaFieldValue">
        </textarea>

      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {

  name: 'TextAreaField',

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
    ...mapActions( 'items', [ 'setCurrentFieldValue', ]),
  },

  computed: {
    ...mapGetters( 'fields', [ 'getCurrentFieldValue' ]),

    textAreaFieldValue: {
      get () {
        return this.getCurrentFieldValue( this.wpId )
      },
      set ( value ) {
        this.setCurrentFieldValue({
          name : this.wpId,
          value: value,
        })
      }
    }
  },
}
</script>