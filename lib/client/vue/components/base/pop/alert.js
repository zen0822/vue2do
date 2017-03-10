/**
 * alert 组件
 */

const Vue = require('vue');
const commonCompUtil = require('src/common/utils/commonComp')
const {trim} = require('src/common/utils/string');

/**
 * 弹窗函数
 * @param {Object} - {弹窗的头部名字, 弹窗的信息}
 */

module.exports = ({title = '', message = '', cb} = {}) => {
  if (!commonCompUtil.alive()) {
    return false
  }

  return COMMON.router.app.$refs
    .commonComponent
    .$refs
    .alert
    .title(title)
    .info(message)
    .setOkCb(cb)
    .show()
};