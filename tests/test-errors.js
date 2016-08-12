'use strict';
require("babel-register");
var assert = require('assert');
var EventEmitter = require('../lib/event-emitter').EventEmitter;

var EE = new EventEmitter();

assert.throws(function() {
  EE.emit('error', 'Accepts a string');
}, /Accepts a string/);
