/*!
 * node-minibase/minibase <https://github.com/node-minibase/minibase>
 *
 * Copyright (c) 2016 Charlike Mike Reagent <@tunnckoCore> (http://www.tunnckocore.tk)
 * Released under the MIT license.
 */

/* jshint asi:true */

'use strict'

let MiniBase = require('./index').MiniBase
let app = new MiniBase({
  silent: true
})

// uncomment to handle the errors,
// even if `silent: true`
//
// app.once('error', console.log)

app.use(function (ctx) {
  console.log(ctx)
  console.log(this)
})
app.use(function (ctx) {
  console.log(tdhdasdasdis) // eslint-disable-line no-undef
})
