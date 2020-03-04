/**
 * bubble tip 指令
 *
 * @params { Object } opt
 *                    - { Boolean } bubble - 是否是自定义的bubble, true - 是自定义的bubble, false - 则是只显示字符串的 bubble
 *                    - { Number } parent - vm 指向的是第几个 $parent
 *                    - { String } text - bubble 的内容
 */

import Vue from 'vue'

const bubbleDirective = {
  update(el, binding, opt = {}) {
    var bubbleTip = {}

    var bubbleText = opt.text

    if (!bubbleText && bubbleText !== 0) {
      return false
    }

    if (opt.bubble) {
      var vmParent = binding.vm

      for (let i = 0, len = opt.parent; i < len; i++) {
        vmParent = vmParent['$parent']
      }

      bubbleTip = vmParent.$refs[opt.bubble]
    } else {
      // bubbleTip = COMMON.router.app.$refs.commonComponent.$refs.bubbleTip
    }

    el.addEventListener('mouseover', (event) => {
      if (bubbleText) {
        bubbleTip.info(bubbleText).show(event.target)
        return false
      }
      bubbleTip.show(el)

      event.stopPropagation()
    })

    el.addEventListener('mouseout', (event) => {
      bubbleTip.hide()

      event.stopPropagation()
    })
  }
}

Vue.directive('bubble', bubbleDirective)
