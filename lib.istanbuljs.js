/* istanbul instrument in package puppeteer-to-istanbul-example */
/* istanbul ignore next */
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
}((typeof globalThis === "object" && globalThis) || (function () {
    return Function("return this")(); // jslint ignore:line
}())));



/* jslint ignore:start */
(function (local) {
"use strict";
// init const
const path = local.path;
const util = local.util;
/*
repo https://github.com/istanbuljs/istanbuljs/tree/istanbul-reports@2.2.5
*/



/*
file https://github.com/istanbuljs/istanbuljs/blob/istanbul-reports@2.2.5/packages/istanbul-api/index.js
*/
var exports_istanbuljs_istanbuljs_packages_istanbul_api_index = {};
/*
 Copyright 2012-2015, Yahoo Inc.
 Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
const Reporter = exports_istanbuljs_istanbuljs_packages_istanbul_api_lib_reporter;
/**
 * @module Exports
 */
exports_istanbuljs_istanbuljs_packages_istanbul_api_index = {
    config: exports_istanbuljs_istanbuljs_packages_istanbul_api_lib_config,
    cover: exports_istanbuljs_istanbuljs_packages_istanbul_api_lib_run_cover,
    reports: exports_istanbuljs_istanbuljs_packages_istanbul_api_lib_run_reports,
    instrument: exports_istanbuljs_istanbuljs_packages_istanbul_api_lib_run_instrument,
    checkCoverage: exports_istanbuljs_istanbuljs_packages_istanbul_api_lib_run_check_coverage,
    createReporter(cfg, opts) {
        return new Reporter(cfg, opts);
    },
    /**
     * asynchronously returns a function that can match filesystem paths.
     * The function returned in the callback may be passed directly as a `matcher`
     * to the functions in the `hook` module.
     *
     * When no options are passed, the match function is one that matches all JS
     * files under the current working directory except ones under `node_modules`
     *
     * Match patterns are `ant`-style patterns processed using the `fileset` library.
     * Examples not provided due to limitations in putting asterisks inside
     * jsdoc comments. Please refer to tests under `test/other/test-matcher.js`
     * for examples.
     *
     * @method matcherFor
     * @static
     * @param {Object} options Optional. Lookup options.
     * @param {String} [options.root] the root of the filesystem tree under
     *     which to match files. Defaults to `process.cwd()`
     * @param {Array} [options.includes] an array of include patterns to match.
     *     Defaults to all JS files under the root.
     * @param {Array} [options.excludes] and array of exclude patterns. File paths
     *     matching these patterns will be excluded by the returned matcher.
     *     Defaults to files under `node_modules` found anywhere under root.
     * @param {Function(err, matchFunction)} callback  The callback that is
     *      called with two arguments. The first is an `Error` object in case
     *      of errors or a falsy value if there were no errors. The second
     *      is a function that may be use as a matcher.
     */
    matcherFor: exports_istanbuljs_istanbuljs_packages_istanbul_api_lib_file_matcher.matcherFor,
    filesFor: exports_istanbuljs_istanbuljs_packages_istanbul_api_lib_file_matcher.filesFor
};

// export all the istanbul libraries as is so users don't have to take 5 deps
// that are potentially inconsistent

const DASH_PATTERN = /-([a-z])/g;

function camelize(word) {
    return word.replace(DASH_PATTERN, (match, lch) => lch.toUpperCase());
}

['coverage', 'hook', 'instrument', 'report', 'source-maps'].forEach(k => {
    const mod = 'lib-' + k;
    const prop = camelize(mod);
    exports_istanbuljs_istanbuljs_packages_istanbul_api_index[prop] = require('istanbul-' + mod);
});

exports_istanbuljs_istanbuljs_packages_istanbul_api_index.reportsImpl = require('istanbul-reports');



/*
file https://github.com/istanbuljs/istanbuljs/blob/istanbul-reports@2.2.5/packages/istanbul-api/lib/config.js
*/
var exports_istanbuljs_istanbuljs_packages_istanbul_api_lib_config = {};
/*
 Copyright 2012-2015, Yahoo Inc.
 Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
// const path = require('path');
// const fs = require('fs');
const existsSync = fs.existsSync;
const CAMEL_PATTERN = /([a-z])([A-Z])/g;
const YML_PATTERN = /\.ya?ml$/;
// const yaml = require('js-yaml');
// const libReport = require('istanbul-lib-report');
const inputError = exports_istanbuljs_istanbuljs_packages_istanbul_api_lib_input_error;

function defaultConfig() {
    const ret = {
        verbose: false,
        instrumentation: {
            root: '.',
            extensions: ['.js'],
            'default-excludes': true,
            excludes: [],
            variable: '__coverage__',
            compact: true,
            'preserve-comments': false,
            'complete-copy': false,
            'save-baseline': false,
            'baseline-file': './coverage/coverage-baseline.raw.json',
            'include-all-sources': false,
            'include-pid': false,
            'es-modules': false,
            'auto-wrap': false,
            'ignore-class-methods': []
        },
        reporting: {
            print: 'summary',
            reports: ['lcov'],
            dir: './coverage',
            summarizer: 'pkg',
            'report-config': {}
        },
        hooks: {
            'hook-run-in-context': false,
            'hook-run-in-this-context': false,
            'post-require-hook': null,
            'handle-sigint': false
        },
        check: {
            global: {
                statements: 0,
                lines: 0,
                branches: 0,
                functions: 0,
                excludes: [] // Currently list of files (root + path). For future, extend to patterns.
            },
            each: {
                statements: 0,
                lines: 0,
                branches: 0,
                functions: 0,
                excludes: []
            }
        }
    };
    ret.reporting.watermarks = libReport.getDefaultWatermarks();
    ret.reporting['report-config'] = {};
    return ret;
}

function dasherize(word) {
    return word.replace(
        CAMEL_PATTERN,
        (match, lch, uch) => lch + '-' + uch.toLowerCase()
    );
}
function isScalar(v) {
    if (v === null) {
        return true;
    }
    return v !== undefined && !Array.isArray(v) && typeof v !== 'object';
}

function isObject(v) {
    return typeof v === 'object' && v !== null && !Array.isArray(v);
}

function mergeObjects(explicit, template, bothWays) {
    const ret = {};
    const keys = Object.keys(template);

    if (bothWays) {
        keys.push(...Object.keys(explicit));
    }
    keys.forEach(k => {
        const v1 = template[k];
        let v2 = explicit[k];

        if (Array.isArray(v1)) {
            ret[k] = Array.isArray(v2) && v2.length > 0 ? v2 : v1;
        } else if (isObject(v1)) {
            v2 = isObject(v2) ? v2 : {};
            ret[k] = mergeObjects(v2, v1, bothWays);
        } else if (!v1 && v2) {
            ret[k] = v2;
        } else {
            ret[k] = isScalar(v2) ? v2 : v1;
        }
    });
    return ret;
}

function mergeDefaults(explicit, implicit) {
    explicit = explicit || {};
    const initialMerge = mergeObjects(explicit || {}, implicit);
    const explicitReportConfig =
        (explicit.reporting || {})['report-config'] || {};
    const implicitReportConfig = initialMerge.reporting['report-config'] || {};
    initialMerge.reporting['report-config'] = mergeObjects(
        explicitReportConfig,
        implicitReportConfig,
        true
    );
    return initialMerge;
}

function addMethods(cons, ...args) {
    args.forEach(arg => {
        const property = dasherize(arg);
        cons.prototype[arg] = function() {
            return this.config[property];
        };
    });
}

/**
 * Object that returns instrumentation options
 * @class InstrumentOptions
 * @module config
 * @constructor
 * @param config the instrumentation part of the config object
 */
function InstrumentOptions(config) {
    this.config = config;
}

/**
 * returns if default excludes should be turned on. Used by the `cover` command.
 * @method defaultExcludes
 * @return {Boolean} true if default excludes should be turned on
 */
/**
 * returns if non-JS files should be copied during instrumentation. Used by the
 * `instrument` command.
 * @method completeCopy
 * @return {Boolean} true if non-JS files should be copied
 */
/**
 * the coverage variable name to use. Used by the `instrument` command.
 * @method variable
 * @return {String} the coverage variable name to use
 */
/**
 * returns if the output should be compact JS. Used by the `instrument` command.
 * @method compact
 * @return {Boolean} true if the output should be compact
 */
/**
 * returns if comments should be preserved in the generated JS. Used by the
 * `cover` and `instrument` commands.
 * @method preserveComments
 * @return {Boolean} true if comments should be preserved in the generated JS
 */
/**
 * returns if a zero-coverage baseline file should be written as part of
 * instrumentation. This allows reporting to display numbers for files that have
 * no tests. Used by the  `instrument` command.
 * @method saveBaseline
 * @return {Boolean} true if a baseline coverage file should be written.
 */
/**
 * Sets the baseline coverage filename. Used by the  `instrument` command.
 * @method baselineFile
 * @return {String} the name of the baseline coverage file.
 */
/**
 * returns if comments the JS to instrument contains es6 Module syntax.
 * @method esModules
 * @return {Boolean} true if code contains es6 import/export statements.
 */
/**
 * returns if the coverage filename should include the PID. Used by the  `instrument` command.
 * @method includePid
 * @return {Boolean} true to include pid in coverage filename.
 */

addMethods(
    InstrumentOptions,
    'extensions',
    'defaultExcludes',
    'completeCopy',
    'variable',
    'compact',
    'preserveComments',
    'saveBaseline',
    'baselineFile',
    'esModules',
    'includeAllSources',
    'includePid',
    'autoWrap',
    'ignoreClassMethods'
);

/**
 * returns the root directory used by istanbul which is typically the root of the
 * source tree. Used by the `cover` and `report` commands.
 * @method root
 * @return {String} the root directory used by istanbul.
 */
InstrumentOptions.prototype.root = function() {
    return path.resolve(this.config.root);
};
/**
 * returns an array of fileset patterns that should be excluded for instrumentation.
 * Used by the `instrument` and `cover` commands.
 * @method excludes
 * @return {Array} an array of fileset patterns that should be excluded for
 *  instrumentation.
 */
InstrumentOptions.prototype.excludes = function(excludeTests) {
    let defs;
    if (this.defaultExcludes()) {
        defs = ['**/node_modules/**'];
        if (excludeTests) {
            defs = defs.concat(['**/test/**', '**/tests/**']);
        }
        return defs.concat(this.config.excludes);
    }
    return this.config.excludes;
};

InstrumentOptions.prototype.getInstrumenterOpts = function() {
    return {
        coverageVariable: this.variable(),
        compact: this.compact(),
        preserveComments: this.preserveComments(),
        esModules: this.esModules(),
        autoWrap: this.autoWrap(),
        ignoreClassMethods: this.ignoreClassMethods()
    };
};

/**
 * Object that returns reporting options
 * @class ReportingOptions
 * @module config
 * @constructor
 * @param config the reporting part of the config object
 */
function ReportingOptions(config) {
    this.config = config;
}

/**
 * returns the kind of information to be printed on the console. May be one
 * of `summary`, `detail`, `both` or `none`. Used by the
 * `cover` command.
 * @method print
 * @return {String} the kind of information to print to the console at the end
 * of the `cover` command execution.
 */
/**
 * returns a list of reports that should be generated at the end of a run. Used
 * by the `cover` and `report` commands.
 * @method reports
 * @return {Array} an array of reports that should be produced
 */
/**
 * returns the directory under which reports should be generated. Used by the
 * `cover` and `report` commands.
 *
 * @method dir
 * @return {String} the directory under which reports should be generated.
 */
/**
 * returns an object that has keys that are report format names and values that are objects
 * containing detailed configuration for each format. Running `istanbul help config`
 * will give you all the keys per report format that can be overridden.
 * Used by the `cover` and `report` commands.
 * @method reportConfig
 * @return {Object} detailed report configuration per report format.
 */
addMethods(
    ReportingOptions,
    'print',
    'reports',
    'dir',
    'reportConfig',
    'summarizer'
);

function isInvalidMark(v, key) {
    const prefix = 'Watermark for [' + key + '] :';

    if (v.length !== 2) {
        return prefix + 'must be an array of length 2';
    }
    v[0] = Number(v[0]);
    v[1] = Number(v[1]);

    if (isNaN(v[0]) || isNaN(v[1])) {
        return prefix + 'must have valid numbers';
    }
    if (v[0] < 0 || v[1] < 0) {
        return prefix + 'must be positive numbers';
    }
    if (v[1] > 100) {
        return prefix + 'cannot exceed 100';
    }
    if (v[1] <= v[0]) {
        return prefix + 'low must be less than high';
    }
    return null;
}

/**
 * returns the low and high watermarks to be used to designate whether coverage
 * is `low`, `medium` or `high`. Statements, functions, branches and lines can
 * have independent watermarks. These are respected by all reports
 * that color for low, medium and high coverage. See the default configuration for exact syntax
 * using `istanbul help config`. Used by the `cover` and `report` commands.
 *
 * @method watermarks
 * @return {Object} an object containing low and high watermarks for statements,
 *  branches, functions and lines.
 */
ReportingOptions.prototype.watermarks = function() {
    const v = this.config.watermarks;
    const defs = libReport.getDefaultWatermarks();
    const ret = {};

    Object.keys(defs).forEach(k => {
        const mark = v[k];
        //it will already be a non-zero length array because of the way the merge works
        const message = isInvalidMark(mark, k);
        if (message) {
            console.error(message);
            ret[k] = defs[k];
        } else {
            ret[k] = mark;
        }
    });
    return ret;
};

/**
 * Object that returns hook options. Note that istanbul does not provide an
 * option to hook `require`. This is always done by the `cover` command.
 * @class HookOptions
 * @module config
 * @constructor
 * @param config the hooks part of the config object
 */
function HookOptions(config) {
    this.config = config;
}

/**
 * returns if `vm.runInContext` needs to be hooked. Used by the `cover` command.
 * @method hookRunInContext
 * @return {Boolean} true if `vm.runInContext` needs to be hooked for coverage
 */
/**
 * returns if `vm.runInThisContext` needs to be hooked, in addition to the standard
 * `require` hooks added by istanbul. This should be true for code that uses
 * RequireJS for example. Used by the `cover` command.
 * @method hookRunInThisContext
 * @return {Boolean} true if `vm.runInThisContext` needs to be hooked for coverage
 */
/**
 * returns a path to JS file or a dependent module that should be used for
 * post-processing files after they have been required. See the `yui-istanbul` module for
 * an example of a post-require hook. This particular hook modifies the yui loader when
 * that file is required to add istanbul interceptors. Use by the `cover` command
 *
 * @method postRequireHook
 * @return {String} a path to a JS file or the name of a node module that needs
 * to be used as a `require` post-processor
 */
/**
 * returns if istanbul needs to add a SIGINT (control-c, usually) handler to
 * save coverage information. Useful for getting code coverage out of processes
 * that run forever and need a SIGINT to terminate.
 * @method handleSigint
 * @return {Boolean} true if SIGINT needs to be hooked to write coverage information
 */

addMethods(
    HookOptions,
    'hookRunInContext',
    'hookRunInThisContext',
    'postRequireHook',
    'handleSigint'
);

/**
 * represents the istanbul configuration and provides sub-objects that can
 * return instrumentation, reporting and hook options respectively.
 * Usage
 * -----
 *
 *      var configObj = require('istanbul').config.loadFile();
 *
 *      console.log(configObj.reporting.reports());
 *
 * @class Configuration
 * @module config
 * @param {Object} obj  the base object to use as the configuration
 * @param {Object} overrides optional - override attributes that are merged into
 *  the base config
 * @constructor
 */
function Configuration(obj, overrides) {
    let config = mergeDefaults(obj, defaultConfig(true));
    if (isObject(overrides)) {
        config = mergeDefaults(overrides, config);
    }
    if (config.verbose) {
        console.error('Using configuration');
        console.error('-------------------');
        console.error(yaml.safeDump(config, { indent: 4, flowLevel: 3 }));
        console.error('-------------------\n');
    }
    this.verbose = config.verbose;
    this.instrumentation = new InstrumentOptions(config.instrumentation);
    this.reporting = new ReportingOptions(config.reporting);
    this.hooks = new HookOptions(config.hooks);
    this.check = config.check; // Pass raw config sub-object.
}

/**
 * true if verbose logging is required
 * @property verbose
 * @type Boolean
 */
/**
 * instrumentation options
 * @property instrumentation
 * @type InstrumentOptions
 */
/**
 * reporting options
 * @property reporting
 * @type ReportingOptions
 */
/**
 * hook options
 * @property hooks
 * @type HookOptions
 */

function loadFile(file, overrides) {
    const defaultConfigFile = path.resolve('.istanbul.yml');
    let configObject;

    if (file) {
        if (!existsSync(file)) {
            throw inputError.create(
                'Invalid configuration file specified:' + file
            );
        }
    } else {
        if (existsSync(defaultConfigFile)) {
            file = defaultConfigFile;
        }
    }

    if (file) {
        if (overrides && overrides.verbose === true) {
            console.error('Loading config: ' + file);
        }
        configObject = file.match(YML_PATTERN)
            ? yaml.safeLoad(fs.readFileSync(file, 'utf8'), { filename: file })
            : require(path.resolve(file));
    }

    return new Configuration(configObject, overrides);
}

function loadObject(obj, overrides) {
    return new Configuration(obj, overrides);
}

/**
 * methods to load the configuration object.
 * Usage
 * -----
 *
 *      var config = require('istanbul').config,
 *          configObj = config.loadFile();
 *
 *      console.log(configObj.reporting.reports());
 *
 * @class Config
 * @module main
 * @static
 */
exports_istanbuljs_istanbuljs_packages_istanbul_api_lib_config = {
    /**
     * loads the specified configuration file with optional overrides. Throws
     * when a file is specified and it is not found.
     * @method loadFile
     * @static
     * @param {String} file the file to load. If falsy, the default config file, if present, is loaded.
     *  If not a default config is used.
     * @param {Object} overrides - an object with override keys that are merged into the
     *  config object loaded
     * @return {Configuration} the config object with overrides applied
     */
    loadFile,
    /**
     * loads the specified configuration object with optional overrides.
     * @method loadObject
     * @static
     * @param {Object} obj the object to use as the base configuration.
     * @param {Object} overrides - an object with override keys that are merged into the
     *  config object
     * @return {Configuration} the config object with overrides applied
     */
    loadObject,
    /**
     * returns the default configuration object. Note that this is a plain object
     * and not a `Configuration` instance.
     * @method defaultConfig
     * @static
     * @return {Object} an object that represents the default config
     */
    defaultConfig
};



/*
file https://github.com/istanbuljs/istanbuljs/blob/istanbul-reports@2.2.5/packages/istanbul-api/lib/file-matcher.js
*/
var exports_istanbuljs_istanbuljs_packages_istanbul_api_lib_file_matcher = {};
/*
 Copyright 2012-2015, Yahoo Inc.
 Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
// const fs = require('fs');
// const path = require('path');
// const async = require('async');
// const fileset = require('fileset');
let seq = 0;

function filesFor(options, callback) {
    if (!callback && typeof options === 'function') {
        callback = options;
        options = null;
    }
    options = options || {};

    let root = options.root;
    let includes = options.includes;
    let excludes = options.excludes;
    const realpath = options.realpath;
    const relative = options.relative;

    root = root || process.cwd();
    includes = includes && Array.isArray(includes) ? includes : ['**/*.js'];
    excludes =
        excludes && Array.isArray(excludes) ? excludes : ['**/node_modules/**'];

    const opts = { cwd: root, nodir: true, ignore: excludes };
    seq += 1;
    opts['x' + seq + new Date().getTime()] = true; //cache buster for minimatch cache bug
    fileset(includes.join(' '), excludes.join(' '), opts, (err, files) => {
        /* istanbul ignore if - untestable */
        if (err) {
            return callback(err);
        }
        if (relative) {
            return callback(err, files);
        }

        if (!realpath) {
            files = files.map(file => path.resolve(root, file));
            return callback(err, files);
        }

        const realPathCache =
            module.constructor._realpathCache || /* istanbul ignore next */ {};

        async.map(
            files,
            (file, done) => {
                fs.realpath(path.resolve(root, file), realPathCache, done);
            },
            callback
        );
    });
}

function matcherFor(options, callback) {
    if (!callback && typeof options === 'function') {
        callback = options;
        options = null;
    }
    options = options || {};
    options.relative = false; //force absolute paths
    options.realpath = true; //force real paths (to match Node.js module paths)

    filesFor(options, (err, files) => {
        const fileMap = Object.create(null);
        /* istanbul ignore if - untestable */
        if (err) {
            return callback(err);
        }
        files.forEach(file => {
            fileMap[file] = true;
        });

        const matchFn = function(file) {
            return fileMap[file];
        };
        matchFn.files = Object.keys(fileMap);
        return callback(null, matchFn);
    });
}

exports_istanbuljs_istanbuljs_packages_istanbul_api_lib_file_matcher = {
    filesFor,
    matcherFor
};



/*
file https://github.com/istanbuljs/istanbuljs/blob/istanbul-reports@2.2.5/packages/istanbul-api/lib/input-error.js
*/
var exports_istanbuljs_istanbuljs_packages_istanbul_api_lib_input_error = {};
/*
 Copyright 2012-2015, Yahoo Inc.
 Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
exports_istanbuljs_istanbuljs_packages_istanbul_api_lib_input_error.create = function(message) {
    const err = new Error(message);
    err.inputError = true;
    return err;
};



/*
file https://github.com/istanbuljs/istanbuljs/blob/istanbul-reports@2.2.5/packages/istanbul-api/lib/reporter.js
*/
var exports_istanbuljs_istanbuljs_packages_istanbul_api_lib_reporter = {};
/*
 Copyright 2012-2015, Yahoo Inc.
 Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
// const path = require('path');
// const libReport = require('istanbul-lib-report');
// const libReports = require('istanbul-reports');
// const minimatch = require('minimatch');
const inputError = exports_istanbuljs_istanbuljs_packages_istanbul_api_lib_input_error;
const configuration = exports_istanbuljs_istanbuljs_packages_istanbul_api_lib_config;

function Reporter(cfg, opts) {
    opts = opts || {};
    this.config = cfg || configuration.loadFile();
    this.dir = path.resolve(this.config.reporting.dir());
    this.reports = {};

    let summarizer = opts.summarizer;
    const s = this.config.reporting.summarizer();

    if (summarizer && typeof summarizer === 'function') {
        this.summarizer = summarizer;
    } else {
        summarizer = libReport.summarizers[s];
        if (!summarizer) {
            throw inputError.create(
                'Invalid summarizer in report config: ' + s
            );
        }
        this.summarizer = summarizer;
    }
}

Reporter.prototype = {
    /**
     * adds a report to be generated. Must be one of the entries returned
     * by `Report.getReportList()`
     * @method add
     * @param {String} fmt the format of the report to generate
     */
    add(fmt) {
        if (this.reports[fmt]) {
            // already added
            return;
        }
        const config = this.config;
        const rptConfig = config.reporting.reportConfig()[fmt] || {};
        rptConfig.verbose = config.verbose;
        try {
            if (this.config.verbose) {
                console.error('Create report', fmt, ' with', rptConfig);
            }
            this.reports[fmt] = libReports.create(fmt, rptConfig);
        } catch (ex) {
            throw inputError.create('Invalid report format [' + fmt + ']');
        }
    },
    /**
     * adds an array of report formats to be generated
     * @method addAll
     * @param {Array} fmts an array of report formats
     */
    addAll(fmts) {
        fmts.forEach(f => {
            this.add(f);
        });
    },
    /**
     * writes all reports added
     * @method write
     */
    write(coverageMap, opts) {
        opts = opts || {};
        const sourceFinder = opts.sourceFinder || null;

        const context = libReport.createContext({
            dir: this.dir,
            watermarks: this.config.reporting.watermarks(),
            sourceFinder
        });

        const excludes = this.config.instrumentation.excludes() || [];

        coverageMap.filter(
            file =>
                !excludes.some(exclude =>
                    minimatch(file, exclude, { dot: true })
                )
        );

        const tree = this.summarizer(coverageMap);
        Object.keys(this.reports).forEach(name => {
            const report = this.reports[name];
            tree.visit(report, context);
        });
    }
};

exports_istanbuljs_istanbuljs_packages_istanbul_api_lib_reporter = Reporter;



/*
file https://github.com/istanbuljs/istanbuljs/blob/istanbul-reports@2.2.5/packages/istanbul-api/lib/run-check-coverage.js
*/
var exports_istanbuljs_istanbuljs_packages_istanbul_api_lib_run_check_coverage = {};
/*
 Copyright 2012-2015, Yahoo Inc.
 Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
// const path = require('path');
// const fs = require('fs');
// const libCoverage = require('istanbul-lib-coverage');
const filesFor = exports_istanbuljs_istanbuljs_packages_istanbul_api_lib_file_matcher.filesFor;
const inputError = exports_istanbuljs_istanbuljs_packages_istanbul_api_lib_input_error;
const isAbsolute =
    path.isAbsolute ||
    function(file) {
        return path.resolve(file) === path.normalize(file);
    };

function removeFiles(origMap, root, files) {
    const filesObj = {};
    const ret = libCoverage.createCoverageMap();

    // Create lookup table.
    files.forEach(file => {
        filesObj[file] = true;
    });

    origMap.files().forEach(key => {
        // Exclude keys will always be relative, but covObj keys can be absolute or relative
        let excludeKey = isAbsolute(key) ? path.relative(root, key) : key;
        // Also normalize for files that start with `./`, etc.
        excludeKey = path.normalize(excludeKey);
        if (filesObj[excludeKey] !== true) {
            ret.addFileCoverage(origMap.fileCoverageFor(key));
        }
    });

    return ret;
}

function run(config, opts, callback) {
    if (!callback && typeof opts === 'function') {
        callback = opts;
        opts = {};
    }

    opts = opts || {};

    const root = opts.root || config.instrumentation.root() || process.cwd();
    const includePattern = opts.include || '**/coverage*.json';
    const errors = [];

    const check = function(name, thresholds, actuals) {
        ['statements', 'branches', 'lines', 'functions'].forEach(key => {
            const actual = actuals[key].pct;
            const actualUncovered = actuals[key].total - actuals[key].covered;
            const threshold = thresholds[key];

            if (threshold < 0) {
                if (threshold * -1 < actualUncovered) {
                    errors.push(
                        'ERROR: Uncovered count for ' +
                            key +
                            ' (' +
                            actualUncovered +
                            ') exceeds ' +
                            name +
                            ' threshold (' +
                            -1 * threshold +
                            ')'
                    );
                }
            } else {
                if (actual < threshold) {
                    errors.push(
                        'ERROR: Coverage for ' +
                            key +
                            ' (' +
                            actual +
                            '%) does not meet ' +
                            name +
                            ' threshold (' +
                            threshold +
                            '%)'
                    );
                }
            }
        });
    };

    const makeMap = function(files, callback) {
        const coverageMap = libCoverage.createCoverageMap();
        if (files.length === 0) {
            return callback(
                inputError.create('ERROR: No coverage files found.')
            );
        }
        files.forEach(file => {
            const coverageObject = JSON.parse(fs.readFileSync(file, 'utf8'));
            coverageMap.merge(coverageObject);
        });
        return callback(null, coverageMap);
    };

    const processFiles = function(coverageMap, callback) {
        const thresholds = {
            global: {
                statements: config.check.global.statements || 0,
                branches: config.check.global.branches || 0,
                lines: config.check.global.lines || 0,
                functions: config.check.global.functions || 0,
                excludes: config.check.global.excludes || []
            },
            each: {
                statements: config.check.each.statements || 0,
                branches: config.check.each.branches || 0,
                lines: config.check.each.lines || 0,
                functions: config.check.each.functions || 0,
                excludes: config.check.each.excludes || []
            }
        };
        const globalResults = removeFiles(
            coverageMap,
            root,
            thresholds.global.excludes
        );
        const eachResults = removeFiles(
            coverageMap,
            root,
            thresholds.each.excludes
        );

        if (config.verbose) {
            console.error('Compare actuals against thresholds');
            console.error(
                JSON.stringify(
                    {
                        global: globalResults,
                        each: eachResults,
                        thresholds
                    },
                    undefined,
                    4
                )
            );
        }

        check('global', thresholds.global, globalResults.getCoverageSummary());
        eachResults.files().forEach(key => {
            const summary = eachResults.fileCoverageFor(key).toSummary();
            check('per-file' + ' (' + key + ') ', thresholds.each, summary);
        });
        const finalError = errors.length === 0 ? null : errors.join('\n');
        return callback(finalError);
    };

    filesFor(
        {
            root,
            includes: [includePattern]
        },
        (err, files) => {
            if (err) {
                return callback(err);
            }
            makeMap(files, (err, map) => {
                if (err) {
                    return callback(err);
                }
                return processFiles(map, callback);
            });
        }
    );
}

exports_istanbuljs_istanbuljs_packages_istanbul_api_lib_run_check_coverage = {
    run
};



/*
file https://github.com/istanbuljs/istanbuljs/blob/istanbul-reports@2.2.5/packages/istanbul-api/lib/run-cover.js
*/
var exports_istanbuljs_istanbuljs_packages_istanbul_api_lib_run_cover = {};
/*
 Copyright 2012-2015, Yahoo Inc.
 Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
// const path = require('path');
// const fs = require('fs');
// const mkdirp = require('make-dir');
// const compareVersions = require('compare-versions');
// const libInstrument = require('istanbul-lib-instrument');
// const libCoverage = require('istanbul-lib-coverage');
// const libSourceMaps = require('istanbul-lib-source-maps');
// const hook = require('istanbul-lib-hook');
const matcherFor = exports_istanbuljs_istanbuljs_packages_istanbul_api_lib_file_matcher.matcherFor;
const Reporter = exports_istanbuljs_istanbuljs_packages_istanbul_api_lib_reporter;

function getCoverFunctions(config, includes, callback) {
    if (!callback && typeof includes === 'function') {
        callback = includes;
        includes = null;
    }

    const includePid = config.instrumentation.includePid();
    const reportingDir = path.resolve(config.reporting.dir());
    const reporter = new Reporter(config);
    const excludes = config.instrumentation.excludes(true);
    // The coverage variable below should have different value than
    // that of the coverage variable actually used by the instrumenter (in this case: __coverage__).
    // Otherwise if you run nyc to provide coverage on these files,
    // both the actual instrumenter and this file will write to the global coverage variable,
    // and provide unexpected coverage result.
    const coverageVar = '$$coverage$$';
    const instOpts = config.instrumentation.getInstrumenterOpts();
    const sourceMapStore = libSourceMaps.createSourceMapStore({});
    let fakeRequire;

    instOpts.coverageVariable = coverageVar;
    instOpts.sourceMapUrlCallback = function(file, url) {
        sourceMapStore.registerURL(file, url);
    };
    const coverageFinderFn = function() {
        return global[coverageVar];
    };
    const instrumenter = libInstrument.createInstrumenter(instOpts);
    const transformer = function(code, options) {
        const filename =
            typeof options === 'string' ? options : options.filename;
        return instrumenter.instrumentSync(code, filename);
    };
    const runInContextTransformer = function(code, options) {
        return transformer(code, options);
    };
    const runInThisContextTransformer = function(code, options) {
        return transformer(code, options);
    };
    const requireTransformer = function(code, options) {
        let cov;
        const ret = transformer(code, options);
        const filename =
            typeof options === 'string' ? options : options.filename;
        if (fakeRequire) {
            cov = coverageFinderFn();
            cov[filename] = instrumenter.lastFileCoverage();
            return 'function x() {}';
        }
        return ret;
    };

    const coverageSetterFn = function(cov) {
        global[coverageVar] = cov;
    };

    const reportInitFn = function() {
        // set up reporter
        mkdirp.sync(reportingDir); //ensure we fail early if we cannot do this
        reporter.addAll(config.reporting.reports());
        if (config.reporting.print() !== 'none') {
            switch (config.reporting.print()) {
                case 'detail':
                    reporter.add('text');
                    break;
                case 'both':
                    reporter.add('text');
                    reporter.add('text-summary');
                    break;
                default:
                    reporter.add('text-summary');
                    break;
            }
        }
    };

    let disabler;
    const hookFn = function(matchFn) {
        const hookOpts = {
            verbose: config.verbose,
            extensions: config.instrumentation.extensions(),
            coverageVariable: coverageVar
        };

        //initialize the global variable
        coverageSetterFn({});
        reportInitFn();

        if (config.hooks.hookRunInContext()) {
            hook.hookRunInContext(matchFn, runInContextTransformer, hookOpts);
        }
        if (config.hooks.hookRunInThisContext()) {
            hook.hookRunInThisContext(
                matchFn,
                runInThisContextTransformer,
                hookOpts
            );
            if (compareVersions(process.versions.node, '6.0.0') === -1) {
                disabler = hook.hookRequire(
                    matchFn,
                    requireTransformer,
                    hookOpts
                );
            }
        } else {
            disabler = hook.hookRequire(matchFn, requireTransformer, hookOpts);
        }
    };

    const unhookFn = function(matchFn) {
        if (disabler) {
            disabler();
        }
        hook.unhookRunInThisContext();
        hook.unhookRunInContext();
        hook.unloadRequireCache(matchFn);
    };

    const beforeReportFn = function(matchFn, cov) {
        const pidExt = includePid ? '-' + process.pid : '';
        const file = path.resolve(
            reportingDir,
            'coverage' + pidExt + '.raw.json'
        );
        let missingFiles;
        const finalCoverage = cov;

        if (config.instrumentation.includeAllSources()) {
            if (config.verbose) {
                console.error("Including all sources not require'd by tests");
            }
            missingFiles = [];
            // Files that are not touched by code ran by the test runner is manually instrumented, to
            // illustrate the missing coverage.
            matchFn.files.forEach(file => {
                if (!cov[file]) {
                    missingFiles.push(file);
                }
            });

            fakeRequire = true;
            missingFiles.forEach(file => {
                try {
                    require(file);
                } catch (ex) {
                    console.error('Unable to post-instrument: ' + file);
                }
            });
        }
        if (Object.keys(finalCoverage).length > 0) {
            if (config.verbose) {
                console.error(
                    '============================================================================='
                );
                console.error('Writing coverage object [' + file + ']');
                console.error(
                    'Writing coverage reports at [' + reportingDir + ']'
                );
                console.error(
                    '============================================================================='
                );
            }
            fs.writeFileSync(file, JSON.stringify(finalCoverage), 'utf8');
        }
        return finalCoverage;
    };

    const exitFn = function(matchFn, reporterOpts) {
        let cov;

        cov = coverageFinderFn() || {};
        cov = beforeReportFn(matchFn, cov);
        coverageSetterFn(cov);

        if (
            !(cov && typeof cov === 'object') ||
            Object.keys(cov).length === 0
        ) {
            console.error(
                'No coverage information was collected, exit without writing coverage information'
            );
            return;
        }

        const coverageMap = libCoverage.createCoverageMap(cov);
        const transformed = sourceMapStore.transformCoverage(coverageMap);
        reporterOpts.sourceFinder = transformed.sourceFinder;
        reporter.write(transformed.map, reporterOpts);
        sourceMapStore.dispose();
    };

    excludes.push(
        path.relative(process.cwd(), path.join(reportingDir, '**', '*'))
    );
    includes =
        includes ||
        config.instrumentation.extensions().map(ext => '**/*' + ext);
    const matchConfig = {
        root:
            config.instrumentation.root() ||
            /* istanbul ignore next: untestable */ process.cwd(),
        includes,
        excludes
    };
    matcherFor(matchConfig, (err, matchFn) => {
        /* istanbul ignore if: untestable */
        if (err) {
            return callback(err);
        }
        return callback(null, {
            coverageFn: coverageFinderFn,
            hookFn: hookFn.bind(null, matchFn),
            exitFn: exitFn.bind(null, matchFn, {}), // XXX: reporter opts
            unhookFn: unhookFn.bind(null, matchFn)
        });
    });
}

exports_istanbuljs_istanbuljs_packages_istanbul_api_lib_run_cover = {
    getCoverFunctions
};



/*
file https://github.com/istanbuljs/istanbuljs/blob/istanbul-reports@2.2.5/packages/istanbul-api/lib/run-instrument.js
*/
var exports_istanbuljs_istanbuljs_packages_istanbul_api_lib_run_instrument = {};
/*
 Copyright 2012-2015, Yahoo Inc.
 Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
// const path = require('path');
// const fs = require('fs');
// const mkdirp = require('make-dir');
// const once = require('once');
// const async = require('async');
// const libInstrument = require('istanbul-lib-instrument');
// const libCoverage = require('istanbul-lib-coverage');
const filesFor = exports_istanbuljs_istanbuljs_packages_istanbul_api_lib_file_matcher.filesFor;
const inputError = exports_istanbuljs_istanbuljs_packages_istanbul_api_lib_input_error;

/*
 * Chunk file size to use when reading non JavaScript files in memory
 * and copying them over when using complete-copy flag.
 */
const READ_FILE_CHUNK_SIZE = 64 * 1024;

function BaselineCollector(instrumenter) {
    this.instrumenter = instrumenter;
    this.map = libCoverage.createCoverageMap();
    this.instrument = instrumenter.instrument.bind(this.instrumenter);

    const origInstrumentSync = instrumenter.instrumentSync;
    this.instrumentSync = function(...args) {
        const ret = origInstrumentSync.apply(this.instrumenter, args);
        const baseline = this.instrumenter.lastFileCoverage();
        this.map.addFileCoverage(baseline);
        return ret;
    };
    //monkey patch the instrumenter to call our version instead
    instrumenter.instrumentSync = this.instrumentSync.bind(this);
}

BaselineCollector.prototype.getCoverage = function() {
    return this.map.toJSON();
};

function processFiles(instrumenter, opts, callback) {
    const inputDir = opts.inputDir;
    const outputDir = opts.outputDir;
    const relativeNames = opts.names;
    const extensions = opts.extensions;
    const verbose = opts.verbose;

    const processor = function(name, callback) {
        const inputFile = path.resolve(inputDir, name);
        const outputFile = path.resolve(outputDir, name);
        const inputFileExtension = path.extname(inputFile);
        const isJavaScriptFile = extensions.indexOf(inputFileExtension) > -1;
        const oDir = path.dirname(outputFile);
        let readStream;
        let writeStream;

        callback = once(callback);
        mkdirp.sync(oDir);

        /* istanbul ignore if */
        if (fs.statSync(inputFile).isDirectory()) {
            return callback(null, name);
        }

        if (isJavaScriptFile) {
            fs.readFile(inputFile, 'utf8', (err, data) => {
                /* istanbul ignore if */ if (err) {
                    return callback(err, name);
                }
                instrumenter.instrument(
                    data,
                    inputFile,
                    (iErr, instrumented) => {
                        if (iErr) {
                            return callback(iErr, name);
                        }
                        fs.writeFile(outputFile, instrumented, 'utf8', err =>
                            callback(err, name)
                        );
                    }
                );
            });
        } else {
            // non JavaScript file, copy it as is
            readStream = fs.createReadStream(inputFile, {
                bufferSize: READ_FILE_CHUNK_SIZE
            });
            writeStream = fs.createWriteStream(outputFile);

            readStream.on('error', callback);
            writeStream.on('error', callback);

            readStream.pipe(writeStream);
            readStream.on('end', () => {
                callback(null, name);
            });
        }
    };
    const q = async.queue(processor, 10);
    const errors = [];
    let count = 0;
    const startTime = new Date().getTime();

    q.push(relativeNames, (err, name) => {
        let inputFile;
        let outputFile;
        if (err) {
            errors.push({
                file: name,
                error: err.message || /* istanbul ignore next */ err.toString()
            });
            inputFile = path.resolve(inputDir, name);
            outputFile = path.resolve(outputDir, name);
            fs.writeFileSync(outputFile, fs.readFileSync(inputFile));
        }
        if (verbose) {
            console.error('Processed: ' + name);
        } else {
            if (count % 100 === 0) {
                process.stdout.write('.');
            }
        }
        count += 1;
    });

    q.drain = function() {
        const endTime = new Date().getTime();
        console.error(
            '\nProcessed [' +
                count +
                '] files in ' +
                Math.floor((endTime - startTime) / 1000) +
                ' secs'
        );
        if (errors.length > 0) {
            console.error(
                'The following ' +
                    errors.length +
                    ' file(s) had errors and were copied as-is'
            );
            console.error(errors);
        }
        return callback();
    };
}

function run(config, opts, callback) {
    opts = opts || {};
    const iOpts = config.instrumentation;
    const input = opts.input;
    const output = opts.output;
    const excludes = opts.excludes;
    let stream;
    let includes;
    let instrumenter;
    const origCallback = callback;
    const needBaseline = iOpts.saveBaseline();
    const baselineFile = path.resolve(iOpts.baselineFile());

    if (iOpts.completeCopy()) {
        includes = ['**/*'];
    } else {
        includes = iOpts.extensions().map(ext => '**/*' + ext);
    }

    if (!input) {
        return callback(new Error('No input specified'));
    }

    instrumenter = libInstrument.createInstrumenter(
        iOpts.getInstrumenterOpts()
    );

    if (needBaseline) {
        mkdirp.sync(path.dirname(baselineFile));
        instrumenter = new BaselineCollector(instrumenter);
        callback = function(err) {
            /* istanbul ignore else */
            if (!err) {
                console.error('Saving baseline coverage at ' + baselineFile);
                fs.writeFileSync(
                    baselineFile,
                    JSON.stringify(instrumenter.getCoverage()),
                    'utf8'
                );
            }
            return origCallback(err);
        };
    }

    const file = path.resolve(input);
    const stats = fs.statSync(file);
    if (stats.isDirectory()) {
        if (!output) {
            return callback(
                inputError.create(
                    'Need an output directory when input is a directory!'
                )
            );
        }
        if (output === file) {
            return callback(
                inputError.create(
                    'Cannot instrument into the same directory/ file as input!'
                )
            );
        }
        mkdirp.sync(output);
        filesFor(
            {
                root: file,
                includes,
                excludes: excludes || iOpts.excludes(false),
                relative: true
            },
            (err, files) => {
                /* istanbul ignore if */
                if (err) {
                    return callback(err);
                }
                processFiles(
                    instrumenter,
                    {
                        inputDir: file,
                        outputDir: output,
                        names: files,
                        extensions: iOpts.extensions(),
                        verbose: config.verbose
                    },
                    callback
                );
            }
        );
    } else {
        if (output) {
            stream = fs.createWriteStream(output);
        } else {
            stream = process.stdout;
        }
        stream.write(
            instrumenter.instrumentSync(fs.readFileSync(file, 'utf8'), file)
        );
        if (stream !== process.stdout) {
            stream.end();
        }
        return callback();
    }
}

exports_istanbuljs_istanbuljs_packages_istanbul_api_lib_run_instrument = {
    run
};



/*
file https://github.com/istanbuljs/istanbuljs/blob/istanbul-reports@2.2.5/packages/istanbul-api/lib/run-reports.js
*/
var exports_istanbuljs_istanbuljs_packages_istanbul_api_lib_run_reports = {};
/*
 Copyright 2012-2015, Yahoo Inc.
 Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
// const fs = require('fs');
// const libCoverage = require('istanbul-lib-coverage');
const Reporter = exports_istanbuljs_istanbuljs_packages_istanbul_api_lib_reporter;
const filesFor = exports_istanbuljs_istanbuljs_packages_istanbul_api_lib_file_matcher.filesFor;

function run(formats, config, opts, callback) {
    if (!callback && typeof opts === 'function') {
        callback = opts;
        opts = {};
    }
    opts = opts || {};
    const coverageMap = libCoverage.createCoverageMap();
    const includePattern = opts.include || '**/coverage*.raw.json';
    const reporter = new Reporter(config);

    if (!formats || formats.length === 0) {
        formats = config.reporting.reports();
    }
    try {
        reporter.addAll(formats);
    } catch (ex) {
        ex.inputError = true;
        return callback(ex);
    }

    const root = opts.root || process.cwd();
    filesFor(
        {
            root,
            includes: [includePattern]
        },
        (err, files) => {
            /* istanbul ignore if */
            if (err) {
                return callback(err);
            }
            files.forEach(file => {
                const coverageObject = JSON.parse(
                    fs.readFileSync(file, 'utf8')
                );
                coverageMap.merge(coverageObject);
            });
            reporter.write(coverageMap, {});
            return callback();
        }
    );
}

exports_istanbuljs_istanbuljs_packages_istanbul_api_lib_run_reports = {
    run
};



/*
file https://github.com/istanbuljs/istanbuljs/blob/istanbul-reports@2.2.5/packages/istanbul-api/package.json
*/
var exports_istanbuljs_istanbuljs_packages_istanbul_api_package_json = {};
{
  "name": "istanbul-api",
  "version": "2.1.7",
  "description": "High level API for istanbul features",
  "main": "index.js",
  "files": [
    "lib",
    "index.js"
  ],
  "scripts": {
    "fast": "mocha --slow 1000",
    "test": "mocha"
  },
  "repository": {
    "type": "git",
    "url": "git+ssh://git@github.com/istanbuljs/istanbuljs.git"
  },
  "keywords": [
    "istanbul",
    "api"
  ],
  "author": "Krishnan Anantheswaran <kananthmail-github@yahoo.com>",
  "license": "BSD-3-Clause",
  "bugs": {
    "url": "https://github.com/istanbuljs/istanbuljs/issues"
  },
  "homepage": "https://istanbul.js.org/",
  "dependencies": {
    "async": "^2.6.2",
    "compare-versions": "^3.4.0",
    "fileset": "^2.0.3",
    "istanbul-lib-coverage": "^2.0.5",
    "istanbul-lib-hook": "^2.0.7",
    "istanbul-lib-instrument": "^3.3.0",
    "istanbul-lib-report": "^2.0.8",
    "istanbul-lib-source-maps": "^3.0.6",
    "istanbul-reports": "^2.2.5",
    "js-yaml": "^3.13.1",
    "make-dir": "^2.1.0",
    "minimatch": "^3.0.4",
    "once": "^1.4.0"
  },
  "engines": {
    "node": ">=6"
  }
}



/*
file https://github.com/istanbuljs/istanbuljs/blob/istanbul-reports@2.2.5/packages/istanbul-lib-coverage/index.js
*/
var exports_istanbuljs_istanbuljs_packages_istanbul_lib_coverage_index = {};
/*
 Copyright 2012-2015, Yahoo Inc.
 Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
'use strict';

/**
 * istanbul-lib-coverage exports an API that allows you to create and manipulate
 * file coverage, coverage maps (a set of file coverage objects) and summary
 * coverage objects. File coverage for the same file can be merged as can
 * entire coverage maps.
 *
 * @module Exports
 */
const CoverageSummary = exports_istanbuljs_istanbuljs_packages_istanbul_lib_coverage_lib_file.CoverageSummary;
const FileCoverage = exports_istanbuljs_istanbuljs_packages_istanbul_lib_coverage_lib_file.FileCoverage;
const CoverageMap = exports_istanbuljs_istanbuljs_packages_istanbul_lib_coverage_lib_coverage_map.CoverageMap;

exports_istanbuljs_istanbuljs_packages_istanbul_lib_coverage_index = {
    /**
     * creates a coverage summary object
     * @param {Object} obj an argument with the same semantics
     *  as the one passed to the `CoverageSummary` constructor
     * @returns {CoverageSummary}
     */
    createCoverageSummary(obj) {
        if (obj && obj instanceof CoverageSummary) {
            return obj;
        }
        return new CoverageSummary(obj);
    },
    /**
     * creates a CoverageMap object
     * @param {Object} obj optional - an argument with the same semantics
     *  as the one passed to the CoverageMap constructor.
     * @returns {CoverageMap}
     */
    createCoverageMap(obj) {
        if (obj && obj instanceof CoverageMap) {
            return obj;
        }
        return new CoverageMap(obj);
    },
    /**
     * creates a FileCoverage object
     * @param {Object} obj optional - an argument with the same semantics
     *  as the one passed to the FileCoverage constructor.
     * @returns {FileCoverage}
     */
    createFileCoverage(obj) {
        if (obj && obj instanceof FileCoverage) {
            return obj;
        }
        return new FileCoverage(obj);
    }
};

/** classes exported for reuse */
exports_istanbuljs_istanbuljs_packages_istanbul_lib_coverage_index.classes = {
    /**
     * the file coverage constructor
     */
    FileCoverage
};



/*
file https://github.com/istanbuljs/istanbuljs/blob/istanbul-reports@2.2.5/packages/istanbul-lib-coverage/lib/coverage-map.js
*/
var exports_istanbuljs_istanbuljs_packages_istanbul_lib_coverage_lib_coverage_map = {};
/*
 Copyright 2012-2015, Yahoo Inc.
 Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
'use strict';

const FileCoverage = exports_istanbuljs_istanbuljs_packages_istanbul_lib_coverage_lib_file.FileCoverage;
const CoverageSummary = exports_istanbuljs_istanbuljs_packages_istanbul_lib_coverage_lib_file.CoverageSummary;

function loadMap(source) {
    const data = Object.create(null);
    Object.keys(source).forEach(k => {
        const cov = source[k];
        if (cov instanceof FileCoverage) {
            data[k] = cov;
        } else {
            data[k] = new FileCoverage(cov);
        }
    });
    return data;
}
/**
 * CoverageMap is a map of `FileCoverage` objects keyed by file paths.
 * @param {Object} [obj=undefined] obj A coverage map from which to initialize this
 * map's contents. This can be the raw global coverage object.
 * @constructor
 */
function CoverageMap(obj) {
    if (!obj) {
        this.data = Object.create(null);
    } else if (obj instanceof CoverageMap) {
        this.data = obj.data;
    } else {
        this.data = loadMap(obj);
    }
}
/**
 * merges a second coverage map into this one
 * @param {CoverageMap} obj - a CoverageMap or its raw data. Coverage is merged
 *  correctly for the same files and additional file coverage keys are created
 *  as needed.
 */
CoverageMap.prototype.merge = function(obj) {
    let other;
    if (obj instanceof CoverageMap) {
        other = obj;
    } else {
        other = new CoverageMap(obj);
    }
    Object.keys(other.data).forEach(k => {
        const fc = other.data[k];
        if (this.data[k]) {
            this.data[k].merge(fc);
        } else {
            this.data[k] = fc;
        }
    });
};
/**
 * filter the coveragemap based on the callback provided
 * @param {Function (filename)} callback - Returns true if the path
 *  should be included in the coveragemap. False if it should be
 *  removed.
 */
CoverageMap.prototype.filter = function(callback) {
    Object.keys(this.data).forEach(k => {
        if (!callback(k)) {
            delete this.data[k];
        }
    });
};
/**
 * returns a JSON-serializable POJO for this coverage map
 * @returns {Object}
 */
CoverageMap.prototype.toJSON = function() {
    return this.data;
};
/**
 * returns an array for file paths for which this map has coverage
 * @returns {Array{string}} - array of files
 */
CoverageMap.prototype.files = function() {
    return Object.keys(this.data);
};
/**
 * returns the file coverage for the specified file.
 * @param {String} file
 * @returns {FileCoverage}
 */
CoverageMap.prototype.fileCoverageFor = function(file) {
    const fc = this.data[file];
    if (!fc) {
        throw new Error('No file coverage available for: ' + file);
    }
    return fc;
};
/**
 * adds a file coverage object to this map. If the path for the object,
 * already exists in the map, it is merged with the existing coverage
 * otherwise a new key is added to the map.
 * @param {FileCoverage} fc the file coverage to add
 */
CoverageMap.prototype.addFileCoverage = function(fc) {
    const cov = new FileCoverage(fc);
    const path = cov.path;
    if (this.data[path]) {
        this.data[path].merge(cov);
    } else {
        this.data[path] = cov;
    }
};
/**
 * returns the coverage summary for all the file coverage objects in this map.
 * @returns {CoverageSummary}
 */
CoverageMap.prototype.getCoverageSummary = function() {
    const ret = new CoverageSummary();
    this.files().forEach(key => {
        ret.merge(this.fileCoverageFor(key).toSummary());
    });
    return ret;
};

exports_istanbuljs_istanbuljs_packages_istanbul_lib_coverage_lib_coverage_map = {
    CoverageMap
};



/*
file https://github.com/istanbuljs/istanbuljs/blob/istanbul-reports@2.2.5/packages/istanbul-lib-coverage/lib/file.js
*/
var exports_istanbuljs_istanbuljs_packages_istanbul_lib_coverage_lib_file = {};
/*
 Copyright 2012-2015, Yahoo Inc.
 Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
'use strict';

function percent(covered, total) {
    let tmp;
    if (total > 0) {
        tmp = (1000 * 100 * covered) / total + 5;
        return Math.floor(tmp / 10) / 100;
    } else {
        return 100.0;
    }
}

function blankSummary() {
    const empty = function() {
        return {
            total: 0,
            covered: 0,
            skipped: 0,
            pct: 'Unknown'
        };
    };
    return {
        lines: empty(),
        statements: empty(),
        functions: empty(),
        branches: empty()
    };
}

// asserts that a data object "looks like" a summary coverage object
function assertValidSummary(obj) {
    const valid =
        obj && obj.lines && obj.statements && obj.functions && obj.branches;
    if (!valid) {
        throw new Error(
            'Invalid summary coverage object, missing keys, found:' +
                Object.keys(obj).join(',')
        );
    }
}
/**
 * CoverageSummary provides a summary of code coverage . It exposes 4 properties,
 * `lines`, `statements`, `branches`, and `functions`. Each of these properties
 * is an object that has 4 keys `total`, `covered`, `skipped` and `pct`.
 * `pct` is a percentage number (0-100).
 * @param {Object|CoverageSummary} [obj=undefined] an optional data object or
 * another coverage summary to initialize this object with.
 * @constructor
 */
function CoverageSummary(obj) {
    if (!obj) {
        this.data = blankSummary();
    } else if (obj instanceof CoverageSummary) {
        this.data = obj.data;
    } else {
        this.data = obj;
    }
    assertValidSummary(this.data);
}

['lines', 'statements', 'functions', 'branches'].forEach(p => {
    Object.defineProperty(CoverageSummary.prototype, p, {
        enumerable: true,
        get() {
            return this.data[p];
        }
    });
});

/**
 * merges a second summary coverage object into this one
 * @param {CoverageSummary} obj - another coverage summary object
 */
CoverageSummary.prototype.merge = function(obj) {
    const keys = ['lines', 'statements', 'branches', 'functions'];
    keys.forEach(key => {
        this[key].total += obj[key].total;
        this[key].covered += obj[key].covered;
        this[key].skipped += obj[key].skipped;
        this[key].pct = percent(this[key].covered, this[key].total);
    });
    return this;
};

/**
 * returns a POJO that is JSON serializable. May be used to get the raw
 * summary object.
 */
CoverageSummary.prototype.toJSON = function() {
    return this.data;
};

/**
 * return true if summary has no lines of code
 */
CoverageSummary.prototype.isEmpty = function() {
    return this.lines.total === 0;
};

// returns a data object that represents empty coverage
function emptyCoverage(filePath) {
    return {
        path: filePath,
        statementMap: {},
        fnMap: {},
        branchMap: {},
        s: {},
        f: {},
        b: {}
    };
}
// asserts that a data object "looks like" a coverage object
function assertValidObject(obj) {
    const valid =
        obj &&
        obj.path &&
        obj.statementMap &&
        obj.fnMap &&
        obj.branchMap &&
        obj.s &&
        obj.f &&
        obj.b;
    if (!valid) {
        throw new Error(
            'Invalid file coverage object, missing keys, found:' +
                Object.keys(obj).join(',')
        );
    }
}
/**
 * provides a read-only view of coverage for a single file.
 * The deep structure of this object is documented elsewhere. It has the following
 * properties:
 *
 * * `path` - the file path for which coverage is being tracked
 * * `statementMap` - map of statement locations keyed by statement index
 * * `fnMap` - map of function metadata keyed by function index
 * * `branchMap` - map of branch metadata keyed by branch index
 * * `s` - hit counts for statements
 * * `f` - hit count for functions
 * * `b` - hit count for branches
 *
 * @param {Object|FileCoverage|String} pathOrObj is a string that initializes
 * and empty coverage object with the specified file path or a data object that
 * has all the required properties for a file coverage object.
 * @constructor
 */
function FileCoverage(pathOrObj) {
    if (!pathOrObj) {
        throw new Error(
            'Coverage must be initialized with a path or an object'
        );
    }
    if (typeof pathOrObj === 'string') {
        this.data = emptyCoverage(pathOrObj);
    } else if (pathOrObj instanceof FileCoverage) {
        this.data = pathOrObj.data;
    } else if (typeof pathOrObj === 'object') {
        this.data = pathOrObj;
    } else {
        throw new Error('Invalid argument to coverage constructor');
    }
    assertValidObject(this.data);
}
/**
 * returns computed line coverage from statement coverage.
 * This is a map of hits keyed by line number in the source.
 */
FileCoverage.prototype.getLineCoverage = function() {
    const statementMap = this.data.statementMap;
    const statements = this.data.s;
    const lineMap = Object.create(null);

    Object.keys(statements).forEach(st => {
        if (!statementMap[st]) {
            return;
        }
        const line = statementMap[st].start.line;
        const count = statements[st];
        const prevVal = lineMap[line];
        if (prevVal === undefined || prevVal < count) {
            lineMap[line] = count;
        }
    });
    return lineMap;
};
/**
 * returns an array of uncovered line numbers.
 * @returns {Array} an array of line numbers for which no hits have been
 *  collected.
 */
FileCoverage.prototype.getUncoveredLines = function() {
    const lc = this.getLineCoverage();
    const ret = [];
    Object.keys(lc).forEach(l => {
        const hits = lc[l];
        if (hits === 0) {
            ret.push(l);
        }
    });
    return ret;
};
/**
 * returns a map of branch coverage by source line number.
 * @returns {Object} an object keyed by line number. Each object
 * has a `covered`, `total` and `coverage` (percentage) property.
 */
FileCoverage.prototype.getBranchCoverageByLine = function() {
    const branchMap = this.branchMap;
    const branches = this.b;
    const ret = {};
    Object.keys(branchMap).forEach(k => {
        const line = branchMap[k].line || branchMap[k].loc.start.line;
        const branchData = branches[k];
        ret[line] = ret[line] || [];
        ret[line].push(...branchData);
    });
    Object.keys(ret).forEach(k => {
        const dataArray = ret[k];
        const covered = dataArray.filter(item => item > 0);
        const coverage = (covered.length / dataArray.length) * 100;
        ret[k] = {
            covered: covered.length,
            total: dataArray.length,
            coverage
        };
    });
    return ret;
};

// expose coverage data attributes
['path', 'statementMap', 'fnMap', 'branchMap', 's', 'f', 'b'].forEach(p => {
    Object.defineProperty(FileCoverage.prototype, p, {
        enumerable: true,
        get() {
            return this.data[p];
        }
    });
});
/**
 * return a JSON-serializable POJO for this file coverage object
 */
FileCoverage.prototype.toJSON = function() {
    return this.data;
};
/**
 * merges a second coverage object into this one, updating hit counts
 * @param {FileCoverage} other - the coverage object to be merged into this one.
 *  Note that the other object should have the same structure as this one (same file).
 */
FileCoverage.prototype.merge = function(other) {
    Object.keys(other.s).forEach(k => {
        this.data.s[k] += other.s[k];
    });
    Object.keys(other.f).forEach(k => {
        this.data.f[k] += other.f[k];
    });
    Object.keys(other.b).forEach(k => {
        let i;
        const retArray = this.data.b[k];
        const secondArray = other.b[k];
        if (!retArray) {
            this.data.b[k] = secondArray;
            return;
        }
        for (i = 0; i < retArray.length; i += 1) {
            retArray[i] += secondArray[i];
        }
    });
};

FileCoverage.prototype.computeSimpleTotals = function(property) {
    let stats = this[property];
    const ret = { total: 0, covered: 0, skipped: 0 };

    if (typeof stats === 'function') {
        stats = stats.call(this);
    }
    Object.keys(stats).forEach(key => {
        const covered = !!stats[key];
        ret.total += 1;
        if (covered) {
            ret.covered += 1;
        }
    });
    ret.pct = percent(ret.covered, ret.total);
    return ret;
};

FileCoverage.prototype.computeBranchTotals = function() {
    const stats = this.b;
    const ret = { total: 0, covered: 0, skipped: 0 };

    Object.keys(stats).forEach(key => {
        const branches = stats[key];
        let covered;
        branches.forEach(branchHits => {
            covered = branchHits > 0;
            if (covered) {
                ret.covered += 1;
            }
        });
        ret.total += branches.length;
    });
    ret.pct = percent(ret.covered, ret.total);
    return ret;
};
/**
 * resets hit counts for all statements, functions and branches
 * in this coverage object resulting in zero coverage.
 */
FileCoverage.prototype.resetHits = function() {
    const statements = this.s;
    const functions = this.f;
    const branches = this.b;
    Object.keys(statements).forEach(s => {
        statements[s] = 0;
    });
    Object.keys(functions).forEach(f => {
        functions[f] = 0;
    });
    Object.keys(branches).forEach(b => {
        const hits = branches[b];
        branches[b] = hits.map(() => 0);
    });
};

/**
 * returns a CoverageSummary for this file coverage object
 * @returns {CoverageSummary}
 */
FileCoverage.prototype.toSummary = function() {
    const ret = {};
    ret.lines = this.computeSimpleTotals('getLineCoverage');
    ret.functions = this.computeSimpleTotals('f', 'fnMap');
    ret.statements = this.computeSimpleTotals('s', 'statementMap');
    ret.branches = this.computeBranchTotals();
    return new CoverageSummary(ret);
};

exports_istanbuljs_istanbuljs_packages_istanbul_lib_coverage_lib_file = {
    CoverageSummary,
    FileCoverage
};



/*
file https://github.com/istanbuljs/istanbuljs/blob/istanbul-reports@2.2.5/packages/istanbul-lib-coverage/package.json
*/
var exports_istanbuljs_istanbuljs_packages_istanbul_lib_coverage_package_json = {};
{
  "name": "istanbul-lib-coverage",
  "version": "2.0.5",
  "description": "Data library for istanbul coverage objects",
  "author": "Krishnan Anantheswaran <kananthmail-github@yahoo.com>",
  "main": "index.js",
  "files": [
    "lib",
    "index.js"
  ],
  "scripts": {
    "test": "mocha"
  },
  "karmaDeps": {
    "browserify-istanbul": "^0.2.1",
    "karma": "^0.13.10",
    "karma-browserify": "^4.2.1",
    "karma-chrome-launcher": "^0.2.0",
    "karma-coverage": "^0.4.2",
    "karma-mocha": "^0.2.0",
    "karma-phantomjs-launcher": "^0.2.0",
    "phantomjs": "^1.9.17"
  },
  "repository": {
    "type": "git",
    "url": "git@github.com:istanbuljs/istanbuljs.git"
  },
  "keywords": [
    "istanbul",
    "coverage",
    "data"
  ],
  "license": "BSD-3-Clause",
  "bugs": {
    "url": "https://github.com/istanbuljs/istanbuljs/issues"
  },
  "homepage": "https://istanbul.js.org/",
  "engines": {
    "node": ">=6"
  }
}



/*
file https://github.com/istanbuljs/istanbuljs/blob/istanbul-reports@2.2.5/packages/istanbul-lib-hook/index.js
*/
var exports_istanbuljs_istanbuljs_packages_istanbul_lib_hook_index = {};
/*
 Copyright 2012-2015, Yahoo Inc.
 Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
exports_istanbuljs_istanbuljs_packages_istanbul_lib_hook_index = exports_istanbuljs_istanbuljs_packages_istanbul_lib_hook_lib_hook;



/*
file https://github.com/istanbuljs/istanbuljs/blob/istanbul-reports@2.2.5/packages/istanbul-lib-hook/lib/hook.js
*/
var exports_istanbuljs_istanbuljs_packages_istanbul_lib_hook_lib_hook = {};
/*
 Copyright 2012-2015, Yahoo Inc.
 Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
// const path = require('path');
// const vm = require('vm');
// const appendTransform = require('append-transform');
const originalCreateScript = vm.createScript;
const originalRunInThisContext = vm.runInThisContext;
const originalRunInContext = vm.runInContext;

function transformFn(matcher, transformer, verbose) {
    return function(code, options) {
        options = options || {};

        // prior to 2.x, hookRequire returned filename
        // rather than object.
        if (typeof options === 'string') {
            options = { filename: options };
        }

        const shouldHook =
            typeof options.filename === 'string' &&
            matcher(path.resolve(options.filename));
        let transformed;
        let changed = false;

        if (shouldHook) {
            if (verbose) {
                console.error(
                    'Module load hook: transform [' + options.filename + ']'
                );
            }
            try {
                transformed = transformer(code, options);
                changed = true;
            } catch (ex) {
                console.error(
                    'Transformation error for',
                    options.filename,
                    '; return original code'
                );
                console.error(ex.message || String(ex));
                if (verbose) {
                    console.error(ex.stack);
                }
                transformed = code;
            }
        } else {
            transformed = code;
        }
        return { code: transformed, changed };
    };
}
/**
 * unloads the required caches, removing all files that would have matched
 * the supplied matcher.
 * @param {Function} matcher - the match function that accepts a file name and
 *  returns if that file should be unloaded from the cache.
 */
function unloadRequireCache(matcher) {
    /* istanbul ignore else: impossible to test */
    if (matcher && typeof require !== 'undefined' && require && require.cache) {
        Object.keys(require.cache).forEach(filename => {
            if (matcher(filename)) {
                delete require.cache[filename];
            }
        });
    }
}
/**
 * hooks `require` to return transformed code to the node module loader.
 * Exceptions in the transform result in the original code being used instead.
 * @method hookRequire
 * @static
 * @param matcher {Function(filePath)} a function that is called with the absolute path to the file being
 *  `require`-d. Should return a truthy value when transformations need to be applied to the code, a falsy value otherwise
 * @param transformer {Function(code, filePath)} a function called with the original code and the associated path of the file
 *  from where the code was loaded. Should return the transformed code.
 * @param options {Object} options Optional.
 * @param {Boolean} [options.verbose] write a line to standard error every time the transformer is called
 * @param {Function} [options.postLoadHook] a function that is called with the name of the file being
 *  required. This is called after the require is processed irrespective of whether it was transformed.
 * @returns {Function} a reset function that can be called to remove the hook
 */
function hookRequire(matcher, transformer, options) {
    options = options || {};
    let disable = false;
    const fn = transformFn(matcher, transformer, options.verbose);
    const postLoadHook =
        options.postLoadHook && typeof options.postLoadHook === 'function'
            ? options.postLoadHook
            : null;

    const extensions = options.extensions || ['.js'];

    extensions.forEach(ext => {
        appendTransform((code, filename) => {
            if (disable) {
                return code;
            }
            const ret = fn(code, filename);
            if (postLoadHook) {
                postLoadHook(filename);
            }
            return ret.code;
        }, ext);
    });

    return function() {
        disable = true;
    };
}
/**
 * hooks `vm.createScript` to return transformed code out of which a `Script` object will be created.
 * Exceptions in the transform result in the original code being used instead.
 * @method hookCreateScript
 * @static
 * @param matcher {Function(filePath)} a function that is called with the filename passed to `vm.createScript`
 *  Should return a truthy value when transformations need to be applied to the code, a falsy value otherwise
 * @param transformer {Function(code, filePath)} a function called with the original code and the filename passed to
 *  `vm.createScript`. Should return the transformed code.
 * @param options {Object} options Optional.
 * @param {Boolean} [options.verbose] write a line to standard error every time the transformer is called
 */
function hookCreateScript(matcher, transformer, opts) {
    opts = opts || {};
    const fn = transformFn(matcher, transformer, opts.verbose);
    vm.createScript = function(code, file) {
        const ret = fn(code, file);
        return originalCreateScript(ret.code, file);
    };
}
/**
 * unhooks vm.createScript, restoring it to its original state.
 * @method unhookCreateScript
 * @static
 */
function unhookCreateScript() {
    vm.createScript = originalCreateScript;
}
/**
 * hooks `vm.runInThisContext` to return transformed code.
 * @method hookRunInThisContext
 * @static
 * @param matcher {Function(filePath)} a function that is called with the filename passed to `vm.runInThisContext`
 *  Should return a truthy value when transformations need to be applied to the code, a falsy value otherwise
 * @param transformer {Function(code, options)} a function called with the original code and the filename passed to
 *  `vm.runInThisContext`. Should return the transformed code.
 * @param opts {Object} [opts={}] options
 * @param {Boolean} [opts.verbose] write a line to standard error every time the transformer is called
 */
function hookRunInThisContext(matcher, transformer, opts) {
    opts = opts || {};
    const fn = transformFn(matcher, transformer, opts.verbose);
    vm.runInThisContext = function(code, options) {
        const ret = fn(code, options);
        return originalRunInThisContext(ret.code, options);
    };
}
/**
 * unhooks vm.runInThisContext, restoring it to its original state.
 * @method unhookRunInThisContext
 * @static
 */
function unhookRunInThisContext() {
    vm.runInThisContext = originalRunInThisContext;
}
/**
 * hooks `vm.runInContext` to return transformed code.
 * @method hookRunInContext
 * @static
 * @param matcher {Function(filePath)} a function that is called with the filename passed to `vm.createScript`
 *  Should return a truthy value when transformations need to be applied to the code, a falsy value otherwise
 * @param transformer {Function(code, filePath)} a function called with the original code and the filename passed to
 *  `vm.createScript`. Should return the transformed code.
 * @param opts {Object} [opts={}] options
 * @param {Boolean} [options.verbose] write a line to standard error every time the transformer is called
 */
function hookRunInContext(matcher, transformer, opts) {
    opts = opts || {};
    const fn = transformFn(matcher, transformer, opts.verbose);
    vm.runInContext = function(code, context, file) {
        const ret = fn(code, file);
        const coverageVariable = opts.coverageVariable || '__coverage__';
        // Refer coverage variable in context to global coverage variable.
        // So that coverage data will be written in global coverage variable for unit tests run in vm.runInContext.
        // If all unit tests are run in vm.runInContext, no global coverage variable will be generated.
        // Thus initialize a global coverage variable here.
        if (!global[coverageVariable]) {
            global[coverageVariable] = {};
        }
        context[coverageVariable] = global[coverageVariable];
        return originalRunInContext(ret.code, context, file);
    };
}
/**
 * unhooks vm.runInContext, restoring it to its original state.
 * @method unhookRunInContext
 * @static
 */
function unhookRunInContext() {
    vm.runInContext = originalRunInContext;
}
/**
 * istanbul-lib-hook provides mechanisms to transform code in the scope of `require`,
 * `vm.createScript`, `vm.runInThisContext` etc.
 *
 * This mechanism is general and relies on a user-supplied `matcher` function that
 * determines when transformations should be performed and a user-supplied `transformer`
 * function that performs the actual transform. Instrumenting code for coverage is
 * one specific example of useful hooking.
 *
 * Note that both the `matcher` and `transformer` must execute synchronously.
 *
 * @module Exports
 * @example
 * var hook = require('istanbul-lib-hook'),
 *     myMatcher = function (file) { return file.match(/foo/); },
 *     myTransformer = function (code, file) {
 *         return 'console.log("' + file + '");' + code;
 *     };
 *
 * hook.hookRequire(myMatcher, myTransformer);
 * var foo = require('foo'); //will now print foo's module path to console
 */
exports_istanbuljs_istanbuljs_packages_istanbul_lib_hook_lib_hook = {
    hookRequire,
    hookCreateScript,
    unhookCreateScript,
    hookRunInThisContext,
    unhookRunInThisContext,
    hookRunInContext,
    unhookRunInContext,
    unloadRequireCache
};



/*
file https://github.com/istanbuljs/istanbuljs/blob/istanbul-reports@2.2.5/packages/istanbul-lib-hook/package.json
*/
var exports_istanbuljs_istanbuljs_packages_istanbul_lib_hook_package_json = {};
{
  "name": "istanbul-lib-hook",
  "version": "2.0.7",
  "description": "Hooks for require, vm and script used in istanbul",
  "author": "Krishnan Anantheswaran <kananthmail-github@yahoo.com>",
  "main": "index.js",
  "files": [
    "lib",
    "index.js"
  ],
  "scripts": {
    "test": "mocha"
  },
  "dependencies": {
    "append-transform": "^1.0.0"
  },
  "repository": {
    "type": "git",
    "url": "git+ssh://git@github.com/istanbuljs/istanbuljs.git"
  },
  "keywords": [
    "istanbul",
    "hook"
  ],
  "license": "BSD-3-Clause",
  "bugs": {
    "url": "https://github.com/istanbuljs/istanbuljs/issues"
  },
  "homepage": "https://istanbul.js.org/",
  "engines": {
    "node": ">=6"
  }
}



/*
file https://github.com/istanbuljs/istanbuljs/blob/istanbul-reports@2.2.5/packages/istanbul-lib-instrument/babel.config.js
*/
var exports_istanbuljs_istanbuljs_packages_istanbul_lib_instrument_babel_config = {};
'use strict';

/* This is used by babel 7 only, .babelrc is used by babel 6 allowing us to deal with
 * conflicting 'env' preset between build and documentation. */
exports_istanbuljs_istanbuljs_packages_istanbul_lib_instrument_babel_config = {
    babelrc: false,
    presets: [
        [
            '@babel/env',
            {
                targets: {
                    node: '6'
                }
            }
        ]
    ]
};



/*
file https://github.com/istanbuljs/istanbuljs/blob/istanbul-reports@2.2.5/packages/istanbul-lib-instrument/bin/test-render-perf.js
*/
var exports_istanbuljs_istanbuljs_packages_istanbul_lib_instrument_bin_test_render_perf = {};
import template from '@babel/template';
import generate from '@babel/generator';
import * as T from '@babel/types';

const assignTemplate = template(`
    var VAR = DATA;
`);

// create a program that initializes a variable of the form
// var foo = { s0: { start: { line: 0, column: 0}, end: {line 1, column:0} }
// etc. where the number of keys is controlled by the items arg
function toProgram(items) {
    const obj = {};
    for (let i = 0; i < items; i += 1) {
        const key = 's' + i;
        obj[key] = {
            start: { line: i, column: 0 },
            end: { line: i + 1, column: 20 }
        };
    }
    const node = T.valueToNode(obj);
    const v = assignTemplate({
        VAR: T.identifier('foo'),
        DATA: node
    });
    return {
        type: 'File',
        program: { type: 'Program', sourceType: 'script', body: [v] }
    };
}

// const nopt = require('nopt');
const opts = {
    compact: Boolean
};
const parsed = nopt(opts, null, process.argv, 2);
const compact = parsed.compact;

const generateOptions = {
    compact
};

for (let i = 1; i < 15; i += 1) {
    const n = Math.pow(2, i);
    const prog = toProgram(n);
    const start = new Date().getTime();
    const codeMap = generate(prog, generateOptions, '');
    const end = new Date().getTime();
    if (i == 1) {
        console.log('Sample prog:', codeMap.code);
    }
    console.log('Items:', n, ', time:', end - start);
}



/*
file https://github.com/istanbuljs/istanbuljs/blob/istanbul-reports@2.2.5/packages/istanbul-lib-instrument/package.json
*/
var exports_istanbuljs_istanbuljs_packages_istanbul_lib_instrument_package_json = {};
{
  "name": "istanbul-lib-instrument",
  "version": "3.3.0",
  "description": "Core istanbul API for JS code coverage",
  "author": "Krishnan Anantheswaran <kananthmail-github@yahoo.com>",
  "main": "dist/index.js",
  "files": [
    "dist"
  ],
  "scripts": {
    "release": "babel src --out-dir dist && documentation build -f md -o api.md src",
    "test": "mocha --require=@babel/register",
    "prepublish": "npm run release"
  },
  "dependencies": {
    "@babel/generator": "^7.4.0",
    "@babel/parser": "^7.4.3",
    "@babel/template": "^7.4.0",
    "@babel/traverse": "^7.4.3",
    "@babel/types": "^7.4.0",
    "istanbul-lib-coverage": "^2.0.5",
    "semver": "^6.0.0"
  },
  "license": "BSD-3-Clause",
  "bugs": {
    "url": "https://github.com/istanbuljs/istanbuljs/issues"
  },
  "homepage": "https://istanbul.js.org/",
  "repository": {
    "type": "git",
    "url": "git@github.com:istanbuljs/istanbuljs.git"
  },
  "keywords": [
    "coverage",
    "istanbul",
    "js",
    "instrumentation"
  ],
  "engines": {
    "node": ">=6"
  }
}



/*
file https://github.com/istanbuljs/istanbuljs/blob/istanbul-reports@2.2.5/packages/istanbul-lib-instrument/src/constants.js
*/
var exports_istanbuljs_istanbuljs_packages_istanbul_lib_instrument_src_constants = {};
import { createHash } from 'crypto';
import { major } from 'semver';
import { name, version } from '../package.json';

// function to use for creating hashes
export const SHA = 'sha1';
// name of coverage data magic key
export const MAGIC_KEY = '_coverageSchema';
// name of coverage data magic value
export const MAGIC_VALUE = createHash(SHA)
    .update(name + '@' + major(version))
    .digest('hex');



/*
file https://github.com/istanbuljs/istanbuljs/blob/istanbul-reports@2.2.5/packages/istanbul-lib-instrument/src/index.js
*/
var exports_istanbuljs_istanbuljs_packages_istanbul_lib_instrument_src_index = {};
import Instrumenter, { defaultOpts } from './instrumenter';
import programVisitor from './visitor';
import readInitialCoverage from './read-coverage';

/**
 * createInstrumenter creates a new instrumenter with the
 * supplied options.
 * @param {Object} opts - instrumenter options. See the documentation
 * for the Instrumenter class.
 */
function createInstrumenter(opts) {
    return new Instrumenter(opts);
}

export { createInstrumenter };
export { programVisitor };
export { readInitialCoverage };
export { defaultOpts };



/*
file https://github.com/istanbuljs/istanbuljs/blob/istanbul-reports@2.2.5/packages/istanbul-lib-instrument/src/instrumenter.js
*/
var exports_istanbuljs_istanbuljs_packages_istanbul_lib_instrument_src_instrumenter = {};
/*
 Copyright 2012-2015, Yahoo Inc.
 Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
import * as parser from '@babel/parser';
import * as t from '@babel/types';
import traverse from '@babel/traverse';
import generate from '@babel/generator';
import programVisitor from './visitor';

export function defaultOpts() {
    return {
        coverageVariable: '__coverage__',
        coverageGlobalScope: 'this',
        coverageGlobalScopeFunc: true,
        preserveComments: false,
        compact: true,
        esModules: false,
        autoWrap: false,
        produceSourceMap: false,
        ignoreClassMethods: [],
        sourceMapUrlCallback: null,
        debug: false,
        /* babel parser plugins are to be enabled when the feature is stage 3 and
         * implemented in a released version of node.js */
        plugins: [
            'asyncGenerators',
            'bigInt',
            'classProperties',
            'classPrivateProperties',
            'dynamicImport',
            'importMeta',
            'objectRestSpread',
            'optionalCatchBinding',
            'flow',
            'jsx'
        ]
    };
}
/**
 * Instrumenter is the public API for the instrument library.
 * It is typically used for ES5 code. For ES6 code that you
 * are already running under `babel` use the coverage plugin
 * instead.
 * @param {Object} opts optional.
 * @param {string} [opts.coverageVariable=__coverage__] name of global coverage variable.
 * @param {boolean} [opts.preserveComments=false] preserve comments in output
 * @param {boolean} [opts.compact=true] generate compact code.
 * @param {boolean} [opts.esModules=false] set to true to instrument ES6 modules.
 * @param {boolean} [opts.autoWrap=false] set to true to allow `return` statements outside of functions.
 * @param {boolean} [opts.produceSourceMap=false] set to true to produce a source map for the instrumented code.
 * @param {Array} [opts.ignoreClassMethods=[]] set to array of class method names to ignore for coverage.
 * @param {Function} [opts.sourceMapUrlCallback=null] a callback function that is called when a source map URL
 *     is found in the original code. This function is called with the source file name and the source map URL.
 * @param {boolean} [opts.debug=false] - turn debugging on
 * @param {array} [opts.plugins=['asyncGenerators','dynamicImport','objectRestSpread','optionalCatchBinding','flow','jsx']] - set plugins
 */
class Instrumenter {
    constructor(opts = defaultOpts()) {
        this.opts = this.normalizeOpts(opts);
        this.fileCoverage = null;
        this.sourceMap = null;
    }
    /**
     * normalize options passed in and assign defaults.
     * @param opts
     * @private
     */
    normalizeOpts(opts) {
        const normalize = (name, defaultValue) => {
            if (!opts.hasOwnProperty(name)) {
                opts[name] = defaultValue;
            }
        };
        const defOpts = defaultOpts();
        Object.keys(defOpts).forEach(k => {
            normalize(k, defOpts[k]);
        });
        return opts;
    }
    /**
     * instrument the supplied code and track coverage against the supplied
     * filename. It throws if invalid code is passed to it. ES5 and ES6 syntax
     * is supported. To instrument ES6 modules, make sure that you set the
     * `esModules` property to `true` when creating the instrumenter.
     *
     * @param {string} code - the code to instrument
     * @param {string} filename - the filename against which to track coverage.
     * @param {object} [inputSourceMap] - the source map that maps the not instrumented code back to it's original form.
     * Is assigned to the coverage object and therefore, is available in the json output and can be used to remap the
     * coverage to the untranspiled source.
     * @returns {string} the instrumented code.
     */
    instrumentSync(code, filename, inputSourceMap) {
        if (typeof code !== 'string') {
            throw new Error('Code must be a string');
        }
        filename = filename || String(new Date().getTime()) + '.js';
        const opts = this.opts;
        const ast = parser.parse(code, {
            allowReturnOutsideFunction: opts.autoWrap,
            sourceType: opts.esModules ? 'module' : 'script',
            plugins: opts.plugins
        });
        const ee = programVisitor(t, filename, {
            coverageVariable: opts.coverageVariable,
            coverageGlobalScope: opts.coverageGlobalScope,
            coverageGlobalScopeFunc: opts.coverageGlobalScopeFunc,
            ignoreClassMethods: opts.ignoreClassMethods,
            inputSourceMap
        });
        let output = {};
        const visitor = {
            Program: {
                enter: ee.enter,
                exit(path) {
                    output = ee.exit(path);
                }
            }
        };
        traverse(ast, visitor);

        const generateOptions = {
            compact: opts.compact,
            comments: opts.preserveComments,
            sourceMaps: opts.produceSourceMap,
            sourceFileName: filename
        };
        const codeMap = generate(ast, generateOptions, code);
        this.fileCoverage = output.fileCoverage;
        this.sourceMap = codeMap.map;
        const cb = this.opts.sourceMapUrlCallback;
        if (cb && output.sourceMappingURL) {
            cb(filename, output.sourceMappingURL);
        }
        return codeMap.code;
    }
    /**
     * callback-style instrument method that calls back with an error
     * as opposed to throwing one. Note that in the current implementation,
     * the callback will be called in the same process tick and is not asynchronous.
     *
     * @param {string} code - the code to instrument
     * @param {string} filename - the filename against which to track coverage.
     * @param {Function} callback - the callback
     * @param {Object} inputSourceMap - the source map that maps the not instrumented code back to it's original form.
     * Is assigned to the coverage object and therefore, is available in the json output and can be used to remap the
     * coverage to the untranspiled source.
     */
    instrument(code, filename, callback, inputSourceMap) {
        if (!callback && typeof filename === 'function') {
            callback = filename;
            filename = null;
        }
        try {
            const out = this.instrumentSync(code, filename, inputSourceMap);
            callback(null, out);
        } catch (ex) {
            callback(ex);
        }
    }
    /**
     * returns the file coverage object for the last file instrumented.
     * @returns {Object} the file coverage object.
     */
    lastFileCoverage() {
        return this.fileCoverage;
    }
    /**
     * returns the source map produced for the last file instrumented.
     * @returns {null|Object} the source map object.
     */
    lastSourceMap() {
        return this.sourceMap;
    }
}

export default Instrumenter;



/*
file https://github.com/istanbuljs/istanbuljs/blob/istanbul-reports@2.2.5/packages/istanbul-lib-instrument/src/read-coverage.js
*/
var exports_istanbuljs_istanbuljs_packages_istanbul_lib_instrument_src_read_coverage = {};
import { parse } from '@babel/parser';
import traverse from '@babel/traverse';
import * as t from '@babel/types';
import { MAGIC_KEY, MAGIC_VALUE } from './constants';
import { defaultOpts } from './instrumenter';

export default function readInitialCoverage(code) {
    if (typeof code !== 'string') {
        throw new Error('Code must be a string');
    }

    // Parse as leniently as possible
    const ast = parse(code, {
        allowImportExportEverywhere: true,
        allowReturnOutsideFunction: true,
        allowSuperOutsideMethod: true,
        sourceType: 'script',
        plugins: defaultOpts().plugins
    });

    let covScope;
    traverse(ast, {
        ObjectProperty(path) {
            const { node } = path;
            if (
                !node.computed &&
                t.isIdentifier(node.key) &&
                node.key.name === MAGIC_KEY
            ) {
                const magicValue = path.get('value').evaluate();
                if (!magicValue.confident || magicValue.value !== MAGIC_VALUE) {
                    return;
                }
                covScope =
                    path.scope.getFunctionParent() ||
                    path.scope.getProgramParent();
                path.stop();
            }
        }
    });

    if (!covScope) {
        return null;
    }

    const result = {};

    for (const key of ['path', 'hash', 'gcv', 'coverageData']) {
        const binding = covScope.getOwnBinding(key);
        if (!binding) {
            return null;
        }
        const valuePath = binding.path.get('init');
        const value = valuePath.evaluate();
        if (!value.confident) {
            return null;
        }
        result[key] = value.value;
    }

    delete result.coverageData[MAGIC_KEY];

    return result;
}



/*
file https://github.com/istanbuljs/istanbuljs/blob/istanbul-reports@2.2.5/packages/istanbul-lib-instrument/src/source-coverage.js
*/
var exports_istanbuljs_istanbuljs_packages_istanbul_lib_instrument_src_source_coverage = {};
import { classes } from 'istanbul-lib-coverage';

function cloneLocation(loc) {
    return {
        start: {
            line: loc && loc.start.line,
            column: loc && loc.start.column
        },
        end: {
            line: loc && loc.end.line,
            column: loc && loc.end.column
        }
    };
}
/**
 * SourceCoverage provides mutation methods to manipulate the structure of
 * a file coverage object. Used by the instrumenter to create a full coverage
 * object for a file incrementally.
 *
 * @private
 * @param pathOrObj {String|Object} - see the argument for {@link FileCoverage}
 * @extends FileCoverage
 * @constructor
 */
class SourceCoverage extends classes.FileCoverage {
    constructor(pathOrObj) {
        super(pathOrObj);
        this.meta = {
            last: {
                s: 0,
                f: 0,
                b: 0
            }
        };
    }

    newStatement(loc) {
        const s = this.meta.last.s;
        this.data.statementMap[s] = cloneLocation(loc);
        this.data.s[s] = 0;
        this.meta.last.s += 1;
        return s;
    }

    newFunction(name, decl, loc) {
        const f = this.meta.last.f;
        name = name || '(anonymous_' + f + ')';
        this.data.fnMap[f] = {
            name,
            decl: cloneLocation(decl),
            loc: cloneLocation(loc),
            // DEPRECATED: some legacy reports require this info.
            line: loc && loc.start.line
        };
        this.data.f[f] = 0;
        this.meta.last.f += 1;
        return f;
    }

    newBranch(type, loc) {
        const b = this.meta.last.b;
        this.data.b[b] = [];
        this.data.branchMap[b] = {
            loc: cloneLocation(loc),
            type,
            locations: [],
            // DEPRECATED: some legacy reports require this info.
            line: loc && loc.start.line
        };
        this.meta.last.b += 1;
        return b;
    }

    addBranchPath(name, location) {
        const bMeta = this.data.branchMap[name];
        const counts = this.data.b[name];

        /* istanbul ignore if: paranoid check */
        if (!bMeta) {
            throw new Error('Invalid branch ' + name);
        }
        bMeta.locations.push(cloneLocation(location));
        counts.push(0);
        return counts.length - 1;
    }

    /**
     * Assigns an input source map to the coverage that can be used
     * to remap the coverage output to the original source
     * @param sourceMap {object} the source map
     */
    inputSourceMap(sourceMap) {
        this.data.inputSourceMap = sourceMap;
    }

    freeze() {
        // prune empty branches
        const map = this.data.branchMap;
        const branches = this.data.b;
        Object.keys(map).forEach(b => {
            if (map[b].locations.length === 0) {
                delete map[b];
                delete branches[b];
            }
        });
    }
}

export { SourceCoverage };



/*
file https://github.com/istanbuljs/istanbuljs/blob/istanbul-reports@2.2.5/packages/istanbul-lib-instrument/src/visitor.js
*/
var exports_istanbuljs_istanbuljs_packages_istanbul_lib_instrument_src_visitor = {};
import { createHash } from 'crypto';
import template from '@babel/template';
import { SourceCoverage } from './source-coverage';
import { SHA, MAGIC_KEY, MAGIC_VALUE } from './constants';
import { defaultOpts } from './instrumenter';

// pattern for istanbul to ignore a section
const COMMENT_RE = /^\s*istanbul\s+ignore\s+(if|else|next)(?=\W|$)/;
// pattern for istanbul to ignore the whole file
const COMMENT_FILE_RE = /^\s*istanbul\s+ignore\s+(file)(?=\W|$)/;
// source map URL pattern
const SOURCE_MAP_RE = /[#@]\s*sourceMappingURL=(.*)\s*$/m;

// generate a variable name from hashing the supplied file path
function genVar(filename) {
    const hash = createHash(SHA);
    hash.update(filename);
    return 'cov_' + parseInt(hash.digest('hex').substr(0, 12), 16).toString(36);
}

// VisitState holds the state of the visitor, provides helper functions
// and is the `this` for the individual coverage visitors.
class VisitState {
    constructor(
        types,
        sourceFilePath,
        inputSourceMap,
        ignoreClassMethods = []
    ) {
        this.varName = genVar(sourceFilePath);
        this.attrs = {};
        this.nextIgnore = null;
        this.cov = new SourceCoverage(sourceFilePath);

        if (typeof inputSourceMap !== 'undefined') {
            this.cov.inputSourceMap(inputSourceMap);
        }
        this.ignoreClassMethods = ignoreClassMethods;
        this.types = types;
        this.sourceMappingURL = null;
    }

    // should we ignore the node? Yes, if specifically ignoring
    // or if the node is generated.
    shouldIgnore(path) {
        return this.nextIgnore || !path.node.loc;
    }

    // extract the ignore comment hint (next|if|else) or null
    hintFor(node) {
        let hint = null;
        if (node.leadingComments) {
            node.leadingComments.forEach(c => {
                const v = (
                    c.value || /* istanbul ignore next: paranoid check */ ''
                ).trim();
                const groups = v.match(COMMENT_RE);
                if (groups) {
                    hint = groups[1];
                }
            });
        }
        return hint;
    }

    // extract a source map URL from comments and keep track of it
    maybeAssignSourceMapURL(node) {
        const extractURL = comments => {
            if (!comments) {
                return;
            }
            comments.forEach(c => {
                const v = (
                    c.value || /* istanbul ignore next: paranoid check */ ''
                ).trim();
                const groups = v.match(SOURCE_MAP_RE);
                if (groups) {
                    this.sourceMappingURL = groups[1];
                }
            });
        };
        extractURL(node.leadingComments);
        extractURL(node.trailingComments);
    }

    // for these expressions the statement counter needs to be hoisted, so
    // function name inference can be preserved
    counterNeedsHoisting(path) {
        return (
            path.isFunctionExpression() ||
            path.isArrowFunctionExpression() ||
            path.isClassExpression()
        );
    }

    // all the generic stuff that needs to be done on enter for every node
    onEnter(path) {
        const n = path.node;

        this.maybeAssignSourceMapURL(n);

        // if already ignoring, nothing more to do
        if (this.nextIgnore !== null) {
            return;
        }
        // check hint to see if ignore should be turned on
        const hint = this.hintFor(n);
        if (hint === 'next') {
            this.nextIgnore = n;
            return;
        }
        // else check custom node attribute set by a prior visitor
        if (this.getAttr(path.node, 'skip-all') !== null) {
            this.nextIgnore = n;
        }

        // else check for ignored class methods
        if (
            path.isFunctionExpression() &&
            this.ignoreClassMethods.some(
                name => path.node.id && name === path.node.id.name
            )
        ) {
            this.nextIgnore = n;
            return;
        }
        if (
            path.isClassMethod() &&
            this.ignoreClassMethods.some(name => name === path.node.key.name)
        ) {
            this.nextIgnore = n;
            return;
        }
    }

    // all the generic stuff on exit of a node,
    // including reseting ignores and custom node attrs
    onExit(path) {
        // restore ignore status, if needed
        if (path.node === this.nextIgnore) {
            this.nextIgnore = null;
        }
        // nuke all attributes for the node
        delete path.node.__cov__;
    }

    // set a node attribute for the supplied node
    setAttr(node, name, value) {
        node.__cov__ = node.__cov__ || {};
        node.__cov__[name] = value;
    }

    // retrieve a node attribute for the supplied node or null
    getAttr(node, name) {
        const c = node.__cov__;
        if (!c) {
            return null;
        }
        return c[name];
    }

    //
    increase(type, id, index) {
        const T = this.types;
        const wrap =
            index !== null
                ? // If `index` present, turn `x` into `x[index]`.
                  x => T.memberExpression(x, T.numericLiteral(index), true)
                : x => x;
        return T.updateExpression(
            '++',
            wrap(
                T.memberExpression(
                    T.memberExpression(
                        T.identifier(this.varName),
                        T.identifier(type)
                    ),
                    T.numericLiteral(id),
                    true
                )
            )
        );
    }

    insertCounter(path, increment) {
        const T = this.types;
        if (path.isBlockStatement()) {
            path.node.body.unshift(T.expressionStatement(increment));
        } else if (path.isStatement()) {
            path.insertBefore(T.expressionStatement(increment));
        } else if (
            this.counterNeedsHoisting(path) &&
            T.isVariableDeclarator(path.parentPath)
        ) {
            // make an attempt to hoist the statement counter, so that
            // function names are maintained.
            const parent = path.parentPath.parentPath;
            if (parent && T.isExportNamedDeclaration(parent.parentPath)) {
                parent.parentPath.insertBefore(
                    T.expressionStatement(increment)
                );
            } else if (
                parent &&
                (T.isProgram(parent.parentPath) ||
                    T.isBlockStatement(parent.parentPath))
            ) {
                parent.insertBefore(T.expressionStatement(increment));
            } else {
                path.replaceWith(T.sequenceExpression([increment, path.node]));
            }
        } /* istanbul ignore else: not expected */ else if (
            path.isExpression()
        ) {
            path.replaceWith(T.sequenceExpression([increment, path.node]));
        } else {
            console.error(
                'Unable to insert counter for node type:',
                path.node.type
            );
        }
    }

    insertStatementCounter(path) {
        /* istanbul ignore if: paranoid check */
        if (!(path.node && path.node.loc)) {
            return;
        }
        const index = this.cov.newStatement(path.node.loc);
        const increment = this.increase('s', index, null);
        this.insertCounter(path, increment);
    }

    insertFunctionCounter(path) {
        const T = this.types;
        /* istanbul ignore if: paranoid check */
        if (!(path.node && path.node.loc)) {
            return;
        }
        const n = path.node;

        let dloc = null;
        // get location for declaration
        switch (n.type) {
            case 'FunctionDeclaration':
                /* istanbul ignore else: paranoid check */
                if (n.id) {
                    dloc = n.id.loc;
                }
                break;
            case 'FunctionExpression':
                if (n.id) {
                    dloc = n.id.loc;
                }
                break;
        }
        if (!dloc) {
            dloc = {
                start: n.loc.start,
                end: { line: n.loc.start.line, column: n.loc.start.column + 1 }
            };
        }

        const name = path.node.id ? path.node.id.name : path.node.name;
        const index = this.cov.newFunction(name, dloc, path.node.body.loc);
        const increment = this.increase('f', index, null);
        const body = path.get('body');
        /* istanbul ignore else: not expected */
        if (body.isBlockStatement()) {
            body.node.body.unshift(T.expressionStatement(increment));
        } else {
            console.error(
                'Unable to process function body node type:',
                path.node.type
            );
        }
    }

    getBranchIncrement(branchName, loc) {
        const index = this.cov.addBranchPath(branchName, loc);
        return this.increase('b', branchName, index);
    }

    insertBranchCounter(path, branchName, loc) {
        const increment = this.getBranchIncrement(
            branchName,
            loc || path.node.loc
        );
        this.insertCounter(path, increment);
    }

    findLeaves(node, accumulator, parent, property) {
        if (!node) {
            return;
        }
        if (node.type === 'LogicalExpression') {
            const hint = this.hintFor(node);
            if (hint !== 'next') {
                this.findLeaves(node.left, accumulator, node, 'left');
                this.findLeaves(node.right, accumulator, node, 'right');
            }
        } else {
            accumulator.push({
                node,
                parent,
                property
            });
        }
    }
}

// generic function that takes a set of visitor methods and
// returns a visitor object with `enter` and `exit` properties,
// such that:
//
// * standard entry processing is done
// * the supplied visitors are called only when ignore is not in effect
//   This relieves them from worrying about ignore states and generated nodes.
// * standard exit processing is done
//
function entries(...enter) {
    // the enter function
    const wrappedEntry = function(path, node) {
        this.onEnter(path);
        if (this.shouldIgnore(path)) {
            return;
        }
        enter.forEach(e => {
            e.call(this, path, node);
        });
    };
    const exit = function(path, node) {
        this.onExit(path, node);
    };
    return {
        enter: wrappedEntry,
        exit
    };
}

function coverStatement(path) {
    this.insertStatementCounter(path);
}

/* istanbul ignore next: no node.js support */
function coverAssignmentPattern(path) {
    const n = path.node;
    const b = this.cov.newBranch('default-arg', n.loc);
    this.insertBranchCounter(path.get('right'), b);
}

function coverFunction(path) {
    this.insertFunctionCounter(path);
}

function coverVariableDeclarator(path) {
    this.insertStatementCounter(path.get('init'));
}

function coverClassPropDeclarator(path) {
    this.insertStatementCounter(path.get('value'));
}

function makeBlock(path) {
    const T = this.types;
    if (!path.node) {
        path.replaceWith(T.blockStatement([]));
    }
    if (!path.isBlockStatement()) {
        path.replaceWith(T.blockStatement([path.node]));
        path.node.loc = path.node.body[0].loc;
    }
}

function blockProp(prop) {
    return function(path) {
        makeBlock.call(this, path.get(prop));
    };
}

function makeParenthesizedExpressionForNonIdentifier(path) {
    const T = this.types;
    if (path.node && !path.isIdentifier()) {
        path.replaceWith(T.parenthesizedExpression(path.node));
    }
}

function parenthesizedExpressionProp(prop) {
    return function(path) {
        makeParenthesizedExpressionForNonIdentifier.call(this, path.get(prop));
    };
}

function convertArrowExpression(path) {
    const n = path.node;
    const T = this.types;
    if (!T.isBlockStatement(n.body)) {
        const bloc = n.body.loc;
        if (n.expression === true) {
            n.expression = false;
        }
        n.body = T.blockStatement([T.returnStatement(n.body)]);
        // restore body location
        n.body.loc = bloc;
        // set up the location for the return statement so it gets
        // instrumented
        n.body.body[0].loc = bloc;
    }
}

function coverIfBranches(path) {
    const n = path.node;
    const hint = this.hintFor(n);
    const ignoreIf = hint === 'if';
    const ignoreElse = hint === 'else';
    const branch = this.cov.newBranch('if', n.loc);

    if (ignoreIf) {
        this.setAttr(n.consequent, 'skip-all', true);
    } else {
        this.insertBranchCounter(path.get('consequent'), branch, n.loc);
    }
    if (ignoreElse) {
        this.setAttr(n.alternate, 'skip-all', true);
    } else {
        this.insertBranchCounter(path.get('alternate'), branch, n.loc);
    }
}

function createSwitchBranch(path) {
    const b = this.cov.newBranch('switch', path.node.loc);
    this.setAttr(path.node, 'branchName', b);
}

function coverSwitchCase(path) {
    const T = this.types;
    const b = this.getAttr(path.parentPath.node, 'branchName');
    /* istanbul ignore if: paranoid check */
    if (b === null) {
        throw new Error('Unable to get switch branch name');
    }
    const increment = this.getBranchIncrement(b, path.node.loc);
    path.node.consequent.unshift(T.expressionStatement(increment));
}

function coverTernary(path) {
    const n = path.node;
    const branch = this.cov.newBranch('cond-expr', path.node.loc);
    const cHint = this.hintFor(n.consequent);
    const aHint = this.hintFor(n.alternate);

    if (cHint !== 'next') {
        this.insertBranchCounter(path.get('consequent'), branch);
    }
    if (aHint !== 'next') {
        this.insertBranchCounter(path.get('alternate'), branch);
    }
}

function coverLogicalExpression(path) {
    const T = this.types;
    if (path.parentPath.node.type === 'LogicalExpression') {
        return; // already processed
    }
    const leaves = [];
    this.findLeaves(path.node, leaves);
    const b = this.cov.newBranch('binary-expr', path.node.loc);
    for (let i = 0; i < leaves.length; i += 1) {
        const leaf = leaves[i];
        const hint = this.hintFor(leaf.node);
        if (hint === 'next') {
            continue;
        }
        const increment = this.getBranchIncrement(b, leaf.node.loc);
        if (!increment) {
            continue;
        }
        leaf.parent[leaf.property] = T.sequenceExpression([
            increment,
            leaf.node
        ]);
    }
}

const codeVisitor = {
    ArrowFunctionExpression: entries(convertArrowExpression, coverFunction),
    AssignmentPattern: entries(coverAssignmentPattern),
    BlockStatement: entries(), // ignore processing only
    ExportDefaultDeclaration: entries(), // ignore processing only
    ExportNamedDeclaration: entries(), // ignore processing only
    ClassMethod: entries(coverFunction),
    ClassDeclaration: entries(parenthesizedExpressionProp('superClass')),
    ClassProperty: entries(coverClassPropDeclarator),
    ClassPrivateProperty: entries(coverClassPropDeclarator),
    ObjectMethod: entries(coverFunction),
    ExpressionStatement: entries(coverStatement),
    BreakStatement: entries(coverStatement),
    ContinueStatement: entries(coverStatement),
    DebuggerStatement: entries(coverStatement),
    ReturnStatement: entries(coverStatement),
    ThrowStatement: entries(coverStatement),
    TryStatement: entries(coverStatement),
    VariableDeclaration: entries(), // ignore processing only
    VariableDeclarator: entries(coverVariableDeclarator),
    IfStatement: entries(
        blockProp('consequent'),
        blockProp('alternate'),
        coverStatement,
        coverIfBranches
    ),
    ForStatement: entries(blockProp('body'), coverStatement),
    ForInStatement: entries(blockProp('body'), coverStatement),
    ForOfStatement: entries(blockProp('body'), coverStatement),
    WhileStatement: entries(blockProp('body'), coverStatement),
    DoWhileStatement: entries(blockProp('body'), coverStatement),
    SwitchStatement: entries(createSwitchBranch, coverStatement),
    SwitchCase: entries(coverSwitchCase),
    WithStatement: entries(blockProp('body'), coverStatement),
    FunctionDeclaration: entries(coverFunction),
    FunctionExpression: entries(coverFunction),
    LabeledStatement: entries(coverStatement),
    ConditionalExpression: entries(coverTernary),
    LogicalExpression: entries(coverLogicalExpression)
};
const globalTemplateAlteredFunction = template(`
        var Function = (function(){}).constructor;
        var global = (new Function(GLOBAL_COVERAGE_SCOPE))();
`);
const globalTemplateFunction = template(`
        var global = (new Function(GLOBAL_COVERAGE_SCOPE))();
`);
const globalTemplateVariable = template(`
        var global = GLOBAL_COVERAGE_SCOPE;
`);
// the template to insert at the top of the program.
const coverageTemplate = template(`
    var COVERAGE_VAR = (function () {
        var path = PATH;
        var hash = HASH;
        GLOBAL_COVERAGE_TEMPLATE
        var gcv = GLOBAL_COVERAGE_VAR;
        var coverageData = INITIAL;
        var coverage = global[gcv] || (global[gcv] = {});
        if (coverage[path] && coverage[path].hash === hash) {
            return coverage[path];
        }
        return coverage[path] = coverageData;
    })();
`);
// the rewire plugin (and potentially other babel middleware)
// may cause files to be instrumented twice, see:
// https://github.com/istanbuljs/babel-plugin-istanbul/issues/94
// we should only instrument code for coverage the first time
// it's run through istanbul-lib-instrument.
function alreadyInstrumented(path, visitState) {
    return path.scope.hasBinding(visitState.varName);
}
function shouldIgnoreFile(programNode) {
    return (
        programNode.parent &&
        programNode.parent.comments.some(c => COMMENT_FILE_RE.test(c.value))
    );
}

const defaultProgramVisitorOpts = {
    inputSourceMap: undefined
};
/**
 * programVisitor is a `babel` adaptor for instrumentation.
 * It returns an object with two methods `enter` and `exit`.
 * These should be assigned to or called from `Program` entry and exit functions
 * in a babel visitor.
 * These functions do not make assumptions about the state set by Babel and thus
 * can be used in a context other than a Babel plugin.
 *
 * The exit function returns an object that currently has the following keys:
 *
 * `fileCoverage` - the file coverage object created for the source file.
 * `sourceMappingURL` - any source mapping URL found when processing the file.
 *
 * @param {Object} types - an instance of babel-types
 * @param {string} sourceFilePath - the path to source file
 * @param {Object} opts - additional options
 * @param {string} [opts.coverageVariable=__coverage__] the global coverage variable name.
 * @param {string} [opts.coverageGlobalScope=this] the global coverage variable scope.
 * @param {boolean} [opts.coverageGlobalScopeFunc=true] use an evaluated function to find coverageGlobalScope.
 * @param {Array} [opts.ignoreClassMethods=[]] names of methods to ignore by default on classes.
 * @param {object} [opts.inputSourceMap=undefined] the input source map, that maps the uninstrumented code back to the
 * original code.
 */
function programVisitor(
    types,
    sourceFilePath = 'unknown.js',
    opts = defaultProgramVisitorOpts
) {
    const T = types;
    // This sets some unused options but ensures all required options are initialized
    opts = Object.assign({}, defaultOpts(), defaultProgramVisitorOpts, opts);
    const visitState = new VisitState(
        types,
        sourceFilePath,
        opts.inputSourceMap,
        opts.ignoreClassMethods
    );
    return {
        enter(path) {
            if (shouldIgnoreFile(path.find(p => p.isProgram()))) {
                return;
            }
            if (alreadyInstrumented(path, visitState)) {
                return;
            }
            path.traverse(codeVisitor, visitState);
        },
        exit(path) {
            if (alreadyInstrumented(path, visitState)) {
                return;
            }
            visitState.cov.freeze();
            const coverageData = visitState.cov.toJSON();
            if (shouldIgnoreFile(path.find(p => p.isProgram()))) {
                return {
                    fileCoverage: coverageData,
                    sourceMappingURL: visitState.sourceMappingURL
                };
            }
            coverageData[MAGIC_KEY] = MAGIC_VALUE;
            const hash = createHash(SHA)
                .update(JSON.stringify(coverageData))
                .digest('hex');
            coverageData.hash = hash;
            const coverageNode = T.valueToNode(coverageData);
            delete coverageData[MAGIC_KEY];
            delete coverageData.hash;
            let gvTemplate;
            if (opts.coverageGlobalScopeFunc) {
                if (path.scope.getBinding('Function')) {
                    gvTemplate = globalTemplateAlteredFunction({
                        GLOBAL_COVERAGE_SCOPE: T.stringLiteral(
                            'return ' + opts.coverageGlobalScope
                        )
                    });
                } else {
                    gvTemplate = globalTemplateFunction({
                        GLOBAL_COVERAGE_SCOPE: T.stringLiteral(
                            'return ' + opts.coverageGlobalScope
                        )
                    });
                }
            } else {
                gvTemplate = globalTemplateVariable({
                    GLOBAL_COVERAGE_SCOPE: opts.coverageGlobalScope
                });
            }
            const cv = coverageTemplate({
                GLOBAL_COVERAGE_VAR: T.stringLiteral(opts.coverageVariable),
                GLOBAL_COVERAGE_TEMPLATE: gvTemplate,
                COVERAGE_VAR: T.identifier(visitState.varName),
                PATH: T.stringLiteral(sourceFilePath),
                INITIAL: coverageNode,
                HASH: T.stringLiteral(hash)
            });
            cv._blockHoist = 5;
            path.node.body.unshift(cv);
            return {
                fileCoverage: coverageData,
                sourceMappingURL: visitState.sourceMappingURL
            };
        }
    };
}

export default programVisitor;



/*
file https://github.com/istanbuljs/istanbuljs/blob/istanbul-reports@2.2.5/packages/istanbul-lib-report/index.js
*/
var exports_istanbuljs_istanbuljs_packages_istanbul_lib_report_index = {};
/*
 Copyright 2012-2015, Yahoo Inc.
 Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
'use strict';

/**
 * @module Exports
 */

const summarizer = exports_istanbuljs_istanbuljs_packages_istanbul_lib_report_lib_summarizer;
const context = exports_istanbuljs_istanbuljs_packages_istanbul_lib_report_lib_context;
const watermarks = exports_istanbuljs_istanbuljs_packages_istanbul_lib_report_lib_watermarks;

exports_istanbuljs_istanbuljs_packages_istanbul_lib_report_index = {
    /**
     * returns a reporting context for the supplied options
     * @param {Object} [opts=null] opts
     * @returns {Context}
     */
    createContext(opts) {
        return context.create(opts);
    },
    /**
     * returns the default watermarks that would be used when not
     * overridden
     * @returns {Object} an object with `statements`, `functions`, `branches`,
     *  and `line` keys. Each value is a 2 element array that has the low and
     *  high watermark as percentages.
     */
    getDefaultWatermarks() {
        return watermarks.getDefault();
    }
};
/**
 * standard summary functions
 */
exports_istanbuljs_istanbuljs_packages_istanbul_lib_report_index.summarizers = {
    /**
     * a summarizer that creates a flat tree with one root node and bunch of
     * files directly under it
     */
    flat: summarizer.createFlatSummary,
    /**
     * a summarizer that creates a hierarchical tree where the coverage summaries
     * of each directly reflect the summaries of all subdirectories and files in it
     */
    nested: summarizer.createNestedSummary,
    /**
     * a summarizer that creates a tree in which directories are not nested.
     * Every subdirectory is a child of the root node and only reflects the
     * coverage numbers for the files in it (i.e. excludes subdirectories).
     * This is the default summarizer.
     */
    pkg: summarizer.createPackageSummary
};



/*
file https://github.com/istanbuljs/istanbuljs/blob/istanbul-reports@2.2.5/packages/istanbul-lib-report/lib/context.js
*/
var exports_istanbuljs_istanbuljs_packages_istanbul_lib_report_lib_context = {};
/*
 Copyright 2012-2015, Yahoo Inc.
 Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
// const fs = require('fs');
const FileWriter = exports_istanbuljs_istanbuljs_packages_istanbul_lib_report_lib_file_writer;
const XMLWriter = exports_istanbuljs_istanbuljs_packages_istanbul_lib_report_lib_xml_writer;
const tree = exports_istanbuljs_istanbuljs_packages_istanbul_lib_report_lib_tree;
const watermarks = exports_istanbuljs_istanbuljs_packages_istanbul_lib_report_lib_watermarks;

function defaultSourceLookup(path) {
    try {
        return fs.readFileSync(path, 'utf8');
    } catch (ex) {
        throw new Error(
            'Unable to lookup source: ' + path + '(' + ex.message + ')'
        );
    }
}

function mergeWatermarks(specified, defaults) {
    specified = specified || {};
    Object.keys(defaults).forEach(k => {
        const specValue = specified[k];
        if (
            !(specValue && Array.isArray(specValue) && specValue.length === 2)
        ) {
            specified[k] = defaults[k];
        }
    });
    return specified;
}
/**
 * A reporting context that is passed to report implementations
 * @param {Object} [opts=null] opts options
 * @param {String} [opts.dir='coverage'] opts.dir the reporting directory
 * @param {Object} [opts.watermarks=null] opts.watermarks watermarks for
 *  statements, lines, branches and functions
 * @param {Function} [opts.sourceFinder=fsLookup] opts.sourceFinder a
 *  function that returns source code given a file path. Defaults to
 *  filesystem lookups based on path.
 * @constructor
 */
function Context(opts) {
    opts = opts || {};
    this.dir = opts.dir || 'coverage';
    this.watermarks = mergeWatermarks(opts.watermarks, watermarks.getDefault());
    this.sourceFinder = opts.sourceFinder || defaultSourceLookup;
    this.data = {};
}

Object.defineProperty(Context.prototype, 'writer', {
    enumerable: true,
    get() {
        if (!this.data.writer) {
            this.data.writer = new FileWriter(this.dir);
        }
        return this.data.writer;
    }
});

/**
 * returns a FileWriter implementation for reporting use. Also available
 * as the `writer` property on the context.
 * @returns {Writer}
 */
Context.prototype.getWriter = function() {
    return this.writer;
};

/**
 * returns the source code for the specified file path or throws if
 * the source could not be found.
 * @param {String} filePath the file path as found in a file coverage object
 * @returns {String} the source code
 */
Context.prototype.getSource = function(filePath) {
    return this.sourceFinder(filePath);
};

/**
 * returns the coverage class given a coverage
 * types and a percentage value.
 * @param {String} type - the coverage type, one of `statements`, `functions`,
 *  `branches`, or `lines`
 * @param {Number} value - the percentage value
 * @returns {String} one of `high`, `medium` or `low`
 */
Context.prototype.classForPercent = function(type, value) {
    const watermarks = this.watermarks[type];
    if (!watermarks) {
        return 'unknown';
    }
    if (value < watermarks[0]) {
        return 'low';
    }
    if (value >= watermarks[1]) {
        return 'high';
    }
    return 'medium';
};
/**
 * returns an XML writer for the supplied content writer
 * @param {ContentWriter} contentWriter the content writer to which the returned XML writer
 *  writes data
 * @returns {XMLWriter}
 */
Context.prototype.getXMLWriter = function(contentWriter) {
    return new XMLWriter(contentWriter);
};
/**
 * returns a full visitor given a partial one.
 * @param {Object} partialVisitor a partial visitor only having the functions of
 *  interest to the caller. These functions are called with a scope that is the
 *  supplied object.
 * @returns {Visitor}
 */
Context.prototype.getVisitor = function(partialVisitor) {
    return new tree.Visitor(partialVisitor);
};

exports_istanbuljs_istanbuljs_packages_istanbul_lib_report_lib_context = {
    create(opts) {
        return new Context(opts);
    }
};



/*
file https://github.com/istanbuljs/istanbuljs/blob/istanbul-reports@2.2.5/packages/istanbul-lib-report/lib/file-writer.js
*/
var exports_istanbuljs_istanbuljs_packages_istanbul_lib_report_lib_file_writer = {};
/*
 Copyright 2012-2015, Yahoo Inc.
 Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
// const util = require('util');
// const path = require('path');
// const fs = require('fs');
// const mkdirp = require('make-dir');
// const supportsColor = require('supports-color');
const isAbsolute =
    path.isAbsolute ||
    /* istanbul ignore next */ function(p) {
        return path.resolve(p) === path.normalize(p);
    };

/**
 * abstract interface for writing content
 * @class ContentWriter
 * @constructor
 */
/* istanbul ignore next: abstract class */
function ContentWriter() {}

/**
 * writes a string as-is to the destination
 * @param {String} str the string to write
 */
/* istanbul ignore next: abstract class */
ContentWriter.prototype.write = function() {
    throw new Error('write: must be overridden');
};

/**
 * returns the colorized version of a string. Typically,
 * content writers that write to files will return the
 * same string and ones writing to a tty will wrap it in
 * appropriate escape sequences.
 * @param {String} str the string to colorize
 * @param {String} clazz one of `high`, `medium` or `low`
 * @returns {String} the colorized form of the string
 */
ContentWriter.prototype.colorize = function(str /*, clazz*/) {
    return str;
};

/**
 * writes a string appended with a newline to the destination
 * @param {String} str the string to write
 */
ContentWriter.prototype.println = function(str) {
    this.write(str + '\n');
};

/**
 * closes this content writer. Should be called after all writes are complete.
 */
ContentWriter.prototype.close = function() {};

/**
 * a content writer that writes to a file
 * @param {Number} fd - the file descriptor
 * @extends ContentWriter
 * @constructor
 */
function FileContentWriter(fd) {
    this.fd = fd;
}
util.inherits(FileContentWriter, ContentWriter);

FileContentWriter.prototype.write = function(str) {
    fs.writeSync(this.fd, str);
};

FileContentWriter.prototype.close = function() {
    fs.closeSync(this.fd);
};

/**
 * a content writer that writes to the console
 * @extends ContentWriter
 * @constructor
 */
function ConsoleWriter() {}
util.inherits(ConsoleWriter, ContentWriter);

// allow stdout to be captured for tests.
let capture = false;
let output = '';
ConsoleWriter.prototype.write = function(str) {
    if (capture) {
        output += str;
    } else {
        process.stdout.write(str);
    }
};

ConsoleWriter.prototype.colorize = function(str, clazz) {
    const colors = {
        low: '31;1',
        medium: '33;1',
        high: '32;1'
    };

    /* istanbul ignore next: different modes for CI and local */
    if (supportsColor.stdout && colors[clazz]) {
        return '\u001b[' + colors[clazz] + 'm' + str + '\u001b[0m';
    }
    return str;
};

/**
 * utility for writing files under a specific directory
 * @class FileWriter
 * @param {String} baseDir the base directory under which files should be written
 * @constructor
 */
function FileWriter(baseDir) {
    if (!baseDir) {
        throw new Error('baseDir must be specified');
    }
    this.baseDir = baseDir;
}

/**
 * static helpers for capturing stdout report output;
 * super useful for tests!
 */
FileWriter.startCapture = function() {
    capture = true;
};
FileWriter.stopCapture = function() {
    capture = false;
};
FileWriter.getOutput = function() {
    return output;
};
FileWriter.resetOutput = function() {
    output = '';
};

/**
 * returns a FileWriter that is rooted at the supplied subdirectory
 * @param {String} subdir the subdirectory under which to root the
 *  returned FileWriter
 * @returns {FileWriter}
 */
FileWriter.prototype.writerForDir = function(subdir) {
    if (isAbsolute(subdir)) {
        throw new Error(
            'Cannot create subdir writer for absolute path: ' + subdir
        );
    }
    return new FileWriter(this.baseDir + '/' + subdir);
};
/**
 * copies a file from a source directory to a destination name
 * @param {String} source path to source file
 * @param {String} dest relative path to destination file
 * @param {String} [header=undefined] optional text to prepend to destination
 *  (e.g., an "this file is autogenerated" comment, copyright notice, etc.)
 */
FileWriter.prototype.copyFile = function(source, dest, header) {
    if (isAbsolute(dest)) {
        throw new Error('Cannot write to absolute path: ' + dest);
    }
    dest = path.resolve(this.baseDir, dest);
    mkdirp.sync(path.dirname(dest));
    let contents;
    if (header) {
        contents = header + fs.readFileSync(source, 'utf8');
    } else {
        contents = fs.readFileSync(source);
    }
    fs.writeFileSync(dest, contents);
};
/**
 * returns a content writer for writing content to the supplied file.
 * @param {String|null} file the relative path to the file or the special
 *  values `"-"` or `null` for writing to the console
 * @returns {ContentWriter}
 */
FileWriter.prototype.writeFile = function(file) {
    if (file === null || file === '-') {
        return new ConsoleWriter();
    }
    if (isAbsolute(file)) {
        throw new Error('Cannot write to absolute path: ' + file);
    }
    file = path.resolve(this.baseDir, file);
    mkdirp.sync(path.dirname(file));
    return new FileContentWriter(fs.openSync(file, 'w'));
};

exports_istanbuljs_istanbuljs_packages_istanbul_lib_report_lib_file_writer = FileWriter;



/*
file https://github.com/istanbuljs/istanbuljs/blob/istanbul-reports@2.2.5/packages/istanbul-lib-report/lib/path.js
*/
var exports_istanbuljs_istanbuljs_packages_istanbul_lib_report_lib_path = {};
/*
 Copyright 2012-2015, Yahoo Inc.
 Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
'use strict';

// const path = require('path');
let parsePath = path.parse;
let SEP = path.sep || /* istanbul ignore next */ '/';
const origParser = parsePath;
const origSep = SEP;

function makeRelativeNormalizedPath(str, sep) {
    const parsed = parsePath(str);
    let root = parsed.root;
    let dir;
    let file = parsed.base;
    let quoted;
    let pos;

    // handle a weird windows case separately
    if (sep === '\\') {
        pos = root.indexOf(':\\');
        if (pos >= 0) {
            root = root.substring(0, pos + 2);
        }
    }
    dir = parsed.dir.substring(root.length);

    if (str === '') {
        return [];
    }

    if (sep !== '/') {
        quoted = new RegExp(sep.replace(/\W/g, '\\$&'), 'g');
        dir = dir.replace(quoted, '/');
        file = file.replace(quoted, '/'); // excessively paranoid?
    }

    if (dir !== '') {
        dir = dir + '/' + file;
    } else {
        dir = file;
    }
    if (dir.substring(0, 1) === '/') {
        dir = dir.substring(1);
    }
    dir = dir.split(/\/+/);
    return dir;
}

function Path(strOrArray) {
    if (Array.isArray(strOrArray)) {
        this.v = strOrArray;
    } else if (typeof strOrArray === 'string') {
        this.v = makeRelativeNormalizedPath(strOrArray, SEP);
    } else {
        throw new Error(
            'Invalid Path argument must be string or array:' + strOrArray
        );
    }
}

Path.prototype.toString = function() {
    return this.v.join('/');
};

Path.prototype.hasParent = function() {
    return this.v.length > 0;
};

Path.prototype.parent = function() {
    if (!this.hasParent()) {
        throw new Error('Unable to get parent for 0 elem path');
    }
    const p = this.v.slice();
    p.pop();
    return new Path(p);
};

Path.prototype.elements = function() {
    return this.v.slice();
};

Path.prototype.contains = function(other) {
    let i;
    if (other.length > this.length) {
        return false;
    }
    for (i = 0; i < other.length; i += 1) {
        if (this.v[i] !== other.v[i]) {
            return false;
        }
    }
    return true;
};

Path.prototype.ancestorOf = function(other) {
    return other.contains(this) && other.length !== this.length;
};

Path.prototype.descendantOf = function(other) {
    return this.contains(other) && other.length !== this.length;
};

Path.prototype.commonPrefixPath = function(other) {
    const len = this.length > other.length ? other.length : this.length;
    let i;
    const ret = [];

    for (i = 0; i < len; i += 1) {
        if (this.v[i] === other.v[i]) {
            ret.push(this.v[i]);
        } else {
            break;
        }
    }
    return new Path(ret);
};

['push', 'pop', 'shift', 'unshift', 'splice'].forEach(f => {
    Path.prototype[f] = function(...args) {
        const v = this.v;
        return v[f](...args);
    };
});

Path.compare = function(a, b) {
    const al = a.length;
    const bl = b.length;
    if (al < bl) {
        return -1;
    }
    if (al > bl) {
        return 1;
    }
    const astr = a.toString();
    const bstr = b.toString();
    return astr < bstr ? -1 : astr > bstr ? 1 : 0;
};

Object.defineProperty(Path.prototype, 'length', {
    enumerable: true,
    get() {
        return this.v.length;
    }
});

exports_istanbuljs_istanbuljs_packages_istanbul_lib_report_lib_path = Path;
Path.tester = {
    setParserAndSep(p, sep) {
        parsePath = p;
        SEP = sep;
    },
    reset() {
        parsePath = origParser;
        SEP = origSep;
    }
};



/*
file https://github.com/istanbuljs/istanbuljs/blob/istanbul-reports@2.2.5/packages/istanbul-lib-report/lib/summarizer.js
*/
var exports_istanbuljs_istanbuljs_packages_istanbul_lib_report_lib_summarizer = {};
/*
 Copyright 2012-2015, Yahoo Inc.
 Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
'use strict';

// const util = require('util');
// const coverage = require('istanbul-lib-coverage');
const Path = exports_istanbuljs_istanbuljs_packages_istanbul_lib_report_lib_path;
const tree = exports_istanbuljs_istanbuljs_packages_istanbul_lib_report_lib_tree;
const BaseNode = tree.Node;
const BaseTree = tree.Tree;

function ReportNode(path, fileCoverage) {
    this.path = path;
    this.parent = null;
    this.fileCoverage = fileCoverage;
    this.children = [];
}

util.inherits(ReportNode, BaseNode);

ReportNode.prototype.addChild = function(child) {
    child.parent = this;
    this.children.push(child);
};

ReportNode.prototype.asRelative = function(p) {
    /* istanbul ignore if */
    if (p.substring(0, 1) === '/') {
        return p.substring(1);
    }
    return p;
};

ReportNode.prototype.getQualifiedName = function() {
    return this.asRelative(this.path.toString());
};

ReportNode.prototype.getRelativeName = function() {
    const parent = this.getParent();
    const myPath = this.path;
    let relPath;
    let i;
    const parentPath = parent ? parent.path : new Path([]);
    if (parentPath.ancestorOf(myPath)) {
        relPath = new Path(myPath.elements());
        for (i = 0; i < parentPath.length; i += 1) {
            relPath.shift();
        }
        return this.asRelative(relPath.toString());
    }
    return this.asRelative(this.path.toString());
};

ReportNode.prototype.getParent = function() {
    return this.parent;
};

ReportNode.prototype.getChildren = function() {
    return this.children;
};

ReportNode.prototype.isSummary = function() {
    return !this.fileCoverage;
};

ReportNode.prototype.getFileCoverage = function() {
    return this.fileCoverage;
};

ReportNode.prototype.getCoverageSummary = function(filesOnly) {
    const cacheProp = 'c_' + (filesOnly ? 'files' : 'full');
    let summary;

    if (this.hasOwnProperty(cacheProp)) {
        return this[cacheProp];
    }

    if (!this.isSummary()) {
        summary = this.getFileCoverage().toSummary();
    } else {
        let count = 0;
        summary = coverage.createCoverageSummary();
        this.getChildren().forEach(child => {
            if (filesOnly && child.isSummary()) {
                return;
            }
            count += 1;
            summary.merge(child.getCoverageSummary(filesOnly));
        });
        if (count === 0 && filesOnly) {
            summary = null;
        }
    }
    this[cacheProp] = summary;
    return summary;
};

function treeFor(root, childPrefix) {
    const tree = new BaseTree();
    const maybePrefix = function(node) {
        if (childPrefix && !node.isRoot()) {
            node.path.unshift(childPrefix);
        }
    };
    tree.getRoot = function() {
        return root;
    };
    const visitor = {
        onDetail(node) {
            maybePrefix(node);
        },
        onSummary(node) {
            maybePrefix(node);
            node.children.sort((a, b) => {
                const astr = a.path.toString();
                const bstr = b.path.toString();
                return astr < bstr
                    ? -1
                    : astr > bstr
                    ? 1
                    : /* istanbul ignore next */ 0;
            });
        }
    };
    tree.visit(visitor);
    return tree;
}

function findCommonParent(paths) {
    if (paths.length === 0) {
        return new Path([]);
    }
    let common = paths[0];
    let i;

    for (i = 1; i < paths.length; i += 1) {
        common = common.commonPrefixPath(paths[i]);
        if (common.length === 0) {
            break;
        }
    }
    return common;
}

function toInitialList(coverageMap) {
    const ret = [];
    coverageMap.files().forEach(filePath => {
        const p = new Path(filePath);
        const coverage = coverageMap.fileCoverageFor(filePath);
        ret.push({
            filePath,
            path: p,
            fileCoverage: coverage
        });
    });

    const commonParent = findCommonParent(ret.map(o => o.path.parent()));
    if (commonParent.length > 0) {
        ret.forEach(o => {
            o.path.splice(0, commonParent.length);
        });
    }
    return {
        list: ret,
        commonParent
    };
}

function toDirParents(list) {
    const nodeMap = Object.create(null);
    const parentNodeList = [];
    list.forEach(o => {
        const node = new ReportNode(o.path, o.fileCoverage);
        const parentPath = o.path.parent();
        let parent = nodeMap[parentPath.toString()];

        if (!parent) {
            parent = new ReportNode(parentPath);
            nodeMap[parentPath.toString()] = parent;
            parentNodeList.push(parent);
        }
        parent.addChild(node);
    });
    return parentNodeList;
}

function foldIntoParents(nodeList) {
    const ret = [];
    let i;
    let j;

    // sort by longest length first
    nodeList.sort((a, b) => -1 * Path.compare(a.path, b.path));

    for (i = 0; i < nodeList.length; i += 1) {
        const first = nodeList[i];
        let inserted = false;

        for (j = i + 1; j < nodeList.length; j += 1) {
            const second = nodeList[j];
            if (second.path.ancestorOf(first.path)) {
                second.addChild(first);
                inserted = true;
                break;
            }
        }

        if (!inserted) {
            ret.push(first);
        }
    }
    return ret;
}

function createRoot() {
    return new ReportNode(new Path([]));
}

function createNestedSummary(coverageMap) {
    const flattened = toInitialList(coverageMap);
    const dirParents = toDirParents(flattened.list);
    const topNodes = foldIntoParents(dirParents);

    if (topNodes.length === 0) {
        return treeFor(new ReportNode(new Path([])));
    }

    if (topNodes.length === 1) {
        return treeFor(topNodes[0]);
    }

    const root = createRoot();
    topNodes.forEach(node => {
        root.addChild(node);
    });
    return treeFor(root);
}

function createPackageSummary(coverageMap) {
    const flattened = toInitialList(coverageMap);
    const dirParents = toDirParents(flattened.list);
    const common = flattened.commonParent;
    let prefix;
    let root;

    if (dirParents.length === 1) {
        root = dirParents[0];
    } else {
        root = createRoot();
        // if one of the dirs is itself the root,
        // then we need to create a top-level dir
        dirParents.forEach(dp => {
            if (dp.path.length === 0) {
                prefix = 'root';
            }
        });
        if (prefix && common.length > 0) {
            prefix = common.elements()[common.elements().length - 1];
        }
        dirParents.forEach(node => {
            root.addChild(node);
        });
    }
    return treeFor(root, prefix);
}

function createFlatSummary(coverageMap) {
    const flattened = toInitialList(coverageMap);
    const list = flattened.list;
    const root = createRoot();

    list.forEach(o => {
        const node = new ReportNode(o.path, o.fileCoverage);
        root.addChild(node);
    });
    return treeFor(root);
}

exports_istanbuljs_istanbuljs_packages_istanbul_lib_report_lib_summarizer = {
    createNestedSummary,
    createPackageSummary,
    createFlatSummary
};



/*
file https://github.com/istanbuljs/istanbuljs/blob/istanbul-reports@2.2.5/packages/istanbul-lib-report/lib/tree.js
*/
var exports_istanbuljs_istanbuljs_packages_istanbul_lib_report_lib_tree = {};
/*
 Copyright 2012-2015, Yahoo Inc.
 Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
'use strict';

// const util = require('util');
/**
 * An object with methods that are called during the traversal of the coverage tree.
 * A visitor has the following methods that are called during tree traversal.
 *
 *   * `onStart(root, state)` - called before traversal begins
 *   * `onSummary(node, state)` - called for every summary node
 *   * `onDetail(node, state)` - called for every detail node
 *   * `onSummaryEnd(node, state)` - called after all children have been visited for
 *      a summary node.
 *   * `onEnd(root, state)` - called after traversal ends
 *
 * @param delegate - a partial visitor that only implements the methods of interest
 *  The visitor object supplies the missing methods as noops. For example, reports
 *  that only need the final coverage summary need implement `onStart` and nothing
 *  else. Reports that use only detailed coverage information need implement `onDetail`
 *  and nothing else.
 * @constructor
 */
function Visitor(delegate) {
    this.delegate = delegate;
}

['Start', 'End', 'Summary', 'SummaryEnd', 'Detail'].forEach(k => {
    const f = 'on' + k;
    Visitor.prototype[f] = function(node, state) {
        if (this.delegate[f] && typeof this.delegate[f] === 'function') {
            this.delegate[f].call(this.delegate, node, state);
        }
    };
});

function CompositeVisitor(visitors) {
    if (!Array.isArray(visitors)) {
        visitors = [visitors];
    }
    this.visitors = visitors.map(v => {
        if (v instanceof Visitor) {
            return v;
        }
        return new Visitor(v);
    });
}

util.inherits(CompositeVisitor, Visitor);

['Start', 'Summary', 'SummaryEnd', 'Detail', 'End'].forEach(k => {
    const f = 'on' + k;
    CompositeVisitor.prototype[f] = function(node, state) {
        this.visitors.forEach(v => {
            v[f](node, state);
        });
    };
});

function Node() {}

/* istanbul ignore next: abstract method */
Node.prototype.getQualifiedName = function() {
    throw new Error('getQualifiedName must be overridden');
};

/* istanbul ignore next: abstract method */
Node.prototype.getRelativeName = function() {
    throw new Error('getRelativeName must be overridden');
};

/* istanbul ignore next: abstract method */
Node.prototype.isRoot = function() {
    return !this.getParent();
};

/* istanbul ignore next: abstract method */
Node.prototype.getParent = function() {
    throw new Error('getParent must be overridden');
};

/* istanbul ignore next: abstract method */
Node.prototype.getChildren = function() {
    throw new Error('getChildren must be overridden');
};

/* istanbul ignore next: abstract method */
Node.prototype.isSummary = function() {
    throw new Error('isSummary must be overridden');
};

/* istanbul ignore next: abstract method */
Node.prototype.getCoverageSummary = function(/* filesOnly */) {
    throw new Error('getCoverageSummary must be overridden');
};

/* istanbul ignore next: abstract method */
Node.prototype.getFileCoverage = function() {
    throw new Error('getFileCoverage must be overridden');
};
/**
 * visit all nodes depth-first from this node down. Note that `onStart`
 * and `onEnd` are never called on the visitor even if the current
 * node is the root of the tree.
 * @param visitor a full visitor that is called during tree traversal
 * @param state optional state that is passed around
 */
Node.prototype.visit = function(visitor, state) {
    if (this.isSummary()) {
        visitor.onSummary(this, state);
    } else {
        visitor.onDetail(this, state);
    }

    this.getChildren().forEach(child => {
        child.visit(visitor, state);
    });

    if (this.isSummary()) {
        visitor.onSummaryEnd(this, state);
    }
};

/**
 * abstract base class for a coverage tree.
 * @constructor
 */
function Tree() {}

/**
 * returns the root node of the tree
 */
/* istanbul ignore next: abstract method */
Tree.prototype.getRoot = function() {
    throw new Error('getRoot must be overridden');
};

/**
 * visits the tree depth-first with the supplied partial visitor
 * @param visitor - a potentially partial visitor
 * @param state - the state to be passed around during tree traversal
 */
Tree.prototype.visit = function(visitor, state) {
    if (!(visitor instanceof Visitor)) {
        visitor = new Visitor(visitor);
    }
    visitor.onStart(this.getRoot(), state);
    this.getRoot().visit(visitor, state);
    visitor.onEnd(this.getRoot(), state);
};

exports_istanbuljs_istanbuljs_packages_istanbul_lib_report_lib_tree = {
    Tree,
    Node,
    Visitor,
    CompositeVisitor
};



/*
file https://github.com/istanbuljs/istanbuljs/blob/istanbul-reports@2.2.5/packages/istanbul-lib-report/lib/watermarks.js
*/
var exports_istanbuljs_istanbuljs_packages_istanbul_lib_report_lib_watermarks = {};
/*
 Copyright 2012-2015, Yahoo Inc.
 Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
exports_istanbuljs_istanbuljs_packages_istanbul_lib_report_lib_watermarks = {
    getDefault() {
        return {
            statements: [50, 80],
            functions: [50, 80],
            branches: [50, 80],
            lines: [50, 80]
        };
    }
};



/*
file https://github.com/istanbuljs/istanbuljs/blob/istanbul-reports@2.2.5/packages/istanbul-lib-report/lib/xml-writer.js
*/
var exports_istanbuljs_istanbuljs_packages_istanbul_lib_report_lib_xml_writer = {};
/*
 Copyright 2012-2015, Yahoo Inc.
 Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
const INDENT = '  ';

/**
 * a utility class to produce well-formed, indented XML
 * @param {ContentWriter} contentWriter the content writer that this utility wraps
 * @constructor
 */
function XMLWriter(contentWriter) {
    this.cw = contentWriter;
    this.stack = [];
}

function attrString(attrs) {
    if (!attrs) {
        return '';
    }
    const ret = [];
    Object.keys(attrs).forEach(k => {
        const v = attrs[k];
        ret.push(k + '="' + v + '"');
    });
    return ret.length === 0 ? '' : ' ' + ret.join(' ');
}

XMLWriter.prototype.indent = function(str) {
    return this.stack.map(() => INDENT).join('') + str;
};

/**
 * writes the opening XML tag with the supplied attributes
 * @param {String} name tag name
 * @param {Object} [attrs=null] attrs attributes for the tag
 */
XMLWriter.prototype.openTag = function(name, attrs) {
    const str = this.indent('<' + name + attrString(attrs) + '>');
    this.cw.println(str);
    this.stack.push(name);
};

/**
 * closes an open XML tag.
 * @param {String} name - tag name to close. This must match the writer's
 *  notion of the tag that is currently open.
 */
XMLWriter.prototype.closeTag = function(name) {
    if (this.stack.length === 0) {
        throw new Error('Attempt to close tag ' + name + ' when not opened');
    }
    const stashed = this.stack.pop();
    const str = '</' + name + '>';

    if (stashed !== name) {
        throw new Error(
            'Attempt to close tag ' +
                name +
                ' when ' +
                stashed +
                ' was the one open'
        );
    }
    this.cw.println(this.indent(str));
};
/**
 * writes a tag and its value opening and closing it at the same time
 * @param {String} name tag name
 * @param {Object} [attrs=null] attrs tag attributes
 * @param {String} [content=null] content optional tag content
 */
XMLWriter.prototype.inlineTag = function(name, attrs, content) {
    let str = '<' + name + attrString(attrs);
    if (content) {
        str += '>' + content + '</' + name + '>';
    } else {
        str += '/>';
    }
    str = this.indent(str);
    this.cw.println(str);
};
/**
 * closes all open tags and ends the document
 */
XMLWriter.prototype.closeAll = function() {
    this.stack
        .slice()
        .reverse()
        .forEach(name => {
            this.closeTag(name);
        });
};

exports_istanbuljs_istanbuljs_packages_istanbul_lib_report_lib_xml_writer = XMLWriter;



/*
file https://github.com/istanbuljs/istanbuljs/blob/istanbul-reports@2.2.5/packages/istanbul-lib-report/package.json
*/
var exports_istanbuljs_istanbuljs_packages_istanbul_lib_report_package_json = {};
{
  "name": "istanbul-lib-report",
  "version": "2.0.8",
  "description": "Base reporting library for istanbul",
  "author": "Krishnan Anantheswaran <kananthmail-github@yahoo.com>",
  "main": "index.js",
  "files": [
    "lib",
    "index.js"
  ],
  "scripts": {
    "test": "mocha"
  },
  "dependencies": {
    "istanbul-lib-coverage": "^2.0.5",
    "make-dir": "^2.1.0",
    "supports-color": "^6.1.0"
  },
  "license": "BSD-3-Clause",
  "bugs": {
    "url": "https://github.com/istanbuljs/istanbuljs/issues"
  },
  "homepage": "https://istanbul.js.org/",
  "repository": {
    "type": "git",
    "url": "git@github.com:istanbuljs/istanbuljs.git"
  },
  "keywords": [
    "istanbul",
    "report",
    "api",
    "lib"
  ],
  "engines": {
    "node": ">=6"
  }
}



/*
file https://github.com/istanbuljs/istanbuljs/blob/istanbul-reports@2.2.5/packages/istanbul-lib-source-maps/index.js
*/
var exports_istanbuljs_istanbuljs_packages_istanbul_lib_source_maps_index = {};
/*
 Copyright 2012-2015, Yahoo Inc.
 Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
'use strict';

const { MapStore } = exports_istanbuljs_istanbuljs_packages_istanbul_lib_source_maps_lib_map_store;
/**
 * @module Exports
 */
exports_istanbuljs_istanbuljs_packages_istanbul_lib_source_maps_index = {
    createSourceMapStore(opts) {
        return new MapStore(opts);
    }
};



/*
file https://github.com/istanbuljs/istanbuljs/blob/istanbul-reports@2.2.5/packages/istanbul-lib-source-maps/lib/get-mapping.js
*/
var exports_istanbuljs_istanbuljs_packages_istanbul_lib_source_maps_lib_get_mapping = {};
/*
 Copyright 2015, Yahoo Inc.
 Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
'use strict';

const pathutils = exports_istanbuljs_istanbuljs_packages_istanbul_lib_source_maps_lib_pathutils;
const {
    GREATEST_LOWER_BOUND,
    LEAST_UPPER_BOUND
} = require('source-map').SourceMapConsumer;

/**
 * AST ranges are inclusive for start positions and exclusive for end positions.
 * Source maps are also logically ranges over text, though interacting with
 * them is generally achieved by working with explicit positions.
 *
 * When finding the _end_ location of an AST item, the range behavior is
 * important because what we're asking for is the _end_ of whatever range
 * corresponds to the end location we seek.
 *
 * This boils down to the following steps, conceptually, though the source-map
 * library doesn't expose primitives to do this nicely:
 *
 * 1. Find the range on the generated file that ends at, or exclusively
 *    contains the end position of the AST node.
 * 2. Find the range on the original file that corresponds to
 *    that generated range.
 * 3. Find the _end_ location of that original range.
 */
function originalEndPositionFor(sourceMap, generatedEnd) {
    // Given the generated location, find the original location of the mapping
    // that corresponds to a range on the generated file that overlaps the
    // generated file end location. Note however that this position on its
    // own is not useful because it is the position of the _start_ of the range
    // on the original file, and we want the _end_ of the range.
    const beforeEndMapping = originalPositionTryBoth(
        sourceMap,
        generatedEnd.line,
        generatedEnd.column - 1
    );
    if (beforeEndMapping.source === null) {
        return null;
    }

    // Convert that original position back to a generated one, with a bump
    // to the right, and a rightward bias. Since 'generatedPositionFor' searches
    // for mappings in the original-order sorted list, this will find the
    // mapping that corresponds to the one immediately after the
    // beforeEndMapping mapping.
    const afterEndMapping = sourceMap.generatedPositionFor({
        source: beforeEndMapping.source,
        line: beforeEndMapping.line,
        column: beforeEndMapping.column + 1,
        bias: LEAST_UPPER_BOUND
    });
    if (
        // If this is null, it means that we've hit the end of the file,
        // so we can use Infinity as the end column.
        afterEndMapping.line === null ||
        // If these don't match, it means that the call to
        // 'generatedPositionFor' didn't find any other original mappings on
        // the line we gave, so consider the binding to extend to infinity.
        sourceMap.originalPositionFor(afterEndMapping).line !==
            beforeEndMapping.line
    ) {
        return {
            source: beforeEndMapping.source,
            line: beforeEndMapping.line,
            column: Infinity
        };
    }

    // Convert the end mapping into the real original position.
    return sourceMap.originalPositionFor(afterEndMapping);
}

/**
 * Attempts to determine the original source position, first
 * returning the closest element to the left (GREATEST_LOWER_BOUND),
 * and next returning the closest element to the right (LEAST_UPPER_BOUND).
 */
function originalPositionTryBoth(sourceMap, line, column) {
    const mapping = sourceMap.originalPositionFor({
        line,
        column,
        bias: GREATEST_LOWER_BOUND
    });
    if (mapping.source === null) {
        return sourceMap.originalPositionFor({
            line,
            column,
            bias: LEAST_UPPER_BOUND
        });
    } else {
        return mapping;
    }
}

function isInvalidPosition(pos) {
    return (
        !pos ||
        typeof pos.line !== 'number' ||
        typeof pos.column !== 'number' ||
        pos.line < 0 ||
        pos.column < 0
    );
}

/**
 * determines the original position for a given location
 * @param  {SourceMapConsumer} sourceMap the source map
 * @param  {Object} generatedLocation the original location Object
 * @returns {Object} the remapped location Object
 */
function getMapping(sourceMap, generatedLocation, origFile) {
    if (!generatedLocation) {
        return null;
    }

    if (
        isInvalidPosition(generatedLocation.start) ||
        isInvalidPosition(generatedLocation.end)
    ) {
        return null;
    }

    const start = originalPositionTryBoth(
        sourceMap,
        generatedLocation.start.line,
        generatedLocation.start.column
    );
    let end = originalEndPositionFor(sourceMap, generatedLocation.end);

    /* istanbul ignore if: edge case too hard to test for */
    if (!(start && end)) {
        return null;
    }

    if (!(start.source && end.source)) {
        return null;
    }

    if (start.source !== end.source) {
        return null;
    }

    /* istanbul ignore if: edge case too hard to test for */
    if (start.line === null || start.column === null) {
        return null;
    }

    /* istanbul ignore if: edge case too hard to test for */
    if (end.line === null || end.column === null) {
        return null;
    }

    if (start.line === end.line && start.column === end.column) {
        end = sourceMap.originalPositionFor({
            line: generatedLocation.end.line,
            column: generatedLocation.end.column,
            bias: LEAST_UPPER_BOUND
        });
        end.column -= 1;
    }

    return {
        source: pathutils.relativeTo(start.source, origFile),
        loc: {
            start: {
                line: start.line,
                column: start.column
            },
            end: {
                line: end.line,
                column: end.column
            }
        }
    };
}

exports_istanbuljs_istanbuljs_packages_istanbul_lib_source_maps_lib_get_mapping = getMapping;



/*
file https://github.com/istanbuljs/istanbuljs/blob/istanbul-reports@2.2.5/packages/istanbul-lib-source-maps/lib/map-store.js
*/
var exports_istanbuljs_istanbuljs_packages_istanbul_lib_source_maps_lib_map_store = {};
/*
 Copyright 2015, Yahoo Inc.
 Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
'use strict';

// const path = require('path');
// const fs = require('fs');
// const debug = require('debug')('istanbuljs');
// const SMC = require('source-map').SourceMapConsumer;
const pathutils = exports_istanbuljs_istanbuljs_packages_istanbul_lib_source_maps_lib_pathutils;
const sourceStore = exports_istanbuljs_istanbuljs_packages_istanbul_lib_source_maps_lib_source_store;
const transformer = exports_istanbuljs_istanbuljs_packages_istanbul_lib_source_maps_lib_transformer;

/**
 * Tracks source maps for registered files
 */
class MapStore {
    /**
     * @param {Object} opts [opts=undefined] options.
     * @param {Boolean} opts.verbose [opts.verbose=false] verbose mode
     * @param {String} opts.baseDir [opts.baseDir=null] alternate base directory
     *  to resolve sourcemap files
     * @param {String} opts.sourceStore [opts.sourceStore='memory'] - store that tracks
     *  embedded sources found in source maps, one of 'memory' or 'file'
     * @param {String} opts.tmpdir [opts.tmpdir=undefined] - temporary directory
     *   to use for storing files.
     * @constructor
     */
    constructor(opts = {}) {
        this.baseDir = opts.baseDir || null;
        this.verbose = opts.verbose || false;
        this.sourceStore = sourceStore.create(opts.sourceStore, {
            tmpdir: opts.tmpdir
        });
        this.data = Object.create(null);
    }

    /**
     * Registers a source map URL with this store. It makes some input sanity checks
     * and silently fails on malformed input.
     * @param transformedFilePath - the file path for which the source map is valid.
     *  This must *exactly* match the path stashed for the coverage object to be
     *  useful.
     * @param sourceMapUrl - the source map URL, **not** a comment
     */
    registerURL(transformedFilePath, sourceMapUrl) {
        const d = 'data:';

        if (
            sourceMapUrl.length > d.length &&
            sourceMapUrl.substring(0, d.length) === d
        ) {
            const b64 = 'base64,';
            const pos = sourceMapUrl.indexOf(b64);
            if (pos > 0) {
                this.data[transformedFilePath] = {
                    type: 'encoded',
                    data: sourceMapUrl.substring(pos + b64.length)
                };
            } else {
                debug(`Unable to interpret source map URL: ${sourceMapUrl}`);
            }

            return;
        }

        const dir = path.dirname(path.resolve(transformedFilePath));
        const file = path.resolve(dir, sourceMapUrl);
        this.data[transformedFilePath] = { type: 'file', data: file };
    }

    /**
     * Registers a source map object with this store. Makes some basic sanity checks
     * and silently fails on malformed input.
     * @param transformedFilePath - the file path for which the source map is valid
     * @param sourceMap - the source map object
     */
    registerMap(transformedFilePath, sourceMap) {
        if (sourceMap && sourceMap.version) {
            this.data[transformedFilePath] = {
                type: 'object',
                data: sourceMap
            };
        } else {
            debug(
                'Invalid source map object: ' +
                    JSON.stringify(sourceMap, null, 2)
            );
        }
    }

    /**
     * Transforms the coverage map provided into one that refers to original
     * sources when valid mappings have been registered with this store.
     * @param {CoverageMap} coverageMap - the coverage map to transform
     * @returns {Object} an object with 2 properties. `map` for the transformed
     * coverage map and `sourceFinder` which is a function to return the source
     * text for a file.
     */
    transformCoverage(coverageMap) {
        const sourceFinder = filePath => {
            const content = this.sourceStore.getSource(filePath);
            if (content !== null) {
                return content;
            }

            if (path.isAbsolute(filePath)) {
                return fs.readFileSync(filePath, 'utf8');
            }

            return fs.readFileSync(
                pathutils.asAbsolute(filePath, this.baseDir)
            );
        };

        coverageMap.files().forEach(file => {
            const coverage = coverageMap.fileCoverageFor(file);
            if (coverage.data.inputSourceMap && !this.data[file]) {
                this.registerMap(file, coverage.data.inputSourceMap);
            }
        });

        if (Object.keys(this.data).length === 0) {
            return {
                map: coverageMap,
                sourceFinder
            };
        }

        const mappedCoverage = transformer
            .create(filePath => {
                try {
                    if (!this.data[filePath]) {
                        return null;
                    }

                    const d = this.data[filePath];
                    let obj;
                    if (d.type === 'file') {
                        obj = JSON.parse(fs.readFileSync(d.data, 'utf8'));
                    } else if (d.type === 'encoded') {
                        obj = JSON.parse(
                            Buffer.from(d.data, 'base64').toString()
                        );
                    } else {
                        obj = d.data;
                    }

                    const smc = new SMC(obj);
                    smc.sources.forEach(s => {
                        const content = smc.sourceContentFor(s);
                        if (content) {
                            const sourceFilePath = pathutils.relativeTo(
                                s,
                                filePath
                            );
                            this.sourceStore.registerSource(
                                sourceFilePath,
                                content
                            );
                        }
                    });

                    return smc;
                } catch (error) {
                    debug('Error returning source map for ' + filePath);
                    debug(error.stack);

                    return null;
                }
            })
            .transform(coverageMap);

        return {
            map: mappedCoverage,
            sourceFinder
        };
    }

    /**
     * Disposes temporary resources allocated by this map store
     */
    dispose() {
        this.sourceStore.dispose();
    }
}

exports_istanbuljs_istanbuljs_packages_istanbul_lib_source_maps_lib_map_store = { MapStore };



/*
file https://github.com/istanbuljs/istanbuljs/blob/istanbul-reports@2.2.5/packages/istanbul-lib-source-maps/lib/mapped.js
*/
var exports_istanbuljs_istanbuljs_packages_istanbul_lib_source_maps_lib_mapped = {};
/*
 Copyright 2015, Yahoo Inc.
 Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
'use strict';

// const { FileCoverage } = require('istanbul-lib-coverage').classes;

function locString(loc) {
    return [
        loc.start.line,
        loc.start.column,
        loc.end.line,
        loc.end.column
    ].join(':');
}

class MappedCoverage extends FileCoverage {
    constructor(pathOrObj) {
        super(pathOrObj);

        this.meta = {
            last: {
                s: 0,
                f: 0,
                b: 0
            },
            seen: {}
        };
    }

    addStatement(loc, hits) {
        const key = 's:' + locString(loc);
        const { meta } = this;
        let index = meta.seen[key];

        if (index === undefined) {
            index = meta.last.s;
            meta.last.s += 1;
            meta.seen[key] = index;
            this.statementMap[index] = this.cloneLocation(loc);
        }

        this.s[index] = this.s[index] || 0;
        this.s[index] += hits;
        return index;
    }

    addFunction(name, decl, loc, hits) {
        const key = 'f:' + locString(decl);
        const { meta } = this;
        let index = meta.seen[key];

        if (index === undefined) {
            index = meta.last.f;
            meta.last.f += 1;
            meta.seen[key] = index;
            name = name || `(unknown_${index})`;
            this.fnMap[index] = {
                name,
                decl: this.cloneLocation(decl),
                loc: this.cloneLocation(loc)
            };
        }

        this.f[index] = this.f[index] || 0;
        this.f[index] += hits;
        return index;
    }

    addBranch(type, loc, branchLocations, hits) {
        const key = ['b', ...branchLocations.map(l => locString(l))].join(':');
        const { meta } = this;
        let index = meta.seen[key];
        if (index === undefined) {
            index = meta.last.b;
            meta.last.b += 1;
            meta.seen[key] = index;
            this.branchMap[index] = {
                loc,
                type,
                locations: branchLocations.map(l => this.cloneLocation(l))
            };
        }

        if (!this.b[index]) {
            this.b[index] = branchLocations.map(() => 0);
        }

        hits.forEach((hit, i) => {
            this.b[index][i] += hit;
        });
        return index;
    }

    /* Returns a clone of the location object with only the attributes of interest */
    cloneLocation(loc) {
        return {
            start: {
                line: loc.start.line,
                column: loc.start.column
            },
            end: {
                line: loc.end.line,
                column: loc.end.column
            }
        };
    }
}

exports_istanbuljs_istanbuljs_packages_istanbul_lib_source_maps_lib_mapped = {
    MappedCoverage
};



/*
file https://github.com/istanbuljs/istanbuljs/blob/istanbul-reports@2.2.5/packages/istanbul-lib-source-maps/lib/pathutils.js
*/
var exports_istanbuljs_istanbuljs_packages_istanbul_lib_source_maps_lib_pathutils = {};
/*
 Copyright 2015, Yahoo Inc.
 Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
'use strict';

// const path = require('path');

exports_istanbuljs_istanbuljs_packages_istanbul_lib_source_maps_lib_pathutils = {
    isAbsolute: path.isAbsolute,
    asAbsolute(file, baseDir) {
        return path.isAbsolute(file)
            ? file
            : path.resolve(baseDir || process.cwd(), file);
    },
    relativeTo(file, origFile) {
        return path.isAbsolute(file)
            ? file
            : path.resolve(path.dirname(origFile), file);
    }
};



/*
file https://github.com/istanbuljs/istanbuljs/blob/istanbul-reports@2.2.5/packages/istanbul-lib-source-maps/lib/source-store.js
*/
var exports_istanbuljs_istanbuljs_packages_istanbul_lib_source_maps_lib_source_store = {};
/*
 Copyright 2015, Yahoo Inc.
 Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
'use strict';

// const fs = require('fs');
// const os = require('os');
// const path = require('path');
// const mkdirp = require('make-dir');
// const rimraf = require('rimraf');

/* This exists for compatibility only to avoid changing the
 * prototype chain. */
class SourceStore {}

class MemoryStore extends SourceStore {
    constructor() {
        super();

        this.data = {};
    }

    registerSource(filePath, sourceText) {
        this.data[filePath] = sourceText;
    }

    getSource(filePath) {
        return this.data[filePath] || null;
    }

    dispose() {}
}

class FileStore extends SourceStore {
    constructor(opts = {}) {
        super();

        const tmpDir = opts.tmpdir || os.tmpdir();
        this.counter = 0;
        this.mappings = [];
        this.basePath = path.resolve(tmpDir, '.istanbul', 'cache_');
        mkdirp.sync(path.dirname(this.basePath));
    }

    registerSource(filePath, sourceText) {
        if (this.mappings[filePath]) {
            return;
        }

        this.counter += 1;
        const mapFile = this.basePath + this.counter;
        this.mappings[filePath] = mapFile;
        fs.writeFileSync(mapFile, sourceText, 'utf8');
    }

    getSource(filePath) {
        const mapFile = this.mappings[filePath];
        if (!mapFile) {
            return null;
        }

        return fs.readFileSync(mapFile, 'utf8');
    }

    dispose() {
        this.mappings = [];
        rimraf.sync(path.dirname(this.basePath));
    }
}

exports_istanbuljs_istanbuljs_packages_istanbul_lib_source_maps_lib_source_store = {
    create(type = 'memory', opts = {}) {
        if (type.toLowerCase() === 'file') {
            return new FileStore(opts);
        }

        return new MemoryStore(opts);
    }
};



/*
file https://github.com/istanbuljs/istanbuljs/blob/istanbul-reports@2.2.5/packages/istanbul-lib-source-maps/lib/transform-utils.js
*/
var exports_istanbuljs_istanbuljs_packages_istanbul_lib_source_maps_lib_transform_utils = {};
/*
 Copyright 2015, Yahoo Inc.
 Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
'use strict';

function getUniqueKey(pathname) {
    return pathname.replace(/[\\/]/g, '_');
}

function getOutput(cache) {
    return Object.keys(cache).reduce((output, key) => {
        const item = cache[key];
        return Object.assign(output, {
            [item.file]: item.mappedCoverage
        });
    }, {});
}

exports_istanbuljs_istanbuljs_packages_istanbul_lib_source_maps_lib_transform_utils = { getUniqueKey, getOutput };



/*
file https://github.com/istanbuljs/istanbuljs/blob/istanbul-reports@2.2.5/packages/istanbul-lib-source-maps/lib/transformer.js
*/
var exports_istanbuljs_istanbuljs_packages_istanbul_lib_source_maps_lib_transformer = {};
/*
 Copyright 2015, Yahoo Inc.
 Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
'use strict';

// const debug = require('debug')('istanbuljs');
// const libCoverage = require('istanbul-lib-coverage');
const { MappedCoverage } = exports_istanbuljs_istanbuljs_packages_istanbul_lib_source_maps_lib_mapped;
const getMapping = exports_istanbuljs_istanbuljs_packages_istanbul_lib_source_maps_lib_get_mapping;
const { getUniqueKey, getOutput } = exports_istanbuljs_istanbuljs_packages_istanbul_lib_source_maps_lib_transform_utils;

class SourceMapTransformer {
    constructor(finder, opts = {}) {
        this.finder = finder;
        this.baseDir = opts.baseDir || process.cwd();
    }

    processFile(fc, sourceMap, coverageMapper) {
        let changes = 0;

        Object.keys(fc.statementMap).forEach(s => {
            const loc = fc.statementMap[s];
            const hits = fc.s[s];
            const mapping = getMapping(sourceMap, loc, fc.path);

            if (mapping) {
                changes += 1;
                const mappedCoverage = coverageMapper(mapping.source);
                mappedCoverage.addStatement(mapping.loc, hits);
            }
        });

        Object.keys(fc.fnMap).forEach(f => {
            const fnMeta = fc.fnMap[f];
            const hits = fc.f[f];
            const mapping = getMapping(sourceMap, fnMeta.decl, fc.path);
            const spanMapping = getMapping(sourceMap, fnMeta.loc, fc.path);

            if (
                mapping &&
                spanMapping &&
                mapping.source === spanMapping.source
            ) {
                changes += 1;
                const mappedCoverage = coverageMapper(mapping.source);
                mappedCoverage.addFunction(
                    fnMeta.name,
                    mapping.loc,
                    spanMapping.loc,
                    hits
                );
            }
        });

        Object.keys(fc.branchMap).forEach(b => {
            const branchMeta = fc.branchMap[b];
            const hits = fc.b[b];
            const locs = [];
            const mappedHits = [];
            let source;
            let skip;

            branchMeta.locations.forEach((loc, i) => {
                const mapping = getMapping(sourceMap, loc, fc.path);
                if (mapping) {
                    if (!source) {
                        source = mapping.source;
                    }

                    if (mapping.source !== source) {
                        skip = true;
                    }

                    locs.push(mapping.loc);
                    mappedHits.push(hits[i]);
                }
            });

            if (!skip && locs.length > 0) {
                changes += 1;
                const mappedCoverage = coverageMapper(source);
                mappedCoverage.addBranch(
                    branchMeta.type,
                    locs[0] /* XXX */,
                    locs,
                    mappedHits
                );
            }
        });

        return changes > 0;
    }

    transform(coverageMap) {
        const uniqueFiles = {};
        const getMappedCoverage = file => {
            const key = getUniqueKey(file);
            if (!uniqueFiles[key]) {
                uniqueFiles[key] = {
                    file,
                    mappedCoverage: new MappedCoverage(file)
                };
            }

            return uniqueFiles[key].mappedCoverage;
        };

        coverageMap.files().forEach(file => {
            const fc = coverageMap.fileCoverageFor(file);
            const sourceMap = this.finder(file);
            if (!sourceMap) {
                uniqueFiles[getUniqueKey(file)] = {
                    file,
                    mappedCoverage: fc
                };
                return;
            }

            const changed = this.processFile(fc, sourceMap, getMappedCoverage);
            if (!changed) {
                debug(`File [${file}] ignored, nothing could be mapped`);
            }
        });

        return libCoverage.createCoverageMap(getOutput(uniqueFiles));
    }
}

exports_istanbuljs_istanbuljs_packages_istanbul_lib_source_maps_lib_transformer = {
    create(finder, opts) {
        return new SourceMapTransformer(finder, opts);
    }
};



/*
file https://github.com/istanbuljs/istanbuljs/blob/istanbul-reports@2.2.5/packages/istanbul-lib-source-maps/package.json
*/
var exports_istanbuljs_istanbuljs_packages_istanbul_lib_source_maps_package_json = {};
{
  "name": "istanbul-lib-source-maps",
  "version": "3.0.6",
  "description": "Source maps support for istanbul",
  "author": "Krishnan Anantheswaran <kananthmail-github@yahoo.com>",
  "main": "index.js",
  "files": [
    "lib",
    "index.js"
  ],
  "scripts": {
    "test": "mocha"
  },
  "dependencies": {
    "debug": "^4.1.1",
    "istanbul-lib-coverage": "^2.0.5",
    "make-dir": "^2.1.0",
    "rimraf": "^2.6.3",
    "source-map": "^0.6.1"
  },
  "devDependencies": {
    "ts-node": "^8.1.0"
  },
  "license": "BSD-3-Clause",
  "bugs": {
    "url": "https://github.com/istanbuljs/istanbuljs/issues"
  },
  "homepage": "https://istanbul.js.org/",
  "repository": {
    "type": "git",
    "url": "git+ssh://git@github.com/istanbuljs/istanbuljs.git"
  },
  "keywords": [
    "istanbul",
    "sourcemaps",
    "sourcemap",
    "source",
    "maps"
  ],
  "engines": {
    "node": ">=6"
  }
}



/*
file https://github.com/istanbuljs/istanbuljs/blob/istanbul-reports@2.2.5/packages/istanbul-reports/index.js
*/
var exports_istanbuljs_istanbuljs_packages_istanbul_reports_index = {};
/*
 Copyright 2012-2015, Yahoo Inc.
 Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
// const path = require('path');

exports_istanbuljs_istanbuljs_packages_istanbul_reports_index = {
    create(name, cfg) {
        cfg = cfg || {};
        let Cons;
        try {
            Cons = require(path.join(__dirname, 'lib', name));
        } catch (e) {
            Cons = require(name);
        }

        return new Cons(cfg);
    }
};



/*
file https://github.com/istanbuljs/istanbuljs/blob/istanbul-reports@2.2.5/packages/istanbul-reports/lib/clover/index.js
*/
var exports_istanbuljs_istanbuljs_packages_istanbul_reports_lib_clover_index = {};
/*
 Copyright 2012-2015, Yahoo Inc.
 Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
function CloverReport(opts) {
    this.cw = null;
    this.xml = null;
    this.projectRoot = opts.projectRoot || process.cwd();
    this.file = opts.file || 'clover.xml';
}

function asJavaPackage(node) {
    return node
        .getRelativeName()
        .replace(/\//g, '.')
        .replace(/\\/g, '.')
        .replace(/\.$/, '');
}

function asClassName(node) {
    return node.getRelativeName().replace(/.*[\\/]/, '');
}

CloverReport.prototype.onStart = function(root, context) {
    this.cw = context.writer.writeFile(this.file);
    this.xml = context.getXMLWriter(this.cw);
    this.writeRootStats(root, context);
};

CloverReport.prototype.onEnd = function() {
    this.xml.closeAll();
    this.cw.close();
};

CloverReport.prototype.getTreeStats = function(node, context) {
    const state = {
        packages: 0,
        files: 0,
        classes: 0
    };
    const visitor = {
        onSummary(node, state) {
            const metrics = node.getCoverageSummary(true);
            if (metrics) {
                state.packages += 1;
            }
        },
        onDetail(node, state) {
            state.classes += 1;
            state.files += 1;
        }
    };
    node.visit(context.getVisitor(visitor), state);
    return state;
};

CloverReport.prototype.writeRootStats = function(node, context) {
    const metrics = node.getCoverageSummary();
    const attrs = {
        statements: metrics.lines.total,
        coveredstatements: metrics.lines.covered,
        conditionals: metrics.branches.total,
        coveredconditionals: metrics.branches.covered,
        methods: metrics.functions.total,
        coveredmethods: metrics.functions.covered,
        elements:
            metrics.lines.total +
            metrics.branches.total +
            metrics.functions.total,
        coveredelements:
            metrics.lines.covered +
            metrics.branches.covered +
            metrics.functions.covered,
        complexity: 0,
        loc: metrics.lines.total,
        ncloc: metrics.lines.total // what? copied as-is from old report
    };

    this.cw.println('<?xml version="1.0" encoding="UTF-8"?>');
    this.xml.openTag('coverage', {
        generated: Date.now().toString(),
        clover: '3.2.0'
    });

    this.xml.openTag('project', {
        timestamp: Date.now().toString(),
        name: 'All files'
    });

    const treeStats = this.getTreeStats(node, context);
    Object.keys(treeStats).forEach(k => {
        attrs[k] = treeStats[k];
    });

    this.xml.inlineTag('metrics', attrs);
};

CloverReport.prototype.writeMetrics = function(metrics) {
    this.xml.inlineTag('metrics', {
        statements: metrics.lines.total,
        coveredstatements: metrics.lines.covered,
        conditionals: metrics.branches.total,
        coveredconditionals: metrics.branches.covered,
        methods: metrics.functions.total,
        coveredmethods: metrics.functions.covered
    });
};

CloverReport.prototype.onSummary = function(node) {
    if (node.isRoot()) {
        return;
    }
    const metrics = node.getCoverageSummary(true);
    if (!metrics) {
        return;
    }

    this.xml.openTag('package', {
        name: asJavaPackage(node)
    });
    this.writeMetrics(metrics);
};

CloverReport.prototype.onSummaryEnd = function(node) {
    if (node.isRoot()) {
        return;
    }
    this.xml.closeTag('package');
};

CloverReport.prototype.onDetail = function(node) {
    const fileCoverage = node.getFileCoverage();
    const metrics = node.getCoverageSummary();
    const branchByLine = fileCoverage.getBranchCoverageByLine();

    this.xml.openTag('file', {
        name: asClassName(node),
        path: fileCoverage.path
    });

    this.writeMetrics(metrics);

    const lines = fileCoverage.getLineCoverage();
    Object.keys(lines).forEach(k => {
        const attrs = {
            num: k,
            count: lines[k],
            type: 'stmt'
        };
        const branchDetail = branchByLine[k];

        if (branchDetail) {
            attrs.type = 'cond';
            attrs.truecount = branchDetail.covered;
            attrs.falsecount = branchDetail.total - branchDetail.covered;
        }
        this.xml.inlineTag('line', attrs);
    });

    this.xml.closeTag('file');
};

exports_istanbuljs_istanbuljs_packages_istanbul_reports_lib_clover_index = CloverReport;



/*
file https://github.com/istanbuljs/istanbuljs/blob/istanbul-reports@2.2.5/packages/istanbul-reports/lib/cobertura/index.js
*/
var exports_istanbuljs_istanbuljs_packages_istanbul_reports_lib_cobertura_index = {};
/*
 Copyright 2012-2015, Yahoo Inc.
 Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
// const path = require('path');
function CoberturaReport(opts) {
    this.cw = null;
    this.xml = null;
    this.projectRoot = opts.projectRoot || process.cwd();
    this.file = opts.file || 'cobertura-coverage.xml';
}

function asJavaPackage(node) {
    return node
        .getRelativeName()
        .replace(/\//g, '.')
        .replace(/\\/g, '.')
        .replace(/\.$/, '');
}

function asClassName(node) {
    return node.getRelativeName().replace(/.*[\\/]/, '');
}

CoberturaReport.prototype.onStart = function(root, context) {
    this.cw = context.writer.writeFile(this.file);
    this.xml = context.getXMLWriter(this.cw);
    this.writeRootStats(root);
};

CoberturaReport.prototype.onEnd = function() {
    this.xml.closeAll();
    this.cw.close();
};

CoberturaReport.prototype.writeRootStats = function(node) {
    const metrics = node.getCoverageSummary();
    this.cw.println('<?xml version="1.0" ?>');
    this.cw.println(
        '<!DOCTYPE coverage SYSTEM "http://cobertura.sourceforge.net/xml/coverage-04.dtd">'
    );
    this.xml.openTag('coverage', {
        'lines-valid': metrics.lines.total,
        'lines-covered': metrics.lines.covered,
        'line-rate': metrics.lines.pct / 100.0,
        'branches-valid': metrics.branches.total,
        'branches-covered': metrics.branches.covered,
        'branch-rate': metrics.branches.pct / 100.0,
        timestamp: Date.now().toString(),
        complexity: '0',
        version: '0.1'
    });
    this.xml.openTag('sources');
    this.xml.inlineTag('source', null, this.projectRoot);
    this.xml.closeTag('sources');
    this.xml.openTag('packages');
};

CoberturaReport.prototype.onSummary = function(node) {
    const metrics = node.getCoverageSummary(true);
    if (!metrics) {
        return;
    }
    this.xml.openTag('package', {
        name: asJavaPackage(node),
        'line-rate': metrics.lines.pct / 100.0,
        'branch-rate': metrics.branches.pct / 100.0
    });
    this.xml.openTag('classes');
};

CoberturaReport.prototype.onSummaryEnd = function() {
    this.xml.closeTag('classes');
    this.xml.closeTag('package');
};

CoberturaReport.prototype.onDetail = function(node) {
    const fileCoverage = node.getFileCoverage();
    const metrics = node.getCoverageSummary();
    const branchByLine = fileCoverage.getBranchCoverageByLine();

    this.xml.openTag('class', {
        name: asClassName(node),
        filename: path.relative(this.projectRoot, fileCoverage.path),
        'line-rate': metrics.lines.pct / 100.0,
        'branch-rate': metrics.branches.pct / 100.0
    });

    this.xml.openTag('methods');
    const fnMap = fileCoverage.fnMap;
    Object.keys(fnMap).forEach(k => {
        const name = fnMap[k].name;
        const hits = fileCoverage.f[k];
        this.xml.openTag('method', {
            name,
            hits,
            signature: '()V' //fake out a no-args void return
        });
        this.xml.openTag('lines');
        //Add the function definition line and hits so that jenkins cobertura plugin records method hits
        this.xml.inlineTag('line', {
            number: fnMap[k].decl.start.line,
            hits
        });
        this.xml.closeTag('lines');
        this.xml.closeTag('method');
    });
    this.xml.closeTag('methods');

    this.xml.openTag('lines');
    const lines = fileCoverage.getLineCoverage();
    Object.keys(lines).forEach(k => {
        const attrs = {
            number: k,
            hits: lines[k],
            branch: 'false'
        };
        const branchDetail = branchByLine[k];

        if (branchDetail) {
            attrs.branch = true;
            attrs['condition-coverage'] =
                branchDetail.coverage +
                '% (' +
                branchDetail.covered +
                '/' +
                branchDetail.total +
                ')';
        }
        this.xml.inlineTag('line', attrs);
    });

    this.xml.closeTag('lines');
    this.xml.closeTag('class');
};

exports_istanbuljs_istanbuljs_packages_istanbul_reports_lib_cobertura_index = CoberturaReport;



/*
file https://github.com/istanbuljs/istanbuljs/blob/istanbul-reports@2.2.5/packages/istanbul-reports/lib/html/annotator.js
*/
var exports_istanbuljs_istanbuljs_packages_istanbul_reports_lib_html_annotator = {};
/*
 Copyright 2012-2015, Yahoo Inc.
 Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
'use strict';

const InsertionText = exports_istanbuljs_istanbuljs_packages_istanbul_reports_lib_html_insertion_text;
const lt = '\u0001';
const gt = '\u0002';
const RE_LT = /</g;
const RE_GT = />/g;
const RE_AMP = /&/g;
// eslint-disable-next-line
var RE_lt = /\u0001/g;
// eslint-disable-next-line
var RE_gt = /\u0002/g;

function title(str) {
    return ' title="' + str + '" ';
}

function customEscape(text) {
    text = String(text);
    return text
        .replace(RE_AMP, '&amp;')
        .replace(RE_LT, '&lt;')
        .replace(RE_GT, '&gt;')
        .replace(RE_lt, '<')
        .replace(RE_gt, '>');
}

function annotateLines(fileCoverage, structuredText) {
    const lineStats = fileCoverage.getLineCoverage();
    if (!lineStats) {
        return;
    }
    Object.keys(lineStats).forEach(lineNumber => {
        const count = lineStats[lineNumber];
        if (structuredText[lineNumber]) {
            structuredText[lineNumber].covered = count > 0 ? 'yes' : 'no';
            structuredText[lineNumber].hits = count;
        }
    });
}

function annotateStatements(fileCoverage, structuredText) {
    const statementStats = fileCoverage.s;
    const statementMeta = fileCoverage.statementMap;
    Object.keys(statementStats).forEach(stName => {
        const count = statementStats[stName];
        const meta = statementMeta[stName];
        const type = count > 0 ? 'yes' : 'no';
        const startCol = meta.start.column;
        let endCol = meta.end.column + 1;
        const startLine = meta.start.line;
        const endLine = meta.end.line;
        const openSpan =
            lt +
            'span class="' +
            (meta.skip ? 'cstat-skip' : 'cstat-no') +
            '"' +
            title('statement not covered') +
            gt;
        const closeSpan = lt + '/span' + gt;
        let text;

        if (type === 'no' && structuredText[startLine]) {
            if (endLine !== startLine) {
                endCol = structuredText[startLine].text.originalLength();
            }
            text = structuredText[startLine].text;
            text.wrap(
                startCol,
                openSpan,
                startCol < endCol ? endCol : text.originalLength(),
                closeSpan
            );
        }
    });
}

function annotateFunctions(fileCoverage, structuredText) {
    const fnStats = fileCoverage.f;
    const fnMeta = fileCoverage.fnMap;
    if (!fnStats) {
        return;
    }
    Object.keys(fnStats).forEach(fName => {
        const count = fnStats[fName];
        const meta = fnMeta[fName];
        const type = count > 0 ? 'yes' : 'no';
        const startCol = meta.decl.start.column;
        let endCol = meta.decl.end.column + 1;
        const startLine = meta.decl.start.line;
        const endLine = meta.decl.end.line;
        const openSpan =
            lt +
            'span class="' +
            (meta.skip ? 'fstat-skip' : 'fstat-no') +
            '"' +
            title('function not covered') +
            gt;
        const closeSpan = lt + '/span' + gt;
        let text;

        if (type === 'no' && structuredText[startLine]) {
            if (endLine !== startLine) {
                endCol = structuredText[startLine].text.originalLength();
            }
            text = structuredText[startLine].text;
            text.wrap(
                startCol,
                openSpan,
                startCol < endCol ? endCol : text.originalLength(),
                closeSpan
            );
        }
    });
}

function annotateBranches(fileCoverage, structuredText) {
    const branchStats = fileCoverage.b;
    const branchMeta = fileCoverage.branchMap;
    if (!branchStats) {
        return;
    }

    Object.keys(branchStats).forEach(branchName => {
        const branchArray = branchStats[branchName];
        const sumCount = branchArray.reduce((p, n) => p + n, 0);
        const metaArray = branchMeta[branchName].locations;
        let i;
        let count;
        let meta;
        let startCol;
        let endCol;
        let startLine;
        let endLine;
        let openSpan;
        let closeSpan;
        let text;

        // only highlight if partial branches are missing or if there is a
        // single uncovered branch.
        if (sumCount > 0 || (sumCount === 0 && branchArray.length === 1)) {
            for (
                i = 0;
                i < branchArray.length && i < metaArray.length;
                i += 1
            ) {
                count = branchArray[i];
                meta = metaArray[i];
                startCol = meta.start.column;
                endCol = meta.end.column + 1;
                startLine = meta.start.line;
                endLine = meta.end.line;
                openSpan =
                    lt +
                    'span class="branch-' +
                    i +
                    ' ' +
                    (meta.skip ? 'cbranch-skip' : 'cbranch-no') +
                    '"' +
                    title('branch not covered') +
                    gt;
                closeSpan = lt + '/span' + gt;

                if (count === 0 && structuredText[startLine]) {
                    //skip branches taken
                    if (endLine !== startLine) {
                        endCol = structuredText[
                            startLine
                        ].text.originalLength();
                    }
                    text = structuredText[startLine].text;
                    if (branchMeta[branchName].type === 'if') {
                        // 'if' is a special case
                        // since the else branch might not be visible, being non-existent
                        text.insertAt(
                            startCol,
                            lt +
                                'span class="' +
                                (meta.skip
                                    ? 'skip-if-branch'
                                    : 'missing-if-branch') +
                                '"' +
                                title(
                                    (i === 0 ? 'if' : 'else') +
                                        ' path not taken'
                                ) +
                                gt +
                                (i === 0 ? 'I' : 'E') +
                                lt +
                                '/span' +
                                gt,
                            true,
                            false
                        );
                    } else {
                        text.wrap(
                            startCol,
                            openSpan,
                            startCol < endCol ? endCol : text.originalLength(),
                            closeSpan
                        );
                    }
                }
            }
        }
    });
}

function annotateSourceCode(fileCoverage, sourceStore) {
    let codeArray;
    let lineCoverageArray;
    try {
        const sourceText = sourceStore.getSource(fileCoverage.path);
        const code = sourceText.split(/(?:\r?\n)|\r/);
        let count = 0;
        const structured = code.map(str => {
            count += 1;
            return {
                line: count,
                covered: 'neutral',
                hits: 0,
                text: new InsertionText(str, true)
            };
        });
        structured.unshift({
            line: 0,
            covered: null,
            text: new InsertionText('')
        });
        annotateLines(fileCoverage, structured);
        //note: order is important, since statements typically result in spanning the whole line and doing branches late
        //causes mismatched tags
        annotateBranches(fileCoverage, structured);
        annotateFunctions(fileCoverage, structured);
        annotateStatements(fileCoverage, structured);
        structured.shift();

        codeArray = structured.map(
            item => customEscape(item.text.toString()) || '&nbsp;'
        );

        lineCoverageArray = structured.map(item => ({
            covered: item.covered,
            hits: item.hits > 0 ? item.hits + 'x' : '&nbsp;'
        }));

        return {
            annotatedCode: codeArray,
            lineCoverage: lineCoverageArray,
            maxLines: structured.length
        };
    } catch (ex) {
        codeArray = [ex.message];
        lineCoverageArray = [{ covered: 'no', hits: 0 }];
        String(ex.stack || '')
            .split(/\r?\n/)
            .forEach(line => {
                codeArray.push(line);
                lineCoverageArray.push({ covered: 'no', hits: 0 });
            });
        return {
            annotatedCode: codeArray,
            lineCoverage: lineCoverageArray,
            maxLines: codeArray.length
        };
    }
}

exports_istanbuljs_istanbuljs_packages_istanbul_reports_lib_html_annotator = {
    annotateSourceCode
};



/*
file https://github.com/istanbuljs/istanbuljs/blob/istanbul-reports@2.2.5/packages/istanbul-reports/lib/html/assets/block-navigation.js
*/
var exports_istanbuljs_istanbuljs_packages_istanbul_reports_lib_html_assets_block_navigation = {};
var jumpToCode = (function init() {
    // Classes of code we would like to highlight in the file view
    var missingCoverageClasses = ['.cbranch-no', '.cstat-no', '.fstat-no'];

    // Elements to highlight in the file listing view
    var fileListingElements = ['td.pct.low'];

    // We don't want to select elements that are direct descendants of another match
    var notSelector = ':not(' + missingCoverageClasses.join('):not(') + ') > '; // becomes `:not(a):not(b) > `

    // Selecter that finds elements on the page to which we can jump
    var selector =
        fileListingElements.join(', ') +
        ', ' +
        notSelector +
        missingCoverageClasses.join(', ' + notSelector); // becomes `:not(a):not(b) > a, :not(a):not(b) > b`

    // The NodeList of matching elements
    var missingCoverageElements = document.querySelectorAll(selector);

    var currentIndex;

    function toggleClass(index) {
        missingCoverageElements
            .item(currentIndex)
            .classList.remove('highlighted');
        missingCoverageElements.item(index).classList.add('highlighted');
    }

    function makeCurrent(index) {
        toggleClass(index);
        currentIndex = index;
        missingCoverageElements.item(index).scrollIntoView({
            behavior: 'smooth',
            block: 'center',
            inline: 'center'
        });
    }

    function goToPrevious() {
        var nextIndex = 0;
        if (typeof currentIndex !== 'number' || currentIndex === 0) {
            nextIndex = missingCoverageElements.length - 1;
        } else if (missingCoverageElements.length > 1) {
            nextIndex = currentIndex - 1;
        }

        makeCurrent(nextIndex);
    }

    function goToNext() {
        var nextIndex = 0;

        if (
            typeof currentIndex === 'number' &&
            currentIndex < missingCoverageElements.length - 1
        ) {
            nextIndex = currentIndex + 1;
        }

        makeCurrent(nextIndex);
    }

    return function jump(event) {
        switch (event.which) {
            case 78: // n
            case 74: // j
                goToNext();
                break;
            case 66: // b
            case 75: // k
            case 80: // p
                goToPrevious();
                break;
        }
    };
})();
window.addEventListener('keydown', jumpToCode);



/*
file https://github.com/istanbuljs/istanbuljs/blob/istanbul-reports@2.2.5/packages/istanbul-reports/lib/html/assets/sorter.js
*/
var exports_istanbuljs_istanbuljs_packages_istanbul_reports_lib_html_assets_sorter = {};
var addSorting = (function() {
    'use strict';
    var cols,
        currentSort = {
            index: 0,
            desc: false
        };

    // returns the summary table element
    function getTable() {
        return document.querySelector('.coverage-summary');
    }
    // returns the thead element of the summary table
    function getTableHeader() {
        return getTable().querySelector('thead tr');
    }
    // returns the tbody element of the summary table
    function getTableBody() {
        return getTable().querySelector('tbody');
    }
    // returns the th element for nth column
    function getNthColumn(n) {
        return getTableHeader().querySelectorAll('th')[n];
    }

    // loads all columns
    function loadColumns() {
        var colNodes = getTableHeader().querySelectorAll('th'),
            colNode,
            cols = [],
            col,
            i;

        for (i = 0; i < colNodes.length; i += 1) {
            colNode = colNodes[i];
            col = {
                key: colNode.getAttribute('data-col'),
                sortable: !colNode.getAttribute('data-nosort'),
                type: colNode.getAttribute('data-type') || 'string'
            };
            cols.push(col);
            if (col.sortable) {
                col.defaultDescSort = col.type === 'number';
                colNode.innerHTML =
                    colNode.innerHTML + '<span class="sorter"></span>';
            }
        }
        return cols;
    }
    // attaches a data attribute to every tr element with an object
    // of data values keyed by column name
    function loadRowData(tableRow) {
        var tableCols = tableRow.querySelectorAll('td'),
            colNode,
            col,
            data = {},
            i,
            val;
        for (i = 0; i < tableCols.length; i += 1) {
            colNode = tableCols[i];
            col = cols[i];
            val = colNode.getAttribute('data-value');
            if (col.type === 'number') {
                val = Number(val);
            }
            data[col.key] = val;
        }
        return data;
    }
    // loads all row data
    function loadData() {
        var rows = getTableBody().querySelectorAll('tr'),
            i;

        for (i = 0; i < rows.length; i += 1) {
            rows[i].data = loadRowData(rows[i]);
        }
    }
    // sorts the table using the data for the ith column
    function sortByIndex(index, desc) {
        var key = cols[index].key,
            sorter = function(a, b) {
                a = a.data[key];
                b = b.data[key];
                return a < b ? -1 : a > b ? 1 : 0;
            },
            finalSorter = sorter,
            tableBody = document.querySelector('.coverage-summary tbody'),
            rowNodes = tableBody.querySelectorAll('tr'),
            rows = [],
            i;

        if (desc) {
            finalSorter = function(a, b) {
                return -1 * sorter(a, b);
            };
        }

        for (i = 0; i < rowNodes.length; i += 1) {
            rows.push(rowNodes[i]);
            tableBody.removeChild(rowNodes[i]);
        }

        rows.sort(finalSorter);

        for (i = 0; i < rows.length; i += 1) {
            tableBody.appendChild(rows[i]);
        }
    }
    // removes sort indicators for current column being sorted
    function removeSortIndicators() {
        var col = getNthColumn(currentSort.index),
            cls = col.className;

        cls = cls.replace(/ sorted$/, '').replace(/ sorted-desc$/, '');
        col.className = cls;
    }
    // adds sort indicators for current column being sorted
    function addSortIndicators() {
        getNthColumn(currentSort.index).className += currentSort.desc
            ? ' sorted-desc'
            : ' sorted';
    }
    // adds event listeners for all sorter widgets
    function enableUI() {
        var i,
            el,
            ithSorter = function ithSorter(i) {
                var col = cols[i];

                return function() {
                    var desc = col.defaultDescSort;

                    if (currentSort.index === i) {
                        desc = !currentSort.desc;
                    }
                    sortByIndex(i, desc);
                    removeSortIndicators();
                    currentSort.index = i;
                    currentSort.desc = desc;
                    addSortIndicators();
                };
            };
        for (i = 0; i < cols.length; i += 1) {
            if (cols[i].sortable) {
                // add the click event handler on the th so users
                // dont have to click on those tiny arrows
                el = getNthColumn(i).querySelector('.sorter').parentElement;
                if (el.addEventListener) {
                    el.addEventListener('click', ithSorter(i));
                } else {
                    el.attachEvent('onclick', ithSorter(i));
                }
            }
        }
    }
    // adds sorting functionality to the UI
    return function() {
        if (!getTable()) {
            return;
        }
        cols = loadColumns();
        loadData();
        addSortIndicators();
        enableUI();
    };
})();

window.addEventListener('load', addSorting);



/*
file https://github.com/istanbuljs/istanbuljs/blob/istanbul-reports@2.2.5/packages/istanbul-reports/lib/html/assets/vendor/prettify.js
*/
var exports_istanbuljs_istanbuljs_packages_istanbul_reports_lib_html_assets_vendor_prettify = {};
window.PR_SHOULD_USE_CONTINUATION=true;(function(){var h=["break,continue,do,else,for,if,return,while"];var u=[h,"auto,case,char,const,default,double,enum,extern,float,goto,int,long,register,short,signed,sizeof,static,struct,switch,typedef,union,unsigned,void,volatile"];var p=[u,"catch,class,delete,false,import,new,operator,private,protected,public,this,throw,true,try,typeof"];var l=[p,"alignof,align_union,asm,axiom,bool,concept,concept_map,const_cast,constexpr,decltype,dynamic_cast,explicit,export,friend,inline,late_check,mutable,namespace,nullptr,reinterpret_cast,static_assert,static_cast,template,typeid,typename,using,virtual,where"];var x=[p,"abstract,boolean,byte,extends,final,finally,implements,import,instanceof,null,native,package,strictfp,super,synchronized,throws,transient"];var R=[x,"as,base,by,checked,decimal,delegate,descending,dynamic,event,fixed,foreach,from,group,implicit,in,interface,internal,into,is,lock,object,out,override,orderby,params,partial,readonly,ref,sbyte,sealed,stackalloc,string,select,uint,ulong,unchecked,unsafe,ushort,var"];var r="all,and,by,catch,class,else,extends,false,finally,for,if,in,is,isnt,loop,new,no,not,null,of,off,on,or,return,super,then,true,try,unless,until,when,while,yes";var w=[p,"debugger,eval,export,function,get,null,set,undefined,var,with,Infinity,NaN"];var s="caller,delete,die,do,dump,elsif,eval,exit,foreach,for,goto,if,import,last,local,my,next,no,our,print,package,redo,require,sub,undef,unless,until,use,wantarray,while,BEGIN,END";var I=[h,"and,as,assert,class,def,del,elif,except,exec,finally,from,global,import,in,is,lambda,nonlocal,not,or,pass,print,raise,try,with,yield,False,True,None"];var f=[h,"alias,and,begin,case,class,def,defined,elsif,end,ensure,false,in,module,next,nil,not,or,redo,rescue,retry,self,super,then,true,undef,unless,until,when,yield,BEGIN,END"];var H=[h,"case,done,elif,esac,eval,fi,function,in,local,set,then,until"];var A=[l,R,w,s+I,f,H];var e=/^(DIR|FILE|vector|(de|priority_)?queue|list|stack|(const_)?iterator|(multi)?(set|map)|bitset|u?(int|float)\d*)/;var C="str";var z="kwd";var j="com";var O="typ";var G="lit";var L="pun";var F="pln";var m="tag";var E="dec";var J="src";var P="atn";var n="atv";var N="nocode";var M="(?:^^\\.?|[+-]|\\!|\\!=|\\!==|\\#|\\%|\\%=|&|&&|&&=|&=|\\(|\\*|\\*=|\\+=|\\,|\\-=|\\->|\\/|\\/=|:|::|\\;|<|<<|<<=|<=|=|==|===|>|>=|>>|>>=|>>>|>>>=|\\?|\\@|\\[|\\^|\\^=|\\^\\^|\\^\\^=|\\{|\\||\\|=|\\|\\||\\|\\|=|\\~|break|case|continue|delete|do|else|finally|instanceof|return|throw|try|typeof)\\s*";function k(Z){var ad=0;var S=false;var ac=false;for(var V=0,U=Z.length;V<U;++V){var ae=Z[V];if(ae.ignoreCase){ac=true}else{if(/[a-z]/i.test(ae.source.replace(/\\u[0-9a-f]{4}|\\x[0-9a-f]{2}|\\[^ux]/gi,""))){S=true;ac=false;break}}}var Y={b:8,t:9,n:10,v:11,f:12,r:13};function ab(ah){var ag=ah.charCodeAt(0);if(ag!==92){return ag}var af=ah.charAt(1);ag=Y[af];if(ag){return ag}else{if("0"<=af&&af<="7"){return parseInt(ah.substring(1),8)}else{if(af==="u"||af==="x"){return parseInt(ah.substring(2),16)}else{return ah.charCodeAt(1)}}}}function T(af){if(af<32){return(af<16?"\\x0":"\\x")+af.toString(16)}var ag=String.fromCharCode(af);if(ag==="\\"||ag==="-"||ag==="["||ag==="]"){ag="\\"+ag}return ag}function X(am){var aq=am.substring(1,am.length-1).match(new RegExp("\\\\u[0-9A-Fa-f]{4}|\\\\x[0-9A-Fa-f]{2}|\\\\[0-3][0-7]{0,2}|\\\\[0-7]{1,2}|\\\\[\\s\\S]|-|[^-\\\\]","g"));var ak=[];var af=[];var ao=aq[0]==="^";for(var ar=ao?1:0,aj=aq.length;ar<aj;++ar){var ah=aq[ar];if(/\\[bdsw]/i.test(ah)){ak.push(ah)}else{var ag=ab(ah);var al;if(ar+2<aj&&"-"===aq[ar+1]){al=ab(aq[ar+2]);ar+=2}else{al=ag}af.push([ag,al]);if(!(al<65||ag>122)){if(!(al<65||ag>90)){af.push([Math.max(65,ag)|32,Math.min(al,90)|32])}if(!(al<97||ag>122)){af.push([Math.max(97,ag)&~32,Math.min(al,122)&~32])}}}}af.sort(function(av,au){return(av[0]-au[0])||(au[1]-av[1])});var ai=[];var ap=[NaN,NaN];for(var ar=0;ar<af.length;++ar){var at=af[ar];if(at[0]<=ap[1]+1){ap[1]=Math.max(ap[1],at[1])}else{ai.push(ap=at)}}var an=["["];if(ao){an.push("^")}an.push.apply(an,ak);for(var ar=0;ar<ai.length;++ar){var at=ai[ar];an.push(T(at[0]));if(at[1]>at[0]){if(at[1]+1>at[0]){an.push("-")}an.push(T(at[1]))}}an.push("]");return an.join("")}function W(al){var aj=al.source.match(new RegExp("(?:\\[(?:[^\\x5C\\x5D]|\\\\[\\s\\S])*\\]|\\\\u[A-Fa-f0-9]{4}|\\\\x[A-Fa-f0-9]{2}|\\\\[0-9]+|\\\\[^ux0-9]|\\(\\?[:!=]|[\\(\\)\\^]|[^\\x5B\\x5C\\(\\)\\^]+)","g"));var ah=aj.length;var an=[];for(var ak=0,am=0;ak<ah;++ak){var ag=aj[ak];if(ag==="("){++am}else{if("\\"===ag.charAt(0)){var af=+ag.substring(1);if(af&&af<=am){an[af]=-1}}}}for(var ak=1;ak<an.length;++ak){if(-1===an[ak]){an[ak]=++ad}}for(var ak=0,am=0;ak<ah;++ak){var ag=aj[ak];if(ag==="("){++am;if(an[am]===undefined){aj[ak]="(?:"}}else{if("\\"===ag.charAt(0)){var af=+ag.substring(1);if(af&&af<=am){aj[ak]="\\"+an[am]}}}}for(var ak=0,am=0;ak<ah;++ak){if("^"===aj[ak]&&"^"!==aj[ak+1]){aj[ak]=""}}if(al.ignoreCase&&S){for(var ak=0;ak<ah;++ak){var ag=aj[ak];var ai=ag.charAt(0);if(ag.length>=2&&ai==="["){aj[ak]=X(ag)}else{if(ai!=="\\"){aj[ak]=ag.replace(/[a-zA-Z]/g,function(ao){var ap=ao.charCodeAt(0);return"["+String.fromCharCode(ap&~32,ap|32)+"]"})}}}}return aj.join("")}var aa=[];for(var V=0,U=Z.length;V<U;++V){var ae=Z[V];if(ae.global||ae.multiline){throw new Error(""+ae)}aa.push("(?:"+W(ae)+")")}return new RegExp(aa.join("|"),ac?"gi":"g")}function a(V){var U=/(?:^|\s)nocode(?:\s|$)/;var X=[];var T=0;var Z=[];var W=0;var S;if(V.currentStyle){S=V.currentStyle.whiteSpace}else{if(window.getComputedStyle){S=document.defaultView.getComputedStyle(V,null).getPropertyValue("white-space")}}var Y=S&&"pre"===S.substring(0,3);function aa(ab){switch(ab.nodeType){case 1:if(U.test(ab.className)){return}for(var ae=ab.firstChild;ae;ae=ae.nextSibling){aa(ae)}var ad=ab.nodeName;if("BR"===ad||"LI"===ad){X[W]="\n";Z[W<<1]=T++;Z[(W++<<1)|1]=ab}break;case 3:case 4:var ac=ab.nodeValue;if(ac.length){if(!Y){ac=ac.replace(/[ \t\r\n]+/g," ")}else{ac=ac.replace(/\r\n?/g,"\n")}X[W]=ac;Z[W<<1]=T;T+=ac.length;Z[(W++<<1)|1]=ab}break}}aa(V);return{sourceCode:X.join("").replace(/\n$/,""),spans:Z}}function B(S,U,W,T){if(!U){return}var V={sourceCode:U,basePos:S};W(V);T.push.apply(T,V.decorations)}var v=/\S/;function o(S){var V=undefined;for(var U=S.firstChild;U;U=U.nextSibling){var T=U.nodeType;V=(T===1)?(V?S:U):(T===3)?(v.test(U.nodeValue)?S:V):V}return V===S?undefined:V}function g(U,T){var S={};var V;(function(){var ad=U.concat(T);var ah=[];var ag={};for(var ab=0,Z=ad.length;ab<Z;++ab){var Y=ad[ab];var ac=Y[3];if(ac){for(var ae=ac.length;--ae>=0;){S[ac.charAt(ae)]=Y}}var af=Y[1];var aa=""+af;if(!ag.hasOwnProperty(aa)){ah.push(af);ag[aa]=null}}ah.push(/[\0-\uffff]/);V=k(ah)})();var X=T.length;var W=function(ah){var Z=ah.sourceCode,Y=ah.basePos;var ad=[Y,F];var af=0;var an=Z.match(V)||[];var aj={};for(var ae=0,aq=an.length;ae<aq;++ae){var ag=an[ae];var ap=aj[ag];var ai=void 0;var am;if(typeof ap==="string"){am=false}else{var aa=S[ag.charAt(0)];if(aa){ai=ag.match(aa[1]);ap=aa[0]}else{for(var ao=0;ao<X;++ao){aa=T[ao];ai=ag.match(aa[1]);if(ai){ap=aa[0];break}}if(!ai){ap=F}}am=ap.length>=5&&"lang-"===ap.substring(0,5);if(am&&!(ai&&typeof ai[1]==="string")){am=false;ap=J}if(!am){aj[ag]=ap}}var ab=af;af+=ag.length;if(!am){ad.push(Y+ab,ap)}else{var al=ai[1];var ak=ag.indexOf(al);var ac=ak+al.length;if(ai[2]){ac=ag.length-ai[2].length;ak=ac-al.length}var ar=ap.substring(5);B(Y+ab,ag.substring(0,ak),W,ad);B(Y+ab+ak,al,q(ar,al),ad);B(Y+ab+ac,ag.substring(ac),W,ad)}}ah.decorations=ad};return W}function i(T){var W=[],S=[];if(T.tripleQuotedStrings){W.push([C,/^(?:\'\'\'(?:[^\'\\]|\\[\s\S]|\'{1,2}(?=[^\']))*(?:\'\'\'|$)|\"\"\"(?:[^\"\\]|\\[\s\S]|\"{1,2}(?=[^\"]))*(?:\"\"\"|$)|\'(?:[^\\\']|\\[\s\S])*(?:\'|$)|\"(?:[^\\\"]|\\[\s\S])*(?:\"|$))/,null,"'\""])}else{if(T.multiLineStrings){W.push([C,/^(?:\'(?:[^\\\']|\\[\s\S])*(?:\'|$)|\"(?:[^\\\"]|\\[\s\S])*(?:\"|$)|\`(?:[^\\\`]|\\[\s\S])*(?:\`|$))/,null,"'\"`"])}else{W.push([C,/^(?:\'(?:[^\\\'\r\n]|\\.)*(?:\'|$)|\"(?:[^\\\"\r\n]|\\.)*(?:\"|$))/,null,"\"'"])}}if(T.verbatimStrings){S.push([C,/^@\"(?:[^\"]|\"\")*(?:\"|$)/,null])}var Y=T.hashComments;if(Y){if(T.cStyleComments){if(Y>1){W.push([j,/^#(?:##(?:[^#]|#(?!##))*(?:###|$)|.*)/,null,"#"])}else{W.push([j,/^#(?:(?:define|elif|else|endif|error|ifdef|include|ifndef|line|pragma|undef|warning)\b|[^\r\n]*)/,null,"#"])}S.push([C,/^<(?:(?:(?:\.\.\/)*|\/?)(?:[\w-]+(?:\/[\w-]+)+)?[\w-]+\.h|[a-z]\w*)>/,null])}else{W.push([j,/^#[^\r\n]*/,null,"#"])}}if(T.cStyleComments){S.push([j,/^\/\/[^\r\n]*/,null]);S.push([j,/^\/\*[\s\S]*?(?:\*\/|$)/,null])}if(T.regexLiterals){var X=("/(?=[^/*])(?:[^/\\x5B\\x5C]|\\x5C[\\s\\S]|\\x5B(?:[^\\x5C\\x5D]|\\x5C[\\s\\S])*(?:\\x5D|$))+/");S.push(["lang-regex",new RegExp("^"+M+"("+X+")")])}var V=T.types;if(V){S.push([O,V])}var U=(""+T.keywords).replace(/^ | $/g,"");if(U.length){S.push([z,new RegExp("^(?:"+U.replace(/[\s,]+/g,"|")+")\\b"),null])}W.push([F,/^\s+/,null," \r\n\t\xA0"]);S.push([G,/^@[a-z_$][a-z_$@0-9]*/i,null],[O,/^(?:[@_]?[A-Z]+[a-z][A-Za-z_$@0-9]*|\w+_t\b)/,null],[F,/^[a-z_$][a-z_$@0-9]*/i,null],[G,new RegExp("^(?:0x[a-f0-9]+|(?:\\d(?:_\\d+)*\\d*(?:\\.\\d*)?|\\.\\d\\+)(?:e[+\\-]?\\d+)?)[a-z]*","i"),null,"0123456789"],[F,/^\\[\s\S]?/,null],[L,/^.[^\s\w\.$@\'\"\`\/\#\\]*/,null]);return g(W,S)}var K=i({keywords:A,hashComments:true,cStyleComments:true,multiLineStrings:true,regexLiterals:true});function Q(V,ag){var U=/(?:^|\s)nocode(?:\s|$)/;var ab=/\r\n?|\n/;var ac=V.ownerDocument;var S;if(V.currentStyle){S=V.currentStyle.whiteSpace}else{if(window.getComputedStyle){S=ac.defaultView.getComputedStyle(V,null).getPropertyValue("white-space")}}var Z=S&&"pre"===S.substring(0,3);var af=ac.createElement("LI");while(V.firstChild){af.appendChild(V.firstChild)}var W=[af];function ae(al){switch(al.nodeType){case 1:if(U.test(al.className)){break}if("BR"===al.nodeName){ad(al);if(al.parentNode){al.parentNode.removeChild(al)}}else{for(var an=al.firstChild;an;an=an.nextSibling){ae(an)}}break;case 3:case 4:if(Z){var am=al.nodeValue;var aj=am.match(ab);if(aj){var ai=am.substring(0,aj.index);al.nodeValue=ai;var ah=am.substring(aj.index+aj[0].length);if(ah){var ak=al.parentNode;ak.insertBefore(ac.createTextNode(ah),al.nextSibling)}ad(al);if(!ai){al.parentNode.removeChild(al)}}}break}}function ad(ak){while(!ak.nextSibling){ak=ak.parentNode;if(!ak){return}}function ai(al,ar){var aq=ar?al.cloneNode(false):al;var ao=al.parentNode;if(ao){var ap=ai(ao,1);var an=al.nextSibling;ap.appendChild(aq);for(var am=an;am;am=an){an=am.nextSibling;ap.appendChild(am)}}return aq}var ah=ai(ak.nextSibling,0);for(var aj;(aj=ah.parentNode)&&aj.nodeType===1;){ah=aj}W.push(ah)}for(var Y=0;Y<W.length;++Y){ae(W[Y])}if(ag===(ag|0)){W[0].setAttribute("value",ag)}var aa=ac.createElement("OL");aa.className="linenums";var X=Math.max(0,((ag-1))|0)||0;for(var Y=0,T=W.length;Y<T;++Y){af=W[Y];af.className="L"+((Y+X)%10);if(!af.firstChild){af.appendChild(ac.createTextNode("\xA0"))}aa.appendChild(af)}V.appendChild(aa)}function D(ac){var aj=/\bMSIE\b/.test(navigator.userAgent);var am=/\n/g;var al=ac.sourceCode;var an=al.length;var V=0;var aa=ac.spans;var T=aa.length;var ah=0;var X=ac.decorations;var Y=X.length;var Z=0;X[Y]=an;var ar,aq;for(aq=ar=0;aq<Y;){if(X[aq]!==X[aq+2]){X[ar++]=X[aq++];X[ar++]=X[aq++]}else{aq+=2}}Y=ar;for(aq=ar=0;aq<Y;){var at=X[aq];var ab=X[aq+1];var W=aq+2;while(W+2<=Y&&X[W+1]===ab){W+=2}X[ar++]=at;X[ar++]=ab;aq=W}Y=X.length=ar;var ae=null;while(ah<T){var af=aa[ah];var S=aa[ah+2]||an;var ag=X[Z];var ap=X[Z+2]||an;var W=Math.min(S,ap);var ak=aa[ah+1];var U;if(ak.nodeType!==1&&(U=al.substring(V,W))){if(aj){U=U.replace(am,"\r")}ak.nodeValue=U;var ai=ak.ownerDocument;var ao=ai.createElement("SPAN");ao.className=X[Z+1];var ad=ak.parentNode;ad.replaceChild(ao,ak);ao.appendChild(ak);if(V<S){aa[ah+1]=ak=ai.createTextNode(al.substring(W,S));ad.insertBefore(ak,ao.nextSibling)}}V=W;if(V>=S){ah+=2}if(V>=ap){Z+=2}}}var t={};function c(U,V){for(var S=V.length;--S>=0;){var T=V[S];if(!t.hasOwnProperty(T)){t[T]=U}else{if(window.console){console.warn("cannot override language handler %s",T)}}}}function q(T,S){if(!(T&&t.hasOwnProperty(T))){T=/^\s*</.test(S)?"default-markup":"default-code"}return t[T]}c(K,["default-code"]);c(g([],[[F,/^[^<?]+/],[E,/^<!\w[^>]*(?:>|$)/],[j,/^<\!--[\s\S]*?(?:-\->|$)/],["lang-",/^<\?([\s\S]+?)(?:\?>|$)/],["lang-",/^<%([\s\S]+?)(?:%>|$)/],[L,/^(?:<[%?]|[%?]>)/],["lang-",/^<xmp\b[^>]*>([\s\S]+?)<\/xmp\b[^>]*>/i],["lang-js",/^<script\b[^>]*>([\s\S]*?)(<\/script\b[^>]*>)/i],["lang-css",/^<style\b[^>]*>([\s\S]*?)(<\/style\b[^>]*>)/i],["lang-in.tag",/^(<\/?[a-z][^<>]*>)/i]]),["default-markup","htm","html","mxml","xhtml","xml","xsl"]);c(g([[F,/^[\s]+/,null," \t\r\n"],[n,/^(?:\"[^\"]*\"?|\'[^\']*\'?)/,null,"\"'"]],[[m,/^^<\/?[a-z](?:[\w.:-]*\w)?|\/?>$/i],[P,/^(?!style[\s=]|on)[a-z](?:[\w:-]*\w)?/i],["lang-uq.val",/^=\s*([^>\'\"\s]*(?:[^>\'\"\s\/]|\/(?=\s)))/],[L,/^[=<>\/]+/],["lang-js",/^on\w+\s*=\s*\"([^\"]+)\"/i],["lang-js",/^on\w+\s*=\s*\'([^\']+)\'/i],["lang-js",/^on\w+\s*=\s*([^\"\'>\s]+)/i],["lang-css",/^style\s*=\s*\"([^\"]+)\"/i],["lang-css",/^style\s*=\s*\'([^\']+)\'/i],["lang-css",/^style\s*=\s*([^\"\'>\s]+)/i]]),["in.tag"]);c(g([],[[n,/^[\s\S]+/]]),["uq.val"]);c(i({keywords:l,hashComments:true,cStyleComments:true,types:e}),["c","cc","cpp","cxx","cyc","m"]);c(i({keywords:"null,true,false"}),["json"]);c(i({keywords:R,hashComments:true,cStyleComments:true,verbatimStrings:true,types:e}),["cs"]);c(i({keywords:x,cStyleComments:true}),["java"]);c(i({keywords:H,hashComments:true,multiLineStrings:true}),["bsh","csh","sh"]);c(i({keywords:I,hashComments:true,multiLineStrings:true,tripleQuotedStrings:true}),["cv","py"]);c(i({keywords:s,hashComments:true,multiLineStrings:true,regexLiterals:true}),["perl","pl","pm"]);c(i({keywords:f,hashComments:true,multiLineStrings:true,regexLiterals:true}),["rb"]);c(i({keywords:w,cStyleComments:true,regexLiterals:true}),["js"]);c(i({keywords:r,hashComments:3,cStyleComments:true,multilineStrings:true,tripleQuotedStrings:true,regexLiterals:true}),["coffee"]);c(g([],[[C,/^[\s\S]+/]]),["regex"]);function d(V){var U=V.langExtension;try{var S=a(V.sourceNode);var T=S.sourceCode;V.sourceCode=T;V.spans=S.spans;V.basePos=0;q(U,T)(V);D(V)}catch(W){if("console" in window){console.log(W&&W.stack?W.stack:W)}}}function y(W,V,U){var S=document.createElement("PRE");S.innerHTML=W;if(U){Q(S,U)}var T={langExtension:V,numberLines:U,sourceNode:S};d(T);return S.innerHTML}function b(ad){function Y(af){return document.getElementsByTagName(af)}var ac=[Y("pre"),Y("code"),Y("xmp")];var T=[];for(var aa=0;aa<ac.length;++aa){for(var Z=0,V=ac[aa].length;Z<V;++Z){T.push(ac[aa][Z])}}ac=null;var W=Date;if(!W.now){W={now:function(){return +(new Date)}}}var X=0;var S;var ab=/\blang(?:uage)?-([\w.]+)(?!\S)/;var ae=/\bprettyprint\b/;function U(){var ag=(window.PR_SHOULD_USE_CONTINUATION?W.now()+250:Infinity);for(;X<T.length&&W.now()<ag;X++){var aj=T[X];var ai=aj.className;if(ai.indexOf("prettyprint")>=0){var ah=ai.match(ab);var am;if(!ah&&(am=o(aj))&&"CODE"===am.tagName){ah=am.className.match(ab)}if(ah){ah=ah[1]}var al=false;for(var ak=aj.parentNode;ak;ak=ak.parentNode){if((ak.tagName==="pre"||ak.tagName==="code"||ak.tagName==="xmp")&&ak.className&&ak.className.indexOf("prettyprint")>=0){al=true;break}}if(!al){var af=aj.className.match(/\blinenums\b(?::(\d+))?/);af=af?af[1]&&af[1].length?+af[1]:true:false;if(af){Q(aj,af)}S={langExtension:ah,sourceNode:aj,numberLines:af};d(S)}}}if(X<T.length){setTimeout(U,250)}else{if(ad){ad()}}}U()}window.prettyPrintOne=y;window.prettyPrint=b;window.PR={createSimpleLexer:g,registerLangHandler:c,sourceDecorator:i,PR_ATTRIB_NAME:P,PR_ATTRIB_VALUE:n,PR_COMMENT:j,PR_DECLARATION:E,PR_KEYWORD:z,PR_LITERAL:G,PR_NOCODE:N,PR_PLAIN:F,PR_PUNCTUATION:L,PR_SOURCE:J,PR_STRING:C,PR_TAG:m,PR_TYPE:O}})();PR.registerLangHandler(PR.createSimpleLexer([],[[PR.PR_DECLARATION,/^<!\w[^>]*(?:>|$)/],[PR.PR_COMMENT,/^<\!--[\s\S]*?(?:-\->|$)/],[PR.PR_PUNCTUATION,/^(?:<[%?]|[%?]>)/],["lang-",/^<\?([\s\S]+?)(?:\?>|$)/],["lang-",/^<%([\s\S]+?)(?:%>|$)/],["lang-",/^<xmp\b[^>]*>([\s\S]+?)<\/xmp\b[^>]*>/i],["lang-handlebars",/^<script\b[^>]*type\s*=\s*['"]?text\/x-handlebars-template['"]?\b[^>]*>([\s\S]*?)(<\/script\b[^>]*>)/i],["lang-js",/^<script\b[^>]*>([\s\S]*?)(<\/script\b[^>]*>)/i],["lang-css",/^<style\b[^>]*>([\s\S]*?)(<\/style\b[^>]*>)/i],["lang-in.tag",/^(<\/?[a-z][^<>]*>)/i],[PR.PR_DECLARATION,/^{{[#^>/]?\s*[\w.][^}]*}}/],[PR.PR_DECLARATION,/^{{&?\s*[\w.][^}]*}}/],[PR.PR_DECLARATION,/^{{{>?\s*[\w.][^}]*}}}/],[PR.PR_COMMENT,/^{{![^}]*}}/]]),["handlebars","hbs"]);PR.registerLangHandler(PR.createSimpleLexer([[PR.PR_PLAIN,/^[ \t\r\n\f]+/,null," \t\r\n\f"]],[[PR.PR_STRING,/^\"(?:[^\n\r\f\\\"]|\\(?:\r\n?|\n|\f)|\\[\s\S])*\"/,null],[PR.PR_STRING,/^\'(?:[^\n\r\f\\\']|\\(?:\r\n?|\n|\f)|\\[\s\S])*\'/,null],["lang-css-str",/^url\(([^\)\"\']*)\)/i],[PR.PR_KEYWORD,/^(?:url|rgb|\!important|@import|@page|@media|@charset|inherit)(?=[^\-\w]|$)/i,null],["lang-css-kw",/^(-?(?:[_a-z]|(?:\\[0-9a-f]+ ?))(?:[_a-z0-9\-]|\\(?:\\[0-9a-f]+ ?))*)\s*:/i],[PR.PR_COMMENT,/^\/\*[^*]*\*+(?:[^\/*][^*]*\*+)*\//],[PR.PR_COMMENT,/^(?:<!--|-->)/],[PR.PR_LITERAL,/^(?:\d+|\d*\.\d+)(?:%|[a-z]+)?/i],[PR.PR_LITERAL,/^#(?:[0-9a-f]{3}){1,2}/i],[PR.PR_PLAIN,/^-?(?:[_a-z]|(?:\\[\da-f]+ ?))(?:[_a-z\d\-]|\\(?:\\[\da-f]+ ?))*/i],[PR.PR_PUNCTUATION,/^[^\s\w\'\"]+/]]),["css"]);PR.registerLangHandler(PR.createSimpleLexer([],[[PR.PR_KEYWORD,/^-?(?:[_a-z]|(?:\\[\da-f]+ ?))(?:[_a-z\d\-]|\\(?:\\[\da-f]+ ?))*/i]]),["css-kw"]);PR.registerLangHandler(PR.createSimpleLexer([],[[PR.PR_STRING,/^[^\)\"\']+/]]),["css-str"]);



/*
file https://github.com/istanbuljs/istanbuljs/blob/istanbul-reports@2.2.5/packages/istanbul-reports/lib/html/helpers.js
*/
var exports_istanbuljs_istanbuljs_packages_istanbul_reports_lib_html_helpers = {};
/*
 Copyright 2012-2015, Yahoo Inc.
 Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
function registerHelpers(handlebars) {
    handlebars.registerHelper('show_picture', function(opts) {
        let num = Number(opts.fn(this));
        let rest;
        let cls = '';
        if (isFinite(num)) {
            if (num === 100) {
                cls = ' cover-full';
            }
            num = Math.floor(num);
            rest = 100 - num;
            return (
                '<div class="cover-fill' +
                cls +
                '" style="width: ' +
                num +
                '%;"></div>' +
                '<div class="cover-empty" style="width:' +
                rest +
                '%;"></div>'
            );
        } else {
            return '';
        }
    });

    handlebars.registerHelper('if_has_ignores', function(metrics, opts) {
        return metrics.statements.skipped +
            metrics.functions.skipped +
            metrics.branches.skipped ===
            0
            ? ''
            : opts.fn(this);
    });

    handlebars.registerHelper('show_ignores', metrics => {
        const statements = metrics.statements.skipped;
        const functions = metrics.functions.skipped;
        const branches = metrics.branches.skipped;

        if (statements === 0 && functions === 0 && branches === 0) {
            return '<span class="ignore-none">none</span>';
        }

        const result = [];
        if (statements > 0) {
            result.push(
                statements === 1 ? '1 statement' : statements + ' statements'
            );
        }
        if (functions > 0) {
            result.push(
                functions === 1 ? '1 function' : functions + ' functions'
            );
        }
        if (branches > 0) {
            result.push(branches === 1 ? '1 branch' : branches + ' branches');
        }

        return result.join(', ');
    });

    handlebars.registerHelper('show_lines', function(opts) {
        const maxLines = Number(opts.fn(this));
        let i;
        const array = [];
        for (i = 0; i < maxLines; i += 1) {
            const nextNum = i + 1;
            array[i] =
                "<a name='L" +
                nextNum +
                "'></a><a href='#L" +
                nextNum +
                "'>" +
                nextNum +
                '</a>';
        }
        return array.join('\n');
    });

    handlebars.registerHelper('show_line_execution_counts', context => {
        const array = [];
        context.forEach(data => {
            array.push(
                '<span class="cline-any cline-' +
                    data.covered +
                    '">' +
                    data.hits +
                    '</span>'
            );
        });
        return array.join('\n');
    });

    handlebars.registerHelper('show_code', (context /*, opts */) =>
        context.join('\n')
    );
}

exports_istanbuljs_istanbuljs_packages_istanbul_reports_lib_html_helpers = {
    registerHelpers
};



/*
file https://github.com/istanbuljs/istanbuljs/blob/istanbul-reports@2.2.5/packages/istanbul-reports/lib/html/index.js
*/
var exports_istanbuljs_istanbuljs_packages_istanbul_reports_lib_html_index = {};
/*
 Copyright 2012-2015, Yahoo Inc.
 Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
// const fs = require('fs');
// const path = require('path');
// const handlebars = require('handlebars').create();
const annotator = exports_istanbuljs_istanbuljs_packages_istanbul_reports_lib_html_annotator;
const helpers = exports_istanbuljs_istanbuljs_packages_istanbul_reports_lib_html_helpers;
const templateFor = function(name) {
    return handlebars.compile(
        fs.readFileSync(
            path.resolve(__dirname, 'templates', name + '.txt'),
            'utf8'
        )
    );
};
const headerTemplate = templateFor('head');
const footerTemplate = templateFor('foot');
const detailTemplate = handlebars.compile(
    [
        '<tr>',
        '<td class="line-count quiet">{{#show_lines}}{{maxLines}}{{/show_lines}}</td>',
        '<td class="line-coverage quiet">{{#show_line_execution_counts lineCoverage}}{{maxLines}}{{/show_line_execution_counts}}</td>',
        '<td class="text"><pre class="prettyprint lang-js">{{#show_code annotatedCode}}{{/show_code}}</pre></td>',
        '</tr>\n'
    ].join('')
);
const summaryTableHeader = [
    '<div class="pad1">',
    '<table class="coverage-summary">',
    '<thead>',
    '<tr>',
    '   <th data-col="file" data-fmt="html" data-html="true" class="file">File</th>',
    '   <th data-col="pic" data-type="number" data-fmt="html" data-html="true" class="pic"></th>',
    '   <th data-col="statements" data-type="number" data-fmt="pct" class="pct">Statements</th>',
    '   <th data-col="statements_raw" data-type="number" data-fmt="html" class="abs"></th>',
    '   <th data-col="branches" data-type="number" data-fmt="pct" class="pct">Branches</th>',
    '   <th data-col="branches_raw" data-type="number" data-fmt="html" class="abs"></th>',
    '   <th data-col="functions" data-type="number" data-fmt="pct" class="pct">Functions</th>',
    '   <th data-col="functions_raw" data-type="number" data-fmt="html" class="abs"></th>',
    '   <th data-col="lines" data-type="number" data-fmt="pct" class="pct">Lines</th>',
    '   <th data-col="lines_raw" data-type="number" data-fmt="html" class="abs"></th>',
    '</tr>',
    '</thead>',
    '<tbody>'
].join('\n');
const summaryLineTemplate = handlebars.compile(
    [
        '<tr>',
        '<td class="file {{reportClasses.statements}}" data-value="{{file}}"><a href="{{output}}">{{file}}</a></td>',
        '<td data-value="{{metrics.statements.pct}}" class="pic {{reportClasses.statements}}"><div class="chart">{{#show_picture}}{{metrics.statements.pct}}{{/show_picture}}</div></td>',
        '<td data-value="{{metrics.statements.pct}}" class="pct {{reportClasses.statements}}">{{metrics.statements.pct}}%</td>',
        '<td data-value="{{metrics.statements.total}}" class="abs {{reportClasses.statements}}">{{metrics.statements.covered}}/{{metrics.statements.total}}</td>',
        '<td data-value="{{metrics.branches.pct}}" class="pct {{reportClasses.branches}}">{{metrics.branches.pct}}%</td>',
        '<td data-value="{{metrics.branches.total}}" class="abs {{reportClasses.branches}}">{{metrics.branches.covered}}/{{metrics.branches.total}}</td>',
        '<td data-value="{{metrics.functions.pct}}" class="pct {{reportClasses.functions}}">{{metrics.functions.pct}}%</td>',
        '<td data-value="{{metrics.functions.total}}" class="abs {{reportClasses.functions}}">{{metrics.functions.covered}}/{{metrics.functions.total}}</td>',
        '<td data-value="{{metrics.lines.pct}}" class="pct {{reportClasses.lines}}">{{metrics.lines.pct}}%</td>',
        '<td data-value="{{metrics.lines.total}}" class="abs {{reportClasses.lines}}">{{metrics.lines.covered}}/{{metrics.lines.total}}</td>',
        '</tr>\n'
    ].join('\n\t')
);
const summaryTableFooter = ['</tbody>', '</table>', '</div>'].join('\n');
const emptyClasses = {
    statements: 'empty',
    lines: 'empty',
    functions: 'empty',
    branches: 'empty'
};

helpers.registerHelpers(handlebars);

const standardLinkMapper = {
    getPath(node) {
        if (typeof node === 'string') {
            return node;
        }
        let filePath = node.getQualifiedName();
        if (node.isSummary()) {
            if (filePath !== '') {
                filePath += '/index.html';
            } else {
                filePath = 'index.html';
            }
        } else {
            filePath += '.html';
        }
        return filePath;
    },

    relativePath(source, target) {
        const targetPath = this.getPath(target);
        const sourcePath = path.dirname(this.getPath(source));
        return path.relative(sourcePath, targetPath);
    },

    assetPath(node, name) {
        return this.relativePath(this.getPath(node), name);
    }
};

function fixPct(metrics) {
    Object.keys(emptyClasses).forEach(key => {
        metrics[key].pct = 0;
    });
    return metrics;
}

class HtmlReport {
    constructor(opts) {
        this.verbose = opts.verbose;
        this.linkMapper = opts.linkMapper || standardLinkMapper;
        this.subdir = opts.subdir || '';
        this.date = Date();
        this.skipEmpty = opts.skipEmpty;
    }

    getBreadcrumbHtml(node) {
        let parent = node.getParent();
        const nodePath = [];

        while (parent) {
            nodePath.push(parent);
            parent = parent.getParent();
        }

        const linkPath = nodePath.map(ancestor => {
            const target = this.linkMapper.relativePath(node, ancestor);
            const name = ancestor.getRelativeName() || 'All files';
            return '<a href="' + target + '">' + name + '</a>';
        });

        linkPath.reverse();
        return linkPath.length > 0
            ? linkPath.join(' / ') + ' ' + node.getRelativeName()
            : 'All files';
    }

    fillTemplate(node, templateData, context) {
        const linkMapper = this.linkMapper;
        const summary = node.getCoverageSummary();
        templateData.entity = node.getQualifiedName() || 'All files';
        templateData.metrics = summary;
        templateData.reportClass = context.classForPercent(
            'statements',
            summary.statements.pct
        );
        templateData.pathHtml = this.getBreadcrumbHtml(node);
        templateData.base = {
            css: linkMapper.assetPath(node, 'base.css')
        };
        templateData.sorter = {
            js: linkMapper.assetPath(node, 'sorter.js'),
            image: linkMapper.assetPath(node, 'sort-arrow-sprite.png')
        };
        templateData.blockNavigation = {
            js: linkMapper.assetPath(node, 'block-navigation.js')
        };
        templateData.prettify = {
            js: linkMapper.assetPath(node, 'prettify.js'),
            css: linkMapper.assetPath(node, 'prettify.css')
        };
    }

    getTemplateData() {
        return { datetime: this.date };
    }

    getWriter(context) {
        if (!this.subdir) {
            return context.writer;
        }
        return context.writer.writerForDir(this.subdir);
    }

    onStart(root, context) {
        const assetHeaders = {
            '.js': '/* eslint-disable */\n'
        };

        ['.', 'vendor'].forEach(subdir => {
            const writer = this.getWriter(context);
            const srcDir = path.resolve(__dirname, 'assets', subdir);
            fs.readdirSync(srcDir).forEach(f => {
                const resolvedSource = path.resolve(srcDir, f);
                const resolvedDestination = '.';
                const stat = fs.statSync(resolvedSource);
                let dest;

                if (stat.isFile()) {
                    dest = resolvedDestination + '/' + f;
                    if (this.verbose) {
                        console.log('Write asset: ' + dest);
                    }
                    writer.copyFile(
                        resolvedSource,
                        dest,
                        assetHeaders[path.extname(f)]
                    );
                }
            });
        });
    }

    onSummary(node, context) {
        const linkMapper = this.linkMapper;
        const templateData = this.getTemplateData();
        const children = node.getChildren();
        const skipEmpty = this.skipEmpty;

        this.fillTemplate(node, templateData, context);
        const cw = this.getWriter(context).writeFile(linkMapper.getPath(node));
        cw.write(headerTemplate(templateData));
        cw.write(summaryTableHeader);
        children.forEach(child => {
            const metrics = child.getCoverageSummary();
            const isEmpty = metrics.isEmpty();
            if (skipEmpty && isEmpty) {
                return;
            }
            const reportClasses = isEmpty
                ? emptyClasses
                : {
                      statements: context.classForPercent(
                          'statements',
                          metrics.statements.pct
                      ),
                      lines: context.classForPercent(
                          'lines',
                          metrics.lines.pct
                      ),
                      functions: context.classForPercent(
                          'functions',
                          metrics.functions.pct
                      ),
                      branches: context.classForPercent(
                          'branches',
                          metrics.branches.pct
                      )
                  };
            const data = {
                metrics: isEmpty ? fixPct(metrics) : metrics,
                reportClasses,
                file: child.getRelativeName(),
                output: linkMapper.relativePath(node, child)
            };
            cw.write(summaryLineTemplate(data) + '\n');
        });
        cw.write(summaryTableFooter);
        cw.write(footerTemplate(templateData));
        cw.close();
    }

    onDetail(node, context) {
        const linkMapper = this.linkMapper;
        const templateData = this.getTemplateData();

        this.fillTemplate(node, templateData, context);
        const cw = this.getWriter(context).writeFile(linkMapper.getPath(node));
        cw.write(headerTemplate(templateData));
        cw.write('<pre><table class="coverage">\n');
        cw.write(
            detailTemplate(
                annotator.annotateSourceCode(node.getFileCoverage(), context)
            )
        );
        cw.write('</table></pre>\n');
        cw.write(footerTemplate(templateData));
        cw.close();
    }
}

exports_istanbuljs_istanbuljs_packages_istanbul_reports_lib_html_index = HtmlReport;



/*
file https://github.com/istanbuljs/istanbuljs/blob/istanbul-reports@2.2.5/packages/istanbul-reports/lib/html/insertion-text.js
*/
var exports_istanbuljs_istanbuljs_packages_istanbul_reports_lib_html_insertion_text = {};
/*
 Copyright 2012-2015, Yahoo Inc.
 Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
function InsertionText(text, consumeBlanks) {
    this.text = text;
    this.origLength = text.length;
    this.offsets = [];
    this.consumeBlanks = consumeBlanks;
    this.startPos = this.findFirstNonBlank();
    this.endPos = this.findLastNonBlank();
}

const WHITE_RE = /[ \f\n\r\t\v\u00A0\u2028\u2029]/;

InsertionText.prototype = {
    findFirstNonBlank() {
        let pos = -1;
        const text = this.text;
        const len = text.length;
        let i;
        for (i = 0; i < len; i += 1) {
            if (!text.charAt(i).match(WHITE_RE)) {
                pos = i;
                break;
            }
        }
        return pos;
    },
    findLastNonBlank() {
        const text = this.text;
        const len = text.length;
        let pos = text.length + 1;
        let i;
        for (i = len - 1; i >= 0; i -= 1) {
            if (!text.charAt(i).match(WHITE_RE)) {
                pos = i;
                break;
            }
        }
        return pos;
    },
    originalLength() {
        return this.origLength;
    },

    insertAt(col, str, insertBefore, consumeBlanks) {
        consumeBlanks =
            typeof consumeBlanks === 'undefined'
                ? this.consumeBlanks
                : consumeBlanks;
        col = col > this.originalLength() ? this.originalLength() : col;
        col = col < 0 ? 0 : col;

        if (consumeBlanks) {
            if (col <= this.startPos) {
                col = 0;
            }
            if (col > this.endPos) {
                col = this.origLength;
            }
        }

        const len = str.length;
        const offset = this.findOffset(col, len, insertBefore);
        const realPos = col + offset;
        const text = this.text;
        this.text = text.substring(0, realPos) + str + text.substring(realPos);
        return this;
    },

    findOffset(pos, len, insertBefore) {
        const offsets = this.offsets;
        let offsetObj;
        let cumulativeOffset = 0;
        let i;

        for (i = 0; i < offsets.length; i += 1) {
            offsetObj = offsets[i];
            if (
                offsetObj.pos < pos ||
                (offsetObj.pos === pos && !insertBefore)
            ) {
                cumulativeOffset += offsetObj.len;
            }
            if (offsetObj.pos >= pos) {
                break;
            }
        }
        if (offsetObj && offsetObj.pos === pos) {
            offsetObj.len += len;
        } else {
            offsets.splice(i, 0, { pos, len });
        }
        return cumulativeOffset;
    },

    wrap(startPos, startText, endPos, endText, consumeBlanks) {
        this.insertAt(startPos, startText, true, consumeBlanks);
        this.insertAt(endPos, endText, false, consumeBlanks);
        return this;
    },

    wrapLine(startText, endText) {
        this.wrap(0, startText, this.originalLength(), endText);
    },

    toString() {
        return this.text;
    }
};

exports_istanbuljs_istanbuljs_packages_istanbul_reports_lib_html_insertion_text = InsertionText;



/*
file https://github.com/istanbuljs/istanbuljs/blob/istanbul-reports@2.2.5/packages/istanbul-reports/lib/json-summary/index.js
*/
var exports_istanbuljs_istanbuljs_packages_istanbul_reports_lib_json_summary_index = {};
/*
 Copyright 2012-2015, Yahoo Inc.
 Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
'use strict';

function JsonSummaryReport(opts) {
    this.file = opts.file || 'coverage-summary.json';
    this.contentWriter = null;
    this.first = true;
}

JsonSummaryReport.prototype.onStart = function(root, context) {
    this.contentWriter = context.writer.writeFile(this.file);
    this.contentWriter.write('{');
};

JsonSummaryReport.prototype.writeSummary = function(filePath, sc) {
    const cw = this.contentWriter;
    if (this.first) {
        this.first = false;
    } else {
        cw.write(',');
    }
    cw.write(JSON.stringify(filePath));
    cw.write(': ');
    cw.write(JSON.stringify(sc));
    cw.println('');
};

JsonSummaryReport.prototype.onSummary = function(node) {
    if (!node.isRoot()) {
        return;
    }
    this.writeSummary('total', node.getCoverageSummary());
};

JsonSummaryReport.prototype.onDetail = function(node) {
    this.writeSummary(node.getFileCoverage().path, node.getCoverageSummary());
};

JsonSummaryReport.prototype.onEnd = function() {
    const cw = this.contentWriter;
    cw.println('}');
    cw.close();
};

exports_istanbuljs_istanbuljs_packages_istanbul_reports_lib_json_summary_index = JsonSummaryReport;



/*
file https://github.com/istanbuljs/istanbuljs/blob/istanbul-reports@2.2.5/packages/istanbul-reports/lib/json/index.js
*/
var exports_istanbuljs_istanbuljs_packages_istanbul_reports_lib_json_index = {};
/*
 Copyright 2012-2015, Yahoo Inc.
 Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
'use strict';

function JsonReport(opts) {
    this.file = opts.file || 'coverage-final.json';
    this.first = true;
}

JsonReport.prototype.onStart = function(root, context) {
    this.contentWriter = context.writer.writeFile(this.file);
    this.contentWriter.write('{');
};

JsonReport.prototype.onDetail = function(node) {
    const fc = node.getFileCoverage();
    const key = fc.path;
    const cw = this.contentWriter;

    if (this.first) {
        this.first = false;
    } else {
        cw.write(',');
    }
    cw.write(JSON.stringify(key));
    cw.write(': ');
    cw.write(JSON.stringify(fc));
    cw.println('');
};

JsonReport.prototype.onEnd = function() {
    const cw = this.contentWriter;
    cw.println('}');
    cw.close();
};

exports_istanbuljs_istanbuljs_packages_istanbul_reports_lib_json_index = JsonReport;



/*
file https://github.com/istanbuljs/istanbuljs/blob/istanbul-reports@2.2.5/packages/istanbul-reports/lib/lcov/index.js
*/
var exports_istanbuljs_istanbuljs_packages_istanbul_reports_lib_lcov_index = {};
/*
 Copyright 2012-2015, Yahoo Inc.
 Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
// const LcovOnlyReport = require('../lcovonly');
// const HtmlReport = require('../html');

function LcovReport() {
    this.lcov = new LcovOnlyReport({ file: 'lcov.info' });
    this.html = new HtmlReport({ subdir: 'lcov-report' });
}

['Start', 'End', 'Summary', 'SummaryEnd', 'Detail'].forEach(what => {
    const meth = 'on' + what;
    LcovReport.prototype[meth] = function(...args) {
        const lcov = this.lcov;
        const html = this.html;

        if (lcov[meth]) {
            lcov[meth](...args);
        }
        if (html[meth]) {
            html[meth](...args);
        }
    };
});

exports_istanbuljs_istanbuljs_packages_istanbul_reports_lib_lcov_index = LcovReport;



/*
file https://github.com/istanbuljs/istanbuljs/blob/istanbul-reports@2.2.5/packages/istanbul-reports/lib/lcovonly/index.js
*/
var exports_istanbuljs_istanbuljs_packages_istanbul_reports_lib_lcovonly_index = {};
/*
 Copyright 2012-2015, Yahoo Inc.
 Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
'use strict';

function LcovOnlyReport(opts) {
    this.file = opts.file || 'lcov.info';
    this.contentWriter = null;
}

LcovOnlyReport.prototype.onStart = function(root, context) {
    this.contentWriter = context.writer.writeFile(this.file);
};

LcovOnlyReport.prototype.onDetail = function(node) {
    const fc = node.getFileCoverage();
    const writer = this.contentWriter;
    const functions = fc.f;
    const functionMap = fc.fnMap;
    const lines = fc.getLineCoverage();
    const branches = fc.b;
    const branchMap = fc.branchMap;
    const summary = node.getCoverageSummary();

    writer.println('TN:'); //no test name
    writer.println('SF:' + fc.path);

    Object.keys(functionMap).forEach(key => {
        const meta = functionMap[key];
        writer.println('FN:' + [meta.decl.start.line, meta.name].join(','));
    });
    writer.println('FNF:' + summary.functions.total);
    writer.println('FNH:' + summary.functions.covered);

    Object.keys(functionMap).forEach(key => {
        const stats = functions[key];
        const meta = functionMap[key];
        writer.println('FNDA:' + [stats, meta.name].join(','));
    });

    Object.keys(lines).forEach(key => {
        const stat = lines[key];
        writer.println('DA:' + [key, stat].join(','));
    });
    writer.println('LF:' + summary.lines.total);
    writer.println('LH:' + summary.lines.covered);

    Object.keys(branches).forEach(key => {
        const branchArray = branches[key];
        const meta = branchMap[key];
        const line = meta.loc.start.line;
        let i = 0;
        branchArray.forEach(b => {
            writer.println('BRDA:' + [line, key, i, b].join(','));
            i += 1;
        });
    });
    writer.println('BRF:' + summary.branches.total);
    writer.println('BRH:' + summary.branches.covered);
    writer.println('end_of_record');
};

LcovOnlyReport.prototype.onEnd = function() {
    this.contentWriter.close();
};

exports_istanbuljs_istanbuljs_packages_istanbul_reports_lib_lcovonly_index = LcovOnlyReport;



/*
file https://github.com/istanbuljs/istanbuljs/blob/istanbul-reports@2.2.5/packages/istanbul-reports/lib/none/index.js
*/
var exports_istanbuljs_istanbuljs_packages_istanbul_reports_lib_none_index = {};
/*
 Copyright 2012-2015, Yahoo Inc.
 Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
function NoneReport() {}

exports_istanbuljs_istanbuljs_packages_istanbul_reports_lib_none_index = NoneReport;



/*
file https://github.com/istanbuljs/istanbuljs/blob/istanbul-reports@2.2.5/packages/istanbul-reports/lib/teamcity/index.js
*/
var exports_istanbuljs_istanbuljs_packages_istanbul_reports_lib_teamcity_index = {};
/*
 Copyright 2012-2015, Yahoo Inc.
 Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
'use strict';

function TeamcityReport(opts) {
    opts = opts || {};
    this.file = opts.file || null;
    this.blockName = opts.blockName || 'Code Coverage Summary';
}

function lineForKey(value, teamcityVar) {
    return (
        "##teamcity[buildStatisticValue key='" +
        teamcityVar +
        "' value='" +
        value +
        "']"
    );
}

TeamcityReport.prototype.onStart = function(node, context) {
    const metrics = node.getCoverageSummary();
    const cw = context.writer.writeFile(this.file);

    cw.println('');
    cw.println("##teamcity[blockOpened name='" + this.blockName + "']");

    //Statements Covered
    cw.println(
        lineForKey(metrics.statements.covered, 'CodeCoverageAbsBCovered')
    );
    cw.println(lineForKey(metrics.statements.total, 'CodeCoverageAbsBTotal'));

    //Branches Covered
    cw.println(lineForKey(metrics.branches.covered, 'CodeCoverageAbsRCovered'));
    cw.println(lineForKey(metrics.branches.total, 'CodeCoverageAbsRTotal'));

    //Functions Covered
    cw.println(
        lineForKey(metrics.functions.covered, 'CodeCoverageAbsMCovered')
    );
    cw.println(lineForKey(metrics.functions.total, 'CodeCoverageAbsMTotal'));

    //Lines Covered
    cw.println(lineForKey(metrics.lines.covered, 'CodeCoverageAbsLCovered'));
    cw.println(lineForKey(metrics.lines.total, 'CodeCoverageAbsLTotal'));

    cw.println("##teamcity[blockClosed name='" + this.blockName + "']");
    cw.close();
};

exports_istanbuljs_istanbuljs_packages_istanbul_reports_lib_teamcity_index = TeamcityReport;



/*
file https://github.com/istanbuljs/istanbuljs/blob/istanbul-reports@2.2.5/packages/istanbul-reports/lib/text-lcov/index.js
*/
var exports_istanbuljs_istanbuljs_packages_istanbul_reports_lib_text_lcov_index = {};
/*
 Copyright 2012-2015, Yahoo Inc.
 Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
// const util = require('util');
// const LcovOnly = require('../lcovonly');

function TextLcov(opts) {
    opts.file = '-';
    LcovOnly.call(this, opts);
}

util.inherits(TextLcov, LcovOnly);
exports_istanbuljs_istanbuljs_packages_istanbul_reports_lib_text_lcov_index = TextLcov;



/*
file https://github.com/istanbuljs/istanbuljs/blob/istanbul-reports@2.2.5/packages/istanbul-reports/lib/text-summary/index.js
*/
var exports_istanbuljs_istanbuljs_packages_istanbul_reports_lib_text_summary_index = {};
/*
 Copyright 2012-2015, Yahoo Inc.
 Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
'use strict';

function TextSummaryReport(opts) {
    opts = opts || {};
    this.file = opts.file || null;
}

function lineForKey(summary, key) {
    const metrics = summary[key];

    key = key.substring(0, 1).toUpperCase() + key.substring(1);
    if (key.length < 12) {
        key += '                   '.substring(0, 12 - key.length);
    }
    const result = [
        key,
        ':',
        metrics.pct + '%',
        '(',
        metrics.covered + '/' + metrics.total,
        ')'
    ].join(' ');
    const skipped = metrics.skipped;
    if (skipped > 0) {
        return result + ', ' + skipped + ' ignored';
    }
    return result;
}

TextSummaryReport.prototype.onStart = function(node, context) {
    const summary = node.getCoverageSummary();
    const cw = context.writer.writeFile(this.file);
    const printLine = function(key) {
        const str = lineForKey(summary, key);
        const clazz = context.classForPercent(key, summary[key].pct);
        cw.println(cw.colorize(str, clazz));
    };

    cw.println('');
    cw.println(
        '=============================== Coverage summary ==============================='
    );
    printLine('statements');
    printLine('branches');
    printLine('functions');
    printLine('lines');
    cw.println(
        '================================================================================'
    );
    cw.close();
};

exports_istanbuljs_istanbuljs_packages_istanbul_reports_lib_text_summary_index = TextSummaryReport;



/*
file https://github.com/istanbuljs/istanbuljs/blob/istanbul-reports@2.2.5/packages/istanbul-reports/lib/text/index.js
*/
var exports_istanbuljs_istanbuljs_packages_istanbul_reports_lib_text_index = {};
/*
 Copyright 2012-2015, Yahoo Inc.
 Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
'use strict';

const PCT_COLS = 9;
const MISSING_COL = 18;
const TAB_SIZE = 1;
const DELIM = ' |';
const COL_DELIM = '-|';

function padding(num, ch) {
    let str = '';
    let i;
    ch = ch || ' ';
    for (i = 0; i < num; i += 1) {
        str += ch;
    }
    return str;
}

function fill(str, width, right, tabs) {
    tabs = tabs || 0;
    str = String(str);

    const leadingSpaces = tabs * TAB_SIZE;
    const remaining = width - leadingSpaces;
    const leader = padding(leadingSpaces);
    let fmtStr = '';
    let fillStr;
    const strlen = str.length;

    if (remaining > 0) {
        if (remaining >= strlen) {
            fillStr = padding(remaining - strlen);
            fmtStr = right ? fillStr + str : str + fillStr;
        } else {
            fmtStr = str.substring(strlen - remaining);
            fmtStr = '... ' + fmtStr.substring(4);
        }
    }

    return leader + fmtStr;
}

function formatName(name, maxCols, level) {
    return fill(name, maxCols, false, level);
}

function formatPct(pct, width) {
    return fill(pct, width || PCT_COLS, true, 0);
}

function nodeName(node) {
    return node.getRelativeName() || 'All files';
}

function depthFor(node) {
    let ret = 0;
    node = node.getParent();
    while (node) {
        ret += 1;
        node = node.getParent();
    }
    return ret;
}

function findNameWidth(node, context) {
    let last = 0;
    const compareWidth = function(node) {
        const depth = depthFor(node);
        const idealWidth = TAB_SIZE * depth + nodeName(node).length;
        if (idealWidth > last) {
            last = idealWidth;
        }
    };
    const visitor = {
        onSummary(node) {
            compareWidth(node);
        },
        onDetail(node) {
            compareWidth(node);
        }
    };
    node.visit(context.getVisitor(visitor));
    return last;
}

function makeLine(nameWidth) {
    const name = padding(nameWidth, '-');
    const pct = padding(PCT_COLS, '-');
    const elements = [];

    elements.push(name);
    elements.push(pct);
    elements.push(pct);
    elements.push(pct);
    elements.push(pct);
    elements.push(padding(MISSING_COL, '-'));
    return elements.join(COL_DELIM) + COL_DELIM;
}

function tableHeader(maxNameCols) {
    const elements = [];
    elements.push(formatName('File', maxNameCols, 0));
    elements.push(formatPct('% Stmts'));
    elements.push(formatPct('% Branch'));
    elements.push(formatPct('% Funcs'));
    elements.push(formatPct('% Lines'));
    elements.push(formatPct('Uncovered Line #s', MISSING_COL));
    return elements.join(' |') + ' |';
}

function missingLines(node, colorizer) {
    const missingLines = node.isSummary()
        ? []
        : node.getFileCoverage().getUncoveredLines();
    return colorizer(formatPct(missingLines.join(','), MISSING_COL), 'low');
}

function missingBranches(node, colorizer) {
    const branches = node.isSummary()
        ? {}
        : node.getFileCoverage().getBranchCoverageByLine();
    const missingLines = Object.keys(branches)
        .filter(key => branches[key].coverage < 100)
        .map(key => key);
    return colorizer(formatPct(missingLines.join(','), MISSING_COL), 'medium');
}

function isFull(metrics) {
    return (
        metrics.statements.pct === 100 &&
        metrics.branches.pct === 100 &&
        metrics.functions.pct === 100 &&
        metrics.lines.pct === 100
    );
}

function tableRow(
    node,
    context,
    colorizer,
    maxNameCols,
    level,
    skipEmpty,
    skipFull
) {
    const name = nodeName(node);
    const metrics = node.getCoverageSummary();
    const isEmpty = metrics.isEmpty();
    if (skipEmpty && isEmpty) {
        return '';
    }
    if (skipFull && isFull(metrics)) {
        return '';
    }

    const mm = {
        statements: isEmpty ? 0 : metrics.statements.pct,
        branches: isEmpty ? 0 : metrics.branches.pct,
        functions: isEmpty ? 0 : metrics.functions.pct,
        lines: isEmpty ? 0 : metrics.lines.pct
    };
    const colorize = isEmpty
        ? function(str) {
              return str;
          }
        : function(str, key) {
              return colorizer(str, context.classForPercent(key, mm[key]));
          };
    const elements = [];

    elements.push(colorize(formatName(name, maxNameCols, level), 'statements'));
    elements.push(colorize(formatPct(mm.statements), 'statements'));
    elements.push(colorize(formatPct(mm.branches), 'branches'));
    elements.push(colorize(formatPct(mm.functions), 'functions'));
    elements.push(colorize(formatPct(mm.lines), 'lines'));
    if (mm.lines === 100) {
        elements.push(missingBranches(node, colorizer));
    } else {
        elements.push(missingLines(node, colorizer));
    }
    return elements.join(DELIM) + DELIM;
}

function TextReport(opts) {
    opts = opts || {};
    this.file = opts.file || null;
    this.maxCols = opts.maxCols || 0;
    this.cw = null;
    this.skipEmpty = opts.skipEmpty;
    this.skipFull = opts.skipFull;
}

TextReport.prototype.onStart = function(root, context) {
    const statsWidth = 4 * (PCT_COLS + 2) + MISSING_COL;

    this.cw = context.writer.writeFile(this.file);
    this.nameWidth = findNameWidth(root, context);
    if (this.maxCols > 0) {
        const maxRemaining = this.maxCols - statsWidth - 2;
        if (this.nameWidth > maxRemaining) {
            this.nameWidth = maxRemaining;
        }
    }
    const line = makeLine(this.nameWidth);
    this.cw.println(line);
    this.cw.println(tableHeader(this.nameWidth));
    this.cw.println(line);
};

TextReport.prototype.onSummary = function(node, context) {
    const nodeDepth = depthFor(node);
    const row = tableRow(
        node,
        context,
        this.cw.colorize.bind(this.cw),
        this.nameWidth,
        nodeDepth,
        this.skipEmpty,
        this.skipFull
    );
    if (row) {
        this.cw.println(row);
    }
};

TextReport.prototype.onDetail = function(node, context) {
    return this.onSummary(node, context);
};

TextReport.prototype.onEnd = function() {
    this.cw.println(makeLine(this.nameWidth));
    this.cw.close();
};

exports_istanbuljs_istanbuljs_packages_istanbul_reports_lib_text_index = TextReport;



/*
file https://github.com/istanbuljs/istanbuljs/blob/istanbul-reports@2.2.5/packages/istanbul-reports/package.json
*/
var exports_istanbuljs_istanbuljs_packages_istanbul_reports_package_json = {};
{
  "name": "istanbul-reports",
  "version": "2.2.5",
  "description": "istanbul reports",
  "author": "Krishnan Anantheswaran <kananthmail-github@yahoo.com>",
  "main": "index.js",
  "files": [
    "index.js",
    "lib"
  ],
  "scripts": {
    "test": "mocha --recursive"
  },
  "dependencies": {
    "handlebars": "^4.1.2"
  },
  "devDependencies": {
    "istanbul-lib-coverage": "^2.0.5",
    "istanbul-lib-report": "^2.0.8"
  },
  "license": "BSD-3-Clause",
  "repository": {
    "type": "git",
    "url": "git@github.com:istanbuljs/istanbuljs"
  },
  "keywords": [
    "istanbul",
    "reports"
  ],
  "bugs": {
    "url": "https://github.com/istanbuljs/istanbuljs/issues"
  },
  "homepage": "https://istanbul.js.org/",
  "engines": {
    "node": ">=6"
  }
}



/*
file https://github.com/istanbuljs/istanbuljs/blob/istanbul-reports@2.2.5/packages/nyc-config-babel/index.json
*/
var exports_istanbuljs_istanbuljs_packages_nyc_config_babel_index_json = {};
{
    "sourceMap": false,
    "instrument": false,
    "require": ["@babel/register"]
}



/*
file https://github.com/istanbuljs/istanbuljs/blob/istanbul-reports@2.2.5/packages/nyc-config-babel/package.json
*/
var exports_istanbuljs_istanbuljs_packages_nyc_config_babel_package_json = {};
{
  "name": "@istanbuljs/nyc-config-babel",
  "version": "2.1.1",
  "description": "nyc configuration that works with babel-plugin-istanbul",
  "main": "index.json",
  "files": [
    "index.json"
  ],
  "scripts": {
    "test": "exit 0"
  },
  "repository": {
    "type": "git",
    "url": "git+ssh://git@github.com/istanbuljs/istanbuljs.git"
  },
  "keywords": [
    "babel-plugin-istanbul",
    "config",
    "nyc",
    "test",
    "coverage"
  ],
  "author": "Ben Coe <ben@npmjs.com>",
  "license": "ISC",
  "bugs": {
    "url": "https://github.com/istanbuljs/istanbuljs/issues"
  },
  "homepage": "https://istanbul.js.org/",
  "publishConfig": {
    "access": "public"
  },
  "engines": {
    "node": ">=6"
  },
  "peerDependencies": {
    "@babel/register": "*",
    "babel-plugin-istanbul": ">=5"
  }
}



/*
file https://github.com/istanbuljs/istanbuljs/blob/istanbul-reports@2.2.5/packages/nyc-config-hook-run-in-this-context/index.js
*/
var exports_istanbuljs_istanbuljs_packages_nyc_config_hook_run_in_this_context_index = {};
'use strict';

// const semver = require('semver');

exports_istanbuljs_istanbuljs_packages_nyc_config_hook_run_in_this_context_index = {
    'hook-require': !semver.lt(process.version, '11.11.0'),
    'hook-run-in-this-context': true
};



/*
file https://github.com/istanbuljs/istanbuljs/blob/istanbul-reports@2.2.5/packages/nyc-config-hook-run-in-this-context/package.json
*/
var exports_istanbuljs_istanbuljs_packages_nyc_config_hook_run_in_this_context_package_json = {};
{
  "name": "@istanbuljs/nyc-config-hook-run-in-this-context",
  "version": "0.1.1",
  "description": "nyc configuration for hook-run-in-this-context",
  "main": "index.js",
  "files": [
    "index.js"
  ],
  "scripts": {
    "test": "mocha"
  },
  "repository": {
    "type": "git",
    "url": "git+ssh://git@github.com/istanbuljs/istanbuljs.git"
  },
  "keywords": [
    "hook",
    "config",
    "nyc",
    "test",
    "coverage"
  ],
  "author": "Corey Farrell <git@cfware.com>",
  "license": "ISC",
  "bugs": {
    "url": "https://github.com/istanbuljs/istanbuljs/issues"
  },
  "homepage": "https://istanbul.js.org/",
  "publishConfig": {
    "access": "public"
  },
  "engines": {
    "node": ">=6"
  }
}



/*
file https://github.com/istanbuljs/istanbuljs/blob/istanbul-reports@2.2.5/packages/nyc-config-typescript/index.json
*/
var exports_istanbuljs_istanbuljs_packages_nyc_config_typescript_index_json = {};
{
  "cache": false,
  "extension": [
    ".ts",
    ".tsx"
  ],
  "exclude": [
    "**/*.d.ts",
    "coverage/**",
    "packages/*/test/**",
    "test/**",
    "test{,-*}.ts",
    "**/*{.,-}{test,spec}.ts",
    "**/__tests__/**",
    "**/node_modules/**"
  ]
}



/*
file https://github.com/istanbuljs/istanbuljs/blob/istanbul-reports@2.2.5/packages/nyc-config-typescript/package.json
*/
var exports_istanbuljs_istanbuljs_packages_nyc_config_typescript_package_json = {};
{
  "name": "@istanbuljs/nyc-config-typescript",
  "version": "0.1.3",
  "description": "nyc configuration that works with typescript",
  "main": "index.json",
  "files": [
    "index.json"
  ],
  "scripts": {
    "test": "exit 0"
  },
  "repository": {
    "type": "git",
    "url": "git+ssh://git@github.com/istanbuljs/istanbuljs.git"
  },
  "keywords": [
    "typescript",
    "config",
    "nyc",
    "test",
    "coverage"
  ],
  "author": "Jason Kurian <jgkurian@me.com>",
  "license": "ISC",
  "bugs": {
    "url": "https://github.com/istanbuljs/istanbuljs/issues"
  },
  "homepage": "https://istanbul.js.org/",
  "publishConfig": {
    "access": "public"
  },
  "engines": {
    "node": ">=6"
  },
  "peerDependencies": {
    "source-map-support": "*",
    "ts-node": "*"
  }
}



/*
file https://github.com/istanbuljs/istanbuljs/blob/istanbul-reports@2.2.5/packages/test-exclude/index.js
*/
var exports_istanbuljs_istanbuljs_packages_test_exclude_index = {};
// const path = require('path');
// const glob = require('glob');
// const minimatch = require('minimatch');
// const readPkgUp = require('read-pkg-up');
// const requireMainFilename = require('require-main-filename');

class TestExclude {
    constructor(opts) {
        Object.assign(
            this,
            {
                cwd: process.cwd(),
                include: false,
                relativePath: true,
                configKey: null, // the key to load config from in package.json.
                configPath: null, // optionally override requireMainFilename.
                configFound: false,
                excludeNodeModules: true,
                extension: false
            },
            opts
        );

        if (typeof this.include === 'string') {
            this.include = [this.include];
        }

        if (typeof this.exclude === 'string') {
            this.exclude = [this.exclude];
        }

        if (typeof this.extension === 'string') {
            this.extension = [this.extension];
        } else if (
            !Array.isArray(this.extension) ||
            this.extension.length === 0
        ) {
            this.extension = false;
        }

        if (!this.include && !this.exclude && this.configKey) {
            Object.assign(this, this.pkgConf(this.configKey, this.configPath));
        }

        if (!this.exclude || !Array.isArray(this.exclude)) {
            this.exclude = exportFunc.defaultExclude;
        }

        if (this.include && this.include.length > 0) {
            this.include = prepGlobPatterns([].concat(this.include));
        } else {
            this.include = false;
        }

        if (
            this.excludeNodeModules &&
            !this.exclude.includes('**/node_modules/**')
        ) {
            this.exclude = this.exclude.concat('**/node_modules/**');
        }

        this.exclude = prepGlobPatterns([].concat(this.exclude));

        this.handleNegation();
    }

    /* handle the special case of negative globs
     * (!**foo/bar); we create a new this.excludeNegated set
     * of rules, which is applied after excludes and we
     * move excluded include rules into this.excludes.
     */
    handleNegation() {
        const noNeg = e => e.charAt(0) !== '!';
        const onlyNeg = e => e.charAt(0) === '!';
        const stripNeg = e => e.slice(1);

        if (Array.isArray(this.include)) {
            const includeNegated = this.include.filter(onlyNeg).map(stripNeg);
            this.exclude.push(...prepGlobPatterns(includeNegated));
            this.include = this.include.filter(noNeg);
        }

        this.excludeNegated = this.exclude.filter(onlyNeg).map(stripNeg);
        this.exclude = this.exclude.filter(noNeg);
        this.excludeNegated = prepGlobPatterns(this.excludeNegated);
    }

    shouldInstrument(filename, relFile) {
        if (
            this.extension &&
            !this.extension.some(ext => filename.endsWith(ext))
        ) {
            return false;
        }

        let pathToCheck = filename;

        if (this.relativePath) {
            relFile = relFile || path.relative(this.cwd, filename);

            // Don't instrument files that are outside of the current working directory.
            if (/^\.\./.test(path.relative(this.cwd, filename))) {
                return false;
            }

            pathToCheck = relFile.replace(/^\.[\\/]/, ''); // remove leading './' or '.\'.
        }

        const dot = { dot: true };
        const matches = pattern => minimatch(pathToCheck, pattern, dot);
        return (
            (!this.include || this.include.some(matches)) &&
            (!this.exclude.some(matches) || this.excludeNegated.some(matches))
        );
    }

    pkgConf(key, path) {
        const cwd = path || requireMainFilename(require);
        const obj = readPkgUp.sync({ cwd });

        if (obj.pkg && obj.pkg[key] && typeof obj.pkg[key] === 'object') {
            this.configFound = true;

            return obj.pkg[key];
        }

        return {};
    }

    globSync(cwd = this.cwd) {
        const globPatterns = getExtensionPattern(this.extension || []);
        const globOptions = { cwd, nodir: true, dot: true };
        /* If we don't have any excludeNegated then we can optimize glob by telling
         * it to not iterate into unwanted directory trees (like node_modules). */
        if (this.excludeNegated.length === 0) {
            globOptions.ignore = this.exclude;
        }

        return glob
            .sync(globPatterns, globOptions)
            .filter(file => this.shouldInstrument(path.resolve(cwd, file)));
    }
}

function prepGlobPatterns(patterns) {
    return patterns.reduce((result, pattern) => {
        // Allow gitignore style of directory exclusion
        if (!/\/\*\*$/.test(pattern)) {
            result = result.concat(pattern.replace(/\/$/, '') + '/**');
        }

        // Any rules of the form **/foo.js, should also match foo.js.
        if (/^\*\*\//.test(pattern)) {
            result = result.concat(pattern.replace(/^\*\*\//, ''));
        }

        return result.concat(pattern);
    }, []);
}

function getExtensionPattern(extension) {
    switch (extension.length) {
        case 0:
            return '**';
        case 1:
            return `**/*${extension[0]}`;
        default:
            return `**/*{${extension.join()}}`;
    }
}

const exportFunc = opts => new TestExclude(opts);

const devConfigs = ['ava', 'babel', 'jest', 'nyc', 'rollup', 'webpack'];

exportFunc.defaultExclude = [
    'coverage/**',
    'packages/*/test/**',
    'test/**',
    'test{,-*}.js',
    '**/*{.,-}test.js',
    '**/__tests__/**',
    `**/{${devConfigs.join()}}.config.js`
];

exports_istanbuljs_istanbuljs_packages_test_exclude_index = exportFunc;



/*
file https://github.com/istanbuljs/istanbuljs/blob/istanbul-reports@2.2.5/packages/test-exclude/package.json
*/
var exports_istanbuljs_istanbuljs_packages_test_exclude_package_json = {};
{
  "name": "test-exclude",
  "version": "5.2.3",
  "description": "test for inclusion or exclusion of paths using pkg-conf and globs",
  "main": "index.js",
  "files": [
    "index.js"
  ],
  "scripts": {
    "test": "mocha"
  },
  "repository": {
    "type": "git",
    "url": "git+https://github.com/istanbuljs/istanbuljs.git"
  },
  "keywords": [
    "exclude",
    "include",
    "glob",
    "package",
    "config"
  ],
  "author": "Ben Coe <ben@npmjs.com>",
  "license": "ISC",
  "bugs": {
    "url": "https://github.com/istanbuljs/istanbuljs/issues"
  },
  "homepage": "https://istanbul.js.org/",
  "dependencies": {
    "glob": "^7.1.3",
    "minimatch": "^3.0.4",
    "read-pkg-up": "^4.0.0",
    "require-main-filename": "^2.0.0"
  },
  "engines": {
    "node": ">=6"
  }
}



/*
repo https://github.com/istanbuljs/v8-to-istanbul/tree/v3.2.3
*/



/*
file https://github.com/istanbuljs/v8-to-istanbul/blob/v3.2.3/package.json
*/
var exports_istanbuljs_v8_to_istanbul___package_json = {};
{
  "name": "v8-to-istanbul",
  "version": "3.2.3",
  "description": "convert from v8 coverage format to istanbul's format",
  "main": "index.js",
  "types": "index.d.ts",
  "scripts": {
    "fix": "standard --fix",
    "snapshot": "TAP_SNAPSHOT=1 tap test/*.js",
    "test": "c8 --reporter=html --reporter=text tap --no-coverage --no-esm test/*.js",
    "posttest": "standard",
    "release": "standard-version",
    "coverage": "c8 report --reporter=text-lcov | coveralls"
  },
  "repository": {
    "url": "git@github.com:bcoe/v8-to-istanbul.git"
  },
  "keywords": [
    "istanbul",
    "v8",
    "coverage"
  ],
  "standard": {
    "ignore": [
      "**/test/fixtures"
    ]
  },
  "author": "Ben Coe <ben@npmjs.com>",
  "license": "ISC",
  "dependencies": {
    "@types/istanbul-lib-coverage": "^2.0.1",
    "convert-source-map": "^1.6.0",
    "source-map": "^0.7.3"
  },
  "devDependencies": {
    "@types/node": "12.0.10",
    "c8": "5.0.1",
    "coveralls": "3.0.4",
    "should": "13.2.3",
    "standard": "12.0.1",
    "standard-version": "6.0.1",
    "tap": "14.2.5"
  },
  "engines": {
    "node": ">=10.10.0"
  }
}



/*
file https://github.com/istanbuljs/v8-to-istanbul/blob/v3.2.3/lib/branch.js
*/
var exports_istanbuljs_v8_to_istanbul_lib_branch = {};
exports_istanbuljs_v8_to_istanbul_lib_branch = class CovBranch {
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
        line: this.startLine,
        column: this.startCol
      },
      end: {
        line: this.endLine,
        column: this.endCol
      }
    }
    return {
      type: 'branch',
      line: this.startLine,
      loc: location,
      locations: [Object.assign({}, location)]
    }
  }
}



/*
file https://github.com/istanbuljs/v8-to-istanbul/blob/v3.2.3/lib/function.js
*/
var exports_istanbuljs_v8_to_istanbul_lib_function = {};
exports_istanbuljs_v8_to_istanbul_lib_function = class CovFunction {
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
        line: this.startLine,
        column: this.startCol
      },
      end: {
        line: this.endLine,
        column: this.endCol
      }
    }
    return {
      name: this.name,
      decl: loc,
      loc: loc,
      line: this.startLine
    }
  }
}



/*
file https://github.com/istanbuljs/v8-to-istanbul/blob/v3.2.3/lib/line.js
*/
var exports_istanbuljs_v8_to_istanbul_lib_line = {};
exports_istanbuljs_v8_to_istanbul_lib_line = class CovLine {
  constructor (line, startCol, lineStr) {
    this.line = line
    // note that startCol and endCol are absolute positions
    // within a file, not relative to the line.
    this.startCol = startCol

    // the line length itself does not include the newline characters,
    // these are however taken into account when enumerating absolute offset.
    const matchedNewLineChar = lineStr.match(/\r?\n$/u)
    const newLineLength = matchedNewLineChar ? matchedNewLineChar[0].length : 0
    this.endCol = startCol + lineStr.length - newLineLength

    // we start with all lines having been executed, and work
    // backwards zeroing out lines based on V8 output.
    this.count = 1

    // set by source.js during parsing, if /* c8 ignore next */ is found.
    this.ignore = false
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
file https://github.com/istanbuljs/v8-to-istanbul/blob/v3.2.3/lib/pathutils.js
*/
var exports_istanbuljs_v8_to_istanbul_lib_pathutils = {};
/*
 Copyright 2015, Yahoo Inc.
 Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

// pulled from: https://github.com/istanbuljs/istanbuljs
'use strict'

// const path = require('path')

exports_istanbuljs_v8_to_istanbul_lib_pathutils = {
  isAbsolute: path.isAbsolute,
  relativeTo (file, origFile) {
    const p = path.isAbsolute(file)
      ? file
      : path.resolve(path.dirname(origFile), file)
    return path.relative(process.cwd(), p)
  }
}



/*
file https://github.com/istanbuljs/v8-to-istanbul/blob/v3.2.3/lib/source.js
*/
var exports_istanbuljs_v8_to_istanbul_lib_source = {};
const CovLine = exports_istanbuljs_v8_to_istanbul_lib_line
// const { GREATEST_LOWER_BOUND, LEAST_UPPER_BOUND } = require('source-map').SourceMapConsumer

exports_istanbuljs_v8_to_istanbul_lib_source = class CovSource {
  constructor (sourceRaw, wrapperLength) {
    sourceRaw = sourceRaw.trimEnd()
    this.lines = []
    this.eof = sourceRaw.length
    this.shebangLength = getShebangLength(sourceRaw)
    this.wrapperLength = wrapperLength - this.shebangLength
    this._buildLines(sourceRaw)
  }
  _buildLines (source) {
    let position = 0
    let ignoreCount = 0
    for (const [i, lineStr] of source.split(/(?<=\r?\n)/u).entries()) {
      const line = new CovLine(i + 1, position, lineStr)
      if (ignoreCount > 0) {
        line.ignore = true
        ignoreCount--
      } else {
        ignoreCount = this._parseIgnoreNext(lineStr, line)
      }
      this.lines.push(line)
      position += lineStr.length
    }
  }
  _parseIgnoreNext (lineStr, line) {
    const testIgnoreNextLines = lineStr.match(/^\W*\/\* c8 ignore next (?<count>[0-9]+)? *\*\/\W*$/)
    if (testIgnoreNextLines) {
      line.ignore = true
      if (testIgnoreNextLines.groups['count']) {
        return Number(testIgnoreNextLines.groups['count'])
      } else {
        return 1
      }
    } else {
      if (lineStr.match(/\/\* c8 ignore next \*\//)) {
        line.ignore = true
      }
    }

    return 0
  }
  // given a start column and end column in absolute offsets within
  // a source file (0 - EOF), returns the relative line column positions.
  offsetToOriginalRelative (sourceMap, startCol, endCol) {
    const lines = this.lines.filter((line, i) => {
      return startCol <= line.endCol && endCol >= line.startCol
    })
    if (!lines.length) return {}

    const start = originalPositionTryBoth(
      sourceMap,
      lines[0].line,
      startCol - lines[0].startCol
    )
    let end = originalEndPositionFor(
      sourceMap,
      lines[lines.length - 1].line,
      endCol - lines[lines.length - 1].startCol
    )

    if (!(start && end)) {
      return {}
    }

    if (!(start.source && end.source)) {
      return {}
    }

    if (start.source !== end.source) {
      return {}
    }

    if (start.line === end.line && start.column === end.column) {
      end = sourceMap.originalPositionFor({
        line: lines[lines.length - 1].line,
        column: endCol - lines[lines.length - 1].startCol,
        bias: LEAST_UPPER_BOUND
      })
      end.column -= 1
    }

    return {
      startLine: start.line,
      relStartCol: start.column,
      endLine: end.line,
      relEndCol: end.column
    }
  }
  relativeToOffset (line, relCol) {
    line = Math.max(line, 1)
    if (this.lines[line - 1] === undefined) return this.eof
    return Math.min(this.lines[line - 1].startCol + relCol, this.lines[line - 1].endCol)
  }
}

// this implementation is pulled over from istanbul-lib-sourcemap:
// https://github.com/istanbuljs/istanbuljs/blob/master/packages/istanbul-lib-source-maps/lib/get-mapping.js
//
/**
 * AST ranges are inclusive for start positions and exclusive for end positions.
 * Source maps are also logically ranges over text, though interacting with
 * them is generally achieved by working with explicit positions.
 *
 * When finding the _end_ location of an AST item, the range behavior is
 * important because what we're asking for is the _end_ of whatever range
 * corresponds to the end location we seek.
 *
 * This boils down to the following steps, conceptually, though the source-map
 * library doesn't expose primitives to do this nicely:
 *
 * 1. Find the range on the generated file that ends at, or exclusively
 *    contains the end position of the AST node.
 * 2. Find the range on the original file that corresponds to
 *    that generated range.
 * 3. Find the _end_ location of that original range.
 */
function originalEndPositionFor (sourceMap, line, column) {
  // Given the generated location, find the original location of the mapping
  // that corresponds to a range on the generated file that overlaps the
  // generated file end location. Note however that this position on its
  // own is not useful because it is the position of the _start_ of the range
  // on the original file, and we want the _end_ of the range.
  const beforeEndMapping = originalPositionTryBoth(
    sourceMap,
    line,
    Math.max(column - 1, 1)
  )

  if (beforeEndMapping.source === null) {
    return null
  }

  // Convert that original position back to a generated one, with a bump
  // to the right, and a rightward bias. Since 'generatedPositionFor' searches
  // for mappings in the original-order sorted list, this will find the
  // mapping that corresponds to the one immediately after the
  // beforeEndMapping mapping.
  const afterEndMapping = sourceMap.generatedPositionFor({
    source: beforeEndMapping.source,
    line: beforeEndMapping.line,
    column: beforeEndMapping.column + 1,
    bias: LEAST_UPPER_BOUND
  })
  if (
  // If this is null, it means that we've hit the end of the file,
  // so we can use Infinity as the end column.
    afterEndMapping.line === null ||
      // If these don't match, it means that the call to
      // 'generatedPositionFor' didn't find any other original mappings on
      // the line we gave, so consider the binding to extend to infinity.
      sourceMap.originalPositionFor(afterEndMapping).line !==
          beforeEndMapping.line
  ) {
    return {
      source: beforeEndMapping.source,
      line: beforeEndMapping.line,
      column: Infinity
    }
  }

  // Convert the end mapping into the real original position.
  return sourceMap.originalPositionFor(afterEndMapping)
}

function originalPositionTryBoth (sourceMap, line, column) {
  const original = sourceMap.originalPositionFor({
    line,
    column,
    bias: GREATEST_LOWER_BOUND
  })
  if (original.line === null) {
    return sourceMap.originalPositionFor({
      line,
      column,
      bias: LEAST_UPPER_BOUND
    })
  } else {
    return original
  }
}

function getShebangLength (source) {
  if (source.indexOf('#!') === 0) {
    const match = source.match(/(?<shebang>#!.*)/)
    if (match) {
      return match.groups.shebang.length
    }
  } else {
    return 0
  }
}



/*
file https://github.com/istanbuljs/v8-to-istanbul/blob/v3.2.3/lib/v8-to-istanbul.js
*/
var exports_istanbuljs_v8_to_istanbul_lib_v8_to_istanbul = {};
const { isAbsolute, relativeTo } = exports_istanbuljs_v8_to_istanbul_lib_pathutils
// const assert = require('assert')
// const convertSourceMap = require('convert-source-map')
// const { dirname, join } = require('path')
const CovBranch = exports_istanbuljs_v8_to_istanbul_lib_branch
const CovFunction = exports_istanbuljs_v8_to_istanbul_lib_function
const CovSource = exports_istanbuljs_v8_to_istanbul_lib_source
// const { readFileSync } = require('fs')
// const { SourceMapConsumer } = require('source-map')

const isOlderNode10 = /^v10\.(([0-9]\.)|(1[0-5]\.))/u.test(process.version)

// Injected when Node.js is loading script into isolate pre Node 10.16.x.
// see: https://github.com/nodejs/node/pull/21573.
const cjsWrapperLength = isOlderNode10 ? require('module').wrapper[0].length : 0

exports_istanbuljs_v8_to_istanbul_lib_v8_to_istanbul = class V8ToIstanbul {
  constructor (scriptPath, wrapperLength, sources) {
    assert(typeof scriptPath === 'string', 'scriptPath must be a string')
    this.path = parsePath(scriptPath)
    this.wrapperLength = wrapperLength === undefined ? cjsWrapperLength : wrapperLength
    this.sources = sources || {}
    this.generatedLines = []
    this.branches = []
    this.functions = []
    this.sourceMap = undefined
    this.source = undefined
    this.sourceTranspiled = undefined
  }
  async load () {
    const rawSource = this.sources.source || readFileSync(this.path, 'utf8')
    const rawSourceMap = this.sources.sourceMap ||
      // if we find a source-map (either inline, or a .map file) we load
      // both the transpiled and original source, both of which are used during
      // the backflips we perform to remap absolute to relative positions.
      convertSourceMap.fromSource(rawSource) || convertSourceMap.fromMapFileSource(rawSource, dirname(this.path))

    if (rawSourceMap) {
      if (rawSourceMap.sourcemap.sources.length > 1) {
        console.warn('v8-to-istanbul: source-mappings from one to many files not yet supported')
        this.source = new CovSource(rawSource, this.wrapperLength)
      } else {
        if (rawSourceMap.sourcemap.sourceRoot && isAbsolute(rawSourceMap.sourcemap.sourceRoot)) {
          // TODO: we should also make source-root work with relative paths, but this needs
          // to be combined with the relativeTo logic which takes into account process.cwd().
          this.path = join(rawSourceMap.sourcemap.sourceRoot, rawSourceMap.sourcemap.sources[0])
        } else {
          this.path = relativeTo(rawSourceMap.sourcemap.sources[0], this.path)
        }
        this.sourceMap = await new SourceMapConsumer(rawSourceMap.sourcemap)

        let originalRawSource
        if (this.sources.originalSource) {
          originalRawSource = this.sources.originalSource
        } else {
          originalRawSource = readFileSync(this.path, 'utf8')
        }

        this.source = new CovSource(originalRawSource, this.wrapperLength)
        this.sourceTranspiled = new CovSource(rawSource, this.wrapperLength)
      }
    } else {
      this.source = new CovSource(rawSource, this.wrapperLength)
    }
  }
  applyCoverage (blocks) {
    blocks.forEach(block => {
      block.ranges.forEach((range, i) => {
        const {
          startCol,
          endCol
        } = this._maybeRemapStartColEndCol(range)

        const lines = this.source.lines.filter(line => {
          return startCol <= line.endCol && endCol >= line.startCol
        })
        const startLineInstance = lines[0]
        const endLineInstance = lines[lines.length - 1]

        if (block.isBlockCoverage && lines.length) {
          // record branches.
          this.branches.push(new CovBranch(
            startLineInstance.line,
            startCol - startLineInstance.startCol,
            endLineInstance.line,
            endCol - endLineInstance.startCol,
            range.count
          ))

          // if block-level granularity is enabled, we we still create a single
          // CovFunction tracking object for each set of ranges.
          if (block.functionName && i === 0) {
            this.functions.push(new CovFunction(
              block.functionName,
              startLineInstance.line,
              startCol - startLineInstance.startCol,
              endLineInstance.line,
              endCol - endLineInstance.startCol,
              range.count
            ))
          }
        } else if (block.functionName && lines.length) {
          // record functions.
          this.functions.push(new CovFunction(
            block.functionName,
            startLineInstance.line,
            startCol - startLineInstance.startCol,
            endLineInstance.line,
            endCol - endLineInstance.startCol,
            range.count
          ))
        }

        // record the lines (we record these as statements, such that we're
        // compatible with Istanbul 2.0).
        lines.forEach(line => {
          // make sure branch spans entire line; don't record 'goodbye'
          // branch in `const foo = true ? 'hello' : 'goodbye'` as a
          // 0 for line coverage.
          //
          // All lines start out with coverage of 1, and are later set to 0
          // if they are not invoked; line.ignore prevents a line from being
          // set to 0, and is set if the special comment /* c8 ignore next */
          // is used.
          if (startCol <= line.startCol && endCol >= line.endCol && !line.ignore) {
            line.count = range.count
          }
        })
      })
    })
  }
  _maybeRemapStartColEndCol (range) {
    let startCol = Math.max(0, range.startOffset - this.source.wrapperLength)
    let endCol = Math.min(this.source.eof, range.endOffset - this.source.wrapperLength)

    if (this.sourceMap) {
      startCol = Math.max(0, range.startOffset - this.sourceTranspiled.wrapperLength)
      endCol = Math.min(this.sourceTranspiled.eof, range.endOffset - this.sourceTranspiled.wrapperLength)

      const { startLine, relStartCol, endLine, relEndCol } = this.sourceTranspiled.offsetToOriginalRelative(
        this.sourceMap,
        startCol,
        endCol
      )

      // next we convert these relative positions back to absolute positions
      // in the original source (which is the format expected in the next step).
      startCol = this.source.relativeToOffset(startLine, relStartCol)
      endCol = this.source.relativeToOffset(endLine, relEndCol)
    }

    return {
      startCol,
      endCol
    }
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
    this.source.lines.forEach((line, index) => {
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
      const ignore = this.source.lines[branch.startLine - 1].ignore
      branches.branchMap[`${index}`] = branch.toIstanbul()
      branches.b[`${index}`] = [ignore ? 1 : branch.count]
    })
    return branches
  }
  _functionsToIstanbul () {
    const functions = {
      fnMap: {},
      f: {}
    }
    this.functions.forEach((fn, index) => {
      const ignore = this.source.lines[fn.startLine - 1].ignore
      functions.fnMap[`${index}`] = fn.toIstanbul()
      functions.f[`${index}`] = ignore ? 1 : fn.count
    })
    return functions
  }
}

function parsePath (scriptPath) {
  return scriptPath.replace('file://', '')
}



/*
file https://github.com/istanbuljs/v8-to-istanbul/blob/v3.2.3/index.js
*/
var exports_istanbuljs_v8_to_istanbul___index = {};
const V8ToIstanbul = exports_istanbuljs_v8_to_istanbul___lib_v8_to_istanbul

exports_istanbuljs_v8_to_istanbul___index = function (path, wrapperLength, sources) {
  return new V8ToIstanbul(path, wrapperLength, sources)
}



/*
repo https://github.com/istanbuljs/puppeteer-to-istanbul/tree/v1.2.2
*/



/*
file https://github.com/istanbuljs/puppeteer-to-istanbul/blob/v1.2.2/package.json
*/
var exports_istanbuljs_puppeteer_to_istanbul___package_json = {};
{
  "name": "puppeteer-to-istanbul",
  "version": "1.2.2",
  "description": "convert from puppeteer's coverage output to a format that can be used by istanbul reports",
  "main": "index.js",
  "scripts": {
    "test": "nyc --all mocha test/*.js",
    "posttest": "standard",
    "release": "standard-version"
  },
  "repository": {
    "type": "git",
    "url": "git+https://github.com/istanbuljs/puppeteer-to-istanbul.git"
  },
  "keywords": [
    "istanbul",
    "puppeteer",
    "convert",
    "coverage"
  ],
  "author": "Hackillinois 2018, team Istanbul",
  "license": "ISC",
  "bugs": {
    "url": "https://github.com/istanbuljs/puppeteer-to-istanbul/issues"
  },
  "homepage": "https://github.com/istanbuljs/puppeteer-to-istanbul#readme",
  "devDependencies": {
    "chai": "^4.1.2",
    "coveralls": "^3.0.0",
    "mocha": "^5.0.1",
    "nyc": "^11.4.1",
    "puppeteer": "^1.1.1",
    "standard": "^11.0.0",
    "standard-version": "^4.3.0"
  },
  "dependencies": {
    "clone": "^2.1.1",
    "mkdirp": "^0.5.1",
    "v8-to-istanbul": "^1.2.0",
    "yargs": "^11.0.0"
  },
  "standard": {
    "ignore": "test/sample_js"
  }
}



/*
file https://github.com/istanbuljs/puppeteer-to-istanbul/blob/v1.2.2/lib/output-files.js
*/
var exports_istanbuljs_puppeteer_to_istanbul_lib_output_files = {};
// output JavaScript bundled in puppeteer output to format
// that can be eaten by Istanbul.

// TODO: Put function interfaces on this file

// const fs = require('fs')
// const mkdirp = require('mkdirp')
// const clone = require('clone')
// const pathLib = require('path')

const storagePath = './.nyc_output/js'

class OutputFiles {
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

exports_istanbuljs_puppeteer_to_istanbul_lib_output_files = function (coverageInfo) {
  return new OutputFiles(coverageInfo)
}



/*
file https://github.com/istanbuljs/puppeteer-to-istanbul/blob/v1.2.2/lib/puppeteer-to-istanbul.js
*/
var exports_istanbuljs_puppeteer_to_istanbul_lib_puppeteer_to_istanbul = {};
// const fs = require('fs')
const OutputFiles = exports_istanbuljs_puppeteer_to_istanbul_lib_output_files
// const mkdirp = require('mkdirp')
const PuppeteerToV8 = exports_istanbuljs_puppeteer_to_istanbul_lib_puppeteer_to_v8
// const v8toIstanbul = require('v8-to-istanbul')

class PuppeteerToIstanbul {
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

    mkdirp.sync('./.nyc_output')
    fs.writeFileSync('./.nyc_output/out.json', JSON.stringify(fullJson), 'utf8')
  }
}

exports_istanbuljs_puppeteer_to_istanbul_lib_puppeteer_to_istanbul = function (coverageInfo) {
  return new PuppeteerToIstanbul(coverageInfo)
}



/*
file https://github.com/istanbuljs/puppeteer-to-istanbul/blob/v1.2.2/lib/puppeteer-to-v8.js
*/
var exports_istanbuljs_puppeteer_to_istanbul_lib_puppeteer_to_v8 = {};
class PuppeteerToV8 {
  constructor (coverageInfo) {
    this.coverageInfo = coverageInfo
  }

  setCoverageInfo (coverageInfo) {
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

exports_istanbuljs_puppeteer_to_istanbul_lib_puppeteer_to_v8 = (coverageInfo) => new PuppeteerToV8(coverageInfo)



/*
file https://github.com/istanbuljs/puppeteer-to-istanbul/blob/v1.2.2/index.js
*/
var exports_istanbuljs_puppeteer_to_istanbul___index = {};
const PuppeteerToIstanbul = exports_istanbuljs_puppeteer_to_istanbul___lib_puppeteer_to_istanbul

exports_istanbuljs_puppeteer_to_istanbul___index = {
  write: (puppeteerFormat) => {
    const pti = PuppeteerToIstanbul(puppeteerFormat)
    pti.writeIstanbulFormat()
  }
}



/*
repo https://github.com/istanbuljs/nyc/tree/v14.1.1
*/



/*
file https://github.com/istanbuljs/nyc/blob/v14.1.1/package.json
*/
var exports_istanbuljs_nyc___package_json = {};
{
  "name": "nyc",
  "version": "14.1.1",
  "description": "the Istanbul command line interface",
  "main": "index.js",
  "scripts": {
    "lint": "standard",
    "pretest": "npm run lint && npm run clean && npm run instrument",
    "test": "tap -t360 --no-cov -b test/*.js",
    "snap": "cross-env TAP_SNAPSHOT=1 npm test",
    "posttest": "npm run report",
    "clean": "rimraf ./.nyc_output ./node_modules/.cache ./.self_coverage ./test/fixtures/.nyc_output ./test/fixtures/node_modules/.cache ./self-coverage",
    "instrument": "node ./build-self-coverage.js",
    "report": "node ./bin/nyc report --temp-dir ./.self_coverage/ -r text -r lcov",
    "release": "standard-version"
  },
  "bin": {
    "nyc": "./bin/nyc.js"
  },
  "files": [
    "index.js",
    "bin/*.js",
    "lib/**/*.js"
  ],
  "nyc": {
    "exclude": [
      "node_modules",
      "coverage",
      "self-coverage",
      "test/fixtures/coverage.js",
      "test/build/*",
      "test/src/*",
      "test/nyc.js",
      "test/process-args.js",
      "test/fixtures/_generateCoverage.js"
    ]
  },
  "standard": {
    "ignore": [
      "**/fixtures/**",
      "**/test/build/*"
    ]
  },
  "keywords": [
    "coverage",
    "reporter",
    "subprocess",
    "testing"
  ],
  "contributors": [
    {
      "name": "Isaac Schlueter",
      "website": "https://github.com/isaacs"
    },
    {
      "name": "Mark Wubben",
      "website": "https://novemberborn.net"
    },
    {
      "name": "James Talmage",
      "website": "https://twitter.com/jamestalmage"
    },
    {
      "name": "Krishnan Anantheswaran",
      "website": "https://github.com/gotwarlost"
    }
  ],
  "author": "Ben Coe <ben@npmjs.com>",
  "license": "ISC",
  "dependencies": {
    "archy": "^1.0.0",
    "caching-transform": "^3.0.2",
    "convert-source-map": "^1.6.0",
    "cp-file": "^6.2.0",
    "find-cache-dir": "^2.1.0",
    "find-up": "^3.0.0",
    "foreground-child": "^1.5.6",
    "glob": "^7.1.3",
    "istanbul-lib-coverage": "^2.0.5",
    "istanbul-lib-hook": "^2.0.7",
    "istanbul-lib-instrument": "^3.3.0",
    "istanbul-lib-report": "^2.0.8",
    "istanbul-lib-source-maps": "^3.0.6",
    "istanbul-reports": "^2.2.4",
    "js-yaml": "^3.13.1",
    "make-dir": "^2.1.0",
    "merge-source-map": "^1.1.0",
    "resolve-from": "^4.0.0",
    "rimraf": "^2.6.3",
    "signal-exit": "^3.0.2",
    "spawn-wrap": "^1.4.2",
    "test-exclude": "^5.2.3",
    "uuid": "^3.3.2",
    "yargs": "^13.2.2",
    "yargs-parser": "^13.0.0"
  },
  "devDependencies": {
    "any-path": "^1.3.0",
    "chai": "^4.2.0",
    "coveralls": "^3.0.3",
    "cross-env": "^5.2.0",
    "is-windows": "^1.0.2",
    "lodash": "^4.17.11",
    "newline-regex": "^0.2.1",
    "pify": "^4.0.1",
    "requirejs": "^2.3.6",
    "sanitize-filename": "^1.6.1",
    "source-map-support": "^0.5.12",
    "standard": "^12.0.1",
    "standard-version": "^5.0.2",
    "strip-indent": "^2.0.0",
    "tap": "^12.6.5",
    "which": "^1.3.1",
    "zero-fill": "^2.2.3"
  },
  "engines": {
    "node": ">=6"
  },
  "repository": {
    "type": "git",
    "url": "git@github.com:istanbuljs/nyc.git"
  }
}



/*
file https://github.com/istanbuljs/nyc/blob/v14.1.1/lib/commands/check-coverage.js
*/
var exports_istanbuljs_nyc_lib_commands_check_coverage = {};
// const testExclude = require('test-exclude')
// const NYC = require('../../index.js')

exports_istanbuljs_nyc_lib_commands_check_coverage.command = 'check-coverage'

exports_istanbuljs_nyc_lib_commands_check_coverage.describe = 'check whether coverage is within thresholds provided'

exports_istanbuljs_nyc_lib_commands_check_coverage.builder = function (yargs) {
  yargs
    .demandCommand(0, 0)
    .option('exclude', {
      alias: 'x',
      default: testExclude.defaultExclude,
      describe: 'a list of specific files and directories that should be excluded from coverage, glob patterns are supported, node_modules is always excluded',
      global: false
    })
    .option('exclude-node-modules', {
      default: true,
      type: 'boolean',
      describe: 'whether or not to exclude all node_module folders (i.e. **/node_modules/**) by default',
      global: false
    })
    .option('exclude-after-remap', {
      default: true,
      type: 'boolean',
      description: 'should exclude logic be performed after the source-map remaps filenames?',
      global: false
    })
    .option('include', {
      alias: 'n',
      default: [],
      describe: 'a list of specific files that should be covered, glob patterns are supported',
      global: false
    })
    .option('branches', {
      default: 0,
      description: 'what % of branches must be covered?'
    })
    .option('functions', {
      default: 0,
      description: 'what % of functions must be covered?'
    })
    .option('lines', {
      default: 90,
      description: 'what % of lines must be covered?'
    })
    .option('statements', {
      default: 0,
      description: 'what % of statements must be covered?'
    })
    .option('per-file', {
      default: false,
      description: 'check thresholds per file'
    })
    .option('temp-dir', {
      alias: 't',
      describe: 'directory to read raw coverage information from',
      default: './.nyc_output',
      global: false
    })
    .option('temp-directory', {
      hidden: true,
      global: false
    })
    .example('$0 check-coverage --lines 95', "check whether the JSON in nyc's output folder meets the thresholds provided")
}

exports_istanbuljs_nyc_lib_commands_check_coverage.handler = function (argv) {
  process.env.NYC_CWD = process.cwd()

  ;(new NYC(argv)).checkCoverage({
    lines: argv.lines,
    functions: argv.functions,
    branches: argv.branches,
    statements: argv.statements
  }, argv['per-file'])
}



/*
file https://github.com/istanbuljs/nyc/blob/v14.1.1/lib/commands/instrument.js
*/
var exports_istanbuljs_nyc_lib_commands_instrument = {};
// const NYC = require('../../index.js')
// const path = require('path')
// const rimraf = require('rimraf')
// const testExclude = require('test-exclude')

exports_istanbuljs_nyc_lib_commands_instrument.command = 'instrument <input> [output]'

exports_istanbuljs_nyc_lib_commands_instrument.describe = 'instruments a file or a directory tree and writes the instrumented code to the desired output location'

exports_istanbuljs_nyc_lib_commands_instrument.builder = function (yargs) {
  return yargs
    .demandCommand(0, 0)
    .positional('input', {
      describe: 'file or directory to instrument',
      type: 'text'
    })
    .positional('output', {
      describe: 'directory to output instrumented files',
      type: 'text'
    })
    .option('require', {
      alias: 'i',
      default: [],
      describe: 'a list of additional modules that nyc should attempt to require in its subprocess, e.g., @babel/register, @babel/polyfill.'
    })
    .option('extension', {
      alias: 'e',
      default: [],
      describe: 'a list of extensions that nyc should handle in addition to .js'
    })
    .option('source-map', {
      default: true,
      type: 'boolean',
      description: 'should nyc detect and handle source maps?'
    })
    .option('produce-source-map', {
      default: false,
      type: 'boolean',
      description: "should nyc's instrumenter produce source maps?"
    })
    .option('compact', {
      default: true,
      type: 'boolean',
      description: 'should the output be compacted?'
    })
    .option('preserve-comments', {
      default: true,
      type: 'boolean',
      description: 'should comments be preserved in the output?'
    })
    .option('instrument', {
      default: true,
      type: 'boolean',
      description: 'should nyc handle instrumentation?'
    })
    .option('exit-on-error', {
      default: false,
      type: 'boolean',
      description: 'should nyc exit when an instrumentation failure occurs?'
    })
    .option('include', {
      alias: 'n',
      default: [],
      describe: 'a list of specific files and directories that should be instrumented, glob patterns are supported'
    })
    .option('exclude', {
      alias: 'x',
      default: testExclude.defaultExclude,
      describe: 'a list of specific files and directories that should not be instrumented, glob patterns are supported'
    })
    .option('exclude-node-modules', {
      default: true,
      type: 'boolean',
      describe: 'whether or not to exclude all node_module folders (i.e. **/node_modules/**) by default',
      global: false
    })
    .option('es-modules', {
      default: true,
      type: 'boolean',
      description: 'tell the instrumenter to treat files as ES Modules'
    })
    .option('delete', {
      describe: 'should the output folder be deleted before instrumenting files?',
      default: false,
      type: 'boolean'
    })
    .option('complete-copy', {
      describe: 'should nyc copy all files from input to output as well as instrumented files?',
      default: false,
      type: 'boolean'
    })
    .example('$0 instrument ./lib ./output', 'instrument all .js files in ./lib with coverage and output in ./output')
}

exports_istanbuljs_nyc_lib_commands_instrument.handler = function (argv) {
  if (argv.output && (path.resolve(argv.cwd, argv.input) === path.resolve(argv.cwd, argv.output))) {
    console.error(`nyc instrument failed: cannot instrument files in place, <input> must differ from <output>`)
    process.exitCode = 1
    return
  }

  if (path.relative(argv.cwd, path.resolve(argv.cwd, argv.input)).startsWith('..')) {
    console.error(`nyc instrument failed: cannot instrument files outside of project root directory`)
    process.exitCode = 1
    return
  }

  if (argv.delete && argv.output && argv.output.length !== 0) {
    const relPath = path.relative(process.cwd(), path.resolve(argv.output))
    if (relPath !== '' && !relPath.startsWith('..')) {
      rimraf.sync(argv.output)
    } else {
      console.error(`nyc instrument failed: attempt to delete '${process.cwd()}' or containing directory.`)
      process.exit(1)
    }
  }

  // If instrument is set to false enable a noop instrumenter.
  argv.instrumenter = (argv.instrument)
    ? './lib/instrumenters/istanbul'
    : './lib/instrumenters/noop'

  const nyc = new NYC(argv)

  nyc.instrumentAllFiles(argv.input, argv.output, err => {
    if (err) {
      console.error(err.message)
      process.exitCode = 1
    }
  })
}



/*
file https://github.com/istanbuljs/nyc/blob/v14.1.1/lib/commands/merge.js
*/
var exports_istanbuljs_nyc_lib_commands_merge = {};
'use strict'
// const fs = require('fs')
// const path = require('path')
// const makeDir = require('make-dir')

// const NYC = require('../../index.js')

exports_istanbuljs_nyc_lib_commands_merge.command = 'merge <input-directory> [output-file]'

exports_istanbuljs_nyc_lib_commands_merge.describe = 'merge istanbul format coverage output in a given folder'

exports_istanbuljs_nyc_lib_commands_merge.builder = function (yargs) {
  return yargs
    .demandCommand(0, 0)
    .positional('input-directory', {
      describe: 'directory containing multiple istanbul coverage files',
      type: 'text',
      default: './.nyc_output'
    })
    .positional('output-file', {
      describe: 'file to output combined istanbul format coverage to',
      type: 'text',
      default: 'coverage.json'
    })
    .option('temp-dir', {
      alias: 't',
      describe: 'directory to read raw coverage information from',
      default: './.nyc_output'
    })
    .option('temp-directory', {
      hidden: true
    })
    .example('$0 merge ./out coverage.json', 'merge together reports in ./out and output as coverage.json')
}

exports_istanbuljs_nyc_lib_commands_merge.handler = function (argv) {
  process.env.NYC_CWD = process.cwd()
  const nyc = new NYC(argv)
  let inputStat
  try {
    inputStat = fs.statSync(argv.inputDirectory)
    if (!inputStat.isDirectory()) {
      console.error(`${argv.inputDirectory} was not a directory`)
      process.exit(1)
    }
  } catch (err) {
    console.error(`failed access input directory ${argv.inputDirectory} with error:\n\n${err.message}`)
    process.exit(1)
  }
  makeDir.sync(path.dirname(argv.outputFile))
  const map = nyc.getCoverageMapFromAllCoverageFiles(argv.inputDirectory)
  fs.writeFileSync(argv.outputFile, JSON.stringify(map, null, 2), 'utf8')
  console.info(`coverage files in ${argv.inputDirectory} merged into ${argv.outputFile}`)
}



/*
file https://github.com/istanbuljs/nyc/blob/v14.1.1/lib/commands/report.js
*/
var exports_istanbuljs_nyc_lib_commands_report = {};
// const testExclude = require('test-exclude')
// const NYC = require('../../index.js')

exports_istanbuljs_nyc_lib_commands_report.command = 'report'

exports_istanbuljs_nyc_lib_commands_report.describe = 'run coverage report for .nyc_output'

exports_istanbuljs_nyc_lib_commands_report.builder = function (yargs) {
  return yargs
    .demandCommand(0, 0)
    .option('reporter', {
      alias: 'r',
      describe: 'coverage reporter(s) to use',
      default: 'text'
    })
    .option('report-dir', {
      describe: 'directory to output coverage reports in',
      default: 'coverage'
    })
    .option('temp-dir', {
      alias: 't',
      describe: 'directory to read raw coverage information from',
      default: './.nyc_output'
    })
    .option('temp-directory', {
      hidden: true
    })
    .option('exclude', {
      alias: 'x',
      default: testExclude.defaultExclude,
      describe: 'a list of specific files and directories that should be excluded from coverage, glob patterns are supported, node_modules is always excluded',
      global: false
    })
    .option('exclude-node-modules', {
      default: true,
      type: 'boolean',
      describe: 'whether or not to exclude all node_module folders (i.e. **/node_modules/**) by default',
      global: false
    })
    .option('exclude-after-remap', {
      default: true,
      type: 'boolean',
      description: 'should exclude logic be performed after the source-map remaps filenames?',
      global: false
    })
    .option('include', {
      alias: 'n',
      default: [],
      describe: 'a list of specific files that should be covered, glob patterns are supported',
      global: false
    })
    .option('show-process-tree', {
      describe: 'display the tree of spawned processes',
      default: false,
      type: 'boolean'
    })
    .option('skip-empty', {
      describe: 'don\'t show empty files (no lines of code) in report',
      default: false,
      type: 'boolean',
      global: false
    })
    .option('check-coverage', {
      type: 'boolean',
      default: false,
      describe: 'check whether coverage is within thresholds provided',
      global: false
    })
    .option('branches', {
      default: 0,
      description: 'what % of branches must be covered?',
      global: false
    })
    .option('functions', {
      default: 0,
      description: 'what % of functions must be covered?',
      global: false
    })
    .option('lines', {
      default: 90,
      description: 'what % of lines must be covered?',
      global: false
    })
    .option('statements', {
      default: 0,
      description: 'what % of statements must be covered?',
      global: false
    })
    .option('per-file', {
      default: false,
      type: 'boolean',
      description: 'check thresholds per file',
      global: false
    })
    .example('$0 report --reporter=lcov', 'output an HTML lcov report to ./coverage')
}

exports_istanbuljs_nyc_lib_commands_report.handler = function (argv) {
  process.env.NYC_CWD = process.cwd()
  var nyc = new NYC(argv)
  nyc.report()
  if (argv.checkCoverage) {
    nyc.checkCoverage({
      lines: argv.lines,
      functions: argv.functions,
      branches: argv.branches,
      statements: argv.statements
    }, argv['per-file'])
  }
}



/*
file https://github.com/istanbuljs/nyc/blob/v14.1.1/lib/config-util.js
*/
var exports_istanbuljs_nyc_lib_config_util = {};
'use strict'

// const fs = require('fs')
// const path = require('path')
// const findUp = require('find-up')
// const testExclude = require('test-exclude')
// const Yargs = require('yargs/yargs')

var Config = {}

function guessCWD (cwd) {
  cwd = cwd || process.env.NYC_CWD || process.cwd()
  const pkgPath = findUp.sync('package.json', { cwd: cwd })
  if (pkgPath) {
    cwd = path.dirname(pkgPath)
  }
  return cwd
}

Config.loadConfig = function (argv, cwd) {
  const rcOptions = [
    argv.nycrcPath || '.nycrc',
    '.nycrc.json',
    '.nycrc.yml',
    '.nycrc.yaml',
    'nyc.config.js'
  ]
  const rcPath = findUp.sync(rcOptions, { cwd: guessCWD(cwd) })
  let config = {}

  if (rcPath) {
    const rcExt = path.extname(rcPath.toLowerCase())
    if (rcExt === '.js') {
      config = require(rcPath)
    } else if (rcExt === '.yml' || rcExt === '.yaml') {
      config = require('js-yaml').load(
        fs.readFileSync(rcPath, 'utf8')
      )
    } else {
      config = JSON.parse(
        fs.readFileSync(rcPath, 'utf-8')
      )
    }
  }

  if (config.require) config.require = [].concat(config.require)
  if (config.extension) config.extension = [].concat(config.extension)
  if (config.exclude) config.exclude = [].concat(config.exclude)
  if (config.include) config.include = [].concat(config.include)

  return config
}

// build a yargs object, omitting any settings
// that would cause the application to exit early.
Config.buildYargs = function (cwd) {
  cwd = guessCWD(cwd)
  return Yargs([])
    .usage('$0 [command] [options]')
    .usage('$0 [options] [bin-to-instrument]')
    .option('reporter', {
      alias: 'r',
      describe: 'coverage reporter(s) to use',
      default: 'text',
      global: false
    })
    .option('report-dir', {
      describe: 'directory to output coverage reports in',
      default: 'coverage',
      global: false
    })
    .option('silent', {
      alias: 's',
      default: false,
      type: 'boolean',
      describe: "don't output a report after tests finish running",
      global: false
    })
    .option('all', {
      alias: 'a',
      default: false,
      type: 'boolean',
      describe: 'whether or not to instrument all files of the project (not just the ones touched by your test suite)',
      global: false
    })
    .option('exclude', {
      alias: 'x',
      default: testExclude.defaultExclude,
      describe: 'a list of specific files and directories that should be excluded from coverage, glob patterns are supported, node_modules is always excluded',
      global: false
    })
    .option('exclude-after-remap', {
      default: true,
      type: 'boolean',
      description: 'should exclude logic be performed after the source-map remaps filenames?',
      global: false
    })
    .option('exclude-node-modules', {
      default: true,
      type: 'boolean',
      describe: 'whether or not to exclude all node_module folders (i.e. **/node_modules/**) by default',
      global: false
    })
    .option('include', {
      alias: 'n',
      default: [],
      describe: 'a list of specific files that should be covered, glob patterns are supported',
      global: false
    })
    .option('cwd', {
      describe: 'working directory used when resolving paths',
      default: cwd
    })
    .option('require', {
      alias: 'i',
      default: [],
      describe: 'a list of additional modules that nyc should attempt to require in its subprocess, e.g., @babel/register, @babel/polyfill',
      global: false
    })
    .option('eager', {
      default: false,
      type: 'boolean',
      describe: 'instantiate the instrumenter at startup (see https://git.io/vMKZ9)',
      global: false
    })
    .option('cache', {
      alias: 'c',
      default: true,
      type: 'boolean',
      describe: 'cache instrumentation results for improved performance',
      global: false
    })
    .option('cache-dir', {
      describe: 'explicitly set location for instrumentation cache',
      global: false
    })
    .option('babel-cache', {
      default: false,
      type: 'boolean',
      describe: 'cache babel transpilation results for improved performance',
      global: false
    })
    .option('es-modules', {
      default: true,
      type: 'boolean',
      describe: 'tell the instrumenter to treat files as ES Modules',
      global: false
    })
    .option('extension', {
      alias: 'e',
      default: [],
      describe: 'a list of extensions that nyc should handle in addition to .js',
      global: false
    })
    .option('check-coverage', {
      type: 'boolean',
      default: false,
      describe: 'check whether coverage is within thresholds provided',
      global: false
    })
    .option('branches', {
      default: 0,
      description: 'what % of branches must be covered?',
      global: false
    })
    .option('functions', {
      default: 0,
      description: 'what % of functions must be covered?',
      global: false
    })
    .option('lines', {
      default: 90,
      description: 'what % of lines must be covered?',
      global: false
    })
    .option('statements', {
      default: 0,
      description: 'what % of statements must be covered?',
      global: false
    })
    .option('source-map', {
      default: true,
      type: 'boolean',
      description: 'should nyc detect and handle source maps?',
      global: false
    })
    .option('per-file', {
      default: false,
      type: 'boolean',
      description: 'check thresholds per file',
      global: false
    })
    .option('produce-source-map', {
      default: false,
      type: 'boolean',
      description: "should nyc's instrumenter produce source maps?",
      global: false
    })
    .option('compact', {
      default: true,
      type: 'boolean',
      description: 'should the output be compacted?'
    })
    .option('preserve-comments', {
      default: true,
      type: 'boolean',
      description: 'should comments be preserved in the output?'
    })
    .option('instrument', {
      default: true,
      type: 'boolean',
      description: 'should nyc handle instrumentation?',
      global: false
    })
    .option('hook-require', {
      default: true,
      type: 'boolean',
      description: 'should nyc wrap require?',
      global: false
    })
    .option('hook-run-in-context', {
      default: false,
      type: 'boolean',
      description: 'should nyc wrap vm.runInContext?',
      global: false
    })
    .option('hook-run-in-this-context', {
      default: false,
      type: 'boolean',
      description: 'should nyc wrap vm.runInThisContext?',
      global: false
    })
    .option('show-process-tree', {
      describe: 'display the tree of spawned processes',
      default: false,
      type: 'boolean',
      global: false
    })
    .option('clean', {
      describe: 'should the .nyc_output folder be cleaned before executing tests',
      default: true,
      type: 'boolean',
      global: false
    })
    .option('nycrc-path', {
      default: '.nycrc',
      description: 'specify a different .nycrc path',
      global: false
    })
    .option('temp-dir', {
      alias: 't',
      describe: 'directory to output raw coverage information to',
      default: './.nyc_output',
      global: false
    })
    .option('temp-directory', {
      hidden: true,
      global: false
    })
    .option('skip-empty', {
      describe: 'don\'t show empty files (no lines of code) in report',
      default: false,
      type: 'boolean',
      global: false
    })
    .option('skip-full', {
      describe: 'don\'t show files with 100% statement, branch, and function coverage',
      default: false,
      type: 'boolean',
      global: false
    })
    .pkgConf('nyc', cwd)
    .example('$0 npm test', 'instrument your tests with coverage')
    .example('$0 --require @babel/register npm test', 'instrument your tests with coverage and transpile with Babel')
    .example('$0 report --reporter=text-lcov', 'output lcov report after running your tests')
    .epilog('visit https://git.io/vHysA for list of available reporters')
    .boolean('h')
    .boolean('version')
    .help(false)
    .version(false)
}

// we add operations that would make yargs
// exit post-hoc, allowing for a multi-pass
// parsing step.
Config.addCommandsAndHelp = function (yargs) {
  return yargs
    .help('h')
    .alias('h', 'help')
    .version()
    .command(require('../lib/commands/check-coverage'))
    .command(require('../lib/commands/instrument'))
    .command(require('../lib/commands/report'))
    .command(require('../lib/commands/merge'))
}

exports_istanbuljs_nyc_lib_config_util = Config



/*
file https://github.com/istanbuljs/nyc/blob/v14.1.1/lib/hash.js
*/
var exports_istanbuljs_nyc_lib_hash = {};
'use strict'

function getInvalidatingOptions (config) {
  return [
    'compact',
    'esModules',
    'ignoreClassMethods',
    'instrument',
    'instrumenter',
    'parserPlugins',
    'preserveComments',
    'produceSourceMap',
    'sourceMap'
  ].reduce((acc, optName) => {
    acc[optName] = config[optName]
    return acc
  }, {})
}

exports_istanbuljs_nyc_lib_hash = {
  salt (config) {
    return JSON.stringify({
      modules: {
        'istanbul-lib-instrument': require('istanbul-lib-instrument/package.json').version,
        // nyc: require('../package.json').version
      },
      nycrc: getInvalidatingOptions(config)
    })
  }
}



/*
file https://github.com/istanbuljs/nyc/blob/v14.1.1/lib/instrumenters/istanbul.js
*/
var exports_istanbuljs_nyc_lib_instrumenters_istanbul = {};
'use strict'

// const { createInstrumenter } = require('istanbul-lib-instrument')
// const convertSourceMap = require('convert-source-map')
// const mergeSourceMap = require('merge-source-map')

function InstrumenterIstanbul (options) {
  const { plugins } = options
  const configPlugins = plugins ? { plugins } : {}

  const instrumenter = createInstrumenter(Object.assign({
    autoWrap: true,
    coverageVariable: '__coverage__',
    embedSource: true,
    compact: options.compact,
    preserveComments: options.preserveComments,
    produceSourceMap: options.produceSourceMap,
    ignoreClassMethods: options.ignoreClassMethods,
    esModules: options.esModules
  }, configPlugins))

  return {
    instrumentSync (code, filename, sourceMap) {
      var instrumented = instrumenter.instrumentSync(code, filename)
      // the instrumenter can optionally produce source maps,
      // this is useful for features like remapping stack-traces.
      // TODO: test source-map merging logic.
      if (options.produceSourceMap) {
        var lastSourceMap = instrumenter.lastSourceMap()
        if (lastSourceMap) {
          if (sourceMap) {
            lastSourceMap = mergeSourceMap(
              sourceMap.toObject(),
              lastSourceMap
            )
          }
          instrumented += '\n' + convertSourceMap.fromObject(lastSourceMap).toComment()
        }
      }
      return instrumented
    },
    lastFileCoverage () {
      return instrumenter.lastFileCoverage()
    }
  }
}

exports_istanbuljs_nyc_lib_instrumenters_istanbul = InstrumenterIstanbul



/*
file https://github.com/istanbuljs/nyc/blob/v14.1.1/lib/instrumenters/noop.js
*/
var exports_istanbuljs_nyc_lib_instrumenters_noop = {};
// const { FileCoverage } = require('istanbul-lib-coverage').classes
// const { readInitialCoverage } = require('istanbul-lib-instrument')

function NOOP () {
  return {
    instrumentSync (code, filename) {
      const extracted = readInitialCoverage(code)
      if (extracted) {
        this.fileCoverage = new FileCoverage(extracted.coverageData)
      } else {
        this.fileCoverage = null
      }
      return code
    },
    lastFileCoverage () {
      return this.fileCoverage
    }
  }
}

exports_istanbuljs_nyc_lib_instrumenters_noop = NOOP



/*
file https://github.com/istanbuljs/nyc/blob/v14.1.1/lib/process.js
*/
var exports_istanbuljs_nyc_lib_process = {};
// const archy = require('archy')
// const libCoverage = require('istanbul-lib-coverage')
// const uuid = require('uuid/v4')

function ProcessInfo (defaults) {
  defaults = defaults || {}

  this.uuid = null
  this.parent = null
  this.pid = String(process.pid)
  this.argv = process.argv
  this.execArgv = process.execArgv
  this.cwd = process.cwd()
  this.time = Date.now()
  this.ppid = null
  this.root = null
  this.coverageFilename = null

  for (var key in defaults) {
    this[key] = defaults[key]
  }

  if (!this.uuid) {
    this.uuid = uuid()
  }
}

Object.defineProperty(ProcessInfo.prototype, 'label', {
  get: function () {
    if (this._label) {
      return this._label
    }

    var covInfo = ''
    if (this._coverageMap) {
      covInfo = '\n  ' + this._coverageMap.getCoverageSummary().lines.pct + ' % Lines'
    }
    return this.argv.join(' ') + covInfo
  }
})

ProcessInfo.buildProcessTree = function (infos) {
  const treeRoot = new ProcessInfo({ _label: 'nyc', nodes: [] })
  const index = infos.index
  for (const id in index.processes) {
    const node = infos[id]
    if (!node) {
      throw new Error(`Invalid entry in processinfo index: ${id}`)
    }
    const idx = index.processes[id]
    node.nodes = idx.children.map(id => infos[id]).sort((a, b) => a.time - b.time)
    if (!node.parent) {
      treeRoot.nodes.push(node)
    }
  }

  return treeRoot
}

ProcessInfo.prototype.getCoverageMap = function (merger) {
  if (this._coverageMap) {
    return this._coverageMap
  }

  var childMaps = this.nodes.map(function (child) {
    return child.getCoverageMap(merger)
  })

  this._coverageMap = merger([this.coverageFilename], childMaps)

  return this._coverageMap
}

ProcessInfo.prototype.render = function (nyc) {
  this.getCoverageMap(function (filenames, maps) {
    var map = libCoverage.createCoverageMap({})

    nyc.eachReport(filenames, function (report) {
      map.merge(report)
    })

    maps.forEach(function (otherMap) {
      map.merge(otherMap)
    })

    return map
  })

  return archy(this)
}

exports_istanbuljs_nyc_lib_process = ProcessInfo



/*
file https://github.com/istanbuljs/nyc/blob/v14.1.1/lib/process-args.js
*/
var exports_istanbuljs_nyc_lib_process_args = {};
// const parser = require('yargs-parser')
const commands = [
  'report',
  'check-coverage',
  'instrument',
  'merge'
]

exports_istanbuljs_nyc_lib_process_args = {
  // don't pass arguments that are meant
  // for nyc to the bin being instrumented.
  hideInstrumenterArgs: function (yargv) {
    var argv = process.argv.slice(1)
    argv = argv.slice(argv.indexOf(yargv._[0]))
    if (argv[0][0] === '-') {
      argv.unshift(process.execPath)
    }
    return argv
  },
  // don't pass arguments for the bin being
  // instrumented to nyc.
  hideInstrumenteeArgs: function () {
    var argv = process.argv.slice(2)
    var yargv = parser(argv)
    if (!yargv._.length) return argv
    for (var i = 0, command; (command = yargv._[i]) !== undefined; i++) {
      if (~commands.indexOf(command)) return argv
    }

    // drop all the arguments after the bin being
    // instrumented by nyc.
    argv = argv.slice(0, argv.indexOf(yargv._[0]))
    argv.push(yargv._[0])

    return argv
  }
}



/*
file https://github.com/istanbuljs/nyc/blob/v14.1.1/lib/source-maps.js
*/
var exports_istanbuljs_nyc_lib_source_maps = {};
// const convertSourceMap = require('convert-source-map')
// const libCoverage = require('istanbul-lib-coverage')
// const libSourceMaps = require('istanbul-lib-source-maps')
// const fs = require('fs')
// const path = require('path')

function SourceMaps (opts) {
  this.cache = opts.cache
  this.cacheDirectory = opts.cacheDirectory
  this.loadedMaps = {}
  this._sourceMapCache = libSourceMaps.createSourceMapStore()
}

SourceMaps.prototype.purgeCache = function () {
  this._sourceMapCache = libSourceMaps.createSourceMapStore()
  this.loadedMaps = {}
}

SourceMaps.prototype.extractAndRegister = function (code, filename, hash) {
  var sourceMap = convertSourceMap.fromSource(code) || convertSourceMap.fromMapFileSource(code, path.dirname(filename))
  if (sourceMap) {
    if (this.cache && hash) {
      var mapPath = path.join(this.cacheDirectory, hash + '.map')
      fs.writeFileSync(mapPath, sourceMap.toJSON())
    } else {
      this._sourceMapCache.registerMap(filename, sourceMap.sourcemap)
    }
  }
  return sourceMap
}

SourceMaps.prototype.remapCoverage = function (obj) {
  var transformed = this._sourceMapCache.transformCoverage(
    libCoverage.createCoverageMap(obj)
  )
  return transformed.map.data
}

SourceMaps.prototype.reloadCachedSourceMaps = function (report) {
  Object.keys(report).forEach((absFile) => {
    var fileReport = report[absFile]
    if (fileReport && fileReport.contentHash) {
      var hash = fileReport.contentHash
      if (!(hash in this.loadedMaps)) {
        try {
          var mapPath = path.join(this.cacheDirectory, hash + '.map')
          this.loadedMaps[hash] = JSON.parse(fs.readFileSync(mapPath, 'utf8'))
        } catch (e) {
          // set to false to avoid repeatedly trying to load the map
          this.loadedMaps[hash] = false
        }
      }
      if (this.loadedMaps[hash]) {
        this._sourceMapCache.registerMap(absFile, this.loadedMaps[hash])
      }
    }
  })
}

exports_istanbuljs_nyc_lib_source_maps = SourceMaps



/*
file https://github.com/istanbuljs/nyc/blob/v14.1.1/index.js
*/
var exports_istanbuljs_nyc___index = {};
'use strict'

/* global __coverage__ */

// const cachingTransform = require('caching-transform')
// const cpFile = require('cp-file')
// const findCacheDir = require('find-cache-dir')
// const fs = require('fs')
// const glob = require('glob')
const Hash = exports_istanbuljs_nyc___lib_hash
// const libCoverage = require('istanbul-lib-coverage')
// const libHook = require('istanbul-lib-hook')
// const libReport = require('istanbul-lib-report')
// const mkdirp = require('make-dir')
// const Module = require('module')
// const onExit = require('signal-exit')
// const path = require('path')
// const reports = require('istanbul-reports')
// const resolveFrom = require('resolve-from')
// const rimraf = require('rimraf')
const SourceMaps = exports_istanbuljs_nyc___lib_source_maps
// const testExclude = require('test-exclude')
// const util = require('util')
// const uuid = require('uuid/v4')

const debugLog = util.debuglog('nyc')

const ProcessInfo = exports_istanbuljs_nyc___lib_process

/* istanbul ignore next */
if (/self-coverage/.test(__dirname)) {
  require('../self-coverage-helper')
}

function coverageFinder () {
  var coverage = global.__coverage__
  if (typeof __coverage__ === 'object') coverage = __coverage__
  if (!coverage) coverage = global['__coverage__'] = {}
  return coverage
}

class NYC {
  constructor (config) {
    config = config || {}
    this.config = config

    this.subprocessBin = config.subprocessBin || path.resolve(__dirname, './bin/nyc.js')
    this._tempDirectory = config.tempDirectory || config.tempDir || './.nyc_output'
    this._instrumenterLib = require(config.instrumenter || './lib/instrumenters/istanbul')
    this._reportDir = config.reportDir || 'coverage'
    this._sourceMap = typeof config.sourceMap === 'boolean' ? config.sourceMap : true
    this._showProcessTree = config.showProcessTree || false
    this._eagerInstantiation = config.eager || false
    this.cwd = config.cwd || process.cwd()
    this.reporter = [].concat(config.reporter || 'text')

    this.cacheDirectory = (config.cacheDir && path.resolve(config.cacheDir)) || findCacheDir({ name: 'nyc', cwd: this.cwd })
    this.cache = Boolean(this.cacheDirectory && config.cache)

    this.extensions = [].concat(config.extension || [])
      .concat('.js')
      .map(ext => ext.toLowerCase())
      .filter((item, pos, arr) => arr.indexOf(item) === pos)

    this.exclude = testExclude({
      cwd: this.cwd,
      include: config.include,
      exclude: config.exclude,
      excludeNodeModules: config.excludeNodeModules !== false,
      extension: this.extensions
    })

    this.sourceMaps = new SourceMaps({
      cache: this.cache,
      cacheDirectory: this.cacheDirectory
    })

    // require extensions can be provided as config in package.json.
    this.require = [].concat(config.require || [])

    this.transforms = this.extensions.reduce((transforms, ext) => {
      transforms[ext] = this._createTransform(ext)
      return transforms
    }, {})

    this.hookRequire = config.hookRequire
    this.hookRunInContext = config.hookRunInContext
    this.hookRunInThisContext = config.hookRunInThisContext
    this.fakeRequire = null

    this.processInfo = new ProcessInfo(config && config._processInfo)
    this.rootId = this.processInfo.root || uuid()

    this.hashCache = {}
  }

  _createTransform (ext) {
    var opts = {
      salt: Hash.salt(this.config),
      hashData: (input, metadata) => [metadata.filename],
      onHash: (input, metadata, hash) => {
        this.hashCache[metadata.filename] = hash
      },
      cacheDir: this.cacheDirectory,
      // when running --all we should not load source-file from
      // cache, we want to instead return the fake source.
      disableCache: this._disableCachingTransform(),
      ext: ext
    }
    if (this._eagerInstantiation) {
      opts.transform = this._transformFactory(this.cacheDirectory)
    } else {
      opts.factory = this._transformFactory.bind(this)
    }
    return cachingTransform(opts)
  }

  _disableCachingTransform () {
    return !(this.cache && this.config.isChildProcess)
  }

  _loadAdditionalModules () {
    this.require.forEach(requireModule => {
      // Attempt to require the module relative to the directory being instrumented.
      // Then try other locations, e.g. the nyc node_modules folder.
      require(resolveFrom.silent(this.cwd, requireModule) || requireModule)
    })
  }

  instrumenter () {
    return this._instrumenter || (this._instrumenter = this._createInstrumenter())
  }

  _createInstrumenter () {
    return this._instrumenterLib({
      ignoreClassMethods: [].concat(this.config.ignoreClassMethod).filter(a => a),
      produceSourceMap: this.config.produceSourceMap,
      compact: this.config.compact,
      preserveComments: this.config.preserveComments,
      esModules: this.config.esModules,
      plugins: this.config.parserPlugins
    })
  }

  addFile (filename) {
    const source = this._readTranspiledSource(filename)
    this._maybeInstrumentSource(source, filename)
  }

  _readTranspiledSource (filePath) {
    var source = null
    var ext = path.extname(filePath)
    if (typeof Module._extensions[ext] === 'undefined') {
      ext = '.js'
    }
    Module._extensions[ext]({
      _compile: function (content, filename) {
        source = content
      }
    }, filePath)
    return source
  }

  addAllFiles () {
    this._loadAdditionalModules()

    this.fakeRequire = true
    this.exclude.globSync(this.cwd).forEach(relFile => {
      const filename = path.resolve(this.cwd, relFile)
      this.addFile(filename)
      const coverage = coverageFinder()
      const lastCoverage = this.instrumenter().lastFileCoverage()
      if (lastCoverage) {
        coverage[lastCoverage.path] = lastCoverage
      }
    })
    this.fakeRequire = false

    this.writeCoverageFile()
  }

  instrumentAllFiles (input, output, cb) {
    let inputDir = '.' + path.sep
    const visitor = relFile => {
      const inFile = path.resolve(inputDir, relFile)
      const inCode = fs.readFileSync(inFile, 'utf-8')
      const outCode = this._transform(inCode, inFile) || inCode

      if (output) {
        const mode = fs.statSync(inFile).mode
        const outFile = path.resolve(output, relFile)
        mkdirp.sync(path.dirname(outFile))
        fs.writeFileSync(outFile, outCode)
        fs.chmodSync(outFile, mode)
      } else {
        console.log(outCode)
      }
    }

    this._loadAdditionalModules()

    try {
      const stats = fs.lstatSync(input)
      if (stats.isDirectory()) {
        inputDir = input

        const filesToInstrument = this.exclude.globSync(input)

        if (this.config.completeCopy && output) {
          const globOptions = { dot: true, nodir: true, ignore: ['**/.git', '**/.git/**', path.join(output, '**')] }
          glob.sync(path.resolve(input, '**'), globOptions)
            .forEach(src => cpFile.sync(src, path.join(output, path.relative(input, src))))
        }
        filesToInstrument.forEach(visitor)
      } else {
        visitor(input)
      }
    } catch (err) {
      return cb(err)
    }
    cb()
  }

  _transform (code, filename) {
    const extname = path.extname(filename).toLowerCase()
    const transform = this.transforms[extname] || (() => null)

    return transform(code, { filename })
  }

  _maybeInstrumentSource (code, filename) {
    if (!this.exclude.shouldInstrument(filename)) {
      return null
    }

    return this._transform(code, filename)
  }

  maybePurgeSourceMapCache () {
    if (!this.cache) {
      this.sourceMaps.purgeCache()
    }
  }

  _transformFactory (cacheDir) {
    const instrumenter = this.instrumenter()
    let instrumented

    return (code, metadata, hash) => {
      const filename = metadata.filename
      let sourceMap = null

      if (this._sourceMap) sourceMap = this.sourceMaps.extractAndRegister(code, filename, hash)

      try {
        instrumented = instrumenter.instrumentSync(code, filename, sourceMap)
      } catch (e) {
        debugLog('failed to instrument ' + filename + ' with error: ' + e.stack)
        if (this.config.exitOnError) {
          console.error('Failed to instrument ' + filename)
          process.exit(1)
        } else {
          instrumented = code
        }
      }

      if (this.fakeRequire) {
        return 'function x () {}'
      } else {
        return instrumented
      }
    }
  }

  _handleJs (code, options) {
    // ensure the path has correct casing (see istanbuljs/nyc#269 and nodejs/node#6624)
    const filename = path.resolve(this.cwd, options.filename)
    return this._maybeInstrumentSource(code, filename) || code
  }

  _addHook (type) {
    const handleJs = this._handleJs.bind(this)
    const dummyMatcher = () => true // we do all processing in transformer
    libHook['hook' + type](dummyMatcher, handleJs, { extensions: this.extensions })
  }

  _addRequireHooks () {
    if (this.hookRequire) {
      this._addHook('Require')
    }
    if (this.hookRunInContext) {
      this._addHook('RunInContext')
    }
    if (this.hookRunInThisContext) {
      this._addHook('RunInThisContext')
    }
  }

  cleanup () {
    if (!process.env.NYC_CWD) rimraf.sync(this.tempDirectory())
  }

  clearCache () {
    if (this.cache) {
      rimraf.sync(this.cacheDirectory)
    }
  }

  createTempDirectory () {
    mkdirp.sync(this.tempDirectory())
    if (this.cache) mkdirp.sync(this.cacheDirectory)

    mkdirp.sync(this.processInfoDirectory())
  }

  reset () {
    this.cleanup()
    this.createTempDirectory()
  }

  _wrapExit () {
    // we always want to write coverage
    // regardless of how the process exits.
    onExit(() => {
      this.writeCoverageFile()
    }, { alwaysLast: true })
  }

  wrap (bin) {
    process.env.NYC_PROCESS_ID = this.processInfo.uuid
    this._addRequireHooks()
    this._wrapExit()
    this._loadAdditionalModules()
    return this
  }

  writeCoverageFile () {
    var coverage = coverageFinder()
    if (!coverage) return

    // Remove any files that should be excluded but snuck into the coverage
    Object.keys(coverage).forEach(function (absFile) {
      if (!this.exclude.shouldInstrument(absFile)) {
        delete coverage[absFile]
      }
    }, this)

    if (this.cache) {
      Object.keys(coverage).forEach(function (absFile) {
        if (this.hashCache[absFile] && coverage[absFile]) {
          coverage[absFile].contentHash = this.hashCache[absFile]
        }
      }, this)
    } else {
      coverage = this.sourceMaps.remapCoverage(coverage)
    }

    var id = this.processInfo.uuid
    var coverageFilename = path.resolve(this.tempDirectory(), id + '.json')

    fs.writeFileSync(
      coverageFilename,
      JSON.stringify(coverage),
      'utf-8'
    )

    this.processInfo.coverageFilename = coverageFilename
    this.processInfo.files = Object.keys(coverage)

    fs.writeFileSync(
      path.resolve(this.processInfoDirectory(), id + '.json'),
      JSON.stringify(this.processInfo),
      'utf-8'
    )
  }

  getCoverageMapFromAllCoverageFiles (baseDirectory) {
    const map = libCoverage.createCoverageMap({})

    this.eachReport(undefined, (report) => {
      map.merge(report)
    }, baseDirectory)

    map.data = this.sourceMaps.remapCoverage(map.data)

    // depending on whether source-code is pre-instrumented
    // or instrumented using a JIT plugin like @babel/require
    // you may opt to exclude files after applying
    // source-map remapping logic.
    if (this.config.excludeAfterRemap) {
      map.filter(filename => this.exclude.shouldInstrument(filename))
    }

    return map
  }

  report () {
    var tree
    var map = this.getCoverageMapFromAllCoverageFiles()
    var context = libReport.createContext({
      dir: this.reportDirectory(),
      watermarks: this.config.watermarks
    })

    tree = libReport.summarizers.pkg(map)

    this.reporter.forEach((_reporter) => {
      tree.visit(reports.create(_reporter, {
        skipEmpty: this.config.skipEmpty,
        skipFull: this.config.skipFull
      }), context)
    })

    if (this._showProcessTree) {
      this.showProcessTree()
    }
  }

  // XXX(@isaacs) Index generation should move to istanbul-lib-processinfo
  writeProcessIndex () {
    const dir = this.processInfoDirectory()
    const pidToUid = new Map()
    const infoByUid = new Map()
    const eidToUid = new Map()
    const infos = fs.readdirSync(dir).filter(f => f !== 'index.json').map(f => {
      try {
        const info = JSON.parse(fs.readFileSync(path.resolve(dir, f), 'utf-8'))
        info.children = []
        pidToUid.set(info.uuid, info.pid)
        pidToUid.set(info.pid, info.uuid)
        infoByUid.set(info.uuid, info)
        if (info.externalId) {
          eidToUid.set(info.externalId, info.uuid)
        }
        return info
      } catch (er) {
        return null
      }
    }).filter(Boolean)

    // create all the parent-child links and write back the updated info
    infos.forEach(info => {
      if (info.parent) {
        const parentInfo = infoByUid.get(info.parent)
        if (parentInfo && !parentInfo.children.includes(info.uuid)) {
          parentInfo.children.push(info.uuid)
        }
      }
    })

    // figure out which files were touched by each process.
    const files = infos.reduce((files, info) => {
      info.files.forEach(f => {
        files[f] = files[f] || []
        files[f].push(info.uuid)
      })
      return files
    }, {})

    // build the actual index!
    const index = infos.reduce((index, info) => {
      index.processes[info.uuid] = {}
      index.processes[info.uuid].parent = info.parent
      if (info.externalId) {
        if (index.externalIds[info.externalId]) {
          throw new Error(`External ID ${info.externalId} used by multiple processes`)
        }
        index.processes[info.uuid].externalId = info.externalId
        index.externalIds[info.externalId] = {
          root: info.uuid,
          children: info.children
        }
      }
      index.processes[info.uuid].children = Array.from(info.children)
      return index
    }, { processes: {}, files: files, externalIds: {} })

    // flatten the descendant sets of all the externalId procs
    Object.keys(index.externalIds).forEach(eid => {
      const { children } = index.externalIds[eid]
      // push the next generation onto the list so we accumulate them all
      for (let i = 0; i < children.length; i++) {
        const nextGen = index.processes[children[i]].children
        if (nextGen && nextGen.length) {
          children.push(...nextGen.filter(uuid => children.indexOf(uuid) === -1))
        }
      }
    })

    fs.writeFileSync(path.resolve(dir, 'index.json'), JSON.stringify(index))
  }

  showProcessTree () {
    var processTree = ProcessInfo.buildProcessTree(this._loadProcessInfos())

    console.log(processTree.render(this))
  }

  checkCoverage (thresholds, perFile) {
    var map = this.getCoverageMapFromAllCoverageFiles()
    var nyc = this

    if (perFile) {
      map.files().forEach(function (file) {
        // ERROR: Coverage for lines (90.12%) does not meet threshold (120%) for index.js
        nyc._checkCoverage(map.fileCoverageFor(file).toSummary(), thresholds, file)
      })
    } else {
      // ERROR: Coverage for lines (90.12%) does not meet global threshold (120%)
      nyc._checkCoverage(map.getCoverageSummary(), thresholds)
    }
  }

  _checkCoverage (summary, thresholds, file) {
    Object.keys(thresholds).forEach(function (key) {
      var coverage = summary[key].pct
      if (coverage < thresholds[key]) {
        process.exitCode = 1
        if (file) {
          console.error('ERROR: Coverage for ' + key + ' (' + coverage + '%) does not meet threshold (' + thresholds[key] + '%) for ' + file)
        } else {
          console.error('ERROR: Coverage for ' + key + ' (' + coverage + '%) does not meet global threshold (' + thresholds[key] + '%)')
        }
      }
    })
  }

  _loadProcessInfos () {
    return fs.readdirSync(this.processInfoDirectory()).map(f => {
      let data
      try {
        data = JSON.parse(fs.readFileSync(
          path.resolve(this.processInfoDirectory(), f),
          'utf-8'
        ))
      } catch (e) { // handle corrupt JSON output.
        return null
      }
      if (f !== 'index.json') {
        data.nodes = []
        data = new ProcessInfo(data)
      }
      return { file: path.basename(f, '.json'), data: data }
    }).filter(Boolean).reduce((infos, info) => {
      infos[info.file] = info.data
      return infos
    }, {})
  }

  eachReport (filenames, iterator, baseDirectory) {
    baseDirectory = baseDirectory || this.tempDirectory()

    if (typeof filenames === 'function') {
      iterator = filenames
      filenames = undefined
    }

    var _this = this
    var files = filenames || fs.readdirSync(baseDirectory)

    files.forEach(function (f) {
      var report
      try {
        report = JSON.parse(fs.readFileSync(
          path.resolve(baseDirectory, f),
          'utf-8'
        ))

        _this.sourceMaps.reloadCachedSourceMaps(report)
      } catch (e) { // handle corrupt JSON output.
        report = {}
      }

      iterator(report)
    })
  }

  loadReports (filenames) {
    var reports = []

    this.eachReport(filenames, (report) => {
      reports.push(report)
    })

    return reports
  }

  tempDirectory () {
    return path.resolve(this.cwd, this._tempDirectory)
  }

  reportDirectory () {
    return path.resolve(this.cwd, this._reportDir)
  }

  processInfoDirectory () {
    return path.resolve(this.tempDirectory(), 'processinfo')
  }
}

exports_istanbuljs_nyc___index = NYC



/*
file https://github.com/istanbuljs/nyc/blob/v14.1.1/bin/wrap.js
*/
var exports_istanbuljs_nyc_bin_wrap = {};
// var sw = require('spawn-wrap')
// var NYC = require('../index.js')

var config = {}
if (process.env.NYC_CONFIG) config = JSON.parse(process.env.NYC_CONFIG)
config.isChildProcess = true

config._processInfo = {
  pid: process.pid,
  ppid: process.ppid,
  parent: process.env.NYC_PROCESS_ID || null,
  root: process.env.NYC_ROOT_ID
}
if (process.env.NYC_PROCESSINFO_EXTERNAL_ID) {
  config._processInfo.externalId = process.env.NYC_PROCESSINFO_EXTERNAL_ID
  delete process.env.NYC_PROCESSINFO_EXTERNAL_ID
}

if (process.env.NYC_CONFIG_OVERRIDE) {
  var override = JSON.parse(process.env.NYC_CONFIG_OVERRIDE)
  config = Object.assign(config, override)
  process.env.NYC_CONFIG = JSON.stringify(config)
}

;(new NYC(config)).wrap()

sw.runMain()



/*
file https://github.com/istanbuljs/nyc/blob/v14.1.1/bin/nyc.js
*/
var exports_istanbuljs_nyc_bin_nyc = {};
// #!/usr/bin/env node

// const configUtil = require('../lib/config-util')
// const foreground = require('foreground-child')
// const NYC = require('../index.js')
// const processArgs = require('../lib/process-args')

// const sw = require('spawn-wrap')
const wrapper = require.resolve('./wrap.js')

// parse configuration and command-line arguments;
// we keep these values in a few different forms,
// used in the various execution contexts of nyc:
// reporting, instrumenting subprocesses, etc.
const yargs = configUtil.buildYargs()
const instrumenterArgs = processArgs.hideInstrumenteeArgs()
const config = configUtil.loadConfig(yargs.parse(instrumenterArgs))
configUtil.addCommandsAndHelp(yargs)
const argv = yargs.config(config).parse(instrumenterArgs)

if ([
  'check-coverage', 'report', 'instrument', 'merge'
].indexOf(argv._[0]) !== -1) {
  // look in lib/commands for logic.
} else if (argv._.length) {
  // if instrument is set to false,
  // enable a noop instrumenter.
  if (!argv.instrument) argv.instrumenter = './lib/instrumenters/noop'
  else argv.instrumenter = './lib/instrumenters/istanbul'

  var nyc = (new NYC(argv))
  if (argv.clean) {
    nyc.reset()
  } else {
    nyc.createTempDirectory()
  }
  if (argv.all) nyc.addAllFiles()

  var env = {
    // Support running nyc as a user without HOME (e.g. linux 'nobody'),
    // https://github.com/istanbuljs/nyc/issues/951
    SPAWN_WRAP_SHIM_ROOT: process.env.SPAWN_WRAP_SHIM_ROOT || process.env.XDG_CACHE_HOME || require('os').homedir(),
    NYC_CONFIG: JSON.stringify(argv),
    NYC_CWD: process.cwd(),
    NYC_ROOT_ID: nyc.rootId,
    NYC_INSTRUMENTER: argv.instrumenter
  }

  if (argv['babel-cache'] === false) {
    // babel's cache interferes with some configurations, so is
    // disabled by default. opt in by setting babel-cache=true.
    env.BABEL_DISABLE_CACHE = process.env.BABEL_DISABLE_CACHE = '1'
  }

  sw([wrapper], env)

  // Both running the test script invocation and the check-coverage run may
  // set process.exitCode. Keep track so that both children are run, but
  // a non-zero exit codes in either one leads to an overall non-zero exit code.
  process.exitCode = 0
  foreground(processArgs.hideInstrumenterArgs(
    // use the same argv descrption, but don't exit
    // for flags like --help.
    configUtil.buildYargs().parse(process.argv.slice(2))
  ), function (done) {
    var mainChildExitCode = process.exitCode

    nyc.writeProcessIndex()

    nyc.maybePurgeSourceMapCache()
    if (argv.checkCoverage) {
      nyc.checkCoverage({
        lines: argv.lines,
        functions: argv.functions,
        branches: argv.branches,
        statements: argv.statements
      }, argv['per-file'])
      process.exitCode = process.exitCode || mainChildExitCode
    }

    if (!argv.silent) {
      nyc.report()
    }

    return done()
  })
} else {
  // I don't have a clue what you're doing.
  process.exitCode = 1
  yargs.showHelp()
}
}(globalThis.globalLocal));
/* jslint ignore:end */
