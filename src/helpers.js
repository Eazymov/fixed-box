/* @flow */

export function isFunc(arg: mixed): boolean %checks {
  return typeof arg === 'function'
}

export function isNumber(arg: mixed): boolean %checks {
  return typeof arg === 'number'
}

export function isNull(arg: mixed): boolean %checks {
  return arg === null
}
