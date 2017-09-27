/**
 * 判断是否有滚动条
 *
 * @param {DOMElement} el - dom 元素
 * @param {string} type - 默认是垂直方向的滚动条
 */
const hasScroller = (el = document.body, type = 'vertical') => {
  const style = window.getComputedStyle(el)

  if (style.getPropertyValue('overflow') === 'hidden') {
    return false
  }

  if (type === 'vertical') {
    if (style.getPropertyValue('overflow-y') === 'hidden') {
      return false
    }

    return el.scrollHeight > window.innerHeight
  } else {
    if (style.getPropertyValue('overflow-x') === 'hidden') {
      return false
    }

    return el.scrollWidth > window.innerWidth
  }
}

export {
  hasScroller
}
