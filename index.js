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
    local.fsRmrfSync = function (dir) {
    /*
     * this function will sync "rm -rf" <dir>
     */
        var child_process;
        try {
            child_process = require("child_process");
        } catch (ignore) {
            return;
        }
        child_process.spawnSync("rm", [
            "-rf", dir
        ], {
            stdio: [
                "ignore", 1, 2
            ]
        });
    };
    local.fsWriteFileWithMkdirpSync = function (file, data) {
    /*
     * this function will sync write <data> to <file> with "mkdir -p"
     */
        var fs;
        try {
            fs = require("fs");
        } catch (ignore) {
            return;
        }
        // try to write file
        try {
            fs.writeFileSync(file, data);
        } catch (ignore) {
            // mkdir -p
            require("child_process").spawnSync(
                "mkdir",
                [
                    "-p", require("path").dirname(file)
                ],
                {
                    stdio: [
                        "ignore", 1, 2
                    ]
                }
            );
            // rewrite file
            fs.writeFileSync(file, data);
        }
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
}((typeof globalThis === "object" && globalThis) || (function () {
    return Function("return this")(); // jslint ignore:line
}())));



(async function (local) {
"use strict";
// init let
let browser;
let covV8;
let page;
let puppeteer;
let timeElapsed;
// init const
const debugTimeElapsed = function (msg) {
    timeElapsed = timeElapsed || Date.now();
    timeElapsed = String(Date.now() - timeElapsed).padStart(6, " ");
    console.error(`timeElapsed - ${timeElapsed} ms - ${msg}`);
    timeElapsed = Date.now();
};
const fs = local.fs;
const fsRmrfSync = local.fsRmrfSync;
const fsWriteFileWithMkdirpSync = local.fsWriteFileWithMkdirpSync;
const path = local.path;
// artifact - reset
fsRmrfSync("coverage");
fsRmrfSync(".nyc_output");
debugTimeElapsed("init");
process.on("exit", function (exitCode) {
    debugTimeElapsed(`process.exit(${exitCode})`);
});

/*
require puppeteer-to-istanbul/lib/output-files.js
*/
// output JavaScript bundled in puppeteer output to format
// that can be eaten by Istanbul.

/*
require puppeteer-to-istanbul
*/
puppeteer = require("puppeteer");



browser = await puppeteer.launch({
    args: [
        // "--no-sandbox", "--disable-setuid-sandbox"
        "--disable-setuid-sandbox",
        "--headless",
        "--hide-scrollbars",
        "--incognito",
        "--mute-audio",
        "--no-sandbox",
        "--remote-debugging-port=0"
    ],
    dumpio: true,
    executablePath: (
        "node_modules/puppeteer/.local-chromium"
        + "/linux-674921/chrome-linux/chrome"
    ),
    headless: true
});
page = await browser.newPage();

// browser - coverage-enable
await Promise.all([
    page.coverage.startJSCoverage(),
    page.coverage.startCSSCoverage()
]);
await page.goto("file:///" + path.resolve("./index.html"));
//!! // browser - test undefined url
//!! try {
    //!! await page.goto("https://undefined");
//!! } catch (ignore) {}
//!! // browser - test redirect
//!! await page.goto("https://www.example.com");
//!! await page.goto("https://m.youtube.com");
// browser - wait 2000 ms
await new Promise(function (resolve) {
    setTimeout(resolve, 5000);
});
// browser - screenshot png
await page.screenshot({
    path: "tmp/aa.png"
});
// browser - screenshot html
fs.writeFileSync("tmp/aa.html", await page.content());
// browser - coverage-disable
covV8 = await page.coverage.stopJSCoverage();
page.coverage.stopCSSCoverage();
// browser - close
browser.close();
debugTimeElapsed("browser");



String.prototype.trimEnd = (
    String.prototype.trimEnd || String.prototype.trimRight
);
function OutputFiles() {
    this.iterator = 0;
    this._parseAndIsolate();
}
OutputFiles.prototype.rewritePath = function (pathname) {
    // generate a new path relative to ./coverage/js.
    // this would be around where you'd use mkdirp.
    var str = ``;
    // Get the last element in the path name
    var truncatedPath = path.basename(pathname);

    // Special case: when html present, strip and return specialized string
    if (truncatedPath.includes(".html")) {
        truncatedPath = path.resolve(
            "./.nyc_output/js",
            truncatedPath
        ) + "puppeteerTemp-inline";
    } else {
        truncatedPath = truncatedPath.split(".js")[0];
        truncatedPath = path.resolve("./.nyc_output/js", truncatedPath);
    }
    if (fs.existsSync(truncatedPath + ".js")) {
        this.iterator += 1;
        str = `${truncatedPath}-${this.iterator}.js`;
        return str;
    } else {
        str = `${truncatedPath}.js`;
        return str;
    }
};
OutputFiles.prototype._parseAndIsolate = function () {
    var that = this;
    covV8.forEach(function (file) {
        file.url = that.rewritePath(file.url);
        fsWriteFileWithMkdirpSync(file.url, file.text);
    });
};
function PuppeteerToV8() {
    return;
}
PuppeteerToV8.prototype.convertCoverage = function () {
    // Iterate through coverage info and create IDs
    return covV8.map(function (coverageItem, ii) {
        return {
            scriptId: ii,
            url: "file://" + coverageItem.url,
            functions: [
                {
// Takes in a Puppeteer range object with start and end properties and
// converts it to a V8 range with startOffset, endOffset, and count properties
                    ranges: coverageItem.ranges.map(function (range) {
                        return {
                            startOffset: range.start,
                            endOffset: range.end,
                            count: 1
                        };
                    }),
                    isBlockCoverage: true
                }
            ]
        };
    });
};



// var pti = new PuppeteerToIstanbul(covV8);
var v8toIstanbul = require("v8-to-istanbul");
var puppeteerToV8Info = new PuppeteerToV8(
    new OutputFiles(covV8).covV8
).convertCoverage();
// pti.writeIstanbulFormat();
var fullJson = {};
var promiseList = puppeteerToV8Info.map(function (jsFile) {
    return v8toIstanbul(jsFile.url);
});
await Promise.all(promiseList.map(function (elem) {
    return elem.load();
}));
promiseList.forEach(function (script, ii) {
    script.applyCoverage(puppeteerToV8Info[ii].functions);
    let istanbulCoverage = script.toIstanbul();
    let keys = Object.keys(istanbulCoverage);
    fullJson[keys[0]] = istanbulCoverage[keys[0]];
});
fsWriteFileWithMkdirpSync(
    "./.nyc_output/out.json",
    JSON.stringify(fullJson, null, 4)
);
// debug
fs.writeFileSync("tmp/aa.json", JSON.stringify({
    covV8,
    puppeteerToV8Info,
    fullJson
}, null, 4));
debugTimeElapsed("v8-to-istanbul");



// nyc - coverage-report
process.argv = [
    "/usr/bin/node",
    "/root/Documents/puppeteer-to-istanbul-example/node_modules/.bin/nyc",
    "report",
    "--reporter=html"
];
require("./node_modules/nyc/bin/nyc.js");
debugTimeElapsed("nyc");



// process.exit()
debugTimeElapsed("process.exit()");
process.exit();
}(globalThis.globalLocal));
