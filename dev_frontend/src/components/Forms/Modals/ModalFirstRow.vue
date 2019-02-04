<template>
  <modal-scaffold
    name="ModalFirstRow"
    title="First Row">

    <template slot="form">
      <text-field fieldName = "Height"
                  wpId      = "height"
                  spread    = "narrow"
                  pholder   = "px"
                  as        = "row"
                  row       = "firstRow" />

      <color-field
        fieldName = "Background Color"
        default   = "rgba(255,255,255,0)"
        wpId      = "backgroundColor"
        as        = "row"
        row       = "firstRow" />
    </template>

  </modal-scaffold>
</template>

<script>
import ModalScaffold from '../../BaseGeneric/ModalScaffold.vue'
import ColorField    from '../Fields/ColorField.vue'
import TextField     from '../Fields/TextField.vue'

export default {

  name: 'FirstRow',

  components: {
    ModalScaffold,
    ColorField,
    TextField,
  },

}
</script>
