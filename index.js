'use strict'

require('./src/lib/directive/directive.js')
require('./src/scss/transition.scss')
require('./src/scss/common/main.scss')
require('./src/scss/util.scss')
require('./src/scss/grid.scss')

module.exports = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  cssLoader: function (_content, _map, _meta) {
    function someSyncOperation() {
      // TODO
    }

    // this.callback(null, someSyncOperation(content), map, meta)

    return someSyncOperation
  }
}
