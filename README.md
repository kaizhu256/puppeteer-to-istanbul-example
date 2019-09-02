# Puppeteer to Istanbul Example

Example of using [puppeteer-to-istanbul](https://github.com/istanbuljs/puppeteer-to-istanbul)
to output puppeteer format coverage output in Istanbul format.

## Files

* `index.html`: an HTML file containing inline JavaScript.
* `index.js`: a script that executes `index.html` with coverage enabled.

## Usage

`npm run coverage`

This will:

1. run JavaScript in puppeteer with coverage enabled.
2. output to disk in Istanbul format.
3. run reports with [nyc](https://github.com/istanbuljs/nyc).
4. open `coverage/index.html`, displaying the coverage information collected.

## changelog
- 2019.8.30
- inline dependency https://github.com/istanbuljs/nyc/tree/v14.1.1
- inline dependency https://github.com/istanbuljs/istanbuljs/tree/istanbul-reports@2.2.5
- inline dependency https://github.com/istanbuljs/puppeteer-to-istanbul/tree/v1.2.2
- inline dependency https://github.com/istanbuljs/v8-to-istanbul/tree/v3.2.3
- add reference coverage.00 of youtube
- add file raw.istanbuljs.js
- remove dependency https://github.com/STRML/async-limiter
