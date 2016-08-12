'use strict';
require("babel-register");
const common = require("./util/common");
var events = require('../lib/event-emitter.js');

var e = new events.EventEmitter();

e.once('hello', common.mustCall(function(a, b) {}));

e.emit('hello', 'a', 'b');
e.emit('hello', 'a', 'b');
e.emit('hello', 'a', 'b');
e.emit('hello', 'a', 'b');

var remove = function() {
  common.fail('once->foo should not be emitted');
};

e.once('foo', remove);
e.removeListener('foo', remove);
e.emit('foo');

e.once('e', common.mustCall(function() {
  e.emit('e');
}));

e.once('e', common.mustCall(function() {}));

e.emit('e');
