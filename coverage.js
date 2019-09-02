/* jslint utility2:true */
(function (globalThis) {
    "use strict";
    let consoleError;
    let local;
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
            let argList;
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
        let err;
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
        let child_process;
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
        let fs;
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
let covFileDict;
let covIstanbul;
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
const url = local.url;
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
puppeteer = require("./lib.puppeteer.js");



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
// browser - test undefined url
try {
    await page.goto("https://undefined");
} catch (ignore) {}
// browser - test redirect
await page.goto("https://www.example.com");
await page.goto("https://m.youtube.com");
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
await page.coverage.stopCSSCoverage();
// browser - close
browser.close();
debugTimeElapsed("browser");



// init covFileDict
// https://github.com/istanbuljs/puppeteer-to-istanbul/blob/v1.2.2/lib/output-files.js
covV8.forEach(function (file, file0) {
    // rewritePath
    // generate a new path relative to ./coverage/js.
    // this would be around where you'd use mkdirp.
    // https://github.com/istanbuljs/puppeteer-to-istanbul/blob/v1.2.2/lib/output-files.js
    file.url = ".nyc_output/js" + path.resolve(
        "/",
        new url.URL(file.url).pathname.slice(1) || "index.html"
    );
    // Special case: when html present, strip and return specialized string
    if (file.url.slice(-3) !== ".js") {
        return;
    }
    // convertCoverage
    // Iterate through coverage info and create IDs
    // https://github.com/istanbuljs/puppeteer-to-istanbul/blob/v1.2.2/lib/puppeteer-to-v8.js
    file.blockList = [
        {
            // convertRange
            // Takes in a Puppeteer range object with start and end properties
            // and converts it to a V8 range with startOffset, endOffset,
            // and count properties
            ranges: file.ranges.map(function (range) {
                return {
                    startOffset: range.start,
                    endOffset: range.end,
                    count: 1
                };
            }),
            isBlockCoverage: true
        }
    ];
    // merge file into file0
    covFileDict = covFileDict || {};
    file0 = covFileDict[file.url];
    if (!file0) {
        covFileDict[file.url] = file;
        return;
    }
    file0.blockList.push(file.blockList[0]);
});
// init covIstanbul
covIstanbul = {};
Object.values(covFileDict).forEach(function (file) {
    // V8ToIStanbul
    let b;
    let branchMap;
    let f;
    let fnMap;
    let s;
    let startCol;
    let statementMap;
    file.statementList = [];
    file.branchList = [];
    file.fnList = [];
    file.eof = -1;
    startCol = 0;
    file.text.split("\n").forEach(function (lineStr, i) {
        file.eof = startCol + lineStr.length;
        file.statementList.push({
            line: i + 1,
            startCol,
            endCol: file.eof,
            count: 0
        });
        startCol += lineStr.length + 1; // also add the \n.
    });
    // applyCoverage
    // https://github.com/istanbuljs/v8-to-istanbul/blob/v3.2.3/lib/v8-to-istanbul.js
    file.blockList.forEach(function (block) {
        block.ranges.forEach(function (range, startCol, endCol, lines) {
            local.assertThrow(!block.functionName, block.functionName);
            // _maybeRemapStartColEndCol
            // https://github.com/istanbuljs/v8-to-istanbul/blob/v3.2.3/lib/v8-to-istanbul.js
            startCol = Math.max(0, range.startOffset);
            endCol = Math.min(file.eof, range.endOffset);
            // applyCoverage
            // https://github.com/istanbuljs/v8-to-istanbul/blob/v3.2.3/lib/v8-to-istanbul.js
            lines = file.statementList.filter(function (line) {
                return startCol <= line.endCol && endCol >= line.startCol;
            });
            if (block.isBlockCoverage && lines.length) {
                // record branches.
                file.branchList.push({
                    startLine: lines[0],
                    startCol,
                    endLine: lines[lines.length - 1],
                    endCol,
                    count: range.count
                });
            } else if (block.functionName && lines.length) {
                // record functions.
                file.fnList.push({
                    name: block.functionName,
                    startLine: lines[0],
                    startCol,
                    endLine: lines[lines.length - 1],
                    endCol,
                    count: range.count
                });
            }
            // record the lines (we record these as statements, such that we're
            // compatible with Istanbul 2.0).
            lines.forEach(function (line) {
                // make sure branch spans entire line; don't record 'goodbye'
                // branch in `const foo = true ? 'hello' : 'goodbye'` as a
                // 0 for line coverage.
                //
                // All lines start out with coverage of 1, and are later set
                // to 0 if they are not invoked; line.ignore prevents a line
                // from being set to 0, and is set if the special comment
                // /* c8 ignore next */ is used.
                if (
                    startCol <= line.startCol
                    && endCol >= line.endCol
                    && !line.ignore
                ) {
                    line.count = range.count;
                }
            });
        });
    });
    // toIstanbul
    // https://github.com/istanbuljs/v8-to-istanbul/blob/v3.2.3/lib/v8-to-istanbul.js
    b = {};
    branchMap = {};
    f = {};
    fnMap = {};
    s = {};
    statementMap = {};
    // toIstanbul
    // https://github.com/istanbuljs/v8-to-istanbul/blob/v3.2.3/lib/line.js
    file.statementList.forEach(function (line, index) {
        statementMap[`${index}`] = {
            start: {
                line: line.line,
                column: 0
            },
            end: {
                line: line.line,
                column: line.endCol - line.startCol
            }
        };
        s[`${index}`] = line.count;
    });
    // toIstanbul
    // https://github.com/istanbuljs/v8-to-istanbul/blob/v3.2.3/lib/branch.js
    file.branchList.forEach(function (branch, index) {
        const location = {
            start: {
                line: branch.startLine.line,
                column: branch.startCol - branch.startLine.startCol
            },
            end: {
                line: branch.endLine.line,
                column: branch.endCol - branch.endLine.startCol
            }
        };
        branchMap[`${index}`] = {
            type: "branch",
            line: branch.line,
            loc: location,
            locations: [
                Object.assign({}, location)
            ]
        };
        b[`${index}`] = [
            branch.count
        ];
    });
    // toIstanbul
    // https://github.com/istanbuljs/v8-to-istanbul/blob/v3.2.3/lib/function.js
    file.fnList.forEach(function (fn, index) {
        const loc = {
            start: {
                line: fn.startLine.line,
                column: fn.startCol - fn.startLine.startCol
            },
            end: {
                line: fn.endLine.line,
                column: fn.endCol - fn.endLine.startCol
            }
        };
        fnMap[`${index}`] = {
            name: fn.name,
            decl: loc,
            loc,
            line: fn.startLine.line
        };
        f[`${index}`] = fn.count;
    });
    // toIstanbul
    // https://github.com/istanbuljs/v8-to-istanbul/blob/v3.2.3/lib/v8-to-istanbul.js
    covIstanbul[file.url] = {
        b,
        branchMap,
        f,
        fnMap,
        path: file.url,
        s,
        statementMap
    };
    fsWriteFileWithMkdirpSync(file.url, file.text);
});
fsWriteFileWithMkdirpSync(
    ".nyc_output/out.json",
    JSON.stringify(covIstanbul, null, 4)
);
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
