// require builtin
const fs = require('fs')
const child_process = require('child_process')
const http = require('http');
const https = require('https');
const moduleCjs = require('module')
const os = require('os');
const path = require('path');
const readline = require('readline');
const url = require('url');
function assert(value, message) {
/**
 * @param {*} value
 * @param {string=} message
 */
  if (!value)
    throw new Error(message);
}
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
require puppeteer/lib/api.js
*/
/**
 * Copyright 2019 Google Inc. All rights reserved.
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

const api = {
  Accessibility: require('puppeteer/lib/Accessibility').Accessibility,
  Browser: require('puppeteer/lib/Browser').Browser,
  BrowserContext: require('puppeteer/lib/Browser').BrowserContext,
  CDPSession: require('puppeteer/lib/Connection').CDPSession,
  ConsoleMessage: require('puppeteer/lib/Page').ConsoleMessage,
  Coverage: require('puppeteer/lib/Coverage').Coverage,
  Dialog: require('puppeteer/lib/Dialog').Dialog,
  ElementHandle: require('puppeteer/lib/JSHandle').ElementHandle,
  ExecutionContext: require('puppeteer/lib/ExecutionContext').ExecutionContext,
  FileChooser: require('puppeteer/lib/Page').FileChooser,
  Frame: require('puppeteer/lib/FrameManager').Frame,
  JSHandle: require('puppeteer/lib/JSHandle').JSHandle,
  Keyboard: require('puppeteer/lib/Input').Keyboard,
  Mouse: require('puppeteer/lib/Input').Mouse,
  Page: require('puppeteer/lib/Page').Page,
  Puppeteer: require('puppeteer/lib/Puppeteer'),
  Request: require('puppeteer/lib/NetworkManager').Request,
  Response: require('puppeteer/lib/NetworkManager').Response,
  SecurityDetails: require('puppeteer/lib/NetworkManager').SecurityDetails,
  Target: require('puppeteer/lib/Target').Target,
  Touchscreen: require('puppeteer/lib/Input').Touchscreen,
  Tracing: require('puppeteer/lib/Tracing'),
  Worker: require('puppeteer/lib/Worker').Worker,
};



/*
require puppeteer/lib/helper.js
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
class Helper {
  /**
   * @param {Function|string} fun
   * @param {!Array<*>} args
   * @return {string}
   */
  static evaluationString(fun, ...args) {
    if (Helper.isString(fun)) {
      assert(args.length === 0, 'Cannot evaluate a string with arguments');
      return /** @type {string} */ (fun);
    }
    return `(${fun})(${args.map(serializeArgument).join(',')})`;

    /**
     * @param {*} arg
     * @return {string}
     */
    function serializeArgument(arg) {
      if (Object.is(arg, undefined))
        return 'undefined';
      return JSON.stringify(arg);
    }
  }

  /**
   * @param {!Protocol.Runtime.ExceptionDetails} exceptionDetails
   * @return {string}
   */
  static getExceptionMessage(exceptionDetails) {
    if (exceptionDetails.exception)
      return exceptionDetails.exception.description || exceptionDetails.exception.value;
    let message = exceptionDetails.text;
    if (exceptionDetails.stackTrace) {
      for (const callframe of exceptionDetails.stackTrace.callFrames) {
        const location = callframe.url + ':' + callframe.lineNumber + ':' + callframe.columnNumber;
        const functionName = callframe.functionName || '<anonymous>';
        message += `\n    at ${functionName} (${location})`;
      }
    }
    return message;
  }

  /**
   * @param {!Protocol.Runtime.RemoteObject} remoteObject
   * @return {*}
   */
  static valueFromRemoteObject(remoteObject) {
    assert(!remoteObject.objectId, 'Cannot extract value when objectId is given');
    if (remoteObject.unserializableValue) {
      if (remoteObject.type === 'bigint' && typeof BigInt !== 'undefined')
        return BigInt(remoteObject.unserializableValue.replace('n', ''));
      switch (remoteObject.unserializableValue) {
        case '-0':
          return -0;
        case 'NaN':
          return NaN;
        case 'Infinity':
          return Infinity;
        case '-Infinity':
          return -Infinity;
        default:
          throw new Error('Unsupported unserializable value: ' + remoteObject.unserializableValue);
      }
    }
    return remoteObject.value;
  }

  /**
   * @param {!Puppeteer.CDPSession} client
   * @param {!Protocol.Runtime.RemoteObject} remoteObject
   */
  static async releaseObject(client, remoteObject) {
    if (!remoteObject.objectId)
      return;
    await client.send('Runtime.releaseObject', {objectId: remoteObject.objectId}).catch(error => {
      // Exceptions might happen in case of a page been navigated or closed.
      // Swallow these since they are harmless and we don't leak anything in this case.
      // debugError(error);
      return;
    });
  }

  /**
   * @param {!Object} classType
   */
  static installAsyncStackHooks(classType) {
    for (const methodName of Reflect.ownKeys(classType.prototype)) {
      const method = Reflect.get(classType.prototype, methodName);
      if (methodName === 'constructor' || typeof methodName !== 'string' || methodName.startsWith('_') || typeof method !== 'function' || method.constructor.name !== 'AsyncFunction')
        continue;
      Reflect.set(classType.prototype, methodName, function(...args) {
        const syncStack = {};
        Error.captureStackTrace(syncStack);
        return method.call(this, ...args).catch(e => {
          const stack = syncStack.stack.substring(syncStack.stack.indexOf('\n') + 1);
          const clientStack = stack.substring(stack.indexOf('\n'));
          if (e instanceof Error && e.stack && !e.stack.includes(clientStack))
            e.stack += '\n  -- ASYNC --\n' + stack;
          throw e;
        });
      });
    }
  }

  /**
   * @param {!NodeJS.EventEmitter} emitter
   * @param {(string|symbol)} eventName
   * @param {function(?):void} handler
   * @return {{emitter: !NodeJS.EventEmitter, eventName: (string|symbol), handler: function(?)}}
   */
  static addEventListener(emitter, eventName, handler) {
    emitter.on(eventName, handler);
    return { emitter, eventName, handler };
  }

  /**
   * @param {!Array<{emitter: !NodeJS.EventEmitter, eventName: (string|symbol), handler: function(?):void}>} listeners
   */
  static removeEventListeners(listeners) {
    for (const listener of listeners)
      listener.emitter.removeListener(listener.eventName, listener.handler);
    listeners.splice(0, listeners.length);
  }

  /**
   * @param {!Object} obj
   * @return {boolean}
   */
  static isString(obj) {
    return typeof obj === 'string' || obj instanceof String;
  }

  /**
   * @param {!Object} obj
   * @return {boolean}
   */
  static isNumber(obj) {
    return typeof obj === 'number' || obj instanceof Number;
  }

  static promisify(nodeFunction) {
    function promisified(...args) {
      return new Promise((resolve, reject) => {
        function callback(err, ...result) {
          if (err)
            return reject(err);
          if (result.length === 1)
            return resolve(result[0]);
          return resolve(result);
        }
        nodeFunction.call(null, ...args, callback);
      });
    }
    return promisified;
  }

  /**
   * @param {!NodeJS.EventEmitter} emitter
   * @param {(string|symbol)} eventName
   * @param {function} predicate
   * @return {!Promise}
   */
  static waitForEvent(emitter, eventName, predicate, timeout) {
    let eventTimeout, resolveCallback, rejectCallback;
    const promise = new Promise((resolve, reject) => {
      resolveCallback = resolve;
      rejectCallback = reject;
    });
    const listener = Helper.addEventListener(emitter, eventName, event => {
      if (!predicate(event))
        return;
      cleanup();
      resolveCallback(event);
    });
    if (timeout) {
      eventTimeout = setTimeout(() => {
        cleanup();
        rejectCallback(new Error('Timeout exceeded while waiting for event'));
      }, timeout);
    }
    function cleanup() {
      Helper.removeEventListeners([listener]);
      clearTimeout(eventTimeout);
    }
    return promise;
  }

  /**
   * @template T
   * @param {!Promise<T>} promise
   * @param {string} taskName
   * @param {number} timeout
   * @return {!Promise<T>}
   */
  static async waitWithTimeout(promise, taskName, timeout) {
    let reject;
    const timeoutError = new Error(`waiting for ${taskName} failed: timeout ${timeout}ms exceeded`);
    const timeoutPromise = new Promise((resolve, x) => reject = x);
    let timeoutTimer = null;
    if (timeout)
      timeoutTimer = setTimeout(() => reject(timeoutError), timeout);
    try {
      return await Promise.race([promise, timeoutPromise]);
    } finally {
      if (timeoutTimer)
        clearTimeout(timeoutTimer);
    }
  }

  /**
   * @param {!Puppeteer.CDPSession} client
   * @param {string} handle
   * @param {?string} path
   * @return {!Promise<!Buffer>}
   */
  static async readProtocolStream(client, handle, path) {
    let eof = false;
    let file;
    if (path)
      file = await openAsync(path, 'w');
    const bufs = [];
    while (!eof) {
      const response = await client.send('IO.read', {handle});
      eof = response.eof;
      const buf = Buffer.from(response.data, response.base64Encoded ? 'base64' : undefined);
      bufs.push(buf);
      if (path)
        await writeAsync(file, buf);
    }
    if (path)
      await closeAsync(file);
    await client.send('IO.close', {handle});
    let resultBuffer = null;
    try {
      resultBuffer = Buffer.concat(bufs);
    } finally {
      return resultBuffer;
    }
  }
}

