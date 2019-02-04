<template>
  <header class="header">

    <dots />
    <view-with-resolution />
    <grid-status />
    <grid-tools />

  </header>
</template>

<script>
import GridStatus         from './GridStatus.vue'
import Dots               from './Dots.vue'
import ViewWithResolution from './ViewWithResolution.vue'
import GridTools          from './GridTools.vue'

export default {

  name: 'GridHeader',

  components: {
    Dots,
    GridStatus,
    ViewWithResolution,
    GridTools,
  },

}
</script>
