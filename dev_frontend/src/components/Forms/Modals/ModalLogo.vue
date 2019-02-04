<template>
  <modal-scaffold
    name       = "ModalLogo"
    title      = "Logo"
    :openHook  = "true"
    :closeHook = "true">

    <template slot="form">
      <upload-field
        fieldName = "Logo"
        wpId      = "logo" />

      <upload-field
        fieldName = "Retina Logo"
        wpId      = "retinaLogo" />

      <text-field
        fieldName = "Height"
        wpId      = "height"
        spread    = "narrow" />

      <options-group
        fieldName = "Options"
        wpId      = "options"
        :opts     = "[
          { label : 'Overflow logo', value: 'overflowLogo' }
        ]" />
    </template>

  </modal-scaffold>
</template>

<script>
import ModalScaffold from '../../BaseGeneric/ModalScaffold.vue'
import UploadField   from '../Fields/UploadField.vue'
import TextField     from '../Fields/TextField.vue'
import OptionsGroup  from '../Fields/OptionsGroup.vue'

export default {

  name: 'Logo',

  components: {
    ModalScaffold,
    UploadField,
    TextField,
    OptionsGroup,
  },

}
</script>
