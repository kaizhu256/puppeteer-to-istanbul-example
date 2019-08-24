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
//!! // hack-puppeteer - module.exports
//!! const EventEmitter = require("events");
//!! const URL = require("url");
local.child_process = require("child_process");
//!! const crypto = require("crypto");
local.fs = require("fs");
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

var browser;
var chromeClosed;
var chromeProcess;
var waitForChromeToClose;
local.gracefullyCloseChrome = function () {
/**
  * @return {Promise}
  */
    process.removeListener("exit", local.killChrome);
    process.removeListener("SIGINT", local.killChrome130);
    process.removeListener("SIGTERM", local.gracefullyCloseChrome);
    process.removeListener("SIGHUP", local.gracefullyCloseChrome);
    // Attempt to close chrome gracefully
    connection.send("Browser.close").catch(function (err) {
        console.error(err);
        local.killChrome();
    });
    return waitForChromeToClose;
};

local.killChrome = function () {
/*
 * This method has to be sync to be used as 'exit' event handler.
 */
    process.removeListener("exit", local.killChrome);
    process.removeListener("SIGINT", local.killChrome130);
    process.removeListener("SIGTERM", local.gracefullyCloseChrome);
    process.removeListener("SIGHUP", local.gracefullyCloseChrome);
    if (chromeProcess.pid && !chromeProcess.killed && !chromeClosed) {
        // Force kill chrome.
        try {
            if (process.platform === "win32") {
                local.child_process.execSync(
                    `taskkill /pid ${chromeProcess.pid} /T /F`
                );
            } else {
                process.kill(-chromeProcess.pid, "SIGKILL");
            }
        // the process might have already stopped
        } catch (ignore) {}
    }
};

local.killChrome130 = function () {
    local.killChrome();
    process.exit(130);
};

chromeProcess = local.child_process.spawn((
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

process.addListener("exit", local.killChrome);
process.addListener("SIGINT", local.killChrome130);
process.addListener("SIGTERM", local.gracefullyCloseChrome);
process.addListener("SIGHUP", local.gracefullyCloseChrome);
/** @type {?Connection} */
let connection = null;
try {
    const browserWSEndpoint = await module.exports.waitForWSEndpoint(
        chromeProcess,
        30000,
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
        local.gracefullyCloseChrome
    );
    await browser.waitForTarget(function (t) {
        return t.type() === "page";
    });
} catch (errCaught) {
    local.killChrome();
    console.error(errCaught);
}

var page = await browser.newPage();
await page.goto("https://www.example.com");
await page.screenshot({
    path: "tmp/aa.png"
});
local.fs.writeFileSync("tmp/aa.html", await page.content());
await browser.close();
}(globalThis.globalLocal));
