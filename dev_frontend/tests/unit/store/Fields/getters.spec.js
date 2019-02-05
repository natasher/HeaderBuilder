import module from '../../../../src/store/modules/Common/Fields/index'

describe('Fields GETTERS:', () => {

  /**
   * getCurrentFieldValue
   * ====================
   */
  describe('getCurrentFieldValue', () => {

    test('seeks field in the current item form and gets its value', () => {
      const rootState = {
        items: {
          current: {
            form: {
              testField1: 'test value'
            }
          }
        }
      }
      const getter = module.getters.getCurrentFieldValue(void 0, void 0, rootState)

      expect(getter('testField1')).toBe(rootState.items.current.form.testField1)
    })

    test('returns undefined if field doesn`t exists', () => {
      const rootState = {
        items: {
          current: {
            form: {
              testField1: 'test value'
            }
          }
        }
      }
      const getter = module.getters.getCurrentFieldValue(void 0, void 0, rootState)

      expect(getter('fieldThatDoesntExists')).toBeUndefined()
    })

    test('seeks subfield in the current item form and gets its value', () => {
      const rootState = {
        items: {
          current: {
            form: {
              testField1: {
                left: 'test position'
              }
            }
          }
        }
      }
      const getter = module.getters.getCurrentFieldValue(void 0, void 0, rootState)

      expect(getter('testField1', 'left')).toBe(rootState.items.current.form.testField1.left)
    })

    test('returns undefined if subfield doesn`t exists', () => {
      const rootState = {
        items: {
          current: {
            form: {
              testField1: {
                left: 'test position'
              }
            }
          }
        }
      }
      const getter = module.getters.getCurrentFieldValue(void 0, void 0, rootState)

      expect(getter('fieldThatDoesntExists')).toBeUndefined()
    })

  })

  /**
   * getStyleFieldValue
   * ==================
   */
  describe('getStyleFieldValue', () => {

    test('seeks style forml field in the current item and gets its value', () => {
      const rootState = {
        items: {
          current: {
            style: {
              testField1: 'test value'
            }
          }
        }
      }
      const getter = module.getters.getStyleFieldValue(void 0, void 0, rootState)

      expect(getter('testField1')).toBe(rootState.items.current.style.testField1)
    })

    test('returns undefined if field doesn`t exists', () => {
      const rootState = {
        items: {
          current: {
            style: {
              testField1: 'test value'
            }
          }
        }
      }
      const getter = module.getters.getStyleFieldValue(void 0, void 0, rootState)

      expect(getter('fieldThatDoesntExists')).toBeUndefined()
    })

  })

  /**
   * getGridOptionValue
   * ==================
   */
  describe('getGridOptionValue', () => {

    test('seeks field in the grid options form and gets its value', () => {
      const rootState = {
        general: {
          currentStoreModule: 'testModule'
        },
        testModule: {
          grid: {
            options: {
              testField: 'test value'
            }
          }
        }
      }
      const getter = module.getters.getGridOptionValue(void 0, void 0, rootState)

      expect(getter('testField')).toBe(rootState.testModule.grid.options.testField)
    })

    test('seeks subfield in the grid options form and gets its value', () => {
      const rootState = {
        general: {
          currentStoreModule: 'testModule'
        },
        testModule: {
          grid: {
            options: {
              testField: {
                subField: 'test value'
              }
            }
          }
        }
      }
      const getter = module.getters.getGridOptionValue(void 0, void 0, rootState)

      expect(getter('testField', 'subField')).toBe(rootState.testModule.grid.options.testField.subField)
    })

  })
  /**
   * getRowOptionValue
   * ==================
   */
  describe('getRowOptionValue', () => {

    test('seeks field in the row options form and gets its value', () => {
      const rootState = {
        general: {
          currentStoreModule: 'testModule'
        },
        testModule: {
          testRow: {
            options: {
              testField: 'test value'
            }
          }
        }
      }
      const getter = module.getters.getRowOptionValue(void 0, void 0, rootState)

      expect(getter('testField', 'testRow')).toBe(rootState.testModule.testRow.options.testField)
    })

    test('seeks subfield in the row options form and gets its value', () => {
      const rootState = {
        general: {
          currentStoreModule: 'testModule'
        },
        testModule: {
          testRow: {
            options: {
              testField: {
                subField: 'test value'
              }
            }
          }
        }
      }
      const getter = module.getters.getRowOptionValue(void 0, void 0, rootState)

      expect(getter('testField', 'testRow', 'subField')).toBe(rootState.testModule.testRow.options.testField.subField)
    })

  })

  /**
   * getMarginFieldValue
   * ===================
   */
  describe('getMarginFieldValue', () => {

    test('should call `getCurrentFieldValue` if only fieldName and position is provided', () => {
      const getters = {
        getCurrentFieldValue: jest.fn(),
      }
      const getter = module.getters.getMarginFieldValue(void 0, getters)

      getter('mockField', void 0, void 0, 'mockPosition')

      expect(getters.getCurrentFieldValue).toBeCalledWith('mockField', 'mockPosition')
    })

    test('should call `getRowOptionValue` if as="row" and row is provided', () => {
      const getters = {
        getRowOptionValue: jest.fn(),
      }
      const getter = module.getters.getMarginFieldValue(void 0, getters)

      getter('mockField', 'row', 'mockRow', 'mockPosition')

      expect(getters.getRowOptionValue).toBeCalledWith('mockField', 'mockRow', 'mockPosition')
    })

    test('should NOT call `getGridOptionValue` if as="row" and no row is provided', () => {
      const getters = {
        getRowOptionValue: jest.fn(),
      }
      const getter = module.getters.getMarginFieldValue(void 0, getters)

      getter('mockField', 'row', void 0, 'mockPosition')

      expect(getters.getRowOptionValue).not.toBeCalled()
    })

    test('should call `getRowOptionValue` if as="grid" is provided', () => {
      const getters = {
        getGridOptionValue: jest.fn(),
      }
      const getter = module.getters.getMarginFieldValue(void 0, getters)

      getter('mockField', 'grid', void 0, 'mockPosition')

      expect(getters.getGridOptionValue).toBeCalledWith('mockField', 'mockPosition')
    })

  })

  /**
   * getSelectFieldValue
   * ===================
   */
  describe('getSelectFieldValue', () => {

    test('should call `getCurrentFieldValue` if only fieldName is provided', () => {
      const getters = {
        getCurrentFieldValue: jest.fn(),
      }
      const getter = module.getters.getSelectFieldValue(void 0, getters)

      getter('mockField')

      expect(getters.getCurrentFieldValue).toBeCalledWith('mockField')
    })

    test('should call `getRowOptionValue` if as="row" and row is NOT empty', () => {
      const getters = {
        getRowOptionValue: jest.fn(),
      }
      const getter = module.getters.getSelectFieldValue(void 0, getters)

      getter('mockField', 'row', 'mockRow', 'mockPosition')

      expect(getters.getRowOptionValue).toBeCalledWith('mockField', 'mockRow', 'mockPosition')
    })

    test('should NOT call `getRowOptionValue` if NO row argument is provided', () => {
      const getters = {
        getRowOptionValue: jest.fn(),
      }
      const getter = module.getters.getSelectFieldValue(void 0, getters)

      getter('mockField', 'row', void 0, 'mockPosition')

      expect(getters.getRowOptionValue).not.toBeCalled()
    })

    test('should call `getGridOptionValue` if as="grid" is provided', () => {
      const getters = {
        getGridOptionValue: jest.fn(),
      }
      const getter = module.getters.getSelectFieldValue(void 0, getters)

      getter('mockField', 'grid', void 0, 'mockPosition')

      expect(getters.getGridOptionValue).toBeCalledWith('mockField', 'mockPosition')
    })

  })

  /**
   * getUploadFieldValue
   * ===================
   */
  describe('getUploadFieldValue', () => {

    test('should call `getCurrentFieldValue` if only fieldName is provided', () => {
      const getters = {
        getCurrentFieldValue: jest.fn(),
      }
      const getter = module.getters.getUploadFieldValue(void 0, getters)

      getter('mockField')

      expect(getters.getCurrentFieldValue).toBeCalledWith('mockField', void 0)
    })

    test('should call `getRowOptionValue` if as="row" and row is NOT empty', () => {
      const getters = {
        getRowOptionValue: jest.fn(),
      }
      const getter = module.getters.getUploadFieldValue(void 0, getters)

      getter('mockField', 'row', 'mockRow', 'mockPosition')

      expect(getters.getRowOptionValue).toBeCalledWith('mockField', 'mockRow', 'mockPosition')
    })

    test('should NOT call `getRowOptionValue` if NO row argument is provided', () => {
      const getters = {
        getRowOptionValue: jest.fn(),
      }
      const getter = module.getters.getUploadFieldValue(void 0, getters)

      getter('mockField', 'row', void 0, 'mockPosition')

      expect(getters.getRowOptionValue).not.toBeCalled()
    })

    test('should call `getGridOptionValue` if as="grid" is provided', () => {
      const getters = {
        getGridOptionValue: jest.fn(),
      }
      const getter = module.getters.getUploadFieldValue(void 0, getters)

      getter('mockField', 'grid', void 0, 'mockPosition')

      expect(getters.getGridOptionValue).toBeCalledWith('mockField', 'mockPosition')
    })

  })

  /**
   * getColorFieldValue
   * ==================
   */
  describe('getColorFieldValue', () => {

    test('should call `getCurrentFieldValue` if only fieldName is provided', () => {
      const getters = {
        getCurrentFieldValue: jest.fn(),
      }
      const getter = module.getters.getColorFieldValue(void 0, getters)

      getter('mockField')

      expect(getters.getCurrentFieldValue).toBeCalledWith('mockField')
    })

    test('should call `getStyleFieldValue` if as="styleForm" is provided', () => {
      const getters = {
        getStyleFieldValue: jest.fn(),
      }
      const getter = module.getters.getColorFieldValue(void 0, getters)

      getter('mockField', 'styleForm')

      expect(getters.getStyleFieldValue).toBeCalledWith('mockField')
    })

    test('should call `getRowOptionValue` if as="row" and row is NOT empty', () => {
      const getters = {
        getRowOptionValue: jest.fn(),
      }
      const getter = module.getters.getColorFieldValue(void 0, getters)

      getter('mockField', 'row', 'mockRow', 'mockPosition')

      expect(getters.getRowOptionValue).toBeCalledWith('mockField', 'mockRow', 'mockPosition')
    })

    test('should NOT call `getRowOptionValue` if NO row argument is provided', () => {
      const getters = {
        getRowOptionValue: jest.fn(),
      }
      const getter = module.getters.getColorFieldValue(void 0, getters)

      getter('mockField', 'row', void 0, 'mockPosition')

      expect(getters.getRowOptionValue).not.toBeCalled()
    })

    test('should call `getGridOptionValue` if as="grid" is provided', () => {
      const getters = {
        getGridOptionValue: jest.fn(),
      }
      const getter = module.getters.getColorFieldValue(void 0, getters)

      getter('mockField', 'grid', void 0, 'mockPosition')

      expect(getters.getGridOptionValue).toBeCalledWith('mockField', 'mockPosition')
    })

  })

  /**
   * getSwitchFieldValue
   * ===================
   */
  describe('getSwitchFieldValue', () => {

    test('should call `getCurrentFieldValue` if only fieldName is provided', () => {
      const getters = {
        getCurrentFieldValue: jest.fn(),
        getGridOptionValue: jest.fn(),
      }
      const getter = module.getters.getSwitchFieldValue( void 0, getters )

      getter( 'mockField' )

      expect( getters.getCurrentFieldValue ).toBeCalledWith( 'mockField' )
      expect( getters.getGridOptionValue ).not.toBeCalled()
    })

    test('should call `getGridOptionValue` if as="grid" is provided', () => {
      const getters = {
        getGridOptionValue: jest.fn(),
        getCurrentFieldValue: jest.fn(),
      }
      const getter = module.getters.getSwitchFieldValue( void 0, getters )

      getter( 'mockField', 'grid' )

      expect( getters.getGridOptionValue ).toBeCalledWith( 'mockField' )
      expect( getters.getCurrentFieldValue ).not.toBeCalled()
    })

  })

})