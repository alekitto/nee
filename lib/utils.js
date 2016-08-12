
// About 1.5x faster than the two-arg version of Array#splice().
export function spliceOne(list, index) {
    for (var i = index, k = i + 1, n = list.length; k < n; i += 1, k += 1) {
        list[i] = list[k];
    }

    list.pop();
}

export function arrayClone(arr, i) {
    let copy = new Array(i);
    while (i--) {
        copy[i] = arr[i];
    }

    return copy;
}


export function unwrapListeners(arr) {
    const ret = new Array(arr.length);
    for (var i = 0; i < ret.length; ++i) {
        ret[i] = arr[i].listener || arr[i];
    }

    return ret;
}
