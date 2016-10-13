'use strict';
const common = require('./util/common');
var assert = require('assert');
var events = require('../lib/event-emitter.js');
var e = new events.EventEmitter();

e.on('maxListeners', common.mustCall(function() {}));

// Should not corrupt the 'maxListeners' queue.
e.setMaxListeners(42);

assert.throws(function() {
  e.setMaxListeners(NaN);
});

assert.throws(function() {
  e.setMaxListeners(-1);
});

assert.throws(function() {
  e.setMaxListeners('and even this');
});

e.emit('maxListeners');
