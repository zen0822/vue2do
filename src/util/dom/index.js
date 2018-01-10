/**
 * 判断是否有滚动条
 *
 * @param {DOMElement} el - dom 元素
 * @param {string} type - 默认是垂直方向的滚动条（可选 x: 水平方向，y：垂直方向）
 */
const hasScroller = (el = document.body, type = 'y') => {
  const style = window.getComputedStyle(el)

  if (style.getPropertyValue('overflow') === 'hidden') {
    return false
  }

  if (type === 'y') {
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
