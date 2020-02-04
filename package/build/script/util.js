const path = require('path')

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
    }
  }
}
