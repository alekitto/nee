import * as utils from "./utils";

export function emitNone(handler, isFn, self) {
    if (isFn) {
        handler.call(self);
    } else {
        const len = handler.length;
        const listeners = utils.arrayClone(handler, len);

        for (let i = 0; i < len; ++i) {
            listeners[i].call(self);
        }
    }
}

export function emitOne(handler, isFn, self, arg1) {
    if (isFn) {
        handler.call(self, arg1);
    } else {
        const len = handler.length;
        const listeners = utils.arrayClone(handler, len);

        for (let i = 0; i < len; ++i) {
            listeners[i].call(self, arg1);
        }
    }
}

export function emitTwo(handler, isFn, self, arg1, arg2) {
    if (isFn) {
        handler.call(self, arg1, arg2);
    } else {
        const len = handler.length;
        const listeners = utils.arrayClone(handler, len);

        for (let i = 0; i < len; ++i) {
            listeners[i].call(self, arg1, arg2);
        }
    }
}

export function emitThree(handler, isFn, self, arg1, arg2, arg3) {
    if (isFn) {
        handler.call(self, arg1, arg2, arg3);
    } else {
        const len = handler.length;
        const listeners = utils.arrayClone(handler, len);

        for (let i = 0; i < len; ++i) {
            listeners[i].call(self, arg1, arg2, arg3);
        }
    }
}

export function emitMany(handler, isFn, args) {
    if (isFn) {
        handler.apply(this, args);
    } else {
        const len = handler.length;
        const listeners = utils.arrayClone(handler, len);

        for (let i = 0; i < len; ++i) {
            listeners[i].apply(this, args);
        }
    }
}
