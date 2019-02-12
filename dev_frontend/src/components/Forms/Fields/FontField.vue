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
  },

  computed: mapState( 'endpoint', {
    fonts: state => state.mfnFonts
  }),
}
</script>
