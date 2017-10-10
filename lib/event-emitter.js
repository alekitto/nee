import * as utils from "./utils";
import * as emitters from "./emitters";

let warn = console.warn;
if (typeof process !== 'undefined' && typeof process.emitWarning === 'function') {
    warn = process.emitWarning;
}

function EventHandlers() {}
EventHandlers.prototype = Object.create(null);

let $getMaxListeners = function() {
    if (this._maxListeners === undefined) {
        return EventEmitter.defaultMaxListeners;
    }

    return this._maxListeners;
};

let addListener = function(type, listener, prepend) {
    let m, events, existing;

    if (typeof listener !== 'function') {
        throw new TypeError('"listener" argument must be a function');
    }

    events = this._events;
    if (!events) {
        events = this._events = new EventHandlers();
        this._eventsCount = 0;
    } else {
        // To avoid recursion in the case that type === "newListener"! Before
        // adding it to the listeners, first emit "newListener".
        if (events.newListener) {
            this.emit('newListener', type,
                listener.listener ? listener.listener : listener);

            // Re-assign `events` because a newListener handler could have caused the
            // this._events to be assigned to a new object
            events = this._events;
        }
        existing = events[type];
    }

    if (!existing) {
        // Optimize the case of one listener. Don't need the extra array object.
        events[type] = listener;
        ++this._eventsCount;
    } else {
        if (typeof existing === 'function') {
            // Adding the second element, need to change to array.
            existing = events[type] = prepend ? [listener, existing] :
                [existing, listener];
        } else {
            // If we've already got an array, just append.
            if (prepend) {
                existing.unshift(listener);
            } else {
                existing.push(listener);
            }
        }

        // Check for listener leak
        if (!existing.warned) {
            m = $getMaxListeners.call(this);
            if (m && m > 0 && existing.length > m) {
                existing.warned = true;
                warn('Possible EventEmitter memory leak detected. ' +
                    `${existing.length} ${type} listeners added. ` +
                    'Use emitter.setMaxListeners() to increase limit');
            }
        }
    }

    return this;
};

let onceWrap = function(type, listener) {
    let fired = false;

    function g() {
        this.removeListener(type, g);

        if (!fired) {
            fired = true;
            listener.apply(this, arguments);
        }
    }

    g.listener = listener;
    return g;
};

class EventEmitter
{
    constructor() {
        this.addListener = this.on;

        this._events = new EventHandlers();
        this._eventsCount = 0;
        this._maxListeners = undefined;
    }

    setMaxListeners(n) {
        if (typeof n !== 'number' || n < 0 || isNaN(n))
            throw new TypeError('"n" argument must be a positive number');

        this._maxListeners = n;
        return this;
    }

    getMaxListeners() {
        return $getMaxListeners.call(this);
    }

    on(type, listener) {
        return addListener.call(this, type, listener, false);
    }

    once(type, listener) {
        if (typeof listener !== 'function')
            throw new TypeError('"listener" argument must be a function');

        this.on(type, onceWrap.call(this, type, listener));
        return this;
    }

    prependListener(type, listener) {
        return addListener.call(this, type, listener, true);
    }

    prependOnceListener(type, listener) {
        if (typeof listener !== 'function')
            throw new TypeError('"listener" argument must be a function');

        this.prependListener(type, onceWrap.call(this, type, listener));
        return this;
    }

    emit(type) {
        let er, handler, len, args, i, events;
        let doError = (type === 'error');

        events = this._events;
        if (events) {
            doError = (doError && events.error == null);
        } else if (!doError) {
            return false;
        }

        // If there is no 'error' event listener then throw.
        if (doError) {
            er = arguments[1];

            if (er instanceof Error) {
                throw er; // Unhandled 'error' event
            } else {
                // At least give some kind of context to the user
                var err = new Error('Uncaught, unspecified "error" event. (' + er + ')');
                err.context = er;

                throw err;
            }
        }

        handler = events[type];

        if (!handler) {
            return false;
        }

        let isFn = typeof handler === 'function';
        len = arguments.length;
        switch (len) {
            // fast cases
            case 1:
                emitters.emitNone(handler, isFn, this);
                break;

            case 2:
                emitters.emitOne(handler, isFn, this, arguments[1]);
                break;

            case 3:
                emitters.emitTwo(handler, isFn, this, arguments[1], arguments[2]);
                break;

            case 4:
                emitters.emitThree(handler, isFn, this, arguments[1], arguments[2], arguments[3]);
                break;

            // slower
            default:
                args = new Array(len - 1);
                for (i = 1; i < len; i++) {
                    args[i - 1] = arguments[i];
                }

                emitters.emitMany.call(this, handler, isFn, args);
        }

        return true;
    }

