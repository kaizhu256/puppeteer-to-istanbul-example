/* jslint utility2:true */

(async function () {
"use strict";
//!! // hack-puppeteer - module.exports
//!! const EventEmitter = require("events");
//!! const URL = require("url");
//!! const child_process = require("child_process");
//!! const crypto = require("crypto");
//!! const fs = require("fs");
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



//!! var chromeProcess;
//!! var temporaryUserDataDir;
//!! temporaryUserDataDir = await new Promise(function (resolve, reject) {
    //!! fs.mkdtemp(path.join(
        //!! os.tmpdir(),
        //!! "puppeteer_dev_profile-"
    //!! ), function (err, data) {
        //!! if (err) {
            //!! reject(err);
            //!! return;
        //!! }
        //!! resolve(data);
    //!! });
//!! });
//!! chromeProcess = child_process.spawn((
    //!! "node_modules/puppeteer/.local-chromium"
    //!! + "/linux-674921/chrome-linux/chrome"
//!! ), [
    //!! "--disable-setuid-sandbox",
    //!! "--headless",
    //!! "--hide-scrollbars",
    //!! "--incognito",
    //!! "--mute-audio",
    //!! "--no-sandbox",
    //!! "--remote-debugging-port=0",
    //!! `--user-data-dir=${temporaryUserDataDir}`
//!! ], {
    //!! // On non-windows platforms, `detached: false` makes child process
    //!! // a leader of a new process group, making it possible
    //!! // to kill child process tree with `.kill(-pid)` command.
    //!! // https://nodejs.org/api/child_process.html#child_process_options_detached
    //!! detached: process.platform !== "win32",
    //!! env: process.env,
    //!! stdio: ["pipe", "pipe", "pipe"]
//!! });
//!! // dumpio
//!! chromeProcess.stderr.pipe(process.stderr);
//!! chromeProcess.stdout.pipe(process.stdout);

//!! let chromeClosed = false;
//!! const waitForChromeToClose = new Promise(function (fulfill, reject) {
    //!! chromeProcess.once("exit", function () {
        //!! chromeClosed = true;
        //!! // Cleanup as processes exit.
        //!! if (temporaryUserDataDir) {
            //!! child_process.spawnSync("rm", [
                //!! "-fr", temporaryUserDataDir
            //!! ], {
                //!! stdio: [
                    //!! "ignore", 1, 2
                //!! ]
            //!! });
        //!! }
        //!! fulfill();
    //!! });
//!! });

//!! function killChrome130() {
    //!! killChrome();
    //!! process.exit(130);
//!! }
//!! process.addListener("exit", killChrome);
//!! process.addListener("SIGINT", killChrome130);
//!! process.addListener("SIGTERM", gracefullyCloseChrome);
//!! process.addListener("SIGHUP", gracefullyCloseChrome);
//!! function removeListeners() {
    //!! process.removeListener("exit", killChrome);
    //!! process.removeListener("SIGINT", killChrome130);
    //!! process.removeListener("SIGTERM", gracefullyCloseChrome);
    //!! process.removeListener("SIGHUP", gracefullyCloseChrome);
//!! }
//!! /** @type {?Connection} */
//!! let connection = null;
//!! try {
    //!! const browserWSEndpoint = await module.exports.waitForWSEndpoint(chromeProcess, 30000, 674921);
    //!! const transport = await module.exports.WebSocketTransport.create(browserWSEndpoint);
    //!! connection = new module.exports.Connection(browserWSEndpoint, transport, 0);
    //!! const browser = await module.exports.Browser.create(connection, [], false, {width: 800, height: 600}, chromeProcess, gracefullyCloseChrome);
    //!! await browser.waitForTarget(t => t.type() === "page");
    //!! return browser;
//!! } catch (e) {
    //!! killChrome();
    //!! throw e;
//!! }

//!! /**
  //!! * @return {Promise}
  //!! */
//!! function gracefullyCloseChrome() {
    //!! removeListeners();
    //!! if (temporaryUserDataDir) {
        //!! killChrome();
    //!! } else if (connection) {
        //!! // Attempt to close chrome gracefully
        //!! connection.send("Browser.close").catch(error => {
            //!! debugError(error);
            //!! killChrome();
        //!! });
    //!! }
    //!! return waitForChromeToClose;
//!! }

//!! // This method has to be sync to be used as 'exit' event handler.
//!! function killChrome() {
    //!! removeListeners();
    //!! if (chromeProcess.pid && !chromeProcess.killed && !chromeClosed) {
        //!! // Force kill chrome.
        //!! try {
            //!! if (process.platform === "win32") {
                //!! child_process.execSync(
                    //!! `taskkill /pid ${chromeProcess.pid} /T /F`
                //!! );
            //!! }
            //!! else {
                //!! process.kill(-chromeProcess.pid, "SIGKILL");
            //!! }
        //!! // the process might have already stopped
        //!! } catch (ignore) {}
    //!! }
    //!! // Attempt to remove temporary profile directory to avoid littering.
    //!! child_process.spawnSync("rm", [
        //!! "-fr", temporaryUserDataDir
    //!! ], {
        //!! stdio: [
            //!! "ignore", 1, 2
        //!! ]
    //!! });
//!! }

var browser = await new module.exports.Launcher().launch();

var page = await browser.newPage();
await page.goto("https://www.example.com");
await page.screenshot({
    path: "tmp/aa.png"
});
await browser.close();
}());
