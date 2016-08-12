'use strict';

require("babel-register");
const common = require('./util/common');
const EventEmitter = require('../lib/event-emitter.js').EventEmitter;
const assert = require('assert');

const ee = new EventEmitter();
const foo = Symbol('foo');
const listener = common.mustCall(function() {});

ee.on(foo, listener);
assert.deepStrictEqual(ee.listeners(foo), [listener]);

ee.emit(foo);

ee.removeAllListeners();
assert.deepStrictEqual(ee.listeners(foo), []);

ee.on(foo, listener);
assert.deepStrictEqual(ee.listeners(foo), [listener]);

ee.removeListener(foo, listener);
assert.deepStrictEqual(ee.listeners(foo), []);
