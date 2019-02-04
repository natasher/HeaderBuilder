<template>
  <div :class="classObject">

    <div class="switch" :data-name="fieldName">

      <span class = "path"   :data-name = "fieldName"></span>
      <span class = "handle" :data-name = "fieldName"></span>

    </div>
    <label>{{ label }}</label>

  </div>
</template>

<script>
export default {

  name: 'BaseSwitch',

  props: {
    /**
     * Label shown next to switch.
     */
    label: {
      type    : String,
      required: true,
    },
    /**
     * Determinates if switch is active,
     * takes function that returns `boolean` value
     * or boolean itself.
     */
    isActive: {
      type    : [ Function, Boolean ],
      required: false,
      default : false,
    },
    /**
     * The name of the containing/binded field.
     */
    fieldName: {
      type    : [ String, Boolean ],
      required: false,
      default : false,
    }
  },

  computed: {
    classObject: function () {
      return {
        'mfn-field mfnf-checkbox': true,
        'active'                 : this.isActive
      }
    }
  },

}
</script>
