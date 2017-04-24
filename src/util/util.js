/**
 * 查找指定的祖先元素
 *
 * @param {Object} parent - 组件的爸爸
 * @param {String} grandpaName
 */
const findGrandpa = (parent, grandpaName) => {
  function checkGrandpa(parent = {}) {
    if (parent.compName === grandpaName) {
      return parent
    } else if (parent.constructor.name === 'VueComponent') {
      return checkGrandpa(parent.$parent)
    } else {
      return false
    }
  }

  return checkGrandpa(parent)
}

export {
  findGrandpa
}
