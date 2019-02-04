import { createLocalVue } from '@vue/test-utils'
import { storeConfig    } from '../../../../src/store/config'
import Vuex          from 'vuex'
import flushPromises from 'flush-promises'
import cloneDeep     from 'lodash.clonedeep'
import _             from 'underscore'
import { prepareStateToPost } from '../../../../src/helpers/index'

const localVue = createLocalVue()
localVue.use( Vuex )
window._ = _

describe('ACTIONS Devices:', () => {

  let store

  beforeEach(() => {
    const clonedStoreConfig = cloneDeep( storeConfig )
    store = new Vuex.Store( clonedStoreConfig )

    store.dispatch( 'general/setCurrentStoreModule', { storeModule: 'DesktopModule' }, { root: true })
  })

  test('`desktopState` returns clone of desktopState', async () => {
    expect.assertions( 2 )

    return store.dispatch( 'devices/desktopState', void 0, { root: true })
      .then(result => {
        expect( result ).toEqual( store.state.DesktopModule )
        expect( result ).not.toContainEqual( store.state.DesktopModule )
      })
  })

  test('`desktopStickyState` returns clone of desktop sticky state', async () => {
    expect.assertions( 2 )

    return store.dispatch( 'devices/desktopStickyState', void 0, { root: true })
      .then(result => {
        expect( result ).toEqual( store.state.DesktopStickyModule )
        expect( result ).not.toContainEqual( store.state.DesktopStickyModule )
      })
  })

  test('`tabletState` returns clone of tablet state', async () => {
    expect.assertions( 2 )

    return store.dispatch( 'devices/tabletState', void 0, { root: true })
      .then(result => {
        expect( result ).toEqual( store.state.TabletModule )
        expect( result ).not.toContainEqual( store.state.TabletModule )
      })
  })

  test('`tabletStickyState` returns clone of tablet sticky state', async () => {
    expect.assertions( 2 )

    return store.dispatch( 'devices/tabletStickyState', void 0, { root: true })
      .then(result => {
        expect( result ).toEqual( store.state.TabletStickyModule )
        expect( result ).not.toContainEqual( store.state.TabletStickyModule )
      })
  })

  test('`mobileState` returns clone of mobile state', async () => {
    expect.assertions( 2 )

    return store.dispatch( 'devices/mobileState', void 0, { root: true })
      .then(result => {
        expect( result ).toEqual( store.state.MobileModule )
        expect( result ).not.toContainEqual( store.state.MobileModule )
      })
  })

  test('`mobileStickyState` returns clone of mobile sticky state', async () => {
    expect.assertions( 2 )

    return store.dispatch( 'devices/mobileStickyState', void 0, { root: true })
      .then(result => {
        expect( result ).toEqual( store.state.MobileStickyModule )
        expect( result ).not.toContainEqual( store.state.MobileStickyModule )
      })
  })

  describe('`joinDevicesState`', () => {

    test('should return desktop state at desktop key', async () => {
      let stateClone = cloneDeep( store.state.DesktopModule )

      return store.dispatch( 'devices/joinDevicesState', void 0, { root: true })
        .then(result => {
          expect( result.desktop ).toEqual(prepareStateToPost( stateClone ))
        })
    })

    test('should return desktopSticky state at desktopSticky key', async () => {
      let stateClone = cloneDeep( store.state.DesktopStickyModule )

      return store.dispatch( 'devices/joinDevicesState', void 0, { root: true })
        .then(result => {
          expect( result.desktopSticky ).toEqual(prepareStateToPost( stateClone ))
        })
    })

    test('should return tablet state at tablet key', async () => {
      let stateClone = cloneDeep( store.state.TabletModule )

      return store.dispatch( 'devices/joinDevicesState', void 0, { root: true })
        .then(result => {
          expect( result.tablet ).toEqual(prepareStateToPost( stateClone ))
        })
    })

    test('should return tablet sticky state at tabletSticky key', async () => {
      let stateClone = cloneDeep( store.state.TabletStickyModule )

      return store.dispatch( 'devices/joinDevicesState', void 0, { root: true })
        .then(result => {
          expect( result.tabletSticky ).toEqual(prepareStateToPost( stateClone ))
        })
    })

    test('should return mobile state at mobile key', async () => {
      let stateClone = cloneDeep( store.state.MobileModule )

      return store.dispatch( 'devices/joinDevicesState', void 0, { root: true })
        .then(result => {
          expect( result.mobile ).toEqual(prepareStateToPost( stateClone ))
        })
    })

    test('should return mobileSticky state at mobileSticky key', async () => {
      let stateClone = cloneDeep( store.state.MobileStickyModule )

      return store.dispatch( 'devices/joinDevicesState', void 0, { root: true })
        .then(result => {
          expect( result.mobileSticky ).toEqual(prepareStateToPost( stateClone ))
        })
    })
  })

  describe('resetBuilder', () => {

    let $modal

    beforeEach(() => {
      $modal = jest.fn()
    })

    test('should call `modals/showResetBuilderModal`', async () => {
      const payload = {
        $modal,
      }
      const spy = jest.spyOn( store._actions[ 'modals/showResetBuilderModal'], [0] )

      store.dispatch( 'devices/resetBuilder', payload, { root: true })
      await flushPromises()

      expect( spy ).toBeCalled()
    })

    test('should do nothing if modal has been rejected', async () => {
      jest.spyOn( store._actions[ 'modals/showResetBuilderModal' ], [0] ).mockRejectedValue()
      const payload = {
        $modal
      }
      const spy = jest.spyOn( store._actions[ 'devices/resetBuilder' ], [0] )

      store.dispatch( 'devices/resetBuilder', payload, { root: true })
      await flushPromises()

      expect( spy.mock.results.length ).toBe( 1 )
    })

    test('should mark that editor has changed when reset confirmed', async () => {
      jest.spyOn( store._actions[ 'modals/showResetBuilderModal' ], [0] ).mockResolvedValue()
      const spy = jest.spyOn( store._actions[ 'general/setEditorChanged' ], [0] )

      const payload = {
        $modal
      }
      store.dispatch( 'devices/resetBuilder', payload, { root: true })
      await flushPromises()

      expect(spy).toHaveBeenCalledWith(
        { hasChanged: true },
      )
    })

    test('should set reference state into each device module', async () => {
      expect.assertions( 12 )

      jest.spyOn( store._actions[ 'modals/showResetBuilderModal' ], [0] ).mockResolvedValue()
      const desktopSpy       = jest.spyOn( store._mutations[ 'DesktopModule/SET_STATE'       ], [0] )
      const desktopStickySpy = jest.spyOn( store._mutations[ 'DesktopStickyModule/SET_STATE' ], [0] )
      const tabletSpy        = jest.spyOn( store._mutations[ 'TabletModule/SET_STATE'        ], [0] )
      const tabletStickySpy  = jest.spyOn( store._mutations[ 'TabletStickyModule/SET_STATE'  ], [0] )
      const mobileSpy        = jest.spyOn( store._mutations[ 'MobileModule/SET_STATE'        ], [0] )
      const mobileStickySpy  = jest.spyOn( store._mutations[ 'MobileStickyModule/SET_STATE'  ], [0] )

      store.dispatch('devices/resetBuilder', { $modal, }, { root: true })
      await flushPromises()

      expect( desktopSpy ).toHaveBeenCalled()
      expect( desktopSpy.mock.calls[0][0].new_state ).toMatchObject( store.state.devices.referenceState )

      let stateWithAutoGrid = JSON.parse( JSON.stringify( store.state.devices.referenceState ))
      stateWithAutoGrid.grid.status = 'auto'

      expect( desktopStickySpy ).toHaveBeenCalled()
      expect( desktopStickySpy.mock.calls[0][0].new_state ).toMatchObject( stateWithAutoGrid )

      expect( tabletSpy ).toHaveBeenCalled()
      expect( tabletSpy.mock.calls[0][0].new_state ).toMatchObject( stateWithAutoGrid )

      expect( tabletStickySpy ).toHaveBeenCalled()
      expect( tabletStickySpy.mock.calls[0][0].new_state ).toMatchObject( stateWithAutoGrid )

      expect( mobileSpy ).toHaveBeenCalled()
      expect( mobileSpy.mock.calls[0][0].new_state ).toMatchObject( stateWithAutoGrid )

      expect( mobileStickySpy ).toHaveBeenCalled()
      expect( mobileStickySpy.mock.calls[0][0].new_state ).toMatchObject( stateWithAutoGrid )
    })

    test('should clear inactive items for mobile and mobile sticky', async () => {
      jest.spyOn( store._actions[ 'modals/showResetBuilderModal' ], [0] ).mockResolvedValue()

      const mobileSpy        = jest.spyOn( store._mutations[ 'MobileModule/CLEAR_INACTIVE_ITEMS'        ], [0] )
      const mobileStickySpy  = jest.spyOn( store._mutations[ 'MobileStickyModule/CLEAR_INACTIVE_ITEMS'  ], [0] )

      store.dispatch('devices/resetBuilder', { $modal: jest.fn() }, { root: true })
      await flushPromises()

      expect( mobileSpy       ).toHaveBeenCalled()
      expect( mobileStickySpy ).toHaveBeenCalled()
    })

    test('should show modal with info after reset is done', async () => {
      jest.spyOn( store._actions[ 'modals/showResetBuilderModal' ], [0] ).mockResolvedValue()

      const spy = jest.spyOn( store._actions[ 'modals/showAfterBuilderResetModal' ], [0] )

      store.dispatch('devices/resetBuilder', { $modal }, { root: true })
      await flushPromises()

      expect( spy ).toHaveBeenCalled()
    })

  })

})