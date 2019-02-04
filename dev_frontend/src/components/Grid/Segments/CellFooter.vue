<template>
  <footer
    class="hbr-footer">
    <span :class="classObject">

      <!-- @slot Place <grid-row-cell /> here -->
      <slot />

    </span>
  </footer>
</template>

<script>
export default {

  name: 'CellFooter',

  props: {
    /**
     * [ 'left', 'center', 'right' ]
     */
    pos: {
      type    : String,
      required: true,
    },
  },

  computed: {
    classObject: function () {
      return `hbr-title-${ this.pos }`
    },
  },

}
</script>
