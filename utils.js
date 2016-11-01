'use strict'

var utils = require('lazy-cache')(require)
var fn = require
require = utils // eslint-disable-line no-undef, no-native-reassign, no-global-assign

/**
 * Lazily required module dependencies
 */

require('define-property', 'define')
require('delegate-properties', 'delegate')
require('eventemitter3', 'EventEmitter')
require('get-fn-name')
require('isobject', 'isObject')
require('static-extend')
require('try-catch-callback')
require = fn // eslint-disable-line no-undef, no-native-reassign, no-global-assign

/**
 * Expose `utils` modules
 */

module.exports = utils