    removeListener(type, listener) {
        let list, events, position, i, originalListener;

        if (typeof listener !== 'function') {
            throw new TypeError('"listener" argument must be a function');
        }

        events = this._events;
        if (!events) {
            return this;
        }

        list = events[type];
        if (!list) {
            return this;
        }

        if (list === listener || (list.listener && list.listener === listener)) {
            if (--this._eventsCount === 0) {
                this._events = new EventHandlers();
            } else {
                delete events[type];
                if (events.removeListener) {
                    this.emit('removeListener', type, list.listener || listener);
                }
            }
        } else if (typeof list !== 'function') {
            position = -1;

            for (i = list.length; i-- > 0;) {
                if (list[i] === listener ||
                    (list[i].listener && list[i].listener === listener)) {
                    originalListener = list[i].listener;
                    position = i;
                    break;
                }
            }

            if (position < 0) {
                return this;
            }

            if (list.length === 1) {
                list[0] = undefined;
                if (--this._eventsCount === 0) {
                    this._events = new EventHandlers();
                    return this;
                } else {
                    delete events[type];
                }
            } else {
                utils.spliceOne(list, position);
            }

            if (events.removeListener) {
                this.emit('removeListener', type, originalListener || listener);
            }
        }

        return this;
    }

    removeAllListeners(type) {
        var listeners, events;

        events = this._events;
        if (!events) {
            return this;
        }

        // not listening for removeListener, no need to emit
        if (!events.removeListener) {
            if (arguments.length === 0) {
                this._events = new EventHandlers();
                this._eventsCount = 0;
            } else if (events[type]) {
                if (--this._eventsCount === 0) {
                    this._events = new EventHandlers();
                } else {
                    delete events[type];
                }
            }
            return this;
        }

        // emit removeListener for all listeners on all events
        if (arguments.length === 0) {
            for (let key of Object.keys(events)) {
                if (key === 'removeListener') {
                    continue;
                }

                this.removeAllListeners(key);
            }

            this.removeAllListeners('removeListener');
            this._events = new EventHandlers();
            this._eventsCount = 0;
            return this;
        }

        listeners = events[type];

        if (typeof listeners === 'function') {
            this.removeListener(type, listeners);
        } else if (listeners) {
            // LIFO order
            do {
                this.removeListener(type, listeners[listeners.length - 1]);
            } while (listeners[0]);
        }

        return this;
    }

    listeners(type) {
        var evlistener;
        var ret;
        var events = this._events;

        if (!events) {
            ret = [];
        } else {
            evlistener = events[type];
            if (!evlistener) {
                ret = [];
            } else if (typeof evlistener === 'function') {
                ret = [evlistener.listener || evlistener];
            } else {
                ret = utils.unwrapListeners(evlistener);
            }
        }

        return ret;
    }

    listenerCount(type) {
        const events = this._events;

        if (events) {
            const evlistener = events[type];

            if (typeof evlistener === 'function') {
                return 1;
            } else if (evlistener) {
                return evlistener.length;
            }
        }

        return 0;
    }

    eventNames() {
        if (this._eventsCount <= 0) {
            return [];
        }

        if (typeof Reflect !== 'undefined') {
            return Reflect.ownKeys(this._events)
        }

        return Object.getOwnPropertyNames(this._events).concat(Object.getOwnPropertySymbols(this._events));
    }
}

EventEmitter.defaultMaxListeners = 10;

export default EventEmitter;
