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
        icon: 'heart-line',
        uuid: '',
        form: {
          logo           : '',
          height         : '',
          retinaLogo     : '',
          options: {
            overflowLogo: false,
          },
        },
      },
      {
        name: 'menu',
        icon: 'list',
        uuid: '',
        form: {
          options: {
            bordersBetweenItems             : false,
            arrowsForItemsWithSubmenu       : false,
            foldSubmenusForLast2ItemsToRight: false,
          },
          replaceWithMenuIcon: {
            label: 'Tablet & Mobile',
            value: 'tabletMobile',
          },
          menu: '',
          font: {
            fontFamily: {
              label: 'Arial',
              value: 'Arial'
            },
            fontSize: 0,
          },
        },
        style: {
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
        name: 'menuIcon',
        icon: 'menu',
        uuid: '',
        form: {
          icon     : [],
          menu: '',
        },
        style: {
          iconColor      : '#333333',
          hoverIconColor : '#0095eb',
          backgroundColor: 'rgba(255,255,255,0)',
        },
      },
      {
        name: 'extras',
        icon: 'plus-squared',
        uuid: '',
        form: {
          shopIcon   : [],
          searchStyle: {
            label: 'Icon',
            value: 'icon',
          },
          searchType: {
            label: 'Default',
            value: '',
          },
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
      {
        name: 'social',
        icon: 'share',
        uuid: '',
        form: {
          iconsList           : [],
          openLinksInNewWindow: false,
        },
        style: {
          iconColor : '#333333',
          hoverColor: '#0095eb',
        },
      },
      {
        name: 'text',
        icon: 'doc-text',
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
        icon: 'picture',
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
        icon: 'feather',
        uuid: '',
        form: {
          icon      : [],
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
        icon: 'db-shape',
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
          textColor       : '#333333',
          buttonColor     : '#f7f7f7',
          hoverTextColor  : '#ffffff',
          hoverButtonColor: '#0095eb',
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
        value,
      } = payload

      styleForm[ name ] = value
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