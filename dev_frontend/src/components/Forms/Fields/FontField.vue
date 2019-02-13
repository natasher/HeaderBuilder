<template>
  <div class = "row">

    <div class = "col col-left">
      <span class = "title">{{ fieldName }}</span>
    </div>

    <div class = "col col-right">

      <div class = "mfn-field mfn-font">

        <v-select
          name     = "fontFamily"
          :options = "fonts"
          @input   = "setFontFamily"
          :value   = "getFontFamily">

          <template slot="option" slot-scope="font">
            <strong v-if="font.value == 'optgroup-label'">{{ font.label }}</strong>
            <option v-else :value="font.value">
              {{ font.label }}
            </option>
          </template>

        </v-select>
      </div>

    </div>

  </div>
</template>

<script>
import { mapGetters, mapActions, mapState } from 'vuex'
import vSelect from 'vue-select'

export default {

  name: 'FontField',

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
     * Prop determinates type of Margin field,
     * possible values: **""**, **row**, **grid**.
     */
    as: {
      type    : String,
      required: false,
      default : '',
    },
  },

  methods: {
    ...mapActions( 'fields', [ 'setModalFieldValue' ]),

    setFontFamily: function ( event ) {
      if ( event.value == 'optgroup-label' ) {
        return
      } else {
        this.setModalFieldValue({
          name    : this.wpId,
          value   : event,
          as      : this.as  || '',
          row     : this.row || '',
          position: 'fontFamily',
        })
      }
    }
  },

  computed: {
      ...mapState( 'endpoint', {
        fonts: state => state.mfnFonts
      }),
      ...mapGetters( 'fields', [ 'getSelectFieldValue' ]),

      getFontFamily: function () {
        const value = this.getSelectFieldValue( this.wpId, this.as, this.row, 'fontFamily' )

        if ( _.isObject( value )) {

          return value

        } else if ( value === '' ) {

          return this.fonts[1]

        } else {

          if ( value.value == 'optgroup-label' ) return
          const valueObj = _.findWhere( this.fonts, { value: value } )
          return valueObj

        }
      }
  },
}
</script>
