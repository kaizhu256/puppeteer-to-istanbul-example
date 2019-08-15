// require builtin
const assert = require('assert')
const child_process = require('child_process')
const fs = require('fs')
const moduleCjs = require('module')
const path = require('path')
const clone = function (obj) {
    return JSON.parse(JSON.stringify(obj));
};
const mkdirp = {
    sync: function (dir) {
        // mkdir -p
        child_process.spawnSync(
            "mkdir",
            [
                "-p", dir
            ],
            {
                stdio: [
                    "ignore", 1, 2
                ]
            }
        );
    }
};



/*
require puppeteer-to-istanbul/lib/output-files.js
*/
// output JavaScript bundled in puppeteer output to format
// that can be eaten by Istanbul.

// TODO: Put function interfaces on this file

const pathLib = path

const storagePath = './.nyc_output/js'

class OutputFiles0 {
  constructor (coverageInfo) {
    // Clone coverageInfo to prevent mutating the passed in data
    this.coverageInfo = clone(coverageInfo)
    this.iterator = 0
    this._parseAndIsolate()
  }

  rewritePath (path) {
    // generate a new path relative to ./coverage/js.
    // this would be around where you'd use mkdirp.

    var str = ``

    // Get the last element in the path name
    var truncatedPath = pathLib.basename(path)

    // Special case: when html present, strip and return specialized string
    if (truncatedPath.includes('.html')) {
      truncatedPath = pathLib.resolve(storagePath, truncatedPath) + 'puppeteerTemp-inline'
    } else {
      truncatedPath = truncatedPath.split('.js')[0]
      truncatedPath = pathLib.resolve(storagePath, truncatedPath)
    }
    mkdirp.sync(storagePath)
    if (fs.existsSync(truncatedPath + '.js')) {
      this.iterator++
      str = `${truncatedPath}-${this.iterator}.js`
      return str
    } else {
      str = `${truncatedPath}.js`
      return str
    }
  }

  _parseAndIsolate () {
    for (var i = 0; i < this.coverageInfo.length; i++) {
      var path = this.rewritePath(this.coverageInfo[i].url)
      this.coverageInfo[i].url = path
      fs.writeFileSync(path, this.coverageInfo[i].text)
    }
  }

  getTransformedCoverage () {
    return this.coverageInfo
  }
}

const OutputFiles = function (coverageInfo) {
  return new OutputFiles0(coverageInfo)
}



/*
require puppeteer-to-istanbul/lib/puppeteer-to-v8.js
*/
class PuppeteerToV80 {
  constructor (coverageInfo) {
    this.coverageInfo = coverageInfo
  }

  convertCoverage () {
    // Iterate through coverage info and create IDs
    let id = 0

    return this.coverageInfo.map(coverageItem => {
      return {
        scriptId: id++,
        url: 'file://' + coverageItem.url,
        functions: [{
          ranges: coverageItem.ranges.map(this.convertRange),
          isBlockCoverage: true
        }]
      }
    })
  }

  // Takes in a Puppeteer range object with start and end properties and
  // converts it to a V8 range with startOffset, endOffset, and count properties
  convertRange (range) {
    return {
      startOffset: range.start,
      endOffset: range.end,
      count: 1
    }
  }
}

const PuppeteerToV8 = (coverageInfo) => new PuppeteerToV80(coverageInfo)



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
require v8-to-istanbul/index.js
*/
const v8toIstanbul = function (path) {
  return new CovScript(path)
}


/*
require puppeteer-to-istanbul/lib/puppeteer-to-istanbul.js
*/
class PuppeteerToIstanbul0 {
  constructor (coverageInfo) {
    this.coverageInfo = coverageInfo
    this.puppeteerToConverter = OutputFiles(coverageInfo).getTransformedCoverage()
    this.puppeteerToV8Info = PuppeteerToV8(this.puppeteerToConverter).convertCoverage()
  }

  setCoverageInfo (coverageInfo) {
    this.coverageInfo = coverageInfo
  }

  writeIstanbulFormat () {
    var fullJson = {}

    this.puppeteerToV8Info.forEach(jsFile => {
      const script = v8toIstanbul(jsFile.url)
      script.applyCoverage(jsFile.functions)

      let istanbulCoverage = script.toIstanbul()
      let keys = Object.keys(istanbulCoverage)

      fullJson[keys[0]] = istanbulCoverage[keys[0]]
    })

    fs.writeFileSync('./.nyc_output/out.json', JSON.stringify(fullJson), 'utf8')
  }
}

const PuppeteerToIstanbul = function (coverageInfo) {
  return new PuppeteerToIstanbul0(coverageInfo)
}



/*
require puppeteer
*/
/**
 * Copyright 2017 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

let asyncawait = true;
try {
  new Function('async function test(){await 1}');
} catch (error) {
  asyncawait = false;
}

const {helper} = require('puppeteer/lib/helper');
const api = require('puppeteer/lib/api');
for (const className in api) {
  // Puppeteer-web excludes certain classes from bundle, e.g. BrowserFetcher.
  if (typeof api[className] === 'function')
    helper.installAsyncStackHooks(api[className]);
}

// If node does not support async await, use the compiled version.
const Puppeteer = require('puppeteer/lib/Puppeteer');
const packageJson = require('puppeteer/package.json');
const preferredRevision = packageJson.puppeteer.chromium_revision;
const isPuppeteerCore = packageJson.name === 'puppeteer-core';

const puppeteer = new Puppeteer(__dirname, preferredRevision, isPuppeteerCore);



/*
require puppeteer-to-istanbul
*/
const pti = {
  write: (puppeteerFormat) => {
    const pti = PuppeteerToIstanbul(puppeteerFormat)
    pti.writeIstanbulFormat()
  }
};

;(async () => {
  const browser = await puppeteer.launch({
      headless: true,
      executablePath: "/root/Documents/puppeteer-to-istanbul-example/node_modules/puppeteer/.local-chromium/linux-674921/chrome-linux/chrome",
      args: ['--no-sandbox', '--disable-setuid-sandbox']
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
  const jsCoverage = await page.coverage.stopJSCoverage()
  pti.write(jsCoverage)
  await browser.close()
})()
