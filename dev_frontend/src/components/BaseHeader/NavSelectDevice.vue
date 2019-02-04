<template>
  <nav >
    <ul class = "tabs select-device">

      <li @click = "changeToDesktop"
          :class = "{
            'active': ( getCurrentView === 'desktop' ) ? true : false
          }">
        <a data-type = "desktop">
          <span class = "icon">
            <font-icon icon = "monitor" />
          </span>
          <span class = "text">Desktop</span>
        </a>
      </li>

      <li @click = "changeToTablet"
          :class = "{
            'active': ( getCurrentView === 'tablet' ) ? true : false
          }">
        <a data-type = "tablet">
          <span class = "icon">
            <font-icon icon = "mobile-line" />
          </span>
          <span class = "text">Tablet</span>
        </a>
      </li>

      <li @click = "changeToMobile"
          :class = "{
            'active': ( getCurrentView === 'mobile' ) ? true : false
          }">
        <a data-type = "mobile">
          <span class = "icon">
            <font-icon icon = "mobile" />
          </span>
          <span class = "text">Mobile</span>
        </a>
      </li>

    </ul>
  </nav>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex'
import FontIcon from '../BaseGeneric/FontIcon.vue'
import { infoMobileInactiveItems } from '../../store/dialogs'

export default {

  name: 'NavSelectDevice',

  components: {
    FontIcon,
  },

  computed: {
    ...mapState( 'general', {
      getCurrentView: state => state.currentView,
    }),
    ...mapGetters( 'ui', [ 'getGridStatus' ]),
  },

  methods: {
    ...mapActions( 'grid', [
      'clone',
    ]),

    ...mapActions( 'inactiveItems', [
      'clear',
    ]),

    ...mapActions( 'ui', [
      'changeDevice',
    ]),

    changeToDesktop: function() {
      this.changeDevice({ device: 'desktop' })
    },

    changeToTablet: function() {
      this.changeDevice({ device: 'tablet' })
        .then(() => {
          this.$nextTick(() => {

            if (this.getGridStatus === 'auto') {
              this.clone({ from: 'DesktopModule' })
            }

          })
        })
    },

    changeToMobile: function() {
      this.changeDevice({ device: 'mobile' })
        .then(() => {
          this.$nextTick(() => {

            if (this.getGridStatus === 'auto') {
              this.clear()
              this.clone({ from: 'DesktopModule' })

              this.$modal.show('MfnGenericModal', {
                title       : 'Info',
                text        : infoMobileInactiveItems,
                closeOnClick: true,
              })
            }

          })
        })
    },

  },
}
</script>
