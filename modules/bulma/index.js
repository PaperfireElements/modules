const path = require('path')

module.exports = function nuxtFontAwesome(options) {
  // Add CSS
  this.options.css.push('bulma/css/bulma.css')
}

module.exports.meta = require('./package.json')
