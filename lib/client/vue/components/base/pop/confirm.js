/**
 * confirm 组件
 */

const Vue = require('vue');

const {trim} = require('src/common/utils/string');
const commonCompUtil = require('src/common/utils/commonComp')

/**
 * 弹窗函数
 * @param {Object} - {弹窗的头部名字, 弹窗的信息, ok 的回调函数，no 的回调函数}
 */

module.exports = ({title = '', message = '', cb, noCb} = {}) => {
  if (!commonCompUtil.alive()) {
    return false
  }

  return COMMON.router.app.$refs
    .commonComponent
    .$refs
    .confirm
    .title(title)
    .info(message)
    .setOkCb(cb)
    .setNoCb(noCb)
    .show()
};