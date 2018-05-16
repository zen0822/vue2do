/**
 * 函数防抖
 * 将延迟函数的执行(真正的执行)，在函数最后一次调用时刻的 wait 毫秒之后
 * ex: 渲染一个Markdown格式的评论预览, 当窗口停止改变大小之后重新计算布局
 *
 * @param {Object} func - 执行函数
 * @param {Number} wait - 间隔时间
 */
const debounce = (func, wait) => {
  let timeout, result

  const later = (context, args) => {

  }

  const debounced = (args) => {

  }

  debounced.cancel = function () {
    clearTimeout(timeout)
    timeout = null
  }

  return debounced
}

/**
 * 函数节流
 * 在一段时间内只能执行一次函数
 *
 * @param {Object} func - 执行函数
 * @param {Number} wait - 间隔时间
 */
const throttle = (func, wait = 1000) => {
  let startTime = Date.now()

  const throttled = () => {
    let time = Date.now()

    if (startTime + wait - time <= 0) {
      startTime = time

      return func()
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
