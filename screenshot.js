/* jslint utility2:true */
(async function () {
    "use strict";
    const puppeteer = require("./lib.puppeteer.js");
    const browser = await puppeteer.launch({
        args: [
            "--no-sandbox", "--disable-setuid-sandbox"
        ]
    });
    const page = await browser.newPage();
    await page.goto("https://www.example.com");
    await page.screenshot({
        path: "screenshot.png"
    });
    await browser.close();
}());
