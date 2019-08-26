#!/usr/bin/env node
/*
  * lib.puppeteer.js (2019.8.12)
  * https://github.com/kaizhu256/node-puppeteer-lite
  * this package will provide a zero-dependency version of puppeteer
  *
  */



/* jslint utility2:true */



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
const {Writable} = require("stream");



const child_process = require("child_process");
const debugError = console.error;
const timeout = 30000;
local.nop(
    assert,
    child_process,
    debugError,
    EventEmitter,
    URL,
    childProcess,
    crypto,
    fs,
    http,
    https,
    net,
    os,
    path,
    readline,
    timeout,
    tls,
    url,
    util,
    Writable
);



/* jslint ignore:start */
var browser1;
var browserContext1;
var connection1;
var domworld1;
var domworld2;
var frame1;
var framemanager1;
var page1;
var receiver1;
var sender1;
var session1;
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
    constructor() {
        super();

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
        receiver1._bufferedBytes += chunk.length;
        receiver1._buffers.push(chunk);
        receiver1.startLoop(cb);
    }

    /**
      * Consumes `n` bytes from the buffered data.
      *
      * @param {Number} n The number of bytes to consume
      * @return {Buffer} The consumed bytes
      * @private
      */
    consume(n) {
        receiver1._bufferedBytes -= n;

        if (n === receiver1._buffers[0].length) {
            return receiver1._buffers.shift();
        }

        if (n < receiver1._buffers[0].length) {
            const buf = receiver1._buffers[0];
            receiver1._buffers[0] = buf.slice(n);
            return buf.slice(0, n);
        }
        const dst = Buffer.allocUnsafe(n);
        do {
            const buf = receiver1._buffers[0];
            receiver1._buffers.shift().copy(dst, dst.length - n);
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
        receiver1._loop = true;

        do {
            switch (receiver1._state) {
            case GET_INFO:
                err = receiver1.getInfo();
                break;
            case GET_PAYLOAD_LENGTH_16:
                err = receiver1.getPayloadLength16();
                break;
            case GET_PAYLOAD_LENGTH_64:
                err = receiver1.getPayloadLength64();
                break;
            case GET_DATA:
                err = receiver1.getData(cb);
                break;
            }
        } while (receiver1._loop);

        cb(err);
    }

    /**
      * Reads the first two bytes of a frame.
      *
      * @return {(RangeError|undefined)} A possible error
      * @private
      */
    getInfo() {
        if (receiver1._bufferedBytes < 2) {
            receiver1._loop = false;
            return;
        }

        const buf = receiver1.consume(2);

        const compressed = (buf[0] & 0x40) === 0x40;

        receiver1._fin = (buf[0] & 0x80) === 0x80;
        receiver1._opcode = buf[0] & 0x0f;
        receiver1._payloadLength = buf[1] & 0x7f;

        receiver1._masked = (buf[1] & 0x80) === 0x80;

        if (receiver1._payloadLength === 126) {
            receiver1._state = GET_PAYLOAD_LENGTH_16
        } else if (receiver1._payloadLength === 127) {
            receiver1._state = GET_PAYLOAD_LENGTH_64;
        } else {
            return receiver1.haveLength();
        }
    }

    /**
      * Gets extended payload length (7+16).
      *
      * @return {(RangeError|undefined)} A possible error
      * @private
      */
    getPayloadLength16() {
        receiver1._payloadLength = receiver1.consume(2).readUInt16BE(0);
        return receiver1.haveLength();
    }

    /**
      * Gets extended payload length (7+64).
      *
      * @return {(RangeError|undefined)} A possible error
      * @private
      */
    getPayloadLength64() {
        const buf = receiver1.consume(8);
        const num = buf.readUInt32BE(0);
        receiver1._payloadLength = num * Math.pow(2, 32) + buf.readUInt32BE(4);
        return receiver1.haveLength();
    }

    /**
      * Payload length has been read.
      *
      * @return {(RangeError|undefined)} A possible error
      * @private
      */
    haveLength() {
        receiver1._totalPayloadLength += receiver1._payloadLength;
        receiver1._state = GET_DATA;
    }

    /**
      * Reads data bytes.
      *
      * @param {Function} cb Callback
      * @return {(Error|RangeError|undefined)} A possible error
      * @private
      */
    getData(cb) {
        if (receiver1._bufferedBytes < receiver1._payloadLength) {
            receiver1._loop = false;
            return;
        }
        var data = receiver1.consume(receiver1._payloadLength);
        //
        // This message is not compressed so its lenght is the sum of the payload
        // length of all fragments.
        //
        receiver1._messageLength = receiver1._totalPayloadLength;
        receiver1._fragments.push(data);
        return receiver1.dataMessage();
    }

    /**
      * Handles a data message.
      *
      * @return {(Error|undefined)} A possible error
      * @private
      */
    dataMessage() {
        const messageLength = receiver1._messageLength;
        const fragments = receiver1._fragments;
        receiver1._totalPayloadLength = 0;
        receiver1._messageLength = 0;
        receiver1._fragmented = 0;
        receiver1._fragments = [];
        const buf = fragments[0];
        receiver1.emit("message", buf.toString());
        receiver1._state = GET_INFO;
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
    static frame(data, opt) {
        const merge = opt.mask && opt.readOnly;
        var offset = 6;
        var payloadLength = data.length;
        offset += 2;
        payloadLength = 126;
        const target = Buffer.allocUnsafe(offset);
        target[0] = opt.opcode | 0x80;
        target[1] = payloadLength;
        target.writeUInt16BE(data.length, 2);
        const mask = crypto.randomBytes(4);
        target[1] |= 0x80;
        target[offset - 4] = mask[0];
        target[offset - 3] = mask[1];
        target[offset - 2] = mask[2];
        target[offset - 1] = mask[3];
        // mask data
        var ii;
        ii = data.length;
        while (ii > 0) {
            ii -= 1;
            data[ii] = data[ii] ^ mask[ii & 3];
        }
        return [
            target, data
        ];
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
        data = Buffer.from(data);
        var opcode = 1;
        var rsv1 = options.compress;
        sender1._firstFragment = false;
        sender1._compress = rsv1;
        sender1._firstFragment = true;
        var list;
        list = Sender.frame(data, {
            fin: options.fin,
            rsv1: false,
            opcode,
            mask: options.mask,
            readOnly: false
        });
        sender1.sendFrame(list, cb);
    }

    /**
      * Sends a frame.
      *
      * @param {Buffer[]} list The frame to send
      * @param {Function} cb Callback
      * @private
      */
    sendFrame(list, cb) {
        sender1._socket.cork();
        sender1._socket.write(list[0]);
        sender1._socket.write(list[1], cb);
        sender1._socket.uncork();
    }
}



/*
lib https://github.com/websockets/ws/blob/6.2.1/websocket.js
*/
"use strict";

/**
  * Initialize a WebSocket client.
  *
  * @param {(String|url.Url|url.URL)} address The URL to which to connect
  * @param {String} protocols The subprotocols
  * @param {(Boolean|Object)} options.perMessageDeflate Enable/disable
  *     permessage-deflate
  * @param {String} options.origin Value of the `Origin` or
  *     `Sec-WebSocket-Origin` header
  * @private
  */
function initAsClient(websocket1) {
    receiver1 = new module.exports.Receiver();
    sender1 = new module.exports.Sender(websocket1);
    receiver1.on("drain", function () {
        websocket1.resume();
    });
    receiver1.on("message", connection1._onMessage);
    websocket1.setTimeout(0);
    websocket1.setNoDelay();
    websocket1.on("data", function socketOnData(chunk) {
        if (!receiver1.write(chunk)) {
            websocket1.pause();
        }
    });
    websocket1.on("error", local.assertThrow);
}



/*
file https://github.com/GoogleChrome/puppeteer/tree/v1.19.0
*/



/*
lib https://github.com/GoogleChrome/puppeteer/blob/v1.19.0/Browser.js
*/
class Browser extends EventEmitter {
    /**
      * @param {!Array<string>} contextIds
      * @param {?Puppeteer.ChildProcess} process
      * @param {function()=} closeCallback
      */
    static async create(connection, contextIds, process, closeCallback) {
        browser1 = new Browser(connection, contextIds, process, closeCallback);
        await connection.send("Target.setDiscoverTargets", {
            discover: true});
        return browser1;
    }

    /**
      * @param {!Array<string>} contextIds
      * @param {?Puppeteer.ChildProcess} process
      * @param {(function():Promise)=} closeCallback
      */
    constructor(connection, contextIds, process, closeCallback) {
        super();
        browser1 = this;
        browser1._process = process;
        browser1._connection = connection;
        browser1._closeCallback = closeCallback;
        browser1._contexts = new Map();
        /** @type {Map<string, Target>} */
        browser1.targetDict = {};
        browser1._connection.on(Events.Connection.Disconnected, () => browser1.emit(Events.Browser.Disconnected));
        browser1._connection.on("Target.targetCreated", browser1._targetCreated.bind(browser1));
        browser1._connection.on("Target.targetDestroyed", browser1._targetDestroyed.bind(browser1));
        browser1._connection.on("Target.targetInfoChanged", browser1._targetInfoChanged.bind(browser1));
    }

    /**
      * @param {!Protocol.Target.targetCreatedPayload} event
      */
    async _targetCreated(event) {
        const targetInfo = event.targetInfo;
        const target = {};
        target._targetInfo = targetInfo;
        target._targetId = targetInfo.targetId;
        /** @type {?Promise<!Puppeteer.Page>} */
        target._pagePromise = null;
        /** @type {?Promise<!Worker>} */
        target._workerPromise = null;
        target._initializedPromise = new Promise(function (fulfill) {
            target._initializedCallback = fulfill;
            return fulfill;
        }).then(async function (success) {
            return true;
        });
        target._isClosedPromise = new Promise(function (fulfill) {
            target._closedCallback = fulfill;
            return fulfill;
        });
        target._isInitialized = target._targetInfo.type !== "page" || target._targetInfo.url !== "";
        if (target._isInitialized) {
            target._initializedCallback(true);
        }

        browser1.targetDict[event.targetInfo.targetId] = target;
        browser1.emit(Events.Browser.TargetCreated, target);
        browserContext1.emit(Events.BrowserContext.TargetCreated, target);
    }

    /**
      * @param {{targetId: string}} event
      */
    async _targetDestroyed(event) {
        const target = browser1.targetDict[event.targetId];
        target._initializedCallback(false);
        delete browser1.targetDict[event.targetId];
        target._closedCallback();
        browser1.emit(Events.Browser.TargetDestroyed, target);
        browserContext1.emit(Events.BrowserContext.TargetDestroyed, target);
    }

    /**
      * @param {!Protocol.Target.targetInfoChangedPayload} event
      */
    _targetInfoChanged(event) {
        const target = browser1.targetDict[event.targetInfo.targetId];
        assert(target, "target should exist before targetInfoChanged");
        const previousURL = target._url;
        const wasInitialized = target._isInitialized;
        target._targetInfo = event.targetInfo;

        if (!target._isInitialized && (target._targetInfo.type !== "page" || target._targetInfo.url !== "")) {
            target._isInitialized = true;
            target._initializedCallback(true);
            return;
        }
    }

    async close() {
        await browser1._closeCallback.call(null);
        browser1.disconnect();
    }

    disconnect() {
        browser1._connection.dispose();
    }
}

browserContext1 = new EventEmitter();



/*
lib https://github.com/GoogleChrome/puppeteer/blob/v1.19.0/Connection.js
*/
    connection1 = new EventEmitter();
    connection1._lastId = 0;
    connection1._callbacks = {};
    /** @type {!Map<string, !CDPSession>}*/
    connection1._closed = false;

    /**
      * @param {string} method
      * @param {!Object=} params
      * @return {!Promise<?Object>}
      */
    connection1.send = function (method, params = {}) {
        const id = connection1._rawSend({
            method, params});
        return new Promise(function (resolve, reject) {
            connection1._callbacks[id] = {
                resolve, reject, error: new Error(), method
            };
        });
    }

    /**
      * @param {*} message
      * @return {number}
      */
    connection1._rawSend = function (message) {
        connection1._lastId += 1;
        const id = connection1._lastId;
        message = JSON.stringify(Object.assign({}, message, {id}));
        sender1.send(message, {
            binary: typeof message !== "string",
            mask: true,
            compress: true,
            fin: true
        });
        return id;
    }

    /**
      * @param {string} message
      */
    connection1._onMessage = function (message) {
        const object = JSON.parse(message);
        if (object.method === "Target.attachedToTarget") {
            session1._connection = connection1;
            session1._targetType = object.params.targetInfo.type;
            session1._sessionId = object.params.sessionId;
        }
        if (object.sessionId) {
            if (object.id && session1._callbacks[object.id]) {
                const callback = session1._callbacks[object.id];
                delete session1._callbacks[object.id];
                callback.resolve(object.result);
            } else {
                assert(!object.id);
                session1.emit(object.method, object.params);
            }
        } else if (object.id) {
            const callback = connection1._callbacks[object.id];
            // Callbacks could be all rejected if someone has called `.dispose()`.
            delete connection1._callbacks[object.id];
            callback.resolve(object.result);
        } else {
            connection1.emit(object.method, object.params);
        }
    }

    connection1._onClose = function () {
        connection1._closed = true;
        connection1._callbacks = {};
        connection1.emit(Events.Connection.Disconnected);
    }

    connection1.dispose = function () {
        connection1._onClose();
    }

    /**
      * @param {Protocol.Target.TargetInfo} targetInfo
      * @return {!Promise<!CDPSession>}
      */
    connection1.createSession = async function (targetInfo) {
        var tmp;
        tmp = await connection1.send("Target.attachToTarget", {
            targetId: targetInfo.targetId,
            flatten: true
        });
        return session1
    }

    session1 = new EventEmitter();
    session1._callbacks = {};

    /**
      * @param {string} method
      * @param {!Object=} params
      * @return {!Promise<?Object>}
      */
    session1.send = function (method, params = {}) {
        const id = session1._connection._rawSend({
            sessionId: session1._sessionId, method, params});
        return new Promise(function (resolve, reject) {
            session1._callbacks[id] = {
                resolve, reject, error: new Error(), method
            };
        });
    }



/*
lib https://github.com/GoogleChrome/puppeteer/blob/v1.19.0/DOMWorld.js
*/
class DOMWorld {
    /**
      * @param {!Puppeteer.FrameManager} frameManager
      * @param {!Puppeteer.Frame} frame
      */
    constructor(frameManager, frame) {
        this._frame = frame;

        /** @type {?Promise<!Puppeteer.ElementHandle>} */
        this._documentPromise = null;
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



/*
lib https://github.com/GoogleChrome/puppeteer/blob/v1.19.0/Events.js
*/
const Events = {
    Page: {
        Close: "close",
        Console: "console",
        Dialog: "dialog",
        DOMContentLoaded: "domcontentloaded",
        Error: "error",
        // Can't use just 'error' due to node.js special treatment of error events.
        // @see https://nodejs.org/api/events.html#events_error_events
        PageError: "pageerror",
        Request: "request",
        Response: "response",
        RequestFailed: "requestfailed",
        RequestFinished: "requestfinished",
        FrameAttached: "frameattached",
        FrameDetached: "framedetached",
        FrameNavigated: "framenavigated",
        Load: "load",
        Metrics: "metrics",
        Popup: "popup",
        WorkerCreated: "workercreated",
        WorkerDestroyed: "workerdestroyed",
    },

    Browser: {
        TargetCreated: "targetcreated",
        TargetDestroyed: "targetdestroyed",
        TargetChanged: "targetchanged",
        Disconnected: "disconnected"
    },

    BrowserContext: {
        TargetCreated: "targetcreated",
        TargetDestroyed: "targetdestroyed",
        TargetChanged: "targetchanged",
    },

    NetworkManager: {
        Request: Symbol("Events.NetworkManager.Request"),
        Response: Symbol("Events.NetworkManager.Response"),
        RequestFailed: Symbol("Events.NetworkManager.RequestFailed"),
        RequestFinished: Symbol("Events.NetworkManager.RequestFinished"),
    },

    FrameManager: {
        FrameAttached: Symbol("Events.FrameManager.FrameAttached"),
        FrameNavigated: Symbol("Events.FrameManager.FrameNavigated"),
        FrameDetached: Symbol("Events.FrameManager.FrameDetached"),
        LifecycleEvent: Symbol("Events.FrameManager.LifecycleEvent"),
        ExecutionContextCreated: Symbol("Events.FrameManager.ExecutionContextCreated"),
        ExecutionContextDestroyed: Symbol("Events.FrameManager.ExecutionContextDestroyed"),
    },

    Connection: {
        Disconnected: Symbol("Events.Connection.Disconnected"),
    },

    CDPSession: {
        Disconnected: Symbol("Events.CDPSession.Disconnected"),
    },
};



/*
lib https://github.com/GoogleChrome/puppeteer/blob/v1.19.0/ExecutionContext.js
*/
const EVALUATION_SCRIPT_URL = "__puppeteer_evaluation_script__";
const SOURCE_URL_REGEX = (
    /^[\040\t]*\/\/[@#]\u0020sourceURL=\s*(\S*?)\s*$/m
);

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
        new Function("(" + functionText + ")");
        let callFunctionOnPromise;
        callFunctionOnPromise = this._client.send("Runtime.callFunctionOn", {
            functionDeclaration: functionText + "\n" + suffix + "\n",
            executionContextId: this._contextId,
            returnByValue,
            awaitPromise: true,
            userGesture: true
        });
        const {
            exceptionDetails, result: remoteObject } = await callFunctionOnPromise.catch(console.error);
        return remoteObject.value;
    }
}



/*
lib https://github.com/GoogleChrome/puppeteer/blob/v1.19.0/FrameManager.js
*/
const UTILITY_WORLD_NAME = "__puppeteer_utility_world__";

class FrameManager extends EventEmitter {
    /**
      * @param {!Puppeteer.CDPSession} client
      * @param {!Puppeteer.Page} page
      */
    constructor(client, page) {
        super();
        framemanager1 = this;
        module.exports.framemanager1 = this;
        framemanager1._client = client;
        framemanager1._page = page;
        framemanager1._networkManager = new NetworkManager(client);
        /** @type {!Map<number, !ExecutionContext>} */
        framemanager1._contextIdToContext = new Map();
        /** @type {!Set<string>} */
        framemanager1._isolatedWorlds = new Set();

        framemanager1._client.on("Page.frameNavigated", event => framemanager1._onFrameNavigated(event.frame));
        framemanager1._client.on("Page.frameStoppedLoading", event => framemanager1._onFrameStoppedLoading(event.frameId));
        framemanager1._client.on("Runtime.executionContextCreated", event => framemanager1._onExecutionContextCreated(event.context));
        framemanager1._client.on("Runtime.executionContextDestroyed", event => framemanager1._onExecutionContextDestroyed(event.executionContextId));
        framemanager1._client.on("Page.lifecycleEvent", event => framemanager1._onLifecycleEvent(event));
    }

    async initialize() {
        const [
            ,{
                frameTree}] = await Promise.all([
            framemanager1._client.send("Page.enable"),
            framemanager1._client.send("Page.getFrameTree"),
        ]);
        framemanager1._onFrameNavigated(frameTree.frame);
        await Promise.all([
            framemanager1._client.send("Page.setLifecycleEventsEnabled", {
                enabled: true }),
            framemanager1._client.send("Runtime.enable", {}).then(() => framemanager1._ensureIsolatedWorld(UTILITY_WORLD_NAME)),
            framemanager1._networkManager.initialize(),
        ]);
    }

    /**
      * @param {!Protocol.Page.lifecycleEventPayload} event
      */
    _onLifecycleEvent(event) {
        frame1._onLifecycleEvent(event.loaderId, event.name);
        framemanager1.emit(Events.FrameManager.LifecycleEvent, frame1);
    }

    /**
      * @param {string} frameId
      */
    _onFrameStoppedLoading(frameId) {
        frame1._lifecycleEvents.add("DOMContentLoaded");
        frame1._lifecycleEvents.add("load");
        framemanager1.emit(Events.FrameManager.LifecycleEvent, frame1);
    }

    /**
      * @param {!Protocol.Page.Frame} framePayload
      */
    _onFrameNavigated(framePayload) {
        // Update or create main frame.
        if (frame1) {
            // Update frame id to retain frame identity on cross-process navigation.
            frame1._id = framePayload.id;
        } else {
            // Initial main frame navigation.
            frame1 = new Frame(framemanager1, framemanager1._client, null, framePayload.id);
        }
        // Update frame payload.
        frame1._navigated(framePayload);
        framemanager1.emit(Events.FrameManager.FrameNavigated, frame1);
    }

    /**
      * @param {string} name
      */
    async _ensureIsolatedWorld(name) {
        framemanager1._isolatedWorlds.add(name);
        await framemanager1._client.send("Page.addScriptToEvaluateOnNewDocument", {
            source: `//# sourceURL=${EVALUATION_SCRIPT_URL}`,
            worldName: name,
        }),
        await framemanager1._client.send("Page.createIsolatedWorld", {
            frameId: frame1._id,
            grantUniveralAccess: true,
            worldName: name
        }).catch(console.error); // frames might be removed before we send this
    }

    _onExecutionContextCreated(contextPayload) {
        let world = null;
        if (contextPayload.auxData && !!contextPayload.auxData["isDefault"]) {
            world = domworld1;
        } else if (contextPayload.name === UTILITY_WORLD_NAME && !domworld2._hasContext()) {
            // In case of multiple sessions to the same target, there's a race between
            // connections so we might end up creating multiple isolated worlds.
            // We can use either.
            world = domworld2;
        }
        if (contextPayload.auxData && contextPayload.auxData["type"] === "isolated")
            framemanager1._isolatedWorlds.add(contextPayload.name);
        /** @type {!ExecutionContext} */
        const context = new ExecutionContext(framemanager1._client, contextPayload, world);
        world._setContext(context);
        framemanager1._contextIdToContext.set(contextPayload.id, context);
    }

    /**
      * @param {number} executionContextId
      */
    _onExecutionContextDestroyed(executionContextId) {
        const context = framemanager1._contextIdToContext.get(executionContextId);
        framemanager1._contextIdToContext.delete(executionContextId);
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
        frame1 = this;
        module.exports.frame1 = this;
        frame1._client = client;
        frame1._parentFrame = parentFrame;
        frame1._url = "";
        frame1._id = frameId;
        frame1._detached = false;

        frame1._loaderId = "";
        /** @type {!Set<string>} */
        frame1._lifecycleEvents = new Set();
        /** @type {!DOMWorld} */
        domworld1 = new DOMWorld(frameManager, frame1);
        module.exports.domworld1 = domworld1;
        /** @type {!DOMWorld} */
        domworld2 = new DOMWorld(frameManager, frame1);
        module.exports.domworld2 = domworld2;
    }

    /**
      * @param {!Protocol.Page.Frame} framePayload
      */
    _navigated(framePayload) {
        frame1._name = framePayload.name;
        // TODO(lushnikov): remove this once requestInterception has loaderId exposed.
        frame1._navigationURL = framePayload.url;
        frame1._url = framePayload.url;
    }

    /**
      * @param {string} loaderId
      * @param {string} name
      */
    _onLifecycleEvent(loaderId, name) {
        if (name === "init") {
            frame1._loaderId = loaderId;
            frame1._lifecycleEvents.clear();
        }
        frame1._lifecycleEvents.add(name);
    }
}



/*
lib https://github.com/GoogleChrome/puppeteer/blob/v1.19.0/LifecycleWatcher.js
*/
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
            assert(protocolEvent, "Unknown value for options.waitUntil: " + value);
            return protocolEvent;
        });

        this._frame = frame;
        this._initialLoaderId = frame._loaderId;
        this._timeout = timeout;
        /** @type {?Puppeteer.Request} */
        this._navigationRequest = null;
        framemanager1.on(Events.FrameManager.LifecycleEvent, this._checkLifecycleComplete.bind(this));
        framemanager1._networkManager.on(Events.NetworkManager.Request, this._onRequest.bind(this));
        this._sameDocumentNavigationPromise = new Promise(fulfill => {
            this._sameDocumentNavigationCompleteCallback = fulfill;
        });

        this._lifecyclePromise = new Promise(fulfill => {
            this._lifecycleCallback = fulfill;
        });

        this._newDocumentNavigationPromise = new Promise(fulfill => {
            this._newDocumentNavigationCompleteCallback = fulfill;
        });

        this._terminationPromise = new Promise(fulfill => {
            this._terminationCallback = fulfill;
        });
        this._checkLifecycleComplete();
    }

    /**
      * @param {!Puppeteer.Request} request
      */
    _onRequest(request) {
        if (request._frame !== this._frame || !request._isNavigationRequest)
            return;
        this._navigationRequest = request;
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
}

