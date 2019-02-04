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
      <color-field fieldName = "Text color"
                   default   = "#333333"
                   wpId      = "textColor"
                   as        = "styleForm" />

      <color-field fieldName = "Button color"
                   default   = "#f7f7f7"
                   wpId      = "buttonColor"
                   as        = "styleForm" />

      <color-field fieldName = "Hover text color"
                   default   = "#ffffff"
                   wpId      = "hoverTextColor"
                   as        = "styleForm" />

      <color-field fieldName = "Hover button color"
                   default   = "#0095eb"
                   wpId      = "hoverButtonColor"
                   as        = "styleForm" />
    </template>

  </modal-scaffold>
</template>

<script>
import ModalScaffold from '../../BaseGeneric/ModalScaffold.vue'
import TextField     from '../Fields/TextField.vue'
import SelectField   from '../Fields/SelectField.vue'
import ColorField    from '../Fields/ColorField.vue'

export default {

  name: 'Button',

  components: {
    ModalScaffold,
    TextField,
    SelectField,
    ColorField,
  },

}
</script>
