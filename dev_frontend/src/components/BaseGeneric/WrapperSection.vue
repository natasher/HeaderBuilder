<template>
  <div>
    <span class="title">{{ title }}</span>

    <!-- @slot Use this slot for section content -->
    <slot />

  </div>
</template>

<script>
export default {

  name: 'WrapperSection',

  props: {
    /**
     * Title of element to be shown.
     */
    title: {
      type    : String,
      required: true,
    },
  },

}
</script>

