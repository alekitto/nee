# nee

Nee is a porting of Node.JS EventEmitter class in ES2015. It's API is the same of the Node.JS's one (is based on the node v6 source code) and passes the same test suite used in node core

------------

### Why?

Building complex web applications probably involves creating custom events on custom objects. Node.JS EventEmitter is an extremely powerful event emitter library, but cannot be used in a browser context.

Nee allows you to use it while creating your JS client code, compiling it along with your ES6+ code.

### How?

Install via bower

```sh
$ bower install --save nee
```

and extend the EventEmitter class in your code

```javascript
import EventEmitter from "path/to/event-emitter";

class MyEmitter extends EventEmitter
{
    method() {
        let data = "event_data";
        this.emit('event_one', data);
    }
}
```

### API

Static:

- EventEmitter.defaultMaxListeners - By default, a maximum of 10 listeners can be registered for any single event. This limit can be changed for individual EventEmitter instances using the `emitter.setMaxListeners(n)` method.

Methods:

- addListener(event, handler) - Alias for `on(event, handler)`
- emit(eventName[, arg1][, arg2][, ...]) - Synchronously calls each of the listeners registered for the event named eventName, in the order they were registered, passing the supplied arguments to each.
  Returns true if the event had listeners, false otherwise.
- eventNames() - Returns an array listing the events for which the emitter has registered listeners
- getMaxListeners() - Returns the current max listener value for the emitter. Defaults to `defaultMaxListeners`
- listenerCount(eventName) - Returns the number of listeners listening to the event named `eventName`
- listeners(eventName) - Returns a copy of the array of listeners for the event named `eventName`
- on(eventName, listener) - Adds the listener function to the end of the listeners array for the event named `eventName`. Returns self, so that calls can be chained
- once(eventName, listener) - Adds a __one time__ listener function for the event named `eventName`. The next time `eventName` is triggered, this listener is removed and then invoked.
- prependListener(eventName, listener) - Similar to `on`, but it adds the listener to the _beginning_ of the listener array
- prependOnceListener(eventName, listener) - Adds a __one time__ listener to be _beginning_ of the listener array
- removeAllListeners([eventName]) - Removes all listeners, or those of the specified `eventName`
- removeListener(eventName, listener) - Removes `listener` from the listener array for the event named `eventName`
- setMaxListeners(n) - Set the max listener count after which the EventEmitter should raise a _warning_

Events:

- newListener(eventName, listener) - The EventEmitter instance will emit its own `newListener` event _before_ a listener is added to its internal array of listeners
- removeListener(eventName, listener) - The `removeListener` event is emitted _after_ the listener is removed

### Error events

When an error occurs within an `EventEmitter` instance, the typical action is for an `'error'` event to be emitted. These are treated as special cases.

If an `EventEmitter` does not have at least one listener registered for the `'error'` event, and an `'error'` event is emitted, the error is thrown.

```js
const myEmitter = new MyEmitter();
myEmitter.emit('error', new Error('whoops!'));
// Throws
```

### License

This project is released under the terms of the MIT license. See LICENSE file for more information

### Contributions

Contributions, thoughts and ideas are always welcome

Thanks for reading,
A
