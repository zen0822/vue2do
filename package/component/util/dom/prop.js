import {
  offset,
  position
} from './position'

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
  if (!element || element.nodeType !== 1) {
    return false
  }

  const elDisplay = getComputedStyle(element).display
  const cssDisplay = element.style.display

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
  cb?.(element)
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

  const eleProp = {}

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
  const children = el.children
  let totalHeight = 0

  for (let i = 0, len = children.length; i < len; i++) {
    totalHeight += children[i].offsetHeight
  }

  return totalHeight
}

export {
  childrenHeight,
  offset,
  position,
  prop,
  handleEleDisplay
}