const puppeteerToProtocolLifecycle = {
    "load": "load",
    "domcontentloaded": "DOMContentLoaded",
    "networkidle0": "networkIdle",
    "networkidle2": "networkAlmostIdle",
};



/*
lib https://github.com/GoogleChrome/puppeteer/blob/v1.19.0/NetworkManager.js
*/
class NetworkManager extends EventEmitter {
    /**
      * @param {!Puppeteer.CDPSession} client
      */
    constructor(client) {
        super();
        this._client = client;
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

        this._client.on("Network.requestWillBeSent", this._onRequestWillBeSent.bind(this));
        this._client.on("Network.requestServedFromCache", this._onRequestServedFromCache.bind(this));
        this._client.on("Network.responseReceived", this._onResponseReceived.bind(this));
        this._client.on("Network.loadingFinished", this._onLoadingFinished.bind(this));
    }

    async initialize() {
        await this._client.send("Network.enable");
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
        const request = new Request(this._client, frame1, interceptionId, this._userRequestInterceptionEnabled, event, redirectChain);
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
        response._bodyLoadedPromiseFulfill.call(null, new Error("Response body is unavailable for redirect responses"));
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
        request._response._bodyLoadedPromiseFulfill.call(null);
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
        this._isNavigationRequest = event.requestId === event.loaderId && event.type === "Document";
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
}

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
        this._url = request._url;
        this._fromDiskCache = !!responsePayload.fromDiskCache;
        this._fromServiceWorker = !!responsePayload.fromServiceWorker;
        this._headers = {};
        for (const key of Object.keys(responsePayload.headers))
            this._headers[key.toLowerCase()] = responsePayload.headers[key];
    }
}



