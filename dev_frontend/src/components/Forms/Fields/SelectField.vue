<template>
  <div class = 'row'>
      <div class = 'col col-left'>
        <span class = 'title'>{{ fieldName }}</span>
      </div>

      <div class = 'col col-right'>
        <v-select
          :options = "opts"
          @input   = "setSelect"
          :value   = "getSelect" />
      </div>

  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import vSelect from 'vue-select'

export default {

  name: 'SelectField',

  components: {
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
    /**
     * Array of Objects for select, e.g.
     * \[{ label: 'demo text', value: 'demo value' }, \]
     */
    opts: {
      type    : Array,
      required: true,
    },
    /**
     * Prop determinates type of Margin field,
     * possible values: **""**, **row**.
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

    /**
     * Event send when user type into input
     * or simply change the value.
     *
     * @event input
     * @type {VSelect}
     * @param {event} input
     */
    setSelect: function(event) {
      if ( event !== undefined ) {
        this.setModalFieldValue({
          name : this.wpId,
          value: event,
          as   : this.as  || '',
          row  : this.row || '',
        })
      }
    },
  },

  computed: {
    ...mapGetters( 'fields', [ 'getSelectFieldValue' ]),

    getSelect: function() {
      const value = this.getSelectFieldValue( this.wpId, this.as, this.row )

      if ( _.isObject( value ) ) {

        return value

      } else if ( value === '' ) {

        return this.opts[0]

      } else {

        const valueObj = _.findWhere( this.opts, { value: value } )
        return valueObj

      }
    },
  },

}
</script>
