import {
  capitalize,
  convertSpaceToDash,
  convertDashToSpace,
  toCamelCase,
  unCamelCase,
  allCaps,
} from '../../../src/filters/index'
import { executionAsyncId } from 'async_hooks';

describe('capitalize', () => {

  test('should return empty string if no argument provided', () => {
    expect( capitalize() ).toBe('')
  })

  test('should return empty string if undefined provided', () => {
    expect( capitalize(void 0) ).toBe('')
  })

  test('should get first character from provided in argument string and uppercase it', () => {
    expect( capitalize( 'test' ) ).toBe( 'Test' )
  })

})

describe('convertSpaceToDash', () => {

  test('should return empty string if no argument provided', () => {
    expect( convertSpaceToDash() ).toBe('')
  })

  test('should return empty string if undefined provided', () => {
    expect( convertSpaceToDash(void 0) ).toBe('')
  })

  test('should add underscore char instead of space whitechar.', () => {
    expect( convertSpaceToDash( 'Action Bar' ) ).toBe( 'Action_Bar' )
    expect( convertSpaceToDash( 'Lorem ipsum dolor sit amet.' ) ).toBe( 'Lorem_ipsum_dolor_sit_amet.' )
  })

})

describe('convertDashToSpace', () => {

  test('should return empty string if no argument provided', () => {
    expect( convertDashToSpace() ).toBe('')
  })

  test('should return empty string if undefined provided', () => {
    expect( convertDashToSpace(void 0) ).toBe('')
  })

  test('should seek for underscore in the string and replace it to whitespace', () => {
    expect( convertDashToSpace('__') ).toBe('  ')
    expect( convertDashToSpace('menu_icon') ).toBe('menu icon')
  })

})

describe('toCamelCase', () => {

  test('should return empty string if no argument provided', () => {
    expect( toCamelCase() ).toBe('')
  })

  test('should return empty string if undefined provided', () => {
    expect( toCamelCase(void 0) ).toBe('')
  })

  test('should take a space separated string as arg and remove spaces', () => {
    expect( toCamelCase( 'background color') ).toBe( 'backgroundColor' )
  })

  test('should take first letter of string and downcase it', () => {
    expect( toCamelCase( 'test') ).toBe( 'test' )
    expect( toCamelCase( 'Test') ).toBe( 'test' )
  })

  test('should uppercase each tail word first letter', () => {
    expect( toCamelCase( 'test next') ).toBe( 'testNext' )
    expect( toCamelCase( 'Test Next') ).toBe( 'testNext' )

    expect( toCamelCase( 'lorem ipsum dolor sit amet' ) ).toBe( 'loremIpsumDolorSitAmet' )
  })

})

describe('unCamelCase', () => {

  test('should return empty string if no argument provided', () => {
    expect( unCamelCase() ).toBe('')
  })

  test('should return empty string if undefined provided', () => {
    expect( unCamelCase(void 0) ).toBe('')
  })

  test('should return same string with first letter uppercased if no uppercase letter has been found', () => {
    expect( unCamelCase( 'loremipsumdolorsitamet' )).toBe( 'Loremipsumdolorsitamet' )
  })

  test('should take string without white chars and split them when uppercased letter is', () => {
    expect( unCamelCase( 'loremIpsumDolorSitAmet' ) ).toBe( 'Lorem Ipsum Dolor Sit Amet' )
    expect( unCamelCase( 'backgroundColor' ) ).toBe( 'Background Color' )
  })

})

describe('allCaps', () => {

  test('should return empty string if no argument provided', () => {
    expect( allCaps() ).toBe('')
  })

  test('should return empty string if undefined provided', () => {
    expect( allCaps(void 0) ).toBe('')
  })

  test('should take string as arg and return all letters uppercased', () => {
    expect( allCaps( 'test') ).toBe( 'TEST')
  })

  test('should convert any whitespace to underscore', () => {
    expect( allCaps(' - ') ).toBe( '_-_')
  })

  test('should take string with words whitespace separated and return uppercased underscore separated', () => {
    expect( allCaps( 'second row' )).toBe( 'SECOND_ROW' )
  })

  test('should split string if uppercase letter has been found and use underscore as seperator', () => {
    expect( allCaps( 'secondRow' )).toBe( 'SECOND_ROW' )
    expect( allCaps( 'test smth yo' )).toBe( 'TEST_SMTH_YO' )
  })

})