import { createLocalVue } from '@vue/test-utils'
import { storeConfig    } from '../../../../src/store/config'
import Vuex          from 'vuex'
import cloneDeep     from 'lodash.clonedeep'
import _             from 'underscore'
import flushPromises from 'flush-promises'

const localVue = createLocalVue()
localVue.use( Vuex )
window._ = _

describe('ACTIONS UI:', () => {

  let store

  beforeEach(() => {
    const clonedStoreConfig = cloneDeep( storeConfig )
    store = new Vuex.Store( clonedStoreConfig )
  })

  test('`setBreakpoint` should sets `rootState.ui.currentBreakpoint` value', async () => {
    const payload = { breakpoint: '== 666' }

    store.dispatch('ui/setBreakpoint', payload, { root: true })
    await flushPromises()

    expect( store.state.ui.currentBreakpoint ).toBe( payload.breakpoint )
  })

  describe('`setStickyFlag:`', () => {

    describe('type is default', () => {

      beforeEach( async () => {
        store.dispatch( 'general/setCurrentStoreModule', { storeModule: 'DesktopStickyModule' }, { root: true })
        store.dispatch( 'general/setCurrentView', { view: 'desktop' }, { root: true })
        store.commit( 'ui/SET_STICKY_FLAG', { type: 'dummy' }, { root: true })
        await flushPromises()
      })

      test('should set current store module properly', async () => {
        const spy = jest.spyOn( store._actions[ 'general/setCurrentStoreModule' ], [0] )
        const payload = {
          type: 'default',
        }

        store.dispatch( 'ui/setStickyFlag', payload, { root: true })
        await flushPromises()

        expect( spy.mock.calls[0][0].storeModule ).toBe( 'DesktopModule' )
        expect( store.state.general.currentStoreModule ).toBe( 'DesktopModule' )
      })

      test('should set sticky flag to default', async () => {
        const payload = {
          type: 'default',
        }

        expect( store.state.ui.stickyFlag ).toBe( 'dummy' )
        store.dispatch( 'ui/setStickyFlag', payload, { root: true })
        await flushPromises()

        expect( store.state.ui.stickyFlag ).toBe( 'default' )
      })

    })

    describe('type is sticky', () => {

      beforeEach( async () => {
        store.dispatch( 'general/setCurrentStoreModule', { storeModule: 'DesktopModule' }, { root: true })
        store.dispatch( 'general/setCurrentView', { view: 'desktop' }, { root: true })
        await flushPromises()

        store.commit( 'ui/SET_STICKY_FLAG', { type: 'dummy' }, { root: true })
      })

      test('should set current store module properly', async () => {
        const spy = jest.spyOn( store._actions[ 'general/setCurrentStoreModule' ], [0] )
        const payload = {
          type: 'sticky',
        }

        store.dispatch( 'ui/setStickyFlag', payload, { root: true })
        await flushPromises()

        expect( spy.mock.calls[0][0].storeModule ).toBe( 'DesktopStickyModule' )
        expect( store.state.general.currentStoreModule ).toBe( 'DesktopStickyModule' )
      })

      test('should set sticky flag to default', async () => {
        const payload = {
          type: 'sticky',
        }

        expect( store.state.ui.stickyFlag ).toBe( 'dummy' )
        store.dispatch( 'ui/setStickyFlag', payload, { root: true })
        await flushPromises()

        expect( store.state.ui.stickyFlag ).toBe( 'sticky' )
      })

      test('should copy `grid` and `inactiveItems` from `MobileModule` if grid status is `auto` & device is `mobile`', async () => {
        store.commit( 'MobileModule/SET_GRID_STATUS',     { status:      'auto'         }, { root: true })
        store.commit( 'general/SET_CURRENT_VIEW',         { view:        'mobile'       }, { root: true })
        store.commit( 'general/SET_CURRENT_STORE_MODULE', { storeModule: 'MobileModule' }, { root: true })

        const clearInactiveItemsSpy = jest.spyOn( store._actions[ 'inactiveItems/clear' ], [0] )
        const copyInactiveItemsSpy  = jest.spyOn( store._actions[ 'inactiveItems/copy'  ], [0] )
        const cloneGridSpy          = jest.spyOn( store._actions[ 'grid/clone'          ], [0] )

        const payload = {
          type: 'sticky',
        }

        store.dispatch( 'ui/setStickyFlag', payload, { root: true })
        await flushPromises()

        expect( clearInactiveItemsSpy ).toBeCalled()
        expect( copyInactiveItemsSpy  ).toBeCalled()
        expect( cloneGridSpy          ).toBeCalledWith({ from: 'MobileModule' })
      })

      test('should copy `grid` from `TabletModule` if grid status is `auto` & device is `tablet`', async () => {
        store.commit( 'MobileModule/SET_GRID_STATUS',     { status:      'auto'         }, { root: true })
        store.commit( 'general/SET_CURRENT_VIEW',         { view:        'tablet'       }, { root: true })
        store.commit( 'general/SET_CURRENT_STORE_MODULE', { storeModule: 'TabletModule' }, { root: true })

        const cloneGridSpy = jest.spyOn( store._actions[ 'grid/clone' ], [0] )

        const payload = {
          type: 'sticky',
        }

        store.dispatch( 'ui/setStickyFlag', payload, { root: true })
        await flushPromises()

        expect( cloneGridSpy ).toBeCalledWith({ from: 'TabletModule' })
      })

      test('should copy `grid` from `DesktopModule` if grid status is `auto` & device is `desktop`', async () => {
        store.commit( 'MobileModule/SET_GRID_STATUS',     { status:      'auto'          }, { root: true })
        store.commit( 'general/SET_CURRENT_VIEW',         { view:        'desktop'       }, { root: true })
        store.commit( 'general/SET_CURRENT_STORE_MODULE', { storeModule: 'DesktopModule' }, { root: true })

        const cloneGridSpy = jest.spyOn( store._actions[ 'grid/clone' ], [0] )

        const payload = {
          type: 'sticky',
        }

        store.dispatch( 'ui/setStickyFlag', payload, { root: true })
        await flushPromises()

        expect( cloneGridSpy ).toBeCalledWith({ from: 'DesktopModule' })
      })

      test('should set the same desktop layout on `sticky` as `default` when device is `desktop`', async () => {
        const testPayload = { position: 'test' }
        store.commit( 'DesktopModule/SET_LAYOUT_POSITION', testPayload, { root: true })

        const spy = jest.spyOn( store._actions[ 'ui/setLayoutPosition' ], [0] )

        const payload = {
          type: 'sticky',
        }

        store.dispatch( 'ui/setStickyFlag', payload, { root: true })
        await flushPromises()

        expect( spy ).toBeCalledWith( testPayload )
      })

      test('should clear `all` cell in action bar and second row if grid layout is set to `left`', async () => {
        store.commit('DesktopModule/SET_LAYOUT_POSITION', { position: 'left' }, { root: true })
        const spy = jest.spyOn( store._actions[ 'cell/clear' ], [0])

        store.dispatch( 'ui/setStickyFlag', { type: 'sticky' }, { root: true })
        await flushPromises()

        expect( spy.mock.calls[9][0]  ).toEqual({ cellPos: 'all', row: 'actionBar' })
        expect( spy.mock.calls[10][0] ).toEqual({ cellPos: 'all', row: 'secondRow' })
      })

      test('should clear `all` cell in action bar and second row if grid layout is set to `right`', async () => {
        store.commit('DesktopModule/SET_LAYOUT_POSITION', { position: 'right' }, { root: true })
        const spy = jest.spyOn( store._actions[ 'cell/clear' ], [0])

        store.dispatch( 'ui/setStickyFlag', { type: 'sticky' }, { root: true })
        await flushPromises()

        expect( spy.mock.calls[9][0]  ).toEqual({ cellPos: 'all', row: 'actionBar' })
        expect( spy.mock.calls[10][0] ).toEqual({ cellPos: 'all', row: 'secondRow' })
      })

      test('should merge row cells to `all` cell in each action bar and second row if grid layout is set to `left`', async () => {
        store.commit('DesktopModule/SET_LAYOUT_POSITION', { position: 'left' }, { root: true })
        const spy = jest.spyOn( store._actions[ 'cell/copyRowCellsToAll' ], [0])

        store.dispatch( 'ui/setStickyFlag', { type: 'sticky' }, { root: true })
        await flushPromises()

        expect( spy.mock.calls[0][0] ).toEqual({ row: 'actionBar' })
        expect( spy.mock.calls[1][0] ).toEqual({ row: 'secondRow' })
      })

      test('should merge row cells to `all` cell in each action bar and second row if grid layout is set to `right`', async () => {
        store.commit('DesktopModule/SET_LAYOUT_POSITION', { position: 'right' }, { root: true })
        const spy = jest.spyOn( store._actions[ 'cell/copyRowCellsToAll' ], [0])

        store.dispatch( 'ui/setStickyFlag', { type: 'sticky' }, { root: true })
        await flushPromises()

        expect( spy.mock.calls[0][0] ).toEqual({ row: 'actionBar' })
        expect( spy.mock.calls[1][0] ).toEqual({ row: 'secondRow' })
      })

    })

  })

  describe('`changeDevice`:', () => {

    describe('device is `desktop`', () => {

      test('should set store module to `DesktopModule`', async () => {
        const spy = jest.spyOn( store._actions[ 'general/setCurrentStoreModule' ], [0] )

        store.dispatch('ui/changeDevice', { device: 'desktop' }, { root: true })

        expect( spy ).toBeCalledWith({ storeModule: 'DesktopModule' })
      })

      test('should set view to `desktop`', async () => {
        const spy = jest.spyOn( store._actions[ 'general/setCurrentView' ], [0])

        store.dispatch('ui/changeDevice', { device: 'desktop' }, { root: true })

        expect( spy ).toBeCalledWith({ view: 'desktop' })
      })

      test('should set sticky flag to `default`', async () => {
        const spy = jest.spyOn( store._actions[ 'ui/setStickyFlag' ], [0])

        store.dispatch('ui/changeDevice', { device: 'desktop' }, { root: true })

        expect( spy ).toBeCalledWith({ type: 'default' })
      })

    })

    describe('device is `tablet`', () => {

      test('should set store module to `TabletModule`', async () => {
        const spy = jest.spyOn( store._actions[ 'general/setCurrentStoreModule' ], [0] )

        store.dispatch('ui/changeDevice', { device: 'tablet' }, { root: true })

        expect( spy ).toBeCalledWith({ storeModule: 'TabletModule' })
      })

      test('should set view to `tablet`', async () => {
        const spy = jest.spyOn( store._actions[ 'general/setCurrentView' ], [0])

        store.dispatch('ui/changeDevice', { device: 'tablet' }, { root: true })

        expect( spy ).toBeCalledWith({ view: 'tablet' })
      })

      test('should set sticky flag to `default`', async () => {
        const spy = jest.spyOn( store._actions[ 'ui/setStickyFlag' ], [0])

        store.dispatch('ui/changeDevice', { device: 'tablet' }, { root: true })

        expect( spy ).toBeCalledWith({ type: 'default' })
      })

    })

    describe('device is `mobile`', () => {

      test('should set store module to `MobileModule`', async () => {
        const spy = jest.spyOn( store._actions[ 'general/setCurrentStoreModule' ], [0] )

        store.dispatch('ui/changeDevice', { device: 'mobile' }, { root: true })

        expect( spy ).toBeCalledWith({ storeModule: 'MobileModule' })
      })

      test('should set view to `mobile`', async () => {
        const spy = jest.spyOn( store._actions[ 'general/setCurrentView' ], [0])

        store.dispatch('ui/changeDevice', { device: 'mobile' }, { root: true })

        expect( spy ).toBeCalledWith({ view: 'mobile' })
      })

      test('should set sticky flag to `default`', async () => {
        const spy = jest.spyOn( store._actions[ 'ui/setStickyFlag' ], [0])

        store.dispatch('ui/changeDevice', { device: 'mobile' }, { root: true })

        expect( spy ).toBeCalledWith({ type: 'default' })
      })

    })

  })

  describe('`setGridStatus`:', () => {

    beforeEach( async () => {
      store.dispatch( 'general/setCurrentStoreModule', { storeModule: 'DesktopStickyModule' }, { root: true })
      store.dispatch( 'general/setCurrentView', { view: 'desktop' }, { root: true })
      await flushPromises()
    })

    test('should mark that editor has changed (true)', async () => {
      const spy = jest.spyOn( store._actions[ 'general/setEditorChanged' ], [0])

      store.dispatch( 'ui/setGridStatus', { status: 'off' }, { root: true })
      await flushPromises()

      expect( spy ).toBeCalledWith({ hasChanged: true })
    })

    test('should set grid status for current device module', async () => {
      const spy = jest.spyOn( store._mutations[ 'DesktopStickyModule/SET_GRID_STATUS' ], [0])
      const payload = { status: 'testStatus' }

      store.dispatch( 'ui/setGridStatus', payload, { root: true })
      await flushPromises()

      expect( spy ).toBeCalledWith( payload )
      expect( store.state.DesktopStickyModule.grid.status ).toBe( payload.status )
    })

  })

  describe('`setLayoutPosition`:', () => {

    beforeEach( async () => {
      store.dispatch( 'general/setCurrentStoreModule', { storeModule: 'TabletModule' }, { root: true })
      store.dispatch( 'general/setCurrentView', { view: 'tablet' }, { root: true })
      await flushPromises()
    })

    test('should mark that editor has changed (true)', async () => {
      const spy = jest.spyOn( store._actions[ 'general/setEditorChanged' ], [0])

      store.dispatch( 'ui/setLayoutPosition', { position: 'test' }, { root: true })
      await flushPromises()

      expect( spy ).toBeCalledWith({ hasChanged: true })
    })

    test('should set layout for current device module', async () => {
      const spy = jest.spyOn( store._mutations[ 'TabletModule/SET_LAYOUT_POSITION' ], [0])
      const payload = { position: 'testPosition' }

      store.dispatch( 'ui/setLayoutPosition', payload, { root: true })
      await flushPromises()

      expect( spy ).toBeCalledWith( payload )
      expect( store.state.DesktopStickyModule.grid.layoutPosition ).toBe( payload.layoutPosition )
    })

  })

  describe('`handleLayoutPositionClick`:', () => {

    beforeEach( async () => {
      store.dispatch( 'general/setCurrentStoreModule', { storeModule: 'DesktopModule' }, { root: true })
      store.dispatch( 'general/setCurrentView', { view: 'desktop' }, { root: true })
      await flushPromises()
    })

    test('should mark that editor has changed (true)', async () => {
      const spy = jest.spyOn( store._actions[ 'general/setEditorChanged' ], [0])

      store.dispatch( 'ui/setLayoutPosition', { position: 'test' }, { root: true })
      await flushPromises()

      expect( spy ).toBeCalledWith({ hasChanged: true })
    })

    test('should calls `ui/setLayoutPosition` with provided position', async () => {
      const spy = jest.spyOn( store._actions[ 'ui/setLayoutPosition' ], [0])
      const payload = {
        status  : 'custom',
        position: 'testposition'
      }

      store.dispatch( 'ui/handleLayoutPositionClick', payload, { root: true })
      await flushPromises()

      expect(spy).toBeCalledWith({ position: payload.position })
    })

    test('should clear `all` cell in action bar and second row if grid layout is set to `left`', async () => {
      store.commit('DesktopModule/SET_LAYOUT_POSITION', { position: 'test' }, { root: true })
      const spy = jest.spyOn( store._actions[ 'cell/clear' ], [0])

      const payload = {
        status  : 'custom',
        position: 'left'
      }

      store.dispatch( 'ui/handleLayoutPositionClick', payload, { root: true })
      await flushPromises()

      expect( spy.mock.calls[0][0]  ).toEqual({ cellPos: 'all', row: 'actionBar' })
      expect( spy.mock.calls[1][0]  ).toEqual({ cellPos: 'all', row: 'secondRow' })
    })

    test('should clear `all` cell in action bar and second row if grid layout is set to `right`', async () => {
      store.commit('DesktopModule/SET_LAYOUT_POSITION', { position: 'test' }, { root: true })
      const spy = jest.spyOn( store._actions[ 'cell/clear' ], [0])

      const payload = {
        status  : 'custom',
        position: 'right'
      }

      store.dispatch( 'ui/handleLayoutPositionClick', payload, { root: true })
      await flushPromises()

      expect( spy.mock.calls[0][0]  ).toEqual({ cellPos: 'all', row: 'actionBar' })
      expect( spy.mock.calls[1][0]  ).toEqual({ cellPos: 'all', row: 'secondRow' })
    })

    test('should merge row cells to `all` cell in each action bar and second row if grid layout is set to `left`', async () => {
      store.commit('DesktopModule/SET_LAYOUT_POSITION', { position: 'test' }, { root: true })
      const spy = jest.spyOn( store._actions[ 'cell/copyRowCellsToAll' ], [0])

      const payload = {
        status  : 'custom',
        position: 'left'
      }

      store.dispatch( 'ui/handleLayoutPositionClick', payload, { root: true })
      await flushPromises()

      expect( spy.mock.calls[0][0] ).toEqual({ row: 'actionBar' })
      expect( spy.mock.calls[1][0] ).toEqual({ row: 'secondRow' })
    })

    test('should merge row cells to `all` cell in each action bar and second row if grid layout is set to `right`', async () => {
      store.commit('DesktopModule/SET_LAYOUT_POSITION', { position: 'test' }, { root: true })
      const spy = jest.spyOn( store._actions[ 'cell/copyRowCellsToAll' ], [0])

      const payload = {
        status  : 'custom',
        position: 'right'
      }

      store.dispatch( 'ui/handleLayoutPositionClick', payload, { root: true })
      await flushPromises()

      expect( spy.mock.calls[0][0] ).toEqual({ row: 'actionBar' })
      expect( spy.mock.calls[1][0] ).toEqual({ row: 'secondRow' })
    })

  })

  describe('`handleAutoClick`:', () => {

    let $modal = {
      show: jest.fn(),
      hide: jest.fn(),
    }

    beforeEach( async () => {
      store.dispatch( 'general/setCurrentStoreModule', { storeModule: 'DesktopModule' }, { root: true })
      store.dispatch( 'general/setCurrentView', { view: 'desktop' }, { root: true })
      await flushPromises()

      jest.spyOn( store._actions[ 'modals/showAutoModeModal' ], [0])
        .mockImplementation(() => {
          return new Promise((resolve) => {
            resolve()
          })
        })
      $modal.show.mockRestore()
      $modal.hide.mockRestore()
    })

    test('should show `Auto mode modal` and return if rejected', async () => {
      jest.spyOn( store._actions[ 'modals/showAutoModeModal' ], [0])
        .mockImplementation(() => {
          return new Promise(() => { return })
        })

      const spy = jest.spyOn( store._actions[ 'general/setEditorChanged' ], [0])

      store.dispatch( 'ui/handleAutoClick', { $modal: $modal }, { root: true })
      await flushPromises()

      expect( spy ).not.toBeCalled()
    })

    test('should mark that editor has changed (true)', async () => {
      const spy = jest.spyOn( store._actions[ 'general/setEditorChanged' ], [0])

      store.dispatch( 'ui/handleAutoClick', { $modal: $modal }, { root: true })
      await flushPromises()

      expect( spy ).toBeCalledWith({ hasChanged: true })
    })

    test('should set grid status to auto', async () => {
      const spy = jest.spyOn( store._actions[ 'ui/setGridStatus' ], [0])

      store.dispatch( 'ui/handleAutoClick', { $modal: $modal }, { root: true })
      await flushPromises()

      expect( spy ).toBeCalledWith({ status: 'auto' })
    })

    test('should clear inactiveitems cell then copy grid from desktop if module is mobile', async () => {
      store.dispatch( 'general/setCurrentStoreModule', { storeModule: 'MobileModule' }, { root: true })
      store.dispatch( 'general/setCurrentView', { view: 'mobile' }, { root: true })
      await flushPromises()

      const clearSpy = jest.spyOn( store._actions[ 'inactiveItems/clear' ], [0])
      const gridSpy  = jest.spyOn( store._actions[ 'grid/clone' ], [0] )

      store.dispatch( 'ui/handleAutoClick', { $modal: $modal }, { root: true })
      await flushPromises()

      expect( clearSpy ).toBeCalled()
      expect( gridSpy  ).toBeCalledWith({ from: 'DesktopModule' })
    })

    test('should clear inactiveitems cell & copy them back, then copy grid from mobile if module is mobileSticky', async () => {
      store.dispatch( 'general/setCurrentStoreModule', { storeModule: 'MobileStickyModule' }, { root: true })
      store.dispatch( 'general/setCurrentView', { view: 'mobile' }, { root: true })
      await flushPromises()

      const clearSpy = jest.spyOn( store._actions[ 'inactiveItems/clear' ], [0])
      const copySpy  = jest.spyOn( store._actions[ 'inactiveItems/copy' ], [0])
      const gridSpy  = jest.spyOn( store._actions[ 'grid/clone' ], [0])

      store.dispatch( 'ui/handleAutoClick', { $modal: $modal }, { root: true })
      await flushPromises()

      expect( clearSpy ).toBeCalled()
      expect( copySpy  ).toBeCalled()
      expect( gridSpy  ).toBeCalledWith({ from: 'MobileModule' })
    })

    test('should clone desktop grid if currently module is tablet', async () => {
      store.dispatch( 'general/setCurrentStoreModule', { storeModule: 'TabletModule' }, { root: true })
      store.dispatch( 'general/setCurrentView', { view: 'tablet' }, { root: true })
      await flushPromises()

      const spy = jest.spyOn( store._actions[ 'grid/clone' ], [0])

      store.dispatch( 'ui/handleAutoClick', { $modal: $modal }, { root: true })
      await flushPromises()

      expect( spy ).toBeCalledWith({ from: 'DesktopModule' })
    })

    test('should clone tablet grid if currently module is tabletSticky', async () => {
      store.dispatch( 'general/setCurrentStoreModule', { storeModule: 'TabletStickyModule' }, { root: true })
      store.dispatch( 'general/setCurrentView', { view: 'tablet' }, { root: true })
      await flushPromises()

      const spy = jest.spyOn( store._actions[ 'grid/clone' ], [0])

      store.dispatch( 'ui/handleAutoClick', { $modal: $modal }, { root: true })
      await flushPromises()

      expect( spy ).toBeCalledWith({ from: 'TabletModule' })
    })

    test('should clone desktop grid if currently module is desktopSticky', async () => {
      store.dispatch( 'general/setCurrentStoreModule', { storeModule: 'DesktopStickyModule' }, { root: true })
      store.dispatch( 'general/setCurrentView', { view: 'desktop' }, { root: true })
      await flushPromises()

      const spy = jest.spyOn( store._actions[ 'grid/clone' ], [0])

      store.dispatch( 'ui/handleAutoClick', { $modal: $modal }, { root: true })
      await flushPromises()

      expect( spy ).toBeCalledWith({ from: 'DesktopModule' })
    })

  })

  describe('`setRowActive`:', () => {

    beforeEach(async () => {
      store.dispatch( 'general/setCurrentStoreModule', { storeModule: 'DesktopModule' }, { root: true })
      store.dispatch( 'general/setCurrentView', { view: 'desktop' }, { root: true })
      await flushPromises()
    })

    test('should mark that editor has changed (true)', async () => {
      const spy = jest.spyOn( store._actions[ 'general/setEditorChanged' ], [0])
      const payload = {
        row   : 'secondRow',
        active: true,
      }

      store.dispatch( 'ui/setRowActive', payload, { root: true })
      await flushPromises()

      expect( spy ).toBeCalledWith({ hasChanged: true })
    })

    test('should set given state row', async () => {
      const spy = jest.spyOn( store._mutations[ 'DesktopModule/SET_ROW_ACTIVE' ], [0])
      const payload = {
        row   : 'secondRow',
        active: true,
      }

      store.dispatch( 'ui/setRowActive', payload, { root: true })
      await flushPromises()

      expect( spy ).toBeCalledWith( payload)
    })

  })

  describe('`toggleActionBar`:', () => {

    beforeEach(async () => {
      store.dispatch( 'general/setCurrentStoreModule', { storeModule: 'DesktopModule' }, { root: true })
      store.dispatch( 'general/setCurrentView', { view: 'desktop' }, { root: true })
      await flushPromises()
    })

    test('should mark that editor has changed (true)', async () => {
      const spy = jest.spyOn( store._actions[ 'general/setEditorChanged' ], [0])

      store.dispatch( 'ui/toggleActionBar', void 0, { root: true })
      await flushPromises()

      expect( spy ).toBeCalled()
    })

    test('should set given state row', async () => {
      const spy = jest.spyOn( store._mutations[ 'DesktopModule/TOGGLE_ACTION_BAR_FLAG' ], [0])

      store.dispatch( 'ui/toggleActionBar', void 0, { root: true })
      await flushPromises()

      expect( spy ).toBeCalled()
    })

  })

  describe('`toggleSecondRow`:', () => {

    beforeEach(async () => {
      store.dispatch( 'general/setCurrentStoreModule', { storeModule: 'DesktopModule' }, { root: true })
      store.dispatch( 'general/setCurrentView', { view: 'desktop' }, { root: true })
      await flushPromises()
    })

    test('should mark that editor has changed (true)', async () => {
      const spy = jest.spyOn( store._actions[ 'general/setEditorChanged' ], [0])

      store.dispatch( 'ui/toggleSecondRow', void 0, { root: true })
      await flushPromises()

      expect( spy ).toBeCalled()
    })

    test('should set given state row', async () => {
      const spy = jest.spyOn( store._mutations[ 'DesktopModule/TOGGLE_SECOND_ROW_FLAG' ], [0])

      store.dispatch( 'ui/toggleSecondRow', void 0, { root: true })
      await flushPromises()

      expect( spy ).toBeCalled()
    })

  })

})