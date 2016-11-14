/*!
 * minibase <https://github.com/node-minibase/minibase>
 *
 * Copyright (c) 2016 Charlike Mike Reagent <@tunnckoCore> (http://www.tunnckocore.tk)
 * Released under the MIT license.
 */

/* jshint asi:true */

'use strict'

var assert = require('assert')
var MiniBase = require('./index').MiniBase
var suite = require('minibase-tests')

suite(MiniBase).runTests().then(function (res) {
  assert.strictEqual(res.length, 18)
  console.log('all `minibase-tests` passed')
}, function (err) {
  console.error('fail:')
  console.error(err.stack || err)
})

