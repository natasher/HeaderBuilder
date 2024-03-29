import actions from './actions'
import getters from './getters'

export default {

  namespaced: true,

  state: {

    current: void 0,
    tmpItem: {},

    /**
     * List of forms, some defaults should be listed here
     * (at least indexes, depends what's changed)
     */
    baseItemsList: [
      {
        name: 'logo',
        uuid: '',
        form: {
          logo           : '',
          height         : '',
          width          : '',
          retinaLogo     : '',
          options: {
            wrapIntoH1Tag : false,
            linkToHomepage: false,
            overflowLogo  : false,
          },
        },
      },
      {
        name: 'menu',
        uuid: '',
        form: {
          menu: '',
          options: {
            bordersBetweenItems             : false,
            arrowsForItemsWithSubmenu       : false,
            foldSubmenusForLast2ItemsToRight: false,
          },
          replaceWithMenuIcon: {
            label: 'Tablet & Mobile',
            value: 'tabletMobile',
          },
          useMenuIconBelow: '',
          textInsteadOfMenuIcon: '',
          sideSlideMenu: {
            show            : false,
            showActionButton: false,
            showIcons       : false,
            showSocialIcons : false,
          },
        },
        style: {
          font: {
            fontFamily: {
              label: 'Roboto',
              value: 'Roboto'
            },
            fontSize: '14',
            fontStyle: '400',
            letterSpacing: 0,
          },
          linkColor         : '#333333',
          hoverLinkColor    : '#0095eb',
          activeLinkColor   : '#0095eb',
          subBackgroundColor: '#F2F2F2',
          subLinkColor      : '#333333',
          subHoverLinkColor : '#0095eb',
          subActiveLinkColor: '#0095eb',
        },
      },
      {
        name: 'social',
        uuid: '',
        form: {
          iconsList: [],
          openLinksInNewWindow: false,
        },
        style: {
          iconColor : '#333333',
          hoverColor: '#0095eb',
        },
      },
      {
        name: 'text',
        uuid: '',
        form: {
          text: ''
        },
        style: {
          textColor     : '#333333',
          linkColor     : '#0095eb',
          hoverLinkColor: '#007cc3',
        },
      },
      {
        name: 'image',
        uuid: '',
        form: {
          link      : '',
          image     : '',
          linkClass : '',
          linkTarget: {
            label: 'Default | _self',
            value: '',
          },
        },
      },
      {
        name: 'icon',
        uuid: '',
        form: {
          icon      : '',
          linkClass : '',
          linkTarget: {
            label: 'Default | _self',
            value: '',
          },
        },
        style: {
          iconColor     : '#333333',
          hoverIconColor: '#0095eb',
        },
      },
      {
        name: 'button',
        uuid: '',
        form: {
          title    : '',
          link     : '',
          linkClass: '',
          linkTarget: {
            label: 'Default | _self',
            value: '',
          },
        },
        style: {
          font: {
            fontFamily: {
              label: 'Roboto',
              value: 'Roboto'
            },
            fontSize: '14',
            fontStyle: '400',
            letterSpacing: 0,
          },
          padding: {
            top: 12,
            right: 20,
            bottom: 12,
            left: 20,
          },
          borderWidth     : 0,
          borderRadius    : 0,
          colorNormal     : '#626262',
          colorHover      : '#626262',
          bgNormal        : '#DBDDDF',
          bgHover         : '#D3D3D3',
          borderColorNormal : '#ffffff',
          borderColorHover : '#ffffff',
        },
      },
      {
        name: 'cart',
        uuid: '',
        form: {
          shopIcon : '',
        },
        style: {
          iconColor : '#333333',
          hoverColor: '#0095eb',
        },
      },
      {
        name: 'search',
        uuid: '',
        form: {
          searchStyle: {
            label: 'Icon',
            value: 'icon',
          },
          searchType: {
            label: 'Default',
            value: '',
          },
        },
        style: {
          iconColor : '#333333',
          hoverColor: '#0095eb',
        },
      },
      {
        name: 'wpml',
        uuid: '',
        form: {
          wpmlStyle: {
            label: 'Flags',
            value: 'flags',
          },
          wpmlArrangement: {
            label: 'List',
            value: 'list',
          },
        },
        style: {
          iconColor : '#333333',
          hoverColor: '#0095eb',
        },
      },
    ],
  },

  mutations: {

    SET_CURRENT_ITEM( state, payload ) {
      const new_payload = JSON.parse(JSON.stringify( payload ))
      state.current = new_payload
    },

    SET_TEMP_ITEM( state, payload ) {
      state.tmpItem = payload.item
    },

    SET_CURRENT_FIELD_VALUE( state, payload ) {
      const form = state.current.form
      const {
        name,
        position,
        value,
      } = payload

      if ( typeof position === 'undefined' ) {

        form[ name ] = value

      } else {

        if ( typeof form[ name ] !== 'undefined' ) {

          form[ name ][ position ] = value

        } else {

          form[ name ] = {}
          form[ name ][ position ] = value

        }

      }
    },

    SET_STYLE_FORM_VALUE( state, payload ) {
      const styleForm = state.current.style
      const {
        name,
        position,
        value,
      } = payload

      if ( typeof position === 'undefined' ) {

        styleForm[ name ] = value

      } else {

        if ( typeof styleForm[ name ] !== 'undefined' ) {

          styleForm[ name ][ position ] = value

        } else {

          styleForm[ name ] = {}
          styleForm[ name ][ position ] = value

        }

      }
    },

    PUSH_CURRENT_FIELD_ENTRY( state, payload ) {
      state.current.form[ payload.name ].push( payload.entry )
    },

    REMOVE_CURRENT_FIELD_ENTRY( state, payload ) {
      state.current.form[ payload.name ].splice( payload.index, 1 )
    },

  },

  getters,

  actions,

}