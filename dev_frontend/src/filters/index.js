/**
 * Capitalize first letter of str parameter.
 * e.g.
 *
 * "foo" => "Foo"
 * @param {string} str
 */
export const capitalize = ( value ) => {
  if ( !value ) return ''

  value = value.toString()
  return value.charAt( 0 ).toUpperCase() + value.slice( 1 )
}

/**
 * Convert string with dash separated words (e.g. value of data-type param)
 * to space separated string.
 * e.g.
 *
 * "menu_icon" => "menu icon"
 * @param {string} str
 */
export const convertDashToSpace = ( str ) => {
  if ( !str ) return ''

  return str.split( '_' ).join(' ')
}

/**
 * Convert string with space separated words to dash separated string.
 * e.g.
 *
 * "Action Bar" => "Action_Bar"
 * @param {string} str
 */
export const convertSpaceToDash = ( str ) => {
  if ( !str ) return ''

  return str.split(' ').join( '_' )
}

/**
 * Convert string with space to one Camel Cased string.
 * e.g.
 *
 * "background color" => "backgroundColor"
 * @param {string} str
 */
export const toCamelCase = ( str ) => {
  if ( !str ) return ''

  let arr    = str.split(' ')
  let output = arr.reduce(( prev, curr, index ) => {
    // return ( index === 0 ) ? prev + curr : prev + capitalize( curr )
    return (index === 0)
      ? curr.charAt(0).toLowerCase() + curr.slice(1)
      : prev + capitalize(curr)
  }, '')

  return output
}

/**
 * Convert camelCased string to human-readable string.
 * e.g.
 *
 * "backgroundColor" => "Background Color"
 * @param {string} str
 */
export const unCamelCase = ( str ) => {
  if ( !str ) return ''

  return str
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/\b([A-Z]+)([A-Z])([a-z])/, '$1 $2$3')
    .replace(/^./, ( str ) => { return str.toUpperCase() })
}

/**
 * Convert camelCased string to upper-cased snake case.
 * e.g.
 *
 * "secondRow" => "SECOND_ROW"
 */
export const allCaps = ( str ) => {
  if ( !str ) return ''

  return convertSpaceToDash(unCamelCase( str )).toUpperCase()
}