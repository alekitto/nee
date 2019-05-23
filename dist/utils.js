"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.spliceOne = spliceOne;
exports.arrayClone = arrayClone;
exports.unwrapListeners = unwrapListeners;
// About 1.5x faster than the two-arg version of Array#splice().
function spliceOne(list, index) {
    for (var i = index, k = i + 1, n = list.length; k < n; i += 1, k += 1) {
        list[i] = list[k];
    }

    list.pop();
}

function arrayClone(arr, i) {
    var copy = new Array(i);
    while (i--) {
        copy[i] = arr[i];
    }

    return copy;
}

function unwrapListeners(arr) {
    var ret = new Array(arr.length);
    for (var i = 0; i < ret.length; ++i) {
        ret[i] = arr[i].listener || arr[i];
    }

    return ret;
}
//# sourceMappingURL=utils.js.map