/* jslint utility2:true */

/* jslint ignore:start */
(function () {
"use strict";
// require builtin
const EventEmitter = require ('events');
const fs = require ('fs')
const child_process = require ('child_process')
const http = require ('http');
const https = require ('https');
const moduleCjs = require ('module')
const os = require ('os');
const path = require ('path');
const readline = require ('readline');
const url = require ('url');
function assert(value, message) {
/**
  * @param {*} value
  * @param {string=} message
  */
    if (!value)
        throw new Error(message);
}



/*
require puppeteer-to-istanbul/lib/output-files.js
*/
// output JavaScript bundled in puppeteer output to format
// that can be eaten by Istanbul.

// TODO: Put function interfaces on this file

const pathLib = path

const storagePath = './.nyc_output/js'
// mkdir -p
child_process.spawnSync("mkdir", [
        "-p", storagePath
], {
        stdio: [
                "ignore", 1, 2
        ]
});



/*
require v8-to-istanbul/lib/branch.js
*/
class CovBranch {
    constructor (startLine, startCol, endLine, endCol, count) {
        this.startLine = startLine
        this.startCol = startCol
        this.endLine = endLine
        this.endCol = endCol
        this.count = count
    }
    toIstanbul () {
        const location = {
            start: {
                line: this.startLine.line,
                column: this.startCol - this.startLine.startCol
            },
            end: {
                line: this.endLine.line,
                column: this.endCol - this.endLine.startCol
            }
        }
        return {
            type: 'branch',
            line: this.line,
            loc: location,
            locations: [Object.assign({}, location)]
        }
    }
}



/*
require v8-to-istanbul/lib/function.js
*/
class CovFunction {
    constructor (name, startLine, startCol, endLine, endCol, count) {
        this.name = name
        this.startLine = startLine
        this.startCol = startCol
        this.endLine = endLine
        this.endCol = endCol
        this.count = count
    }
    toIstanbul () {
        const loc = {
            start: {
                line: this.startLine.line,
                column: this.startCol - this.startLine.startCol
            },
            end: {
                line: this.endLine.line,
                column: this.endCol - this.endLine.startCol
            }
        }
        return {
            name: this.name,
            decl: loc,
            loc: loc,
            line: this.startLine.line
        }
    }
}



/*
require v8-to-istanbul/lib/line.js
*/
class CovLine {
    constructor (line, startCol, endCol) {
        this.line = line
        this.startCol = startCol
        this.endCol = endCol
        this.count = 0
    }
    toIstanbul () {
        return {
            start: {
                line: this.line,
                column: 0
            },
            end: {
                line: this.line,
                column: this.endCol - this.startCol
            }
        }
    }
}



/*
require v8-to-istanbul/lib/script.js
*/
// Node.js injects a header when executing a script.
const cjsHeader = moduleCjs.wrapper[0]

class CovScript {
    constructor (scriptPath) {
        assert(typeof scriptPath === 'string', 'scriptPath must be a string')
        const { path, isESM } = parsePath(scriptPath)
        const source = fs.readFileSync(path, 'utf8')
        this.path = path
        this.header = isESM ? '' : cjsHeader
        this.lines = []
        this.branches = []
        this.functions = []
        this.eof = -1
        this._buildLines(source, this.lines)
    }
    _buildLines (source, lines) {
        let position = 0
        source.split('\n').forEach((lineStr, i) => {
            this.eof = position + lineStr.length
            lines.push(new CovLine(i + 1, position, this.eof))
            position += lineStr.length + 1 // also add the \n.
        })
    }
    applyCoverage (blocks) {
        blocks.forEach(block => {
            block.ranges.forEach(range => {
                const startCol = Math.max(0, range.startOffset - this.header.length)
                const endCol = Math.min(this.eof, range.endOffset - this.header.length)
                const lines = this.lines.filter(line => {
                    return startCol <= line.endCol && endCol >= line.startCol
                })

                if (block.isBlockCoverage && lines.length) {
                    // record branches.
                    this.branches.push(new CovBranch(
                        lines[0],
                        startCol,
                        lines[lines.length - 1],
                        endCol,
                        range.count
                    ))
                } else if (block.functionName && lines.length) {
                    // record functions.
                    this.functions.push(new CovFunction(
                        block.functionName,
                        lines[0],
                        startCol,
                        lines[lines.length - 1],
                        endCol,
                        range.count
                    ))
                }

                // record the lines (we record these as statements, such that we're
                // compatible with Istanbul 2.0).
                lines.forEach(line => {
                    // make sure branch spans entire line; don't record 'goodbye'
                    // branch in `const foo = true ? 'hello' : 'goodbye'` as a
                    // 0 for line coverage.
                    if (startCol <= line.startCol && endCol >= line.endCol) {
                        line.count = range.count
                    }
                })
            })
        })
    }
    toIstanbul () {
        const istanbulInner = Object.assign(
            { path: this.path },
            this._statementsToIstanbul(),
            this._branchesToIstanbul(),
            this._functionsToIstanbul()
        )
        const istanbulOuter = {}
        istanbulOuter[this.path] = istanbulInner
        return istanbulOuter
    }
    _statementsToIstanbul () {
        const statements = {
            statementMap: {},
            s: {}
        }
        this.lines.forEach((line, index) => {
            statements.statementMap[`${index}`] = line.toIstanbul()
            statements.s[`${index}`] = line.count
        })
        return statements
    }
    _branchesToIstanbul () {
        const branches = {
            branchMap: {},
            b: {}
        }
        this.branches.forEach((branch, index) => {
            branches.branchMap[`${index}`] = branch.toIstanbul()
            branches.b[`${index}`] = [branch.count]
        })
        return branches
    }
    _functionsToIstanbul () {
        const functions = {
            fnMap: {},
            f: {}
        }
        this.functions.forEach((fn, index) => {
            functions.fnMap[`${index}`] = fn.toIstanbul()
            functions.f[`${index}`] = fn.count
        })
        return functions
    }
}

function parsePath (scriptPath) {
    return {
        path: scriptPath.replace('file://', ''),
        isESM: scriptPath.indexOf('file://') !== -1
    }
}



/*
require puppeteer-to-istanbul
*/
const puppeteer = require("./lib.puppeteer.js");



;(async function () {
const browser = await puppeteer.launch({
        args: [
                '--disable-setuid-sandbox',
                "--incognito",
                '--no-sandbox'
        ],
        dumpio: true,
        executablePath: "/root/Documents/puppeteer-to-istanbul-example/node_modules/puppeteer/.local-chromium/linux-674921/chrome-linux/chrome",
        headless: true
})
const page = await browser.newPage()

// Enable both JavaScript and CSS coverage
await Promise.all([
    page.coverage.startJSCoverage(),
    page.coverage.startCSSCoverage()
])

// Navigate to page
let url = 'file:///' + path.resolve('./index.html')
await page.goto(url)

// Disable JavaScript coverage
var covPuppeteer = await page.coverage.stopJSCoverage()

// init covPuppeteer
// output JavaScript bundled in puppeteer output to format
// that can be eaten by Istanbul.
// Clone covPuppeteer to prevent mutating the passed in data
covPuppeteer = JSON.parse(JSON.stringify(covPuppeteer));

// debug
fs.writeFileSync("tmp/aa.json", JSON.stringify(covPuppeteer, null, 4));

let iiInline = 0;
covPuppeteer.forEach(function (file) {
    // generate a new path relative to ./coverage/js.
    // this would be around where you'd use mkdirp.
    // Get the last element in the path name
    let basename = pathLib.basename(file.url)
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
    }
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
fs.writeFileSync('./.nyc_output/out.json', JSON.stringify(covIstanbul, null, 4), 'utf8')

await browser.close()
})();
}());
/* jslint ignore:end */