const openAsync = Helper.promisify(fs.open);
const writeAsync = Helper.promisify(fs.write);
const closeAsync = Helper.promisify(fs.close);



/*
require puppeteer/lib/Launcher.js
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
const removeFolder = require('rimraf');
const {Connection} = require('puppeteer/lib/Connection');
const {Browser} = require('puppeteer/lib/Browser');
const {helper, debugError} = require('puppeteer/lib/helper');
const WebSocketTransport = require('puppeteer/lib/WebSocketTransport');

const mkdtempAsync = helper.promisify(fs.mkdtemp);
const removeFolderAsync = helper.promisify(removeFolder);

const CHROME_PROFILE_PATH = path.join(os.tmpdir(), 'puppeteer_dev_profile-');

const DEFAULT_ARGS = [
  '--disable-background-networking',
  '--enable-features=NetworkService,NetworkServiceInProcess',
  '--disable-background-timer-throttling',
  '--disable-backgrounding-occluded-windows',
  '--disable-breakpad',
  '--disable-client-side-phishing-detection',
  '--disable-component-extensions-with-background-pages',
  '--disable-default-apps',
  '--disable-dev-shm-usage',
  '--disable-extensions',
  // TODO: Support OOOPIF. @see https://github.com/GoogleChrome/puppeteer/issues/2548
  // BlinkGenPropertyTrees disabled due to crbug.com/937609
  '--disable-features=site-per-process,TranslateUI,BlinkGenPropertyTrees',
  '--disable-hang-monitor',
  '--disable-ipc-flooding-protection',
  '--disable-popup-blocking',
  '--disable-prompt-on-repost',
  '--disable-renderer-backgrounding',
  '--disable-sync',
  '--force-color-profile=srgb',
  '--metrics-recording-only',
  '--no-first-run',
  '--enable-automation',
  '--password-store=basic',
  '--use-mock-keychain',
];

class Launcher {
  /**
   * @param {string} projectRoot
   * @param {string} preferredRevision
   * @param {boolean} isPuppeteerCore
   */
  constructor(projectRoot, preferredRevision, isPuppeteerCore) {
    this._projectRoot = projectRoot;
    this._preferredRevision = preferredRevision;
    this._isPuppeteerCore = isPuppeteerCore;
  }

  /**
   * @param {!(Launcher.LaunchOptions & Launcher.ChromeArgOptions & Launcher.BrowserOptions)=} options
   * @return {!Promise<!Browser>}
   */
  async launch(options = {}) {
    const {
      ignoreDefaultArgs = false,
      args = [],
      dumpio = false,
      executablePath = null,
      pipe = false,
      env = process.env,
      handleSIGINT = true,
      handleSIGTERM = true,
      handleSIGHUP = true,
      ignoreHTTPSErrors = false,
      defaultViewport = {width: 800, height: 600},
      slowMo = 0,
      timeout = 30000
    } = options;

    const chromeArguments = [];
    if (!ignoreDefaultArgs)
      chromeArguments.push(...this.defaultArgs(options));
    else if (Array.isArray(ignoreDefaultArgs))
      chromeArguments.push(...this.defaultArgs(options).filter(arg => ignoreDefaultArgs.indexOf(arg) === -1));
    else
      chromeArguments.push(...args);

    let temporaryUserDataDir = null;

    if (!chromeArguments.some(argument => argument.startsWith('--remote-debugging-')))
      chromeArguments.push(pipe ? '--remote-debugging-pipe' : '--remote-debugging-port=0');
    if (!chromeArguments.some(arg => arg.startsWith('--user-data-dir'))) {
      temporaryUserDataDir = await mkdtempAsync(CHROME_PROFILE_PATH);
      chromeArguments.push(`--user-data-dir=${temporaryUserDataDir}`);
    }

    let chromeExecutable = executablePath;
    if (!executablePath) {
      const {missingText, executablePath} = this._resolveExecutablePath();
      if (missingText)
        throw new Error(missingText);
      chromeExecutable = executablePath;
    }

    const usePipe = chromeArguments.includes('--remote-debugging-pipe');
    /** @type {!Array<"ignore"|"pipe">} */
    let stdio = ['pipe', 'pipe', 'pipe'];
    if (usePipe) {
      if (dumpio)
        stdio = ['ignore', 'pipe', 'pipe', 'pipe', 'pipe'];
      else
        stdio = ['ignore', 'ignore', 'ignore', 'pipe', 'pipe'];
    }
    const chromeProcess = child_process.spawn(
        chromeExecutable,
        chromeArguments,
        {
          // On non-windows platforms, `detached: false` makes child process a leader of a new
          // process group, making it possible to kill child process tree with `.kill(-pid)` command.
          // @see https://nodejs.org/api/child_process.html#child_process_options_detached
          detached: process.platform !== 'win32',
          env,
          stdio
        }
    );

    if (dumpio) {
      chromeProcess.stderr.pipe(process.stderr);
      chromeProcess.stdout.pipe(process.stdout);
    }

    let chromeClosed = false;
    const waitForChromeToClose = new Promise((fulfill, reject) => {
      chromeProcess.once('exit', () => {
        chromeClosed = true;
        // Cleanup as processes exit.
        if (temporaryUserDataDir) {
          removeFolderAsync(temporaryUserDataDir)
              .then(() => fulfill())
              .catch(err => console.error(err));
        } else {
          fulfill();
        }
      });
    });

    const listeners = [ helper.addEventListener(process, 'exit', killChrome) ];
    if (handleSIGINT)
      listeners.push(helper.addEventListener(process, 'SIGINT', () => { killChrome(); process.exit(130); }));
    if (handleSIGTERM)
      listeners.push(helper.addEventListener(process, 'SIGTERM', gracefullyCloseChrome));
    if (handleSIGHUP)
      listeners.push(helper.addEventListener(process, 'SIGHUP', gracefullyCloseChrome));
    /** @type {?Connection} */
    let connection = null;
    try {
      const browserWSEndpoint = await waitForWSEndpoint(chromeProcess, timeout, this._preferredRevision);
      const transport = await WebSocketTransport.create(browserWSEndpoint);
      connection = new Connection(browserWSEndpoint, transport, slowMo);
      const browser = await Browser.create(connection, [], ignoreHTTPSErrors, defaultViewport, chromeProcess, gracefullyCloseChrome);
      await browser.waitForTarget(t => t.type() === 'page');
      return browser;
    } catch (e) {
      killChrome();
      throw e;
    }

    /**
     * @return {Promise}
     */
    function gracefullyCloseChrome() {
      helper.removeEventListeners(listeners);
      if (temporaryUserDataDir) {
        killChrome();
      } else if (connection) {
        // Attempt to close chrome gracefully
        connection.send('Browser.close').catch(error => {
          debugError(error);
          killChrome();
        });
      }
      return waitForChromeToClose;
    }

    // This method has to be sync to be used as 'exit' event handler.
    function killChrome() {
      helper.removeEventListeners(listeners);
      if (chromeProcess.pid && !chromeProcess.killed && !chromeClosed) {
        // Force kill chrome.
        try {
          if (process.platform === 'win32')
            child_process.execSync(`taskkill /pid ${chromeProcess.pid} /T /F`);
          else
            process.kill(-chromeProcess.pid, 'SIGKILL');
        } catch (e) {
          // the process might have already stopped
        }
      }
      // Attempt to remove temporary profile directory to avoid littering.
      try {
        removeFolder.sync(temporaryUserDataDir);
      } catch (e) { }
    }
  }

  /**
   * @param {!Launcher.ChromeArgOptions=} options
   * @return {!Array<string>}
   */
  defaultArgs(options = {}) {
    const {
      devtools = false,
      headless = !devtools,
      args = [],
      userDataDir = null
    } = options;
    const chromeArguments = [...DEFAULT_ARGS];
    if (userDataDir)
      chromeArguments.push(`--user-data-dir=${userDataDir}`);
    if (devtools)
      chromeArguments.push('--auto-open-devtools-for-tabs');
    if (headless) {
      chromeArguments.push(
          '--headless',
          '--hide-scrollbars',
          '--mute-audio'
      );
    }
    if (args.every(arg => arg.startsWith('-')))
      chromeArguments.push('about:blank');
    chromeArguments.push(...args);
    return chromeArguments;
  }
}

