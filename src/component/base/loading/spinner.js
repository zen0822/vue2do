const commonCompUtil = require('src/common/utils/commonComp')

module.exports = {
  show(cb) {
    if (!commonCompUtil.alive()) {
      return false
    }

    return COMMON.router.app.$refs.commonComponent.$refs
      .loading
      .show(cb);
  },
  hide() {
    if (!commonCompUtil.alive()) {
      return false
    }

    return COMMON.router.app.$refs.commonComponent.$refs
      .loading
      .hide();
  }
}
