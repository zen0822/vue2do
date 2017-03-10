/**
 * tip 组件
 */

const Vue = require('vue');

const alert = require('./alert')
const commonCompUtil = require('src/common/utils/commonComp')

module.exports = (message, opt = {}) => {
  if (!commonCompUtil.alive()) {
    return false
  }

  message = message || '未知错误！';

  if(message.length > 20) {
    return alert({
      message
    })
  }

  return COMMON.router.app.$refs
    .commonComponent
    .$refs
    .tip
    .info(message)
    .setOkCb(opt.cb)
    .show()
};