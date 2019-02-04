import { createLocalVue } from '@vue/test-utils'
import { storeConfig    } from '../../../../src/store/config'
import Vuex          from 'vuex'
import flushPromises from 'flush-promises'
import cloneDeep     from 'lodash.clonedeep'

const localVue = createLocalVue()
localVue.use( Vuex )

describe('General ACTIONS:', () => {

  let store

  beforeEach(() => {
    const clonedStoreConfig = cloneDeep( storeConfig )
    store = new Vuex.Store( clonedStoreConfig )
  })

  test('`setEditorChanged` sets rootState.hasChanged', async () => {
    expect.assertions( 1 )
    const value = 'noop'

    store.dispatch( 'general/setEditorChanged', { hasChanged: value }, { root: true })
    await flushPromises()

    expect( store.state.general.editorHasChanged ).toBe( value )
  })

  describe('setCurrentView', () => {

    test('sets rootState.general.currentView', async () => {
      expect.assertions( 1 )
      const value = 'testValue'

      store.dispatch( 'general/setCurrentView', { view: value }, { root: true })
      await flushPromises()

      expect( store.state.general.currentView ).toBe( value )
    })

    test('if view payload is `desktop`, call `ui/setBreakpoint` action and set rootState.ui.currentBreakpoint', async () => {
      expect.assertions( 2 )
      const value = 'desktop'

      store.dispatch( 'general/setCurrentView', { view: value }, { root: true })
      await flushPromises()

      expect( store.state.general.currentView  ).toBe( value )
      expect( store.state.ui.currentBreakpoint ).toBe( '>= 960' )
    })

    test('if view payload is `tablet`, call `ui/setBreakpoint` action and set rootState.ui.currentBreakpoint', async () => {
      expect.assertions( 2 )
      const value = 'tablet'

      store.dispatch( 'general/setCurrentView', { view: value }, { root: true })
      await flushPromises()

      expect( store.state.general.currentView  ).toBe( value )
      expect( store.state.ui.currentBreakpoint ).toBe( '< 960' )
    })

    test('if view payload is other then `desktop` or `tablet`, call `ui/setBreakpoint` action and set rootState.ui.currentBreakpoint', async () => {
      expect.assertions( 2 )
      const value = 'mobile'

      store.dispatch( 'general/setCurrentView', { view: value }, { root: true })
      await flushPromises()

      expect( store.state.general.currentView  ).toBe( value )
      expect( store.state.ui.currentBreakpoint ).toBe( '< 768' )
    })

  })

  test('`setCurrentStoreModule` sets rootState.general.currentStoreModule', async () => {
    expect.assertions( 1 )
    const value = 'testModule'

    store.dispatch('general/setCurrentStoreModule', { storeModule: value }, { root: true })
    await flushPromises()

    expect( store.state.general.currentStoreModule ).toBe( value )
  })

})