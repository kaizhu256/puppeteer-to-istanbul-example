/* jslint utility2:true */

(async function () {
    "use strict";
    module.exports = require("./.a00.js");
    var aa = new module.exports.Launcher(__dirname, 674921, false);
    var browser = await aa.launch();
    var page = await browser.newPage();
    await page.goto("https://www.example.com");
    await page.screenshot({
        path: "tmp/aa.png"
    });
    await browser.close();
}());
