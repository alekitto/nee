'use strict';
var assert = require('assert');
var events = require('../lib/event-emitter.js');

var e = new events.EventEmitter();

assert(!(e._events instanceof Object));
assert.deepStrictEqual(Object.keys(e._events), []);
e.setMaxListeners(5);
assert.deepStrictEqual(Object.keys(e._events), []);
