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
var assert;
var browser;
var browserWSEndpoint;
var child_process;
var chromeClosed;
var chromeProcess;
var fs;
var fsWriteFile;
var gracefullyCloseChrome;
var killChrome;
var listenersAdd;
var listenersProcess;
var listenersRemove;
var page;
var path;
var preferredRevision;
var readline;
var timeout;
var waitForChromeToClose;
local.nop(assert, path);

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

gracefullyCloseChrome = function () {
/**
  * @return {Promise}
  */
    listenersRemove(listenersProcess);
    // Attempt to close chrome gracefully
    connection.send("Browser.close").catch(function (err) {
        console.error(err);
        killChrome();
    });
    return waitForChromeToClose;
};

killChrome = function () {
/*
 * This method has to be sync to be used as 'exit' event handler.
 */
    listenersRemove(listenersProcess);
    if (chromeProcess.pid && !chromeProcess.killed && !chromeClosed) {
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
    }
};

listenersAdd = function (list) {
    list.forEach(function (elem) {
        elem[0].on(elem[1], elem[2]);
    });
    return list;
};

listenersRemove = function (list) {
    list.forEach(function (elem) {
        elem[0].removeListener(elem[1], elem[2]);
    });
};

// init
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

preferredRevision = 674921;
timeout = 30000;
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
// dumpio
chromeProcess.stderr.pipe(process.stderr);
chromeProcess.stdout.pipe(process.stdout);

waitForChromeToClose = new Promise(function (fulfill) {
    chromeProcess.once("exit", function () {
        chromeClosed = true;
        fulfill();
    });
});

listenersProcess = listenersAdd([
    [
        process, "exit", killChrome
    ],
    [
        process, "SIGINT", function () {
            killChrome();
            process.exit(130);
        }
    ],
    [
        process, "SIGTERM", gracefullyCloseChrome
    ],
    [
        process, "SIGHUP", gracefullyCloseChrome
    ]
]);
/** @type {?Connection} */
let connection = null;
try {
    browserWSEndpoint = await new Promise(function (resolve, reject) {
        var cleanup;
        var listeners;
        var onClose;
        var onLine;
        var onTimeout;
        var rl;
        var stderr;
        var timeoutId;
        cleanup = function () {
            clearTimeout(timeoutId);
            listenersRemove(listeners);
        };
        onClose = function (error) {
        /**
          * @param {!Error=} error
          */
            cleanup();
            reject(new Error(
                "Failed to launch chrome!" + error.message + "\n"
                + stderr + "\n\n"
                + "TROUBLESHOOTING: https://github.com/GoogleChrome/puppeteer"
                + "/blob/master/docs/troubleshooting.md\n\n"
            ));
        };
        onLine = function (line) {
        /**
          * @param {string} line
          */
            stderr += line + "\n";
            const match = line.match(
                /^DevTools\u0020listening\u0020on\u0020(ws:\/\/.*)$/
            );
            if (!match) {
                return;
            }
            cleanup();
            resolve(match[1]);
        };
        onTimeout = function () {
            cleanup();
            reject(new Error(
                "Timed out after " + timeout
                + " ms while trying to connect to Chrome!"
                + " The only Chrome revision guaranteed to work is "
                + preferredRevision
            ));
        };
        rl = readline.createInterface({
            input: chromeProcess.stderr
        });
        stderr = "";
        listeners = listenersAdd([
            [
                rl, "line", onLine
            ],
            [
                rl, "close", onClose
            ],
            [
                chromeProcess, "exit", onClose
            ],
            [
                chromeProcess, "error", onClose
            ]
        ]);
        timeoutId = setTimeout(onTimeout, timeout);
    });
    const transport = await module.exports.WebSocketTransport.create(
        browserWSEndpoint
    );
    connection = new module.exports.Connection(browserWSEndpoint, transport, 0);
    browser = await module.exports.Browser.create(
        connection,
        [],
        false,
        {
            width: 800,
            height: 600
        },
        chromeProcess,
        gracefullyCloseChrome
    );
    await browser.waitForTarget(function (t) {
        return t._targetInfo.type === "page";
    });
} catch (errCaught) {
    killChrome();
    console.error(errCaught);
}
//!! console.error(
    //!! browser._defaultContext._id
//!! );
page = await browser._defaultContext._browser._connection.send(
    "Target.createTarget",
    {
        url: "about:blank"
    }
);
page = await browser._defaultContext._browser._targets.get(page.targetId);
assert(await page._initializedPromise, "Failed to create target for page");
page = await page.page();



// screenshot - load url
const watcher = new module.exports.LifecycleWatcher(
    page._frameManager,
    page._frameManager._mainFrame,
    [
        "load"
    ],
    timeout
);
await new Promise(function (resolve) {
    page._frameManager._client.send("Page.navigate", {
        url: "https://www.highcharts.com/stock/demo/stock-tools-gui",
        referer: page._frameManager._networkManager.extraHTTPHeaders().referer,
        frameId: page._frameManager._mainFrame._id
    }).then(resolve);
});
await local.identity(watcher._newDocumentNavigationPromise);
module.exports.helper.removeEventListeners(watcher._eventListeners);
clearTimeout(watcher._maximumTimer);
await local.identity(watcher._navigationRequest._response);



// screenshot - wait 2000 ms
await new Promise(function (resolve) {
    setTimeout(resolve, 2000);
});



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
        await fsWriteFile(".aa.png", Buffer.from(result.data, "base64"));
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
        await fsWriteFile(".aa.html", result);
    }())
]);



await browser.close();
}(globalThis.globalLocal));
