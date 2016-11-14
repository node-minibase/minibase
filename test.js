/*!
 * minibase <https://github.com/node-minibase/minibase>
 *
 * Copyright (c) 2016 Charlike Mike Reagent <@tunnckoCore> (http://www.tunnckocore.tk)
 * Released under the MIT license.
 */

/* jshint asi:true */

'use strict'

var MiniBase = require('./index').MiniBase
var suite = require('minibase-tests')

suite(MiniBase).runTests(true).then(function (res) {
  console.log('# tests', res.tests)
  console.log('# pass', res.tests - res.length)

  if (!res.length) {
    console.log('')
    console.log('# ok')
    return
  }
  console.log('# fail', res.length, 'add `true` to `.runTests` to see them')
})
