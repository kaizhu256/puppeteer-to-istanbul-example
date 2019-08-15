// require builtin
const child_process = require('child_process')
const fs = require('fs')
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
require v8-to-istanbul/index.js
*/
const Script = require('v8-to-istanbul/lib/script')

const v8toIstanbul = function (path) {
  return new Script(path)
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
require puppeteer-to-istanbul
*/
const pti = {
  write: (puppeteerFormat) => {
    const pti = PuppeteerToIstanbul(puppeteerFormat)
    pti.writeIstanbulFormat()
  }
};

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
