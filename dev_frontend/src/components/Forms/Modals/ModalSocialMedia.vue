<template>
  <modal-scaffold
    name = "ModalSocial"
    title      = "Social Icon"
    :openHook  = "true"
    :closeHook = "true">

    <!-- SLOT: form -->
    <template slot="form">
      <icons-field
        fieldName = "Icons List"
        wpId      = "iconsList" />

      <switch-field
        fieldName = "Open Links In New Window"
        wpId      = "openLinksInNewWindow"
        label     = 'Open links in new window' />
    </template>

    <!-- SLOT: style -->
    <template slot="style">
      <color-field fieldName = "Icon color"
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
import IconsField    from '../Fields/IconsField.vue'
import SwitchField   from '../Fields/SwitchField.vue'
import ColorField    from '../Fields/ColorField.vue'

export default {

  name: 'SocialMedia',

  components: {
    ModalScaffold,
    IconsField,
    SwitchField,
    ColorField,
  },

}
</script>
