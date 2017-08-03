/**
 * 让元素展示处于显示状态，来获得实际的元素特性
 *
 * @param {Object} opt - 选项
 *                     @param {Element} element
 *                     @param {Function} cb
 */
const handleEleDisplay = ({
  element,
  cb
} = {}) => {
  if (element && element.nodeType !== 1) {
    return false
  }

  let elDisplay = getComputedStyle(element).display
  let cssDisplay = element.style.display

  function handleElDisplay(show = true) {
    if (elDisplay === 'none' && cssDisplay === 'none') {
      Object.assign(element.style, {
        visibility: show ? 'hidden' : '',
        display: show ? '' : 'none'
      })
    } else if (elDisplay === 'none' && cssDisplay !== 'none') {
      Object.assign(element.style, {
        visibility: show ? 'hidden' : '',
        display: ''
      })
    }

    return element
  }

  handleElDisplay()
  cb && cb(element)
  handleElDisplay(false)

  return element
}

/**
 * 获取元素高度宽度等相关特性（无论是否是隐藏状态）
 *
 * @param {Element} element - dom 节点
 */
const prop = (element) => {
  if (element && element.nodeType !== 1) {
    return false
  }

  let eleProp = {}

  handleEleDisplay({
    element,
    cb: (element) => {
      Object.assign(eleProp, {
        clientWidth: element.clientWidth,
        clientHeight: element.clientHeight,
        offsetWidth: element.offsetWidth,
        offsetHeight: element.offsetHeight,
        offsetParent: element.offsetParent,
        offsetTop: element.offsetTop,
        offsetLeft: element.offsetLeft,
        scrollWidth: element.scrollWidth,
        scrollHeight: element.scrollHeight,
        borderWidth: element.clientTop
      })
    }
  })

  return eleProp
}

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
const offset = (el) => {
  if (!el) {
    console.warn('vue2do: el must alive!')

    return false
  }

  function offsetParent(el, offset = {
    top: 0,
    left: 0
  }) {
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
  offset,
  prop,
  handleEleDisplay
}