/*
lib https://github.com/GoogleChrome/puppeteer/blob/v1.19.0/Page.js
*/
class Page extends EventEmitter {
    /**
      * @param {!Puppeteer.CDPSession} client
      * @param {!Puppeteer.Target} target
      * @return {!Promise<!Page>}
      */
    static async create(client, target) {
        page1 = new Page(client, target);
        await page1._initialize();
        return page1;
    }

    /**
      * @param {!Puppeteer.CDPSession} client
      * @param {!Puppeteer.Target} target
      */
    constructor(client, target) {
        super();
        page1 = this;
        page1._closed = false;
        page1._client = client;
        page1._target = target;
        /** @type {!FrameManager} */
        new FrameManager(client, page1);
        /** @type {!Map<string, Function>} */
        page1._pageBindings = new Map();
        page1._javascriptEnabled = true;

        /** @type {!Map<string, Worker>} */
        page1._workers = new Map();

        framemanager1.on(Events.FrameManager.FrameNavigated, event => page1.emit(Events.Page.FrameNavigated, event));

        const networkManager = framemanager1._networkManager;
        networkManager.on(Events.NetworkManager.Request, event => page1.emit(Events.Page.Request, event));
        networkManager.on(Events.NetworkManager.Response, event => page1.emit(Events.Page.Response, event));
        networkManager.on(Events.NetworkManager.RequestFinished, event => page1.emit(Events.Page.RequestFinished, event));
        page1._fileChooserInterceptionIsDisabled = false;
        page1._fileChooserInterceptors = new Set();

        client.on("Page.domContentEventFired", event => page1.emit(Events.Page.DOMContentLoaded));
        client.on("Page.loadEventFired", event => page1.emit(Events.Page.Load));
        var that;
        that = page1;
        page1._target._isClosedPromise.then(function () {
            that.emit(Events.Page.Close);
            that._closed = true;
        });
    }

    async _initialize() {
        await Promise.all([
            framemanager1.initialize(),
            page1._client.send("Target.setAutoAttach", {
                autoAttach: true, waitForDebuggerOnStart: false, flatten: true}),
            page1._client.send("Performance.enable", {}),
            page1._client.send("Log.enable", {}),
        ]);
    }
}
module.exports = {
Browser,
LifecycleWatcher,
Page,
Receiver,
Sender,
initAsClient,
connection1,
domworld2
};
/*
file none
*/
/* jslint ignore:end */
}(globalThis.globalLocal));
