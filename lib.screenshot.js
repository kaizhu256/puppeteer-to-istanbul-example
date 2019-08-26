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
const stream = require("stream");



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
    stream,
    timeout,
    tls,
    url,
    util
);



/* jslint ignore:start */
var browser1;
var callbackDict;
var connection1;
var domworld1;
var domworld2;
var frame1;
var framemanager1;
var page1;
var receiver1;
var session1;
var websocket1;
var websocketSend;

callbackDict = {};
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
receiver1 = new stream.Writable();
receiver1._bufferedBytes = 0;
receiver1._buffers = [];
receiver1._compressed = false;
receiver1._payloadLength = 0;
receiver1._mask = undefined;
receiver1._fragmented = 0;
receiver1._masked = false;
receiver1._fin = false;
receiver1._opcode = 0;
receiver1._totalPayloadLength = 0;
receiver1._messageLength = 0;
receiver1._fragments = [];
receiver1._state = GET_INFO;
receiver1._loop = false;

/**
  * Implements `Writable.prototype._write()`.
  *
  * @param {Buffer} chunk The chunk of data to write
  * @param {String} encoding The character encoding of `chunk`
  * @param {Function} cb Callback
  */
receiver1._write = function (chunk, encoding, cb) {
    var bff;
    var data;
    var fragments;
    var messageLength;
    var num;
    receiver1._bufferedBytes += chunk.length;
    receiver1._buffers.push(chunk);
    receiver1._loop = true;
    do {
        switch (receiver1._state) {
        // Reads the first two bytes of a frame.
        case GET_INFO:
            if (receiver1._bufferedBytes < 2) {
                receiver1._loop = false;
                break;
            }
            bff = receiver1.consume(2);
            receiver1._fin = (bff[0] & 0x80) === 0x80;
            receiver1._opcode = bff[0] & 0x0f;
            receiver1._payloadLength = bff[1] & 0x7f;
            receiver1._masked = (bff[1] & 0x80) === 0x80;
            if (receiver1._payloadLength === 126) {
                receiver1._state = GET_PAYLOAD_LENGTH_16
            } else if (receiver1._payloadLength === 127) {
                receiver1._state = GET_PAYLOAD_LENGTH_64;
            } else {
                receiver1.haveLength();
            }
            break;
        // Gets extended payload length (7+16).
        case GET_PAYLOAD_LENGTH_16:
            receiver1._payloadLength = receiver1.consume(2).readUInt16BE(0);
            receiver1.haveLength();
            break;
        // Gets extended payload length (7+64).
        case GET_PAYLOAD_LENGTH_64:
            bff = receiver1.consume(8);
            num = bff.readUInt32BE(0);
            receiver1._payloadLength = num * Math.pow(2, 32) + bff.readUInt32BE(4);
            receiver1.haveLength();
            break;
        case GET_DATA:
            if (receiver1._bufferedBytes < receiver1._payloadLength) {
                receiver1._loop = false;
                break;
            }
            data = receiver1.consume(receiver1._payloadLength);
            receiver1._messageLength = receiver1._totalPayloadLength;
            receiver1._fragments.push(data);
            messageLength = receiver1._messageLength;
            fragments = receiver1._fragments;
            receiver1._totalPayloadLength = 0;
            receiver1._messageLength = 0;
            receiver1._fragmented = 0;
            receiver1._fragments = [];
            bff = fragments[0];
            receiver1._state = GET_INFO;
            connection1._onMessage(bff.toString());
            break;
        }
    } while (receiver1._loop);
    cb();
}

receiver1.consume = function (n) {
/**
  * Consumes `n` bytes from the buffered data.
  *
  * @param {Number} n The number of bytes to consume
  * @return {Buffer} The consumed bytes
  * @private
  */
    var bff;
    var dst;
    receiver1._bufferedBytes -= n;
    if (n === receiver1._buffers[0].length) {
        return receiver1._buffers.shift();
    }
    if (n < receiver1._buffers[0].length) {
        bff = receiver1._buffers[0];
        receiver1._buffers[0] = bff.slice(n);
        return bff.slice(0, n);
    }
    dst = Buffer.allocUnsafe(n);
    do {
        const bff = receiver1._buffers[0];
        receiver1._buffers.shift().copy(dst, dst.length - n);
        n -= bff.length;
    } while (n > 0);

    return dst;
}

    /**
      * Payload length has been read.
      *
      * @return {(RangeError|undefined)} A possible error
      * @private
      */
    receiver1.haveLength = function () {
        receiver1._totalPayloadLength += receiver1._payloadLength;
        receiver1._state = GET_DATA;
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
function initAsClient(socket) {
    websocket1 = socket;
    receiver1.on("drain", websocket1.resume.bind(websocket1));
    websocket1.setTimeout(0);
    websocket1.setNoDelay();
    websocket1.on("data", function (chunk) {
        if (!receiver1.write(chunk)) {
            websocket1.pause();
        }
    });
    websocket1.on("error", local.assertThrow);
}



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
        await websocketSend("Target.setDiscoverTargets", {
            discover: true
        });
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
        browser1._closeCallback = closeCallback;
        browser1._contexts = new Map();
        /** @type {Map<string, Target>} */
        browser1.targetDict = {};
        connection1.on(Events.Connection.Disconnected, () => browser1.emit(Events.Browser.Disconnected));
        connection1.on("Target.targetCreated", browser1._targetCreated.bind(browser1));
        connection1.on("Target.targetDestroyed", browser1._targetDestroyed.bind(browser1));
        connection1.on("Target.targetInfoChanged", browser1._targetInfoChanged.bind(browser1));
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
}



