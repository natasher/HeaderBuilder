<template>
  <modal-scaffold
    name       = "ModalButton"
    title      = "Button"
    :openHook  = "true"
    :closeHook = "true">

    <!-- SLOT: form -->
    <template slot="form">
      <text-field fieldName = "Title"
                  wpId      = "title"
                  spread    = "narrow" />

      <text-field fieldName = "Link"
                  wpId      = "link" />

      <select-field fieldName = "Link Target"
                    wpId      = "linkTarget"
                    :opts     = "[
                      {
                        label: 'Default | _self',
                        value: ''
                      },
                      {
                        label: 'New Tab or Window | _blank',
                        value: '_blank'
                      },
                      {
                        label: 'Lightbox (image or embed video)',
                        value: 'lightbox'
                      },
                    ]" />

      <text-field fieldName = "Link Class"
                  wpId      = "linkClass"
                  spread    = "narrow" />
    </template>

    <!-- SLOT: style -->
    <template slot="style">
        <font-field
          fieldName = "Font"
          as        = "styleForm"
          wpId      = "font" />

        <margin-field
          fieldName = "Padding"
          as        = "styleForm"
          wpId      = "padding"
        />

        <text-field fieldName = "Border Width"
                    wpId      = "borderWidth"
                    pholder   = "px"
                    as        = "styleForm"
                    spread    = "narrow" />

        <text-field fieldName = "Border Radius"
                    wpId      = "borderRadius"
                    pholder   = "px"
                    as        = "styleForm"
                    spread    = "narrow" />

        <color-field fieldName = "Color Normal"
                    default   = "#626262"
                    wpId      = "colorNormal"
                    as        = "styleForm" />

        <color-field fieldName = "Color Hover"
                    default   = "#626262"
                    wpId      = "colorHover"
                    as        = "styleForm" />

        <color-field fieldName = "Background Normal"
                    default   = "#DBDDDF"
                    wpId      = "bgNormal"
                    as        = "styleForm" />

        <color-field fieldName = "Background Hover"
                    default   = "#D3D3D3"
                    wpId      = "bgHover"
                    as        = "styleForm" />

        <color-field fieldName = "Border Color Normal"
                    default   = "#000000"
                    wpId      = "borderColorNormal"
                    as        = "styleForm" />

        <color-field fieldName = "Border Color Hover"
                    default   = "#000000"
                    wpId      = "borderColorHover"
                    as        = "styleForm" />

    </template>

  </modal-scaffold>
</template>

<script>
import ModalScaffold from '../../BaseGeneric/ModalScaffold.vue'
import TextField     from '../Fields/TextField.vue'
import SelectField   from '../Fields/SelectField.vue'
import ColorField    from '../Fields/ColorField.vue'
import FontField     from '../Fields/FontField.vue'
import MarginField   from "../Fields/MarginField.vue";

export default {

  name: 'Button',

  components: {
    ModalScaffold,
    TextField,
    SelectField,
    ColorField,
    FontField,
    MarginField,
  },

}
</script>