/**
 * @param {!Puppeteer.ChildProcess} chromeProcess
 * @param {number} timeout
 * @param {string} preferredRevision
 * @return {!Promise<string>}
 */
function waitForWSEndpoint(chromeProcess, timeout, preferredRevision) {
  return new Promise((resolve, reject) => {
    const rl = readline.createInterface({ input: chromeProcess.stderr });
    let stderr = '';
    const listeners = [
      helper.addEventListener(rl, 'line', onLine),
      helper.addEventListener(rl, 'close', () => onClose()),
      helper.addEventListener(chromeProcess, 'exit', () => onClose()),
      helper.addEventListener(chromeProcess, 'error', error => onClose(error))
    ];
    const timeoutId = timeout ? setTimeout(onTimeout, timeout) : 0;

    /**
     * @param {!Error=} error
     */
    function onClose(error) {
      cleanup();
      reject(new Error([
        'Failed to launch chrome!' + (error ? ' ' + error.message : ''),
        stderr,
        '',
        'TROUBLESHOOTING: https://github.com/GoogleChrome/puppeteer/blob/master/docs/troubleshooting.md',
        '',
      ].join('\n')));
    }

    function onTimeout() {
      cleanup();
      reject(new Error(`Timed out after ${timeout} ms while trying to connect to Chrome! The only Chrome revision guaranteed to work is r${preferredRevision}`));
    }

    /**
     * @param {string} line
     */
    function onLine(line) {
      stderr += line + '\n';
      const match = line.match(/^DevTools listening on (ws:\/\/.*)$/);
      if (!match)
        return;
      cleanup();
      resolve(match[1]);
    }

    function cleanup() {
      if (timeoutId)
        clearTimeout(timeoutId);
      helper.removeEventListeners(listeners);
    }
  });
}

