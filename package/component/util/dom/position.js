/**
 * 相对于浏览器可视界面的偏移值
 *
 * @param {*} el
 * @param {*} options
 */
const offset = function (el) {
  if (!el) {
    return
  }

  // 只有 IE <=11 会, 不然会报错
  if (!el.getClientRects().length) {
    return {
      top: 0,
      left: 0
    }
  }

  const rect = el.getBoundingClientRect()
  const win = el.ownerDocument.defaultView

  return {
    top: rect.top + win.pageYOffset,
    left: rect.left + win.pageXOffset
  }
}

/**
 * 相对于 offsetParent 的偏移值
 *
 * @param {*} el
 */
const position = function (el) {
  if (!el) {
    return
  }

  let offsetParent
  let offset
  let doc
  let parentOffset = {
    top: 0,
    left: 0
  }

  const elStyle = getComputedStyle(el)

  if (elStyle.position === 'fixed') {
    offset = el.getBoundingClientRect()
  } else {
    offset = offset(el)

    doc = el.ownerDocument
    offsetParent = el.offsetParent || doc.documentElement
    const parentStyle = getComputedStyle(offsetParent)

    while (offsetParent &&
      (offsetParent === doc.body || offsetParent === doc.documentElement) &&
      parentStyle.position === 'static') {
      offsetParent = offsetParent.parentNode
    }

    if (offsetParent && offsetParent !== el && offsetParent.nodeType === 1) {
      parentOffset = offset(offsetParent)
      parentOffset.top += parentStyle.borderTopWidth
      parentOffset.left += parentStyle.borderLeftWidth
    }
  }

  return {
    top: offset.top - parentOffset.top - elStyle.marginTop,
    left: offset.left - parentOffset.left - elStyle.marginLeft
  }
}

export {
  offset,
  position
}
