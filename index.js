'use strict'

module.exports = {
  cssLoader: function (content, map, meta) {
    function someSyncOperation() {

    }

    // this.callback(null, someSyncOperation(content), map, meta)

    return someSyncOperation
  }
}
