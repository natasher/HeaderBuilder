<template>
  <span class="title">{{ title }}</span>
</template>

<script>
export default {

  name: 'BaseTitle',

  props: {
    /**
     * Title of the elements to be shown.
     */
    title: {
      type    : String,
      required: true,
    },
  },

}
</script>
