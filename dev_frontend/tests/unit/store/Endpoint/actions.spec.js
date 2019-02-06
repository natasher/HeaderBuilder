import { createLocalVue } from '@vue/test-utils'
import { storeConfig    } from '../../../../src/store/config'
import Vuex          from 'vuex'
import cloneDeep     from 'lodash.clonedeep'
import _             from 'underscore'
import flushPromises from 'flush-promises'
import { onSave } from '../../../../src/store/dialogs'
import { builder } from './__mocks__/stateFromWP'

const localVue = createLocalVue()
localVue.use( Vuex )
window._ = _

describe('ACTIONS Endpoint:', () => {

  let store

  beforeEach(() => {
    const clonedStoreConfig = cloneDeep(storeConfig)
    store = new Vuex.Store(clonedStoreConfig)

    store.dispatch('general/setCurrentStoreModule', { storeModule: 'DesktopModule' }, { root: true })
  })

  describe('postDataToWordpress', () => {

    let $modal = {
      show: jest.fn().mockImplementation((name, payload) => {
        return payload
      })
    }

    window.jQuery = {
      post: jest.fn()
    }

    window.ajaxurl = 'http://test.url'
    window.mfn_ajax = {
      nonce: 'test'
    }

    beforeEach(() => {
      $modal.show.mockRestore()
      jQuery.post.mockRestore()
    })

    test('should call `general/setEditorChanged` with payload: false', async () => {
      const spy = jest.spyOn(store._actions['general/setEditorChanged'], [0])

      store.dispatch('endpoint/postDataToWordpress', { $modal }, { root: true })
      await flushPromises()

      expect(spy).toBeCalledWith({ hasChanged: false })
    })

    test('should call `devices/joinDevicesState', async () => {
      const spy = jest.spyOn(store._actions['devices/joinDevicesState'], [0])

      store.dispatch('endpoint/postDataToWordpress', { $modal }, { root: true })
      await flushPromises()

      expect(spy).toBeCalled()
    })

    test('should call `jQuery.post` to test url', async () => {
      store.dispatch('endpoint/postDataToWordpress', { $modal }, { root: true })
      await flushPromises()

      expect(jQuery.post).toBeCalled()
      expect(jQuery.post.mock.calls[0][0]).toBe(ajaxurl)
    })

    test('should call `jQuery.post` to mfn_save_header WP action', async () => {
      store.dispatch('endpoint/postDataToWordpress', { $modal }, { root: true })
      await flushPromises()

      expect(jQuery.post).toBeCalled()
      expect(jQuery.post.mock.calls[0][1].action).toBe('mfn_save_header')
    })

    test('should call `jQuery.post` with WP nonce', async () => {
      store.dispatch('endpoint/postDataToWordpress', { $modal }, { root: true })
      await flushPromises()

      expect(jQuery.post).toBeCalled()
      expect(jQuery.post.mock.calls[0][1].nonce).toBe(mfn_ajax.nonce)
    })

    test('should call `jQuery.post` with header builder data', async () => {
      store.dispatch('endpoint/postDataToWordpress', { $modal }, { root: true })
      await flushPromises()

      expect(jQuery.post).toBeCalled()
      expect(jQuery.post.mock.calls[0][1].builder).toBeTruthy()
    })

    test('should open modal with onSave info', async () => {
      store.dispatch('endpoint/postDataToWordpress', { $modal }, { root: true })
      await flushPromises()

      expect($modal.show).toBeCalled()
      expect($modal.show.mock.calls[0][1].title).toBe('Header saved')
      /** TODO: sprawdzić .gif ?? */
      // expect($modal.show.mock.calls[0][1].text).toBe(onSave)
    })

  })

  describe('getStateFromWP', () => {

    test("should terminate if ajax response is '{}'", async () => {
      window.mfn_ajax = {
        builder: '{}'
      }

      return store.dispatch( 'endpoint/getStateFromWP', void 0, { root: true })
        .then(res => {
          expect( res ).toBeUndefined()
        })
    })

    test('should terminate if ajax response is empty string', async () => {
      window.mfn_ajax = {
        builder: ''
      }

      return store.dispatch( 'endpoint/getStateFromWP', void 0, { root: true })
        .then(res => {
          expect( res ).toBeUndefined()
        })
    })

    test('should set state for DesktopModule', async () => {
      window.mfn_ajax = {
        builder
      }

      const spy = jest.spyOn( store._mutations['DesktopModule/SET_STATE'], [0])
      store.dispatch( 'endpoint/getStateFromWP', void 0, { root: true })
      await flushPromises()

      expect(spy).toBeCalled()
    })

    test('should set state for DesktopStickyModule', async () => {
      window.mfn_ajax = {
        builder
      }

      const spy = jest.spyOn( store._mutations['DesktopStickyModule/SET_STATE'], [0])
      store.dispatch( 'endpoint/getStateFromWP', void 0, { root: true })
      await flushPromises()

      expect(spy).toBeCalled()
    })

    test('should set state for TabletModule', async () => {
      window.mfn_ajax = {
        builder
      }

      const spy = jest.spyOn( store._mutations['TabletModule/SET_STATE'], [0])
      store.dispatch( 'endpoint/getStateFromWP', void 0, { root: true })
      await flushPromises()

      expect(spy).toBeCalled()
    })

    test('should set state for TabletStickyModule', async () => {
      window.mfn_ajax = {
        builder
      }

      const spy = jest.spyOn( store._mutations['TabletStickyModule/SET_STATE'], [0])
      store.dispatch( 'endpoint/getStateFromWP', void 0, { root: true })
      await flushPromises()

      expect(spy).toBeCalled()
    })

    test('should set state for MobileModule', async () => {
      window.mfn_ajax = {
        builder
      }

      const spy = jest.spyOn( store._mutations['MobileModule/SET_STATE'], [0])
      store.dispatch( 'endpoint/getStateFromWP', void 0, { root: true })
      await flushPromises()

      expect(spy).toBeCalled()
    })

    test('should set state for MobileStickyModule', async () => {
      window.mfn_ajax = {
        builder
      }

      const spy = jest.spyOn( store._mutations['MobileStickyModule/SET_STATE'], [0])
      store.dispatch( 'endpoint/getStateFromWP', void 0, { root: true })
      await flushPromises()

      expect(spy).toBeCalled()
    })

  })

  describe('pushWPMenusList', () => {

    test('if `rootState.endpoint.wpMenusList` is NOT empty, abandon', async () => {
      window.mfn_ajax.menu_list = {}

      if (store.state.endpoint.wpMenusList == 0) {
        store.commit('endpoint/PUSH_WP_MENUES', {
          label: 'testLabel',
          value: 'testValue'
        }, { root: true })
      }

      const spy = jest.spyOn( store._mutations[ 'endpoint/PUSH_WP_MENUES' ], [0])
      store.dispatch( 'endpoint/pushWPMenusList', void 0, { root: true })
      await flushPromises()

      expect( spy ).not.toBeCalled()
    })

    test('if `rootState.endpoint.wpmenusList` is empty push `mfn_ajax.menu_list` to the state', async () => {
      expect.assertions( 6 )

      window.mfn_ajax = {
        menu_list: {
          0: "-- Default --",
          2: "Main menu"
        }
      }

      expect( store.state.endpoint.wpMenusList ).toEqual( [] )

      const spy = jest.spyOn( store._mutations[ 'endpoint/PUSH_WP_MENUES' ], [0])
      store.dispatch( 'endpoint/pushWPMenusList', void 0, { root: true })
      await flushPromises()

      expect( spy ).toBeCalled()
      expect( spy.mock.calls[0][0].label ).toBe( mfn_ajax.menu_list[ 0 ] )
      expect( spy.mock.calls[0][0].value ).toBe( '0' )
      expect( spy.mock.calls[1][0].label ).toBe( mfn_ajax.menu_list[ 2 ] )
      expect( spy.mock.calls[1][0].value ).toBe( '2' )
    })

  })

})