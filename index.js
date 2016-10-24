/*!
 * node-minibase/minibase <https://github.com/node-minibase/minibase>
 *
 * Copyright (c) 2016 Charlike Mike Reagent <@tunnckoCore> (http://www.tunnckocore.tk)
 * Released under the MIT license.
 */

'use strict'

const util = require('util')
const utils = require('./utils')

/**
 * > Creates an instance of `MiniBase` with optional `options`
 * object - if given, otherwise the `minibase.options`
 * defaults to empty object. _**Never throws - emit events!™**_
 *
 * **Example**
 *
 * ```js
 * const MiniBase = require('minibase').MiniBase
 * const app = require('minibase')
 *
 * // when `silent: true` it will not add
 * // the default event listener to `error` event
 * const minibase = MiniBase({ silent: true })
 *
 * // nothing is printed, until you add
 * // listener `.on('error', fn)`
 * minibase.use(() => {
 *   throw new Error('foo bar')
 * })
 *
 * // if you work with defaults
 * // you will get this error printed
 * // because the default error handler
 * app.use(function () {
 *   console.log(this.options.silent) // => undefined
 *   throw new Error('default error handler works')
 * })
 * ```
 *
 * @param {Object} `[options]` optional, pass `silent: true` to not add default error listener
 * @api public
 */

function MiniBase (options) {
  if (!(this instanceof MiniBase)) {
    return new MiniBase(options)
  }
  utils.EventEmitter.call(this)
  this.initMiniBase(options)
}

/**
 * > Inherits from `EventEmitter3` lib, using
 * Node's built-in `inherits` method from
 * the core `util` module.
 *
 * @api private
 */

util.inherits(MiniBase, utils.EventEmitter)

/**
 * > Adds a few non-enumerable ("hidden") methods
 * to our prototype of `MiniBase` class. Using
 * the `delegate-propeties` library.
 *
 * @api private
 */

utils.delegate(MiniBase.prototype, {
  /**
   * > Does defaulting stuff on init.
   *
   * @name   .initMiniBase
   * @param  {Object} `options`
   * @return {Object} Returns instance of `MiniBase` for chaining
   * @api private
   */

  initMiniBase: function initMiniBase (options) {
    // ensure `this.options` is always an object
    this.options = utils.isObject(options) ? options : {}

    // hide them
    this.define('_events', this._events)
    this.define('_eventsCount', this._eventsCount)

    // default error handlers
    this.once('error', this.options.silent === true
      ? function onerrorSilent () {}
      : function onerror (err) {
        console.error(err.stack || err)
      })

    return this
  },

  /**
   * > Copy properties from `provider` to `this` instance
   * of `MiniBase`, using [delegate-properties][] lib.
   *
   * **Example**
   *
   * ```js
   * const minibase = require('minibase')
   *
   * minibase.use((app) => {
   *   // `app` is `minibase`
   *
   *   app.delegate({
   *     foo: 'bar',
   *     qux: (name) => {
   *       console.log(`hello ${name}`)
   *     }
   *   })
   * })
   *
   * // or directly use `.delegate`,
   * // not through plugin
   * minibase.delegate({ cats: 'dogs' })
   *
   * console.log(minibase.cats) // => 'dogs'
   * console.log(minibase.foo) // => 'bar'
   * console.log(minibase.qux('kitty!')) // => 'hello kitty!'
   * ```
   *
   * @name   .delegate
   * @param  {Object} `<provider>` object providing properties
   * @return {Object} Returns instance of `MiniBase` for chaining
   * @api public
   */

  delegate: function delegateProperties (provider) {
    utils.delegate(this, provider)
    return this
  },

  /**
   * > Used for adding non-enumerable property `key` with `value`
   * on the instance, using [define-property][] lib.
   *
   * **Example**
   *
   * ```js
   * const minibase = require('minibase')
   *
   * minibase.use(function (app) {
   *   // `app` and `this` are instance of `MiniBase`,
   *   // and so `minibase`
   *
   *   this.define('set', function set (key, value) {
   *     this.cache = this.cache || {}
   *     this.cache[key] = value
   *     return this
   *   })
   *   app.define('get', function get (key) {
   *     return this.cache[key]
   *   })
   * })
   *
   * minibase
   *   .set('foo', 'bar')
   *   .set('qux', 123)
   *   .set('baz', { a: 'b' })
   *
   * // or directly use `.define`,
   * // not through plugin
   * minibase.define('hi', 'kitty')
   * console.log(minibase.hi) // => 'kitty'
   *
   * console.log(minibase.get('foo')) // => 'bar'
   * console.log(minibase.get('qux')) // => 123
   * console.log(minibase.get('baz')) // => { a: 'b' }
   *
   * // or access the cache directly
   * console.log(minimist.cache.baz) // => { a: 'b' }
   * console.log(minimist.cache.qux) // => 123
   * ```
   *
   * @name   .define
   * @param  {String} `key` name of the property to be defined or modified
   * @param  {any} `value` descriptor for the property being defined or modified
   * @return {Object} Returns instance of `MiniBase` for chaining
   * @api public
   */

  define: function defineProperty (key, value) {
    utils.define(this, key, value)
    return this
  },

  /**
   * > Define a plugin `fn` function to be called immediately upon init.
   * It is recommended `fn` to be synchronous and should not expect
   * asynchronous plugins to work correctly - use plugins for this.
   * Uses [try-catch-callback][] under the hood to handle errors
   * and completion of that synchronous function.
   * _**Never throws - emit events!™**_
   *
   * See [try-catch-callback][] and/or [try-catch-core][] for more details.
   *
   * **Example**
   *
   * ```js
   * const MiniBase = require('minibase').MiniBase
   * const app = MiniBase({ silent: true, foo: 'bar' })
   *
   * app
   *   .once('error', (err) => console.error(err.stack || err))
   *   .on('use', function (fn, res) {
   *     // called on each `.use` call
   *     console.log(res) // => 555
   *   })
   *   .use((app) => {
   *     console.log(app.options) // => { silent: true, foo: 'bar' }
   *     return 555
   *   })
   *   .use(function () {
   *     // intentionally
   *     foo bar
   *   })
   * ```
   *
   * @name   .use
   * @emits `error` when plugin `fn` throws an error
   * @emits `use` on successful completion with `fn` and `result` arguments,
   *              where the `result` is returned value of the plugin
   * @param  {Function} `fn` plugin to be called with `ctx, cb` arguments,
   *              where both `ctx` and `this` of `fn` are instance of `MiniBase`
   *              and `cb` is callback - use with caution and in rare cases
   * @return {Object} Returns instance of `MiniBase` for chaining
   * @api public
   */

  use: function use (fn) {
    fn = fn.bind(this, this)
    utils.tryCatch(fn, (err, res) => {
      if (err) {
        err.fn = fn
        err.fnName = utils.getFnName(fn)
        this.emit('error', err)
        return
      }
      this.emit('use', fn, res)
    }, true)
    return this
  }
})

