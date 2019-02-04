<template>
  <i
    :class="classObject"
    aria-hidden="true">
  </i>
</template>

<script>
export default {

  name: 'FontIcon',

  props: {
    /**
     * Icon name from Font Awesome cataloge.
     */
    icon: {
      type    : String,
      required: true,
    },
  },

  computed: {
    classObject: function () {
      return `icon-${ this.icon }`
    },
  },
}
</script>
