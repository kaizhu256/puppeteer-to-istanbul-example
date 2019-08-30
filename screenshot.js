/* jslint utility2:true */
(async function () {
    "use strict";
    // require modules
    var fs = require("fs");
    var puppeteer = require("./lib.screenshot.js");

    var browser = await puppeteer.launch({
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
        executablePath: (
            "node_modules/puppeteer/.local-chromium"
            + "/linux-674921/chrome-linux/chrome"
        )
    });
    const page = await browser.newPage();
    // browser - wait 2000 ms
    await new Promise(function (resolve) {
        setTimeout(resolve, 5000);
    });
    await page.goto("https://m.youtube.com");
    // browser - screenshot png
    await page.screenshot({
        path: "tmp/aa.png"
    });
    // browser - screenshot html
    fs.writeFileSync("tmp/aa.html", await page.content());
    await browser.close();
}());
