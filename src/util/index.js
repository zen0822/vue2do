/**
 * 函数防抖
 * 在一个周期内，调用多次只执行一次
 * 如果在这个周期又调用重新计算直到周期结束执行一次
 *
 * ex: 渲染一个Markdown格式的评论预览, 当窗口停止改变大小之后重新计算布局
 *
 * @param {Object} func - 执行函数
 * @param {Number} wait - 间隔时间，默认 1000 毫秒
 */
const debounce = (func, wait = 1000) => {
  let timeout = null

  const debounced = (...args) => {
    clearTimeout(timeout)

    timeout = setTimeout(() => {
      func.apply(null, args)
    }, wait)
  }

  debounced.cancel = function () {
    clearTimeout(timeout)

    timeout = null
  }

  return debounced
}

/**
 * 函数节流
 * 在一个周期内多次调用只能执行一次，且是周期的开始执行一次
 * 周期结束重新开始
 *
 * @param {Object} func - 执行函数
 * @param {Number} wait - 间隔时间
 */
const throttle = (func, wait = 1000) => {
  let startTime = Date.now()

  const throttled = (...args) => {
    let time = Date.now()

    if (startTime + wait - time <= 0) {
      startTime = time

      return func.apply(null, args)
    }
  }

  throttled.cancel = () => {
    startTime = Date.now()
  }

  return throttled
}

export {
  debounce,
  throttle
}
