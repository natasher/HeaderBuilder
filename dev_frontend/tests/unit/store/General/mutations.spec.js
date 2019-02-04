import module from '../../../../src/store/modules/Common/General/index'

describe('MUTATIONS General module:', () => {

  test('SET_CURRENT_VIEW sets state.currentView', () => {
    const state = {
      currentView: 'desktop'
    }
    const newView = 'mobile'

    module.mutations.SET_CURRENT_VIEW( state, { view: newView })
    expect( state.currentView ).toBe( newView )
  })

  test('SET_CURRENT_STORE_MODULE sets state.storeModule', () => {
    const state = {
      currentStoreModule: 'DesktopModule'
    }
    const newStoreModule = 'MobileStickyModule'

    module.mutations.SET_CURRENT_STORE_MODULE( state, { storeModule: newStoreModule })
    expect( state.currentStoreModule ).toBe( newStoreModule )
  })

  test('EDITOR_HAS_CHANGED sets state.editorHasChanged', () => {
    const state = {
      editorHasChanged: false
    }
    const trueState = true

    module.mutations.EDITOR_HAS_CHANGED( state, { hasChanged: trueState })
    expect( state.editorHasChanged ).toBe( true )
  })

})