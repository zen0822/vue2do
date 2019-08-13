'use strict'

require('./src/lib/directive/directive.js')
require('./src/scss/transition.scss')
require('./src/scss/common/main.scss')
require('./src/scss/util.scss')
require('./src/scss/grid.scss')

module.exports = {
  cssLoader: function (content, map, meta) {
    function someSyncOperation() {

    }

    // this.callback(null, someSyncOperation(content), map, meta)

    return someSyncOperation
  }
}
