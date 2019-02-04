import module from '../../../../src/store/modules/Common/UI/index'

describe('MUTATIONS UI module:', () => {

  test('SET_CURRENT_BREAKPOINT sets state.currentBreakpoint', () => {
    const state = {
      currentBreakpoint: void 0
    }
    const newValue = '666px'

    module.mutations.SET_CURRENT_BREAKPOINT( state, { breakpoint: newValue })
    expect( state.currentBreakpoint ).toBe( newValue )
  })

  test('SET_STICKY_FLAG sets state.stickyFlag', () => {
    const state = {
      stickyFlag: 'default',
    }
    const newValue = 'sticky'

    module.mutations.SET_STICKY_FLAG( state, { type: newValue })
    expect( state.stickyFlag ).toBe( newValue )
  })
})