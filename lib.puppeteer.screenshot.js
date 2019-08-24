#!/usr/bin/env node
/*
  * lib.puppeteer.js (2019.8.12)
  * https://github.com/kaizhu256/node-puppeteer-lite
  * this package will provide a zero-dependency version of puppeteer
  *
  */



///* jslint utility2:true */

/* jslint ignore:start */
(function (globalThis) {
        "use strict";
        var consoleError;
        var local;
        // init globalThis
        (function () {
                try {
                        globalThis = Function("return this")(); // jslint ignore:line
                } catch (ignore) {}
        }());
        globalThis.globalThis = globalThis;
        // init debug_inline
        if (!globalThis["debug\u0049nline"]) {
                consoleError = console.error;
                globalThis["debug\u0049nline"] = function () {
                /*
                  * this function will both print <arguments> to stderr
                  * and return <arguments>[0]
                  */
                        var argList;
                        argList = Array.from(arguments); // jslint ignore:line
                        // debug arguments
                        globalThis["debug\u0049nlineArguments"] = argList;
                        consoleError("\n\ndebug\u0049nline");
                        consoleError.apply(console, argList);
                        consoleError("\n");
                        // return arg0 for inspection
                        return argList[0];
                };
        }
        // init local
        local = {};
        local.local = local;
        globalThis.globalLocal = local;
        // init isBrowser
        local.isBrowser = (
                typeof window === "object"
                && window === globalThis
                && typeof window.XMLHttpRequest === "function"
                && window.document
                && typeof window.document.querySelector === "function"
        );
        // init function
        local.assertThrow = function (passed, message) {
        /*
          * this function will throw err.<message> if <passed> is falsy
          */
                var err;
                if (passed) {
                        return;
                }
                err = (
                        // ternary-operator
                        (
                                message
                                && typeof message.message === "string"
                                && typeof message.stack === "string"
                        )
                        // if message is errObj, then leave as is
                        ? message
                        : new Error(
                                typeof message === "string"
                                // if message is a string, then leave as is
                                ? message
                                // else JSON.stringify message
                                : JSON.stringify(message, null, 4)
                        )
                );
                throw err;
        };
        local.functionOrNop = function (fnc) {
        /*
          * this function will if <fnc> exists,
          * them return <fnc>,
          * else return <nop>
          */
                return fnc || local.nop;
        };
        local.identity = function (value) {
        /*
          * this function will return <value>
          */
                return value;
        };
        local.nop = function () {
        /*
          * this function will do nothing
          */
                return;
        };
        local.objectAssignDefault = function (target, source) {
        /*
          * this function will if items from <target> are
          * null, undefined, or empty-string,
          * then overwrite them with items from <source>
          */
                target = target || {};
                Object.keys(source || {}).forEach(function (key) {
                        if (
                                target[key] === null
                                || target[key] === undefined
                                || target[key] === ""
                        ) {
                                target[key] = target[key] || source[key];
                        }
                });
                return target;
        };
        // require builtin
        if (!local.isBrowser) {
                local.assert = require("assert");
                local.buffer = require("buffer");
                local.child_process = require("child_process");
                local.cluster = require("cluster");
                local.crypto = require("crypto");
                local.dgram = require("dgram");
                local.dns = require("dns");
                local.domain = require("domain");
                local.events = require("events");
                local.fs = require("fs");
                local.http = require("http");
                local.https = require("https");
                local.net = require("net");
                local.os = require("os");
                local.path = require("path");
                local.querystring = require("querystring");
                local.readline = require("readline");
                local.repl = require("repl");
                local.stream = require("stream");
                local.string_decoder = require("string_decoder");
                local.timers = require("timers");
                local.tls = require("tls");
                local.tty = require("tty");
                local.url = require("url");
                local.util = require("util");
                local.vm = require("vm");
                local.zlib = require("zlib");
        }
}(this));