/*
lib https://github.com/GoogleChrome/puppeteer/blob/v1.19.0/Connection.js
*/
    connection1 = new EventEmitter();
    /** @type {!Map<string, !CDPSession>}*/
    connection1._closed = false;

    /**
      * @param {string} method
      * @param {!Object=} params
      * @return {!Promise<?Object>}
      */
    websocketSend = function (method, params = {}) {
    /*
     * this function will convert <data> to websocket-masked-frame and send it
     * https://tools.ietf.org/html/rfc6455
     */
        var data;
        var header;
        var ii;
        var mask;
        websocket1.ii = (websocket1.ii | 0) + 1;
        data = {
            method,
            params,
            sessionId: session1._sessionId
        };
        data.id = websocket1.ii;
        data = Buffer.from(JSON.stringify(data));
        // init header
        header = Buffer.allocUnsafe(8);
        // init field-opcode
        header[0] = 0x81;
        // init field-size
        header[1] = 0xfe;
        header.writeUInt16BE(data.length, 2);
        // init field-mask
        mask = crypto.randomBytes(4);
        header[4] = mask[0];
        header[5] = mask[1];
        header[6] = mask[2];
        header[7] = mask[3];
        // send header
        websocket1.cork();
        websocket1.write(header);
        // mask data
        ii = data.length;
        while (ii > 0) {
            ii -= 1;
            data[ii] = data[ii] ^ mask[ii & 3];
        }
        // send data
        websocket1.write(data);
        websocket1.uncork();
        // resolve
        ii = websocket1.ii;
        return new Promise(function (resolve, reject) {
            callbackDict[ii] = {
                resolve,
                reject,
                error: new Error(),
                method
            };
        });
    }

    /**
      * @param {string} message
      */
    connection1._onMessage = function (message) {
        const object = JSON.parse(message);
        if (object.method === "Target.attachedToTarget") {
            session1._targetType = object.params.targetInfo.type;
            session1._sessionId = object.params.sessionId;
        }
        if (object.sessionId) {
            if (object.id && callbackDict[object.id]) {
                const callback = callbackDict[object.id];
                delete callbackDict[object.id];
                callback.resolve(object.result);
            } else {
                assert(!object.id);
                session1.emit(object.method, object.params);
            }
        } else if (object.id) {
            const callback = callbackDict[object.id];
            // Callbacks could be all rejected if someone has called `.dispose()`.
            delete callbackDict[object.id];
            callback.resolve(object.result);
        } else {
            connection1.emit(object.method, object.params);
        }
    }

    /**
      * @param {Protocol.Target.TargetInfo} targetInfo
      * @return {!Promise<!CDPSession>}
      */
    connection1.createSession = async function (targetInfo) {
        var tmp;
        tmp = await websocketSend("Target.attachToTarget", {
            targetId: targetInfo.targetId,
            flatten: true
        });
        return session1
    }

    session1 = new EventEmitter();



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
        callFunctionOnPromise = websocketSend("Runtime.callFunctionOn", {
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
        framemanager1._networkManager = new NetworkManager(client);
        /** @type {!Map<number, !ExecutionContext>} */
        framemanager1._contextIdToContext = new Map();
        /** @type {!Set<string>} */
        framemanager1._isolatedWorlds = new Set();

        session1.on("Page.frameNavigated", event => framemanager1._onFrameNavigated(event.frame));
        session1.on("Page.frameStoppedLoading", event => framemanager1._onFrameStoppedLoading(event.frameId));
        session1.on("Runtime.executionContextCreated", event => framemanager1._onExecutionContextCreated(event.context));
        session1.on("Runtime.executionContextDestroyed", event => framemanager1._onExecutionContextDestroyed(event.executionContextId));
        session1.on("Page.lifecycleEvent", event => framemanager1._onLifecycleEvent(event));
    }

    async initialize() {
        const [
            ,{
                frameTree}] = await Promise.all([
            websocketSend("Page.enable"),
            websocketSend("Page.getFrameTree"),
        ]);
        framemanager1._onFrameNavigated(frameTree.frame);
        await Promise.all([
            websocketSend("Page.setLifecycleEventsEnabled", {
                enabled: true
            }),
            websocketSend("Runtime.enable").then(() => framemanager1._ensureIsolatedWorld(UTILITY_WORLD_NAME)),
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
            frame1 = new Frame(framemanager1, session1, null, framePayload.id);
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
        await websocketSend("Page.addScriptToEvaluateOnNewDocument", {
            source: `//# sourceURL=${EVALUATION_SCRIPT_URL}`,
            worldName: name,
        }),
        await websocketSend("Page.createIsolatedWorld", {
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
        const context = new ExecutionContext(session1, contextPayload, world);
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

        session1.on("Network.requestWillBeSent", this._onRequestWillBeSent.bind(this));
        session1.on("Network.requestServedFromCache", this._onRequestServedFromCache.bind(this));
        session1.on("Network.responseReceived", this._onResponseReceived.bind(this));
        session1.on("Network.loadingFinished", this._onLoadingFinished.bind(this));
    }

    async initialize() {
        await websocketSend("Network.enable");
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
        const request = new Request(session1, frame1, interceptionId, this._userRequestInterceptionEnabled, event, redirectChain);
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
        const response = new Response(session1, request, responsePayload);
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
        const response = new Response(session1, request, event.response);
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
            websocketSend("Target.setAutoAttach", {
                autoAttach: true,
                waitForDebuggerOnStart: false,
                flatten: true
            }),
            websocketSend("Performance.enable"),
            websocketSend("Log.enable"),
        ]);
    }
}
module.exports = {
Browser,
LifecycleWatcher,
Page,
connection1,
domworld2,
initAsClient,
session1,
websocketSend
};
/*
file none
*/
/* jslint ignore:end */
}(globalThis.globalLocal));
