<template>
  <div class = "row">

    <div class = "col col-left">
      <span class = "title">{{ fieldName }}</span>
    </div>

    <div class = "col col-right">

      <template v-for = "( opt, index ) in opts">
        <base-switch
          :fieldName    = "opt.value"
          :label        = "opt.label"
          :key          = "`${ opt.value }-${ index }`"
          :isActive     = "getCurrentFieldValue( wpId, opt.value )"
          @click.native = "toggleOptionSwitch({ wpId: wpId, opt: opt.value })" />
      </template>

    </div>

  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import BaseSwitch from '../../BaseGeneric/BaseSwitch.vue'

export default {

  name: 'OptionsGroup',

  components: {
    BaseSwitch,
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
     * Array of Objects representing available options,
     * Object must contain prop `label`.
     * e.g. \[{ label: 'Activate SEO', value: 'activateSEO' }, \]
     */
    opts: {
      type    : Array,
      required: true,
    },
  },

  computed: {
    ...mapGetters( 'fields', [ 'getCurrentFieldValue', ]),

  },

  methods: {
    ...mapActions( 'fields', [
      'toggleOptionSwitch',
    ]),

  },

}
</script>
