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
var browser;
var browserWSEndpoint;
var child_process;
var chromeClosed;
var chromeProcess;
var fs;
var gracefullyCloseChrome;
var killChrome;
var listenersAdd;
var listenersProcess;
var listenersRemove;
var page;
var readline;
var timeout;
var waitForChromeToClose;
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
readline = require("readline");
//!! const tls = require("tls");
//!! const url = require("url");
//!! const util = require("util");
//!! const { Writable} = require("stream");
//!! const { randomBytes} = require("crypto");

module.exports = require("./.a00.js");

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
                + " The only Chrome revision guaranteed to work is 674921"
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
        return t.type() === "page";
    });
} catch (errCaught) {
    killChrome();
    console.error(errCaught);
}

page = await browser.newPage();



(async function () {
if (!local.nop()) {
    return;
}
// Enable both JavaScript and CSS coverage
await Promise.all([
    page.coverage.startJSCoverage(),
    page.coverage.startCSSCoverage()
]);
}());

await page.goto("https://www.example.com");
await page.screenshot({
    path: "tmp/aa.png"
});
fs.writeFileSync("tmp/aa.html", await page.content());



(async function () {
if (!local.nop()) {
    return;
}
var basename;
var covPuppeteer;
var iiInline;
// Disable JavaScript coverage
covPuppeteer = await page.coverage.stopJSCoverage();
// init covPuppeteer
// output JavaScript bundled in puppeteer output to format
// that can be eaten by Istanbul.
// Clone covPuppeteer to prevent mutating the passed in data
covPuppeteer = JSON.parse(JSON.stringify(covPuppeteer));
// debug
fs.writeFileSync("tmp/aa.json", JSON.stringify(covPuppeteer, null, 4));
iiInline = 0;
covPuppeteer.forEach(function (file) {
    // generate a new path relative to ./coverage/js.
    // this would be around where you'd use mkdirp.
    // Get the last element in the path name
    basename = pathLib.basename(file.url);
    // Special case: when html present, strip and return specialized string
    if (basename.includes('.html')) {
        basename = pathLib.resolve(storagePath, basename) + 'puppeteerTemp-inline'
    } else {
        basename = basename.split('.js')[0]
        basename = pathLib.resolve(storagePath, basename)
    }
    if (fs.existsSync(basename + '.js')) {
        iiInline += 1;
        file.url = basename + "-" + iiInline + ".js";
    } else {
        file.url = basename + ".js";
    }
    fs.writeFileSync(file.url, file.text);
});
// init cov8
// Iterate through coverage info and create IDs
let id = 0
var covV8;
covV8 = covPuppeteer.map(function (file) {
    return {
        scriptId: id++,
        url: 'file://' + file.url,
        functions: [{
            ranges: file.ranges.map(function (range) {
                // Takes in a Puppeteer range object with start and end properties and
                // converts it to a V8 range with startOffset, endOffset, and count properties
                return {
                    startOffset: range.start,
                    endOffset: range.end,
                    count: 1
                }
            }),
            isBlockCoverage: true
        }]
    };
});
// init covIstanbul
var covIstanbul = {};
covV8.forEach(function (jsFile) {
    const script = new CovScript(jsFile.url)
    script.applyCoverage(jsFile.functions)
    let istanbulCoverage = script.toIstanbul()
    var key = Object.keys(istanbulCoverage)[0];
    covIstanbul[key] = istanbulCoverage[key];
})
fs.writeFileSync('./.nyc_output/out.json', JSON.stringify(covIstanbul, null, 4), 'utf8');
}());


await browser.close();
}(globalThis.globalLocal));
