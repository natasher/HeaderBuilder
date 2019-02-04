<template>
  <modal-scaffold
    name = "ModalMenuIcon"
    title      = "Menu Icon"
    :openHook  = "true"
    :closeHook = "true">

    <!-- SLOT: form -->
    <template slot="form">
      <select-field
        fieldName = "Menu"
        wpId      = "menu"
        :opts     = "getWPMenusList" />

      <icon-field
        fieldName = "Icon"
        wpId      = "icon" />
    </template>

    <!-- SLOT: style -->
    <template slot="style">
      <color-field fieldName = "Icon color"
                   default   = "#333333"
                   wpId      = "iconColor"
                   as        = "styleForm" />

      <color-field fieldName = "Hover icon color"
                   default   = "#0095eb"
                   wpId      = "hoverIconColor"
                   as        = "styleForm" />

      <color-field fieldName = "Background color"
                   default   = "rgba(255, 255, 255, 0)"
                   wpId      = "backgroundColor"
                   as        = "styleForm" />
    </template>

  </modal-scaffold>
</template>

<script>
import { mapState } from 'vuex'
import ModalScaffold from '../../BaseGeneric/ModalScaffold.vue'
import SelectField   from '../Fields/SelectField.vue'
import IconField     from '../Fields/IconField.vue'
import ColorField    from '../Fields/ColorField.vue'

export default {

  name: 'MenuIcon',

  components: {
    ModalScaffold,
    SelectField,
    IconField,
    ColorField,
  },

  computed: mapState( 'endpoint', {
    getWPMenusList: state => state.wpMenusList,
  }),

}
</script>
