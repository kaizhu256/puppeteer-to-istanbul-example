/* jslint utility2:true */

(async function (local) {
"use strict";
//!! // hack-puppeteer - module.exports
//!! const EventEmitter = require("events");
//!! const URL = require("url");
const child_process = require("child_process");
//!! const crypto = require("crypto");
const fs = require("fs");
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

local = {};

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

local.killChrome130 = function () {
    local.killChrome();
    process.exit(130);
};

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
    //!! `--user-data-dir=${temporaryUserDataDir}`
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
fs.writeFileSync("tmp/aa.html", await page.content());
await browser.close();
}());
