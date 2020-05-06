type TPosition = {
  top: number
  left: number
}

/**
 * 相对于浏览器可视界面的偏移值
 *
 * @param {*} el
 * @param {*} options
 */
const getOffset = function (el: HTMLElement): TPosition {
  if (!el) {
    return {
      top: 0,
      left: 0
    }
  }

  // 只有 IE <=11 会, 不然会报错
  if (!el.getClientRects().length) {
    return {
      top: 0,
      left: 0
    }
  }

  const rect = el.getBoundingClientRect()
  const win = el?.ownerDocument?.defaultView

  return {
    top: rect.top + (win?.pageYOffset ?? 0),
    left: rect.left + (win?.pageXOffset ?? 0)
  }
}

/**
 * 相对于 offsetParent 的偏移值
 *
 * @param {*} el
 */
const getPosition = function (el: HTMLElement): TPosition {
  if (!el) {
    return {
      top: 0,
      left: 0
    }
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
    offset = getOffset(el)

    doc = el.ownerDocument
    offsetParent = el.offsetParent ?? doc?.documentElement

    if (!offsetParent) {
      return {
        top: 0,
        left: 0
      }
    }

    const parentStyle = getComputedStyle(offsetParent)

    while (offsetParent &&
      (offsetParent === doc?.body || offsetParent === doc?.documentElement) &&
      parentStyle.position === 'static') {
      offsetParent = offsetParent.parentNode
    }

    if (offsetParent && offsetParent !== el && offsetParent.nodeType === 1) {
      parentOffset = getOffset(offsetParent as HTMLElement)
      parentOffset.top += parseFloat(parentStyle.borderTopWidth)
      parentOffset.left += parseFloat(parentStyle.borderLeftWidth)
    }
  }

  return {
    top: offset?.top - parentOffset?.top - parseFloat(elStyle.marginTop),
    left: offset?.left - parentOffset?.left - parseFloat(elStyle.marginLeft)
  }
}

export {
  getOffset as offset,
  getPosition as position,
  getOffset,
  getPosition
}
