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



(async function () {
"use strict";
var addListener;
var browser;
var browserWSEndpoint;
var child_process;
var chromeClosed;
var chromeProcess;
var fs;
var gracefullyCloseChrome;
var killChrome130;
var killChrome;
var timeout;
var waitForChromeToClose;
var waitForWSEndpoint;
//!! // hack-puppeteer - module.exports
//!! const EventEmitter = require("events");
//!! const URL = require("url");
child_process = require("child_process");
//!! const crypto = require("crypto");
fs = require("fs");
//!! const http = require("http");
//!! const https = require("https");
//!! const net = require("net");
//!! const os = require("os");
//!! const path = require("path");
//!! const readline = require("readline");
//!! const tls = require("tls");
//!! const url = require("url");
//!! const util = require("util");
//!! const { Writable} = require("stream");
//!! const { randomBytes} = require("crypto");

module.exports = require("./.a00.js");

addListener = function (target, type, listener) {
    target.on(type, listener);
    return function () {
        target.removeLister(type, listener);
    };
};

gracefullyCloseChrome = function () {
/**
  * @return {Promise}
  */
    process.removeListener("exit", killChrome);
    process.removeListener("SIGINT", killChrome130);
    process.removeListener("SIGTERM", gracefullyCloseChrome);
    process.removeListener("SIGHUP", gracefullyCloseChrome);
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
    process.removeListener("exit", killChrome);
    process.removeListener("SIGINT", killChrome130);
    process.removeListener("SIGTERM", gracefullyCloseChrome);
    process.removeListener("SIGHUP", gracefullyCloseChrome);
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

killChrome130 = function () {
    killChrome();
    process.exit(130);
};

/**
  * @param {!Puppeteer.ChildProcess} chromeProcess
  * @param {number} timeout
  * @return {!Promise<string>}
  */
waitForWSEndpoint = function (chromeProcess) {
    return new Promise(function (resolve, reject) {
        const rl = readline.createInterface({
            input: chromeProcess.stderr
        });
        let stderr = "";
        const listeners = [
            helper.addEventListener(rl, "line", onLine),
            helper.addEventListener(rl, "close", onClose),
            helper.addEventListener(chromeProcess, "exit", onClose),
            helper.addEventListener(chromeProcess, "error", onClose)
        ];
        const timeoutId = setTimeout(onTimeout, timeout);

        /**
          * @param {!Error=} error
          */
        function onClose(error) {
            cleanup();
            reject(new Error(
                "Failed to launch chrome!" + error.message + "\n"
                + stderr + "\n\n"
                + "TROUBLESHOOTING: https://github.com/GoogleChrome/puppeteer"
                + "/blob/master/docs/troubleshooting.md\n\n"
            ));
        }

        function onTimeout() {
            cleanup();
            reject(new Error(
                `Timed out after ${timeout} ms while trying to connect to Chrome! The only Chrome revision guaranteed to work is 674921}` // jslint ignore:line
            ));
        }

        /**
          * @param {string} line
          */
        function onLine(line) {
            stderr += line + "\n";
            const match = line.match(
                /^DevTools\u0020listening\u0020on\u0020(ws:\/\/.*)$/
            );
            if (!match) {
                return;
            }
    cleanup();
            resolve(match[1]);
        }

        function cleanup() {
            if (timeoutId) {
                clearTimeout(timeoutId);
            }
            helper.removeEventListeners(listeners);
        }
    });
}

// init
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

process.addListener("exit", killChrome);
process.addListener("SIGINT", killChrome130);
process.addListener("SIGTERM", gracefullyCloseChrome);
process.addListener("SIGHUP", gracefullyCloseChrome);
/** @type {?Connection} */
let connection = null;
try {
    browserWSEndpoint = await module.exports.waitForWSEndpoint(
        chromeProcess,
        674921
    );
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
        return t.type() === "page";
    });
} catch (errCaught) {
    killChrome();
    console.error(errCaught);
}

var page = await browser.newPage();
await page.goto("https://www.example.com");
await page.screenshot({
    path: "tmp/aa.png"
});
fs.writeFileSync("tmp/aa.html", await page.content());
await browser.close();
}(globalThis.globalLocal));
