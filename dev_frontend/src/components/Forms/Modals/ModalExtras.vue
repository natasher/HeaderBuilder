<template>
  <modal-scaffold
    name       = "ModalExtras"
    title      = "Extras"
    :openHook  = "true"
    :closeHook = "true">

    <!-- SLOT: form -->
    <template slot="form">
      <section id="Search">

        <span class="section-group-name">Search</span>

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
      </section>

      <section id = "Shop">

        <span class = "section-group-name">Shop</span>

        <icon-field
          fieldName = "Icon"
          wpId      = "shopIcon" />

      </section>

      <section id = "WPML">

        <span class = "section-group-name">WPML</span>

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
      </section>
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
import IconField        from '../Fields/IconField.vue'
import ColorField       from '../Fields/ColorField.vue'

export default {

  name: 'Extras',

  components: {
    ModalScaffold,
    SelectField,
    IconField,
    ColorField,
  },

}
</script>
