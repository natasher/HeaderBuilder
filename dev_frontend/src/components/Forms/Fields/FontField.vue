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

        <label for="fontSize" class="font-input-label">Font size</label>
        <input
          class   = "font-input"
          type    = "number"
          name    = "fontSize"
          @input  = "setFontSizeValue"
          :value  = "getFontSizeValue" />
        <span class="font-input-unit">px</span>

        <label for="fontStyle" class="font-input-label">Font weight & style</label>
        <v-select
          name     = "fontStyle"
          :options = "fontStyles"
          @input   = "setFontStyle"
          :value   = "getFontStyle"
        />

        <label for="letterSpacing" class="font-input-label">Letter spacing</label>
        <input
          class   = "font-input"
          type    = "number"
          name    = "letterSpacing"
          @input  = "setLetterSpacingValue"
          :value  = "getLetterSpacingValue" />
        <span class="font-input-unit">px</span>

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

  data() {
    return {
      fontStyles: [
            { label: '100 Thin',                value: '100'        },
            { label: '100 Thin Italic',         value: '100italic'  },
            { label: '200 Extra-Light',         value: '200'        },
            { label: '200 Extra-Light Italic',  value: '200italic'  },
            { label: '300 Light',               value: '300'        },
            { label: '300 Light Italic',        value: '300italic'  },
            { label: '400 Regular',             value: '400'        },
            { label: '400 Regular Italic',      value: '400italic'  },
            { label: '500 Medium',              value: '500'        },
            { label: '500 Medium Italic',       value: '500italic'  },
            { label: '600 Semi-Bold',           value: '600'        },
            { label: '600 Semi-Bold Italic',    value: '600italic'  },
            { label: '700 Bold',                value: '700'        },
            { label: '700 Bold Italic',         value: '700italic'  },
            { label: '800 Extra-Bold',          value: '800'        },
            { label: '800 Extra-Bold Italic',   value: '800italic'  },
            { label: '900 Black',               value: '900'        },
            { label: '900 Black Italic',        value: '900'        },
          ]
    }
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
    },

    setFontSizeValue: function ( event ) {
      this.setModalFieldValue({
        name    : this.wpId,
        value   : event.target.valueAsNumber,
        as      : this.as  || '',
        row     : this.row || '',
        position: 'fontSize',
      })
    },

    setFontStyle: function ( event ) {
      this.setModalFieldValue({
        name    : this.wpId,
        value   : event,
        as      : this.as  || '',
        row     : this.row || '',
        position: 'fontStyle',
      })
    },

    setLetterSpacingValue: function ( event ) {
      this.setModalFieldValue({
        name    : this.wpId,
        value   : event.target.valueAsNumber,
        as      : this.as  || '',
        row     : this.row || '',
        position: 'letterSpacing',
      })
    },

  },

  computed: {
      ...mapState( 'endpoint', {
        fonts: state => state.mfnFonts
      }),
      ...mapGetters( 'fields', [ 'getSelectFieldValue', 'getCurrentFieldValue' ]),

      getFontFamily: function () {
        const value = this.getSelectFieldValue( this.wpId, this.as, this.row, 'fontFamily' )

        if ( _.isObject( value )) {

          return value

        } else if ( value === '' ) {

          return this.fontStyles[7]

        } else {

          if ( value.value == 'optgroup-label' ) return
          const valueObj = _.findWhere( this.fonts, { value: value } )
          return valueObj

        }
      },

      getFontSizeValue: function() {
        return this.getCurrentFieldValue( 'font', 'fontSize' )
      },

      getFontStyle: function () {
        const value = this.getSelectFieldValue( this.wpId, this.as, this.row, 'fontStyle' )

        if ( _.isObject( value )) {

          return value

        } else if ( value === '' ) {

          return this.fontStyles[6]

        } else {

          const valueObj = _.findWhere( this.fontStyles, { value: value } )
          return valueObj

        }
      },

      getLetterSpacingValue: function() {
        return this.getCurrentFieldValue( 'font', 'letterSpacing' )
      },

  },
}
</script>