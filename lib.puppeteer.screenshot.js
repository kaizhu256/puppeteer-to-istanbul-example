#!/usr/bin/env node
/*
  * lib.puppeteer.js (2019.8.12)
  * https://github.com/kaizhu256/node-puppeteer-lite
  * this package will provide a zero-dependency version of puppeteer
  *
  */



///* jslint utility2:true */

/* jslint ignore:start */
(function (local) {
"use strict";
// hack-puppeteer - module.exports
const assert = require("assert");
const EventEmitter = require("events");
const URL = require("url");
const childProcess = require("child_process");
const crypto = require("crypto");
const fs = require("fs");
const http = require("http");
const https = require("https");
const net = require("net");
const os = require("os");
const path = require("path");
const readline = require("readline");
const tls = require("tls");
const url = require("url");
const util = require("util");
const { Writable } = require("stream");
const { randomBytes } = require("crypto");



const child_process = require("child_process");
const debugError = console.error;
const debugProtocol = function () {
        return;
}
const timeout = 30000;



"use strict";

/*
lib https://github.com/websockets/ws/blob/6.2.1/buffer-util.js
*/
"use strict";

/**
  * Merges an array of buffers into a new buffer.
  *
  * @param {Buffer[]} list The array of buffers to concat
  * @param {Number} totalLength The total length of buffers in the list
  * @return {Buffer} The resulting buffer
  * @public
  */
function concat(list, totalLength) {
    return list[0];
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

// hack-puppeteer - module.exports
const applyMask = _mask;
const bufferUtil = { concat };
const mask = _mask;
const unmask = _mask;



/*
lib https://github.com/websockets/ws/blob/6.2.1/constants.js
*/
"use strict";

module.exports = {
    BINARY_TYPES: ["nodebuffer", "arraybuffer", "fragments"],
    GUID: "258EAFA5-E914-47DA-95CA-C5AB0DC85B11",
    kStatusCode: Symbol("status-code"),
    kWebSocket: Symbol("websocket"),
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
"use strict";

/**
  * Class representing a message event.
  *
  * @extends Event
  * @private
  */
class MessageEvent {
    /**
      * Create a new `MessageEvent`.
      *
      * @param {(String|Buffer|ArrayBuffer|Buffer[])} data The received data
      * @param {WebSocket} target A reference to the target to which the event was dispatched
      */
    constructor(data, target) {
        this.type = "message";
        this.target = target;
        this.data = data;
    }
}

/**
  * Class representing a close event.
  *
  * @extends Event
  * @private
  */
class CloseEvent {
    /**
      * Create a new `CloseEvent`.
      *
      * @param {Number} code The status code explaining why the connection is being closed
      * @param {String} reason A human-readable string explaining why the connection is closing
      * @param {WebSocket} target A reference to the target to which the event was dispatched
      */
    constructor(code, reason, target) {
        this.type = "close";
        this.target = target;
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
class OpenEvent {
    /**
      * Create a new `OpenEvent`.
      *
      * @param {WebSocket} target A reference to the target to which the event was dispatched
      */
    constructor(target) {
        this.type = "open";
        this.target = target;
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
        function onMessage(data) {
            listener.call(this, new MessageEvent(data, this));
        }

        function onClose(code, message) {
            listener.call(this, new CloseEvent(code, message, this));
        }

        function onOpen() {
            listener.call(this, new OpenEvent(this));
        }

        if (method === "message") {
            onMessage._listener = listener;
            this.on(method, onMessage);
        } else if (method === "close") {
            onClose._listener = listener;
            this.on(method, onClose);
        } else if (method === "open") {
            onOpen._listener = listener;
            this.on(method, onOpen);
        }
    },
};

module.exports = EventTarget;
// hack-puppeteer - module.exports
const addEventListener = EventTarget.addEventListener;
const removeEventListener = EventTarget.removeEventListener;



/*
lib https://github.com/websockets/ws/blob/6.2.1/receiver.js
*/
"use strict";

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

        this._binaryType = binaryType;
        this[kWebSocket] = undefined;
        this._extensions = extensions;
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
            this._buffers.shift().copy(dst, dst.length - n);
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
            case GET_DATA:
                err = this.getData(cb);
                break;
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

        const compressed = (buf[0] & 0x40) === 0x40;

        this._fin = (buf[0] & 0x80) === 0x80;
        this._opcode = buf[0] & 0x0f;
        this._payloadLength = buf[1] & 0x7f;

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
        const buf = this.consume(8);
        const num = buf.readUInt32BE(0);
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
        this._totalPayloadLength += this._payloadLength;
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
        if (this._bufferedBytes < this._payloadLength) {
            this._loop = false;
            return;
        }
        data = this.consume(this._payloadLength);
        //
        // This message is not compressed so its lenght is the sum of the payload
        // length of all fragments.
        //
        this._messageLength = this._totalPayloadLength;
        this._fragments.push(data);
        return this.dataMessage();
    }

    /**
      * Handles a data message.
      *
      * @return {(Error|undefined)} A possible error
      * @private
      */
    dataMessage() {
        const messageLength = this._messageLength;
        const fragments = this._fragments;
        this._totalPayloadLength = 0;
        this._messageLength = 0;
        this._fragmented = 0;
        this._fragments = [];
        const buf = concat(fragments, messageLength);
        this.emit("message", buf.toString());
        this._state = GET_INFO;
    }
}

/*
lib https://github.com/websockets/ws/blob/6.2.1/sender.js
*/
"use strict";

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
        this._extensions = extensions;
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
        var offset = 6;
        var payloadLength = data.length;
        offset += 2;
        payloadLength = 126;
        const target = Buffer.allocUnsafe(offset);
        target[0] = options.opcode | 0x80;
        target[1] = payloadLength;
        target.writeUInt16BE(data.length, 2);
        const mask = randomBytes(4);
        target[1] |= 0x80;
        target[offset - 4] = mask[0];
        target[offset - 3] = mask[1];
        target[offset - 2] = mask[2];
        target[offset - 1] = mask[3];
        applyMask(data, mask, data, 0, data.length);
        return [target, data];
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
        const buf = Buffer.from(data);
        var opcode = 1;
        var rsv1 = options.compress;
        this._firstFragment = false;
        this._compress = rsv1;
        this._firstFragment = true;
        this.sendFrame(
            Sender.frame(buf, {
                fin: options.fin,
                rsv1: false,
                opcode,
                mask: options.mask,
                readOnly: false
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
        this._socket.cork();
        this._socket.write(list[0]);
        this._socket.write(list[1], cb);
        this._socket.uncork();
    }
}

module.exports = Sender;



/*
lib https://github.com/websockets/ws/blob/6.2.1/websocket.js
*/
"use strict";

const readyStates = ["CONNECTING", "OPEN", "CLOSING", "CLOSED"];
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
        this.protocol = "";

        this._binaryType = BINARY_TYPES[0];
        this._closeFrameReceived = false;
        this._closeFrameSent = false;
        this._closeMessage = "";
        this._closeTimer = null;
        this._closeCode = 1006;
        this._extensions = {};
        this._receiver = null;
        this._sender = null;
        this._socket = null;
        this._isServer = false;
        this._redirects = 0;
        protocols = protocols.join(", ");
        initAsClient(this, address, protocols, options);
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

        receiver.on("drain", receiverOnDrain);
        receiver.on("message", receiverOnMessage);

        socket.setTimeout(0);
        socket.setNoDelay();
        socket.on("close", socketOnClose);
        socket.on("data", socketOnData);
        socket.on("end", socketOnEnd);
        socket.on("error", console.error);

        this.readyState = WebSocket.OPEN;
        this.emit("open");
    }

    /**
      * Emit the `'close'` event.
      *
      * @private
      */
    emitClose() {
        this.readyState = WebSocket.CLOSED;
        this._receiver.removeAllListeners();
        this.emit('close', this._closeCode, this._closeMessage);
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
        const opts = Object.assign(
            {
                binary: typeof data !== 'string',
                mask: !this._isServer,
                compress: true,
                fin: true
            },
            options
        );
        this._sender.send(data, opts, cb);
    }
}

readyStates.forEach((readyState, i) => {
    WebSocket[readyState] = i;
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
    var parsedUrl;
    //
    // The WHATWG URL constructor is not available on Node.js < 6.13.0
    //
    parsedUrl = new url.URL(address);
    websocket.url = address;
    const isUnixSocket = parsedUrl.protocol === 'ws+unix:';
    const isSecure =
        parsedUrl.protocol === 'wss:' || parsedUrl.protocol === 'https:';
    const defaultPort = 80;
    const key = crypto.randomBytes(16).toString('base64');
    const get = http.get;
    const path = parsedUrl.pathname || '/';

    opts.createConnection = netConnect;
    opts.defaultPort = opts.defaultPort || defaultPort;
    opts.port = parsedUrl.port;
    opts.host = parsedUrl.hostname;
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
    var req = (websocket._req = get(opts));
    req.on('upgrade', (res, socket, head) => {
        websocket.emit('upgrade', res);

        //
        // The user may have closed the connection from a listener of the `upgrade`
        // event.
        //
        req = websocket._req = null;

        const digest = crypto
            .createHash('sha1')
            .update(key + GUID)
            .digest('base64');

        const serverProt = res.headers['sec-websocket-protocol'];
        const protList = (protocols || '').split(/, */);
        var protError;
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
    options.path = options.socketPath;
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
    websocket.emitClose();
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



/*
file https://github.com/GoogleChrome/puppeteer/tree/v1.19.0
*/



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

    static promisify(nodeFunction) {
        function promisified(...args) {
            return new Promise((resolve, reject) => {
                function callback(err, ...result) {
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

module.exports = {
    helper: Helper,
    assert,
    debugError
};
// hack-puppeteer - module.exports
const helper = Helper;



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
        this._closeCallback = closeCallback;
        this._defaultContext = new BrowserContext(this._connection, this, null);
        /** @type {Map<string, BrowserContext>} */
        this._contexts = new Map();
        /** @type {Map<string, Target>} */
        this._targets = new Map();
        this._connection.on(Events.Connection.Disconnected, () => this.emit(Events.Browser.Disconnected));
        this._connection.on('Target.targetCreated', this._targetCreated.bind(this));
        this._connection.on('Target.targetDestroyed', this._targetDestroyed.bind(this));
        this._connection.on('Target.targetInfoChanged', this._targetInfoChanged.bind(this));
    }

    /**
      * @param {!Protocol.Target.targetCreatedPayload} event
      */
    async _targetCreated(event) {
        const targetInfo = event.targetInfo;
        const {browserContextId} = targetInfo;
        const context = this._defaultContext;

        const target = new Target(targetInfo, context, () => this._connection.createSession(targetInfo), this._ignoreHTTPSErrors, this._defaultViewport, this._screenshotTaskQueue);
        assert(!this._targets.has(event.targetInfo.targetId), 'Target should not exist before targetCreated');
        this._targets.set(event.targetInfo.targetId, target);
        this.emit(Events.Browser.TargetCreated, target);
        context.emit(Events.BrowserContext.TargetCreated, target);
    }

    /**
      * @param {{targetId: string}} event
      */
    async _targetDestroyed(event) {
        const target = this._targets.get(event.targetId);
        target._initializedCallback(false);
        this._targets.delete(event.targetId);
        target._closedCallback();
        this.emit(Events.Browser.TargetDestroyed, target);
        target.browserContext().emit(Events.BrowserContext.TargetDestroyed, target);
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
      * @param {function(!Target):boolean} predicate
      * @param {{timeout?: number}=} options
      * @return {!Promise<!Target>}
      */
    async waitForTarget(predicate, options = {}) {
        return this.targets().find(predicate);
    }

    async close() {
        await this._closeCallback.call(null);
        this.disconnect();
    }

    disconnect() {
        this._connection.dispose();
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
      * @return {!Promise<!Puppeteer.Page>}
      */
    newPage() {
        return this._browser._createPageInContext(this._id);
    }
}

module.exports = {Browser, BrowserContext};



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
        debugProtocol('◀ RECV ' + message);
        const object = JSON.parse(message);
        if (object.method === 'Target.attachedToTarget') {
            const sessionId = object.params.sessionId;
            const session = new CDPSession(this, object.params.targetInfo.type, sessionId);
            this._sessions.set(sessionId, session);
        } else if (object.method === 'Target.detachedFromTarget') {
            const session = this._sessions.get(object.params.sessionId);
            session._onClosed();
            this._sessions.delete(object.params.sessionId);
        }
        if (object.sessionId) {
            const session = this._sessions.get(object.sessionId);
            session._onMessage(object);
        } else if (object.id) {
            const callback = this._callbacks.get(object.id);
            // Callbacks could be all rejected if someone has called `.dispose()`.
            this._callbacks.delete(object.id);
            callback.resolve(object.result);
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
        this._callbacks.clear();
        this._sessions.clear();
        this.emit(Events.Connection.Disconnected);
    }

    dispose() {
        this._onClose();
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
            callback.resolve(object.result);
        } else {
            assert(!object.id);
            this.emit(object.method, object.params);
        }
    }

    _onClosed() {
        this._callbacks.clear();
        this._connection = null;
        this.emit(Events.CDPSession.Disconnected);
    }
}

module.exports = {Connection, CDPSession};



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
      * @param {?Puppeteer.ExecutionContext} context
      */
    _setContext(context) {
        if (context) {
            this._contextResolveCallback.call(null, context);
            this._contextResolveCallback = null;
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
}

module.exports = {DOMWorld};



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
      * @param {boolean} returnByValue
      * @param {Function|string} pageFunction
      * @param {...*} args
      * @return {!Promise<*>}
      */
    async _evaluateInternal(returnByValue, pageFunction, ...args) {
        const suffix = `//# sourceURL=${EVALUATION_SCRIPT_URL}`;
        let functionText = pageFunction.toString();
        new Function('(' + functionText + ')');
        let callFunctionOnPromise;
        callFunctionOnPromise = this._client.send('Runtime.callFunctionOn', {
            functionDeclaration: functionText + '\n' + suffix + '\n',
            executionContextId: this._contextId,
            //!! arguments: args.map(convertArgument.bind(this)),
            returnByValue,
            awaitPromise: true,
            userGesture: true
        });
        const { exceptionDetails, result: remoteObject } = await callFunctionOnPromise.catch(console.error);
        return remoteObject.value;
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

        this._client.on('Page.frameNavigated', event => this._onFrameNavigated(event.frame));
        this._client.on('Page.frameStoppedLoading', event => this._onFrameStoppedLoading(event.frameId));
        this._client.on('Runtime.executionContextCreated', event => this._onExecutionContextCreated(event.context));
        this._client.on('Runtime.executionContextDestroyed', event => this._onExecutionContextDestroyed(event.executionContextId));
        //!! this._client.on('Runtime.executionContextsCleared', event => this._onExecutionContextsCleared());
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
        error = await Promise.race([
            watcher.timeoutOrTerminationPromise(),
            ensureNewDocumentNavigation ? watcher.newDocumentNavigationPromise() : watcher.sameDocumentNavigationPromise(),
        ]);
        watcher.dispose();
        return watcher.navigationResponse();

        /**
          * @param {!Puppeteer.CDPSession} client
          * @param {string} url
          * @param {string} referrer
          * @param {string} frameId
          * @return {!Promise<?Error>}
          */
        async function navigate(client, url, referrer, frameId) {
            const response = await client.send('Page.navigate', {url, referrer, frameId});
            ensureNewDocumentNavigation = !!response.loaderId;
            return null;
        }
    }

    /**
      * @param {!Protocol.Page.lifecycleEventPayload} event
      */
    _onLifecycleEvent(event) {
        const frame = this._frames.get(event.frameId);
        frame._onLifecycleEvent(event.loaderId, event.name);
        this.emit(Events.FrameManager.LifecycleEvent, frame);
    }

    /**
      * @param {string} frameId
      */
    _onFrameStoppedLoading(frameId) {
        const frame = this._frames.get(frameId);
        frame._onLoadingStopped();
        this.emit(Events.FrameManager.LifecycleEvent, frame);
    }

    /**
      * @param {!Protocol.Page.FrameTree} frameTree
      */
    _handleFrameTree(frameTree) {
        this._onFrameNavigated(frameTree.frame);
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
        return this._frames.get(frameId);
    }

    /**
      * @param {!Protocol.Page.Frame} framePayload
      */
    _onFrameNavigated(framePayload) {
        const isMainFrame = !framePayload.parentId;
        let frame = this._mainFrame
        assert(isMainFrame, 'We either navigate top level or have old version of the navigated frame');

        // Update or create main frame.
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
        // Update frame payload.
        frame._navigated(framePayload);
        this.emit(Events.FrameManager.FrameNavigated, frame);
    }

    /**
      * @param {string} name
      */
    async _ensureIsolatedWorld(name) {
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

    _onExecutionContextCreated(contextPayload) {
        const frameId = contextPayload.auxData.frameId;
        const frame = this._frames.get(frameId)
        let world = null;
        if (contextPayload.auxData && !!contextPayload.auxData['isDefault']) {
            world = frame._mainWorld;
        } else if (contextPayload.name === UTILITY_WORLD_NAME && !frame._secondaryWorld._hasContext()) {
            // In case of multiple sessions to the same target, there's a race between
            // connections so we might end up creating multiple isolated worlds.
            // We can use either.
            world = frame._secondaryWorld;
        }
        if (contextPayload.auxData && contextPayload.auxData['type'] === 'isolated')
            this._isolatedWorlds.add(contextPayload.name);
        /** @type {!ExecutionContext} */
        const context = new ExecutionContext(this._client, contextPayload, world);
        world._setContext(context);
        this._contextIdToContext.set(contextPayload.id, context);
    }

    /**
      * @param {number} executionContextId
      */
    _onExecutionContextDestroyed(executionContextId) {
        const context = this._contextIdToContext.get(executionContextId);
        this._contextIdToContext.delete(executionContextId);
        context._world._setContext(null);
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
}

function assertNoLegacyNavigationOptions(options) {
    assert(options['networkIdleTimeout'] === undefined, 'ERROR: networkIdleTimeout option is no longer supported.');
    assert(options['networkIdleInflight'] === undefined, 'ERROR: networkIdleInflight option is no longer supported.');
    assert(options.waitUntil !== 'networkidle', 'ERROR: "networkidle" option is no longer supported. Use "networkidle2" instead');
}

module.exports = {FrameManager, Frame};



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
        waitUntil = waitUntil.slice();
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
            helper.addEventListener(this._frameManager, Events.FrameManager.LifecycleEvent, this._checkLifecycleComplete.bind(this)),
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
      * @return {?Puppeteer.Response}
      */
    navigationResponse() {
        return this._navigationRequest ? this._navigationRequest.response() : null;
    }

    /**
      * @return {!Promise<?Error>}
      */
    newDocumentNavigationPromise() {
        return this._newDocumentNavigationPromise;
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
        const errorMessage = 'Navigation Timeout Exceeded: ' + this._timeout + 'ms exceeded';
        return new Promise(fulfill => this._maximumTimer = setTimeout(fulfill, this._timeout)).then(() => new Error(errorMessage));
    }

    _checkLifecycleComplete() {
        // We expect navigation to commit.
        if (!checkLifecycle(this._frame, this._expectedLifecycle))
            return;
        this._lifecycleCallback();
        if (this._frame._loaderId === this._initialLoaderId && !this._hasSameDocumentNavigation)
            return;
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
    }

    async initialize() {
        await this._client.send('Network.enable');
    }

    /**
      * @param {!Puppeteer.FrameManager} frameManager
      */
    setFrameManager(frameManager) {
        this._frameManager = frameManager;
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
            this._handleRequestRedirect(request, event.redirectResponse);
            redirectChain = request._redirectChain;
        }
        const frame = this._frameManager.frame(event.frameId);
        const request = new Request(this._client, frame, interceptionId, this._userRequestInterceptionEnabled, event, redirectChain);
        this._requestIdToRequest.set(event.requestId, request);
        this.emit(Events.NetworkManager.Request, request);
    }


    /**
      * @param {!Protocol.Network.requestServedFromCachePayload} event
      */
    _onRequestServedFromCache(event) {
        const request = this._requestIdToRequest.get(event.requestId);
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
        const response = new Response(this._client, request, event.response);
        request._response = response;
        this.emit(Events.NetworkManager.Response, response);
    }

    /**
      * @param {!Protocol.Network.loadingFinishedPayload} event
      */
    _onLoadingFinished(event) {
        const request = this._requestIdToRequest.get(event.requestId);
        // Under certain conditions we never get the Network.responseReceived
        // event from protocol. @see https://crbug.com/883475
        request.response()._bodyLoadedPromiseFulfill.call(null);
        this._requestIdToRequest.delete(request._requestId);
        this._attemptedAuthentications.delete(request._interceptionId);
        this.emit(Events.NetworkManager.RequestFinished, request);
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
}

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
// const {FrameManager} = require('./FrameManager');
// const Tracing = require('./Tracing');
// const {helper, debugError, assert} = require('./helper');
// const {Worker} = require('./Worker');
// const {createJSHandle} = require('./JSHandle');
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
        /** @type {!FrameManager} */
        this._frameManager = new FrameManager(client, this, ignoreHTTPSErrors);
        /** @type {!Map<string, Function>} */
        this._pageBindings = new Map();
        this._javascriptEnabled = true;
        /** @type {?Puppeteer.Viewport} */
        this._viewport = null;

        this._screenshotTaskQueue = screenshotTaskQueue;

        /** @type {!Map<string, Worker>} */
        this._workers = new Map();

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
        ]);
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
      * @param {!Puppeteer.Viewport} viewport
      */
    async setViewport(viewport) {
        this._viewport = viewport;
    }

    /**
      * @param {"png"|"jpeg"} format
      * @param {!ScreenshotOptions=} options
      * @return {!Promise<!Buffer|!String>}
      */
    async _screenshotTask(format, options) {
        await this._client.send('Target.activateTarget', {targetId: this._target._targetId});
        let clip = options.clip ? processClip(options.clip) : undefined;
        const shouldSetDefaultBackground = options.omitBackground && format === 'png';
        const result = await this._client.send('Page.captureScreenshot', { format, quality: options.quality, clip });
        const buffer = options.encoding === 'base64' ? result.data : Buffer.from(result.data, 'base64');
        await writeFileAsync(options.path, buffer);
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
            return true;
        });
        this._isClosedPromise = new Promise(fulfill => this._closedCallback = fulfill);
        this._isInitialized = this._targetInfo.type !== 'page' || this._targetInfo.url !== '';
        if (this._isInitialized)
            this._initializedCallback(true);
    }

    /**
      * @return {!Promise<?Page>}
      */
    async page() {
        this._pagePromise = this._sessionFactory()
                .then(client => Page.create(client, this, this._ignoreHTTPSErrors, this._defaultViewport, this._screenshotTaskQueue));
        return this._pagePromise;
    }

    /**
      * @return {string}
      */
    url() {
        return this._targetInfo.url;
    }

    /**
      * @return {!Puppeteer.BrowserContext}
      */
    browserContext() {
        return this._browserContext;
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
            this.onmessage.call(null, event.data);
        });
        this._ws.addEventListener('close', event => {
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
