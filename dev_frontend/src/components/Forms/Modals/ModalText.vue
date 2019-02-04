<template>
  <modal-scaffold
    name = "ModalText"
    title      = "Text"
    :openHook  = "true"
    :closeHook = "true">

    <!-- SLOT: form -->
    <template slot="form">
      <text-area-field
        fieldName = "Text"
        wpId      = "text" />
    </template>

    <!-- SLOT: style -->
    <template slot="style">
      <color-field fieldName = "Text color"
                   default   = "#333333"
                   wpId      = "textColor"
                   as        = "styleForm" />

      <color-field fieldName = "Link color"
                   default   = "#0095eb"
                   wpId      = "linkColor"
                   as        = "styleForm" />

      <color-field fieldName = "Hover link color"
                   default   = "#007cc3"
                   wpId      = "hoverLinkColor"
                   as        = "styleForm" />
    </template>

  </modal-scaffold>
</template>

<script>
import ModalScaffold from '../../BaseGeneric/ModalScaffold.vue'
import TextAreaField from '../Fields/TextAreaField.vue'
import ColorField    from '../Fields/ColorField.vue'

export default {

  name: 'ModalText',

  components: {
    ModalScaffold,
    TextAreaField,
    ColorField,
  },

}
</script>
