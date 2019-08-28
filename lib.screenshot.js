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



var Domworld;
var Response;
var browser1;
var domworld1;
var domworld2;
var frame1;
var framemanager1;
var networkmanager1;
var watcher1;
var websocket1;
var wsCallbackCounter;
var wsCallbackDict;
var wsCreate;
var wsOnEventDict;
var wsRead;
var wsSessionId;
var wsWrite;

Domworld = null;
Response = null;
browser1 = null;
domworld1 = null;
domworld2 = null;
frame1 = null;
framemanager1 = null;
networkmanager1 = null;

local.nop(browser1);
local.nop(domworld1);
local.nop(domworld2);
local.nop(frame1);
local.nop(framemanager1);
local.nop(networkmanager1);
local.nop(wsCreate);
local.nop(wsWrite);



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
wsOnEventDict = {};
wsOnEventDict["Network.loadingFinished"] = function (evt) {
    const request = networkmanager1._requestIdToRequest.get(evt.requestId);
    // Under certain conditions we never get the Network.responseReceived
    // evt from protocol. @see https://crbug.com/883475
    request._response._bodyLoadedPromiseFulfill.call(null);
    networkmanager1._requestIdToRequest.delete(request._requestId);
    networkmanager1._attemptedAuthentications.delete(request._interceptionId);
};
wsOnEventDict["Network.requestServedFromCache"] = function (evt) {
    const request = networkmanager1._requestIdToRequest.get(evt.requestId);
    request._fromMemoryCache = true;
};
wsOnEventDict["Network.requestWillBeSent"] = function (evt) {
    // Request interception doesn't happen for data URLs with Network Service.
    networkmanager1._onRequest(evt, null);
};
wsOnEventDict["Network.responseReceived"] = function (evt) {
    const request = networkmanager1._requestIdToRequest.get(evt.requestId);
    const response = new Response(null, request, evt.response);
    request._response = response;
};
wsOnEventDict["Page.frameNavigated"] = function (evt) {
    // Update or create main frame.
    if (!frame1) {
        // Initial main frame navigation.
        frame1 = {};
        frame1._id = evt.frame.id;
        frame1._url = "";
        frame1._detached = false;
        frame1._loaderId = "";
        /** @type {!Set<string>} */
        frame1._lifecycleEvents = new Set();
        /** @type {!Domworld} */
        domworld1 = new Domworld();
        module.exports.domworld1 = domworld1;
        /** @type {!Domworld} */
        domworld2 = new Domworld();
    }
    // Update frame id to retain frame identity on cross-process navigation.
    frame1._id = evt.frame.id;
    // Update frame payload.
    frame1._name = evt.frame.name;
    // TO-DO (lushnikov): remove this once requestInterception
    // has loaderId exposed.
    frame1._navigationURL = evt.frame.url;
    frame1._url = evt.frame.url;
};
wsOnEventDict["Page.frameStoppedLoading"] = function () {
    frame1._lifecycleEvents.add("DOMContentLoaded");
    frame1._lifecycleEvents.add("load");
    watcher1._checkLifecycleComplete(frame1);
};
wsOnEventDict["Page.lifecycleEvent"] = function (evt) {
    if (evt.name === "init") {
        frame1._loaderId = evt.loaderId;
        frame1._lifecycleEvents.clear();
    }
    frame1._lifecycleEvents.add(evt.name);
    if (frame1._loaderId) {
        watcher1._checkLifecycleComplete(frame1);
    }
};
wsOnEventDict["Runtime.executionContextCreated"] = function (evt) {
    let world = null;
    if (evt.context.auxData && Boolean(evt.context.auxData.isDefault)) {
        world = domworld1;
    } else if (
        evt.context.name === "__puppeteer_utility_world__"
        && !domworld2._hasContext()
    ) {
        // In case of multiple sessions to the same target,
        // there's a race between connections so we might end up creating
        // multiple isolated worlds. We can use either.
        world = domworld2;
    }
    if (evt.context.auxData && evt.context.auxData.type === "isolated") {
        framemanager1._isolatedWorlds.add(evt.context.name);
    }
    /** @type {!ExecutionContext} */
    const context = new ExecutionContext(null, evt.context, world); // jslint ignore:line
    world._setContext(context);
    framemanager1._contextIdToContext.set(evt.context.id, context);
};
wsOnEventDict["Runtime.executionContextDestroyed"] = function (evt) {
    const context = framemanager1._contextIdToContext.get(
        evt.executionContextId
    );
    framemanager1._contextIdToContext.delete(evt.executionContextId);
    context._world._setContext(null);
};
wsOnEventDict["Target.attachedToTarget"] = function (evt) {
    wsSessionId = evt.sessionId;
};
wsOnEventDict["Target.targetCreated"] = function (evt) {
    const targetInfo = evt.targetInfo;
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
    }).then(async function () {
        return true;
    });
    target._isClosedPromise = new Promise(function (fulfill) {
        target._closedCallback = fulfill;
        return fulfill;
    });
    target._isInitialized = (
        target._targetInfo.type !== "page"
        || target._targetInfo.url !== ""
    );
    if (target._isInitialized) {
        target._initializedCallback(true);
    }
    browser1.targetDict[evt.targetInfo.targetId] = target;
};
wsOnEventDict["Target.targetDestroyed"] = function (evt) {
    const target = browser1.targetDict[evt.targetId];
    target._initializedCallback(false);
    delete browser1.targetDict[evt.targetId];
    target._closedCallback();
};
wsOnEventDict["Target.targetInfoChanged"] = function (evt) {
    const target = browser1.targetDict[evt.targetInfo.targetId];
    assert(target, "target should exist before targetInfoChanged");
    target._targetInfo = evt.targetInfo;
    if (
        !target._isInitialized
        && (target._targetInfo.type !== "page" || target._targetInfo.url !== "")
    ) {
        target._isInitialized = true;
        target._initializedCallback(true);
        return;
    }
};
wsRead = function (chunk) {
/*
 * this function will read <chunk> from websocket1
 */
    var callback;
    var consume;
    var data;
    var ii;
    var tmp;
    consume = function (nn) {
    /*
     * this function will consume <nn> bytes from chunkList
     */
        tmp = 0;
        ii = wsRead.chunkList.length;
        while (ii > 0) {
            ii -= 1;
            tmp += wsRead.chunkList[ii].length;
        }
        if (nn > tmp) {
            return true;
        }
        if (nn === 0) {
            data = Buffer.allocUnsafe(0);
            return;
        }
        if (nn === wsRead.chunkList[0].length) {
            data = wsRead.chunkList.shift();
            return;
        }
        data = Buffer.allocUnsafe(nn);
        ii = 0;
        while (ii < data.length) {
            tmp = wsRead.chunkList.shift();
            nn = tmp.copy(data, ii);
            ii += nn;
            if (nn < tmp.length) {
                tmp = tmp.slice(nn);
                wsRead.chunkList.unshift(tmp);
            }
        }
    };
    // init chunkList
    wsRead.chunkList = wsRead.chunkList || [];
    wsRead.chunkList.push(chunk);
    while (true) {
        switch (wsRead.state) {
        // init payloadLength from next 2 bytes
        case "1_GET_PAYLOAD_LENGTH_16":
            if (consume(2)) {
                return;
            }
            wsRead.payloadLength = data.readUInt16BE(0);
            wsRead.state = "4_GET_DATA";
            break;
        // init payloadLength from next 8 bytes
        case "2_GET_PAYLOAD_LENGTH_64":
            if (consume(8)) {
                return;
            }
            wsRead.payloadLength = (
                0x100000000 * data.readUInt32BE(0)
                + data.readUInt32BE(4)
            );
            wsRead.state = "4_GET_DATA";
            break;
        case "4_GET_DATA":
            if (consume(wsRead.payloadLength)) {
                return;
            }
            wsRead.state = "0_GET_INFO";
            // pass message to callback with given id
            tmp = JSON.parse(String(data));
            callback = wsCallbackDict[tmp.id];
            if (callback) {
                delete wsCallbackDict[tmp.id];
                callback(tmp.result);
                break;
            }
            // pass message to evt-handler with given method
            if (wsOnEventDict.hasOwnProperty(tmp.method)) {
                wsOnEventDict[tmp.method](tmp.params);
            }
            break;
        // init payloadLength from first 2 bytes
        // 0_GET_INFO
        default:
            if (consume(2)) {
                return;
            }
            wsRead.payloadLength = data[1] & 0x7f;
            switch (wsRead.payloadLength) {
            case 126:
                wsRead.state = "1_GET_PAYLOAD_LENGTH_16";
                break;
            case 127:
                wsRead.state = "2_GET_PAYLOAD_LENGTH_64";
                break;
            default:
                wsRead.state = "4_GET_DATA";
            }
        }
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
    // cleanup
    ii = wsCallbackCounter;
    // resolve
    return new Promise(function (resolve) {
        wsCallbackDict[ii] = resolve;
    });
};

/* jslint ignore:start */

    browser1 = {};
    browser1._contexts = new Map();
    browser1.targetDict = {};



/*
lib https://github.com/GoogleChrome/puppeteer/blob/v1.19.0/Domworld.js
*/
class Domworld0 {
    /**
      * @param {!Puppeteer.FrameManager} frameManager
      */
    constructor() {
        this._frame = frame1;

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
Domworld = Domworld0;



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
      * @param {?Puppeteer.Domworld} world
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



framemanager1 = new EventEmitter();
/** @type {!Map<number, !ExecutionContext>} */
framemanager1._contextIdToContext = new Map();
/** @type {!Set<string>} */
framemanager1._isolatedWorlds = new Set();

/**
  * @param {string} name
  */
framemanager1._ensureIsolatedWorld = async function (name) {
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



        watcher1 = {};
        watcher1._expectedLifecycle = [
            "load"
        ];
        /** @type {?Puppeteer.Request} */
        watcher1._navigationRequest = null;
        watcher1._sameDocumentNavigationPromise = new Promise(fulfill => {
            watcher1._sameDocumentNavigationCompleteCallback = fulfill;
        });

        watcher1._lifecyclePromise = new Promise(fulfill => {
            watcher1._lifecycleCallback = fulfill;
        });

        watcher1._newDocumentNavigationPromise = new Promise(fulfill => {
            watcher1._newDocumentNavigationCompleteCallback = fulfill;
        });

        watcher1._terminationPromise = new Promise(fulfill => {
            watcher1._terminationCallback = fulfill;
        });

    /**
      * @param {!Puppeteer.Request} request
      */
    watcher1._onRequest = function (request) {
        if (request._frame !== watcher1._frame || !request._isNavigationRequest)
            return;
        watcher1._navigationRequest = request;
    };

    watcher1._checkLifecycleComplete = function () {
        // We expect navigation to commit.
        if (!checkLifecycle(watcher1._frame, watcher1._expectedLifecycle))
            return;
        watcher1._lifecycleCallback();
        if (watcher1._frame._loaderId === watcher1._initialLoaderId && !watcher1._hasSameDocumentNavigation)
            return;
        watcher1._newDocumentNavigationCompleteCallback();
        /**
          * @param {!Array<string>} expectedLifecycle
          * @return {boolean}
          */
        function checkLifecycle(frame, expectedLifecycle) {
            for (const evt of expectedLifecycle) {
                if (!frame._lifecycleEvents.has(evt))
                    return false;
            }
            return true;
        }
    };



networkmanager1 = new EventEmitter();
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

/**
  * @return {!Object<string, string>}
  */
networkmanager1.extraHTTPHeaders = function () {
    return Object.assign({}, networkmanager1._extraHTTPHeaders);
}

/**
  * @param {!Protocol.Network.requestWillBeSentPayload} evt
  * @param {?string} interceptionId
  */
networkmanager1._onRequest = function (evt, interceptionId) {
    let redirectChain = [];
    if (evt.redirectResponse) {
        const request = networkmanager1._requestIdToRequest.get(evt.requestId);
        // If we connect late to the target, we could have missed the requestWillBeSent evt.
        networkmanager1._handleRequestRedirect(request, evt.redirectResponse);
        redirectChain = request._redirectChain;
    }
    const request = new Request(null, frame1, interceptionId, networkmanager1._userRequestInterceptionEnabled, evt, redirectChain);
    networkmanager1._requestIdToRequest.set(evt.requestId, request);
    watcher1._onRequest(request);
}

/**
  * @param {!Request} request
  * @param {!Protocol.Network.Response} responsePayload
  */
networkmanager1._handleRequestRedirect = function (request, responsePayload) {
    const response = new Response(null, request, responsePayload);
    request._response = response;
    request._redirectChain.push(request);
    response._bodyLoadedPromiseFulfill.call(null, new Error("Response body is unavailable for redirect responses"));
    networkmanager1._requestIdToRequest.delete(request._requestId);
    networkmanager1._attemptedAuthentications.delete(request._interceptionId);
}

class Request {
    /**
      * @param {!Puppeteer.CDPSession} client
      * @param {string} interceptionId
      * @param {boolean} allowInterception
      * @param {!Protocol.Network.requestWillBeSentPayload} evt
      * @param {!Array<!Request>} redirectChain
      */
    constructor(client, frame, interceptionId, allowInterception, evt, redirectChain) {
        this._requestId = evt.requestId;
        this._isNavigationRequest = evt.requestId === evt.loaderId && evt.type === "Document";
        this._interceptionId = interceptionId;
        this._allowInterception = allowInterception;
        this._interceptionHandled = false;
        this._response = null;
        this._failureText = null;

        this._url = evt.request.url;
        this._resourceType = evt.type.toLowerCase();
        this._method = evt.request.method;
        this._postData = evt.request.postData;
        this._headers = {};
        this._frame = frame;
        this._redirectChain = redirectChain;
        for (const key of Object.keys(evt.request.headers))
            this._headers[key.toLowerCase()] = evt.request.headers[key];

        this._fromMemoryCache = false;
    }
}

class Response0 {
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
Response = Response0;



var pageCreate = async function () {
    await wsWrite("Target.setDiscoverTargets", {
        discover: true
    });
    var target1 = await wsWrite("Target.createTarget", {
        url: "about:blank"
    });
    target1 = browser1.targetDict[target1.targetId];
    module.exports.target1 = target1;
    await wsWrite("Target.attachToTarget", {
        flatten: true,
        targetId: target1._targetInfo.targetId
    });



    const [
        ,
        {
            frameTree
        }
    ] = await Promise.all([
        wsWrite("Page.enable", {}),
        wsWrite("Page.getFrameTree", {}),
    ]);
    wsOnEventDict["Page.frameNavigated"](frameTree);



    await Promise.all([
        await Promise.all([
            wsWrite("Page.setLifecycleEventsEnabled", {
                enabled: true
            }),
            wsWrite("Runtime.enable", {}).then(() => framemanager1._ensureIsolatedWorld("__puppeteer_utility_world__")),
            wsWrite("Network.enable", {}),
        ]),
        wsWrite("Target.setAutoAttach", {
            autoAttach: true,
            waitForDebuggerOnStart: false,
            flatten: true
        }),
        wsWrite("Performance.enable", {}),
        wsWrite("Log.enable", {}),
    ]);



    // browser - load url
    watcher1._frame = frame1;
    watcher1._initialLoaderId = frame1._loaderId;
    watcher1._checkLifecycleComplete();
    await new Promise(function (resolve) {
        wsWrite("Page.navigate", {
            url: "https://www.highcharts.com/stock/demo/stock-tools-gui",
            referer: networkmanager1.extraHTTPHeaders().referer,
            frameId: frame1._id
        }).then(resolve);
    });
    await watcher1._newDocumentNavigationPromise;
    await watcher1._navigationRequest._response;
}



module.exports = {
pageCreate,
wsCreate,
wsWrite
};
/*
file none
*/
/* jslint ignore:end */
}(globalThis.globalLocal));
