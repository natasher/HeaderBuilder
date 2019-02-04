<template>
  <footer class = "footer-links">
    <a href = "#">
      <font-icon icon = "info-circled" />
      Manual &amp; Support
    </a>

    <reset-builder v-once />
  </footer>
</template>

<script>
import FontIcon     from './BaseGeneric/FontIcon.vue'
import ResetBuilder from './ResetBuilder.vue'

export default {

  name: 'FooterLinks',

  components: {
    FontIcon,
    ResetBuilder,
  },

}
</script>