utils.delegate(MiniBase, {
  /**
   * > Static method to delegate properties from `provider` to `receiver`
   * and make them non-enumerable.
   *
   * See [delegate-properties][] for more details, it is exact mirror.
   *
   * **Example**
   *
   * ```js
   * const MiniBase = require('minibase').MiniBase
   *
   * const obj = { foo: 'bar' }
   *
   * MiniBase.delegate(obj, {
   *   qux: 123
   * })
   *
   * console.log(obj.foo) // => 'bar'
   * console.log(obj.qux) // => 123
   * ```
   *
   * @name   #delegate
   * @param  {Object} `receiver` object receiving properties
   * @param  {Object} `provider` object providing properties
   * @api public
   */

  delegate: utils.delegate,

  /**
   * > Static method to define a non-enumerable property on an object.
   *
   * See [define-property][] for more details, it is exact mirror.
   *
   * **Example**
   *
   * ```js
   * const MiniBase = require('minibase').MiniBase
   *
   * const obj = {}
   * MiniBase.define(obj, 'foo', 123)
   * MiniBase.define(obj, 'bar', () => console.log('qux'))
   *
   * console.log(obj.foo) // => 123
   * console.log(obj.bar()) // => 'qux'
   * ```
   *
   * @name   #define
   * @param  {Object} `obj` The object on which to define the property
   * @param {Object} `prop` The name of the property to be defined or modified
   * @param {any} `descriptor` The descriptor for the property being defined or modified
   * @api public
   */

  define: utils.define,

  /**
   * > Static method for inheriting the prototype and static
   * methods of the `MiniBase` class. This method greatly simplifies
   * the process of creating inheritance-based applications.
   *
   * See [static-extend][] for more details.
   *
   * **Example**
   *
   * ```js
   * const MiniBase = require('minibase').MiniBase
   *
   * function MyApp (options) {
   *   MiniBase.call(this, options)
   * }
   *
   * MiniBase.extend(MyApp)
   *
   * console.log(MyApp.extend) // => function
   * console.log(MyApp.define) // => function
   * console.log(MyApp.delegate) // => function
   *
   * const app = new MyApp()
   *
   * console.log(app.use) // => function
   * console.log(app.define) // => function
   * console.log(app.delegate) // => function
   * ```
   *
   * @name   #extend
   * @param  {Function} `Ctor` constructor to extend
   * @param  {Object} `methods` optional prototype properties to mix in
   * @api public
   */

  extend: utils.staticExtend(MiniBase, (Child) => {
    utils.delegate(Child, {
      delegate: utils.delegate,
      define: utils.define
    })
  })
})

/**
 * Expose `MiniBase` instance with default `options`.
 *
 * **Example**
 *
 * ```js
 * const minibase = require('minibase')
 *
 * console.log(minibase)
 * console.log(minibase.use)
 * console.log(minibase.define)
 * console.log(minibase.options)
 * console.log(minibase.delegate)
 * ```
 *
 * @type {Object}
 * @api private
 */

module.exports = new MiniBase()

/**
 * Expose `MiniBase` constructor. In some cases
 * you want to create a few new instances. Useful when you
 * don't want default error handler to be called
 * on error. In this case pass `silent: true` to
 * the `MiniBase` constructor.
 *
 * **Example**
 *
 * ```js
 * const MiniBase = require('minibase').MiniBase
 * const minibase = new MiniBase({ silent: true })
 *
 * // or without `new` keyword
 * // const app = MiniBase()
 * ```
 *
 * @type {Function}
 * @api private
 */

module.exports.MiniBase = MiniBase