(function (local) {
"use strict";
// hack-puppeteer - module.exports
const EventEmitter = require('events');
const URL = require('url');
const childProcess = require('child_process');
const crypto = require('crypto');
const fs = require('fs');
const http = require('http');
const https = require('https');
const net = require('net');
const os = require('os');
const path = require('path');
const readline = require('readline');
const tls = require('tls');
const url = require('url');
const util = require('util');
const { Writable } = require('stream');
const { randomBytes } = require('crypto');



const child_process = require('child_process');
const debugError = console.error;
const debugProtocol = function () {
        return;
}
const removeFolder = function (dir, onError) {
/*
  * this function will asynchronously "rm -fr" <dir>
  */
        child_process.spawn("rm", [
                "-fr", path.resolve(process.cwd(), dir)
        ], {
                stdio: [
                        "ignore", 1, 2
                ]
        }).on("exit", onError);
};
removeFolder.sync = function (dir) {
/*
  * this function will synchronously "rm -fr" <dir>
  */
        child_process.spawnSync("rm", [
                "-fr", path.resolve(process.cwd(), dir)
        ], {
                stdio: [
                        "ignore", 1, 2
                ]
        });
};
const removeRecursive = removeFolder;
const timeout = 30000;



/*
file https://github.com/websockets/ws/tree/6.2.1
*/
// require('./buffer-util') // const bufferUtil = require('./buffer-util');
// require('./buffer-util') // const { concat, toArrayBuffer, unmask } = require('./buffer-util');
// require('./buffer-util') // const { mask: applyMask, toBuffer } = require('./buffer-util');
// require('./constants') // const { EMPTY_BUFFER } = require('./constants');
// require('./constants') // const { GUID } = require('./constants');
// require('./constants') // const { kStatusCode, NOOP } = require('./constants');
// require('./constants') // } = require('./constants');
// require('./event-target') // const EventTarget = require('./event-target');
// require('./extension') // const extension = require('./extension');
// require('./lib/receiver') // WebSocket.Receiver = require('./lib/receiver');
// require('./lib/sender') // WebSocket.Sender = require('./lib/sender');
// require('./lib/websocket') // const WebSocket = require('./lib/websocket');
// require('./lib/websocket-server') // WebSocket.Server = require('./lib/websocket-server');
// require('./permessage-deflate') // const PerMessageDeflate = require('./permessage-deflate');
// require('./receiver') // const Receiver = require('./receiver');
// require('./sender') // const Sender = require('./sender');
// require('./validation') // const { isValidStatusCode } = require('./validation');
// require('./validation') // const { isValidStatusCode, isValidUTF8 } = require('./validation');
// require('./websocket') // const WebSocket = require('./websocket');
// require('async-limiter') // const Limiter = require('async-limiter');
// require('bufferutil') // const bufferUtil = require('bufferutil');
// require('crypto') // const crypto = require('crypto');
// require('crypto') // const { randomBytes } = require('crypto');
// require('events') // const EventEmitter = require('events');
// require('http') // const http = require('http');
// require('https') // const https = require('https');
// require('net') // const net = require('net');
// require('stream') // const { Writable } = require('stream');
// require('tls') // const tls = require('tls');
// require('url') // const url = require('url');
// require('utf-8-validate') // const isValidUTF8 = require('utf-8-validate');
// require('zlib') // const zlib = require('zlib');



/*
lib https://github.com/websockets/ws/blob/6.2.1/validation.js
*/
'use strict';

// hack-puppeteer - module.exports
const isValidUTF8 = () => true;

/**
  * Checks if a status code is allowed in a close frame.
  *
  * @param {Number} code The status code
  * @return {Boolean} `true` if the status code is valid, else `false`
  * @public
  */
// hack-puppeteer - module.exports
const isValidStatusCode = (code) => {
    return (
        (code >= 1000 &&
            code <= 1013 &&
            code !== 1004 &&
            code !== 1005 &&
            code !== 1006) ||
        (code >= 3000 && code <= 4999)
    );
};



/*
lib https://github.com/websockets/ws/blob/6.2.1/buffer-util.js
*/
'use strict';

// const { EMPTY_BUFFER } = require('./constants');

/**
  * Merges an array of buffers into a new buffer.
  *
  * @param {Buffer[]} list The array of buffers to concat
  * @param {Number} totalLength The total length of buffers in the list
  * @return {Buffer} The resulting buffer
  * @public
  */
function concat(list, totalLength) {
    if (list.length === 0) return EMPTY_BUFFER;
    if (list.length === 1) return list[0];

    const target = Buffer.allocUnsafe(totalLength);
    var offset = 0;

    for (var i = 0; i < list.length; i++) {
        const buf = list[i];
        buf.copy(target, offset);
        offset += buf.length;
    }

    return target;
}

/**
  * Masks a buffer using the given mask.
  *
  * @param {Buffer} source The buffer to mask
  * @param {Buffer} mask The mask to use
  * @param {Buffer} output The buffer where to store the result
  * @param {Number} offset The offset at which to start writing
  * @param {Number} length The number of bytes to mask.
  * @public
  */
function _mask(source, mask, output, offset, length) {
    for (var i = 0; i < length; i++) {
        output[offset + i] = source[i] ^ mask[i & 3];
    }
}

/**
  * Converts `data` to a `Buffer`.
  *
  * @param {*} data The data to convert
  * @return {Buffer} The buffer
  * @throws {TypeError}
  * @public
  */
function toBuffer(data) {
    toBuffer.readOnly = true;

    if (Buffer.isBuffer(data)) return data;

    var buf;

    if (data instanceof ArrayBuffer) {
        buf = Buffer.from(data);
    } else if (ArrayBuffer.isView(data)) {
        buf = viewToBuffer(data);
    } else {
        buf = Buffer.from(data);
        toBuffer.readOnly = false;
    }

    return buf;
}

// hack-puppeteer - module.exports
const applyMask = _mask;
const bufferUtil = { concat };
const mask = _mask;
const unmask = _mask;



/*
lib https://github.com/websockets/ws/blob/6.2.1/constants.js
*/
'use strict';

module.exports = {
    BINARY_TYPES: ['nodebuffer', 'arraybuffer', 'fragments'],
    GUID: '258EAFA5-E914-47DA-95CA-C5AB0DC85B11',
    kStatusCode: Symbol('status-code'),
    kWebSocket: Symbol('websocket'),
    EMPTY_BUFFER: Buffer.alloc(0),
    NOOP: () => {}
};
// hack-puppeteer - module.exports
const {
    BINARY_TYPES,
    GUID,
    kStatusCode,
    kWebSocket,
    EMPTY_BUFFER,
    NOOP
} = module.exports;



/*
lib https://github.com/websockets/ws/blob/6.2.1/event-target.js
*/
'use strict';

/**
  * Class representing an event.
  *
  * @private
  */
class Event {
    /**
      * Create a new `Event`.
      *
      * @param {String} type The name of the event
      * @param {Object} target A reference to the target to which the event was dispatched
      */
    constructor(type, target) {
        this.target = target;
        this.type = type;
    }
}

/**
  * Class representing a message event.
  *
  * @extends Event
  * @private
  */
class MessageEvent extends Event {
    /**
      * Create a new `MessageEvent`.
      *
      * @param {(String|Buffer|ArrayBuffer|Buffer[])} data The received data
      * @param {WebSocket} target A reference to the target to which the event was dispatched
      */
    constructor(data, target) {
        super('message', target);

        this.data = data;
    }
}

/**
  * Class representing a close event.
  *
  * @extends Event
  * @private
  */
class CloseEvent extends Event {
    /**
      * Create a new `CloseEvent`.
      *
      * @param {Number} code The status code explaining why the connection is being closed
      * @param {String} reason A human-readable string explaining why the connection is closing
      * @param {WebSocket} target A reference to the target to which the event was dispatched
      */
    constructor(code, reason, target) {
        super('close', target);

        this.wasClean = target._closeFrameReceived && target._closeFrameSent;
        this.reason = reason;
        this.code = code;
    }
}

/**
  * Class representing an open event.
  *
  * @extends Event
  * @private
  */
class OpenEvent extends Event {
    /**
      * Create a new `OpenEvent`.
      *
      * @param {WebSocket} target A reference to the target to which the event was dispatched
      */
    constructor(target) {
        super('open', target);
    }
}

/**
  * Class representing an error event.
  *
  * @extends Event
  * @private
  */
class ErrorEvent extends Event {
    /**
      * Create a new `ErrorEvent`.
      *
      * @param {Object} error The error that generated this event
      * @param {WebSocket} target A reference to the target to which the event was dispatched
      */
    constructor(error, target) {
        super('error', target);

        this.message = error.message;
        this.error = error;
    }
}

/**
  * This provides methods for emulating the `EventTarget` interface. It's not
  * meant to be used directly.
  *
  * @mixin
  */
const EventTarget = {
    /**
      * Register an event listener.
      *
      * @param {String} method A string representing the event type to listen for
      * @param {Function} listener The listener to add
      * @public
      */
    addEventListener(method, listener) {
        if (typeof listener !== 'function') return;

        function onMessage(data) {
            listener.call(this, new MessageEvent(data, this));
        }

        function onClose(code, message) {
            listener.call(this, new CloseEvent(code, message, this));
        }

        function onError(error) {
            listener.call(this, new ErrorEvent(error, this));
        }

        function onOpen() {
            listener.call(this, new OpenEvent(this));
        }

        if (method === 'message') {
            onMessage._listener = listener;
            this.on(method, onMessage);
        } else if (method === 'close') {
            onClose._listener = listener;
            this.on(method, onClose);
        } else if (method === 'error') {
            onError._listener = listener;
            this.on(method, onError);
        } else if (method === 'open') {
            onOpen._listener = listener;
            this.on(method, onOpen);
        } else {
            this.on(method, listener);
        }
    },

    /**
      * Remove an event listener.
      *
      * @param {String} method A string representing the event type to remove
      * @param {Function} listener The listener to remove
      * @public
      */
    removeEventListener(method, listener) {
        const listeners = this.listeners(method);

        for (var i = 0; i < listeners.length; i++) {
            if (listeners[i] === listener || listeners[i]._listener === listener) {
                this.removeListener(method, listeners[i]);
            }
        }
    }
};

module.exports = EventTarget;
// hack-puppeteer - module.exports
const addEventListener = EventTarget.addEventListener;
const removeEventListener = EventTarget.removeEventListener;



/*
lib https://github.com/websockets/ws/blob/6.2.1/receiver.js
*/
'use strict';

// const { Writable } = require('stream');

// const PerMessageDeflate = require('./permessage-deflate');
// hack-puppeteer - module.exports
// const {
    // BINARY_TYPES,
    // EMPTY_BUFFER,
    // kStatusCode,
    // kWebSocket
// } = require('./constants');
// const { concat, toArrayBuffer, unmask } = require('./buffer-util');
// const { isValidStatusCode, isValidUTF8 } = require('./validation');

const GET_INFO = 0;
const GET_PAYLOAD_LENGTH_16 = 1;
const GET_PAYLOAD_LENGTH_64 = 2;
const GET_MASK = 3;
const GET_DATA = 4;
const INFLATING = 5;

/**
  * HyBi Receiver implementation.
  *
  * @extends stream.Writable
  */
class Receiver extends Writable {
    /**
      * Creates a Receiver instance.
      *
      * @param {String} binaryType The type for binary data
      * @param {Object} extensions An object containing the negotiated extensions
      * @param {Number} maxPayload The maximum allowed message length
      */
    constructor(binaryType, extensions, maxPayload) {
        super();

        this._binaryType = binaryType || BINARY_TYPES[0];
        this[kWebSocket] = undefined;
        this._extensions = extensions || {};
        this._maxPayload = maxPayload | 0;

        this._bufferedBytes = 0;
        this._buffers = [];

        this._compressed = false;
        this._payloadLength = 0;
        this._mask = undefined;
        this._fragmented = 0;
        this._masked = false;
        this._fin = false;
        this._opcode = 0;

        this._totalPayloadLength = 0;
        this._messageLength = 0;
        this._fragments = [];

        this._state = GET_INFO;
        this._loop = false;
    }

    /**
      * Implements `Writable.prototype._write()`.
      *
      * @param {Buffer} chunk The chunk of data to write
      * @param {String} encoding The character encoding of `chunk`
      * @param {Function} cb Callback
      */
    _write(chunk, encoding, cb) {
        if (this._opcode === 0x08 && this._state == GET_INFO) return cb();

        this._bufferedBytes += chunk.length;
        this._buffers.push(chunk);
        this.startLoop(cb);
    }

    /**
      * Consumes `n` bytes from the buffered data.
      *
      * @param {Number} n The number of bytes to consume
      * @return {Buffer} The consumed bytes
      * @private
      */
    consume(n) {
        this._bufferedBytes -= n;

        if (n === this._buffers[0].length) return this._buffers.shift();

        if (n < this._buffers[0].length) {
            const buf = this._buffers[0];
            this._buffers[0] = buf.slice(n);
            return buf.slice(0, n);
        }

        const dst = Buffer.allocUnsafe(n);

        do {
            const buf = this._buffers[0];

            if (n >= buf.length) {
                this._buffers.shift().copy(dst, dst.length - n);
            } else {
                buf.copy(dst, dst.length - n, 0, n);
                this._buffers[0] = buf.slice(n);
            }

            n -= buf.length;
        } while (n > 0);

        return dst;
    }

    /**
      * Starts the parsing loop.
      *
      * @param {Function} cb Callback
      * @private
      */
    startLoop(cb) {
        var err;
        this._loop = true;

        do {
            switch (this._state) {
                case GET_INFO:
                    err = this.getInfo();
                    break;
                case GET_PAYLOAD_LENGTH_16:
                    err = this.getPayloadLength16();
                    break;
                case GET_PAYLOAD_LENGTH_64:
                    err = this.getPayloadLength64();
                    break;
                case GET_MASK:
                    this.getMask();
                    break;
                case GET_DATA:
                    err = this.getData(cb);
                    break;
                default:
                    // `INFLATING`
                    this._loop = false;
                    return;
            }
        } while (this._loop);

        cb(err);
    }

    /**
      * Reads the first two bytes of a frame.
      *
      * @return {(RangeError|undefined)} A possible error
      * @private
      */
    getInfo() {
        if (this._bufferedBytes < 2) {
            this._loop = false;
            return;
        }

        const buf = this.consume(2);

        if ((buf[0] & 0x30) !== 0x00) {
            this._loop = false;
            return error(RangeError, 'RSV2 and RSV3 must be clear', true, 1002);
        }

        const compressed = (buf[0] & 0x40) === 0x40;

        this._fin = (buf[0] & 0x80) === 0x80;
        this._opcode = buf[0] & 0x0f;
        this._payloadLength = buf[1] & 0x7f;

        if (this._opcode === 0x00) {
            if (compressed) {
                this._loop = false;
                return error(RangeError, 'RSV1 must be clear', true, 1002);
            }

            if (!this._fragmented) {
                this._loop = false;
                return error(RangeError, 'invalid opcode 0', true, 1002);
            }

            this._opcode = this._fragmented;
        } else if (this._opcode === 0x01 || this._opcode === 0x02) {
            if (this._fragmented) {
                this._loop = false;
                return error(RangeError, `invalid opcode ${this._opcode}`, true, 1002);
            }

            this._compressed = compressed;
        } else if (this._opcode > 0x07 && this._opcode < 0x0b) {
            if (!this._fin) {
                this._loop = false;
                return error(RangeError, 'FIN must be set', true, 1002);
            }

            if (compressed) {
                this._loop = false;
                return error(RangeError, 'RSV1 must be clear', true, 1002);
            }

            if (this._payloadLength > 0x7d) {
                this._loop = false;
                return error(
                    RangeError,
                    `invalid payload length ${this._payloadLength}`,
                    true,
                    1002
                );
            }
        } else {
            this._loop = false;
            return error(RangeError, `invalid opcode ${this._opcode}`, true, 1002);
        }

        if (!this._fin && !this._fragmented) this._fragmented = this._opcode;
        this._masked = (buf[1] & 0x80) === 0x80;

        if (this._payloadLength === 126) this._state = GET_PAYLOAD_LENGTH_16;
        else if (this._payloadLength === 127) this._state = GET_PAYLOAD_LENGTH_64;
        else return this.haveLength();
    }

    /**
      * Gets extended payload length (7+16).
      *
      * @return {(RangeError|undefined)} A possible error
      * @private
      */
    getPayloadLength16() {
        if (this._bufferedBytes < 2) {
            this._loop = false;
            return;
        }

        this._payloadLength = this.consume(2).readUInt16BE(0);
        return this.haveLength();
    }

    /**
      * Gets extended payload length (7+64).
      *
      * @return {(RangeError|undefined)} A possible error
      * @private
      */
    getPayloadLength64() {
        if (this._bufferedBytes < 8) {
            this._loop = false;
            return;
        }

        const buf = this.consume(8);
        const num = buf.readUInt32BE(0);

        //
        // The maximum safe integer in JavaScript is 2^53 - 1. An error is returned
        // if payload length is greater than this number.
        //
        if (num > Math.pow(2, 53 - 32) - 1) {
            this._loop = false;
            return error(
                RangeError,
                'Unsupported WebSocket frame: payload length > 2^53 - 1',
                false,
                1009
            );
        }

        this._payloadLength = num * Math.pow(2, 32) + buf.readUInt32BE(4);
        return this.haveLength();
    }

    /**
      * Payload length has been read.
      *
      * @return {(RangeError|undefined)} A possible error
      * @private
      */
    haveLength() {
        if (this._payloadLength && this._opcode < 0x08) {
            this._totalPayloadLength += this._payloadLength;
            if (this._totalPayloadLength > this._maxPayload && this._maxPayload > 0) {
                this._loop = false;
                return error(RangeError, 'Max payload size exceeded', false, 1009);
            }
        }

        if (this._masked) this._state = GET_MASK;
        else this._state = GET_DATA;
    }

    /**
      * Reads mask bytes.
      *
      * @private
      */
    getMask() {
        if (this._bufferedBytes < 4) {
            this._loop = false;
            return;
        }

        this._mask = this.consume(4);
        this._state = GET_DATA;
    }

    /**
      * Reads data bytes.
      *
      * @param {Function} cb Callback
      * @return {(Error|RangeError|undefined)} A possible error
      * @private
      */
    getData(cb) {
        var data = EMPTY_BUFFER;

        if (this._payloadLength) {
            if (this._bufferedBytes < this._payloadLength) {
                this._loop = false;
                return;
            }

            data = this.consume(this._payloadLength);
            if (this._masked) unmask(data, this._mask);
        }

        if (this._opcode > 0x07) return this.controlMessage(data);

        if (this._compressed) {
            this._state = INFLATING;
            this.decompress(data, cb);
            return;
        }

        if (data.length) {
            //
            // This message is not compressed so its lenght is the sum of the payload
            // length of all fragments.
            //
            this._messageLength = this._totalPayloadLength;
            this._fragments.push(data);
        }

        return this.dataMessage();
    }

    /**
      * Handles a data message.
      *
      * @return {(Error|undefined)} A possible error
      * @private
      */
    dataMessage() {
        if (this._fin) {
            const messageLength = this._messageLength;
            const fragments = this._fragments;

            this._totalPayloadLength = 0;
            this._messageLength = 0;
            this._fragmented = 0;
            this._fragments = [];

            if (this._opcode === 2) {
                var data;

                if (this._binaryType === 'nodebuffer') {
                    data = concat(fragments, messageLength);
                } else if (this._binaryType === 'arraybuffer') {
                    data = toArrayBuffer(concat(fragments, messageLength));
                } else {
                    data = fragments;
                }

                this.emit('message', data);
            } else {
                const buf = concat(fragments, messageLength);

                if (!isValidUTF8(buf)) {
                    this._loop = false;
                    return error(Error, 'invalid UTF-8 sequence', true, 1007);
                }

                this.emit('message', buf.toString());
            }
        }

        this._state = GET_INFO;
    }

    /**
      * Handles a control message.
      *
      * @param {Buffer} data Data to handle
      * @return {(Error|RangeError|undefined)} A possible error
      * @private
      */
    controlMessage(data) {
        if (this._opcode === 0x08) {
            this._loop = false;

            if (data.length === 0) {
                this.emit('conclude', 1005, '');
                this.end();
            } else if (data.length === 1) {
                return error(RangeError, 'invalid payload length 1', true, 1002);
            } else {
                const code = data.readUInt16BE(0);

                if (!isValidStatusCode(code)) {
                    return error(RangeError, `invalid status code ${code}`, true, 1002);
                }

                const buf = data.slice(2);

                if (!isValidUTF8(buf)) {
                    return error(Error, 'invalid UTF-8 sequence', true, 1007);
                }

                this.emit('conclude', code, buf.toString());
                this.end();
            }
        } else if (this._opcode === 0x09) {
            this.emit('ping', data);
        } else {
            this.emit('pong', data);
        }

        this._state = GET_INFO;
    }
}

module.exports = Receiver;

/**
  * Builds an error object.
  *
  * @param {(Error|RangeError)} ErrorCtor The error constructor
  * @param {String} message The error message
  * @param {Boolean} prefix Specifies whether or not to add a default prefix to
  *     `message`
  * @param {Number} statusCode The status code
  * @return {(Error|RangeError)} The error
  * @private
  */
function error(ErrorCtor, message, prefix, statusCode) {
    const err = new ErrorCtor(
        prefix ? `Invalid WebSocket frame: ${message}` : message
    );

    Error.captureStackTrace(err, error);
    err[kStatusCode] = statusCode;
    return err;
}



/*
lib https://github.com/websockets/ws/blob/6.2.1/sender.js
*/
'use strict';

// const { randomBytes } = require('crypto');

// const PerMessageDeflate = require('./permessage-deflate');
// const { EMPTY_BUFFER } = require('./constants');
// const { isValidStatusCode } = require('./validation');
// const { mask: applyMask, toBuffer } = require('./buffer-util');

/**
  * HyBi Sender implementation.
  */
class Sender {
    /**
      * Creates a Sender instance.
      *
      * @param {net.Socket} socket The connection socket
      * @param {Object} extensions An object containing the negotiated extensions
      */
    constructor(socket, extensions) {
        this._extensions = extensions || {};
        this._socket = socket;

        this._firstFragment = true;
        this._compress = false;

        this._bufferedBytes = 0;
        this._deflating = false;
        this._queue = [];
    }

    /**
      * Frames a piece of data according to the HyBi WebSocket protocol.
      *
      * @param {Buffer} data The data to frame
      * @param {Object} options Options object
      * @param {Number} options.opcode The opcode
      * @param {Boolean} options.readOnly Specifies whether `data` can be modified
      * @param {Boolean} options.fin Specifies whether or not to set the FIN bit
      * @param {Boolean} options.mask Specifies whether or not to mask `data`
      * @param {Boolean} options.rsv1 Specifies whether or not to set the RSV1 bit
      * @return {Buffer[]} The framed data as a list of `Buffer` instances
      * @public
      */
    static frame(data, options) {
        const merge = options.mask && options.readOnly;
        var offset = options.mask ? 6 : 2;
        var payloadLength = data.length;

        if (data.length >= 65536) {
            offset += 8;
            payloadLength = 127;
        } else if (data.length > 125) {
            offset += 2;
            payloadLength = 126;
        }

        const target = Buffer.allocUnsafe(merge ? data.length + offset : offset);

        target[0] = options.fin ? options.opcode | 0x80 : options.opcode;
        if (options.rsv1) target[0] |= 0x40;

        target[1] = payloadLength;

        if (payloadLength === 126) {
            target.writeUInt16BE(data.length, 2);
        } else if (payloadLength === 127) {
            target.writeUInt32BE(0, 2);
            target.writeUInt32BE(data.length, 6);
        }

        if (!options.mask) return [target, data];

        const mask = randomBytes(4);

        target[1] |= 0x80;
        target[offset - 4] = mask[0];
        target[offset - 3] = mask[1];
        target[offset - 2] = mask[2];
        target[offset - 1] = mask[3];

        if (merge) {
            applyMask(data, mask, target, offset, data.length);
            return [target];
        }

        applyMask(data, mask, data, 0, data.length);
        return [target, data];
    }

    /**
      * Sends a close message to the other peer.
      *
      * @param {(Number|undefined)} code The status code component of the body
      * @param {String} data The message component of the body
      * @param {Boolean} mask Specifies whether or not to mask the message
      * @param {Function} cb Callback
      * @public
      */
    close(code, data, mask, cb) {
        var buf;

        if (code === undefined) {
            buf = EMPTY_BUFFER;
        } else if (typeof code !== 'number' || !isValidStatusCode(code)) {
            throw new TypeError('First argument must be a valid error code number');
        } else if (data === undefined || data === '') {
            buf = Buffer.allocUnsafe(2);
            buf.writeUInt16BE(code, 0);
        } else {
            buf = Buffer.allocUnsafe(2 + Buffer.byteLength(data));
            buf.writeUInt16BE(code, 0);
            buf.write(data, 2);
        }

        if (this._deflating) {
            this.enqueue([this.doClose, buf, mask, cb]);
        } else {
            this.doClose(buf, mask, cb);
        }
    }

    /**
      * Frames and sends a close message.
      *
      * @param {Buffer} data The message to send
      * @param {Boolean} mask Specifies whether or not to mask `data`
      * @param {Function} cb Callback
      * @private
      */
    doClose(data, mask, cb) {
        this.sendFrame(
            Sender.frame(data, {
                fin: true,
                rsv1: false,
                opcode: 0x08,
                mask,
                readOnly: false
            }),
            cb
        );
    }

    /**
      * Sends a ping message to the other peer.
      *
      * @param {*} data The message to send
      * @param {Boolean} mask Specifies whether or not to mask `data`
      * @param {Function} cb Callback
      * @public
      */
    ping(data, mask, cb) {
        const buf = toBuffer(data);

        if (this._deflating) {
            this.enqueue([this.doPing, buf, mask, toBuffer.readOnly, cb]);
        } else {
            this.doPing(buf, mask, toBuffer.readOnly, cb);
        }
    }

    /**
      * Frames and sends a ping message.
      *
      * @param {*} data The message to send
      * @param {Boolean} mask Specifies whether or not to mask `data`
      * @param {Boolean} readOnly Specifies whether `data` can be modified
      * @param {Function} cb Callback
      * @private
      */
    doPing(data, mask, readOnly, cb) {
        this.sendFrame(
            Sender.frame(data, {
                fin: true,
                rsv1: false,
                opcode: 0x09,
                mask,
                readOnly
            }),
            cb
        );
    }

    /**
      * Sends a pong message to the other peer.
      *
      * @param {*} data The message to send
      * @param {Boolean} mask Specifies whether or not to mask `data`
      * @param {Function} cb Callback
      * @public
      */
    pong(data, mask, cb) {
        const buf = toBuffer(data);

        if (this._deflating) {
            this.enqueue([this.doPong, buf, mask, toBuffer.readOnly, cb]);
        } else {
            this.doPong(buf, mask, toBuffer.readOnly, cb);
        }
    }

    /**
      * Frames and sends a pong message.
      *
      * @param {*} data The message to send
      * @param {Boolean} mask Specifies whether or not to mask `data`
      * @param {Boolean} readOnly Specifies whether `data` can be modified
      * @param {Function} cb Callback
      * @private
      */
    doPong(data, mask, readOnly, cb) {
        this.sendFrame(
            Sender.frame(data, {
                fin: true,
                rsv1: false,
                opcode: 0x0a,
                mask,
                readOnly
            }),
            cb
        );
    }

    /**
      * Sends a data message to the other peer.
      *
      * @param {*} data The message to send
      * @param {Object} options Options object
      * @param {Boolean} options.compress Specifies whether or not to compress `data`
      * @param {Boolean} options.binary Specifies whether `data` is binary or text
      * @param {Boolean} options.fin Specifies whether the fragment is the last one
      * @param {Boolean} options.mask Specifies whether or not to mask `data`
      * @param {Function} cb Callback
      * @public
      */
    send(data, options, cb) {
        const buf = toBuffer(data);
        var opcode = options.binary ? 2 : 1;
        var rsv1 = options.compress;

        if (this._firstFragment) {
            this._firstFragment = false;
            this._compress = rsv1;
        } else {
            rsv1 = false;
            opcode = 0;
        }

        if (options.fin) this._firstFragment = true;

        this.sendFrame(
            Sender.frame(buf, {
                fin: options.fin,
                rsv1: false,
                opcode,
                mask: options.mask,
                readOnly: toBuffer.readOnly
            }),
            cb
        );
    }

    /**
      * Sends a frame.
      *
      * @param {Buffer[]} list The frame to send
      * @param {Function} cb Callback
      * @private
      */
    sendFrame(list, cb) {
        if (list.length === 2) {
            this._socket.cork();
            this._socket.write(list[0]);
            this._socket.write(list[1], cb);
            this._socket.uncork();
        } else {
            this._socket.write(list[0], cb);
        }
    }
}

module.exports = Sender;



/*
lib https://github.com/websockets/ws/blob/6.2.1/websocket.js
*/
'use strict';

// const EventEmitter = require('events');
// const crypto = require('crypto');
// const https = require('https');
// const http = require('http');
// const net = require('net');
// const tls = require('tls');
// const url = require('url');

// const PerMessageDeflate = require('./permessage-deflate');
// const EventTarget = require('./event-target');
// const extension = require('./extension');
// const Receiver = require('./receiver');
// const Sender = require('./sender');
// hack-puppeteer - module.exports
// const {
//   BINARY_TYPES,
//   EMPTY_BUFFER,
//   GUID,
//   kStatusCode,
//   kWebSocket,
//   NOOP
// } = require('./constants');

const readyStates = ['CONNECTING', 'OPEN', 'CLOSING', 'CLOSED'];
const protocolVersions = [8, 13];

/**
  * Class representing a WebSocket.
  *
  * @extends EventEmitter
  */
class WebSocket extends EventEmitter {
    /**
      * Create a new `WebSocket`.
      *
      * @param {(String|url.Url|url.URL)} address The URL to which to connect
      * @param {(String|String[])} protocols The subprotocols
      * @param {Object} options Connection options
      */
    constructor(address, protocols, options) {
        super();

        this.readyState = WebSocket.CONNECTING;
        this.protocol = '';

        this._binaryType = BINARY_TYPES[0];
        this._closeFrameReceived = false;
        this._closeFrameSent = false;
        this._closeMessage = '';
        this._closeTimer = null;
        this._closeCode = 1006;
        this._extensions = {};
        this._receiver = null;
        this._sender = null;
        this._socket = null;

        if (address !== null) {
            this._isServer = false;
            this._redirects = 0;

            if (Array.isArray(protocols)) {
                protocols = protocols.join(', ');
            } else if (typeof protocols === 'object' && protocols !== null) {
                options = protocols;
                protocols = undefined;
            }

            initAsClient(this, address, protocols, options);
        } else {
            this._isServer = true;
        }
    }

    get CONNECTING() {
        return WebSocket.CONNECTING;
    }
    get CLOSING() {
        return WebSocket.CLOSING;
    }
    get CLOSED() {
        return WebSocket.CLOSED;
    }
    get OPEN() {
        return WebSocket.OPEN;
    }

    /**
      * This deviates from the WHATWG interface since ws doesn't support the
      * required default "blob" type (instead we define a custom "nodebuffer"
      * type).
      *
      * @type {String}
      */
    get binaryType() {
        return this._binaryType;
    }

    set binaryType(type) {
        if (!BINARY_TYPES.includes(type)) return;

        this._binaryType = type;

        //
        // Allow to change `binaryType` on the fly.
        //
        if (this._receiver) this._receiver._binaryType = type;
    }

    /**
      * @type {Number}
      */
    get bufferedAmount() {
        if (!this._socket) return 0;

        //
        // `socket.bufferSize` is `undefined` if the socket is closed.
        //
        return (this._socket.bufferSize || 0) + this._sender._bufferedBytes;
    }

    /**
      * @type {String}
      */
    get extensions() {
        return Object.keys(this._extensions).join();
    }

    /**
      * Set up the socket and the internal resources.
      *
      * @param {net.Socket} socket The network socket between the server and client
      * @param {Buffer} head The first packet of the upgraded stream
      * @param {Number} maxPayload The maximum allowed message size
      * @private
      */
    setSocket(socket, head, maxPayload) {
        const receiver = new Receiver(
            this._binaryType,
            this._extensions,
            maxPayload
        );

        this._sender = new Sender(socket, this._extensions);
        this._receiver = receiver;
        this._socket = socket;

        receiver[kWebSocket] = this;
        socket[kWebSocket] = this;

        receiver.on('drain', receiverOnDrain);
        receiver.on('message', receiverOnMessage);

        socket.setTimeout(0);
        socket.setNoDelay();

        if (head.length > 0) socket.unshift(head);

        socket.on('close', socketOnClose);
        socket.on('data', socketOnData);
        socket.on('end', socketOnEnd);
        socket.on('error', socketOnError);

        this.readyState = WebSocket.OPEN;
        this.emit('open');
    }

    /**
      * Emit the `'close'` event.
      *
      * @private
      */
    emitClose() {
        this.readyState = WebSocket.CLOSED;

        if (!this._socket) {
            this.emit('close', this._closeCode, this._closeMessage);
            return;
        }

        this._receiver.removeAllListeners();
        this.emit('close', this._closeCode, this._closeMessage);
    }

    /**
      * Start a closing handshake.
      *
      *          +----------+   +-----------+   +----------+
      *     - - -|ws.close()|-->|close frame|-->|ws.close()|- - -
      *    |     +----------+   +-----------+   +----------+     |
      *          +----------+   +-----------+         |
      * CLOSING  |ws.close()|<--|close frame|<--+-----+       CLOSING
      *          +----------+   +-----------+   |
      *    |           |                        |   +---+        |
      *                +------------------------+-->|fin| - - - -
      *    |         +---+                      |   +---+
      *     - - - - -|fin|<---------------------+
      *              +---+
      *
      * @param {Number} code Status code explaining why the connection is closing
      * @param {String} data A string explaining why the connection is closing
      * @public
      */
    close(code, data) {
        if (this.readyState === WebSocket.CLOSED) return;
        if (this.readyState === WebSocket.CONNECTING) {
            const msg = 'WebSocket was closed before the connection was established';
            return abortHandshake(this, this._req, msg);
        }

        if (this.readyState === WebSocket.CLOSING) {
            if (this._closeFrameSent && this._closeFrameReceived) this._socket.end();
            return;
        }

        this.readyState = WebSocket.CLOSING;
        this._sender.close(code, data, !this._isServer, (err) => {
            //
            // This error is handled by the `'error'` listener on the socket. We only
            // want to know if the close frame has been sent here.
            //
            if (err) return;

            this._closeFrameSent = true;
            if (this._closeFrameReceived) this._socket.end();
        });

        //
        // Specify a timeout for the closing handshake to complete.
        //
        this._closeTimer = setTimeout(
            this._socket.destroy.bind(this._socket),
            timeout
        );
    }

    /**
      * Send a ping.
      *
      * @param {*} data The data to send
      * @param {Boolean} mask Indicates whether or not to mask `data`
      * @param {Function} cb Callback which is executed when the ping is sent
      * @public
      */
    ping(data, mask, cb) {
        if (typeof data === 'function') {
            cb = data;
            data = mask = undefined;
        } else if (typeof mask === 'function') {
            cb = mask;
            mask = undefined;
        }

        if (this.readyState !== WebSocket.OPEN) {
            const err = new Error(
                `WebSocket is not open: readyState ${this.readyState} ` +
                    `(${readyStates[this.readyState]})`
            );

            if (cb) return cb(err);
            throw err;
        }

        if (typeof data === 'number') data = data.toString();
        if (mask === undefined) mask = !this._isServer;
        this._sender.ping(data || EMPTY_BUFFER, mask, cb);
    }

    /**
      * Send a pong.
      *
      * @param {*} data The data to send
      * @param {Boolean} mask Indicates whether or not to mask `data`
      * @param {Function} cb Callback which is executed when the pong is sent
      * @public
      */
    pong(data, mask, cb) {
        if (typeof data === 'function') {
            cb = data;
            data = mask = undefined;
        } else if (typeof mask === 'function') {
            cb = mask;
            mask = undefined;
        }

        if (this.readyState !== WebSocket.OPEN) {
            const err = new Error(
                `WebSocket is not open: readyState ${this.readyState} ` +
                    `(${readyStates[this.readyState]})`
            );

            if (cb) return cb(err);
            throw err;
        }

        if (typeof data === 'number') data = data.toString();
        if (mask === undefined) mask = !this._isServer;
        this._sender.pong(data || EMPTY_BUFFER, mask, cb);
    }

    /**
      * Send a data message.
      *
      * @param {*} data The message to send
      * @param {Object} options Options object
      * @param {Boolean} options.compress Specifies whether or not to compress `data`
      * @param {Boolean} options.binary Specifies whether `data` is binary or text
      * @param {Boolean} options.fin Specifies whether the fragment is the last one
      * @param {Boolean} options.mask Specifies whether or not to mask `data`
      * @param {Function} cb Callback which is executed when data is written out
      * @public
      */
    send(data, options, cb) {
        if (typeof options === 'function') {
            cb = options;
            options = {};
        }

        if (this.readyState !== WebSocket.OPEN) {
            const err = new Error(
                `WebSocket is not open: readyState ${this.readyState} ` +
                    `(${readyStates[this.readyState]})`
            );

            if (cb) return cb(err);
            throw err;
        }

        if (typeof data === 'number') data = data.toString();

        const opts = Object.assign(
            {
                binary: typeof data !== 'string',
                mask: !this._isServer,
                compress: true,
                fin: true
            },
            options
        );

        this._sender.send(data || EMPTY_BUFFER, opts, cb);
    }

    /**
      * Forcibly close the connection.
      *
      * @public
      */
    terminate() {
        if (this.readyState === WebSocket.CLOSED) return;
        if (this.readyState === WebSocket.CONNECTING) {
            const msg = 'WebSocket was closed before the connection was established';
            return abortHandshake(this, this._req, msg);
        }

        if (this._socket) {
            this.readyState = WebSocket.CLOSING;
            this._socket.destroy();
        }
    }
}

readyStates.forEach((readyState, i) => {
    WebSocket[readyState] = i;
});

//
// Add the `onopen`, `onerror`, `onclose`, and `onmessage` attributes.
// See https://html.spec.whatwg.org/multipage/comms.html#the-websocket-interface
//
['open', 'error', 'close', 'message'].forEach((method) => {
    Object.defineProperty(WebSocket.prototype, `on${method}`, {
        /**
          * Return the listener of the event.
          *
          * @return {(Function|undefined)} The event listener or `undefined`
          * @public
          */
        get() {
            const listeners = this.listeners(method);
            for (var i = 0; i < listeners.length; i++) {
                if (listeners[i]._listener) return listeners[i]._listener;
            }

            return undefined;
        },
        /**
          * Add a listener for the event.
          *
          * @param {Function} listener The listener to add
          * @public
          */
        set(listener) {
            const listeners = this.listeners(method);
            for (var i = 0; i < listeners.length; i++) {
                //
                // Remove only the listeners added via `addEventListener`.
                //
                if (listeners[i]._listener) this.removeListener(method, listeners[i]);
            }
            this.addEventListener(method, listener);
        }
    });
});

WebSocket.prototype.addEventListener = EventTarget.addEventListener;
WebSocket.prototype.removeEventListener = EventTarget.removeEventListener;

module.exports = WebSocket;

/**
  * Initialize a WebSocket client.
  *
  * @param {WebSocket} websocket The client to initialize
  * @param {(String|url.Url|url.URL)} address The URL to which to connect
  * @param {String} protocols The subprotocols
  * @param {Object} options Connection options
  * @param {(Boolean|Object)} options.perMessageDeflate Enable/disable
  *     permessage-deflate
  * @param {Number} options.handshakeTimeout Timeout in milliseconds for the
  *     handshake request
  * @param {Number} options.protocolVersion Value of the `Sec-WebSocket-Version`
  *     header
  * @param {String} options.origin Value of the `Origin` or
  *     `Sec-WebSocket-Origin` header
  * @param {Number} options.maxPayload The maximum allowed message size
  * @param {Boolean} options.followRedirects Whether or not to follow redirects
  * @param {Number} options.maxRedirects The maximum number of redirects allowed
  * @private
  */
function initAsClient(websocket, address, protocols, options) {
    const opts = Object.assign(
        {
            protocolVersion: protocolVersions[1],
            maxPayload: 100 * 1024 * 1024,
            followRedirects: false,
            maxRedirects: 10
        },
        options,
        {
            createConnection: undefined,
            socketPath: undefined,
            hostname: undefined,
            protocol: undefined,
            timeout: undefined,
            method: undefined,
            auth: undefined,
            host: undefined,
            path: undefined,
            port: undefined
        }
    );

    if (!protocolVersions.includes(opts.protocolVersion)) {
        throw new RangeError(
            `Unsupported protocol version: ${opts.protocolVersion} ` +
                `(supported versions: ${protocolVersions.join(', ')})`
        );
    }

    var parsedUrl;

    if (typeof address === 'object' && address.href !== undefined) {
        parsedUrl = address;
        websocket.url = address.href;
    } else {
        //
        // The WHATWG URL constructor is not available on Node.js < 6.13.0
        //
        parsedUrl = url.URL ? new url.URL(address) : url.parse(address);
        websocket.url = address;
    }

    const isUnixSocket = parsedUrl.protocol === 'ws+unix:';

    if (!parsedUrl.host && (!isUnixSocket || !parsedUrl.pathname)) {
        throw new Error(`Invalid URL: ${websocket.url}`);
    }

    const isSecure =
        parsedUrl.protocol === 'wss:' || parsedUrl.protocol === 'https:';
    const defaultPort = isSecure ? 443 : 80;
    const key = crypto.randomBytes(16).toString('base64');
    const get = isSecure ? https.get : http.get;
    const path = parsedUrl.search
        ? `${parsedUrl.pathname || '/'}${parsedUrl.search}`
        : parsedUrl.pathname || '/';

    opts.createConnection = isSecure ? tlsConnect : netConnect;
    opts.defaultPort = opts.defaultPort || defaultPort;
    opts.port = parsedUrl.port || defaultPort;
    opts.host = parsedUrl.hostname.startsWith('[')
        ? parsedUrl.hostname.slice(1, -1)
        : parsedUrl.hostname;
    opts.headers = Object.assign(
        {
            'Sec-WebSocket-Version': opts.protocolVersion,
            'Sec-WebSocket-Key': key,
            Connection: 'Upgrade',
            Upgrade: 'websocket'
        },
        opts.headers
    );
    opts.path = path;
    opts.timeout = opts.handshakeTimeout;

    if (protocols) {
        opts.headers['Sec-WebSocket-Protocol'] = protocols;
    }
    if (opts.origin) {
        if (opts.protocolVersion < 13) {
            opts.headers['Sec-WebSocket-Origin'] = opts.origin;
        } else {
            opts.headers.Origin = opts.origin;
        }
    }
    if (parsedUrl.auth) {
        opts.auth = parsedUrl.auth;
    } else if (parsedUrl.username || parsedUrl.password) {
        opts.auth = `${parsedUrl.username}:${parsedUrl.password}`;
    }

    if (isUnixSocket) {
        const parts = path.split(':');

        opts.socketPath = parts[0];
        opts.path = parts[1];
    }

    var req = (websocket._req = get(opts));

    if (opts.timeout) {
        req.on('timeout', () => {
            abortHandshake(websocket, req, 'Opening handshake has timed out');
        });
    }

    req.on('error', (err) => {
        if (websocket._req.aborted) return;

        req = websocket._req = null;
        websocket.readyState = WebSocket.CLOSING;
        websocket.emit('error', err);
        websocket.emitClose();
    });

    req.on('response', (res) => {
        const location = res.headers.location;
        const statusCode = res.statusCode;

        if (
            location &&
            opts.followRedirects &&
            statusCode >= 300 &&
            statusCode < 400
        ) {
            if (++websocket._redirects > opts.maxRedirects) {
                abortHandshake(websocket, req, 'Maximum redirects exceeded');
                return;
            }

            req.abort();

            const addr = url.URL
                ? new url.URL(location, address)
                : url.resolve(address, location);

            initAsClient(websocket, addr, protocols, options);
        } else if (!websocket.emit('unexpected-response', req, res)) {
            abortHandshake(
                websocket,
                req,
                `Unexpected server response: ${res.statusCode}`
            );
        }
    });

    req.on('upgrade', (res, socket, head) => {
        websocket.emit('upgrade', res);

        //
        // The user may have closed the connection from a listener of the `upgrade`
        // event.
        //
        if (websocket.readyState !== WebSocket.CONNECTING) return;

        req = websocket._req = null;

        const digest = crypto
            .createHash('sha1')
            .update(key + GUID)
            .digest('base64');

        if (res.headers['sec-websocket-accept'] !== digest) {
            abortHandshake(websocket, socket, 'Invalid Sec-WebSocket-Accept header');
            return;
        }

        const serverProt = res.headers['sec-websocket-protocol'];
        const protList = (protocols || '').split(/, */);
        var protError;

        if (!protocols && serverProt) {
            protError = 'Server sent a subprotocol but none was requested';
        } else if (protocols && !serverProt) {
            protError = 'Server sent no subprotocol';
        } else if (serverProt && !protList.includes(serverProt)) {
            protError = 'Server sent an invalid subprotocol';
        }

        if (protError) {
            abortHandshake(websocket, socket, protError);
            return;
        }

        if (serverProt) websocket.protocol = serverProt;

        websocket.setSocket(socket, head, opts.maxPayload);
    });
}

/**
  * Create a `net.Socket` and initiate a connection.
  *
  * @param {Object} options Connection options
  * @return {net.Socket} The newly created socket used to start the connection
  * @private
  */
function netConnect(options) {
    //
    // Override `options.path` only if `options` is a copy of the original options
    // object. This is always true on Node.js >= 8 but not on Node.js 6 where
    // `options.socketPath` might be `undefined` even if the `socketPath` option
    // was originally set.
    //
    if (options.protocolVersion) options.path = options.socketPath;
    return net.connect(options);
}

/**
  * The listener of the `Receiver` `'drain'` event.
  *
  * @private
  */
function receiverOnDrain() {
    this[kWebSocket]._socket.resume();
}

/**
  * The listener of the `Receiver` `'message'` event.
  *
  * @param {(String|Buffer|ArrayBuffer|Buffer[])} data The message
  * @private
  */
function receiverOnMessage(data) {
    this[kWebSocket].emit('message', data);
}

/**
  * The listener of the `net.Socket` `'close'` event.
  *
  * @private
  */
function socketOnClose() {
    const websocket = this[kWebSocket];

    this.removeListener('close', socketOnClose);
    this.removeListener('end', socketOnEnd);

    websocket.readyState = WebSocket.CLOSING;

    //
    // The close frame might not have been received or the `'end'` event emitted,
    // for example, if the socket was destroyed due to an error. Ensure that the
    // `receiver` stream is closed after writing any remaining buffered data to
    // it. If the readable side of the socket is in flowing mode then there is no
    // buffered data as everything has been already written and `readable.read()`
    // will return `null`. If instead, the socket is paused, any possible buffered
    // data will be read as a single chunk and emitted synchronously in a single
    // `'data'` event.
    //
    websocket._socket.read();
    websocket._receiver.end();

    this.removeListener('data', socketOnData);
    this[kWebSocket] = undefined;

    clearTimeout(websocket._closeTimer);

    if (
        websocket._receiver._writableState.finished ||
        websocket._receiver._writableState.errorEmitted
    ) {
        websocket.emitClose();
    } else {
        websocket._receiver.on('error', receiverOnFinish);
        websocket._receiver.on('finish', receiverOnFinish);
    }
}

/**
  * The listener of the `net.Socket` `'data'` event.
  *
  * @param {Buffer} chunk A chunk of data
  * @private
  */
function socketOnData(chunk) {
    if (!this[kWebSocket]._receiver.write(chunk)) {
        this.pause();
    }
}

/**
  * The listener of the `net.Socket` `'end'` event.
  *
  * @private
  */
function socketOnEnd() {
    const websocket = this[kWebSocket];

    websocket.readyState = WebSocket.CLOSING;
    websocket._receiver.end();
    this.end();
}

/**
  * The listener of the `net.Socket` `'error'` event.
  *
  * @private
  */
function socketOnError() {
    const websocket = this[kWebSocket];

    this.removeListener('error', socketOnError);
    this.on('error', NOOP);

    websocket.readyState = WebSocket.CLOSING;
    this.destroy();
}



/*
lib https://github.com/websockets/ws/blob/6.2.1/index.js
*/
'use strict';

// const WebSocket = require('./lib/websocket');

// hack-puppeteer - module.exports
WebSocket.Receiver = Receiver;
WebSocket.Sender = Sender.js;

module.exports = WebSocket;



/*
file https://github.com/GoogleChrome/puppeteer/tree/v1.19.0
*/
// require('./Accessibility') // Accessibility,
// require('./Accessibility') // const {Accessibility} = require('./Accessibility');
// require('./Browser') // Browser,
// require('./Browser') // BrowserContext,
// require('./Browser') // const {Browser} = require('./Browser');
// require('./BrowserFetcher') // BrowserFetcher,
// require('./BrowserFetcher') // const BrowserFetcher = require('./BrowserFetcher');
// require('./Connection') // CDPSession,
// require('./Connection') // const {Connection} = require('./Connection');
// require('./Coverage') // Coverage,
// require('./Coverage') // const {Coverage} = require('./Coverage');
// require('./DOMWorld') // const {DOMWorld} = require('./DOMWorld');
// require('./DeviceDescriptors') // const DeviceDescriptors = require('./DeviceDescriptors');
// require('./Dialog') // Dialog,
// require('./Dialog') // const {Dialog} = require('./Dialog');
// require('./EmulationManager') // const {EmulationManager} = require('./EmulationManager');
// require('./Errors') // TimeoutError,
// require('./Errors') // const Errors = require('./Errors');
// require('./Errors') // const {TimeoutError} = require('./Errors');
// require('./Events') // const {Events} = require('./Events');
// require('./ExecutionContext') // ExecutionContext,
// require('./ExecutionContext') // const {EVALUATION_SCRIPT_URL} = require('./ExecutionContext');
// require('./ExecutionContext') // const {ExecutionContext, EVALUATION_SCRIPT_URL} = require('./ExecutionContext');
// require('./ExecutionContext') // const {ExecutionContext} = require('./ExecutionContext');
// require('./FrameManager') // Frame,
// require('./FrameManager') // const {FrameManager} = require('./FrameManager');
// require('./Input') // Keyboard,
// require('./Input') // Mouse,
// require('./Input') // Touchscreen,
// require('./Input') // const {Keyboard, Mouse, Touchscreen} = require('./Input');
// require('./Launcher') // const Launcher = require('./Launcher');
// require('./LifecycleWatcher') // const {LifecycleWatcher} = require('./LifecycleWatcher');
// require('./NetworkManager') // Request,
// require('./NetworkManager') // Response,
// require('./NetworkManager') // SecurityDetails,
// require('./NetworkManager') // const {NetworkManager} = require('./NetworkManager');
// require('./Page') // ConsoleMessage,
// require('./Page') // FileChooser,
// require('./Page') // Page,
// require('./Page') // const {Page} = require('./Page');
// require('./PipeTransport') // const PipeTransport = require('./PipeTransport');
// require('./Puppeteer') // Puppeteer,
// require('./Target') // Target,
// require('./Target') // const {Target} = require('./Target');
// require('./TaskQueue') // const {TaskQueue} = require('./TaskQueue');
// require('./Tracing') // Tracing,
// require('./Tracing') // const Tracing = require('./Tracing');
// require('./USKeyboardLayout') // const keyDefinitions = require('./USKeyboardLayout');
// require('./WebSocketTransport') // const WebSocketTransport = require('./WebSocketTransport');
// require('./Worker') // Worker,
// require('./Worker') // const {Worker} = require('./Worker');
// require('./helper') // const { helper, assert } = require('./helper');
// require('./helper') // const {assert} = require('./helper');
// require('./helper') // const {debugError} = require('./helper');
// require('./helper') // const {helper, assert, debugError} = require('./helper');
// require('./helper') // const {helper, assert} = require('./helper');
// require('./helper') // const {helper, debugError, assert} = require('./helper');
// require('./helper') // const {helper, debugError} = require('./helper');
// require('./lib/Puppeteer') // const Puppeteer = asyncawait ? require('./lib/Puppeteer') : require('./node6/lib/Puppeteer');
// require('./lib/api') // const api = require('./lib/api');
// require('./lib/helper') // const {helper} = require('./lib/helper');
// require('./package.json') // const packageJson = require('./package.json');
// require('child_process') // const childProcess = require('child_process');
// require('debug') // const debugError = require('debug')(`puppeteer:error`);
// require('debug') // const debugProtocol = require('debug')('puppeteer:protocol');
// require('events') // const EventEmitter = require('events');
// require('extract-zip') // const extract = require('extract-zip');
// require('fs') // const fs = require('fs');
// require('http') // const http = require('http');
// require('http') // require('http').request(options, requestCallback);
// require('https') // const https = require('https');
// require('https') // require('https').request(options, requestCallback) :
// require('https-proxy-agent') // const ProxyAgent = require('https-proxy-agent');
// require('mime') // const mime = require('mime');
// require('os') // const os = require('os');
// require('path') // const path = require('path');
// require('proxy-from-env') // const getProxyForUrl = require('proxy-from-env').getProxyForUrl;
// require('readline') // const readline = require('readline');
// require('rimraf') // const removeFolder = require('rimraf');
// require('rimraf') // const removeRecursive = require('rimraf');
// require('url') // const URL = require('url');
// require('util') // const util = require('util');
// require('ws') // const WebSocket = require('ws');



/*
lib https://github.com/GoogleChrome/puppeteer/blob/v1.19.0/package.json
*/
// hack-puppeteer - module.exports
const packageJson = {
    "name": "puppeteer",
    "version": "1.19.0",
    "description": "A high-level API to control headless Chrome over the DevTools Protocol",
    "main": "index.js",
    "repository": "github:GoogleChrome/puppeteer",
    "engines": {
        "node": ">=6.4.0"
    },
    "puppeteer": {
        "chromium_revision": "674921"
    },
    "scripts": {
        "unit": "node test/test.js",
        "funit": "BROWSER=firefox node test/test.js",
        "debug-unit": "node --inspect-brk test/test.js",
        "test-doclint": "node utils/doclint/check_public_api/test/test.js && node utils/doclint/preprocessor/test.js",
        "test": "npm run lint --silent && npm run coverage && npm run test-doclint && npm run test-node6-transformer && npm run test-types",
        "install": "node install.js",
        "lint": "([ \"$CI\" = true ] && eslint --quiet -f codeframe . || eslint .) && npm run tsc && npm run doc",
        "doc": "node utils/doclint/cli.js",
        "coverage": "cross-env COVERAGE=true npm run unit",
        "test-node6-transformer": "node utils/node6-transform/test/test.js",
        "build": "node utils/node6-transform/index.js && node utils/doclint/generate_types",
        "unit-node6": "node node6/test/test.js",
        "tsc": "tsc -p .",
        "prepublishOnly": "npm run build",
        "apply-next-version": "node utils/apply_next_version.js",
        "bundle": "npx browserify -r ./index.js:puppeteer -o utils/browser/puppeteer-web.js",
        "test-types": "node utils/doclint/generate_types && npx -p typescript@2.1 tsc -p utils/doclint/generate_types/test/",
        "unit-bundle": "node utils/browser/test.js"
    },
    "author": "The Chromium Authors",
    "license": "Apache-2.0",
    "dependencies": {
        "debug": "^4.1.0",
        "extract-zip": "^1.6.6",
        "https-proxy-agent": "^2.2.1",
        "mime": "^2.0.3",
        "progress": "^2.0.1",
        "proxy-from-env": "^1.0.0",
        "rimraf": "^2.6.1",
        "ws": "^6.1.0"
    },
    "devDependencies": {
        "@types/debug": "0.0.31",
        "@types/extract-zip": "^1.6.2",
        "@types/mime": "^2.0.0",
        "@types/node": "^8.10.34",
        "@types/rimraf": "^2.0.2",
        "@types/ws": "^6.0.1",
        "commonmark": "^0.28.1",
        "cross-env": "^5.0.5",
        "eslint": "^5.15.1",
        "esprima": "^4.0.0",
        "jpeg-js": "^0.3.4",
        "minimist": "^1.2.0",
        "ncp": "^2.0.0",
        "pixelmatch": "^4.0.2",
        "pngjs": "^3.3.3",
        "text-diff": "^1.0.1",
        "typescript": "3.2.2"
    },
    "browser": {
        "./lib/BrowserFetcher.js": false,
        "./node6/lib/Puppeteer": false,
        "ws": "./utils/browser/WebSocket",
        "fs": false,
        "child_process": false,
        "rimraf": false,
        "readline": false
    }
}



/*
lib https://github.com/GoogleChrome/puppeteer/blob/v1.19.0/helper.js
*/
/**
  * Copyright 2017 Google Inc. All rights reserved.
  *
  * Licensed under the Apache License, Version 2.0 (the "License");
  * you may not use this file except in compliance with the License.
  * You may obtain a copy of the License at
  *
  *     http://www.apache.org/licenses/LICENSE-2.0
  *
  * Unless required by applicable law or agreed to in writing, software
  * distributed under the License is distributed on an "AS IS" BASIS,
  * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  * See the License for the specific language governing permissions and
  * limitations under the License.
  */
// const {TimeoutError} = require('./Errors');
// const debugError = require('debug')(`puppeteer:error`);
// const fs = require('fs');

class Helper {
    /**
      * @param {!Protocol.Runtime.RemoteObject} remoteObject
      * @return {*}
      */
    static valueFromRemoteObject(remoteObject) {
        assert(!remoteObject.objectId, 'Cannot extract value when objectId is given');
        if (remoteObject.unserializableValue) {
            if (remoteObject.type === 'bigint' && typeof BigInt !== 'undefined')
                return BigInt(remoteObject.unserializableValue.replace('n', ''));
            switch (remoteObject.unserializableValue) {
                case '-0':
                    return -0;
                case 'NaN':
                    return NaN;
                case 'Infinity':
                    return Infinity;
                case '-Infinity':
                    return -Infinity;
                default:
                    throw new Error('Unsupported unserializable value: ' + remoteObject.unserializableValue);
            }
        }
        return remoteObject.value;
    }

    /**
      * @param {!NodeJS.EventEmitter} emitter
      * @param {(string|symbol)} eventName
      * @param {function(?):void} handler
      * @return {{emitter: !NodeJS.EventEmitter, eventName: (string|symbol), handler: function(?)}}
      */
    static addEventListener(emitter, eventName, handler) {
        emitter.on(eventName, handler);
        return { emitter, eventName, handler };
    }

    /**
      * @param {!Array<{emitter: !NodeJS.EventEmitter, eventName: (string|symbol), handler: function(?):void}>} listeners
      */
    static removeEventListeners(listeners) {
        for (const listener of listeners)
            listener.emitter.removeListener(listener.eventName, listener.handler);
        listeners.splice(0, listeners.length);
    }

    /**
      * @param {!Object} obj
      * @return {boolean}
      */
    static isString(obj) {
        return typeof obj === 'string' || obj instanceof String;
    }

    /**
      * @param {!Object} obj
      * @return {boolean}
      */
    static isNumber(obj) {
        return typeof obj === 'number' || obj instanceof Number;
    }

    static promisify(nodeFunction) {
        function promisified(...args) {
            return new Promise((resolve, reject) => {
                function callback(err, ...result) {
                    if (err)
                        return reject(err);
                    if (result.length === 1)
                        return resolve(result[0]);
                    return resolve(result);
                }
                nodeFunction.call(null, ...args, callback);
            });
        }
        return promisified;
    }

}

const openAsync = Helper.promisify(fs.open);
const writeAsync = Helper.promisify(fs.write);
const closeAsync = Helper.promisify(fs.close);

/**
  * @param {*} value
  * @param {string=} message
  */
function assert(value, message) {
    if (!value)
        throw new Error(message);
}

module.exports = {
    helper: Helper,
    assert,
    debugError
};
// hack-puppeteer - module.exports
const helper = Helper;



/*
lib https://github.com/GoogleChrome/puppeteer/blob/v1.19.0/Accessibility.js
*/
/**
  * Copyright 2018 Google Inc. All rights reserved.
  *
  * Licensed under the Apache License, Version 2.0 (the 'License');
  * you may not use this file except in compliance with the License.
  * You may obtain a copy of the License at
  *
  *     http://www.apache.org/licenses/LICENSE-2.0
  *
  * Unless required by applicable law or agreed to in writing, software
  * distributed under the License is distributed on an 'AS IS' BASIS,
  * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  * See the License for the specific language governing permissions and
  * limitations under the License.
  */

/**
  * @typedef {Object} SerializedAXNode
  * @property {string} role
  *
  * @property {string=} name
  * @property {string|number=} value
  * @property {string=} description
  *
  * @property {string=} keyshortcuts
  * @property {string=} roledescription
  * @property {string=} valuetext
  *
  * @property {boolean=} disabled
  * @property {boolean=} expanded
  * @property {boolean=} focused
  * @property {boolean=} modal
  * @property {boolean=} multiline
  * @property {boolean=} multiselectable
  * @property {boolean=} readonly
  * @property {boolean=} required
  * @property {boolean=} selected
  *
  * @property {boolean|"mixed"=} checked
  * @property {boolean|"mixed"=} pressed
  *
  * @property {number=} level
  * @property {number=} valuemin
  * @property {number=} valuemax
  *
  * @property {string=} autocomplete
  * @property {string=} haspopup
  * @property {string=} invalid
  * @property {string=} orientation
  *
  * @property {Array<SerializedAXNode>=} children
  */

class Accessibility {
    /**
      * @param {!Puppeteer.CDPSession} client
      */
    constructor(client) {
        this._client = client;
    }

    /**
      * @param {{interestingOnly?: boolean, root?: ?Puppeteer.ElementHandle}=} options
      * @return {!Promise<!SerializedAXNode>}
      */
    async snapshot(options = {}) {
        const {
            interestingOnly = true,
            root = null,
        } = options;
        const {nodes} = await this._client.send('Accessibility.getFullAXTree');
        let backendNodeId = null;
        if (root) {
            const {node} = await this._client.send('DOM.describeNode', {objectId: root._remoteObject.objectId});
            backendNodeId = node.backendNodeId;
        }
        const defaultRoot = AXNode.createTree(nodes);
        let needle = defaultRoot;
        if (backendNodeId) {
            needle = defaultRoot.find(node => node._payload.backendDOMNodeId === backendNodeId);
            if (!needle)
                return null;
        }
        if (!interestingOnly)
            return serializeTree(needle)[0];

        /** @type {!Set<!AXNode>} */
        const interestingNodes = new Set();
        collectInterestingNodes(interestingNodes, defaultRoot, false);
        if (!interestingNodes.has(needle))
            return null;
        return serializeTree(needle, interestingNodes)[0];
    }
}

/**
  * @param {!Set<!AXNode>} collection
  * @param {!AXNode} node
  * @param {boolean} insideControl
  */
function collectInterestingNodes(collection, node, insideControl) {
    if (node.isInteresting(insideControl))
        collection.add(node);
    if (node.isLeafNode())
        return;
    insideControl = insideControl || node.isControl();
    for (const child of node._children)
        collectInterestingNodes(collection, child, insideControl);
}

/**
  * @param {!AXNode} node
  * @param {!Set<!AXNode>=} whitelistedNodes
  * @return {!Array<!SerializedAXNode>}
  */
function serializeTree(node, whitelistedNodes) {
    /** @type {!Array<!SerializedAXNode>} */
    const children = [];
    for (const child of node._children)
        children.push(...serializeTree(child, whitelistedNodes));

    if (whitelistedNodes && !whitelistedNodes.has(node))
        return children;

    const serializedNode = node.serialize();
    if (children.length)
        serializedNode.children = children;
    return [serializedNode];
}


class AXNode {
    /**
      * @param {!Protocol.Accessibility.AXNode} payload
      */
    constructor(payload) {
        this._payload = payload;

        /** @type {!Array<!AXNode>} */
        this._children = [];

        this._richlyEditable = false;
        this._editable = false;
        this._focusable = false;
        this._expanded = false;
        this._name = this._payload.name ? this._payload.name.value : '';
        this._role = this._payload.role ? this._payload.role.value : 'Unknown';
        this._cachedHasFocusableChild;

        for (const property of this._payload.properties || []) {
            if (property.name === 'editable') {
                this._richlyEditable = property.value.value === 'richtext';
                this._editable = true;
            }
            if (property.name === 'focusable')
                this._focusable = property.value.value;
            if (property.name === 'expanded')
                this._expanded = property.value.value;
        }
    }

    /**
      * @return {boolean}
      */
    _isPlainTextField() {
        if (this._richlyEditable)
            return false;
        if (this._editable)
            return true;
        return this._role === 'textbox' || this._role === 'ComboBox' || this._role === 'searchbox';
    }

    /**
      * @return {boolean}
      */
    _isTextOnlyObject() {
        const role = this._role;
        return (role === 'LineBreak' || role === 'text' ||
                        role === 'InlineTextBox');
    }

    /**
      * @return {boolean}
      */
    _hasFocusableChild() {
        if (this._cachedHasFocusableChild === undefined) {
            this._cachedHasFocusableChild = false;
            for (const child of this._children) {
                if (child._focusable || child._hasFocusableChild()) {
                    this._cachedHasFocusableChild = true;
                    break;
                }
            }
        }
        return this._cachedHasFocusableChild;
    }

    /**
      * @param {function(AXNode):boolean} predicate
      * @return {?AXNode}
      */
    find(predicate) {
        if (predicate(this))
            return this;
        for (const child of this._children) {
            const result = child.find(predicate);
            if (result)
                return result;
        }
        return null;
    }

    /**
      * @return {boolean}
      */
    isLeafNode() {
        if (!this._children.length)
            return true;

        // These types of objects may have children that we use as internal
        // implementation details, but we want to expose them as leaves to platform
        // accessibility APIs because screen readers might be confused if they find
        // any children.
        if (this._isPlainTextField() || this._isTextOnlyObject())
            return true;

        // Roles whose children are only presentational according to the ARIA and
        // HTML5 Specs should be hidden from screen readers.
        // (Note that whilst ARIA buttons can have only presentational children, HTML5
        // buttons are allowed to have content.)
        switch (this._role) {
            case 'doc-cover':
            case 'graphics-symbol':
            case 'img':
            case 'Meter':
            case 'scrollbar':
            case 'slider':
            case 'separator':
            case 'progressbar':
                return true;
            default:
                break;
        }

        // Here and below: Android heuristics
        if (this._hasFocusableChild())
            return false;
        if (this._focusable && this._name)
            return true;
        if (this._role === 'heading' && this._name)
            return true;
        return false;
    }

    /**
      * @return {boolean}
      */
    isControl() {
        switch (this._role) {
            case 'button':
            case 'checkbox':
            case 'ColorWell':
            case 'combobox':
            case 'DisclosureTriangle':
            case 'listbox':
            case 'menu':
            case 'menubar':
            case 'menuitem':
            case 'menuitemcheckbox':
            case 'menuitemradio':
            case 'radio':
            case 'scrollbar':
            case 'searchbox':
            case 'slider':
            case 'spinbutton':
            case 'switch':
            case 'tab':
            case 'textbox':
            case 'tree':
                return true;
            default:
                return false;
        }
    }

    /**
      * @param {boolean} insideControl
      * @return {boolean}
      */
    isInteresting(insideControl) {
        const role = this._role;
        if (role === 'Ignored')
            return false;

        if (this._focusable || this._richlyEditable)
            return true;

        // If it's not focusable but has a control role, then it's interesting.
        if (this.isControl())
            return true;

        // A non focusable child of a control is not interesting
        if (insideControl)
            return false;

        return this.isLeafNode() && !!this._name;
    }

    /**
      * @return {!SerializedAXNode}
      */
    serialize() {
        /** @type {!Map<string, number|string|boolean>} */
        const properties = new Map();
        for (const property of this._payload.properties || [])
            properties.set(property.name.toLowerCase(), property.value.value);
        if (this._payload.name)
            properties.set('name', this._payload.name.value);
        if (this._payload.value)
            properties.set('value', this._payload.value.value);
        if (this._payload.description)
            properties.set('description', this._payload.description.value);

        /** @type {SerializedAXNode} */
        const node = {
            role: this._role
        };

        /** @type {!Array<keyof SerializedAXNode>} */
        const userStringProperties = [
            'name',
            'value',
            'description',
            'keyshortcuts',
            'roledescription',
            'valuetext',
        ];
        for (const userStringProperty of userStringProperties) {
            if (!properties.has(userStringProperty))
                continue;
            node[userStringProperty] = properties.get(userStringProperty);
        }

        /** @type {!Array<keyof SerializedAXNode>} */
        const booleanProperties = [
            'disabled',
            'expanded',
            'focused',
            'modal',
            'multiline',
            'multiselectable',
            'readonly',
            'required',
            'selected',
        ];
        for (const booleanProperty of booleanProperties) {
            // WebArea's treat focus differently than other nodes. They report whether their frame  has focus,
            // not whether focus is specifically on the root node.
            if (booleanProperty === 'focused' && this._role === 'WebArea')
                continue;
            const value = properties.get(booleanProperty);
            if (!value)
                continue;
            node[booleanProperty] = value;
        }

        /** @type {!Array<keyof SerializedAXNode>} */
        const tristateProperties = [
            'checked',
            'pressed',
        ];
        for (const tristateProperty of tristateProperties) {
            if (!properties.has(tristateProperty))
                continue;
            const value = properties.get(tristateProperty);
            node[tristateProperty] = value === 'mixed' ? 'mixed' : value === 'true' ? true : false;
        }
        /** @type {!Array<keyof SerializedAXNode>} */
        const numericalProperties = [
            'level',
            'valuemax',
            'valuemin',
        ];
        for (const numericalProperty of numericalProperties) {
            if (!properties.has(numericalProperty))
                continue;
            node[numericalProperty] = properties.get(numericalProperty);
        }
        /** @type {!Array<keyof SerializedAXNode>} */
        const tokenProperties = [
            'autocomplete',
            'haspopup',
            'invalid',
            'orientation',
        ];
        for (const tokenProperty of tokenProperties) {
            const value = properties.get(tokenProperty);
            if (!value || value === 'false')
                continue;
            node[tokenProperty] = value;
        }
        return node;
    }

    /**
      * @param {!Array<!Protocol.Accessibility.AXNode>} payloads
      * @return {!AXNode}
      */
    static createTree(payloads) {
        /** @type {!Map<string, !AXNode>} */
        const nodeById = new Map();
        for (const payload of payloads)
            nodeById.set(payload.nodeId, new AXNode(payload));
        for (const node of nodeById.values()) {
            for (const childId of node._payload.childIds || [])
                node._children.push(nodeById.get(childId));
        }
        return nodeById.values().next().value;
    }
}

module.exports = {Accessibility};



/*
lib https://github.com/GoogleChrome/puppeteer/blob/v1.19.0/Browser.js
*/
/**
  * Copyright 2017 Google Inc. All rights reserved.
  *
  * Licensed under the Apache License, Version 2.0 (the "License");
  * you may not use this file except in compliance with the License.
  * You may obtain a copy of the License at
  *
  *     http://www.apache.org/licenses/LICENSE-2.0
  *
  * Unless required by applicable law or agreed to in writing, software
  * distributed under the License is distributed on an "AS IS" BASIS,
  * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  * See the License for the specific language governing permissions and
  * limitations under the License.
  */

// const { helper, assert } = require('./helper');
// const {Target} = require('./Target');
// const EventEmitter = require('events');
// const {TaskQueue} = require('./TaskQueue');
// const {Events} = require('./Events');

class Browser extends EventEmitter {
    /**
      * @param {!Puppeteer.Connection} connection
      * @param {!Array<string>} contextIds
      * @param {boolean} ignoreHTTPSErrors
      * @param {?Puppeteer.Viewport} defaultViewport
      * @param {?Puppeteer.ChildProcess} process
      * @param {function()=} closeCallback
      */
    static async create(connection, contextIds, ignoreHTTPSErrors, defaultViewport, process, closeCallback) {
        const browser = new Browser(connection, contextIds, ignoreHTTPSErrors, defaultViewport, process, closeCallback);
        await connection.send('Target.setDiscoverTargets', {discover: true});
        return browser;
    }

    /**
      * @param {!Puppeteer.Connection} connection
      * @param {!Array<string>} contextIds
      * @param {boolean} ignoreHTTPSErrors
      * @param {?Puppeteer.Viewport} defaultViewport
      * @param {?Puppeteer.ChildProcess} process
      * @param {(function():Promise)=} closeCallback
      */
    constructor(connection, contextIds, ignoreHTTPSErrors, defaultViewport, process, closeCallback) {
        super();
        this._ignoreHTTPSErrors = ignoreHTTPSErrors;
        this._defaultViewport = defaultViewport;
        this._process = process;
        this._screenshotTaskQueue = new TaskQueue();
        this._connection = connection;
        this._closeCallback = closeCallback || new Function();

        this._defaultContext = new BrowserContext(this._connection, this, null);
        /** @type {Map<string, BrowserContext>} */
        this._contexts = new Map();
        for (const contextId of contextIds)
            this._contexts.set(contextId, new BrowserContext(this._connection, this, contextId));

        /** @type {Map<string, Target>} */
        this._targets = new Map();
        this._connection.on(Events.Connection.Disconnected, () => this.emit(Events.Browser.Disconnected));
        this._connection.on('Target.targetCreated', this._targetCreated.bind(this));
        this._connection.on('Target.targetDestroyed', this._targetDestroyed.bind(this));
        this._connection.on('Target.targetInfoChanged', this._targetInfoChanged.bind(this));
    }

    /**
      * @return {?Puppeteer.ChildProcess}
      */
    process() {
        return this._process;
    }

    /**
      * @return {!Promise<!BrowserContext>}
      */
    async createIncognitoBrowserContext() {
        const {browserContextId} = await this._connection.send('Target.createBrowserContext');
        const context = new BrowserContext(this._connection, this, browserContextId);
        this._contexts.set(browserContextId, context);
        return context;
    }

    /**
      * @return {!Array<!BrowserContext>}
      */
    browserContexts() {
        return [this._defaultContext, ...Array.from(this._contexts.values())];
    }

    /**
      * @return {!BrowserContext}
      */
    defaultBrowserContext() {
        return this._defaultContext;
    }

    /**
      * @param {?string} contextId
      */
    async _disposeContext(contextId) {
        await this._connection.send('Target.disposeBrowserContext', {browserContextId: contextId || undefined});
        this._contexts.delete(contextId);
    }

    /**
      * @param {!Protocol.Target.targetCreatedPayload} event
      */
    async _targetCreated(event) {
        const targetInfo = event.targetInfo;
        const {browserContextId} = targetInfo;
        const context = (browserContextId && this._contexts.has(browserContextId)) ? this._contexts.get(browserContextId) : this._defaultContext;

        const target = new Target(targetInfo, context, () => this._connection.createSession(targetInfo), this._ignoreHTTPSErrors, this._defaultViewport, this._screenshotTaskQueue);
        assert(!this._targets.has(event.targetInfo.targetId), 'Target should not exist before targetCreated');
        this._targets.set(event.targetInfo.targetId, target);

        if (await target._initializedPromise) {
            this.emit(Events.Browser.TargetCreated, target);
            context.emit(Events.BrowserContext.TargetCreated, target);
        }
    }

    /**
      * @param {{targetId: string}} event
      */
    async _targetDestroyed(event) {
        const target = this._targets.get(event.targetId);
        target._initializedCallback(false);
        this._targets.delete(event.targetId);
        target._closedCallback();
        if (await target._initializedPromise) {
            this.emit(Events.Browser.TargetDestroyed, target);
            target.browserContext().emit(Events.BrowserContext.TargetDestroyed, target);
        }
    }

    /**
      * @param {!Protocol.Target.targetInfoChangedPayload} event
      */
    _targetInfoChanged(event) {
        const target = this._targets.get(event.targetInfo.targetId);
        assert(target, 'target should exist before targetInfoChanged');
        const previousURL = target.url();
        const wasInitialized = target._isInitialized;
        target._targetInfoChanged(event.targetInfo);
        if (wasInitialized && previousURL !== target.url()) {
            this.emit(Events.Browser.TargetChanged, target);
            target.browserContext().emit(Events.BrowserContext.TargetChanged, target);
        }
    }

    /**
      * @return {string}
      */
    wsEndpoint() {
        return this._connection.url();
    }

    /**
      * @return {!Promise<!Puppeteer.Page>}
      */
    async newPage() {
        return this._defaultContext.newPage();
    }

    /**
      * @param {?string} contextId
      * @return {!Promise<!Puppeteer.Page>}
      */
    async _createPageInContext(contextId) {
        const {targetId} = await this._connection.send('Target.createTarget', {url: 'about:blank', browserContextId: contextId || undefined});
        const target = await this._targets.get(targetId);
        assert(await target._initializedPromise, 'Failed to create target for page');
        const page = await target.page();
        return page;
    }

    /**
      * @return {!Array<!Target>}
      */
    targets() {
        return Array.from(this._targets.values()).filter(target => target._isInitialized);
    }

    /**
      * @return {!Target}
      */
    target() {
        return this.targets().find(target => target.type() === 'browser');
    }

    /**
      * @param {function(!Target):boolean} predicate
      * @param {{timeout?: number}=} options
      * @return {!Promise<!Target>}
      */
    async waitForTarget(predicate, options = {}) {
        const existingTarget = this.targets().find(predicate);
        if (existingTarget)
            return existingTarget;
        let resolve;
        const targetPromise = new Promise(x => resolve = x);
        this.on(Events.Browser.TargetCreated, check);
        this.on(Events.Browser.TargetChanged, check);
        try {
            if (!timeout)
                return await targetPromise;
            return await helper.waitWithTimeout(targetPromise, 'target', timeout);
        } finally {
            this.removeListener(Events.Browser.TargetCreated, check);
            this.removeListener(Events.Browser.TargetChanged, check);
        }

        /**
          * @param {!Target} target
          */
        function check(target) {
            if (predicate(target))
                resolve(target);
        }
    }

    /**
      * @return {!Promise<!Array<!Puppeteer.Page>>}
      */
    async pages() {
        const contextPages = await Promise.all(this.browserContexts().map(context => context.pages()));
        // Flatten array.
        return contextPages.reduce((acc, x) => acc.concat(x), []);
    }

    /**
      * @return {!Promise<string>}
      */
    async version() {
        const version = await this._getVersion();
        return version.product;
    }

    /**
      * @return {!Promise<string>}
      */
    async userAgent() {
        const version = await this._getVersion();
        return version.userAgent;
    }

    async close() {
        await this._closeCallback.call(null);
        this.disconnect();
    }

    disconnect() {
        this._connection.dispose();
    }

    /**
      * @return {boolean}
      */
    isConnected() {
        return !this._connection._closed;
    }

    /**
      * @return {!Promise<!Object>}
      */
    _getVersion() {
        return this._connection.send('Browser.getVersion');
    }
}

class BrowserContext extends EventEmitter {
    /**
      * @param {!Puppeteer.Connection} connection
      * @param {!Browser} browser
      * @param {?string} contextId
      */
    constructor(connection, browser, contextId) {
        super();
        this._connection = connection;
        this._browser = browser;
        this._id = contextId;
    }

    /**
      * @return {!Array<!Target>} target
      */
    targets() {
        return this._browser.targets().filter(target => target.browserContext() === this);
    }

    /**
      * @param {function(!Target):boolean} predicate
      * @param {{timeout?: number}=} options
      * @return {!Promise<!Target>}
      */
    waitForTarget(predicate, options) {
        return this._browser.waitForTarget(target => target.browserContext() === this && predicate(target), options);
    }

    /**
      * @return {!Promise<!Array<!Puppeteer.Page>>}
      */
    async pages() {
        const pages = await Promise.all(
                this.targets()
                        .filter(target => target.type() === 'page')
                        .map(target => target.page())
        );
        return pages.filter(page => !!page);
    }

    /**
      * @return {boolean}
      */
    isIncognito() {
        return !!this._id;
    }

    /**
      * @param {string} origin
      * @param {!Array<string>} permissions
      */
    async overridePermissions(origin, permissions) {
        const webPermissionToProtocol = new Map([
            ['geolocation', 'geolocation'],
            ['midi', 'midi'],
            ['notifications', 'notifications'],
            ['push', 'push'],
            ['camera', 'videoCapture'],
            ['microphone', 'audioCapture'],
            ['background-sync', 'backgroundSync'],
            ['ambient-light-sensor', 'sensors'],
            ['accelerometer', 'sensors'],
            ['gyroscope', 'sensors'],
            ['magnetometer', 'sensors'],
            ['accessibility-events', 'accessibilityEvents'],
            ['clipboard-read', 'clipboardRead'],
            ['clipboard-write', 'clipboardWrite'],
            ['payment-handler', 'paymentHandler'],
            // chrome-specific permissions we have.
            ['midi-sysex', 'midiSysex'],
        ]);
        permissions = permissions.map(permission => {
            const protocolPermission = webPermissionToProtocol.get(permission);
            if (!protocolPermission)
                throw new Error('Unknown permission: ' + permission);
            return protocolPermission;
        });
        await this._connection.send('Browser.grantPermissions', {origin, browserContextId: this._id || undefined, permissions});
    }

    async clearPermissionOverrides() {
        await this._connection.send('Browser.resetPermissions', {browserContextId: this._id || undefined});
    }

    /**
      * @return {!Promise<!Puppeteer.Page>}
      */
    newPage() {
        return this._browser._createPageInContext(this._id);
    }

    /**
      * @return {!Browser}
      */
    browser() {
        return this._browser;
    }

    async close() {
        assert(this._id, 'Non-incognito profiles cannot be closed!');
        await this._browser._disposeContext(this._id);
    }
}

module.exports = {Browser, BrowserContext};



/*
lib https://github.com/GoogleChrome/puppeteer/blob/v1.19.0/BrowserFetcher.js
*/
/**
  * Copyright 2017 Google Inc. All rights reserved.
  *
  * Licensed under the Apache License, Version 2.0 (the "License");
  * you may not use this file except in compliance with the License.
  * You may obtain a copy of the License at
  *
  *     http://www.apache.org/licenses/LICENSE-2.0
  *
  * Unless required by applicable law or agreed to in writing, software
  * distributed under the License is distributed on an "AS IS" BASIS,
  * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  * See the License for the specific language governing permissions and
  * limitations under the License.
  */

// const os = require('os');
// const fs = require('fs');
// const path = require('path');
// const extract = require('extract-zip');
// const util = require('util');
// const URL = require('url');
// const {helper, assert} = require('./helper');
// const removeRecursive = require('rimraf');
// @ts-ignore
// const ProxyAgent = require('https-proxy-agent');
// @ts-ignore
// const getProxyForUrl = require('proxy-from-env').getProxyForUrl;

const DEFAULT_DOWNLOAD_HOST = 'https://storage.googleapis.com';

const supportedPlatforms = ['mac', 'linux', 'win32', 'win64'];
const downloadURLs = {
    linux: '%s/chromium-browser-snapshots/Linux_x64/%d/%s.zip',
    mac: '%s/chromium-browser-snapshots/Mac/%d/%s.zip',
    win32: '%s/chromium-browser-snapshots/Win/%d/%s.zip',
    win64: '%s/chromium-browser-snapshots/Win_x64/%d/%s.zip',
};

/**
  * @param {string} platform
  * @param {string} revision
  * @return {string}
  */
function archiveName(platform, revision) {
    if (platform === 'linux')
        return 'chrome-linux';
    if (platform === 'mac')
        return 'chrome-mac';
    if (platform === 'win32' || platform === 'win64') {
        // Windows archive name changed at r591479.
        return parseInt(revision, 10) > 591479 ? 'chrome-win' : 'chrome-win32';
    }
    return null;
}

/**
  * @param {string} platform
  * @param {string} host
  * @param {string} revision
  * @return {string}
  */
function downloadURL(platform, host, revision) {
    return util.format(downloadURLs[platform], host, revision, archiveName(platform, revision));
}

const readdirAsync = helper.promisify(fs.readdir.bind(fs));
const mkdirAsync = helper.promisify(fs.mkdir.bind(fs));
const unlinkAsync = helper.promisify(fs.unlink.bind(fs));
const chmodAsync = helper.promisify(fs.chmod.bind(fs));

function existsAsync(filePath) {
    let fulfill = null;
    const promise = new Promise(x => fulfill = x);
    fs.access(filePath, err => fulfill(!err));
    return promise;
}

class BrowserFetcher {
    /**
      * @param {string} projectRoot
      * @param {!BrowserFetcher.Options=} options
      */
    constructor(projectRoot, options = {}) {
        this._downloadsFolder = options.path || path.join(projectRoot, '.local-chromium');
        this._downloadHost = options.host || DEFAULT_DOWNLOAD_HOST;
        this._platform = options.platform || '';
        if (!this._platform) {
            const platform = os.platform();
            if (platform === 'darwin')
                this._platform = 'mac';
            else if (platform === 'linux')
                this._platform = 'linux';
            else if (platform === 'win32')
                this._platform = os.arch() === 'x64' ? 'win64' : 'win32';
            assert(this._platform, 'Unsupported platform: ' + os.platform());
        }
        assert(supportedPlatforms.includes(this._platform), 'Unsupported platform: ' + this._platform);
    }

    /**
      * @return {string}
      */
    platform() {
        return this._platform;
    }

    /**
      * @param {string} revision
      * @return {!Promise<boolean>}
      */
    canDownload(revision) {
        const url = downloadURL(this._platform, this._downloadHost, revision);
        let resolve;
        const promise = new Promise(x => resolve = x);
        const request = httpRequest(url, 'HEAD', response => {
            resolve(response.statusCode === 200);
        });
        request.on('error', error => {
            console.error(error);
            resolve(false);
        });
        return promise;
    }

    /**
      * @param {string} revision
      * @param {?function(number, number):void} progressCallback
      * @return {!Promise<!BrowserFetcher.RevisionInfo>}
      */
    async download(revision, progressCallback) {
        const url = downloadURL(this._platform, this._downloadHost, revision);
        const zipPath = path.join(this._downloadsFolder, `download-${this._platform}-${revision}.zip`);
        const folderPath = this._getFolderPath(revision);
        if (await existsAsync(folderPath))
            return this.revisionInfo(revision);
        if (!(await existsAsync(this._downloadsFolder)))
            await mkdirAsync(this._downloadsFolder);
        try {
            await downloadFile(url, zipPath, progressCallback);
            await extractZip(zipPath, folderPath);
        } finally {
            if (await existsAsync(zipPath))
                await unlinkAsync(zipPath);
        }
        const revisionInfo = this.revisionInfo(revision);
        if (revisionInfo)
            await chmodAsync(revisionInfo.executablePath, 0o755);
        return revisionInfo;
    }

    /**
      * @return {!Promise<!Array<string>>}
      */
    async localRevisions() {
        if (!await existsAsync(this._downloadsFolder))
            return [];
        const fileNames = await readdirAsync(this._downloadsFolder);
        return fileNames.map(fileName => parseFolderPath(fileName)).filter(entry => entry && entry.platform === this._platform).map(entry => entry.revision);
    }

    /**
      * @param {string} revision
      */
    async remove(revision) {
        const folderPath = this._getFolderPath(revision);
        assert(await existsAsync(folderPath), `Failed to remove: revision ${revision} is not downloaded`);
        await new Promise(fulfill => removeRecursive(folderPath, fulfill));
    }

    /**
      * @param {string} revision
      * @return {!BrowserFetcher.RevisionInfo}
      */
    revisionInfo(revision) {
        const folderPath = this._getFolderPath(revision);
        let executablePath = '';
        if (this._platform === 'mac')
            executablePath = path.join(folderPath, archiveName(this._platform, revision), 'Chromium.app', 'Contents', 'MacOS', 'Chromium');
        else if (this._platform === 'linux')
            executablePath = path.join(folderPath, archiveName(this._platform, revision), 'chrome');
        else if (this._platform === 'win32' || this._platform === 'win64')
            executablePath = path.join(folderPath, archiveName(this._platform, revision), 'chrome.exe');
        else
            throw new Error('Unsupported platform: ' + this._platform);
        const url = downloadURL(this._platform, this._downloadHost, revision);
        const local = fs.existsSync(folderPath);
        return {revision, executablePath, folderPath, local, url};
    }

    /**
      * @param {string} revision
      * @return {string}
      */
    _getFolderPath(revision) {
        return path.join(this._downloadsFolder, this._platform + '-' + revision);
    }
}

module.exports = BrowserFetcher;

/**
  * @param {string} folderPath
  * @return {?{platform: string, revision: string}}
  */
function parseFolderPath(folderPath) {
    const name = path.basename(folderPath);
    const splits = name.split('-');
    if (splits.length !== 2)
        return null;
    const [platform, revision] = splits;
    if (!supportedPlatforms.includes(platform))
        return null;
    return {platform, revision};
}

/**
  * @param {string} url
  * @param {string} destinationPath
  * @param {?function(number, number):void} progressCallback
  * @return {!Promise}
  */
function downloadFile(url, destinationPath, progressCallback) {
    let fulfill, reject;
    let downloadedBytes = 0;
    let totalBytes = 0;

    const promise = new Promise((x, y) => { fulfill = x; reject = y; });

    const request = httpRequest(url, 'GET', response => {
        if (response.statusCode !== 200) {
            const error = new Error(`Download failed: server returned code ${response.statusCode}. URL: ${url}`);
            // consume response data to free up memory
            response.resume();
            reject(error);
            return;
        }
        const file = fs.createWriteStream(destinationPath);
        file.on('finish', () => fulfill());
        file.on('error', error => reject(error));
        response.pipe(file);
        totalBytes = parseInt(/** @type {string} */ (response.headers['content-length']), 10);
        if (progressCallback)
            response.on('data', onData);
    });
    request.on('error', error => reject(error));
    return promise;

    function onData(chunk) {
        downloadedBytes += chunk.length;
        progressCallback(downloadedBytes, totalBytes);
    }
}

/**
  * @param {string} zipPath
  * @param {string} folderPath
  * @return {!Promise<?Error>}
  */
function extractZip(zipPath, folderPath) {
    return new Promise((fulfill, reject) => extract(zipPath, {dir: folderPath}, err => {
        if (err)
            reject(err);
        else
            fulfill();
    }));
}

function httpRequest(url, method, response) {
    /** @type {Object} */
    let options = URL.parse(url);
    options.method = method;

    const proxyURL = getProxyForUrl(url);
    if (proxyURL) {
        if (url.startsWith('http:')) {
            const proxy = URL.parse(proxyURL);
            options = {
                path: options.href,
                host: proxy.hostname,
                port: proxy.port,
            };
        } else {
            /** @type {Object} */
            const parsedProxyURL = URL.parse(proxyURL);
            parsedProxyURL.secureProxy = parsedProxyURL.protocol === 'https:';

            options.agent = new ProxyAgent(parsedProxyURL);
            options.rejectUnauthorized = false;
        }
    }

    const requestCallback = res => {
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location)
            httpRequest(res.headers.location, method, response);
        else
            response(res);
    };
    const request = options.protocol === 'https:' ?
        require('https').request(options, requestCallback) :
        require('http').request(options, requestCallback);
    request.end();
    return request;
}

/**
  * @typedef {Object} BrowserFetcher.Options
  * @property {string=} platform
  * @property {string=} path
  * @property {string=} host
  */

/**
  * @typedef {Object} BrowserFetcher.RevisionInfo
  * @property {string} folderPath
  * @property {string} executablePath
  * @property {string} url
  * @property {boolean} local
  * @property {string} revision
  */



/*
lib https://github.com/GoogleChrome/puppeteer/blob/v1.19.0/Connection.js
*/
/**
  * Copyright 2017 Google Inc. All rights reserved.
  *
  * Licensed under the Apache License, Version 2.0 (the "License");
  * you may not use this file except in compliance with the License.
  * You may obtain a copy of the License at
  *
  *     http://www.apache.org/licenses/LICENSE-2.0
  *
  * Unless required by applicable law or agreed to in writing, software
  * distributed under the License is distributed on an "AS IS" BASIS,
  * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  * See the License for the specific language governing permissions and
  * limitations under the License.
  */
// const {assert} = require('./helper');
// const {Events} = require('./Events');
// const debugProtocol = require('debug')('puppeteer:protocol');
// const EventEmitter = require('events');

class Connection extends EventEmitter {
    /**
      * @param {string} url
      * @param {!Puppeteer.ConnectionTransport} transport
      * @param {number=} delay
      */
    constructor(url, transport, delay = 0) {
        super();
        this._url = url;
        this._lastId = 0;
        /** @type {!Map<number, {resolve: function, reject: function, error: !Error, method: string}>}*/
        this._callbacks = new Map();
        this._delay = delay;

        this._transport = transport;
        this._transport.onmessage = this._onMessage.bind(this);
        this._transport.onclose = this._onClose.bind(this);
        /** @type {!Map<string, !CDPSession>}*/
        this._sessions = new Map();
        this._closed = false;
    }

    /**
      * @param {!CDPSession} session
      * @return {!Connection}
      */
    static fromSession(session) {
        return session._connection;
    }

    /**
      * @param {string} sessionId
      * @return {?CDPSession}
      */
    session(sessionId) {
        return this._sessions.get(sessionId) || null;
    }

    /**
      * @return {string}
      */
    url() {
        return this._url;
    }

    /**
      * @param {string} method
      * @param {!Object=} params
      * @return {!Promise<?Object>}
      */
    send(method, params = {}) {
        const id = this._rawSend({method, params});
        return new Promise((resolve, reject) => {
            this._callbacks.set(id, {resolve, reject, error: new Error(), method});
        });
    }

    /**
      * @param {*} message
      * @return {number}
      */
    _rawSend(message) {
        const id = ++this._lastId;
        message = JSON.stringify(Object.assign({}, message, {id}));
        debugProtocol('SEND ► ' + message);
        this._transport.send(message);
        return id;
    }

    /**
      * @param {string} message
      */
    async _onMessage(message) {
        if (this._delay)
            await new Promise(f => setTimeout(f, this._delay));
        debugProtocol('◀ RECV ' + message);
        const object = JSON.parse(message);
        if (object.method === 'Target.attachedToTarget') {
            const sessionId = object.params.sessionId;
            const session = new CDPSession(this, object.params.targetInfo.type, sessionId);
            this._sessions.set(sessionId, session);
        } else if (object.method === 'Target.detachedFromTarget') {
            const session = this._sessions.get(object.params.sessionId);
            if (session) {
                session._onClosed();
                this._sessions.delete(object.params.sessionId);
            }
        }
        if (object.sessionId) {
            const session = this._sessions.get(object.sessionId);
            if (session)
                session._onMessage(object);
        } else if (object.id) {
            const callback = this._callbacks.get(object.id);
            // Callbacks could be all rejected if someone has called `.dispose()`.
            if (callback) {
                this._callbacks.delete(object.id);
                if (object.error)
                    callback.reject(createProtocolError(callback.error, callback.method, object));
                else
                    callback.resolve(object.result);
            }
        } else {
            this.emit(object.method, object.params);
        }
    }

    _onClose() {
        if (this._closed)
            return;
        this._closed = true;
        this._transport.onmessage = null;
        this._transport.onclose = null;
        for (const callback of this._callbacks.values())
            callback.reject(rewriteError(callback.error, `Protocol error (${callback.method}): Target closed.`));
        this._callbacks.clear();
        for (const session of this._sessions.values())
            session._onClosed();
        this._sessions.clear();
        this.emit(Events.Connection.Disconnected);
    }

    dispose() {
        this._onClose();
        this._transport.close();
    }

    /**
      * @param {Protocol.Target.TargetInfo} targetInfo
      * @return {!Promise<!CDPSession>}
      */
    async createSession(targetInfo) {
        const {sessionId} = await this.send('Target.attachToTarget', {targetId: targetInfo.targetId, flatten: true});
        return this._sessions.get(sessionId);
    }
}

class CDPSession extends EventEmitter {
    /**
      * @param {!Connection} connection
      * @param {string} targetType
      * @param {string} sessionId
      */
    constructor(connection, targetType, sessionId) {
        super();
        /** @type {!Map<number, {resolve: function, reject: function, error: !Error, method: string}>}*/
        this._callbacks = new Map();
        this._connection = connection;
        this._targetType = targetType;
        this._sessionId = sessionId;
    }

    /**
      * @param {string} method
      * @param {!Object=} params
      * @return {!Promise<?Object>}
      */
    send(method, params = {}) {
        if (!this._connection)
            return Promise.reject(new Error(`Protocol error (${method}): Session closed. Most likely the ${this._targetType} has been closed.`));
        const id = this._connection._rawSend({sessionId: this._sessionId, method, params});
        return new Promise((resolve, reject) => {
            this._callbacks.set(id, {resolve, reject, error: new Error(), method});
        });
    }

    /**
      * @param {{id?: number, method: string, params: Object, error: {message: string, data: any}, result?: *}} object
      */
    _onMessage(object) {
        if (object.id && this._callbacks.has(object.id)) {
            const callback = this._callbacks.get(object.id);
            this._callbacks.delete(object.id);
            if (object.error)
                callback.reject(createProtocolError(callback.error, callback.method, object));
            else
                callback.resolve(object.result);
        } else {
            assert(!object.id);
            this.emit(object.method, object.params);
        }
    }

    async detach() {
        if (!this._connection)
            throw new Error(`Session already detached. Most likely the ${this._targetType} has been closed.`);
        await this._connection.send('Target.detachFromTarget',  {sessionId: this._sessionId});
    }

    _onClosed() {
        for (const callback of this._callbacks.values())
            callback.reject(rewriteError(callback.error, `Protocol error (${callback.method}): Target closed.`));
        this._callbacks.clear();
        this._connection = null;
        this.emit(Events.CDPSession.Disconnected);
    }
}

/**
  * @param {!Error} error
  * @param {string} method
  * @param {{error: {message: string, data: any}}} object
  * @return {!Error}
  */
function createProtocolError(error, method, object) {
    let message = `Protocol error (${method}): ${object.error.message}`;
    if ('data' in object.error)
        message += ` ${object.error.data}`;
    return rewriteError(error, message);
}

/**
  * @param {!Error} error
  * @param {string} message
  * @return {!Error}
  */
function rewriteError(error, message) {
    error.message = message;
    return error;
}

module.exports = {Connection, CDPSession};



/*
lib https://github.com/GoogleChrome/puppeteer/blob/v1.19.0/Coverage.js
*/
/**
  * Copyright 2017 Google Inc. All rights reserved.
  *
  * Licensed under the Apache License, Version 2.0 (the "License");
  * you may not use this file except in compliance with the License.
  * You may obtain a copy of the License at
  *
  *     http://www.apache.org/licenses/LICENSE-2.0
  *
  * Unless required by applicable law or agreed to in writing, software
  * distributed under the License is distributed on an "AS IS" BASIS,
  * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  * See the License for the specific language governing permissions and
  * limitations under the License.
  */

// const {helper, debugError, assert} = require('./helper');

// const {EVALUATION_SCRIPT_URL} = require('./ExecutionContext');

/**
  * @typedef {Object} CoverageEntry
  * @property {string} url
  * @property {string} text
  * @property {!Array<!{start: number, end: number}>} ranges
  */

class Coverage {
    /**
      * @param {!Puppeteer.CDPSession} client
      */
    constructor(client) {
        this._jsCoverage = new JSCoverage(client);
        this._cssCoverage = new CSSCoverage(client);
    }

    /**
      * @param {!{resetOnNavigation?: boolean, reportAnonymousScripts?: boolean}} options
      */
    async startJSCoverage(options) {
        return await this._jsCoverage.start(options);
    }

    /**
      * @return {!Promise<!Array<!CoverageEntry>>}
      */
    async stopJSCoverage() {
        return await this._jsCoverage.stop();
    }

    /**
      * @param {{resetOnNavigation?: boolean}=} options
      */
    async startCSSCoverage(options) {
        return await this._cssCoverage.start(options);
    }

    /**
      * @return {!Promise<!Array<!CoverageEntry>>}
      */
    async stopCSSCoverage() {
        return await this._cssCoverage.stop();
    }
}

module.exports = {Coverage};

class JSCoverage {
    /**
      * @param {!Puppeteer.CDPSession} client
      */
    constructor(client) {
        this._client = client;
        this._enabled = false;
        this._scriptURLs = new Map();
        this._scriptSources = new Map();
        this._eventListeners = [];
        this._resetOnNavigation = false;
    }

    /**
      * @param {!{resetOnNavigation?: boolean, reportAnonymousScripts?: boolean}} options
      */
    async start(options = {}) {
        assert(!this._enabled, 'JSCoverage is already enabled');
        const {
            resetOnNavigation = true,
            reportAnonymousScripts = false
        } = options;
        this._resetOnNavigation = resetOnNavigation;
        this._reportAnonymousScripts = reportAnonymousScripts;
        this._enabled = true;
        this._scriptURLs.clear();
        this._scriptSources.clear();
        this._eventListeners = [
            helper.addEventListener(this._client, 'Debugger.scriptParsed', this._onScriptParsed.bind(this)),
            helper.addEventListener(this._client, 'Runtime.executionContextsCleared', this._onExecutionContextsCleared.bind(this)),
        ];
        await Promise.all([
            this._client.send('Profiler.enable'),
            this._client.send('Profiler.startPreciseCoverage', {callCount: false, detailed: true}),
            this._client.send('Debugger.enable'),
            this._client.send('Debugger.setSkipAllPauses', {skip: true})
        ]);
    }

    _onExecutionContextsCleared() {
        if (!this._resetOnNavigation)
            return;
        this._scriptURLs.clear();
        this._scriptSources.clear();
    }

    /**
      * @param {!Protocol.Debugger.scriptParsedPayload} event
      */
    async _onScriptParsed(event) {
        // Ignore puppeteer-injected scripts
        if (event.url === EVALUATION_SCRIPT_URL)
            return;
        // Ignore other anonymous scripts unless the reportAnonymousScripts option is true.
        if (!event.url && !this._reportAnonymousScripts)
            return;
        try {
            const response = await this._client.send('Debugger.getScriptSource', {scriptId: event.scriptId});
            this._scriptURLs.set(event.scriptId, event.url);
            this._scriptSources.set(event.scriptId, response.scriptSource);
        } catch (e) {
            // This might happen if the page has already navigated away.
            debugError(e);
        }
    }

    /**
      * @return {!Promise<!Array<!CoverageEntry>>}
      */
    async stop() {
        assert(this._enabled, 'JSCoverage is not enabled');
        this._enabled = false;
        const [profileResponse] = await Promise.all([
            this._client.send('Profiler.takePreciseCoverage'),
            this._client.send('Profiler.stopPreciseCoverage'),
            this._client.send('Profiler.disable'),
            this._client.send('Debugger.disable'),
        ]);
        helper.removeEventListeners(this._eventListeners);

        const coverage = [];
        for (const entry of profileResponse.result) {
            let url = this._scriptURLs.get(entry.scriptId);
            if (!url && this._reportAnonymousScripts)
                url = 'debugger://VM' + entry.scriptId;
            const text = this._scriptSources.get(entry.scriptId);
            if (text === undefined || url === undefined)
                continue;
            const flattenRanges = [];
            for (const func of entry.functions)
                flattenRanges.push(...func.ranges);
            const ranges = convertToDisjointRanges(flattenRanges);
            coverage.push({url, ranges, text});
        }
        return coverage;
    }
}

class CSSCoverage {
    /**
      * @param {!Puppeteer.CDPSession} client
      */
    constructor(client) {
        this._client = client;
        this._enabled = false;
        this._stylesheetURLs = new Map();
        this._stylesheetSources = new Map();
        this._eventListeners = [];
        this._resetOnNavigation = false;
    }

    /**
      * @param {{resetOnNavigation?: boolean}=} options
      */
    async start(options = {}) {
        assert(!this._enabled, 'CSSCoverage is already enabled');
        const {resetOnNavigation = true} = options;
        this._resetOnNavigation = resetOnNavigation;
        this._enabled = true;
        this._stylesheetURLs.clear();
        this._stylesheetSources.clear();
        this._eventListeners = [
            helper.addEventListener(this._client, 'CSS.styleSheetAdded', this._onStyleSheet.bind(this)),
            helper.addEventListener(this._client, 'Runtime.executionContextsCleared', this._onExecutionContextsCleared.bind(this)),
        ];
        await Promise.all([
            this._client.send('DOM.enable'),
            this._client.send('CSS.enable'),
            this._client.send('CSS.startRuleUsageTracking'),
        ]);
    }

    _onExecutionContextsCleared() {
        if (!this._resetOnNavigation)
            return;
        this._stylesheetURLs.clear();
        this._stylesheetSources.clear();
    }

    /**
      * @param {!Protocol.CSS.styleSheetAddedPayload} event
      */
    async _onStyleSheet(event) {
        const header = event.header;
        // Ignore anonymous scripts
        if (!header.sourceURL)
            return;
        try {
            const response = await this._client.send('CSS.getStyleSheetText', {styleSheetId: header.styleSheetId});
            this._stylesheetURLs.set(header.styleSheetId, header.sourceURL);
            this._stylesheetSources.set(header.styleSheetId, response.text);
        } catch (e) {
            // This might happen if the page has already navigated away.
            debugError(e);
        }
    }

    /**
      * @return {!Promise<!Array<!CoverageEntry>>}
      */
    async stop() {
        assert(this._enabled, 'CSSCoverage is not enabled');
        this._enabled = false;
        const ruleTrackingResponse = await this._client.send('CSS.stopRuleUsageTracking');
        await Promise.all([
            this._client.send('CSS.disable'),
            this._client.send('DOM.disable'),
        ]);
        helper.removeEventListeners(this._eventListeners);

        // aggregate by styleSheetId
        const styleSheetIdToCoverage = new Map();
        for (const entry of ruleTrackingResponse.ruleUsage) {
            let ranges = styleSheetIdToCoverage.get(entry.styleSheetId);
            if (!ranges) {
                ranges = [];
                styleSheetIdToCoverage.set(entry.styleSheetId, ranges);
            }
            ranges.push({
                startOffset: entry.startOffset,
                endOffset: entry.endOffset,
                count: entry.used ? 1 : 0,
            });
        }

        const coverage = [];
        for (const styleSheetId of this._stylesheetURLs.keys()) {
            const url = this._stylesheetURLs.get(styleSheetId);
            const text = this._stylesheetSources.get(styleSheetId);
            const ranges = convertToDisjointRanges(styleSheetIdToCoverage.get(styleSheetId) || []);
            coverage.push({url, ranges, text});
        }

        return coverage;
    }
}

/**
  * @param {!Array<!{startOffset:number, endOffset:number, count:number}>} nestedRanges
  * @return {!Array<!{start:number, end:number}>}
  */
function convertToDisjointRanges(nestedRanges) {
    const points = [];
    for (const range of nestedRanges) {
        points.push({ offset: range.startOffset, type: 0, range });
        points.push({ offset: range.endOffset, type: 1, range });
    }
    // Sort points to form a valid parenthesis sequence.
    points.sort((a, b) => {
        // Sort with increasing offsets.
        if (a.offset !== b.offset)
            return a.offset - b.offset;
        // All "end" points should go before "start" points.
        if (a.type !== b.type)
            return b.type - a.type;
        const aLength = a.range.endOffset - a.range.startOffset;
        const bLength = b.range.endOffset - b.range.startOffset;
        // For two "start" points, the one with longer range goes first.
        if (a.type === 0)
            return bLength - aLength;
        // For two "end" points, the one with shorter range goes first.
        return aLength - bLength;
    });

    const hitCountStack = [];
    const results = [];
    let lastOffset = 0;
    // Run scanning line to intersect all ranges.
    for (const point of points) {
        if (hitCountStack.length && lastOffset < point.offset && hitCountStack[hitCountStack.length - 1] > 0) {
            const lastResult = results.length ? results[results.length - 1] : null;
            if (lastResult && lastResult.end === lastOffset)
                lastResult.end = point.offset;
            else
                results.push({start: lastOffset, end: point.offset});
        }
        lastOffset = point.offset;
        if (point.type === 0)
            hitCountStack.push(point.range.count);
        else
            hitCountStack.pop();
    }
    // Filter out empty ranges.
    return results.filter(range => range.end - range.start > 1);
}



/*
lib https://github.com/GoogleChrome/puppeteer/blob/v1.19.0/DOMWorld.js
*/
/**
  * Copyright 2019 Google Inc. All rights reserved.
  *
  * Licensed under the Apache License, Version 2.0 (the "License");
  * you may not use this file except in compliance with the License.
  * You may obtain a copy of the License at
  *
  *     http://www.apache.org/licenses/LICENSE-2.0
  *
  * Unless required by applicable law or agreed to in writing, software
  * distributed under the License is distributed on an "AS IS" BASIS,
  * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  * See the License for the specific language governing permissions and
  * limitations under the License.
  */

// const fs = require('fs');
// const {helper, assert} = require('./helper');
// const {LifecycleWatcher} = require('./LifecycleWatcher');
// const {TimeoutError} = require('./Errors');
const readFileAsync = helper.promisify(fs.readFile);

/**
  * @unrestricted
  */
class DOMWorld {
    /**
      * @param {!Puppeteer.FrameManager} frameManager
      * @param {!Puppeteer.Frame} frame
      */
    constructor(frameManager, frame) {
        this._frameManager = frameManager;
        this._frame = frame;

        /** @type {?Promise<!Puppeteer.ElementHandle>} */
        this._documentPromise = null;
        /** @type {!Promise<!Puppeteer.ExecutionContext>} */
        this._contextPromise;
        this._contextResolveCallback = null;
        this._setContext(null);

        /** @type {!Set<!WaitTask>} */
        this._waitTasks = new Set();
        this._detached = false;
    }

    /**
      * @return {!Puppeteer.Frame}
      */
    frame() {
        return this._frame;
    }

    /**
      * @param {?Puppeteer.ExecutionContext} context
      */
    _setContext(context) {
        if (context) {
            this._contextResolveCallback.call(null, context);
            this._contextResolveCallback = null;
            for (const waitTask of this._waitTasks)
                waitTask.rerun();
        } else {
            this._documentPromise = null;
            this._contextPromise = new Promise(fulfill => {
                this._contextResolveCallback = fulfill;
            });
        }
    }

    /**
      * @return {boolean}
      */
    _hasContext() {
        return !this._contextResolveCallback;
    }

    _detach() {
        this._detached = true;
        for (const waitTask of this._waitTasks)
            waitTask.terminate(new Error('waitForFunction failed: frame got detached.'));
    }

    /**
      * @return {!Promise<!Puppeteer.ExecutionContext>}
      */
    executionContext() {
        if (this._detached)
            throw new Error(`Execution Context is not available in detached frame "${this._frame.url()}" (are you trying to evaluate?)`);
        return this._contextPromise;
    }

    /**
      * @param {Function|string} pageFunction
      * @param {!Array<*>} args
      * @return {!Promise<!Puppeteer.JSHandle>}
      */
    async evaluateHandle(pageFunction, ...args) {
        const context = await this.executionContext();
        return context.evaluateHandle(pageFunction, ...args);
    }

    /**
      * @param {Function|string} pageFunction
      * @param {!Array<*>} args
      * @return {!Promise<*>}
      */
    async evaluate(pageFunction, ...args) {
        const context = await this.executionContext();
        return context.evaluate(pageFunction, ...args);
    }

    /**
      * @param {string} selector
      * @return {!Promise<?Puppeteer.ElementHandle>}
      */
    async $(selector) {
        const document = await this._document();
        const value = await document.$(selector);
        return value;
    }

    /**
      * @return {!Promise<!Puppeteer.ElementHandle>}
      */
    async _document() {
        if (this._documentPromise)
            return this._documentPromise;
        this._documentPromise = this.executionContext().then(async context => {
            const document = await context.evaluateHandle('document');
            return document.asElement();
        });
        return this._documentPromise;
    }

    /**
      * @param {string} expression
      * @return {!Promise<!Array<!Puppeteer.ElementHandle>>}
      */
    async $x(expression) {
        const document = await this._document();
        const value = await document.$x(expression);
        return value;
    }

    /**
      * @param {string} selector
      * @param {Function|string} pageFunction
      * @param {!Array<*>} args
      * @return {!Promise<(!Object|undefined)>}
      */
    async $eval(selector, pageFunction, ...args) {
        const document = await this._document();
        return document.$eval(selector, pageFunction, ...args);
    }

    /**
      * @param {string} selector
      * @param {Function|string} pageFunction
      * @param {!Array<*>} args
      * @return {!Promise<(!Object|undefined)>}
      */
    async $$eval(selector, pageFunction, ...args) {
        const document = await this._document();
        const value = await document.$$eval(selector, pageFunction, ...args);
        return value;
    }

    /**
      * @param {string} selector
      * @return {!Promise<!Array<!Puppeteer.ElementHandle>>}
      */
    async $$(selector) {
        const document = await this._document();
        const value = await document.$$(selector);
        return value;
    }

    /**
      * @return {!Promise<String>}
      */
    async content() {
        return await this.evaluate(Function(`
            let retVal = '';
            if (document.doctype)
                retVal = new XMLSerializer().serializeToString(document.doctype);
            if (document.documentElement)
                retVal += document.documentElement.outerHTML;
            return retVal;
        `));
    }

    /**
      * @param {string} html
      * @param {!{timeout?: number, waitUntil?: string|!Array<string>}=} options
      */
    async setContent(html, options = {}) {
        const {
            waitUntil = ['load'],
        } = options;
        // We rely upon the fact that document.open() will reset frame lifecycle with "init"
        // lifecycle event. @see https://crrev.com/608658
        await this.evaluate(html => {
            document.open();
            document.write(html);
            document.close();
        }, html);
        const watcher = new LifecycleWatcher(this._frameManager, this._frame, waitUntil, timeout);
        const error = await Promise.race([
            watcher.timeoutOrTerminationPromise(),
            watcher.lifecyclePromise(),
        ]);
        watcher.dispose();
        if (error)
            throw error;
    }

    /**
      * @param {!{url?: string, path?: string, content?: string, type?: string}} options
      * @return {!Promise<!Puppeteer.ElementHandle>}
      */
    async addScriptTag(options) {
        const {
            url = null,
            path = null,
            content = null,
            type = ''
        } = options;
        if (url !== null) {
            try {
                const context = await this.executionContext();
                return (await context.evaluateHandle(addScriptUrl, url, type)).asElement();
            } catch (error) {
                throw new Error(`Loading script from ${url} failed`);
            }
        }

        if (path !== null) {
            let contents = await readFileAsync(path, 'utf8');
            contents += '//# sourceURL=' + path.replace(/\n/g, '');
            const context = await this.executionContext();
            return (await context.evaluateHandle(addScriptContent, contents, type)).asElement();
        }

        if (content !== null) {
            const context = await this.executionContext();
            return (await context.evaluateHandle(addScriptContent, content, type)).asElement();
        }

        throw new Error('Provide an object with a `url`, `path` or `content` property');

        /**
          * @param {string} url
          * @param {string} type
          * @return {!Promise<!HTMLElement>}
          */
        async function addScriptUrl(url, type) {
            const script = document.createElement('script');
            script.src = url;
            if (type)
                script.type = type;
            const promise = new Promise((res, rej) => {
                script.onload = res;
                script.onerror = rej;
            });
            document.head.appendChild(script);
            await promise;
            return script;
        }

        /**
          * @param {string} content
          * @param {string} type
          * @return {!HTMLElement}
          */
        function addScriptContent(content, type = 'text/javascript') {
            const script = document.createElement('script');
            script.type = type;
            script.text = content;
            let error = null;
            script.onerror = e => error = e;
            document.head.appendChild(script);
            if (error)
                throw error;
            return script;
        }
    }

    /**
      * @param {!{url?: string, path?: string, content?: string}} options
      * @return {!Promise<!Puppeteer.ElementHandle>}
      */
    async addStyleTag(options) {
        const {
            url = null,
            path = null,
            content = null
        } = options;
        if (url !== null) {
            try {
                const context = await this.executionContext();
                return (await context.evaluateHandle(addStyleUrl, url)).asElement();
            } catch (error) {
                throw new Error(`Loading style from ${url} failed`);
            }
        }

        if (path !== null) {
            let contents = await readFileAsync(path, 'utf8');
            contents += '/*# sourceURL=' + path.replace(/\n/g, '') + '*/';
            const context = await this.executionContext();
            return (await context.evaluateHandle(addStyleContent, contents)).asElement();
        }

        if (content !== null) {
            const context = await this.executionContext();
            return (await context.evaluateHandle(addStyleContent, content)).asElement();
        }

        throw new Error('Provide an object with a `url`, `path` or `content` property');

        /**
          * @param {string} url
          * @return {!Promise<!HTMLElement>}
          */
        async function addStyleUrl(url) {
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = url;
            const promise = new Promise((res, rej) => {
                link.onload = res;
                link.onerror = rej;
            });
            document.head.appendChild(link);
            await promise;
            return link;
        }

        /**
          * @param {string} content
          * @return {!Promise<!HTMLElement>}
          */
        async function addStyleContent(content) {
            const style = document.createElement('style');
            style.type = 'text/css';
            style.appendChild(document.createTextNode(content));
            const promise = new Promise((res, rej) => {
                style.onload = res;
                style.onerror = rej;
            });
            document.head.appendChild(style);
            await promise;
            return style;
        }
    }

    /**
      * @param {string} selector
      * @param {!{delay?: number, button?: "left"|"right"|"middle", clickCount?: number}=} options
      */
    async click(selector, options) {
        const handle = await this.$(selector);
        assert(handle, 'No node found for selector: ' + selector);
        await handle.click(options);
        await handle.dispose();
    }

    /**
      * @param {string} selector
      */
    async focus(selector) {
        const handle = await this.$(selector);
        assert(handle, 'No node found for selector: ' + selector);
        await handle.focus();
        await handle.dispose();
    }

    /**
      * @param {string} selector
      */
    async hover(selector) {
        const handle = await this.$(selector);
        assert(handle, 'No node found for selector: ' + selector);
        await handle.hover();
        await handle.dispose();
    }

    /**
    * @param {string} selector
    * @param {!Array<string>} values
    * @return {!Promise<!Array<string>>}
    */
    select(selector, ...values){
        for (const value of values)
            assert(helper.isString(value), 'Values must be strings. Found value "' + value + '" of type "' + (typeof value) + '"');
        return this.$eval(selector, (element, values) => {
            if (element.nodeName.toLowerCase() !== 'select')
                throw new Error('Element is not a <select> element.');

            const options = Array.from(element.options);
            element.value = undefined;
            for (const option of options) {
                option.selected = values.includes(option.value);
                if (option.selected && !element.multiple)
                    break;
            }
            element.dispatchEvent(new Event('input', { 'bubbles': true }));
            element.dispatchEvent(new Event('change', { 'bubbles': true }));
            return options.filter(option => option.selected).map(option => option.value);
        }, values);
    }

    /**
      * @param {string} selector
      */
    async tap(selector) {
        const handle = await this.$(selector);
        assert(handle, 'No node found for selector: ' + selector);
        await handle.tap();
        await handle.dispose();
    }

    /**
      * @param {string} selector
      * @param {string} text
      * @param {{delay: (number|undefined)}=} options
      */
    async type(selector, text, options) {
        const handle = await this.$(selector);
        assert(handle, 'No node found for selector: ' + selector);
        await handle.type(text, options);
        await handle.dispose();
    }

    /**
      * @param {string} selector
      * @param {!{visible?: boolean, hidden?: boolean, timeout?: number}=} options
      * @return {!Promise<?Puppeteer.ElementHandle>}
      */
    waitForSelector(selector, options) {
        return this._waitForSelectorOrXPath(selector, false, options);
    }

    /**
      * @param {string} xpath
      * @param {!{visible?: boolean, hidden?: boolean, timeout?: number}=} options
      * @return {!Promise<?Puppeteer.ElementHandle>}
      */
    waitForXPath(xpath, options) {
        return this._waitForSelectorOrXPath(xpath, true, options);
    }

    /**
      * @param {Function|string} pageFunction
      * @param {!{polling?: string|number, timeout?: number}=} options
      * @return {!Promise<!Puppeteer.JSHandle>}
      */
    waitForFunction(pageFunction, options = {}, ...args) {
        const {
            polling = 'raf',
        } = options;
        return new WaitTask(this, pageFunction, 'function', polling, timeout, ...args).promise;
    }

    /**
      * @return {!Promise<string>}
      */
    async title() {
        return this.evaluate(() => document.title);
    }

    /**
      * @param {string} selectorOrXPath
      * @param {boolean} isXPath
      * @param {!{visible?: boolean, hidden?: boolean, timeout?: number}=} options
      * @return {!Promise<?Puppeteer.ElementHandle>}
      */
    async _waitForSelectorOrXPath(selectorOrXPath, isXPath, options = {}) {
        const {
            visible: waitForVisible = false,
            hidden: waitForHidden = false,
        } = options;
        const polling = waitForVisible || waitForHidden ? 'raf' : 'mutation';
        const title = `${isXPath ? 'XPath' : 'selector'} "${selectorOrXPath}"${waitForHidden ? ' to be hidden' : ''}`;
        const waitTask = new WaitTask(this, predicate, title, polling, timeout, selectorOrXPath, isXPath, waitForVisible, waitForHidden);
        const handle = await waitTask.promise;
        if (!handle.asElement()) {
            await handle.dispose();
            return null;
        }
        return handle.asElement();

        /**
          * @param {string} selectorOrXPath
          * @param {boolean} isXPath
          * @param {boolean} waitForVisible
          * @param {boolean} waitForHidden
          * @return {?Node|boolean}
          */
        function predicate(selectorOrXPath, isXPath, waitForVisible, waitForHidden) {
            const node = isXPath
                ? document.evaluate(selectorOrXPath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue
                : document.querySelector(selectorOrXPath);
            if (!node)
                return waitForHidden;
            if (!waitForVisible && !waitForHidden)
                return node;
            const element = /** @type {Element} */ (node.nodeType === Node.TEXT_NODE ? node.parentElement : node);

            const style = window.getComputedStyle(element);
            const isVisible = style && style.visibility !== 'hidden' && hasVisibleBoundingBox();
            const success = (waitForVisible === isVisible || waitForHidden === !isVisible);
            return success ? node : null;

            /**
              * @return {boolean}
              */
            function hasVisibleBoundingBox() {
                const rect = element.getBoundingClientRect();
                return !!(rect.top || rect.bottom || rect.width || rect.height);
            }
        }
    }
}

class WaitTask {
    /**
      * @param {!DOMWorld} domWorld
      * @param {Function|string} predicateBody
      * @param {string|number} polling
      * @param {number} timeout
      * @param {!Array<*>} args
      */
    constructor(domWorld, predicateBody, title, polling, timeout, ...args) {
        if (helper.isString(polling))
            assert(polling === 'raf' || polling === 'mutation', 'Unknown polling option: ' + polling);
        else if (helper.isNumber(polling))
            assert(polling > 0, 'Cannot poll with non-positive interval: ' + polling);
        else
            throw new Error('Unknown polling options: ' + polling);

        this._domWorld = domWorld;
        this._polling = polling;
        this._timeout = timeout;
        this._predicateBody = helper.isString(predicateBody) ? 'return (' + predicateBody + ')' : 'return (' + predicateBody + ')(...args)';
        this._args = args;
        this._runCount = 0;
        domWorld._waitTasks.add(this);
        this.promise = new Promise((resolve, reject) => {
            this._resolve = resolve;
            this._reject = reject;
        });
        // Since page navigation requires us to re-install the pageScript, we should track
        // timeout on our end.
        if (timeout) {
            const timeoutError = new Error(`waiting for ${title} failed: timeout ${timeout}ms exceeded`);
            this._timeoutTimer = setTimeout(() => this.terminate(timeoutError), timeout);
        }
        this.rerun();
    }

    /**
      * @param {!Error} error
      */
    terminate(error) {
        this._terminated = true;
        this._reject(error);
        this._cleanup();
    }

    async rerun() {
        const runCount = ++this._runCount;
        /** @type {?Puppeteer.JSHandle} */
        let success = null;
        let error = null;
        try {
            success = await (await this._domWorld.executionContext()).evaluateHandle(waitForPredicatePageFunction, this._predicateBody, this._polling, this._timeout, ...this._args);
        } catch (e) {
            error = e;
        }

        if (this._terminated || runCount !== this._runCount) {
            if (success)
                await success.dispose();
            return;
        }

        // Ignore timeouts in pageScript - we track timeouts ourselves.
        // If the frame's execution context has already changed, `frame.evaluate` will
        // throw an error - ignore this predicate run altogether.
        if (!error && await this._domWorld.evaluate(s => !s, success).catch(e => true)) {
            await success.dispose();
            return;
        }

        // When the page is navigated, the promise is rejected.
        // We will try again in the new execution context.
        if (error && error.message.includes('Execution context was destroyed'))
            return;

        // We could have tried to evaluate in a context which was already
        // destroyed.
        if (error && error.message.includes('Cannot find context with specified id'))
            return;

        if (error)
            this._reject(error);
        else
            this._resolve(success);

        this._cleanup();
    }

    _cleanup() {
        clearTimeout(this._timeoutTimer);
        this._domWorld._waitTasks.delete(this);
        this._runningTask = null;
    }
}

/**
  * @param {string} predicateBody
  * @param {string} polling
  * @param {number} timeout
  * @return {!Promise<*>}
  */
async function waitForPredicatePageFunction(predicateBody, polling, timeout, ...args) {
    const predicate = new Function('...args', predicateBody);
    let timedOut = false;
    if (timeout)
        setTimeout(() => timedOut = true, timeout);
    if (polling === 'raf')
        return await pollRaf();
    if (polling === 'mutation')
        return await pollMutation();
    if (typeof polling === 'number')
        return await pollInterval(polling);

    /**
      * @return {!Promise<*>}
      */
    function pollMutation() {
        const success = predicate.apply(null, args);
        if (success)
            return Promise.resolve(success);

        let fulfill;
        const result = new Promise(x => fulfill = x);
        const observer = new MutationObserver(mutations => {
            if (timedOut) {
                observer.disconnect();
                fulfill();
            }
            const success = predicate.apply(null, args);
            if (success) {
                observer.disconnect();
                fulfill(success);
            }
        });
        observer.observe(document, {
            childList: true,
            subtree: true,
            attributes: true
        });
        return result;
    }

    /**
      * @return {!Promise<*>}
      */
    function pollRaf() {
        let fulfill;
        const result = new Promise(x => fulfill = x);
        onRaf();
        return result;

        function onRaf() {
            if (timedOut) {
                fulfill();
                return;
            }
            const success = predicate.apply(null, args);
            if (success)
                fulfill(success);
            else
                requestAnimationFrame(onRaf);
        }
    }

    /**
      * @param {number} pollInterval
      * @return {!Promise<*>}
      */
    function pollInterval(pollInterval) {
        let fulfill;
        const result = new Promise(x => fulfill = x);
        onTimeout();
        return result;

        function onTimeout() {
            if (timedOut) {
                fulfill();
                return;
            }
            const success = predicate.apply(null, args);
            if (success)
                fulfill(success);
            else
                setTimeout(onTimeout, pollInterval);
        }
    }
}

module.exports = {DOMWorld};



/*
lib https://github.com/GoogleChrome/puppeteer/blob/v1.19.0/DeviceDescriptors.js
*/
/**
  * Copyright 2017 Google Inc. All rights reserved.
  *
  * Licensed under the Apache License, Version 2.0 (the "License");
  * you may not use this file except in compliance with the License.
  * You may obtain a copy of the License at
  *
  *     http://www.apache.org/licenses/LICENSE-2.0
  *
  * Unless required by applicable law or agreed to in writing, software
  * distributed under the License is distributed on an "AS IS" BASIS,
  * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  * See the License for the specific language governing permissions and
  * limitations under the License.
  */

module.exports = [
    {
        'name': 'Blackberry PlayBook',
        'userAgent': 'Mozilla/5.0 (PlayBook; U; RIM Tablet OS 2.1.0; en-US) AppleWebKit/536.2+ (KHTML like Gecko) Version/7.2.1.0 Safari/536.2+',
        'viewport': {
            'width': 600,
            'height': 1024,
            'deviceScaleFactor': 1,
            'isMobile': true,
            'hasTouch': true,
            'isLandscape': false
        }
    },
    {
        'name': 'Blackberry PlayBook landscape',
        'userAgent': 'Mozilla/5.0 (PlayBook; U; RIM Tablet OS 2.1.0; en-US) AppleWebKit/536.2+ (KHTML like Gecko) Version/7.2.1.0 Safari/536.2+',
        'viewport': {
            'width': 1024,
            'height': 600,
            'deviceScaleFactor': 1,
            'isMobile': true,
            'hasTouch': true,
            'isLandscape': true
        }
    },
    {
        'name': 'BlackBerry Z30',
        'userAgent': 'Mozilla/5.0 (BB10; Touch) AppleWebKit/537.10+ (KHTML, like Gecko) Version/10.0.9.2372 Mobile Safari/537.10+',
        'viewport': {
            'width': 360,
            'height': 640,
            'deviceScaleFactor': 2,
            'isMobile': true,
            'hasTouch': true,
            'isLandscape': false
        }
    },
    {
        'name': 'BlackBerry Z30 landscape',
        'userAgent': 'Mozilla/5.0 (BB10; Touch) AppleWebKit/537.10+ (KHTML, like Gecko) Version/10.0.9.2372 Mobile Safari/537.10+',
        'viewport': {
            'width': 640,
            'height': 360,
            'deviceScaleFactor': 2,
            'isMobile': true,
            'hasTouch': true,
            'isLandscape': true
        }
    },
    {
        'name': 'Galaxy Note 3',
        'userAgent': 'Mozilla/5.0 (Linux; U; Android 4.3; en-us; SM-N900T Build/JSS15J) AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 Mobile Safari/534.30',
        'viewport': {
            'width': 360,
            'height': 640,
            'deviceScaleFactor': 3,
            'isMobile': true,
            'hasTouch': true,
            'isLandscape': false
        }
    },
    {
        'name': 'Galaxy Note 3 landscape',
        'userAgent': 'Mozilla/5.0 (Linux; U; Android 4.3; en-us; SM-N900T Build/JSS15J) AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 Mobile Safari/534.30',
        'viewport': {
            'width': 640,
            'height': 360,
            'deviceScaleFactor': 3,
            'isMobile': true,
            'hasTouch': true,
            'isLandscape': true
        }
    },
    {
        'name': 'Galaxy Note II',
        'userAgent': 'Mozilla/5.0 (Linux; U; Android 4.1; en-us; GT-N7100 Build/JRO03C) AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 Mobile Safari/534.30',
        'viewport': {
            'width': 360,
            'height': 640,
            'deviceScaleFactor': 2,
            'isMobile': true,
            'hasTouch': true,
            'isLandscape': false
        }
    },
    {
        'name': 'Galaxy Note II landscape',
        'userAgent': 'Mozilla/5.0 (Linux; U; Android 4.1; en-us; GT-N7100 Build/JRO03C) AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 Mobile Safari/534.30',
        'viewport': {
            'width': 640,
            'height': 360,
            'deviceScaleFactor': 2,
            'isMobile': true,
            'hasTouch': true,
            'isLandscape': true
        }
    },
    {
        'name': 'Galaxy S III',
        'userAgent': 'Mozilla/5.0 (Linux; U; Android 4.0; en-us; GT-I9300 Build/IMM76D) AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 Mobile Safari/534.30',
        'viewport': {
            'width': 360,
            'height': 640,
            'deviceScaleFactor': 2,
            'isMobile': true,
            'hasTouch': true,
            'isLandscape': false
        }
    },
    {
        'name': 'Galaxy S III landscape',
        'userAgent': 'Mozilla/5.0 (Linux; U; Android 4.0; en-us; GT-I9300 Build/IMM76D) AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 Mobile Safari/534.30',
        'viewport': {
            'width': 640,
            'height': 360,
            'deviceScaleFactor': 2,
            'isMobile': true,
            'hasTouch': true,
            'isLandscape': true
        }
    },
    {
        'name': 'Galaxy S5',
        'userAgent': 'Mozilla/5.0 (Linux; Android 5.0; SM-G900P Build/LRX21T) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3765.0 Mobile Safari/537.36',
        'viewport': {
            'width': 360,
            'height': 640,
            'deviceScaleFactor': 3,
            'isMobile': true,
            'hasTouch': true,
            'isLandscape': false
        }
    },
    {
        'name': 'Galaxy S5 landscape',
        'userAgent': 'Mozilla/5.0 (Linux; Android 5.0; SM-G900P Build/LRX21T) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3765.0 Mobile Safari/537.36',
        'viewport': {
            'width': 640,
            'height': 360,
            'deviceScaleFactor': 3,
            'isMobile': true,
            'hasTouch': true,
            'isLandscape': true
        }
    },
    {
        'name': 'iPad',
        'userAgent': 'Mozilla/5.0 (iPad; CPU OS 11_0 like Mac OS X) AppleWebKit/604.1.34 (KHTML, like Gecko) Version/11.0 Mobile/15A5341f Safari/604.1',
        'viewport': {
            'width': 768,
            'height': 1024,
            'deviceScaleFactor': 2,
            'isMobile': true,
            'hasTouch': true,
            'isLandscape': false
        }
    },
    {
        'name': 'iPad landscape',
        'userAgent': 'Mozilla/5.0 (iPad; CPU OS 11_0 like Mac OS X) AppleWebKit/604.1.34 (KHTML, like Gecko) Version/11.0 Mobile/15A5341f Safari/604.1',
        'viewport': {
            'width': 1024,
            'height': 768,
            'deviceScaleFactor': 2,
            'isMobile': true,
            'hasTouch': true,
            'isLandscape': true
        }
    },
    {
        'name': 'iPad Mini',
        'userAgent': 'Mozilla/5.0 (iPad; CPU OS 11_0 like Mac OS X) AppleWebKit/604.1.34 (KHTML, like Gecko) Version/11.0 Mobile/15A5341f Safari/604.1',
        'viewport': {
            'width': 768,
            'height': 1024,
            'deviceScaleFactor': 2,
            'isMobile': true,
            'hasTouch': true,
            'isLandscape': false
        }
    },
    {
        'name': 'iPad Mini landscape',
        'userAgent': 'Mozilla/5.0 (iPad; CPU OS 11_0 like Mac OS X) AppleWebKit/604.1.34 (KHTML, like Gecko) Version/11.0 Mobile/15A5341f Safari/604.1',
        'viewport': {
            'width': 1024,
            'height': 768,
            'deviceScaleFactor': 2,
            'isMobile': true,
            'hasTouch': true,
            'isLandscape': true
        }
    },
    {
        'name': 'iPad Pro',
        'userAgent': 'Mozilla/5.0 (iPad; CPU OS 11_0 like Mac OS X) AppleWebKit/604.1.34 (KHTML, like Gecko) Version/11.0 Mobile/15A5341f Safari/604.1',
        'viewport': {
            'width': 1024,
            'height': 1366,
            'deviceScaleFactor': 2,
            'isMobile': true,
            'hasTouch': true,
            'isLandscape': false
        }
    },
    {
        'name': 'iPad Pro landscape',
        'userAgent': 'Mozilla/5.0 (iPad; CPU OS 11_0 like Mac OS X) AppleWebKit/604.1.34 (KHTML, like Gecko) Version/11.0 Mobile/15A5341f Safari/604.1',
        'viewport': {
            'width': 1366,
            'height': 1024,
            'deviceScaleFactor': 2,
            'isMobile': true,
            'hasTouch': true,
            'isLandscape': true
        }
    },
    {
        'name': 'iPhone 4',
        'userAgent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 7_1_2 like Mac OS X) AppleWebKit/537.51.2 (KHTML, like Gecko) Version/7.0 Mobile/11D257 Safari/9537.53',
        'viewport': {
            'width': 320,
            'height': 480,
            'deviceScaleFactor': 2,
            'isMobile': true,
            'hasTouch': true,
            'isLandscape': false
        }
    },
    {
        'name': 'iPhone 4 landscape',
        'userAgent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 7_1_2 like Mac OS X) AppleWebKit/537.51.2 (KHTML, like Gecko) Version/7.0 Mobile/11D257 Safari/9537.53',
        'viewport': {
            'width': 480,
            'height': 320,
            'deviceScaleFactor': 2,
            'isMobile': true,
            'hasTouch': true,
            'isLandscape': true
        }
    },
    {
        'name': 'iPhone 5',
        'userAgent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 10_3_1 like Mac OS X) AppleWebKit/603.1.30 (KHTML, like Gecko) Version/10.0 Mobile/14E304 Safari/602.1',
        'viewport': {
            'width': 320,
            'height': 568,
            'deviceScaleFactor': 2,
            'isMobile': true,
            'hasTouch': true,
            'isLandscape': false
        }
    },
    {
        'name': 'iPhone 5 landscape',
        'userAgent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 10_3_1 like Mac OS X) AppleWebKit/603.1.30 (KHTML, like Gecko) Version/10.0 Mobile/14E304 Safari/602.1',
        'viewport': {
            'width': 568,
            'height': 320,
            'deviceScaleFactor': 2,
            'isMobile': true,
            'hasTouch': true,
            'isLandscape': true
        }
    },
    {
        'name': 'iPhone 6',
        'userAgent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1',
        'viewport': {
            'width': 375,
            'height': 667,
            'deviceScaleFactor': 2,
            'isMobile': true,
            'hasTouch': true,
            'isLandscape': false
        }
    },
    {
        'name': 'iPhone 6 landscape',
        'userAgent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1',
        'viewport': {
            'width': 667,
            'height': 375,
            'deviceScaleFactor': 2,
            'isMobile': true,
            'hasTouch': true,
            'isLandscape': true
        }
    },
    {
        'name': 'iPhone 6 Plus',
        'userAgent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1',
        'viewport': {
            'width': 414,
            'height': 736,
            'deviceScaleFactor': 3,
            'isMobile': true,
            'hasTouch': true,
            'isLandscape': false
        }
    },
    {
        'name': 'iPhone 6 Plus landscape',
        'userAgent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1',
        'viewport': {
            'width': 736,
            'height': 414,
            'deviceScaleFactor': 3,
            'isMobile': true,
            'hasTouch': true,
            'isLandscape': true
        }
    },
    {
        'name': 'iPhone 7',
        'userAgent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1',
        'viewport': {
            'width': 375,
            'height': 667,
            'deviceScaleFactor': 2,
            'isMobile': true,
            'hasTouch': true,
            'isLandscape': false
        }
    },
    {
        'name': 'iPhone 7 landscape',
        'userAgent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1',
        'viewport': {
            'width': 667,
            'height': 375,
            'deviceScaleFactor': 2,
            'isMobile': true,
            'hasTouch': true,
            'isLandscape': true
        }
    },
    {
        'name': 'iPhone 7 Plus',
        'userAgent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1',
        'viewport': {
            'width': 414,
            'height': 736,
            'deviceScaleFactor': 3,
            'isMobile': true,
            'hasTouch': true,
            'isLandscape': false
        }
    },
    {
        'name': 'iPhone 7 Plus landscape',
        'userAgent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1',
        'viewport': {
            'width': 736,
            'height': 414,
            'deviceScaleFactor': 3,
            'isMobile': true,
            'hasTouch': true,
            'isLandscape': true
        }
    },
    {
        'name': 'iPhone 8',
        'userAgent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1',
        'viewport': {
            'width': 375,
            'height': 667,
            'deviceScaleFactor': 2,
            'isMobile': true,
            'hasTouch': true,
            'isLandscape': false
        }
    },
    {
        'name': 'iPhone 8 landscape',
        'userAgent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1',
        'viewport': {
            'width': 667,
            'height': 375,
            'deviceScaleFactor': 2,
            'isMobile': true,
            'hasTouch': true,
            'isLandscape': true
        }
    },
    {
        'name': 'iPhone 8 Plus',
        'userAgent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1',
        'viewport': {
            'width': 414,
            'height': 736,
            'deviceScaleFactor': 3,
            'isMobile': true,
            'hasTouch': true,
            'isLandscape': false
        }
    },
    {
        'name': 'iPhone 8 Plus landscape',
        'userAgent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1',
        'viewport': {
            'width': 736,
            'height': 414,
            'deviceScaleFactor': 3,
            'isMobile': true,
            'hasTouch': true,
            'isLandscape': true
        }
    },
    {
        'name': 'iPhone SE',
        'userAgent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 10_3_1 like Mac OS X) AppleWebKit/603.1.30 (KHTML, like Gecko) Version/10.0 Mobile/14E304 Safari/602.1',
        'viewport': {
            'width': 320,
            'height': 568,
            'deviceScaleFactor': 2,
            'isMobile': true,
            'hasTouch': true,
            'isLandscape': false
        }
    },
    {
        'name': 'iPhone SE landscape',
        'userAgent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 10_3_1 like Mac OS X) AppleWebKit/603.1.30 (KHTML, like Gecko) Version/10.0 Mobile/14E304 Safari/602.1',
        'viewport': {
            'width': 568,
            'height': 320,
            'deviceScaleFactor': 2,
            'isMobile': true,
            'hasTouch': true,
            'isLandscape': true
        }
    },
    {
        'name': 'iPhone X',
        'userAgent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1',
        'viewport': {
            'width': 375,
            'height': 812,
            'deviceScaleFactor': 3,
            'isMobile': true,
            'hasTouch': true,
            'isLandscape': false
        }
    },
    {
        'name': 'iPhone X landscape',
        'userAgent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1',
        'viewport': {
            'width': 812,
            'height': 375,
            'deviceScaleFactor': 3,
            'isMobile': true,
            'hasTouch': true,
            'isLandscape': true
        }
    },
    {
        'name': 'JioPhone 2',
        'userAgent': 'Mozilla/5.0 (Mobile; LYF/F300B/LYF-F300B-001-01-15-130718-i;Android; rv:48.0) Gecko/48.0 Firefox/48.0 KAIOS/2.5',
        'viewport': {
            'width': 240,
            'height': 320,
            'deviceScaleFactor': 1,
            'isMobile': true,
            'hasTouch': true,
            'isLandscape': false
        }
    },
    {
        'name': 'JioPhone 2 landscape',
        'userAgent': 'Mozilla/5.0 (Mobile; LYF/F300B/LYF-F300B-001-01-15-130718-i;Android; rv:48.0) Gecko/48.0 Firefox/48.0 KAIOS/2.5',
        'viewport': {
            'width': 320,
            'height': 240,
            'deviceScaleFactor': 1,
            'isMobile': true,
            'hasTouch': true,
            'isLandscape': true
        }
    },
    {
        'name': 'Kindle Fire HDX',
        'userAgent': 'Mozilla/5.0 (Linux; U; en-us; KFAPWI Build/JDQ39) AppleWebKit/535.19 (KHTML, like Gecko) Silk/3.13 Safari/535.19 Silk-Accelerated=true',
        'viewport': {
            'width': 800,
            'height': 1280,
            'deviceScaleFactor': 2,
            'isMobile': true,
            'hasTouch': true,
            'isLandscape': false
        }
    },
    {
        'name': 'Kindle Fire HDX landscape',
        'userAgent': 'Mozilla/5.0 (Linux; U; en-us; KFAPWI Build/JDQ39) AppleWebKit/535.19 (KHTML, like Gecko) Silk/3.13 Safari/535.19 Silk-Accelerated=true',
        'viewport': {
            'width': 1280,
            'height': 800,
            'deviceScaleFactor': 2,
            'isMobile': true,
            'hasTouch': true,
            'isLandscape': true
        }
    },
    {
        'name': 'LG Optimus L70',
        'userAgent': 'Mozilla/5.0 (Linux; U; Android 4.4.2; en-us; LGMS323 Build/KOT49I.MS32310c) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/75.0.3765.0 Mobile Safari/537.36',
        'viewport': {
            'width': 384,
            'height': 640,
            'deviceScaleFactor': 1.25,
            'isMobile': true,
            'hasTouch': true,
            'isLandscape': false
        }
    },
    {
        'name': 'LG Optimus L70 landscape',
        'userAgent': 'Mozilla/5.0 (Linux; U; Android 4.4.2; en-us; LGMS323 Build/KOT49I.MS32310c) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/75.0.3765.0 Mobile Safari/537.36',
        'viewport': {
            'width': 640,
            'height': 384,
            'deviceScaleFactor': 1.25,
            'isMobile': true,
            'hasTouch': true,
            'isLandscape': true
        }
    },
    {
        'name': 'Microsoft Lumia 550',
        'userAgent': 'Mozilla/5.0 (Windows Phone 10.0; Android 4.2.1; Microsoft; Lumia 550) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2486.0 Mobile Safari/537.36 Edge/14.14263',
        'viewport': {
            'width': 640,
            'height': 360,
            'deviceScaleFactor': 2,
            'isMobile': true,
            'hasTouch': true,
            'isLandscape': false
        }
    },
    {
        'name': 'Microsoft Lumia 950',
        'userAgent': 'Mozilla/5.0 (Windows Phone 10.0; Android 4.2.1; Microsoft; Lumia 950) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2486.0 Mobile Safari/537.36 Edge/14.14263',
        'viewport': {
            'width': 360,
            'height': 640,
            'deviceScaleFactor': 4,
            'isMobile': true,
            'hasTouch': true,
            'isLandscape': false
        }
    },
    {
        'name': 'Microsoft Lumia 950 landscape',
        'userAgent': 'Mozilla/5.0 (Windows Phone 10.0; Android 4.2.1; Microsoft; Lumia 950) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2486.0 Mobile Safari/537.36 Edge/14.14263',
        'viewport': {
            'width': 640,
            'height': 360,
            'deviceScaleFactor': 4,
            'isMobile': true,
            'hasTouch': true,
            'isLandscape': true
        }
    },
    {
        'name': 'Nexus 10',
        'userAgent': 'Mozilla/5.0 (Linux; Android 6.0.1; Nexus 10 Build/MOB31T) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3765.0 Safari/537.36',
        'viewport': {
            'width': 800,
            'height': 1280,
            'deviceScaleFactor': 2,
            'isMobile': true,
            'hasTouch': true,
            'isLandscape': false
        }
    },
    {
        'name': 'Nexus 10 landscape',
        'userAgent': 'Mozilla/5.0 (Linux; Android 6.0.1; Nexus 10 Build/MOB31T) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3765.0 Safari/537.36',
        'viewport': {
            'width': 1280,
            'height': 800,
            'deviceScaleFactor': 2,
            'isMobile': true,
            'hasTouch': true,
            'isLandscape': true
        }
    },
    {
        'name': 'Nexus 4',
        'userAgent': 'Mozilla/5.0 (Linux; Android 4.4.2; Nexus 4 Build/KOT49H) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3765.0 Mobile Safari/537.36',
        'viewport': {
            'width': 384,
            'height': 640,
            'deviceScaleFactor': 2,
            'isMobile': true,
            'hasTouch': true,
            'isLandscape': false
        }
    },
    {
        'name': 'Nexus 4 landscape',
        'userAgent': 'Mozilla/5.0 (Linux; Android 4.4.2; Nexus 4 Build/KOT49H) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3765.0 Mobile Safari/537.36',
        'viewport': {
            'width': 640,
            'height': 384,
            'deviceScaleFactor': 2,
            'isMobile': true,
            'hasTouch': true,
            'isLandscape': true
        }
    },
    {
        'name': 'Nexus 5',
        'userAgent': 'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3765.0 Mobile Safari/537.36',
        'viewport': {
            'width': 360,
            'height': 640,
            'deviceScaleFactor': 3,
            'isMobile': true,
            'hasTouch': true,
            'isLandscape': false
        }
    },
    {
        'name': 'Nexus 5 landscape',
        'userAgent': 'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3765.0 Mobile Safari/537.36',
        'viewport': {
            'width': 640,
            'height': 360,
            'deviceScaleFactor': 3,
            'isMobile': true,
            'hasTouch': true,
            'isLandscape': true
        }
    },
    {
        'name': 'Nexus 5X',
        'userAgent': 'Mozilla/5.0 (Linux; Android 8.0.0; Nexus 5X Build/OPR4.170623.006) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3765.0 Mobile Safari/537.36',
        'viewport': {
            'width': 412,
            'height': 732,
            'deviceScaleFactor': 2.625,
            'isMobile': true,
            'hasTouch': true,
            'isLandscape': false
        }
    },
    {
        'name': 'Nexus 5X landscape',
        'userAgent': 'Mozilla/5.0 (Linux; Android 8.0.0; Nexus 5X Build/OPR4.170623.006) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3765.0 Mobile Safari/537.36',
        'viewport': {
            'width': 732,
            'height': 412,
            'deviceScaleFactor': 2.625,
            'isMobile': true,
            'hasTouch': true,
            'isLandscape': true
        }
    },
    {
        'name': 'Nexus 6',
        'userAgent': 'Mozilla/5.0 (Linux; Android 7.1.1; Nexus 6 Build/N6F26U) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3765.0 Mobile Safari/537.36',
        'viewport': {
            'width': 412,
            'height': 732,
            'deviceScaleFactor': 3.5,
            'isMobile': true,
            'hasTouch': true,
            'isLandscape': false
        }
    },
    {
        'name': 'Nexus 6 landscape',
        'userAgent': 'Mozilla/5.0 (Linux; Android 7.1.1; Nexus 6 Build/N6F26U) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3765.0 Mobile Safari/537.36',
        'viewport': {
            'width': 732,
            'height': 412,
            'deviceScaleFactor': 3.5,
            'isMobile': true,
            'hasTouch': true,
            'isLandscape': true
        }
    },
    {
        'name': 'Nexus 6P',
        'userAgent': 'Mozilla/5.0 (Linux; Android 8.0.0; Nexus 6P Build/OPP3.170518.006) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3765.0 Mobile Safari/537.36',
        'viewport': {
            'width': 412,
            'height': 732,
            'deviceScaleFactor': 3.5,
            'isMobile': true,
            'hasTouch': true,
            'isLandscape': false
        }
    },
    {
        'name': 'Nexus 6P landscape',
        'userAgent': 'Mozilla/5.0 (Linux; Android 8.0.0; Nexus 6P Build/OPP3.170518.006) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3765.0 Mobile Safari/537.36',
        'viewport': {
            'width': 732,
            'height': 412,
            'deviceScaleFactor': 3.5,
            'isMobile': true,
            'hasTouch': true,
            'isLandscape': true
        }
    },
    {
        'name': 'Nexus 7',
        'userAgent': 'Mozilla/5.0 (Linux; Android 6.0.1; Nexus 7 Build/MOB30X) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3765.0 Safari/537.36',
        'viewport': {
            'width': 600,
            'height': 960,
            'deviceScaleFactor': 2,
            'isMobile': true,
            'hasTouch': true,
            'isLandscape': false
        }
    },
    {
        'name': 'Nexus 7 landscape',
        'userAgent': 'Mozilla/5.0 (Linux; Android 6.0.1; Nexus 7 Build/MOB30X) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3765.0 Safari/537.36',
        'viewport': {
            'width': 960,
            'height': 600,
            'deviceScaleFactor': 2,
            'isMobile': true,
            'hasTouch': true,
            'isLandscape': true
        }
    },
    {
        'name': 'Nokia Lumia 520',
        'userAgent': 'Mozilla/5.0 (compatible; MSIE 10.0; Windows Phone 8.0; Trident/6.0; IEMobile/10.0; ARM; Touch; NOKIA; Lumia 520)',
        'viewport': {
            'width': 320,
            'height': 533,
            'deviceScaleFactor': 1.5,
            'isMobile': true,
            'hasTouch': true,
            'isLandscape': false
        }
    },
    {
        'name': 'Nokia Lumia 520 landscape',
        'userAgent': 'Mozilla/5.0 (compatible; MSIE 10.0; Windows Phone 8.0; Trident/6.0; IEMobile/10.0; ARM; Touch; NOKIA; Lumia 520)',
        'viewport': {
            'width': 533,
            'height': 320,
            'deviceScaleFactor': 1.5,
            'isMobile': true,
            'hasTouch': true,
            'isLandscape': true
        }
    },
    {
        'name': 'Nokia N9',
        'userAgent': 'Mozilla/5.0 (MeeGo; NokiaN9) AppleWebKit/534.13 (KHTML, like Gecko) NokiaBrowser/8.5.0 Mobile Safari/534.13',
        'viewport': {
            'width': 480,
            'height': 854,
            'deviceScaleFactor': 1,
            'isMobile': true,
            'hasTouch': true,
            'isLandscape': false
        }
    },
    {
        'name': 'Nokia N9 landscape',
        'userAgent': 'Mozilla/5.0 (MeeGo; NokiaN9) AppleWebKit/534.13 (KHTML, like Gecko) NokiaBrowser/8.5.0 Mobile Safari/534.13',
        'viewport': {
            'width': 854,
            'height': 480,
            'deviceScaleFactor': 1,
            'isMobile': true,
            'hasTouch': true,
            'isLandscape': true
        }
    },
    {
        'name': 'Pixel 2',
        'userAgent': 'Mozilla/5.0 (Linux; Android 8.0; Pixel 2 Build/OPD3.170816.012) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3765.0 Mobile Safari/537.36',
        'viewport': {
            'width': 411,
            'height': 731,
            'deviceScaleFactor': 2.625,
            'isMobile': true,
            'hasTouch': true,
            'isLandscape': false
        }
    },
    {
        'name': 'Pixel 2 landscape',
        'userAgent': 'Mozilla/5.0 (Linux; Android 8.0; Pixel 2 Build/OPD3.170816.012) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3765.0 Mobile Safari/537.36',
        'viewport': {
            'width': 731,
            'height': 411,
            'deviceScaleFactor': 2.625,
            'isMobile': true,
            'hasTouch': true,
            'isLandscape': true
        }
    },
    {
        'name': 'Pixel 2 XL',
        'userAgent': 'Mozilla/5.0 (Linux; Android 8.0.0; Pixel 2 XL Build/OPD1.170816.004) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3765.0 Mobile Safari/537.36',
        'viewport': {
            'width': 411,
            'height': 823,
            'deviceScaleFactor': 3.5,
            'isMobile': true,
            'hasTouch': true,
            'isLandscape': false
        }
    },
    {
        'name': 'Pixel 2 XL landscape',
        'userAgent': 'Mozilla/5.0 (Linux; Android 8.0.0; Pixel 2 XL Build/OPD1.170816.004) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3765.0 Mobile Safari/537.36',
        'viewport': {
            'width': 823,
            'height': 411,
            'deviceScaleFactor': 3.5,
            'isMobile': true,
            'hasTouch': true,
            'isLandscape': true
        }
    }
];
for (const device of module.exports)
    module.exports[device.name] = device;
// hack-puppeteer - module.exports
const DeviceDescriptors = module.exports;



/*
lib https://github.com/GoogleChrome/puppeteer/blob/v1.19.0/Dialog.js
*/
/**
  * Copyright 2017 Google Inc. All rights reserved.
  *
  * Licensed under the Apache License, Version 2.0 (the "License");
  * you may not use this file except in compliance with the License.
  * You may obtain a copy of the License at
  *
  *     http://www.apache.org/licenses/LICENSE-2.0
  *
  * Unless required by applicable law or agreed to in writing, software
  * distributed under the License is distributed on an "AS IS" BASIS,
  * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  * See the License for the specific language governing permissions and
  * limitations under the License.
  */

// const {assert} = require('./helper');

class Dialog {
    /**
      * @param {!Puppeteer.CDPSession} client
      * @param {string} type
      * @param {string} message
      * @param {(string|undefined)} defaultValue
      */
    constructor(client, type, message, defaultValue = '') {
        this._client = client;
        this._type = type;
        this._message = message;
        this._handled = false;
        this._defaultValue = defaultValue;
    }

    /**
      * @return {string}
      */
    type() {
        return this._type;
    }

    /**
      * @return {string}
      */
    message() {
        return this._message;
    }

    /**
      * @return {string}
      */
    defaultValue() {
        return this._defaultValue;
    }

    /**
      * @param {string=} promptText
      */
    async accept(promptText) {
        assert(!this._handled, 'Cannot accept dialog which is already handled!');
        this._handled = true;
        await this._client.send('Page.handleJavaScriptDialog', {
            accept: true,
            promptText: promptText
        });
    }

    async dismiss() {
        assert(!this._handled, 'Cannot dismiss dialog which is already handled!');
        this._handled = true;
        await this._client.send('Page.handleJavaScriptDialog', {
            accept: false
        });
    }
}

Dialog.Type = {
    Alert: 'alert',
    BeforeUnload: 'beforeunload',
    Confirm: 'confirm',
    Prompt: 'prompt'
};

module.exports = {Dialog};



/*
lib https://github.com/GoogleChrome/puppeteer/blob/v1.19.0/EmulationManager.js
*/
/**
  * Copyright 2017 Google Inc. All rights reserved.
  *
  * Licensed under the Apache License, Version 2.0 (the "License");
  * you may not use this file except in compliance with the License.
  * You may obtain a copy of the License at
  *
  *     http://www.apache.org/licenses/LICENSE-2.0
  *
  * Unless required by applicable law or agreed to in writing, software
  * distributed under the License is distributed on an "AS IS" BASIS,
  * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  * See the License for the specific language governing permissions and
  * limitations under the License.
  */

class EmulationManager {
    /**
      * @param {!Puppeteer.CDPSession} client
      */
    constructor(client) {
        this._client = client;
        this._emulatingMobile = false;
        this._hasTouch = false;
    }

    /**
      * @param {!Puppeteer.Viewport} viewport
      * @return {Promise<boolean>}
      */
    async emulateViewport(viewport) {
        const mobile = viewport.isMobile || false;
        const width = viewport.width;
        const height = viewport.height;
        const deviceScaleFactor = viewport.deviceScaleFactor || 1;
        /** @type {Protocol.Emulation.ScreenOrientation} */
        const screenOrientation = viewport.isLandscape ? { angle: 90, type: 'landscapePrimary' } : { angle: 0, type: 'portraitPrimary' };
        const hasTouch = viewport.hasTouch || false;

        await Promise.all([
            this._client.send('Emulation.setDeviceMetricsOverride', { mobile, width, height, deviceScaleFactor, screenOrientation }),
            this._client.send('Emulation.setTouchEmulationEnabled', {
                enabled: hasTouch
            })
        ]);

        const reloadNeeded = this._emulatingMobile !== mobile || this._hasTouch !== hasTouch;
        this._emulatingMobile = mobile;
        this._hasTouch = hasTouch;
        return reloadNeeded;
    }
}

module.exports = {EmulationManager};



/*
lib https://github.com/GoogleChrome/puppeteer/blob/v1.19.0/Events.js
*/
/**
  * Copyright 2019 Google Inc. All rights reserved.
  *
  * Licensed under the Apache License, Version 2.0 (the "License");
  * you may not use this file except in compliance with the License.
  * You may obtain a copy of the License at
  *
  *     http://www.apache.org/licenses/LICENSE-2.0
  *
  * Unless required by applicable law or agreed to in writing, software
  * distributed under the License is distributed on an "AS IS" BASIS,
  * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  * See the License for the specific language governing permissions and
  * limitations under the License.
  */

const Events = {
    Page: {
        Close: 'close',
        Console: 'console',
        Dialog: 'dialog',
        DOMContentLoaded: 'domcontentloaded',
        Error: 'error',
        // Can't use just 'error' due to node.js special treatment of error events.
        // @see https://nodejs.org/api/events.html#events_error_events
        PageError: 'pageerror',
        Request: 'request',
        Response: 'response',
        RequestFailed: 'requestfailed',
        RequestFinished: 'requestfinished',
        FrameAttached: 'frameattached',
        FrameDetached: 'framedetached',
        FrameNavigated: 'framenavigated',
        Load: 'load',
        Metrics: 'metrics',
        Popup: 'popup',
        WorkerCreated: 'workercreated',
        WorkerDestroyed: 'workerdestroyed',
    },

    Browser: {
        TargetCreated: 'targetcreated',
        TargetDestroyed: 'targetdestroyed',
        TargetChanged: 'targetchanged',
        Disconnected: 'disconnected'
    },

    BrowserContext: {
        TargetCreated: 'targetcreated',
        TargetDestroyed: 'targetdestroyed',
        TargetChanged: 'targetchanged',
    },

    NetworkManager: {
        Request: Symbol('Events.NetworkManager.Request'),
        Response: Symbol('Events.NetworkManager.Response'),
        RequestFailed: Symbol('Events.NetworkManager.RequestFailed'),
        RequestFinished: Symbol('Events.NetworkManager.RequestFinished'),
    },

    FrameManager: {
        FrameAttached: Symbol('Events.FrameManager.FrameAttached'),
        FrameNavigated: Symbol('Events.FrameManager.FrameNavigated'),
        FrameDetached: Symbol('Events.FrameManager.FrameDetached'),
        LifecycleEvent: Symbol('Events.FrameManager.LifecycleEvent'),
        FrameNavigatedWithinDocument: Symbol('Events.FrameManager.FrameNavigatedWithinDocument'),
        ExecutionContextCreated: Symbol('Events.FrameManager.ExecutionContextCreated'),
        ExecutionContextDestroyed: Symbol('Events.FrameManager.ExecutionContextDestroyed'),
    },

    Connection: {
        Disconnected: Symbol('Events.Connection.Disconnected'),
    },

    CDPSession: {
        Disconnected: Symbol('Events.CDPSession.Disconnected'),
    },
};

module.exports = { Events };



/*
lib https://github.com/GoogleChrome/puppeteer/blob/v1.19.0/ExecutionContext.js
*/
/**
  * Copyright 2017 Google Inc. All rights reserved.
  *
  * Licensed under the Apache License, Version 2.0 (the "License");
  * you may not use this file except in compliance with the License.
  * You may obtain a copy of the License at
  *
  *     http://www.apache.org/licenses/LICENSE-2.0
  *
  * Unless required by applicable law or agreed to in writing, software
  * distributed under the License is distributed on an "AS IS" BASIS,
  * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  * See the License for the specific language governing permissions and
  * limitations under the License.
  */

// const {helper, assert} = require('./helper');
// const {createJSHandle, JSHandle} = require('./JSHandle');

const EVALUATION_SCRIPT_URL = '__puppeteer_evaluation_script__';
const SOURCE_URL_REGEX = /^[\040\t]*\/\/[@#] sourceURL=\s*(\S*?)\s*$/m;

class ExecutionContext {
    /**
      * @param {!Puppeteer.CDPSession} client
      * @param {!Protocol.Runtime.ExecutionContextDescription} contextPayload
      * @param {?Puppeteer.DOMWorld} world
      */
    constructor(client, contextPayload, world) {
        this._client = client;
        this._world = world;
        this._contextId = contextPayload.id;
    }

    /**
      * @return {?Puppeteer.Frame}
      */
    frame() {
        return this._world ? this._world.frame() : null;
    }

    /**
      * @param {Function|string} pageFunction
      * @param {...*} args
      * @return {!Promise<*>}
      */
    async evaluate(pageFunction, ...args) {
        return await this._evaluateInternal(true /* returnByValue */, pageFunction, ...args);
    }

    /**
      * @param {Function|string} pageFunction
      * @param {...*} args
      * @return {!Promise<!JSHandle>}
      */
    async evaluateHandle(pageFunction, ...args) {
        return this._evaluateInternal(false /* returnByValue */, pageFunction, ...args);
    }

    /**
      * @param {boolean} returnByValue
      * @param {Function|string} pageFunction
      * @param {...*} args
      * @return {!Promise<*>}
      */
    async _evaluateInternal(returnByValue, pageFunction, ...args) {
        const suffix = `//# sourceURL=${EVALUATION_SCRIPT_URL}`;

        if (helper.isString(pageFunction)) {
            const contextId = this._contextId;
            const expression = /** @type {string} */ (pageFunction);
            const expressionWithSourceUrl = SOURCE_URL_REGEX.test(expression) ? expression : expression + '\n' + suffix;
            const {exceptionDetails, result: remoteObject} = await this._client.send('Runtime.evaluate', {
                expression: expressionWithSourceUrl,
                contextId,
                returnByValue,
                awaitPromise: true,
                userGesture: true
            }).catch(rewriteError);
            if (exceptionDetails)
                throw new Error('Evaluation failed: ' + helper.getExceptionMessage(exceptionDetails));
            return returnByValue ? helper.valueFromRemoteObject(remoteObject) : createJSHandle(this, remoteObject);
        }

        if (typeof pageFunction !== 'function')
            throw new Error(`Expected to get |string| or |function| as the first argument, but got "${pageFunction}" instead.`);

        let functionText = pageFunction.toString();
        try {
            new Function('(' + functionText + ')');
        } catch (e1) {
            // This means we might have a function shorthand. Try another
            // time prefixing 'function '.
            if (functionText.startsWith('async '))
                functionText = 'async function ' + functionText.substring('async '.length);
            else
                functionText = 'function ' + functionText;
            try {
                new Function('(' + functionText  + ')');
            } catch (e2) {
                // We tried hard to serialize, but there's a weird beast here.
                throw new Error('Passed function is not well-serializable!');
            }
        }
        let callFunctionOnPromise;
        try {
            callFunctionOnPromise = this._client.send('Runtime.callFunctionOn', {
                functionDeclaration: functionText + '\n' + suffix + '\n',
                executionContextId: this._contextId,
                arguments: args.map(convertArgument.bind(this)),
                returnByValue,
                awaitPromise: true,
                userGesture: true
            });
        } catch (err) {
            if (err instanceof TypeError && err.message.startsWith('Converting circular structure to JSON'))
                err.message += ' Are you passing a nested JSHandle?';
            throw err;
        }
        const { exceptionDetails, result: remoteObject } = await callFunctionOnPromise.catch(rewriteError);
        if (exceptionDetails)
            throw new Error('Evaluation failed: ' + helper.getExceptionMessage(exceptionDetails));
        return returnByValue ? helper.valueFromRemoteObject(remoteObject) : createJSHandle(this, remoteObject);

        /**
          * @param {*} arg
          * @return {*}
          * @this {ExecutionContext}
          */
        function convertArgument(arg) {
            if (typeof arg === 'bigint') // eslint-disable-line valid-typeof
                return { unserializableValue: `${arg.toString()}n` };
            if (Object.is(arg, -0))
                return { unserializableValue: '-0' };
            if (Object.is(arg, Infinity))
                return { unserializableValue: 'Infinity' };
            if (Object.is(arg, -Infinity))
                return { unserializableValue: '-Infinity' };
            if (Object.is(arg, NaN))
                return { unserializableValue: 'NaN' };
            const objectHandle = arg && (arg instanceof JSHandle) ? arg : null;
            if (objectHandle) {
                if (objectHandle._context !== this)
                    throw new Error('JSHandles can be evaluated only in the context they were created!');
                if (objectHandle._disposed)
                    throw new Error('JSHandle is disposed!');
                if (objectHandle._remoteObject.unserializableValue)
                    return { unserializableValue: objectHandle._remoteObject.unserializableValue };
                if (!objectHandle._remoteObject.objectId)
                    return { value: objectHandle._remoteObject.value };
                return { objectId: objectHandle._remoteObject.objectId };
            }
            return { value: arg };
        }

        /**
          * @param {!Error} error
          * @return {!Protocol.Runtime.evaluateReturnValue}
          */
        function rewriteError(error) {
            if (error.message.includes('Object reference chain is too long'))
                return {result: {type: 'undefined'}};
            if (error.message.includes('Object couldn\'t be returned by value'))
                return {result: {type: 'undefined'}};

            if (error.message.endsWith('Cannot find context with specified id'))
                throw new Error('Execution context was destroyed, most likely because of a navigation.');
            throw error;
        }
    }

    /**
      * @param {!JSHandle} prototypeHandle
      * @return {!Promise<!JSHandle>}
      */
    async queryObjects(prototypeHandle) {
        assert(!prototypeHandle._disposed, 'Prototype JSHandle is disposed!');
        assert(prototypeHandle._remoteObject.objectId, 'Prototype JSHandle must not be referencing primitive value');
        const response = await this._client.send('Runtime.queryObjects', {
            prototypeObjectId: prototypeHandle._remoteObject.objectId
        });
        return createJSHandle(this, response.objects);
    }

    /**
      * @param {Puppeteer.ElementHandle} elementHandle
      * @return {Promise<Puppeteer.ElementHandle>}
      */
    async _adoptElementHandle(elementHandle) {
        assert(elementHandle.executionContext() !== this, 'Cannot adopt handle that already belongs to this execution context');
        assert(this._world, 'Cannot adopt handle without DOMWorld');
        const nodeInfo = await this._client.send('DOM.describeNode', {
            objectId: elementHandle._remoteObject.objectId,
        });
        const {object} = await this._client.send('DOM.resolveNode', {
            backendNodeId: nodeInfo.node.backendNodeId,
            executionContextId: this._contextId,
        });
        return /** @type {Puppeteer.ElementHandle}*/(createJSHandle(this, object));
    }
}

module.exports = {ExecutionContext, EVALUATION_SCRIPT_URL};



/*
lib https://github.com/GoogleChrome/puppeteer/blob/v1.19.0/FrameManager.js
*/
/**
  * Copyright 2017 Google Inc. All rights reserved.
  *
  * Licensed under the Apache License, Version 2.0 (the "License");
  * you may not use this file except in compliance with the License.
  * You may obtain a copy of the License at
  *
  *     http://www.apache.org/licenses/LICENSE-2.0
  *
  * Unless required by applicable law or agreed to in writing, software
  * distributed under the License is distributed on an "AS IS" BASIS,
  * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  * See the License for the specific language governing permissions and
  * limitations under the License.
  */

// const EventEmitter = require('events');
// const {helper, assert, debugError} = require('./helper');
// const {Events} = require('./Events');
// const {ExecutionContext, EVALUATION_SCRIPT_URL} = require('./ExecutionContext');
// const {LifecycleWatcher} = require('./LifecycleWatcher');
// const {DOMWorld} = require('./DOMWorld');
// const {NetworkManager} = require('./NetworkManager');

const UTILITY_WORLD_NAME = '__puppeteer_utility_world__';

class FrameManager extends EventEmitter {
    /**
      * @param {!Puppeteer.CDPSession} client
      * @param {!Puppeteer.Page} page
      * @param {boolean} ignoreHTTPSErrors
      */
    constructor(client, page, ignoreHTTPSErrors) {
        super();
        this._client = client;
        this._page = page;
        this._networkManager = new NetworkManager(client, ignoreHTTPSErrors);
        this._networkManager.setFrameManager(this);
        /** @type {!Map<string, !Frame>} */
        this._frames = new Map();
        /** @type {!Map<number, !ExecutionContext>} */
        this._contextIdToContext = new Map();
        /** @type {!Set<string>} */
        this._isolatedWorlds = new Set();

        this._client.on('Page.frameAttached', event => this._onFrameAttached(event.frameId, event.parentFrameId));
        this._client.on('Page.frameNavigated', event => this._onFrameNavigated(event.frame));
        this._client.on('Page.navigatedWithinDocument', event => this._onFrameNavigatedWithinDocument(event.frameId, event.url));
        this._client.on('Page.frameDetached', event => this._onFrameDetached(event.frameId));
        this._client.on('Page.frameStoppedLoading', event => this._onFrameStoppedLoading(event.frameId));
        this._client.on('Runtime.executionContextCreated', event => this._onExecutionContextCreated(event.context));
        this._client.on('Runtime.executionContextDestroyed', event => this._onExecutionContextDestroyed(event.executionContextId));
        this._client.on('Runtime.executionContextsCleared', event => this._onExecutionContextsCleared());
        this._client.on('Page.lifecycleEvent', event => this._onLifecycleEvent(event));
    }

    async initialize() {
        const [,{frameTree}] = await Promise.all([
            this._client.send('Page.enable'),
            this._client.send('Page.getFrameTree'),
        ]);
        this._handleFrameTree(frameTree);
        await Promise.all([
            this._client.send('Page.setLifecycleEventsEnabled', { enabled: true }),
            this._client.send('Runtime.enable', {}).then(() => this._ensureIsolatedWorld(UTILITY_WORLD_NAME)),
            this._networkManager.initialize(),
        ]);
    }

    /**
      * @return {!NetworkManager}
      */
    networkManager() {
        return this._networkManager;
    }

    /**
      * @param {!Puppeteer.Frame} frame
      * @param {string} url
      * @param {!{referer?: string, timeout?: number, waitUntil?: string|!Array<string>}=} options
      * @return {!Promise<?Puppeteer.Response>}
      */
    async navigateFrame(frame, url, options = {}) {
        assertNoLegacyNavigationOptions(options);
        const {
            referer = this._networkManager.extraHTTPHeaders()['referer'],
            waitUntil = ['load'],
        } = options;

        const watcher = new LifecycleWatcher(this, frame, waitUntil, timeout);
        let ensureNewDocumentNavigation = false;
        let error = await Promise.race([
            navigate(this._client, url, referer, frame._id),
            watcher.timeoutOrTerminationPromise(),
        ]);
        if (!error) {
            error = await Promise.race([
                watcher.timeoutOrTerminationPromise(),
                ensureNewDocumentNavigation ? watcher.newDocumentNavigationPromise() : watcher.sameDocumentNavigationPromise(),
            ]);
        }
        watcher.dispose();
        if (error)
            throw error;
        return watcher.navigationResponse();

        /**
          * @param {!Puppeteer.CDPSession} client
          * @param {string} url
          * @param {string} referrer
          * @param {string} frameId
          * @return {!Promise<?Error>}
          */
        async function navigate(client, url, referrer, frameId) {
            try {
                const response = await client.send('Page.navigate', {url, referrer, frameId});
                ensureNewDocumentNavigation = !!response.loaderId;
                return response.errorText ? new Error(`${response.errorText} at ${url}`) : null;
            } catch (error) {
                return error;
            }
        }
    }

    /**
      * @param {!Puppeteer.Frame} frame
      * @param {!{timeout?: number, waitUntil?: string|!Array<string>}=} options
      * @return {!Promise<?Puppeteer.Response>}
      */
    async waitForFrameNavigation(frame, options = {}) {
        assertNoLegacyNavigationOptions(options);
        const {
            waitUntil = ['load'],
        } = options;
        const watcher = new LifecycleWatcher(this, frame, waitUntil, timeout);
        const error = await Promise.race([
            watcher.timeoutOrTerminationPromise(),
            watcher.sameDocumentNavigationPromise(),
            watcher.newDocumentNavigationPromise()
        ]);
        watcher.dispose();
        if (error)
            throw error;
        return watcher.navigationResponse();
    }

    /**
      * @param {!Protocol.Page.lifecycleEventPayload} event
      */
    _onLifecycleEvent(event) {
        const frame = this._frames.get(event.frameId);
        if (!frame)
            return;
        frame._onLifecycleEvent(event.loaderId, event.name);
        this.emit(Events.FrameManager.LifecycleEvent, frame);
    }

    /**
      * @param {string} frameId
      */
    _onFrameStoppedLoading(frameId) {
        const frame = this._frames.get(frameId);
        if (!frame)
            return;
        frame._onLoadingStopped();
        this.emit(Events.FrameManager.LifecycleEvent, frame);
    }

    /**
      * @param {!Protocol.Page.FrameTree} frameTree
      */
    _handleFrameTree(frameTree) {
        if (frameTree.frame.parentId)
            this._onFrameAttached(frameTree.frame.id, frameTree.frame.parentId);
        this._onFrameNavigated(frameTree.frame);
        if (!frameTree.childFrames)
            return;

        for (const child of frameTree.childFrames)
            this._handleFrameTree(child);
    }

    /**
      * @return {!Puppeteer.Page}
      */
    page() {
        return this._page;
    }

    /**
      * @return {!Frame}
      */
    mainFrame() {
        return this._mainFrame;
    }

    /**
      * @return {!Array<!Frame>}
      */
    frames() {
        return Array.from(this._frames.values());
    }

    /**
      * @param {!string} frameId
      * @return {?Frame}
      */
    frame(frameId) {
        return this._frames.get(frameId) || null;
    }

    /**
      * @param {string} frameId
      * @param {?string} parentFrameId
      */
    _onFrameAttached(frameId, parentFrameId) {
        if (this._frames.has(frameId))
            return;
        assert(parentFrameId);
        const parentFrame = this._frames.get(parentFrameId);
        const frame = new Frame(this, this._client, parentFrame, frameId);
        this._frames.set(frame._id, frame);
        this.emit(Events.FrameManager.FrameAttached, frame);
    }

    /**
      * @param {!Protocol.Page.Frame} framePayload
      */
    _onFrameNavigated(framePayload) {
        const isMainFrame = !framePayload.parentId;
        let frame = isMainFrame ? this._mainFrame : this._frames.get(framePayload.id);
        assert(isMainFrame || frame, 'We either navigate top level or have old version of the navigated frame');

        // Detach all child frames first.
        if (frame) {
            for (const child of frame.childFrames())
                this._removeFramesRecursively(child);
        }

        // Update or create main frame.
        if (isMainFrame) {
            if (frame) {
                // Update frame id to retain frame identity on cross-process navigation.
                this._frames.delete(frame._id);
                frame._id = framePayload.id;
            } else {
                // Initial main frame navigation.
                frame = new Frame(this, this._client, null, framePayload.id);
            }
            this._frames.set(framePayload.id, frame);
            this._mainFrame = frame;
        }

        // Update frame payload.
        frame._navigated(framePayload);

        this.emit(Events.FrameManager.FrameNavigated, frame);
    }

    /**
      * @param {string} name
      */
    async _ensureIsolatedWorld(name) {
        if (this._isolatedWorlds.has(name))
            return;
        this._isolatedWorlds.add(name);
        await this._client.send('Page.addScriptToEvaluateOnNewDocument', {
            source: `//# sourceURL=${EVALUATION_SCRIPT_URL}`,
            worldName: name,
        }),
        await Promise.all(this.frames().map(frame => this._client.send('Page.createIsolatedWorld', {
            frameId: frame._id,
            grantUniveralAccess: true,
            worldName: name,
        }).catch(debugError))); // frames might be removed before we send this
    }

    /**
      * @param {string} frameId
      * @param {string} url
      */
    _onFrameNavigatedWithinDocument(frameId, url) {
        const frame = this._frames.get(frameId);
        if (!frame)
            return;
        frame._navigatedWithinDocument(url);
        this.emit(Events.FrameManager.FrameNavigatedWithinDocument, frame);
        this.emit(Events.FrameManager.FrameNavigated, frame);
    }

    /**
      * @param {string} frameId
      */
    _onFrameDetached(frameId) {
        const frame = this._frames.get(frameId);
        if (frame)
            this._removeFramesRecursively(frame);
    }

    _onExecutionContextCreated(contextPayload) {
        const frameId = contextPayload.auxData ? contextPayload.auxData.frameId : null;
        const frame = this._frames.get(frameId) || null;
        let world = null;
        if (frame) {
            if (contextPayload.auxData && !!contextPayload.auxData['isDefault']) {
                world = frame._mainWorld;
            } else if (contextPayload.name === UTILITY_WORLD_NAME && !frame._secondaryWorld._hasContext()) {
                // In case of multiple sessions to the same target, there's a race between
                // connections so we might end up creating multiple isolated worlds.
                // We can use either.
                world = frame._secondaryWorld;
            }
        }
        if (contextPayload.auxData && contextPayload.auxData['type'] === 'isolated')
            this._isolatedWorlds.add(contextPayload.name);
        /** @type {!ExecutionContext} */
        const context = new ExecutionContext(this._client, contextPayload, world);
        if (world)
            world._setContext(context);
        this._contextIdToContext.set(contextPayload.id, context);
    }

    /**
      * @param {number} executionContextId
      */
    _onExecutionContextDestroyed(executionContextId) {
        const context = this._contextIdToContext.get(executionContextId);
        if (!context)
            return;
        this._contextIdToContext.delete(executionContextId);
        if (context._world)
            context._world._setContext(null);
    }

    _onExecutionContextsCleared() {
        for (const context of this._contextIdToContext.values()) {
            if (context._world)
                context._world._setContext(null);
        }
        this._contextIdToContext.clear();
    }

    /**
      * @param {number} contextId
      * @return {!ExecutionContext}
      */
    executionContextById(contextId) {
        const context = this._contextIdToContext.get(contextId);
        assert(context, 'INTERNAL ERROR: missing context with id = ' + contextId);
        return context;
    }

    /**
      * @param {!Frame} frame
      */
    _removeFramesRecursively(frame) {
        for (const child of frame.childFrames())
            this._removeFramesRecursively(child);
        frame._detach();
        this._frames.delete(frame._id);
        this.emit(Events.FrameManager.FrameDetached, frame);
    }
}

/**
  * @unrestricted
  */
class Frame {
    /**
      * @param {!FrameManager} frameManager
      * @param {!Puppeteer.CDPSession} client
      * @param {?Frame} parentFrame
      * @param {string} frameId
      */
    constructor(frameManager, client, parentFrame, frameId) {
        this._frameManager = frameManager;
        this._client = client;
        this._parentFrame = parentFrame;
        this._url = '';
        this._id = frameId;
        this._detached = false;

        this._loaderId = '';
        /** @type {!Set<string>} */
        this._lifecycleEvents = new Set();
        /** @type {!DOMWorld} */
        this._mainWorld = new DOMWorld(frameManager, this);
        /** @type {!DOMWorld} */
        this._secondaryWorld = new DOMWorld(frameManager, this);

        /** @type {!Set<!Frame>} */
        this._childFrames = new Set();
        if (this._parentFrame)
            this._parentFrame._childFrames.add(this);
    }

    /**
      * @param {string} url
      * @param {!{referer?: string, timeout?: number, waitUntil?: string|!Array<string>}=} options
      * @return {!Promise<?Puppeteer.Response>}
      */
    async goto(url, options) {
        return await this._frameManager.navigateFrame(this, url, options);
    }

    /**
      * @return {!Array.<!Frame>}
      */
    childFrames() {
        return Array.from(this._childFrames);
    }

    /**
      * @param {!Protocol.Page.Frame} framePayload
      */
    _navigated(framePayload) {
        this._name = framePayload.name;
        // TODO(lushnikov): remove this once requestInterception has loaderId exposed.
        this._navigationURL = framePayload.url;
        this._url = framePayload.url;
    }

    /**
      * @param {string} url
      */
    _navigatedWithinDocument(url) {
        this._url = url;
    }

    /**
      * @param {string} loaderId
      * @param {string} name
      */
    _onLifecycleEvent(loaderId, name) {
        if (name === 'init') {
            this._loaderId = loaderId;
            this._lifecycleEvents.clear();
        }
        this._lifecycleEvents.add(name);
    }

    _onLoadingStopped() {
        this._lifecycleEvents.add('DOMContentLoaded');
        this._lifecycleEvents.add('load');
    }

    _detach() {
        this._detached = true;
        this._mainWorld._detach();
        this._secondaryWorld._detach();
        if (this._parentFrame)
            this._parentFrame._childFrames.delete(this);
        this._parentFrame = null;
    }
}

function assertNoLegacyNavigationOptions(options) {
    assert(options['networkIdleTimeout'] === undefined, 'ERROR: networkIdleTimeout option is no longer supported.');
    assert(options['networkIdleInflight'] === undefined, 'ERROR: networkIdleInflight option is no longer supported.');
    assert(options.waitUntil !== 'networkidle', 'ERROR: "networkidle" option is no longer supported. Use "networkidle2" instead');
}

module.exports = {FrameManager, Frame};



/*
lib https://github.com/GoogleChrome/puppeteer/blob/v1.19.0/Input.js
*/
/**
  * Copyright 2017 Google Inc. All rights reserved.
  *
  * Licensed under the Apache License, Version 2.0 (the 'License');
  * you may not use this file except in compliance with the License.
  * You may obtain a copy of the License at
  *
  *     http://www.apache.org/licenses/LICENSE-2.0
  *
  * Unless required by applicable law or agreed to in writing, software
  * distributed under the License is distributed on an 'AS IS' BASIS,
  * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  * See the License for the specific language governing permissions and
  * limitations under the License.
  */

// const {assert} = require('./helper');
// const keyDefinitions = require('./USKeyboardLayout');

/**
  * @typedef {Object} KeyDescription
  * @property {number} keyCode
  * @property {string} key
  * @property {string} text
  * @property {string} code
  * @property {number} location
  */

class Keyboard {
    /**
      * @param {!Puppeteer.CDPSession} client
      */
    constructor(client) {
        this._client = client;
        this._modifiers = 0;
        this._pressedKeys = new Set();
    }

    /**
      * @param {string} key
      * @param {{text?: string}=} options
      */
    async down(key, options = { text: undefined }) {
        const description = this._keyDescriptionForString(key);

        const autoRepeat = this._pressedKeys.has(description.code);
        this._pressedKeys.add(description.code);
        this._modifiers |= this._modifierBit(description.key);

        const text = options.text === undefined ? description.text : options.text;
        await this._client.send('Input.dispatchKeyEvent', {
            type: text ? 'keyDown' : 'rawKeyDown',
            modifiers: this._modifiers,
            windowsVirtualKeyCode: description.keyCode,
            code: description.code,
            key: description.key,
            text: text,
            unmodifiedText: text,
            autoRepeat,
            location: description.location,
            isKeypad: description.location === 3
        });
    }

    /**
      * @param {string} key
      * @return {number}
      */
    _modifierBit(key) {
        if (key === 'Alt')
            return 1;
        if (key === 'Control')
            return 2;
        if (key === 'Meta')
            return 4;
        if (key === 'Shift')
            return 8;
        return 0;
    }

    /**
      * @param {string} keyString
      * @return {KeyDescription}
      */
    _keyDescriptionForString(keyString) {
        const shift = this._modifiers & 8;
        const description = {
            key: '',
            keyCode: 0,
            code: '',
            text: '',
            location: 0
        };

        const definition = keyDefinitions[keyString];
        assert(definition, `Unknown key: "${keyString}"`);

        if (definition.key)
            description.key = definition.key;
        if (shift && definition.shiftKey)
            description.key = definition.shiftKey;

        if (definition.keyCode)
            description.keyCode = definition.keyCode;
        if (shift && definition.shiftKeyCode)
            description.keyCode = definition.shiftKeyCode;

        if (definition.code)
            description.code = definition.code;

        if (definition.location)
            description.location = definition.location;

        if (description.key.length === 1)
            description.text = description.key;

        if (definition.text)
            description.text = definition.text;
        if (shift && definition.shiftText)
            description.text = definition.shiftText;

        // if any modifiers besides shift are pressed, no text should be sent
        if (this._modifiers & ~8)
            description.text = '';

        return description;
    }

    /**
      * @param {string} key
      */
    async up(key) {
        const description = this._keyDescriptionForString(key);

        this._modifiers &= ~this._modifierBit(description.key);
        this._pressedKeys.delete(description.code);
        await this._client.send('Input.dispatchKeyEvent', {
            type: 'keyUp',
            modifiers: this._modifiers,
            key: description.key,
            windowsVirtualKeyCode: description.keyCode,
            code: description.code,
            location: description.location
        });
    }

    /**
      * @param {string} char
      */
    async sendCharacter(char) {
        await this._client.send('Input.insertText', {text: char});
    }

    /**
      * @param {string} text
      * @param {{delay: (number|undefined)}=} options
      */
    async type(text, options) {
        let delay = 0;
        if (options && options.delay)
            delay = options.delay;
        for (const char of text) {
            if (keyDefinitions[char])
                await this.press(char, {delay});
            else
                await this.sendCharacter(char);
            if (delay)
                await new Promise(f => setTimeout(f, delay));
        }
    }

    /**
      * @param {string} key
      * @param {!{delay?: number, text?: string}=} options
      */
    async press(key, options = {}) {
        const {delay = null} = options;
        await this.down(key, options);
        if (delay !== null)
            await new Promise(f => setTimeout(f, options.delay));
        await this.up(key);
    }
}

class Mouse {
    /**
      * @param {Puppeteer.CDPSession} client
      * @param {!Keyboard} keyboard
      */
    constructor(client, keyboard) {
        this._client = client;
        this._keyboard = keyboard;
        this._x = 0;
        this._y = 0;
        /** @type {'none'|'left'|'right'|'middle'} */
        this._button = 'none';
    }

    /**
      * @param {number} x
      * @param {number} y
      * @param {!{steps?: number}=} options
      */
    async move(x, y, options = {}) {
        const {steps = 1} = options;
        const fromX = this._x, fromY = this._y;
        this._x = x;
        this._y = y;
        for (let i = 1; i <= steps; i++) {
            await this._client.send('Input.dispatchMouseEvent', {
                type: 'mouseMoved',
                button: this._button,
                x: fromX + (this._x - fromX) * (i / steps),
                y: fromY + (this._y - fromY) * (i / steps),
                modifiers: this._keyboard._modifiers
            });
        }
    }

    /**
      * @param {number} x
      * @param {number} y
      * @param {!{delay?: number, button?: "left"|"right"|"middle", clickCount?: number}=} options
      */
    async click(x, y, options = {}) {
        const {delay = null} = options;
        if (delay !== null) {
            await Promise.all([
                this.move(x, y),
                this.down(options),
            ]);
            await new Promise(f => setTimeout(f, delay));
            await this.up(options);
        } else {
            await Promise.all([
                this.move(x, y),
                this.down(options),
                this.up(options),
            ]);
        }
    }

    /**
      * @param {!{button?: "left"|"right"|"middle", clickCount?: number}=} options
      */
    async down(options = {}) {
        const {button = 'left', clickCount = 1} = options;
        this._button = button;
        await this._client.send('Input.dispatchMouseEvent', {
            type: 'mousePressed',
            button,
            x: this._x,
            y: this._y,
            modifiers: this._keyboard._modifiers,
            clickCount
        });
    }

    /**
      * @param {!{button?: "left"|"right"|"middle", clickCount?: number}=} options
      */
    async up(options = {}) {
        const {button = 'left', clickCount = 1} = options;
        this._button = 'none';
        await this._client.send('Input.dispatchMouseEvent', {
            type: 'mouseReleased',
            button,
            x: this._x,
            y: this._y,
            modifiers: this._keyboard._modifiers,
            clickCount
        });
    }
}

class Touchscreen {
    /**
      * @param {Puppeteer.CDPSession} client
      * @param {Keyboard} keyboard
      */
    constructor(client, keyboard) {
        this._client = client;
        this._keyboard = keyboard;
    }

    /**
      * @param {number} x
      * @param {number} y
      */
    async tap(x, y) {
        // Touches appear to be lost during the first frame after navigation.
        // This waits a frame before sending the tap.
        // @see https://crbug.com/613219
        await this._client.send('Runtime.evaluate', {
            expression: 'new Promise(x => requestAnimationFrame(() => requestAnimationFrame(x)))',
            awaitPromise: true
        });

        const touchPoints = [{x: Math.round(x), y: Math.round(y)}];
        await this._client.send('Input.dispatchTouchEvent', {
            type: 'touchStart',
            touchPoints,
            modifiers: this._keyboard._modifiers
        });
        await this._client.send('Input.dispatchTouchEvent', {
            type: 'touchEnd',
            touchPoints: [],
            modifiers: this._keyboard._modifiers
        });
    }
}

module.exports = { Keyboard, Mouse, Touchscreen};



/*
lib https://github.com/GoogleChrome/puppeteer/blob/v1.19.0/LifecycleWatcher.js
*/
/**
  * Copyright 2019 Google Inc. All rights reserved.
  *
  * Licensed under the Apache License, Version 2.0 (the "License");
  * you may not use this file except in compliance with the License.
  * You may obtain a copy of the License at
  *
  *     http://www.apache.org/licenses/LICENSE-2.0
  *
  * Unless required by applicable law or agreed to in writing, software
  * distributed under the License is distributed on an "AS IS" BASIS,
  * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  * See the License for the specific language governing permissions and
  * limitations under the License.
  */

// const {helper, assert} = require('./helper');
// const {Events} = require('./Events');
// const {TimeoutError} = require('./Errors');

class LifecycleWatcher {
    /**
      * @param {!Puppeteer.FrameManager} frameManager
      * @param {!Puppeteer.Frame} frame
      * @param {string|!Array<string>} waitUntil
      * @param {number} timeout
      */
    constructor(frameManager, frame, waitUntil, timeout) {
        if (Array.isArray(waitUntil))
            waitUntil = waitUntil.slice();
        else if (typeof waitUntil === 'string')
            waitUntil = [waitUntil];
        this._expectedLifecycle = waitUntil.map(value => {
            const protocolEvent = puppeteerToProtocolLifecycle[value];
            assert(protocolEvent, 'Unknown value for options.waitUntil: ' + value);
            return protocolEvent;
        });

        this._frameManager = frameManager;
        this._frame = frame;
        this._initialLoaderId = frame._loaderId;
        this._timeout = timeout;
        /** @type {?Puppeteer.Request} */
        this._navigationRequest = null;
        this._eventListeners = [
            helper.addEventListener(frameManager._client, Events.CDPSession.Disconnected, () => this._terminate(new Error('Navigation failed because browser has disconnected!'))),
            helper.addEventListener(this._frameManager, Events.FrameManager.LifecycleEvent, this._checkLifecycleComplete.bind(this)),
            helper.addEventListener(this._frameManager, Events.FrameManager.FrameNavigatedWithinDocument, this._navigatedWithinDocument.bind(this)),
            helper.addEventListener(this._frameManager, Events.FrameManager.FrameDetached, this._onFrameDetached.bind(this)),
            helper.addEventListener(this._frameManager.networkManager(), Events.NetworkManager.Request, this._onRequest.bind(this)),
        ];

        this._sameDocumentNavigationPromise = new Promise(fulfill => {
            this._sameDocumentNavigationCompleteCallback = fulfill;
        });

        this._lifecyclePromise = new Promise(fulfill => {
            this._lifecycleCallback = fulfill;
        });

        this._newDocumentNavigationPromise = new Promise(fulfill => {
            this._newDocumentNavigationCompleteCallback = fulfill;
        });

        this._timeoutPromise = this._createTimeoutPromise();
        this._terminationPromise = new Promise(fulfill => {
            this._terminationCallback = fulfill;
        });
        this._checkLifecycleComplete();
    }

    /**
      * @param {!Puppeteer.Request} request
      */
    _onRequest(request) {
        if (request.frame() !== this._frame || !request.isNavigationRequest())
            return;
        this._navigationRequest = request;
    }

    /**
      * @param {!Puppeteer.Frame} frame
      */
    _onFrameDetached(frame) {
        if (this._frame === frame) {
            this._terminationCallback.call(null, new Error('Navigating frame was detached'));
            return;
        }
        this._checkLifecycleComplete();
    }

    /**
      * @return {?Puppeteer.Response}
      */
    navigationResponse() {
        return this._navigationRequest ? this._navigationRequest.response() : null;
    }

    /**
      * @param {!Error} error
      */
    _terminate(error) {
        this._terminationCallback.call(null, error);
    }

    /**
      * @return {!Promise<?Error>}
      */
    sameDocumentNavigationPromise() {
        return this._sameDocumentNavigationPromise;
    }

    /**
      * @return {!Promise<?Error>}
      */
    newDocumentNavigationPromise() {
        return this._newDocumentNavigationPromise;
    }

    /**
      * @return {!Promise}
      */
    lifecyclePromise() {
        return this._lifecyclePromise;
    }

    /**
      * @return {!Promise<?Error>}
      */
    timeoutOrTerminationPromise() {
        return Promise.race([this._timeoutPromise, this._terminationPromise]);
    }

    /**
      * @return {!Promise<?Error>}
      */
    _createTimeoutPromise() {
        if (!this._timeout)
            return new Promise(() => {});
        const errorMessage = 'Navigation Timeout Exceeded: ' + this._timeout + 'ms exceeded';
        return new Promise(fulfill => this._maximumTimer = setTimeout(fulfill, this._timeout))
                .then(() => new Error(errorMessage));
    }

    /**
      * @param {!Puppeteer.Frame} frame
      */
    _navigatedWithinDocument(frame) {
        if (frame !== this._frame)
            return;
        this._hasSameDocumentNavigation = true;
        this._checkLifecycleComplete();
    }

    _checkLifecycleComplete() {
        // We expect navigation to commit.
        if (!checkLifecycle(this._frame, this._expectedLifecycle))
            return;
        this._lifecycleCallback();
        if (this._frame._loaderId === this._initialLoaderId && !this._hasSameDocumentNavigation)
            return;
        if (this._hasSameDocumentNavigation)
            this._sameDocumentNavigationCompleteCallback();
        if (this._frame._loaderId !== this._initialLoaderId)
            this._newDocumentNavigationCompleteCallback();

        /**
          * @param {!Puppeteer.Frame} frame
          * @param {!Array<string>} expectedLifecycle
          * @return {boolean}
          */
        function checkLifecycle(frame, expectedLifecycle) {
            for (const event of expectedLifecycle) {
                if (!frame._lifecycleEvents.has(event))
                    return false;
            }
            for (const child of frame.childFrames()) {
                if (!checkLifecycle(child, expectedLifecycle))
                    return false;
            }
            return true;
        }
    }

    dispose() {
        helper.removeEventListeners(this._eventListeners);
        clearTimeout(this._maximumTimer);
    }
}

const puppeteerToProtocolLifecycle = {
    'load': 'load',
    'domcontentloaded': 'DOMContentLoaded',
    'networkidle0': 'networkIdle',
    'networkidle2': 'networkAlmostIdle',
};

module.exports = {LifecycleWatcher};



/*
lib https://github.com/GoogleChrome/puppeteer/blob/v1.19.0/Multimap.js
*/
/**
  * Copyright 2017 Google Inc. All rights reserved.
  *
  * Licensed under the Apache License, Version 2.0 (the "License");
  * you may not use this file except in compliance with the License.
  * You may obtain a copy of the License at
  *
  *     http://www.apache.org/licenses/LICENSE-2.0
  *
  * Unless required by applicable law or agreed to in writing, software
  * distributed under the License is distributed on an "AS IS" BASIS,
  * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  * See the License for the specific language governing permissions and
  * limitations under the License.
  */
/**
  * @template T
  * @template V
  */
class Multimap {
    constructor() {
        this._map = new Map();
    }

    /**
      * @param {T} key
      * @param {V} value
      */
    set(key, value) {
        let set = this._map.get(key);
        if (!set) {
            set = new Set();
            this._map.set(key, set);
        }
        set.add(value);
    }

    /**
      * @param {T} key
      * @return {!Set<V>}
      */
    get(key) {
        let result = this._map.get(key);
        if (!result)
            result = new Set();
        return result;
    }

    /**
      * @param {T} key
      * @return {boolean}
      */
    has(key) {
        return this._map.has(key);
    }

    /**
      * @param {T} key
      * @param {V} value
      * @return {boolean}
      */
    hasValue(key, value) {
        const set = this._map.get(key);
        if (!set)
            return false;
        return set.has(value);
    }

    /**
      * @return {number}
      */
    get size() {
        return this._map.size;
    }

    /**
      * @param {T} key
      * @param {V} value
      * @return {boolean}
      */
    delete(key, value) {
        const values = this.get(key);
        const result = values.delete(value);
        if (!values.size)
            this._map.delete(key);
        return result;
    }

    /**
      * @param {T} key
      */
    deleteAll(key) {
        this._map.delete(key);
    }

    /**
      * @param {T} key
      * @return {V}
      */
    firstValue(key) {
        const set = this._map.get(key);
        if (!set)
            return null;
        return set.values().next().value;
    }

    /**
      * @return {T}
      */
    firstKey() {
        return this._map.keys().next().value;
    }

    /**
      * @return {!Array<V>}
      */
    valuesArray() {
        const result = [];
        for (const key of this._map.keys())
            result.push(...Array.from(this._map.get(key).values()));
        return result;
    }

    /**
      * @return {!Array<T>}
      */
    keysArray() {
        return Array.from(this._map.keys());
    }

    clear() {
        this._map.clear();
    }
}

module.exports = Multimap;



/*
lib https://github.com/GoogleChrome/puppeteer/blob/v1.19.0/NetworkManager.js
*/
/**
  * Copyright 2017 Google Inc. All rights reserved.
  *
  * Licensed under the Apache License, Version 2.0 (the "License");
  * you may not use this file except in compliance with the License.
  * You may obtain a copy of the License at
  *
  *     http://www.apache.org/licenses/LICENSE-2.0
  *
  * Unless required by applicable law or agreed to in writing, software
  * distributed under the License is distributed on an "AS IS" BASIS,
  * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  * See the License for the specific language governing permissions and
  * limitations under the License.
  */
// const EventEmitter = require('events');
// const {helper, assert, debugError} = require('./helper');
// const {Events} = require('./Events');

class NetworkManager extends EventEmitter {
    /**
      * @param {!Puppeteer.CDPSession} client
      */
    constructor(client, ignoreHTTPSErrors) {
        super();
        this._client = client;
        this._ignoreHTTPSErrors = ignoreHTTPSErrors;
        this._frameManager = null;
        /** @type {!Map<string, !Request>} */
        this._requestIdToRequest = new Map();
        /** @type {!Map<string, !Protocol.Network.requestWillBeSentPayload>} */
        this._requestIdToRequestWillBeSentEvent = new Map();
        /** @type {!Object<string, string>} */
        this._extraHTTPHeaders = {};

        this._offline = false;

        /** @type {?{username: string, password: string}} */
        this._credentials = null;
        /** @type {!Set<string>} */
        this._attemptedAuthentications = new Set();
        this._userRequestInterceptionEnabled = false;
        this._protocolRequestInterceptionEnabled = false;
        this._userCacheDisabled = false;
        /** @type {!Map<string, string>} */
        this._requestIdToInterceptionId = new Map();

        this._client.on('Network.requestWillBeSent', this._onRequestWillBeSent.bind(this));
        this._client.on('Network.requestServedFromCache', this._onRequestServedFromCache.bind(this));
        this._client.on('Network.responseReceived', this._onResponseReceived.bind(this));
        this._client.on('Network.loadingFinished', this._onLoadingFinished.bind(this));
        this._client.on('Network.loadingFailed', this._onLoadingFailed.bind(this));
    }

    async initialize() {
        await this._client.send('Network.enable');
        if (this._ignoreHTTPSErrors)
            await this._client.send('Security.setIgnoreCertificateErrors', {ignore: true});
    }

    /**
      * @param {!Puppeteer.FrameManager} frameManager
      */
    setFrameManager(frameManager) {
        this._frameManager = frameManager;
    }

    /**
      * @param {?{username: string, password: string}} credentials
      */
    async authenticate(credentials) {
        this._credentials = credentials;
        await this._updateProtocolRequestInterception();
    }

    /**
      * @param {!Object<string, string>} extraHTTPHeaders
      */
    async setExtraHTTPHeaders(extraHTTPHeaders) {
        this._extraHTTPHeaders = {};
        for (const key of Object.keys(extraHTTPHeaders)) {
            const value = extraHTTPHeaders[key];
            assert(helper.isString(value), `Expected value of header "${key}" to be String, but "${typeof value}" is found.`);
            this._extraHTTPHeaders[key.toLowerCase()] = value;
        }
        await this._client.send('Network.setExtraHTTPHeaders', { headers: this._extraHTTPHeaders });
    }

    /**
      * @return {!Object<string, string>}
      */
    extraHTTPHeaders() {
        return Object.assign({}, this._extraHTTPHeaders);
    }

    /**
      * @param {!Protocol.Network.requestWillBeSentPayload} event
      */
    _onRequestWillBeSent(event) {
        // Request interception doesn't happen for data URLs with Network Service.
        if (this._protocolRequestInterceptionEnabled && !event.request.url.startsWith('data:')) {
            const requestId = event.requestId;
            const interceptionId = this._requestIdToInterceptionId.get(requestId);
            if (interceptionId) {
                this._onRequest(event, interceptionId);
                this._requestIdToInterceptionId.delete(requestId);
            } else {
                this._requestIdToRequestWillBeSentEvent.set(event.requestId, event);
            }
            return;
        }
        this._onRequest(event, null);
    }

    /**
      * @param {!Protocol.Network.requestWillBeSentPayload} event
      * @param {?string} interceptionId
      */
    _onRequest(event, interceptionId) {
        let redirectChain = [];
        if (event.redirectResponse) {
            const request = this._requestIdToRequest.get(event.requestId);
            // If we connect late to the target, we could have missed the requestWillBeSent event.
            if (request) {
                this._handleRequestRedirect(request, event.redirectResponse);
                redirectChain = request._redirectChain;
            }
        }
        const frame = event.frameId && this._frameManager ? this._frameManager.frame(event.frameId) : null;
        const request = new Request(this._client, frame, interceptionId, this._userRequestInterceptionEnabled, event, redirectChain);
        this._requestIdToRequest.set(event.requestId, request);
        this.emit(Events.NetworkManager.Request, request);
    }


    /**
      * @param {!Protocol.Network.requestServedFromCachePayload} event
      */
    _onRequestServedFromCache(event) {
        const request = this._requestIdToRequest.get(event.requestId);
        if (request)
            request._fromMemoryCache = true;
    }

    /**
      * @param {!Request} request
      * @param {!Protocol.Network.Response} responsePayload
      */
    _handleRequestRedirect(request, responsePayload) {
        const response = new Response(this._client, request, responsePayload);
        request._response = response;
        request._redirectChain.push(request);
        response._bodyLoadedPromiseFulfill.call(null, new Error('Response body is unavailable for redirect responses'));
        this._requestIdToRequest.delete(request._requestId);
        this._attemptedAuthentications.delete(request._interceptionId);
        this.emit(Events.NetworkManager.Response, response);
        this.emit(Events.NetworkManager.RequestFinished, request);
    }

    /**
      * @param {!Protocol.Network.responseReceivedPayload} event
      */
    _onResponseReceived(event) {
        const request = this._requestIdToRequest.get(event.requestId);
        // FileUpload sends a response without a matching request.
        if (!request)
            return;
        const response = new Response(this._client, request, event.response);
        request._response = response;
        this.emit(Events.NetworkManager.Response, response);
    }

    /**
      * @param {!Protocol.Network.loadingFinishedPayload} event
      */
    _onLoadingFinished(event) {
        const request = this._requestIdToRequest.get(event.requestId);
        // For certain requestIds we never receive requestWillBeSent event.
        // @see https://crbug.com/750469
        if (!request)
            return;

        // Under certain conditions we never get the Network.responseReceived
        // event from protocol. @see https://crbug.com/883475
        if (request.response())
            request.response()._bodyLoadedPromiseFulfill.call(null);
        this._requestIdToRequest.delete(request._requestId);
        this._attemptedAuthentications.delete(request._interceptionId);
        this.emit(Events.NetworkManager.RequestFinished, request);
    }

    /**
      * @param {!Protocol.Network.loadingFailedPayload} event
      */
    _onLoadingFailed(event) {
        const request = this._requestIdToRequest.get(event.requestId);
        // For certain requestIds we never receive requestWillBeSent event.
        // @see https://crbug.com/750469
        if (!request)
            return;
        request._failureText = event.errorText;
        const response = request.response();
        if (response)
            response._bodyLoadedPromiseFulfill.call(null);
        this._requestIdToRequest.delete(request._requestId);
        this._attemptedAuthentications.delete(request._interceptionId);
        this.emit(Events.NetworkManager.RequestFailed, request);
    }
}

class Request {
    /**
      * @param {!Puppeteer.CDPSession} client
      * @param {?Puppeteer.Frame} frame
      * @param {string} interceptionId
      * @param {boolean} allowInterception
      * @param {!Protocol.Network.requestWillBeSentPayload} event
      * @param {!Array<!Request>} redirectChain
      */
    constructor(client, frame, interceptionId, allowInterception, event, redirectChain) {
        this._client = client;
        this._requestId = event.requestId;
        this._isNavigationRequest = event.requestId === event.loaderId && event.type === 'Document';
        this._interceptionId = interceptionId;
        this._allowInterception = allowInterception;
        this._interceptionHandled = false;
        this._response = null;
        this._failureText = null;

        this._url = event.request.url;
        this._resourceType = event.type.toLowerCase();
        this._method = event.request.method;
        this._postData = event.request.postData;
        this._headers = {};
        this._frame = frame;
        this._redirectChain = redirectChain;
        for (const key of Object.keys(event.request.headers))
            this._headers[key.toLowerCase()] = event.request.headers[key];

        this._fromMemoryCache = false;
    }

    /**
      * @return {string}
      */
    url() {
        return this._url;
    }

    /**
      * @return {string}
      */
    resourceType() {
        return this._resourceType;
    }

    /**
      * @return {string}
      */
    method() {
        return this._method;
    }

    /**
      * @return {string|undefined}
      */
    postData() {
        return this._postData;
    }

    /**
      * @return {!Object}
      */
    headers() {
        return this._headers;
    }

    /**
      * @return {?Response}
      */
    response() {
        return this._response;
    }

    /**
      * @return {?Puppeteer.Frame}
      */
    frame() {
        return this._frame;
    }

    /**
      * @return {boolean}
      */
    isNavigationRequest() {
        return this._isNavigationRequest;
    }

    /**
      * @return {!Array<!Request>}
      */
    redirectChain() {
        return this._redirectChain.slice();
    }

    /**
      * @return {?{errorText: string}}
      */
    failure() {
        if (!this._failureText)
            return null;
        return {
            errorText: this._failureText
        };
    }

    /**
      * @param {!{url?: string, method?:string, postData?: string, headers?: !Object}} overrides
      */
    async continue(overrides = {}) {
        // Request interception is not supported for data: urls.
        if (this._url.startsWith('data:'))
            return;
        assert(this._allowInterception, 'Request Interception is not enabled!');
        assert(!this._interceptionHandled, 'Request is already handled!');
        const {
            url,
            method,
            postData,
            headers
        } = overrides;
        this._interceptionHandled = true;
        await this._client.send('Fetch.continueRequest', {
            requestId: this._interceptionId,
            url,
            method,
            postData,
            headers: headers ? headersArray(headers) : undefined,
        }).catch(error => {
            // In certain cases, protocol will return error if the request was already canceled
            // or the page was closed. We should tolerate these errors.
            debugError(error);
        });
    }

    /**
      * @param {!{status: number, headers: Object, contentType: string, body: (string|Buffer)}} response
      */
    async respond(response) {
        // Mocking responses for dataURL requests is not currently supported.
        if (this._url.startsWith('data:'))
            return;
        assert(this._allowInterception, 'Request Interception is not enabled!');
        assert(!this._interceptionHandled, 'Request is already handled!');
        this._interceptionHandled = true;

        const responseBody = response.body && helper.isString(response.body) ? Buffer.from(/** @type {string} */(response.body)) : /** @type {?Buffer} */(response.body || null);

        /** @type {!Object<string, string>} */
        const responseHeaders = {};
        if (response.headers) {
            for (const header of Object.keys(response.headers))
                responseHeaders[header.toLowerCase()] = response.headers[header];
        }
        if (response.contentType)
            responseHeaders['content-type'] = response.contentType;
        if (responseBody && !('content-length' in responseHeaders))
            responseHeaders['content-length'] = String(Buffer.byteLength(responseBody));

        await this._client.send('Fetch.fulfillRequest', {
            requestId: this._interceptionId,
            responseCode: response.status || 200,
            responsePhrase: STATUS_TEXTS[response.status || 200],
            responseHeaders: headersArray(responseHeaders),
            body: responseBody ? responseBody.toString('base64') : undefined,
        }).catch(error => {
            // In certain cases, protocol will return error if the request was already canceled
            // or the page was closed. We should tolerate these errors.
            debugError(error);
        });
    }

    /**
      * @param {string=} errorCode
      */
    async abort(errorCode = 'failed') {
        // Request interception is not supported for data: urls.
        if (this._url.startsWith('data:'))
            return;
        const errorReason = errorReasons[errorCode];
        assert(errorReason, 'Unknown error code: ' + errorCode);
        assert(this._allowInterception, 'Request Interception is not enabled!');
        assert(!this._interceptionHandled, 'Request is already handled!');
        this._interceptionHandled = true;
        await this._client.send('Fetch.failRequest', {
            requestId: this._interceptionId,
            errorReason
        }).catch(error => {
            // In certain cases, protocol will return error if the request was already canceled
            // or the page was closed. We should tolerate these errors.
            debugError(error);
        });
    }
}

const errorReasons = {
    'aborted': 'Aborted',
    'accessdenied': 'AccessDenied',
    'addressunreachable': 'AddressUnreachable',
    'blockedbyclient': 'BlockedByClient',
    'blockedbyresponse': 'BlockedByResponse',
    'connectionaborted': 'ConnectionAborted',
    'connectionclosed': 'ConnectionClosed',
    'connectionfailed': 'ConnectionFailed',
    'connectionrefused': 'ConnectionRefused',
    'connectionreset': 'ConnectionReset',
    'internetdisconnected': 'InternetDisconnected',
    'namenotresolved': 'NameNotResolved',
    'timedout': 'TimedOut',
    'failed': 'Failed',
};

class Response {
    /**
      * @param {!Puppeteer.CDPSession} client
      * @param {!Request} request
      * @param {!Protocol.Network.Response} responsePayload
      */
    constructor(client, request, responsePayload) {
        this._client = client;
        this._request = request;
        this._contentPromise = null;

        this._bodyLoadedPromise = new Promise(fulfill => {
            this._bodyLoadedPromiseFulfill = fulfill;
        });

        this._remoteAddress = {
            ip: responsePayload.remoteIPAddress,
            port: responsePayload.remotePort,
        };
        this._status = responsePayload.status;
        this._statusText = responsePayload.statusText;
        this._url = request.url();
        this._fromDiskCache = !!responsePayload.fromDiskCache;
        this._fromServiceWorker = !!responsePayload.fromServiceWorker;
        this._headers = {};
        for (const key of Object.keys(responsePayload.headers))
            this._headers[key.toLowerCase()] = responsePayload.headers[key];
        this._securityDetails = responsePayload.securityDetails ? new SecurityDetails(responsePayload.securityDetails) : null;
    }

    /**
      * @return {{ip: string, port: number}}
      */
    remoteAddress() {
        return this._remoteAddress;
    }

    /**
      * @return {string}
      */
    url() {
        return this._url;
    }

    /**
      * @return {boolean}
      */
    ok() {
        return this._status === 0 || (this._status >= 200 && this._status <= 299);
    }

    /**
      * @return {number}
      */
    status() {
        return this._status;
    }

    /**
      * @return {string}
      */
    statusText() {
        return this._statusText;
    }

    /**
      * @return {!Object}
      */
    headers() {
        return this._headers;
    }

    /**
      * @return {?SecurityDetails}
      */
    securityDetails() {
        return this._securityDetails;
    }

    /**
      * @return {!Promise<!Buffer>}
      */
    buffer() {
        if (!this._contentPromise) {
            this._contentPromise = this._bodyLoadedPromise.then(async error => {
                if (error)
                    throw error;
                const response = await this._client.send('Network.getResponseBody', {
                    requestId: this._request._requestId
                });
                return Buffer.from(response.body, response.base64Encoded ? 'base64' : 'utf8');
            });
        }
        return this._contentPromise;
    }

    /**
      * @return {!Promise<string>}
      */
    async text() {
        const content = await this.buffer();
        return content.toString('utf8');
    }

    /**
      * @return {!Promise<!Object>}
      */
    async json() {
        const content = await this.text();
        return JSON.parse(content);
    }

    /**
      * @return {!Request}
      */
    request() {
        return this._request;
    }

    /**
      * @return {boolean}
      */
    fromCache() {
        return this._fromDiskCache || this._request._fromMemoryCache;
    }

    /**
      * @return {boolean}
      */
    fromServiceWorker() {
        return this._fromServiceWorker;
    }

    /**
      * @return {?Puppeteer.Frame}
      */
    frame() {
        return this._request.frame();
    }
}

class SecurityDetails {
    /**
      * @param {!Protocol.Network.SecurityDetails} securityPayload
      */
    constructor(securityPayload) {
        this._subjectName = securityPayload['subjectName'];
        this._issuer = securityPayload['issuer'];
        this._validFrom = securityPayload['validFrom'];
        this._validTo = securityPayload['validTo'];
        this._protocol = securityPayload['protocol'];
    }

    /**
      * @return {string}
      */
    subjectName() {
        return this._subjectName;
    }

    /**
      * @return {string}
      */
    issuer() {
        return this._issuer;
    }

    /**
      * @return {number}
      */
    validFrom() {
        return this._validFrom;
    }

    /**
      * @return {number}
      */
    validTo() {
        return this._validTo;
    }

    /**
      * @return {string}
      */
    protocol() {
        return this._protocol;
    }
}

/**
  * @param {Object<string, string>} headers
  * @return {!Array<{name: string, value: string}>}
  */
function headersArray(headers) {
    const result = [];
    for (const name in headers)
        result.push({name, value: headers[name] + ''});
    return result;
}

// List taken from https://www.iana.org/assignments/http-status-codes/http-status-codes.xhtml with extra 306 and 418 codes.
const STATUS_TEXTS = {
    '100': 'Continue',
    '101': 'Switching Protocols',
    '102': 'Processing',
    '103': 'Early Hints',
    '200': 'OK',
    '201': 'Created',
    '202': 'Accepted',
    '203': 'Non-Authoritative Information',
    '204': 'No Content',
    '205': 'Reset Content',
    '206': 'Partial Content',
    '207': 'Multi-Status',
    '208': 'Already Reported',
    '226': 'IM Used',
    '300': 'Multiple Choices',
    '301': 'Moved Permanently',
    '302': 'Found',
    '303': 'See Other',
    '304': 'Not Modified',
    '305': 'Use Proxy',
    '306': 'Switch Proxy',
    '307': 'Temporary Redirect',
    '308': 'Permanent Redirect',
    '400': 'Bad Request',
    '401': 'Unauthorized',
    '402': 'Payment Required',
    '403': 'Forbidden',
    '404': 'Not Found',
    '405': 'Method Not Allowed',
    '406': 'Not Acceptable',
    '407': 'Proxy Authentication Required',
    '408': 'Request Timeout',
    '409': 'Conflict',
    '410': 'Gone',
    '411': 'Length Required',
    '412': 'Precondition Failed',
    '413': 'Payload Too Large',
    '414': 'URI Too Long',
    '415': 'Unsupported Media Type',
    '416': 'Range Not Satisfiable',
    '417': 'Expectation Failed',
    '418': 'I\'m a teapot',
    '421': 'Misdirected Request',
    '422': 'Unprocessable Entity',
    '423': 'Locked',
    '424': 'Failed Dependency',
    '425': 'Too Early',
    '426': 'Upgrade Required',
    '428': 'Precondition Required',
    '429': 'Too Many Requests',
    '431': 'Request Header Fields Too Large',
    '451': 'Unavailable For Legal Reasons',
    '500': 'Internal Server Error',
    '501': 'Not Implemented',
    '502': 'Bad Gateway',
    '503': 'Service Unavailable',
    '504': 'Gateway Timeout',
    '505': 'HTTP Version Not Supported',
    '506': 'Variant Also Negotiates',
    '507': 'Insufficient Storage',
    '508': 'Loop Detected',
    '510': 'Not Extended',
    '511': 'Network Authentication Required',
};

module.exports = {Request, Response, NetworkManager, SecurityDetails};



/*
lib https://github.com/GoogleChrome/puppeteer/blob/v1.19.0/Page.js
*/
/**
  * Copyright 2017 Google Inc. All rights reserved.
  *
  * Licensed under the Apache License, Version 2.0 (the "License");
  * you may not use this file except in compliance with the License.
  * You may obtain a copy of the License at
  *
  *     http://www.apache.org/licenses/LICENSE-2.0
  *
  * Unless required by applicable law or agreed to in writing, software
  * distributed under the License is distributed on an "AS IS" BASIS,
  * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  * See the License for the specific language governing permissions and
  * limitations under the License.
  */

// const fs = require('fs');
// const path = require('path');
// const EventEmitter = require('events');
// const mime = require('mime');
// const {Events} = require('./Events');
// const {Connection} = require('./Connection');
// const {Dialog} = require('./Dialog');
// const {EmulationManager} = require('./EmulationManager');
// const {FrameManager} = require('./FrameManager');
// const {Keyboard, Mouse, Touchscreen} = require('./Input');
// const Tracing = require('./Tracing');
// const {helper, debugError, assert} = require('./helper');
// const {Coverage} = require('./Coverage');
// const {Worker} = require('./Worker');
// const {createJSHandle} = require('./JSHandle');
// const {Accessibility} = require('./Accessibility');
const writeFileAsync = helper.promisify(fs.writeFile);

class Page extends EventEmitter {
    /**
      * @param {!Puppeteer.CDPSession} client
      * @param {!Puppeteer.Target} target
      * @param {boolean} ignoreHTTPSErrors
      * @param {?Puppeteer.Viewport} defaultViewport
      * @param {!Puppeteer.TaskQueue} screenshotTaskQueue
      * @return {!Promise<!Page>}
      */
    static async create(client, target, ignoreHTTPSErrors, defaultViewport, screenshotTaskQueue) {
        const page = new Page(client, target, ignoreHTTPSErrors, screenshotTaskQueue);
        await page._initialize();
        if (defaultViewport)
            await page.setViewport(defaultViewport);
        return page;
    }

    /**
      * @param {!Puppeteer.CDPSession} client
      * @param {!Puppeteer.Target} target
      * @param {boolean} ignoreHTTPSErrors
      * @param {!Puppeteer.TaskQueue} screenshotTaskQueue
      */
    constructor(client, target, ignoreHTTPSErrors, screenshotTaskQueue) {
        super();
        this._closed = false;
        this._client = client;
        this._target = target;
        this._keyboard = new Keyboard(client);
        this._mouse = new Mouse(client, this._keyboard);
        this._touchscreen = new Touchscreen(client, this._keyboard);
        this._accessibility = new Accessibility(client);
        /** @type {!FrameManager} */
        this._frameManager = new FrameManager(client, this, ignoreHTTPSErrors);
        this._emulationManager = new EmulationManager(client);
        /** @type {!Map<string, Function>} */
        this._pageBindings = new Map();
        this._coverage = new Coverage(client);
        this._javascriptEnabled = true;
        /** @type {?Puppeteer.Viewport} */
        this._viewport = null;

        this._screenshotTaskQueue = screenshotTaskQueue;

        /** @type {!Map<string, Worker>} */
        this._workers = new Map();
        client.on('Target.attachedToTarget', event => {
            if (event.targetInfo.type !== 'worker') {
                // If we don't detach from service workers, they will never die.
                client.send('Target.detachFromTarget', {
                    sessionId: event.sessionId
                }).catch(debugError);
                return;
            }
            const session = Connection.fromSession(client).session(event.sessionId);
            const worker = new Worker(session, event.targetInfo.url, this._addConsoleMessage.bind(this), this._handleException.bind(this));
            this._workers.set(event.sessionId, worker);
            this.emit(Events.Page.WorkerCreated, worker);
        });
        client.on('Target.detachedFromTarget', event => {
            const worker = this._workers.get(event.sessionId);
            if (!worker)
                return;
            this.emit(Events.Page.WorkerDestroyed, worker);
            this._workers.delete(event.sessionId);
        });

        this._frameManager.on(Events.FrameManager.FrameAttached, event => this.emit(Events.Page.FrameAttached, event));
        this._frameManager.on(Events.FrameManager.FrameDetached, event => this.emit(Events.Page.FrameDetached, event));
        this._frameManager.on(Events.FrameManager.FrameNavigated, event => this.emit(Events.Page.FrameNavigated, event));

        const networkManager = this._frameManager.networkManager();
        networkManager.on(Events.NetworkManager.Request, event => this.emit(Events.Page.Request, event));
        networkManager.on(Events.NetworkManager.Response, event => this.emit(Events.Page.Response, event));
        networkManager.on(Events.NetworkManager.RequestFailed, event => this.emit(Events.Page.RequestFailed, event));
        networkManager.on(Events.NetworkManager.RequestFinished, event => this.emit(Events.Page.RequestFinished, event));
        this._fileChooserInterceptionIsDisabled = false;
        this._fileChooserInterceptors = new Set();

        client.on('Page.domContentEventFired', event => this.emit(Events.Page.DOMContentLoaded));
        client.on('Page.loadEventFired', event => this.emit(Events.Page.Load));
        client.on('Runtime.consoleAPICalled', event => this._onConsoleAPI(event));
        client.on('Runtime.bindingCalled', event => this._onBindingCalled(event));
        client.on('Page.javascriptDialogOpening', event => this._onDialog(event));
        client.on('Runtime.exceptionThrown', exception => this._handleException(exception.exceptionDetails));
        client.on('Inspector.targetCrashed', event => this._onTargetCrashed());
        client.on('Performance.metrics', event => this._emitMetrics(event));
        client.on('Log.entryAdded', event => this._onLogEntryAdded(event));
        client.on('Page.fileChooserOpened', event => this._onFileChooser(event));
        this._target._isClosedPromise.then(() => {
            this.emit(Events.Page.Close);
            this._closed = true;
        });
    }

    async _initialize() {
        await Promise.all([
            this._frameManager.initialize(),
            this._client.send('Target.setAutoAttach', {autoAttach: true, waitForDebuggerOnStart: false, flatten: true}),
            this._client.send('Performance.enable', {}),
            this._client.send('Log.enable', {}),
            this._client.send('Page.setInterceptFileChooserDialog', {enabled: true}).catch(e => {
                this._fileChooserInterceptionIsDisabled = true;
            }),
        ]);
    }

    /**
      * @return {!Puppeteer.Target}
      */
    target() {
        return this._target;
    }

    /**
      * @return {!Puppeteer.Browser}
      */
    browser() {
        return this._target.browser();
    }

    /**
      * @return {!Puppeteer.BrowserContext}
      */
    browserContext() {
        return this._target.browserContext();
    }

    _onTargetCrashed() {
        this.emit('error', new Error('Page crashed!'));
    }

    /**
      * @param {!Protocol.Log.entryAddedPayload} event
      */
    _onLogEntryAdded(event) {
        const {level, text, args, source, url, lineNumber} = event.entry;
        if (args)
            args.map(arg => helper.releaseObject(this._client, arg));
        if (source !== 'worker')
            this.emit(Events.Page.Console, new ConsoleMessage(level, text, [], {url, lineNumber}));
    }

    /**
      * @return {!Puppeteer.Frame}
      */
    mainFrame() {
        return this._frameManager.mainFrame();
    }

    /**
      * @return {!Keyboard}
      */
    get keyboard() {
        return this._keyboard;
    }

    /**
      * @return {!Touchscreen}
      */
    get touchscreen() {
        return this._touchscreen;
    }

    /**
      * @return {!Coverage}
      */
    get coverage() {
        return this._coverage;
    }

    /**
      * @return {!Accessibility}
      */
    get accessibility() {
        return this._accessibility;
    }

    /**
      * @return {!Array<Puppeteer.Frame>}
      */
    frames() {
        return this._frameManager.frames();
    }

    /**
      * @return {!Array<!Worker>}
      */
    workers() {
        return Array.from(this._workers.values());
    }

    /**
      * @param {boolean} value
      */
    async setRequestInterception(value) {
        return this._frameManager.networkManager().setRequestInterception(value);
    }

    /**
      * @param {boolean} enabled
      */
    setOfflineMode(enabled) {
        return this._frameManager.networkManager().setOfflineMode(enabled);
    }

    /**
      * @param {string} selector
      * @return {!Promise<?Puppeteer.ElementHandle>}
      */
    async $(selector) {
        return this.mainFrame().$(selector);
    }

    /**
      * @param {Function|string} pageFunction
      * @param {!Array<*>} args
      * @return {!Promise<!Puppeteer.JSHandle>}
      */
    async evaluateHandle(pageFunction, ...args) {
        const context = await this.mainFrame().executionContext();
        return context.evaluateHandle(pageFunction, ...args);
    }

    /**
      * @param {!Puppeteer.JSHandle} prototypeHandle
      * @return {!Promise<!Puppeteer.JSHandle>}
      */
    async queryObjects(prototypeHandle) {
        const context = await this.mainFrame().executionContext();
        return context.queryObjects(prototypeHandle);
    }

    /**
      * @param {string} selector
      * @param {Function|string} pageFunction
      * @param {!Array<*>} args
      * @return {!Promise<(!Object|undefined)>}
      */
    async $eval(selector, pageFunction, ...args) {
        return this.mainFrame().$eval(selector, pageFunction, ...args);
    }

    /**
      * @param {string} selector
      * @param {Function|string} pageFunction
      * @param {!Array<*>} args
      * @return {!Promise<(!Object|undefined)>}
      */
    async $$eval(selector, pageFunction, ...args) {
        return this.mainFrame().$$eval(selector, pageFunction, ...args);
    }

    /**
      * @param {string} selector
      * @return {!Promise<!Array<!Puppeteer.ElementHandle>>}
      */
    async $$(selector) {
        return this.mainFrame().$$(selector);
    }

    /**
      * @param {string} expression
      * @return {!Promise<!Array<!Puppeteer.ElementHandle>>}
      */
    async $x(expression) {
        return this.mainFrame().$x(expression);
    }

    /**
      * @param {!Array<string>} urls
      * @return {!Promise<!Array<Network.Cookie>>}
      */
    async cookies(...urls) {
        return (await this._client.send('Network.getCookies', {
            urls: urls.length ? urls : [this.url()]
        })).cookies;
    }

    /**
      * @param {Array<Protocol.Network.deleteCookiesParameters>} cookies
      */
    async deleteCookie(...cookies) {
        const pageURL = this.url();
        for (const cookie of cookies) {
            const item = Object.assign({}, cookie);
            if (!cookie.url && pageURL.startsWith('http'))
                item.url = pageURL;
            await this._client.send('Network.deleteCookies', item);
        }
    }

    /**
      * @param {Array<Network.CookieParam>} cookies
      */
    async setCookie(...cookies) {
        const pageURL = this.url();
        const startsWithHTTP = pageURL.startsWith('http');
        const items = cookies.map(cookie => {
            const item = Object.assign({}, cookie);
            if (!item.url && startsWithHTTP)
                item.url = pageURL;
            assert(item.url !== 'about:blank', `Blank page can not have cookie "${item.name}"`);
            assert(!String.prototype.startsWith.call(item.url || '', 'data:'), `Data URL page can not have cookie "${item.name}"`);
            return item;
        });
        await this.deleteCookie(...items);
        if (items.length)
            await this._client.send('Network.setCookies', { cookies: items });
    }

    /**
      * @param {!{url?: string, path?: string, content?: string, type?: string}} options
      * @return {!Promise<!Puppeteer.ElementHandle>}
      */
    async addScriptTag(options) {
        return this.mainFrame().addScriptTag(options);
    }

    /**
      * @param {!{url?: string, path?: string, content?: string}} options
      * @return {!Promise<!Puppeteer.ElementHandle>}
      */
    async addStyleTag(options) {
        return this.mainFrame().addStyleTag(options);
    }

    /**
      * @param {string} name
      * @param {Function} puppeteerFunction
      */
    async exposeFunction(name, puppeteerFunction) {
        if (this._pageBindings.has(name))
            throw new Error(`Failed to add page binding with name ${name}: window['${name}'] already exists!`);
        this._pageBindings.set(name, puppeteerFunction);

        const expression = helper.evaluationString(addPageBinding, name);
        await this._client.send('Runtime.addBinding', {name: name});
        await this._client.send('Page.addScriptToEvaluateOnNewDocument', {source: expression});
        await Promise.all(this.frames().map(frame => frame.evaluate(expression).catch(debugError)));

        function addPageBinding(bindingName) {
            const binding = window[bindingName];
            window[bindingName] = (...args) => {
                const me = window[bindingName];
                let callbacks = me['callbacks'];
                if (!callbacks) {
                    callbacks = new Map();
                    me['callbacks'] = callbacks;
                }
                const seq = (me['lastSeq'] || 0) + 1;
                me['lastSeq'] = seq;
                const promise = new Promise((resolve, reject) => callbacks.set(seq, {resolve, reject}));
                binding(JSON.stringify({name: bindingName, seq, args}));
                return promise;
            };
        }
    }

    /**
      * @param {?{username: string, password: string}} credentials
      */
    async authenticate(credentials) {
        return this._frameManager.networkManager().authenticate(credentials);
    }

    /**
      * @param {!Object<string, string>} headers
      */
    async setExtraHTTPHeaders(headers) {
        return this._frameManager.networkManager().setExtraHTTPHeaders(headers);
    }

    /**
      * @param {string} userAgent
      */
    async setUserAgent(userAgent) {
        return this._frameManager.networkManager().setUserAgent(userAgent);
    }

    /**
      * @return {!Promise<!Metrics>}
      */
    async metrics() {
        const response = await this._client.send('Performance.getMetrics');
        return this._buildMetricsObject(response.metrics);
    }

    /**
      * @param {!Protocol.Performance.metricsPayload} event
      */
    _emitMetrics(event) {
        this.emit(Events.Page.Metrics, {
            title: event.title,
            metrics: this._buildMetricsObject(event.metrics)
        });
    }

    /**
      * @param {?Array<!Protocol.Performance.Metric>} metrics
      * @return {!Metrics}
      */
    _buildMetricsObject(metrics) {
        const result = {};
        for (const metric of metrics || []) {
            if (supportedMetrics.has(metric.name))
                result[metric.name] = metric.value;
        }
        return result;
    }

    /**
      * @param {!Protocol.Runtime.ExceptionDetails} exceptionDetails
      */
    _handleException(exceptionDetails) {
        const message = helper.getExceptionMessage(exceptionDetails);
        const err = new Error(message);
        err.stack = ''; // Don't report clientside error with a node stack attached
        this.emit(Events.Page.PageError, err);
    }

    /**
      * @param {!Protocol.Runtime.consoleAPICalledPayload} event
      */
    async _onConsoleAPI(event) {
        if (event.executionContextId === 0) {
            // DevTools protocol stores the last 1000 console messages. These
            // messages are always reported even for removed execution contexts. In
            // this case, they are marked with executionContextId = 0 and are
            // reported upon enabling Runtime agent.
            //
            // Ignore these messages since:
            // - there's no execution context we can use to operate with message
            //   arguments
            // - these messages are reported before Puppeteer clients can subscribe
            //   to the 'console'
            //   page event.
            //
            // @see https://github.com/GoogleChrome/puppeteer/issues/3865
            return;
        }
        const context = this._frameManager.executionContextById(event.executionContextId);
        const values = event.args.map(arg => createJSHandle(context, arg));
        this._addConsoleMessage(event.type, values, event.stackTrace);
    }

    /**
      * @param {!Protocol.Runtime.bindingCalledPayload} event
      */
    async _onBindingCalled(event) {
        const {name, seq, args} = JSON.parse(event.payload);
        let expression = null;
        try {
            const result = await this._pageBindings.get(name)(...args);
            expression = helper.evaluationString(deliverResult, name, seq, result);
        } catch (error) {
            if (error instanceof Error)
                expression = helper.evaluationString(deliverError, name, seq, error.message, error.stack);
            else
                expression = helper.evaluationString(deliverErrorValue, name, seq, error);
        }
        this._client.send('Runtime.evaluate', { expression, contextId: event.executionContextId }).catch(debugError);

        /**
          * @param {string} name
          * @param {number} seq
          * @param {*} result
          */
        function deliverResult(name, seq, result) {
            window[name]['callbacks'].get(seq).resolve(result);
            window[name]['callbacks'].delete(seq);
        }

        /**
          * @param {string} name
          * @param {number} seq
          * @param {string} message
          * @param {string} stack
          */
        function deliverError(name, seq, message, stack) {
            const error = new Error(message);
            error.stack = stack;
            window[name]['callbacks'].get(seq).reject(error);
            window[name]['callbacks'].delete(seq);
        }

        /**
          * @param {string} name
          * @param {number} seq
          * @param {*} value
          */
        function deliverErrorValue(name, seq, value) {
            window[name]['callbacks'].get(seq).reject(value);
            window[name]['callbacks'].delete(seq);
        }
    }

    /**
      * @param {string} type
      * @param {!Array<!Puppeteer.JSHandle>} args
      * @param {Protocol.Runtime.StackTrace=} stackTrace
      */
    _addConsoleMessage(type, args, stackTrace) {
        if (!this.listenerCount(Events.Page.Console)) {
            args.forEach(arg => arg.dispose());
            return;
        }
        const textTokens = [];
        for (const arg of args) {
            const remoteObject = arg._remoteObject;
            if (remoteObject.objectId)
                textTokens.push(arg.toString());
            else
                textTokens.push(helper.valueFromRemoteObject(remoteObject));
        }
        const location = stackTrace && stackTrace.callFrames.length ? {
            url: stackTrace.callFrames[0].url,
            lineNumber: stackTrace.callFrames[0].lineNumber,
            columnNumber: stackTrace.callFrames[0].columnNumber,
        } : {};
        const message = new ConsoleMessage(type, textTokens.join(' '), args, location);
        this.emit(Events.Page.Console, message);
    }

    _onDialog(event) {
        let dialogType = null;
        if (event.type === 'alert')
            dialogType = Dialog.Type.Alert;
        else if (event.type === 'confirm')
            dialogType = Dialog.Type.Confirm;
        else if (event.type === 'prompt')
            dialogType = Dialog.Type.Prompt;
        else if (event.type === 'beforeunload')
            dialogType = Dialog.Type.BeforeUnload;
        assert(dialogType, 'Unknown javascript dialog type: ' + event.type);
        const dialog = new Dialog(this._client, dialogType, event.message, event.defaultPrompt);
        this.emit(Events.Page.Dialog, dialog);
    }

    /**
      * @return {!string}
      */
    url() {
        return this.mainFrame().url();
    }

    /**
      * @return {!Promise<string>}
      */
    async content() {
        return await this._frameManager.mainFrame().content();
    }

    /**
      * @param {string} html
      * @param {!{timeout?: number, waitUntil?: string|!Array<string>}=} options
      */
    async setContent(html, options) {
        await this._frameManager.mainFrame().setContent(html, options);
    }

    /**
      * @param {string} url
      * @param {!{referer?: string, timeout?: number, waitUntil?: string|!Array<string>}=} options
      * @return {!Promise<?Puppeteer.Response>}
      */
    async goto(url, options) {
        return await this._frameManager.mainFrame().goto(url, options);
    }

    /**
      * @param {!{timeout?: number, waitUntil?: string|!Array<string>}=} options
      * @return {!Promise<?Puppeteer.Response>}
      */
    async reload(options) {
        const [response] = await Promise.all([
            this.waitForNavigation(options),
            this._client.send('Page.reload')
        ]);
        return response;
    }

    /**
      * @param {!{timeout?: number, waitUntil?: string|!Array<string>}=} options
      * @return {!Promise<?Puppeteer.Response>}
      */
    async waitForNavigation(options = {}) {
        return await this._frameManager.mainFrame().waitForNavigation(options);
    }

    /**
      * @param {(string|Function)} urlOrPredicate
      * @param {!{timeout?: number}=} options
      * @return {!Promise<!Puppeteer.Request>}
      */
    async waitForRequest(urlOrPredicate, options = {}) {
        return helper.waitForEvent(this._frameManager.networkManager(), Events.NetworkManager.Request, request => {
            if (helper.isString(urlOrPredicate))
                return (urlOrPredicate === request.url());
            if (typeof urlOrPredicate === 'function')
                return !!(urlOrPredicate(request));
            return false;
        }, timeout);
    }

    /**
      * @param {(string|Function)} urlOrPredicate
      * @param {!{timeout?: number}=} options
      * @return {!Promise<!Puppeteer.Response>}
      */
    async waitForResponse(urlOrPredicate, options = {}) {
        return helper.waitForEvent(this._frameManager.networkManager(), Events.NetworkManager.Response, response => {
            if (helper.isString(urlOrPredicate))
                return (urlOrPredicate === response.url());
            if (typeof urlOrPredicate === 'function')
                return !!(urlOrPredicate(response));
            return false;
        }, timeout);
    }

    /**
      * @param {!{timeout?: number, waitUntil?: string|!Array<string>}=} options
      * @return {!Promise<?Puppeteer.Response>}
      */
    async goBack(options) {
        return this._go(-1, options);
    }

    /**
      * @param {!{timeout?: number, waitUntil?: string|!Array<string>}=} options
      * @return {!Promise<?Puppeteer.Response>}
      */
    async goForward(options) {
        return this._go(+1, options);
    }

    /**
      * @param {!{timeout?: number, waitUntil?: string|!Array<string>}=} options
      * @return {!Promise<?Puppeteer.Response>}
      */
    async _go(delta, options) {
        const history = await this._client.send('Page.getNavigationHistory');
        const entry = history.entries[history.currentIndex + delta];
        if (!entry)
            return null;
        const [response] = await Promise.all([
            this.waitForNavigation(options),
            this._client.send('Page.navigateToHistoryEntry', {entryId: entry.id}),
        ]);
        return response;
    }

    async bringToFront() {
        await this._client.send('Page.bringToFront');
    }

    /**
      * @param {!{viewport: !Puppeteer.Viewport, userAgent: string}} options
      */
    async emulate(options) {
        await Promise.all([
            this.setViewport(options.viewport),
            this.setUserAgent(options.userAgent)
        ]);
    }

    /**
      * @param {boolean} enabled
      */
    async setJavaScriptEnabled(enabled) {
        if (this._javascriptEnabled === enabled)
            return;
        this._javascriptEnabled = enabled;
        await this._client.send('Emulation.setScriptExecutionDisabled', { value: !enabled });
    }

    /**
      * @param {boolean} enabled
      */
    async setBypassCSP(enabled) {
        await this._client.send('Page.setBypassCSP', { enabled });
    }

    /**
      * @param {?string} mediaType
      */
    async emulateMedia(mediaType) {
        assert(mediaType === 'screen' || mediaType === 'print' || mediaType === null, 'Unsupported media type: ' + mediaType);
        await this._client.send('Emulation.setEmulatedMedia', {media: mediaType || ''});
    }

    /**
      * @param {!Puppeteer.Viewport} viewport
      */
    async setViewport(viewport) {
        const needsReload = await this._emulationManager.emulateViewport(viewport);
        this._viewport = viewport;
        if (needsReload)
            await this.reload();
    }

    /**
      * @param {"png"|"jpeg"} format
      * @param {!ScreenshotOptions=} options
      * @return {!Promise<!Buffer|!String>}
      */
    async _screenshotTask(format, options) {
        await this._client.send('Target.activateTarget', {targetId: this._target._targetId});
        let clip = options.clip ? processClip(options.clip) : undefined;

        if (options.fullPage) {
            const metrics = await this._client.send('Page.getLayoutMetrics');
            const width = Math.ceil(metrics.contentSize.width);
            const height = Math.ceil(metrics.contentSize.height);

            // Overwrite clip for full page at all times.
            clip = { x: 0, y: 0, width, height, scale: 1 };
            const {
                isMobile = false,
                deviceScaleFactor = 1,
                isLandscape = false
            } = this._viewport || {};
            /** @type {!Protocol.Emulation.ScreenOrientation} */
            const screenOrientation = isLandscape ? { angle: 90, type: 'landscapePrimary' } : { angle: 0, type: 'portraitPrimary' };
            await this._client.send('Emulation.setDeviceMetricsOverride', { mobile: isMobile, width, height, deviceScaleFactor, screenOrientation });
        }
        const shouldSetDefaultBackground = options.omitBackground && format === 'png';
        if (shouldSetDefaultBackground)
            await this._client.send('Emulation.setDefaultBackgroundColorOverride', { color: { r: 0, g: 0, b: 0, a: 0 } });
        const result = await this._client.send('Page.captureScreenshot', { format, quality: options.quality, clip });
        if (shouldSetDefaultBackground)
            await this._client.send('Emulation.setDefaultBackgroundColorOverride');

        if (options.fullPage && this._viewport)
            await this.setViewport(this._viewport);

        const buffer = options.encoding === 'base64' ? result.data : Buffer.from(result.data, 'base64');
        if (options.path)
            await writeFileAsync(options.path, buffer);
        return buffer;

        function processClip(clip) {
            const x = Math.round(clip.x);
            const y = Math.round(clip.y);
            const width = Math.round(clip.width + clip.x - x);
            const height = Math.round(clip.height + clip.y - y);
            return {x, y, width, height, scale: 1};
        }
    }
}
module.exports = {Page};



/*
lib https://github.com/GoogleChrome/puppeteer/blob/v1.19.0/Target.js
*/
/**
  * Copyright 2019 Google Inc. All rights reserved.
  *
  * Licensed under the Apache License, Version 2.0 (the "License");
  * you may not use this file except in compliance with the License.
  * You may obtain a copy of the License at
  *
  *     http://www.apache.org/licenses/LICENSE-2.0
  *
  * Unless required by applicable law or agreed to in writing, software
  * distributed under the License is distributed on an "AS IS" BASIS,
  * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  * See the License for the specific language governing permissions and
  * limitations under the License.
  */

// const {Events} = require('./Events');
// const {Page} = require('./Page');
// const {Worker} = require('./Worker');
// const {Connection} = require('./Connection');

class Target {
    /**
      * @param {!Protocol.Target.TargetInfo} targetInfo
      * @param {!Puppeteer.BrowserContext} browserContext
      * @param {!function():!Promise<!Puppeteer.CDPSession>} sessionFactory
      * @param {boolean} ignoreHTTPSErrors
      * @param {?Puppeteer.Viewport} defaultViewport
      * @param {!Puppeteer.TaskQueue} screenshotTaskQueue
      */
    constructor(targetInfo, browserContext, sessionFactory, ignoreHTTPSErrors, defaultViewport, screenshotTaskQueue) {
        this._targetInfo = targetInfo;
        this._browserContext = browserContext;
        this._targetId = targetInfo.targetId;
        this._sessionFactory = sessionFactory;
        this._ignoreHTTPSErrors = ignoreHTTPSErrors;
        this._defaultViewport = defaultViewport;
        this._screenshotTaskQueue = screenshotTaskQueue;
        /** @type {?Promise<!Puppeteer.Page>} */
        this._pagePromise = null;
        /** @type {?Promise<!Worker>} */
        this._workerPromise = null;
        this._initializedPromise = new Promise(fulfill => this._initializedCallback = fulfill).then(async success => {
            if (!success)
                return false;
            const opener = this.opener();
            if (!opener || !opener._pagePromise || this.type() !== 'page')
                return true;
            const openerPage = await opener._pagePromise;
            if (!openerPage.listenerCount(Events.Page.Popup))
                return true;
            const popupPage = await this.page();
            openerPage.emit(Events.Page.Popup, popupPage);
            return true;
        });
        this._isClosedPromise = new Promise(fulfill => this._closedCallback = fulfill);
        this._isInitialized = this._targetInfo.type !== 'page' || this._targetInfo.url !== '';
        if (this._isInitialized)
            this._initializedCallback(true);
    }

    /**
      * @return {!Promise<!Puppeteer.CDPSession>}
      */
    createCDPSession() {
        return this._sessionFactory();
    }

    /**
      * @return {!Promise<?Page>}
      */
    async page() {
        if ((this._targetInfo.type === 'page' || this._targetInfo.type === 'background_page') && !this._pagePromise) {
            this._pagePromise = this._sessionFactory()
                    .then(client => Page.create(client, this, this._ignoreHTTPSErrors, this._defaultViewport, this._screenshotTaskQueue));
        }
        return this._pagePromise;
    }

    /**
      * @return {!Promise<?Worker>}
      */
    async worker() {
        if (this._targetInfo.type !== 'service_worker' && this._targetInfo.type !== 'shared_worker')
            return null;
        if (!this._workerPromise) {
            this._workerPromise = this._sessionFactory().then(async client => {
                // Top level workers have a fake page wrapping the actual worker.
                const [targetAttached] = await Promise.all([
                    new Promise(x => client.once('Target.attachedToTarget', x)),
                    client.send('Target.setAutoAttach', {autoAttach: true, waitForDebuggerOnStart: false, flatten: true}),
                ]);
                const session = Connection.fromSession(client).session(targetAttached.sessionId);
                // TODO(einbinder): Make workers send their console logs.
                return new Worker(session, this._targetInfo.url, () => {} /* consoleAPICalled */, () => {} /* exceptionThrown */);
            });
        }
        return this._workerPromise;
    }

    /**
      * @return {string}
      */
    url() {
        return this._targetInfo.url;
    }

    /**
      * @return {"page"|"background_page"|"service_worker"|"shared_worker"|"other"|"browser"}
      */
    type() {
        const type = this._targetInfo.type;
        if (type === 'page' || type === 'background_page' || type === 'service_worker' || type === 'shared_worker' || type === 'browser')
            return type;
        return 'other';
    }

    /**
      * @return {!Puppeteer.Browser}
      */
    browser() {
        return this._browserContext.browser();
    }

    /**
      * @return {!Puppeteer.BrowserContext}
      */
    browserContext() {
        return this._browserContext;
    }

    /**
      * @return {?Puppeteer.Target}
      */
    opener() {
        const { openerId } = this._targetInfo;
        if (!openerId)
            return null;
        return this.browser()._targets.get(openerId);
    }

    /**
      * @param {!Protocol.Target.TargetInfo} targetInfo
      */
    _targetInfoChanged(targetInfo) {
        this._targetInfo = targetInfo;

        if (!this._isInitialized && (this._targetInfo.type !== 'page' || this._targetInfo.url !== '')) {
            this._isInitialized = true;
            this._initializedCallback(true);
            return;
        }
    }
}

module.exports = {Target};



/*
lib https://github.com/GoogleChrome/puppeteer/blob/v1.19.0/TaskQueue.js
*/
class TaskQueue {
    constructor() {
        this._chain = Promise.resolve();
    }
}

module.exports = {TaskQueue};



/*
lib https://github.com/GoogleChrome/puppeteer/blob/v1.19.0/WebSocketTransport.js
*/
/**
  * Copyright 2018 Google Inc. All rights reserved.
  *
  * Licensed under the Apache License, Version 2.0 (the "License");
  * you may not use this file except in compliance with the License.
  * You may obtain a copy of the License at
  *
  *     http://www.apache.org/licenses/LICENSE-2.0
  *
  * Unless required by applicable law or agreed to in writing, software
  * distributed under the License is distributed on an "AS IS" BASIS,
  * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  * See the License for the specific language governing permissions and
  * limitations under the License.
  */
// const WebSocket = require('ws');

/**
  * @implements {!Puppeteer.ConnectionTransport}
  */
class WebSocketTransport {
    /**
      * @param {string} url
      * @return {!Promise<!WebSocketTransport>}
      */
    static create(url) {
        return new Promise((resolve, reject) => {
            const ws = new WebSocket(url, [], {
                maxPayload: 256 * 1024 * 1024, // 256Mb
            });
            ws.addEventListener('open', () => resolve(new WebSocketTransport(ws)));
            ws.addEventListener('error', reject);
        });
    }

    /**
      * @param {!WebSocket} ws
      */
    constructor(ws) {
        this._ws = ws;
        this._ws.addEventListener('message', event => {
            if (this.onmessage)
                this.onmessage.call(null, event.data);
        });
        this._ws.addEventListener('close', event => {
            if (this.onclose)
                this.onclose.call(null);
        });
        // Silently ignore all errors - we don't know what to do with them.
        this._ws.addEventListener('error', () => {});
        this.onmessage = null;
        this.onclose = null;
    }

    /**
      * @param {string} message
      */
    send(message) {
        this._ws.send(message);
    }

    close() {
        this._ws.close();
    }
}

module.exports = WebSocketTransport;



/*
lib https://github.com/GoogleChrome/puppeteer/blob/v1.19.0/api.js
*/
/**
  * Copyright 2019 Google Inc. All rights reserved.
  *
  * Licensed under the Apache License, Version 2.0 (the "License");
  * you may not use this file except in compliance with the License.
  * You may obtain a copy of the License at
  *
  *     http://www.apache.org/licenses/LICENSE-2.0
  *
  * Unless required by applicable law or agreed to in writing, software
  * distributed under the License is distributed on an "AS IS" BASIS,
  * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  * See the License for the specific language governing permissions and
  * limitations under the License.
  */

module.exports = {
        Browser,
        Connection,
        WebSocketTransport,
};
/*
file none
*/
}(globalThis.globalLocal));
