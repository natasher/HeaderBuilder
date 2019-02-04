<template>
  <modal-scaffold
    name="ModalSecondRow"
    title="Second Row">

    <template slot="form">
      <text-field fieldName = "Height"
                  wpId      = "height"
                  spread    = "narrow"
                  pholder   = "px"
                  as        = "row"
                  row       = "secondRow" />

      <color-field
        fieldName = "Background Color"
        default   = "rgba(255,255,255,0)"
        wpId      = "backgroundColor"
        as        = "row"
        row       = "secondRow" />
    </template>

  </modal-scaffold>
</template>

<script>
import ModalScaffold from '../../BaseGeneric/ModalScaffold.vue'
import ColorField    from '../Fields/ColorField.vue'
import TextField     from '../Fields/TextField.vue'

export default {

  name: 'SecondRow',

  components: {
    ModalScaffold,
    ColorField,
    TextField,
  },

}
</script>
