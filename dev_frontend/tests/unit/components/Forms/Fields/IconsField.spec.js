import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex          from 'vuex'
import flushPromises from 'flush-promises'
import merge         from 'lodash.merge'
import draggable     from 'vuedraggable'
import IconsList     from '../../../../../src/components/Forms/Fields/IconsList.js'
import IconsField    from '../../../../../src/components/Forms/Fields/IconsField.vue'

const localVue = createLocalVue()
localVue.use( Vuex )

function createStore(overrides) {
  const defaultStoreConfig = {
    modules: {
      items: {
        namespaced: true,
        actions: {
          setCurrentFieldValue   : jest.fn(),
          pushCurrentFieldEntry  : jest.fn(),
          removeCurrentFieldEntry: jest.fn(),
        }
      },
      fields: {
        namespaced: true,
        getters: {
          getCurrentFieldValue: jest.fn().mockReturnValue(() => { return [] })
        },
      },
    },
  }

  return new Vuex.Store(
    merge( defaultStoreConfig, overrides )
  )
}

function createWrapper(overrides) {
  const defaultMountingOptions = {
    localVue,
    store: createStore(),
    propsData: {
      fieldName: 'Test Field',
      wpId     : 'testField',
    },
    stubs: {
      // draggable: '<div />',
      draggable,
    }
  }

  return shallowMount( IconsField, merge( defaultMountingOptions, overrides ))
}

let iconName = 'icon-lego'

