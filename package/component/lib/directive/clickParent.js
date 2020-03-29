/**
 * 绑定元素的父元素的 click 事件
 */

import Vue from 'vue'

const nodeList = []
const storeName = '__VUE_2_DO_DIRECTIVE_CLICK_PARENT_STORE_NAME__'

window.addEventListener('load', () => {
  document.body.addEventListener('click', function () {
    nodeList.forEach((el) => {
      el[storeName].expression()
    })
  })
})

const clickParentDirective = {
  bind(el, binding, vnode) {
    const id = nodeList.push(el) - 1
    let expression = binding.expression

    if (typeof expression === 'string') {
      expression = vnode.context[expression]
    }

    el[storeName] = {
      id,
      expression,
      value: binding.value,
      vm: vnode.context
    }
  },

  update(el, binding, vnode) {
    let expression = binding.expression

    if (typeof expression === 'string') {
      expression = vnode.context[expression]
    }

    el[storeName].expression = expression
    el[storeName].value = binding.value
  },

  unbind() {
    nodeList.every((el, index) => {
      // eslint-disable-next-line no-self-compare
      if (el[storeName].id === el[storeName].id) {
        nodeList.splice(index, 1)

        return false
      }

      return true
    })
  }
}

Vue.directive('clickParent', clickParentDirective)
