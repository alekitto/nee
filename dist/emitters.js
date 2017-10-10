"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.emitNone = emitNone;
exports.emitOne = emitOne;
exports.emitTwo = emitTwo;
exports.emitThree = emitThree;
exports.emitMany = emitMany;

var _utils = require("./utils");

var utils = _interopRequireWildcard(_utils);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function emitNone(handler, isFn, self) {
    if (isFn) {
        handler.call(self);
    } else {
        var len = handler.length;
        var listeners = utils.arrayClone(handler, len);

        for (var i = 0; i < len; ++i) {
            listeners[i].call(self);
        }
    }
}

function emitOne(handler, isFn, self, arg1) {
    if (isFn) {
        handler.call(self, arg1);
    } else {
        var len = handler.length;
        var listeners = utils.arrayClone(handler, len);

        for (var i = 0; i < len; ++i) {
            listeners[i].call(self, arg1);
        }
    }
}

function emitTwo(handler, isFn, self, arg1, arg2) {
    if (isFn) {
        handler.call(self, arg1, arg2);
    } else {
        var len = handler.length;
        var listeners = utils.arrayClone(handler, len);

        for (var i = 0; i < len; ++i) {
            listeners[i].call(self, arg1, arg2);
        }
    }
}

function emitThree(handler, isFn, self, arg1, arg2, arg3) {
    if (isFn) {
        handler.call(self, arg1, arg2, arg3);
    } else {
        var len = handler.length;
        var listeners = utils.arrayClone(handler, len);

        for (var i = 0; i < len; ++i) {
            listeners[i].call(self, arg1, arg2, arg3);
        }
    }
}

function emitMany(handler, isFn, args) {
    if (isFn) {
        handler.apply(this, args);
    } else {
        var len = handler.length;
        var listeners = utils.arrayClone(handler, len);

        for (var i = 0; i < len; ++i) {
            listeners[i].apply(this, args);
        }
    }
}
