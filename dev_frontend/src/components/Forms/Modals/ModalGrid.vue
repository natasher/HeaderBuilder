<template>
  <modal-scaffold
    name  = "ModalGrid"
    title = "Header">

    <template slot="form">
      <select-field
        fieldName = "Layout"
        wpId      = "layout"
        as        = "grid"
        :opts     = "[
          {
            label: 'Wrap into grid',
            value: 'wrap_into_grid'
          },
          {
            label: 'Full width',
            value: 'full_width'
          },
        ]" />

      <color-field
        fieldName = "Background Color"
        wpId      = "backgroundColor"
        as        = "grid"
        default   = "#ffffff" />

      <background-image-field
        fieldName = "Background Image"
        wpId      = "backgroundImage"
        as        = "grid" />

      <switch-field
        as        = "grid"
        fieldName = "Minimalist"
        wpId      = "minimalist"
        label     = "minimalist label" />
    </template>

  </modal-scaffold>
</template>

<script>
import ModalScaffold        from '../../BaseGeneric/ModalScaffold.vue'
import SelectField          from '../Fields/SelectField.vue'
import ColorField           from '../Fields/ColorField.vue'
import BackgroundImageField from '../Fields/BackgroundImageField.vue'
import SwitchField          from '../Fields/SwitchField.vue'

export default {

  name: 'EditGrid',

  components: {
    ModalScaffold,
    SelectField,
    ColorField,
    BackgroundImageField,
    SwitchField,
  },

}
</script>
