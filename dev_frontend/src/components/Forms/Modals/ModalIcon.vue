<template>
  <modal-scaffold
    name       = "ModalIcon"
    title      = "Icon"
    :openHook  = "true"
    :closeHook = "true">

    <!-- SLOT: form -->
    <template slot="form">
      <icon-field
        fieldName = "Icon"
        wpId      = "icon" />

      <text-field
        fieldName = "Link"
        wpId      = "link" />

      <select-field
        fieldName = "Link Target"
        wpId      = "linkTarget"
        :opts     = "[
          {
            label: 'Default | _self',
            value: ''
          },
          {
            label: 'New Tab or Window',
            value: '_blank'
          },
          {
            label: 'Lightbox (image or embed video)',
            value: 'lightbox'
          },
        ]" />

      <text-field
        fieldName = "Link Class"
        wpId      = "linkClass"
        spread    = "narrow" />
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
    </template>

  </modal-scaffold>
</template>

<script>
import ModalScaffold from '../../BaseGeneric/ModalScaffold.vue'
import IconField     from '../Fields/IconField.vue'
import TextField     from '../Fields/TextField.vue'
import SelectField   from '../Fields/SelectField.vue'
import ColorField    from '../Fields/ColorField.vue'

export default {

  name: 'Icons',

  components: {
    ModalScaffold,
    IconField,
    TextField,
    SelectField,
    ColorField,
  },

}
</script>
