const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = function ({
  config
} = {}) {
  return {
    entryHub(path) {
      const fs = require('fs')

      return fs.readdirSync(path).map((item) => {
        return item.replace('.js', '')
      })
    },

    assetsPath(_path) {
      const staticDir = process.env.NODE_ENV === 'production' ?
        config.build.staticDir :
        config.dev.staticDir

      return path.posix.join(staticDir, _path)
    },

    cssLoaders(options) {
      options = options || {}

      function generateLoaders(loaders) {
        const sourceLoader = loaders.map(function (loader) {
          let extraParamChar

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
    }
  }
}
