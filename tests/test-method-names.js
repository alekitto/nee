'use strict';
require("babel-register");
var assert = require('assert');
var events = require('../lib/event-emitter.js');

var E = events.EventEmitter.prototype;
assert.equal(E.constructor.name, 'EventEmitter');
Object.getOwnPropertyNames(E).forEach(function(name) {
  if (name === 'constructor' || name === 'on') return;
  if (typeof E[name] !== 'function') return;
  assert.equal(E[name].name, name);
});
