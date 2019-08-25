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
var browserWSEndpoint;
var child_process;
var chromeCloseGracefully;
var chromeKillSync;
var chromeProcess;
var fs;
var fsWriteFile;
var page;
var path;
var readline;
var tmp;
local.nop(assert, path);



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



// init process.exit and timerTimeout
process.on("exit", chromeKillSync);
process.on("SIGINT", chromeKillSync);
process.on("SIGTERM", chromeKillSync);
process.on("SIGHUP", chromeKillSync);
setTimeout(function () {
    throw new Error("chrome-screenshot - errTimeout - 30000 ms");
}, 30000).unref();



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
readline = require("readline");
//!! tls = require("tls");
//!! url = require("url");
//!! util = require("util");
//!! { Writable} = require("stream");
//!! { randomBytes} = require("crypto");
module.exports = require("./lib.puppeteer.screenshot.js");



// init browser
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
chromeProcess.stderr.pipe(process.stderr);
chromeProcess.stdout.pipe(process.stdout);
await new Promise(function (resolve, reject) {
    var cleanup;
    var onClose;
    var onLine;
    var rl;
    cleanup = function () {
        chromeProcess.removeListener("error", onClose);
        chromeProcess.removeListener("exit", onClose);
        rl.removeListener("close", onClose);
        rl.removeListener("line", onLine);
    };
    onClose = function (err) {
        cleanup();
        reject(err);
    };
    onLine = function (line) {
        browserWSEndpoint = (
            /^DevTools\u0020listening\u0020on\u0020(ws:\/\/.*)$/
        ).exec(line);
        if (browserWSEndpoint) {
            cleanup();
            browserWSEndpoint = browserWSEndpoint[1];
            resolve();
        }
    };
    rl = readline.createInterface({
        input: chromeProcess.stderr
    });
    chromeProcess.on("error", onClose);
    chromeProcess.on("exit", onClose);
    rl.on("close", onClose);
    rl.on("line", onLine);
});
browser = await new Promise(function (resolve, reject) {
    var ws;
    ws = new module.exports.WebSocket(browserWSEndpoint, [], {
        maxPayload: 256 * 1024 * 1024 // 256Mb
    });
    ws.addEventListener("message", function (evt) {
        ws.onmessage(evt.data);
    });
    ws.addEventListener("close", function () {
        ws.onclose();
    });
    ws.addEventListener("open", function () {
        resolve(ws);
    });
    ws.addEventListener("error", reject);
});
browser = new module.exports.Connection(browserWSEndpoint, browser, 0);
browser = await module.exports.Browser.create(
    browser,
    [],
    chromeProcess,
    chromeCloseGracefully
);
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
