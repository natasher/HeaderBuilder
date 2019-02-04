<template>
  <div class = "row">

    <div class = "col col-left">
      <span class = "title">{{ fieldName }}</span>
    </div>

    <div class = "col col-right">

      <base-switch
        :fieldName    = "fieldName"
        :wpId         = "wpId"
        :label        = "label"
        :isActive     = "getSwitchFieldValue( wpId, as )"
        @click.native = "toggleSwitchState({ name: wpId })" />

    </div>

  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import BaseSwitch from '../../BaseGeneric/BaseSwitch.vue'

export default {

  name: 'SwitchField',

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
     * Label shown next to switch.
     */
    label: {
      type    : String,
      required: false,
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

  computed: {
    ...mapGetters( 'fields', [ 'getSwitchFieldValue', ]),
  },

  methods: {
    ...mapActions( 'fields', [ 'toggleSwitchState', ]),
  },

}
</script>
