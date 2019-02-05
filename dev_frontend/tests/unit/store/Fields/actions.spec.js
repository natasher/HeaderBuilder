import { createLocalVue } from '@vue/test-utils'
import { storeConfig    } from '../../../../src/store/config'
import Vuex from 'vuex'
import cloneDeep from 'lodash.clonedeep'
import _ from 'underscore'
import flushPromises from 'flush-promises'

const localVue = createLocalVue()
localVue.use( Vuex )
window._ = _

describe('ACTIONS Fields:', () => {

  let store

  beforeEach(() => {
    const clonedStoreConfig = cloneDeep( storeConfig )
    store = new Vuex.Store( clonedStoreConfig )

    store.dispatch( 'general/setCurrentStoreModule', { storeModule: 'DesktopModule' }, { root: true })
  })

  describe('setGridOptionValue', () => {

    test('should call `general/setEditorChanged` with payload: true', async () => {
      const spy = jest.spyOn( store._actions[ 'general/setEditorChanged' ], [0])
      const payload = {
        name : "backgroundColor",
        value: "#81d742",
        as   : "grid",
        row  : ""
      }

      store.dispatch('fields/setGridOptionValue', payload, { root: true })
      await flushPromises()

      expect( spy ).toBeCalledWith({ hasChanged: true })
    })

    test('should call `SET_GRID_OPTIONS_VALUE` for given module', async () => {
      const spy = jest.spyOn( store._mutations[ 'DesktopModule/SET_GRID_OPTIONS_VALUE' ], [0])
      const payload = {
        name : "backgroundColor",
        value: "#81d742",
        as   : "grid",
        row  : ""
      }

      store.dispatch('fields/setGridOptionValue', payload, { root: true })
      await flushPromises()

      expect( spy ).toBeCalledWith( payload )
    })

  })

  describe('setRowOptionValue', () => {

    test('should call `general/setEditorChanged` with payload: true', async () => {
      const spy = jest.spyOn( store._actions[ 'general/setEditorChanged' ], [0])
      const payload = {
        name : "height",
        value: "666",
        as   : "row",
        row  : "firstRow"
      }

      store.dispatch('fields/setRowOptionValue', payload, { root: true })
      await flushPromises()

      expect( spy ).toBeCalledWith({ hasChanged: true })
    })

    test('should call `SET_ROW_OPTIONS_VALUE` for given module', async () => {
      const spy = jest.spyOn( store._mutations[ 'DesktopModule/SET_ROW_OPTIONS_VALUE' ], [0])
      const payload = {
        name : "height",
        value: "666",
        as   : "row",
        row  : "firstRow"
      }

      store.dispatch('fields/setRowOptionValue', payload, { root: true })
      await flushPromises()

      expect( spy ).toBeCalledWith( payload )
    })

  })

  describe('setModalFieldValue', () => {

    test('calls `items/setCurrentFieldValue` if `as` is an empty string', async () => {
      const spy = jest.spyOn( store._actions[ 'items/setCurrentFieldValue' ], [0])
        .mockImplementation()

      const payload = {
        name : 'text',
        value: 'damn',
        as   : ''
      }

      store.dispatch('fields/setModalFieldValue', payload, { root: true })
      await flushPromises()

      expect( spy ).toBeCalledWith( payload )
    })

    test('calls `items/setStyleFormValue` if `as` is `styleForm`', async () => {
      const spy = jest.spyOn( store._actions[ 'items/setStyleFormValue' ], [0])
        .mockImplementation()

      const payload = {
        name : 'text',
        value: 'damn',
        as   : 'styleForm'
      }

      store.dispatch('fields/setModalFieldValue', payload, { root: true })
      await flushPromises()

      expect( spy ).toBeCalledWith( payload )
    })

    test('calls `setRowOptionValue` if `as` is `row`', async () => {
      const spy = jest.spyOn( store._actions[ 'fields/setRowOptionValue' ], [0])
        .mockImplementation()

      const payload = {
        name : 'text',
        value: 'damn',
        as   : 'row'
      }

      store.dispatch('fields/setModalFieldValue', payload, { root: true })
      await flushPromises()

      expect( spy ).toBeCalledWith( payload )
    })

    test('calls `setGridOptionValue` if `as` is `grid`', async () => {
      const spy = jest.spyOn( store._actions[ 'fields/setGridOptionValue' ], [0])
        .mockImplementation()

      const payload = {
        name : 'text',
        value: 'damn',
        as   : 'grid'
      }

      store.dispatch('fields/setModalFieldValue', payload, { root: true })
      await flushPromises()

      expect( spy ).toBeCalledWith( payload )
    })

  })

  describe('toggleSwitchState', () => {

    test('should call `general/setEditorChanged` with payload: true', async () => {
      store.commit('items/SET_CURRENT_ITEM', {
        name: "social",
        icon: "share",
        form: {
          openLinksInNewWindow: true
        },
      }, { root: true })
      const spy = jest.spyOn( store._actions[ 'general/setEditorChanged' ], [0])
      const payload = {
        name : "openLinksInNewWindow",
      }

      store.dispatch('fields/toggleSwitchState', payload, { root: true })
      await flushPromises()

      expect( spy ).toBeCalledWith({ hasChanged: true })
    })

    test('should change value of the switch field to opposite', async () => {
      store.commit('items/SET_CURRENT_ITEM', {
        name: "social",
        icon: "share",
        form: {
          openLinksInNewWindow: true
        },
      }, { root: true })

      const payload = {
        name : "openLinksInNewWindow",
      }

      store.dispatch('fields/toggleSwitchState', payload, { root: true })
      await flushPromises()

      expect( store.state.items.current.form.openLinksInNewWindow ).toBe( false )
    })

    test('should change value of the switch field on grid option to opposite', async () => {
      const field = "headerOnTop"
      const fvalue = false

      store.commit('DesktopModule/SET_GRID_OPTIONS_VALUE', {
        name : field,
        value: fvalue
      }, { root: true })

      const payload = {
        name: field,
        as  : "grid",
      }

      store.dispatch('fields/toggleSwitchState', payload, { root: true })
      await flushPromises()

      expect( store.state.DesktopModule.grid.options[ field ] ).toBe( !fvalue )
    })

    test('should also change switch value for sticky version', async () => {
      const field = "headerOnTop"
      const fvalue = false

      store.commit('DesktopModule/SET_GRID_OPTIONS_VALUE', {
        name : field,
        value: fvalue
      }, { root: true })

      const payload = {
        name: field,
        as  : "grid",
      }

      store.dispatch('fields/toggleSwitchState', payload, { root: true })
      await flushPromises()

      expect( store.state.DesktopStickyModule.grid.options[ field ] ).toBe( !fvalue )
    })

  })

  describe('toggleOptionSwitchState', () => {

    test('should call `general/setEditorChanged` with payload: true', async () => {
      store.commit('items/SET_CURRENT_ITEM', {
        name: "social",
        icon: "share",
        form: {
          openLinksInNewWindow: true,
          options: {
            activeForSubmenuItems           : false,
            bordersBetweenItems             : false,
            arrowsForItemsWithSubmenu       : false,
            foldSubmenusForLast2ItemsToRight: false
          }
        },
      }, { root: true })

      const spy = jest.spyOn( store._actions[ 'general/setEditorChanged' ], [0])

      const payload = {
        wpId: "options",
        opt : "arrowsForItemsWithSubmenu",
      }

      store.dispatch('fields/toggleOptionSwitch', payload, { root: true })
      await flushPromises()

      expect( spy ).toBeCalledWith({ hasChanged: true })
    })

    test('should change value of the switch field to opposite', async () => {
      store.commit('items/SET_CURRENT_ITEM', {
        name: "menu",
        form: {
          openLinksInNewWindow: true,
          options: {
            activeForSubmenuItems           : false,
            bordersBetweenItems             : false,
            arrowsForItemsWithSubmenu       : false,
            foldSubmenusForLast2ItemsToRight: false
          }
        },
      }, { root: true })

      const payload = {
        wpId: "options",
        opt : "arrowsForItemsWithSubmenu",
      }

      store.dispatch('fields/toggleOptionSwitch', payload, { root: true })
      await flushPromises()

      expect( store.state.items.current.form[ payload.wpId ][ payload.opt ]).toBe( true )
    })

  })

})