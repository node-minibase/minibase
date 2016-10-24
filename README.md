# [minibase][author-www-url] [![npmjs.com][npmjs-img]][npmjs-url] [![The MIT License][license-img]][license-url] [![npm downloads][downloads-img]][downloads-url] 

<p align="center">
  <a href="https://github.com/node-base/base">
    <img height="250" width="250" src="https://avatars1.githubusercontent.com/u/23032863?v=3&s=250">
  </a>
</p>

> MiniBase is minimalist approach to Base - [@node-base](https://github.com/node-base), the awesome framework. Foundation for building complex APIs with small units called plugins. Works well with most of the already existing [base][] plugins.

[![code climate][codeclimate-img]][codeclimate-url] [![standard code style][standard-img]][standard-url] [![travis build status][travis-img]][travis-url] [![coverage status][coveralls-img]][coveralls-url] [![dependency status][david-img]][david-url]

## Install
> Install with [npm](https://www.npmjs.com/)

```sh
$ npm i minibase --save
```

## Usage
> For more use-cases see the [tests](./test.js)

```js
const MiniBase = require('minibase').MiniBase

// or instance directly

const minibase = require('minibase')
```

## API

### [MiniBase](index.js#L22)

> Creates an instance of `MiniBase` with optional `options`
object - if given, otherwise the `minibase.options`
defaults to empty object. _**Never throws - emit events!™**_

**Params**

* `[options]` **{Object}**    

### [.delegate](index.js#L86)

> Copy properties from `provider` to `this` instance
of `MiniBase`, using [delegate-properties][] lib.

**Params**

* `<provider>` **{Object}**: object providing properties    
* `returns` **{Object}**: Returns instance of `MiniBase` for chaining  

### [.define](index.js#L102)

> Used for adding non-enumerable property `key` with `value`
on the instance, using [define-property][] lib.

**Params**

* `key` **{String}**: name of the property to be defined or modified    
* `value` **{any}**: descriptor for the property being defined or modified    
* `returns` **{Object}**: Returns instance of `MiniBase` for chaining  

### [.use](index.js#L127)

> Define a plugin `fn` function to be called immediately upon init.
It is recommended `fn` to be synchronous and should not expect
asynchronous plugins to work correctly - use plugins for this.
Uses [try-catch-callback][] under the hood to handle errors
and completion of that synchronous function.
_**Never throws - emit events!™**_
> See [try-catch-callback][] and/or [try-catch-core][] for more details.

**Params**

* `fn` **{Function}**: plugin to be called with `ctx, cb` arguments, where both `ctx` and `this` of `fn` are instance of `MiniBase` and `cb` is callback - use with caution and in rare cases    
* `returns` **{Object}**: Returns instance of `MiniBase` for chaining  

**Events**
* `emits`: `error` when plugin `fn` throws an error  
* `emits`: `use` on successful completion with `fn` and `result` arguments, where the `result` is returned value of the plugin  

### [#delegate](index.js#L154)

> Static method to delegate properties from `provider` to `receiver`
and make them non-enumerable.
> See [delegate-properties][] for more details, it is exact mirror.

**Params**

* `receiver` **{Object}**: object receiving properties    
* `provider` **{Object}**: object providing properties    

### [#define](index.js#L167)

> Static method to define a non-enumerable property on an object.
> See [define-property][] for more details, it is exact mirror.

**Params**

* `obj` **{Object}**: The object on which to define the property    
* `prop` **{Object}**: The name of the property to be defined or modified    
* `descriptor` **{any}**: The descriptor for the property being defined or modified    

### [#extend](index.js#L181)

> Static method for inheriting the prototype and static
methods of the `MiniBase` class. This method greatly simplifies
the process of creating inheritance-based applications.
> See [static-extend][] for more details.

**Params**

* `Ctor` **{Function}**: constructor to extend    
* `methods` **{Object}**: optional prototype properties to mix in    

## Contributing
Pull requests and stars are always welcome. For bugs and feature requests, [please create an issue](https://github.com/node-minibase/minibase/issues/new).  
But before doing anything, please read the [CONTRIBUTING.md](./CONTRIBUTING.md) guidelines.

## [Charlike Make Reagent](http://j.mp/1stW47C) [![new message to charlike][new-message-img]][new-message-url] [![freenode #charlike][freenode-img]][freenode-url]

[![tunnckoCore.tk][author-www-img]][author-www-url] [![keybase tunnckoCore][keybase-img]][keybase-url] [![tunnckoCore npm][author-npm-img]][author-npm-url] [![tunnckoCore twitter][author-twitter-img]][author-twitter-url] [![tunnckoCore github][author-github-img]][author-github-url]

[base]: https://github.com/node-base/base
[define-property]: https://github.com/jonschlinkert/define-property
[delegate-properties]: https://github.com/jonschlinkert/delegate-properties
[static-extend]: https://github.com/jonschlinkert/static-extend
[try-catch-callback]: https://github.com/tunnckocore/try-catch-callback
[try-catch-core]: https://github.com/tunnckocore/try-catch-core

[npmjs-url]: https://www.npmjs.com/package/minibase
[npmjs-img]: https://img.shields.io/npm/v/minibase.svg?label=minibase

[license-url]: https://github.com/node-minibase/minibase/blob/master/LICENSE
[license-img]: https://img.shields.io/npm/l/minibase.svg

[downloads-url]: https://www.npmjs.com/package/minibase
[downloads-img]: https://img.shields.io/npm/dm/minibase.svg

[codeclimate-url]: https://codeclimate.com/github/node-minibase/minibase
[codeclimate-img]: https://img.shields.io/codeclimate/github/node-minibase/minibase.svg

[travis-url]: https://travis-ci.org/node-minibase/minibase
[travis-img]: https://img.shields.io/travis/node-minibase/minibase/master.svg

[coveralls-url]: https://coveralls.io/r/node-minibase/minibase
[coveralls-img]: https://img.shields.io/coveralls/node-minibase/minibase.svg

[david-url]: https://david-dm.org/node-minibase/minibase
[david-img]: https://img.shields.io/david/node-minibase/minibase.svg

[standard-url]: https://github.com/feross/standard
[standard-img]: https://img.shields.io/badge/code%20style-standard-brightgreen.svg

[author-www-url]: http://www.tunnckocore.tk
[author-www-img]: https://img.shields.io/badge/www-tunnckocore.tk-fe7d37.svg

[keybase-url]: https://keybase.io/tunnckocore
[keybase-img]: https://img.shields.io/badge/keybase-tunnckocore-8a7967.svg

[author-npm-url]: https://www.npmjs.com/~tunnckocore
[author-npm-img]: https://img.shields.io/badge/npm-~tunnckocore-cb3837.svg

[author-twitter-url]: https://twitter.com/tunnckoCore
[author-twitter-img]: https://img.shields.io/badge/twitter-@tunnckoCore-55acee.svg

[author-github-url]: https://github.com/tunnckoCore
[author-github-img]: https://img.shields.io/badge/github-@tunnckoCore-4183c4.svg

[freenode-url]: http://webchat.freenode.net/?channels=charlike
[freenode-img]: https://img.shields.io/badge/freenode-%23charlike-5654a4.svg

[new-message-url]: https://github.com/tunnckoCore/ama
[new-message-img]: https://img.shields.io/badge/ask%20me-anything-green.svg

