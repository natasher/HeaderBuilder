<template>
  <header class = "header">

    <div class = "left">
      <mfn-logo />
      <base-title title = "Header Builder" />
    </div>

    <div class = "center">

      <nav-select-device />

    </div>

    <div class="right">

      <a id            = "header-builder-submit"
        class          = "mfn-button mfn-button-primary"
        @click.prevent = "postData">
        Save changes
      </a>

    </div>

  </header>

</template>

<script>
import { mapActions }  from 'vuex'
import MfnLogo         from '../BaseGeneric/MfnLogo.vue'
import BaseTitle       from '../BaseGeneric/BaseTitle.vue'
import FontIcon        from '../BaseGeneric/FontIcon.vue'
import NavSelectDevice from './NavSelectDevice.vue'

export default {

  name: 'BaseHeader',

  components: {
    MfnLogo,
    BaseTitle,
    FontIcon,
    NavSelectDevice,
  },

  methods: {
    ...mapActions( 'endpoint', [
      'postDataToWordpress',
    ]),

    postData: function () {
      this.postDataToWordpress({ $modal: this.$modal })
    },
  },

}
</script>