/**
 * @typedef {Object} Launcher.ChromeArgOptions
 * @property {boolean=} headless
 * @property {Array<string>=} args
 * @property {string=} userDataDir
 * @property {boolean=} devtools
 */

/**
 * @typedef {Object} Launcher.LaunchOptions
 * @property {string=} executablePath
 * @property {boolean|Array<string>=} ignoreDefaultArgs
 * @property {boolean=} handleSIGINT
 * @property {boolean=} handleSIGTERM
 * @property {boolean=} handleSIGHUP
 * @property {number=} timeout
 * @property {boolean=} dumpio
 * @property {!Object<string, string | undefined>=} env
 * @property {boolean=} pipe
 */

/**
 * @typedef {Object} Launcher.BrowserOptions
 * @property {boolean=} ignoreHTTPSErrors
 * @property {(?Puppeteer.Viewport)=} defaultViewport
 * @property {number=} slowMo
 */


module.exports = Launcher;



/*
require puppeteer/lib/Puppeteer.js
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
class Puppeteer {
  /**
   * @param {string} projectRoot
   * @param {string} preferredRevision
   * @param {boolean} isPuppeteerCore
   */
  constructor(projectRoot, preferredRevision, isPuppeteerCore) {
    this._projectRoot = projectRoot;
    this._launcher = new Launcher(projectRoot, preferredRevision, isPuppeteerCore);
  }

  /**
   * @param {!(Launcher.LaunchOptions & Launcher.ChromeArgOptions & Launcher.BrowserOptions)=} options
   * @return {!Promise<!Puppeteer.Browser>}
   */
  launch(options) {
    return this._launcher.launch(options);
  }
};




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

for (const className in api) {
  // Puppeteer-web excludes certain classes from bundle, e.g. BrowserFetcher.
  if (typeof api[className] === 'function')
    Helper.installAsyncStackHooks(api[className]);
}

// If node does not support async await, use the compiled version.
const packageJson = {
  "name": "puppeteer",
  "puppeteer": {
    "chromium_revision": "674921"
  },
  "version": "1.19.0"
}
;
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
