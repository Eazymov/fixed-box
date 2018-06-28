'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isFunc = isFunc;
exports.isNumber = isNumber;
exports.isNull = isNull;
function isFunc(arg) {
  return typeof arg === 'function';
}

function isNumber(arg) {
  return typeof arg === 'number';
}

function isNull(arg) {
  return arg === null;
}