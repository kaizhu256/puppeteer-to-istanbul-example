/* jslint utility2:true */
(function (globalThis) {
    "use strict";
    var consoleError;
    var local;
    // init globalThis
    globalThis.globalThis = globalThis.globalThis || globalThis;
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
}(
    typeof globalThis === "object"
    ? globalThis
    : (function () {
        return Function("return this")(); // jslint ignore:line
    }())
));



(async function (local) {
"use strict";



// init var
var assert;
var browser;
var child_process;
var chromeCloseGracefully;
var chromeKillSync;
var chromeProcess;
var fs;
var fsWriteFile;
var gotoNext;
var gotoNextData;
var gotoState;
var onDataUrlInspect;
var onReject;
var onResolve;
var page;
var path;
var tmp;
var urlInspect;
var util;
var websocket1;
local.nop(assert, path, util);



// require module
assert = require("assert");
//!! EventEmitter = require("events");
//!! URL = require("url");
child_process = require("child_process");
//!! crypto = require("crypto");
fs = require("fs");
//!! http = require("http");
//!! https = require("https");
//!! net = require("net");
//!! os = require("os");
path = require("path");
//!! tls = require("tls");
//!! url = require("url");
util = require("util");
//!! { Writable} = require("stream");
//!! { randomBytes} = require("crypto");
module.exports = require("./lib.screenshot.js");



// init function
chromeCloseGracefully = function () {
/**
  * @return {Promise}
  */
    // Attempt to close chrome gracefully
    browser._connection.send("Browser.close").catch(function (err) {
        console.error(err);
        chromeKillSync();
    });
    return new Promise(function (resolve) {
        chromeProcess.once("exit", resolve);
    });
};
chromeKillSync = function () {
/*
 * This method has to be sync to be used as 'exit' event handler.
 */
    // Force kill chrome.
    try {
        if (process.platform === "win32") {
            child_process.execSync(
                `taskkill /pid ${chromeProcess.pid} /T /F`
            );
        } else {
            process.kill(-chromeProcess.pid, "SIGKILL");
        }
    // the process might have already stopped
    } catch (ignore) {}
};
fsWriteFile = function (file, data) {
    return new Promise(function (resolve, reject) {
        fs.writeFile(file, data, function (err) {
            if (err) {
                reject(err);
                return;
            }
            resolve();
        });
    });
};
gotoNextData = function (data) {
    gotoNext(null, data);
};
onDataUrlInspect = function (data) {
    urlInspect += String(data);
    urlInspect.replace((
        /\nDevTools\u0020listening\u0020on\u0020(ws:\/\/.+?)\n/
    ), function (ignore, match1) {
        urlInspect = match1;
        chromeProcess.stderr.removeListener("data", onDataUrlInspect);
        gotoNext();
    });
};



gotoNext = async function (err, data) {
    gotoState += 1;
    if (err) {
        onReject(err);
        return;
    }
    switch (gotoState) {
    // init-once
    case 1:
        // init timerTimeout
        setTimeout(function () {
            throw new Error("chrome-screenshot - errTimeout - 30000 ms");
        }, 30000).unref();
        // init process.exit
        process.on("exit", chromeKillSync);
        process.on("SIGINT", chromeKillSync);
        process.on("SIGTERM", chromeKillSync);
        process.on("SIGHUP", chromeKillSync);
        // init chromeProcess
        chromeProcess = child_process.spawn((
            "node_modules/puppeteer/.local-chromium"
            + "/linux-674921/chrome-linux/chrome"
        ), [
            "--disable-setuid-sandbox",
            "--headless",
            "--hide-scrollbars",
            "--incognito",
            "--mute-audio",
            "--no-sandbox",
            "--remote-debugging-port=0"
        ], {
            // On non-windows platforms, `detached: false` makes child process
            // a leader of a new process group, making it possible
            // to kill child process tree with `.kill(-pid)` command.
            // https://nodejs.org/api/child_process.html#child_process_options_detached
            detached: process.platform !== "win32",
            env: process.env,
            stdio: [
                "pipe", "pipe", "pipe"
            ]
        });
        // init evt-handling - chromeProcess
        chromeProcess.stderr.pipe(process.stderr);
        chromeProcess.stdout.pipe(process.stdout);
        urlInspect = "";
        chromeProcess.stderr.on("data", onDataUrlInspect);
        break;
    case 2:
        // init websocket1
        websocket1 = module.exports.websocket1;
        module.exports.initAsClient(websocket1, urlInspect, "");
        websocket1.once("open", gotoNextData);
        websocket1.once("error", gotoNext);
        break;
    case 3:
        browser = new module.exports.Connection(urlInspect, websocket1, 0);
        browser = await module.exports.Browser.create(
            browser,
            [],
            chromeProcess,
            chromeCloseGracefully
        );
        gotoNext();
        break;
    default:
        onResolve(data);
    }
};
await new Promise(function (resolve, reject) {
    onReject = reject;
    onResolve = resolve;
    gotoState = 0;
    gotoNext();
});



tmp = await browser._connection.send("Target.createTarget", {
    url: "about:blank"
});
tmp = await browser.targetDict[tmp.targetId];
page = await browser._connection.createSession(tmp._targetInfo);
page = await module.exports.Page.create(page, tmp);
//!! page.then(function (client) {
    //!! return module.exports.Page.create(debugInline(client), target);
//!! });

    //!! /**
      //!! * @param {Protocol.Target.TargetInfo} targetInfo
      //!! * @return {!Promise<!CDPSession>}
      //!! */
    //!! async createSession(targetInfo) {
        //!! const {
            //!! sessionIdi
        //!! }
        //!! page = await connection.send("Target.attachToTarget", {
            //!! targetId: page._targetInfo.targetId,
            //!! flatten: true
        //!! });
        //!! page = await connection._sessions.get(page.sessionId);
    //!! }



// browser - load url
const watcher = new module.exports.LifecycleWatcher(
    page._frameManager,
    page._frameManager._mainFrame,
    [
        "load"
    ]
);
await new Promise(function (resolve) {
    page._frameManager._client.send("Page.navigate", {
        url: "https://www.highcharts.com/stock/demo/stock-tools-gui",
        referer: page._frameManager._networkManager.extraHTTPHeaders().referer,
        frameId: page._frameManager._mainFrame._id
    }).then(resolve);
});
await local.identity(watcher._newDocumentNavigationPromise);
await local.identity(watcher._navigationRequest._response);



// browser - wait 2000 ms
await new Promise(function (resolve) {
    setTimeout(resolve, 2000);
});



// browser - screenshot
await Promise.all([
    // screenshot - png
    (async function () {
        var result;
        await page._client.send("Target.activateTarget", {
            targetId: page._target._targetId
        });
        result = await page._client.send("Page.captureScreenshot", {
            format: "png"
        });
        await fsWriteFile("tmp/aa.png", Buffer.from(result.data, "base64"));
    }()),
    // screenshot - html
    (async function () {
        var result;
        result = page._frameManager._mainFrame._secondaryWorld._contextPromise;
        result = await local.identity(result);
        result = await result._evaluateInternal(
            true,
            Function( // jslint ignore:line
                `var html = "";
if (document.doctype) {
    html = new XMLSerializer().serializeToString(document.doctype);
}
if (document.documentElement) {
    html += document.documentElement.outerHTML;
}
return html.trim()` + " + \"\\n\""
            )
        );
        await fsWriteFile("tmp/aa.html", result);
    }())
]);



// browser - close
await browser.close();
}(globalThis.globalLocal));
