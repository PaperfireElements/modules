const chalk = require('chalk')
const path = require('path')
const { URL } = require('whatwg-url')

const port = process.env.PORT || process.env.npm_package_config_nuxt_port || 3000
const host = process.env.HOST || process.env.npm_package_config_nuxt_host || 'localhost'

module.exports = function nuxtAxios (moduleOptions) {
  // Apply defaults
  const options = Object.assign({
    baseURL: `http://${host}:${port}/api`,
    browserBaseURL: null,
    credentials: true,
    proxyHeaders: true
  }, this.options.axios, moduleOptions)

  if (process.env.API_URL) {
    options.baseURL = process.env.API_URL
  }

  if (process.env.API_URL_BROWSER) {
    options.browserBaseURL = process.env.API_URL_BROWSER
  }

  if (!options.browserBaseURL) {
    const url = new URL(options.baseURL)
    const sameHost = url.host === `${host}:${port}`
    options.browserBaseURL = sameHost ? url.pathname : options.url
  }

  // Register plugin
  this.addPlugin({
    src: path.resolve(__dirname, 'plugin.js'),
    options
  })

  /* eslint-disable no-console */
  console.log(`[AXIOS] Base URL: ${chalk.green(options.baseURL)} , Browser: ${chalk.green(options.browserBaseURL)}`)
}

module.exports.meta = require('./package.json')
