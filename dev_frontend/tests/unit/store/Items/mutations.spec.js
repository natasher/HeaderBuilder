import module from '../../../../src/store/modules/Common/Items/index'

describe('MUTATIONS Items module:', () => {

  test('SET_CURRENT_ITEM clone item and set state.current', () => {
    expect.assertions( 2 )

    const state = {
      current: {
        item: {
          "name": "testItem",
          "icon": "testIcon",
          "form": {
            "field1": "value1"
          }
        }
      }
    }
    const logoItem = {"name":"logo","icon":"heart-line","form":{"logo":"http://muffingroup.com/dev8624/artur/wp-content/uploads/2017/06/photography5.jpeg","height":"30","retinaLogo":"http://muffingroup.com/dev8624/artur/wp-content/uploads/2017/06/photography4.jpeg","options":{"overflowLogo":true}},"originalCoords":{"row":"firstRow","cellPos":"left","cellId":0}}

    module.mutations.SET_CURRENT_ITEM( state, logoItem )
    expect( state.current !== logoItem ).toBeTruthy()
    expect( state.current ).toMatchObject( logoItem )
  })

  test('SET_TEMP_ITEM sets state.tmpItem', () => {
    expect.assertions( 2 )

    const state = {
      tmpItem: void 0
    }
    const logoItem = {"name":"logo","icon":"heart-line","form":{"logo":"http://muffingroup.com/dev8624/artur/wp-content/uploads/2017/06/photography5.jpeg","height":"30","retinaLogo":"http://muffingroup.com/dev8624/artur/wp-content/uploads/2017/06/photography4.jpeg","options":{"overflowLogo":true}},"originalCoords":{"row":"firstRow","cellPos":"left","cellId":0}}

    module.mutations.SET_TEMP_ITEM( state, { item: logoItem })
    expect( state.tmpItem ).toMatchObject( logoItem )
    expect( state.tmpItem === logoItem ).toBeTruthy()
  })

  describe('SET_CURRENT_FIELD_VALUE', () => {

    test('sets state.current.form[ name ] if no position is provided', () => {
      expect.assertions(1)

      const state = {
        current: {
          form: {
            testField: void 0
          }
        }
      }
      const newTestField = 'TEST'

      module.mutations.SET_CURRENT_FIELD_VALUE(state, { name: 'testField', value: newTestField })
      expect(state.current.form.testField).toBe(newTestField)
    })

    test('sets state.current.form[ name ][ position ] if position is provided', () => {
      expect.assertions(1)

      const state = {
        current: {
          form: {
            testfield: {
              testPosition: void 0,
              testPositionAim: void 0,
            }
          }
        }
      }
      const newTestField = 'TEST'

      module.mutations.SET_CURRENT_FIELD_VALUE(state, { name: 'testfield', value: newTestField, position: 'testPositionAim' })
      expect(state.current.form.testfield.testPositionAim).toBe(newTestField)
    })

    test('sets state.current.form[ name ][ position ] if position is provided but not set in the state', () => {
      expect.assertions(1)

      const state = {
        current: {
          form: {
            testfield: []
          }
        }
      }
      const newTestField = 'TEST'

      module.mutations.SET_CURRENT_FIELD_VALUE(state, { name: 'testfield', value: newTestField, position: 'testPositionAim' })
      expect(state.current.form.testfield.testPositionAim).toBe(newTestField)
    })

  })

  test('SET_STYLE_FORM_VALUE sets state.current.style[ name ]', () => {
    const state = {
      current: {
        style: {
          styleField: void 0
        }
      }
    }
    const newStyleField = 'TEST'

    module.mutations.SET_STYLE_FORM_VALUE( state, { name: 'styleField', value: newStyleField })
    expect( state.current.style.styleField ).toBe( newStyleField )
  })

  test('PUSH_CURRENT_FIELD_ENTRY adds new entry to state field array', () => {
    const values = [ 'test1', 'test2' ]
    const state  = {
      current: {
        form: {
          testField: [ values[0] ]
        }
      }
    }

    module.mutations.PUSH_CURRENT_FIELD_ENTRY( state, { name: 'testField', entry: values[ 1 ] })
    expect( state.current.form.testField ).toEqual( values )
  })

  test('REMOVE_CURRENT_FIELD_ENTRY remove entry from array on provided index', () => {
    expect.assertions( 2 )

    const state = {
      current: {
        form: {
          testField: [ 'item1', 'item2', 'item3', 'item4', 'item5' ]
        }
      }
    }
    const newTestField = [ 'item1', 'item2', 'item4', 'item5' ]

    module.mutations.REMOVE_CURRENT_FIELD_ENTRY( state, { name: 'testField', index: 2 })
    expect( state.current.form.testField.length ).toBe( newTestField.length )
    expect( state.current.form.testField ).toEqual( newTestField )
  })

})