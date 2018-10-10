export default class EventEmitter
{
    setMaxListeners(n: number): EventEmitter;

    getMaxListeners(): number;

    on(type: string, listener: Function): EventEmitter;

    once(type: string, listener: Function): EventEmitter;

    prependListener(type: string, listener: Function): EventEmitter;

    prependOnceListener(type: string, listener: Function): EventEmitter;

    emit(type: string, ...args: any[]): boolean;

    removeListener(type: string, listener: Function): EventEmitter;

    removeAllListeners(type?: string): EventEmitter;

    listeners(type: string): Function[];

    listenerCount(type: string): number;

    eventNames(): string[];
}
