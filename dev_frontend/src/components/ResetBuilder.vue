<template>
  <a id            = "reset-builder"
    @click.prevent = "resetBuilder({ $modal: $modal })">
    Reset builder
  </a>
</template>

<script>
import { mapActions } from 'vuex'

export default {

  name: 'ResetBuilder',

  methods: mapActions( 'devices', [ 'resetBuilder' ]),

}
</script>
