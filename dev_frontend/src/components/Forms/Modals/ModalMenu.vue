<template>
  <modal-scaffold
    name       = "ModalMenu"
    title      = "Menu"
    :openHook  = "true"
    :closeHook = "true">

    <!-- SLOT: form -->
    <template slot="form">
      <select-field
        fieldName = "Menu"
        wpId      = "menu"
        :opts     = "getWPMenusList" />

      <select-field
        fieldName = "Replace With Menu Icon"
        wpId      = "replaceWithMenuIcon"
        :opts     = "[
          {
            label: 'Tablet &amp; Mobile',
            value: 'tabletMobile'
          },
          {
            label: 'Mobile',
            value: 'mobile'
          },
        ]" />

      <options-group
        fieldName = "Options"
        wpId      = "options"
        :opts     = "[
          { label  : 'Borders between items',                   value: 'bordersBetweenItems' },
          { label  : 'Arrows for items with submenu',           value: 'arrowsForItemsWithSubmenu' },
          { label  : 'Fold submenus for last 2 items to right', value: 'foldSubmenusForLast2ItemsToRight' },
        ]" />

    </template>

    <!-- SLOT: style -->
    <template slot="style">
      <!-- SECTION: menu -->
      <section id="menu">

        <span class="section-group-name">Menu</span>

        <font-field
          fieldName = "Font"
          as        = "style"
          wpId      = "font" />

        <color-field fieldName = "Link color"
                    default   = "#333333"
                    wpId      = "linkColor"
                    as        = "styleForm" />

        <color-field fieldName = "Hover link color"
                    default   = "#0095eb"
                    wpId      = "hoverLinkColor"
                    as        = "styleForm" />

        <color-field fieldName = "Active link color"
                    default   = "#0095eb"
                    wpId      = "activeLinkColor"
                    as        = "styleForm" />
      </section>

      <!-- SECTION: submenu -->
      <section id="submenu">

        <span class="section-group-name">Submenu</span>

        <color-field fieldName = "Background color"
                    default   = '#F2F2F2'
                    wpId      = "subBackgroundColor"
                    as        = "styleForm" />

        <color-field fieldName = "Link color"
                    default   = "#333333"
                    wpId      = "subLinkColor"
                    as        = "styleForm" />

        <color-field fieldName = "Hover link color"
                    default   = "#0095eb"
                    wpId      = "subHoverLinkColor"
                    as        = "styleForm" />

        <color-field fieldName = "Active link color"
                    default   = "#0095eb"
                    wpId      = "subActiveLinkColor"
                    as        = "styleForm" />
      </section>
    </template>

  </modal-scaffold>
</template>

<script>
import { mapState }  from 'vuex'
import ModalScaffold from '../../BaseGeneric/ModalScaffold.vue'
import SelectField   from '../Fields/SelectField.vue'
import OptionsGroup  from '../Fields/OptionsGroup.vue'
import ColorField    from '../Fields/ColorField.vue'
import FontField     from '../Fields/FontField.vue'

export default {

  name: 'Menu',

  components: {
    ModalScaffold,
    SelectField,
    OptionsGroup,
    ColorField,
    FontField,
  },

  computed: mapState( 'endpoint', {
    getWPMenusList: state => state.wpMenusList,
  }),

}
</script>
