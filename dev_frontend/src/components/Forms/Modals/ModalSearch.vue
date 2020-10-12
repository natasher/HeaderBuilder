<template>
  <modal-scaffold
    name       = "ModalSearch"
    title      = "Search"
    :openHook  = "true"
    :closeHook = "true">

    <!-- SLOT: form -->
    <template slot="form">

      <select-field
        fieldName = "Style"
        wpId      = "searchStyle"
        :opts     = "[
          {
            label: 'Hide',
            value: 'hide'
          },
          {
            label: 'Icon',
            value: 'icon'
          },
          {
            label: 'Search Field',
            value: 'field'
          },
        ]" />

      <select-field
        fieldName = "Search"
        wpId      = "searchType"
        :opts     = "[
          {
            label: 'Default',
            value: ''
          },
          {
            label: 'Shop products only',
            value: 'products'
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
import ModalScaffold    from '../../BaseGeneric/ModalScaffold.vue'
import SelectField      from '../Fields/SelectField.vue'
import ColorField       from '../Fields/ColorField.vue'

export default {

  name: 'Search',

  components: {
    ModalScaffold,
    SelectField,
    ColorField,
  },

}
</script>