describe('IconsField.vue', () => {

  describe('snapshots:', () => {

    test('should match if no icon is selected', async () => {
      const wrapper = createWrapper()

      expect( wrapper.element ).toMatchSnapshot()
    })

    test('should match snapshot if icon is selected', async () => {
      const wrapper = createWrapper({
        methods: {
          getIcon: jest.fn().mockImplementation(() => {
            wrapper.vm.tempIcon    = iconName
            wrapper.vm.popupOffset = '666px'
          })
        }
      })

      const icon = wrapper.find(`i.${ iconName }`)
      icon.trigger( 'click' )
      await flushPromises()

      expect( wrapper.element ).toMatchSnapshot()
    })

    test('should match snapshot if 3 icons has been added', async () => {
      const getCurrentFieldValue = jest.fn().mockReturnValue(
        () => {
          return [
            { "icon": "icon-acrobat", "link": "http://adobe.com"        },
            { "icon": "icon-gmail",   "link": "https://mail.google.com" },
            { "icon": "icon-youtube", "link": "youtube.com"             }
          ]
        }
      )
      const store = createStore({
        modules: {
          fields: {
            namespaced:true,
            getters: {
              getCurrentFieldValue,
            },
          },
        },
      })
      const wrapper = createWrapper({ store, })
      await flushPromises()

      expect( wrapper.html() ).toMatchSnapshot()
    })

  })

  test('should display exact count of icons as provided', () => {
    const wrapper = createWrapper()
    const icons   = wrapper.findAll('.mfn-icon')

    expect( icons.length ).toBe( IconsList.length )
  })

  test('should show popup with url input when icon has been clicked', async () => {
    const wrapper = createWrapper({
      methods: {
        getIcon: jest.fn().mockImplementation(() => {
          wrapper.vm.tempIcon    = iconName
          wrapper.vm.popupOffset = '666px'
        })
      }
    })

    const icon = wrapper.find(`i.${ iconName }`)
    icon.trigger( 'click' )
    await flushPromises()

    const popup = wrapper.find('.popup')
    expect( popup.isVisible() ).toBe( true )
    expect( popup.contains('input[type="text"]') ).toBe( true )
  })

  test('should close popup with icon url when close button is clicked', async () => {
    const clearIconData = jest.fn()
    const wrapper = createWrapper({
      methods: {
        getIcon: jest.fn().mockImplementation(() => {
          wrapper.vm.tempIcon    = iconName
          wrapper.vm.popupOffset = '666px'
        }),
        clearIconData,
      },
    })

    const icon = wrapper.find(`i.${ iconName }`)
    icon.trigger( 'click' )
    await flushPromises()

    const popup = wrapper.find( '.popup' )
    expect( popup.isVisible() ).toBe( true )

    const closeBtn = popup.find( '.mfn-button-close' )
    closeBtn.trigger( 'click' )
    await flushPromises()

    expect( clearIconData ).toBeCalled()
  })

  test('should add icon with url to field array when `add` is clicked', async () => {
    const clearIconData = jest.fn()
    const pushCurrentFieldEntry = jest.fn()
    const store = createStore({
      modules: {
        items: {
          actions: {
            pushCurrentFieldEntry,
          }
        }
      }
    })
    const wrapper = createWrapper({
      store,
      methods: {
        getIcon: jest.fn().mockImplementation(() => {
          wrapper.vm.tempIcon    = iconName
          wrapper.vm.popupOffset = '666px'
        }),
        clearIconData,
      },
    })

    const icon = wrapper.find(`i.${ iconName }`)
    icon.trigger( 'click' )
    await flushPromises()

    const input = wrapper.find('.popup>input[name="Link"]')
    const url = 'http://test.com'
    input.setValue( url )
    const addBtn =  wrapper.find('.popup>button')
    addBtn.trigger( 'click' )
    await flushPromises()

    expect(pushCurrentFieldEntry).toBeCalledWith(
      expect.anything(),
      { entry: { icon: iconName, link: url }, name: 'testField' },
      void 0,
    )
    expect( clearIconData ).toBeCalled()
  })

  test('should hide inplace link edit input by default', async () => {
    const getCurrentFieldValue = jest.fn().mockReturnValue(
      () => {
        return [
          { "icon": "icon-acrobat", "link": "http://adobe.com"        },
          { "icon": "icon-gmail",   "link": "https://mail.google.com" },
          { "icon": "icon-youtube", "link": "youtube.com"             }
        ]
      }
    )
    const store = createStore({
      modules: {
        fields: {
          namespaced:true,
          getters: {
            getCurrentFieldValue,
          },
        },
      },
    })
    const wrapper = createWrapper({ store, })
    await flushPromises()
    const liveInput = wrapper.find('input[ref="liveEdit"]')

    expect( liveInput.exists() ).toBeFalsy()
  })

  test('should show inplace link edit input when given entry has been clicked', async () => {
    const getCurrentFieldValue = jest.fn().mockReturnValue(
      () => {
        return [
          { "icon": "icon-acrobat", "link": "http://adobe.com"        },
          { "icon": "icon-gmail",   "link": "https://mail.google.com" },
          { "icon": "icon-youtube", "link": "youtube.com"             }
        ]
      }
    )
    const store = createStore({
      modules: {
        fields: {
          namespaced:true,
          getters: {
            getCurrentFieldValue,
          },
        },
      },
    })
    const wrapper = createWrapper({ store, })

    const entries   = wrapper.findAll('.selected-icons>ul>div>li')
    const gmailLink = entries.at(1).find( 'span[data-index]' )

    gmailLink.trigger('click')
    await flushPromises()

    const liveInput = wrapper.find('.selected-icons>ul>div>li>input')

    expect( liveInput.exists() ).toBe( true )
    expect( liveInput.isVisible() ).toBe( true )
  })

  test('should update field array entry after the user update selected icon url (blur event)', async() => {
    const getCurrentFieldValue = jest.fn().mockReturnValue(
      () => {
        return [
          { "icon": "icon-acrobat", "link": "http://adobe.com"        },
          { "icon": "icon-gmail",   "link": "https://mail.google.com" },
          { "icon": "icon-youtube", "link": "youtube.com"             }
        ]
      }
    )
    const store = createStore({
      modules: {
        fields: {
          namespaced:true,
          getters: {
            getCurrentFieldValue,
          },
        },
      },
    })
    const wrapper = createWrapper({ store, })

    const entries   = wrapper.findAll('.selected-icons>ul>div>li')
    const gmailLink = entries.at(1).find( 'span[data-index]' )

    gmailLink.trigger('click')
    await flushPromises()

    const liveInput = wrapper.findAll('.selected-icons>ul>div>li>input')
    const testVal   = 'test-mail-url'
    liveInput.setValue( testVal )
    liveInput.trigger('blur')

    const firstEntryUrl = wrapper.findAll('.selected-icons>ul>div>li').at(1).find('span[data-index]')

    expect( firstEntryUrl.text() ).toBe( testVal )
  })

  test('should update field array entry after the user update selected icon url (enter keyup event)', async() => {
    const getCurrentFieldValue = jest.fn().mockReturnValue(
      () => {
        return [
          { "icon": "icon-acrobat", "link": "http://adobe.com"        },
          { "icon": "icon-gmail",   "link": "https://mail.google.com" },
          { "icon": "icon-youtube", "link": "youtube.com"             }
        ]
      }
    )
    const store = createStore({
      modules: {
        fields: {
          namespaced:true,
          getters: {
            getCurrentFieldValue,
          },
        },
      },
    })
    const wrapper = createWrapper({ store, })

    const entries   = wrapper.findAll('.selected-icons>ul>div>li')
    const gmailLink = entries.at(1).find( 'span[data-index]' )

    gmailLink.trigger('click')
    await flushPromises()

    const liveInput = wrapper.findAll('.selected-icons>ul>div>li>input')
    const testVal   = 'test-mail-url'
    liveInput.setValue( testVal )
    liveInput.trigger('keyup.enter')

    const firstEntryUrl = wrapper.findAll('.selected-icons>ul>div>li').at(1).find('span[data-index]')

    expect( firstEntryUrl.text() ).toBe( testVal )
  })

  test('should remove field array entery after the user click remove (x) button', async () => {
    const removeCurrentFieldEntry = jest.fn()
    const store = createStore({
      modules: {
        items: {
          actions: {
            removeCurrentFieldEntry,
          }
        },
        fields: {
          namespaced:true,
          getters: {
            getCurrentFieldValue: jest.fn().mockReturnValue(
              () => {
                return [
                  { "icon": "icon-acrobat", "link": "http://adobe.com"        },
                  { "icon": "icon-gmail",   "link": "https://mail.google.com" },
                  { "icon": "icon-youtube", "link": "youtube.com"             }
                ]
              }
            )
          },
        },
      },
    })
    const wrapper = createWrapper({ store, })

    const entries   = wrapper.findAll('.selected-icons>ul>div>li')
    const gmailRemoveBtn = entries.at(1).find('.mfn-button-close')

    gmailRemoveBtn.trigger('click')
    await flushPromises()

    expect(removeCurrentFieldEntry).toBeCalledWith(
      expect.anything(),
      { name: 'testField', index: 1 },
      void 0
    )
  })

})