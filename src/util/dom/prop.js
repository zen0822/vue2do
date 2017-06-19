/**
 *
 * @param {*} el - dom 节点
 */
const childrenHeight = (el) => {
  let children = el.children
  let totalHeight = 0

  for (let i = 0, len = children.length; i < len; i++) {
    totalHeight += children[i].offsetHeight
  }

  return totalHeight
}

/**
 * 相对于当前客户端可是界面的相关特性
 *
 * @param {*} el - dom 节点
 */
const client = (el) => {
  let children = el.children
  let totalHeight = 0

  for (let i = 0, len = children.length; i < len; i++) {
    totalHeight += children[i].offsetHeight
  }

  return totalHeight
}

/**
 * 相对于网页（包括卷去的页面）的相关特性
 *
 * @param {*} el - dom 节点
 *
 * @return {Object} - 返回相关特性
 *                    left - 离页面的
 *                    right - 纵坐标
 */
const pagePosition = (el) => {
  function offsetParent(el, offset = { top: 0, left: 0 }) {
    if (el.offsetParent) {
      return offsetParent(el.offsetParent, {
        top: el.offsetTop + offset.top,
        left: el.offsetLeft + offset.left
      })
    }

    return offset
  }

  return offsetParent(el)
}

export {
  childrenHeight,
  client,
  pagePosition
}
