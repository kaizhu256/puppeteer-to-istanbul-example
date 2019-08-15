const path = require('path')
const pti = require('puppeteer-to-istanbul')

;(async () => {
  const puppeteer = require('puppeteer')
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
