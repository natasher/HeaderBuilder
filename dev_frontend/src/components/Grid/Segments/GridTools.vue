<template>
<div class = "tools">

  <a href = "#"
    v-if  = "getGridStatus === 'custom'"
    @click.passive = "showGridOptionsModal({ $modal: $modal })" >
      <font-icon icon = "pencil" />
  </a>

</div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import FontIcon from '../../BaseGeneric/FontIcon.vue';

export default {

  name: 'GridTools',

  components: {
    FontIcon,
  },

  computed: {
    ...mapGetters( 'ui', [ 'getGridStatus' ]),
  },

  methods: {
    ...mapActions( 'modals', [ 'showGridOptionsModal' ]),
  },

}
</script>
