<template>
  <modal-scaffold
    name       = "ModalCart"
    title      = "Cart"
    :openHook  = "true"
    :closeHook = "true">

    <!-- SLOT: form -->
    <template slot="form">
      <icon-field
        fieldName = "Icon"
        wpId      = "shopIcon" />
    </template>

    <!-- SLOT: style -->
    <template slot="style">
      <color-field fieldName = "Icon/text color"
                  default   = "#333333"
                  wpId      = "iconColor"
                  as        = "styleForm" />

      <color-field fieldName = "Hover color"
                  default   = "#0095eb"
                  wpId      = "hoverColor"
                  as        = "styleForm" />
    </template>
  </modal-scaffold>
</template>

<script>
import ModalScaffold from '../../BaseGeneric/ModalScaffold.vue'
import IconField     from '../Fields/IconField.vue'
import ColorField    from '../Fields/ColorField.vue'

export default {

  name: 'Cart',

  components: {
    ModalScaffold,
    IconField,
    ColorField,
  },

}
</script>