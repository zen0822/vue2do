import Vue from 'vue'

Vue.directive('focus', {
  priority: 1000,

  inserted(el, binding) {
    binding.zBound = true

    binding.zFocus = () => {
      if (binding.zBound) {
        el.focus()
      }
    }

    binding.zBlur = () => {
      if (binding.zBound) {
        el.blur()
      }
    }
  },

  update(el, binding) {
    if (binding.value) {
      Vue.nextTick(binding.zFocus)
    } else {
      Vue.nextTick(binding.zBlur)
    }
  },

  unbind(el, binding) {
    binding.zBound = false
  }
})

/**
 * bubble tip 指令
 *
 * @params { Object } opt
 *                    - { Boolean } bubble - 是否是自定义的bubble, true - 是自定义的bubble, false - 则是只显示字符串的 bubble
 *                    - { Number } parent - vm 指向的是第几个 $parent
 *                    - { String } text - bubble 的内容
 */
Vue.directive('bubble', {
  update(el, binding, opt = {}) {
    binding.$el = $(el)
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

    binding.$el.mouseover((event) => {
      if (bubbleText) {
        bubbleTip.info(bubbleText).show(event.target)
        return false
      }
      bubbleTip.show(el)

      event.stopPropagation()
    })

    binding.$el.mouseout((event) => {
      bubbleTip.hide()

      event.stopPropagation()
    })
  }
})

/**
 * 绑定元素的父元素的 click 事件
 */

let nodeList = []
const storeName = 'VUE_2_DO_DIRECTIVE_CLICK_PARENT_STORE_NAME'

document.getElementsByTagName('body')[0].addEventListener('click', function () {
  nodeList.forEach((el) => {
    el[storeName].expression()
  })
})

Vue.directive('clickParent', {
  bind(el, binding, vnode) {
    const id = nodeList.push(el) - 1
    const context = el.context

    el[storeName] = {
      id,
      expression: binding.expression,
      value: binding.value
    }
  },

  update(el, binding) {
    el[storeName].expression = binding.expression
    el[storeName].value = binding.value
  },

  unbind(el) {
    let len = nodeList.length

    nodeList.every((el, index) => {
      if (el[storeName].id === el[storeName].id) {
        nodeList.splice(index, 1)

        return false
      }

      return true
    })
  }
})
