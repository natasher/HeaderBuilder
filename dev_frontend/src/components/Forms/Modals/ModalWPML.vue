<template>
  <modal-scaffold
    name       = "ModalWpml"
    title      = "WPML"
    :openHook  = "true"
    :closeHook = "true">

    <!-- SLOT: form -->
    <template slot="form">

      <select-field
        fieldName = "Style"
        wpId      = "wpmlStyle"
        :opts     = "[
          {
            label: 'Hide',
            value: 'hide'
          },
          {
            label: 'Flags',
            value: 'flags'
          },
          {
            label: 'Language name (native)',
            value: 'langName'
          },
          {
            label: 'Language code',
            value: 'langCode'
          },
        ]" />


      <select-field
        fieldName = "Arrangement"
        wpId      = "wpmlArrangement"
        :opts     = "[
          {
            label: 'List',
            value: 'list'
          },
          {
            label: 'Dropdown',
            value: 'dropdown'
          },
        ]" />

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
import SelectField   from '../Fields/SelectField.vue'
import ColorField    from '../Fields/ColorField.vue'

export default {

  name: 'Wpml',

  components: {
    ModalScaffold,
    SelectField,
    ColorField,
  },

}
</script>
