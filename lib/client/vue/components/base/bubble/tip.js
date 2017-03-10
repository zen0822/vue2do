/**
 * bubble tip 组件
 */

const Vue = require('vue');
const objectUtil = require('src/common/utils/object');
const commonCompUtil = require ('src/common/utils/commonComp')

/**
 * 冒泡样式的 tip
 */
module.exports = (opt = {}) => {
  if (!commonCompUtil.alive()) {
    return false
  }

  var bubbleTip = COMMON.router.app.$refs.bubbleTip;
  return new Promise((resolve) => {
    if (objectUtil.isEmpty(opt)) {
      return bubbleTip.hide();
    } else {
      return bubbleTip.info(opt.message).show(opt.event);
    }
  })
};