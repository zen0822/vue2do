const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = function (opt = {}) {
  const config = require('./config')({
    appName: opt.appName
  })

  return {
    entryHub(path) {
      const fs = require('fs')

      return fs.readdirSync(path).map((item) => {
        return item.replace('.js', '')
      })
    },

    assetsPath(_path) {
      var assetSubDirectory = process.env.NODE_ENV === 'production' ?
        config.prod.assetSubDirectory :
        config.dev.assetSubDirectory

      return path.posix.join(assetSubDirectory, _path)
    },

    cssLoaders(options) {
      options = options || {}

      function generateLoaders(loaders) {
        var sourceLoader = loaders.map(function (loader) {
          var extraParamChar
          if (/\?/.test(loader)) {
            loader = loader.replace(/\?/, '-loader?')
            extraParamChar = '&'
          } else {
            loader = loader + '-loader'
            extraParamChar = '?'
          }
          return loader + (options.sourceMap ? extraParamChar + 'sourceMap' : '')
        }).join('!')

        if (options.extract) {
          return ExtractTextPlugin.extract('vue-style-loader', sourceLoader)
        } else {
          return ['vue-style-loader', sourceLoader].join('!')
        }
      }

      return {
        css: generateLoaders(['css']),
        postcss: generateLoaders(['css']),
        less: generateLoaders(['css', 'less']),
        sass: generateLoaders(['css', 'sass?indentedSyntax']),
        scss: generateLoaders(['css', 'sass']),
        stylus: generateLoaders(['css', 'stylus']),
        styl: generateLoaders(['css', 'stylus'])
      }
    },

    styleLoaders(options) {
      var output = []
      var loaders = exports.cssLoaders(options)
      for (var extension in loaders) {
        var loader = loaders[extension]
        output.push({
          test: new RegExp('\\.' + extension + '$'),
          loader: loader
        })
      }
      return output
    }
  }
}
