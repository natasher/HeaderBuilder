<template>
  <modal-scaffold
    name       = "ModalImage"
    title      = "Image"
    :openHook  = "true"
    :closeHook = "true">

    <template slot="form">
      <upload-field
        fieldName = "Image"
        wpId      = "image" />

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
            label: 'New Tab or Window | _blank',
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

  </modal-scaffold>
</template>

<script>
import ModalScaffold from '../../BaseGeneric/ModalScaffold.vue'
import UploadField   from '../Fields/UploadField.vue'
import TextField     from '../Fields/TextField.vue'
import SelectField   from '../Fields/SelectField.vue'

export default {

  name: 'Image',

  components: {
    ModalScaffold,
    UploadField,
    TextField,
    SelectField,
  },

}
</script>
