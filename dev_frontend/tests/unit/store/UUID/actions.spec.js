import { createLocalVue } from '@vue/test-utils'
import { storeConfig    } from '../../../../src/store/config'
import Vuex          from 'vuex'
import cloneDeep     from 'lodash.clonedeep'
import _             from 'underscore'
import flushPromises from 'flush-promises'

const localVue = createLocalVue()
localVue.use( Vuex )

const mockUuids = [
  'testuuid',
  'testuuid2',
  'testuuid3',
  'testuuid4'
]

localVue.prototype.$genid = jest.fn()
  .mockReturnValueOnce( mockUuids[0] )
  .mockReturnValueOnce( mockUuids[1] )
  .mockReturnValueOnce( mockUuids[2] )
  .mockReturnValueOnce( mockUuids[3] )
  .mockReturnValueOnce( mockUuids[3] )

window._ = _

describe('ACTIONS UUID:', () => {

  let store

  beforeEach(() => {
    const clonedStoreConfig = cloneDeep( storeConfig )
    store = new Vuex.Store( clonedStoreConfig )
  })

  test('`addToBlacklist` should invoke mutations with payload', async () => {
    const spy = jest.spyOn( store._mutations[ 'uuid/ADD_UUID_TO_BLACKLIST' ], [0])
    const payload = {
      uuid: mockUuids[0]
    }

    store.dispatch( 'uuid/addToBlacklist', payload, { root: true })
    await flushPromises()

    expect( spy ).toBeCalledWith( payload )
    expect( store.state.uuid.blacklist ).toContain( payload.uuid )
  })

  describe('`genUniqueID`:', () => {

    test('should generate new uuid', async () => {
      let result

      expect( store.state.uuid.blacklist ).toEqual( [] )

      store.dispatch('uuid/genUniqueID', void 0, { root: true })
        .then((uuid) => {
          result = uuid
        })
      await flushPromises()

      expect( result ).toBe( mockUuids[0] )
    })

    test('should generate brand new id until blacklist array doesn`t contain such id', async () => {
      let result

      expect( store.state.uuid.blacklist ).toEqual( [] )

      store.commit( 'uuid/ADD_UUID_TO_BLACKLIST', { uuid: mockUuids[0] }, { root: true })
      store.commit( 'uuid/ADD_UUID_TO_BLACKLIST', { uuid: mockUuids[1] }, { root: true })
      store.commit( 'uuid/ADD_UUID_TO_BLACKLIST', { uuid: mockUuids[2] }, { root: true })

      store.dispatch('uuid/genUniqueID', void 0, { root: true })
        .then((uuid) => {
          result = uuid
        })
      await flushPromises()

      expect( result ).toBe( mockUuids[3] )
    })

  })

  describe('`assign`:', () => {

    let itemUuid

    beforeEach(() => {
      itemUuid = ''
    })

    test('should reattach uuid if it exists', async () => {
      let result
      itemUuid = mockUuids[0]

      store.dispatch('uuid/assign', { itemUuid }, { root: true })
        .then(( uuid ) => {
          result = uuid
        })
      await flushPromises()

      expect( result ).toBe( itemUuid )
    })

    test('should generate new uuid if item.uuid is empty and uuid doesn`t exists in blacklist array', async () => {
      let result

      expect( store.state.uuid.blacklist ).toEqual( [] )

      store.commit( 'uuid/ADD_UUID_TO_BLACKLIST', { uuid: mockUuids[0] }, { root: true })
      store.commit( 'uuid/ADD_UUID_TO_BLACKLIST', { uuid: mockUuids[1] }, { root: true })
      store.commit( 'uuid/ADD_UUID_TO_BLACKLIST', { uuid: mockUuids[2] }, { root: true })

      expect(store.state.uuid.blacklist).not.toContain( mockUuids[3] )

      store.dispatch('uuid/assign', { itemUuid }, { root: true })
        .then(( uuid ) => {
          result = uuid
        })
      await flushPromises()

      expect( result ).toBe( mockUuids[3] )
    })

  })

})