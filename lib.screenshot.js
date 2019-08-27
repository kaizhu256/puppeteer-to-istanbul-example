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
var domworld1;
var domworld2;
var frame1;
var framemanager1;
var networkmanager1;
var page1;
var websocket1;
var wsCallbackCounter;
var wsCallbackDict;
var wsCreate;
var wsRead;
var wsReadConsume;
var wsWrite;
var wsSessionId;

//!! throwError
wsCallbackCounter = 0;
wsCallbackDict = {};
wsCreate = function (wsUrl, onError) {
/*
 * this function will create websocket1 from <wsUrl>
 */
    wsUrl = new url.URL(wsUrl);
    http.get({
        headers: {
            "Sec-WebSocket-Version": 13,
            "Sec-WebSocket-Key": crypto.randomBytes(16).toString("base64"),
            "Connection": "Upgrade",
            "Upgrade": "websocket"
        },
        host: "127.0.0.1",
        path: wsUrl.pathname,
        port: wsUrl.port
    }).on("upgrade", function (ignore, socket) {
        websocket1 = socket;
        websocket1.setTimeout(0);
        websocket1.setNoDelay();
        websocket1.on("data", wsRead);
        onError();
    });
};
var wsRead = function (chunk) {
/*
 * this function will read <chunk> from websocket1
 */
    var bff;
    var data;
    var fragments;
    var messageLength;
    var num;
    // init
    wsRead.byteLength = wsRead.byteLength || 0;
    wsRead.byteLengthTotal = wsRead.byteLengthTotal || 0;
    wsRead.bufferedBytes = wsRead.bufferedBytes || 0;
    wsRead.bffList = wsRead.bffList || [];
    wsRead.fragments = wsRead.fragments || [];
    wsRead.messageLength = wsRead.messageLength || 0;
    wsRead.bufferedBytes += chunk.length;
    wsRead.bffList.push(chunk);
    while (true) {
        switch (wsRead.state) {
        // Gets extended payload length (7+16).
        case "1_GET_PAYLOAD_LENGTH_16":
            wsRead.byteLength = wsReadConsume(2).readUInt16BE(0);
            wsRead.byteLengthTotal += wsRead.byteLength;
            wsRead.state = "4_GET_DATA";
            break;
        // Gets extended payload length (7+64).
        case "2_GET_PAYLOAD_LENGTH_64":
            bff = wsReadConsume(8);
            num = bff.readUInt32BE(0);
            wsRead.byteLength = num * Math.pow(2, 32) + bff.readUInt32BE(4);
            wsRead.byteLengthTotal += wsRead.byteLength;
            wsRead.state = "4_GET_DATA";
            break;
        case "4_GET_DATA":
            if (wsRead.bufferedBytes < wsRead.byteLength) {
                return;
            }
            data = wsReadConsume(wsRead.byteLength);
            wsRead.messageLength = wsRead.byteLengthTotal;
            wsRead.fragments.push(data);
            messageLength = wsRead.messageLength;
            fragments = wsRead.fragments;
            wsRead.byteLengthTotal = 0;
            wsRead.messageLength = 0;
            wsRead.fragments = [];
            bff = fragments[0];
            wsRead.state = "0_GET_INFO";
            wsOnMessage(bff.toString());
            break;
        // 0_GET_INFO
        // Reads the first two bytes of a frame.
        default:
            if (wsRead.bufferedBytes < 2) {
                return;
            }
            bff = wsReadConsume(2);
            switch(bff[1] & 0x7f) {
            case 126:
                wsRead.state = "1_GET_PAYLOAD_LENGTH_16"
                break;
            case 127:
                wsRead.state = "2_GET_PAYLOAD_LENGTH_64"
                break;
            }
            wsRead.byteLengthTotal += wsRead.byteLength;
            wsRead.state = "4_GET_DATA";
        }
    }
}
wsReadConsume = function (n) {
/**
  * Consumes `n` bytes from the buffered data.
  *
  * @param {Number} n The number of bytes to consume
  * @return {Buffer} The consumed bytes
  * @private
  */
    var bff;
    var dst;
    wsRead.bufferedBytes -= n;
    if (n === wsRead.bffList[0].length) {
        return wsRead.bffList.shift();
    }
    if (n < wsRead.bffList[0].length) {
        bff = wsRead.bffList[0];
        wsRead.bffList[0] = bff.slice(n);
        return bff.slice(0, n);
    }
    dst = Buffer.allocUnsafe(n);
    do {
        const bff = wsRead.bffList[0];
        wsRead.bffList.shift().copy(dst, dst.length - n);
        n -= bff.length;
    } while (n > 0);
    return dst;
}
var wsRead2 = function (chunk) {
/*
 * this function will read <chunk> from websocket1
 */
    var bff;
    // init bff
    chunk = chunk || Buffer.allocUnsafe(0);
    wsRead.bff = wsRead.bff || chunk;
    wsRead.bff = Buffer.concat([wsRead.bff, chunk]);
    switch (debugInline(wsRead.state | 0)) {
    // Reads the first two bytes of a frame.
    case 0:
        switch (debugInline(wsRead.bff[1] & 0x7f)) {
        case 0:
            return;
        // Gets extended payload length (7+16) bits.
        case 126:
            if (wsRead.bff.length < (2 + 2)) {
                return;
            }
            wsRead.payloadLength = wsRead.bff.readUInt16BE(2);
            wsRead.bff = wsRead.bff.slice(2 + 2);
            break;
        // Gets extended payload length (7+64) bits.
        case 127:
            if (wsRead.bff.length < (2 + 8)) {
                return;
            }
            wsRead.payloadLength = (
                wsRead.bff.readUInt32BE(2) * 0x100000000
                + wsRead.bff.readUInt32BE(6)
            );
            wsRead.bff = wsRead.bff.slice(2 + 8);
            break;
        // Gets payload length (7) bits.
        default:
            wsRead.payloadLength = wsRead.bff[1];
            wsRead.bff = wsRead.bff.slice(2);
        }
        wsRead.state = 1;
        wsRead();
        break;
    // Reads data bytes.
    case 1:
        debugInline([wsRead.bff.length, wsRead.payloadLength]);
        if (wsRead.bff.length < wsRead.payloadLength) {
            return;
        }
        wsRead.state = 0;
        bff = wsRead.bff.slice(0, wsRead.payloadLength);
        wsRead.bff = wsRead.bff.slice(wsRead.payloadLength);
        wsOnMessage(debugInline(bff.toString()));
        break;
    }
};
wsWrite = function (method, params) {
/*
 * this function will convert <data> to websocket-masked-frame and send it
 * https://tools.ietf.org/html/rfc6455
 */
    var data;
    var header;
    var ii;
    var mask;
    data = {
        method,
        params,
        sessionId: wsSessionId
    };
    wsCallbackCounter += 1;
    data.id = wsCallbackCounter;
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
    return new Promise(function (resolve) {
        wsCallbackDict[wsCallbackCounter] = resolve;
    });
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
        await wsWrite("Target.setDiscoverTargets", {
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



/**
  * @param {string} message
  */
var wsOnMessage = function (message) {
    var id;
    var method;
    var params;
    var result;
    var sessionId;
    message = JSON.parse(message);
    id = message.id;
    method = message.method;
    params = message.params;
    result = message.result;
    sessionId = message.sessionId;
    if (method === "Target.attachedToTarget") {
        wsSessionId = params.sessionId;
    }
    if (sessionId) {
        if (id && wsCallbackDict[id]) {
            const callback = wsCallbackDict[id];
            delete wsCallbackDict[id];
            callback(result);
        } else {
            assert(!id);
        }
    } else if (id) {
        const callback = wsCallbackDict[id];
        // Callbacks could be all rejected if someone has called `.dispose()`.
        delete wsCallbackDict[id];
        callback(result);
        return;
    }
    switch (method) {
    case "Network.requestWillBeSent":
        networkmanager1._onRequestWillBeSent(params);
        break;
    case "Network.requestServedFromCache":
        networkmanager1._onRequestServedFromCache(params);
        break;
    case "Network.responseReceived":
        networkmanager1._onResponseReceived(params);
        break;
    case "Network.loadingFinished":
        networkmanager1._onLoadingFinished(params);
        break;
    case "Page.domContentEventFired":
        page1.emit(Events.Page.DOMContentLoaded);
        break;
    case "Page.loadEventFired":
        page1.emit(Events.Page.Load);
        break;
    case "Page.frameNavigated":
        framemanager1._onFrameNavigated(params.frame);
        break;
    case "Page.frameStoppedLoading":
        framemanager1._onFrameStoppedLoading(params.frameId);
        break;
    case "Page.lifecycleEvent":
        framemanager1._onLifecycleEvent(params);
        break;
    case "Runtime.executionContextCreated":
        framemanager1._onExecutionContextCreated(params.context);
        break;
    case "Runtime.executionContextDestroyed":
        framemanager1._onExecutionContextDestroyed(params.executionContextId);
        break;
    case "Target.targetCreated":
        browser1._targetCreated(params);
        break;
    case "Target.targetDestroyed":
        browser1._targetDestroyed(params);
        break;
    case "Target.targetInfoChanged":
        browser1._targetInfoChanged(params);
        break;
    }
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
        callFunctionOnPromise = wsWrite("Runtime.callFunctionOn", {
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
    }

    async initialize() {
        const [
            ,
            {
                frameTree
            }
        ] = await Promise.all([
            wsWrite("Page.enable", {}),
            wsWrite("Page.getFrameTree", {}),
        ]);
        framemanager1._onFrameNavigated(frameTree.frame);
        await Promise.all([
            wsWrite("Page.setLifecycleEventsEnabled", {
                enabled: true
            }),
            wsWrite("Runtime.enable", {}).then(() => framemanager1._ensureIsolatedWorld(UTILITY_WORLD_NAME)),
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
            frame1 = new Frame(framemanager1, null, null, framePayload.id);
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
        await wsWrite("Page.addScriptToEvaluateOnNewDocument", {
            source: `//# sourceURL=${EVALUATION_SCRIPT_URL}`,
            worldName: name,
        }),
        await wsWrite("Page.createIsolatedWorld", {
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
        const context = new ExecutionContext(null, contextPayload, world);
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
        networkmanager1 = this;
        /** @type {!Map<string, !Request>} */
        networkmanager1._requestIdToRequest = new Map();
        /** @type {!Map<string, !Protocol.Network.requestWillBeSentPayload>} */
        networkmanager1._requestIdToRequestWillBeSentEvent = new Map();
        /** @type {!Object<string, string>} */
        networkmanager1._extraHTTPHeaders = {};

        networkmanager1._offline = false;

        /** @type {?{username: string, password: string}} */
        networkmanager1._credentials = null;
        /** @type {!Set<string>} */
        networkmanager1._attemptedAuthentications = new Set();
        networkmanager1._userRequestInterceptionEnabled = false;
        networkmanager1._protocolRequestInterceptionEnabled = false;
        networkmanager1._userCacheDisabled = false;
        /** @type {!Map<string, string>} */
        networkmanager1._requestIdToInterceptionId = new Map();
    }

    async initialize() {
        await wsWrite("Network.enable", {});
    }

    /**
      * @return {!Object<string, string>}
      */
    extraHTTPHeaders() {
        return Object.assign({}, networkmanager1._extraHTTPHeaders);
    }

    /**
      * @param {!Protocol.Network.requestWillBeSentPayload} event
      */
    _onRequestWillBeSent(event) {
        // Request interception doesn't happen for data URLs with Network Service.
        networkmanager1._onRequest(event, null);
    }

    /**
      * @param {!Protocol.Network.requestWillBeSentPayload} event
      * @param {?string} interceptionId
      */
    _onRequest(event, interceptionId) {
        let redirectChain = [];
        if (event.redirectResponse) {
            const request = networkmanager1._requestIdToRequest.get(event.requestId);
            // If we connect late to the target, we could have missed the requestWillBeSent event.
            networkmanager1._handleRequestRedirect(request, event.redirectResponse);
            redirectChain = request._redirectChain;
        }
        const request = new Request(null, frame1, interceptionId, networkmanager1._userRequestInterceptionEnabled, event, redirectChain);
        networkmanager1._requestIdToRequest.set(event.requestId, request);
        networkmanager1.emit(Events.NetworkManager.Request, request);
    }

    /**
      * @param {!Protocol.Network.requestServedFromCachePayload} event
      */
    _onRequestServedFromCache(event) {
        const request = networkmanager1._requestIdToRequest.get(event.requestId);
        request._fromMemoryCache = true;
    }

    /**
      * @param {!Request} request
      * @param {!Protocol.Network.Response} responsePayload
      */
    _handleRequestRedirect(request, responsePayload) {
        const response = new Response(null, request, responsePayload);
        request._response = response;
        request._redirectChain.push(request);
        response._bodyLoadedPromiseFulfill.call(null, new Error("Response body is unavailable for redirect responses"));
        networkmanager1._requestIdToRequest.delete(request._requestId);
        networkmanager1._attemptedAuthentications.delete(request._interceptionId);
        networkmanager1.emit(Events.NetworkManager.Response, response);
        networkmanager1.emit(Events.NetworkManager.RequestFinished, request);
    }

    /**
      * @param {!Protocol.Network.responseReceivedPayload} event
      */
    _onResponseReceived(event) {
        const request = networkmanager1._requestIdToRequest.get(event.requestId);
        const response = new Response(null, request, event.response);
        request._response = response;
        networkmanager1.emit(Events.NetworkManager.Response, response);
    }

    /**
      * @param {!Protocol.Network.loadingFinishedPayload} event
      */
    _onLoadingFinished(event) {
        const request = networkmanager1._requestIdToRequest.get(event.requestId);
        // Under certain conditions we never get the Network.responseReceived
        // event from protocol. @see https://crbug.com/883475
        request._response._bodyLoadedPromiseFulfill.call(null);
        networkmanager1._requestIdToRequest.delete(request._requestId);
        networkmanager1._attemptedAuthentications.delete(request._interceptionId);
        networkmanager1.emit(Events.NetworkManager.RequestFinished, request);
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

        page1._target._isClosedPromise.then(function () {
            page1.emit(Events.Page.Close);
        });
    }

    async _initialize() {
        await Promise.all([
            framemanager1.initialize(),
            wsWrite("Target.setAutoAttach", {
                autoAttach: true,
                waitForDebuggerOnStart: false,
                flatten: true
            }),
            wsWrite("Performance.enable", {}),
            wsWrite("Log.enable", {}),
        ]);
    }
}
module.exports = {
Browser,
LifecycleWatcher,
Page,
domworld2,
wsCreate,
wsWrite
};
/*
file none
*/
/* jslint ignore:end */
}(globalThis.globalLocal));
