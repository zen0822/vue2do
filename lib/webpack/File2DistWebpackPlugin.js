const path = require('path')
const fs = require('fs')

class File2DistWebpackPlugin {
  constructor(options) {
    this.options = options
  }

  apply(compiler) {
    const {
      dir: releaseDir
    } = this.options

    compiler.hooks.emit.tap('File2DistWebpackPlugin', (compilation) => {
      const assets = compilation.assets
      let file, data

      Object.keys(assets).forEach((key) => {
        if (key === 'sw.js') {
          file = path.resolve(releaseDir, key)
          data = assets[key].source()
          fs.writeFileSync(file, data)
        }
      })
    })
  }
}

module.exports = File2DistWebpackPlugin
